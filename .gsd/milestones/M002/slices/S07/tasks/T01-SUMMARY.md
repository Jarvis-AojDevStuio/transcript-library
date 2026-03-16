---
id: T01
parent: S07
milestone: M002
provides:
  - Hosted launch proof evidence contract
  - CLI script to gather and evaluate launch evidence on host
key_files:
  - src/lib/hosted-launch-proof.ts
  - src/lib/__tests__/hosted-launch-proof.test.ts
  - scripts/verify-s07-hosted-launch.ts
key_decisions:
  - Separate machine-verifiable host evidence from human-confirmed Cloudflare browser UAT proof.
  - Gather all live state into a single typed evidence object and run it through a pure evaluation function.
patterns_established:
  - Structured verification output instead of shell-script log spam.
observability_surfaces:
  - scripts/verify-s07-hosted-launch.ts emits a structured JSON diagnostic bundle.
duration: 10m
verification_result: passed
blocker_discovered: false
---

# T01: Encode the hosted launch proof contract and evidence evaluator

**Defined a pure TypeScript evaluator and CLI for verifying end-to-end hosted runtime state instead of relying on shell checks.**

## What Happened

I created a typed `HostedLaunchEvidence` struct and an `evaluateHostedLaunchEvidence` function in `src/lib/hosted-launch-proof.ts`. This contract separates machine-verifiable evidence (deploy layout, pm2/systemd state, refresh/sweep artifacts, analysis persistence under `/srv`) from the human-only browser UAT proof. 
Then, I wrote `src/lib/__tests__/hosted-launch-proof.test.ts` to lock in the passing and failing conditions, specifically verifying the pending-UAT edge case.
Finally, I wrote `scripts/verify-s07-hosted-launch.ts`, which gathers the live evidence using Node `fs` and `execSync`, evaluates it, and emits a structured JSON payload containing failing check ids, phases, next inspection surfaces, and artifact paths, instead of raw command output.

## Verification

- `npx vitest run src/lib/__tests__/hosted-launch-proof.test.ts` passed (7 tests).
- `node --import tsx scripts/verify-s07-hosted-launch.ts --emit-diagnostic-bundle` successfully emitted a structured JSON bundle with a simulated `has-tsx` failure, pointing the next inspection surface to `journalctl`.
- Normal execution `node --import tsx scripts/verify-s07-hosted-launch.ts` cleanly failed and surfaced all the missing layout paths and system services on the local dev machine, proving it correctly suppresses raw shell noise while retaining high-signal failures.

## Diagnostics

- The CLI `scripts/verify-s07-hosted-launch.ts` outputs a highly-structured JSON object. If `passed` is false, it points to a specific `failingPhase`, `failingCheckId`, and suggests a `nextInspectionSurface` to help the operator debug. It never prints raw shell error lines.

## Deviations

None

## Known Issues

None

## Files Created/Modified

- `src/lib/hosted-launch-proof.ts` — Authoritative S07 evidence evaluator and contract definitions.
- `src/lib/__tests__/hosted-launch-proof.test.ts` — Proof-contract test suite for pass/fail cases.
- `scripts/verify-s07-hosted-launch.ts` — Structured hosted-launch verification CLI.
