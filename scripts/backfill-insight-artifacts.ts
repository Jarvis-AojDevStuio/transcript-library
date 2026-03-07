import fs from "node:fs";
import path from "node:path";
import { getVideo } from "@/modules/catalog";
import {
  analysisPath,
  displayAnalysisPath,
  insightDir,
  insightsBaseDir,
  metadataCachePath,
} from "@/modules/analysis";

function readJson(filePath: string): Record<string, unknown> | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function resolveTitle(videoId: string): string | null {
  const video = getVideo(videoId);
  if (video?.title) return video.title;

  const meta = readJson(metadataCachePath(videoId));
  if (typeof meta?.title === "string" && meta.title) return meta.title;

  return null;
}

function ensureDisplayArtifact(videoId: string): string | null {
  const title = resolveTitle(videoId);
  const canonical = analysisPath(videoId);
  if (!title || !fs.existsSync(canonical)) return null;

  const display = displayAnalysisPath(videoId, title);
  if (!fs.existsSync(display)) {
    fs.copyFileSync(canonical, display);
  }
  return path.basename(display);
}

function migrateLegacyFlatInsight(videoId: string): string | null {
  const legacyFile = path.join(insightsBaseDir(), `${videoId}.md`);
  if (!fs.existsSync(legacyFile)) return null;

  const dir = insightDir(videoId);
  fs.mkdirSync(dir, { recursive: true });

  const canonical = analysisPath(videoId);
  if (!fs.existsSync(canonical)) {
    fs.copyFileSync(legacyFile, canonical);
  }

  const displayFile = ensureDisplayArtifact(videoId);
  return displayFile ?? path.basename(canonical);
}

function main() {
  const base = insightsBaseDir();
  fs.mkdirSync(base, { recursive: true });

  const entries = fs.readdirSync(base, { withFileTypes: true });
  const created: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const display = ensureDisplayArtifact(entry.name);
      if (display) created.push(`${entry.name}/${display}`);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      const videoId = entry.name.slice(0, -3);
      const artifact = migrateLegacyFlatInsight(videoId);
      if (artifact) created.push(`${videoId}/${artifact}`);
    }
  }

  console.log(JSON.stringify({
    updatedCount: created.length,
    artifacts: created.sort((a, b) => a.localeCompare(b)),
  }, null, 2));
}

main();
