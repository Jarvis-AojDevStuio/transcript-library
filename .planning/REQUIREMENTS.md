# Requirements: Transcript Library

**Defined:** 2026-03-09
**Core Value:** The library must stay fast and trustworthy for private knowledge browsing and analysis, even as the catalog grows and runtime analysis moves onto a hosted Proxmox container.

## v1 Requirements

### Deployment And Storage

- [x] **DEPLOY-01**: Operator can configure the base insights storage directory via environment configuration so runtime artifacts can live outside the deployed app tree
- [x] **DEPLOY-02**: Existing local development behavior continues to work when the configurable insights storage directory is unset
- [ ] **DEPLOY-03**: Hosted deployment prerequisites are validated clearly enough that missing critical environment or filesystem requirements fail before user-triggered analysis flows

### Structured Analysis

- [x] **ANLY-01**: New analysis runs write a validated `analysis.json` artifact alongside `analysis.md`
- [x] **ANLY-02**: The UI reads summary, takeaways, action items, and other structured sections from validated structured analysis data instead of markdown heuristics
- [x] **ANLY-03**: Existing markdown-only insights continue to render through a compatibility fallback during migration
- [x] **ANLY-04**: Invalid structured analysis payloads fail clearly and leave enough operational evidence to debug the failure

### Catalog And Query Performance

- [x] **CAT-01**: Catalog metadata is stored in SQLite instead of requiring synchronous `videos.csv` parsing on hot request paths
- [x] **CAT-02**: Home and channel pages load their catalog data through indexed queries that scale cleanly to at least the project’s near-term catalog size
- [x] **CAT-03**: Video lookup by `videoId`, channel grouping, and transcript-part ordering remain correct after the catalog migration
- [x] **CAT-04**: Catalog migration includes validation or parity checks that catch differences between the old CSV behavior and the new SQLite-backed behavior before the old path is removed

### Runtime Durability And Observability

- [ ] **RUN-01**: Analysis job lifecycle state is stored durably enough that run status does not depend only on in-memory counters or PID checks
- [ ] **RUN-02**: Sync/backfill flows report what work started, what remains pending, and what failed instead of only returning a generic success message
- [ ] **RUN-03**: Artifact state can be reconciled well enough that mismatches between output files and job status are detectable instead of silently treated as normal
- [ ] **RUN-04**: Existing observability artifacts such as `status.json`, `run.json`, and worker logs remain available or are mapped cleanly during the transition

### Security And Validation

- [ ] **SAFE-01**: Internal API routes that expose transcripts, artifacts, or local path-derived data are protected appropriately for the private hosted deployment model
- [ ] **SAFE-02**: Webhook-triggered batch analysis has stronger abuse resistance through improved validation, replay protection, or equivalent safeguards appropriate to the deployment
- [x] **SAFE-03**: Lower-level path and artifact helpers enforce safe `videoId` and path-construction rules so internal refactors do not bypass validation accidentally
- [x] **SAFE-04**: Catalog and SQLite-backed browse inputs are validated consistently enough that malformed data fails loudly instead of degrading silently

### Performance And Scale Hygiene

- [x] **PERF-01**: Hot request paths reduce unnecessary synchronous filesystem work so common private browsing stays fast under hosted use
- [ ] **PERF-02**: Page generation and read strategies remain practical as the library approaches roughly 1000 videos
- [ ] **PERF-03**: Live status/log streaming avoids unbounded polling or connection behavior that degrades noticeably as concurrent viewers increase
- [x] **PERF-04**: The app uses caching or revalidation strategies where appropriate to improve repeated catalog-backed reads without compromising correctness

### Verification

- [x] **TEST-01**: Automated tests cover the configurable insights base directory behavior and insight path resolution
- [x] **TEST-02**: Automated tests cover the structured analysis parser/contract and compatibility fallbacks
- [x] **TEST-03**: Automated tests cover SQLite-backed catalog reads and migration parity for representative catalog cases
- [ ] **TEST-04**: Automated tests cover critical runtime lifecycle paths such as status transitions, sync behavior, and artifact reconciliation

## v2 Requirements

### Scaling Evolution

- **SCALE-01**: Operator can move beyond SQLite to a larger multi-node database architecture if the deployment model or write concurrency changes materially
- **SCALE-02**: Analysis execution can move into a separate worker service without rewriting the user-facing application

### Security Expansion

- **SECU-01**: App-level user/session authentication is added if the deployment perimeter expands beyond the current trusted private-access model

## Out of Scope

| Feature                                                                     | Reason                                                                         |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Major UI redesign                                                           | Current UI is already meeting expectations; this cycle is architecture-focused |
| Public self-serve onboarding or SaaS account management                     | The app remains a private internal tool for a small friend group               |
| Moving provider switching into the UI                                       | Provider selection should stay behind the server runtime                       |
| Replacing filesystem artifact storage entirely with relational blob storage | A hybrid SQLite + filesystem model is the right near-term fit                  |

## Traceability

| Requirement | Phase   | Status   |
| ----------- | ------- | -------- |
| DEPLOY-01   | Phase 1 | Complete |
| DEPLOY-02   | Phase 1 | Complete |
| DEPLOY-03   | Phase 4 | Pending  |
| ANLY-01     | Phase 1 | Complete |
| ANLY-02     | Phase 1 | Complete |
| ANLY-03     | Phase 1 | Complete |
| ANLY-04     | Phase 1 | Complete |
| CAT-01      | Phase 2 | Complete |
| CAT-02      | Phase 2 | Complete |
| CAT-03      | Phase 2 | Complete |
| CAT-04      | Phase 2 | Complete |
| RUN-01      | Phase 3 | Pending  |
| RUN-02      | Phase 3 | Pending  |
| RUN-03      | Phase 3 | Pending  |
| RUN-04      | Phase 3 | Pending  |
| SAFE-01     | Phase 4 | Pending  |
| SAFE-02     | Phase 3 | Pending  |
| SAFE-03     | Phase 1 | Complete |
| SAFE-04     | Phase 2 | Complete |
| PERF-01     | Phase 2 | Complete |
| PERF-02     | Phase 4 | Pending  |
| PERF-03     | Phase 3 | Pending  |
| PERF-04     | Phase 2 | Complete |
| TEST-01     | Phase 1 | Complete |
| TEST-02     | Phase 1 | Complete |
| TEST-03     | Phase 2 | Complete |
| TEST-04     | Phase 3 | Pending  |

**Coverage:**

- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0 ✓

---

_Requirements defined: 2026-03-09_
_Last updated: 2026-03-09 after roadmap creation_
