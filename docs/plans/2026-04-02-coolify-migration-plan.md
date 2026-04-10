# Coolify Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Merge playlist-transcripts into transcript-library, deploy via Coolify on a new Proxmox LXC, decommission LXC 101.

**Architecture:** Unified repo with embedded Python pipeline. GitHub Actions polls YouTube playlists every 4h, commits transcripts, pushes. Coolify auto-deploys on push. Coolify cron runs daily analysis sweep via Claude CLI (OAuth session volume-mounted from host).

**Tech Stack:** Next.js 16, SQLite (better-sqlite3), Python 3.11 (yt-dlp pipeline), Docker, Coolify, Cloudflare Tunnel, Claude CLI

**Design doc:** `docs/plans/2026-04-02-coolify-migration-design.md`

**Revision notes:** Updated after Codex code review (2026-04-02). Addresses 9 findings (3 critical, 4 high, 2 medium). Restructured into two passes per Codex recommendation.

**Progress (as of 2026-04-03):**

- [x] Task 1: Resolve ALL merge conflicts
- [x] Task 2: Merge playlist-transcripts via git subtree
- [x] Task 3: Move GitHub Action to repo root
- [x] Task 4: Retire source-refresh, update transcript paths
- [x] Task 5: Create docker-entrypoint.sh
- [x] Task 6: Create Dockerfile
- [x] Task 7: Create docker-compose.yaml
- [x] Task 8: Create .dockerignore
- [x] Task 9: Create Coolify LXC 105 via community script (Debian 13, 8GB RAM, Docker 29.3.1, Coolify v4.0.0-beta.470)
- [x] Task 10: Claude CLI auth on LXC 105 — NOT DONE (deploy user created but auth not completed)
- [x] Task 11: Seed volumes from LXC 101 — NOT DONE
- [x] Task 12: Connect Coolify to GitHub and deploy — DONE (app running, preflight passing, HTTP 200)
- [x] Task 13: Configure Coolify cron jobs — NOT DONE
- [x] Task 14: Wire Cloudflare tunnel — DONE (coolify.aojdevstudio.me + library-canary.aojdevstudio.me)
- [ ] Task 15: Parallel canary validation (48h)
- [ ] Task 16: Production cutover
- [ ] Task 17: Decommission LXC 101
- [ ] Task 18-20: Multi-playlist (Pass 2, deferred)
- [x] PR created: AojdevStudio/transcript-library#10
- [x] CLAUDE.md updated for Coolify architecture
- [x] README.md updated for unified repo

**Remaining work:**

1. Complete Claude CLI auth on LXC 105 (`npx @anthropic-ai/claude-code login` as deploy user)
2. Seed volumes with existing insights from LXC 101
3. Configure 2 Coolify cron jobs (sweep + insights)
4. Add Cloudflare Access policy for canary hostname
5. 48h canary validation → production cutover → decommission LXC 101
6. Favicon (replace default Vercel favicon)
7. Merge PR after Codex review

---

## Pass 1: Core Migration (merge, deploy, cutover)

### Phase 1: Repo Cleanup (prerequisite)

#### Task 1: Resolve ALL merge conflicts in transcript-library

The repo has unresolved conflict markers in **both docs and TypeScript test files**. ALL must be resolved before any merge operation.

**Files:**

- Modify: `justfile:53` — merge conflict between HEAD and gsd/M002/S04
- Modify: `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — 19 conflict blocks
- Modify: `docs/operations/source-repo-sync-contract.md` — 6+ conflict blocks
- Modify: `docs/architecture/system-overview.md` — 5+ conflict blocks
- Modify: `README.md:275-286` — 3 conflict blocks
- Modify: `src/lib/__tests__/hosted-config.test.ts` — conflict markers
- Modify: `src/lib/__tests__/analyze-route.test.ts` — conflict markers

**Step 1: Identify ALL conflict markers (including TypeScript)**

Run: `cd ~/Projects/transcript-library && grep -rn '<<<<<<<' . --include='*.md' --include='*.ts' --include='*.tsx' --include='justfile' | grep -v node_modules | grep -v .gsd`

**Step 2: Resolve each file**

For each file, read it, understand both sides, pick the correct resolution.

For `justfile`: keep `rebuild-catalog`, `rebuild-catalog-check`, AND `backfill-insights` recipes.

For `.md` docs: the old deployment plan doc is superseded by this Coolify migration. Resolve by taking the most complete version.

For `.ts` test files: read both sides carefully, keep the most current test expectations.

**Step 3: Verify no markers remain**

Run: `grep -rn '<<<<<<<' . --include='*.md' --include='*.ts' --include='*.tsx' --include='justfile' | grep -v node_modules | grep -v .gsd`
Expected: no output

**Step 4: Run tests to verify repo is in a clean state**

Run: `npm test`
Expected: all tests pass (or at least no parse errors from conflict markers)

**Step 5: Clean up .gsd/ worktrees if present**

Run: `ls .gsd/worktrees/ 2>/dev/null`
If worktrees exist with conflicts, either resolve or remove them. Add `.gsd/` to `.gitignore` if not already there.

**Step 6: Commit**

```bash
git add -A
git commit -m "fix: resolve all merge conflict markers in justfile, docs, and tests"
```

---

### Phase 2: Merge Repos

#### Task 2: Merge playlist-transcripts into transcript-library via git subtree

**Step 1: Add remote**

```bash
cd ~/Projects/transcript-library
git remote add transcripts https://github.com/AojdevStudio/playlist-transcripts.git
git fetch transcripts
```

**Step 2: Subtree add**

```bash
git subtree add --prefix=pipeline transcripts master --squash
```

This creates `pipeline/` containing the entire playlist-transcripts repo. `--squash` condenses into one merge commit (does NOT preserve individual commit history — the original repo remains on GitHub as archive).

**Step 3: Verify structure**

Run: `ls pipeline/`
Expected: `playlists.yml`, `sync_playlist.sh`, `requirements.txt`, `youtube-transcripts/`, `.github/`, etc.

Run: `ls pipeline/youtube-transcripts/topics/`
Expected: `ai-llms/`, `business/`, `faith/`, `finance-investing/`, `hardware-homelab/`, `software-engineering/`

**Step 4: Commit is automatic** (subtree add creates its own commit)

#### Task 3: Move GitHub Action from pipeline/ to repo root

**Files:**

- Move: `pipeline/.github/workflows/sync-playlist.yml` → `.github/workflows/sync-playlist.yml`
- Delete: `pipeline/.github/` (the claude.yml and claude-code-review.yml in the pipeline are duplicates)

**Step 1: Move the workflow**

```bash
cp pipeline/.github/workflows/sync-playlist.yml .github/workflows/sync-playlist.yml
rm -rf pipeline/.github
```

**Step 2: Update paths in sync-playlist.yml**

Every path reference must be prefixed with `pipeline/`:

```yaml
# In the "Run sync" step, change:
run: |
  cd pipeline
  ./sync_playlist.sh

# The "Push changes" step stays the same (git add -A covers everything)
```

**Step 3: Verify workflow syntax**

Run: `cat .github/workflows/sync-playlist.yml | head -20`
Expected: `name: Sync Playlist Transcripts` with correct paths

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: migrate sync-playlist workflow to unified repo"
```

#### Task 4: Update app to read transcripts from pipeline/ AND retire source-refresh

This is the most critical code change. The app currently has two coupled systems:

1. `playlistTranscriptsRepoRoot()` reads from an external path
2. `source-refresh.ts` does runtime `git fetch`/`merge` on that external repo
3. `/api/sync-hook` triggers the refresh

After merge, `pipeline/` is NOT a standalone git repo. The runtime git sync model is dead. Replace it with: transcripts ship in the image, catalog rebuilt on deploy.

**Files:**

- Modify: `src/lib/catalog.ts:65-73` — change `playlistTranscriptsRepoRoot()`
- Modify: `src/lib/hosted-config.ts:70+` — gut the PLAYLIST_TRANSCRIPTS_REPO validation entirely
- Modify: `src/lib/analysis.ts:420-422` — update transcript path resolution
- Modify: `src/app/api/raw/route.ts:10` — update raw file serving path
- **Delete or stub:** `src/lib/source-refresh.ts` — runtime git sync is impossible now
- **Delete or stub:** `src/app/api/sync-hook/route.ts` — no longer needed
- Modify: `src/lib/daily-operational-sweep.ts` — remove `refreshSourceCatalog` call
- Modify: `src/instrumentation.ts` — remove source-refresh from startup if present

**Step 1: Update `src/lib/catalog.ts`**

Change `playlistTranscriptsRepoRoot()` at line 65:

```typescript
export function playlistTranscriptsRepoRoot(): string {
  // Allow env override for local dev flexibility
  const override = process.env.PLAYLIST_TRANSCRIPTS_REPO;
  if (override) return override;
  // In unified repo, transcripts live at ./pipeline
  return path.join(process.cwd(), "pipeline");
}
```

**Step 2: Gut `src/lib/hosted-config.ts` PLAYLIST_TRANSCRIPTS_REPO validation**

Remove ALL of these checks (they assume an external git worktree):

- The path must be absolute
- The directory must exist
- It must be a git worktree
- HEAD must not be detached
- The required check that hard-errors if missing

Replace with a simple check that `pipeline/youtube-transcripts/` exists relative to cwd.

**Step 3: Retire `source-refresh.ts`**

Either delete the file or replace its exported functions with no-ops that log a deprecation warning. Update all callers:

- `daily-operational-sweep.ts` calls `refreshSourceCatalog` — remove that call
- `instrumentation.ts` may reference source refresh — remove
- `/api/sync-hook/route.ts` — delete the entire route handler or return 410 Gone

**Step 4: Update `src/app/api/raw/route.ts`**

The route at line 10 calls `playlistTranscriptsRepoRoot()` which now returns `./pipeline` by default. Verify the path construction still works.

**Step 5: Update `src/lib/analysis.ts`**

Same pattern — verify it calls `playlistTranscriptsRepoRoot()` and the returned path works with `pipeline/youtube-transcripts/`.

**Step 6: Update tests**

Fix `src/lib/__tests__/hosted-config.test.ts` to reflect the removed PLAYLIST_TRANSCRIPTS_REPO checks.

**Step 7: Run full test suite**

```bash
npm test
```

Expected: all tests pass with the new path model

**Step 8: Build test**

```bash
npx next build --webpack
```

Expected: build succeeds

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: read transcripts from embedded pipeline/, retire source-refresh and sync-hook"
```

---

### Phase 3: Dockerize

#### Task 5: Create docker-entrypoint.sh

The entrypoint detects if transcripts have changed since last catalog build and rebuilds if needed. This solves the stale-catalog-on-redeploy problem.

**Files:**

- Create: `deploy/docker-entrypoint.sh`

**Step 1: Write the entrypoint**

```bash
#!/bin/bash
set -e

CHECKSUM_FILE="/app/data/catalog/.transcript-checksum"
CURRENT_CHECKSUM=$(find /app/pipeline/youtube-transcripts/topics -name '*.md' -exec md5sum {} + 2>/dev/null | sort | md5sum | cut -d' ' -f1)
PREVIOUS_CHECKSUM=$(cat "$CHECKSUM_FILE" 2>/dev/null || echo "none")

if [ "$CURRENT_CHECKSUM" != "$PREVIOUS_CHECKSUM" ]; then
  echo "[entrypoint] Transcript changes detected. Rebuilding catalog..."
  npx tsx scripts/rebuild-catalog.ts
  echo "$CURRENT_CHECKSUM" > "$CHECKSUM_FILE"
  echo "[entrypoint] Catalog rebuild complete."
else
  echo "[entrypoint] No transcript changes. Skipping catalog rebuild."
fi

exec "$@"
```

**Step 2: Commit**

```bash
git add deploy/docker-entrypoint.sh
git commit -m "feat: add docker entrypoint with automatic catalog rebuild"
```

#### Task 6: Create Dockerfile

**Files:**

- Create: `Dockerfile`

**Step 1: Write the Dockerfile**

```dockerfile
FROM node:22-slim

# System deps for Python pipeline and Claude CLI
RUN apt-get update && \
    apt-get install -y --no-install-recommends git python3 python3-pip python3-venv && \
    rm -rf /var/lib/apt/lists/*

# Install Claude CLI globally
RUN npm install -g @anthropic-ai/claude-code

WORKDIR /app

# Install Node dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app + pipeline
COPY . .

# Bootstrap Python venv for pipeline scripts
RUN python3 -m venv pipeline/.venv && \
    pipeline/.venv/bin/pip install -r pipeline/requirements.txt

# Use --webpack flag to avoid Next 16 turbopack panic
RUN npx next build --webpack

EXPOSE 3000

# Entrypoint rebuilds catalog if transcripts changed, then starts app
COPY deploy/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npm", "start"]
```

**Step 2: Test build locally**

```bash
docker build -t transcript-library .
```

Expected: builds successfully

**Step 3: Test run locally**

```bash
docker run -p 3000:3000 \
  -v $(pwd)/data/catalog:/app/data/catalog \
  -v $(pwd)/data/insights:/app/data/insights \
  transcript-library
```

Expected: app starts, entrypoint rebuilds catalog on first run, accessible at http://localhost:3000

**Step 4: Commit**

```bash
git add Dockerfile
git commit -m "feat: add Dockerfile for Coolify deployment"
```

#### Task 7: Create docker-compose.yml

**Files:**

- Create: `docker-compose.yml`

**Step 1: Write docker-compose.yml**

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - catalog-data:/app/data/catalog
      - insights-data:/app/data/insights
      - /home/deploy/.claude:/root/.claude:ro
    environment:
      - HOSTED=true
      - NODE_ENV=production
      - PRIVATE_API_TOKEN=${PRIVATE_API_TOKEN}
      - CLOUDFLARE_ACCESS_AUD=${CLOUDFLARE_ACCESS_AUD}
      - CLOUDFLARE_ACCESS_TEAM_DOMAIN=${CLOUDFLARE_ACCESS_TEAM_DOMAIN}
      - ANALYSIS_PROVIDER=${ANALYSIS_PROVIDER:-claude-cli}
      - CLAUDE_ANALYSIS_MODEL=${CLAUDE_ANALYSIS_MODEL}
      - SYNC_TOKEN=${SYNC_TOKEN}
    restart: unless-stopped

volumes:
  catalog-data:
  insights-data:
```

**Note:** Claude auth mounted at `/root/.claude` because container runs as root (Coolify default).

**Step 2: Commit**

```bash
git add docker-compose.yml
git commit -m "feat: add docker-compose.yml for Coolify"
```

#### Task 8: Create .dockerignore

**Files:**

- Create: `.dockerignore`

**Step 1: Write .dockerignore**

```
node_modules
.git
.gsd
.next
data/catalog
data/insights
pipeline/.venv
pipeline/youtube-transcripts/inbox
deploy/__tests__
mockups
test-results
*.log
```

**Step 2: Commit**

```bash
git add .dockerignore
git commit -m "chore: add .dockerignore"
```

---

### Phase 4: Install Coolify on Proxmox

#### Task 9: Create Coolify LXC via community script

**Step 1: SSH into Proxmox**

```bash
ssh proxmox
```

**Step 2: Run the community script**

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/ct/coolify.sh)"
```

During the interactive setup:

- Accept defaults (Debian 13, 2 cores, 4096 MB RAM, 30 GB disk)
- **Override RAM to 8192 MB** (app runs on same LXC)
- Note the assigned LXC ID and IP address

**Step 3: Verify Coolify is running**

Open browser: `http://<coolify-lxc-ip>:8000`
Expected: Coolify setup wizard

**Step 4: Complete Coolify initial setup**

- Create admin account
- Configure localhost server (Coolify manages the same machine it runs on)

**Step 5: Record the LXC details**

Note the LXC ID, IP address, and Coolify dashboard URL.

#### Task 10: Set up Claude CLI auth on Coolify LXC (BEFORE first analysis)

**Step 1: SSH into the Coolify LXC**

```bash
ssh root@<coolify-lxc-ip>
```

**Step 2: Create deploy user and auth Claude CLI**

```bash
useradd -m -s /bin/bash deploy
su - deploy
npx @anthropic-ai/claude-code login
```

Follow the OAuth flow. This creates `/home/deploy/.claude/`.

**Step 3: Verify the auth directory exists**

```bash
ls -la /home/deploy/.claude/
```

Expected: OAuth session files present

#### Task 11: Seed Docker volumes with existing data from LXC 101

**This must happen BEFORE the first production cutover.** Without it, all existing analyses disappear.

**Step 1: Export data from LXC 101**

```bash
ssh root@<lxc-101-ip>
tar czf /tmp/catalog-data.tar.gz -C /srv/transcript-library/catalog .
tar czf /tmp/insights-data.tar.gz -C /srv/transcript-library/insights .
```

**Step 2: Copy to Coolify LXC**

```bash
scp root@<lxc-101-ip>:/tmp/catalog-data.tar.gz root@<coolify-lxc-ip>:/tmp/
scp root@<lxc-101-ip>:/tmp/insights-data.tar.gz root@<coolify-lxc-ip>:/tmp/
```

**Step 3: Import into Docker volumes**

After the first deploy creates the volumes:

```bash
ssh root@<coolify-lxc-ip>

# Find the volume mount paths
docker volume inspect <project>_catalog-data | jq '.[0].Mountpoint'
docker volume inspect <project>_insights-data | jq '.[0].Mountpoint'

# Extract into volumes
tar xzf /tmp/catalog-data.tar.gz -C <catalog-mountpoint>/
tar xzf /tmp/insights-data.tar.gz -C <insights-mountpoint>/
```

**Step 4: Restart the app container**

```bash
# Via Coolify dashboard or:
docker restart <container-id>
```

**Step 5: Verify data**

Open the app and confirm existing videos and analyses are visible.

#### Task 12: Connect Coolify to GitHub and deploy

**Step 1: In Coolify dashboard**

Go to: Sources → Add New → GitHub App. Follow OAuth flow to connect `AojdevStudio`.

**Step 2: Create new project**

Projects → Add New → name it "Transcript Library"

**Step 3: Add application**

- Source: GitHub → `AojdevStudio/transcript-library` → branch `main`
- Build pack: Docker Compose
- Docker Compose file: `docker-compose.yml`
- Auto-deploy: enabled

**Step 4: Configure environment variables**

In the app's Environment tab, add:

- `PRIVATE_API_TOKEN` = (generate a new one)
- `CLOUDFLARE_ACCESS_AUD` = (from current LXC 101 `.env.local`)
- `CLOUDFLARE_ACCESS_TEAM_DOMAIN` = `aojdevstudio`
- `ANALYSIS_PROVIDER` = `claude-cli`
- `CLAUDE_ANALYSIS_MODEL` = (current value from LXC 101)
- `SYNC_TOKEN` = (from current LXC 101)

**Step 5: Migrate GitHub Actions secrets**

On the `AojdevStudio/transcript-library` GitHub repo, ensure these secrets exist:

- `YT_COOKIES` — YouTube cookies for yt-dlp (copy from playlist-transcripts repo)
- `CLAUDE_CODE_OAUTH_TOKEN` — for Claude bot workflows

**Step 6: Deploy**

Trigger first deploy from Coolify dashboard. Watch build logs.

Expected: app builds (with `--webpack`), entrypoint runs catalog rebuild, app starts on port 3000.

#### Task 13: Configure Coolify cron jobs

**Two separate cron jobs needed:**

**Step 1: Daily operational sweep (catalog refresh + repair)**

In Coolify: app → Scheduled Tasks → Add

- Name: `daily-sweep`
- Command: `npm run daily:sweep`
- Schedule: `0 3 * * *` (03:00 UTC daily)

**Step 2: Analysis on new videos (separate command)**

In Coolify: app → Scheduled Tasks → Add

- Name: `nightly-insights`
- Command: `npm run nightly:insights`
- Schedule: `0 4 * * *` (04:00 UTC daily, after sweep completes)

**Note:** `daily:sweep` does refresh + repair only. `nightly:insights` is the actual analysis command that generates insights for unprocessed videos.

---

### Phase 5: Canary Validation and Cutover

#### Task 14: Wire Cloudflare tunnel with canary hostname

**Files:**

- Modify: `proxmox/cloudflared/config.yml` (in homelab repo)

**Step 1: Add canary ingress rule**

Add before the catch-all rule:

```yaml
- hostname: library-canary.aojdevstudio.me
  service: http://<coolify-lxc-ip>:3000
```

**Step 2: Add canary hostname to Cloudflare Access**

In the Zero Trust dashboard, add `library-canary.aojdevstudio.me` to the same Access application that protects `library.aojdevstudio.me`.

**Step 3: Deploy the config to LXC 102**

```bash
scp proxmox/cloudflared/config.yml root@10.69.1.178:/etc/cloudflared/config.yml
ssh root@10.69.1.178 'docker restart cloudflared'
```

**Step 4: Verify canary**

Open: `https://library-canary.aojdevstudio.me`
Expected: transcript-library app loads from Coolify LXC

**Step 5: Commit homelab changes**

```bash
cd ~/Projects/homelab
git add proxmox/cloudflared/config.yml
git commit -m "feat: add canary hostname for transcript-library Coolify migration"
```

#### Task 15: Parallel validation (48 hours)

Run both old (LXC 101 at `library.aojdevstudio.me`) and new (Coolify at `library-canary.aojdevstudio.me`) simultaneously.

**Checklist:**

- [ ] Canary app loads at `library-canary.aojdevstudio.me`
- [ ] Cloudflare Access OTP works on canary
- [ ] Video listing shows all 244+ transcripts (including seeded data)
- [ ] Video playback + transcript reading works
- [ ] Existing analyses are visible (seeded insights)
- [ ] GitHub Action sync runs (check Actions tab)
- [ ] Auto-deploy fires on push (make a trivial commit, watch Coolify)
- [ ] SQLite catalog persists AND rebuilds across deploys (redeploy, check data survives and new transcripts appear)
- [ ] Daily sweep cron fires at 03:00 UTC
- [ ] Nightly insights cron fires at 04:00 UTC
- [ ] Claude CLI analysis works (trigger manually, check output)

#### Task 16: Production cutover

**Step 1: Update cloudflared config**

Replace canary with production hostname:

```yaml
- hostname: library.aojdevstudio.me
  service: http://<coolify-lxc-ip>:3000
```

Remove the canary rule.

**Step 2: Deploy config**

```bash
scp proxmox/cloudflared/config.yml root@10.69.1.178:/etc/cloudflared/config.yml
ssh root@10.69.1.178 'docker restart cloudflared'
```

**Step 3: Verify production**

Open: `https://library.aojdevstudio.me`
Expected: served from Coolify LXC

**Step 4: Commit**

```bash
cd ~/Projects/homelab
git add proxmox/cloudflared/config.yml
git commit -m "feat: cut over library.aojdevstudio.me to Coolify LXC"
```

#### Task 17: Decommission LXC 101

**Step 1: Stop all services**

```bash
ssh root@<lxc-101-ip>
pm2 stop all
systemctl stop deploy-hook transcript-library-sweep.timer
systemctl stop cloudflared
```

**Step 2: Final backup to NAS (safety copy)**

```bash
ssh root@<lxc-101-ip>
tar czf /tmp/transcript-library-full-backup.tar.gz /srv/transcript-library/
scp root@<lxc-101-ip>:/tmp/transcript-library-full-backup.tar.gz NAS:/volume1/backups/
```

**Step 3: Destroy LXC 101**

```bash
ssh proxmox
pct stop 101
pct destroy 101
```

**Step 4: Update homelab docs**

```bash
cd ~/Projects/homelab
# Update proxmox/CLAUDE.md — add Coolify LXC, remove LXC 101
# Update CLAUDE.md (root) — update Service Architecture
# Update KNOWN_ISSUES.md if applicable
git add -A
git commit -m "docs: replace LXC 101 with Coolify LXC in homelab documentation"
```

---

## Pass 2: Multi-Playlist Support (separate effort)

> **Do this AFTER Pass 1 is stable.** Multi-playlist is a feature addition, not a migration prerequisite.

### Task 18: Add playlist field to transcript pipeline

**Files:**

- Modify: `pipeline/playlists.yml` — add Spirit Talk playlist
- Modify: `pipeline/sync_playlist.sh` — pass playlist name to ingest script
- Modify: `pipeline/youtube-transcripts/scripts/ingest_transcript.py` — add `playlist` field to frontmatter

**Design consideration:** If a video can appear in multiple playlists, use an array/CSV field for playlist membership, not a scalar. Model as `playlists: "main-curated,spirit-talk"` in frontmatter and split in the catalog import.

### Task 19: Add playlist to catalog and UI

**Files:**

- Modify: `src/lib/catalog-import.ts` — parse `playlist` from frontmatter/CSV, add to DB schema
- Modify: `scripts/rebuild-catalog.ts` — include playlist in schema
- Modify: `pipeline/youtube-transcripts/scripts/build_index.py` — add playlist column to `videos.csv`
- Modify: video listing pages — add playlist filter/tabs

**Note:** The catalog is built from `videos.csv`, not directly from frontmatter. The pipeline's `build_index.py` must output the playlist field to CSV, then the catalog importer reads it from there.

### Task 20: Decide on unattended analysis strategy

The current `nightly:insights` script is documented as a "legacy explicit analysis workflow." Consider whether it should:

- A) Stay as-is (manual trigger via Coolify cron, operator reviews results)
- B) Become a dedicated worker/batch job that auto-analyzes new videos
- C) Be integrated into the daily sweep

This is a design decision, not a code task. Make it after Pass 1 is running.

---

## Summary

| Pass  | Phase | Tasks | Description                                                        |
| ----- | ----- | ----- | ------------------------------------------------------------------ |
| **1** | 1     | 1     | Resolve ALL merge conflicts (md, justfile, AND .ts tests)          |
| **1** | 2     | 2-4   | Merge repos, migrate workflow, retire source-refresh               |
| **1** | 3     | 5-8   | Dockerfile, entrypoint with catalog rebuild, compose, dockerignore |
| **1** | 4     | 9-13  | Coolify install, Claude auth, seed volumes, deploy, cron           |
| **1** | 5     | 14-17 | Canary validation, cutover, decommission                           |
| **2** | —     | 18-20 | Multi-playlist support + analysis strategy (after Pass 1 stable)   |

**Total tasks:** 20
**Critical path:** Phase 1 → 2 → 3 → 4 → 5 (sequential, each depends on prior)
**Phase 4 (Coolify install) can start in parallel with Phases 1-3** — only Task 11 (seed volumes) and Task 12 (deploy) need the code work done first.

### Codex Review Findings Addressed

| #   | Severity | Finding                                     | Fix                                                      |
| --- | -------- | ------------------------------------------- | -------------------------------------------------------- |
| 1   | CRITICAL | Stale catalog after deploy                  | Task 5: docker-entrypoint.sh with checksum-based rebuild |
| 2   | CRITICAL | Mixed runtime models (git sync vs baked-in) | Task 4: retire source-refresh.ts and /api/sync-hook      |
| 3   | CRITICAL | No volume seeding before cutover            | Task 11: explicit data migration step                    |
| 4   | HIGH     | Claude auth wrong HOME dir                  | docker-compose mounts to /root/.claude                   |
| 5   | HIGH     | daily:sweep ≠ analysis                      | Task 13: two separate cron jobs (sweep + insights)       |
| 6   | HIGH     | Conflicts in .ts test files missed          | Task 1: expanded grep to include _.ts, _.tsx             |
| 7   | HIGH     | next build needs --webpack flag             | Dockerfile uses `npx next build --webpack`               |
| 8   | MEDIUM   | Playlist model underspecified               | Task 18: array/CSV field, deferred to Pass 2             |
| 9   | MEDIUM   | No canary path for cutover                  | Tasks 14-16: canary hostname validation before cutover   |
