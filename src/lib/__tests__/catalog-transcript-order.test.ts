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
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-transcript-order-"));
  const transcriptsRoot = path.join(root, "youtube-transcripts");
  const indexRoot = path.join(transcriptsRoot, "index");
  fs.mkdirSync(indexRoot, { recursive: true });
  fs.mkdirSync(path.join(transcriptsRoot, "transcripts", "ordered"), { recursive: true });
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

describe("catalog transcript ordering", () => {
  it("returns transcript parts in chunk order and resolves transcript paths from the repo root", async () => {
    const fixture = createFixtureRepo([
      [
        "ordered-3",
        "video-ordered",
        "Ordered Video",
        "Channel Ordered",
        "teaching",
        "2026-03-01",
        "2026-03-02",
        "90",
        "3",
        "3",
        "transcripts/ordered/part-3.md",
      ],
      [
        "ordered-1",
        "video-ordered",
        "Ordered Video",
        "Channel Ordered",
        "teaching",
        "2026-03-01",
        "2026-03-02",
        "120",
        "1",
        "3",
        "transcripts/ordered/part-1.md",
      ],
      [
        "ordered-2",
        "video-ordered",
        "Ordered Video",
        "Channel Ordered",
        "teaching",
        "2026-03-01",
        "2026-03-02",
        "110",
        "2",
        "3",
        "transcripts/ordered/part-2.md",
      ],
    ]);

    process.env.PLAYLIST_TRANSCRIPTS_REPO = fixture.root;
    process.env.CATALOG_DB_PATH = fixture.liveDbPath;
    rebuildCatalogFromCsv();

    const { absTranscriptPath, getVideo } = await loadCatalog();
    const video = getVideo("video-ordered");

    expect(video?.parts.map((part) => part.chunk)).toEqual([1, 2, 3]);
    expect(video?.parts.map((part) => part.filePath)).toEqual([
      "transcripts/ordered/part-1.md",
      "transcripts/ordered/part-2.md",
      "transcripts/ordered/part-3.md",
    ]);
    expect(absTranscriptPath("transcripts/ordered/part-2.md")).toBe(
      path.join(fixture.root, "youtube-transcripts", "transcripts/ordered/part-2.md"),
    );

    fs.rmSync(fixture.root, { recursive: true, force: true });
  });
});
