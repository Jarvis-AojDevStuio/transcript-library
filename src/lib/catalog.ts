import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { catalogDbPath, openCatalogDb } from "./catalog-db.ts";

export type VideoRow = {
  video_id: string;
  parent_video_id: string;
  title: string;
  channel: string;
  topic: string;
  published_date: string;
  ingested_date: string;
  word_count: string;
  chunk: string;
  total_chunks: string;
  file_path: string;
};

export type Video = {
  videoId: string;
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
  ingestedDate: string;
  totalChunks: number;
  parts: Array<{ chunk: number; wordCount: number; filePath: string }>;
};

export type ChannelSummary = {
  channel: string;
  topics: string[];
  videoCount: number;
  lastPublishedDate?: string;
};

type CatalogVideoRow = {
  video_id: string;
  title: string;
  channel: string;
  topic: string;
  published_date: string;
  ingested_date: string;
  total_chunks: number;
};

type CatalogPartRow = {
  video_id: string;
  chunk_index: number;
  word_count: number;
  file_path: string;
};

type CatalogSnapshot = {
  catalogVersion: string;
  dbMtimeMs: number;
  validationReportMtimeMs: number;
  mtimeMs: number;
  videosById: Map<string, Video>;
};

let snapshotCache: CatalogSnapshot | undefined;

export function playlistTranscriptsRepoRoot(): string {
  const override = process.env.PLAYLIST_TRANSCRIPTS_REPO;
  if (override) return override;
  return path.join(process.cwd(), "pipeline");
}

export function catalogCsvPath(): string {
  return path.join(
    playlistTranscriptsRepoRoot(),
    "youtube-transcripts",
    "index",
    "videos" + ".csv",
  );
}

function catalogValidationReportPath(dbPath = catalogDbPath()): string {
  return path.join(path.dirname(dbPath), "last-import-validation.json");
}

function readCatalogVersionSignal(dbPath: string): {
  catalogVersion: string;
  dbMtimeMs: number;
  validationReportMtimeMs: number;
} {
  const dbStats = fs.statSync(dbPath);
  const validationPath = catalogValidationReportPath(dbPath);

  try {
    const validationStats = fs.statSync(validationPath);
    const report = JSON.parse(fs.readFileSync(validationPath, "utf8")) as {
      catalogVersion?: string;
    };

    return {
      catalogVersion: report.catalogVersion ?? `db-mtime:${dbStats.mtimeMs}`,
      dbMtimeMs: dbStats.mtimeMs,
      validationReportMtimeMs: validationStats.mtimeMs,
    };
  } catch {
    return {
      catalogVersion: `db-mtime:${dbStats.mtimeMs}`,
      dbMtimeMs: dbStats.mtimeMs,
      validationReportMtimeMs: 0,
    };
  }
}

function loadCatalogSnapshot(): CatalogSnapshot {
  const dbPath = catalogDbPath();
  const versionSignal = readCatalogVersionSignal(dbPath);

  if (
    snapshotCache &&
    snapshotCache.catalogVersion === versionSignal.catalogVersion &&
    snapshotCache.dbMtimeMs === versionSignal.dbMtimeMs &&
    snapshotCache.validationReportMtimeMs === versionSignal.validationReportMtimeMs
  ) {
    return snapshotCache;
  }

  const db = openCatalogDb(dbPath);

  try {
    const videos = db
      .prepare(
        `
          SELECT
            video_id,
            title,
            channel,
            topic,
            published_date,
            ingested_date,
            total_chunks
          FROM catalog_videos
          ORDER BY published_date DESC, channel ASC, video_id ASC
        `,
      )
      .all() as CatalogVideoRow[];

    const parts = db
      .prepare(
        `
          SELECT
            video_id,
            chunk_index,
            word_count,
            file_path
          FROM catalog_parts
          ORDER BY video_id ASC, chunk_index ASC
        `,
      )
      .all() as CatalogPartRow[];

    const partsByVideo = new Map<string, Video["parts"]>();
    for (const part of parts) {
      const group = partsByVideo.get(part.video_id);
      const normalizedPart = {
        chunk: part.chunk_index,
        wordCount: part.word_count,
        filePath: part.file_path,
      };

      if (group) {
        group.push(normalizedPart);
      } else {
        partsByVideo.set(part.video_id, [normalizedPart]);
      }
    }

    const videosById = new Map<string, Video>();
    for (const row of videos) {
      const orderedParts = partsByVideo.get(row.video_id) ?? [];
      videosById.set(row.video_id, {
        videoId: row.video_id,
        title: row.title,
        channel: row.channel,
        topic: row.topic,
        publishedDate: row.published_date,
        ingestedDate: row.ingested_date,
        totalChunks: row.total_chunks,
        parts: orderedParts,
      });
    }

    snapshotCache = {
      catalogVersion: versionSignal.catalogVersion,
      dbMtimeMs: versionSignal.dbMtimeMs,
      validationReportMtimeMs: versionSignal.validationReportMtimeMs,
      mtimeMs: versionSignal.dbMtimeMs,
      videosById,
    };

    return snapshotCache;
  } finally {
    db.close();
  }
}

export function groupVideos(): Map<string, Video> {
  return loadCatalogSnapshot().videosById;
}

export const listChannels = cache(function listChannels(): ChannelSummary[] {
  const videos = Array.from(groupVideos().values());
  const byChannel = new Map<string, ChannelSummary>();

  for (const video of videos) {
    const key = video.channel || "(unknown)";
    const existing = byChannel.get(key);

    if (!existing) {
      byChannel.set(key, {
        channel: key,
        topics: video.topic ? [video.topic] : [],
        videoCount: 1,
        lastPublishedDate: video.publishedDate,
      });
      continue;
    }

    existing.videoCount += 1;
    if (video.topic && !existing.topics.includes(video.topic)) {
      existing.topics.push(video.topic);
    }
    if (
      video.publishedDate &&
      (!existing.lastPublishedDate || video.publishedDate > existing.lastPublishedDate)
    ) {
      existing.lastPublishedDate = video.publishedDate;
    }
  }

  return Array.from(byChannel.values()).sort((left, right) => {
    const leftDate = left.lastPublishedDate || "";
    const rightDate = right.lastPublishedDate || "";
    if (leftDate !== rightDate) {
      return rightDate.localeCompare(leftDate);
    }
    return left.channel.localeCompare(right.channel);
  });
});

export const listVideosByChannel = cache(function listVideosByChannel(channel: string): Video[] {
  const videos = Array.from(groupVideos().values()).filter((video) => video.channel === channel);
  return videos.sort((left, right) =>
    (right.publishedDate || "").localeCompare(left.publishedDate || ""),
  );
});

export function getVideo(videoId: string): Video | undefined {
  return groupVideos().get(videoId);
}

export function playlistTranscriptsContentRoot(): string {
  return path.join(playlistTranscriptsRepoRoot(), "youtube-transcripts");
}

export function resolveTranscriptPath(filePath: string): string {
  const repoRoot = playlistTranscriptsRepoRoot();
  const contentRoot = playlistTranscriptsContentRoot();
  const baseRoot = filePath.startsWith("youtube-transcripts/") ? repoRoot : contentRoot;
  const resolved = path.resolve(baseRoot, filePath);
  const allowedRoot = path.resolve(baseRoot);

  if (resolved !== allowedRoot && !resolved.startsWith(`${allowedRoot}${path.sep}`)) {
    throw new Error("forbidden");
  }

  return resolved;
}

export function absTranscriptPath(filePath: string): string {
  return resolveTranscriptPath(filePath);
}
