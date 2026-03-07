# Transcript Library

This repository is a private internal tool for a small group of friends. It is a proof of concept for shared knowledge capture and discussion around a shared YouTube playlist. It is not a SaaS product.

## Product intent

- Friends add videos to a shared YouTube playlist
- The app ingests transcript metadata from a local transcript repo
- Users can watch the video inside the app while reading analysis
- Analysis runs headlessly through local CLI providers that our group already has access to
- Current target providers are `claude` CLI and `codex` CLI

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
- `worker-stdout.txt`
- `worker-stderr.txt`
- `status.json`

## Commands

```bash
just start
just prod-start
just build
just lint
just typecheck
just backfill-insights
```

## Environment

Required:

```bash
PLAYLIST_TRANSCRIPTS_REPO=/absolute/path/to/playlist-transcripts
```

Optional:

```bash
ANALYSIS_PROVIDER=claude-cli   # or codex-cli
ANALYSIS_MODEL=...
CLAUDE_ANALYSIS_MODEL=...
CODEX_ANALYSIS_MODEL=...
SYNC_TOKEN=...
```
