# Coolify Migration Design

**Date:** 2026-04-02
**Status:** Approved (revised after Codex review)
**Scope:** Merge playlist-transcripts into transcript-library, deploy via Coolify on Proxmox

---

## Problem

Two repos that should be one:

- `transcript-library` (Next.js app) on LXC 101 via pm2/deploy-hook/systemd/cloudflared
- `playlist-transcripts` (Python pipeline) syncing every 4h via GitHub Actions

The sync webhook between them broke silently. Transcripts haven't updated since 2026-03-14 (19 days stale). The deployment stack has 6 moving parts doing what Coolify does out of the box.

## Decision

Merge repos. Deploy via Coolify on a new Proxmox LXC. Decommission LXC 101 after validation.

---

## Architecture

### Unified Repo Structure

```
transcript-library/
├── pipeline/                        # was playlist-transcripts
│   ├── scripts/                     # Python pipeline (ingest, classify, index)
│   ├── youtube-transcripts/         # Transcript vault
│   │   ├── inbox/                   # Raw yt-dlp downloads (transient)
│   │   ├── index/                   # CSVs: videos, channels, topics
│   │   └── topics/                  # Classified transcripts by topic
│   │       ├── ai-llms/
│   │       ├── business/
│   │       ├── faith/
│   │       ├── finance-investing/
│   │       ├── hardware-homelab/
│   │       └── software-engineering/
│   ├── playlists.yml                # Multi-playlist config
│   ├── sync_playlist.sh             # Orchestrator
│   └── requirements.txt             # pyyaml, yt-dlp deps
├── data/
│   ├── catalog/catalog.db           # SQLite (volume-mounted)
│   └── insights/<videoId>/          # Analysis artifacts (volume-mounted)
├── src/                             # Next.js 16 app
├── .github/workflows/
│   ├── sync-playlist.yml            # Every 4h: fetch transcripts, commit, push
│   ├── claude.yml                   # Claude bot for issues/PRs
│   └── claude-code-review.yml       # Automated PR review
├── Dockerfile
├── docker-compose.yml
├── package.json
└── justfile
```

### Pipeline Trigger Flow

```
GitHub Action (cron: every 4h)
  → yt-dlp fetches new videos from all playlists
  → Python: ingest → classify → build_index → build_summary
  → git commit + push to main
  → Push triggers Coolify auto-deploy webhook
  → App rebuilds with new transcripts baked in

Coolify cron (daily)
  → Runs analysis sweep on unprocessed videos
  → Claude CLI generates insights for new content
  → Writes to volume-mounted data/insights/
```

### Multi-Playlist Support

Expand existing `playlists.yml`:

```yaml
playlists:
  - name: main-curated
    url: "https://youtube.com/playlist?list=PLnuGPVqDkDzSAf93OH2Zq1_6yXWZZOjdz"
    enabled: true
  - name: spirit-talk
    url: "https://youtube.com/playlist?list=PLnuGPVqDkDzSxB9GByqQDr3t2Izl-hEoz"
    enabled: true
  - name: bitcoin
    url: "https://youtube.com/playlist?list=PLxxxxxxx"
    enabled: false # enable when ready
```

Add `playlist` field to transcript frontmatter so the UI can filter by playlist. The existing topic classifier continues to work for topic-based browsing.

---

## Coolify Deployment

### Infrastructure

- **New LXC** created via Proxmox community script
  - Debian 13, 4 GB RAM (bump to 8 GB since app runs here too), 30 GB disk, 2 cores
  - Coolify dashboard at `http://<LXC_IP>:8000`
  - Single-server mode (Coolify deploys to itself)

### Docker Compose

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

volumes:
  catalog-data:
  insights-data:
```

**Post-deploy catalog rebuild:** The SQLite catalog is volume-backed and survives deploys. New transcripts baked into the image won't appear in the UI unless the catalog is rebuilt. Add a startup entrypoint that detects transcript changes and runs `rebuild-catalog` before starting the app.

### Dockerfile

```dockerfile
FROM node:22-slim

RUN npm install -g @anthropic-ai/claude-code
RUN apt-get update && apt-get install -y git python3 python3-pip python3-venv && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
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

**Note:** Container runs as root (Coolify default). Claude CLI auth is mounted at `/root/.claude` accordingly. The `--webpack` flag is required — plain `next build` triggers a Next 16 turbopack panic in this codebase.

### Claude CLI Auth

Volume-mount `/home/deploy/.claude` from the host into `/root/.claude` in the container (read-only). The container runs as root by default in Coolify, so Claude CLI looks under `/root/.claude`. The OAuth session persists on the host. If it expires, re-auth on the host — the container picks it up on next analysis run.

**Important:** Claude CLI auth must be set up on the Coolify LXC host **before** the first deploy that attempts analysis. The app deploy itself doesn't need it — only the analysis cron does.

### Cloudflare Tunnel

Use a **canary hostname** during validation, then cut over production:

```yaml
# Phase 1: Canary (both old and new running)
- hostname: library-canary.aojdevstudio.me
  service: http://<coolify-lxc-ip>:3000

# Phase 2: Cutover (after validation passes)
- hostname: library.aojdevstudio.me
  service: http://<coolify-lxc-ip>:3000
```

Existing Cloudflare Access policies stay unchanged. Add the canary hostname to the Access application during validation.

---

## Repo Merge Strategy

Use `git subtree add` to merge playlist-transcripts (note: `--squash` condenses into one merge commit, does not preserve individual history — original repo stays on GitHub as archive):

```bash
cd ~/Projects/transcript-library
git remote add transcripts https://github.com/AojdevStudio/playlist-transcripts.git
git fetch transcripts
git subtree add --prefix=pipeline transcripts master --squash
```

Then:

- Move `.github/workflows/sync-playlist.yml` from `pipeline/.github/` to `.github/workflows/`
- Update paths in the workflow to reference `pipeline/` prefix
- Update `sync_playlist.sh` paths accordingly
- Remove the separate `PLAYLIST_TRANSCRIPTS_REPO` env var — app reads from `./pipeline/youtube-transcripts/`
- **Retire `source-refresh.ts` and `/api/sync-hook`** — `pipeline/` is no longer a standalone git repo; runtime git sync is impossible. Transcripts arrive via GitHub Action → push → Coolify auto-deploy.
- **Migrate GitHub Actions secrets** — `YT_COOKIES`, `CLAUDE_CODE_OAUTH_TOKEN` must be configured on the unified repo

---

## What Goes in Homelab Repo

The app code stays in `AojdevStudio/transcript-library`. The homelab repo gets:

- Documentation in `proxmox/CLAUDE.md` about the Coolify LXC (IP, purpose, access)
- Cloudflare tunnel config update in `proxmox/cloudflared/config.yml`
- Entry in `KNOWN_ISSUES.md` if there are migration caveats

---

## Volume Seeding (before cutover)

Existing analysis artifacts and catalog must be migrated from LXC 101 **before** the first production cutover. Without this, all existing insights disappear.

1. SSH into LXC 101, tar up `/srv/transcript-library/catalog/` and `/srv/transcript-library/insights/`
2. Copy to Coolify LXC
3. Import into the Docker volumes before first deploy

---

## Decommission Plan

After canary validation passes (48h):

1. Cut over `library.aojdevstudio.me` from LXC 101 to Coolify LXC
2. Remove canary hostname
3. Stop pm2 on LXC 101
4. Stop deploy-hook and sweep timer
5. Stop cloudflared
6. Back up `/srv/transcript-library/` (SQLite + insights) to NAS (safety copy)
7. Remove LXC 101 from Proxmox
8. Remove old cloudflared ingress rule for LXC 101
9. Clean up `deploy/` directory in repo (or keep as historical reference)

---

## Risks

| Risk                                         | Mitigation                                                                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Claude CLI OAuth expires in container        | Re-auth on host, container picks up via volume mount                                                                           |
| Repo grows large with transcript history     | Transcripts are text (~244 files, <50MB total). Manageable.                                                                    |
| GitHub Action yt-dlp breaks (cookies expire) | Monitor Action failures. YT_COOKIES secret needs periodic refresh.                                                             |
| Coolify LXC resource contention              | Start with 8 GB RAM. Monitor via Coolify dashboard.                                                                            |
| Merge conflicts from unmerged branches       | Resolve ALL conflicts (md, justfile, AND .ts tests) before merge                                                               |
| Stale catalog after deploy                   | Entrypoint script rebuilds catalog when transcript checksums change                                                            |
| Auto-deploy kills in-flight analysis         | Analysis runs as a separate Coolify cron; container restart only affects the web process. Consider graceful shutdown handling. |
| Playlist model: video in multiple playlists  | Model playlist membership as array/CSV field, not scalar                                                                       |
