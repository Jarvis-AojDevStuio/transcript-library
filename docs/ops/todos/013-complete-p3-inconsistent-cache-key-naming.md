---
status: pending
priority: p3
issue_id: "013"
tags: [code-review, quality]
dependencies: []
---

# Inconsistent Cache Key Naming Across Modules

## Problem Statement

`catalog.ts` uses `mtimeMs` as the cache key field name, while `insights.ts` and `recent.ts` use `dirMtimeMs`. The inconsistency makes the caching pattern harder to reason about. Normalize to a single convention.

## Findings

- **Source:** Architecture Strategist
- **Location:** `src/lib/catalog.ts`, `src/lib/insights.ts`, `src/lib/recent.ts`

## Acceptance Criteria

- [ ] All cache objects use the same field name for mtime
