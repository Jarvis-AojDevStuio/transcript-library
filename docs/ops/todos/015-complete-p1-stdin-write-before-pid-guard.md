---
status: complete
priority: p1
issue_id: "015"
tags: [code-review, security, typescript]
dependencies: ["014"]
---

# Fix Non-null stdin Assertion Before PID Guard

## Problem Statement

In `src/app/api/analyze/route.ts` (lines 76-79) and `src/app/api/sync-hook/route.ts` (lines 55-58), `child.stdin!.write(prompt)` executes BEFORE the `child.pid === undefined` check. When `spawn()` fails (e.g., `claude` binary not found), `stdin` can be `null`, causing an uncaught `TypeError` before reaching the safety guard.

## Findings

- `analyze/route.ts` line 76: `child.stdin!.write(prompt)` — non-null assertion
- `analyze/route.ts` line 79: `if (child.pid === undefined)` — PID guard comes too late
- Same pattern in `sync-hook/route.ts` lines 55-58

## Proposed Solutions

### Option A: Move PID check before stdin write (Recommended)

**Pros:** Eliminates non-null assertion entirely, prevents crash on spawn failure
**Cons:** None
**Effort:** Small (5 minutes)
**Risk:** None

```typescript
const child = spawn("claude", ["-p"], { stdio: ["pipe", "pipe", "pipe"], detached: false });
if (child.pid === undefined) {
  decrementRunning();
  // handle failure...
  return;
}
// Now safe: spawn succeeded
child.stdin.write(prompt); // No ! needed
child.stdin.end();
```

## Recommended Action

Option A — resolved automatically if #014 is implemented (shared function)

## Acceptance Criteria

- [ ] PID undefined check happens before any stdin write
- [ ] No `child.stdin!` non-null assertions remain
- [ ] No `child.pid!` non-null assertions in close handler (capture `const pid = child.pid` after guard)

## Work Log

| Date       | Action                         | Learnings                                 |
| ---------- | ------------------------------ | ----------------------------------------- |
| 2026-02-22 | Created from PR #3 code review | TypeScript reviewer caught ordering issue |
