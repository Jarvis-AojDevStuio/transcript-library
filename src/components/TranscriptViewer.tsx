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
  const totalWords = parts.reduce((sum, p) => sum + p.wordCount, 0);

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
        {parts.map((part, i) => (
          <div
            key={part.chunk}
            className={`${i < parts.length - 1 ? "mb-8 border-b border-[var(--line)] pb-8" : ""}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
                Part {part.chunk} of {part.totalChunks}
              </span>
              <span className="text-xs text-[var(--muted)]">
                {part.wordCount.toLocaleString()} words
              </span>
            </div>
            <div
              className={
                mode === "columns"
                  ? "transcript-text"
                  : "transcript-text full-width"
              }
            >
              {part.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
