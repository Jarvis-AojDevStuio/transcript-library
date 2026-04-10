import path from "node:path";
import crypto from "node:crypto";
import { atomicWriteJson, insightsBaseDir } from "@/lib/analysis";
import {
  refreshSourceCatalog as runRefreshSourceCatalog,
  type RefreshSourceOptions,
  type SourceRefreshRecord,
} from "@/lib/source-refresh";
import {
  repairHistoricalArtifacts as runRepairHistoricalArtifacts,
  type HistoricalArtifactRepairReport,
} from "../../scripts/repair-historical-artifacts.ts";

export type DailyOperationalSweepOutcome = "clean" | "repaired" | "manual-follow-up" | "failed";
export type DailyOperationalSweepTrigger = RefreshSourceOptions["trigger"];
export type DailyOperationalSweepPhase = "refresh" | "repair";
export type DailyOperationalSweepRepairStatus =
  | "clean"
  | "repaired"
  | "manual-follow-up"
  | "failed";

export type DailyOperationalSweepRecord = {
  schemaVersion: 1;
  sweepId: string;
  trigger: DailyOperationalSweepTrigger;
  outcome: DailyOperationalSweepOutcome;
  failingPhase: DailyOperationalSweepPhase | null;
  startedAt: string;
  completedAt: string;
  manualFollowUpVideoIds: string[];
  counts: {
    manualFollowUpCount: number;
    repairedCount: number;
    skippedCount: number;
    errorCount: number;
  };
  refresh: {
    status: "completed" | "failed";
    record: SourceRefreshRecord;
  };
  repair: {
    status: DailyOperationalSweepRepairStatus;
    report: HistoricalArtifactRepairReport;
  };
  paths: {
    latest: string;
    archive: string;
  };
};

export type DailyOperationalSweepResult = {
  record: DailyOperationalSweepRecord;
  latestRecordPath: string;
  archiveRecordPath: string;
};

export type DailyOperationalSweepOptions = {
  trigger?: DailyOperationalSweepTrigger;
  refreshSourceCatalog?: (options: RefreshSourceOptions) => SourceRefreshRecord;
  repairHistoricalArtifacts?: () => HistoricalArtifactRepairReport;
};

function nowIso(): string {
  return new Date().toISOString();
}

function createSweepId(now = new Date()): string {
  const stamp = now.toISOString().replace(/[-:.TZ]/g, "");
  return `sweep-${stamp}-${crypto.randomBytes(3).toString("hex")}`;
}

export function dailyOperationalSweepRoot(): string {
  return path.join(path.dirname(insightsBaseDir()), "runtime", "daily-operational-sweep");
}

export function dailyOperationalSweepLatestPath(): string {
  return path.join(dailyOperationalSweepRoot(), "latest.json");
}

export function dailyOperationalSweepArchivePath(sweepId: string): string {
  return path.join(dailyOperationalSweepRoot(), "archive", `${sweepId}.json`);
}

function deriveRepairStatus(
  report: HistoricalArtifactRepairReport,
): DailyOperationalSweepRepairStatus {
  if (report.errorCount > 0) {
    return "failed";
  }

  if (report.rerunNeededCount > 0) {
    return "manual-follow-up";
  }

  if (report.repairedCount > 0) {
    return "repaired";
  }

  return "clean";
}

function collectManualFollowUpVideoIds(report: HistoricalArtifactRepairReport): string[] {
  return report.results
    .filter((result) => result.action === "rerun-needed")
    .map((result) => result.videoId)
    .sort((left, right) => left.localeCompare(right));
}

function deriveSweepOutcome(args: {
  refresh: SourceRefreshRecord;
  repairStatus: DailyOperationalSweepRepairStatus;
  manualFollowUpVideoIds: string[];
}): {
  outcome: DailyOperationalSweepOutcome;
  failingPhase: DailyOperationalSweepPhase | null;
} {
  if (args.refresh.outcome === "failed") {
    return {
      outcome: "failed",
      failingPhase: "refresh",
    };
  }

  if (args.repairStatus === "failed") {
    return {
      outcome: "failed",
      failingPhase: "repair",
    };
  }

  if (args.manualFollowUpVideoIds.length > 0) {
    return {
      outcome: "manual-follow-up",
      failingPhase: null,
    };
  }

  if (args.repairStatus === "repaired") {
    return {
      outcome: "repaired",
      failingPhase: null,
    };
  }

  return {
    outcome: "clean",
    failingPhase: null,
  };
}

function writeSweepRecord(record: DailyOperationalSweepRecord): DailyOperationalSweepResult {
  atomicWriteJson(record.paths.latest, record);
  atomicWriteJson(record.paths.archive, record);

  return {
    record,
    latestRecordPath: record.paths.latest,
    archiveRecordPath: record.paths.archive,
  };
}

export function runDailyOperationalSweep(
  options: DailyOperationalSweepOptions = {},
): DailyOperationalSweepResult {
  const startedAt = nowIso();
  const sweepId = createSweepId();
  const trigger = options.trigger ?? "cli";
  const refreshSourceCatalog = options.refreshSourceCatalog ?? runRefreshSourceCatalog;
  const repairHistoricalArtifacts =
    options.repairHistoricalArtifacts ?? runRepairHistoricalArtifacts;

  // source-refresh is retired: transcripts are now embedded in pipeline/.
  // refreshSourceCatalog is a no-op that returns a synthetic "noop" record.
  const refresh = refreshSourceCatalog({ trigger });
  const repairReport = repairHistoricalArtifacts();
  const repairStatus = deriveRepairStatus(repairReport);
  const manualFollowUpVideoIds = collectManualFollowUpVideoIds(repairReport);
  const { outcome, failingPhase } = deriveSweepOutcome({
    refresh,
    repairStatus,
    manualFollowUpVideoIds,
  });

  return writeSweepRecord({
    schemaVersion: 1,
    sweepId,
    trigger,
    outcome,
    failingPhase,
    startedAt,
    completedAt: nowIso(),
    manualFollowUpVideoIds,
    counts: {
      manualFollowUpCount: manualFollowUpVideoIds.length,
      repairedCount: repairReport.repairedCount,
      skippedCount: repairReport.skippedCount,
      errorCount: repairReport.errorCount,
    },
    refresh: {
      status: refresh.outcome === "failed" ? "failed" : "completed",
      record: refresh,
    },
    repair: {
      status: repairStatus,
      report: repairReport,
    },
    paths: {
      latest: dailyOperationalSweepLatestPath(),
      archive: dailyOperationalSweepArchivePath(sweepId),
    },
  });
}
