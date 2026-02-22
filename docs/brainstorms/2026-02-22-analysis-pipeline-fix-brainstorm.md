# Analysis Pipeline Fix & Auto-Analysis

**Date:** 2026-02-22
**Status:** Brainstorm Complete — Ready for Planning

## What We're Building

Fix the broken "Run analysis" pipeline on video pages and add auto-detection of new videos via a post-sync webhook. The end result: clicking "Run analysis" on any video page triggers an inline `claude -p` execution with live frontend feedback, and new videos arriving from `sync_playlist.sh` are automatically analyzed without manual intervention.

## Why This Approach

### Current State (Broken)

The existing pipeline has three compounding failures:

1. **Worker never auto-invoked.** The API route (`/api/analyze`) creates a job JSON file in `data/queue/`, but the shell worker (`scripts/analysis-worker.sh`) is a standalone script that must be run manually or via cron. Nobody calls it. Jobs sit in the queue forever — there are currently 2 queued jobs and 2 failed jobs from Feb 21-22.

2. **SSL redirect breaks the UX.** The `<form method="post">` submits to `/api/analyze`, which does a 303 redirect back to `/video/{videoId}`. Chrome's cached HSTS policy (from when Tailscale served port 3939 via HTTPS) forces the redirect to HTTPS on the HTTP-only dev server, producing `ERR_SSL_PROTOCOL_ERROR`. The page never loads after clicking "Run analysis."

3. **macOS bash 3.2 incompatibility.** The worker script uses `mapfile` (bash 4+ only) and unescaped `echo "\n"` sequences that don't work on macOS's default bash. Even if the worker were invoked, it would fail on this machine.

### Chosen Approach: Inline Execution + Post-Sync Webhook

**Decision 1 — Inline execution (not queue-based).** Replace the queue + worker system with direct `claude -p` spawning from the API route. This is a single-user local app — queue infrastructure adds complexity without benefit. The API route spawns `claude -p` as a child process, writes status to a file, and the frontend polls for completion.

**Decision 2 — Frontend feedback via polling.** After clicking "Run analysis", the page polls a status endpoint (`/api/analyze/status?videoId=...`) to show progress. When analysis completes, the insight panel updates automatically. No manual refresh needed.

**Decision 3 — Post-sync webhook for auto-detection.** Add a step to `sync_playlist.sh` that curls a new `/api/sync-hook` endpoint after a successful sync. This endpoint compares `videos.csv` against existing insights and auto-triggers analysis for un-analyzed videos.

## Key Decisions

### 1. Replace Queue with Inline Execution

- Remove `data/queue/` job file system
- Remove `scripts/analysis-worker.sh`
- API route directly spawns `claude -p` as a detached child process
- Write `data/insights/{videoId}/status.json` with states: `pending` | `running` | `complete` | `failed`
- Existing `data/insights/{videoId}/analysis.md` output path stays the same

### 2. Fix SSL Redirect Issue

- Replace `<form method="post">` with client-side `fetch()` POST
- API returns JSON response (not a redirect)
- Frontend handles the response and starts polling
- This eliminates the redirect entirely — no HSTS/SSL issue possible

### 3. Frontend Polling for Live Feedback

- New API route: `GET /api/analyze/status?videoId={id}`
- Returns: `{ status: "idle" | "running" | "complete" | "failed", startedAt?, completedAt?, error? }`
- Video page polls every 2-3 seconds while status is "running"
- On "complete": re-fetch and render the insight panel
- Visual states: button shows "Analyzing..." spinner while running, "Ready" badge when done

### 4. Post-Sync Webhook Endpoint

- New API route: `POST /api/sync-hook`
- Secured with HMAC-SHA256 signature verification (webhook-integration skill pattern)
- Shared secret stored in environment variable (`SYNC_WEBHOOK_SECRET`)
- Timestamp validation with 5-minute tolerance to prevent replay attacks
- Event ID in `X-Webhook-ID` header for delivery tracing and deduplication
- Idempotency: each video ID is checked — if `analysis.md` already exists, skip. Event IDs are tracked to prevent duplicate processing from retried deliveries
- On receipt: return 200 immediately, then reads `videos.csv` asynchronously, identifies un-analyzed videos, spawns 2-3 concurrent `claude -p` processes for batch analysis
- Error responses sanitized — never expose internal paths or stack traces to the caller

### 5. Modify sync_playlist.sh

- Add a curl step at the end of `sync_playlist.sh` (after git push)
- Generates HMAC-SHA256 signature from payload + shared secret
- Sends POST to the transcript-library's `/api/sync-hook` endpoint
- Includes headers: `X-Webhook-Signature`, `X-Webhook-ID` (unique per delivery), `X-Webhook-Timestamp`, `User-Agent: SyncPlaylist/1.0`
- Payload schema: `{ id: <uuid>, type: "sync_complete", timestamp: <epoch_ms>, data: { newVideos: <count>, syncDuration: <seconds> } }`
- Fails silently (curl `--fail-with-body --max-time 10`) if the transcript-library server isn't running — non-blocking to the sync pipeline

### 6. Webhook Security (from webhook-integration skill)

- HMAC-SHA256 signature in `X-Webhook-Signature` header
- Timestamp in `X-Webhook-Timestamp` header
- Event ID in `X-Webhook-ID` header for tracing and deduplication
- 5-minute replay window (`timestampTolerance: 300`)
- Shared secret via `SYNC_WEBHOOK_SECRET` env var (both sides)
- Return 200 immediately, process analysis asynchronously
- Log all webhook receipts (event ID, timestamp, signature valid/invalid, videos found)
- Sanitize all error responses — never leak internal paths or stack traces
- HTTPS only — enforced by Tailscale serve (all traffic is TLS-terminated)
- Validate payload schema before processing (type must be "sync_complete")

### 7. Webhook Payload Schema

- `id` (string, uuid) — unique event identifier for idempotency
- `type` (string) — event type, currently only "sync_complete"
- `timestamp` (number) — epoch milliseconds when the sync completed
- `data.newVideos` (number) — count of new videos added in this sync
- `data.syncDuration` (number) — sync duration in seconds

## Architecture

### Data Flow: Manual Analysis

```
User clicks "Run analysis"
  -> fetch POST /api/analyze?videoId=...
  -> API spawns claude -p (detached child process)
  -> Writes status.json: { status: "running" }
  -> Returns { ok: true, status: "running" }
  -> Frontend polls GET /api/analyze/status?videoId=...
  -> claude -p writes analysis.md
  -> API detects analysis.md exists -> status: "complete"
  -> Frontend shows insight panel
```

### Data Flow: Auto-Analysis (Post-Sync)

```
sync_playlist.sh completes
  -> curl POST /api/sync-hook (with HMAC signature + event ID)
  -> API returns 200 immediately
  -> API verifies signature + timestamp + deduplicates event ID
  -> Reads videos.csv, finds un-analyzed videos
  -> Spawns 2-3 concurrent claude -p processes (batch)
  -> Writes status.json + analysis.md per video
```

### Files Changed

| File | Change |
|------|--------|
| `src/app/api/analyze/route.ts` | Replace queue write with inline claude -p spawn |
| `src/app/api/analyze/status/route.ts` | New — polling endpoint for analysis status |
| `src/app/api/sync-hook/route.ts` | New — webhook receiver for post-sync auto-analysis |
| `src/app/video/[videoId]/page.tsx` | Replace `<form>` with client component for fetch + polling |
| `sync_playlist.sh` (playlist-transcripts repo) | Add curl webhook step at end |
| `scripts/analysis-worker.sh` | Delete (replaced by inline execution) |
| `data/queue/` | Clean up — no longer used |

## Resolved Questions

1. **claude -p availability.** Confirmed: `claude` CLI is globally installed and available in PATH. The spawned child process will inherit the environment.

2. **Concurrent analysis limit.** Decision: Allow 2-3 concurrent `claude -p` processes for batch analysis after a sync. This speeds up processing without overwhelming the API.

3. **Error recovery.** Decision: Auto-retry once on failure. If the retry also fails, mark as "failed" with a manual retry button on the video page. Balances reliability with not burning credits on persistent failures.

## Open Questions

1. **Webhook secret management.** Where should the shared secret live? `.env.local` for the Next.js app + an env var or config file for `sync_playlist.sh`. Need to decide on secret rotation strategy.

## Alternatives Considered

### Queue + Auto-Invoke Worker (Approach B)

Keep the queue system but auto-invoke `analysis-worker.sh` from the API route. Fix bash 3.2 issues. Add polling.

**Rejected because:** More moving parts (API + queue files + worker script + polling). The queue adds reliability guarantees that aren't needed for a single-user local app. Inline execution is simpler and more debuggable.

### File Watcher for Auto-Detection

Watch `videos.csv` with `fs.watch` for changes.

**Rejected because:** `fs.watch` is unreliable across platforms (macOS FSEvents has known quirks). A post-sync webhook is more explicit and predictable — the sync script knows exactly when it's done, whereas a file watcher might fire on partial writes.

### Periodic Scan (Interval)

Check every N minutes for un-analyzed videos.

**Rejected because:** Wasteful polling when the sync schedule is known (every 4 hours). A webhook is event-driven and immediate.
