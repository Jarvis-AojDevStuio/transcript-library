import fs from "node:fs";
import path from "node:path";
import { listKnowledgeCategories, KNOWLEDGE_ROOT, titleFromRelPath } from "@/lib/knowledge";
import { insightsBaseDir, analysisPath } from "@/lib/analysis";

export type RecentKnowledgeItem = {
  category: string;
  relPath: string;
  title: string;
  updatedAtMs: number;
};

function walk(dirAbs: string, relBase: string, out: RecentKnowledgeItem[], category: string) {
  const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    const abs = path.join(dirAbs, e.name);
    const rel = relBase ? path.join(relBase, e.name) : e.name;

    if (e.isDirectory()) {
      walk(abs, rel, out, category);
    } else if (e.isFile()) {
      const lower = e.name.toLowerCase();
      if (!lower.endsWith(".md") && !lower.endsWith(".markdown")) continue;
      try {
        const st = fs.statSync(abs);
        out.push({
          category,
          relPath: rel,
          title: titleFromRelPath(rel),
          updatedAtMs: st.mtimeMs,
        });
      } catch {
        // ignore
      }
    }
  }
}

export function listRecentKnowledge(limit = 8): RecentKnowledgeItem[] {
  const out: RecentKnowledgeItem[] = [];
  const cats = listKnowledgeCategories();
  for (const c of cats) {
    const dir = path.join(KNOWLEDGE_ROOT, c);
    try {
      if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) continue;
      walk(dir, "", out, c);
    } catch {
      // ignore
    }
  }

  return out.sort((a, b) => b.updatedAtMs - a.updatedAtMs).slice(0, Math.max(0, limit));
}

export type RecentInsightItem = {
  videoId: string;
  updatedAtMs: number;
};

let _recentInsightsCache: { dirMtimeMs: number; items: RecentInsightItem[] } | undefined;

export function listRecentInsights(limit = 8): RecentInsightItem[] {
  const base = insightsBaseDir();
  try {
    const dirSt = fs.statSync(base);
    if (_recentInsightsCache && _recentInsightsCache.dirMtimeMs === dirSt.mtimeMs) {
      return _recentInsightsCache.items.slice(0, limit);
    }

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
      } catch {
        // ignore
      }
    }

    const sorted = items.sort((a, b) => b.updatedAtMs - a.updatedAtMs);
    _recentInsightsCache = { dirMtimeMs: dirSt.mtimeMs, items: sorted };
    return sorted.slice(0, limit);
  } catch {
    return [];
  }
}
