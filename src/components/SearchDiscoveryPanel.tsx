"use client";

import Link from "next/link";
import { useEffect, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "search-page:recent-queries";
const MAX_RECENT_SEARCHES = 6;
const EMPTY_SNAPSHOT = "[]";

type SearchDiscoveryPanelProps = {
  query: string;
  suggestions: string[];
};

function readRecentSearchSnapshot(): string {
  if (typeof window === "undefined") return EMPTY_SNAPSHOT;

  try {
    return window.sessionStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function parseRecentSearches(snapshot: string): string[] {
  try {
    const parsed = JSON.parse(snapshot);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((value): value is string => typeof value === "string");
  } catch {
    return [];
  }
}

function writeRecentSearches(values: string[]): void {
  if (typeof window === "undefined") return;

  try {
    const nextSnapshot = JSON.stringify(values);
    if (window.sessionStorage.getItem(STORAGE_KEY) === nextSnapshot) return;

    window.sessionStorage.setItem(STORAGE_KEY, nextSnapshot);
    window.dispatchEvent(new Event("search-recent-updated"));
  } catch {
    // Session-only UI state should fail silently when storage is unavailable.
  }
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleChange = () => onStoreChange();
  window.addEventListener("search-recent-updated", handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener("search-recent-updated", handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

function getServerSnapshot(): string {
  return EMPTY_SNAPSHOT;
}

export function SearchDiscoveryPanel({ query, suggestions }: SearchDiscoveryPanelProps) {
  const snapshot = useSyncExternalStore(subscribe, readRecentSearchSnapshot, getServerSnapshot);
  const storedRecentSearches = useMemo(() => parseRecentSearches(snapshot), [snapshot]);
  const normalizedQuery = query.trim();
  const recentSearches =
    normalizedQuery.length >= 2
      ? [normalizedQuery, ...storedRecentSearches.filter((item) => item !== normalizedQuery)].slice(
          0,
          MAX_RECENT_SEARCHES,
        )
      : storedRecentSearches;

  useEffect(() => {
    writeRecentSearches(recentSearches);
  }, [recentSearches]);

  if (!recentSearches.length && !suggestions.length) return null;

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
      <div className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
        <div>
          <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">
            Recent searches
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Session-only history for this tab.</p>
        </div>

        {recentSearches.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {recentSearches.map((item) => (
              <Link
                key={item}
                href={`/search?q=${encodeURIComponent(item)}`}
                className="inline-flex items-center rounded-2xl border border-[var(--line)] bg-white/80 px-3 py-2 text-sm text-[var(--ink)] transition hover:bg-white"
              >
                {item}
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-[var(--muted)]">
            Your recent queries will show up here during this session.
          </p>
        )}
      </div>

      <div className="rounded-[24px] border border-[var(--line)] bg-[var(--accent-soft)]/35 p-5 shadow-[var(--shadow-card)]">
        <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">
          Suggested topics
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Good starting points from the current library.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <Link
              key={item}
              href={`/search?q=${encodeURIComponent(item)}`}
              className="inline-flex items-center rounded-2xl bg-white/80 px-3 py-2 text-sm text-[var(--ink)] transition hover:bg-white"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
