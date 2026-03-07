---
status: pending
priority: p2
issue_id: "004"
tags: [code-review, security]
dependencies: []
---

# decodeURIComponent() Can Throw URIError on Malformed URLs

## Problem Statement

The `dec()` function in `channel/page.tsx` and `video/[videoId]/page.tsx` calls `decodeURIComponent()` without a try-catch. Malformed percent-encoded sequences (e.g., `%ZZ`) will throw a `URIError`, causing an unhandled 500 error with potential stack trace leak in dev mode.

## Findings

- **Source:** Security Sentinel
- **Location:** `src/app/channel/[channel]/page.tsx:6-8`, `src/app/video/[videoId]/page.tsx:9-11`

## Proposed Solutions

```typescript
function dec(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}
```

- **Effort:** Small
- **Risk:** Low

## Acceptance Criteria

- [ ] Malformed URL params (e.g., `%ZZ`) do not cause 500 errors
- [ ] Valid URL params continue to decode correctly
