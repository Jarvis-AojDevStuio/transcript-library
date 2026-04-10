import { describe, expect, it } from "vitest";

/**
 * sync-hook route tests — updated for retired endpoint behavior.
 *
 * The /api/sync-hook endpoint has been retired. It returns 410 Gone for all
 * requests. These tests verify the retirement contract.
 */
describe("sync-hook route (retired)", () => {
  it("returns 410 Gone for POST requests", async () => {
    const { POST } = await import("@/app/api/sync-hook/route");

    const response = await POST(new Request("http://localhost/api/sync-hook", { method: "POST" }));

    expect(response.status).toBe(410);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(typeof body.error).toBe("string");
    expect(body.error.length).toBeGreaterThan(0);
  });

  it("returns 410 even with a valid Bearer token", async () => {
    const { POST } = await import("@/app/api/sync-hook/route");

    const response = await POST(
      new Request("http://localhost/api/sync-hook", {
        method: "POST",
        headers: {
          authorization: "Bearer any-token",
          "content-type": "application/json",
        },
        body: JSON.stringify({ trigger: "sync" }),
      }),
    );

    expect(response.status).toBe(410);
  });

  it("response body mentions retirement or embedded pipeline", async () => {
    const { POST } = await import("@/app/api/sync-hook/route");

    const response = await POST(new Request("http://localhost/api/sync-hook", { method: "POST" }));

    const body = await response.json();
    // Error message should explain what happened
    expect(body.error).toMatch(/retired|pipeline/i);
  });
});
