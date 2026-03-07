/**
 * Module: analysis
 * Purpose: Own analysis job execution, status tracking, and insight file paths.
 *
 * Public API:
 * - tryAcquireSlot()
 * - decrementRunning()
 * - readStatus(videoId)
 * - isProcessAlive(pid)
 * - isValidVideoId(id)
 * - spawnAnalysis(videoId, meta, transcript, logPrefix?)
 * - insightDir(videoId)
 * - insightsBaseDir()
 * - statusPath(videoId)
 * - analysisPath(videoId)
 * - displayAnalysisPath(videoId, title)
 * - metadataCachePath(videoId)
 * - runMetadataPath(videoId)
 * - atomicWriteJson(filePath, obj)
 *
 * Exported IO Types:
 * - StatusFile, AnalysisMeta, RunFile, AnalysisProvider
 *
 * Side Effects:
 * - File IO, process spawning, process signals.
 *
 * Error Behavior:
 * - Returns booleans/null for expected failures; throws on unexpected IO errors.
 */
export {
  tryAcquireSlot,
  decrementRunning,
  readStatus,
  isProcessAlive,
  isValidVideoId,
  spawnAnalysis,
  insightDir,
  insightsBaseDir,
  statusPath,
  analysisPath,
  displayAnalysisPath,
  metadataCachePath,
  runMetadataPath,
  atomicWriteJson,
  stdoutLogPath,
  stderrLogPath,
  readRunMetadata,
  type StatusFile,
  type AnalysisMeta,
  type RunFile,
  type AnalysisProvider,
} from "@/lib/analysis";
