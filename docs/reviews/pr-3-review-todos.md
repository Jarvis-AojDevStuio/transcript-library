# PR #3 Review TODOs — feat/fix-analysis-pipeline

Reviewed: 2026-02-22
Branch: `feat/fix-analysis-pipeline`
Reviewer: Claude Opus 4.6

## Critical (P0)

- [x] **Pipe prompt via stdin instead of CLI argument** — Fixed: changed `spawn("claude", ["-p", prompt])` to pipe prompt via `child.stdin.write()`.
  - Files: `src/app/api/analyze/route.ts`, `src/app/api/sync-hook/route.ts`

## High (P1)

- [x] **Atomic write for analysis.md** — Fixed: temp file + `fs.renameSync()` for atomic write.
  - Files: `src/app/api/analyze/route.ts`, `src/app/api/sync-hook/route.ts`

- [ ] **Add auth to /api/analyze POST** — Deferred: local-only app behind Tailscale, acceptable risk.
  - File: `src/app/api/analyze/route.ts`

- [x] **Fix TOCTOU race in concurrency** — Fixed: added `tryAcquireSlot()` for atomic check-and-increment.
  - Files: `src/app/api/analyze/route.ts`, `src/lib/analysis.ts`

## Medium (P2)

- [ ] **Recover concurrency counter on restart** — Deferred: acceptable for local use, counter self-heals as processes complete.
  - File: `src/lib/analysis.ts`

- [ ] **Log skipped videos in sync-hook batch** — Deferred: follow-up improvement.
  - File: `src/app/api/sync-hook/route.ts`

- [x] **Capture stderr from Claude child process** — Fixed: stderr now buffered and logged.
  - Files: `src/app/api/analyze/route.ts`, `src/app/api/sync-hook/route.ts`

- [ ] **Extract shared spawnAnalysis function** — Deferred: refactoring follow-up, not blocking.
  - Files: `src/app/api/analyze/route.ts`, `src/app/api/sync-hook/route.ts`

## Low (P3)

- [x] **Remove unused imports in AnalysisPanel** — Fixed: removed Markdown, Badge, useTransition, insight state.
  - File: `src/components/AnalysisPanel.tsx`

- [ ] **Remove unnecessary `initialInsight` prop** — Kept: used for `hasExistingInsight` button state logic.
  - File: `src/components/AnalysisPanel.tsx`

- [ ] **Tighten video ID regex** — Deferred: `{6,11}` is intentionally permissive for edge cases.
  - File: `src/lib/analysis.ts`

- [x] **Add `rel="noopener noreferrer"` to external link** — Fixed.
  - File: `src/app/video/[videoId]/page.tsx`
