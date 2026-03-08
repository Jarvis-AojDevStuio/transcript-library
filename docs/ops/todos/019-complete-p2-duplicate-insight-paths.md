---
status: complete
priority: p2
issue_id: "019"
tags: [code-review, architecture, dry]
dependencies: []
---

# Consolidate Duplicate Insight Path Definitions

## Problem Statement

Three modules independently construct `data/insights/<videoId>` paths:

- `src/lib/analysis.ts`: `insightDir()`, `statusPath()`, `analysisPath()`
- `src/lib/insights.ts`: `insightPaths()` with `dir`, `analysis`, `legacy`
- `src/lib/recent.ts`: `path.join(process.cwd(), "data", "insights")`

If the directory structure changes, three files need updating.

## Findings

- `analysis.ts` line 87: `path.join(process.cwd(), "data", "insights", videoId)`
- `insights.ts` line 6: `path.join(process.cwd(), "data", "insights", videoId)`
- `recent.ts` line 63: `path.join(process.cwd(), "data", "insights")`
- `insightPaths(id).dir === insightDir(id)` and `insightPaths(id).analysis === analysisPath(id)`

## Proposed Solutions

### Option A: Consolidate into analysis.ts (Recommended)

**Pros:** analysis.ts is already the most complete; add legacy path support
**Effort:** Small (20 minutes)
**Risk:** Low

## Acceptance Criteria

- [ ] Single canonical source for all insight paths
- [ ] `insights.ts` and `recent.ts` import from canonical module
- [ ] No duplicate `data/insights` path construction

## Work Log

| Date       | Action                         | Learnings                                     |
| ---------- | ------------------------------ | --------------------------------------------- |
| 2026-02-22 | Created from PR #3 code review | Architecture strategist flagged DRY violation |
