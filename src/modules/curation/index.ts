/**
 * Module: curation
 * Purpose: Own markdown-to-UI insight curation/parsing heuristics.
 *
 * Public API:
 * - curateYouTubeAnalyzer(md)
 *
 * Exported IO Types:
 * - CuratedInsight
 *
 * Side Effects:
 * - none
 *
 * Error Behavior:
 * - Best-effort parsing; returns partial structures when sections are missing.
 */
export { curateYouTubeAnalyzer, type CuratedInsight } from "@/lib/curation";
