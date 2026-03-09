---
task: Plan ground-up UI redesign for transcript library
slug: 20260307-120000_ui-redesign-reading-room-plan
effort: deep
phase: plan
progress: 0/42
mode: interactive
fast_path: null
started: 2026-03-07T12:00:00-05:00
updated: 2026-03-07T12:05:00-05:00
---

## Context

Three parallel UI audit agents (ui-ux-pro-max, web-design-guidelines, frontend-design) analyzed the current Transcript Library UI. The user selected a hybrid direction:

- **Aesthetic lens**: Frontend Design's "Reading Room" — editorial, intimate, content-first
- **Fonts**: UI/UX Pro Max's choice — keep Manrope (body) + Fraunces (display), already loaded via next/font
- **Palette**: UI/UX Pro Max's warm paper — `#f0ede6` bg, `#faf8f4` surfaces, `#1a1814` ink, `#c4742a` warm amber secondary
- **Layout**: No sidebar. Minimal sticky topbar. Breadcrumbs. Full-width content at 1320px max.
- **Video**: Full-width 16:9 player, no card chrome. Dark container. Theater-mode size.
- **Analysis**: Directly on page (no `<details>` disclosure). Summary + takeaways + action items + full markdown.
- **Transcript**: Full page width, labeled dividers between parts. Not individual cards.
- **Chrome reduction**: No hero sections, no gradient overlays, no stat cards, less badges, less micro-labels.

This is a plan-only deliverable. The user will execute.

### Risks

- Changing CSS variables affects every component globally — must audit all consumers
- Card component has `rounded-[28px]` hardcoded — needs updating to new radius system
- Loading skeletons reference sidebar and old layout — must be rewritten
- Button shadow uses old accent color — needs palette update
- Knowledge doc page currently renders markdown inside a Card — needs to go full-width

---

## Criteria

### Phase 1: Design System (globals.css + CSS variables)

- [ ] ISC-1: CSS variable `--app-bg` changed to `#f0ede6` warm paper tone
- [ ] ISC-2: CSS variable `--ink` changed to `#1a1814` warm near-black
- [ ] ISC-3: CSS variable `--surface` changed to `rgba(250, 248, 244, 0.9)` warm cream
- [ ] ISC-4: CSS variable `--surface-hero` removed (no hero sections)
- [ ] ISC-5: New variable `--warm` added as `#c4742a` secondary accent
- [ ] ISC-6: New variable `--warm-soft` added as `rgba(196, 116, 42, 0.08)`
- [ ] ISC-7: `--shadow-card` reduced to `0 4px 16px rgba(26, 24, 20, 0.07)` from heavy current value
- [ ] ISC-8: `--shadow-sidebar` variable removed (no sidebar)
- [ ] ISC-9: `--sidebar-bg` and `--sidebar-fg` variables removed
- [ ] ISC-10: Body background gradient replaced with flat `#f0ede6`
- [ ] ISC-11: `@media (prefers-reduced-motion: reduce)` added to disable all animations
- [ ] ISC-12: `color-scheme: light` added to `:root`
- [ ] ISC-13: New radius tokens added: `--radius-sm: 8px`, `--radius-md: 12px`, `--radius-lg: 16px`, `--radius-xl: 24px`

### Phase 2: Layout Shell (layout.tsx)

- [ ] ISC-14: Sidebar import and `<Suspense>` wrapper removed from layout.tsx
- [ ] ISC-15: Skip link `<a href="#main">Skip to main content</a>` added as first child of body
- [ ] ISC-16: Sticky topbar replaces current header — 56-64px height, brand left, nav links right
- [ ] ISC-17: Breadcrumb support added (Library > Channel > Video pattern)
- [ ] ISC-18: `<main id="main">` wraps children at full width, max-w-[1320px] centered
- [ ] ISC-19: `<meta name="theme-color" content="#f0ede6">` added to metadata

### Phase 3: Home Page (page.tsx)

- [ ] ISC-20: Hero section removed — replaced with compact page header (title + subtitle, no gradient overlay)
- [ ] ISC-21: Stat cards removed from home page
- [ ] ISC-22: Workflow "purpose" cards removed (the 01/02/03 marketing section)
- [ ] ISC-23: Channel grid rendered directly after compact header
- [ ] ISC-24: Recent knowledge section preserved but simplified (no Card wrapper, use hairline dividers)
- [ ] ISC-25: No `Link` wrapping `Button` anti-pattern (a11y fix)

### Phase 4: Channel Page (channel/[channel]/page.tsx)

- [ ] ISC-26: Hero section replaced with compact header — channel name + metadata badges inline
- [ ] ISC-27: Stat cards (Coverage/Analyses/Mode) removed
- [ ] ISC-28: Video list uses compact row layout — title, topic badge, analysis status, date on one line
- [ ] ISC-29: Breadcrumb shows Library > Channel Name

### Phase 5: Video Workspace (video/[videoId]/page.tsx + components)

- [ ] ISC-30: Video player rendered full container width (~1256px at 1320px container) with no Card chrome
- [ ] ISC-31: Player container uses dark background with `--radius-xl` corners and shadow
- [ ] ISC-32: Metadata bar (channel, topic, date) rendered as inline chips below the player
- [ ] ISC-33: Analysis section rendered full-width below player — no sidebar column
- [ ] ISC-34: Full markdown report visible directly (no `<details>` disclosure wrapper)
- [ ] ISC-35: Transcript parts rendered full-width with labeled dividers, not individual cards
- [ ] ISC-36: "Open" button on transcript parts replaced with inline-rendered text OR full-width link

### Phase 6: Knowledge Pages

- [ ] ISC-37: Knowledge home hero replaced with compact header
- [ ] ISC-38: Knowledge doc page renders markdown at full content width (not inside narrow Card)

### Phase 7: Component Updates

- [ ] ISC-39: Card component `rounded-[28px]` changed to `rounded-[var(--radius-lg)]` (16px)
- [ ] ISC-40: Badge component text size increased from `text-[10px]` to `text-[11px]` minimum
- [ ] ISC-41: Loading skeletons rewritten for sidebar-less layout
- [ ] ISC-42: SidebarSkeleton.tsx deleted (no sidebar)

### Anti-Criteria

- [ ] ISC-A1: No changes to API routes (src/app/api/\*\*)
- [ ] ISC-A2: No changes to module internals (src/modules/\*\*)
- [ ] ISC-A3: No changes to data layer (src/lib/catalog.ts, insights.ts, etc.)
- [ ] ISC-A4: No new npm dependencies added (fonts already via next/font)
- [ ] ISC-A5: No mobile-first responsive redesign (desktop-first stays)

---

## Decisions

### Design Token Synthesis

The user chose UI/UX Pro Max palette + fonts combined with Frontend Design's editorial aesthetic. Concrete mapping:

| Token                     | Current Value                        | New Value                           |
| ------------------------- | ------------------------------------ | ----------------------------------- |
| `--app-bg`                | `#e8edf4` (cool blue-gray)           | `#f0ede6` (warm paper)              |
| `--surface`               | `rgba(248, 245, 238, 0.9)`           | `rgba(250, 248, 244, 0.9)`          |
| `--panel`                 | `#eef2f7`                            | `#e8e4db` (warm sunken)             |
| `--panel-strong`          | `#e5ebf2`                            | `#dfd9cf`                           |
| `--ink`                   | `#162033`                            | `#1a1814`                           |
| `--muted-strong`          | `rgba(22, 32, 51, 0.8)`              | `rgba(26, 24, 20, 0.8)`             |
| `--muted`                 | `rgba(22, 32, 51, 0.58)`             | `rgba(26, 24, 20, 0.55)`            |
| `--accent`                | `#255ebf`                            | `#2d5dd4` (slightly warmer blue)    |
| `--accent-strong`         | `#1b4c98`                            | `#2350b8`                           |
| `--line`                  | `rgba(24, 35, 58, 0.12)`             | `rgba(26, 24, 20, 0.10)`            |
| `--line-strong`           | `rgba(24, 35, 58, 0.2)`              | `rgba(26, 24, 20, 0.16)`            |
| `--shadow-card`           | `0 24px 60px rgba(15, 23, 42, 0.08)` | `0 4px 16px rgba(26, 24, 20, 0.07)` |
| NEW `--warm`              | —                                    | `#c4742a`                           |
| NEW `--warm-soft`         | —                                    | `rgba(196, 116, 42, 0.08)`          |
| REMOVE `--sidebar-bg`     | gradient                             | deleted                             |
| REMOVE `--sidebar-fg`     | `#eef3ff`                            | deleted                             |
| REMOVE `--shadow-sidebar` | heavy shadow                         | deleted                             |
| REMOVE `--surface-hero`   | gradient                             | deleted                             |

### Radius System

| Token         | Value  | Used For                                   |
| ------------- | ------ | ------------------------------------------ |
| `--radius-sm` | `8px`  | Small elements, badges already pill        |
| `--radius-md` | `12px` | Buttons, inputs, small cards               |
| `--radius-lg` | `16px` | Cards, panels                              |
| `--radius-xl` | `24px` | Player container, hero-replacement headers |

### Font Retention

Keep Manrope + Fraunces. Already loaded via `next/font/google` in layout.tsx. No font changes needed.

---

## Execution Plan (File-by-File)

### Step 1: `src/app/globals.css`

- Replace all CSS variable values per token table above
- Remove `--surface-hero`, `--sidebar-bg`, `--sidebar-fg`, `--shadow-sidebar`
- Add `--warm`, `--warm-soft`, radius tokens
- Replace body background gradient with flat `background: #f0ede6`
- Add `color-scheme: light` to `:root`
- Add `@media (prefers-reduced-motion: reduce)` block that sets `animation: none !important; transition: none !important;` globally
- Keep `.md` styles (markdown rendering is good), update color references if they use old values

### Step 2: `src/components/ui/card.tsx`

- Change `rounded-[28px]` to `rounded-2xl` (16px via Tailwind, matching `--radius-lg`)
- Update shadow reference if hardcoded

### Step 3: `src/components/Badge.tsx`

- Change `text-[10px]` to `text-[11px]`

### Step 4: `src/components/ui/button.tsx`

- Update shadow in default variant to use new warm-toned shadow values
- Verify `rounded-2xl` is fine (12px via Tailwind, close to `--radius-md`)

### Step 5: `src/app/layout.tsx`

- Remove `Sidebar` import and `SidebarSkeleton` import
- Remove the `<Suspense fallback={<SidebarSkeleton />}><Sidebar /></Suspense>` block
- Remove the `flex gap-6` wrapper that creates sidebar + content columns
- Add skip link as first child: `<a href="#main" className="sr-only focus:not-sr-only ...">Skip to main content</a>`
- Replace current sticky header with slim 56-64px topbar:
  - Brand "Transcript Library" left (Fraunces, smaller than current 3xl)
  - Nav links right: Library, Knowledge (simple text links with hover states)
  - Remove "Desktop-first" badge from header
- Wrap `<main id="main">{children}</main>` in a centered container `max-w-[1320px] mx-auto px-8`
- Add `<meta name="theme-color" content="#f0ede6">` to metadata export
- Keep the font loading (Manrope + Fraunces) as-is

### Step 6: `src/app/page.tsx` (Home)

- Delete the entire hero section (lines 20-69 approximately — the radial gradient, marketing headline, stat card)
- Delete the workflow section (lines 71-94 — the "Purpose-built for simultaneous watching and reading" cards)
- Replace with compact header: just "Transcript Library" as h1 + one-line subtitle
- Show aggregate stats inline as small text (e.g., "91 channels, 243 videos") not stat cards
- Render `<ChannelGrid>` directly below
- Simplify recent knowledge section — use a horizontal strip or compact list, not full Cards
- Fix `<Link>` wrapping `<Button>` — use styled `<Link>` with button classes instead

### Step 7: `src/components/ChannelGrid.tsx`

- Reduce channel card padding and radius to match new system
- Consider making cards more compact (less vertical space per card)
- Remove "Channel" micro-label from each card (self-evident)
- Keep search — it works well

### Step 8: `src/app/channel/[channel]/page.tsx`

- Delete hero section with gradient overlay
- Add breadcrumb: `Library > {channelName}`
- Replace with compact header: channel name as h1, metadata badges (video count, analysis count) inline
- Remove the 3 stat cards (Coverage/Analyses/Mode)
- Restyle video list — compact rows instead of tall cards:
  - Each row: video title (left), topic badge, analysis status badge, date (right)
  - Hover state: subtle background highlight, not translate-y lift
- Fix `<Link>` wrapping `<Button>` pattern

### Step 9: `src/app/video/[videoId]/page.tsx` (Video Workspace)

- Delete hero section with gradient overlay
- Add breadcrumb: `Library > {channel} > {videoTitle}`
- Compact header: video title, metadata chips (channel link, topic, date) inline below
- **Video player section**: Remove the Card wrapper around VideoPlayerEmbed. Render at full content width. Dark container `bg-[#0d111a] rounded-[var(--radius-xl)]` with shadow.
- Remove the "Live player" / "Embedded YouTube session" header chrome above the player
- **Analysis section**: Remove the `2xl:grid-cols-[minmax(0,1.2fr)_420px]` grid split. Render VideoAnalysisWorkspace at full width below the player.
- **Metadata section**: Move session metadata (channel, topic, published, transcript count) to inline chips in the page header, not a 420px sidebar card.
- **Transcript section**: Render full-width below analysis. Each part gets a labeled divider ("Part 1", "Part 2") not an individual card. Remove the "Open" button pattern — either render text inline or link to full-width view.

### Step 10: `src/components/VideoAnalysisWorkspace.tsx`

- Remove the "Analysis board" 4xl heading (too large)
- Remove the `<details>` wrapper around full markdown report — render it directly
- Keep summary, takeaways, action items structure (it works well)
- Simplify the status/artifact/provider info bars — less chrome
- Full-width layout (no max-w-[240px] sidebar for the generate button)
- Move "Generate analysis" button inline with the header

### Step 11: `src/components/VideoPlayerEmbed.tsx`

- Remove the Card wrapper expectation — component renders clean at any width
- The `aspect-video` pattern is correct, keep it
- Verify poster image sizing works at full width

### Step 12: `src/app/knowledge/page.tsx`

- Delete hero section
- Compact header: "Knowledge" as h1, category count inline
- Category grid — reduce card radius, remove gradient overlays

### Step 13: `src/app/knowledge/[category]/page.tsx`

- Delete hero section
- Add breadcrumb: `Knowledge > {category}`
- Compact header, document list

### Step 14: `src/app/knowledge/[category]/[...path]/page.tsx`

- Delete hero section
- Add breadcrumb: `Knowledge > {category} > {document title}`
- **Render markdown at full content width** — remove the Card wrapper that constrains it
- The `.md` CSS styles are already good for full-width rendering

### Step 15: Loading States

- `src/app/loading.tsx` — rewrite to match new sidebar-less layout
- `src/app/channel/[channel]/loading.tsx` — update for compact layout
- `src/app/video/[videoId]/loading.tsx` — update for full-width video layout
- `src/app/knowledge/loading.tsx` — update for compact layout

### Step 16: Cleanup

- Delete `src/components/Sidebar.tsx`
- Delete `src/components/SidebarSkeleton.tsx`
- Remove `Sidebar` and `SidebarSkeleton` from any remaining imports
- Remove `skeleton-shimmer` keyframe from globals.css (only used by SidebarSkeleton)
- Verify build passes: `bun run build`
- Verify lint passes: `bun run lint`
- Verify typecheck passes: `bunx tsc --noEmit`

---

## Verification

Verification will be performed during execution by the user. Each ISC criterion maps to a specific file change that can be verified by reading the file and running the build.
