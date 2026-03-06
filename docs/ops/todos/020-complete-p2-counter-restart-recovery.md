---
status: complete
priority: p2
issue_id: "020"
tags: [code-review, architecture, reliability]
dependencies: []
---

# globalThis Counter Does Not Survive Process Restarts

## Problem Statement

`globalThis.__analysisRunningCount` resets to 0 on Node.js restart while spawned `claude` child processes may still be running. This allows over-spawning past MAX_CONCURRENT after a crash or `next dev` HMR restart.

## Findings

- Counter is purely in-memory (`src/lib/analysis.ts` lines 22-50)
- No startup reconciliation against `data/insights/*/status.json`
- Counter can also drift positive if `decrementRunning()` is missed (e.g., synchronous spawn() throw)

## Proposed Solutions

### Option A: Lazy initialization from disk (Recommended)

**Pros:** Self-heals on restart, simple implementation
**Effort:** Small (20 minutes)
**Risk:** Low

```typescript
let _initialized = false;
export function getRunningCount(): number {
  if (!_initialized) {
    globalThis.__analysisRunningCount = countAliveFromDisk();
    _initialized = true;
  }
  return globalThis.__analysisRunningCount ?? 0;
}
```

## Acceptance Criteria

- [ ] Counter initializes from disk status files on first access
- [ ] Only counts PIDs that are actually alive
- [ ] spawn() wrapped in try-catch to release slot on synchronous failure

## Work Log

| Date       | Action                         | Learnings                                 |
| ---------- | ------------------------------ | ----------------------------------------- |
| 2026-02-22 | Created from PR #3 code review | Architecture + Performance agents flagged |
