---
status: pending
priority: p1
issue_id: "001"
tags: [code-review, performance, correctness]
dependencies: []
---

# Default Parameter Evaluation Defeats groupVideos Cache

## Problem Statement

In `src/lib/catalog.ts`, `groupVideos(rows = readVideoRows())` uses a default parameter that is evaluated **at call time** in JavaScript, not lazily. Every call to `groupVideos()` (with no argument) executes `readVideoRows()` — including its `fs.statSync()` — before the cache check in `groupVideos` even runs. This results in 2 synchronous stat calls per invocation when the cache is warm, where only 1 (or zero) should be needed.

Additionally, the `rows` parameter creates a cache correctness hazard: the cache is keyed on `mtimeMs` but the function accepts arbitrary rows. Custom rows could be cached and served for subsequent default calls.

## Findings

- **Source:** Performance Oracle, TypeScript Reviewer, Code Simplicity Reviewer (3 independent agents flagged this)
- **Location:** `src/lib/catalog.ts:~131`
- **Evidence:** JavaScript spec — default params evaluate at call time. `readVideoRows()` internally calls `fs.statSync(csvPath())`.
- **Impact:** 2 blocking `statSync` syscalls per page render on the hot path. No callers pass custom rows.

## Proposed Solutions

### Option A: Remove the `rows` parameter entirely (Recommended)

```typescript
export function groupVideos(): Map<string, Video> {
  const p = csvPath();
  const st = fs.statSync(p);
  if (_videosCache && _videosCache.mtimeMs === st.mtimeMs) return _videosCache.map;
  const rows = readVideoRows();
  // ...rest unchanged
}
```

- **Pros:** Eliminates double stat, removes cache correctness hazard, simplest fix
- **Cons:** Removes flexibility (but no callers use it)
- **Effort:** Small
- **Risk:** Low

### Option B: Make parameter optional with nullish coalescing

```typescript
export function groupVideos(rows?: VideoRow[]): Map<string, Video> {
  const p = csvPath();
  const st = fs.statSync(p);
  if (_videosCache && _videosCache.mtimeMs === st.mtimeMs) return _videosCache.map;
  const resolvedRows = rows ?? readVideoRows();
  // ...
}
```

- **Pros:** Preserves flexibility
- **Cons:** Keeps unnecessary API surface
- **Effort:** Small
- **Risk:** Low

## Recommended Action

Option A — remove the `rows` parameter.

## Technical Details

- **Affected files:** `src/lib/catalog.ts`
- **Components:** `groupVideos()`, `readVideoRows()`

## Acceptance Criteria

- [ ] `groupVideos()` performs at most 1 `statSync` call on cache hit
- [ ] No callers pass custom rows (verified by search)
- [ ] Build passes (`npm run build`)

## Work Log

| Date       | Action                         | Learnings                             |
| ---------- | ------------------------------ | ------------------------------------- |
| 2026-02-22 | Created from code review PR #1 | 3/5 agents independently flagged this |

## Resources

- [PR #1](https://github.com/Jarvis-AojDevStuio/transcript-library/pull/1)
