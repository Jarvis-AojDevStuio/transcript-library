import fs from "node:fs";
import path from "node:path";
import { analysisPath, insightsBaseDir } from "@/lib/analysis";
import { readCatalogMap, resolveInsightPath } from "@/lib/catalog-map";
import { curateYouTubeAnalyzer } from "@/lib/curation";

const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{6,11}$/;

export function insightPaths(videoId: string) {
  if (!VIDEO_ID_RE.test(videoId)) throw new Error(`Invalid videoId: ${videoId}`);
  const base = insightsBaseDir();
  const mapped = resolveInsightPath(videoId);
  return {
    dir: mapped ? path.join(base, mapped) : path.join(base, videoId),
    analysis: mapped ? path.join(base, mapped, "analysis.md") : analysisPath(videoId),
    legacy: path.join(base, `${videoId}.md`),
  };
}

/** TTL-based cache: directory mtime misses nested file changes on APFS/ext4. */
const CACHE_TTL_MS = 5_000;
let _insightSetCache: { expiresAt: number; ids: Set<string> } | undefined;

function buildInsightSet(): Set<string> {
  const ids = new Set<string>();

  // Primary: catalog-map.json entries
  const map = readCatalogMap();
  const base = insightsBaseDir();
  for (const [videoId, entry] of Object.entries(map)) {
    const mappedAnalysis = path.join(
      base,
      entry.channel,
      `${entry.date}_${entry.slug}`,
      "analysis.md",
    );
    if (fs.existsSync(mappedAnalysis)) {
      ids.add(videoId);
    }
  }

  // Fallback: scan for unmigrated videoId directories and legacy flat files
  try {
    const entries = fs.readdirSync(base, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith(".")) continue;
      if (e.isDirectory()) {
        // Skip channel directories (already handled by catalog-map)
        if (fs.existsSync(path.join(base, e.name, "analysis.md"))) {
          ids.add(e.name);
        }
      } else if (e.isFile() && e.name.endsWith(".md")) {
        ids.add(e.name.slice(0, -3));
      }
    }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      console.debug("Unexpected error reading insights directory:", err);
    }
  }

  return ids;
}

function getInsightIds(): Set<string> {
  const now = Date.now();
  if (_insightSetCache && now < _insightSetCache.expiresAt) {
    return _insightSetCache.ids;
  }
  const ids = buildInsightSet();
  _insightSetCache = { expiresAt: now + CACHE_TTL_MS, ids };
  return ids;
}

export function hasInsight(videoId: string): boolean {
  return getInsightIds().has(videoId);
}

export function readInsightMarkdown(videoId: string): {
  kind: "analysis" | "legacy" | "none";
  markdown: string | null;
  path: string | null;
} {
  const p = insightPaths(videoId);

  // Tier 1: New catalog-map path (or videoId directory via insightPaths)
  try {
    const md = fs.readFileSync(p.analysis, "utf8");
    return { kind: "analysis", markdown: md, path: p.analysis };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      console.debug("Unexpected error reading analysis:", err);
    }
  }

  // Tier 2: Legacy videoId directory (if catalog-map redirected elsewhere)
  const base = insightsBaseDir();
  const videoIdAnalysis = path.join(base, videoId, "analysis.md");
  if (videoIdAnalysis !== p.analysis) {
    try {
      const md = fs.readFileSync(videoIdAnalysis, "utf8");
      return { kind: "analysis", markdown: md, path: videoIdAnalysis };
    } catch {
      // fall through
    }
  }

  // Tier 3: Legacy flat file
  try {
    const md = fs.readFileSync(p.legacy, "utf8");
    return { kind: "legacy", markdown: md, path: p.legacy };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      console.debug("Unexpected error reading legacy insight:", err);
    }
  }

  return { kind: "none", markdown: null, path: null };
}

function stripFrontmatter(md: string) {
  if (!md.startsWith("---")) return md;
  const idx = md.indexOf("\n---", 3);
  if (idx === -1) return md;
  const after = md.indexOf("\n", idx + 4);
  return after === -1 ? "" : md.slice(after + 1);
}

export function makePreview(md: string, maxChars = 260) {
  const curated = curateYouTubeAnalyzer(md);
  if (curated.summary) {
    const s = curated.summary.trim();
    if (s.length <= maxChars) return s;
    return s.slice(0, maxChars - 1).trimEnd() + "\u2026";
  }

  const body = stripFrontmatter(md)
    .replace(/\r/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#+\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const paras = body
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const first = paras[0] || "";
  const oneLine = first.replace(/\s+/g, " ").trim();
  if (oneLine.length <= maxChars) return oneLine;
  return oneLine.slice(0, maxChars - 1).trimEnd() + "\u2026";
}
