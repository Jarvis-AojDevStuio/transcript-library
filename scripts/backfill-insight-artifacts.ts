import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { analysisPath, displayAnalysisPath, insightsBaseDir, metadataCachePath } =
  require("../src/lib/insight-paths.ts") as typeof import("../src/lib/insight-paths");

function readJson(filePath: string): Record<string, unknown> | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function readTitleFromFrontmatter(markdown: string): string | null {
  const normalized = markdown.replace(/\r/g, "");
  if (!normalized.startsWith("---\n")) return null;

  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) return null;

  const frontmatter = normalized.slice(4, end).split("\n");
  for (const line of frontmatter) {
    const match = line.match(/^title:\s*["']?(.*?)["']?\s*$/i);
    if (match?.[1]?.trim()) {
      return match[1].trim();
    }
  }

  return null;
}

export function resolveInsightTitle(videoId: string): string | null {
  const meta = readJson(metadataCachePath(videoId));
  if (typeof meta?.title === "string" && meta.title.trim()) return meta.title.trim();

  const analysis = analysisPath(videoId);
  if (fs.existsSync(analysis)) {
    const title = readTitleFromFrontmatter(fs.readFileSync(analysis, "utf8"));
    if (title) return title;
  }

  return null;
}

export function ensureDisplayArtifact(videoId: string): string | null {
  const title = resolveInsightTitle(videoId);
  const analysis = analysisPath(videoId);
  if (!title || !fs.existsSync(analysis)) return null;

  const display = displayAnalysisPath(videoId, title);
  if (!fs.existsSync(display)) {
    fs.copyFileSync(analysis, display);
  }

  return path.basename(display);
}

function main() {
  const base = insightsBaseDir();
  fs.mkdirSync(base, { recursive: true });

  const entries = fs.readdirSync(base, { withFileTypes: true });
  const created: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const display = ensureDisplayArtifact(entry.name);
    if (display) created.push(`${entry.name}/${display}`);
  }

  console.log(
    JSON.stringify(
      {
        updatedCount: created.length,
        artifacts: created.sort((a, b) => a.localeCompare(b)),
      },
      null,
      2,
    ),
  );
}

const isDirectExecution =
  typeof process.argv[1] === "string" &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectExecution) {
  main();
}
