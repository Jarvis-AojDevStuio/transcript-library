# M002: Reliability + Hosted Launch

**Vision:** Fix the current reliability gaps in Transcript Library, restore trust in analysis and source sync behavior, and launch the app privately on Proxmox behind Cloudflare-managed friend access with unattended daily automation in place.

## Success Criteria

- Approved friends can reach the hosted app privately at the target domain without app-managed passwords.
- New transcript content from the upstream transcript repo appears in the library automatically without manual catalog repair.
- A hosted user can trigger analysis on demand and receive a completed result with durable runtime artifacts.
- Existing broken runtime/artifact states are surfaced clearly and can be repaired by rerun rather than remaining opaque failures.
- Daily unattended automation refreshes source data and reduces visible runtime drift in normal use.
- Deploys to the hosted environment are repeatable, rollback-friendly, and preserve persistent runtime data outside the release tree.

## Key Risks / Unknowns

- Analysis generation is currently failing with exit code 1, and the root cause may sit in provider auth, command invocation, prompt/output shape, or hosted environment assumptions.
- Historical checked-in artifacts already show runtime mismatch states, which means the runtime contract may not yet be robust enough for unattended repair automation.
- The source repo refresh path is not trustworthy right now, so deployment alone would just host stale or drifting data.
- Cloudflare-managed friend access and hosted analysis runtime both need real-world proof; repo docs alone are not enough.

## Proof Strategy

- Exit-code-1 analysis failures → retire in S01 by proving at least one currently failing video can complete a full on-demand analysis run with explainable evidence for failures that remain.
- Runtime/artifact drift on older videos → retire in S02 by proving broken historical examples become rerunnable and their failure state is operator-readable.
- Source sync uncertainty → retire in S03 by proving a real upstream change reaches the app automatically through the intended refresh path.
- Hosted launch uncertainty → retire in S07 by proving private access, hosted browse, hosted analysis, and unattended automation all work together in the real deployed topology.

## Verification Classes

- Contract verification: targeted Vitest coverage, artifact file checks, route responses, runtime record inspection, and script-level verification
- Integration verification: real interaction with the transcript source repo, hosted runtime layout, Cloudflare gate, and analysis provider CLI
- Operational verification: deploy/restart behavior, scheduled sync/repair automation, persistent storage behavior, and rollback-friendly release layout
- UAT / human verification: confirm approved-friend access flow and hosted experience feel right after deployment

## Milestone Definition of Done

This milestone is complete only when all are true:

- all slices deliver their promised user-visible or runtime-visible outcomes
- analysis, sync, automation, access, and deployment behaviors are actually wired together in the hosted topology
- the real hosted entrypoint exists and is exercised by a friend-style access flow
- success criteria are re-checked against live behavior rather than inferred from documentation alone
- the final integrated acceptance scenarios pass in the deployed environment

## Requirement Coverage

- Covers: R001, R002, R003, R004, R005, R006, R007, R008, R009, R010, R011
- Partially covers: R012 (only by avoiding architecture dead ends while launching the current single-playlist system)
- Leaves for later: R013, R014, R015, R201, R202, R203
- Orphan risks: none

## Slices

- [x] **S01: Runtime Failure Triage and Analysis Recovery** `risk:high` `depends:[]`

  > After this: at least one currently failing video can complete an end-to-end analysis run again, and remaining failure modes produce concrete operator evidence instead of opaque exit-code-1 behavior.

- [x] **S02: Historical Artifact Repair and Drift Recovery** `risk:high` `depends:[S01]`

  > After this: known broken historical videos surface clear rerun-ready state, and repair paths can bring representative drifted artifacts back into a clean runtime state.

- [x] **S03: Source Repo Sync Contract and Auto-Refresh** `risk:high` `depends:[S01]`

  > After this: a real upstream transcript update flows into the app automatically, with the cross-repo refresh contract documented and enforced clearly enough for unattended use.

- [x] **S04: Daily Operational Sweep and Repair Automation** `risk:medium` `depends:[S02,S03]`

  > After this: an unattended daily job can refresh source data, detect/repair runtime drift, and leave evidence of what it fixed or could not fix.

- [x] **S05: Hosted Auth and Access Shape** `risk:medium` `depends:[S03]`

  > After this: the intended private-friend access flow is operationally defined around Cloudflare-managed access, with approved users reaching the app without app-password scope.

- [x] **S06: Proxmox Runtime and Release Pipeline** `risk:high` `depends:[S03,S05]`

  > After this: the app runs on the target Proxmox layout with persistent storage, supervised process management, and unattended deploy/restart mechanics that preserve rollback paths.

- [x] **S07: End-to-End Hosted Launch Proof** `risk:high` `depends:[S04,S06]`

  > After this: the real hosted system proves private access, fresh synced content, on-demand analysis, and unattended automation working together for the launch experience.

- [ ] **S08: Merge Conflict Resolution and Integration Proof** `risk:medium` `depends:[S01,S02,S03,S04,S05,S06,S07]`
  > After this: the M002 worktree compiles cleanly with zero TypeScript errors, all merge conflicts across source code, tests, documentation, and data files are resolved, representative verification harnesses pass, and the milestone is in a shippable integration state.

## Boundary Map

### S01 → S02

Produces:

- a verified root-cause map for current analysis failures, including the concrete failing surfaces and their evidence paths
- corrected analysis runtime behavior for the representative exit-code-1 case(s)
- stable expectations for when a run is considered failed, rerunnable, or successfully completed

Consumes:

- nothing (first slice)

### S01 → S03

Produces:

- a trustworthy analysis/runtime baseline that downstream sync work can use when new content is discovered
- any runtime-side fixes required so sync-added videos do not inherit the same broken analysis path

Consumes:

- nothing (first slice)

### S02 → S04

Produces:

- repairable mismatch categories and the operator-safe repair/rerun rules for each one
- representative repaired artifact states that define what the daily sweep is allowed to fix automatically

Consumes from S01:

- verified runtime failure causes and corrected analysis behavior

### S03 → S04

Produces:

- the explicit refresh contract between `playlist-transcripts` and the app
- a repeatable sync/update mechanism that can be invoked by unattended automation
- observable evidence for what changed during a refresh cycle

Consumes from S01:

- analysis/runtime baseline that new synced videos depend on

### S03 → S05

Produces:

- the final launch-time source/sync behavior that the hosted access experience must expose

Consumes from S01:

- stable runtime path for newly visible videos

### S03 → S06

Produces:

- the source repo runtime expectations and filesystem/layout dependencies the hosted environment must satisfy

Consumes from S01:

- stable analysis/runtime behavior required by the hosted node

### S05 → S06

Produces:

- the chosen access pattern, domains, and trust-boundary assumptions for the hosted deployment

Consumes from S03:

- the launch-time application behavior being protected

### S04 → S07

Produces:

- unattended daily automation capable of refresh + drift repair + evidence output

Consumes from S02:

- repair/rerun rules for drift categories
  Consumes from S03:
- source refresh mechanism and evidence surfaces

### S06 → S07

Produces:

- a live Proxmox-hosted runtime with deployment, restart, persistent storage, and ingress in place

Consumes from S03:

- source repo runtime requirements
  Consumes from S05:
- access and domain assumptions for the live app
