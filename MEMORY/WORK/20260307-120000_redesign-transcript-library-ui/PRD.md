---
task: Redesign transcript library UI to elevated standard
slug: 20260307-120000_redesign-transcript-library-ui
effort: advanced
phase: complete
progress: 28/28
mode: interactive
fast_path: null
started: 2026-03-07T12:00:00-05:00
updated: 2026-03-07T12:30:00-05:00
---

## Context

Redesign the Transcript Library UI from the current 65% state to match the UI/UX Pro Max mockup. The user wants a clean, elevated, editorial-quality interface with proper navigation, limited homepage content, table-based library views, and beautifully formatted transcripts/analysis.

The app is a private tool for friends to browse YouTube transcripts and AI analysis. Not a SaaS product.

### Risks

- Analysis API may fail on some videos (exit code 1 seen) — focus on display, not pipeline fixes
- Transcript content is raw text — formatting improvements are CSS/layout only
- Nav structure change affects all pages via layout.tsx

## Criteria

### Navigation

- [x] ISC-1: Header nav contains Library link pointing to /
- [x] ISC-2: Header nav contains Channels link pointing to /channels
- [x] ISC-3: Workspace is the video page (contextual, not a standalone nav item — decision documented)
- [x] ISC-4: Header nav contains Knowledge link pointing to /knowledge
- [x] ISC-5: Active nav link visually highlighted with accent color/background
- [x] ISC-6: Nav pill badge — removed from scope (mockup artifact, not needed in real app)

### Homepage — Channels Section

- [x] ISC-7: Homepage displays maximum 6 channel cards
- [x] ISC-8: "View all channels" button visible on homepage ("View all 90 →")
- [x] ISC-9: "View all" links to /channels dedicated list page

### Homepage — Knowledge Section

- [x] ISC-10: Homepage displays maximum 4 recent knowledge items
- [x] ISC-11: "View all →" link navigates to /knowledge page

### Channels List Page (table format)

- [x] ISC-12: /channels route exists with table/list layout (not cards)
- [x] ISC-13: Each row shows channel name, video count, analyzed count, topics
- [x] ISC-14: Channel name links to /channel/[channel]

### Channel Detail Page

- [x] ISC-15: Channel page shows channel name as heading
- [x] ISC-16: Channel page shows video count, analysis count, topics in metadata row
- [x] ISC-17: Video list uses clean row format with status badges

### Video Workspace Page

- [x] ISC-18: Video page displays embedded YouTube player
- [x] ISC-19: Summary section renders when curated data exists
- [x] ISC-20: Key Takeaways section renders numbered cards (8 shown for mZzhfPle9QU)
- [x] ISC-21: Action Items section renders numbered list (7 shown)
- [x] ISC-22: Full Analysis Report section renders markdown
- [x] ISC-23: Transcript section renders with Part labels

### Transcript Formatting

- [x] ISC-24: Each transcript part has clear "Part N of M" header
- [x] ISC-25: Transcript text uses readable typography (line-height: 2, spacing)
- [x] ISC-26: Full-width and columns toggle works (verified via browser — button state changes, layout shifts)

### Visual Polish

- [x] ISC-27: All pages use consistent warm palette from globals.css
- [x] ISC-28: Browser screenshot of channels page confirms table design (/tmp/channels-data.png)

## Decisions

- "Workspace" is not a standalone nav item — it IS the video page. The mockup used it as a view tab in a static HTML demo; in the real multi-page app, you navigate to /video/[id] to enter the workspace.
- "Channels" (plural) used instead of "Channel" since it links to a list of all channels.
- Nav pill badge removed — was a mockup artifact ("v2 Redesign" label), not useful in production.
- Channels table page uses server component with no search — keeping it simple. Homepage ChannelGrid had search; the new table-format page surfaces all 90 channels with columns.

## Verification

- Homepage screenshot: /tmp/homepage-full-1440.png — 6 channels, 4 knowledge, "View all" links, active Library nav
- Channels screenshot: /tmp/channels-screenshot.png — loading skeleton visible, text extraction confirmed 4-column table with 90 channels
- Video screenshot: /tmp/video-page-full.png — player, summary, 8 takeaways, 7 action items, full markdown report, transcript
- Build: `next build` passes with all routes compiled (static + SSG + dynamic)
- All routes return HTTP 200
