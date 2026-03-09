# Structure Map

## Top-Level Layout

- `src/`: application source for the Next.js app.
- `data/`: generated runtime data, especially insight artifacts under `data/insights/`.
- `knowledge/`: human-authored markdown knowledge library grouped by category.
- `scripts/`: operational and migration scripts for analysis artifacts.
- `tests/e2e/`: Playwright smoke coverage.
- `docs/`: project docs, plans, reviews, and architecture notes.
- `public/`: static assets served by Next.js.
- `.planning/codebase/`: generated codebase-map documents.

## Source Layout

### `src/app`

- `src/app/layout.tsx`: root shell and global chrome.
- `src/app/page.tsx`: landing dashboard.
- `src/app/channels/page.tsx`: all-channels index.
- `src/app/channel/[channel]/page.tsx`: per-channel video listings.
- `src/app/video/[videoId]/page.tsx`: per-video watch/read/analyze workspace.
- `src/app/knowledge/page.tsx`: category index for local markdown docs.
- `src/app/knowledge/[category]/page.tsx`: list of markdown files in one category.
- `src/app/knowledge/[category]/[...path]/page.tsx`: markdown document viewer.
- `src/app/api/**/route.ts`: JSON, SSE, and webhook endpoints.
- `src/app/*/loading.tsx`: route-level loading UI files aligned with App Router conventions.

### `src/components`

- `src/components/VideoAnalysisWorkspace.tsx`: client-side analysis control panel and streaming log viewer.
- `src/components/TranscriptViewer.tsx`: client transcript explorer.
- `src/components/Markdown.tsx`: shared markdown rendering with frontmatter display.
- `src/components/VideoPlayerEmbed.tsx`: YouTube player embed wrapper.
- `src/components/NavHeader.tsx`, `src/components/Breadcrumb.tsx`, `src/components/Badge.tsx`: shared UI primitives for navigation and labels.
- `src/components/ui/*`: local design-system primitives (`button`, `card`, `input`, `separator`).

### `src/modules`

- `src/modules/analysis/index.ts`
- `src/modules/catalog/index.ts`
- `src/modules/curation/index.ts`
- `src/modules/insights/index.ts`
- `src/modules/knowledge/index.ts`
- `src/modules/recent/index.ts`

These files follow a consistent naming pattern:

- one capability per folder
- a single `index.ts` public entry point
- implementation re-exported from `src/lib/<capability>.ts`

This is a facade structure, not yet a full "module internals" tree.

### `src/lib`

- `src/lib/catalog.ts`: transcript CSV parsing and grouping.
- `src/lib/analysis.ts`: analysis runtime, provider spawning, artifact paths, run metadata.
- `src/lib/headless-youtube-analysis.ts`: prompt building and metadata enrichment.
- `src/lib/insights.ts`: artifact discovery, reads, previews, and log tailing.
- `src/lib/knowledge.ts`: category listing and markdown file reads.
- `src/lib/recent.ts`: recent knowledge and recent insights feeds.
- `src/lib/curation.ts`: markdown section extraction heuristics.
- `src/lib/utils.ts`: smaller formatting helpers used by pages and components.

## Data And Content Layout

### Transcript inputs

- The app expects `PLAYLIST_TRANSCRIPTS_REPO` to point at a separate repo.
- `src/lib/catalog.ts` reads transcript index data from `youtube-transcripts/index/videos.csv` inside that external repo.
- Transcript part content is resolved from relative `file_path` values into absolute paths through `absTranscriptPath()`.

### Insight outputs

- Canonical output layout is `data/insights/<videoId>/`.
- Common files per video:
  - `analysis.md`
  - slugged markdown display file
  - `status.json`
  - `run.json`
  - `video-metadata.json`
  - `worker-stdout.txt`
  - `worker-stderr.txt`
- Legacy flat files `data/insights/<videoId>.md` are still recognized.

### Knowledge library

- `knowledge/` is organized by category folders such as `knowledge/technology/`, `knowledge/health/`, and `knowledge/business/`.
- Knowledge pages treat file paths as content identifiers and derive user-facing titles from filenames.
- Recursive traversal is supported, so nested markdown files remain addressable through `knowledge/[category]/[...path]`.

## Naming And Organization Patterns

### Path aliases and imports

- The repo uses the `@/*` path alias from `tsconfig.json`, mapping to `src/*`.
- App code generally imports from `@/modules/*` instead of `@/lib/*` when crossing capability boundaries.
- Utility and formatting helpers are imported directly from `@/lib/utils`.

### File naming

- App Router conventions are used literally: `page.tsx`, `layout.tsx`, `loading.tsx`, and `route.ts`.
- Capability names are singular and direct: `catalog`, `analysis`, `insights`, `knowledge`, `recent`, `curation`.
- Generated artifact names are machine-keyed by `videoId`, with optional human-readable slugged markdown alongside the canonical file.

### Directory responsibilities

- `src/app` owns routing and HTTP surfaces.
- `src/components` owns presentation and client interactions.
- `src/modules` owns public capability boundaries.
- `src/lib` owns implementation and Node-facing IO.
- `data/` owns generated artifacts.
- `knowledge/` owns manually curated markdown content.
- `scripts/` owns maintenance and batch-processing flows.

## Server And Runtime Placement

- Node-only concerns stay outside client components:
  - filesystem access in `src/lib/catalog.ts`, `src/lib/knowledge.ts`, `src/lib/insights.ts`, and `src/lib/analysis.ts`
  - process spawning in `src/lib/analysis.ts`
  - bearer-token verification in `src/app/api/sync-hook/route.ts`
- Browser-only concerns are concentrated in `"use client"` files:
  - `src/components/VideoAnalysisWorkspace.tsx`
  - `src/components/TranscriptViewer.tsx`

## Practical Dependency Shape

- Read path:
  - `src/app/.../page.tsx` -> `src/modules/*` -> `src/lib/*` -> filesystem
- Analysis write path:
  - `src/components/VideoAnalysisWorkspace.tsx` -> `/api/analyze` and `/api/insight*` -> `src/modules/analysis` and `src/modules/insights` -> local CLI process + `data/insights/`
- Knowledge path:
  - `src/app/knowledge/...` -> `src/modules/knowledge` -> `src/lib/knowledge.ts` -> `knowledge/`

## Structural Observations

- The repo keeps product code compact; the deepest structural complexity sits in content directories and runtime artifact storage rather than in nested application packages.
- The architecture signals a gradual move toward stronger module boundaries, but the current codebase is still intentionally lightweight and file-oriented.
- Naming is consistent across routing, modules, and artifacts, which makes the codebase easy to scan even without a heavier package or monorepo structure.
