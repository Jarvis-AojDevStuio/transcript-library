import { describe, expect, it } from "vitest";

/**
 * source-refresh tests — updated for retired no-op behavior.
 *
 * The source-refresh module previously performed runtime git fetch/merge on an
 * external transcript repo. That behavior has been retired. All functions are
 * now no-ops. These tests verify the no-op contract.
 */
describe("source refresh service (retired)", () => {
  it("returns a noop outcome without touching git", async () => {
    const { refreshSourceCatalog } = await import("@/lib/source-refresh");
    const result = refreshSourceCatalog({ trigger: "cli" });

    expect(result.outcome).toBe("noop");
    expect(result.phase).toBe("completed");
    expect(result.trigger).toBe("cli");
    expect(result.schemaVersion).toBe(1);
  });

  it("returns a noop outcome for sync-hook trigger", async () => {
    const { refreshSourceCatalog } = await import("@/lib/source-refresh");
    const result = refreshSourceCatalog({ trigger: "sync-hook" });

    expect(result.outcome).toBe("noop");
    expect(result.phase).toBe("completed");
    expect(result.trigger).toBe("sync-hook");
  });

  it("includes a completed timestamp", async () => {
    const before = new Date().toISOString();
    const { refreshSourceCatalog } = await import("@/lib/source-refresh");
    const result = refreshSourceCatalog({ trigger: "cli" });
    const after = new Date().toISOString();

    expect(result.startedAt >= before).toBe(true);
    expect(result.completedAt <= after).toBe(true);
  });

  it("passes through request metadata", async () => {
    const { refreshSourceCatalog } = await import("@/lib/source-refresh");
    const request = {
      requestKey: "sync-hook:test-key",
      receivedAt: new Date().toISOString(),
      method: "POST",
      path: "/api/sync-hook",
    };
    const result = refreshSourceCatalog({ trigger: "sync-hook", request });

    expect(result.request).toEqual(request);
  });

  it("repo stub fields are present", async () => {
    const { refreshSourceCatalog } = await import("@/lib/source-refresh");
    const result = refreshSourceCatalog({ trigger: "cli" });

    expect(result.repo).toBeDefined();
    expect(typeof result.repo.remote).toBe("string");
    expect(typeof result.repo.branch).toBe("string");
  });

  it("sourceRefreshRecordPath returns a path string", async () => {
    const { sourceRefreshRecordPath } = await import("@/lib/source-refresh");
    const p = sourceRefreshRecordPath();
    expect(typeof p).toBe("string");
    expect(p.length).toBeGreaterThan(0);
  });
});
