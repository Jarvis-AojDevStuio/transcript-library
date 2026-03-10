import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { rebuildCatalogFromCsv } from "@/lib/catalog-import";

const originalCatalogDbPath = process.env.CATALOG_DB_PATH;
const originalRepoRoot = process.env.PLAYLIST_TRANSCRIPTS_REPO;
const csvHeader = [
  "video_id",
  "parent_video_id",
  "title",
  "channel",
  "topic",
  "published_date",
  "ingested_date",
  "word_count",
  "chunk",
  "total_chunks",
  "file_path",
].join(",");

function createFixtureRepo(rows: string[][]) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-home-grouping-"));
  const transcriptsRoot = path.join(root, "youtube-transcripts");
  const indexRoot = path.join(transcriptsRoot, "index");
  fs.mkdirSync(indexRoot, { recursive: true });
  fs.writeFileSync(
    path.join(indexRoot, "videos" + ".csv"),
    [csvHeader, ...rows.map((row) => row.join(","))].join("\n"),
  );
  return { root, liveDbPath: path.join(root, "data", "catalog", "catalog.db") };
}

async function loadCatalog() {
  vi.resetModules();
  return import("@/lib/catalog");
}

afterEach(() => {
  vi.resetModules();
  if (originalCatalogDbPath === undefined) {
    delete process.env.CATALOG_DB_PATH;
  } else {
    process.env.CATALOG_DB_PATH = originalCatalogDbPath;
  }

  if (originalRepoRoot === undefined) {
    delete process.env.PLAYLIST_TRANSCRIPTS_REPO;
  } else {
    process.env.PLAYLIST_TRANSCRIPTS_REPO = originalRepoRoot;
  }
});

describe("catalog home grouping", () => {
  it("builds one canonical video per videoId for home-page stats and grouping", async () => {
    const fixture = createFixtureRepo([
      [
        "chunk-2",
        "merge-me",
        "Merged Session",
        "Channel Home",
        "systems",
        "2026-02-11",
        "2026-02-12",
        "200",
        "2",
        "2",
        "home/part-2.md",
      ],
      [
        "chunk-1",
        "merge-me",
        "Merged Session",
        "Channel Home",
        "systems",
        "2026-02-11",
        "2026-02-12",
        "300",
        "1",
        "2",
        "home/part-1.md",
      ],
      [
        "solo-home",
        "",
        "Solo Session",
        "Channel Home",
        "research",
        "2026-01-05",
        "2026-01-06",
        "150",
        "1",
        "1",
        "home/solo.md",
      ],
      [
        "other-home",
        "",
        "Outside Session",
        "Channel Elsewhere",
        "design",
        "2026-03-01",
        "2026-03-02",
        "450",
        "1",
        "1",
        "elsewhere/outside.md",
      ],
    ]);

    process.env.PLAYLIST_TRANSCRIPTS_REPO = fixture.root;
    process.env.CATALOG_DB_PATH = fixture.liveDbPath;
    rebuildCatalogFromCsv();

    const { groupVideos, listChannels } = await loadCatalog();
    const videos = Array.from(groupVideos().values());

    expect(videos.map((video) => video.videoId)).toEqual(["other-home", "merge-me", "solo-home"]);
    expect(videos.find((video) => video.videoId === "merge-me")?.parts).toHaveLength(2);

    expect(listChannels().map((channel) => channel.channel)).toEqual([
      "Channel Elsewhere",
      "Channel Home",
    ]);

    expect(listChannels().find((channel) => channel.channel === "Channel Home")).toEqual({
      channel: "Channel Home",
      topics: ["systems", "research"],
      videoCount: 2,
      lastPublishedDate: "2026-02-11",
    });

    fs.rmSync(fixture.root, { recursive: true, force: true });
  });
});
