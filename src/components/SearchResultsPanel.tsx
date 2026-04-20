"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/Badge";
import type {
  SearchEntityType,
  SearchGroup,
  SearchMatchSource,
  SearchResponse,
} from "@/modules/search";

type SourceFilter = "all" | "transcript" | "insight" | "knowledge";

type SearchResultsPanelProps = {
  query: string;
  response: SearchResponse;
};

const sourceCopy: Record<
  SearchMatchSource,
  { label: string; tone: "neutral" | "quiet" | "amber" }
> = {
  title: { label: "Title", tone: "neutral" },
  topic: { label: "Topic", tone: "quiet" },
  channel: { label: "Channel", tone: "quiet" },
  transcript: { label: "Transcript", tone: "quiet" },
  summary: { label: "Summary", tone: "amber" },
  takeaway: { label: "Takeaway", tone: "amber" },
  "action-item": { label: "Action Item", tone: "amber" },
  "notable-point": { label: "Notable Point", tone: "neutral" },
  knowledge: { label: "Knowledge", tone: "neutral" },
};

const insightSources: SearchMatchSource[] = ["summary", "takeaway", "action-item", "notable-point"];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightSnippet(snippet: string, query: string) {
  const tokens = query
    .trim()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (!tokens.length) return snippet;

  const regex = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "gi");
  const normalizedTokens = new Set(tokens.map((token) => token.toLowerCase()));
  return snippet.split(regex).map((part, index) =>
    normalizedTokens.has(part.toLowerCase()) ? (
      <mark
        key={`${part}-${index}`}
        className="rounded-[0.35rem] bg-[var(--accent)]/16 px-1 py-0.5 text-[var(--ink)]"
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

function sectionLabel(entityType: SearchEntityType): string {
  return entityType === "video" ? "Video result" : "Knowledge result";
}

function actionLabel(entityType: SearchEntityType): string {
  return entityType === "video" ? "Open video" : "Open document";
}

function matchesSourceFilter(group: SearchGroup, filter: SourceFilter): boolean {
  if (filter === "all") return true;
  if (filter === "knowledge") {
    return group.entityType === "knowledge" || group.matchedSources.includes("knowledge");
  }
  if (filter === "transcript") return group.matchedSources.includes("transcript");
  return insightSources.some((source) => group.matchedSources.includes(source));
}

function matchesMetaFilters(
  group: SearchGroup,
  channelFilter: string,
  topicFilter: string,
  categoryFilter: string,
): boolean {
  if (channelFilter !== "all" && group.channel !== channelFilter) return false;
  if (topicFilter !== "all" && group.topic !== topicFilter) return false;
  if (categoryFilter !== "all" && group.category !== categoryFilter) return false;
  return true;
}

function filterGroups(
  groups: SearchGroup[],
  sourceFilter: SourceFilter,
  channelFilter: string,
  topicFilter: string,
  categoryFilter: string,
): SearchGroup[] {
  return groups.filter(
    (group) =>
      matchesSourceFilter(group, sourceFilter) &&
      matchesMetaFilters(group, channelFilter, topicFilter, categoryFilter),
  );
}

function countGroups(groups: SearchGroup[], filter: SourceFilter): number {
  return groups.filter((group) => matchesSourceFilter(group, filter)).length;
}

function FilterButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm transition",
        active
          ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
          : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-elevated)]",
      ].join(" ")}
    >
      <span>{label}</span>
      <span className="rounded-full bg-[var(--panel)] px-2 py-0.5 text-xs text-[var(--muted)]">
        {count}
      </span>
    </button>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  if (options.length === 0) return null;

  return (
    <label className="flex flex-col gap-2 text-sm text-[var(--muted)]">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] px-4 text-sm text-[var(--ink)] transition outline-none focus:border-[var(--accent)]/35 focus:bg-[var(--surface-elevated)]"
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultCard({ group, query }: { group: SearchGroup; query: string }) {
  const isKnowledge = group.entityType === "knowledge";

  return (
    <article
      className={
        isKnowledge
          ? "rounded-[28px] border border-[var(--line)] bg-[var(--accent-soft)]/45 p-6 shadow-[var(--shadow-card)]"
          : "rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="text-[11px] font-semibold tracking-[0.2em] text-[var(--muted)] uppercase">
              {sectionLabel(group.entityType)}
            </div>
            <Link
              href={group.href}
              className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)] transition hover:text-[var(--accent)]"
            >
              {group.title}
            </Link>
            {group.subtitle && <p className="text-sm text-[var(--muted)]">{group.subtitle}</p>}
          </div>

          <div className="flex flex-wrap gap-2">
            {group.topic && <Badge tone="quiet">{group.topic}</Badge>}
            {group.category && <Badge tone="neutral">{group.category}</Badge>}
            {group.matchedSources.map((source) => (
              <Badge key={source} tone={sourceCopy[source].tone}>
                {sourceCopy[source].label}
              </Badge>
            ))}
          </div>
        </div>

        <Link
          href={group.href}
          className="inline-flex items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--surface-elevated)]"
        >
          {actionLabel(group.entityType)}
        </Link>
      </div>

      <div className="mt-5 grid gap-3">
        {group.topMatches.map((match, index) => (
          <div
            key={`${group.id}-${match.source}-${index}`}
            className="rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-[11px] font-semibold tracking-[0.2em] text-[var(--muted)] uppercase">
                {sourceCopy[match.source].label}
              </div>
              <div className="text-xs text-[var(--muted)]">{match.matchedIn}</div>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-strong)]">
              {highlightSnippet(match.snippet, query)}
            </p>
          </div>
        ))}
      </div>

      {group.allMatches.length > group.topMatches.length && (
        <p className="mt-4 text-xs text-[var(--muted)]">
          {group.allMatches.length - group.topMatches.length} more matching sections are available
          for this result.
        </p>
      )}
    </article>
  );
}

export function SearchResultsPanel({ query, response }: SearchResultsPanelProps) {
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = useMemo(() => {
    const blended = filterGroups(
      response.blended,
      sourceFilter,
      channelFilter,
      topicFilter,
      categoryFilter,
    );
    const videos = filterGroups(
      response.grouped.videos,
      sourceFilter,
      channelFilter,
      topicFilter,
      categoryFilter,
    );
    const knowledge = filterGroups(
      response.grouped.knowledge,
      sourceFilter,
      channelFilter,
      topicFilter,
      categoryFilter,
    );

    return {
      blended,
      grouped: { videos, knowledge },
      totalResults: blended.length,
    };
  }, [response, sourceFilter, channelFilter, topicFilter, categoryFilter]);

  const counts = {
    all: response.blended.length,
    transcript: countGroups(response.blended, "transcript"),
    insight: countGroups(response.blended, "insight"),
    knowledge: countGroups(response.blended, "knowledge"),
  };

  const activeLabel =
    sourceFilter === "all"
      ? "all results"
      : sourceFilter === "transcript"
        ? "transcript results"
        : sourceFilter === "insight"
          ? "insight results"
          : "knowledge results";

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">
            Filter results
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Use these controls to narrow the page to one type of result or one source area.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterButton
            label="All"
            count={counts.all}
            active={sourceFilter === "all"}
            onClick={() => setSourceFilter("all")}
          />
          <FilterButton
            label="Transcript"
            count={counts.transcript}
            active={sourceFilter === "transcript"}
            onClick={() => setSourceFilter("transcript")}
          />
          <FilterButton
            label="Insight"
            count={counts.insight}
            active={sourceFilter === "insight"}
            onClick={() => setSourceFilter("insight")}
          />
          <FilterButton
            label="Knowledge"
            count={counts.knowledge}
            active={sourceFilter === "knowledge"}
            onClick={() => setSourceFilter("knowledge")}
          />
        </div>

        {(response.availableFilters.channels.length > 0 ||
          response.availableFilters.topics.length > 0 ||
          response.availableFilters.categories.length > 0) && (
          <div className="grid gap-3 md:grid-cols-3">
            <SelectFilter
              label="Channel"
              value={channelFilter}
              options={response.availableFilters.channels}
              onChange={setChannelFilter}
            />
            <SelectFilter
              label="Topic"
              value={topicFilter}
              options={response.availableFilters.topics}
              onChange={setTopicFilter}
            />
            <SelectFilter
              label="Category"
              value={categoryFilter}
              options={response.availableFilters.categories}
              onChange={setCategoryFilter}
            />
          </div>
        )}

        <p className="text-sm text-[var(--muted)]">
          Showing <span className="font-semibold text-[var(--ink)]">{filtered.totalResults}</span>{" "}
          {filtered.totalResults === 1 ? "result" : "results"} in{" "}
          <span className="font-semibold text-[var(--ink)]">{activeLabel}</span>.
        </p>
      </section>

      {filtered.totalResults === 0 ? (
        <section className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">
            No matches in this filter
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Try switching back to All, or clear one of the narrowing controls.
          </p>
        </section>
      ) : (
        <>
          {filtered.blended.length > 0 && (
            <section className="space-y-5">
              <div>
                <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">
                  Top results
                </h2>
                <p className="text-sm text-[var(--muted)]">Best matches for the current filter.</p>
              </div>

              <div className="grid gap-4">
                {filtered.blended.map((group) => (
                  <ResultCard key={`blended-${group.id}`} group={group} query={query} />
                ))}
              </div>
            </section>
          )}

          {(filtered.grouped.videos.length > 0 || filtered.grouped.knowledge.length > 0) && (
            <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:items-start">
              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">
                    Videos
                  </h2>
                  <p className="text-sm text-[var(--muted)]">
                    Matches from video metadata, transcripts, and curated insights.
                  </p>
                </div>

                <div className="grid gap-4">
                  {filtered.grouped.videos.map((group) => (
                    <ResultCard key={`video-${group.id}`} group={group} query={query} />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">
                    Knowledge
                  </h2>
                  <p className="text-sm text-[var(--muted)]">
                    Matches from the shared markdown knowledge base.
                  </p>
                </div>

                <div className="grid gap-4">
                  {filtered.grouped.knowledge.map((group) => (
                    <ResultCard key={`knowledge-${group.id}`} group={group} query={query} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
