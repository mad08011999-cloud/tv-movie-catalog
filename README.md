# TV and Movie Research Catalog (mirror)

A searchable static copy of the **TV and Movie Research Catalog**, merged from two muse.ai share pages
(both note that their content is user-generated and unverified):

1. Full catalog: <https://muse.ai/s/tv-and-movie-research-catalog-xla62ucxbx02u5> (required source)
2. Title index: <https://muse.ai/s/tv-and-movie-research-catalog-ig6qlxqxoxvcxla> (optional source; a mostly title-only re-index of the first)
3. India-only research additions: `sources/india-catalog.json` (local, hand-curated; never scraped or overwritten by the sync). Each record names existing category keys; records matching an existing title and year (or the title in `match_title`) only add missing fields, categories and source links, and the rest become new records placed in those existing categories.
4. Worldwide female-hypnosis research: `sources/worldwide-hypnosis.json` (local, hand-curated, same merge rules). Records also carry `pregnancy_outcome` / `pregnancy_note` (and `pregnancy_highlight` for pregnancy + hypnosis titles), which are copied onto the merged entry and shown on its card.
5. Worldwide hypnotized-to-love research: `sources/hypnotized-love.json` (local, hand-curated, same merge rules and pregnancy fields). Women hypnotized or mesmerized into loving, falling for or marrying someone; titles already in the catalog only gain the "Hypnotized to love" category and source links, and new titles are placed in existing categories under the group "Worldwide hypnotized-to-love additions (Sep 2026)".
6. Devil's deal + pregnancy (hypnotized) research: `sources/devil-deal-hypnosis.json` (local, hand-curated, same merge rules and pregnancy fields). Women who bargain with the devil / a demon / a Satanist intermediary to get pregnant and are hypnotized. It defines one new category, `devil-deal-pregnancy-hypnosis` (label in the file's `category_labels`, since local sources may introduce a category the muse.ai pages don't have).
7. Occult pregnancy + trance near-misses: `sources/occult-pregnancy-nearmiss.json` (local, hand-curated, same merge rules and pregnancy fields). Women hypnotized or entranced who carry a demonic or occult pregnancy without making a deal themselves; placed in existing categories only.
8. Rich woman / wife hypnotized for gain: `sources/rich-wife-hypnosis.json` (local, hand-curated, same merge rules and pregnancy fields). A rich woman or a wife hypnotized, mesmerized or love-potion-enchanted so someone gains money, an inheritance, sex, love, a marriage, a crime or her madness (possession, ghosts and black-magic possession excluded; adult women only). Records also carry `hypnotist`, `gain_motive`, `method`, `kids_status` / `kids_note` and, for TV, per-episode `episodes`; these fill only fields the entry lacks and are shown on its card. It defines one new category, `rich-wife-gain` (label in the file's `category_labels`).

**Live site:** https://mad08011999-cloud.github.io/tv-movie-catalog/

**Watch free links (survive every sync):** `sources/watch-links.json` is a hand-curated overlay of legitimate free or legal sources only — free-with-ads services (Tubi, Plex, Pluto TV, The Roku Channel, Prime Video free with ads, Amazon MX Player, Shout! Factory TV), library services (Kanopy, Hoopla — need a library card), official rights-holder / network YouTube channels (labelled with the channel name), official network apps for TV, and public-domain films on the Internet Archive. Each link was matched by title and year (JustWatch availability lookup, US by default and India for Indian titles; YouTube channel + title + year; or an Internet Archive item plus its public-domain basis) and its landing page was checked; the region is recorded. `scripts/sync.py` attaches them by exact title + year (unmatched records are skipped, never re-targeted); cards show a "Watch free" row and the "Has free link" toggle filters to them.

**Ordering and year filter (front end, survives every sync):** `assets/app.js` sorts the category legend, the category dropdown and the "By section" sections A-Z by display name, and lists every record A-Z by title inside each section (case- and accent-insensitive, ignoring leading punctuation and a leading "The"/"A"/"An"; year breaks ties; the subgroup heading is kept as a label on each card). The "Unique records" view uses the same title order. `scripts/sync.py` writes `data.json` in the same order. A release-period dropdown (All years, Before 1960, 1960s–1970s, 1980s–1990s, 2000s, 2010s, 2020s+, Year unknown) plus an optional from/to year range combine with search and the other filters. A record's year is the first 4-digit year in its year field; records without one appear only under "All years" (with no range set) and "Year unknown". Filters are kept in the URL hash (`yr`, `ymin`, `ymax`).

- `index.html`, `assets/app.js`: the site (search, category and format filters, "unique records" and "by section" views, YouTube clip player)
- `data.json`: every merged record plus categories, sections, per-source metadata and research notes, also served at `/data.json`
- `dedupe_report.json`: every group of records that was merged, and how it was matched
- `original/<source-id>/`: archived copies of each source page
- `sources/<source-id>.json`: last good raw snapshot of the optional source, used if a live extraction fails
- `thumbs/`: YouTube thumbnails for records that link to a clip

## Sync

`scripts/sync.py` renders each share page in headless Chromium, detects its layout, and extracts every record. It checks each page
against that page's own total before any de-duplication, then merges and de-duplicates the records and rewrites the generated files.
When the sources haven't changed, the output is byte-identical. If the full catalog fails its check, nothing is written. If the title
index fails, its last good snapshot is used instead.

**De-duplication.** The key is the normalized title (case-insensitive, with curly and straight quotes and apostrophes unified, and whitespace and
edge punctuation trimmed) plus the first 4-digit year. Records with the same title are duplicates when their years match or one has no year.
A same-name remake from a different year stays separate. A merged record keeps one primary copy, takes the union of categories,
section memberships and source links, fills empty fields from the other copies, and lists those copies under "Merged duplicates".
Title-index entries that don't match exactly are matched with looser alias rules (episode codes and " — " qualifiers stripped,
alternate titles split on " / ", leading "The" dropped, a unique title prefix). A record appears at most once per section.

**Merged copies on the card.** Every merged card lists each copy it absorbed (including the one shown at the top)
as `<identifier> — <plot>`: the identifier is whatever that source gives (its own title as listed, episode/segment
subtitle, season/episode code, alternate title or qualifier, year or storyline date), followed by its own plot,
character, note, the categories it was listed under and its own source links. The list opens automatically when
copies describe different episodes or storylines. Copies with no plot in the source (title-index listings) or no
episode/date/alternate title in the source are labelled as such. Episode-specific fields (character, note,
subtitle, mechanism) are only filled into the main record from a copy that tells the same story.

```bash
pip install -r scripts/requirements.txt
python -m playwright install --with-deps chromium   # or set CHROME_PATH to an existing Chrome
python scripts/sync.py            # regenerate files
scripts/sync_and_push.sh          # regenerate, then commit and push only if something changed
```

The GitHub Actions workflow `.github/workflows/sync.yml` runs it daily at 09:17 UTC and can also be started manually with
`workflow_dispatch`. It commits as `github-actions[bot]` only when files changed.
