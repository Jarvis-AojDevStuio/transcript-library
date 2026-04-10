import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { afterEach, describe, expect, it, vi } from "vitest";
import { rebuildCatalogFromCsv } from "@/lib/catalog-import";

const originalCatalogDbPath = process.env.CATALOG_DB_PATH;
const originalRepoRoot = process.env.PLAYLIST_TRANSCRIPTS_REPO;
const originalRemote = process.env.PLAYLIST_TRANSCRIPTS_REMOTE;
const originalBranch = process.env.PLAYLIST_TRANSCRIPTS_BRANCH;
const csvHeader = [
  "video_id",
  "parent_video_id",
  "title",
  "channel",
  "topic",
  "published_date",
  "ingested_date",
  "word_count",
  "chunk",
  "total_chunks",
  "file_path",
].join(",");

type CatalogRow = {
  videoId: string;
  title: string;
  channel: string;
  topic: string;
  publishedDate: string;
  ingestedDate: string;
  wordCount: string;
  chunk: string;
  totalChunks: string;
  filePath: string;
  transcript: string;
};

function createFixtureRepo(rows: string[][]) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-cache-"));
  const transcriptsRoot = path.join(root, "youtube-transcripts");
  const indexRoot = path.join(transcriptsRoot, "index");
  fs.mkdirSync(indexRoot, { recursive: true });
  fs.writeFileSync(
    path.join(indexRoot, "videos" + ".csv"),
    [csvHeader, ...rows.map((row) => row.join(","))].join("\n"),
  );
  return {
    root,
    csvPath: path.join(indexRoot, "videos.csv"),
    liveDbPath: path.join(root, "data", "catalog", "catalog.db"),
  };
}

function run(command: string, args: string[], cwd: string): string {
  return execFileSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
  }).trim();
}

function writeRepoState(repoRoot: string, rows: CatalogRow[]) {
  const transcriptsRoot = path.join(repoRoot, "youtube-transcripts");
  const indexRoot = path.join(transcriptsRoot, "index");
  fs.mkdirSync(indexRoot, { recursive: true });

  for (const row of rows) {
    const transcriptPath = path.join(transcriptsRoot, row.filePath);
    fs.mkdirSync(path.dirname(transcriptPath), { recursive: true });
    fs.writeFileSync(transcriptPath, row.transcript);
  }

  fs.writeFileSync(
    path.join(indexRoot, "videos.csv"),
    [
      csvHeader,
      ...rows.map((row) =>
        [
          row.videoId,
          "",
          row.title,
          row.channel,
          row.topic,
          row.publishedDate,
          row.ingestedDate,
          row.wordCount,
          row.chunk,
          row.totalChunks,
          row.filePath,
        ].join(","),
      ),
    ].join("\n"),
  );
}

function commitAll(repoRoot: string, message: string): string {
  run("git", ["add", "."], repoRoot);
  run("git", ["commit", "-m", message], repoRoot);
  return run("git", ["rev-parse", "HEAD"], repoRoot);
}

function setupGitFixture(initialRows: CatalogRow[]) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-cache-refresh-"));
  const remotePath = path.join(root, "remote.git");
  const upstreamPath = path.join(root, "upstream");
  const clonePath = path.join(root, "clone");
  const liveDbPath = path.join(root, "data", "catalog", "catalog.db");

  fs.mkdirSync(upstreamPath, { recursive: true });
  run("git", ["init", "--bare", remotePath], root);
  run("git", ["init", "-b", "master"], upstreamPath);
  run("git", ["config", "user.name", "Transcript Library Tests"], upstreamPath);
  run("git", ["config", "user.email", "tests@example.com"], upstreamPath);
  writeRepoState(upstreamPath, initialRows);
  commitAll(upstreamPath, "initial import");
  run("git", ["remote", "add", "origin", remotePath], upstreamPath);
  run("git", ["push", "-u", "origin", "master"], upstreamPath);
  run("git", ["clone", "-b", "master", remotePath, clonePath], root);

  return {
    root,
    remotePath,
    upstreamPath,
    clonePath,
    liveDbPath,
  };
}

async function loadCatalog() {
  vi.resetModules();
  return import("@/lib/catalog");
}

afterEach(() => {
  vi.resetModules();
  if (originalCatalogDbPath === undefined) {
    delete process.env.CATALOG_DB_PATH;
  } else {
    process.env.CATALOG_DB_PATH = originalCatalogDbPath;
  }

  if (originalRepoRoot === undefined) {
    delete process.env.PLAYLIST_TRANSCRIPTS_REPO;
  } else {
    process.env.PLAYLIST_TRANSCRIPTS_REPO = originalRepoRoot;
  }

  if (originalRemote === undefined) {
    delete process.env.PLAYLIST_TRANSCRIPTS_REMOTE;
  } else {
    process.env.PLAYLIST_TRANSCRIPTS_REMOTE = originalRemote;
  }

  if (originalBranch === undefined) {
    delete process.env.PLAYLIST_TRANSCRIPTS_BRANCH;
  } else {
    process.env.PLAYLIST_TRANSCRIPTS_BRANCH = originalBranch;
  }
});

describe("catalog snapshot caching", () => {
  it("reuses the in-process snapshot when the catalog version has not changed", async () => {
    const fixture = createFixtureRepo([
      [
        "cache-1",
        "",
        "Cached Video",
        "Channel Cache",
        "testing",
        "2026-03-03",
        "2026-03-04",
        "300",
        "1",
        "1",
        "cache/main.md",
      ],
    ]);

    process.env.PLAYLIST_TRANSCRIPTS_REPO = fixture.root;
    process.env.CATALOG_DB_PATH = fixture.liveDbPath;
    rebuildCatalogFromCsv({ csvPath: fixture.csvPath, liveDbPath: fixture.liveDbPath });

    const { groupVideos } = await loadCatalog();

    const first = groupVideos();
    const second = groupVideos();

    expect(second).toBe(first);

    fs.rmSync(fixture.root, { recursive: true, force: true });
  });

  it("invalidates the cached snapshot after a rebuild publishes a new catalog version", async () => {
    const fixture = createFixtureRepo([
      [
        "cache-1",
        "",
        "Cached Video",
        "Channel Cache",
        "testing",
        "2026-03-03",
        "2026-03-04",
        "300",
        "1",
        "1",
        "cache/main.md",
      ],
    ]);

    process.env.PLAYLIST_TRANSCRIPTS_REPO = fixture.root;
    process.env.CATALOG_DB_PATH = fixture.liveDbPath;
    rebuildCatalogFromCsv({ csvPath: fixture.csvPath, liveDbPath: fixture.liveDbPath });

    const { getVideo, groupVideos } = await loadCatalog();
    const firstSnapshot = groupVideos();
    expect(getVideo("cache-1")?.title).toBe("Cached Video");

    fs.writeFileSync(
      fixture.csvPath,
      [
        csvHeader,
        [
          "cache-1",
          "",
          "Refreshed Video",
          "Channel Cache",
          "testing",
          "2026-03-05",
          "2026-03-06",
          "300",
          "1",
          "1",
          "cache/main.md",
        ].join(","),
      ].join("\n"),
    );

    rebuildCatalogFromCsv({ csvPath: fixture.csvPath, liveDbPath: fixture.liveDbPath });

    const secondSnapshot = groupVideos();
    expect(secondSnapshot).not.toBe(firstSnapshot);
    expect(getVideo("cache-1")?.title).toBe("Refreshed Video");

    fs.rmSync(fixture.root, { recursive: true, force: true });
  });

  it("picks up a refreshed catalog snapshot after a catalog rebuild without reloading the module", async () => {
    // source-refresh is retired — transcripts are now embedded in pipeline/.
    // This test verifies the catalog snapshot cache invalidates correctly after
    // a direct rebuildCatalogFromCsv call (the mechanism used in the new model).
    const fixture = setupGitFixture([
      {
        videoId: "cache123xyz",
        title: "Cache Alpha",
        channel: "Channel Cache",
        topic: "testing",
        publishedDate: "2026-03-03",
        ingestedDate: "2026-03-04",
        wordCount: "300",
        chunk: "1",
        totalChunks: "1",
        filePath: "cache/main.md",
        transcript: "Cache alpha transcript",
      },
    ]);

    process.env.PLAYLIST_TRANSCRIPTS_REPO = fixture.clonePath;
    process.env.CATALOG_DB_PATH = fixture.liveDbPath;

    rebuildCatalogFromCsv({ liveDbPath: fixture.liveDbPath });

    const { getVideo, groupVideos } = await loadCatalog();
    const firstSnapshot = groupVideos();
    expect(getVideo("cache123xyz")?.title).toBe("Cache Alpha");
    expect(getVideo("fresh123xyz")).toBeUndefined();

    // Simulate new transcripts arriving in the embedded pipeline/ (write directly to clonePath).
    writeRepoState(fixture.clonePath, [
      {
        videoId: "cache123xyz",
        title: "Cache Alpha",
        channel: "Channel Cache",
        topic: "testing",
        publishedDate: "2026-03-03",
        ingestedDate: "2026-03-04",
        wordCount: "300",
        chunk: "1",
        totalChunks: "1",
        filePath: "cache/main.md",
        transcript: "Cache alpha transcript",
      },
      {
        videoId: "fresh123xyz",
        title: "Fresh Video",
        channel: "Channel Cache",
        topic: "testing",
        publishedDate: "2026-03-07",
        ingestedDate: "2026-03-08",
        wordCount: "340",
        chunk: "1",
        totalChunks: "1",
        filePath: "fresh/main.md",
        transcript: "Fresh transcript",
      },
    ]);

    // Rebuild catalog directly (as would happen during a new deploy).
    rebuildCatalogFromCsv({ liveDbPath: fixture.liveDbPath });

    const secondSnapshot = groupVideos();
    expect(secondSnapshot).not.toBe(firstSnapshot);
    expect(getVideo("fresh123xyz")?.title).toBe("Fresh Video");

    fs.rmSync(fixture.root, { recursive: true, force: true });
  });
});
