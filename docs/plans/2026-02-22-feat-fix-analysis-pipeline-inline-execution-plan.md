---
title: "feat: Fix Analysis Pipeline with Inline Execution"
type: feat
status: completed
date: 2026-02-22
reviewed: true
review-rounds: 2
reviewers: [simplicity, security, performance, architecture, spec-flow]
deepened: true
deepened-date: 2026-02-22
---

# feat: Fix Analysis Pipeline with Inline Execution

## Enhancement Summary

**Deepened on:** 2026-02-22
**Research agents used:** child_process patterns, React polling patterns, Next.js API security, file-based status tracking

### Key Improvements from Deepening
1. Added concrete implementation patterns with production-ready TypeScript code for every major component
2. Specified SIGTERM -> SIGKILL escalation (10s grace) instead of bare SIGTERM
3. Clarified `child.on("close")` over `child.on("exit")` — close guarantees stdio is flushed
4. Added `globalThis` anchoring pattern for module-level state surviving Next.js HMR
5. Added `useTransition` for non-blocking inline render when polling detects completion
6. Specified `fsync` before rename for atomic write durability
7. Added EPERM handling for `process.kill(pid, 0)` (process exists but we lack permission = alive)

## Overview

Fix the broken "Run analysis" pipeline on video pages and add auto-detection of new videos via a post-sync webhook. The current system has three compounding failures: the worker is never auto-invoked, the form POST triggers an SSL redirect error, and the shell worker uses bash 4+ features incompatible with macOS. This plan replaces the queue+worker architecture with inline `claude -p` execution, adds frontend polling for live feedback, and introduces a post-sync webhook for automatic analysis of new videos.

## Problem Statement / Motivation

The existing analysis pipeline is completely non-functional:

1. **Worker never runs.** The API route creates job JSON files in `data/queue/`, but `scripts/analysis-worker.sh` must be run manually. No cron, no auto-invoke. Jobs sit forever — 3 queued jobs and 2 failed jobs exist now.

2. **SSL redirect breaks UX.** The `<form method="post">` submits to `/api/analyze`, which returns a 303 redirect. Chrome's cached HSTS policy (from previous Tailscale HTTPS on port 3939) forces the redirect to HTTPS on the HTTP-only dev server, producing `ERR_SSL_PROTOCOL_ERROR`.

3. **macOS bash 3.2 incompatibility.** The worker uses `mapfile` (bash 4+) and unescaped `echo "\n"` (writes literal `\n`, not newlines) — both fail on macOS's default bash.

4. **Path traversal in `/api/raw`.** Pre-existing: `startsWith(root)` check is bypassable via `..` path segments. Error responses leak absolute filesystem paths.

5. **No process lifecycle management.** No PID tracking, no timeout, no concurrency limit, no stale process detection. Dead processes leave `status: "running"` forever.

## Proposed Solution

Replace the queue+worker system with direct `claude -p` spawning from the API route. Add a polling endpoint for frontend feedback. Add a webhook endpoint for post-sync auto-analysis. Fix the pre-existing path traversal vulnerability.

**Source brainstorm:** `docs/brainstorms/2026-02-22-analysis-pipeline-fix-brainstorm.md`

## Technical Considerations

- **Architecture:** Single-user local app (local dev server only, not Vercel/serverless). Queue infrastructure adds complexity without benefit. Inline execution is simpler and more debuggable.
- **Codebase patterns:** All existing routes use `export const runtime = "nodejs"`. Zero `"use client"` files exist — `AnalysisPanel` will be the first client component. Server components pass serializable props to client components (progressive enhancement). All imports use `node:` prefix for Node builtins (`node:fs`, `node:path`, `node:child_process`).
- **Security:** Webhook uses simple bearer token auth (not HMAC — overkill for localhost). Spawn uses `child_process.spawn` array form only (never `exec` or `shell: true`). Path validation uses `path.resolve()` before `startsWith`. Error responses never expose filesystem paths.
- **Process lifecycle:** Track child PID in `status.json`. Set 5-minute timeout with SIGTERM -> SIGKILL escalation (10s grace). Cap at 2 concurrent `claude -p` processes globally via `globalThis`-anchored counter. On status check, verify PID is alive — mark dead PIDs as "failed". Prevent duplicate analysis per videoId by checking status before spawning.
- **Error recovery:** On failure, mark as "failed" with manual retry button on the video page. No auto-retry (adds complexity without benefit for single-user app).

## Acceptance Criteria

### Phase 1: Security Hardening

**Fix pre-existing path traversal before adding new endpoints.**

- [x] `src/app/api/raw/route.ts` — Fix path traversal:
  - Use `path.resolve(p)` before `startsWith(path.resolve(root) + path.sep)` (matches existing pattern in `src/lib/knowledge.ts:87-90`)
  - Strip filesystem paths from error responses: replace `{ error: "read failed", detail: msg }` with `{ error: "read failed" }`. Log full error server-side via `console.error()`.
- [x] `.gitignore` — Add entries:
  ```
  data/queue/
  data/insights/*/status.json
  ```

<details>
<summary>Research Insights: Path Traversal Prevention</summary>

**Best Practice — the correct validation pattern:**
```typescript
import path from "node:path";

const resolvedRoot = path.resolve(root);
const resolvedPath = path.resolve(p);

// CRITICAL: append path.sep to prevent prefix attacks
// e.g., /data/insights-evil matching /data/insights
if (!resolvedPath.startsWith(resolvedRoot + path.sep) && resolvedPath !== resolvedRoot) {
  return NextResponse.json({ error: "forbidden" }, { status: 403 });
}
```

**Error sanitization pattern:**
```typescript
// WRONG — leaks absolute paths in ENOENT messages
return NextResponse.json({ error: "read failed", detail: msg });

// CORRECT — generic error to client, full detail to server logs
console.error(`[raw] Read failed for path ${p}:`, err);
return NextResponse.json({ error: "read failed" }, { status: 500 });
```

**References:**
- [StackHawk: Node.js Path Traversal Guide](https://www.stackhawk.com/blog/node-js-path-traversal-guide-examples-and-prevention/)
- [Sourcery: JavaScript Path Traversal via path.join/resolve](https://www.sourcery.ai/vulnerabilities/javascript-lang-security-audit-path-traversal-path-join-resolve-traversal)
</details>

### Phase 2: Fix Analysis Pipeline (Core)

**Client component + inline execution + polling + cleanup**

**API Route — `src/app/api/analyze/route.ts`:**
- [x] Rewrite POST handler:
  - Returns JSON `{ ok, status }` instead of 303 redirect (fixes SSL issue)
  - Replaces queue file write with direct `child_process.spawn("claude", ["-p", prompt])` — array form only, never `exec()` or `shell: true`
  - Before spawning: checks `status.json` — if `status === "running"` and PID is alive, returns `409 { ok: false, error: "already running" }`
  - Before spawning: checks global concurrency — if `running >= MAX_CONCURRENT (2)`, returns `429 { ok: false, error: "too many analyses running" }`
  - Writes `status.json` with `{ status: "running", pid, startedAt }` before returning response
  - Attaches `child.on("close")` handler (not `"exit"` — `close` guarantees stdio is flushed) to update `status.json` on completion/failure
  - Attaches `child.on("error")` handler for spawn failures (ENOENT, EACCES)
  - Sets 5-minute timeout with SIGTERM -> SIGKILL escalation:
    ```typescript
    const timeout = setTimeout(() => {
      child.kill("SIGTERM");
      // Escalate to SIGKILL after 10s grace period
      const escalation = setTimeout(() => {
        if (child.exitCode === null) child.kill("SIGKILL");
      }, 10_000);
      child.once("exit", () => clearTimeout(escalation));
    }, 300_000);
    child.on("close", () => clearTimeout(timeout));
    ```
  - Keeps child attached (no `detached: true`) — close/error handlers fire as long as server is alive
  - `export const runtime = "nodejs"` (follows existing convention)
- [x] Global concurrency tracking: `globalThis`-anchored counter to survive HMR:
  ```typescript
  declare global { var __runningCount: number | undefined; }
  const getRunning = () => globalThis.__runningCount ?? 0;
  const setRunning = (n: number) => { globalThis.__runningCount = n; };
  ```
- [x] Extract `atomicWriteJson` from current route to reusable location (both this route and webhook will use it). Include `fsync` before rename for durability:
  ```typescript
  // Write to .tmp in SAME directory as destination (prevents EXDEV)
  const fd = fs.openSync(tmp, "w");
  fs.writeSync(fd, json);
  fs.fsyncSync(fd);
  fs.closeSync(fd);
  fs.renameSync(tmp, filePath);
  ```
- [x] Transcript concatenation: use `chunks.join("\n\n---\n\n")` (array join, not repeated string concat)
- [x] Capture stdout via `child.stdout.on("data")` and buffer chunks; write to `analysis.md` on `close` event. Do NOT let claude write the file directly — Node controls output path.

<details>
<summary>Research Insights: child_process.spawn Patterns</summary>

**Critical: Use `close` event, not `exit` event.**
The `exit` event fires when the process ends but stdio streams may still have buffered data. `close` guarantees all stdio is flushed.

**Spawn failure detection:**
```typescript
const child = spawn("claude", ["-p", prompt], {
  stdio: ["ignore", "pipe", "pipe"],
  detached: false,
});

if (child.pid === undefined) {
  // spawn() failed synchronously (ENOENT: claude not on PATH)
  atomicWriteJson(statusPath, { status: "failed", error: "spawn failed" });
  return;
}
```

**Why attached (not detached) is correct:**
- Attached: `close`/`error` events fire reliably, PID tracked via ChildProcess object, timeout/kill works naturally
- Detached + unref: events never fire, must poll PID externally, lose all lifecycle visibility
- Only use detached for fire-and-forget daemons that should outlive the server

**Module-level state in Next.js (globalThis pattern):**
Next.js HMR can duplicate module-level variables. Anchoring on `globalThis` prevents double-counting:
```typescript
declare global { var __processRegistry: Map<string, ChildProcess> | undefined; }
const registry = globalThis.__processRegistry ?? new Map();
if (process.env.NODE_ENV !== "production") {
  globalThis.__processRegistry = registry;
}
```

**References:**
- [Node.js Child Process Documentation](https://nodejs.org/api/child_process.html)
- [Next.js Singleton Pattern Discussion](https://github.com/vercel/next.js/discussions/55263)
</details>

**Status Endpoint — `src/app/api/analyze/status/route.ts`:**
- [x] New GET endpoint, returns JSON:
  ```typescript
  type AnalysisStatusResponse = {
    status: "idle" | "running" | "complete" | "failed";
    startedAt?: string;
    error?: string;
  };
  ```
- [x] Logic:
  - If `status.json` exists with `status === "running"`: verify PID is alive via `process.kill(pid, 0)`. If dead, update to "failed" with `error: "process died unexpectedly"`, return updated status
  - If `status.json` exists with terminal status ("complete" or "failed"): return it
  - If no `status.json` but `analysis.md` exists: return `{ status: "complete" }`
  - If neither exists: return `{ status: "idle" }`
- [x] Never return PID or filesystem paths in response (internal-only fields)
- [x] `Cache-Control: no-store` header to prevent stale cached responses
- [x] VideoId validation: `/^[a-zA-Z0-9_-]{6,11}$/` — cap at 11 chars (standard YouTube ID length)

<details>
<summary>Research Insights: PID Liveness Check</summary>

**Handle EPERM correctly — it means the process IS alive:**
```typescript
function isProcessAlive(pid: number): boolean {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0); // signal 0 = existence check only
    return true;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "EPERM") return true;  // exists, no permission
    if ((err as NodeJS.ErrnoException).code === "ESRCH") return false; // no such process
    return false; // unknown error — fail safe
  }
}
```

**PID reuse caveat:** On Linux, PIDs cycle through ~32768 range. A long-lived app could see a new process inherit a dead worker's PID. For a local tool this is acceptable — the window is extremely unlikely. If needed, also compare `startedAt` age.

**References:**
- [Node.js process.kill documentation](https://nodejs.org/api/process.html)
</details>

**Status File — `data/insights/{videoId}/status.json`:**
- [x] Minimal schema (internal, not sent to client):
  ```typescript
  type StatusFile = {
    status: "running" | "complete" | "failed";
    pid: number;
    startedAt: string;
    completedAt?: string;
    error?: string;
  };
  ```
- [x] Written via atomic write (`.tmp` in same directory + `fsync` + `rename`)
- [x] Reader uses `try/catch` around `JSON.parse` — returns `null` on any error (ENOENT, malformed). No retry loop needed with atomic writes.

<details>
<summary>Research Insights: File-Based Status Tracking</summary>

**Why file-based is correct for this app:**
- Shell worker and Next.js server are separate processes — in-memory state is ruled out
- SQLite `node:sqlite` still experimental (requires `--experimental-sqlite` flag)
- File JSON is human-inspectable with `cat data/insights/videoId/status.json`
- At most N status files where N = number of videos — never a query performance problem

**Atomic write — keep tmp in same directory:**
`rename(2)` is only atomic within a single filesystem. Writing to `/tmp/` and renaming to `data/insights/` could hit EXDEV if they're on different mounts (Docker, symlinks). Always write `.tmp` next to the destination.

**Cleanup strategy:** TTL-based cleanup on startup — remove terminal-state status files older than 7 days. Or simply keep them permanently (they're ~500 bytes each).

**References:**
- [write-file-atomic npm package (pattern reference)](https://www.npmjs.com/package/write-file-atomic)
- [The Secret Life of fsync](https://puzpuzpuz.dev/the-secret-life-of-fsync)
</details>

**Client Component — `src/components/AnalysisPanel.tsx`:**
- [x] New `"use client"` component
- [x] Receives props from server parent: `{ videoId, initialStatus, initialInsight }` (progressive enhancement — works without JS for initial render)
- [x] `fetch()` POST to `/api/analyze` on button click (replaces `<form method="post">`)
- [x] Polling behavior (using `setTimeout`, not `setInterval`):
  - Start at 3s intervals
  - After 30s elapsed: increase to 5s intervals
  - After 60s elapsed: increase to 10s intervals
  - Ceiling: stop after 10 minutes, show "Analysis is taking longer than expected" error
- [x] Polling cleanup:
  - Store timeout ID in `useRef` (not state)
  - Track mounted state via `useRef<boolean>`
  - In `.then()` callback: check `mountedRef.current` before calling `setTimeout` again
  - `useEffect` cleanup function: set `mountedRef.current = false` and `clearTimeout(timeoutRef.current)`
- [x] On "complete": use `startTransition` to commit result (non-blocking render, no page refresh)
- [x] On "failed": shows error message with retry button
- [x] Button states:
  - No analysis: "Run analysis" (primary)
  - Analysis exists: "Re-run analysis" (secondary/muted)
  - Running: "Analyzing..." with spinner (disabled)
  - Failed: "Retry analysis" (warning)
- [x] Disables button while status is "running" (prevents duplicate spawns from UI)
- [x] Imports `Markdown` component (safe — it has no server-only imports, uses `react-markdown` which is pure React)
- [x] Named export: `export function AnalysisPanel(...)` (matches Badge, Markdown convention)

<details>
<summary>Research Insights: React Polling Patterns</summary>

**Custom usePolling hook pattern:**
```typescript
function usePolling<T>(
  fetcher: () => Promise<T>,
  options: {
    enabled: boolean;
    delays: number[];         // [3000, 5000, 10000]
    maxDurationMs: number;    // 600_000 (10 min)
    onComplete?: (data: T) => void;
    isComplete?: (data: T) => boolean;
  }
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const mountedRef = useRef(true);
  const attemptRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    mountedRef.current = true;
    if (!options.enabled) return;
    startTimeRef.current = Date.now();
    attemptRef.current = 0;

    function tick() {
      if (!mountedRef.current) return;
      if (Date.now() - startTimeRef.current >= options.maxDurationMs) {
        // Ceiling reached
        return;
      }

      fetcher()
        .then((data) => {
          if (!mountedRef.current) return;
          if (options.isComplete?.(data)) {
            options.onComplete?.(data);
            return; // Stop polling
          }
          const delay = options.delays[
            Math.min(attemptRef.current, options.delays.length - 1)
          ];
          attemptRef.current++;
          timeoutRef.current = setTimeout(tick, delay);
        })
        .catch(() => {
          if (mountedRef.current) {
            timeoutRef.current = setTimeout(tick, 5000); // back off on error
          }
        });
    }

    tick();
    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutRef.current);
    };
  }, [options.enabled]);
}
```

**Why setTimeout over setInterval:** setInterval fires regardless of whether the previous fetch completed, causing overlapping requests when the server is slow. setTimeout chains ensure sequential, gap-controlled polling.

**React 19 `startTransition` for inline render:**
When polling detects completion, use `startTransition` to commit the result non-blockingly. This prevents UI jank while the insight panel renders:
```typescript
const [isPending, startTransition] = useTransition();
// In onComplete callback:
startTransition(() => setInsightData(result));
```

**Tailwind v4 styling (matching codebase patterns):**
```
// Card: rounded-2xl border border-black/10 bg-[color:var(--card)] p-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]
// Primary button: rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-black/90
// Muted button: rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[var(--muted)]
// Label text: text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]
```

**References:**
- [Dave Gray: usePolling Custom Hook for Next.js](https://www.davegray.codes/posts/usepolling-custom-hook-for-auto-fetching-in-nextjs)
- [Dan Abramov: Making setInterval Declarative with React Hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
- [React 19 use() API](https://react.dev/reference/react/use)
</details>

**Video Page — `src/app/video/[videoId]/page.tsx`:**
- [ ] Extract analysis UI: server component reads initial insight/status, passes as props to `AnalysisPanel`
- [ ] Remove `<form method="post">` — replaced by client component's `fetch()`
- [ ] Keep all other server-rendered content unchanged

**Claude Invocation:**
- [ ] `spawn("claude", ["-p", prompt])` with `--add-dir` flags
- [ ] Prompt includes `/YouTubeAnalyzer` skill reference
- [ ] Transcript content piped via stdin: buffer stdout chunks, write to `analysis.md` on `close` event. Node controls the output path — do not let claude write the file directly.
- [ ] Output: `data/insights/{videoId}/analysis.md`

**Cleanup:**
- [ ] Delete `scripts/analysis-worker.sh` (replaced by inline execution)
- [ ] Delete `data/queue/` directory and all contents (3 queued + 2 failed jobs)

### Phase 3: Webhook & Auto-Analysis

**Post-sync endpoint + sync script integration**

- [ ] `src/app/api/sync-hook/route.ts` — New POST endpoint:
  - Auth: simple bearer token check (`Authorization: Bearer $SYNC_TOKEN`). If `SYNC_TOKEN` env var is not set or empty, return `503 { error: "webhook not configured" }`
  - Returns 200 immediately with `{ ok: true, message: "analysis triggered" }`
  - Asynchronously reads `videos.csv`, identifies un-analyzed videos (videoId exists in CSV but no `data/insights/{videoId}/analysis.md`)
  - Processes videos sequentially (simple `for` loop, no concurrency limiter)
  - Reuses same spawn logic as Phase 2 (respects global `MAX_CONCURRENT` cap and 5-minute timeout)
  - Writes `status.json` + spawns `claude -p` per video
  - Skips videos where `analysis.md` already exists (natural idempotency)
  - Skips videos where `status.json` shows "running" with alive PID (already in progress)
  - Error responses sanitized — never expose internal paths
  - `export const runtime = "nodejs"`
- [ ] `sync_playlist.sh` (in `playlist-transcripts` repo) — Add curl step after git push:
  - `curl --fail-with-body --max-time 10 -X POST -H "Authorization: Bearer $SYNC_TOKEN" http://localhost:3939/api/sync-hook`
  - Fails silently if server isn't running (non-blocking to sync pipeline)
- [ ] Add `SYNC_TOKEN` to `.env.local` — minimum 32 characters, generated via `openssl rand -hex 32`
- [ ] When webhook and analyze route both need `atomicWriteJson` and spawn logic, extract shared code to `src/lib/analysis.ts` at that point (not before)

<details>
<summary>Research Insights: Bearer Token Auth Pattern</summary>

**Use `crypto.timingSafeEqual` for token comparison to prevent timing attacks:**
```typescript
import crypto from "node:crypto";

function validateBearerToken(req: Request, expectedToken: string): boolean {
  const header = req.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;

  const provided = Buffer.from(match[1], "utf8");
  const expected = Buffer.from(expectedToken, "utf8");

  if (provided.length !== expected.length) return false;
  return crypto.timingSafeEqual(provided, expected);
}
```

While timing attacks are academic for a localhost endpoint, `timingSafeEqual` is zero-cost and correct by default.

**References:**
- [Node.js crypto.timingSafeEqual](https://nodejs.org/api/crypto.html#cryptotimingsafeequalbuffera-bufferb)
</details>

## Files Changed

| File | Change |
|------|--------|
| `src/app/api/raw/route.ts` | Fix path traversal with `path.resolve()`, strip error details |
| `src/app/api/analyze/route.ts` | Rewrite: inline spawn, JSON response, PID tracking, concurrency cap, timeout with SIGTERM/SIGKILL escalation |
| `src/app/api/analyze/status/route.ts` | **New** — polling endpoint with PID liveness check (ESRCH/EPERM handling) |
| `src/app/api/sync-hook/route.ts` | **New** — webhook with bearer token auth (timingSafeEqual), sequential batch |
| `src/app/video/[videoId]/page.tsx` | Extract analysis UI to client component wrapper |
| `src/components/AnalysisPanel.tsx` | **New** — client component with fetch, polling (backoff + ceiling + cleanup), startTransition |
| `scripts/analysis-worker.sh` | **Delete** |
| `data/queue/` | **Delete** contents |
| `.env.local` | Add `SYNC_TOKEN` |
| `.gitignore` | Add `data/queue/`, `data/insights/*/status.json` |
| `sync_playlist.sh` (playlist-transcripts repo) | Add curl webhook step |

## Dependencies & Risks

- **`claude` CLI must be in PATH.** Confirmed available on this machine.
- **Local-only deployment.** This architecture (filesystem state, `child_process.spawn`, absolute paths) only works on a persistent local server. It will not work on Vercel, AWS Lambda, or any serverless platform.
- **First client component.** `AnalysisPanel.tsx` will be the first `"use client"` file. Must pass all needed data as serializable props from server component. `Markdown` component (pure React, no server imports) is safe to import from client component.
- **Tailwind v4 compatibility.** New component must use CSS-first patterns (`bg-[color:var(--card)]`, CSS custom properties).
- **Process lifecycle.** If server is stopped during analysis, `status.json` will show "running" with a dead PID. The status endpoint detects this via PID liveness check (handles ESRCH/EPERM correctly) and auto-corrects to "failed". The 5-minute timeout with SIGTERM/SIGKILL escalation prevents hung processes.
- **Global concurrency cap.** `globalThis`-anchored counter survives HMR but resets on full server restart. This is acceptable — any "running" processes from before the restart are dead and will be detected by PID liveness check.

## Success Metrics

- Clicking "Run analysis" triggers analysis without errors or SSL issues
- Analysis progress visible in real-time (button state + polling with backoff)
- Completed analysis renders inline without page refresh (via startTransition)
- Duplicate clicks while running are blocked (returns 409 "already running")
- Third concurrent analysis returns 429 "too many analyses running"
- Hung processes killed after 5 minutes (SIGTERM, then SIGKILL after 10s grace)
- Dead processes auto-detected and marked "failed" on next status check
- New videos from `sync_playlist.sh` auto-analyzed via webhook
- No path traversal possible on `/api/raw`
- Error responses never contain filesystem paths
- Button shows "Re-run analysis" when analysis already exists

## Review Changes Applied

### Round 1 — Initial technical review (2026-02-22):

1. Collapsed 6 phases to 3 — Phases 1-3 merged (tightly coupled), Phases 4-5 merged, cleanup inlined
2. Simplified webhook auth — HMAC-SHA256 replaced with bearer token (localhost doesn't need replay protection)
3. Added PID tracking — `status.json` includes PID, status endpoint verifies liveness
4. Added duplicate prevention — Check if already running before spawning
5. Dropped auto-retry — Manual retry button suffices for single-user app
6. Sequential batch processing — Removed concurrency limiter, simple `for` loop instead
7. Added path traversal fix — Pre-existing `/api/raw` bug added to scope
8. Spawn safety — Explicitly requires array form, never `exec()` or `shell: true`
9. Removed premature abstractions — Spawn logic lives in route handler, extract to `src/lib/analysis.ts` when webhook needs it
10. Dropped unused webhook payload — No structured payload needed, endpoint reads `videos.csv` directly

### Round 2 — Five-agent deep review (2026-02-22):

Reviewers: simplicity, security, performance, architecture, spec-flow

11. **Reordered phases** — Security fix moved to Phase 1 (before adding new attack surface), was Phase 3
12. **Added global concurrency cap** — `MAX_CONCURRENT = 2` module-level counter, returns 429 (performance + simplicity)
13. **Added spawn timeout** — 5-minute `setTimeout` to kill hung `claude -p` processes (performance + security)
14. **Polling backoff** — 3s -> 5s -> 10s instead of fixed 3s intervals (performance)
15. **Polling ceiling** — Stop after 10 minutes, show timeout error (performance + architecture)
16. **Polling cleanup** — Specified `useRef` for timeout ID, mounted guard pattern (architecture)
17. **Status schema defined** — Explicit TypeScript types for status file and API response (architecture)
18. **Error sanitization explicit** — Strip `detail: msg` from `/api/raw` errors, `console.error` server-side only (security)
19. **Transcript concatenation** — Array join instead of string concat to avoid O(n^2) copies (performance)
20. **`.gitignore` definitive** — Changed "if needed" to explicit entries for `data/queue/` and `status.json` (security)
21. **`atomicWriteJson` extraction** — Noted need to extract from route to shared utility when webhook reuses it (architecture)
22. **Button states refined** — "Re-run analysis" when analysis exists, "Retry analysis" on failure (spec-flow)
23. **Webhook startup validation** — Return 503 if `SYNC_TOKEN` not configured (security)
24. **Token entropy** — Minimum 32 chars, `openssl rand -hex 32` (security)
25. **Local-only deployment** — Explicitly documented as constraint, not serverless-compatible (spec-flow + architecture)
26. **Progressive enhancement** — Server component renders initial state, client component enhances with polling (architecture)
27. **Status endpoint headers** — `Cache-Control: no-store` to prevent stale polling (architecture)
28. **PID not exposed to client** — Status API returns status/startedAt/error only, not PID (security)

### Round 3 — Deepening with research agents (2026-02-22):

29. **SIGTERM/SIGKILL escalation** — 10s grace period between SIGTERM and SIGKILL (child_process research)
30. **`close` over `exit` event** — `close` guarantees stdio is flushed; `exit` may leave buffered data (child_process research)
31. **`globalThis` anchoring** — Module-level state (concurrency counter) survives Next.js HMR (child_process research)
32. **`fsync` before rename** — Ensures data durability before atomic rename (file-based status research)
33. **EXDEV handling** — Tmp file in same directory as destination prevents cross-device rename failure (file-based status research)
34. **EPERM in PID check** — `process.kill(pid, 0)` throws EPERM when process exists but lacks permission = treat as alive (security research)
35. **`startTransition` for inline render** — Non-blocking commit of completed analysis data (React polling research)
36. **VideoId length cap** — Changed from `{6,}` to `{6,11}` matching YouTube's standard 11-char IDs (security research)
37. **Stdout capture by Node** — Buffer stdout chunks and write `analysis.md` from Node, not from claude (child_process research)
38. **Named export convention** — `export function AnalysisPanel(...)` matches Badge, Markdown patterns (repo research)
39. **`timingSafeEqual` for token** — Zero-cost correct-by-default token comparison (security research)

### Out of scope (separate tasks):

- Security headers in `next.config.ts` (hardening, not pipeline-related)
- `groupVideos()` caching (performance optimization, separate PR)
- `listRecentKnowledge`/`listRecentInsights` TTL caching (optimization)
- Channel page async I/O refactor (optimization)
- Hardcoded default path removal from source (tech debt)
- CSRF/origin checks on POST endpoints (local-only app)
- Analysis result versioning (not needed currently)

## References

- Brainstorm: `docs/brainstorms/2026-02-22-analysis-pipeline-fix-brainstorm.md`
- Existing API route: `src/app/api/analyze/route.ts:23-88`
- Existing video page: `src/app/video/[videoId]/page.tsx:60-69` (form to replace)
- Existing insights lib: `src/lib/insights.ts` (readInsightMarkdown pattern)
- Path validation pattern: `src/lib/knowledge.ts:87-90` (correct `path.resolve` usage)
- Worker script (to delete): `scripts/analysis-worker.sh`
- Sync script: `/Users/aojdevstudio/projects/clawd/playlist-transcripts/sync_playlist.sh`
- [Node.js Child Process Documentation](https://nodejs.org/api/child_process.html)
- [React 19 use() API](https://react.dev/reference/react/use)
- [Dan Abramov: Making setInterval Declarative with React Hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
- [StackHawk: Node.js Path Traversal Guide](https://www.stackhawk.com/blog/node-js-path-traversal-guide-examples-and-prevention/)
- [Next.js Singleton Pattern Discussion](https://github.com/vercel/next.js/discussions/55263)
