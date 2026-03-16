# S07: End-to-End Hosted Launch Proof

**Goal:** Prove the real hosted Transcript Library topology end-to-end so operators can show, with durable evidence, that private friend access, source sync, on-demand analysis, and unattended daily automation all work together on the live Proxmox deployment.
**Demo:** `npx vitest run src/lib/__tests__/hosted-launch-proof.test.ts` locks the proof contract, `node --import tsx scripts/verify-s07-hosted-launch.ts` collects and evaluates the live host evidence bundle, and `docs/operations/hosted-launch-proof.md` plus `.gsd/milestones/M002/slices/S07/S07-UAT.md` record the real Cloudflare Access browser/UAT handoff that the automated harness cannot truthfully fake.

## Decomposition Rationale

This slice is final assembly, not subsystem invention. The main risk is a false proof: local header injection, shell history, or one-off screenshots getting mistaken for launch readiness. So the plan starts by defining one explicit evidence contract and testing it before touching the live host. Once the pass/fail rules are stable, the next task drives the real Proxmox runtime through deploy layout, refresh/sweep evidence, route boundary checks, and one hosted analysis completion under persistent storage. The last task closes the one part automation cannot honestly prove here — the real Cloudflare Access browser experience — with an operator runbook and a slice UAT artifact that pair human confirmation with the machine evidence bundle.

## Must-Haves

- R011: one repeatable hosted-launch proof flow gathers operator-readable evidence for deploy layout, refresh state, daily sweep state, access boundary behavior, and persistent hosted analysis artifacts from the live runtime.
- R004 / R011: a hosted on-demand analysis run completes on the deployed system and leaves `analysis.json`, `analysis.md`, `run.json`, `status.json`, and run logs under `/srv/transcript-library/insights/<videoId>/`.
- R001 / R003: the final proof keeps friend-facing access tied to Cloudflare-managed browser identity, with the real browser/UAT step recorded separately from machine-only automation paths.
- R005 / R006 / R007: the proof inspects durable refresh and daily-sweep evidence, including any `manualFollowUpVideoIds`, so sync/repair behavior is visible without implying auto-analysis.
- R002 / R010: deploy, restart, and unattended automation surfaces are checked against the live `/opt/transcript-library/current` + `/srv/transcript-library/` contract and remain rollback-friendly.

## Proof Level

- This slice proves: final-assembly
- Real runtime required: yes
- Human/UAT required: yes

## Verification

- `npx vitest run src/lib/__tests__/hosted-launch-proof.test.ts`
- `node --import tsx scripts/verify-s07-hosted-launch.ts`
- `node --import tsx scripts/verify-s07-hosted-launch.ts` (Ensure it produces a structured status surface with explicit failing checks when simulated failures are injected)
- `rg -n "verify-s07-hosted-launch|Cloudflare Access|OTP|browser proof|machine-only|evidence bundle|S07-UAT" docs/operations/hosted-launch-proof.md .gsd/milestones/M002/slices/S07/S07-UAT.md docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md`
- Complete `docs/operations/hosted-launch-proof.md` once against the live environment and record the result in `.gsd/milestones/M002/slices/S07/S07-UAT.md`, including hostname, timestamp, selected `videoId`, evidence-bundle path, and browser/UAT outcome.

## Observability / Diagnostics

- Runtime signals: `deploy-manifest.json`, `readlink /opt/transcript-library/current`, `pm2 show transcript-library`, `journalctl -u deploy-hook`, `journalctl -u transcript-library-sweep`, `data/catalog/last-source-refresh.json`, `data/catalog/last-import-validation.json`, `data/runtime/daily-operational-sweep/latest.json`, and `data/insights/<videoId>/run.json` / `status.json` / run logs.
- Inspection surfaces: `scripts/verify-s07-hosted-launch.ts` emits one structured evidence bundle and verdict; the operator runbook and `S07-UAT.md` capture the human Cloudflare proof that the script cannot replace.
- Failure visibility: failing check id, failing phase, host command/output summary, selected `videoId`, artifact paths, run timestamps, and any `manualFollowUpVideoIds` stay visible in the evidence bundle.
- Redaction constraints: never print raw bearer tokens, Cloudflare JWTs, webhook secrets, provider auth state, or full internal filesystem paths beyond the intended `/opt/transcript-library` and `/srv/transcript-library` deployment layout.

## Integration Closure

- Upstream surfaces consumed: `scripts/verify-s05-hosted-access.sh`, `scripts/daily-operational-sweep.ts`, `src/lib/daily-operational-sweep.ts`, `deploy/deploy.sh`, `deploy/setup-lxc.sh`, `deploy/systemd/transcript-library-sweep.service`, `deploy/systemd/deploy-hook.service`, `src/lib/hosted-config.ts`, and `docs/operations/source-repo-sync-contract.md`.
- New wiring introduced in this slice: one S07 hosted-launch verifier, one tested evidence-evaluation contract, and one explicit operator/UAT handoff for the real Cloudflare browser step.
- What remains before the milestone is truly usable end-to-end: nothing, if the live verifier passes and the UAT checklist is completed truthfully.

## Tasks

- [x] **T01: Encode the hosted launch proof contract and evidence evaluator** `est:1h15m`
  - Why: S07 can only make a trustworthy launch claim if the pass/fail rules for deploy layout, refresh/sweep evidence, access boundaries, and persistent analysis artifacts are explicit and testable before touching the live host.
  - Files: `src/lib/hosted-launch-proof.ts`, `src/lib/__tests__/hosted-launch-proof.test.ts`, `scripts/verify-s07-hosted-launch.ts`
  - Do: Define one evidence bundle shape and verdict helper for S07 that evaluates release layout, pm2/systemd health, source-refresh evidence, daily-sweep evidence, analysis artifact persistence, and the separate human-browser proof status. Add focused Vitest coverage for pass/fail cases, especially missing `tsx`, missing refresh artifacts, analysis files written under `/opt`, and pending manual browser proof. Create the new S07 CLI so it can emit the structured evidence bundle and stable failure reason codes instead of raw shell noise.
  - Verify: `npx vitest run src/lib/__tests__/hosted-launch-proof.test.ts`
  - Done when: the S07 proof rules live in one tested authority and the CLI can emit a structured evidence bundle with stable pass/fail semantics.
- [ ] **T02: Prove the live hosted runtime and close host-preflight gaps** `est:1h30m`
  - Why: The slice only closes when the real Proxmox runtime — not a localhost simulation — shows deploy layout, automation, and on-demand analysis all working under the runtime user with persistent storage.
  - Files: `scripts/verify-s07-hosted-launch.ts`, `scripts/verify-s05-hosted-access.sh`, `deploy/setup-lxc.sh`, `deploy/env.template`, `deploy/systemd/transcript-library-sweep.service`, `deploy/systemd/deploy-hook.service`
  - Do: Run the new hosted-launch verifier against the real host and make the smallest deploy/runtime fixes it exposes around `tsx`, provider CLI PATH/auth, env-file expectations, or systemd/pm2 user parity. Extend the verifier to inspect `readlink /opt/transcript-library/current`, `deploy-manifest.json`, `pm2 show transcript-library`, sweep/deploy journals, `last-source-refresh.json`, `last-import-validation.json`, `runtime/daily-operational-sweep/latest.json`, route-boundary behavior, and one hosted `/api/analyze` run that completes with `analysis.json`, `analysis.md`, `run.json`, `status.json`, and logs under `/srv/transcript-library/insights/<videoId>/` while keeping any rerun-only manual-follow-up state visible.
  - Verify: `node --import tsx scripts/verify-s07-hosted-launch.ts`
  - Done when: the live verifier passes end-to-end against the hosted system, analysis completes under the real runtime user, manual-follow-up sweep state stays visible when present, and no runtime artifacts are written under `/opt/transcript-library/current`.
- [ ] **T03: Publish the launch runbook and explicit Cloudflare UAT handoff** `est:55m`
  - Why: The automated harness cannot truthfully claim the friend-facing Cloudflare Access OTP experience, so S07 needs a repeatable operator runbook and UAT artifact that pair machine proof with real browser confirmation.
  - Files: `docs/operations/hosted-launch-proof.md`, `.gsd/milestones/M002/slices/S07/S07-UAT.md`, `docs/operations/source-repo-sync-contract.md`, `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md`
  - Do: Document the live S07 proof workflow, required env vars/hostnames, evidence-bundle output, and the split between synthetic origin checks and real friend browser access. Add a slice UAT checklist that records the hostname, approver identity, access-step result, selected `videoId`, analysis artifact path, refresh/sweep evidence paths, and any follow-up. Update existing sync/deploy docs to point at the S07 verifier and keep the friend-facing versus machine-only boundaries explicit.
  - Verify: `rg -n "verify-s07-hosted-launch|Cloudflare Access|OTP|browser proof|machine-only|evidence bundle|S07-UAT" docs/operations/hosted-launch-proof.md .gsd/milestones/M002/slices/S07/S07-UAT.md docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` and complete the new runbook once so `.gsd/milestones/M002/slices/S07/S07-UAT.md` captures the hostname, timestamp, selected `videoId`, evidence-bundle path, and browser/UAT outcome.
  - Done when: the repo has one operator-readable launch proof runbook, one UAT checklist artifact for the real browser flow, and docs no longer blur human and machine proof paths.

## Files Likely Touched

- `src/lib/hosted-launch-proof.ts`
- `src/lib/__tests__/hosted-launch-proof.test.ts`
- `scripts/verify-s07-hosted-launch.ts`
- `scripts/verify-s05-hosted-access.sh`
- `deploy/setup-lxc.sh`
- `deploy/env.template`
- `deploy/systemd/transcript-library-sweep.service`
- `deploy/systemd/deploy-hook.service`
- `docs/operations/hosted-launch-proof.md`
- `.gsd/milestones/M002/slices/S07/S07-UAT.md`
- `docs/operations/source-repo-sync-contract.md`
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md`
