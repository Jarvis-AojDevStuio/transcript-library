# Reading Room UI Redesign — Agent Execution Plan

## Context

Three parallel UI audit agents analyzed the Transcript Library and the user selected a hybrid "Reading Room" direction: editorial aesthetic, warm paper palette, no sidebar, minimal chrome. The PRD at `MEMORY/WORK/20260307-120000_ui-redesign-reading-room-plan/PRD.md` contains 42 ISC criteria across 7 phases. This plan orchestrates execution via parallel agents.

**Source of truth:** `MEMORY/WORK/20260307-120000_ui-redesign-reading-room-plan/PRD.md` — all token values, radius system, and per-file instructions live there. Agents MUST read that file before editing.

---

## Execution Waves

### Wave 1: Foundation (Sequential — single Engineer agent)

**Why sequential:** Every page and component depends on CSS variables, layout shell, and shared components. Must land first.

**Agent: `foundation`**
Files to modify:

- `src/app/globals.css` — Replace all CSS variables per PRD token table, remove sidebar/hero vars, add `--warm`, `--warm-soft`, radius tokens, flat background, `color-scheme: light`, `prefers-reduced-motion` media query
- `src/components/ui/card.tsx` — `rounded-[28px]` to `rounded-2xl` (16px)
- `src/components/Badge.tsx` — `text-[10px]` to `text-[11px]`
- `src/components/ui/button.tsx` — Update shadow in default variant to warm-toned values
- `src/app/layout.tsx` — Remove Sidebar/SidebarSkeleton imports and Suspense block, remove flex sidebar+content wrapper, add skip link, replace header with slim 56-64px topbar (brand left, nav right, no "Desktop-first" badge), wrap children in `<main id="main">` at `max-w-[1320px] mx-auto px-8`, add theme-color meta
- Create `src/components/Breadcrumb.tsx` — Simple `Library > Channel > Video` breadcrumb component using `font-sans text-sm text-[var(--muted)]` with chevron separators and links

Files to delete:

- `src/components/Sidebar.tsx`
- `src/components/SidebarSkeleton.tsx`

**Anti-criteria check:** No API routes, no modules, no data layer, no new deps.

---

### Wave 2: Pages (Parallel — 4 Engineer agents)

**Why parallel:** Each agent touches completely disjoint file sets. No shared mutable state.

#### Agent A: `home-page`

Files:

- `src/app/page.tsx` — Delete hero section (lines ~20-69), delete workflow section (lines ~71-94), add compact header (h1 + subtitle + inline stats text), render ChannelGrid directly, simplify recent knowledge (no Card wrapper, hairline dividers), fix all Link>Button anti-patterns (use styled Link with button classes)
- `src/components/ChannelGrid.tsx` — Reduce card padding/radius to match new system, make cards more compact, remove "Channel" micro-label if present, keep search

#### Agent B: `channel-page`

Files:

- `src/app/channel/[channel]/page.tsx` — Delete hero section (lines ~33-51), add Breadcrumb (`Library > {channelName}`), compact header (h1 + inline metadata badges), remove 3 stat cards (lines ~53-75), restyle video list to compact rows (title + topic badge + analysis status + date on one line, subtle bg hover not translate-y), fix Link>Button anti-patterns

#### Agent C: `video-workspace`

Files:

- `src/app/video/[videoId]/page.tsx` — Delete hero (lines ~49-75), add Breadcrumb (`Library > {channel} > {title}`), compact header with inline metadata chips, remove 2-column grid (`2xl:grid-cols-[minmax(0,1.2fr)_420px]`), render player full-width no Card chrome (dark container `bg-[#0d111a] rounded-[var(--radius-xl)]`), render analysis full-width below player, move session metadata to inline chips, render transcript parts full-width with labeled dividers not cards, fix Link>Button
- `src/components/VideoAnalysisWorkspace.tsx` — Remove "Analysis board" 4xl heading, remove `<details>` wrapper around full markdown (render directly), keep summary/takeaways/action items, simplify status/artifact/provider bars, full-width layout (no 240px sidebar for generate button), move generate button inline with header
- `src/components/VideoPlayerEmbed.tsx` — Remove Card wrapper expectation, keep aspect-video, verify poster sizing at full width

#### Agent D: `knowledge-pages`

Files:

- `src/app/knowledge/page.tsx` — Delete hero (lines ~34-49), compact header (h1 + category count inline), reduce card radius in category grid, remove gradient overlays
- `src/app/knowledge/[category]/page.tsx` — Delete hero (lines ~27-42), add Breadcrumb (`Knowledge > {category}`), compact header, document list
- `src/app/knowledge/[category]/[...path]/page.tsx` — Delete hero (lines ~38-51), add Breadcrumb (`Knowledge > {category} > {title}`), render markdown at full content width (remove Card wrapper at line ~53)

---

### Wave 3: Loading States + Verification (Sequential — single Engineer agent)

**Why sequential:** Loading states must match the new layouts from Waves 1-2. Verification must run after all changes land.

**Agent: `loading-and-verify`**
Files to modify:

- `src/app/loading.tsx` — Rewrite for sidebar-less, no-hero layout (compact header skeleton + channel grid skeleton)
- `src/app/channel/[channel]/loading.tsx` — Update for compact layout with breadcrumb skeleton
- `src/app/video/[videoId]/loading.tsx` — Update for full-width video layout (player skeleton + analysis skeleton, no 2-column)
- `src/app/knowledge/loading.tsx` — Update for compact layout

Cleanup:

- Remove `skeleton-shimmer` keyframe from globals.css if only used by deleted SidebarSkeleton
- Grep for any remaining references to Sidebar, SidebarSkeleton, `--surface-hero`, `--sidebar-bg`, `--sidebar-fg`, `--shadow-sidebar`

Verification:

- `bun run build` — must pass
- `bun run lint` — must pass
- `bunx tsc --noEmit` — must pass

---

## Key Patterns for All Agents

### Link>Button Fix Pattern

Replace:

```tsx
<Link href="/path">
  <Button>Label</Button>
</Link>
```

With:

```tsx
<Link
  href="/path"
  className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] transition hover:bg-[var(--accent-strong)]"
>
  Label
</Link>
```

Or use Button's `asChild` prop if available (check button.tsx for Slot support).

### Compact Header Pattern

Replace hero sections with:

```tsx
<div className="mb-8 pt-2">
  <Breadcrumb items={[...]} />
  <h1 className="font-display text-3xl tracking-[-0.04em] text-[var(--ink)]">Title</h1>
  <p className="mt-1 text-sm text-[var(--muted)]">Subtitle or inline stats</p>
</div>
```

### Anti-Criteria (ALL agents must respect)

- No changes to `src/app/api/**`
- No changes to `src/modules/**`
- No changes to `src/lib/catalog.ts`, `insights.ts`, etc.
- No new npm dependencies
- Desktop-first stays (no mobile-first responsive redesign)

---

## File Ownership Matrix

| Agent              | Owns (exclusive write access)                                                                                                      |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| foundation         | globals.css, card.tsx, badge.tsx, button.tsx, layout.tsx, Breadcrumb.tsx (new), Sidebar.tsx (delete), SidebarSkeleton.tsx (delete) |
| home-page          | page.tsx (root), ChannelGrid.tsx                                                                                                   |
| channel-page       | channel/[channel]/page.tsx                                                                                                         |
| video-workspace    | video/[videoId]/page.tsx, VideoAnalysisWorkspace.tsx, VideoPlayerEmbed.tsx                                                         |
| knowledge-pages    | knowledge/page.tsx, knowledge/[category]/page.tsx, knowledge/[category]/[...path]/page.tsx                                         |
| loading-and-verify | All loading.tsx files, final globals.css cleanup (skeleton-shimmer only)                                                           |

No overlaps. Each file has exactly one owner.

---

## Verification

After all waves complete:

1. `bun run build` passes (no broken imports, no type errors)
2. `bun run lint` passes
3. `bunx tsc --noEmit` passes
4. Visual spot-check: home, a channel page, a video page, a knowledge doc page
5. No references remain to: Sidebar, SidebarSkeleton, `--surface-hero`, `--sidebar-bg`, `--sidebar-fg`, `--shadow-sidebar`
