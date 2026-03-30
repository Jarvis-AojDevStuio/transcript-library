---
estimated_steps: 6
estimated_files: 0
---

# T02: Run full integration verification gate

**Slice:** S08 — Merge Conflict Resolution and Integration Proof
**Milestone:** M002

## Description

After T01 resolves all merge conflicts, this task runs the full 6-gate verification sequence that proves the milestone is in a shippable integration state. Each gate must pass before proceeding to the next. If any gate fails, diagnose and fix the root cause inline before continuing.

This is the milestone's final integration proof — it confirms that conflict resolution didn't introduce regressions, the full test suite passes, production build works, deploy artifacts are consistent, and the S07 verifier contract remains structurally valid.

## Steps

1. **Gate 1 — Conflict scan:** Run `rg '<<<<<<< ' --glob '*.ts' --glob '*.tsx' --glob '*.json' --glob '*.md' --glob '*.sh' --glob '*.js' --glob '*.cjs'`. Must exit 1 (no matches). This confirms T01 was complete.

2. **Gate 2 — TypeScript compilation:** Run `npx tsc --noEmit`. Must exit 0 with zero errors. This confirms no type regressions were introduced.

3. **Gate 3 — Vitest suite:** Run `npx vitest run`. Must exit 0 with all tests passing. If specific tests fail, diagnose whether the failure is a real regression vs. an environmental issue. Fix real regressions and commit with a descriptive message.

4. **Gate 4 — Production build:** Run `npx next build`. Must exit 0. This confirms the app can be deployed. Note: some build warnings are acceptable; only errors fail this gate.

5. **Gate 5 — Deploy artifact consistency:** Run `bash scripts/verify-s06-deploy-artifacts.sh`. Must exit 0 with all checks passing. This confirms deploy infrastructure artifacts from S06 remain consistent.

6. **Gate 6 — S07 verifier structural validity:** Run `npx vitest run src/lib/__tests__/hosted-launch-proof.test.ts`. Must exit 0 with all 17 tests passing. This confirms the hosted launch evidence contract from S07 is structurally intact.

If all 6 gates pass, commit any fixes that were needed, then report the final gate results.

## Must-Haves

- [ ] Gate 1 passes: zero conflict markers
- [ ] Gate 2 passes: zero TypeScript errors
- [ ] Gate 3 passes: full Vitest suite green
- [ ] Gate 4 passes: production build succeeds
- [ ] Gate 5 passes: deploy artifact consistency (S06 verifier)
- [ ] Gate 6 passes: S07 verifier test suite passes

## Verification

- All 6 gates exit 0
- Any fixes committed with descriptive messages
- Final summary reports gate results with pass/fail and any fixes applied

## Inputs

- T01 completion — all 19 conflicted files resolved, zero conflict markers, zero TS errors
- Working tree on `milestone/M002` branch in clean compile state

## Expected Output

- All 6 verification gates pass
- A final gate-results summary confirming the milestone is in shippable integration state
- Any regression fixes committed (if needed)
