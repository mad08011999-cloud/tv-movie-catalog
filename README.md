# TV and Movie Research Catalog (mirror)

A searchable static copy of the **TV and Movie Research Catalog**, the muse.ai share page at
<https://muse.ai/s/tv-and-movie-research-catalog-xla62ucxbx02u5>. The share page notes that its content is user-generated and unverified.

**Live site:** https://mad08011999-cloud.github.io/tv-movie-catalog/

- `index.html`, `assets/app.js`: the site (search, category and format filters, "unique records" and "by section" views, YouTube clip player)
- `data.json`: every record (855) plus categories, sections and research notes, also served at `/data.json`
- `original/`: an archived copy of the source page and its data scripts
- `thumbs/`: YouTube thumbnails for records that link to a clip

## Sync

`scripts/sync.py` renders the share page in headless Chromium, re-extracts all records, and rewrites
`data.json`, `assets/data.js`, `assets/style.css`, `original/` and `thumbs/`. When the source hasn't changed, the output is byte-identical,
and the script refuses to write anything if the extraction looks incomplete.

```bash
pip install -r scripts/requirements.txt
python -m playwright install --with-deps chromium   # or set CHROME_PATH to an existing Chrome
python scripts/sync.py            # regenerate files
scripts/sync_and_push.sh          # regenerate, then commit and push only if something changed
```

The GitHub Actions workflow `.github/workflows/sync.yml` runs it daily at 09:17 UTC and can also be started manually with
`workflow_dispatch`. It commits as `github-actions[bot]` only when files changed.
