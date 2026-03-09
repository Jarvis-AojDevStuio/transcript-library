import path from "node:path";

const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{6,11}$/;

export function isValidVideoId(id: string): boolean {
  return VIDEO_ID_RE.test(id);
}

function assertValidVideoId(videoId: string): string {
  if (!isValidVideoId(videoId)) {
    throw new Error(`Invalid videoId: ${videoId}`);
  }

  return videoId;
}

export function insightsBaseDir(): string {
  const configured = process.env.INSIGHTS_BASE_DIR?.trim();
  if (configured) {
    return path.resolve(configured);
  }

  return path.join(process.cwd(), "data", "insights");
}

export function insightDir(videoId: string): string {
  return path.join(insightsBaseDir(), assertValidVideoId(videoId));
}

export function analysisPath(videoId: string): string {
  return path.join(insightDir(videoId), "analysis.md");
}

export function structuredAnalysisPath(videoId: string): string {
  return path.join(insightDir(videoId), "analysis.json");
}

export function metadataCachePath(videoId: string): string {
  return path.join(insightDir(videoId), "video-metadata.json");
}

export function legacyInsightPath(videoId: string): string {
  return path.join(insightsBaseDir(), `${assertValidVideoId(videoId)}.md`);
}

export function slugifyTitle(title: string): string {
  const normalized = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
  return normalized || "analysis";
}

export function displayAnalysisPath(videoId: string, title: string): string {
  return path.join(insightDir(videoId), `${slugifyTitle(title)}.md`);
}
