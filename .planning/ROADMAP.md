# Roadmap: Transcript Library

## Overview

This roadmap hardens the existing private transcript library without changing its UI direction. The sequence starts with deployment-safe artifact storage and a strict structured analysis contract, then replaces CSV-backed catalog reads with SQLite, then moves analysis lifecycle state toward durable orchestration, and finally closes the remaining hosted deployment, trust-boundary, and scale-readiness gaps for a private Proxmox-hosted release.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Artifact Foundations** - Make artifact storage deployment-safe and establish the structured analysis contract
- [x] **Phase 2: SQLite Catalog** - Replace CSV-backed catalog reads with indexed SQLite queries for faster browsing
- [ ] **Phase 3: Durable Runtime** - Replace fragile analysis lifecycle behavior with durable job and sync state
- [ ] **Phase 4: Hosted Hardening** - Tighten private deployment boundaries, scale-readiness, and final hosted validation

## Phase Details

### Phase 1: Artifact Foundations

**Goal**: Unblock hosted deployment by separating runtime artifact storage from the release tree and making structured analysis data reliable for the UI.
**Depends on**: Nothing (first phase)
**Requirements**: [DEPLOY-01, DEPLOY-02, ANLY-01, ANLY-02, ANLY-03, ANLY-04, SAFE-03, TEST-01, TEST-02]
**Success Criteria** (what must be TRUE):

1. Operator can point runtime insight storage to a configured base directory and local development still works without extra setup.
2. New analysis runs produce both `analysis.json` and `analysis.md`, and invalid structured payloads fail loudly instead of rendering partial garbage.
3. Existing markdown-only insights still display correctly while the migration is in progress.
4. Insight path helpers consistently enforce safe `videoId` and artifact path construction rules.
   **Plans**: 3 plans

Plans:

- [x] 01-01: Implement configurable insights base directory with regression coverage
- [x] 01-02: Add the structured `analysis.json` schema, parser, and runtime writes
- [x] 01-03: Wire UI/runtime compatibility paths and validate safe artifact/path helpers

### Phase 2: SQLite Catalog

**Goal**: Move catalog-backed browsing from synchronous CSV parsing to indexed SQLite queries without breaking existing navigation behavior.
**Depends on**: Phase 1
**Requirements**: [CAT-01, CAT-02, CAT-03, CAT-04, PERF-01, PERF-04, SAFE-04, TEST-03]
**Success Criteria** (what must be TRUE):

1. Home and channel pages load catalog data from SQLite-backed indexed queries rather than synchronous CSV parsing.
2. Video lookup, channel grouping, and transcript ordering remain correct after the migration.
3. Catalog migration includes a parity or validation path that catches behavior drift before the old implementation is retired.
4. Repeated catalog-backed reads can benefit from appropriate caching or revalidation without serving incorrect data.
   **Plans**: 3 plans

Plans:

- [x] 02-01: Design SQLite schema and import path for catalog metadata
- [x] 02-02: Swap home, channel, and video metadata reads to SQLite-backed repositories
- [x] 02-03: Add parity checks, validation, and caching/revalidation for hot catalog paths

### Phase 3: Durable Runtime

**Goal**: Make analysis execution, sync/backfill behavior, and artifact reconciliation durable enough for hosted use and future worker separation.
**Depends on**: Phase 2
**Requirements**: [RUN-01, RUN-02, RUN-03, RUN-04, SAFE-02, PERF-03, TEST-04]
**Success Criteria** (what must be TRUE):

1. Analysis run state survives process restarts well enough that UI status is not derived only from in-memory counters or PID checks.
2. Sync/backfill flows report started, pending, failed, and completed work clearly enough for operators to understand what happened.
3. Artifact mismatches are detectable and reconcilable instead of silently appearing as normal success.
4. Live status/log streaming avoids obviously wasteful polling behavior as concurrent viewers increase.
   **Plans**: 3 plans

Plans:

- [ ] 03-01: Introduce durable analysis job/run records and lifecycle transitions
- [ ] 03-02: Rework sync/backfill flow around durable queue visibility and clearer outcomes
- [ ] 03-03: Improve artifact reconciliation, runtime observability, and streaming/status behavior

### Phase 4: Hosted Hardening

**Goal**: Finalize private hosted readiness by tightening the trust boundary, validating deploy prerequisites, and proving scale-readiness around the 1000-video target.
**Depends on**: Phase 3
**Requirements**: [DEPLOY-03, SAFE-01, PERF-02]
**Success Criteria** (what must be TRUE):

1. Hosted deployment fails early when required runtime paths, environment variables, or operational dependencies are missing.
2. Internal APIs that expose transcript or artifact data are protected appropriately for the private deployment boundary.
3. Build and runtime behavior remain practical as the library approaches roughly 1000 videos, with a documented answer for whether SQLite plus filesystem remains sufficient.
   **Plans**: 2 plans

Plans:

- [ ] 04-01: Add startup/deploy validation and tighten private API exposure rules
- [ ] 04-02: Validate hosted scale behavior and document the next-step threshold beyond SQLite

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase                   | Plans Complete | Status      | Completed  |
| ----------------------- | -------------- | ----------- | ---------- |
| 1. Artifact Foundations | 3/3            | Complete    | 2026-03-09 |
| 2. SQLite Catalog       | 3/3            | Complete    | 2026-03-10 |
| 3. Durable Runtime      | 0/3            | Not started | -          |
| 4. Hosted Hardening     | 0/2            | Not started | -          |
