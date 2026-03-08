---
status: complete
priority: p3
issue_id: "021"
tags: [code-review, performance, ux]
dependencies: []
---

# Replace window.location.reload() With router.refresh()

## Problem Statement

In `src/components/AnalysisPanel.tsx` line 56, `window.location.reload()` triggers a full page reload on analysis completion. This discards client state, re-fetches all resources, and causes a visible page flash. Next.js `router.refresh()` re-runs server components without full reload.

## Acceptance Criteria

- [ ] `useRouter()` imported from `next/navigation`
- [ ] `router.refresh()` used instead of `window.location.reload()`

## Work Log

| Date       | Action                         | Learnings          |
| ---------- | ------------------------------ | ------------------ |
| 2026-02-22 | Created from PR #3 code review | 3/6 agents flagged |
