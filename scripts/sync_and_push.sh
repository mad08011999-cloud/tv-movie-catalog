#!/usr/bin/env bash
# Run the sync and push a commit only if generated files changed.
# Usage: scripts/sync_and_push.sh   (from anywhere; needs git push access)
set -euo pipefail
cd "$(dirname "$0")/.."
PY="${PYTHON:-python3}"
if [ -x .venv/bin/python ]; then PY=.venv/bin/python; fi
git pull --ff-only --quiet
"$PY" scripts/sync.py
git add -A data.json assets/data.js assets/style.css original thumbs
if git diff --cached --quiet; then
  echo "[sync] no changes"
  exit 0
fi
git commit -m "Sync catalog from muse.ai ($(date -u +%Y-%m-%d))"
git push
echo "[sync] pushed changes"
