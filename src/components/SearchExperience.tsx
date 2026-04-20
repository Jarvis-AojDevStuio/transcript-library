"use client";

import { startTransition, useDeferredValue, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { SearchDiscoveryPanel } from "@/components/SearchDiscoveryPanel";
import { SearchResultsPanel } from "@/components/SearchResultsPanel";
import type { SearchResponse } from "@/modules/search";

type SearchExperienceProps = {
  initialQuery: string;
  initialResponse: SearchResponse | null;
  suggestions: string[];
};

const MIN_QUERY_LENGTH = 2;
const SEARCH_DEBOUNCE_MS = 220;

function buildSearchHref(query: string): string {
  const normalizedQuery = query.trim();
  return normalizedQuery.length > 0
    ? "/search?q=" + encodeURIComponent(normalizedQuery)
    : "/search";
}

export function SearchExperience({
  initialQuery,
  initialResponse,
  suggestions,
}: SearchExperienceProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [response, setResponse] = useState<SearchResponse | null>(initialResponse);
  const [isLoading, setIsLoading] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const latestRequestRef = useRef(initialQuery.trim());

  useEffect(() => {
    const normalizedQuery = deferredQuery.trim();
    const nextHref = buildSearchHref(normalizedQuery);
    const timeoutId = window.setTimeout(() => {
      startTransition(() => {
        router.replace(nextHref, { scroll: false });
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [deferredQuery, router]);

  useEffect(() => {
    const normalizedQuery = deferredQuery.trim();
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      if (normalizedQuery.length < MIN_QUERY_LENGTH) {
        latestRequestRef.current = normalizedQuery;
        setIsLoading(false);
        setResponse(null);
        return;
      }

      if (normalizedQuery === initialQuery.trim() && initialResponse) {
        latestRequestRef.current = normalizedQuery;
        setIsLoading(false);
        setResponse(initialResponse);
        return;
      }

      latestRequestRef.current = normalizedQuery;
      setIsLoading(true);

      fetch("/api/search?q=" + encodeURIComponent(normalizedQuery), {
        signal: controller.signal,
      })
        .then(async (result) => {
          if (result.ok === false) throw new Error("Search request failed");
          return (await result.json()) as SearchResponse;
        })
        .then((nextResponse) => {
          if (latestRequestRef.current === normalizedQuery) {
            setResponse(nextResponse);
          }
        })
        .catch((error: unknown) => {
          if (
            typeof error === "object" &&
            error &&
            "name" in error &&
            error.name === "AbortError"
          ) {
            return;
          }
        })
        .finally(() => {
          if (latestRequestRef.current === normalizedQuery) {
            setIsLoading(false);
          }
        });
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [deferredQuery, initialQuery, initialResponse]);

  const normalizedQuery = query.trim();
  const totalResults = response?.meta.totalResults ?? 0;

  return (
    <div className="space-y-8 pb-16">
      <section className="space-y-5 pt-4">
        <div className="space-y-3">
          <h1 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)] sm:text-5xl">
            Search the transcript library
          </h1>
          <p className="max-w-3xl text-[15px] leading-relaxed text-[var(--muted)]">
            Search across video metadata, transcript text, curated insight summaries, action items,
            and knowledge documents. Use this when you remember the idea but not where it lives.
          </p>
        </div>

        <SearchBar
          variant="hero"
          autoFocus
          className="max-w-4xl"
          query={query}
          onQueryChange={setQuery}
          pending={isLoading}
        />

        {normalizedQuery.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            Try a phrase like{" "}
            <span className="font-medium text-[var(--ink)]">cloudflare tunnel</span>,{" "}
            <span className="font-medium text-[var(--ink)]">vector database</span>, or{" "}
            <span className="font-medium text-[var(--ink)]">retry queue</span>.
          </p>
        ) : normalizedQuery.length < MIN_QUERY_LENGTH ? (
          <p className="text-sm text-[var(--muted)]">
            Enter at least two characters so the results stay useful.
          </p>
        ) : isLoading ? (
          <p className="text-sm text-[var(--muted)]">
            Searching for{" "}
            <span className="font-semibold text-[var(--ink)]">&quot;{normalizedQuery}&quot;</span>
            ...
          </p>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            Found <span className="font-semibold text-[var(--ink)]">{totalResults}</span>{" "}
            {totalResults === 1 ? "result" : "results"} for{" "}
            <span className="font-semibold text-[var(--ink)]">&quot;{normalizedQuery}&quot;</span>.
          </p>
        )}
      </section>

      <SearchDiscoveryPanel query={normalizedQuery} suggestions={suggestions} />

      {normalizedQuery.length >= MIN_QUERY_LENGTH && !isLoading && totalResults === 0 && (
        <section className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">
            No matches yet
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Try a shorter phrase, a synonym, or a more distinctive noun from the transcript, insight
            summary, or knowledge document.
          </p>
        </section>
      )}

      {response && response.meta.totalResults > 0 && (
        <SearchResultsPanel query={normalizedQuery} response={response} />
      )}
    </div>
  );
}
