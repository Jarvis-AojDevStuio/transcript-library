#!/bin/bash
set -euo pipefail

REPO="$(cd "$(dirname "$0")" && pwd)"
CONFIG="$REPO/playlists.yml"
ARCHIVE="$REPO/.yt-dlp-archive.txt"
INBOX="$REPO/youtube-transcripts/inbox"

if [ ! -f "$CONFIG" ]; then
  echo "Missing $CONFIG. Create playlists.yml (see README)" >&2
  exit 1
fi

command -v yt-dlp >/dev/null 2>&1 || { echo "yt-dlp not found in PATH" >&2; exit 1; }

# Use a repo-local virtualenv to avoid system Python package restrictions (PEP 668)
REQS="$REPO/requirements.txt"

# macOS venvs may not include a "python" shim (only python3 / python3.x).
pick_venv_python() {
  if [ -x "$REPO/.venv/bin/python" ]; then
    echo "$REPO/.venv/bin/python"
  elif [ -x "$REPO/.venv/bin/python3" ]; then
    echo "$REPO/.venv/bin/python3"
  else
    # Fallback: pick the newest python3.* if present
    ls -1 "$REPO/.venv/bin/python3."* 2>/dev/null | sort -V | tail -n 1
  fi
}

PY="$(pick_venv_python)"

if [ -z "$PY" ] || [ ! -x "$PY" ]; then
  echo "Bootstrapping Python venv (.venv)…"
  rm -rf "$REPO/.venv"
  python3 -m venv "$REPO/.venv"
  PY="$(pick_venv_python)"
  if [ -z "$PY" ] || [ ! -x "$PY" ]; then
    echo "Could not find a Python executable inside $REPO/.venv/bin after bootstrap" >&2
    exit 1
  fi
  "$PY" -m pip install -r "$REQS"
fi

if [ -z "$PY" ] || [ ! -x "$PY" ]; then
  echo "Could not find a Python executable inside $REPO/.venv/bin" >&2
  exit 1
fi

# Ensure PyYAML is available for reading playlists.yml
"$PY" -c "import yaml" >/dev/null 2>&1 || {
  echo "PyYAML not installed in venv. Run: $REPO/.venv/bin/pip install -r requirements.txt" >&2
  exit 1
}

mkdir -p "$INBOX"
cd "$REPO"

# Per repo directive: sync commits must land on the default branch.
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Error: sync_playlist.sh must be run on the main branch (current: $CURRENT_BRANCH)" >&2
  echo "Tip: git checkout main && git pull --ff-only" >&2
  exit 1
fi

# Ensure main is up to date to avoid pushing non-fast-forward history.
git pull --ff-only origin main

# Bootstrap archive from existing data if missing (prevents re-downloading on fresh clones)
if [ ! -f "$ARCHIVE" ]; then
  echo "Bootstrapping archive from existing transcripts..."
  "$PY" youtube-transcripts/scripts/build_index.py
  tail -n +2 youtube-transcripts/index/videos.csv | cut -d',' -f1 | while read -r vid; do
    [ -n "$vid" ] && echo "youtube $vid" >> "$ARCHIVE"
  done
fi

# Loop over enabled playlists from playlists.yml
"$PY" - "$CONFIG" <<'PY' | while IFS= read -r PLAYLIST_URL; do
import sys, yaml
with open(sys.argv[1], 'r') as f:
    cfg = yaml.safe_load(f) or {}
pls = cfg.get('playlists', []) or []
for p in pls:
    if p.get('enabled', True):
        url = (p.get('url') or '').strip()
        if url:
            print(url)
PY
  echo "Syncing playlist: $PLAYLIST_URL"
  # YouTube increasingly requires an authenticated session to avoid the
  # "Sign in to confirm you’re not a bot" interstitial.
  #
  # Best for cron: export cookies once to a Netscape cookies file and place it
  # at $REPO/.yt-cookies.txt (or set YTDLP_COOKIES_FILE).
  #
  # Fallback (more fragile on macOS cron due to Keychain prompts): pull cookies
  # directly from a browser profile (set YTDLP_COOKIES_FROM_BROWSER).
  COOKIES_FILE="${YTDLP_COOKIES_FILE:-$REPO/.yt-cookies.txt}"
  COOKIES_FROM_BROWSER="${YTDLP_COOKIES_FROM_BROWSER:-}"

  COOKIE_ARGS=()
  if [ -f "$COOKIES_FILE" ]; then
    COOKIE_ARGS+=(--cookies "$COOKIES_FILE")
  elif [ -n "$COOKIES_FROM_BROWSER" ]; then
    COOKIE_ARGS+=(--cookies-from-browser "$COOKIES_FROM_BROWSER")
  fi

  yt-dlp \
    "${COOKIE_ARGS[@]}" \
    --skip-download \
    --write-auto-sub \
    --sub-lang en \
    --sub-format vtt \
    --write-info-json \
    --download-archive "$ARCHIVE" \
    --output "$INBOX/%(id)s.%(ext)s" \
    "$PLAYLIST_URL" || echo "⚠ yt-dlp exited $? for $PLAYLIST_URL (some videos may have failed; continuing)"
done

# Ingest + classify + index
"$PY" youtube-transcripts/scripts/ingest_transcript.py --inbox "$INBOX"
"$PY" youtube-transcripts/scripts/build_index.py
"$PY" youtube-transcripts/scripts/build_summary.py
"$PY" youtube-transcripts/scripts/update_readme.py

# Commit and push if there are changes
if ! git diff --quiet || ! git diff --cached --quiet; then
  git add -A
  git commit -m "Update playlist transcripts $(date '+%Y-%m-%d %H:%M')" || true
  git push origin main

  # Trigger analysis for new videos (fails silently if server isn't running)
  if [ -n "${SYNC_TOKEN:-}" ]; then
    curl --fail-with-body --max-time 10 -s -X POST \
      -H "Authorization: Bearer ${SYNC_TOKEN}" \
      http://localhost:3939/api/sync-hook 2>/dev/null || true
  else
    echo "(no SYNC_TOKEN set; skipping sync-hook trigger)"
  fi
fi
