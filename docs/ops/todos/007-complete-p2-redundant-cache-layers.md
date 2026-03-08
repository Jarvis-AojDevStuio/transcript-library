---
status: pending
priority: p2
issue_id: "007"
tags: [code-review, performance, simplicity]
dependencies: ["001"]
---

# Redundant Triple-Layered Caching in catalog.ts

## Problem Statement

`catalog.ts` has three caching layers: (1) `_cache` on `readVideoRows()` (mtime-based, pre-existing on main), (2) `_videosCache` on `groupVideos()` (mtime-based, new in PR), (3) `React.cache()` on `listChannels` and `listVideosByChannel` (per-request dedup, new in PR). Layers 1 and 2 both stat the same CSV file independently. The combination is confusing and wastes syscalls.

## Findings

- **Source:** Code Simplicity Reviewer, Performance Oracle
- **Location:** `src/lib/catalog.ts`

## Proposed Solutions

Keep `React.cache()` on public API functions + the original `_cache` on `readVideoRows()`. Remove `_videosCache` from `groupVideos()`.

- **Effort:** Small
- **Risk:** Low

## Acceptance Criteria

- [ ] At most 2 caching layers (module-level rows cache + React cache())
- [ ] No duplicate statSync calls for the same file path
