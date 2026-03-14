---
id: S06
milestone: M002
status: ready
---

# S06: Proxmox Runtime and Release Pipeline — Context

## Goal

Provision a dedicated Proxmox LXC, execute the first real deploy of the app, and prove the runtime layout (persistent storage, pm2 process management, Cloudflare tunnel/Access ingress, deploy/rollback mechanics, and daily sweep timer) works on real hardware so S07 can exercise the full hosted experience.

## Why this Slice

S06 is the first time any of the existing `deploy/` tooling touches real infrastructure. Every prior slice validated contracts locally. S07 depends on a live, reachable, restartable hosted runtime — without S06 proving the layout actually works on Proxmox, S07 has nothing to exercise. S05 produced the access topology and auth guard that S06 must wire into real Cloudflare config.

## Scope

### In Scope

- Create dedicated LXC CT 104 (`transcript-library`) on `aojdevserver` with 4 cores / 4 GB RAM / 64 GB disk, Ubuntu 24.04
- Run `deploy/setup-lxc.sh` to provision Node.js 22, pm2, cloudflared, deploy user, directory layout
- Produce a step-by-step operator checklist for manual infra steps the user must complete (Proxmox UI LXC creation, Cloudflare tunnel creation via dashboard, Cloudflare Access application setup, DNS records for `library.aojdevstudio.me` and `library-deploy.aojdevstudio.me`)
- Pause for operator to complete manual infra steps before continuing with deploy
- Clone `playlist-transcripts` into `/srv/transcript-library/playlist-transcripts`
- Populate `/srv/transcript-library/.env.local` from `deploy/env.template` with real values
- Execute first deploy via `deploy/deploy.sh` and verify the app starts on port 3000 via pm2
- Verify persistent storage layout: insights, catalog, logs, and runtime dirs exist under `/srv/transcript-library/` and survive pm2 restart
- Install systemd units: `deploy-hook.service` for webhook-triggered deploys, `transcript-library-sweep.timer` for daily automation
- Verify Cloudflare tunnel routes traffic to the app (friend-facing hostname) and deploy hook (automation hostname)
- Verify rollback via `deploy/rollback.sh` repoints the symlink and restarts cleanly
- Verify deploy-hook listener accepts a signed webhook payload and triggers a real redeploy

### Out of Scope

- Analysis provider authentication on the LXC — deferred to S07 (provider CLI auth as the deploy user)
- Proving end-to-end hosted analysis execution — that is S07's job
- Multi-playlist concerns or UI changes
- Cloudflare Access JWKS-based JWT signature verification hardening — the lightweight audience check from S05 is sufficient for friend-group deployment
- Modifications to the existing `deploy/` scripts unless real-hardware execution reveals bugs

## Constraints

- All infra is greenfield — nothing exists on the Proxmox host yet for this app
- Human-in-the-loop steps are required: LXC creation in Proxmox UI, Cloudflare tunnel/Access setup via dashboard, DNS record creation. S06 must produce a clear operator checklist and pause for completion before continuing.
- Use `npm ci` for hosted deploys — no bun on the LXC (existing decision)
- Use `pm2 delete` + `pm2 start` rather than `pm2 restart` after deploys to avoid cached symlink resolution (existing decision)
- Deploy tooling lives in `deploy/` inside the app repo, not the homelab repo (existing decision)
- Persistent runtime data must live under `/srv/transcript-library/`, outside the mutable release tree at `/opt/transcript-library/` (existing decision)
- The `deploy` system user owns all app processes and data
- CT ID 104 with hostname `transcript-library` on `aojdevserver`

## Integration Points

### Consumes

- `deploy/setup-lxc.sh` — LXC provisioning script
- `deploy/deploy.sh` — release deploy with timestamped dirs, symlink, pm2 restart
- `deploy/rollback.sh` — rollback to previous release
- `deploy/deploy-hook.ts` — GitHub webhook listener on port 9000
- `deploy/ecosystem.config.cjs` — pm2 process config
- `deploy/env.template` — hosted environment variable template
- `deploy/cloudflared-config.yml` — Cloudflare tunnel ingress rules
- `deploy/systemd/` — systemd units for deploy-hook and sweep timer
- S05 access topology: `library.aojdevstudio.me` (friend-facing, Cloudflare Access), `library-deploy.aojdevstudio.me` (webhook, HMAC-signed)
- S05 hosted guard: `CLOUDFLARE_ACCESS_AUD` env var requirement
- S03 source-refresh contract: `PLAYLIST_TRANSCRIPTS_REPO` as absolute-path git checkout

### Produces

- A live Proxmox LXC (CT 104) running the app on port 3000 behind Cloudflare tunnel
- Persistent storage layout at `/srv/transcript-library/` with insights, catalog, logs, runtime, playlist-transcripts, and .env.local
- Working deploy/rollback cycle proven on real hardware
- Working webhook-triggered redeploy via `library-deploy.aojdevstudio.me`
- Working daily sweep timer via systemd
- An operator checklist documenting the exact manual infra steps and their verification
- A deployment verification script or checklist proving the layout is live and healthy

## Open Questions

- Should `setup-lxc.sh` be extended to also handle Cloudflare tunnel login (`cloudflared tunnel login`) or should that remain a manual operator step? — Current thinking: keep it manual since it requires browser-based Cloudflare auth, document it in the operator checklist.
- Does the deploy-hook systemd unit's `EnvironmentFile=/srv/transcript-library/.env.local` load correctly for the tsx-based deploy-hook process, or does it need a wrapper? — Will be answered during real execution.
- Should the first deploy use a specific git ref/tag or just `main`? — Current thinking: deploy from `main` for the first run, tag-based deploys can be added later if needed.
