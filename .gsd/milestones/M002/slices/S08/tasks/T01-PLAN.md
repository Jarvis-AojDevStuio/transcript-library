---
estimated_steps: 4
estimated_files: 19
---

# T01: Replace all conflicted files with clean branch versions

**Slice:** S08 — Merge Conflict Resolution and Integration Proof
**Milestone:** M002

## Description

19 files in the M002 worktree contain merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) that cause all 57 TypeScript compiler errors (exclusively TS1185). The `gsd/M002/S05` branch contains clean, conflict-free versions of every one of these files. This task mechanically replaces each conflicted file with its clean branch version and verifies the result compiles.

This is not semantic conflict resolution — the research confirmed the S05 branch versions are the correct, most-complete versions of each file incorporating all S01–S05 work.

## Steps

1. Run `git show gsd/M002/S05:<filepath> > <filepath>` for each of the 19 conflicted files listed below:

   **Source code (3 files):**
   - `src/lib/hosted-config.ts`
   - `src/lib/__tests__/hosted-config.test.ts`
   - `src/lib/__tests__/analyze-route.test.ts`

   **Scripts (1 file):**
   - `scripts/verify-s02-historical-repair.sh`

   **Documentation (2 files):**
   - `docs/architecture/system-overview.md`
   - `README.md`

   **Data files (13 files):**
   - `data/catalog/last-import-validation.json`
   - `data/insights/I1NdVZ6l5CQ/analysis.json`
   - `data/insights/I1NdVZ6l5CQ/analysis.md`
   - `data/insights/I1NdVZ6l5CQ/claude-code-cowork-now-run-24-7-scheduled-tasks.md`
   - `data/insights/I1NdVZ6l5CQ/reconciliation.json`
   - `data/insights/I1NdVZ6l5CQ/run.json`
   - `data/insights/I1NdVZ6l5CQ/video-metadata.json`
   - `data/insights/RpUTF_U4kiw/analysis.json`
   - `data/insights/RpUTF_U4kiw/analysis.md`
   - `data/insights/RpUTF_U4kiw/claude-code-multi-agent-orchestration-with-opus-4-6-tmux-and-agent-sandboxes.md`
   - `data/insights/RpUTF_U4kiw/reconciliation.json`
   - `data/insights/RpUTF_U4kiw/run.json`
   - `data/insights/V5A1IU8VVp4/reconciliation.json`

2. Verify zero conflict markers remain: `rg '<<<<<<< ' --glob '*.ts' --glob '*.tsx' --glob '*.json' --glob '*.md' --glob '*.sh' --glob '*.js' --glob '*.cjs'` must exit 1 (no matches).

3. Verify zero TypeScript errors: `npx tsc --noEmit` must exit 0 with no error output.

4. Commit: `fix(S08): resolve all 19 merge-conflicted files from gsd/M002/S05 branch`

## Must-Haves

- [ ] All 19 files replaced with conflict-free versions from `gsd/M002/S05`
- [ ] Zero merge conflict markers in the working tree (`rg '<<<<<<< '` finds nothing)
- [ ] Zero TypeScript compiler errors (`npx tsc --noEmit` exits 0)
- [ ] Changes committed

## Verification

- `rg '<<<<<<< ' --glob '*.ts' --glob '*.tsx' --glob '*.json' --glob '*.md' --glob '*.sh' --glob '*.js' --glob '*.cjs'` exits 1 (no matches)
- `npx tsc --noEmit` exits 0
- `git diff --stat HEAD~1` shows exactly the 19 expected files changed

## Observability Impact

- **Before this task:** `npx tsc --noEmit` emits 57 TS1185 errors; `rg '<<<<<<< '` matches 19 files. Both serve as diagnostic surfaces for conflict state.
- **After this task:** Both commands produce clean output (exit 0 / exit 1 respectively). The absence of errors is itself the observable signal that conflicts are resolved.
- **Inspection:** `git diff --stat HEAD~1` shows exactly which 19 files were replaced. `git show HEAD:<filepath>` retrieves any replaced file's content for review.
- **Failure state:** If any file replacement fails (e.g., file not found on S05 branch), `git show` exits non-zero with a clear error message identifying the missing path.

## Inputs

- `gsd/M002/S05` branch — contains clean, conflict-free versions of all 19 files
- Current working tree on `milestone/M002` branch with 19 conflicted files and 57 TS1185 errors

## Expected Output

- All 19 files replaced with clean versions, zero conflict markers, zero TS errors
- One commit: `fix(S08): resolve all 19 merge-conflicted files from gsd/M002/S05 branch`
