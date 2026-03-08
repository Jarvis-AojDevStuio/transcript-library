# RepoArchitect Move Map — transcript-library

Target framework: Feature-Based app + bounded ops docs (hybrid)

| #   | Old Path                                       | New Path                       | Category     | Impact | Notes                                    |
| --- | ---------------------------------------------- | ------------------------------ | ------------ | -----: | ---------------------------------------- |
| 1   | `Plans/`                                       | `docs/ops/plans/`              | docs         |    low | planning docs consolidation              |
| 2   | `app_docs/`                                    | `docs/ops/app-docs/`           | docs         |    low | app maintenance docs consolidation       |
| 3   | `artifacts/`                                   | `docs/ops/artifacts/`          | docs/scripts |    low | nightly artifacts moved under docs ops   |
| 4   | `todos/`                                       | `docs/ops/todos/`              | docs         |    low | archive TODO notes from root             |
| 5   | `scripts/nightly-insights.ts` (`artifactsDir`) | write to `docs/ops/artifacts/` | scripts      |    low | keep generated artifacts in new location |
| 6   | `README.md` references `Plans/PRD.md`          | `docs/ops/plans/PRD.md`        | docs         |    low | update path docs                         |

## Phase plan

1. Create target directories
2. Move non-code docs/artifacts directories
3. Update references/scripts
4. Verify no stale references
5. Run lint/build checks
6. Commit + PR
