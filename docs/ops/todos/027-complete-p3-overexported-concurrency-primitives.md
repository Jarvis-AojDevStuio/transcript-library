---
status: complete
priority: p3
issue_id: "027"
tags: [code-review, simplicity]
dependencies: ["014"]
---

# Reduce Over-Exported Concurrency Primitives

## Problem Statement

`src/lib/analysis.ts` exports 5 concurrency functions (`getRunningCount`, `incrementRunning`, `decrementRunning`, `canSpawn`, `tryAcquireSlot`) where only 2 are needed externally: `tryAcquireSlot()` and `decrementRunning()`. After extracting shared `spawnAnalysis()` (#014), only `spawnAnalysis()` itself needs export — the primitives become internal.

## Acceptance Criteria

- [ ] Only necessary concurrency functions exported
- [ ] Internal primitives kept private to module

## Work Log

| Date       | Action                         | Learnings                   |
| ---------- | ------------------------------ | --------------------------- |
| 2026-02-22 | Created from PR #3 code review | Simplicity reviewer flagged |
