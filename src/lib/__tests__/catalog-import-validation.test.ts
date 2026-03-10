import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { rebuildCatalogFromCsv } from "@/lib/catalog-import";

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

function writeCsv(tempRoot: string, rows: string[][]): string {
  const csvPath = path.join(tempRoot, "videos" + ".csv");
  fs.writeFileSync(csvPath, [catalogCsvHeader, ...rows.map((row) => row.join(","))].join("\n"));
  return csvPath;
}

describe("catalog importer validation", () => {
  it("rejects rows missing a canonical video id", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-invalid-id-"));
    const csvPath = writeCsv(tempRoot, [
      ["", "", "No ID", "Channel", "topic", "2026-01-01", "2026-01-02", "100", "1", "1", "file.md"],
    ]);

    expect(() =>
      rebuildCatalogFromCsv({
        csvPath,
        liveDbPath: path.join(tempRoot, "catalog.db"),
      }),
    ).toThrow(/missing canonical video id/i);

    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("rejects rows with invalid chunk indexes or missing file paths", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-invalid-row-"));
    const csvPath = writeCsv(tempRoot, [
      [
        "video123",
        "",
        "Video",
        "Channel",
        "topic",
        "2026-01-01",
        "2026-01-02",
        "100",
        "0",
        "1",
        "",
      ],
    ]);

    expect(() =>
      rebuildCatalogFromCsv({
        csvPath,
        liveDbPath: path.join(tempRoot, "catalog.db"),
      }),
    ).toThrow(/chunk index|file path/i);

    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("rejects groups whose declared total chunks do not match imported parts", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-total-chunks-"));
    const csvPath = writeCsv(tempRoot, [
      [
        "video123",
        "",
        "Video",
        "Channel",
        "topic",
        "2026-01-01",
        "2026-01-02",
        "100",
        "1",
        "3",
        "file.md",
      ],
    ]);

    expect(() =>
      rebuildCatalogFromCsv({
        csvPath,
        liveDbPath: path.join(tempRoot, "catalog.db"),
      }),
    ).toThrow(/expected 3 parts/i);

    fs.rmSync(tempRoot, { recursive: true, force: true });
  });
});
