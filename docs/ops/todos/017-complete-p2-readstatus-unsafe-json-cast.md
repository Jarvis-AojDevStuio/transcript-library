---
status: complete
priority: p2
issue_id: "017"
tags: [code-review, typescript, type-safety]
dependencies: []
---

# readStatus Performs Unsafe JSON.parse Cast

## Problem Statement

In `src/lib/analysis.ts` line 103, `JSON.parse(raw) as StatusFile` provides zero runtime type safety. If `status.json` is corrupted, partially written, or from an older schema, every downstream consumer silently receives malformed data.

## Findings

- `readStatus()` at line 103: `return JSON.parse(raw) as StatusFile;`
- Downstream: `isProcessAlive(status.pid)` — if `pid` is `undefined`, `process.kill(undefined, 0)` throws
- The `as` cast bypasses TypeScript's type system entirely at runtime

## Proposed Solutions

### Option A: Add type guard validation (Recommended)

**Pros:** Runtime safety, graceful degradation on corrupt files
**Cons:** ~10 lines of code
**Effort:** Small (10 minutes)
**Risk:** None

```typescript
function isStatusFile(val: unknown): val is StatusFile {
  if (typeof val !== "object" || val === null) return false;
  const obj = val as Record<string, unknown>;
  return (
    (obj.status === "running" || obj.status === "complete" || obj.status === "failed") &&
    typeof obj.pid === "number" &&
    typeof obj.startedAt === "string"
  );
}
```

## Acceptance Criteria

- [ ] `readStatus()` validates parsed JSON before returning
- [ ] Returns `null` for invalid/corrupted status files
- [ ] No `as StatusFile` cast remains

## Work Log

| Date       | Action                         | Learnings                               |
| ---------- | ------------------------------ | --------------------------------------- |
| 2026-02-22 | Created from PR #3 code review | TypeScript reviewer flagged unsafe cast |
