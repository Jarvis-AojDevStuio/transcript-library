---
status: pending
priority: p3
issue_id: "010"
tags: [code-review, quality]
dependencies: []
---

# Duplicated Skeleton Class Patterns Across 5 Files

## Problem Statement

The card container class `rounded-2xl border border-black/10 bg-[color:var(--card)] p-5 shadow-[...]` and pulse bar pattern `animate-pulse rounded bg-black/5` are repeated across 4 loading.tsx files + SidebarSkeleton (~133 lines total). Consider extracting `<SkeletonCard>` and `<PulseBar>` primitives.

## Findings

- **Source:** TypeScript Reviewer, Simplicity Reviewer, Architecture Strategist
- **Location:** `src/app/loading.tsx`, `src/app/channel/[channel]/loading.tsx`, `src/app/knowledge/loading.tsx`, `src/app/video/[videoId]/loading.tsx`, `src/app/layout.tsx`

## Acceptance Criteria

- [ ] Shared skeleton primitives reduce duplication
- [ ] OR explicit decision to accept duplication documented
