# Integrations

## Summary

- The app is primarily a local-filesystem and local-CLI integration project.
- Its main external boundary is the transcript source repo referenced by `PLAYLIST_TRANSCRIPTS_REPO`.
- There is no first-party database, auth provider, payment provider, or hosted background queue wired into the current code.

## Transcript Source Repo

### Purpose

- Supplies the catalog index and transcript chunk files used throughout the app.

### Integration points

- `src/lib/catalog.ts` reads `youtube-transcripts/index/videos.csv` from `PLAYLIST_TRANSCRIPTS_REPO`.
- `src/lib/catalog.ts` resolves transcript chunk paths via `absTranscriptPath(...)`.
- `src/app/api/analyze/route.ts` reads transcript part files before spawning analysis.
- `src/app/api/video/route.ts` returns transcript part metadata and file contents.
- `src/app/api/raw/route.ts` serves raw text from a path under `PLAYLIST_TRANSCRIPTS_REPO`.
- `scripts/nightly-insights.ts` also reads from the transcript repo and embeds absolute paths into queued jobs.

### Operational notes

- This is a local filesystem dependency, not an HTTP API.
- Failure mode is immediate server-side read errors when the env var is missing or paths are stale.

## Local Analysis Provider CLIs

### Claude CLI

- Selected by `ANALYSIS_PROVIDER=claude-cli`: `src/lib/analysis.ts`, `docs/operations/provider-runbook.md`.
- Spawned as the `claude` binary with `--dangerously-skip-permissions -p`, plus optional `--model`: `src/lib/analysis.ts`.
- Output is captured from stdout and persisted into `data/insights/<videoId>/analysis.md` plus logs and metadata: `src/lib/analysis.ts`.

### Codex CLI

- Selected by `ANALYSIS_PROVIDER=codex-cli`: `src/lib/analysis.ts`, `docs/operations/provider-runbook.md`.
- Spawned as the `codex` binary using `codex exec --dangerously-bypass-approvals-and-sandbox --skip-git-repo-check ...`: `src/lib/analysis.ts`.
- The provider writes to `data/insights/<videoId>/provider-output.md`, which the runtime then copies into canonical artifacts: `src/lib/analysis.ts`.

### Provider boundary

- Provider choice is server-side only; the UI reads normalized output through `/api/insight` and `/api/insight/stream`: `README.md`, `src/app/api/insight/route.ts`, `src/app/api/insight/stream/route.ts`.
- Per-run metadata is stored in `run.json`, including provider, command, args, status, pid, and timestamps: `src/lib/analysis.ts`.

## YouTube Metadata And Media

### yt-dlp

- `src/lib/headless-youtube-analysis.ts` may shell out to `yt-dlp --dump-single-json --skip-download --no-warnings <sourceUrl>` to enrich metadata when repo-side info is unavailable.
- This enriches `video-metadata.json` with description, duration, source URL, GitHub links, and content-type heuristics.

### YouTube embeds and assets

- The frontend embeds YouTube videos in the app UI, as described in `README.md` and implemented in `src/app/video/**` and `src/components/**`.
- Remote images from `i.ytimg.com` are explicitly allowed in `next.config.ts` for YouTube thumbnails.

### Repo-side YouTube metadata cache

- The enrichment layer also checks transcript-repo metadata at `youtube-transcripts/inbox/<videoId>.info.json`: `src/lib/headless-youtube-analysis.ts`.

## HTTP APIs Exposed By This App

### Analysis lifecycle

- `POST /api/analyze?videoId=...` starts a local analysis run: `src/app/api/analyze/route.ts`.
- `GET /api/analyze/status?videoId=...` returns `idle|running|complete|failed`: `src/app/api/analyze/status/route.ts`.
- `GET /api/insight?videoId=...` returns the rendered insight payload, curated sections, artifact paths, and run metadata: `src/app/api/insight/route.ts`.
- `GET /api/insight/stream?videoId=...` exposes an SSE stream with status, log tails, and artifact metadata: `src/app/api/insight/stream/route.ts`.

### Catalog/content reads

- `GET /api/channels` lists channel summaries: `src/app/api/channels/route.ts`.
- `GET /api/channel?channel=...` lists videos for one channel: `src/app/api/channel/route.ts`.
- `GET /api/video?videoId=...` returns catalog metadata and transcript parts: `src/app/api/video/route.ts`.
- `GET /api/raw?path=...` returns raw transcript text from the external transcript repo after path-boundary checks: `src/app/api/raw/route.ts`.

## Webhooks And Automation Hooks

### Sync hook

- `POST /api/sync-hook` is a bearer-token-protected endpoint intended to trigger missing analyses after transcript updates: `src/app/api/sync-hook/route.ts`.
- Authentication is a shared secret from `SYNC_TOKEN`, validated with a timing-safe comparison: `src/app/api/sync-hook/route.ts`.
- The handler iterates local catalog data, skips completed/running analyses, and spawns fresh jobs until the in-process concurrency cap is reached.

### Nightly batch script

- `scripts/nightly-insights.ts` behaves like an offline batch orchestrator for queued analyses.
- It writes queue JSON files under `data/queue/` and expects a local worker shell script at `scripts/analysis-worker.sh`.
- This is a local automation integration rather than an app-exposed API.

## Filesystem Contracts

### Insight artifact store

- `data/insights/<videoId>/analysis.md`
- `data/insights/<videoId>/<slugified-title>.md`
- `data/insights/<videoId>/video-metadata.json`
- `data/insights/<videoId>/run.json`
- `data/insights/<videoId>/status.json`
- `data/insights/<videoId>/worker-stdout.txt`
- `data/insights/<videoId>/worker-stderr.txt`

These are the main persistence and observability contract for the analysis runtime: `README.md`, `CLAUDE.md`, `src/lib/analysis.ts`.

### Knowledge library

- `src/lib/knowledge.ts` treats `knowledge/**` as a local markdown corpus that the app can browse and read.
- This is a local content integration, not a database-backed CMS.

## Authentication And Authorization

- There is no end-user auth/session provider in the current application code.
- The only explicit auth mechanism is the shared bearer token on `POST /api/sync-hook`: `src/app/api/sync-hook/route.ts`.
- The repository guidance explicitly frames this as a private internal tool for a trusted group rather than a multi-user SaaS product: `AGENTS.md`, `CLAUDE.md`.

## Databases And Stateful Services

- No SQL or NoSQL database integration is wired into runtime code.
- No ORM, migration framework, or schema folder is present in the root manifests.
- State is persisted in CSV inputs, markdown content, and JSON/markdown/text artifacts on disk.

## Background Processing

- The primary worker model is direct child-process spawning from the app server via `spawn(...)`: `src/lib/analysis.ts`.
- Status recovery relies on PID checks and persisted `status.json`/`run.json`, not on an external job system.
- SSE polling/streaming informs the browser about background progress; there is no websocket broker or pub/sub service: `src/app/api/insight/stream/route.ts`.

## Notable Missing Integrations

- No Supabase, Clerk, Auth.js, Firebase, or custom login service.
- No Stripe, Resend, S3, Vercel Blob, Redis, Postgres, MySQL, or SQLite client.
- No webhook signature provider besides the simple shared secret on `/api/sync-hook`.
