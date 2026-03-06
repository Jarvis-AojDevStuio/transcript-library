---
status: complete
priority: p3
issue_id: "024"
tags: [code-review, architecture, api-design]
dependencies: []
---

# Inconsistent Error Response Shapes Across API Routes

## Problem Statement

API routes use different error envelope shapes: `analyze` uses `{ok: false, error}`, `status` uses `{error}` without `ok`, `sync-hook` mixes both patterns. This makes client-side error handling fragile and API consumption inconsistent.

## Acceptance Criteria

- [ ] All API routes use the same error response shape
- [ ] Standard envelope type defined and applied

## Work Log

| Date       | Action                         | Learnings                       |
| ---------- | ------------------------------ | ------------------------------- |
| 2026-02-22 | Created from PR #3 code review | Architecture strategist flagged |
