"use client";

import { useState } from "react";

type TranscriptPart = {
  chunk: number;
  totalChunks: number;
  wordCount: number;
  content: string;
};

export function TranscriptViewer({ parts }: { parts: TranscriptPart[] }) {
  const [mode, setMode] = useState<"full-width" | "columns">("full-width");
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const totalWords = parts.reduce((sum, p) => sum + p.wordCount, 0);

  const toggle = (idx: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <section className="mt-12">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--ink)]">
            Transcript
          </h2>
          <span className="mt-1 block text-[0.8125rem] text-[var(--muted)]">
            {parts.length} parts, {totalWords.toLocaleString()} words
          </span>
        </div>
        <div className="flex gap-1 rounded-lg bg-[var(--panel)] p-0.5">
          <button
            type="button"
            onClick={() => setMode("full-width")}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "full-width"
                ? "bg-white text-[var(--ink)] shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Full width
          </button>
          <button
            type="button"
            onClick={() => setMode("columns")}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "columns"
                ? "bg-white text-[var(--ink)] shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Columns
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="rounded-3xl border border-[var(--line)] bg-white px-12 py-10">
        {parts.map((part, i) => {
          const isOpen = expanded.has(i);
          return (
            <div
              key={part.chunk}
              className={`${i < parts.length - 1 ? "mb-4 border-b border-[var(--line)] pb-4" : ""}`}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between rounded-xl px-2 py-3 text-left transition hover:bg-[var(--panel)]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
                  Part {part.chunk} of {part.totalChunks} &middot; {part.wordCount.toLocaleString()} words
                </span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-4 w-4 text-[var(--muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isOpen && (
                <div
                  className={`mt-2 px-2 ${
                    mode === "columns"
                      ? "transcript-text"
                      : "transcript-text full-width"
                  }`}
                >
                  {part.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
