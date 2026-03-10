/**
 * Owns analysis job execution, status tracking, and insight file paths.
 *
 * @module analysis
 * @see module:lib/analysis
 * @remarks
 * Side effects: file IO, process spawning, process signals.
 * Error behavior: returns booleans/null for expected failures; throws on unexpected IO errors.
 */
export {
  __resetAnalysisRuntimeForTests,
  attemptStderrLogPath,
  attemptStdoutLogPath,
  buildRunArtifacts,
  createRunId,
  tryAcquireSlot,
  decrementRunning,
  hasAnalysisArtifacts,
  reconcileLatestRun,
  readStatus,
  isProcessAlive,
  isValidVideoId,
  runAttemptDir,
  runAttemptMetadataPath,
  spawnAnalysis,
  insightDir,
  insightsBaseDir,
  statusPath,
  analysisPath,
  structuredAnalysisPath,
  displayAnalysisPath,
  metadataCachePath,
  runMetadataPath,
  atomicWriteJson,
  stdoutLogPath,
  stderrLogPath,
  readRunMetadata,
  writeRunLifecycle,
  type CompatibilityStatus,
  type StatusFile,
  type AnalysisMeta,
  type RunFile,
  type RunArtifacts,
  type RunLifecycle,
  type AnalysisProvider,
} from "@/lib/analysis";
