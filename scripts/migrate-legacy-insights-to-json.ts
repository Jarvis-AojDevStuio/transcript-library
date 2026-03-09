import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import type { StructuredAnalysis } from "../src/lib/analysis-contract";

const require = createRequire(import.meta.url);
const { parseStructuredAnalysis } =
  require("../src/lib/analysis-contract.ts") as typeof import("../src/lib/analysis-contract");
const { curateYouTubeAnalyzer } =
  require("../src/lib/curation.ts") as typeof import("../src/lib/curation");
const {
  analysisPath,
  insightDir,
  insightsBaseDir,
  isValidVideoId,
  legacyInsightPath,
  structuredAnalysisPath,
} = require("../src/lib/insight-paths.ts") as typeof import("../src/lib/insight-paths");
const { ensureDisplayArtifact, readTitleFromFrontmatter, resolveInsightTitle } =
  require("./backfill-insight-artifacts.ts") as typeof import("./backfill-insight-artifacts");

export const MIGRATION_STATUS_FILE = ".migration-status.json";

export type MigrationStatus = {
  schemaVersion: 1;
  lastRunAt: string;
  insightsBaseDir: string;
  migratedCount: number;
  manualReviewCount: number;
  remainingLegacyCount: number;
  migratedVideoIds: string[];
  manualReviewVideoIds: string[];
  remainingLegacyVideoIds: string[];
  manualReview: Array<{
    videoId: string;
    reason: string;
    legacyPath: string;
  }>;
  checkOnly: boolean;
};

type LegacyInsightCandidate = {
  videoId: string;
  legacyPath: string;
};

function atomicWriteJson(filePath: string, obj: unknown): void {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  const tmp = `${filePath}.tmp_${crypto.randomBytes(6).toString("hex")}`;
  const fd = fs.openSync(tmp, "w");

  try {
    fs.writeSync(fd, JSON.stringify(obj, null, 2));
    fs.fsyncSync(fd);
    fs.closeSync(fd);
    fs.renameSync(tmp, filePath);
  } catch (error) {
    fs.closeSync(fd);
    try {
      fs.unlinkSync(tmp);
    } catch {}
    throw error;
  }
}

function migrationStatusPath(): string {
  return path.join(insightsBaseDir(), MIGRATION_STATUS_FILE);
}

function listLegacyMarkdownInsights(): LegacyInsightCandidate[] {
  const baseDir = insightsBaseDir();
  const entries = fs.existsSync(baseDir) ? fs.readdirSync(baseDir, { withFileTypes: true }) : [];

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => ({
      videoId: entry.name.slice(0, -3),
      legacyPath: path.join(baseDir, entry.name),
    }))
    .filter((entry) => isValidVideoId(entry.videoId))
    .sort((a, b) => a.videoId.localeCompare(b.videoId));
}

function buildStructuredAnalysis(videoId: string, markdown: string): StructuredAnalysis {
  const title = resolveInsightTitle(videoId) ?? readTitleFromFrontmatter(markdown);
  const curated = curateYouTubeAnalyzer(markdown);

  if (!title) {
    throw new Error("could not resolve a title from catalog, metadata, or markdown frontmatter");
  }

  if (!curated.summary) {
    throw new Error("could not derive a summary section from legacy markdown");
  }

  const structured = {
    schemaVersion: 1 as const,
    videoId,
    title,
    summary: curated.summary,
    takeaways: curated.takeaways ?? [],
    actionItems: curated.actionItems ?? [],
    notablePoints: curated.notablePoints ?? [],
    reportMarkdown: markdown.trim(),
  };

  return parseStructuredAnalysis(JSON.stringify(structured));
}

function migrateLegacyInsight(
  candidate: LegacyInsightCandidate,
  checkOnly: boolean,
): { migrated: boolean; reason?: string } {
  const markdown = fs.readFileSync(candidate.legacyPath, "utf8");
  const structured = buildStructuredAnalysis(candidate.videoId, markdown);
  const dir = insightDir(candidate.videoId);
  const analysis = analysisPath(candidate.videoId);
  const legacy = legacyInsightPath(candidate.videoId);

  if (checkOnly) {
    return { migrated: false };
  }

  fs.mkdirSync(dir, { recursive: true });
  atomicWriteJson(structuredAnalysisPath(candidate.videoId), structured);
  fs.writeFileSync(analysis, `${structured.reportMarkdown.trim()}\n`);
  ensureDisplayArtifact(candidate.videoId);

  if (fs.existsSync(legacy)) {
    fs.unlinkSync(legacy);
  }

  return { migrated: true };
}

export function runLegacyInsightMigration(args: { checkOnly?: boolean } = {}): MigrationStatus {
  const checkOnly = args.checkOnly ?? false;
  const baseDir = insightsBaseDir();
  fs.mkdirSync(baseDir, { recursive: true });

  const migratedVideoIds: string[] = [];
  const manualReview: MigrationStatus["manualReview"] = [];

  for (const candidate of listLegacyMarkdownInsights()) {
    try {
      const result = migrateLegacyInsight(candidate, checkOnly);
      if (result.migrated) {
        migratedVideoIds.push(candidate.videoId);
      }
    } catch (error) {
      manualReview.push({
        videoId: candidate.videoId,
        legacyPath: candidate.legacyPath,
        reason: (error as Error).message,
      });
    }
  }

  const remainingLegacyVideoIds = listLegacyMarkdownInsights().map((entry) => entry.videoId);
  const status: MigrationStatus = {
    schemaVersion: 1,
    lastRunAt: new Date().toISOString(),
    insightsBaseDir: baseDir,
    migratedCount: migratedVideoIds.length,
    manualReviewCount: manualReview.length,
    remainingLegacyCount: remainingLegacyVideoIds.length,
    migratedVideoIds,
    manualReviewVideoIds: manualReview.map((entry) => entry.videoId),
    remainingLegacyVideoIds,
    manualReview,
    checkOnly,
  };

  atomicWriteJson(migrationStatusPath(), status);
  return status;
}

function main() {
  const checkOnly = process.argv.includes("--check");
  const status = runLegacyInsightMigration({ checkOnly });
  console.log(JSON.stringify(status, null, 2));
  process.exitCode = status.remainingLegacyCount === 0 ? 0 : 1;
}

const isDirectExecution =
  typeof process.argv[1] === "string" &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectExecution) {
  main();
}
