# TV and Movie Research Catalog (mirror)

A searchable static copy of the **TV and Movie Research Catalog**, merged from two muse.ai share pages
(both note that their content is user-generated and unverified):

1. Full catalog: <https://muse.ai/s/tv-and-movie-research-catalog-xla62ucxbx02u5> (required source)
2. Title index: <https://muse.ai/s/tv-and-movie-research-catalog-ig6qlxqxoxvcxla> (optional source; a mostly title-only re-index of the first)
3. India-only research additions: `sources/india-catalog.json` (local, hand-curated; never scraped or overwritten by the sync). Each record names existing category keys; records matching an existing title and year (or the title in `match_title`) only add missing fields, categories and source links, and the rest become new records placed in those existing categories.
4. Worldwide female-hypnosis research: `sources/worldwide-hypnosis.json` (local, hand-curated, same merge rules). Records also carry `pregnancy_outcome` / `pregnancy_note` (and `pregnancy_highlight` for pregnancy + hypnosis titles), which are copied onto the merged entry and shown on its card.

**Live site:** https://mad08011999-cloud.github.io/tv-movie-catalog/

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
