---
status: pending
priority: p2
issue_id: "006"
tags: [code-review, architecture, ux]
dependencies: []
---

# Preview Text Silently Removed from Channel Page

## Problem Statement

The channel page previously displayed a 2-line preview snippet of each video's insight markdown. This PR replaces `readInsightMarkdown()` + `makePreview()` with `hasInsight()` (a Set membership check), removing the preview text rendering entirely. This is a user-visible feature removal that is not mentioned in the PR title or description.

## Findings

- **Source:** Architecture Strategist, TypeScript Reviewer, Code Simplicity Reviewer (3 agents flagged)
- **Location:** `src/app/channel/[channel]/page.tsx` — removed `preview` variable and rendering block
- **Trade-off:** Eliminates N file reads on the channel listing (significant perf win), but removes a UX feature

## Proposed Solutions

### Option A: Document and accept removal

Add to PR description: "Preview text on channel page removed to eliminate N+1 file reads."

- **Effort:** Trivial
- **Risk:** None (if intentional)

### Option B: Pre-compute previews into the insight cache

Add a `preview` field to the insight set cache, computed once on cold start.

- **Effort:** Medium
- **Risk:** Low

## Acceptance Criteria

- [ ] PR description explicitly documents the preview text removal
- [ ] OR preview text is restored via a batched approach
