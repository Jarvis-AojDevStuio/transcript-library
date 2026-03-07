---
status: pending
priority: p3
issue_id: "009"
tags: [code-review, quality]
dependencies: []
---

# SidebarSkeleton Should Be in Its Own File

## Problem Statement

`SidebarSkeleton` is a 20+ line component inlined in `layout.tsx`. Extract to `src/components/SidebarSkeleton.tsx` to keep the layout file focused and the skeleton independently discoverable.

## Findings

- **Source:** TypeScript Reviewer
- **Location:** `src/app/layout.tsx:7-30`

## Acceptance Criteria

- [ ] SidebarSkeleton lives in `src/components/SidebarSkeleton.tsx`
- [ ] `layout.tsx` imports it
