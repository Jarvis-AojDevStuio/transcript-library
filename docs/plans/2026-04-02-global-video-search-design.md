# Global Video Search — Design

**Date:** 2026-04-02
**Status:** Approved
**Approach:** SQLite LIKE substring matching with inline dropdown

## Context

The transcript library has ~18 videos with no search or filtering. Users need a fast way to find videos by title, channel, or topic from any page.

## Decisions

- **Search scope:** Video metadata only (title, channel, topic) — not transcript text or analysis content.
- **Approach:** SQLite `LIKE` queries via a new API endpoint. Simple, zero new dependencies, instant at current volume. Can evolve to FTS5 if the catalog grows past ~500 videos.
- **UI pattern:** Global search bar in the nav with an inline dropdown (Spotlight/cmd+k style).

## API

**`GET /api/search?q=<query>`**

- Query: `SELECT video_id, title, channel, topic, published_date FROM catalog_videos WHERE title LIKE ? OR channel LIKE ? OR topic LIKE ? LIMIT 10`
- Bindings: `%query%` for each parameter
- Returns `{ results: Array<{ videoId, title, channel, topic, publishedDate }> }`
- Queries under 2 characters return empty results
- Follows existing private API guard pattern

## Frontend

### SearchBar component

- Persistent input in the global nav
- Debounced at 300ms
- `Cmd+K` / `Ctrl+K` keyboard shortcut to focus

### SearchDropdown component

- Positioned below the search input
- Shows up to 10 results: title + channel
- Click navigates to `/video/[id]`
- Keyboard navigation: arrow keys + Enter
- Escape or click-outside dismisses
- Empty state: "No results" message

## Data flow

```
User types → debounce 300ms → GET /api/search?q=... → SQLite LIKE → JSON → render dropdown
```

## What doesn't change

- Catalog rebuild script (no schema changes)
- Existing routes or components
- Data model / artifact structure
