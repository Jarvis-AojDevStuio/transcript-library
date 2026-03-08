---
status: complete
priority: p2
issue_id: "018"
tags: [code-review, security]
dependencies: []
---

# Path Traversal: Resolve Relative to Root, Not CWD

## Problem Statement

In `src/app/api/raw/route.ts` line 14, `path.resolve(p)` resolves user-supplied paths against `process.cwd()` instead of the trusted `root` directory. While the `startsWith` check catches most traversal attempts, CWD-dependent resolution is fragile.

## Findings

- Line 14: `const resolved = path.resolve(p)` — resolves against CWD
- Should be: `const resolved = path.resolve(root, p)` — resolves against trusted root
- The fix is one-line and eliminates CWD dependency

## Proposed Solutions

### Option A: Resolve against root (Recommended)

**Effort:** Small (1 minute)
**Risk:** None

```typescript
const resolved = path.resolve(root, p);
```

## Acceptance Criteria

- [ ] `path.resolve(root, p)` used instead of `path.resolve(p)`
- [ ] Relative paths resolve within the transcript repo only

## Work Log

| Date       | Action                         | Learnings                                |
| ---------- | ------------------------------ | ---------------------------------------- |
| 2026-02-22 | Created from PR #3 code review | Security sentinel flagged CWD dependency |
