# Architecture Map

## System Shape

- The application is a single Next.js App Router app rooted at `src/app`, with React Server Components handling the primary page rendering and filesystem-backed modules providing data access.
- The app is private and local-first in practice: most reads come from local folders and an external transcript repository referenced by `PLAYLIST_TRANSCRIPTS_REPO`.
- The current architecture is layered as `src/app` and `src/components` -> `src/modules/*` public facades -> `src/lib/*` implementation modules -> local filesystem / child-process CLIs.
- `src/modules/*/index.ts` files act as the stable import surface for pages and route handlers. Today they mostly re-export from paired `src/lib/*.ts` files rather than owning deeper subtrees.

## Entry Points

### UI entry points

- `src/app/layout.tsx` defines the shared shell, fonts, header, footer, and global page frame.
- `src/app/page.tsx` is the top-level dashboard aggregating channels, insights coverage, and recent knowledge.
- `src/app/channels/page.tsx` renders the full channel index.
- `src/app/channel/[channel]/page.tsx` renders channel-specific video listings.
- `src/app/video/[videoId]/page.tsx` is the main research workspace for a single video.
- `src/app/knowledge/page.tsx`, `src/app/knowledge/[category]/page.tsx`, and `src/app/knowledge/[category]/[...path]/page.tsx` provide a parallel browsing flow for markdown knowledge docs stored under `knowledge/`.

### API entry points

- `src/app/api/channels/route.ts`, `src/app/api/channel/route.ts`, and `src/app/api/video/route.ts` expose catalog reads as JSON.
- `src/app/api/analyze/route.ts` starts a headless analysis run for a video.
- `src/app/api/analyze/status/route.ts` reports job status.
- `src/app/api/insight/route.ts` returns the current insight payload, curated sections, artifact metadata, and run metadata.
- `src/app/api/insight/stream/route.ts` streams live run status and worker logs over SSE.
- `src/app/api/raw/route.ts` exposes transcript-repo file reads behind a root-path guard.
- `src/app/api/sync-hook/route.ts` is the batch webhook entry point that backfills missing analyses.

### Offline / operational entry points

- `scripts/nightly-insights.ts` creates queued analysis jobs and invokes a worker loop for nightly backfills.
- `scripts/backfill-insight-artifacts.ts` migrates or synthesizes human-readable artifact files for existing insight directories.
- `justfile` is the command launcher named in repo guidance and deployment workflows.

## Rendering And Data Flow

### Page rendering flow

- App Router pages render on the server and call module APIs directly, for example `src/app/page.tsx` importing from `src/modules/catalog`, `src/modules/recent`, and `src/modules/insights`.
- The dominant data flow is synchronous filesystem reads during render:
  - catalog data comes from `src/lib/catalog.ts`
  - knowledge data comes from `src/lib/knowledge.ts`
  - insight presence and markdown come from `src/lib/insights.ts`
- Dynamic routes use `generateStaticParams()` in `src/app/channel/[channel]/page.tsx`, `src/app/video/[videoId]/page.tsx`, `src/app/knowledge/[category]/page.tsx`, and `src/app/knowledge/[category]/[...path]/page.tsx`, so route enumeration is derived from local content at build time.

### Video workspace flow

- `src/app/video/[videoId]/page.tsx` is server-rendered and assembles the full research view:
  - loads video metadata from `src/modules/catalog`
  - reads transcript chunks from the transcript repo on the server
  - renders `VideoPlayerEmbed`, `VideoAnalysisWorkspace`, and `TranscriptViewer`
- `src/components/VideoAnalysisWorkspace.tsx` is the main client-side orchestration island.
- The client flow in `VideoAnalysisWorkspace.tsx` is:
  1. initial `fetch` to `/api/insight`
  2. optional POST to `/api/analyze`
  3. polling until a run is active
  4. SSE subscription to `/api/insight/stream`
  5. final refresh from `/api/insight` after completion or failure

### Analysis execution flow

- API routes do not execute provider logic directly; they call `spawnAnalysis()` from `src/modules/analysis`.
- `src/lib/analysis.ts` owns:
  - concurrency gating
  - `status.json` and `run.json` lifecycle
  - provider selection via environment variables
  - spawning `claude` or `codex` CLI processes
  - artifact path conventions under `data/insights/<videoId>/`
- Prompt construction and metadata enrichment are delegated to `src/lib/headless-youtube-analysis.ts`.
- Insight display is then re-read from disk through `src/lib/insights.ts`, curated by `src/lib/curation.ts`, and exposed to the UI via `/api/insight`.

## Server / Client Boundaries

### Server-side code

- All `src/app/**/*.tsx` pages are server components unless marked otherwise.
- All route handlers in `src/app/api/**/route.ts` are explicitly `runtime = "nodejs"` and depend on Node APIs like `fs`, `path`, `crypto`, and `child_process`.
- `src/lib/catalog.ts`, `src/lib/knowledge.ts`, `src/lib/insights.ts`, `src/lib/recent.ts`, and `src/lib/analysis.ts` are server-only by design because they perform direct filesystem or process operations.

### Client-side code

- `src/components/VideoAnalysisWorkspace.tsx` and `src/components/TranscriptViewer.tsx` are marked `"use client"`.
- The client layer is intentionally thin:
  - `VideoAnalysisWorkspace.tsx` handles user-triggered analysis state, polling, and SSE
  - `TranscriptViewer.tsx` handles transcript expansion and view-mode toggles
- Most other components in `src/components/` are presentational and can remain server-rendered.

### Boundary pattern

- The repo follows a practical boundary pattern rather than a strict domain-module architecture:
  - server pages and routes import from `@/modules/*`
  - `@/modules/*` re-export from `@/lib/*`
  - `@/lib/*` owns the real IO and business logic
- This gives the codebase a future-friendly public API layer without yet moving implementation into per-module internal folders.

## Major Modules

### Catalog

- Public surface: `src/modules/catalog/index.ts`
- Implementation: `src/lib/catalog.ts`
- Responsibility: load the transcript CSV from `PLAYLIST_TRANSCRIPTS_REPO`, group transcript rows into video objects, and provide channel/video lookup helpers.
- Key external dependency: `youtube-transcripts/index/videos.csv` in the external transcript repo.

### Analysis

- Public surface: `src/modules/analysis/index.ts`
- Implementation: `src/lib/analysis.ts`
- Responsibility: manage analysis runs, concurrency, child processes, artifact paths, and run/status metadata.
- It is the main runtime boundary between the Next.js app and local CLI providers.

### Insights

- Public surface: `src/modules/insights/index.ts`
- Implementation: `src/lib/insights.ts`
- Responsibility: locate canonical and display markdown artifacts, inspect logs, read run metadata, and derive previews.
- Depends on analysis path helpers from `src/lib/analysis.ts`.

### Knowledge

- Public surface: `src/modules/knowledge/index.ts`
- Implementation: `src/lib/knowledge.ts`
- Responsibility: enumerate categories and markdown files under `knowledge/`, guard path traversal, and read content.

### Recent

- Public surface: `src/modules/recent/index.ts`
- Implementation: `src/lib/recent.ts`
- Responsibility: build recent-activity lists from `knowledge/` and `data/insights/`.

### Curation

- Public surface: `src/modules/curation/index.ts`
- Implementation: `src/lib/curation.ts`
- Responsibility: parse raw analysis markdown into UI-friendly sections like summary, takeaways, and action items.

## Persistence And Artifacts

- Transcript source of truth lives outside the app repo, referenced through `PLAYLIST_TRANSCRIPTS_REPO`.
- App-owned generated artifacts live under `data/insights/<videoId>/`.
- The artifact convention in `src/lib/analysis.ts` and `src/lib/insights.ts` includes:
  - `analysis.md`
  - slugged display markdown
  - `video-metadata.json`
  - `run.json`
  - `status.json`
  - `worker-stdout.txt`
  - `worker-stderr.txt`
- The app still supports legacy flat insight files at `data/insights/<videoId>.md`, and migration compatibility is preserved in `src/lib/insights.ts` and `scripts/backfill-insight-artifacts.ts`.

## Architectural Patterns

- Filesystem-first reads instead of a database.
- Thin module facade pattern via `src/modules/*`.
- Server-rendered read paths, client-rendered job-control path.
- Environment-driven provider selection in `src/lib/analysis.ts`.
- Additive compatibility for artifact formats rather than destructive rewrites.
- Operational observability through persisted run metadata and worker logs rather than only in-memory task state.

## Current Architectural Tension

- `src/modules/*` advertises a module-oriented architecture, but real implementations remain grouped by library files in `src/lib/*`; the public boundary exists, while internal module encapsulation is still partial.
- Pages perform synchronous reads during render, which is acceptable for this private local tool but keeps request latency tied to filesystem performance.
- The system is strongly coupled to local disk layout and local CLI availability, which matches the repo’s stated non-SaaS/private-worker assumptions.
