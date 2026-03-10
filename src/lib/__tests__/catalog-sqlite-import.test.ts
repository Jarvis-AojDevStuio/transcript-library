import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { rebuildCatalogFromCsv } from "@/lib/catalog-import";
import { bootstrapCatalogDb, catalogDbPath } from "@/lib/catalog-db";

const originalCatalogDbPath = process.env.CATALOG_DB_PATH;
const catalogCsvHeader = [
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

afterEach(() => {
  if (originalCatalogDbPath === undefined) {
    delete process.env.CATALOG_DB_PATH;
  } else {
    process.env.CATALOG_DB_PATH = originalCatalogDbPath;
  }
});

describe("catalog-db bootstrap", () => {
  it("defaults the live catalog DB under the app-owned data directory", () => {
    delete process.env.CATALOG_DB_PATH;

    expect(catalogDbPath()).toBe(path.resolve(process.cwd(), "data", "catalog", "catalog.db"));
  });

  it("creates the catalog schema in a configured writable location", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-db-"));
    process.env.CATALOG_DB_PATH = path.join(tempRoot, "catalog", "catalog.db");

    const db = bootstrapCatalogDb();

    try {
      const tables = db
        .prepare(
          `
            SELECT name
            FROM sqlite_master
            WHERE type = 'table' AND name IN ('catalog_videos', 'catalog_parts')
            ORDER BY name
          `,
        )
        .all() as Array<{ name: string }>;

      expect(tables).toEqual([{ name: "catalog_parts" }, { name: "catalog_videos" }]);
      expect(fs.existsSync(process.env.CATALOG_DB_PATH)).toBe(true);
    } finally {
      db.close();
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  });
});

describe("catalog sqlite importer", () => {
  it("imports canonical videos, ordered parts, and placeholder metadata into sqlite", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-import-"));
    const csvPath = path.join(tempRoot, "videos" + ".csv");
    const liveDbPath = path.join(tempRoot, "catalog", "catalog.db");

    fs.writeFileSync(
      csvPath,
      [
        catalogCsvHeader,
        [
          "solo123",
          "",
          "Single Part Video",
          "Channel Alpha",
          "engineering",
          "2026-02-02",
          "2026-02-03",
          "1200",
          "1",
          "1",
          "single/solo123.md",
        ].join(","),
        [
          "chunkA",
          "multi999",
          "Multipart Video",
          "Channel Beta",
          "research",
          "2026-02-05",
          "2026-02-06",
          "400",
          "2",
          "2",
          "multi/part-2.md",
        ].join(","),
        [
          "chunkB",
          "multi999",
          "Multipart Video",
          "Channel Beta",
          "research",
          "2026-02-05",
          "2026-02-06",
          "350",
          "1",
          "2",
          "multi/part-1.md",
        ].join(","),
        ["blank777", "", "", "", "", "", "", "275", "1", "1", "missing/meta.md"].join(","),
      ].join("\n"),
    );

    const result = rebuildCatalogFromCsv({ csvPath, liveDbPath });
    const db = bootstrapCatalogDb(liveDbPath);

    try {
      expect(result.videoCount).toBe(3);
      expect(result.partCount).toBe(4);

      const placeholder = db
        .prepare(
          `
            SELECT title, channel, topic, published_date, ingested_date
            FROM catalog_videos
            WHERE video_id = ?
          `,
        )
        .get("blank777") as Record<string, string>;

      expect(placeholder).toEqual({
        title: "Untitled video blank777",
        channel: "(unknown channel)",
        topic: "(uncategorized)",
        published_date: "0000-00-00",
        ingested_date: "0000-00-00",
      });

      const multipart = db
        .prepare(
          `
            SELECT video_id, total_chunks, source_row_count
            FROM catalog_videos
            WHERE video_id = ?
          `,
        )
        .get("multi999") as Record<string, number | string>;

      expect(multipart).toEqual({
        video_id: "multi999",
        total_chunks: 2,
        source_row_count: 2,
      });

      const parts = db
        .prepare(
          `
            SELECT chunk_index, file_path
            FROM catalog_parts
            WHERE video_id = ?
            ORDER BY chunk_index ASC
          `,
        )
        .all("multi999") as Array<{ chunk_index: number; file_path: string }>;

      expect(parts).toEqual([
        { chunk_index: 1, file_path: "multi/part-1.md" },
        { chunk_index: 2, file_path: "multi/part-2.md" },
      ]);
    } finally {
      db.close();
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  });

  it("keeps the last known good catalog DB when a rebuild fails validation", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-preserve-"));
    const goodCsvPath = path.join(tempRoot, "good.csv");
    const badCsvPath = path.join(tempRoot, "bad.csv");
    const liveDbPath = path.join(tempRoot, "catalog", "catalog.db");

    fs.writeFileSync(
      goodCsvPath,
      [
        catalogCsvHeader,
        [
          "stable123",
          "",
          "Stable Catalog",
          "Channel Stable",
          "ops",
          "2026-01-01",
          "2026-01-02",
          "200",
          "1",
          "1",
          "stable/file.md",
        ].join(","),
      ].join("\n"),
    );

    fs.writeFileSync(
      badCsvPath,
      [
        catalogCsvHeader,
        [
          "broken-a",
          "broken-parent",
          "Broken Catalog",
          "Channel Broken",
          "ops",
          "2026-01-01",
          "2026-01-02",
          "200",
          "1",
          "2",
          "broken/part-1.md",
        ].join(","),
        [
          "broken-b",
          "broken-parent",
          "Broken Catalog",
          "Channel Broken",
          "ops",
          "2026-01-01",
          "2026-01-02",
          "200",
          "1",
          "2",
          "broken/part-1-duplicate.md",
        ].join(","),
      ].join("\n"),
    );

    rebuildCatalogFromCsv({ csvPath: goodCsvPath, liveDbPath });

    expect(() => rebuildCatalogFromCsv({ csvPath: badCsvPath, liveDbPath })).toThrow(
      /duplicate chunk/i,
    );

    const db = bootstrapCatalogDb(liveDbPath);

    try {
      const rows = db
        .prepare("SELECT video_id, title FROM catalog_videos ORDER BY video_id ASC")
        .all() as Array<{ video_id: string; title: string }>;

      expect(rows).toEqual([{ video_id: "stable123", title: "Stable Catalog" }]);
    } finally {
      db.close();
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  });

  it("validates into a temp snapshot without replacing the live catalog when checkOnly is enabled", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-check-only-"));
    const csvPath = path.join(tempRoot, "videos" + ".csv");
    const liveDbPath = path.join(tempRoot, "catalog", "catalog.db");

    fs.writeFileSync(
      csvPath,
      [
        catalogCsvHeader,
        [
          "check123",
          "",
          "Check Only",
          "Channel Check",
          "testing",
          "2026-03-01",
          "2026-03-02",
          "150",
          "1",
          "1",
          "check/file.md",
        ].join(","),
      ].join("\n"),
    );

    const result = rebuildCatalogFromCsv({ csvPath, liveDbPath, checkOnly: true });

    expect(result.checkOnly).toBe(true);
    expect(fs.existsSync(liveDbPath)).toBe(false);

    fs.rmSync(tempRoot, { recursive: true, force: true });
  });
});
