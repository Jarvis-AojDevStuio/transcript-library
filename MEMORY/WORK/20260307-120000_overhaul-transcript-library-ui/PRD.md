---
task: Overhaul transcript library UI to top class
slug: 20260307-120000_overhaul-transcript-library-ui
effort: advanced
phase: complete
progress: 30/30
mode: interactive
fast_path: null
started: 2026-03-07T12:00:00-05:00
updated: 2026-03-07T12:45:00-05:00
---

## Context

Complete visual overhaul of the transcript-library Next.js app from warm cream "museum gallery" style to "Dark Archival Editorial" — deep charcoal base, warm amber/gold accents, Playfair Display serif + DM Sans geometric body fonts, staggered animations.

### Risks

- Addressed: border-black/10 all replaced with CSS variable borders
- Addressed: Markdown CSS fully reworked for dark
- Addressed: Excessive backdrop-blur removed from list cards per /simplify review

## Criteria

### Typography & Fonts

- [x] ISC-1: Google Fonts loaded for display serif (Playfair Display)
- [x] ISC-2: Google Fonts loaded for body geometric (DM Sans)
- [x] ISC-3: font-display class uses Playfair Display throughout
- [x] ISC-4: Body text uses DM Sans as primary font
- [x] ISC-5: Monospace font preserved for code blocks

### Color & Theme

- [x] ISC-6: CSS variables updated to dark archival palette (#0c0c0e base)
- [x] ISC-7: Warm amber accent color (#c9a55a) used for highlights
- [x] ISC-8: Card backgrounds use translucent dark glass effect
- [x] ISC-9: Body background has subtle radial gradient warmth
- [x] ISC-10: Light mode removed or converted to dark-only design

### Layout & Header

- [x] ISC-11: Header redesigned with serif logo and refined nav links
- [x] ISC-12: Footer updated to match dark editorial tone

### Home Page

- [x] ISC-13: Hero section redesigned with editorial typography
- [x] ISC-14: Channel grid cards use new glass card style with hover lift
- [x] ISC-15: Recent knowledge section uses new card styling
- [x] ISC-16: Badges redesigned with amber accent tones

### Sidebar

- [x] ISC-17: Sidebar card sections use dark glass styling
- [x] ISC-18: Sidebar hover states use subtle amber highlight
- [x] ISC-19: Sidebar skeleton matches new dark palette

### Channel Page

- [x] ISC-20: Channel header card uses new editorial styling
- [x] ISC-21: Video list cards have refined dark glass treatment

### Video Page

- [x] ISC-22: Video header uses serif title with badge redesign
- [x] ISC-23: Curated insight panel uses new card styling
- [x] ISC-24: Transcript parts panel matches dark glass style
- [x] ISC-25: Analysis button uses amber accent color

### Knowledge Pages

- [x] ISC-26: Knowledge home page uses dark editorial cards
- [x] ISC-27: Knowledge category page matches new styling
- [x] ISC-28: Knowledge document page has refined markdown container

### Markdown & Content

- [x] ISC-29: Markdown CSS fully reworked for dark background
- [x] ISC-30: Frontmatter meta card styled for dark theme

## Decisions

- Removed noise texture overlay — imperceptible at 0.025 opacity, wasted GPU
- Removed dead CSS classes (glass-card, card-surface, card-elevated, card-prominent) — all inline Tailwind
- Stripped backdrop-blur from repeated list cards — kept on header and hero only for GPU performance
- Migrated all raw <a> to Next.js <Link> for client-side navigation
- Fixed CSS @import order: Google Fonts must precede @import "tailwindcss"
- Replaced hardcoded rgba/hex values with CSS variables where possible

## Verification

- TypeScript: `bunx tsc --noEmit` passes clean
- Build: `bun run build` compiles all 14 routes successfully
- Visual: Browser screenshots verified at 1440px — sidebar on left, dark palette, serif fonts, all pages render correctly
- Pages tested: Home, Channel (IndyDevDan), Video, Knowledge home, Knowledge category (technology), Knowledge document
- /simplify review: 3 agents reviewed — fixed ChannelGrid <a>→<Link>, removed dead CSS, stripped excessive backdrop-blur, cleaned undefined --muted-warm reference
