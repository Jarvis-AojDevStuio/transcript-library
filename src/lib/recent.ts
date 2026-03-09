/**
 * Recent-items helpers for the home feed.
 *
 * Provides TTL-cached lists of recently updated knowledge markdown files and
 * recently completed video insight analyses.
 *
 * @module recent
 */
import fs from "node:fs";
import {
  knowledgeMarkdownMtime,
  listKnowledgeCategories,
  listKnowledgeMarkdown,
  titleFromRelPath,
} from "@/modules/knowledge";
import { insightsBaseDir, analysisPath } from "@/lib/analysis";

/**
 * A recently updated knowledge base entry.
 * @typedef {Object} RecentKnowledgeItem
 * @property {string} category - Knowledge category directory name
 * @property {string} relPath - Relative path of the markdown file within the category
 * @property {string} title - Human-readable title derived from the file path
 * @property {number} updatedAtMs - File mtime in milliseconds
 */
export type RecentKnowledgeItem = {
  category: string;
  relPath: string;
  title: string;
  updatedAtMs: number;
};

/**
 * Returns the most recently modified knowledge markdown files across all
 * categories, sorted by mtime descending.
 * @param {number} [limit=8] - Maximum number of items to return
 * @returns {RecentKnowledgeItem[]} Most recently updated knowledge items
 */
export function listRecentKnowledge(limit = 8): RecentKnowledgeItem[] {
  const out: RecentKnowledgeItem[] = [];
  const cats = listKnowledgeCategories();
  for (const c of cats) {
    const markdown = listKnowledgeMarkdown(c);
    for (const rel of markdown) {
      const updatedAtMs = knowledgeMarkdownMtime(c, rel);
      if (updatedAtMs === null) continue;
      out.push({
        category: c,
        relPath: rel,
        title: titleFromRelPath(rel),
        updatedAtMs,
      });
    }
  }

  return out.sort((a, b) => b.updatedAtMs - a.updatedAtMs).slice(0, Math.max(0, limit));
}

/**
 * A recently completed video insight analysis.
 * @typedef {Object} RecentInsightItem
 * @property {string} videoId - YouTube video ID
 * @property {number} updatedAtMs - mtime of `analysis.md` in milliseconds
 */
export type RecentInsightItem = {
  videoId: string;
  updatedAtMs: number;
};

/** TTL-based cache: directory mtime misses nested file changes on APFS/ext4. */
const CACHE_TTL_MS = 5_000;
let _recentInsightsCache: { expiresAt: number; items: RecentInsightItem[] } | undefined;

/**
 * Returns the most recently modified video insight analyses, sorted by
 * `analysis.md` mtime descending. Results are cached for `CACHE_TTL_MS`
 * milliseconds to avoid repeated directory scans.
 * @param {number} [limit=8] - Maximum number of items to return
 * @returns {RecentInsightItem[]} Most recently updated insight items
 */
export function listRecentInsights(limit = 8): RecentInsightItem[] {
  const now = Date.now();
  if (_recentInsightsCache && now < _recentInsightsCache.expiresAt) {
    return _recentInsightsCache.items.slice(0, limit);
  }

  const base = insightsBaseDir();
  try {
    const entries = fs.readdirSync(base, { withFileTypes: true });
    const items: RecentInsightItem[] = [];

    for (const e of entries) {
      if (!e.isDirectory()) continue;
      if (e.name.startsWith(".")) continue;
      const analysis = analysisPath(e.name);
      if (!fs.existsSync(analysis)) continue;
      try {
        const st = fs.statSync(analysis);
        items.push({ videoId: e.name, updatedAtMs: st.mtimeMs });
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
          console.debug("Unexpected error reading insight stat:", err);
        }
      }
    }

    const sorted = items.sort((a, b) => b.updatedAtMs - a.updatedAtMs);
    _recentInsightsCache = { expiresAt: now + CACHE_TTL_MS, items: sorted };
    return sorted.slice(0, limit);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      console.debug("Unexpected error listing recent insights:", err);
    }
    return [];
  }
}
