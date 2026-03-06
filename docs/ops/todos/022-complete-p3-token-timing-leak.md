---
status: complete
priority: p3
issue_id: "022"
tags: [code-review, security]
dependencies: []
---

# Bearer Token Timing Leak on Length Mismatch

## Problem Statement

In `src/app/api/sync-hook/route.ts` lines 28-30, the early return on `provided.length !== expected.length` leaks whether the attacker guessed the correct token length via timing analysis. For a high-entropy token (32+ bytes), practical exploitation is low.

## Proposed Fix

Use HMAC-then-compare to normalize buffer lengths:

```typescript
const provided = crypto.createHmac("sha256", "key").update(match[1]).digest();
const expected = crypto.createHmac("sha256", "key").update(expectedToken).digest();
return crypto.timingSafeEqual(provided, expected);
```

## Acceptance Criteria

- [ ] Token comparison is fully constant-time regardless of input length

## Work Log

| Date       | Action                         | Learnings                 |
| ---------- | ------------------------------ | ------------------------- |
| 2026-02-22 | Created from PR #3 code review | Security sentinel flagged |
