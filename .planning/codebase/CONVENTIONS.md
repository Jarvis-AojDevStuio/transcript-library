# Conventions

## Snapshot

The codebase is a strict TypeScript Next.js app with a fairly consistent split between App Router entrypoints in `src/app`, reusable UI in `src/components`, and domain-facing barrels in `src/modules` that re-export lower-level implementations from `src/lib`.

Primary quality guardrails today come from `eslint.config.mjs`, `tsconfig.json`, `package.json`, `justfile`, and the pre-commit formatting/lint flow in `.husky/pre-commit`.

## Naming Patterns

- Route handlers follow Next.js App Router naming in `src/app/api/**/route.ts`.
- Page entrypoints follow framework defaults such as `src/app/page.tsx`, `src/app/channels/page.tsx`, and `src/app/video/[videoId]/page.tsx`.
- Reusable React components use PascalCase filenames and exports, for example `src/components/VideoAnalysisWorkspace.tsx`, `src/components/TranscriptViewer.tsx`, and `src/components/AnalysisPanel.tsx`.
- Low-level library files use lowercase domain names such as `src/lib/analysis.ts`, `src/lib/catalog.ts`, `src/lib/insights.ts`, and `src/lib/knowledge.ts`.
- `src/modules/*/index.ts` files act as public facades over `src/lib/*`, with explicit “public API” docblocks in files like `src/modules/analysis/index.ts` and `src/modules/catalog/index.ts`.
- Internal helper names are descriptive and mostly verb-based: `readVideoRows`, `groupVideos`, `spawnAnalysis`, `readInsightMarkdown`, `getInsightArtifacts`.
- Data coming from CSV or file formats often keeps source naming (`video_id`, `published_date`) in transport types such as `VideoRow` in `src/lib/catalog.ts`, then maps into camelCase app types like `Video`.

## Import And Module Style

- Imports are consistently grouped with Node built-ins first, framework packages next, and local `@/` aliases last. Representative files: `src/app/api/analyze/route.ts`, `src/lib/analysis.ts`, `src/components/VideoAnalysisWorkspace.tsx`.
- The `@/*` path alias is configured in `tsconfig.json` and used broadly instead of long relative imports.
- Most files use named exports for helpers and types. Default exports are primarily reserved for page components in `src/app/**/page.tsx`.
- Barrels are intentionally thin and re-export both values and types rather than adding logic in `src/modules/*/index.ts`.

## Typing Practices

- `tsconfig.json` enables `strict`, `isolatedModules`, and `noEmit`, so the project expects full type-checking discipline.
- Local types are usually declared near usage with explicit unions for state, for example `Status` in `src/components/VideoAnalysisWorkspace.tsx` and `StatusResponse` in `src/app/api/analyze/status/route.ts`.
- Domain models are explicit and readable, especially in `src/lib/analysis.ts` and `src/lib/catalog.ts`.
- The code uses type guards for untrusted JSON in `src/lib/analysis.ts` (`isStatusFile`, `isRunFile`) instead of assuming parsed shapes everywhere.
- `unknown` is used in a few utility boundaries such as `atomicWriteJson` and JSON parsing helpers, but there are still some unchecked casts with `as`, for example in `src/components/VideoAnalysisWorkspace.tsx` and `scripts/backfill-insight-artifacts.ts`.
- The repo allows JavaScript files via `allowJs: true` in `tsconfig.json`, but current application code is effectively TypeScript-first.

## Error Handling Style

- API routes validate request inputs early and return structured JSON errors with HTTP status codes, for example `src/app/api/analyze/route.ts`, `src/app/api/insight/route.ts`, and `src/app/api/raw/route.ts`.
- Server-side libraries generally throw for configuration problems or invariant violations, such as missing `PLAYLIST_TRANSCRIPTS_REPO` in `src/lib/catalog.ts` and invalid `videoId` in `src/lib/insights.ts`.
- Expected filesystem absence is usually treated as non-fatal and normalized to fallback values, for example `readInsightMarkdown` in `src/lib/insights.ts` and transcript reads in `src/app/video/[videoId]/page.tsx`.
- Silent `catch {}` blocks are common in recovery paths and cleanup code, especially in `src/lib/analysis.ts`, `src/lib/insights.ts`, `src/lib/knowledge.ts`, and several route/page files. This keeps the app resilient, but it also hides operational detail and can make debugging harder.
- Unexpected file and process issues are sometimes logged with `console.error` or `console.debug`, but logging is inconsistent across the codebase. Examples: `src/app/api/raw/route.ts`, `src/app/api/sync-hook/route.ts`, `src/lib/analysis.ts`, `src/lib/insights.ts`.
- Error return shapes are mostly consistent around `{ ok: false, error: string }`, though some endpoints omit `ok`, such as `src/app/api/channel/route.ts` and `src/app/api/video/route.ts`.

## React And UI Conventions

- Client components are marked explicitly with `"use client"` and tend to keep request/stream state local, as seen in `src/components/VideoAnalysisWorkspace.tsx` and `src/components/AnalysisPanel.tsx`.
- Styling is primarily inline Tailwind utility classes in TSX, with design tokens coming from CSS variables in `src/app/globals.css`.
- Small presentational helpers are commonly defined in the same file when tightly coupled to a page or component, for example `ExternalIcon` in `src/app/video/[videoId]/page.tsx` and `SparkleIcon` in `src/components/VideoAnalysisWorkspace.tsx`.
- Comments are sparse and usually reserved for section markers or non-obvious behavior. Representative examples appear in `src/app/page.tsx`, `src/app/video/[videoId]/page.tsx`, and `src/lib/insights.ts`.

## Linting And Formatting

- ESLint uses the Next.js core web vitals and TypeScript presets via `eslint.config.mjs`.
- There are no meaningful custom lint rules beyond adjusting global ignores in `eslint.config.mjs`.
- Prettier is installed with `prettier-plugin-tailwindcss`, and `lint-staged` in `package.json` formats staged `ts`, `tsx`, `json`, `md`, and `css` files before also running `eslint --fix` on TypeScript sources.
- Husky is wired through `prepare` in `package.json` and `.husky/pre-commit` exists, so formatting/linting is intended to happen before commits.
- `justfile` exposes `just lint`, `just typecheck`, and `just build`, which reinforces manual verification alongside pre-commit checks.

## Emerging Quality Risks

- Silent catches reduce crash risk but also mask root causes, especially around file IO and worker lifecycle code in `src/lib/analysis.ts` and `src/lib/insights.ts`.
- API response contracts are close but not fully uniform across route handlers in `src/app/api/**/route.ts`.
- Type safety is strong in core libraries, but client fetch layers still lean on ad hoc `as` assertions instead of shared runtime-validated response types.
- The split between `src/lib` and `src/modules` is clear, but the public/private boundary is social rather than enforced; direct imports from `src/lib` still happen in places like `src/app/page.tsx`.

## Practical Takeaways

- Follow existing naming: PascalCase for components, lowercase domain files for libraries, and camelCase for internal helpers.
- Put domain logic in `src/lib/*` and re-export stable entrypoints from `src/modules/*/index.ts` when adding user-facing server functionality.
- Preserve the repo’s pattern of explicit union types and early validation at route boundaries.
- Prefer improving existing fallback/error patterns rather than introducing a radically different exception strategy unless the whole route family is updated together.
