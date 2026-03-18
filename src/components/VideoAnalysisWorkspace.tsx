"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";

type Status = "idle" | "running" | "complete" | "failed";

type Curated = {
  summary?: string;
  takeaways?: string[];
  actionItems?: string[];
};

type AnalyzeOutcome =
  | "started"
  | "already-running"
  | "already-analyzed"
  | "retry-needed"
  | "capacity-reached";

type RuntimeStage = {
  key: "idle" | "queued" | "running" | "completed" | "failed" | "interrupted" | "reconciled";
  label: string;
};

type RetryGuidance = {
  canRetry: boolean;
  nextAction: "wait" | "rerun-analysis" | "review-mismatch";
  message: string;
};

type Reconciliation = {
  status: "ok" | "mismatch" | "resolved";
  resolution: "none" | "rerun-ready" | "resolved";
  retryable: boolean;
  reasons: Array<{
    code: string;
    severity: "warning" | "failure";
    message: string;
  }>;
};

type InsightResponse = {
  status: Status;
  lifecycle?: string | null;
  retryable?: boolean;
  analyzeOutcome?: AnalyzeOutcome;
  error?: string;
  stage?: RuntimeStage;
  insight: string | null;
  curated: Curated | null;
  logs?: {
    stdout: string;
    stderr: string;
  };
  recentLogs?: string[];
  retryGuidance?: RetryGuidance;
  artifacts: {
    canonicalFileName: string;
    displayFileName: string | null;
    metadataFileName: string;
    runFileName: string;
    stdoutFileName: string;
    stderrFileName: string;
  };
  run?: {
    provider: "claude-cli" | "codex-cli";
    model?: string;
    startedAt: string;
    completedAt?: string;
    status: Status;
    error?: string;
  } | null;
  reconciliation?: Reconciliation;
};

type StreamPayload = {
  status: Status;
  lifecycle: string | null;
  stage: RuntimeStage;
  startedAt: string | null;
  completedAt: string | null;
  error: string | null;
  logs: {
    stdout: string;
    stderr: string;
  };
  recentLogs: string[];
  retryGuidance: RetryGuidance;
  reconciliation: Reconciliation;
  artifacts: InsightResponse["artifacts"];
  run?: InsightResponse["run"];
};

type StreamEvent = {
  event: "snapshot" | "heartbeat";
  version: string;
  payload: StreamPayload;
};

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3v1m0 16v1m-7.07-2.93.7-.7m12.73-12.73.7-.7M3 12h1m16 0h1m-2.93 7.07-.7-.7M5.64 5.64l-.7-.7" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

/**
 * Renders a plain string with basic inline markdown (**bold**) as React nodes.
 */
function InlineMarkdown({ children }: { children: string }) {
  const parts = children.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-[var(--ink)]">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function FullReportSection({ insight }: { insight: string | null }) {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <div className="mb-5 flex items-baseline justify-between border-b border-[var(--line)] pb-3">
        <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--ink)]">
          Full Analysis Report
        </h2>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-[0.8125rem] font-semibold text-[var(--accent)] hover:underline"
        >
          {open ? "Hide full report" : "Show full report"}
        </button>
      </div>
      {open && (
        <div className="rounded-3xl border border-[var(--line)] bg-white px-14 py-12">
          <Markdown>{insight}</Markdown>
        </div>
      )}
    </section>
  );
}

const DEFAULT_RECENT_LOG_LINES = 6;

export function VideoAnalysisWorkspace({ videoId }: { videoId: string }) {
  const [data, setData] = useState<InsightResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [stream, setStream] = useState<StreamPayload | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const loadInsight = useCallback(async () => {
    const response = await fetch(`/api/insight?videoId=${encodeURIComponent(videoId)}`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Failed to fetch insight");
    const next = (await response.json()) as InsightResponse;
    setData(next);
    setLoading(false);
    return next;
  }, [videoId]);

  useEffect(() => {
    let active = true;

    const poll = async (delay: number) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        if (!active) return;
        try {
          const next = await loadInsight();
          if (next.status === "running") {
            await poll(3000);
          }
        } catch {
          if (active) {
            await poll(5000);
          }
        }
      }, delay);
    };

    queueMicrotask(() => {
      loadInsight()
        .then((next) => {
          if (active && next.status === "running") {
            poll(3000);
          }
        })
        .catch(() => {
          if (active) setLoading(false);
        });
    });

    return () => {
      active = false;
      clearTimeout(timeoutRef.current);
    };
  }, [loadInsight]);

  useEffect(() => {
    if (data?.status !== "running") return;

    const source = new EventSource(`/api/insight/stream?videoId=${encodeURIComponent(videoId)}`);
    source.onmessage = (event) => {
      const next = JSON.parse(event.data) as StreamEvent;
      setStream(next.payload);

      if (next.payload.status !== "running") {
        source.close();
        loadInsight().catch(() => undefined);
      }
    };
    source.onerror = () => source.close();

    return () => source.close();
  }, [data?.status, loadInsight, videoId]);

  const startAnalysis = async () => {
    setStream(null);
    setData((current) => ({
      status: "running",
      error: undefined,
      insight: current?.insight ?? null,
      curated: current?.curated ?? null,
      artifacts: current?.artifacts ?? {
        canonicalFileName: "analysis.md",
        displayFileName: null,
        metadataFileName: "video-metadata.json",
        runFileName: "run.json",
        stdoutFileName: "worker-stdout.txt",
        stderrFileName: "worker-stderr.txt",
      },
      run: current?.run ?? null,
    }));

    const response = await fetch(`/api/analyze?videoId=${encodeURIComponent(videoId)}`, {
      method: "POST",
    });
    const body = (await response.json()) as { error?: string };

    if (!response.ok) {
      setData((current) => ({
        status: "failed",
        error: body.error ?? "Failed to start analysis.",
        insight: current?.insight ?? null,
        curated: current?.curated ?? null,
        artifacts: current?.artifacts ?? {
          canonicalFileName: "analysis.md",
          displayFileName: null,
          metadataFileName: "video-metadata.json",
          runFileName: "run.json",
          stdoutFileName: "worker-stdout.txt",
          stderrFileName: "worker-stderr.txt",
        },
        run: current?.run ?? null,
      }));
      return;
    }

    setTimeout(() => {
      loadInsight().catch(() => undefined);
    }, 1500);
  };

  const status = data?.status ?? "idle";
  const curated = data?.curated;
  const hasInsight = Boolean(data?.insight);
  const runtime = stream ?? null;
  const artifactMeta = runtime?.artifacts ?? data?.artifacts;
  const liveStdout = runtime?.logs.stdout?.trim() || data?.logs?.stdout?.trim();
  const liveStderr = runtime?.logs.stderr?.trim() || data?.logs?.stderr?.trim();
  const recentLogs = runtime?.recentLogs?.length ? runtime.recentLogs : (data?.recentLogs ?? []);
  const visibleRecentLogs = recentLogs.slice(-DEFAULT_RECENT_LOG_LINES);
  const run = runtime?.run ?? data?.run ?? null;
  const stage = runtime?.stage ?? data?.stage ?? { key: "idle", label: "Idle" };
  const retryGuidance = runtime?.retryGuidance ?? data?.retryGuidance ?? null;
  const reconciliation = runtime?.reconciliation ?? data?.reconciliation ?? null;
  const blockedByMigration = Boolean(
    data?.error?.toLowerCase().includes("legacy insight requires one-time migration"),
  );
  const hasRecentEvidence = visibleRecentLogs.length > 0;
  const showFullLogs = Boolean(liveStdout || liveStderr);
  const mismatchReasons = reconciliation?.reasons ?? [];
  const statusClassName =
    status === "failed"
      ? "bg-[#fbe9e7] text-[#7b342f]"
      : status === "running"
        ? "bg-[var(--panel)] text-[var(--accent)]"
        : "bg-[var(--panel)] text-[var(--muted)]";
  const stageClassName =
    reconciliation?.status === "mismatch"
      ? "bg-[#fbe9e7] text-[#7b342f]"
      : stage.key === "running"
        ? "bg-[var(--panel)] text-[var(--accent)]"
        : "bg-[var(--panel)] text-[var(--muted)]";

  return (
    <div className="space-y-10">
      {/* Header with action button */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl tracking-[-0.03em] text-[var(--ink)]">
            {hasInsight ? "Analysis" : loading ? "Loading analysis" : "No analysis yet"}
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {blockedByMigration
              ? "This older artifact needs the one-time JSON migration before the app can read it normally."
              : hasInsight
                ? "Summary, takeaways, and action items from this video."
                : "Generate analysis to see insights."}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {run ? (
            <span className="text-xs text-[var(--muted)]">
              {run.provider}
              {run.model ? ` \u00b7 ${run.model}` : ""}
            </span>
          ) : null}
          <span className={`rounded-full px-3 py-1 text-xs ${statusClassName}`}>{status}</span>
          <Button
            onClick={startAnalysis}
            disabled={status === "running"}
            size="sm"
            className="gap-1.5"
          >
            <SparkleIcon />
            {status === "running"
              ? "Generating..."
              : hasInsight
                ? "Refresh Analysis"
                : "Generate Analysis"}
          </Button>
        </div>
      </div>

      {/* Error display */}
      {data?.error ? (
        <div className="rounded-2xl border border-[#d8b1aa] bg-[#fbe9e7] px-4 py-3 text-sm text-[#7b342f]">
          {data.error}
        </div>
      ) : null}

      {data ? (
        status === "running" || status === "failed" || reconciliation?.status === "mismatch" ? (
          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white/84 p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs ${stageClassName}`}>
                    {stage.label}
                  </span>
                  {reconciliation?.status === "mismatch" ? (
                    <span className="rounded-full bg-[#fbe9e7] px-3 py-1 text-xs text-[#7b342f]">
                      Retry Needed
                    </span>
                  ) : null}
                  {data.analyzeOutcome ? (
                    <span className="rounded-full bg-[var(--panel)] px-3 py-1 text-xs text-[var(--muted)]">
                      {data.analyzeOutcome.replaceAll("-", " ")}
                    </span>
                  ) : null}
                </div>
                <div>
                  <h3 className="font-display text-lg tracking-[-0.02em] text-[var(--ink)]">
                    Runtime status
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                    {retryGuidance?.message ??
                      "Live status reads stay ahead of raw files so operators can tell whether a run is healthy before opening logs."}
                  </p>
                </div>
              </div>
              <div className="grid gap-3 text-sm text-[var(--muted-strong)] sm:grid-cols-2">
                <div className="rounded-2xl bg-[var(--panel)] px-4 py-3">
                  <div className="text-[11px] tracking-[0.18em] text-[var(--muted)] uppercase">
                    Latest run
                  </div>
                  <div className="mt-2">
                    {run?.startedAt ? new Date(run.startedAt).toLocaleString() : "No run recorded"}
                  </div>
                </div>
                <div className="rounded-2xl bg-[var(--panel)] px-4 py-3">
                  <div className="text-[11px] tracking-[0.18em] text-[var(--muted)] uppercase">
                    Retry path
                  </div>
                  <div className="mt-2">
                    {retryGuidance?.canRetry
                      ? "Use Refresh Analysis for a clean rerun."
                      : status === "running"
                        ? "Wait for the current run to finish."
                        : "No rerun needed right now."}
                  </div>
                </div>
              </div>
            </div>

            {reconciliation?.status === "mismatch" ? (
              <div className="mt-5 rounded-2xl border border-[#d8b1aa] bg-[#fbe9e7] px-5 py-4">
                <div className="text-sm font-semibold text-[#7b342f]">
                  The latest runtime artifacts do not reconcile cleanly.
                </div>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-[#7b342f]">
                  {mismatchReasons.map((reason) => (
                    <li key={`${reason.code}-${reason.message}`}>{reason.message}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {hasRecentEvidence ? (
              <div className="mt-5 rounded-2xl bg-[var(--panel)] px-5 py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-[var(--ink)]">
                      Recent runtime evidence
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                      Showing only the latest useful lines by default. Full stdout and stderr stay
                      secondary.
                    </p>
                  </div>
                  <span className="text-[11px] tracking-[0.18em] text-[var(--muted)] uppercase">
                    {visibleRecentLogs.length} lines
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  {visibleRecentLogs.map((line, index) => (
                    <div
                      key={`${index}-${line}`}
                      className="rounded-xl bg-white px-4 py-3 text-sm leading-6 text-[var(--muted-strong)]"
                    >
                      {line}
                    </div>
                  ))}
                </div>
                {recentLogs.length > visibleRecentLogs.length ? (
                  <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
                    Older lines are still available in the full worker log disclosure below.
                  </p>
                ) : null}
              </div>
            ) : null}

            {showFullLogs ? (
              <details className="mt-5 rounded-2xl border border-[var(--line)] bg-white/82 p-5">
                <summary className="cursor-pointer list-none text-sm font-medium text-[var(--ink)]">
                  Full worker logs
                </summary>
                <div className="mt-4 grid gap-4 xl:grid-cols-2">
                  <div className="rounded-3xl bg-[var(--panel)] p-4">
                    <div className="text-[11px] tracking-[0.18em] text-[var(--muted)] uppercase">
                      {artifactMeta?.stdoutFileName ?? "worker-stdout.txt"}
                    </div>
                    <pre className="mt-3 overflow-x-auto text-xs leading-6 break-words whitespace-pre-wrap text-[var(--muted-strong)]">
                      {liveStdout || "No stdout yet."}
                    </pre>
                  </div>
                  <div className="rounded-3xl bg-[var(--panel)] p-4">
                    <div className="text-[11px] tracking-[0.18em] text-[var(--muted)] uppercase">
                      {artifactMeta?.stderrFileName ?? "worker-stderr.txt"}
                    </div>
                    <pre className="mt-3 overflow-x-auto text-xs leading-6 break-words whitespace-pre-wrap text-[var(--muted-strong)]">
                      {liveStderr || "No stderr yet."}
                    </pre>
                  </div>
                </div>
              </details>
            ) : null}
          </section>
        ) : (
          <details className="group rounded-[1.75rem] border border-[var(--line)] bg-white/84">
            <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 [&::-webkit-details-marker]:hidden">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-sm tracking-[-0.02em] text-[var(--muted)]">
                  Runtime status
                </h3>
                <span className={`rounded-full px-3 py-1 text-xs ${stageClassName}`}>
                  {stage.label}
                </span>
                {run?.startedAt ? (
                  <span className="text-xs text-[var(--muted)]">
                    {new Date(run.startedAt).toLocaleString()}
                  </span>
                ) : null}
              </div>
              <span className="text-xs text-[var(--muted)] transition group-open:rotate-90">▶</span>
            </summary>
            <div className="border-t border-[var(--line)] p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div>
                    <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">
                      {retryGuidance?.message ?? "No rerun needed right now."}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 text-sm text-[var(--muted-strong)] sm:grid-cols-2">
                  <div className="rounded-2xl bg-[var(--panel)] px-4 py-3">
                    <div className="text-[11px] tracking-[0.18em] text-[var(--muted)] uppercase">
                      Latest run
                    </div>
                    <div className="mt-2">
                      {run?.startedAt
                        ? new Date(run.startedAt).toLocaleString()
                        : "No run recorded"}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[var(--panel)] px-4 py-3">
                    <div className="text-[11px] tracking-[0.18em] text-[var(--muted)] uppercase">
                      Retry path
                    </div>
                    <div className="mt-2">
                      {retryGuidance?.canRetry
                        ? "Use Refresh Analysis for a clean rerun."
                        : "No rerun needed right now."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </details>
        )
      ) : null}

      {/* Loading state */}
      {loading ? (
        <div className="rounded-2xl border border-[var(--line)] bg-white/68 p-8 text-sm leading-7 text-[var(--muted)]">
          Loading latest analysis state.
        </div>
      ) : hasInsight ? (
        <div className="space-y-10">
          {/* Summary section */}
          {curated?.summary ? (
            <section>
              <div className="mb-5 flex items-baseline justify-between border-b border-[var(--line)] pb-3">
                <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--ink)]">
                  Summary
                </h2>
                <span className="text-[0.6875rem] font-semibold tracking-[0.08em] text-[var(--muted)] uppercase">
                  AI Generated
                </span>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-8 py-7">
                <p className="text-[1.0625rem] leading-7 text-[var(--muted-strong)]">
                  {curated.summary}
                </p>
              </div>
            </section>
          ) : null}

          {/* Key Takeaways section */}
          {curated?.takeaways?.length ? (
            <section>
              <div className="mb-5 flex items-baseline justify-between border-b border-[var(--line)] pb-3">
                <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--ink)]">
                  Key Takeaways
                </h2>
                <span className="text-[0.6875rem] font-semibold tracking-[0.08em] text-[var(--muted)] uppercase">
                  {curated.takeaways.length} insights
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {curated.takeaways.map((t, i) => (
                  <div
                    key={t}
                    className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6"
                  >
                    <div className="font-display text-sm font-semibold text-[var(--accent)]">
                      0{i + 1}
                    </div>
                    <p className="mt-2 text-[0.9375rem] leading-[1.65] text-[var(--muted-strong)]">
                      <InlineMarkdown>{t}</InlineMarkdown>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Action Items section */}
          {curated?.actionItems?.length ? (
            <section>
              <div className="mb-5 flex items-baseline justify-between border-b border-[var(--line)] pb-3">
                <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--ink)]">
                  Action Items
                </h2>
                <span className="text-[0.6875rem] font-semibold tracking-[0.08em] text-[var(--muted)] uppercase">
                  {curated.actionItems.length} protocols
                </span>
              </div>
              <div className="space-y-2">
                {curated.actionItems.map((item, i) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/8 text-[0.8125rem] font-bold text-[var(--accent)]">
                      {i + 1}
                    </div>
                    <p className="pt-1 text-[0.9375rem] leading-[1.6] text-[var(--muted-strong)]">
                      <InlineMarkdown>{item}</InlineMarkdown>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Full Analysis Report section */}
          <FullReportSection insight={data?.insight ?? null} />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-dashed border-[var(--line)] bg-white/68 p-8 text-sm leading-7 text-[var(--muted)]">
            {status === "failed"
              ? "The latest analysis run failed. Review the error and worker logs above, then retry."
              : "Start analysis to generate an in-app summary while the video plays above."}
          </div>
        </div>
      )}
    </div>
  );
}
