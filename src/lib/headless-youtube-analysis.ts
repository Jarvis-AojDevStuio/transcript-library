import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

export type ContentType =
  | "tutorial"
  | "finance"
  | "sermon"
  | "commentary"
  | "interview"
  | "case-study"
  | "general";

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

export type HeadlessAnalysisMeta = CachedVideoMetadata;

const SKILL_PATH = path.join(
  process.cwd(),
  ".claude",
  "skills",
  "HeadlessYouTubeAnalysis",
  "SKILL.md",
);
const METADATA_SCHEMA_VERSION = 2;

const GITHUB_REPO_RE = /https?:\/\/(?:www\.)?github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)(?:\/[^\s)\]]*)?/gi;

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

function safeRead(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function safeWriteJson(filePath: string, value: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

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

export function deriveContentType(title: string, channel: string, topic: string): ContentType {
  const normalizedTitle = title.toLowerCase();
  const normalizedChannel = channel.toLowerCase();
  const normalizedTopic = topic.toLowerCase();
  const haystack = `${normalizedTitle} ${normalizedChannel} ${normalizedTopic}`;

  if (TUTORIAL_CHANNELS.has(channel)) return "tutorial";
  if (FINANCE_CHANNELS.has(channel)) return "finance";
  if (SERMON_CHANNELS.has(channel) || normalizedTopic === "faith") return "sermon";

  if (/(tutorial|walkthrough|guide|setup|build|how to|hands-on|full course|playbook|demo)/.test(haystack)) {
    return "tutorial";
  }
  if (/(finance|invest|investing|stocks|market|valuation|dividend|portfolio|palantir|bitcoin|tariff|earnings|margin)/.test(haystack)) {
    return "finance";
  }
  if (/(sermon|prayer|kingdom|scripture|church|pastor|faith|gospel)/.test(haystack)) {
    return "sermon";
  }
  if (/(interview|podcast|conversation|qa|q&a|featuring|founder story|interview with|sit down with|talks with|speaks with)/.test(haystack)) {
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

export function extractGithubRepos(text: string | undefined): string[] {
  if (!text) return [];
  const repos = new Set<string>();
  for (const match of text.matchAll(GITHUB_REPO_RE)) {
    const repo = match[1]?.replace(/\.git$/i, "");
    if (repo) repos.add(`https://github.com/${repo}`);
  }
  return Array.from(repos).sort((a, b) => a.localeCompare(b));
}

function repoInfoPath(videoId: string, repoRoot: string): string {
  return path.join(repoRoot, "youtube-transcripts", "inbox", `${videoId}.info.json`);
}

function metadataCachePath(videoId: string): string {
  return path.join(process.cwd(), "data", "insights", videoId, "video-metadata.json");
}

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

function loadInfoJson(videoId: string, repoRoot: string): Record<string, unknown> | null {
  const raw = safeRead(repoInfoPath(videoId, repoRoot));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

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

export function buildHeadlessAnalysisPrompt(meta: HeadlessAnalysisMeta, transcript: string): string {
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
