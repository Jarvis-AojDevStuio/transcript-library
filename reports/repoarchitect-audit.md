# RepoArchitect Audit Report

## Repo

- `AojdevStudio/transcript-library`
- Local path: `/Users/openclaw-ekene/.openclaw/workspace/transcript-library`
- Visibility: **public**

## Classification

**Detected framework:** Hybrid: **Ops Hub + Feature-Based** (MEDIUM fit)

### Evidence

- Feature/web app signals: `src/app`, `src/components`, `src/lib`, Next.js configs.
- Ops/knowledge hub signals: `knowledge/`, `todos/`, `artifacts/`, `Plans/`, `app_docs/`, AI scaffolding (`.claude`, `CLAUDE.md`, `justfile`).

### Divergence from a deploy-focused app repo

- Root contains multiple operational/knowledge workspaces mixed with runtime app code.
- This increases noise for deployment ownership and mobile-product iteration speed.

## Health Score

**5/8 (62%) — Needs refactor**

## Failures (Must Fix)

1. **allowed-top-level**
   - Issue: Mixed concerns in root (`Plans`, `app_docs`, `artifacts`, `data`, `knowledge`, `todos`) for a production deploy target.
   - Fix: Separate app runtime from ops/knowledge materials (separate repo or strict `/docs-ops` boundary).

2. **required-files**
   - Issue: Missing `LICENSE` on public repo.
   - Fix: Add license file.

## Passing

- `.github/workflows` placement is correct.
- No obvious junk root temp/log files.
- No catch-all misc overflow pattern found.
- No concerning depth explosion detected in quick scan.

## Module Boundary Check

- `src/modules/` not present, so module-boundary checks were **not applicable** in this run.

## Recommended Next Step (Idea #2 aligned)

1. Keep transcript product as a **deploy-first app** (Next.js).
2. Move or isolate heavy `knowledge/`, `todos/`, and archival artifacts so runtime repo stays clean.
3. Add mobile-first video + transcript view model, then deploy to **Vercel** (fastest path).
4. Optional follow-up: run **RefactorPlan** workflow to generate a move-map before restructuring.
