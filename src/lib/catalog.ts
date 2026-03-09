/**
 * Video catalog built from the playlist-transcripts CSV index.
 *
 * Reads `videos.csv` from `PLAYLIST_TRANSCRIPTS_REPO`, groups multi-chunk
 * videos into `Video` objects, and exposes cached lookups for channels and
 * individual videos.
 *
 * @module catalog
 */
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

/**
 * Raw row from the `videos.csv` index.
 * @typedef {Object} VideoRow
 * @property {string} video_id - Unique ID for this transcript chunk
 * @property {string} parent_video_id - Parent video ID (empty for single-chunk videos)
 * @property {string} title - Video title
 * @property {string} channel - Channel name
 * @property {string} topic - Topic/category label
 * @property {string} published_date - ISO publication date string
 * @property {string} ingested_date - ISO ingestion date string
 * @property {string} word_count - Word count for this chunk (string from CSV)
 * @property {string} chunk - Chunk index (string from CSV)
 * @property {string} total_chunks - Total chunk count (string from CSV)
 * @property {string} file_path - Relative path to the transcript file
 */
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

/**
 * Normalised video record, aggregating all transcript chunks.
 * @typedef {Object} Video
 * @property {string} videoId - Canonical YouTube video ID
 * @property {string} title - Video title
 * @property {string} channel - Channel name
 * @property {string} topic - Topic/category label
 * @property {string} publishedDate - ISO publication date string
 * @property {string} ingestedDate - ISO ingestion date string
 * @property {number} totalChunks - Total number of transcript parts
 * @property {Array<{chunk: number, wordCount: number, filePath: string}>} parts - Ordered transcript parts
 */
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

/**
 * Aggregated summary for a single channel.
 * @typedef {Object} ChannelSummary
 * @property {string} channel - Channel name
 * @property {string[]} topics - Distinct topics covered by this channel
 * @property {number} videoCount - Number of videos from this channel
 * @property {string} [lastPublishedDate] - ISO date of the most recently published video
 */
export type ChannelSummary = {
  channel: string;
  topics: string[];
  videoCount: number;
  lastPublishedDate?: string;
};

/**
 * Resolves the transcript repo root from the `PLAYLIST_TRANSCRIPTS_REPO` env var.
 * @returns {string} Absolute path to the playlist-transcripts repo
 * @throws {Error} If `PLAYLIST_TRANSCRIPTS_REPO` is not set
 * @internal
 */
function repoRoot(): string {
  const repo = process.env.PLAYLIST_TRANSCRIPTS_REPO;
  if (!repo) {
    throw new Error(
      "PLAYLIST_TRANSCRIPTS_REPO is not set. Add it to .env.local pointing to your playlist-transcripts repo.",
    );
  }
  return repo;
}

/**
 * Returns the absolute path to the `videos.csv` index file.
 * @returns {string} Path to `youtube-transcripts/index/videos.csv`
 * @internal
 */
function csvPath(): string {
  return path.join(repoRoot(), "youtube-transcripts", "index", "videos.csv");
}

/**
 * Minimal CSV line parser that handles quoted fields containing commas.
 * Escaped double-quotes (`""`) inside quoted fields are unescaped.
 * @param {string} line - A single CSV line
 * @returns {string[]} Array of field values
 * @internal
 */
function parseCsvLine(line: string): string[] {
  // Minimal CSV parser for this file format (rare quotes).
  // Handles quoted fields with commas.
  const out: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQ = !inQ;
      }
      continue;
    }
    if (ch === "," && !inQ) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out;
}

let _cache:
  | {
      mtimeMs: number;
      rows: VideoRow[];
    }
  | undefined;

/**
 * Reads and parses all rows from `videos.csv`.
 * Results are cached in memory and invalidated when the file's mtime changes.
 * @returns {VideoRow[]} All rows from the CSV index
 */
export function readVideoRows(): VideoRow[] {
  const p = csvPath();
  const st = fs.statSync(p);
  if (_cache && _cache.mtimeMs === st.mtimeMs) return _cache.rows;

  const raw = fs.readFileSync(p, "utf8");
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);

  const idx = Object.fromEntries(header.map((h, i) => [h, i] as const));

  const rows: VideoRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    if (!cols.length) continue;
    rows.push({
      video_id: cols[idx.video_id] ?? "",
      parent_video_id: cols[idx.parent_video_id] ?? "",
      title: cols[idx.title] ?? "",
      channel: cols[idx.channel] ?? "",
      topic: cols[idx.topic] ?? "",
      published_date: cols[idx.published_date] ?? "",
      ingested_date: cols[idx.ingested_date] ?? "",
      word_count: cols[idx.word_count] ?? "0",
      chunk: cols[idx.chunk] ?? "0",
      total_chunks: cols[idx.total_chunks] ?? "0",
      file_path: cols[idx.file_path] ?? "",
    });
  }

  _cache = { mtimeMs: st.mtimeMs, rows };
  return rows;
}

let _videosCache:
  | {
      mtimeMs: number;
      map: Map<string, Video>;
    }
  | undefined;

/**
 * Groups CSV rows into a map of `videoId → Video`.
 * Multi-chunk videos are merged; chunk parts are sorted by chunk index.
 * Results are cached and invalidated when the CSV mtime changes.
 * @param {VideoRow[]} [rows] - Pre-read rows; reads CSV if omitted
 * @returns {Map<string, Video>} Map of canonical video ID to Video record
 */
export function groupVideos(rows?: VideoRow[]): Map<string, Video> {
  // Return cached map if CSV hasn't changed
  const p = csvPath();
  const st = fs.statSync(p);
  if (_videosCache && _videosCache.mtimeMs === st.mtimeMs) return _videosCache.map;

  if (!rows) rows = readVideoRows();
  const map = new Map<string, Video>();
  for (const r of rows) {
    const id = r.parent_video_id || r.video_id;
    const existing = map.get(id);
    const part = {
      chunk: Number.parseInt(r.chunk || "0", 10) || 0,
      wordCount: Number.parseInt(r.word_count || "0", 10) || 0,
      filePath: r.file_path,
    };

    if (!existing) {
      map.set(id, {
        videoId: id,
        title: r.title,
        channel: r.channel,
        topic: r.topic,
        publishedDate: r.published_date,
        ingestedDate: r.ingested_date,
        totalChunks: Number.parseInt(r.total_chunks || "0", 10) || 0,
        parts: [part],
      });
    } else {
      existing.parts.push(part);
      existing.totalChunks = Math.max(existing.totalChunks, part.chunk);
      if (r.published_date && r.published_date > existing.publishedDate) {
        existing.publishedDate = r.published_date;
      }
      if (r.ingested_date && r.ingested_date > existing.ingestedDate) {
        existing.ingestedDate = r.ingested_date;
      }
    }
  }

  for (const v of map.values()) {
    v.parts.sort((a, b) => a.chunk - b.chunk);
    v.totalChunks = v.parts.length;
  }

  _videosCache = { mtimeMs: st.mtimeMs, map };
  return map;
}

/**
 * Returns all channels with aggregated video counts, topics, and latest
 * published date, sorted by most recently published then alphabetically.
 * Result is memoised by React's `cache` for the current request.
 * @returns {ChannelSummary[]} Sorted channel summaries
 */
export const listChannels = cache(function listChannels(): ChannelSummary[] {
  const videos = Array.from(groupVideos().values());
  const byChannel = new Map<string, ChannelSummary>();

  for (const v of videos) {
    const key = v.channel || "(unknown)";
    const existing = byChannel.get(key);
    if (!existing) {
      byChannel.set(key, {
        channel: key,
        topics: v.topic ? [v.topic] : [],
        videoCount: 1,
        lastPublishedDate: v.publishedDate,
      });
    } else {
      existing.videoCount++;
      if (v.topic && !existing.topics.includes(v.topic)) existing.topics.push(v.topic);
      if (
        v.publishedDate &&
        (!existing.lastPublishedDate || v.publishedDate > existing.lastPublishedDate)
      ) {
        existing.lastPublishedDate = v.publishedDate;
      }
    }
  }

  return Array.from(byChannel.values()).sort((a, b) => {
    const da = a.lastPublishedDate || "";
    const db = b.lastPublishedDate || "";
    if (da !== db) return db.localeCompare(da);
    return a.channel.localeCompare(b.channel);
  });
});

/**
 * Returns all videos for a given channel, sorted by published date descending.
 * Result is memoised by React's `cache` for the current request.
 * @param {string} channel - Channel name to filter by
 * @returns {Video[]} Videos from the specified channel, newest first
 */
export const listVideosByChannel = cache(function listVideosByChannel(channel: string): Video[] {
  const videos = Array.from(groupVideos().values()).filter((v) => v.channel === channel);
  return videos.sort((a, b) => (b.publishedDate || "").localeCompare(a.publishedDate || ""));
});

/**
 * Looks up a single video by its canonical ID.
 * @param {string} videoId - YouTube video ID
 * @returns {Video|undefined} The video record, or undefined if not found
 */
export function getVideo(videoId: string): Video | undefined {
  return groupVideos().get(videoId);
}

/**
 * Resolves a relative transcript file path to an absolute path within the
 * playlist-transcripts repo.
 * @param {string} filePath - Relative path from the CSV `file_path` column
 * @returns {string} Absolute path to the transcript file
 */
export function absTranscriptPath(filePath: string): string {
  return path.join(repoRoot(), "youtube-transcripts", filePath);
}
