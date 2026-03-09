# Stack

## Languages And Runtime

- TypeScript is the primary language across the app and scripts: `src/**/*.ts`, `src/**/*.tsx`, `scripts/*.ts`, `playwright.config.ts`.
- React 19 powers the UI and Next.js App Router pages: `package.json`, `src/app/**`, `src/components/**`.
- The server/runtime is Node.js, not Edge. API handlers opt into `runtime = "nodejs"` in `src/app/api/analyze/route.ts`, `src/app/api/insight/route.ts`, `src/app/api/raw/route.ts`, and related routes.
- Bun is the preferred local task runner/package manager even though `package-lock.json` is also committed: `bun.lock`, `justfile`, `package.json`.
- Node built-ins do most non-UI work: `fs`, `path`, `crypto`, `child_process` in `src/lib/analysis.ts`, `src/lib/catalog.ts`, `src/lib/headless-youtube-analysis.ts`, `scripts/nightly-insights.ts`.

## Frameworks And Libraries

- Next.js `16.1.6` is the application framework: `package.json`, `next.config.ts`.
- React `19.2.3` and `react-dom` `19.2.3` back the component tree: `package.json`.
- Markdown rendering uses `react-markdown`, `remark-gfm`, `rehype-highlight`, and `highlight.js`: `package.json`, documented in `docs/architecture/analysis-runtime.md`.
- Tailwind CSS v4 is configured through PostCSS rather than a standalone Tailwind config file: `package.json`, `postcss.config.mjs`.
- ESLint 9 with `eslint-config-next` handles linting: `eslint.config.mjs`, `package.json`.
- Playwright provides E2E coverage: `package.json`, `playwright.config.ts`, `tests/e2e/smoke.spec.ts`.
- Husky plus `lint-staged` enforce formatting/linting on staged files: `package.json`, `.husky/**`.

## Project Shape

- App Router pages and route handlers live under `src/app/**`.
- Shared UI components live under `src/components/**` and `src/components/ui/**`.
- Module entrypoints wrap lower-level libraries in `src/modules/**`; current capabilities include `analysis`, `catalog`, `curation`, `insights`, `knowledge`, and `recent`.
- Most business logic remains file-backed utility code under `src/lib/**`.
- Generated and persisted analysis artifacts live under `data/insights/<videoId>/`.
- Editorial markdown knowledge content lives under `knowledge/**`.
- Operational docs and runbooks live under `docs/architecture/**` and `docs/operations/**`.

## Dependency And Build Surface

### Package scripts

- `dev`: `next dev` in `package.json`.
- `build`: `next build` in `package.json`.
- `start`: `next start` in `package.json`.
- `lint`: `eslint` in `package.json`.
- `e2e`: `playwright test` in `package.json`.
- `nightly:insights`: `bun run scripts/nightly-insights.ts` in `package.json`.

### Preferred project commands

- `just install` runs `bun install`: `justfile`.
- `just dev` runs `bun run dev -- --hostname ... --port ...`: `justfile`.
- `just build` forces `bunx next build --webpack` to avoid a documented Next 16 Turbopack issue: `justfile`.
- `just prod-start` builds first, then launches `bun run start` with `HOSTNAME` and `PORT`: `justfile`.
- `just lint`, `just typecheck`, `just fmt`, `just backfill-insights`, and `just insights` wrap recurring dev/ops tasks: `justfile`.

## TypeScript And Module Resolution

- Strict TypeScript is enabled with `strict: true` and `noEmit: true`: `tsconfig.json`.
- Module resolution is `bundler`, matching modern Next.js expectations: `tsconfig.json`.
- The codebase uses the `@/*` alias mapped to `./src/*`: `tsconfig.json`.
- JSX is configured with `react-jsx`: `tsconfig.json`.

## Styling And Frontend Tooling

- Tailwind v4 is wired via `@tailwindcss/postcss`: `package.json`, `postcss.config.mjs`.
- Remote image loading is explicitly allowed for YouTube thumbnails from `https://i.ytimg.com`: `next.config.ts`.
- The UI is desktop-first per repo guidance, but still rendered as a standard React/Next web app: `AGENTS.md`, `src/app/**`.

## Data Storage Model

- There is no application database or ORM in the current codebase.
- Catalog data is read from CSV files in an external transcript repo, primarily `youtube-transcripts/index/videos.csv`: `src/lib/catalog.ts`.
- Analysis outputs are stored as filesystem artifacts keyed by `videoId`: `src/lib/analysis.ts`, `docs/architecture/artifact-schema.md`, `README.md`.
- Knowledge content is read from local markdown folders under `knowledge/**`: `src/lib/knowledge.ts`.
- Recent activity is derived from filesystem mtimes rather than a DB-backed activity log: `src/lib/recent.ts`.

## Background And Worker Model

- The live app performs analysis by spawning child processes directly from the Next.js server runtime: `src/lib/analysis.ts`.
- Concurrency is in-process and capped at `MAX_CONCURRENT = 2`: `src/lib/analysis.ts`.
- Status and observability are file-based via `status.json`, `run.json`, `worker-stdout.txt`, and `worker-stderr.txt`: `src/lib/analysis.ts`, `README.md`.
- A separate batch/backfill path exists through `scripts/nightly-insights.ts` and `scripts/backfill-insight-artifacts.ts`.
- The nightly script still references an older queue/worker contract and expects `scripts/analysis-worker.sh`, which is not part of the current mapped source tree: `scripts/nightly-insights.ts`.

## Testing And Verification

- Browser smoke coverage is implemented with Playwright under `tests/e2e/**`.
- Playwright boots the app with `npm run dev -- --hostname 127.0.0.1 --port 3939` and targets `http://127.0.0.1:3939`: `playwright.config.ts`.
- There is no separate unit test suite or DB migration/test harness visible in the current manifests.

## Environment And Config

### Required

- `PLAYLIST_TRANSCRIPTS_REPO` points to the external local clone that contains transcript CSV/index/content files: `.env.example`, `src/lib/catalog.ts`, `src/lib/analysis.ts`.

### Optional runtime selection

- `ANALYSIS_PROVIDER` chooses `claude-cli` or `codex-cli`: `CLAUDE.md`, `src/lib/analysis.ts`.
- `ANALYSIS_MODEL` provides a generic model override: `CLAUDE.md`, `src/lib/analysis.ts`.
- `CLAUDE_ANALYSIS_MODEL` overrides the Claude provider specifically: `CLAUDE.md`, `src/lib/analysis.ts`.
- `CODEX_ANALYSIS_MODEL` overrides the Codex provider specifically: `CLAUDE.md`, `src/lib/analysis.ts`.

### Optional operational config

- `SYNC_TOKEN` protects the sync webhook route: `CLAUDE.md`, `src/app/api/sync-hook/route.ts`.
- `LIMIT` influences nightly batch size in the Bun script: `scripts/nightly-insights.ts`.
- `CI` changes Playwright retries/worker counts and web-server reuse: `playwright.config.ts`.

## Not Present In The Current Stack

- No hosted database integration is wired into app code.
- No auth provider or user/session framework is present.
- No external queue broker, cron platform SDK, or webhook framework is present in dependencies.
- No Docker, Prisma, Drizzle, Supabase client, Clerk, Redis, or Stripe packages are declared in `package.json`.
