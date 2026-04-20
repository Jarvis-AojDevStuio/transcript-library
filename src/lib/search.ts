import fs from "node:fs";
import { absTranscriptPath, groupVideos, type Video } from "@/lib/catalog";
import { readCuratedInsight } from "@/lib/insights";
import {
  listKnowledgeCategories,
  listKnowledgeMarkdown,
  readKnowledgeMarkdown,
  titleFromRelPath,
} from "@/lib/knowledge";

export type SearchEntityType = "video" | "knowledge";

export type SearchMatchSource =
  | "title"
  | "topic"
  | "channel"
  | "transcript"
  | "summary"
  | "takeaway"
  | "action-item"
  | "notable-point"
  | "knowledge";

export type SearchMatch = {
  source: SearchMatchSource;
  snippet: string;
  matchedIn: string;
  semantic?: boolean;
};

export type SearchGroup = {
  id: string;
  entityType: SearchEntityType;
  title: string;
  href: string;
  subtitle?: string;
  topic?: string;
  channel?: string;
  category?: string;
  matchedSources: SearchMatchSource[];
  topMatches: SearchMatch[];
  allMatches: SearchMatch[];
};

export type SearchResponse = {
  query: string;
  blended: SearchGroup[];
  grouped: {
    videos: SearchGroup[];
    knowledge: SearchGroup[];
  };
  availableFilters: {
    sources: SearchMatchSource[];
    channels: string[];
    topics: string[];
    categories: string[];
  };
  meta: {
    totalResults: number;
    usedSemanticLane: boolean;
  };
};

type SearchOptions = {
  limit?: number;
};

type RankedGroup = SearchGroup & {
  score: number;
  sortDate?: string;
};

const MIN_QUERY_LENGTH = 2;
const DEFAULT_LIMIT = 24;
const TOP_MATCH_LIMIT = 3;
const SNIPPET_RADIUS = 90;

const SOURCE_WEIGHT: Record<SearchMatchSource, number> = {
  title: 8,
  topic: 6,
  channel: 4,
  transcript: 1,
  summary: 4,
  takeaway: 4,
  "action-item": 5,
  "notable-point": 3,
  knowledge: 3,
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function stripFrontmatter(value: string): string {
  if (!value.startsWith("---")) return value;
  const closingBoundaryIndex = value.indexOf("\n---", 3);
  if (closingBoundaryIndex === -1) return value;
  const afterClosingBoundary = value.indexOf("\n", closingBoundaryIndex + 4);
  return afterClosingBoundary === -1 ? "" : value.slice(afterClosingBoundary + 1);
}

function buildQueryRegex(query: string): RegExp | null {
  const tokens = query
    .trim()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (!tokens.length) return null;
  return new RegExp(tokens.map(escapeRegExp).join("\\s+"), "i");
}

function buildSnippet(text: string, matchIndex: number, matchLength: number): string {
  const start = Math.max(0, matchIndex - SNIPPET_RADIUS);
  const end = Math.min(text.length, matchIndex + matchLength + SNIPPET_RADIUS);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < text.length ? "..." : "";
  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

function findTextMatch(
  source: SearchMatchSource,
  text: string,
  regex: RegExp,
  matchedIn: string,
  { preferWholeText = false }: { preferWholeText?: boolean } = {},
): SearchMatch | null {
  const searchableText = collapseWhitespace(stripFrontmatter(text));
  if (!searchableText) return null;

  const match = regex.exec(searchableText);
  if (!match || typeof match.index !== "number") return null;

  return {
    source,
    matchedIn,
    snippet: preferWholeText
      ? searchableText
      : buildSnippet(searchableText, match.index, match[0].length),
  };
}

function readTranscriptBody(video: Video): string {
  return video.parts
    .map((part) => {
      try {
        return fs.readFileSync(absTranscriptPath(part.filePath), "utf8");
      } catch {
        return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}

function findListMatch(
  source: Extract<SearchMatchSource, "takeaway" | "action-item" | "notable-point">,
  items: string[] | undefined,
  regex: RegExp,
  matchedIn: string,
): SearchMatch | null {
  if (!items?.length) return null;

  for (const item of items) {
    const match = findTextMatch(source, item, regex, matchedIn);
    if (match) return match;
  }

  return null;
}

function sortMatches(matches: SearchMatch[]): SearchMatch[] {
  return [...matches].sort((left, right) => {
    const weightDiff = SOURCE_WEIGHT[right.source] - SOURCE_WEIGHT[left.source];
    if (weightDiff !== 0) return weightDiff;
    return left.matchedIn.localeCompare(right.matchedIn);
  });
}

function computeScore(matches: SearchMatch[]): number {
  const distinctSources = Array.from(new Set(matches.map((match) => match.source)));
  return (
    distinctSources.reduce((total, source) => total + SOURCE_WEIGHT[source], 0) + matches.length
  );
}

function uniqueSources(matches: SearchMatch[]): SearchMatchSource[] {
  return Array.from(new Set(matches.map((match) => match.source)));
}

function sortGroups(left: RankedGroup, right: RankedGroup): number {
  if (left.score !== right.score) return right.score - left.score;
  if ((left.sortDate ?? "") !== (right.sortDate ?? "")) {
    return (right.sortDate ?? "").localeCompare(left.sortDate ?? "");
  }
  return left.title.localeCompare(right.title);
}

function toVideoGroup(video: Video, regex: RegExp): RankedGroup | null {
  const insight = readCuratedInsight(video.videoId);
  const matches = sortMatches(
    [
      findTextMatch("title", video.title, regex, "Video title", { preferWholeText: true }),
      findTextMatch("topic", video.topic, regex, "Video topic", { preferWholeText: true }),
      findTextMatch("channel", video.channel, regex, "Channel", { preferWholeText: true }),
      findTextMatch("transcript", readTranscriptBody(video), regex, "Transcript"),
      findTextMatch("summary", insight.curated?.summary ?? "", regex, "Insight summary"),
      findListMatch("takeaway", insight.curated?.takeaways, regex, "Insight takeaway"),
      findListMatch("action-item", insight.curated?.actionItems, regex, "Action item"),
      findListMatch("notable-point", insight.curated?.notablePoints, regex, "Notable point"),
    ].filter((match): match is SearchMatch => Boolean(match)),
  );

  if (!matches.length) return null;

  return {
    id: `video:${video.videoId}`,
    entityType: "video",
    title: video.title,
    href: `/video/${encodeURIComponent(video.videoId)}`,
    subtitle: `${video.channel} / ${video.publishedDate || "Undated"}`,
    topic: video.topic,
    channel: video.channel,
    matchedSources: uniqueSources(matches),
    topMatches: matches.slice(0, TOP_MATCH_LIMIT),
    allMatches: matches,
    score: computeScore(matches),
    sortDate: video.publishedDate,
  };
}

function toKnowledgeGroup(category: string, relPath: string, regex: RegExp): RankedGroup | null {
  const markdown = readKnowledgeMarkdown(category, relPath);
  if (!markdown) return null;

  const title = titleFromRelPath(relPath);
  const matches = sortMatches(
    [
      findTextMatch("title", title, regex, "Document title", { preferWholeText: true }),
      findTextMatch("knowledge", markdown, regex, "Knowledge document"),
    ].filter((match): match is SearchMatch => Boolean(match)),
  );

  if (!matches.length) return null;

  return {
    id: `knowledge:${category}:${relPath}`,
    entityType: "knowledge",
    title,
    href: `/knowledge/${encodeURIComponent(category)}/${encodeURIComponent(relPath)}`,
    subtitle: relPath,
    category,
    matchedSources: uniqueSources(matches),
    topMatches: matches.slice(0, TOP_MATCH_LIMIT),
    allMatches: matches,
    score: computeScore(matches),
  };
}

function collectKnowledgeGroups(regex: RegExp): RankedGroup[] {
  return listKnowledgeCategories()
    .flatMap((category) =>
      listKnowledgeMarkdown(category).map((relPath) => toKnowledgeGroup(category, relPath, regex)),
    )
    .filter((group): group is RankedGroup => Boolean(group));
}

function buildAvailableFilters(results: RankedGroup[]): SearchResponse["availableFilters"] {
  const sources = new Set<SearchMatchSource>();
  const channels = new Set<string>();
  const topics = new Set<string>();
  const categories = new Set<string>();

  for (const result of results) {
    for (const source of result.matchedSources) sources.add(source);
    if (result.channel) channels.add(result.channel);
    if (result.topic) topics.add(result.topic);
    if (result.category) categories.add(result.category);
  }

  return {
    sources: Array.from(sources).sort((left, right) => SOURCE_WEIGHT[right] - SOURCE_WEIGHT[left]),
    channels: Array.from(channels).sort((left, right) => left.localeCompare(right)),
    topics: Array.from(topics).sort((left, right) => left.localeCompare(right)),
    categories: Array.from(categories).sort((left, right) => left.localeCompare(right)),
  };
}

export function searchTranscriptLibrary(
  query: string,
  { limit = DEFAULT_LIMIT }: SearchOptions = {},
): SearchResponse {
  const normalizedQuery = query.trim();
  if (normalizedQuery.length < MIN_QUERY_LENGTH) {
    return {
      query: normalizedQuery,
      blended: [],
      grouped: { videos: [], knowledge: [] },
      availableFilters: { sources: [], channels: [], topics: [], categories: [] },
      meta: { totalResults: 0, usedSemanticLane: false },
    };
  }

  const regex = buildQueryRegex(normalizedQuery);
  if (!regex) {
    return {
      query: normalizedQuery,
      blended: [],
      grouped: { videos: [], knowledge: [] },
      availableFilters: { sources: [], channels: [], topics: [], categories: [] },
      meta: { totalResults: 0, usedSemanticLane: false },
    };
  }

  const videos = Array.from(groupVideos().values())
    .map((video) => toVideoGroup(video, regex))
    .filter((group): group is RankedGroup => Boolean(group))
    .sort(sortGroups);

  const knowledge = collectKnowledgeGroups(regex).sort(sortGroups);
  const combined = [...videos, ...knowledge].sort(sortGroups);

  return {
    query: normalizedQuery,
    blended: combined.slice(0, limit),
    grouped: {
      videos: videos.slice(0, limit),
      knowledge: knowledge.slice(0, limit),
    },
    availableFilters: buildAvailableFilters(combined),
    meta: {
      totalResults: combined.length,
      usedSemanticLane: false,
    },
  };
}
