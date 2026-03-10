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
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-repository-"));
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

describe("catalog repository facade", () => {
  it("lists channels by latest publish date and preserves topic aggregation", async () => {
    const fixture = createFixtureRepo([
      [
        "vid-alpha-new",
        "",
        "Alpha New",
        "Channel Alpha",
        "engineering",
        "2026-03-03",
        "2026-03-04",
        "500",
        "1",
        "1",
        "alpha/new.md",
      ],
      [
        "vid-alpha-old",
        "",
        "Alpha Old",
        "Channel Alpha",
        "systems",
        "2026-02-01",
        "2026-02-02",
        "420",
        "1",
        "1",
        "alpha/old.md",
      ],
      [
        "vid-beta",
        "",
        "Beta",
        "Channel Beta",
        "research",
        "2026-03-01",
        "2026-03-02",
        "390",
        "1",
        "1",
        "beta/main.md",
      ],
    ]);

    process.env.PLAYLIST_TRANSCRIPTS_REPO = fixture.root;
    process.env.CATALOG_DB_PATH = fixture.liveDbPath;
    rebuildCatalogFromCsv();

    const { listChannels } = await loadCatalog();

    expect(listChannels()).toEqual([
      {
        channel: "Channel Alpha",
        topics: ["engineering", "systems"],
        videoCount: 2,
        lastPublishedDate: "2026-03-03",
      },
      {
        channel: "Channel Beta",
        topics: ["research"],
        videoCount: 1,
        lastPublishedDate: "2026-03-01",
      },
    ]);

    fs.rmSync(fixture.root, { recursive: true, force: true });
  });

  it("filters channel videos and looks up canonical videos by videoId", async () => {
    const fixture = createFixtureRepo([
      [
        "part-b",
        "video-777",
        "Deep Dive",
        "Channel Gamma",
        "ai",
        "2026-03-07",
        "2026-03-08",
        "250",
        "2",
        "2",
        "gamma/part-2.md",
      ],
      [
        "part-a",
        "video-777",
        "Deep Dive",
        "Channel Gamma",
        "ai",
        "2026-03-07",
        "2026-03-08",
        "300",
        "1",
        "2",
        "gamma/part-1.md",
      ],
      [
        "solo-888",
        "",
        "One Shot",
        "Channel Gamma",
        "ops",
        "2026-03-01",
        "2026-03-02",
        "600",
        "1",
        "1",
        "gamma/solo.md",
      ],
      [
        "other-999",
        "",
        "Outside",
        "Channel Delta",
        "news",
        "2026-02-27",
        "2026-02-28",
        "480",
        "1",
        "1",
        "delta/outside.md",
      ],
    ]);

    process.env.PLAYLIST_TRANSCRIPTS_REPO = fixture.root;
    process.env.CATALOG_DB_PATH = fixture.liveDbPath;
    rebuildCatalogFromCsv();

    const { getVideo, listVideosByChannel } = await loadCatalog();

    expect(listVideosByChannel("Channel Gamma").map((video) => video.videoId)).toEqual([
      "video-777",
      "solo-888",
    ]);

    expect(getVideo("video-777")).toEqual({
      videoId: "video-777",
      title: "Deep Dive",
      channel: "Channel Gamma",
      topic: "ai",
      publishedDate: "2026-03-07",
      ingestedDate: "2026-03-08",
      totalChunks: 2,
      parts: [
        { chunk: 1, wordCount: 300, filePath: "gamma/part-1.md" },
        { chunk: 2, wordCount: 250, filePath: "gamma/part-2.md" },
      ],
    });

    expect(getVideo("missing-video")).toBeUndefined();

    fs.rmSync(fixture.root, { recursive: true, force: true });
  });
});
