#!/usr/bin/env python3
"""Re-extract the TV and Movie Research Catalog from its muse.ai share page and
regenerate the static site files deterministically.

Usage:  python scripts/sync.py [--out REPO_ROOT]

Generated (overwritten) files:
  data.json, assets/data.js, assets/style.css, original/index.html,
  original/assets/*.js, thumbs/*.jpg
Hand-written (never touched): index.html, assets/app.js, favicon.svg, scripts/*

Unchanged source content produces byte-identical output (no git diff).
The script aborts without writing anything if extraction looks incomplete.
"""
import argparse, asyncio, json, os, re, shutil, sys, tempfile, urllib.request
from collections import defaultdict
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

SHARE_URL = "https://muse.ai/s/tv-and-movie-research-catalog-xla62ucxbx02u5"
CONTENT_HOST = "metaaiusercontent.com"
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/124.0 Safari/537.36")
HERE = os.path.dirname(os.path.abspath(__file__))
YT = re.compile(r"(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/|youtube\.com/shorts/)([\w-]{11})")

# Section headings on the source page whose text differs from the category label.
SECTION_KEYS = {
    "Pregnant woman hypnotized / mind-controlled — adult context & rating evidence": "adult-pregnancy",
    "Wife / female character forcibly hypnotized to obey": "forced-obedience",
    "Female hypnotized / mind-controlled by husband, boyfriend, ex-husband or ex-boyfriend": "partner-control",
    "Husband / boyfriend hires a third party to hypnotize / mind-control his wife / girlfriend": "partner-commissioned",
    "Mother hypnotized / mind-controlled by current husband or boyfriend": "mom-partner-control",
    "Wife hypnotized / mind-controlled / possessed by her husband's ex-wife or ex-lover": "exwife-control",
    "Remarried wife hypnotized / mind-controlled by her new husband or a stepfather figure": "remarried-wife-control",
    "Pregnant single mother hypnotized / mind-controlled by her new husband or child's stepfather": "stepfather-control",
    "Pregnant woman hypnotized / mind-controlled by a child (fetus, dead-child ghost, or alien child)": "pregnant-child",
    "Woman makes a deal with the devil / a demon to become pregnant / have a child": "devil-deal-pregnancy",
}


def log(*a):
    print("[sync]", *a, file=sys.stderr, flush=True)


async def capture():
    """Render the share page; return (entries, rendered_frame_html, {filename: bytes})."""
    launch = {"headless": True, "args": ["--no-sandbox"]}
    chrome = os.environ.get("CHROME_PATH")
    if chrome:
        launch["executable_path"] = chrome
    async with async_playwright() as p:
        browser = await p.chromium.launch(**launch)
        page = await browser.new_page(viewport={"width": 1400, "height": 1000}, user_agent=UA)
        bodies, pending = {}, []

        async def grab(resp):
            if CONTENT_HOST in resp.url and resp.ok:
                try:
                    bodies[resp.url.split("?")[0]] = await resp.body()
                except Exception as exc:  # body unavailable (e.g. redirect)
                    log("could not read", resp.url, exc)
        page.on("response", lambda r: pending.append(asyncio.ensure_future(grab(r))))
        await page.goto(SHARE_URL, wait_until="networkidle", timeout=90000)
        frame = None
        for _ in range(60):
            frame = next((f for f in page.frames if CONTENT_HOST in f.url), None)
            if frame:
                break
            await page.wait_for_timeout(500)
        if not frame:
            raise SystemExit("catalog iframe not found on share page (blocked or page changed)")
        await frame.wait_for_function(
            "typeof entries !== 'undefined' && document.querySelectorAll('#grid article.card').length > 0",
            timeout=90000)
        await page.wait_for_timeout(1500)
        entries = json.loads(await frame.evaluate("JSON.stringify(entries)"))
        html = await frame.content()
        await asyncio.gather(*pending)
        await browser.close()
    files = {}
    for url, body in bodies.items():
        path = url.split(CONTENT_HOST, 1)[1].lstrip("/")
        if path in ("", "index.html"):
            files["index.html"] = body
        elif path.startswith("assets/") and path.endswith(".js"):
            files[path] = body
    return entries, html, files


def build(entries_raw, html):
    s = BeautifulSoup(html, "lxml")
    cats = {o["value"]: o.get_text() for o in s.select("#category option") if o["value"] != "all"}
    legend = {sp.get("class")[0]: sp.get_text(strip=True) for sp in s.select(".legend span")}
    lab2key = {v: k for k, v in cats.items()}
    lab2key.update({v: k for k, v in legend.items()})
    lab2key.update(SECTION_KEYS)

    entries = []
    for i, x in enumerate(entries_raw):
        yt = []
        for k, v in x.items():
            if k.lower().endswith("src") and isinstance(v, list):
                for pair in v:
                    m = YT.search(pair[1]) if len(pair) > 1 else None
                    if m and m.group(1) not in yt:
                        yt.append(m.group(1))
        entries.append({
            "id": i + 1, "title": x["t"], "subtitle": x.get("sub", ""), "year": x.get("y", ""),
            "format": x["f"], "meta": x["m"], "categories": x["c"],
            "category_labels": [cats.get(c, c) for c in x["c"]],
            "mechanism": x.get("mec", ""), "confidence_flag": x.get("flag", ""), "summary": x["s"],
            "character": x.get("ch", ""), "provenance": x.get("prov", ""), "note": x.get("note", ""),
            "sources": [{"label": a, "url": b} for a, b in x.get("src", [])],
            "youtube_ids": yt, "thumbnail": None, "raw": x})

    idx = defaultdict(list)
    for en in entries:
        idx[(en["title"].strip(), en["subtitle"].strip())].append(en)
    sections, cur, used, unmatched = [], None, defaultdict(set), 0
    for el in s.select_one("#grid").children:
        if not getattr(el, "name", None):
            continue
        cl = el.get("class") or []
        if "category-heading" in cl:
            t = el.find("h2").get_text(strip=True); p = el.find("p")
            cur = {"title": t, "category": lab2key.get(t), "description": p.get_text(" ", strip=True) if p else "",
                   "notes": [], "groups": []}
            sections.append(cur)
        elif cur is None:
            continue
        elif "subcategory-heading" in cl:
            cur["groups"].append({"title": el.get_text(strip=True), "items": []})
        elif "category-note" in cl:
            cur["notes"].append({"html": el.decode_contents().strip(), "text": el.get_text(" ", strip=True)})
        elif el.name == "article":
            if not cur["groups"]:
                cur["groups"].append({"title": None, "items": []})
            h = el.find("h3"); sm = h.find("small")
            sub = sm.get_text(" ", strip=True) if sm else ""
            if sm:
                sm.extract()
            title = h.get_text(" ", strip=True)
            yr = el.select_one(".year"); yr = yr.get_text(strip=True) if yr else ""
            summ_el = el.select_one(".summary"); summ = summ_el.get_text(" ", strip=True) if summ_el else ""
            cands = idx.get((title, sub), [])
            if not cands:
                unmatched += 1
                continue

            def score(en):
                sc = 4 if (en["year"] or "") == yr else 0
                sc += 2 if cur["category"] in en["categories"] else 0
                sc += 3 if en["summary"].strip() == summ else 0
                return sc - (10 if en["id"] in used[cur["title"]] else 0)
            best = max(cands, key=score)
            used[cur["title"]].add(best["id"])
            item = {"id": best["id"]}
            if summ != best["summary"]:
                item["summary"] = summ
            item["tags"] = [t.get_text(" ", strip=True) for t in el.select(".tags .tag")]
            item["sources"] = [{"label": a.get_text(strip=True).replace("↗", "").strip(), "url": a.get("href")}
                               for a in el.select(".sources a")]
            for cls in ("provenance", "character", "entry-note"):
                pp = el.select_one("p." + cls)
                if pp:
                    item[cls.replace("-", "_")] = pp.get_text(" ", strip=True)
            if yr != best["year"]:
                item["year_display"] = yr
            cur["groups"][-1]["items"].append(item)

    intro, snap, notes = s.select_one(".intro"), s.select_one(".snapshot"), s.select_one(".research-notes")
    footer = s.select_one("footer span")
    total_el = s.select_one("#totalRecordsHeading") or s.select_one("#count")
    shown_total = int(re.sub(r"\D", "", total_el.get_text()) or 0) if total_el else None
    data = {
        "source": {
            "share_url": SHARE_URL,
            "content_url": "https://tv-and-movie-research-catalog-xla62ucxbx02u5.cf.metaaiusercontent.com/index.html",
            "page_title": (s.title.get_text(strip=True) if s.title else "TV and Movie Research Catalog"),
            "kicker": intro.select_one(".kicker").get_text(strip=True),
            "heading": intro.find("h1").get_text(" ", strip=True),
            "description": intro.select_one(".dek").get_text(" ", strip=True),
            "total_records_shown_by_source": shown_total,
            "snapshot_label": footer.get_text(" ", strip=True) if footer else "",
            "snapshot_breakdowns": [{"html": b.decode_contents().strip(), "text": b.get_text(" ", strip=True)}
                                    for b in snap.select(".breakdown")] if snap else [],
            "research_notes_html": notes.decode_contents().strip() if notes else "",
            "notice_on_share_page": "Content is user generated and unverified.",
        },
        "categories": [{"key": k, "label": v, "legend_label": legend.get(k, v),
                        "entry_count": sum(1 for en in entries if k in en["categories"])} for k, v in cats.items()],
        "formats": [{"key": o["value"], "label": o.get_text()} for o in s.select("#format option") if o["value"] != "all"],
        "entry_count": len(entries),
        "entries": entries,
        "sections": sections,
    }
    style = s.find("style")
    css = style.get_text() if style else ""
    return data, css, unmatched


def fetch_thumbs(data, out):
    tdir = os.path.join(out, "thumbs")
    os.makedirs(tdir, exist_ok=True)
    wanted = set()
    for en in data["entries"]:
        if not en["youtube_ids"]:
            continue
        vid = en["youtube_ids"][0]
        fn = os.path.join(tdir, vid + ".jpg")
        if not os.path.exists(fn):
            try:
                req = urllib.request.Request(f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg", headers={"User-Agent": UA})
                body = urllib.request.urlopen(req, timeout=30).read()
                with open(fn, "wb") as f:
                    f.write(body)
            except Exception as exc:
                log("no thumbnail for", vid, exc)
                continue
        en["thumbnail"] = f"thumbs/{vid}.jpg"
        wanted.add(vid + ".jpg")
    for name in os.listdir(tdir):
        if name not in wanted:
            os.remove(os.path.join(tdir, name))


def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    mode = "wb" if isinstance(content, bytes) else "w"
    kw = {} if isinstance(content, bytes) else {"encoding": "utf-8", "newline": "\n"}
    with open(path, mode, **kw) as f:
        f.write(content)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", default=os.path.dirname(HERE), help="repo/site root (default: repo root)")
    args = ap.parse_args()
    out = os.path.abspath(args.out)

    entries_raw, html, files = asyncio.run(capture())
    data, css, unmatched = build(entries_raw, html)
    n, shown = data["entry_count"], data["source"]["total_records_shown_by_source"]
    log(f"entries={n} source_total={shown} section_cards={sum(len(g['items']) for sc in data['sections'] for g in sc['groups'])} unmatched_cards={unmatched}")
    # Safety checks: never overwrite the site with a partial/blocked extraction.
    if n < 50 or (shown and shown != n) or "index.html" not in files or not css:
        raise SystemExit(f"extraction looks incomplete (entries={n}, source_total={shown}, "
                         f"have_index={'index.html' in files}, css={bool(css)}); nothing written")

    fetch_thumbs(data, out)
    blob = json.dumps(data, ensure_ascii=False, indent=1) + "\n"
    write(os.path.join(out, "data.json"), blob)
    write(os.path.join(out, "assets", "data.js"), "window.CATALOG = " + blob.rstrip("\n") + ";\n")
    with open(os.path.join(HERE, "additions.css"), encoding="utf-8") as f:
        additions = f.read()
    css_lines = "\n".join(line[4:] if line.startswith("    ") else line for line in css.strip("\n").split("\n"))
    write(os.path.join(out, "assets", "style.css"), css_lines.strip() + "\n\n" + additions.strip() + "\n")
    # Archived copy of the original page and its data scripts.
    odir = os.path.join(out, "original")
    if os.path.isdir(odir):
        shutil.rmtree(odir)
    for rel, body in sorted(files.items()):
        write(os.path.join(odir, rel), body)
    log(f"wrote data.json ({len(blob)} bytes), {len(files)} original files, "
        f"{sum(1 for e in data['entries'] if e['thumbnail'])} thumbnails")


if __name__ == "__main__":
    main()
