#!/usr/bin/env bun
/**
 * One-time migration: move data/insights/{videoId}/ to
 * data/insights/{channel}/{date}_{slug}/ and build catalog-map.json.
 *
 * Usage:
 *   bun scripts/migrate-insights.ts              # Migrate all
 *   bun scripts/migrate-insights.ts --dry-run    # Preview changes
 *   bun scripts/migrate-insights.ts --keep-old   # Copy without deleting originals
 */

import fs from "node:fs";
import path from "node:path";
import { groupVideos } from "../src/lib/catalog";
import { readCatalogMap, writeCatalogMap, type CatalogMap } from "../src/lib/catalog-map";
import { slugify, channelSlug } from "../src/lib/slugify";

const hasFlag = (name: string) => process.argv.includes(`--${name}`);
const dryRun = hasFlag("dry-run");
const keepOld = hasFlag("keep-old");

const INSIGHTS_BASE = path.join(process.cwd(), "data", "insights");
const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{6,11}$/;

function main() {
  const videos = groupVideos();
  const catalogMap = readCatalogMap();
  let migrated = 0;
  let skipped = 0;
  let warnings = 0;

  console.log(`\nInsights Migration`);
  console.log(`${"=".repeat(50)}`);
  console.log(`Mode: ${dryRun ? "DRY RUN" : keepOld ? "COPY (keep old)" : "MOVE (delete old)"}`);
  console.log();

  // Scan for videoId-based directories
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(INSIGHTS_BASE, { withFileTypes: true });
  } catch {
    console.error("No insights directory found");
    return;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      // Handle legacy flat files: {videoId}.md
      if (entry.isFile() && entry.name.endsWith(".md")) {
        const videoId = entry.name.slice(0, -3);
        if (!VIDEO_ID_RE.test(videoId)) continue;

        const video = videos.get(videoId);
        if (!video) {
          console.log(`  WARN: ${videoId} (flat file) not found in catalog — skipping`);
          warnings++;
          continue;
        }

        const channel = channelSlug(video.channel);
        const date = video.publishedDate.slice(0, 10);
        const slug = slugify(video.title);
        const targetDir = path.join(INSIGHTS_BASE, channel, `${date}_${slug}`);
        const targetFile = path.join(targetDir, "analysis.md");

        if (fs.existsSync(targetFile)) {
          skipped++;
          continue;
        }

        console.log(`  ${videoId}.md → ${channel}/${date}_${slug}/analysis.md`);

        if (!dryRun) {
          fs.mkdirSync(targetDir, { recursive: true });
          fs.copyFileSync(path.join(INSIGHTS_BASE, entry.name), targetFile);
          catalogMap[videoId] = { channel, slug, date };
          if (!keepOld) {
            fs.unlinkSync(path.join(INSIGHTS_BASE, entry.name));
          }
        }
        migrated++;
      }
      continue;
    }

    // Skip non-videoId directories (channel directories, hidden dirs)
    if (!VIDEO_ID_RE.test(entry.name)) continue;

    const videoId = entry.name;
    const srcDir = path.join(INSIGHTS_BASE, videoId);
    const srcAnalysis = path.join(srcDir, "analysis.md");

    // Skip if no analysis.md
    if (!fs.existsSync(srcAnalysis)) {
      skipped++;
      continue;
    }

    // Look up video metadata
    const video = videos.get(videoId);
    if (!video) {
      console.log(`  WARN: ${videoId} not found in catalog — skipping`);
      warnings++;
      continue;
    }

    const channel = channelSlug(video.channel);
    const date = video.publishedDate.slice(0, 10);
    let slug = slugify(video.title);
    const relBase = `${channel}/${date}_${slug}`;
    let targetDir = path.join(INSIGHTS_BASE, channel, `${date}_${slug}`);

    // Collision detection
    if (fs.existsSync(targetDir)) {
      // Check if it's already this videoId (already migrated)
      if (catalogMap[videoId]?.slug === slug) {
        skipped++;
        continue;
      }
      // Collision with a different video — append suffix
      let suffix = 2;
      while (fs.existsSync(path.join(INSIGHTS_BASE, channel, `${date}_${slug}-${suffix}`))) {
        suffix++;
      }
      slug = `${slug}-${suffix}`;
      targetDir = path.join(INSIGHTS_BASE, channel, `${date}_${slug}`);
      console.log(`  COLLISION: ${videoId} → using slug "${slug}"`);
    }

    const targetAnalysis = path.join(targetDir, "analysis.md");
    const targetStatus = path.join(targetDir, "status.json");

    console.log(`  ${videoId}/ → ${channel}/${date}_${slug}/`);

    if (!dryRun) {
      fs.mkdirSync(targetDir, { recursive: true });

      // Copy analysis.md
      fs.copyFileSync(srcAnalysis, targetAnalysis);

      // Copy status.json if exists
      const srcStatus = path.join(srcDir, "status.json");
      if (fs.existsSync(srcStatus)) {
        fs.copyFileSync(srcStatus, targetStatus);
      }

      // Validate
      if (!fs.existsSync(targetAnalysis) || fs.statSync(targetAnalysis).size === 0) {
        console.log(`  ERROR: Validation failed for ${videoId} — keeping original`);
        warnings++;
        continue;
      }

      // Update catalog-map
      catalogMap[videoId] = { channel, slug, date };

      // Delete original (unless --keep-old)
      if (!keepOld) {
        fs.rmSync(srcDir, { recursive: true, force: true });
      }
    }

    migrated++;
  }

  // Write catalog-map
  if (!dryRun && migrated > 0) {
    writeCatalogMap(catalogMap);
    console.log(`\nWrote catalog-map.json with ${Object.keys(catalogMap).length} entries`);
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Summary: ${migrated} migrated, ${skipped} skipped, ${warnings} warnings`);
}

main();
