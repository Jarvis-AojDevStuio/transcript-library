"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "running" | "complete" | "failed";

type StatusData = {
  status: Status;
  error?: string;
  elapsedSeconds?: number;
};

type Props = {
  videoId: string;
  initialStatus: Status;
  initialInsight: string | null;
};

export function AnalysisPanel({ videoId, initialStatus, initialInsight }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(initialStatus);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const mountedRef = useRef(true);
  const pollStartRef = useRef<number>(0);
  const pollRef = useRef<() => void>(undefined);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const fetchStatus = useCallback(async (): Promise<StatusData> => {
    const res = await fetch(`/api/analyze/status?videoId=${encodeURIComponent(videoId)}`);
    if (!res.ok) throw new Error("status fetch failed");
    return res.json();
  }, [videoId]);

  const poll = useCallback(() => {
    if (!mountedRef.current) return;

    const elapsed = Date.now() - pollStartRef.current;

    // 15-minute ceiling (matches server-side stale detection)
    if (elapsed > 900_000) {
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
          setElapsed(null);
          router.refresh();
          return;
        }

        if (data.status === "failed") {
          setStatus("failed");
          setElapsed(null);
          setError(data.error || "Analysis failed");
          return;
        }

        if (data.elapsedSeconds != null) {
          setElapsed(data.elapsedSeconds);
        }

        // Still running — schedule next poll with backoff
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

      pollStartRef.current = Date.now();
      poll();
    } catch {
      setStatus("failed");
      setError("Failed to start analysis");
    }
  };

  useEffect(() => {
    if (initialStatus === "running") {
      pollStartRef.current = Date.now();
      timeoutRef.current = setTimeout(() => pollRef.current?.(), 0);
    }
  }, [initialStatus]);

  const hasExistingInsight = initialInsight !== null;

  const formatElapsed = (s: number) => (s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`);

  const buttonLabel = (() => {
    if (status === "running") {
      return elapsed != null ? `Analyzing\u2026 ${formatElapsed(elapsed)}` : "Analyzing\u2026";
    }
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
      return "rounded-full border border-black/[0.06] bg-white px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--fg)]";
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

      {error && <div className="text-right text-xs text-red-600">{error}</div>}
    </div>
  );
}
