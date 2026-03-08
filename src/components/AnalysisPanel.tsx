"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "running" | "complete" | "failed";

type Props = {
  videoId: string;
  initialStatus: Status;
  initialInsight: string | null;
};

export function AnalysisPanel({ videoId, initialStatus, initialInsight }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(initialStatus);
  const [error, setError] = useState<string | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const mountedRef = useRef(true);
  const pollStartRef = useRef<number>(0);
  const pollRef = useRef<() => void>(undefined);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const fetchStatus = useCallback(async (): Promise<{ status: Status; error?: string }> => {
    const response = await fetch(`/api/analyze/status?videoId=${encodeURIComponent(videoId)}`);
    if (!response.ok) throw new Error("status fetch failed");
    return response.json();
  }, [videoId]);

  const poll = useCallback(() => {
    if (!mountedRef.current) return;

    const elapsed = Date.now() - pollStartRef.current;
    if (elapsed > 360_000) {
      setStatus("failed");
      setError("Analysis is taking longer than expected.");
      return;
    }

    fetchStatus()
      .then((data) => {
        if (!mountedRef.current) return;

        if (data.status === "complete") {
          setStatus("complete");
          setError(null);
          router.refresh();
          return;
        }

        if (data.status === "failed") {
          setStatus("failed");
          setError(data.error ?? "Analysis failed.");
          return;
        }

        let delay = 3000;
        if (elapsed > 60_000) delay = 10_000;
        else if (elapsed > 30_000) delay = 5000;

        timeoutRef.current = setTimeout(() => pollRef.current?.(), delay);
      })
      .catch(() => {
        if (!mountedRef.current) return;
        timeoutRef.current = setTimeout(() => pollRef.current?.(), 5000);
      });
  }, [fetchStatus, router]);

  useEffect(() => {
    pollRef.current = poll;
  }, [poll]);

  useEffect(() => {
    if (initialStatus === "running") {
      pollStartRef.current = Date.now();
      timeoutRef.current = setTimeout(() => pollRef.current?.(), 0);
    }
  }, [initialStatus]);

  const startAnalysis = async () => {
    setStatus("running");
    setError(null);

    try {
      const response = await fetch(`/api/analyze?videoId=${encodeURIComponent(videoId)}`, {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("failed");
        setError(data.error ?? "Failed to start analysis.");
        return;
      }

      pollStartRef.current = Date.now();
      poll();
    } catch {
      setStatus("failed");
      setError("Failed to start analysis.");
    }
  };

  const hasExistingInsight = initialInsight !== null;

  const buttonLabel =
    status === "running"
      ? "Generating analysis"
      : status === "failed"
        ? "Retry analysis"
        : hasExistingInsight
          ? "Refresh analysis"
          : "Generate analysis";

  return (
    <div className="space-y-3">
      <Button
        onClick={startAnalysis}
        disabled={status === "running"}
        className={cn(
          "w-full justify-center rounded-2xl",
          status === "running" && "bg-[var(--accent-strong)] text-white",
          status === "failed" && "bg-[#a63f3a] text-white hover:bg-[#8d3430]",
        )}
      >
        {status === "running" ? (
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/35 border-t-white" />
            {buttonLabel}
          </span>
        ) : (
          buttonLabel
        )}
      </Button>

      <div className="rounded-2xl border border-[var(--line)] bg-white/75 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
        Status: <span className="text-[var(--ink)]">{status}</span>
      </div>

      {error ? (
        <div className="rounded-2xl border border-[#d8b1aa] bg-[#fbe9e7] px-4 py-3 text-sm text-[#7b342f]">
          {error}
        </div>
      ) : null}
    </div>
  );
}
