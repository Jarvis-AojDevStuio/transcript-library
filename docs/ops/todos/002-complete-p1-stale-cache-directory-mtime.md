---
status: pending
priority: p1
issue_id: "002"
tags: [code-review, performance, correctness]
dependencies: []
---

# Directory Mtime Unreliable for Nested File Changes — Stale Cache

## Problem Statement

The `_insightSetCache` in `insights.ts` and `_recentInsightsCache` in `recent.ts` use `fs.statSync(base).mtimeMs` on the `data/insights/` directory as the cache invalidation key. On most filesystems (APFS, ext4, HFS+), a directory's mtime only updates when **direct children** are added, removed, or renamed — NOT when files within subdirectories are modified.

This means re-running analysis on an existing video (overwriting `data/insights/{videoId}/analysis.md`) will NOT invalidate the cache, serving stale data until a new insight directory is created or the server restarts.

## Findings

- **Source:** Performance Oracle, Architecture Strategist, Security Sentinel, TypeScript Reviewer (4 agents flagged this)
- **Location:** `src/lib/insights.ts:~31-46`, `src/lib/recent.ts:~63-69`
- **Impact:** `listRecentInsights` shows stale ordering after re-analysis. `hasInsight` is less affected since it only checks existence.

## Proposed Solutions

### Option A: Remove caches, rely on simplicity (Recommended for local-only app)

Remove `_insightSetCache` and `_recentInsightsCache`. The Sidebar is already behind Suspense. These functions scan a small number of directories — the perf gain is minimal.

- **Pros:** Eliminates bug entirely, reduces code complexity
- **Cons:** Slightly more I/O per request
- **Effort:** Small
- **Risk:** Low

### Option B: Add TTL-based invalidation alongside mtime

```typescript
const TTL_MS = 5000; // 5 seconds
if (_cache && _cache.dirMtimeMs === st.mtimeMs && Date.now() - _cache.builtAt < TTL_MS) {
  return _cache.data;
}
```

- **Pros:** Catches stale data within 5 seconds
- **Cons:** Adds complexity, arbitrary TTL
- **Effort:** Small
- **Risk:** Low

### Option C: Track max mtime of analysis.md files as cache key

- **Pros:** Precise invalidation
- **Cons:** Requires statting all insight files (N stat calls on every check)
- **Effort:** Medium
- **Risk:** Low

## Recommended Action

Option A for a local-only tool.

## Acceptance Criteria

- [ ] After re-analyzing a video, "Recent insights" shows updated ordering without server restart
- [ ] `hasInsight()` returns correct results after new insights are generated
- [ ] Build passes

## Work Log

| Date       | Action                         | Learnings                             |
| ---------- | ------------------------------ | ------------------------------------- |
| 2026-02-22 | Created from code review PR #1 | 4/5 agents flagged this independently |

## Resources

- [PR #1](https://github.com/Jarvis-AojDevStuio/transcript-library/pull/1)
