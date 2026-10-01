#!/usr/bin/env python3
"""Re-extract the TV and Movie Research Catalog from its muse.ai share pages, merge
the sources, de-duplicate records, and regenerate the static site deterministically.

Usage:  python scripts/sync.py [--out REPO_ROOT]

Local sources (SOURCES entries with a "local" path) are hand-curated JSON files kept in the repo,
e.g. sources/india-catalog.json and sources/worldwide-hypnosis.json. They are read, never scraped or rewritten, and merged like any other
source: a local record that matches an existing title+year (or names one in "match_title"/"match_year") only adds
missing fields, categories and source links; anything else becomes a new record.

Generated (overwritten) files:
  data.json, dedupe_report.json, assets/data.js, assets/style.css,
  original/<source-id>/..., sources/<source-id>.json (cache for optional sources), thumbs/*.jpg
Hand-written (never touched): index.html, assets/app.js, favicon.svg, scripts/*

Pipeline
  1. Every source in SOURCES is rendered in headless Chromium. Its structure is auto-detected:
       "full"  - full catalog page with a global `entries` array and rendered #grid sections
       "index" - title-only index page with a global `categories` array of groups/titles
     Local sources are loaded from their JSON file instead ("local" kind).
  2. Completeness check per source, done on the RAW extraction before any de-duplication:
       full : len(entries) must equal the page's own total (#totalRecordsHeading)
       index: number of title items must equal the page's own "N named catalog entries shown"
              count and the number of rendered cards
     A required source that fails aborts the run (nothing is written). An optional source that fails
     falls back to its last good snapshot in sources/<id>.json (or is skipped if none exists).
  3. De-duplication by normalized title key + year (see dedupe()).
     Explicit merges for duplicates that title+year cannot catch live in sources/merge-rules.json (see
     apply_merge_rules()); the absorbed card's ID is retired and no other ID shifts. A local record may name
     "override_fields" to take precedence for those optional fields (see overrides()); opposite definite
     pregnancy / kids / marriage values that no record resolves are listed on the card's source-conflict line.
  4. Sections, categories and notes are merged; files are written.

Unchanged source content produces byte-identical output (no git diff).
"""
import inspect
import argparse, asyncio, json, os, re, shutil, sys, unicodedata, urllib.request
from collections import defaultdict
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

SOURCES = [
    {"id": "xla62ucxbx02u5", "label": "Full catalog",
     "url": "https://muse.ai/s/tv-and-movie-research-catalog-xla62ucxbx02u5", "required": True},
    {"id": "ig6qlxqxoxvcxla", "label": "Title index",
     "url": "https://muse.ai/s/tv-and-movie-research-catalog-ig6qlxqxoxvcxla", "required": False},
    # hand-curated records kept in the repo (not scraped); merged into the existing categories
    {"id": "india-catalog", "label": "India-only research additions", "local": "sources/india-catalog.json",
     "required": False},
    {"id": "worldwide-hypnosis", "label": "Worldwide female-hypnosis research", "local": "sources/worldwide-hypnosis.json",
     "required": False},
    {"id": "hypnotized-love", "label": "Worldwide hypnotized-to-love research", "local": "sources/hypnotized-love.json",
     "required": False},
    {"id": "devil-deal-hypnosis", "label": "Devil's deal + pregnancy (hypnotized) research",
     "local": "sources/devil-deal-hypnosis.json", "required": False},
    {"id": "pregnant-intimacy", "label": "Pregnant-character intimacy research", "local": "sources/pregnant-intimacy.json",
     "required": False},
    {"id": "occult-pregnancy-nearmiss", "label": "Occult pregnancy + trance near-misses",
     "local": "sources/occult-pregnancy-nearmiss.json", "required": False},
    {"id": "rich-wife-hypnosis", "label": "Rich woman / wife hypnotized for gain",
     "local": "sources/rich-wife-hypnosis.json", "required": False},
    {"id": "agegap-marriage", "label": "Young wife, older / rich husband research",
     "local": "sources/agegap-marriage.json", "required": False},
    {"id": "older-man-hypnosis", "label": "Young woman hypnotized by an older / rich man",
     "local": "sources/older-man-hypnosis.json", "required": False},
    {"id": "hypno-intimacy", "label": "Hypnotized woman intimate with the hypnotist research",
     "local": "sources/hypno-intimacy.json", "required": False},
    {"id": "mother-kids-hypnosis", "label": "Mother hypnotized in front of her children",
     "local": "sources/mother-kids-hypnosis.json", "required": False},
    {"id": "hypno-leftovers", "label": "Hypnosis / mind-control leads left out of the hypno-intimacy pass",
     "local": "sources/hypno-leftovers.json", "required": False},
    {"id": "field-fixes", "label": "Card field fixes (conflicting pregnancy / kids / marriage values)",
     "local": "sources/field-fixes.json", "required": False},
    {"id": "hypnosis-assault", "label": "Hypnotized woman sexually assaulted under hypnosis",
     "local": "sources/hypnosis-assault.json", "required": False},
    {"id": "mom-pregnancy", "label": "Mother with children gets pregnant (husband, new partner or lover)",
     "local": "sources/mom-pregnancy.json", "required": False},
    {"id": "hypnosis-assault-loose", "label": "Hypnosis-assault research — loose-fit additions",
     "local": "sources/hypnosis-assault-loose.json", "required": False},
]
CONTENT_HOST = "metaaiusercontent.com"
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/124.0 Safari/537.36")
HERE = os.path.dirname(os.path.abspath(__file__))
YT = re.compile(r"(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/|youtube\.com/shorts/)([\w-]{11})")

# Section headings on the full catalog whose text differs from the category label.
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
INDEX_FORMATS = {"Movies & film serials": "movie", "TV, soaps & episodes": "tv", "Shorts": "short"}
TITLE_ABBREVIATIONS = {"ahs: stories": "american horror stories", "ahs": "american horror story"}


def log(*a):
    print("[sync]", *a, file=sys.stderr, flush=True)


# --------------------------------------------------------------------------- normalization
def norm_title(t):
    """Case-insensitive title key: NFKC, curly/straight quotes and apostrophes unified,
    dashes unified, whitespace collapsed, leading/trailing punctuation trimmed."""
    t = unicodedata.normalize("NFKC", t or "").casefold()
    t = re.sub(r"[\u2018\u2019\u201a\u201b\u2032`\u00b4]", "'", t)
    t = re.sub(r"[\u201c\u201d\u201e\u201f\u2033\u00ab\u00bb]", '"', t)
    t = re.sub(r"[\u2010-\u2015\u2212]", "-", t)
    t = re.sub(r"\s+", " ", t).strip()
    return re.sub(r"^[\W_]+|[\W_]+$", "", t)


YEAR_RE = re.compile(r"(?<!\d)(1[89]\d\d|20\d\d)(?!\d)")


def sort_name(s):
    """A-Z display key: accents folded, case-insensitive, leading punctuation and 'The'/'A'/'An' ignored
    (assets/app.js applies the same ordering again at render time)."""
    t = unicodedata.normalize("NFKD", s or "")
    t = "".join(ch for ch in t if not unicodedata.combining(ch)).casefold().strip()
    t = re.sub(r"^[^\w]+", "", t)
    t = re.sub(r"^(the|an|a)\s+", "", t)
    return re.sub(r"^[^\w]+", "", t)


def entry_sort_key(e):
    """Title A-Z (sort_name), then first year (records without a year last), then id."""
    yk = year_key(e.get("year", ""))
    return (sort_name(e.get("title", "")), 0 if yk else 1, yk, e.get("id", 0))


def year_key(y):
    """First 4-digit year in a year string ('1966–71' -> '1966'); '' when there is none."""
    m = YEAR_RE.search(y or "")
    return m.group(1) if m else ""


def all_years(y):
    return set(YEAR_RE.findall(y or ""))


YEAR_PAREN = re.compile(r"\s*\(([^()]*?(?<!\d)((?:18|19|20)\d\d)(?!\d)[^()]*)\)")
QUOTED = re.compile(r"\u201c([^\u201d]+)\u201d|\"([^\"]+)\"|(?:(?<=\s)|^)\u2018([^\u2019]+)\u2019")
NON_YEAR_PAREN = re.compile(r"\s*\([^()]*\)")
EPISODE_WORDS = re.compile(r"\b(?:s\d+\s*e\d+(?:[–-]\d+)?|t\d+e\d+|season \d+|episodes? [\d–-]+|episodes?|"
                           r"variants?|sequel|pilot|trailer|part one|part two)\b\.?", re.I)


def split_index_title(raw):
    """'White Zombie (1932)' -> ('White Zombie', '1932', '1932'); also handles '(2017 Brazil)'."""
    raw = unicodedata.normalize("NFC", raw).strip()
    m = YEAR_PAREN.search(raw)
    if m:
        title = re.sub(r"\s+", " ", raw[:m.start()] + " " + raw[m.end():]).strip()
        return title, m.group(1).strip(), m.group(2)
    # the index page's own yearOf() also reads bare years, but a year that starts the title is part
    # of the name ("1920", "1920: Evil Returns"), so only a later bare year counts
    m = re.search(r"(?<=\s)(?:19|20)\d{2}(?:[–-]\d{2,4})?(?!\d)", raw)
    return raw, (m.group(0) if m else ""), year_key(m.group(0) if m else "")


def alias_keys(title):
    """Looser keys used only to match the title-only index against the full catalog."""
    t = unicodedata.normalize("NFKC", title)
    t = t.split(" — ", 1)[0]
    t = QUOTED.sub(" ", t)
    t = NON_YEAR_PAREN.sub(" ", t)
    t = EPISODE_WORDS.sub(" ", t)
    keys = []
    for part in [t] + t.split(" / "):
        k = norm_title(part)
        for ab, full in TITLE_ABBREVIATIONS.items():
            if k == ab or k.startswith(ab + ":") or k.startswith(ab + " "):
                k = full + k[len(ab):]
                break
        for cand in (k, re.sub(r"^the ", "", k)):
            if cand and cand not in keys:
                keys.append(cand)
    return keys


def quoted_parts(title):
    found = ["".join(m) for m in QUOTED.findall(unicodedata.normalize("NFKC", title))]
    return [norm_title(q) for q in found if norm_title(q)]


def infer_index_format(title, group):   # port of the index page's inferFormat()
    s = (title + " " + group).lower()
    if re.search(r"\bshort\b", s):
        return "Shorts"
    if re.search(r"episode|\bep\b|s\d{1,2}e\d{1,2}|season|soap|series|serial|telenovela|tv movie|pilot|miniseries|arc|television", s):
        return "TV, soaps & episodes"
    return "Movies & film serials"


# --------------------------------------------------------------------------- capture
async def capture(page, src):
    """Render one share page. Returns dict(kind, payload, files)."""
    bodies, pending = {}, []

    async def grab(resp):
        if CONTENT_HOST in resp.url and resp.ok:
            try:
                bodies[resp.url.split("?")[0]] = await resp.body()
            except Exception as exc:
                log("could not read", resp.url, exc)
    handler = lambda r: pending.append(asyncio.ensure_future(grab(r)))
    page.on("response", handler)
    try:
        await page.goto(src["url"], wait_until="networkidle", timeout=90000)
        frame = None
        for _ in range(60):
            frame = next((f for f in page.frames if CONTENT_HOST in f.url), None)
            if frame:
                break
            await page.wait_for_timeout(500)
        if not frame:
            raise RuntimeError("catalog iframe not found on share page (blocked or page changed)")
        await frame.wait_for_function(
            "(typeof entries !== 'undefined' && document.querySelectorAll('#grid article.card').length > 0) ||"
            "(typeof categories !== 'undefined' && document.querySelectorAll('article.card').length > 0)",
            timeout=90000)
        await page.wait_for_timeout(1500)
        kind = await frame.evaluate(
            "typeof entries !== 'undefined' && Array.isArray(entries) ? 'full' :"
            "(typeof categories !== 'undefined' && Array.isArray(categories) ? 'index' : 'unknown')")
        if kind == "full":
            payload = {"entries": json.loads(await frame.evaluate("JSON.stringify(entries)")),
                       "html": await frame.content()}
        elif kind == "index":
            await frame.wait_for_function(
                "/\\d[\\d,]*\\s+(unique\\s+)?named\\s/.test((document.getElementById('results') || {textContent: ''}).textContent)",
                timeout=60000)
            await page.wait_for_timeout(1000)
            payload = json.loads(await frame.evaluate("""JSON.stringify({
                SOURCE: typeof SOURCE !== 'undefined' ? SOURCE : '',
                stats: typeof stats !== 'undefined' ? stats : [],
                boundaries: typeof boundaries !== 'undefined' ? boundaries : [],
                categories: categories,
                detailedRecords: typeof detailedRecords !== 'undefined' ? detailedRecords : null,
                page_records: typeof records !== 'undefined' && Array.isArray(records) ? records.length : null,
                title: document.title,
                kicker: (document.querySelector('.kicker') || {}).textContent || '',
                heading: (document.querySelector('h1') || {}).textContent || '',
                lede: (document.querySelector('.lede') || {}).textContent || '',
                results: (document.getElementById('results') || {}).textContent || '',
                cards: document.querySelectorAll('article.card').length})"""))
        else:
            raise RuntimeError("unrecognized page structure (no `entries` or `categories` data)")
        await asyncio.gather(*pending)
    finally:
        page.remove_listener("response", handler)
    files = {}
    for url, body in bodies.items():
        path = url.split(CONTENT_HOST, 1)[1].lstrip("/")
        if path in ("", "index.html"):
            files["index.html"] = body
        elif path.startswith("assets/") and path.endswith(".js"):
            files[path] = body
    return {"kind": kind, "payload": payload, "files": files}


async def capture_sources(srcs):
    launch = {"headless": True, "args": ["--no-sandbox"]}
    if os.environ.get("CHROME_PATH"):
        launch["executable_path"] = os.environ["CHROME_PATH"]
    results = {}
    async with async_playwright() as p:
        browser = await p.chromium.launch(**launch)
        for src in srcs:
            # bypass_csp: the index page's CSP forbids the string evaluation Playwright uses for wait_for_function
            page = await browser.new_page(viewport={"width": 1400, "height": 1000}, user_agent=UA, bypass_csp=True)
            try:
                results[src["id"]] = await capture(page, src)
            except Exception as exc:
                results[src["id"]] = {"error": f"{type(exc).__name__}: {exc}"}
            await page.close()
        await browser.close()
    return results


ATTEMPTS = 3


# --------------------------------------------------------------------------- per-source parsing
def parse_full(src, payload):
    """Full catalog: records from `entries`, section layout from the rendered #grid."""
    entries_raw, html = payload["entries"], payload["html"]
    s = BeautifulSoup(html, "lxml")
    cats = {o["value"]: o.get_text() for o in s.select("#category option") if o["value"] != "all"}
    legend = {sp.get("class")[0]: sp.get_text(strip=True) for sp in s.select(".legend span")}
    lab2key = {v: k for k, v in cats.items()}
    lab2key.update({v: k for k, v in legend.items()})
    lab2key.update(SECTION_KEYS)
    total_el = s.select_one("#totalRecordsHeading")
    declared = int(re.sub(r"\D", "", total_el.get_text()) or 0) if total_el else None
    check = {"raw_count": len(entries_raw), "declared_total": declared,
             "rendered_cards": len(s.select("#grid article.card"))}
    check["ok"] = bool(declared) and declared == len(entries_raw) and check["rendered_cards"] > 0

    records = []
    for i, x in enumerate(entries_raw):
        yt = []
        for k, v in x.items():
            if k.lower().endswith("src") and isinstance(v, list):
                for pair in v:
                    m = YT.search(pair[1]) if len(pair) > 1 else None
                    if m and m.group(1) not in yt:
                        yt.append(m.group(1))
        records.append({
            "rid": f"{src['id']}:{i + 1}", "source": src["id"], "order": i,
            "title": x["t"], "subtitle": x.get("sub", ""), "year": x.get("y", ""), "format": x["f"],
            "meta": x["m"], "categories": list(x["c"]),
            "mechanism": x.get("mec", ""), "confidence_flag": x.get("flag", ""), "summary": x["s"],
            "character": x.get("ch", ""), "provenance": x.get("prov", ""), "note": x.get("note", ""),
            "sources": [{"label": a, "url": b} for a, b in x.get("src", [])],
            "youtube_ids": yt, "raw": x})

    idx = defaultdict(list)
    for r in records:
        idx[(r["title"].strip(), r["subtitle"].strip())].append(r)
    sections, cur, used, unmatched = [], None, defaultdict(set), 0
    for el in s.select_one("#grid").children:
        if not getattr(el, "name", None):
            continue
        cl = el.get("class") or []
        if "category-heading" in cl:
            t = el.find("h2").get_text(strip=True); p = el.find("p")
            cur = {"title": t, "category": lab2key.get(t), "description": p.get_text(" ", strip=True) if p else "",
                   "notes": [], "groups": [], "from_sources": [src["id"]]}
            sections.append(cur)
        elif cur is None:
            continue
        elif "subcategory-heading" in cl:
            cur["groups"].append({"title": el.get_text(strip=True), "items": [], "notes": []})
        elif "category-note" in cl:
            cur["notes"].append({"html": el.decode_contents().strip(), "text": el.get_text(" ", strip=True),
                                 "source": src["id"]})
        elif el.name == "article":
            if not cur["groups"]:
                cur["groups"].append({"title": None, "items": [], "notes": []})
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

            def score(r):
                sc = 4 if (r["year"] or "") == yr else 0
                sc += 2 if cur["category"] in r["categories"] else 0
                sc += 3 if r["summary"].strip() == summ else 0
                return sc - (10 if r["rid"] in used[cur["title"]] else 0)
            best = max(cands, key=score)
            used[cur["title"]].add(best["rid"])
            item = {"rid": best["rid"], "summary": summ,
                    "tags": [t.get_text(" ", strip=True) for t in el.select(".tags .tag")],
                    "sources": [{"label": a.get_text(strip=True).replace("↗", "").strip(), "url": a.get("href")}
                                for a in el.select(".sources a")],
                    "year_display": yr}
            for cls in ("provenance", "character", "entry-note"):
                pp = el.select_one("p." + cls)
                if pp:
                    item[cls.replace("-", "_")] = pp.get_text(" ", strip=True)
            cur["groups"][-1]["items"].append(item)
    check["unmatched_cards"] = unmatched

    intro, snap, notes = s.select_one(".intro"), s.select_one(".snapshot"), s.select_one(".research-notes")
    footer = s.select_one("footer span")
    style = s.find("style")
    meta = {
        "id": src["id"], "label": src["label"], "kind": "full", "share_url": src["url"],
        "page_title": s.title.get_text(strip=True) if s.title else "",
        "kicker": intro.select_one(".kicker").get_text(strip=True),
        "heading": intro.find("h1").get_text(" ", strip=True),
        "description": intro.select_one(".dek").get_text(" ", strip=True),
        "snapshot_label": footer.get_text(" ", strip=True) if footer else "",
        "snapshot_breakdowns": [{"html": b.decode_contents().strip(), "text": b.get_text(" ", strip=True)}
                                for b in snap.select(".breakdown")] if snap else [],
        "research_notes_html": notes.decode_contents().strip() if notes else "",
        "notice_on_share_page": "Content is user generated and unverified.",
    }
    categories = [{"key": k, "label": v, "legend_label": legend.get(k, v)} for k, v in cats.items()]
    formats = [{"key": o["value"], "label": o.get_text()} for o in s.select("#format option") if o["value"] != "all"]
    return {"meta": meta, "check": check, "records": records, "sections": sections,
            "categories": categories, "formats": formats, "css": style.get_text() if style else "",
            "label_to_key": lab2key}


def parse_index(src, payload, label_to_key):
    """Title index page. Two layouts are supported:
       v1: `categories` groups list bare titles; the page shows "N named catalog entries".
       v2: adds `detailedRecords` (records with plot details) and builds its own de-duplicated
           `records`; the page shows "N unique named titles".
    Raw records = every detailed record + every listed title (before any de-duplication)."""
    results = payload.get("results", "")
    m = re.search(r"([\d,]+)\s+(?:unique\s+)?named\s", results)
    declared = int(m.group(1).replace(",", "")) if m else None
    m2 = re.search(r"([\d,]+)\s+records in source snapshot", results)
    cat_key = {c["n"]: (label_to_key.get(c["title"]) or "index-" + str(c["n"])) for c in payload["categories"]}
    records, n = [], 0
    sections = {c["n"]: {"title": c["title"], "category": cat_key[c["n"]], "description": c.get("desc", ""),
                         "declared_count": c.get("count"), "notes": [], "groups": [], "from_sources": [src["id"]]}
                for c in payload["categories"]}
    def group_of(cn, name):
        sec = sections[cn]
        for g in sec["groups"]:
            if g["title"] == (name or None):
                return g
        g = {"title": name or None, "items": [], "notes": []}
        sec["groups"].append(g)
        return g
    def add(raw_title, year, meta, cn, group, extra, raw):
        nonlocal n
        n += 1
        title, pyear, _ = split_index_title(raw_title)
        r = {"rid": f"{src['id']}:{n}", "source": src["id"], "order": n - 1, "title": title,
             "subtitle": extra.get("subtitle", ""), "year": year or pyear,
             "format": INDEX_FORMATS.get(infer_index_format(raw_title, group or ""), "movie"), "meta": meta,
             "categories": [cat_key[cn]], "mechanism": "", "confidence_flag": extra.get("confidence", ""),
             "summary": extra.get("summary", ""), "character": extra.get("character", ""),
             "provenance": extra.get("provenance", ""), "note": extra.get("note", ""),
             "sources": extra.get("sources", []), "youtube_ids": [], "index_title": raw_title, "raw": raw}
        for s_ in r["sources"]:
            mm = YT.search(s_["url"])
            if mm and mm.group(1) not in r["youtube_ids"]:
                r["youtube_ids"].append(mm.group(1))
        records.append(r)
        group_of(cn, group)["items"].append({"rid": r["rid"], "tags": extra.get("tags", []), "index_title": raw_title})
    # sections keep the page's category/group order; detailed records are placed in their subgroup
    for c in payload["categories"]:
        for g in c["groups"]:
            grp = group_of(c["n"], g["name"])
            if g.get("note"):
                grp["notes"].append({"text": g["note"], "source": src["id"]})
    back = [{"label": "Original catalog", "url": payload["SOURCE"]}] if payload.get("SOURCE") else []
    for d in payload.get("detailedRecords") or []:
        if d.get("cat") not in sections:
            continue
        year = d.get("year", "")
        if year in ("Year unverified", "Date unverified"):
            year = ""
        add(d["title"], year, d.get("meta", ""), d["cat"], d.get("subgroup", ""),
            {"summary": d.get("summary", ""), "note": d.get("note", ""), "character": d.get("character", ""),
             "provenance": d.get("provenance", ""), "subtitle": d.get("subtitle", ""), "tags": d.get("tags", []),
             "sources": [{"label": x.get("name", ""), "url": x["url"]} for x in d.get("sources", []) if x.get("url")]},
            {"detailed": d})
    n_detailed = n
    for c in payload["categories"]:
        for g in c["groups"]:
            for t in g["items"]:
                add(t, "", infer_index_format(t, g["name"]), c["n"], g["name"],
                    {"confidence": g.get("confidence", ""), "tags": [g.get("confidence", ""), g["name"]],
                     "sources": back},
                    {"title": t, "category": c["title"], "group": g["name"], "confidence": g.get("confidence", ""),
                     "note": g.get("note", "")})
    for sec in sections.values():   # drop empty groups that carry no note
        sec["groups"] = [g for g in sec["groups"] if g["items"] or g["notes"]]
    page_total = payload.get("page_records")
    check = {"layout": "v2" if payload.get("detailedRecords") is not None else "v1",
             "raw_count": n, "raw_detailed_records": n_detailed, "raw_title_items": n - n_detailed,
             "declared_named": declared, "page_records": page_total, "rendered_cards": payload.get("cards"),
             "declared_snapshot_total": int(m2.group(1).replace(",", "")) if m2 else None}
    if page_total is not None:   # v2: the page de-duplicates itself; its own list must be fully rendered
        check["ok"] = bool(declared) and declared == page_total == payload.get("cards") and n >= declared
    else:                        # v1: one card per listed title
        check["ok"] = bool(declared) and declared == n == payload.get("cards")
    meta = {"id": src["id"], "label": src["label"], "kind": "index", "share_url": src["url"],
            "page_title": payload.get("title", ""), "kicker": payload.get("kicker", "").strip(),
            "heading": payload.get("heading", "").strip(), "description": payload.get("lede", "").strip(),
            "results_text": results.strip(), "links_back_to": payload.get("SOURCE", ""),
            "stats": payload.get("stats", []), "boundaries": payload.get("boundaries", []),
            "categories": [{"n": c["n"], "title": c["title"], "declared_count": c.get("count")}
                           for c in payload["categories"]]}
    return {"meta": meta, "check": check, "records": records, "sections": list(sections.values())}


def parse_local(src, payload, known_labels):
    """Hand-curated local source: {"records": [...], "group_title": ...}. Every record carries its own
    categories (existing category keys). A section group per category places the records on the page."""
    records, sections = [], {}
    for i, x in enumerate(payload["records"]):
        r = {"rid": f"{src['id']}:{i + 1}", "source": src["id"], "order": i, "title": x["title"],
             "subtitle": x.get("subtitle", ""), "year": x.get("year", ""), "format": x.get("format", "movie"),
             "meta": x.get("meta", ""), "categories": list(x.get("categories", [])),
             "mechanism": x.get("mechanism", ""), "confidence_flag": x.get("confidence_flag", ""),
             "summary": x.get("summary", ""), "character": x.get("character", ""),
             "provenance": x.get("provenance", ""), "note": x.get("note", ""),
             "sources": [{"label": s_["label"], "url": s_["url"]} for s_ in x.get("sources", []) if s_.get("url")],
             "youtube_ids": [], "match_title": x.get("match_title", ""),
             "match_year": x.get("match_year", ""), "raw": x}
        for f in OPTIONAL_FIELDS:      # e.g. pregnancy outcome; only local sources carry these
            if x.get(f):
                r[f] = x[f]
        for s_ in r["sources"]:
            mm = YT.search(s_["url"])
            if mm and mm.group(1) not in r["youtube_ids"]:
                r["youtube_ids"].append(mm.group(1))
        records.append(r)
        for c in r["categories"]:
            sec = sections.setdefault(c, {"title": known_labels.get(c) or payload.get("category_labels", {}).get(c, c), "category": c, "description": "",
                                          "notes": [], "from_sources": [src["id"]], "groups": []})
            # a record may name its own plot sub-group ("group"); otherwise the source's group title is used
            gt = x.get("group") or payload.get("group_title") or src["label"]
            grp = next((g for g in sec["groups"] if g["title"] == gt), None)
            if grp is None:
                grp = {"title": gt, "items": [], "notes": []}
                sec["groups"].append(grp)
            grp["items"].append({"rid": r["rid"]})
    check = {"raw_count": len(records), "ok": bool(records)}
    meta = {"id": src["id"], "label": src["label"], "kind": "local", "share_url": src["local"],
            "description": payload.get("description", ""), "dropped": payload.get("dropped", [])}
    return {"meta": meta, "check": check, "records": records, "sections": list(sections.values())}


# --------------------------------------------------------------------------- de-duplication
def dedupe(records):
    """Group records that share a normalized title key and a compatible year.

    Key = norm_title(title) + first 4-digit year. Two records are duplicates when their
    normalized titles match and their years match, or when either has no year (a same-name
    remake from a different year stays separate). A record without a year joins the earliest
    group of that title. Records of title-only index sources that do not match exactly are
    then matched with looser alias keys (episode/qualifier stripped, alternate titles split on
    ' / ', leading 'The' dropped, unique title prefix) against groups that contain a
    full-catalog record. Returns a list of groups (lists of records), in a deterministic order.
    """
    groups = []            # list of {"title": key, "years": set, "members": [...]}
    by_title = defaultdict(list)

    def add(rec, title_key):
        yk = year_key(rec["year"])
        for g in by_title[title_key]:
            if yk and g["years"] and yk not in g["years"]:
                continue
            if yk and not g["years"]:
                continue   # yeared records are grouped first; no-year groups only collect no-year records
            g["members"].append(rec)
            if yk:
                g["years"].add(yk)
            return g
        g = {"title": title_key, "years": {yk} if yk else set(), "members": [rec], "via": {}}
        groups.append(g); by_title[title_key].append(g)
        return g

    full = [r for r in records if r["kind"] == "full"]
    index = [r for r in records if r["kind"] == "index"]
    # pass 1: full-catalog records with a year, then without (attach to the earliest same-title group)
    for r in full:
        if year_key(r["year"]):
            add(r, norm_title(r["title"]))
    for r in full:
        if not year_key(r["year"]):
            cands = by_title.get(norm_title(r["title"]))
            if cands:
                cands[0]["members"].append(r)
            else:
                add(r, norm_title(r["title"]))
    # pass 2: index records -> exact key, then alias keys, then unique prefix; else their own group
    alias = defaultdict(list)
    for g in groups:
        for m in g["members"]:
            for k in alias_keys(m["title"]) + alias_keys(m["title"] + " " + m["subtitle"]):
                if g not in alias[k]:
                    alias[k].append(g)
    all_alias_keys = sorted(alias)

    def compatible(g, yk):   # index titles may cite any year of a multi-year run ("1998–99 / 2019–20")
        ys = set().union(*(all_years(m["year"]) for m in g["members"]))
        return not yk or not ys or yk in ys

    def pick(cands, rec):
        if len(cands) == 1:
            return cands[0]
        qs = quoted_parts(rec["index_title"])
        qual = norm_title(rec["index_title"].split(" — ", 1)[1].split(",")[0]) if " — " in rec["index_title"] else ""
        def rank(g):
            text = " ".join(norm_title(m["title"] + " " + m["subtitle"]) for m in g["members"])
            return (0 if qs and any(q in text for q in qs) else 1,
                    0 if qual and qual in text else 1,
                    0 if year_key(rec["year"]) and year_key(rec["year"]) in g["years"] else 1,
                    min(len(norm_title(m["title"])) for m in g["members"]),
                    min(m["order"] for m in g["members"] if m["kind"] == "full"))
        return sorted(cands, key=rank)[0]

    index_only = []
    for r in index:
        yk = year_key(r["year"])
        tk = norm_title(r["title"])
        cands = [g for g in by_title.get(tk, [])
                 if compatible(g, yk) and any(m["kind"] == "full" for m in g["members"])]
        via = "title+year"
        if not cands:
            via = "alias"
            for k in alias_keys(r["title"]):
                cands = [g for g in alias.get(k, []) if compatible(g, yk)]
                if cands:
                    break
        if not cands:
            via = "prefix"
            seen = []
            for k in alias_keys(r["title"]):
                if len(k) < 4:
                    continue
                for ak in all_alias_keys:
                    if ak != k and (ak.startswith(k + " ") or ak.startswith(k + ":") or ak.startswith(k + " -")
                                    or (len(ak) >= 6 and k.startswith(ak + " "))):
                        for g in alias[ak]:
                            if compatible(g, yk) and g not in seen:
                                seen.append(g)
            cands = seen
        if cands:
            g = pick(cands, r)
            g["members"].append(r)
            g["via"][r["rid"]] = via
            if yk:
                g["years"].add(yk)
        else:
            index_only.append(r)
    # index-only records: dedupe among themselves with the same title+year rule
    for r in index_only:
        if year_key(r["year"]):
            add(r, "index:" + norm_title(r["title"]))
    for r in index_only:
        if not year_key(r["year"]):
            cands = by_title.get("index:" + norm_title(r["title"]))
            if cands:
                cands[0]["members"].append(r)
            else:
                add(r, "index:" + norm_title(r["title"]))
    # pass 3: local (hand-curated) records -> explicit match_title or exact title+year against any group,
    # then alias keys against full-catalog groups; otherwise their own group (no prefix matching)
    for r in [r for r in records if r["kind"] == "local"]:
        if r["raw"].get("standalone"):   # curated record that is a distinct work despite a shared title/alias
            add(r, "local:" + norm_title(r["title"]))
            continue
        # "match_year" lets a curated record name the existing entry's year (e.g. a series-wide record
        # whose range covers one storyline entry, or a release-year difference); its own year is kept
        yk = year_key(r.get("match_year") or r["year"])
        tk = norm_title(r["match_title"] or r["title"])
        via = "match_title" if r["match_title"] else "title+year"
        cands = [g for g in by_title.get(tk, []) + by_title.get("index:" + tk, []) + by_title.get("local:" + tk, [])
                 if compatible(g, yk)]
        if not cands and not r["match_title"]:
            via = "alias"
            for k in alias_keys(r["title"]):
                cands = [g for g in alias.get(k, []) if compatible(g, yk)]
                if cands:
                    break
        if cands:
            g = sorted(cands, key=lambda g: (not any(m["kind"] == "full" for m in g["members"]),
                                             0 if yk and yk in g["years"] else 1,
                                             min((m["source_rank"], m["order"]) for m in g["members"])))[0]
            g["members"].append(r)
            g["via"][r["rid"]] = via
            if yk:
                g["years"].add(yk)
        else:
            add(r, "local:" + norm_title(r["title"]))
    return groups


FILL_FIELDS = ("subtitle", "year", "meta", "mechanism", "confidence_flag", "summary", "character",
               "provenance", "note")
STORY_FIELDS = ("subtitle", "mechanism", "summary", "character", "note")
# optional fields only some (local) sources carry; filled from the first member that has them, and only
# written to an entry when present, so entries without them are unchanged
OPTIONAL_FIELDS = ("pregnancy_outcome", "pregnancy_note", "pregnancy_highlight", "pregnant_has_children",
                   "episodes", "tags", "hypnotist", "gain_motive", "method", "kids_status", "kids_note",
                   "kids_together", "kids_together_note", "married", "married_note", "pregnant_end",
                   "pregnant_end_note", "evidence", "source_conflict", "fit_note", "child_witness")
# list-valued optional fields are unioned across all merged copies (in primary-first, source order)
UNION_FIELDS = ("episodes", "tags")


def norm_summary(t):
    return re.sub(r"\W+", " ", unicodedata.normalize("NFKC", t or "").casefold()).strip()


def copy_label(m):
    """The identifier a source gives one copy: its own title as listed (episode titles, alternate titles
    and " — qualifier" tags included), subtitle (season/episode, segment, storyline) and year/date."""
    t = m.get("index_title") or m["title"]
    lab = t + (" · " + m["subtitle"] if m["subtitle"] else "")
    if m["year"] and m["year"] not in t:
        lab += f" ({m['year']})"
    return lab


def copy_info(m, primary, g, members):
    """Everything one merged copy says about itself, for the card's 'Merged copies' list."""
    shown_title = m.get("index_title") or m["title"]
    ident = []
    if m["subtitle"]:
        ident.append("subtitle")
    if m["year"]:
        ident.append("year/date")
    bare = re.sub(r"\s*\((?:1[89]|20)\d\d[^)]*\)", "", shown_title)
    if norm_title(bare) != norm_title(primary["title"]) or (
            m.get("index_title") and re.search(r" — |\((?!(?:1[89]|20)\d\d[–\d-]*\))|“|\"|\bS\d+E\d+", m["index_title"])):
        ident.append("own title/qualifier")
    srcs = [x for x in m["sources"]
            if not (m["kind"] == "index" and x["url"] in SHARE_URLS and any(y["kind"] == "full" for y in members))]
    out = {"rid": m["rid"], "source": m["source"], "label": copy_label(m), "identifiers": ident}
    out |= {k: m[k] for k in ("title", "subtitle", "year", "meta", "summary", "character", "note", "mechanism",
                              "confidence_flag", "categories")}
    out["sources"] = srcs
    out |= {f: m[f] for f in OPTIONAL_FIELDS if m.get(f)}
    out["distinct_story"] = bool(m["summary"]) and bool(primary["summary"]) and \
        norm_summary(m["summary"]) != norm_summary(primary["summary"])
    if m.get("index_title"):
        out["index_title"] = m["index_title"]
    if m["rid"] in g["via"]:
        out["matched_by"] = g["via"][m["rid"]]
    return out


# A local record may list "override_fields" (a subset of OPTIONAL_FIELDS): for those fields its value takes
# precedence over earlier sources (normally the primary / earliest copy wins). Overriding a value field also
# takes its paired note from the same record, so a value is never shown with another source's note.
NOTE_FIELD = {"pregnancy_outcome": "pregnancy_note", "pregnant_end": "pregnant_end_note", "kids_status": "kids_note",
              "kids_together": "kids_together_note", "married": "married_note"}
CONFLICT_FIELDS = {"pregnancy_outcome": "Pregnancy outcome", "pregnant_end": "Pregnant by the end",
                   "kids_status": "Already has children", "kids_together": "Kids together", "married": "Marries her",
                   "pregnant_has_children": "Already has children (pregnancy research)"}


def overrides(m):
    raw = m.get("raw")
    fs = list(raw.get("override_fields") or []) if m["kind"] == "local" and isinstance(raw, dict) else []
    return fs + [NOTE_FIELD[f] for f in fs if f in NOTE_FIELD]


def polarity(v):
    """'yes' / 'no' for a definite pregnancy / kids / married value, None for a non-answer."""
    v = str(v).strip().casefold()
    if not v or v.startswith(("unknown", "not stated")) or "unconfirmed" in v:
        return None
    if v.startswith(("no", "not pregnant")):
        return "no"
    return "yes"


def value_conflicts(members):
    """Copies that give opposite definite answers for one field, unless a curated record overrides the field."""
    out = []
    for f, label in CONFLICT_FIELDS.items():
        if any(f in overrides(m) for m in members):
            continue
        seen = {}
        for m in sorted(members, key=lambda m: (m["source_rank"], m["order"])):
            pol = polarity(m.get(f) or "")
            if pol:
                seen.setdefault(pol, []).append(f"{m['source']} says “{m[f]}”")
        if len(seen) > 1:
            out.append(f"{label}: " + "; ".join(seen["yes"] + seen["no"]))
    return out


def load_merge_rules():
    p = os.path.join(HERE, "..", "sources", "merge-rules.json")
    if not os.path.exists(p):
        return []
    with open(p, encoding="utf-8") as f:
        return json.load(f).get("rules", [])


def apply_merge_rules(groups, rules):
    """Explicit duplicate merges (sources/merge-rules.json) for copies the title+year rule cannot join (different
    title spelling or year). The absorbed group's records join the kept group and can never become its primary; the
    absorbed group keeps its slot in the numbering, so its ID is retired and no other ID shifts."""
    def find(spec, exclude=None):
        tk, yk = norm_title(spec["title"]), year_key(spec.get("year", ""))
        return [g for g in groups if g is not exclude and not g.get("_absorbed_into")
                and any(norm_title(m["title"]) == tk and year_key(m["year"]) == yk for m in g["members"])]
    log = []
    for rule in rules:
        keep = find(rule["keep"])
        absorb = find(rule["absorb"], exclude=keep[0] if len(keep) == 1 else None)
        entry = {"keep": rule["keep"], "absorb": rule["absorb"]}
        if len(keep) != 1 or len(absorb) != 1:
            entry |= {"status": "not applied", "keep_matches": len(keep), "absorb_matches": len(absorb)}
            print(f"[sync] WARNING merge rule not applied: {entry}", file=sys.stderr)
            log.append(entry); continue
        a, b = keep[0], absorb[0]
        for m in b["members"]:
            m["_absorbed"] = True
            a["via"].setdefault(m["rid"], "merge rule")
        a["members"].extend(b["members"]); a["years"] |= b["years"]
        b["_absorbed_into"] = a
        a.setdefault("_rules", []).append(rule)
        entry |= {"status": "applied", "_a": a, "_b": b}
        log.append(entry)
    return log


def merge_group(g, new_id):
    members = g["members"]
    # primary: full-catalog record before index record before local (hand-curated) record; with a year
    # before without; then source order. A local record therefore never replaces an existing primary.
    primary = sorted(members, key=lambda m: (m.get("_absorbed", False), m["kind"] != "full", m["kind"] == "local",
                                             not year_key(m["year"]), m["source_rank"], m["order"]))[0]
    rec = {"id": new_id, "title": primary["title"]}
    # Episode/storyline-specific fields are only filled from a copy that tells the same story (same
    # summary, or the copy that supplies the summary when the primary has none), so a character or
    # note from a different episode is never attached to the primary's plot.
    psum = norm_summary(primary["summary"])
    donor = primary if psum else next((m for m in members if m["summary"]), None)
    same_story = [m for m in members if m is primary or m is donor or (psum and norm_summary(m["summary"]) == psum)]
    for f in FILL_FIELDS:
        pool = same_story if f in STORY_FIELDS else members
        rec[f] = primary[f] or next((m[f] for m in pool if m[f]), "")
    for f in OPTIONAL_FIELDS:
        ordered = sorted(members, key=lambda m: (f not in overrides(m), m is not primary, m["source_rank"], m["order"]))
        if f in NOTE_FIELD.values() and any(f in overrides(m) for m in members):
            v = next((m.get(f) for m in ordered if f in overrides(m)), None)   # note goes with its overridden value
            if v:
                rec[f] = v
            continue
        if f in UNION_FIELDS:
            vals, ep_keys = [], set()
            for m in ordered:
                for v in m.get(f) or []:
                    # the same episode listed by two copies (same number/title, different date or gist
                    # wording) is shown once on the card; each copy keeps its own line under "Merged copies"
                    ek = norm_title(v.get("episode", "")) if f == "episodes" and isinstance(v, dict) else None
                    if v not in vals and not (ek and ek in ep_keys):
                        vals.append(v)
                        if ek:
                            ep_keys.add(ek)
            if vals:
                rec[f] = vals
            continue
        v = next((m[f] for m in ordered if m.get(f)), None)
        if v:
            rec[f] = v
    conflicts = value_conflicts(members)
    if conflicts:
        rec["source_conflict"] = " · ".join(([rec["source_conflict"]] if rec.get("source_conflict") else []) + conflicts)
    rec["format"] = primary["format"]
    rec["categories"] = []
    rec["sources"], seen_urls = [], set()
    rec["youtube_ids"] = []
    for m in sorted(members, key=lambda m: (m is not primary, m["source_rank"], m["order"])):
        for c in m["categories"]:
            if c not in rec["categories"]:
                rec["categories"].append(c)
        for s in m["sources"]:
            if m["kind"] == "index" and s["url"] in SHARE_URLS and any(x["kind"] == "full" for x in members):
                continue   # the index's generic "Original catalog" back-link adds nothing to a full record
            if s["url"] not in seen_urls:
                seen_urls.add(s["url"]); rec["sources"].append(s)
        for v in m["youtube_ids"]:
            if v not in rec["youtube_ids"]:
                rec["youtube_ids"].append(v)
    rec["from_sources"] = sorted({m["source"] for m in members}, key=lambda s: SOURCE_RANK[s])
    rec["source_records"] = [m["rid"] for m in sorted(members, key=lambda m: (m["source_rank"], m["order"]))]
    rec["index_only"] = all(m["kind"] == "index" for m in members)
    rec["local_only"] = all(m["kind"] == "local" for m in members)
    rec["thumbnail"] = None
    others = [m for m in sorted(members, key=lambda m: (m["source_rank"], m["order"])) if m is not primary]
    rec["primary_copy"] = copy_info(primary, primary, g, members) if others else None
    rec["merged_from"] = [copy_info(m, primary, g, members) for m in others]
    rec["raw"] = {m["rid"]: m["raw"] for m in members}
    return rec, primary


SOURCE_RANK = {s["id"]: i for i, s in enumerate(SOURCES)}
SHARE_URLS = {s["url"] for s in SOURCES if s.get("url")}


def build(parsed):
    """parsed: {source_id: parse_full/parse_index result}. Returns (data, report, css)."""
    full_id = SOURCES[0]["id"]
    records = []
    for sid, p in parsed.items():
        for r in p["records"]:
            r["kind"] = p["meta"]["kind"]; r["source_rank"] = SOURCE_RANK[sid]
            records.append(r)
    records.sort(key=lambda r: (r["source_rank"], r["order"]))
    groups = dedupe(records)
    # deterministic ordering: groups with full-catalog records by their first full record, then index-only
    groups.sort(key=lambda g: min((m["source_rank"], m["order"]) for m in g["members"]))
    entries, rid_to_id, n_full = [], {}, 0
    for g in groups:
        g["_has_full"] = any(m["kind"] == "full" for m in g["members"])
    merge_log = apply_merge_rules(groups, load_merge_rules())
    for g in groups:
        if g["_has_full"]:
            n_full += 1
    next_full, next_idx = 0, n_full
    report = {"rule": inspect.cleandoc(dedupe.__doc__), "merged_groups": []}
    for g in groups:
        has_full = g["_has_full"]
        if has_full:
            next_full += 1; new_id = next_full
        else:
            next_idx += 1; new_id = next_idx
        g["_id"] = new_id
        if g.get("_absorbed_into"):
            continue      # retired ID: this card was merged into another one by a merge rule
        rec, primary = merge_group(g, new_id)
        for rule in g.get("_rules", []):
            for k in ("title", "subtitle"):
                if rule.get(k):
                    rec[k] = rule[k]
            note = rule.get("conflict_note")
            if note and note not in (rec.get("source_conflict") or ""):
                rec["source_conflict"] = (rec["source_conflict"] + " · " if rec.get("source_conflict") else "") + note
        entries.append(rec)
        for m in g["members"]:
            rid_to_id[m["rid"]] = new_id
        if len(g["members"]) > 1:
            kinds = {m["source"] for m in g["members"]}
            report["merged_groups"].append({
                "kept_id": new_id, "kept": f"{primary['title']} ({primary['year'] or 'no year'})",
                "scope": "cross-source" if len(kinds) > 1 else "within-source",
                "members": [{"rid": m["rid"], "title": m.get("index_title") or m["title"], "subtitle": m["subtitle"],
                             "year": m["year"], **({"matched_by": g["via"][m["rid"]]} if m["rid"] in g["via"] else {})}
                            for m in sorted(g["members"], key=lambda m: (m["source_rank"], m["order"]))]})
    entries.sort(key=lambda e: e["id"])
    by_id = {e["id"]: e for e in entries}
    for x in merge_log:
        if "_a" in x:
            kept = by_id[x["_a"]["_id"]]
            kept.setdefault("retired_ids", []).append(x["_b"]["_id"])
            for m in x["_b"]["members"]:
                ty = {"title": m["title"], "year": m["year"]}
                if ty not in kept.setdefault("absorbed_titles", []):
                    kept["absorbed_titles"].append(ty)
    report["merge_rules"] = [{k: v for k, v in x.items() if not k.startswith("_")} |
                             ({"kept_id": x["_a"]["_id"], "retired_id": x["_b"]["_id"]} if "_a" in x else {})
                             for x in merge_log]

    # ---- sections: full catalog layout first, index sections merged in by category key
    full = parsed[full_id]
    sections = []
    def add_items(sec_groups, seen, items):
        out = []
        for it in items:
            nid = rid_to_id[it["rid"]]
            if nid in seen:
                continue      # never show the same record twice inside one section
            seen.add(nid)
            e = by_id[nid]
            app = {"id": nid}
            for k, v in it.items():
                if k == "rid":
                    continue
                if k == "summary" and v == e["summary"]:
                    continue
                if k == "year_display" and v == e["year"]:
                    continue
                if k == "sources" and v == e["sources"]:
                    continue
                app[k] = v
            app["from_source"] = it["rid"].split(":")[0]
            out.append(app)
        return out
    sec_by_cat = {}
    for sec in full["sections"]:
        seen = set()
        ns = {k: v for k, v in sec.items() if k != "groups"}
        ns["notes"] = list(sec["notes"]); ns["groups"] = []
        for grp in sec["groups"]:
            ns["groups"].append({"title": grp["title"], "notes": list(grp["notes"]),
                                 "items": add_items(None, seen, grp["items"])})
        ns["_seen"] = seen
        sections.append(ns)
        if ns["category"] and ns["category"] not in sec_by_cat:
            sec_by_cat[ns["category"]] = ns
    for sid, p in parsed.items():
        if sid == full_id:
            continue
        prev = None
        for sec in p["sections"]:
            target = sec_by_cat.get(sec["category"])
            if target is None:   # category the full catalog has no section for: insert after the previous one
                target = {k: v for k, v in sec.items() if k not in ("groups", "declared_count")}
                target["declared_count_by_source"] = {sid: sec.get("declared_count")}
                target["notes"] = list(sec["notes"]); target["groups"] = []; target["_seen"] = set()
                pos = sections.index(prev) + 1 if prev in sections else len(sections)
                sections.insert(pos, target); sec_by_cat[sec["category"]] = target
            else:
                if sid not in target["from_sources"]:
                    target["from_sources"] = target["from_sources"] + [sid]
                target.setdefault("declared_count_by_source", {})[sid] = sec.get("declared_count")
            for grp in sec["groups"]:
                gk = norm_title(grp["title"] or "")
                tg = next((x for x in target["groups"] if norm_title(x["title"] or "") == gk), None)
                if tg is None:
                    tg = {"title": grp["title"], "notes": [], "items": [], "from_source": sid}
                    target["groups"].append(tg)
                tg["items"].extend(add_items(None, target["_seen"], grp["items"]))
                for n in grp["notes"]:
                    n = dict(n, group=grp["title"])
                    if tg["items"]:
                        if n not in tg["notes"]:
                            tg["notes"].append(n)
                    elif n not in target["notes"]:
                        target["notes"].append(n)   # the group added no new records: keep its note on the section
                if not tg["items"] and not tg["notes"] and tg.get("from_source") == sid:
                    target["groups"].remove(tg)
            prev = target
    # records that no section places anywhere
    placed = set().union(*(s["_seen"] for s in sections))
    for s in sections:
        del s["_seen"]
    unplaced = [e["id"] for e in entries if e["id"] not in placed]

    # ---- categories (full catalog definitions + any index-only categories)
    cats = [dict(c) for c in full["categories"]]
    known = {c["key"] for c in cats}
    for sid, p in parsed.items():
        if sid == full_id:
            continue
        for sec in p["sections"]:
            if sec["category"] not in known:
                cats.append({"key": sec["category"], "label": sec["title"], "legend_label": sec["title"]})
                known.add(sec["category"])
    for c in cats:
        c["entry_count"] = sum(1 for e in entries if c["key"] in e["categories"])

    src_meta = []
    for s in SOURCES:
        if s["id"] in parsed:
            m = dict(parsed[s["id"]]["meta"]); m["check"] = parsed[s["id"]]["check"]
            m["status"] = parsed[s["id"]].get("status", "live")
            src_meta.append(m)
    raw_counts = {sid: p["check"]["raw_count"] for sid, p in parsed.items()}
    # ---- display order: categories and sections A-Z by display name, records A-Z within each group
    cats.sort(key=lambda c: (sort_name(c["label"]), c["key"]))
    sections.sort(key=lambda sec: (sort_name(sec["title"]), sec["category"] or ""))
    for sec in sections:
        for grp in sec["groups"]:
            grp["items"].sort(key=lambda it: entry_sort_key(by_id[it["id"]]))
    data = {
        "source": full["meta"],
        "sources": src_meta,
        "raw_counts": raw_counts,
        "raw_total": sum(raw_counts.values()),
        "entry_count": len(entries),
        "categories": cats,
        "formats": full["formats"],
        "entries": entries,
        "sections": sections,
        "unplaced_entry_ids": unplaced,
    }
    report["raw_counts"] = raw_counts
    report["entry_count_after_dedupe"] = len(entries)
    report["within_source_groups"] = sum(1 for g in report["merged_groups"] if g["scope"] == "within-source")
    report["cross_source_groups"] = sum(1 for g in report["merged_groups"] if g["scope"] == "cross-source")
    report["index_only_records"] = sum(1 for e in entries if e["index_only"])
    report["local_only_records"] = sum(1 for e in entries if e["local_only"])
    return data, report, full["css"]


# --------------------------------------------------------------------------- output
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
    for name in sorted(os.listdir(tdir)):
        if name not in wanted:
            os.remove(os.path.join(tdir, name))


def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if isinstance(content, bytes):
        with open(path, "wb") as f:
            f.write(content)
    else:
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)


def dumps(obj):
    return json.dumps(obj, ensure_ascii=False, indent=1) + "\n"


WATCH_LINKS = "sources/watch-links.json"
WATCH_FIELDS = ("service", "url", "region", "channel", "note", "verified_via", "checked")


def apply_watch_links(data, out):
    """Overlay curated free/legal 'Watch free' links (sources/watch-links.json) onto entries by exact
    title + year. The file is hand-curated and never scraped or overwritten; a link whose title/year no
    longer matches an entry is skipped (and logged), never re-targeted."""
    path = os.path.join(out, WATCH_LINKS)
    if not os.path.exists(path):
        path = os.path.join(os.path.dirname(HERE), WATCH_LINKS)
    if not os.path.exists(path):
        return
    with open(path, encoding="utf-8") as f:
        recs = json.load(f).get("records", [])
    by_key = defaultdict(list)
    for e in data["entries"]:
        by_key[(e["title"], e.get("year", ""))].append(e)
    for e in data["entries"]:      # a card absorbed by a merge rule (sources/merge-rules.json) keeps its links
        for ty in e.get("absorbed_titles", []):
            if (ty["title"], ty["year"]) not in by_key:
                by_key[(ty["title"], ty["year"])].append(e)
    hit = miss = 0
    for r in recs:
        targets = by_key.get((r.get("title", ""), r.get("year", "")), [])
        if len(targets) != 1:
            miss += 1
            continue
        e = targets[0]
        cur = e.setdefault("watch_links", [])
        for l in r.get("links", []):
            if l.get("url") and not any(c["url"] == l["url"] for c in cur):
                cur.append({k: l[k] for k in WATCH_FIELDS if l.get(k)})
        hit += 1
    data["watch_links_count"] = sum(1 for e in data["entries"] if e.get("watch_links"))
    log(f"watch-links: {hit} records applied, {miss} unmatched; {data['watch_links_count']} entries have links")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", default=os.path.dirname(HERE), help="repo/site root (default: repo root)")
    args = ap.parse_args()
    out = os.path.abspath(args.out)

    parsed, files_by_source, problems = {}, {}, []
    label_to_key = None
    for src in SOURCES:
        if src.get("local"):
            path = os.path.join(out, src["local"])
            if not os.path.exists(path):
                path = os.path.join(os.path.dirname(HERE), src["local"])
            try:
                with open(path, encoding="utf-8") as f:
                    known = {c["key"]: c["label"] for c in parsed[SOURCES[0]["id"]]["categories"]}
                    result = parse_local(src, json.load(f), known)
                result["status"] = "local"
                parsed[src["id"]] = result
                log(f"{src['id']}: local file {src['local']} check={json.dumps(result['check'])}")
            except Exception as exc:
                msg = f"{src['id']}: local source failed: {type(exc).__name__}: {exc}"
                if src["required"]:
                    raise SystemExit(msg + "; required source - nothing written")
                problems.append(msg + "; skipped")
            continue
        cache_path = os.path.join(out, "sources", src["id"] + ".json")
        result = None
        for attempt in range(1, ATTEMPTS + 1):   # retry: a page that is still rendering fails the check
            cap = asyncio.run(capture_sources([src]))[src["id"]]
            if "error" not in cap:
                try:
                    if cap["kind"] == "full":
                        result = parse_full(src, cap["payload"]); label_to_key = result["label_to_key"]
                    else:
                        result = parse_index(src, cap["payload"], label_to_key or {})
                    log(f"{src['id']}: attempt {attempt} kind={cap['kind']} "
                        f"check={json.dumps(result['check'], ensure_ascii=False)}")
                    if not result["check"]["ok"]:
                        cap = {"error": f"completeness check failed: {result['check']}"}; result = None
                except Exception as exc:
                    cap = {"error": f"parse failed: {type(exc).__name__}: {exc}"}; result = None
            if result is not None:
                break
            log(f"{src['id']}: attempt {attempt} failed: {cap['error']}")
        if result is None:
            msg = f"{src['id']}: {cap['error']}"
            if src["required"]:
                raise SystemExit(msg + "; required source - nothing written")
            if os.path.exists(cache_path) and label_to_key is not None:
                with open(cache_path, encoding="utf-8") as f:
                    cached = json.load(f)
                result = parse_index(src, cached, label_to_key)
                result["status"] = "cached (live extraction failed)"
                problems.append(msg + "; using last good snapshot")
            else:
                problems.append(msg + "; skipped (no cached snapshot)")
                continue
        else:
            result["status"] = "live"
            files_by_source[src["id"]] = cap["files"]
            if cap["kind"] == "index":
                result["cache"] = cap["payload"]
        parsed[src["id"]] = result
    for p in problems:
        log("WARNING", p)

    data, report, css = build(parsed)
    apply_watch_links(data, out)
    log(f"raw_counts={data['raw_counts']} after_dedupe={data['entry_count']} "
        f"merged_groups={len(report['merged_groups'])} (within={report['within_source_groups']}, "
        f"cross={report['cross_source_groups']}) index_only={report['index_only_records']} "
        f"local_only={report['local_only_records']} "
        f"unplaced={len(data['unplaced_entry_ids'])}")

    fetch_thumbs(data, out)
    blob = dumps(data)
    write(os.path.join(out, "data.json"), blob)
    write(os.path.join(out, "dedupe_report.json"), dumps(report))
    write(os.path.join(out, "assets", "data.js"), "window.CATALOG = " + blob.rstrip("\n") + ";\n")
    with open(os.path.join(HERE, "additions.css"), encoding="utf-8") as f:
        additions = f.read()
    css_lines = "\n".join(line[4:] if line.startswith("    ") else line for line in css.strip("\n").split("\n"))
    write(os.path.join(out, "assets", "style.css"), css_lines.strip() + "\n\n" + additions.strip() + "\n")
    for sid, p in parsed.items():
        if "cache" in p:
            write(os.path.join(out, "sources", sid + ".json"), dumps(p["cache"]))
    odir = os.path.join(out, "original")
    for sid, files in files_by_source.items():   # only refreshed when the live capture succeeded
        sdir = os.path.join(odir, sid)
        if os.path.isdir(sdir):
            shutil.rmtree(sdir)
        for rel, body in sorted(files.items()):
            write(os.path.join(sdir, rel), body)
    for stale in ("index.html", "assets"):         # layout before multi-source support
        path = os.path.join(odir, stale)
        if os.path.isdir(path):
            shutil.rmtree(path)
        elif os.path.exists(path):
            os.remove(path)
    log(f"wrote data.json ({len(blob)} bytes), {sum(1 for e in data['entries'] if e['thumbnail'])} thumbnails")


if __name__ == "__main__":
    main()
