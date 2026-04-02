# Global Video Search — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a global search bar to the nav that searches video metadata (title, channel, topic) via SQLite LIKE queries and displays results in an inline dropdown.

**Architecture:** New `/api/search` route queries `catalog_videos` with LIKE. A client-side `SearchBar` component in the nav debounces input, fetches results, and renders a `SearchDropdown` overlay. Keyboard shortcut `Cmd+K` focuses the search input.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, better-sqlite3, Vitest

**Design doc:** `docs/plans/2026-04-02-global-video-search-design.md`

---

### Task 1: Add `searchVideos` function to catalog module

**Files:**

- Modify: `src/lib/catalog.ts`
- Modify: `src/modules/catalog/index.ts`
- Test: `src/lib/__tests__/catalog-search.test.ts`

**Step 1: Write the failing test**

Create `src/lib/__tests__/catalog-search.test.ts`:

```ts
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { bootstrapCatalogDb } from "@/lib/catalog-db";

const csvHeader = [
  "video_id",
  "parent_video_id",
  "title",
  "channel",
  "topic",
  "published_date",
  "ingested_date",
  "word_count",
  "chunk",
  "total_chunks",
  "file_path",
].join(",");

function seedTestDb(dbPath: string) {
  const db = bootstrapCatalogDb(dbPath);
  db.prepare(
    `INSERT INTO catalog_videos (video_id, title, channel, topic, published_date, ingested_date, total_chunks, source_row_count)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run("abc123", "React Hooks Deep Dive", "Fireship", "React", "2025-01-15", "2025-01-16", 1, 1);
  db.prepare(
    `INSERT INTO catalog_videos (video_id, title, channel, topic, published_date, ingested_date, total_chunks, source_row_count)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run("def456", "Rust in 100 Seconds", "Fireship", "Rust", "2025-02-10", "2025-02-11", 1, 1);
  db.prepare(
    `INSERT INTO catalog_videos (video_id, title, channel, topic, published_date, ingested_date, total_chunks, source_row_count)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    "ghi789",
    "Vue 3 Composition API",
    "Traversy Media",
    "Vue",
    "2025-03-05",
    "2025-03-06",
    1,
    1,
  );
  db.close();
}

describe("searchVideos", () => {
  let tmpDir: string;
  const originalDbPath = process.env.CATALOG_DB_PATH;

  afterEach(() => {
    process.env.CATALOG_DB_PATH = originalDbPath;
    if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function setup() {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "search-test-"));
    const dbPath = path.join(tmpDir, "catalog.db");
    process.env.CATALOG_DB_PATH = dbPath;
    seedTestDb(dbPath);
  }

  it("returns matching videos by title substring", async () => {
    setup();
    // Dynamic import so env var is picked up
    const { searchVideos } = await import("@/lib/catalog");
    const results = searchVideos("React");
    expect(results).toHaveLength(1);
    expect(results[0].videoId).toBe("abc123");
    expect(results[0].title).toBe("React Hooks Deep Dive");
  });

  it("returns matching videos by channel", async () => {
    setup();
    const { searchVideos } = await import("@/lib/catalog");
    const results = searchVideos("Fireship");
    expect(results).toHaveLength(2);
  });

  it("returns matching videos by topic", async () => {
    setup();
    const { searchVideos } = await import("@/lib/catalog");
    const results = searchVideos("Rust");
    expect(results).toHaveLength(1);
    expect(results[0].videoId).toBe("def456");
  });

  it("returns empty array for no matches", async () => {
    setup();
    const { searchVideos } = await import("@/lib/catalog");
    const results = searchVideos("Python");
    expect(results).toEqual([]);
  });

  it("returns empty array for query under 2 characters", async () => {
    setup();
    const { searchVideos } = await import("@/lib/catalog");
    const results = searchVideos("R");
    expect(results).toEqual([]);
  });

  it("limits results to 10", async () => {
    setup();
    const db = bootstrapCatalogDb(process.env.CATALOG_DB_PATH!);
    for (let i = 0; i < 15; i++) {
      db.prepare(
        `INSERT INTO catalog_videos (video_id, title, channel, topic, published_date, ingested_date, total_chunks, source_row_count)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ).run(
        `extra${i}`,
        `Extra Video ${i}`,
        "TestChannel",
        "Test",
        "2025-04-01",
        "2025-04-02",
        1,
        1,
      );
    }
    db.close();
    const { searchVideos } = await import("@/lib/catalog");
    const results = searchVideos("Extra");
    expect(results.length).toBeLessThanOrEqual(10);
  });

  it("is case-insensitive", async () => {
    setup();
    const { searchVideos } = await import("@/lib/catalog");
    const results = searchVideos("react");
    expect(results).toHaveLength(1);
    expect(results[0].videoId).toBe("abc123");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/catalog-search.test.ts`
Expected: FAIL — `searchVideos` is not exported from `@/lib/catalog`

**Step 3: Implement `searchVideos` in catalog.ts**

Add to `src/lib/catalog.ts` (after the existing `getVideo` function):

```ts
export type SearchResult = {
  videoId: string;
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
};

export function searchVideos(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];

  const dbPath = catalogDbPath();
  const db = openCatalogDb(dbPath);

  try {
    const pattern = `%${query}%`;
    const rows = db
      .prepare(
        `SELECT video_id, title, channel, topic, published_date
         FROM catalog_videos
         WHERE title LIKE ? OR channel LIKE ? OR topic LIKE ?
         ORDER BY published_date DESC
         LIMIT 10`,
      )
      .all(pattern, pattern, pattern) as Array<{
      video_id: string;
      title: string;
      channel: string;
      topic: string;
      published_date: string;
    }>;

    return rows.map((row) => ({
      videoId: row.video_id,
      title: row.title,
      channel: row.channel,
      topic: row.topic,
      publishedDate: row.published_date,
    }));
  } finally {
    db.close();
  }
}
```

**Step 4: Re-export from module barrel**

Add to `src/modules/catalog/index.ts`:

```ts
export { searchVideos, type SearchResult } from "@/lib/catalog";
```

**Step 5: Run tests to verify they pass**

Run: `npx vitest run src/lib/__tests__/catalog-search.test.ts`
Expected: All 7 tests PASS

**Step 6: Commit**

```bash
git add src/lib/catalog.ts src/lib/__tests__/catalog-search.test.ts src/modules/catalog/index.ts
git commit -m "feat: add searchVideos function to catalog module"
```

---

### Task 2: Add `/api/search` route

**Files:**

- Create: `src/app/api/search/route.ts`
- Test: `src/lib/__tests__/search-route.test.ts`

**Step 1: Write the failing test**

Create `src/lib/__tests__/search-route.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest";

// Mock the catalog module before importing the route
vi.mock("@/modules/catalog", () => ({
  searchVideos: vi.fn((query: string) => {
    if (query === "React") {
      return [
        {
          videoId: "abc123",
          title: "React Hooks Deep Dive",
          channel: "Fireship",
          topic: "React",
          publishedDate: "2025-01-15",
        },
      ];
    }
    return [];
  }),
}));

// Mock private API guard to always allow in tests
vi.mock("@/lib/private-api-guard", () => ({
  requirePrivateApi: () => ({ allowed: true, reason: "local-dev" }),
}));

describe("GET /api/search", () => {
  it("returns matching results for valid query", async () => {
    const { GET } = await import("@/app/api/search/route");
    const req = new Request("http://localhost:3000/api/search?q=React");
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.results).toHaveLength(1);
    expect(body.results[0].videoId).toBe("abc123");
  });

  it("returns empty results for missing query param", async () => {
    const { GET } = await import("@/app/api/search/route");
    const req = new Request("http://localhost:3000/api/search");
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.results).toEqual([]);
  });

  it("returns empty results for short query", async () => {
    const { GET } = await import("@/app/api/search/route");
    const req = new Request("http://localhost:3000/api/search?q=R");
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.results).toEqual([]);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/search-route.test.ts`
Expected: FAIL — cannot resolve `@/app/api/search/route`

**Step 3: Implement the route**

Create `src/app/api/search/route.ts`:

```ts
import { NextResponse } from "next/server";
import { searchVideos } from "@/modules/catalog";
import { requirePrivateApi } from "@/lib/private-api-guard";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const guard = requirePrivateApi(req);
  if (!guard.allowed) return guard.response;

  const url = new URL(req.url);
  const query = url.searchParams.get("q")?.trim() ?? "";
  const results = searchVideos(query);

  return NextResponse.json({ results });
}
```

**Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/__tests__/search-route.test.ts`
Expected: All 3 tests PASS

**Step 5: Commit**

```bash
git add src/app/api/search/route.ts src/lib/__tests__/search-route.test.ts
git commit -m "feat: add /api/search route for video metadata search"
```

---

### Task 3: Create SearchBar and SearchDropdown components

**Files:**

- Create: `src/components/SearchBar.tsx`

**Step 1: Implement the SearchBar component**

Create `src/components/SearchBar.tsx`:

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

type SearchResult = {
  videoId: string;
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
};

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const router = useRouter();

  // Fetch results with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results ?? []);
        setOpen(true);
        setActiveIndex(-1);
      } catch {
        setResults([]);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  // Click outside to close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navigate = useCallback(
    (videoId: string) => {
      setOpen(false);
      setQuery("");
      router.push(`/video/${videoId}`);
    },
    [router],
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      navigate(results[activeIndex].videoId);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <Input
        ref={inputRef}
        type="search"
        placeholder="Search videos… ⌘K"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (results.length > 0) setOpen(true);
        }}
        onKeyDown={handleKeyDown}
        className="h-9 w-56 rounded-xl text-sm"
      />

      {open && results.length > 0 && (
        <div className="absolute top-full right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-lg">
          <ul role="listbox">
            {results.map((result, index) => (
              <li
                key={result.videoId}
                role="option"
                aria-selected={index === activeIndex}
                className={`cursor-pointer border-b border-[var(--line)] px-4 py-3 last:border-b-0 ${
                  index === activeIndex ? "bg-[var(--accent-soft)]" : "hover:bg-black/5"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => navigate(result.videoId)}
              >
                <p className="truncate text-sm font-medium text-[var(--ink)]">{result.title}</p>
                <p className="truncate text-xs text-[var(--muted)]">
                  {result.channel} · {result.topic}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {open && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full right-0 z-50 mt-2 w-80 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-6 text-center shadow-lg">
          <p className="text-sm text-[var(--muted)]">No results found</p>
        </div>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/SearchBar.tsx
git commit -m "feat: add SearchBar component with dropdown and keyboard nav"
```

---

### Task 4: Integrate SearchBar into NavHeader

**Files:**

- Modify: `src/components/NavHeader.tsx`

**Step 1: Add SearchBar to the nav**

In `src/components/NavHeader.tsx`, add the import and render the SearchBar next to the nav links:

```tsx
import { SearchBar } from "@/components/SearchBar";
```

Then in the JSX, add `<SearchBar />` after the nav links `</nav>` closing tag but still within the same fragment/wrapper. The NavHeader should return both the nav and the search bar:

Replace the return statement in `NavHeader` so it wraps the nav links and search bar together:

```tsx
export function NavHeader() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-4">
      <nav className="flex items-center gap-1 text-sm font-medium text-[var(--muted)]">
        {navItems.map(({ label, href }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-xl px-4 py-2 transition ${
                active
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "hover:bg-black/5 hover:text-[var(--ink)]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <SearchBar />
    </div>
  );
}
```

**Step 2: Verify the dev server renders correctly**

Run: `just start`
Expected: The nav bar shows the existing Library / Channels / Knowledge links plus a search input on the right. Typing "React" or a channel name produces results in a dropdown. Cmd+K focuses the input.

**Step 3: Commit**

```bash
git add src/components/NavHeader.tsx
git commit -m "feat: integrate SearchBar into global nav header"
```

---

### Task 5: Manual smoke test and final verification

**Step 1: Start the dev server**

Run: `just start`

**Step 2: Verify all search behaviors**

1. Navigate to `http://localhost:3000`
2. Click the search bar — confirm it focuses
3. Type a single character — confirm no dropdown appears
4. Type a video title substring — confirm matching results appear
5. Type a channel name — confirm matching results appear
6. Use arrow keys to navigate results — confirm highlight moves
7. Press Enter on a highlighted result — confirm navigation to `/video/[id]`
8. Press Escape — confirm dropdown closes
9. Click outside the dropdown — confirm it closes
10. Press `Cmd+K` — confirm search input focuses
11. Search for something with no matches — confirm "No results found" message

**Step 3: Run full test suite**

Run: `npx vitest run`
Expected: All tests pass, including the new `catalog-search` and `search-route` tests.

**Step 4: Run lint and typecheck**

Run: `just lint && just typecheck`
Expected: No errors.

**Step 5: Final commit if any fixes needed, then done**

```bash
git add -A
git commit -m "feat: global video search — complete"
```
