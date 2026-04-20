---
title: "feat: Build Proper UI Search Experience"
type: feat
status: proposed
date: 2026-04-07
reviewed: false
review-rounds: 0
reviewers: []
deepened: false
---

# feat: Build Proper UI Search Experience

## Overview

Build a proper desktop-first search experience for Transcript Library that turns
search into a first-class research surface across:

- videos
- transcript text
- curated insight fields
- knowledge documents

This plan extends the existing `/search` page instead of replacing it with a
parallel system. The current search is already useful, but it is still a thin
server-rendered keyword results page. The goal of this plan is to evolve it
into a richer research workflow while staying aligned with the current repo
shape and runtime assumptions.

**Source brainstorm:** `docs/brainstorms/2026-04-07-ui-search-feature-brainstorm.md`

## Problem Statement / Motivation

The existing search implementation has four main limitations:

1. **Search scope is incomplete.** It searches transcript and curated insight
   content, but not knowledge documents.
2. **The UI is too flat.** Results are rendered as a simple video-card list with
   snippet blocks. There is no grouped expansion model, no blended result view,
   and no first-class knowledge treatment.
3. **Search is not yet a research tool.** There are no source filters,
   lightweight channel/topic narrowing, recent-search behavior, or query
   refinement.
4. **There is no semantic lane.** Exact/near-exact matching is useful, but it is
   not sufficient for topic research across the whole library.

## Product Direction Locked By Discovery

The discovery artifact established these product decisions:

- Search remains desktop-first.
- Search appears in the header, the home hero, and as a dedicated Search nav
  destination.
- The main destination is a dedicated `/search` page.
- The results experience is hybrid: blended top results plus grouped sections.
- The main user job is research across the library, while still supporting exact
  snippet lookup and remembered-video retrieval.
- Matching stays keyword-trustworthy, but semantic retrieval is included in V1
  and remains invisible to the user.
- Source filters are required in V1.
- Lightweight channel/topic narrowing is required in V1, but should appear only
  after a search is run.
- Query should live in the URL. Filters can remain local state in V1.

## Proposed Solution

Evolve the existing search stack in three layers:

1. **Search domain expansion**
   - unify video, transcript, insight, and knowledge search into one server-side
     search contract
2. **UI/search experience upgrade**
   - richer `/search` page, grouped expandable results, filters, suggestions,
     keyboard affordances, and clearer result types
3. **Semantic lane addition**
   - add a semantic retrieval path that boosts discovery and fills gaps while
     preserving keyword-first trust

## Architecture Direction

### Keep The Existing Foundation

Do not create a separate search service for this repo yet.

The existing structure already gives us suitable boundaries:

- `src/app/search/page.tsx` as the main UI route
- `src/components/SearchBar.tsx` as the reusable query entry surface
- `src/modules/search/index.ts` as the search module boundary
- `src/lib/search.ts` as the concrete search implementation
- `src/lib/knowledge.ts` as the knowledge-document read boundary
- `src/lib/catalog.ts` and `src/lib/insights.ts` as the browse and artifact
  authorities

That means the feature can ship incrementally without introducing a new service
or external infrastructure prematurely.

### Search Contract Direction

The current `SearchResult` shape is video-only. It should be replaced by a
unified contract that can represent both video and knowledge results while still
supporting grouped expansion.

Proposed direction:

```ts
type SearchEntityType = "video" | "knowledge";

type SearchMatchSource =
  | "title"
  | "topic"
  | "channel"
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
  entityType: SearchEntityType;
  title: string;
  href: string;
  subtitle?: string;
  topic?: string;
  channel?: string;
  category?: string;
  matchedSources: SearchMatchSource[];
  topMatches: SearchMatch[];
  allMatches: SearchMatch[];
  score: number;
};

type SearchResponse = {
  query: string;
  blended: SearchGroup[];
  grouped: {
    videos: SearchGroup[];
    knowledge: SearchGroup[];
  };
  availableFilters: {
    sources: SearchMatchSource[];
    channels: string[];
    topics: string[];
    categories: string[];
  };
  meta: {
    usedSemanticLane: boolean;
    totalResults: number;
  };
};
```

This does three important things:

- keeps a single top-level result model
- supports grouped expansion cleanly
- leaves room for semantic metadata without exposing scoring internals to users

### Ranking Strategy

Ranking should follow this contract:

1. Keyword/near-exact matching remains authoritative.
2. Stronger fields rank higher than lower-signal fields.
3. Semantic retrieval may boost or fill gaps, but should not bury strong exact
   matches.

Proposed weighting order:

1. Title
2. Topic
3. Curated insight fields
4. Knowledge matches
5. Transcript body

Semantic lane behavior:

- keyword results are computed first
- semantic retrieval may:
  - boost relevant groups already found by keyword
  - introduce additional groups when keyword recall is weak
- semantic-only results should be visually explainable through “matched in..."
  cues, not raw score disclosures

### Semantic Implementation Direction

For this repo, the plan should avoid requiring a remote search platform.

Recommended path:

- Phase 1 and 2: strengthen keyword search and unify result types
- Phase 3: add local semantic indexing for insights and knowledge docs first,
  then transcripts if needed

Pragmatic options the implementation can evaluate:

1. local embeddings stored in a file-backed index under `data/`
2. lightweight semantic expansion of high-signal fields before transcript-scale
   indexing
3. transcript semantic indexing only after measuring recall gaps

The plan should prefer indexing smaller, higher-signal corpora first:

- insight summaries
- takeaways
- action items
- notable points
- knowledge documents
- video title/topic metadata

This is cheaper and more controllable than embedding every transcript line at
once.

## UI Plan

### Search Entry Surfaces

**Header search**

- remains compact
- routes to `/search`
- may show a lightweight preview for recent searches and suggested topics only

**Home hero search**

- remains visually prominent
- behaves the same as header search
- routes to `/search`

**Nav**

- add a Search nav item to `NavHeader`

### Search Page Layout

The `/search` page should evolve toward this layout:

1. Search header
   - title
   - search input
   - helper text
2. pre-query state
   - recent session searches
   - trending or suggested topics
3. active query controls
   - source filter chips
   - compact filter control
4. active results area
   - blended top results
   - grouped sections for Videos and Knowledge
5. result expansion
   - expand to reveal all matches within a result group

### Filters

V1 filters should include:

- source chips
  - Transcript
  - Insight
  - Knowledge
- lightweight channel/topic narrowing
- knowledge category narrowing when knowledge results are present

Channel/topic/category filters should be generated from current result data,
not rendered as permanent empty controls before search.

Current V1 behavior:

- `Channel` is built from the channels present in the current result set
- `Topic` is built from the topics present in the current result set
- `Category` is built from the knowledge categories present in the current result set
- each dropdown uses exact-match filtering on that field
- all filter controls combine together, so they narrow by intersection

Simple meaning:

- `Channel` mainly narrows video results
- `Topic` mainly narrows video results
- `Category` mainly narrows knowledge document results
- `All` means "do not narrow by this control"

Open product decision:

- confirm whether these controls should stay mixed together for all results, or change based on the active source filter
- example: if the user selects `Knowledge`, we may want to hide `Channel` and `Topic`
- example: if the user selects `Transcript` or `Insight`, we may want `Category` hidden unless knowledge results are still relevant
- we should also confirm whether these should remain result-derived only, or later become global filters with a larger shared taxonomy

### Result Treatments

**Video treatment**

- standard card style
- title, channel, topic, source cues
- expandable match list
- direct action to open video

**Knowledge treatment**

- distinct card style from videos
- category + title emphasis
- expandable match list
- direct action to open knowledge document

### Match Explanation

Every visible result should expose:

- source badge
- short “matched in...” copy
- highlighted snippet text

Do not expose score numbers or semantic internals in the UI.

### Keyboard Behavior

V1 keyboard support should include:

- `/` focuses the visible search box
- `Cmd/Ctrl+K` routes to or opens the search surface
- debounced typing updates results

## Implementation Phases

### Phase 1: Search Contract Expansion

Goal: unify video and knowledge search in the server-side search layer.

Files likely affected:

- `src/lib/search.ts`
- `src/modules/search/index.ts`
- `src/lib/knowledge.ts`
- `src/app/search/page.tsx`

Deliverables:

- expand search to include knowledge docs
- replace video-only search contract with a unified result model
- add metadata/title/topic/channel match handling
- preserve exact/near-exact matching behavior
- keep transcript search functional while introducing richer result types

Acceptance criteria:

- a search can return both video and knowledge results
- results identify their entity type
- source labels distinguish metadata, transcript, insight, and knowledge matches
- opening a video result lands on `/video/[videoId]`
- opening a knowledge result lands on `/knowledge/[category]/[...]`

### Phase 2: Search Page UX Upgrade

Goal: make `/search` feel like a proper research surface.

Files likely affected:

- `src/app/search/page.tsx`
- new dedicated search page components under `src/components/`
- `src/components/SearchBar.tsx`
- `src/components/NavHeader.tsx`
- `src/app/layout.tsx`

Deliverables:

- dedicated Search nav item
- blended top results plus grouped sections
- expandable result groups
- source filter chips
- result-derived channel/topic/category filters
- pre-query state with recent session searches and suggested topics
- lightweight no-results state
- `/` and `Cmd/Ctrl+K` keyboard affordances

Acceptance criteria:

- users can refine by source without leaving the page
- result groups can expand to reveal all matches
- knowledge cards are visually distinct from video cards
- the page supports debounced query updates while typing
- the header and hero search both route users into the same search experience

### Phase 3: Semantic Retrieval Lane

Goal: add semantic discovery without sacrificing exact-match trust.

Files likely affected:

- `src/lib/search.ts`
- new semantic helper/index files under `src/lib/`
- possibly scripts for index generation under `scripts/`
- `data/` storage for local semantic index artifacts

Deliverables:

- semantic lane behind the existing search interface
- keyword-first blended ranking contract
- semantic indexing for high-signal fields first
- optional query refinement suggestions derived from semantic relationships

Acceptance criteria:

- semantic retrieval is invisible to the user as a mode switch
- exact matches still rank ahead of weaker semantic-only candidates
- semantic search improves topic discovery when wording differs
- the app continues working without requiring a hosted external search service

## Files And Ownership

Primary files for the implementation plan:

- `src/app/search/page.tsx`
- `src/components/SearchBar.tsx`
- `src/components/NavHeader.tsx`
- `src/lib/search.ts`
- `src/modules/search/index.ts`
- `src/lib/knowledge.ts`

Likely new components:

- `src/components/SearchFilters.tsx`
- `src/components/SearchResultGroup.tsx`
- `src/components/SearchSection.tsx`
- `src/components/SearchEmptyState.tsx`
- `src/components/SearchShell.tsx`

Possible new search helpers:

- `src/lib/search-contract.ts`
- `src/lib/search-ranking.ts`
- `src/lib/search-semantic.ts`
- `src/lib/search-suggestions.ts`

## Data And Storage Constraints

This repo is not a SaaS product and should stay private, local-first, and
operator-friendly.

That means the search plan should avoid premature external infrastructure.

Constraints:

- do not make the UI depend on a hosted third-party search backend
- prefer local filesystem or local DB artifacts under `data/` for semantic index
  material
- keep the UI insulated from provider switching
- preserve human-reviewable artifacts where practical

## Risks

1. **Semantic complexity risk**
   - adding semantic search too early could slow delivery or blur ranking
     behavior
2. **Transcript-scale cost risk**
   - full transcript semantic indexing may be more expensive than insight-first
     indexing
3. **UI complexity risk**
   - too many controls can undermine the “research desk” feel
4. **Mixed-result confusion risk**
   - if knowledge and video results are blended without strong distinction,
     users may lose orientation

## Recommended Delivery Order

Recommended order inside implementation:

1. unify search contract and add knowledge search
2. redesign `/search` UX and navigation treatment
3. add local session recent-search behavior and suggestions
4. add semantic lane for high-signal fields
5. expand semantic coverage only if measured gaps remain

## Definition Of Done

This feature is done when:

- `/search` is a first-class destination in the app
- search spans videos, transcripts, insights, and knowledge docs
- users can narrow results by source and lightweight discovery filters
- results are grouped, expandable, and explain why they matched
- knowledge results are visually distinct from video results
- keyword trust remains intact
- semantic retrieval improves topic discovery without becoming a separate user
  mode

## Follow-Up After This Plan

After implementation starts, create follow-up artifacts only if needed:

- architecture note for semantic indexing format
- rollout note if transcript-scale semantic indexing is deferred
- review doc covering ranking quality and UI clarity after the first pass
