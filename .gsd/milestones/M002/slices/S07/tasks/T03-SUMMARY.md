---
id: T03
parent: S07
milestone: M002
provides:
  - Operator-facing S07 launch proof runbook
  - Durable Cloudflare Access browser UAT artifact
  - Merge-conflict-free sync contract and deployment plan docs with S07 verifier references
key_files:
  - docs/operations/hosted-launch-proof.md
  - .gsd/milestones/M002/slices/S07/S07-UAT.md
  - docs/operations/source-repo-sync-contract.md
  - docs/plans/2026-03-09-self-hosted-proxmox-deployment.md
key_decisions:
  - Keep the browser UAT as a separate durable artifact rather than embedding it in the runbook, so machine proof and human proof stay independently verifiable.
patterns_established:
  - Split machine-verifiable and human-verifiable proof into separate artifacts that reference each other.
observability_surfaces:
  - docs/operations/hosted-launch-proof.md documents every check phase, env var, CLI flag, and evidence field.
duration: 15m
verification_result: passed
completed_at: 2026-03-18
blocker_discovered: false
---

# T03: Publish the launch runbook and explicit Cloudflare UAT handoff

**Created the S07 operator runbook, browser UAT checklist, and updated sync/deploy docs to reference the hosted launch verifier while resolving all pre-existing merge conflicts.**

## What Happened

Four doc deliverables:

1. **`docs/operations/hosted-launch-proof.md`** — Full operator runbook covering prerequisites, env vars, CLI usage (basic, route-boundary, hosted-analysis, diagnostic-bundle modes), evidence bundle field interpretation, exit codes, the browser proof handoff, and troubleshooting for every check ID.

2. **`.gsd/milestones/M002/slices/S07/S07-UAT.md`** — 13-item browser UAT checklist capturing hostname, approver email, timestamp, OTP received/accepted, app loaded, video workspace confirmed, selected videoId, evidence bundle path, machine verifier status, analysis artifact path, sweep evidence path, refresh evidence path, and follow-up notes for drift.

3. **`docs/operations/source-repo-sync-contract.md`** — Resolved 10+ merge conflict markers from S03/S04 branches, kept the S04 (more complete) version of all conflicted sections, and added an "End-to-End Launch Verification" section pointing to the S07 verifier and browser UAT artifact.

4. **`docs/plans/2026-03-09-self-hosted-proxmox-deployment.md`** — Resolved all merge conflict markers, added Phase 8 (Launch verification) with S07 verifier, browser UAT, and runbook references, added tsx to the LXC install list, added catalog/runtime dirs to the directory layout, added "Launch state is ambiguous" to the risk table with the S07 mitigation.

## Verification

- `rg -n "verify-s07-hosted-launch|Cloudflare Access|OTP|browser proof|machine-only|evidence bundle|S07-UAT"` across all four docs returned 50+ matches covering all key terms.
- No merge conflict markers remain in any of the touched files.
- All four files exist at their expected paths.

## Verification Evidence

| #   | Command                                                              | Exit Code      | Verdict | Duration |
| --- | -------------------------------------------------------------------- | -------------- | ------- | -------- |
| 1   | `rg -n "verify-s07-hosted-launch\|Cloudflare Access\|..." (4 files)` | 0              | ✅ pass | <1s      |
| 2   | `rg "<<<<<<< \|>>>>>>> \|=======$" (4 files)`                        | 1 (no matches) | ✅ pass | <1s      |

## Diagnostics

- The runbook at `docs/operations/hosted-launch-proof.md` is the primary operator entry point for understanding and running the S07 proof.
- The UAT artifact at `S07-UAT.md` is a blank checklist — it gets filled in once on the real host.
- Both deployment docs now point to the S07 verifier instead of relying on implicit Phase completion.

## Deviations

- Resolved pre-existing merge conflicts in `source-repo-sync-contract.md` and `2026-03-09-self-hosted-proxmox-deployment.md` from S03/S04 branches. These were blocking clean reads of the docs and needed resolution regardless.

## Known Issues

- Pre-existing merge conflicts in `src/lib/hosted-config.ts` remain (not in scope for this docs task).

## Files Created/Modified

- `docs/operations/hosted-launch-proof.md` — New S07 launch proof operator runbook.
- `.gsd/milestones/M002/slices/S07/S07-UAT.md` — New Cloudflare Access browser UAT checklist.
- `docs/operations/source-repo-sync-contract.md` — Resolved merge conflicts, added S07 verifier cross-reference.
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — Resolved merge conflicts, added Phase 8 launch verification, updated install list and risk table.
