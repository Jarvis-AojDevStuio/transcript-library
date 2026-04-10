import fs from "node:fs";
import os from "node:os";
import path from "node:path";
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

  function makePipelineFixture(options?: { withYoutubeTranscripts?: boolean }) {
    const cwd = makeTempDir("hosted-config-cwd-");
    const withTranscripts = options?.withYoutubeTranscripts !== false;
    if (withTranscripts) {
      fs.mkdirSync(path.join(cwd, "pipeline", "youtube-transcripts"), { recursive: true });
    }
    return cwd;
  }

  function configureHostedEnv(cwdOverride?: string) {
    process.env.HOSTED = "true";
    process.env.PRIVATE_API_TOKEN = "test-token";
    process.env.SYNC_TOKEN = "sync-secret";
    process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";
    process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN = "aojdev.cloudflareaccess.com";
    // Clear the repo override so the embedded pipeline/ path is used.
    delete process.env.PLAYLIST_TRANSCRIPTS_REPO;

    if (cwdOverride) {
      // Stub process.cwd() so hosted-config finds the fixture pipeline/.
      vi.spyOn(process, "cwd").mockReturnValue(cwdOverride);
    }
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

  it("fails in hosted mode when PRIVATE_API_TOKEN is missing", async () => {
    const cwd = makePipelineFixture();
    configureHostedEnv(cwd);
    delete process.env.PRIVATE_API_TOKEN;
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("PRIVATE_API_TOKEN"))).toBe(true);
  });

  it("fails in hosted mode when Cloudflare Access audience is missing", async () => {
    const cwd = makePipelineFixture();
    configureHostedEnv(cwd);
    delete process.env.CLOUDFLARE_ACCESS_AUD;
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("CLOUDFLARE_ACCESS_AUD"))).toBe(true);
  });

  it("fails in hosted mode when pipeline/youtube-transcripts/ does not exist and PLAYLIST_TRANSCRIPTS_REPO is not set", async () => {
    const cwd = makePipelineFixture({ withYoutubeTranscripts: false });
    configureHostedEnv(cwd);
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("pipeline/youtube-transcripts/"))).toBe(true);
  });

  it("passes in hosted mode when PLAYLIST_TRANSCRIPTS_REPO is set (overrides pipeline/ check)", async () => {
    const repoRoot = makeTempDir("hosted-config-override-repo-");
    configureHostedEnv();
    process.env.PLAYLIST_TRANSCRIPTS_REPO = repoRoot;
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    // pipeline/ check is skipped when PLAYLIST_TRANSCRIPTS_REPO is set.
    // Should only fail on Cloudflare/token checks which are configured.
    expect(result.errors.filter((e) => e.includes("pipeline/youtube-transcripts/"))).toHaveLength(
      0,
    );
  });

  it("passes in hosted mode when required vars are set and pipeline/ exists", async () => {
    const cwd = makePipelineFixture();
    configureHostedEnv(cwd);
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(true);
    expect(result.mode).toBe("hosted");
    expect(result.errors).toHaveLength(0);
  });

  it("warns in hosted mode when SYNC_TOKEN is missing (retired endpoint note)", async () => {
    const cwd = makePipelineFixture();
    configureHostedEnv(cwd);
    delete process.env.SYNC_TOKEN;
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(true);
    expect(result.warnings.some((w) => w.includes("SYNC_TOKEN"))).toBe(true);
  });

  it("warns in hosted mode when Cloudflare team domain is missing so trust assumptions stay explicit", async () => {
    const cwd = makePipelineFixture();
    configureHostedEnv(cwd);
    delete process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN;
    const { runPreflight } = await loadModule();
    const result = runPreflight();
    expect(result.ok).toBe(true);
    expect(result.warnings.some((w) => w.includes("CLOUDFLARE_ACCESS_TEAM_DOMAIN"))).toBe(true);
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
