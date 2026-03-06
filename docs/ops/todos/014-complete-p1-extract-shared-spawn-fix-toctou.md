---
status: complete
priority: p1
issue_id: "014"
tags: [code-review, architecture, security, duplication]
dependencies: []
---

# Extract Shared spawnAnalysis and Fix TOCTOU Race in sync-hook

## Problem Statement

The spawn-child-process logic (~80 lines) is duplicated nearly verbatim between `src/app/api/analyze/route.ts` (lines 70-160) and `src/app/api/sync-hook/route.ts` (lines 33-134). The `tryAcquireSlot()` fix for the TOCTOU race was applied to `analyze/route.ts` but NOT to `sync-hook/route.ts`, which still uses the vulnerable `canSpawn()` + `incrementRunning()` pattern.

This is the **single most impactful finding** — fixing it resolves duplication, the TOCTOU race, and non-null assertion ordering (see #015) in one refactor.

**Flagged by:** 5/6 review agents (Security, Architecture, TypeScript, Performance, Simplicity)

## Findings

- `sync-hook/route.ts` line 34: `canSpawn()` check separated from `incrementRunning()` at line 68 by ~34 lines of code
- `analyze/route.ts` line 40: correctly uses `tryAcquireSlot()` (atomic check-and-increment)
- Both files contain identical: stdin piping, PID guard, stdout/stderr buffering, 5-minute SIGTERM→SIGKILL timeout, status file writes, error handler
- Only difference: log prefix (`[analyze]` vs `[sync-hook]`) and input parameter shape

## Proposed Solutions

### Option A: Extract to `src/lib/analysis.ts` (Recommended)

**Pros:** Single source of truth, consistent behavior, easy to test
**Cons:** Small refactor effort
**Effort:** Medium (1-2 hours)
**Risk:** Low

```typescript
export function spawnAnalysis(
  videoId: string,
  meta: { title: string; channel: string; topic: string; publishedDate: string },
  transcript: string,
): boolean {
  if (!tryAcquireSlot()) return false;
  // ... unified spawn lifecycle ...
}
```

### Option B: Sync-hook calls analyze route internally

**Pros:** Zero duplication
**Cons:** Tighter coupling, harder to customize per-route behavior
**Effort:** Small
**Risk:** Medium

## Recommended Action

Option A — extract shared function to `src/lib/analysis.ts`

## Technical Details

**Affected files:**

- `src/lib/analysis.ts` — add `spawnAnalysis()` function
- `src/app/api/analyze/route.ts` — replace inline spawn with shared function call
- `src/app/api/sync-hook/route.ts` — delete `spawnAnalysis()`, import from analysis.ts

## Acceptance Criteria

- [ ] Single `spawnAnalysis()` function exists in `src/lib/analysis.ts`
- [ ] Both routes call the shared function
- [ ] `tryAcquireSlot()` is used (not `canSpawn()`+`incrementRunning()`)
- [ ] PID check happens before stdin write (no non-null assertion needed)
- [ ] All existing tests/build passes

## Work Log

| Date       | Action                         | Learnings                             |
| ---------- | ------------------------------ | ------------------------------------- |
| 2026-02-22 | Created from PR #3 code review | 5/6 agents flagged this independently |

## Resources

- PR #3: https://github.com/Jarvis-AojDevStuio/transcript-library/pull/3
- Related: docs/reviews/pr-3-review-todos.md (line 34, marked as "deferred")
