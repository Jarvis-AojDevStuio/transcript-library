/**
 * Owns recent knowledge/insight feeds for UI surfaces.
 *
 * @module recent
 * @see module:lib/recent
 * @remarks
 * Side effects: reads filesystem stats and directory contents.
 * Error behavior: returns [] on missing dirs and expected IO errors.
 */
export {
  listRecentKnowledge,
  listRecentInsights,
  type RecentKnowledgeItem,
  type RecentInsightItem,
} from "@/lib/recent";
