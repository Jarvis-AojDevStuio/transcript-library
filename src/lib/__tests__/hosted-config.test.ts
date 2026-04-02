import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("hosted-config", () => {
  const originalEnv = { ...process.env };
  const tempDirs: string[] = [];

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.resetModules();

    while (tempDirs.length > 0) {
      const dir = tempDirs.pop();
      if (dir) fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  async function loadModule() {
    return await import("@/lib/hosted-config");
  }

  function makeTempDir(prefix: string) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
    tempDirs.push(dir);
    return dir;
  }

  function makeHostedRepoFixture(options?: {
    detachedHead?: boolean;
    catalogDirName?: string;
    withRefreshRecord?: boolean;
    withValidationReport?: boolean;
  }) {
    const repoRoot = makeTempDir("hosted-config-repo-");
    execFileSync("git", ["init", "-b", "main"], { cwd: repoRoot, stdio: "ignore" });
    execFileSync("git", ["config", "user.name", "Transcript Library Tests"], {
      cwd: repoRoot,
      stdio: "ignore",
    });
    execFileSync("git", ["config", "user.email", "tests@example.com"], {
      cwd: repoRoot,
      stdio: "ignore",
    });

    fs.mkdirSync(path.join(repoRoot, "youtube-transcripts", "index"), { recursive: true });
    fs.writeFileSync(
      path.join(repoRoot, "youtube-transcripts", "index", "videos.csv"),
      "video_id,title\nabc123xyz00,Test Video\n",
    );
    fs.writeFileSync(path.join(repoRoot, "README.md"), "fixture repo\n");

    execFileSync("git", ["add", "."], { cwd: repoRoot, stdio: "ignore" });
    execFileSync("git", ["commit", "-m", "initial"], { cwd: repoRoot, stdio: "ignore" });

    if (options?.detachedHead) {
      const head = execFileSync("git", ["rev-parse", "HEAD"], {
        cwd: repoRoot,
        encoding: "utf8",
      }).trim();
      execFileSync("git", ["checkout", head], { cwd: repoRoot, stdio: "ignore" });
    }

    const catalogRoot = makeTempDir(options?.catalogDirName ?? "hosted-config-catalog-");
    if (options?.withRefreshRecord) {
      fs.writeFileSync(
        path.join(catalogRoot, "last-source-refresh.json"),
        JSON.stringify({ outcome: "noop", phase: "completed" }, null, 2),
      );
    }

    if (options?.withValidationReport) {
      fs.writeFileSync(
        path.join(catalogRoot, "last-import-validation.json"),
        JSON.stringify({ catalogVersion: "fixture-version" }, null, 2),
      );
    }

    return { repoRoot, catalogRoot };
  }

  function configureHostedEnv(
    fixture = makeHostedRepoFixture({ withRefreshRecord: true, withValidationReport: true }),
  ) {
    process.env.HOSTED = "true";
    process.env.PLAYLIST_TRANSCRIPTS_REPO = fixture.repoRoot;
    process.env.CATALOG_DB_PATH = path.join(fixture.catalogRoot, "catalog.db");
    process.env.PRIVATE_API_TOKEN = "test-token";
    process.env.SYNC_TOKEN = "sync-secret";
    process.env.PLAYLIST_TRANSCRIPTS_BRANCH = "main";
    process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";
    process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN = "aojdev.cloudflareaccess.com";
    return fixture;
  }

  it("reports local dev when HOSTED is unset", async () => {
    delete process.env.HOSTED;
    const { isHosted, isLocalDev } = await loadModule();
    expect(isHosted()).toBe(false);
    expect(isLocalDev()).toBe(true);
  });

  it("reports hosted when HOSTED=true", async () => {
    process.env.HOSTED = "true";
    const { isHosted, isLocalDev } = await loadModule();
    expect(isHosted()).toBe(true);
    expect(isLocalDev()).toBe(false);
  });

  it("reports hosted when HOSTED=1", async () => {
    process.env.HOSTED = "1";
    const { isHosted } = await loadModule();
    expect(isHosted()).toBe(true);
  });

  it("reports local dev for other HOSTED values", async () => {
    process.env.HOSTED = "false";
    const { isHosted } = await loadModule();
    expect(isHosted()).toBe(false);
  });

  it("passes in local dev with no env vars", async () => {
    delete process.env.HOSTED;
    delete process.env.PLAYLIST_TRANSCRIPTS_REPO;
    delete process.env.PRIVATE_API_TOKEN;
    delete process.env.CLOUDFLARE_ACCESS_AUD;
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(true);
    expect(result.mode).toBe("local");
    expect(result.errors).toHaveLength(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it("fails in hosted mode when PLAYLIST_TRANSCRIPTS_REPO is missing", async () => {
    process.env.HOSTED = "true";
    delete process.env.PLAYLIST_TRANSCRIPTS_REPO;
    process.env.PRIVATE_API_TOKEN = "test-token";
    process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("PLAYLIST_TRANSCRIPTS_REPO"))).toBe(true);
  });

  it("fails in hosted mode when PLAYLIST_TRANSCRIPTS_REPO does not exist", async () => {
    process.env.HOSTED = "true";
    process.env.PLAYLIST_TRANSCRIPTS_REPO = path.join(os.tmpdir(), "missing-transcript-repo");
    process.env.PRIVATE_API_TOKEN = "test-token";
    process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("does not exist"))).toBe(true);
  });

  it("fails in hosted mode when PLAYLIST_TRANSCRIPTS_REPO is not a git checkout", async () => {
    const repoRoot = makeTempDir("hosted-config-not-git-");
    process.env.HOSTED = "true";
    process.env.PLAYLIST_TRANSCRIPTS_REPO = repoRoot;
    process.env.PRIVATE_API_TOKEN = "test-token";
    process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("git checkout"))).toBe(true);
  });

  it("fails in hosted mode when PRIVATE_API_TOKEN is missing", async () => {
    const fixture = makeHostedRepoFixture();
    process.env.HOSTED = "true";
    process.env.PLAYLIST_TRANSCRIPTS_REPO = fixture.repoRoot;
    process.env.CATALOG_DB_PATH = path.join(fixture.catalogRoot, "catalog.db");
    process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";
    delete process.env.PRIVATE_API_TOKEN;
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("PRIVATE_API_TOKEN"))).toBe(true);
  });

  it("fails in hosted mode when Cloudflare Access audience is missing", async () => {
    configureHostedEnv();
    delete process.env.CLOUDFLARE_ACCESS_AUD;
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("CLOUDFLARE_ACCESS_AUD"))).toBe(true);
  });

  it("passes in hosted mode when required vars are set and repo is a git checkout", async () => {
    configureHostedEnv();
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(true);
    expect(result.mode).toBe("hosted");
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  it("warns in hosted mode when SYNC_TOKEN is missing", async () => {
    configureHostedEnv();
    delete process.env.SYNC_TOKEN;
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(true);
    expect(result.warnings.some((w) => w.includes("SYNC_TOKEN"))).toBe(true);
  });

  it("warns in hosted mode when Cloudflare team domain is missing so trust assumptions stay explicit", async () => {
    configureHostedEnv();
    delete process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN;
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(true);
    expect(result.warnings.some((w) => w.includes("CLOUDFLARE_ACCESS_TEAM_DOMAIN"))).toBe(true);
  });

  it("warns in hosted mode when the repo is detached HEAD and no branch is configured", async () => {
    const fixture = makeHostedRepoFixture({
      detachedHead: true,
      withRefreshRecord: true,
      withValidationReport: true,
    });
    configureHostedEnv(fixture);
    delete process.env.PLAYLIST_TRANSCRIPTS_BRANCH;
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(true);
    expect(
      result.warnings.some(
        (w) => w.includes("PLAYLIST_TRANSCRIPTS_BRANCH") && w.includes("detached HEAD"),
      ),
    ).toBe(true);
  });

  it("warns in hosted mode when refresh evidence files are missing", async () => {
    const fixture = makeHostedRepoFixture();
    configureHostedEnv(fixture);
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(true);
    expect(result.warnings.some((w) => w.includes("last-source-refresh.json"))).toBe(true);
    expect(result.warnings.some((w) => w.includes("last-import-validation.json"))).toBe(true);
  });

  it("throws in hosted mode on missing required vars", async () => {
    process.env.HOSTED = "true";
    delete process.env.PLAYLIST_TRANSCRIPTS_REPO;
    delete process.env.PRIVATE_API_TOKEN;
    delete process.env.CLOUDFLARE_ACCESS_AUD;
    const { assertPreflight } = await loadModule();
    expect(() => assertPreflight()).toThrow(/Hosted preflight failed/);
  });

  it("does not throw in local dev with no vars", async () => {
    delete process.env.HOSTED;
    delete process.env.PLAYLIST_TRANSCRIPTS_REPO;
    delete process.env.PRIVATE_API_TOKEN;
    delete process.env.CLOUDFLARE_ACCESS_AUD;
    const { assertPreflight } = await loadModule();
    expect(() => assertPreflight()).not.toThrow();
  });
});
