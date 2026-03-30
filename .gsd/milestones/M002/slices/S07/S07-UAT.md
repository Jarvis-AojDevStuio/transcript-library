# S07: End-to-End Hosted Launch Proof — UAT

**Milestone:** M002
**Written:** 2026-03-18

## UAT Type

- UAT mode: mixed (machine evidence bundle + human browser verification)
- Why this mode is sufficient: The hosted launch proof has two halves — a machine-verifiable evidence bundle covering deploy layout, automation, sync, analysis, and route boundaries, plus a human-only Cloudflare Access OTP browser flow that automation cannot truthfully prove. Both must pass for the launch claim to be honest.

## Preconditions

- The Proxmox LXC is running with `/opt/transcript-library/current` symlink pointing to a valid release.
- pm2 is managing the `transcript-library` process in online state.
- `deploy-hook.service` and `transcript-library-sweep.service` systemd units are active.
- `/srv/transcript-library/` exists with `catalog/`, `insights/`, and `runtime/` subdirectories.
- `.env.local` is present at `/srv/transcript-library/.env.local` with `PLAYLIST_TRANSCRIPTS_REPO`, `CATALOG_DB_PATH`, `PRIVATE_API_TOKEN`, and provider auth vars.
- `tsx` is available globally or in project `node_modules/.bin/`.
- At least one daily sweep has completed (producing `runtime/daily-operational-sweep/latest.json`).
- At least one source refresh has completed (producing `catalog/last-source-refresh.json` and `catalog/last-import-validation.json`).
- Cloudflare Tunnel is running and `library.aojdevstudio.me` resolves to the LXC origin.
- Cloudflare Access is configured with at least one approved email address.

## Smoke Test

Run `NODE_ENV=production node --import tsx scripts/verify-s07-hosted-launch.ts` on the host. If it outputs `"passingChecks": 15` or higher and `"pendingUat": true`, the machine half is healthy.

## Test Cases

### 1. Evidence contract unit tests pass

1. On the dev machine, run `npx vitest run src/lib/__tests__/hosted-launch-proof.test.ts`.
2. **Expected:** 17/17 tests pass. All evidence evaluation paths (pass, fail, pending-UAT, missing artifacts, route-boundary, hosted-analysis, drift-visibility) are covered.

### 2. Verifier correctly fails on dev machine

1. Run `node --import tsx scripts/verify-s07-hosted-launch.ts` on the dev machine (no host layout present).
2. **Expected:** Exit code 1. JSON output shows `"passed": false`, `"failingPhase": "deploy-layout"`, `"failingCheckId": "opt-current-exists"`. The output contains no raw shell errors — only structured JSON.

### 3. Verifier produces structured diagnostic bundle

1. Run `node --import tsx scripts/verify-s07-hosted-launch.ts --emit-diagnostic-bundle` on the dev machine.
2. **Expected:** Exit code 1. JSON output includes `failingPhase`, `failingCheckId`, `nextInspectionSurface`, `artifactPaths`, `totalChecks`, and `passingChecks` fields. No bearer tokens, JWTs, or full home directory paths appear in the output.

### 4. Deploy layout checks pass on host

1. SSH to the Proxmox LXC.
2. Run `readlink /opt/transcript-library/current` — confirm it points to a timestamped release directory.
3. Run `cat /opt/transcript-library/current/deploy-manifest.json` — confirm it contains `timestamp`, `gitSha`, `gitRef`, `nodeVersion`, `buildStatus`.
4. Run `ls /srv/transcript-library/` — confirm `catalog/`, `insights/`, `runtime/` directories exist.
5. Run `NODE_ENV=production node --import tsx scripts/verify-s07-hosted-launch.ts` from the release directory.
6. **Expected:** `deploy-layout` phase checks (`opt-current-exists`, `opt-current-symlink`, `srv-exists`, `node-env-production`, `deploy-manifest-present`) all show `"passed": true`.

### 5. Automation state checks pass on host

1. On the host, run `pm2 show transcript-library` — confirm status is `online`.
2. Run `systemctl is-active deploy-hook.service` — confirm `active`.
3. Run `systemctl is-active transcript-library-sweep.timer` — confirm `active`.
4. Run `which tsx || ls node_modules/.bin/tsx` from the release directory — confirm tsx is found.
5. Run the S07 verifier.
6. **Expected:** `automation-state` phase checks (`has-tsx`, `pm2-online`, `deploy-hook-active`, `sweep-service-active`) all pass.

### 6. Refresh and sweep evidence checks pass on host

1. Confirm `/srv/transcript-library/catalog/last-source-refresh.json` exists and contains a recent `timestamp`.
2. Confirm `/srv/transcript-library/catalog/last-import-validation.json` exists.
3. Confirm `/srv/transcript-library/runtime/daily-operational-sweep/latest.json` exists and contains `refreshResult`, `repairResult`, and `timestamp` fields.
4. Run the S07 verifier.
5. **Expected:** `refresh-sweep-state` phase checks (`last-source-refresh`, `last-import-validation`, `daily-sweep-latest`) all pass. If `manualFollowUpVideoIds` is non-empty, the `sweep-drift-visibility` check still passes but carries a reason string listing the videoIds.

### 7. Analysis persistence under /srv

1. Identify a videoId with completed analysis (check `/srv/transcript-library/insights/`).
2. Confirm the directory contains `analysis.json`, `analysis.md`, `run.json`, `status.json`, and at least one run log file.
3. Confirm no analysis artifacts exist under `/opt/transcript-library/current/data/insights/`.
4. Run the S07 verifier.
5. **Expected:** `analysis-persistence` phase check (`analysis-artifacts-srv`) passes. No runtime artifacts are written inside the immutable release tree.

### 8. Hosted analysis completion (with --trigger-analysis)

1. Set `HOSTED_APP_URL`, `PRIVATE_API_TOKEN`, and `ANALYSIS_VIDEO_ID` env vars on the host.
2. Run `NODE_ENV=production node --import tsx scripts/verify-s07-hosted-launch.ts --trigger-analysis`.
3. **Expected:** The verifier POSTs to `/api/analyze`, polls for completion, and confirms `analysis.json`, `analysis.md`, `run.json`, `status.json`, and logs appear under `/srv/transcript-library/insights/<videoId>/`. The `hosted-analysis` phase checks pass.

### 9. Route boundary checks (with HOSTED_APP_URL and CLOUDFLARE_ACCESS_AUD)

1. Set `HOSTED_APP_URL` and `CLOUDFLARE_ACCESS_AUD` env vars.
2. Run the S07 verifier.
3. **Expected:** `route-boundary` phase checks verify that browser callers with Cloudflare Access headers reach protected routes, anonymous callers are blocked, and `/api/sync-hook` rejects browser-only callers.

### 10. Cloudflare Access browser proof (human)

1. Open `https://library.aojdevstudio.me` in a browser.
2. Cloudflare Access presents the OTP email prompt.
3. Enter an approved email address.
4. Receive the OTP email and enter the code.
5. **Expected:** The app loads with real video content (not an error page).
6. Navigate to a video workspace.
7. **Expected:** The analysis workspace renders with status, transcript, and action controls.
8. Record hostname, approver email, timestamp, selected videoId, and outcome in the Cloudflare Access Browser Proof section below.

### 11. Full verifier pass after browser UAT

1. Set `HUMAN_BROWSER_PROOF_COMPLETED=true` in the environment.
2. Run the full S07 verifier with all env vars.
3. **Expected:** `"passed": true`, `"pendingUat": false`, all checks pass.

## Edge Cases

### Verifier with missing tsx

1. Remove tsx from PATH and node_modules temporarily.
2. Run the verifier (use `node` directly with the compiled JS if needed).
3. **Expected:** `has-tsx` check fails with reason `"tsx executable not found in PATH or project"`. The verifier does not crash — it continues to subsequent checks.

### Verifier with stale sweep evidence

1. Delete or rename `daily-operational-sweep/latest.json`.
2. Run the verifier.
3. **Expected:** `daily-sweep-latest` check fails with a clear reason. Other phases still run and report their own results.

### Analysis artifacts accidentally under /opt

1. If any insight directory exists under `/opt/transcript-library/current/data/insights/`, the verifier should flag it.
2. **Expected:** The `analysis-artifacts-srv` check fails or warns that artifacts are in the wrong location.

### Sweep drift with manualFollowUpVideoIds

1. If the latest sweep JSON contains non-empty `manualFollowUpVideoIds`, the verifier should surface them.
2. **Expected:** The `sweep-drift-visibility` check passes (non-blocking) but includes the videoIds in its reason string so operators can follow up.

## Cloudflare Access Browser Proof

_Complete this section once on the live host after the machine verifier reports `pendingUat: true`._

| #   | Check                       | Result                 | Notes                                                                      |
| --- | --------------------------- | ---------------------- | -------------------------------------------------------------------------- |
| 1   | **Hostname**                | ********\_\_\_******** | e.g. `library.aojdevstudio.me`                                             |
| 2   | **Approver email**          | ********\_\_\_******** | The Cloudflare Access-approved email used                                  |
| 3   | **Timestamp**               | ********\_\_\_******** | ISO 8601 UTC when the browser test was performed                           |
| 4   | **OTP received**            | ☐ Yes ☐ No             | Cloudflare sent the OTP email to the approved address                      |
| 5   | **OTP accepted**            | ☐ Yes ☐ No             | Entering the code granted access to the app                                |
| 6   | **App loaded**              | ☐ Yes ☐ No             | The app rendered with real video content                                   |
| 7   | **Video workspace**         | ☐ Yes ☐ No             | Navigating to a video showed the analysis workspace                        |
| 8   | **Selected videoId**        | ********\_\_\_******** | The videoId used for the workspace check                                   |
| 9   | **Evidence bundle path**    | ********\_\_\_******** | Path to the machine evidence bundle JSON                                   |
| 10  | **Machine verifier passed** | ☐ Yes ☐ No             | `pendingUat: true` confirmed before this browser test                      |
| 11  | **Analysis artifact path**  | ********\_\_\_******** | e.g. `/srv/transcript-library/insights/<videoId>/`                         |
| 12  | **Sweep evidence path**     | ********\_\_\_******** | e.g. `/srv/transcript-library/runtime/daily-operational-sweep/latest.json` |
| 13  | **Refresh evidence path**   | ********\_\_\_******** | e.g. `/srv/transcript-library/catalog/last-source-refresh.json`            |

**Completed by:** ********\_\_\_********
**Date:** ********\_\_\_********

## Failure Signals

- Verifier exits with code 1 and `"passed": false` — check `failingCheckId` and `nextInspectionSurface` in the JSON output.
- `pm2 show transcript-library` shows `stopped` or `errored` — restart with `pm2 restart transcript-library`.
- `journalctl -u transcript-library-sweep` shows env var errors — check `/srv/transcript-library/.env.local`.
- Browser shows Cloudflare error page instead of OTP prompt — check Cloudflare Tunnel status and DNS.
- Browser shows OTP prompt but app returns 502 — pm2 process may be down.
- Analysis artifacts appearing under `/opt/` instead of `/srv/` — check `INSIGHTS_BASE_DIR` env var.

## Requirements Proved By This UAT

- R011 — End-to-end hosted analysis with persistent storage: machine verifier proves deploy layout, automation, sync, analysis persistence; browser UAT proves friend-facing access flow.
- R001 — Approved friends reach the app without app passwords: Cloudflare Access OTP flow in test case 10.
- R002 — Proxmox deployment with separated runtime data: deploy layout and analysis persistence checks in test cases 4, 5, 7.
- R003 — Cloudflare tunnel and access gate: route boundary checks (test case 9) and browser proof (test case 10).
- R004 — On-demand analysis completion: hosted analysis trigger in test case 8.
- R005 — Historical drift visibility: sweep drift edge case and manualFollowUpVideoIds visibility.
- R006 — Daily sweep evidence: refresh/sweep state checks in test case 6.
- R007 — Source sync evidence: refresh evidence checks in test case 6.
- R010 — Deploy automation: deploy-hook and sweep service checks in test case 5.

## Not Proven By This UAT

- Multi-user concurrent access (only one browser session tested).
- Rollback behavior after a failed deploy (proven by S06, not re-verified here).
- Analysis with multiple different provider CLIs (only the configured provider is exercised).
- Cloudflare Access policy changes or email removal (admin-side Cloudflare config is out of scope).
- Long-term automation reliability over days/weeks (only current state is checked).

## Notes for Tester

- The verifier is designed to run on the host, not the dev machine. On dev it will correctly fail at deploy-layout checks.
- Route-boundary and hosted-analysis test cases require env vars (`HOSTED_APP_URL`, `PRIVATE_API_TOKEN`, `CLOUDFLARE_ACCESS_AUD`, `ANALYSIS_VIDEO_ID`). Without them, those phases are skipped, not failed.
- The `--emit-diagnostic-bundle` flag produces a single-failure diagnostic for debugging. Use it when the standard output shows too many failures and you want to focus on the first blocking issue.
- Pre-existing merge conflicts in `src/lib/hosted-config.ts` are unrelated to S07 and can be ignored for this UAT.
