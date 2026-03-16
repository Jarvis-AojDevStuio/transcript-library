# S07 — Research

**Date:** 2026-03-16

## Summary

This slice is responsible for delivering the **End-to-End Hosted Launch Proof** (Milestone M002, Slice S07), which primarily owns requirement **R011** (Hosted runtime proves end-to-end analysis works with real provider auth and persistent storage). It also acts as the final validation boundary for R001, R002, R003, R004, R005, R006, R007, and R010.

Earlier slices have laid the necessary groundwork: S04 established the unattended daily sweep, S05 established the hosted access boundaries, and S06 provided the complete deploy toolkit for Proxmox LXC. However, these pieces have only been validated in isolation or through local synthetic harnesses. The core challenge of S07 is to prove that the fully integrated system—running behind Cloudflare Tunnel on a real Proxmox LXC with persistent storage—actually works as designed. Because a fully automated agent cannot complete a real Cloudflare Access OTP flow in a browser without credentials, the proof must be split into a machine-verifiable evidence bundle collected from the host and a human-executed UAT runbook for the browser entrypoint.

## Recommendation

Implement a hybrid proof strategy that combines an automated host evidence collector (`scripts/verify-s07-hosted-launch.ts`) with a structured human runbook (`docs/operations/hosted-launch-proof.md`). 

The host script should assert the live topology: checking that the app is running via PM2, systemd units are active, the `/srv/transcript-library` persistent directory structure is correct, and that a real on-demand analysis run successfully deposits artifacts (`run.json`, `analysis.json`) into the persistent insights folder. The human runbook will cover the Cloudflare Access login and UI verification. This approach avoids brittle end-to-end browser automation against external IdPs while still enforcing strict, mathematically checkable contracts on the host infrastructure.

## Don't Hand-Roll

| Problem | Existing Solution | Why Use It |
|---------|------------------|------------|
| Verifying internal API guards | `scripts/verify-s05-hosted-access.sh` | It already proves the internal Next.js route rejection logic. S07 should focus on the live host environment and Cloudflare Tunnel, not re-testing the app's internal middleware. |
| Unattended sweep execution | `scripts/daily-operational-sweep.ts` | This is the official unattended contract from S04. S07 should invoke this or inspect its artifacts (`latest.json`), rather than creating a new cron or sweep logic. |
| Host process management | `deploy/ecosystem.config.cjs` & `deploy/systemd/*.service` | S06 established PM2 and systemd as the authorities. S07 should inspect `pm2 show` and `journalctl`, not rely on `ps aux` or raw node processes. |

## Existing Code and Patterns

- `deploy/deploy.sh` — Establishes the atomic symlink release pattern (`/opt/transcript-library/current`). Any S07 host checks must verify paths against this layout.
- `src/lib/hosted-config.ts` — Defines the environment variables required for hosted mode (e.g., `HOSTED=true`, `PRIVATE_API_TOKEN`). S07 must verify these are active in the PM2 process.
- `deploy/systemd/deploy-hook.service` — Runs the webhook listener. This pattern of using `node --import tsx` is critical; S07 must ensure `tsx` is available to the runtime user (`deploy`).

## Constraints

- **Persistent Storage Boundary**: The app must write all runtime data (insights, logs, catalog, sweeps) to `/srv/transcript-library/`. If the proof detects writes inside `/opt/transcript-library/current/data/`, the release-layout contract is violated.
- **Provider Authentication**: Analysis execution requires the `deploy` user to have valid CLI provider auth (e.g., `claude` or `codex`). The proof must run under the `deploy` user to truthfully test this.
- **Access Split**: The friend-facing domain is browser-only (Cloudflare Access), while the machine webhook relies on `PRIVATE_API_TOKEN`. S07 must not mix these by using bearer tokens on the browser domain.

## Common Pitfalls

- **Testing as root instead of deploy** — Running the verification script as `root` might succeed because `root` has the provider CLI authenticated, but the PM2 process running as `deploy` will fail. Always verify as the `deploy` user.
- **Assuming 0 exit code equals success** — The daily sweep might exit 0 but still fail to refresh the catalog. S07 must read the generated `last-source-refresh.json` and `latest.json` artifacts to confirm actual operation success.
- **Localhost illusion** — Testing against `localhost:3000` from within the LXC bypasses Cloudflare Tunnel. The human UAT step must hit the public `library.aojdevstudio.me` domain to prove R003.

## Open Risks

- **Missing `tsx` in systemd** — S06 noted that `setup-lxc.sh` does not install `tsx` globally. If `npm ci --production=false` does not make `tsx` available to the `deploy-hook` and `sweep` systemd units via their `WorkingDirectory`, the unattended services will fail to start on the live host. S07 must explicitly verify these services are running.
- **Cloudflare Access blocking machine paths** — If Cloudflare Tunnel is configured to protect the entire domain with Access, the deploy webhook (`/api/sync-hook` or port 9000) might be blocked. The S06 `cloudflared-config.yml` templates a separate route, which needs strict live validation.

## Skills Discovered

| Technology | Skill | Status |
|------------|-------|--------|
| Proxmox / LXC | basher83/lunar-claude@proxmox-infrastructure | available |
| Cloudflare Tunnel | vm0-ai/vm0-skills@cloudflare-tunnel | available |
| PM2 | marcfargas/skills@pm2 | available |
| systemd | chaterm/terminal-skills@systemd | available |

*(No new skills need to be installed; the existing bash/node toolchain is sufficient for gathering evidence).*

## Sources

- M002 Roadmap defining S07's responsibility for the final hosted proof (source: `.gsd/milestones/M002/M002-ROADMAP.md`)
- S06 Summary detailing the deploy artifacts and the `node --import tsx` systemd dependency (source: `.gsd/milestones/M002/slices/S06/S06-SUMMARY.md`)
- S04 Summary defining the unattended daily sweep contract and its artifact outputs (source: `.gsd/milestones/M002/slices/S04/S04-SUMMARY.md`)
