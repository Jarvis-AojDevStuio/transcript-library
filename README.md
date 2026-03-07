# Transcript Library

Private internal transcript and insight workspace for a small friend group.

This repository is not a SaaS product. It is a proof of concept for a shared YouTube playlist workflow where friends can watch videos in-app, read transcripts, and generate AI analysis using provider CLIs they already have access to.

## What it does

- browses a local transcript corpus from `PLAYLIST_TRANSCRIPTS_REPO`
- plays YouTube videos inside the app
- generates headless analysis through a provider abstraction
- stores insight artifacts under `data/insights/<videoId>/`

## Current provider model

- `claude-cli`
- `codex-cli`

Provider selection happens on the server with `ANALYSIS_PROVIDER`, not in the UI.

## Core routes

- `POST /api/analyze?videoId=...`
- `GET /api/analyze/status?videoId=...`
- `GET /api/insight?videoId=...`
- `GET /api/insight/stream?videoId=...`

## Artifact layout

```text
data/insights/<videoId>/
  analysis.md
  <slugified-video-title>.md
  video-metadata.json
  run.json
  worker-stdout.txt
  worker-stderr.txt
  status.json
```

Notes:

- `videoId` stays the canonical lookup key
- the slugged markdown file is for human inspection
- metadata caches are schema-versioned so heuristic changes can invalidate stale entries

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
ANALYSIS_PROVIDER=claude-cli
ANALYSIS_MODEL=...
CLAUDE_ANALYSIS_MODEL=...
CODEX_ANALYSIS_MODEL=...
SYNC_TOKEN=...
```

## Docs

- [System overview](./docs/architecture/system-overview.md)
- [Analysis runtime](./docs/architecture/analysis-runtime.md)
- [Worker topology](./docs/architecture/worker-topology.md)
- [Artifact schema](./docs/architecture/artifact-schema.md)
- [Provider runbook](./docs/operations/provider-runbook.md)
- [RepoArchitect assessment](./docs/architecture/repo-architect-assessment.md)
