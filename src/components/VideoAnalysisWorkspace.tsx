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
  const artifactName = artifactMeta?.displayFileName ?? artifactMeta?.canonicalFileName ?? "analysis.md";
  const liveStdout = stream?.logs.stdout?.trim();
  const liveStderr = stream?.logs.stderr?.trim();
  const run = stream?.run ?? data?.run ?? null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Analysis board</div>
          <h2 className="mt-3 font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
            {hasInsight ? "Curated analysis" : loading ? "Loading analysis" : "No analysis yet"}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            Keep the player running while you scan the summary, key takeaways, and action items.
          </p>
        </div>
        <div className="w-full max-w-[240px] shrink-0 space-y-3">
          <Button
            onClick={startAnalysis}
            disabled={status === "running"}
            className="w-full justify-center rounded-2xl"
          >
            {status === "running"
              ? "Generating analysis"
              : hasInsight
                ? "Refresh analysis"
                : "Generate analysis"}
          </Button>
          <div className="rounded-2xl border border-[var(--line)] bg-white/75 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Status: <span className="text-[var(--ink)]">{status}</span>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white/75 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Artifact: <span className="text-[var(--ink)] normal-case tracking-normal">{artifactName}</span>
          </div>
          {run ? (
            <div className="rounded-2xl border border-[var(--line)] bg-white/75 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              Provider:{" "}
              <span className="text-[var(--ink)] normal-case tracking-normal">
                {run.provider}
                {run.model ? ` · ${run.model}` : ""}
              </span>
            </div>
          ) : null}
          {data?.error ? (
            <div className="rounded-2xl border border-[#d8b1aa] bg-[#fbe9e7] px-4 py-3 text-sm text-[#7b342f]">
              {data.error}
            </div>
          ) : null}
        </div>
      </div>

      {loading ? (
        <div className="rounded-[28px] border border-[var(--line)] bg-white/68 p-8 text-sm leading-7 text-[var(--muted)]">
          Loading latest analysis state.
        </div>
      ) : hasInsight ? (
        <div className="space-y-8">
          {stream && (liveStdout || liveStderr || status === "running") ? (
            <details className="rounded-[28px] border border-[var(--line)] bg-white/82 p-6" open={status === "running"}>
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

          {curated?.summary ? (
            <div className="rounded-[28px] border border-[var(--line)] bg-white/82 p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Summary</div>
              <p className="mt-4 text-[15px] leading-8 text-[var(--muted-strong)]">{curated.summary}</p>
            </div>
          ) : null}

          {curated?.takeaways?.length ? (
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Key takeaways</div>
              <div className="mt-4 grid gap-3 xl:grid-cols-2">
                {curated.takeaways.map((takeaway, index) => (
                  <div key={takeaway} className="rounded-[24px] border border-[var(--line)] bg-white/82 p-5">
                    <div className="text-sm font-semibold text-[var(--accent-strong)]">0{index + 1}</div>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">{takeaway}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {curated?.actionItems?.length ? (
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Action items</div>
              <div className="mt-4 space-y-3">
                {curated.actionItems.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-foreground)]">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-7 text-[var(--muted-strong)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <details className="rounded-[28px] border border-[var(--line)] bg-white/82 p-6">
            <summary className="cursor-pointer list-none text-sm font-medium text-[var(--ink)]">
              Open full markdown report
            </summary>
            <div className="mt-6">
              <Markdown>{data?.insight}</Markdown>
            </div>
          </details>
        </div>
      ) : (
        <div className="space-y-4">
          {stream && (liveStdout || liveStderr || status === "running") ? (
            <details className="rounded-[28px] border border-[var(--line)] bg-white/82 p-6" open={status === "running"}>
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
          <div className="rounded-[28px] border border-dashed border-[var(--line)] bg-white/68 p-8 text-sm leading-7 text-[var(--muted)]">
            Start analysis to generate an in-app summary while the video plays above.
          </div>
        </div>
      )}
    </div>
  );
}
