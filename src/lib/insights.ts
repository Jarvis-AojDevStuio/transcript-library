import fs from "node:fs";
import path from "node:path";
import {
  insightDir,
  analysisPath,
  insightsBaseDir,
  legacyStderrLogPath,
  legacyStdoutLogPath,
  metadataCachePath,
  readRunMetadata,
  runMetadataPath,
  stderrLogPath,
  stdoutLogPath,
} from "@/lib/analysis";
import { curateYouTubeAnalyzer } from "@/lib/curation";

const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{6,11}$/;

export function insightPaths(videoId: string) {
  if (!VIDEO_ID_RE.test(videoId)) throw new Error(`Invalid videoId: ${videoId}`);
  const dir = insightDir(videoId);
  return {
    dir,
    analysis: analysisPath(videoId),
    legacy: `${insightsBaseDir()}/${videoId}.md`,
  };
}

/** TTL-based cache: directory mtime misses nested file changes on APFS/ext4. */
const CACHE_TTL_MS = 5_000;
let _insightSetCache: { expiresAt: number; ids: Set<string> } | undefined;

function buildInsightSet(): Set<string> {
  const base = insightsBaseDir();
  const ids = new Set<string>();
  try {
    const entries = fs.readdirSync(base, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith(".")) continue;
      if (e.isDirectory()) {
        // Canonical: data/insights/{videoId}/analysis.md
        if (fs.existsSync(analysisPath(e.name))) {
          ids.add(e.name);
        }
      } else if (e.isFile() && e.name.endsWith(".md")) {
        // Legacy: data/insights/{videoId}.md
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
  try {
    const md = fs.readFileSync(p.analysis, "utf8");
    return { kind: "analysis", markdown: md, path: p.analysis };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      console.debug("Unexpected error reading analysis:", err);
    }
  }

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

export function getInsightArtifacts(videoId: string): {
  canonicalPath: string;
  canonicalFileName: string;
  displayPath: string | null;
  displayFileName: string | null;
  metadataPath: string;
  metadataFileName: string;
  runPath: string;
  runFileName: string;
  stdoutPath: string;
  stdoutFileName: string;
  stderrPath: string;
  stderrFileName: string;
} {
  const dir = insightDir(videoId);
  let displayPath: string | null = null;

  try {
    const entries = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "analysis.md")
      .sort((a, b) => a.name.localeCompare(b.name));

    if (entries[0]) {
      displayPath = path.join(dir, entries[0].name);
    }
  } catch {}

  const canonicalPath = analysisPath(videoId);
  const metaPath = metadataCachePath(videoId);
  const runPath = runMetadataPath(videoId);
  const outPath = fs.existsSync(stdoutLogPath(videoId)) ? stdoutLogPath(videoId) : legacyStdoutLogPath(videoId);
  const errPath = fs.existsSync(stderrLogPath(videoId)) ? stderrLogPath(videoId) : legacyStderrLogPath(videoId);

  return {
    canonicalPath,
    canonicalFileName: path.basename(canonicalPath),
    displayPath,
    displayFileName: displayPath ? path.basename(displayPath) : null,
    metadataPath: metaPath,
    metadataFileName: path.basename(metaPath),
    runPath,
    runFileName: path.basename(runPath),
    stdoutPath: outPath,
    stdoutFileName: path.basename(outPath),
    stderrPath: errPath,
    stderrFileName: path.basename(errPath),
  };
}

function readTail(filePath: string, maxBytes: number): string {
  try {
    const stat = fs.statSync(filePath);
    const start = Math.max(0, stat.size - maxBytes);
    const fd = fs.openSync(filePath, "r");
    try {
      const buffer = Buffer.alloc(stat.size - start);
      fs.readSync(fd, buffer, 0, buffer.length, start);
      return buffer.toString("utf8");
    } finally {
      fs.closeSync(fd);
    }
  } catch {
    return "";
  }
}

export function readInsightLogTail(
  videoId: string,
  maxBytes = 12_000,
): {
  stdout: string;
  stderr: string;
} {
  const stdoutPath = fs.existsSync(stdoutLogPath(videoId)) ? stdoutLogPath(videoId) : legacyStdoutLogPath(videoId);
  const stderrPath = fs.existsSync(stderrLogPath(videoId)) ? stderrLogPath(videoId) : legacyStderrLogPath(videoId);
  return {
    stdout: readTail(stdoutPath, maxBytes),
    stderr: readTail(stderrPath, maxBytes),
  };
}

export { readRunMetadata };

function stripFrontmatter(md: string) {
  if (!md.startsWith("---")) return md;
  const idx = md.indexOf("\n---", 3);
  if (idx === -1) return md;
  // consume the closing --- line
  const after = md.indexOf("\n", idx + 4);
  return after === -1 ? "" : md.slice(after + 1);
}

export function makePreview(md: string, maxChars = 260) {
  const curated = curateYouTubeAnalyzer(md);
  if (curated.summary) {
    const s = curated.summary.trim();
    if (s.length <= maxChars) return s;
    return s.slice(0, maxChars - 1).trimEnd() + "…";
  }

  const body = stripFrontmatter(md)
    .replace(/\r/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#+\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Prefer first non-empty paragraph.
  const paras = body
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const first = paras[0] || "";
  const oneLine = first.replace(/\s+/g, " ").trim();
  if (oneLine.length <= maxChars) return oneLine;
  return oneLine.slice(0, maxChars - 1).trimEnd() + "…";
}
