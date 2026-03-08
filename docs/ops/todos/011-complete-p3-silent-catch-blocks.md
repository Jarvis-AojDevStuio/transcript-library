---
status: pending
priority: p3
issue_id: "011"
tags: [code-review, quality]
dependencies: []
---

# Empty Catch Blocks Silently Swallow Errors

## Problem Statement

Multiple `catch {}` blocks in `insights.ts` and `recent.ts` silently swallow all errors. While acceptable for ENOENT (directory not yet created), genuine filesystem errors (permissions, corruption) would be invisible.

## Findings

- **Source:** TypeScript Reviewer
- **Location:** `src/lib/insights.ts`, `src/lib/recent.ts`

## Proposed Solutions

```typescript
} catch (err) {
  if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
    console.debug('Unexpected error reading insights directory:', err);
  }
}
```

## Acceptance Criteria

- [ ] Non-ENOENT errors are logged at debug level
