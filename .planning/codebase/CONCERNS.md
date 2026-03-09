# Concerns Map

## Overall Risk Profile

This codebase is functional for a private internal deployment, but several core paths still assume a trusted network, a single long-lived Node process, and modest data volume. The main concern areas are:

- security boundaries around file access and worker execution
- fragile run-state tracking for background analysis jobs
- synchronous file IO on request paths
- weak data-shape validation around catalog and artifact files
- very thin automated test coverage for the riskiest flows

## Security Concerns

### 1. Internal APIs expose sensitive local data with no app-level auth

- `src/app/api/video/route.ts` returns full transcript contents and also includes `absPath` for each transcript part, which leaks local filesystem structure to any caller that can hit the app.
- `src/app/api/raw/route.ts` allows arbitrary file reads anywhere under `PLAYLIST_TRANSCRIPTS_REPO` via a query param. The path-prefix check is good, but there is still no user/session authorization gate.
- `src/app/api/channels/route.ts`, `src/app/api/channel/route.ts`, `src/app/api/insight/route.ts`, and `src/app/api/insight/stream/route.ts` are similarly open to any reachable client.

Why it matters:

- This is acceptable only if the app stays on a trusted private network.
- If the deployment perimeter changes later, the current routes become an immediate data-exposure risk.

### 2. Analysis workers run with intentionally weakened sandboxing

- `src/lib/analysis.ts` launches `codex` with `--dangerously-bypass-approvals-and-sandbox`.
- `src/lib/analysis.ts` launches `claude` with `--dangerously-skip-permissions`.
- `src/lib/headless-youtube-analysis.ts` injects a repo-local skill file directly into the prompt, expanding the prompt surface area and increasing the effect of prompt or transcript contamination.

Why it matters:

- Transcript content is treated as prompt input to powerful local CLIs.
- A malformed transcript or compromised local skill file could influence a worker that has broad local access.

### 3. Webhook auth is better than nothing, but still thin

- `src/app/api/sync-hook/route.ts` uses a bearer token and constant-time comparison, which is good.
- The route has no replay protection, rate limiting, origin validation, or job deduplication beyond filesystem checks.

Why it matters:

- A leaked token would allow repeated batch triggering and repeated local CLI execution.

## Reliability And Fragility

### 4. Run tracking depends on local PID semantics and in-memory counters

- `src/lib/analysis.ts` stores concurrency in `globalThis.__analysisRunningCount`.
- `src/lib/analysis.ts` rebuilds that counter by scanning `data/insights`, then trusts `process.kill(pid, 0)` via `isProcessAlive`.
- `src/app/api/analyze/status/route.ts` and `src/app/api/insight/route.ts` mutate status files based on that PID check.

Why it matters:

- This is fragile across server restarts, multiple Node processes, future worker separation, and PID reuse.
- A recycled PID can make an old run look alive even when it is unrelated.
- A multi-instance deployment would not share the in-memory counter, so concurrency caps would drift.

### 5. Sync hook still behaves like a best-effort batch, not a durable queue

- `src/app/api/sync-hook/route.ts` loops over all videos and stops when `spawnAnalysis()` cannot acquire a slot.
- The response always says `"analysis triggered"` and does not report how many jobs actually started versus how many remain.

Why it matters:

- Large backfills can leave a long tail of unanalyzed videos with no persisted queue state.
- Operational visibility is weaker than the repo’s stated observability goals around `status.json`, `run.json`, and worker logs.

### 6. Error handling still swallows useful signals in several hot paths

- `src/app/api/analyze/route.ts`, `src/app/api/sync-hook/route.ts`, `src/app/video/[videoId]/page.tsx`, `src/lib/headless-youtube-analysis.ts`, and `src/lib/insights.ts` contain several silent `catch {}` branches or placeholder fallbacks.

Why it matters:

- The UI stays up, but real data issues become hard to distinguish from missing files or normal idle state.
- This increases debugging cost when transcript repos drift or artifact files get corrupted.

## Performance Risks

### 7. Core request paths use synchronous filesystem IO and full-file reads

- `src/app/api/analyze/route.ts` reads every transcript part with `fs.readFileSync` and concatenates the full transcript before spawning work.
- `src/app/api/sync-hook/route.ts` does the same inside a batch loop.
- `src/app/api/raw/route.ts`, `src/app/api/video/route.ts`, `src/lib/catalog.ts`, `src/lib/insights.ts`, and `src/app/video/[videoId]/page.tsx` all rely heavily on synchronous reads.

Why it matters:

- On a single Node server, these calls block the event loop.
- Long transcripts and large batches will increase latency for unrelated users.
- Memory pressure rises because full transcripts are materialized repeatedly rather than streamed.

### 8. Page generation strategy may not scale with a larger transcript corpus

- `src/app/video/[videoId]/page.tsx` uses `generateStaticParams()` over `groupVideos()`, which means every video is considered at build time.
- The same page then reads all transcript parts server-side before rendering.

Why it matters:

- Build time and memory use grow with playlist size.
- A transcript-heavy library can turn rebuilds and deploys into a bottleneck.

### 9. SSE log streaming has no backpressure or connection budgeting

- `src/app/api/insight/stream/route.ts` opens a `setInterval` per client and re-reads status/log tails every 2 seconds.
- `src/lib/insights.ts` reads the log tail from disk each time.

Why it matters:

- A few open tabs are fine, but many concurrent viewers will multiply disk polling and open timers.

## Data Consistency Risks

### 10. Catalog parsing is custom and lightly validated

- `src/lib/catalog.ts` implements a minimal CSV parser and trusts column presence and row shape.
- Numeric fields such as `chunk`, `total_chunks`, and `word_count` fall back to `"0"` on malformed input.

Why it matters:

- Corrupt or slightly changed CSV format can silently degrade sorting, grouping, and transcript assembly.
- Data quality problems would show up as wrong video grouping rather than hard failures.

### 11. Artifact state is spread across multiple files without a reconciliation layer

- `src/lib/analysis.ts` writes `analysis.md`, slugged display markdown, `status.json`, `run.json`, stdout logs, stderr logs, and metadata files separately.
- `src/lib/insights.ts` then reconstructs meaning from whichever subset exists.

Why it matters:

- Partial writes or manual cleanup can leave mismatched states such as `analysis.md` present with stale `status.json`, or logs from one run paired with metadata from another.
- There is no explicit repair or migration routine for inconsistent artifact folders.

### 12. Input validation is uneven across boundaries

- `src/lib/insights.ts` validates `videoId` in `insightPaths()`, but `src/lib/analysis.ts` path builders like `insightDir()` and `analysisPath()` do not defend themselves directly.
- API routes usually validate `videoId`, but the lower-level path functions are still callable internally without the same safeguard.

Why it matters:

- Defense in depth is incomplete around filesystem path construction.
- This is the kind of issue that often comes back during refactors or when new scripts are added.

## Missing Safeguards

### 13. Test coverage is far below the risk level of the runtime code

- `tests/e2e/smoke.spec.ts` contains only a home-page smoke test.
- There are no visible tests covering `src/lib/analysis.ts`, `src/lib/catalog.ts`, `src/lib/insights.ts`, `src/app/api/analyze/route.ts`, `src/app/api/sync-hook/route.ts`, or `src/app/api/insight/stream/route.ts`.

What is currently unguarded:

- worker spawn success and failure paths
- timeout handling and status transitions
- malformed `status.json` and `run.json`
- malformed CSV rows and transcript metadata
- sync-hook batching behavior
- security behavior of file-reading routes

### 14. Environment and dependency assumptions are not validated early

- `src/lib/catalog.ts` and `src/lib/analysis.ts` throw only when key env vars are actually touched.
- `src/lib/headless-youtube-analysis.ts` assumes `yt-dlp` may exist and silently falls back when it does not.
- `src/lib/analysis.ts` assumes local CLI providers are installed and executable.

Why it matters:

- Startup can look healthy while critical features are actually misconfigured.
- Failures surface late, inside user-triggered flows, instead of at boot or deploy time.

## Technical Debt Signals

- `docs/operations/todos` contains a substantial backlog of pending cleanup and correctness notes, including cache issues, silent catch blocks, path validation, and formatting hygiene.
- `src/components/AnalysisPanel.tsx` appears to be a legacy analysis UI path while `src/components/VideoAnalysisWorkspace.tsx` now owns the richer experience, which suggests some UI/runtime duplication debt remains.
- `src/lib/catalog.ts`, `src/lib/analysis.ts`, and `src/lib/insights.ts` are becoming high-responsibility utility modules with mixed concerns and limited abstraction boundaries.

## Highest-Leverage Follow-Ups

1. Add a real trust boundary for internal APIs or explicitly gate them behind deployment/network controls.
2. Replace best-effort process/PID tracking with durable job records or a queue-backed worker model.
3. Remove synchronous full-file IO from hot request paths where possible.
4. Add focused tests around analysis lifecycle, artifact reconciliation, catalog parsing, and file-read authorization.
5. Consolidate artifact state rules so `status.json`, `run.json`, logs, and markdown outputs cannot drift silently.
