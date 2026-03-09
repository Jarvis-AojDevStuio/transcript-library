/**
 * Metadata enrichment and prompt construction for headless YouTube analysis.
 *
 * Derives content type and enriched metadata for a video from the transcript
 * repo's `info.json` files, yt-dlp, or cached `video-metadata.json`, then
 * builds the structured prompt passed to the provider CLI.
 *
 * @module headless-youtube-analysis
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { metadataCachePath } from "@/lib/analysis";

/**
 * Broad content classification used to select the analysis template.
 * @typedef {"tutorial"|"finance"|"sermon"|"commentary"|"interview"|"case-study"|"general"} ContentType
 */
export type ContentType =
  | "tutorial"
  | "finance"
  | "sermon"
  | "commentary"
  | "interview"
  | "case-study"
  | "general";

/**
 * Fully enriched video metadata written to `video-metadata.json` and used to
 * build the analysis prompt.
 * @typedef {Object} CachedVideoMetadata
 * @property {number} schemaVersion - Schema version for forward-compatibility checks
 * @property {"repo-info-json"|"yt-dlp"|"fallback"} source - Where the metadata was sourced from
 * @property {string} videoId - YouTube video ID
 * @property {string} title - Video title
 * @property {string} channel - Channel name
 * @property {string} topic - Topic/category label
 * @property {string} publishedDate - ISO publication date string
 * @property {string} sourceUrl - Full YouTube watch URL
 * @property {number} [durationSeconds] - Video duration in seconds
 * @property {string} [description] - Video description text
 * @property {string[]} githubRepos - GitHub repo URLs extracted from the description
 * @property {ContentType} contentType - Derived content classification
 * @property {"standard"} analysisDepth - Analysis depth (always "standard")
 * @property {string} updatedAt - ISO timestamp when this record was last written
 */
export type CachedVideoMetadata = {
  schemaVersion: number;
  source: "repo-info-json" | "yt-dlp" | "fallback";
  videoId: string;
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
  sourceUrl: string;
  durationSeconds?: number;
  description?: string;
  githubRepos: string[];
  contentType: ContentType;
  analysisDepth: "standard";
  updatedAt: string;
};

/**
 * Alias for `CachedVideoMetadata` used as the prompt-building input type.
 * @typedef {CachedVideoMetadata} HeadlessAnalysisMeta
 */
export type HeadlessAnalysisMeta = CachedVideoMetadata;

const SKILL_PATH = path.join(
  process.cwd(),
  ".claude",
  "skills",
  "HeadlessYouTubeAnalysis",
  "SKILL.md",
);
const METADATA_SCHEMA_VERSION = 2;

const GITHUB_REPO_RE =
  /https?:\/\/(?:www\.)?github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)(?:\/[^\s)\]]*)?/gi;

const TUTORIAL_CHANNELS = new Set([
  "IndyDevDan",
  "John Kim",
  "Eric Tech",
  "Alejandro AO",
  "Matt Pocock",
  "DevOps & AI Toolkit",
  "Better Stack",
  "AI Native Dev",
  "How I AI",
  "Dustin Vannoy",
  "IBM Technology",
]);

const FINANCE_CHANNELS = new Set([
  "Paycheck To Portfolio",
  "Ticker Symbol: YOU",
  "Heresy Financial",
  "Benjamin Cowen",
  "Excess Returns",
  "Investing Simplified - Professor G",
]);

const SERMON_CHANNELS = new Set([
  "Pastor Poju Oyemade",
  "Craig Groeschel",
  "Biodun Fatoyinbo",
  "Munroe Recaps ",
]);

/**
 * Reads a file as UTF-8, returning null on any error.
 * @param {string} filePath - Absolute path to read
 * @returns {string|null} File contents, or null if unreadable
 * @internal
 */
function safeRead(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

/**
 * Serialises `value` as pretty-printed JSON and writes it to `filePath`,
 * creating parent directories as needed.
 * @param {string} filePath - Absolute path to write
 * @param {unknown} value - Value to serialise
 * @internal
 */
function safeWriteJson(filePath: string, value: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

/**
 * Parses YAML frontmatter from a markdown string.
 * Returns an empty object if no valid frontmatter is found.
 * Only handles simple `key: value` lines; does not support nested YAML.
 * @param {string} markdown - Markdown string that may start with `---`
 * @returns {Record<string, string>} Parsed key-value pairs from frontmatter
 * @internal
 */
function parseFrontmatter(markdown: string): Record<string, string> {
  const normalized = markdown.replace(/\r/g, "");
  if (!normalized.startsWith("---\n")) return {};
  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) return {};

  const frontmatter = normalized.slice(4, end).trim();
  const out: Record<string, string> = {};
  for (const line of frontmatter.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key) out[key] = value;
  }
  return out;
}

/**
 * Derives a `ContentType` classification from video title, channel, and topic.
 * Uses channel allow-lists first, then keyword heuristics on a combined
 * haystack, then topic overrides. Falls back to `"general"`.
 * @param {string} title - Video title
 * @param {string} channel - Channel name
 * @param {string} topic - Topic/category label
 * @returns {ContentType} Derived content type
 */
export function deriveContentType(title: string, channel: string, topic: string): ContentType {
  const normalizedTitle = title.toLowerCase();
  const normalizedChannel = channel.toLowerCase();
  const normalizedTopic = topic.toLowerCase();
  const haystack = `${normalizedTitle} ${normalizedChannel} ${normalizedTopic}`;

  if (TUTORIAL_CHANNELS.has(channel)) return "tutorial";
  if (FINANCE_CHANNELS.has(channel)) return "finance";
  if (SERMON_CHANNELS.has(channel) || normalizedTopic === "faith") return "sermon";

  if (
    /(tutorial|walkthrough|guide|setup|build|how to|hands-on|full course|playbook|demo)/.test(
      haystack,
    )
  ) {
    return "tutorial";
  }
  if (
    /(finance|invest|investing|stocks|market|valuation|dividend|portfolio|palantir|bitcoin|tariff|earnings|margin)/.test(
      haystack,
    )
  ) {
    return "finance";
  }
  if (/(sermon|prayer|kingdom|scripture|church|pastor|faith|gospel)/.test(haystack)) {
    return "sermon";
  }
  if (
    /(interview|podcast|conversation|qa|q&a|featuring|founder story|interview with|sit down with|talks with|speaks with)/.test(
      haystack,
    )
  ) {
    return "interview";
  }
  if (/(case study|breakdown|postmortem|what happened|inside|deconstruct)/.test(haystack)) {
    return "case-study";
  }
  if (/(news|opinion|explained|why|commentary|analysis|reaction|state of)/.test(haystack)) {
    return "commentary";
  }
  if (["software-engineering", "ai-llms"].includes(normalizedTopic)) {
    return "tutorial";
  }

  return "general";
}

/**
 * Extracts unique, normalised GitHub repository URLs from a text string.
 * Strips `.git` suffixes and deduplicates results.
 * @param {string|undefined} text - Text to search, e.g. a video description
 * @returns {string[]} Sorted array of canonical `https://github.com/owner/repo` URLs
 */
export function extractGithubRepos(text: string | undefined): string[] {
  if (!text) return [];
  const repos = new Set<string>();
  for (const match of text.matchAll(GITHUB_REPO_RE)) {
    const repo = match[1]?.replace(/\.git$/i, "");
    if (repo) repos.add(`https://github.com/${repo}`);
  }
  return Array.from(repos).sort((a, b) => a.localeCompare(b));
}

/**
 * Returns the absolute path to the `{videoId}.info.json` file in the
 * transcript repo's inbox directory.
 * @param {string} videoId - YouTube video ID
 * @param {string} repoRoot - Absolute path to the transcript repo root
 * @returns {string} Absolute path to the info JSON file
 * @internal
 */
function repoInfoPath(videoId: string, repoRoot: string): string {
  return path.join(repoRoot, "youtube-transcripts", "inbox", `${videoId}.info.json`);
}

/**
 * Reads and validates the cached `video-metadata.json` for a video.
 * Returns null if the file is absent, unparseable, or has a stale schema version.
 * @param {string} videoId - YouTube video ID
 * @returns {CachedVideoMetadata|null} Cached metadata, or null if unavailable
 * @internal
 */
function loadCachedMetadata(videoId: string): CachedVideoMetadata | null {
  const raw = safeRead(metadataCachePath(videoId));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<CachedVideoMetadata>;
    if (parsed.schemaVersion !== METADATA_SCHEMA_VERSION) return null;
    return parsed as CachedVideoMetadata;
  } catch {
    return null;
  }
}

/**
 * Reads and parses the `{videoId}.info.json` file from the transcript repo's
 * inbox directory. Returns null if the file is absent or unparseable.
 * @param {string} videoId - YouTube video ID
 * @param {string} repoRoot - Absolute path to the transcript repo root
 * @returns {Record<string, unknown>|null} Parsed JSON object, or null
 * @internal
 */
function loadInfoJson(videoId: string, repoRoot: string): Record<string, unknown> | null {
  const raw = safeRead(repoInfoPath(videoId, repoRoot));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Invokes `yt-dlp --dump-single-json` for a YouTube URL and returns the parsed
 * metadata object. Returns null if yt-dlp is unavailable, times out, or the
 * output cannot be parsed.
 * @param {string} sourceUrl - Full YouTube watch URL
 * @returns {Record<string, unknown>|null} Parsed yt-dlp metadata, or null
 * @internal
 */
function fetchYoutubeMetadata(sourceUrl: string): Record<string, unknown> | null {
  const result = spawnSync(
    "yt-dlp",
    ["--dump-single-json", "--skip-download", "--no-warnings", sourceUrl],
    {
      encoding: "utf8",
      timeout: 15000,
      maxBuffer: 8 * 1024 * 1024,
    },
  );

  if (result.status !== 0 || !result.stdout) return null;
  try {
    return JSON.parse(result.stdout) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Builds and caches enriched `HeadlessAnalysisMeta` for a video.
 *
 * Resolution order:
 * 1. Cached `video-metadata.json` (if schema version matches)
 * 2. `{videoId}.info.json` from the transcript repo inbox
 * 3. yt-dlp live fetch
 * 4. Fallback using only the supplied input fields
 *
 * Writes the resolved metadata to `video-metadata.json` before returning.
 *
 * @param {{ videoId: string, title: string, channel: string, topic: string,
 *   publishedDate: string, transcriptPartPath?: string, repoRoot: string }} input - Input metadata
 * @returns {HeadlessAnalysisMeta} Fully enriched metadata for prompt building
 */
export function enrichAnalysisMeta(input: {
  videoId: string;
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
  transcriptPartPath?: string;
  repoRoot: string;
}): HeadlessAnalysisMeta {
  const cached = loadCachedMetadata(input.videoId);
  if (cached) return cached;

  const frontmatter = input.transcriptPartPath
    ? parseFrontmatter(safeRead(input.transcriptPartPath) ?? "")
    : {};

  const sourceUrl =
    frontmatter.youtube_url ||
    `https://www.youtube.com/watch?v=${encodeURIComponent(input.videoId)}`;

  const durationFromFrontmatter = Number.parseInt(frontmatter.duration || "", 10);
  const repoInfo = loadInfoJson(input.videoId, input.repoRoot);
  const ytMetadata = repoInfo ?? fetchYoutubeMetadata(sourceUrl);

  const description =
    (typeof ytMetadata?.description === "string" && ytMetadata.description) || undefined;

  const githubRepos = extractGithubRepos(description);
  const durationSeconds = Number.isFinite(durationFromFrontmatter)
    ? durationFromFrontmatter
    : typeof ytMetadata?.duration === "number"
      ? ytMetadata.duration
      : undefined;

  const meta: CachedVideoMetadata = {
    schemaVersion: METADATA_SCHEMA_VERSION,
    source: repoInfo ? "repo-info-json" : ytMetadata ? "yt-dlp" : "fallback",
    videoId: input.videoId,
    title: input.title,
    channel: input.channel,
    topic: input.topic,
    publishedDate: input.publishedDate,
    sourceUrl,
    durationSeconds,
    description,
    githubRepos,
    contentType: deriveContentType(input.title, input.channel, input.topic),
    analysisDepth: "standard",
    updatedAt: new Date().toISOString(),
  };

  safeWriteJson(metadataCachePath(input.videoId), meta);
  return meta;
}

/**
 * Builds the full prompt string passed to the provider CLI for a headless
 * analysis run. Embeds the local skill specification, resolved metadata, and
 * the full transcript.
 * @param {HeadlessAnalysisMeta} meta - Enriched video metadata
 * @param {string} transcript - Full transcript text
 * @returns {string} Prompt string to pipe into the provider's stdin
 */
export function buildHeadlessAnalysisPrompt(
  meta: HeadlessAnalysisMeta,
  transcript: string,
): string {
  const skillSpec = safeRead(SKILL_PATH) ?? "";
  const description = meta.description?.trim() || "Not available.";
  const githubRepos = meta.githubRepos.length ? meta.githubRepos.join("\n") : "None detected.";

  return [
    "You are running a repo-local headless YouTube analysis workflow.",
    "Follow the local skill specification exactly and do not ask any clarifying questions.",
    "Return markdown only.",
    "",
    "[Local Skill Specification]",
    skillSpec,
    "",
    "[Resolved Inputs]",
    `videoId: ${meta.videoId}`,
    `title: ${meta.title}`,
    `channel: ${meta.channel}`,
    `topic: ${meta.topic}`,
    `publishedDate: ${meta.publishedDate || "Unknown"}`,
    `sourceUrl: ${meta.sourceUrl}`,
    `durationSeconds: ${meta.durationSeconds ?? "Unknown"}`,
    `contentType: ${meta.contentType}`,
    `analysisDepth: ${meta.analysisDepth}`,
    "description:",
    description,
    "",
    "githubRepos:",
    githubRepos,
    "",
    "[Instructions]",
    "- Use the provided contentType and standard depth; do not invent alternate modes.",
    "- If githubRepos are provided, mention them only in terms supported by title/description/transcript.",
    "- If the transcript is incomplete or noisy, note that in caveats and continue.",
    "- Make the output directly useful inside a transcript library UI.",
    "- CRITICAL: Your output must start with --- (the YAML frontmatter delimiter). Do NOT wrap your output in ```md or ``` code fences. The output is rendered directly as markdown in a web viewer — code fences will break the rendering.",
    "",
    "[Transcript]",
    transcript,
  ].join("\n");
}
