# Search System Design

## Goal

Define the technical architecture for the Transcript Library UI search system,
including:

- search authorities
- local index storage
- API shape
- rebuild and validation flow
- tools and libraries
- UI integration points
- future semantic extension path

This document deepens:

- `docs/brainstorms/2026-04-07-ui-search-feature-brainstorm.md`
- `docs/plans/2026-04-07-ui-search-feature-plan.md`

## Design Summary

The search system will stay inside the existing Next.js application.

It will use:

- the existing catalog SQLite DB as browse metadata authority
- filesystem-backed insight and knowledge artifacts as upstream content authorities
- a dedicated local search index in its own SQLite DB under `data/search/`
- hybrid rendering:
  - server-rendered initial `/search` loads
  - `GET /api/search` for debounced live updates and refinements

Keyword search is the first required search mode.
Semantic search remains a planned extension point, but not a required external
provider dependency for the first shipped architecture.

## Locked Decisions

### 1. Search Execution Model

The search experience uses a hybrid execution model:

- initial `/search` page render can happen server-side
- debounced typing and active refinement use `GET /api/search`
- `POST /api/search` exists as a compatibility and future-extension route, but
  `GET /api/search` is canonical

### 2. Search Authorities

The system has three upstream content authorities:

- **Catalog metadata authority:** existing SQLite browse catalog
- **Insight authority:** filesystem artifacts under `data/insights/<videoId>/`
- **Knowledge authority:** markdown files under `knowledge/`

These authorities feed the search index. They should not be scanned directly for
normal user queries after index build.

### 3. Dedicated Search Index

The first architecture includes a dedicated local keyword index from day one.

The index lives separately from the browse catalog at:

- `data/search/search.db`

This separation keeps responsibilities clear:

- `data/catalog/catalog.db` remains browse authority
- `data/search/search.db` becomes search authority

### 4. Indexed Search Coverage

The search index should include all of the following in V1:

- video title
- channel
- topic
- transcript text
- insight summary
- insight takeaways
- insight action items
- insight notable points
- knowledge documents

### 5. Document Granularity

The search index should store multiple representations for better ranking and
snippet quality.

#### Transcript representations

Index both:

- video-level transcript documents
- chunk-level transcript documents

Why:

- video-level improves broad topic relevance
- chunk-level improves precise snippet retrieval and future deep-linking

#### Knowledge representations

Index both:

- file-level knowledge documents
- section-level knowledge documents split by headings

Why:

- file-level improves broad topical discovery
- section-level improves precision and expansion quality

### 6. Rebuild Flow

The search index should rebuild automatically after the existing sync/catalog
refresh flow publishes updated source state.

Operators should also have manual commands, but manual runs default to
validation/check behavior unless explicitly forced.

### 7. API Contract Direction

The search API should be UI-facing, not a debug endpoint.

It should accept:

- `q`
- source filters
- channel filters
- topic filters
- category filters

It should return display-ready grouped results directly.

### 8. Pagination

The first architecture should support group-level pagination only.

Do not add per-match pagination in the initial system.

### 9. Snippet Strategy

Use a hybrid snippet strategy:

- precompute and store preview text for metadata, insight, and knowledge fields
- generate transcript snippets at query time from indexed text and/or offsets

### 10. Semantic Path

The architecture should leave room for semantic search, but semantic support is
not required to ship the first working system.

When semantic search is added later, it should remain:

- invisible as a user mode switch
- subordinate to strong exact keyword matches
- pluggable behind a provider boundary

## Architecture

### Current system boundaries

Relevant existing code boundaries:

- `src/app/search/page.tsx`
- `src/components/SearchBar.tsx`
- `src/components/NavHeader.tsx`
- `src/modules/search/index.ts`
- `src/lib/search.ts`
- `src/lib/catalog.ts`
- `src/lib/insights.ts`
- `src/lib/knowledge.ts`

The architecture should extend these boundaries rather than introducing a
separate service prematurely.

### New architecture boundaries

Likely new internal modules:

- `src/lib/search-contract.ts`
- `src/lib/search-index.ts`
- `src/lib/search-ranking.ts`
- `src/lib/search-api.ts`
- `src/lib/search-suggestions.ts`
- `src/lib/search-semantic.ts` (future-facing boundary)

Likely new UI components:

- `src/components/SearchShell.tsx`
- `src/components/SearchFilters.tsx`
- `src/components/SearchResultGroup.tsx`
- `src/components/SearchSection.tsx`
- `src/components/SearchEmptyState.tsx`
- `src/components/SearchRecentQueries.tsx`
- `src/components/SearchSuggestions.tsx`

## Storage Design

### Search DB path

Primary path:

- `data/search/search.db`

Related operational artifacts:

- `data/search/last-build.json`
- `data/search/last-validation.json`
- `data/search/schema-version.json`

Possible future semantic artifacts:

- `data/search/semantic-index.json`
- `data/search/embeddings/`

### Search data model direction

Suggested conceptual types:

```ts
type SearchEntityType = "video" | "knowledge";

type SearchDocumentKind =
  | "video-metadata"
  | "transcript-video"
  | "transcript-chunk"
  | "insight-summary"
  | "insight-takeaway"
  | "insight-action-item"
  | "insight-notable-point"
  | "knowledge-file"
  | "knowledge-section";

type SearchDocument = {
  id: string;
  entityType: SearchEntityType;
  entityId: string;
  kind: SearchDocumentKind;
  title: string;
  href: string;
  channel?: string;
  topic?: string;
  category?: string;
  sourcePath?: string;
  chunkIndex?: number;
  heading?: string;
  body: string;
  previewText?: string;
};
```

Suggested table families:

- `search_documents`
- `search_document_metadata`
- `search_builds`
- optional future semantic tables

The implementation can decide exact SQL schema details, but the architecture
requires a clear split between indexed search documents and operational build
metadata.

## API Design

### Canonical route

Canonical search route:

- `GET /api/search`

Compatibility route:

- `POST /api/search`

### Request model

Conceptual request shape:

```ts
type SearchRequest = {
  q: string;
  sources?: string[];
  channels?: string[];
  topics?: string[];
  categories?: string[];
  page?: number;
};
```

Even if filters stay out of the URL in V1, the API should still support them.

### Response model

The API should return display-ready grouped results, not raw document hits.

Conceptual response shape:

```ts
type SearchMatchSource =
  | "title"
  | "channel"
  | "topic"
  | "transcript"
  | "summary"
  | "takeaway"
  | "action-item"
  | "notable-point"
  | "knowledge";

type SearchMatch = {
  source: SearchMatchSource;
  snippet: string;
  matchedIn: string;
  semantic?: boolean;
};

type SearchGroup = {
  id: string;
  entityType: "video" | "knowledge";
  title: string;
  href: string;
  subtitle?: string;
  channel?: string;
  topic?: string;
  category?: string;
  matchedSources: SearchMatchSource[];
  topMatches: SearchMatch[];
  allMatches: SearchMatch[];
};

type SearchApiResponse = {
  query: string;
  blended: SearchGroup[];
  sections: {
    videos: SearchGroup[];
    knowledge: SearchGroup[];
  };
  suggestions: {
    relatedTerms: string[];
    trendingTopics: string[];
    recentQueries: string[];
  };
};
```

This reflects the product choice that the search API should return grouped
results plus suggestions and recent-search payloads together.

## Ranking Design

### Keyword ranking

Keyword and near-exact matching remain authoritative.

Weighted ranking order:

1. title
2. topic
3. curated insight fields
4. knowledge fields
5. transcript body

This supports topic research while preserving exact lookup trust.

### Group ranking

Ranking should happen in two stages:

1. rank indexed document hits
2. collapse them into entity-level groups and rank groups

Group scoring should favor:

- stronger field matches
- multiple confirming hits across fields
- recency as a tiebreaker for videos when needed

### Snippet and match explanation

The API should return enough match context for the UI to explain:

- what source matched
- where it matched
- what snippets to show

The API should not expose raw internal scoring values to the browser UI.

## Rebuild And Validation Flow

### Automatic flow

Target flow:

1. source refresh completes
2. catalog validation/publish completes
3. search index rebuild starts
4. search validation runs
5. live `search.db` is atomically replaced on success
6. `last-build.json` and `last-validation.json` are updated

### Manual operator flow

Suggested commands:

```bash
npx tsx scripts/rebuild-search-index.ts --check
npx tsx scripts/rebuild-search-index.ts --force
```

Suggested `justfile` additions later:

```bash
just rebuild-search-check
just rebuild-search
```

Behavior:

- `--check` validates against current authorities without replacing the live DB
- `--force` rebuilds and atomically publishes a fresh live DB

### Safety requirements

Search rebuild should follow the same safety posture as catalog rebuild:

- build temp DB first
- validate temp DB
- atomically rename on success only
- preserve last known-good live DB on failure

## Tools And Libraries

### Existing tools already available

Use the existing stack first:

- Next.js App Router
- React
- TypeScript
- `better-sqlite3`
- local filesystem under `data/`
- existing knowledge/catalog/insight helpers

### Required additions for the first architecture

Required:

- dedicated rebuild script: `scripts/rebuild-search-index.ts`
- new internal search helpers in `src/lib/`
- new search UI components in `src/components/`

### SQLite usage direction

The architecture assumes SQLite will be the local search engine backing store.

Potential implementation options inside SQLite:

- standard indexed tables
- SQLite FTS, if the implementation chooses it

The architecture does not force one exact SQLite query strategy yet, but it does
require SQLite to remain the search authority.

### Not required in the first shipped architecture

Do not make the first shipped system depend on:

- OpenAI embeddings API
- hosted vector databases
- third-party search SaaS
- separate search worker service

These remain optional future extensions.

## UI Integration

Primary UI integration points:

- `src/app/search/page.tsx`
- `src/components/SearchBar.tsx`
- `src/components/NavHeader.tsx`

UI expectations from the architecture:

- header and hero search both route into the same search system
- `/search` can server-render an initial query view
- client-side refinements call `GET /api/search`
- grouped results remain the primary display model
- knowledge results stay visually distinct from video results

## Failure And Fallback Behavior

### Search DB unavailable

If `data/search/search.db` is missing or invalid:

- `/search` should fail soft
- API responses should be sanitized
- operator diagnostics should go to logs and validation artifacts

### Rebuild failure

If search rebuild fails:

- keep the previous live search DB
- write failure detail to `data/search/last-validation.json`
- do not partially publish a broken index

### Future semantic failure

If future semantic indexing or retrieval fails:

- keyword search remains fully functional
- semantic lane is skipped
- users do not receive provider-specific error details

## Config And Environment

The first shipped architecture should not require new semantic provider env vars.

Possible future-only env vars:

- `SEARCH_SEMANTIC_PROVIDER`
- provider-specific API keys
- local model config paths

For the initial system, defaults should remain repo-owned and local-first.

## Performance Assumptions

The architecture is explicitly choosing an index-driven local search system
instead of ad hoc filesystem aggregation on every request.

Assumptions:

- browse metadata remains in the catalog DB
- search queries should not rescan the full corpus on each request
- debounced UI interactions require warm local search reads
- response size should be bounded at the group level

## Security And Exposure

The search route is user-facing inside the app, but should follow the existing
private API posture in hosted mode.

Requirements:

- sanitize internal filesystem paths from API errors
- avoid exposing raw SQLite internals to the browser
- keep rebuild and maintenance controls off the friend-facing browser surface

## Recommended Build Order

1. define search contract types
2. create `search.db` schema and rebuild script
3. index metadata, insights, knowledge, and transcript representations
4. expose canonical `GET /api/search`
5. add `POST /api/search` compatibility route
6. update `/search` UI to consume grouped results + suggestions payload
7. add operator rebuild commands and validation artifacts
8. leave semantic boundary in place for later extension

## Summary

The search architecture should be:

- local-first
- SQLite-backed
- index-driven from day one
- hybrid-rendered in the Next app
- keyword-authoritative
- semantic-ready but not provider-dependent
- compatible with the repo’s existing catalog, insight, and knowledge authorities
