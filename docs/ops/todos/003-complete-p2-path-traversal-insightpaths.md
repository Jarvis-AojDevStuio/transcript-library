---
status: pending
priority: p2
issue_id: "003"
tags: [code-review, security]
dependencies: []
---

# Path Traversal Risk in insightPaths() — No videoId Validation

## Problem Statement

`insightPaths(videoId)` in `insights.ts` and `insightDir(videoId)` in `analysis.ts` use `videoId` directly in `path.join()` with no validation. A crafted videoId containing `../` sequences could resolve to paths outside `data/insights/`. While currently protected by the CSV catalog lookup in page routes (Map.get returns undefined for non-existent IDs), `isValidVideoId()` already exists in the codebase but is not applied at the filesystem boundary.

## Findings

- **Source:** Security Sentinel
- **Location:** `src/lib/insights.ts:5-12`, `src/lib/analysis.ts:86-96`
- **Severity:** Medium (indirect exploitation, guarded by CSV lookup)
- **Mitigation exists:** `isValidVideoId()` regex (`/^[a-zA-Z0-9_-]{6,11}$/`) in analysis.ts, used by API routes but not by the functions themselves

## Proposed Solutions

### Option A: Add isValidVideoId() guard (Recommended)

```typescript
export function insightPaths(videoId: string) {
  if (!isValidVideoId(videoId)) throw new Error(`Invalid videoId: ${videoId}`);
  // ...existing code
}
```

- **Effort:** Small (2 lines per function)
- **Risk:** Low

## Acceptance Criteria

- [ ] `insightPaths()` rejects videoIds containing `../`
- [ ] `insightDir()` rejects videoIds containing `../`
- [ ] Existing valid videoIds continue to work

## Work Log

| Date       | Action                         | Learnings                |
| ---------- | ------------------------------ | ------------------------ |
| 2026-02-22 | Created from code review PR #1 | Defense-in-depth missing |
