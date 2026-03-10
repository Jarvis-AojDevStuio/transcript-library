import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import type { VideoRow } from "./catalog.ts";
import { catalogCsvPath } from "./catalog.ts";
import { bootstrapCatalogDb, catalogDbPath, type CatalogDatabase } from "./catalog-db.ts";

const UNKNOWN_CHANNEL = "(unknown channel)";
const UNKNOWN_TOPIC = "(uncategorized)";
const UNKNOWN_DATE = "0000-00-00";

type CatalogPartRecord = {
  chunkIndex: number;
  filePath: string;
  wordCount: number;
};

type CatalogVideoRecord = {
  videoId: string;
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
  ingestedDate: string;
  totalChunks: number;
  sourceRowCount: number;
  parts: CatalogPartRecord[];
};

export type CatalogRebuildResult = {
  csvPath: string;
  liveDbPath: string;
  tempDbPath: string;
  videoCount: number;
  partCount: number;
  checkOnly: boolean;
};

function splitCatalogLine(line: string): string[] {
  const out: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }

      continue;
    }

    if (character === "," && !inQuotes) {
      out.push(current);
      current = "";
      continue;
    }

    current += character;
  }

  out.push(current);
  return out;
}

function readCatalogRows(csvFilePath: string): VideoRow[] {
  const raw = fs.readFileSync(csvFilePath, "utf8");
  const lines = raw.split(/\r?\n/).filter(Boolean);

  if (lines.length === 0) {
    throw new Error(`Catalog CSV is empty: ${csvFilePath}`);
  }

  const header = splitCatalogLine(lines[0]);
  const indexByHeader = Object.fromEntries(header.map((value, index) => [value, index] as const));

  const requiredHeaders = [
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
  ] as const;

  for (const requiredHeader of requiredHeaders) {
    if (!(requiredHeader in indexByHeader)) {
      throw new Error(`Catalog CSV missing required column: ${requiredHeader}`);
    }
  }

  return lines.slice(1).map((line) => {
    const columns = splitCatalogLine(line);

    return {
      video_id: columns[indexByHeader.video_id] ?? "",
      parent_video_id: columns[indexByHeader.parent_video_id] ?? "",
      title: columns[indexByHeader.title] ?? "",
      channel: columns[indexByHeader.channel] ?? "",
      topic: columns[indexByHeader.topic] ?? "",
      published_date: columns[indexByHeader.published_date] ?? "",
      ingested_date: columns[indexByHeader.ingested_date] ?? "",
      word_count: columns[indexByHeader.word_count] ?? "",
      chunk: columns[indexByHeader.chunk] ?? "",
      total_chunks: columns[indexByHeader.total_chunks] ?? "",
      file_path: columns[indexByHeader.file_path] ?? "",
    };
  });
}

function integerField(value: string, name: string, videoId: string): number {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Catalog row for ${videoId} has invalid ${name}: ${value || "<blank>"}`);
  }
  return parsed;
}

function normalizeText(value: string, fallback: string): string {
  const trimmed = value.trim();
  return trimmed || fallback;
}

function canonicalVideoId(row: VideoRow): string {
  return row.parent_video_id.trim() || row.video_id.trim();
}

function normalizeVideoRecord(videoId: string, rows: VideoRow[]): CatalogVideoRecord {
  // Canonical metadata comes from the earliest ordered transcript row so import-time choices stay deterministic.
  const orderedRows = [...rows].sort((left, right) => {
    const chunkDelta =
      integerField(left.chunk, "chunk index", videoId) -
      integerField(right.chunk, "chunk index", videoId);
    if (chunkDelta !== 0) {
      return chunkDelta;
    }

    return left.file_path.localeCompare(right.file_path);
  });

  const chunkSet = new Set<number>();
  const parts = orderedRows.map((row) => {
    const filePath = row.file_path.trim();
    if (!filePath) {
      throw new Error(`Catalog row for ${videoId} is missing a transcript file path`);
    }

    const chunkIndex = integerField(row.chunk, "chunk index", videoId);
    if (chunkSet.has(chunkIndex)) {
      throw new Error(`Catalog row for ${videoId} has duplicate chunk index ${chunkIndex}`);
    }
    chunkSet.add(chunkIndex);

    return {
      chunkIndex,
      filePath,
      wordCount: integerField(row.word_count || "0", "word count", videoId),
    };
  });

  const canonicalRow = orderedRows[0];
  const declaredTotalChunks = integerField(
    canonicalRow.total_chunks || "0",
    "total chunks",
    videoId,
  );
  if (declaredTotalChunks !== parts.length) {
    throw new Error(
      `Catalog row group for ${videoId} expected ${declaredTotalChunks} parts but imported ${parts.length}`,
    );
  }

  return {
    videoId,
    title: normalizeText(canonicalRow.title, `Untitled video ${videoId}`),
    channel: normalizeText(canonicalRow.channel, UNKNOWN_CHANNEL),
    topic: normalizeText(canonicalRow.topic, UNKNOWN_TOPIC),
    publishedDate: normalizeText(canonicalRow.published_date, UNKNOWN_DATE),
    ingestedDate: normalizeText(canonicalRow.ingested_date, UNKNOWN_DATE),
    totalChunks: parts.length,
    sourceRowCount: orderedRows.length,
    parts,
  };
}

function buildVideoRecords(rows: VideoRow[]): CatalogVideoRecord[] {
  const groupedRows = new Map<string, VideoRow[]>();

  for (const row of rows) {
    const videoId = canonicalVideoId(row);
    if (!videoId) {
      throw new Error("Catalog row is missing canonical video id");
    }

    const group = groupedRows.get(videoId);
    if (group) {
      group.push(row);
    } else {
      groupedRows.set(videoId, [row]);
    }
  }

  return Array.from(groupedRows.entries())
    .map(([videoId, videoRows]) => normalizeVideoRecord(videoId, videoRows))
    .sort((left, right) => left.videoId.localeCompare(right.videoId));
}

function writeSnapshot(db: CatalogDatabase, records: CatalogVideoRecord[]): void {
  db.exec("DELETE FROM catalog_parts; DELETE FROM catalog_videos;");

  const insertVideo = db.prepare(`
    INSERT INTO catalog_videos (
      video_id,
      title,
      channel,
      topic,
      published_date,
      ingested_date,
      total_chunks,
      source_row_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertPart = db.prepare(`
    INSERT INTO catalog_parts (
      video_id,
      chunk_index,
      word_count,
      file_path
    ) VALUES (?, ?, ?, ?)
  `);

  const transaction = db.transaction((catalogRecords: CatalogVideoRecord[]) => {
    for (const record of catalogRecords) {
      insertVideo.run(
        record.videoId,
        record.title,
        record.channel,
        record.topic,
        record.publishedDate,
        record.ingestedDate,
        record.totalChunks,
        record.sourceRowCount,
      );

      for (const part of record.parts) {
        insertPart.run(record.videoId, part.chunkIndex, part.wordCount, part.filePath);
      }
    }
  });

  transaction(records);
}

function validateSnapshot(
  db: CatalogDatabase,
  records: CatalogVideoRecord[],
): { videoCount: number; partCount: number } {
  const videoCount =
    (db.prepare("SELECT COUNT(*) AS count FROM catalog_videos").get() as { count: number }).count ??
    0;
  const partCount =
    (db.prepare("SELECT COUNT(*) AS count FROM catalog_parts").get() as { count: number }).count ??
    0;
  const expectedPartCount = records.reduce((total, record) => total + record.parts.length, 0);

  if (videoCount !== records.length) {
    throw new Error(
      `Catalog parity check failed: expected ${records.length} videos but found ${videoCount}`,
    );
  }

  if (partCount !== expectedPartCount) {
    throw new Error(
      `Catalog parity check failed: expected ${expectedPartCount} parts but found ${partCount}`,
    );
  }

  for (const record of records) {
    const persistedParts = db
      .prepare(
        `
          SELECT chunk_index, file_path
          FROM catalog_parts
          WHERE video_id = ?
          ORDER BY chunk_index ASC
        `,
      )
      .all(record.videoId) as Array<{ chunk_index: number; file_path: string }>;

    const expectedParts = record.parts.map((part) => ({
      chunk_index: part.chunkIndex,
      file_path: part.filePath,
    }));

    if (JSON.stringify(persistedParts) !== JSON.stringify(expectedParts)) {
      throw new Error(
        `Catalog parity check failed: transcript parts drifted for ${record.videoId}`,
      );
    }
  }

  return { videoCount, partCount };
}

function tempSnapshotPath(liveDbFilePath: string): string {
  const directory = path.dirname(liveDbFilePath);
  const basename = path.basename(liveDbFilePath);
  return path.join(directory, `${basename}.tmp-${crypto.randomBytes(6).toString("hex")}`);
}

export function rebuildCatalogFromCsv(options?: {
  csvPath?: string;
  liveDbPath?: string;
  checkOnly?: boolean;
}): CatalogRebuildResult {
  const csvPath = options?.csvPath ?? catalogCsvPath();
  const liveDbFilePath = options?.liveDbPath ?? catalogDbPath();
  const tempDbPath = tempSnapshotPath(liveDbFilePath);
  const records = buildVideoRecords(readCatalogRows(csvPath));
  const db = bootstrapCatalogDb(tempDbPath);

  try {
    writeSnapshot(db, records);
    const counts = validateSnapshot(db, records);
    db.close();

    if (options?.checkOnly) {
      fs.rmSync(tempDbPath, { force: true });
    } else {
      // Publish only a fully validated snapshot so failed rebuilds never disturb the live catalog.
      fs.mkdirSync(path.dirname(liveDbFilePath), { recursive: true });
      fs.renameSync(tempDbPath, liveDbFilePath);
    }

    return {
      csvPath,
      liveDbPath: liveDbFilePath,
      tempDbPath,
      videoCount: counts.videoCount,
      partCount: counts.partCount,
      checkOnly: options?.checkOnly ?? false,
    };
  } catch (error) {
    try {
      db.close();
    } catch {}
    fs.rmSync(tempDbPath, { force: true });
    throw error;
  }
}
