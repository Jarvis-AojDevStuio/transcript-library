# UI Search Feature Brainstorm

**Date:** 2026-04-07
**Status:** Brainstorm In Progress
**Scope:** Desktop-first search UX for the Transcript Library UI

## Why This Artifact Lives In `docs/brainstorms`

This document belongs in `docs/brainstorms` instead of `docs/plans` because the
search direction is now clear at the product level, but the implementation
contract is not locked yet.

We have decided:

- what the search should cover
- where search should appear in the UI
- how users should interact with it
- the broad ranking and result-shaping direction

We have not fully decided:

- the exact blended ranking contract between keyword and semantic retrieval
- the data/indexing strategy for semantic search
- the final response shape for a richer `/search` experience
- the rollout phases and acceptance criteria

Once those are resolved, this should be converted into a formal implementation
plan in `docs/plans`.

## Problem Statement

The repo already has a basic search surface:

- header search entry
- home-page hero search entry
- dedicated `/search` page
- server-side search over transcript text and curated insight fields

That current implementation is useful but limited:

- it does not search knowledge docs
- it is not positioned as a first-class feature in navigation
- it does not support semantic retrieval
- it has no proper result expansion model
- it has no lightweight filtering model for source, channel, or topic
- it does not feel like a research tool yet

The goal of this feature is to turn search into a proper research surface for
exploring ideas across videos, transcripts, insights, and knowledge documents.

## Product Goal

Build a desktop-first search experience that helps users research topics across
the library while still supporting exact snippet-finding and remembered-video
lookup.

## Primary User Jobs

The search experience should support all three jobs:

1. Find the video I remember
2. Find the exact idea, quote, or snippet
3. Research a topic across the library

Priority order:

1. Research a topic across the library
2. Find the exact idea, quote, or snippet
3. Find the video I remember

## Search Scope

The UI search should cover:

- video metadata
  - title
  - channel
  - topic
- transcript text
- curated insight content
  - summary
  - takeaways
  - action items
  - notable points
- knowledge documents

Channels and topics should also act as filterable discovery dimensions, even if
they are not rendered as fully separate top-level result entities in V1.

## Chosen UX Direction

### Entry Points

Search should remain visible in both existing entry points:

- compact search in the header
- hero search on the home page

Search should also become a first-class navigation destination by adding a
dedicated Search nav item.

### Main Surface

The primary destination is a dedicated `/search` page.

The header search and hero search both route users into that page. They should
behave consistently rather than acting like separate products.

### Interaction Model

The results page should support debounced search while typing.

Keyboard access should be first-class:

- `/` should focus the visible search input when present
- `Cmd/Ctrl+K` should provide global search access

### Header Search Preview

The header search should not render full result previews inline. For V1, its
lightweight preview behavior should be limited to recent searches and suggested
topics, not full match results.

## Result Model

The result presentation should be hybrid:

- top blended results for quick scanning
- optional grouped sections beneath
- individual result groups can expand into detailed matches

The main result unit should be grouped, but expandable to individual matches.

That means:

- users should first see a strong document or video candidate
- users can then open the result to inspect all relevant matches
- the UI should support dense research browsing without collapsing into a noisy
  flat list of snippets

### Expansion Depth

Expanded results should reveal all matches for that result, not just the top 1
or top 3.

## Result Types

### Video Results

Video results should surface:

- title
- channel
- topic
- source labels
- match snippets
- direct navigation into the video page

Transcript and insight matches should open the video page.

### Knowledge Results

Knowledge results should have a distinct visual treatment so users can identify
them immediately as knowledge content rather than video content.

Knowledge matches should open the corresponding knowledge document page.

### Metadata-Only Discovery

If the user engages with a channel- or topic-style discovery result, the target
should be filtered search rather than a separate detail page.

## Search Logic Direction

### Keyword Matching

V1 should preserve exact or near-exact matching as a core behavior. This keeps
search trustworthy for:

- exact phrasing
- specific quotes
- technical terminology
- known wording from transcripts or notes

### Semantic Search

Semantic search is included in V1 and should be invisible to the user.

Users should not have to choose between keyword and semantic modes in the UI.

Semantic behavior should participate in ranking like this:

- keyword results remain primary
- semantic search boosts discovery and fills gaps
- semantic retrieval should not overpower strong exact matches

This is especially important because the search is intended to support topic
research across the whole library.

### Ranking Bias

Even with keyword-first behavior, stronger weighting should be given to:

- title matches
- topic matches
- curated insight matches

Raw transcript matches should still matter, but they should not dominate the
ranking when a result has stronger topical relevance in higher-signal fields.

### Insight Priority

The system should not hardcode “insight always wins” or “transcript always
wins.” Instead, the UI should let users steer result emphasis through filters.

## Filtering

### V1 Filters

V1 should include:

- source filters
  - Transcript
  - Insight
  - Knowledge
- lightweight channel/topic filters

### Filter UI

Source filters should use multi-select chips as the primary control.

A compact filter menu or popover may be added if the filter row gets crowded.

Channel and topic filters should appear after a search is run, based on the
available results, rather than occupying permanent page chrome before the user
has searched.

## URL and State Behavior

The query should be reflected in the URL so searches are revisit-able and
shareable.

Filters do not need to live in the URL for V1. They can remain local UI state.

## Empty and Default States

### Default Search Page

Before the user types a query, the search page should show:

- recent searches for the current session
- trending or popular topics as suggested starting points

Recent searches should not be durably persisted in V1. The current direction is:

- session-level behavior only
- no durable browser-local storage yet
- leave room for browser-local or server-backed history later

### No Results State

The no-results state should stay simple in V1.

It should not attempt a heavy recommendation system. The priority is clarity
over cleverness.

## Match Explanation

Results should explain why they matched.

The UI should show:

- source labels such as Transcript, Insight, and Knowledge
- short “matched in...” cues

The UI should not expose detailed scoring or ranking internals.

## Query Refinement

The results page should support clickable related-term refinement, especially for
semantic or topic-oriented results.

That means:

- users can pivot into adjacent ideas from a current result set
- this should be additive, not mandatory
- it is more important for topic discovery than for exact quote lookup

## Out of Scope

Explicitly out of scope for V1:

- mobile-first optimization
- timestamps and jump-to-video behavior
- saved searches
- personalization
- cross-repo or global search outside this library

## Design Principles

The search experience should feel like a research tool, not a generic site
search.

Guiding principles:

- optimize for idea discovery, not only exact lookup
- keep exact matching trustworthy
- keep semantic behavior invisible and additive
- distinguish video results from knowledge results clearly
- favor a clean, desktop-first experience over mobile compression
- avoid overloading the page with permanent controls before the user searches

## Open Questions For The Next Artifact

The follow-up plan in `docs/plans` should resolve:

1. What exact response model should `/search` use once video results and
   knowledge results are unified more deeply?
2. Is semantic retrieval implemented through embeddings, full-text expansion,
   or a simpler intermediate approach first?
3. How should blended ranking work when keyword and semantic scores disagree?
4. Should the current server-rendered `/search` page remain the foundation, or
   should it move to a richer client-assisted results model?
5. What is the smallest acceptable phased rollout?

## Proposed Next Artifact

Create a formal implementation plan at:

`docs/plans/2026-04-07-ui-search-feature-plan.md`

That plan should convert this brainstorm into:

- implementation phases
- acceptance criteria
- API/data contract changes
- ranking contract
- semantic indexing/storage approach
- UI component breakdown
