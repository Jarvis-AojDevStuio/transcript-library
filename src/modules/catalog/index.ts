/**
 * Owns transcript video catalog loading/grouping and channel/video lookups.
 *
 * @module catalog
 * @see module:lib/catalog
 * @remarks
 * Side effects: reads CSV/files from the transcript repo.
 * Error behavior: throws on unexpected fs/path failures.
 */
export {
  readVideoRows,
  groupVideos,
  listChannels,
  listVideosByChannel,
  getVideo,
  absTranscriptPath,
  type VideoRow,
  type Video,
  type ChannelSummary,
} from "@/lib/catalog";
