/**
 * Module: catalog
 * Purpose: Own transcript video catalog loading/grouping and channel/video lookups.
 *
 * Public API:
 * - readVideoRows()
 * - groupVideos(rows?)
 * - listChannels()
 * - listVideosByChannel(channel)
 * - getVideo(videoId)
 * - absTranscriptPath(filePath)
 *
 * Exported IO Types:
 * - VideoRow, Video, ChannelSummary
 *
 * Side Effects:
 * - Reads CSV/files from transcript repo.
 *
 * Error Behavior:
 * - Throws on unexpected fs/path failures.
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
