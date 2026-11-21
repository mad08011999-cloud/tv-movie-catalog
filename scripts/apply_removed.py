#!/usr/bin/env python3
"""Apply sources/removed.json to generated catalog files. No Playwright, no muse.ai.

A removal matches a card when its catalog field agrees and either the card id matches,
or the normalized title and first 4-digit year both match (so a later rebuild that
assigns a new id still drops the same work).

Usage:
  python scripts/apply_removed.py [--root REPO] [--previous GIT_REV_OR_PATH] [--dry-run]

--previous is the parent commit or a file of the previous removed.json; items that
disappeared from the list are restored from their stored 'record' snapshot so Undo
works without a full catalog sync.
"""
from __future__ import annotations

import argparse, json, os, re, subprocess, sys, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_ROOT = os.path.dirname(HERE)

CATALOGS = (
    # catalog key, data.json path, catalog.js/data.js path, whether js has CATALOG_UI
    ("main", "data.json", "assets/data.js", False),
    ("reads", "reads/data.json", "reads/catalog.js", True),
    ("adult", "adult/data.json", "adult/catalog.js", True),
)


def norm_title(t):
    return re.sub(r"[\W_]+", "", unicodedata.normalize("NFKC", t or "").casefold())


def year_key(y):
    m = re.search(r"\b(1[89]\d\d|20\d\d)\b", str(y or ""))
    return m.group(1) if m else ""


def dumps(obj):
    return json.dumps(obj, ensure_ascii=False, indent=1) + "\n"


def load_removed(path_or_root):
    path = path_or_root
    if os.path.isdir(path_or_root):
        path = os.path.join(path_or_root, "sources", "removed.json")
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    return list(data.get("entries") or [])


def load_previous(root, ref):
    if not ref:
        return []
    if os.path.isfile(ref):
        return load_removed(ref)
    try:
        raw = subprocess.check_output(
            ["git", "show", f"{ref}:sources/removed.json"],
            cwd=root, stderr=subprocess.DEVNULL,
        )
    except (subprocess.CalledProcessError, FileNotFoundError):
        return []
    try:
        return list(json.loads(raw.decode("utf-8")).get("entries") or [])
    except json.JSONDecodeError:
        return []


def matches(entry, rem, catalog):
    if (rem.get("catalog") or "main") != catalog:
        return False
    rid, eid = rem.get("id"), entry.get("id")
    if rid is not None and eid is not None and int(rid) == int(eid):
        return True
    if rem.get("title") and norm_title(rem["title"]) == norm_title(entry.get("title")):
        ry, ey = year_key(rem.get("year")), year_key(entry.get("year"))
        if ry and ey:
            return ry == ey
        if not ry and not ey:
            return True
    return False


def _ids(entries):
    return {e.get("id") for e in entries}


def apply_to_entry_list(entries, removals, catalog, previous=None):
    """Filter a flat list of {id,title,year,...} (reads/adult data.json, or CATALOG.entries)."""
    previous = previous or []
    kept, dropped = [], []
    for e in entries:
        if any(matches(e, rem, catalog) for rem in removals):
            dropped.append(e)
        else:
            kept.append(e)
    restored = []
    have = {(norm_title(e.get("title")), year_key(e.get("year")), e.get("id")) for e in kept}
    have_ids = {e.get("id") for e in kept}
    current_keys = {(r.get("catalog") or "main", r.get("id"), norm_title(r.get("title")), year_key(r.get("year"))) for r in removals}
    for rem in previous:
        if (rem.get("catalog") or "main") != catalog:
            continue
        key = (rem.get("catalog") or "main", rem.get("id"), norm_title(rem.get("title")), year_key(rem.get("year")))
        if key in current_keys:
            continue
        rec = rem.get("record")
        if not rec or not isinstance(rec, dict):
            continue
        if rec.get("id") in have_ids or any(matches(e, rem, catalog) for e in kept):
            continue
        kept.append(rec)
        restored.append(rec)
        have_ids.add(rec.get("id"))
    return kept, dropped, restored


def _recompute_catalog_counts(data):
    entries = data.get("entries") or []
    data["entry_count"] = len(entries)
    live = {e.get("id") for e in entries}
    if "unplaced_entry_ids" in data:
        data["unplaced_entry_ids"] = [i for i in (data.get("unplaced_entry_ids") or []) if i in live]
    for c in data.get("categories") or []:
        key = c.get("key")
        if key:
            c["entry_count"] = sum(1 for e in entries if key in (e.get("categories") or []))
    for sec in data.get("sections") or []:
        for grp in sec.get("groups") or []:
            items = [it for it in (grp.get("items") or []) if it.get("id") in live]
            grp["items"] = items
        # drop now-empty groups that have no notes, to keep section views tidy
        sec["groups"] = [g for g in (sec.get("groups") or []) if g.get("items") or g.get("notes")]
    return data


def apply_to_data(data, removals, catalog, previous=None):
    entries, dropped, restored = apply_to_entry_list(data.get("entries") or [], removals, catalog, previous)
    data = dict(data)
    data["entries"] = entries
    _recompute_catalog_counts(data)
    return data, {"dropped": dropped, "restored": restored}


def _parse_catalog_js(text):
    """Return (catalog_dict, prefix, suffix). prefix is 'window.CATALOG = ' plus any space;
    suffix is everything after the JSON object (typically ';\n' or ';\nwindow.CATALOG_UI = {...};\n').
    CATALOG_UI is a JS object literal with unquoted keys, so it is preserved verbatim."""
    marker = "window.CATALOG ="
    i = text.index(marker)
    after = text[i + len(marker):]
    stripped = after.lstrip()
    pad = after[:len(after) - len(stripped)]
    data, end = json.JSONDecoder().raw_decode(stripped)
    prefix = text[:i] + marker + pad
    suffix = stripped[end:]
    return data, prefix, suffix


def _js_dumps(data, original_text):
    """Serialise the CATALOG object in the same style as the existing file."""
    if "\n " in original_text[:80] or "\n{" in original_text[:40]:
        return dumps(data).rstrip("\n")
    # compact (reads/adult catalog.js)
    return json.dumps(data, ensure_ascii=False)


def apply_files(root, previous=None, dry_run=False, catalogs=None):
    removals = load_removed(root)
    prev = previous if isinstance(previous, list) else load_previous(root, previous)
    wanted = set(catalogs) if catalogs else None
    summary = []
    changed = False
    for catalog, data_rel, js_rel, has_ui in CATALOGS:
        if wanted is not None and catalog not in wanted:
            continue
        data_path = os.path.join(root, data_rel)
        js_path = os.path.join(root, js_rel)
        if not os.path.exists(data_path) and not os.path.exists(js_path):
            continue
        # Prefer filtering the JS CATALOG (what the page renders). For reads/adult,
        # data.json is a different, flatter schema and is filtered separately.
        if os.path.exists(js_path):
            raw_js = open(js_path, encoding="utf-8").read()
            cat_data, prefix, suffix = _parse_catalog_js(raw_js)
            new_data, stats = apply_to_data(cat_data, removals, catalog, prev)
            membership_changed = bool(stats["dropped"] or stats["restored"])
            if membership_changed:
                new_js = prefix + _js_dumps(new_data, raw_js) + suffix
                if new_js != raw_js and not dry_run:
                    with open(js_path, "w", encoding="utf-8", newline="\n") as f:
                        f.write(new_js)
                changed = True
                if catalog == "main" and os.path.exists(data_path):
                    new_blob = dumps(new_data)
                    old_blob = open(data_path, encoding="utf-8").read()
                    if new_blob != old_blob and not dry_run:
                        with open(data_path, "w", encoding="utf-8", newline="\n") as f:
                            f.write(new_blob)
            summary.append((catalog, "catalog", stats, len(new_data.get("entries") or [])))
        if catalog in ("reads", "adult") and os.path.exists(data_path):
            raw = open(data_path, encoding="utf-8").read()
            payload = json.loads(raw)
            entries, dropped, restored = apply_to_entry_list(payload.get("entries") or [], removals, catalog, prev)
            payload["entries"] = entries
            if "categories" in payload:
                for c in payload["categories"]:
                    key = c.get("key")
                    if key:
                        c["entry_count"] = sum(1 for e in entries if key in (e.get("categories") or []))
            new_blob = json.dumps(payload, ensure_ascii=False, indent=1) + "\n"
            # reads/adult data.json historically may omit the trailing newline; keep a newline
            if new_blob != raw and new_blob != raw + "\n" and new_blob.rstrip("\n") != raw.rstrip("\n"):
                # only rewrite when membership actually changed
                old_ids = [e.get("id") for e in json.loads(raw).get("entries") or []]
                new_ids = [e.get("id") for e in entries]
                if old_ids != new_ids:
                    if not dry_run:
                        with open(data_path, "w", encoding="utf-8", newline="\n") as f:
                            f.write(new_blob)
                    changed = True
            summary.append((catalog, "data", {"dropped": dropped, "restored": restored}, len(entries)))
    return changed, summary


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--root", default=DEFAULT_ROOT)
    p.add_argument("--previous", default=None, help="git rev or file of the previous sources/removed.json")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--catalog", action="append", dest="catalogs", help="Limit to one catalog (main, reads, adult); repeatable")
    args = p.parse_args(argv)
    root = os.path.abspath(args.root)
    changed, summary = apply_files(root, previous=args.previous, dry_run=args.dry_run, catalogs=args.catalogs)
    for catalog, kind, stats, n in summary:
        d, r = len(stats["dropped"]), len(stats["restored"])
        print(f"{catalog}/{kind}: dropped {d}, restored {r}, now {n} entries")
    print("changed" if changed else "unchanged", "(dry-run)" if args.dry_run else "")
    return 0


if __name__ == "__main__":
    sys.exit(main())
