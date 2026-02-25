import fs from "node:fs";
import path from "node:path";
import { atomicWriteJson } from "@/lib/analysis";

export type CatalogEntry = {
  channel: string; // Filesystem-safe channel name
  slug: string; // slugify(title)
  date: string; // YYYY-MM-DD from publishedDate
};

export type CatalogMap = Record<string, CatalogEntry>; // key = videoId

const CATALOG_MAP_PATH = path.join(process.cwd(), "data", "catalog-map.json");

export function readCatalogMap(): CatalogMap {
  try {
    const raw = fs.readFileSync(CATALOG_MAP_PATH, "utf8");
    return JSON.parse(raw) as CatalogMap;
  } catch {
    return {};
  }
}

export function writeCatalogMap(map: CatalogMap): void {
  atomicWriteJson(CATALOG_MAP_PATH, map);
}

export function addCatalogEntry(videoId: string, entry: CatalogEntry): void {
  const map = readCatalogMap();
  map[videoId] = entry;
  writeCatalogMap(map);
}

/**
 * Resolve the insight directory path for a videoId via catalog-map.
 * Returns `{channel}/{date}_{slug}` or null if not in the map.
 */
export function resolveInsightPath(videoId: string): string | null {
  const map = readCatalogMap();
  const entry = map[videoId];
  if (!entry) return null;
  return `${entry.channel}/${entry.date}_${entry.slug}`;
}
