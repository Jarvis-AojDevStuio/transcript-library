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

type InsightResponse = {
  status: Status;
  error?: string;
  insight: string | null;
  curated: Curated | null;
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
};

type StreamPayload = {
  status: Status;
  startedAt: string | null;
  completedAt: string | null;
  error: string | null;
  logs: {
    stdout: string;
    stderr: string;
  };
  artifacts: InsightResponse["artifacts"];
  run?: InsightResponse["run"];
};

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3v1m0 16v1m-7.07-2.93.7-.7m12.73-12.73.7-.7M3 12h1m16 0h1m-2.93 7.07-.7-.7M5.64 5.64l-.7-.7" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function FullReportSection({ insight }: { insight: string | null }) {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-3 mb-5">
        <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--ink)]">Full Analysis Report</h2>
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
      const next = JSON.parse(event.data) as StreamPayload;
      setStream(next);

      if (next.status !== "running") {
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
  const artifactMeta = data?.artifacts;
  const liveStdout = stream?.logs.stdout?.trim();
  const liveStderr = stream?.logs.stderr?.trim();
  const run = stream?.run ?? data?.run ?? null;

  return (
    <div className="space-y-10">
      {/* Header with action button */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl tracking-[-0.03em] text-[var(--ink)]">
            {hasInsight ? "Analysis" : loading ? "Loading analysis" : "No analysis yet"}
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {hasInsight ? "Summary, takeaways, and action items from this video." : "Generate analysis to see insights."}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {run ? (
            <span className="text-xs text-[var(--muted)]">
              {run.provider}{run.model ? ` \u00b7 ${run.model}` : ""}
            </span>
          ) : null}
          <span className="rounded-full bg-[var(--panel)] px-3 py-1 text-xs text-[var(--muted)]">{status}</span>
          <Button
            onClick={startAnalysis}
            disabled={status === "running"}
            size="sm"
            className="gap-1.5"
          >
            <SparkleIcon />
            {status === "running" ? "Generating..." : hasInsight ? "Refresh Analysis" : "Generate Analysis"}
          </Button>
        </div>
      </div>

      {/* Error display */}
      {data?.error ? (
        <div className="rounded-2xl border border-[#d8b1aa] bg-[#fbe9e7] px-4 py-3 text-sm text-[#7b342f]">
          {data.error}
        </div>
      ) : null}

      {/* Loading state */}
      {loading ? (
        <div className="rounded-2xl border border-[var(--line)] bg-white/68 p-8 text-sm leading-7 text-[var(--muted)]">
          Loading latest analysis state.
        </div>
      ) : hasInsight ? (
        <div className="space-y-10">
          {/* Live worker logs */}
          {stream && (liveStdout || liveStderr || status === "running") ? (
            <details className="rounded-2xl border border-[var(--line)] bg-white/82 p-6" open={status === "running"}>
              <summary className="cursor-pointer list-none text-sm font-medium text-[var(--ink)]">
                Live worker logs
              </summary>
              <div className="mt-4 grid gap-4 xl:grid-cols-2">
                <div className="rounded-3xl bg-[var(--panel)] p-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {artifactMeta?.stdoutFileName ?? "worker-stdout.txt"}
                  </div>
                  <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-[var(--muted-strong)]">
                    {liveStdout || "No stdout yet."}
                  </pre>
                </div>
                <div className="rounded-3xl bg-[var(--panel)] p-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {artifactMeta?.stderrFileName ?? "worker-stderr.txt"}
                  </div>
                  <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-[var(--muted-strong)]">
                    {liveStderr || "No stderr yet."}
                  </pre>
                </div>
              </div>
            </details>
          ) : null}

          {/* Summary section */}
          {curated?.summary ? (
            <section>
              <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-3 mb-5">
                <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--ink)]">Summary</h2>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">AI Generated</span>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-8 py-7">
                <p className="text-[1.0625rem] leading-7 text-[var(--muted-strong)]">{curated.summary}</p>
              </div>
            </section>
          ) : null}

          {/* Key Takeaways section */}
          {curated?.takeaways?.length ? (
            <section>
              <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-3 mb-5">
                <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--ink)]">Key Takeaways</h2>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">{curated.takeaways.length} insights</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {curated.takeaways.map((t, i) => (
                  <div key={t} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
                    <div className="font-display text-sm font-semibold text-[var(--accent)]">0{i + 1}</div>
                    <p className="mt-2 text-[0.9375rem] leading-[1.65] text-[var(--muted-strong)]">{t}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Action Items section */}
          {curated?.actionItems?.length ? (
            <section>
              <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-3 mb-5">
                <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--ink)]">Action Items</h2>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">{curated.actionItems.length} protocols</span>
              </div>
              <div className="space-y-2">
                {curated.actionItems.map((item, i) => (
                  <div key={item} className="flex gap-4 items-start rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/8 text-[0.8125rem] font-bold text-[var(--accent)]">{i + 1}</div>
                    <p className="pt-1 text-[0.9375rem] leading-[1.6] text-[var(--muted-strong)]">{item}</p>
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
          {/* Live worker logs (no insight yet) */}
          {stream && (liveStdout || liveStderr || status === "running") ? (
            <details className="rounded-2xl border border-[var(--line)] bg-white/82 p-6" open={status === "running"}>
              <summary className="cursor-pointer list-none text-sm font-medium text-[var(--ink)]">
                Live worker logs
              </summary>
              <div className="mt-4 grid gap-4 xl:grid-cols-2">
                <div className="rounded-3xl bg-[var(--panel)] p-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {data?.artifacts.stdoutFileName ?? "worker-stdout.txt"}
                  </div>
                  <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-[var(--muted-strong)]">
                    {liveStdout || "No stdout yet."}
                  </pre>
                </div>
                <div className="rounded-3xl bg-[var(--panel)] p-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {data?.artifacts.stderrFileName ?? "worker-stderr.txt"}
                  </div>
                  <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-[var(--muted-strong)]">
                    {liveStderr || "No stderr yet."}
                  </pre>
                </div>
              </div>
            </details>
          ) : null}
          <div className="rounded-2xl border border-dashed border-[var(--line)] bg-white/68 p-8 text-sm leading-7 text-[var(--muted)]">
            Start analysis to generate an in-app summary while the video plays above.
          </div>
        </div>
      )}
    </div>
  );
}
