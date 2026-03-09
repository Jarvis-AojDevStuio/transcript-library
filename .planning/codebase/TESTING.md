# Testing

## Snapshot

Automated testing is present but very light. The repo currently has Playwright end-to-end coverage configured in `playwright.config.ts` with a single smoke test in `tests/e2e/smoke.spec.ts`. There is no configured unit-test or integration-test runner in `package.json`.

## Current Frameworks And Commands

- End-to-end framework: `@playwright/test` in `package.json`.
- E2E commands: `npm run e2e` and `npm run e2e:headed` in `package.json`.
- Local command wrapper: `just lint`, `just typecheck`, `just build`, and `just start` in `justfile`.
- The Playwright web server bootstraps the app via `npm run dev -- --hostname 127.0.0.1 --port 3939` from `playwright.config.ts`.
- There is no `test` script in `package.json`, which means the default project test entrypoint is absent.

## Test Layout

- Test files live under `tests/e2e` as configured by `playwright.config.ts`.
- Only one checked-in test file exists today: `tests/e2e/smoke.spec.ts`.
- There are no parallel `tests/unit`, `tests/integration`, `__tests__`, or colocated `*.test.ts(x)` suites anywhere in the repository.
- There are no fixture, factory, or shared test helper directories checked into `tests/`.

## What The Existing E2E Test Covers

`tests/e2e/smoke.spec.ts` verifies only a minimal happy path:

- navigation to `/`
- page title matching `/transcript|library/i`
- visibility of the first level-one heading

This is enough to catch a broken dev server or catastrophic homepage render failure, but not much beyond that.

## Current Mocking Story

- Browser tests currently avoid mocks entirely and exercise the app against a real local dev server per `playwright.config.ts`.
- The app itself reads heavily from the filesystem and environment variables in `src/lib/catalog.ts`, `src/lib/analysis.ts`, `src/lib/insights.ts`, and `src/lib/knowledge.ts`.
- Because there is no unit-test framework configured, there is also no established mocking utility for `fs`, child processes, `fetch`, environment variables, or time.
- The only “test doubles” in practice are fallback branches in runtime code, such as missing transcript file placeholders in `src/app/api/analyze/route.ts` and `src/app/video/[videoId]/page.tsx`.

## Verification Outside Formal Tests

- Linting is a major quality gate through `eslint.config.mjs`, `package.json`, and `.husky/pre-commit`.
- Type-checking is an important substitute for missing unit coverage through `tsconfig.json` and `just typecheck`.
- Build verification via `just build` or `npm run build` likely catches some route/component regressions at compile time.
- Repository notes under `docs/operations/todos/*.md` suggest bug-fixing happens through manual review and targeted follow-up rather than broad automated regression suites.

## Highest-Value Testing Gaps

- No unit tests for parsing and caching behavior in `src/lib/catalog.ts`.
- No unit tests for artifact lookup, legacy migration handling, or preview generation in `src/lib/insights.ts`.
- No unit tests for worker lifecycle, atomic file writes, JSON validation, or process-slot logic in `src/lib/analysis.ts`.
- No API route integration coverage for `src/app/api/analyze/route.ts`, `src/app/api/analyze/status/route.ts`, `src/app/api/insight/route.ts`, `src/app/api/raw/route.ts`, or `src/app/api/sync-hook/route.ts`.
- No UI behavior tests for polling, retry, or SSE-driven state transitions in `src/components/VideoAnalysisWorkspace.tsx` or `src/components/AnalysisPanel.tsx`.
- No route/page tests for server-rendered pages like `src/app/page.tsx`, `src/app/channels/page.tsx`, `src/app/channel/[channel]/page.tsx`, and `src/app/video/[videoId]/page.tsx`.
- No regression tests around environment-dependent behavior tied to `PLAYLIST_TRANSCRIPTS_REPO` and worker CLI execution.

## Risk Concentration

The most fragile untested areas are the ones that combine filesystem IO, process management, and fallback logic:

- `src/lib/analysis.ts`
- `src/lib/insights.ts`
- `src/app/api/analyze/route.ts`
- `src/app/api/analyze/status/route.ts`
- `src/components/VideoAnalysisWorkspace.tsx`

These files contain branching behavior, silent recovery paths, and cross-file contracts that are unlikely to be fully protected by linting or type-checking alone.

## Recommended Next Testing Layer

The lowest-friction improvement would be to add a lightweight unit/integration runner for TypeScript server code and prioritize pure or mostly-pure modules first:

- `src/lib/catalog.ts`
- `src/lib/insights.ts`
- `src/lib/analysis.ts`

After that, expand Playwright beyond smoke coverage to include:

- opening a channel page from `/`
- loading a video detail page
- starting analysis from `src/components/VideoAnalysisWorkspace.tsx`
- validating error states when analysis cannot start

## Practical Takeaways

- Treat the current test posture as “smoke plus static checks,” not broad regression coverage.
- If changing file-system, worker-process, or route-contract code, expect to rely on manual verification unless new tests are added in the same change.
- New tests should establish a repeatable strategy for mocking `fs`, env vars, and process spawning, because those are the dominant dependencies across the codebase.
