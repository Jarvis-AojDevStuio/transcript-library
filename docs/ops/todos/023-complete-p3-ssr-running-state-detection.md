---
status: complete
priority: p3
issue_id: "023"
tags: [code-review, architecture, ux]
dependencies: []
---

# Server Component Does Not Detect "running" Status

## Problem Statement

In `src/app/video/[videoId]/page.tsx` line 31, `initialStatus` only checks if `analysis.md` exists. If analysis is currently running, the page shows "Run analysis" instead of "Analyzing..." until the user clicks (getting a 409 "already running" error).

## Proposed Fix

Read `status.json` in the server component:

```typescript
import { readStatus, isProcessAlive } from "@/lib/analysis";
const statusFile = readStatus(video.videoId);
let initialStatus: Status = "idle";
if (insight) initialStatus = "complete";
else if (statusFile?.status === "running" && isProcessAlive(statusFile.pid))
  initialStatus = "running";
```

## Acceptance Criteria

- [ ] Page load during active analysis shows "Analyzing..." state
- [ ] Polling starts automatically on page load when status is "running"

## Work Log

| Date       | Action                         | Learnings                       |
| ---------- | ------------------------------ | ------------------------------- |
| 2026-02-22 | Created from PR #3 code review | Architecture strategist flagged |
