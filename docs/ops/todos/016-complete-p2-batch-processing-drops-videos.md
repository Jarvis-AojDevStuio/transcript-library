---
status: complete
priority: p2
issue_id: "016"
tags: [code-review, architecture, performance]
dependencies: ["014"]
---

# Sync-hook Batch Processing Silently Drops Most Videos

## Problem Statement

In `src/app/api/sync-hook/route.ts` (lines 170-176), the batch loop waits only once (5 seconds) for a concurrency slot, then permanently skips the video with `continue`. Since each `claude -p` analysis takes 1-5 minutes and MAX_CONCURRENT=2, after the first 2 videos spawn, every subsequent video gets skipped. The response claims `queued: N` but only 2-3 actually execute.

## Findings

- With 50 unanalyzed videos, only 2 will actually be processed
- The `processAsync()` completes in ~4 minutes of sleeping (50 videos × 5s waits), but only 2 analyses run
- Response says `queued: 50` misleading the caller
- Flagged by: Performance, Architecture, Simplicity agents

## Proposed Solutions

### Option A: Proper wait-for-slot with backoff (Recommended)

**Pros:** Actually processes all videos, correct behavior
**Cons:** Webhook response returns quickly but processing takes hours
**Effort:** Medium (30 minutes)
**Risk:** Low

### Option B: Spawn what fits, return honest count

**Pros:** Simple, transparent
**Cons:** Requires re-invocation for remaining videos
**Effort:** Small (15 minutes)
**Risk:** Low

## Recommended Action

Option B for simplicity — spawn up to MAX_CONCURRENT, return `{ started: 2, skipped: 48 }`

## Acceptance Criteria

- [ ] Response accurately reports started vs skipped count
- [ ] No videos silently dropped without logging
- [ ] Webhook can be re-invoked to process remaining videos

## Work Log

| Date       | Action                         | Learnings                                |
| ---------- | ------------------------------ | ---------------------------------------- |
| 2026-02-22 | Created from PR #3 code review | 3/6 agents flagged batch processing flaw |
