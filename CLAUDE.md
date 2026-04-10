# Transcript Library

This repository is a private internal tool for a small group of friends. Proof of concept for shared knowledge capture and discussion around a shared YouTube playlist. Not a SaaS product.

## Product intent

- Friends add videos to a shared YouTube playlist
- Transcripts are embedded in the repo at `pipeline/` (synced via GitHub Action)
- Users can watch the video inside the app while reading analysis
- Analysis runs headlessly through local CLI providers (`claude` CLI, `codex` CLI)

## Architecture priorities

- Preserve fast browse/read/watch UX
- Keep insight lookup stable by `videoId`
- Keep human-readable artifacts alongside canonical machine paths
- Keep provider-specific logic behind a provider boundary
- Keep the runtime observable through status, logs, and run metadata
- Design the analysis runtime so it can move behind a dedicated worker without forcing UI changes

## Current artifact model

Each analysis lives under `data/insights/<videoId>/`:

- `analysis.md`
- `<slugified-video-title>.md`
- `video-metadata.json`
- `run.json`
- `worker-stdout.txt` / `worker-stderr.txt`
- `status.json`

## Deployment

- Deployed via **Coolify** on Proxmox LXC 105 (`10.69.1.138`)
- Docker Compose build pack — auto-deploys on push to `main`
- Canary: `library-canary.aojdevstudio.me` | Production: `library.aojdevstudio.me`
- Persistent volumes: `data/catalog` and `data/insights`
- Claude CLI auth volume-mounted from host
- `docker-entrypoint.sh` auto-rebuilds catalog when transcripts change

> `source-refresh.ts` and `/api/sync-hook` are retired.

## Pipeline

- `pipeline/` contains the merged playlist-transcripts repo (Python/Bash)
- GitHub Action syncs playlists every 4h, commits transcripts, triggers auto-deploy
- `playlists.yml` defines tracked playlists

## Commands

```bash
just start
just prod-start
just build
just lint
just typecheck
just backfill-insights
just daily-sweep      # run daily maintenance sweep
just insights         # run nightly insights generation
```

## Environment

Required: _(none — transcripts are embedded in `pipeline/`)_

Optional:

```bash
PLAYLIST_TRANSCRIPTS_REPO=/absolute/path/to/playlist-transcripts  # local dev override
ANALYSIS_PROVIDER=claude-cli   # or codex-cli
ANALYSIS_MODEL=...
CLAUDE_ANALYSIS_MODEL=...
CODEX_ANALYSIS_MODEL=...
SYNC_TOKEN=...
```
