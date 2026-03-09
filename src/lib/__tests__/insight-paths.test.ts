import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { metadataCachePath } from "@/lib/analysis";
import { enrichAnalysisMeta } from "@/lib/headless-youtube-analysis";
import { insightPaths } from "@/lib/insights";

const originalInsightsBaseDir = process.env.INSIGHTS_BASE_DIR;

afterEach(() => {
  if (originalInsightsBaseDir === undefined) {
    delete process.env.INSIGHTS_BASE_DIR;
  } else {
    process.env.INSIGHTS_BASE_DIR = originalInsightsBaseDir;
  }
});

describe("insight path helpers", () => {
  it("resolves insight paths under /srv/transcript-library/insights when configured", () => {
    process.env.INSIGHTS_BASE_DIR = "/srv/transcript-library/insights";

    expect(insightPaths("abc123xyz89")).toEqual({
      dir: "/srv/transcript-library/insights/abc123xyz89",
      analysis: "/srv/transcript-library/insights/abc123xyz89/analysis.md",
      legacy: "/srv/transcript-library/insights/abc123xyz89.md",
    });
    expect(metadataCachePath("abc123xyz89")).toBe(
      "/srv/transcript-library/insights/abc123xyz89/video-metadata.json",
    );
  });

  it("writes enriched metadata under the configured insights root", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "insights-base-dir-"));
    process.env.INSIGHTS_BASE_DIR = tmpDir;

    const meta = enrichAnalysisMeta({
      videoId: "abc123xyz89",
      title: "Configurable Insight Paths",
      channel: "Transcript Library",
      topic: "software-engineering",
      publishedDate: "2026-03-09",
      repoRoot: tmpDir,
    });

    expect(meta.videoId).toBe("abc123xyz89");
    expect(fs.existsSync(path.join(tmpDir, "abc123xyz89", "video-metadata.json"))).toBe(true);
  });

  it("rejects unsafe video IDs before building filesystem paths", () => {
    expect(() => insightPaths("../escape")).toThrow("Invalid videoId");
    expect(() => metadataCachePath("../escape")).toThrow("Invalid videoId");
  });
});
