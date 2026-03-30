# S08: Merge Conflict Resolution and Integration Proof

**Goal:** The M002 worktree compiles cleanly with zero TypeScript errors, all merge conflicts are resolved, representative verification harnesses pass, and the milestone is in a shippable integration state.
**Demo:** `npx tsc --noEmit` exits 0, `npx vitest run` passes, `npx next build` succeeds, and `rg '<<<<<<< '` finds zero matches across the entire tree.

## Must-Haves

- All 19 conflicted files replaced with clean versions from the `gsd/M002/S05` branch
- Zero merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) anywhere in the working tree
- Zero TypeScript compiler errors (`npx tsc --noEmit` exits 0)
- Full Vitest suite passes (`npx vitest run` exits 0)
- Production build succeeds (`npx next build` exits 0)
- S07 verifier structural validity (TypeScript compiles and test suite passes)

## Proof Level

- This slice proves: final-assembly
- Real runtime required: no
- Human/UAT required: no

## Verification

- `rg '<<<<<<< ' --glob '*.ts' --glob '*.tsx' --glob '*.json' --glob '*.md' --glob '*.sh' --glob '*.js' --glob '*.cjs'` — exits 1 (no matches)
- `npx tsc --noEmit` — exits 0
- `npx vitest run` — exits 0
- `npx next build` — exits 0
- `npx vitest run src/lib/__tests__/hosted-launch-proof.test.ts` — exits 0 (S07 verifier structural validity)
- `bash scripts/verify-s06-deploy-artifacts.sh` — exits 0 (deploy artifact consistency)
- `rg 'TS1185' <<< "$(npx tsc --noEmit 2>&1)" | wc -l` — outputs 0 (no residual conflict-marker TS errors; diagnostic: if >0, conflict markers remain in source files)

## Integration Closure

- Upstream surfaces consumed: clean file versions from `gsd/M002/S05` branch for all 19 conflicted files
- New wiring introduced in this slice: none — this is conflict resolution, not feature work
- What remains before the milestone is truly usable end-to-end: nothing — S08 is the final integration gate

## Tasks

- [x] **T01: Replace all conflicted files with clean branch versions** `est:20m`
  - Why: 19 files contain merge conflict markers causing all 57 TypeScript errors. The `gsd/M002/S05` branch has clean, conflict-free versions of every file.
  - Files: `src/lib/hosted-config.ts`, `src/lib/__tests__/hosted-config.test.ts`, `src/lib/__tests__/analyze-route.test.ts`, `scripts/verify-s02-historical-repair.sh`, `docs/architecture/system-overview.md`, `README.md`, `data/catalog/last-import-validation.json`, `data/insights/I1NdVZ6l5CQ/analysis.json`, `data/insights/I1NdVZ6l5CQ/analysis.md`, `data/insights/I1NdVZ6l5CQ/claude-code-cowork-now-run-24-7-scheduled-tasks.md`, `data/insights/I1NdVZ6l5CQ/reconciliation.json`, `data/insights/I1NdVZ6l5CQ/run.json`, `data/insights/I1NdVZ6l5CQ/video-metadata.json`, `data/insights/RpUTF_U4kiw/analysis.json`, `data/insights/RpUTF_U4kiw/analysis.md`, `data/insights/RpUTF_U4kiw/claude-code-multi-agent-orchestration-with-opus-4-6-tmux-and-agent-sandboxes.md`, `data/insights/RpUTF_U4kiw/reconciliation.json`, `data/insights/RpUTF_U4kiw/run.json`, `data/insights/V5A1IU8VVp4/reconciliation.json`
  - Do: For each of the 19 files, run `git show gsd/M002/S05:<filepath> > <filepath>` to replace the conflicted version with the clean branch version. After all replacements, verify zero conflict markers remain with `rg '<<<<<<< '` and zero TS errors with `npx tsc --noEmit`. Commit the result.
  - Verify: `rg '<<<<<<< ' --glob '*.ts' --glob '*.tsx' --glob '*.json' --glob '*.md' --glob '*.sh' --glob '*.js' --glob '*.cjs'` exits 1 (no matches) AND `npx tsc --noEmit` exits 0
  - Done when: zero conflict markers in the tree and zero TypeScript compiler errors

- [ ] **T02: Run full integration verification gate** `est:15m`
  - Why: Conflict resolution must be proven through a multi-gate check: Vitest suite, production build, deploy artifact consistency, and S07 verifier structural validity. This closes the milestone's integration proof.
  - Files: (read-only verification — no files modified)
  - Do: Run the 6-gate verification sequence in order: (1) conflict scan, (2) `npx tsc --noEmit`, (3) `npx vitest run`, (4) `npx next build`, (5) `bash scripts/verify-s06-deploy-artifacts.sh`, (6) `npx vitest run src/lib/__tests__/hosted-launch-proof.test.ts`. If any gate fails, diagnose and fix the root cause before proceeding to the next gate. Commit any fixes.
  - Verify: all 6 gates exit 0
  - Done when: all verification gates pass and no fixes are outstanding

## Observability / Diagnostics

- **Conflict marker scan:** `rg '<<<<<<< ' --glob '*.ts' --glob '*.tsx' --glob '*.json' --glob '*.md' --glob '*.sh' --glob '*.js' --glob '*.cjs'` — exit 1 means clean, any matches show remaining conflicts with file:line
- **TypeScript compilation:** `npx tsc --noEmit` — structured TS error output with file, line, and error code; TS1185 specifically indicates conflict markers
- **Build failure artifacts:** `npx next build` produces `.next/` directory on success; stderr shows structured error output on failure
- **Test failure output:** `npx vitest run` produces structured test results with pass/fail counts and failure stack traces
- **Git state inspection:** `git diff --stat` shows which files changed; `git log --oneline -5` shows recent commits
- **Redaction:** No secrets or credentials are involved in this slice — all files are source code, documentation, and data artifacts

## Files Likely Touched

- `src/lib/hosted-config.ts`
- `src/lib/__tests__/hosted-config.test.ts`
- `src/lib/__tests__/analyze-route.test.ts`
- `scripts/verify-s02-historical-repair.sh`
- `docs/architecture/system-overview.md`
- `README.md`
- `data/catalog/last-import-validation.json`
- `data/insights/I1NdVZ6l5CQ/` (6 files)
- `data/insights/RpUTF_U4kiw/` (5 files)
- `data/insights/V5A1IU8VVp4/reconciliation.json`
