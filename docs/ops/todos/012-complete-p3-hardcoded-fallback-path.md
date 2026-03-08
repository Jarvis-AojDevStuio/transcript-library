---
status: pending
priority: p3
issue_id: "012"
tags: [code-review, security]
dependencies: []
---

# Hardcoded Fallback Filesystem Path Leaks Developer Identity

## Problem Statement

`repoRoot()` in `catalog.ts` and the raw API route contain a hardcoded fallback path `/Users/aojdevstudio/projects/clawd/playlist-transcripts`. This leaks the developer's username and local filesystem layout in the committed codebase.

## Findings

- **Source:** Security Sentinel
- **Location:** `src/lib/catalog.ts:36-41`, `src/app/api/raw/route.ts:13`

## Proposed Solutions

Remove the hardcoded fallback. Require the env var or use a relative path like `path.resolve("../playlist-transcripts")`.

## Acceptance Criteria

- [ ] No hardcoded absolute paths with usernames in source code
