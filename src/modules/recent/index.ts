/**
 * Module: recent
 * Purpose: Own recent knowledge/insight feeds for UI surfaces.
 *
 * Public API:
 * - listRecentKnowledge(limit?)
 * - listRecentInsights(limit?)
 *
 * Exported IO Types:
 * - RecentKnowledgeItem, RecentInsightItem
 *
 * Side Effects:
 * - Reads filesystem stats and directory contents.
 *
 * Error Behavior:
 * - Returns [] on missing dirs and expected IO errors.
 */
export {
  listRecentKnowledge,
  listRecentInsights,
  type RecentKnowledgeItem,
  type RecentInsightItem,
} from "@/lib/recent";
