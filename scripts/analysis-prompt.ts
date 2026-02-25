import fs from "node:fs";
import path from "node:path";
import type { AnalysisMeta } from "../src/lib/analysis";

const SKILL_PATH = path.join(__dirname, "..", ".claude", "skills", "TranscriptAnalyzer.md");

export function systemPrompt(): string {
  return fs.readFileSync(SKILL_PATH, "utf8");
}

export function userPrompt(meta: AnalysisMeta, transcript: string): string {
  return [
    `Analyze this YouTube video transcript.`,
    ``,
    `Video: ${meta.title}`,
    `Channel: ${meta.channel}`,
    `Topic: ${meta.topic}`,
    `Published: ${meta.publishedDate}`,
    ``,
    `Transcript:`,
    ``,
    transcript,
  ].join("\n");
}

/** Expected output section headings (for validation). */
export const OUTPUT_SECTIONS = [
  "Executive Summary",
  "Key Arguments",
  "Notable Quotes",
  "Key Takeaways",
  "Notable Points",
  "Action Items",
  "References & Rabbit Holes",
  "Related Topics",
  "Criticism & Counterpoints",
  "One-Line Summary",
] as const;
