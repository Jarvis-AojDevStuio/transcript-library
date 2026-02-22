"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Status = "idle" | "running" | "complete" | "failed";

type Props = {
  videoId: string;
  initialStatus: Status;
  initialInsight: string | null;
};

export function AnalysisPanel({ videoId, initialStatus, initialInsight }: Props) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [error, setError] = useState<string | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const mountedRef = useRef(true);
  const pollStartRef = useRef<number>(0);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const fetchStatus = useCallback(async (): Promise<{ status: Status; error?: string }> => {
    const res = await fetch(`/api/analyze/status?videoId=${encodeURIComponent(videoId)}`);
    if (!res.ok) throw new Error("status fetch failed");
    return res.json();
  }, [videoId]);

  const poll = useCallback(() => {
    if (!mountedRef.current) return;

    const elapsed = Date.now() - pollStartRef.current;

    // 10-minute ceiling
    if (elapsed > 600_000) {
      setStatus("failed");
      setError("Analysis is taking longer than expected");
      return;
    }

    fetchStatus()
      .then((data) => {
        if (!mountedRef.current) return;

        if (data.status === "complete") {
          setStatus("complete");
          setError(null);
          // Reload to get server-rendered insight
          window.location.reload();
          return;
        }

        if (data.status === "failed") {
          setStatus("failed");
          setError(data.error ?? "Analysis failed");
          return;
        }

        // Still running — schedule next poll with backoff
        let delay = 3000;
        if (elapsed > 60_000) delay = 10_000;
        else if (elapsed > 30_000) delay = 5000;

        timeoutRef.current = setTimeout(poll, delay);
      })
      .catch(() => {
        if (!mountedRef.current) return;
        // Back off on error
        timeoutRef.current = setTimeout(poll, 5000);
      });
  }, [fetchStatus]);

  const startAnalysis = async () => {
    setStatus("running");
    setError(null);

    try {
      const res = await fetch(`/api/analyze?videoId=${encodeURIComponent(videoId)}`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("failed");
        setError(data.error ?? "Failed to start analysis");
        return;
      }

      // Start polling
      pollStartRef.current = Date.now();
      poll();
    } catch {
      setStatus("failed");
      setError("Failed to start analysis");
    }
  };

  // If initial status is running, start polling immediately
  useEffect(() => {
    if (initialStatus === "running") {
      pollStartRef.current = Date.now();
      poll();
    }
  }, [initialStatus, poll]);

  const hasExistingInsight = initialInsight !== null;

  const buttonLabel = (() => {
    if (status === "running") return "Analyzing\u2026";
    if (status === "failed") return "Retry analysis";
    if (hasExistingInsight) return "Re-run analysis";
    return "Run analysis";
  })();

  const buttonClass = (() => {
    if (status === "running") {
      return "rounded-full bg-black/50 px-4 py-2 text-sm text-white cursor-wait";
    }
    if (status === "failed") {
      return "rounded-full bg-amber-600 px-4 py-2 text-sm text-white hover:bg-amber-700";
    }
    if (hasExistingInsight) {
      return "rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--fg)]";
    }
    return "rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-black/90";
  })();

  return (
    <div className="flex shrink-0 flex-col items-end gap-2">
      <button
        type="button"
        onClick={startAnalysis}
        disabled={status === "running"}
        className={buttonClass}
      >
        {status === "running" ? (
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {buttonLabel}
          </span>
        ) : (
          buttonLabel
        )}
      </button>

      {error && (
        <div className="text-right text-xs text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
