/**
 * Owns markdown-to-UI insight curation and parsing heuristics.
 *
 * @module curation
 * @see module:lib/curation
 * @remarks
 * No side effects. Best-effort parsing; returns partial structures when sections are missing.
 */
export { parseStructuredAnalysis, type StructuredAnalysis } from "@/lib/analysis-contract";
export { curateYouTubeAnalyzer, type CuratedInsight } from "@/lib/curation";
