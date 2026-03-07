/**
 * Module: insights
 * Purpose: Own insight-file discovery, reads, and preview generation.
 *
 * Public API:
 * - insightPaths(videoId)
 * - hasInsight(videoId)
 * - readInsightMarkdown(videoId)
 * - makePreview(md, maxChars?)
 *
 * Exported IO Types:
 * - none
 *
 * Side Effects:
 * - Reads insight files from local filesystem.
 *
 * Error Behavior:
 * - Returns fallback/none values on missing files.
 */
export {
  getInsightArtifacts,
  hasInsight,
  insightPaths,
  makePreview,
  readInsightLogTail,
  readInsightMarkdown,
  readRunMetadata,
} from "@/lib/insights";
