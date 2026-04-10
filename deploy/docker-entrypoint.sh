#!/bin/bash
set -e

CHECKSUM_FILE="/app/data/catalog/.transcript-checksum"
CURRENT_CHECKSUM=$(find /app/pipeline/youtube-transcripts/topics -name '*.md' -exec md5sum {} + 2>/dev/null | sort | md5sum | cut -d' ' -f1)
PREVIOUS_CHECKSUM=$(cat "$CHECKSUM_FILE" 2>/dev/null || echo "none")

if [ "$CURRENT_CHECKSUM" != "$PREVIOUS_CHECKSUM" ]; then
  echo "[entrypoint] Transcript changes detected. Rebuilding catalog..."
  mkdir -p /app/data/catalog
  npx tsx scripts/rebuild-catalog.ts
  echo "$CURRENT_CHECKSUM" > "$CHECKSUM_FILE"
  echo "[entrypoint] Catalog rebuild complete."
else
  echo "[entrypoint] No transcript changes. Skipping catalog rebuild."
fi

exec "$@"
