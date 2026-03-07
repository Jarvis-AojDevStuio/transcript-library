---
status: complete
priority: p3
issue_id: "026"
tags: [code-review, simplicity]
dependencies: []
---

# Inline Cryptic dec() Alias

## Problem Statement

`src/app/video/[videoId]/page.tsx` lines 9-11 define a 3-line function `dec()` that is just `decodeURIComponent`, used exactly once. Inline it: `const id = decodeURIComponent(videoId);`

## Acceptance Criteria

- [ ] `dec()` function removed
- [ ] `decodeURIComponent` called directly

## Work Log

| Date       | Action                         | Learnings                              |
| ---------- | ------------------------------ | -------------------------------------- |
| 2026-02-22 | Created from PR #3 code review | TypeScript + Simplicity agents flagged |
