#!/usr/bin/env bun

import { spawnSync } from "child_process";

const projectDir =
  process.env.CLAUDE_PROJECT_DIR ||
  new URL("../../", import.meta.url).pathname.replace(/\/$/, "");
const logPath = `${projectDir}/.claude/hooks/setup.maintenance.log`;

const log: string[] = [];
const appendLog = (msg: string) => {
  const line = `[${new Date().toISOString()}] ${msg}`;
  log.push(line);
};

try {
  const input = await Bun.stdin.text();
  const hookInput = JSON.parse(input);

  appendLog(`Maintenance hook started for: ${projectDir}`);
  appendLog(`Hook event: ${hookInput?.hookEventName || "Setup"}`);

  // Update dependencies
  appendLog("Updating dependencies with bun...");
  const update = spawnSync("bun", ["update"], {
    cwd: projectDir,
    stdio: ["pipe", "pipe", "pipe"],
    timeout: 60_000,
  });

  if (update.status === 0) {
    appendLog("bun update completed successfully");
  } else {
    const stderr = update.stderr?.toString().trim();
    appendLog(`bun update failed (exit ${update.status}): ${stderr}`);
  }

  // Type check
  appendLog("Running type check...");
  const tsc = spawnSync("bunx", ["tsc", "--noEmit"], {
    cwd: projectDir,
    stdio: ["pipe", "pipe", "pipe"],
    timeout: 30_000,
  });
  appendLog(
    `Type check: ${tsc.status === 0 ? "passed" : `failed (exit ${tsc.status})`}`,
  );

  // Lint check
  appendLog("Running lint...");
  const lint = spawnSync("bun", ["run", "lint"], {
    cwd: projectDir,
    stdio: ["pipe", "pipe", "pipe"],
    timeout: 30_000,
  });
  appendLog(
    `Lint: ${lint.status === 0 ? "passed" : `failed (exit ${lint.status})`}`,
  );

  // Write log
  await Bun.write(logPath, log.join("\n") + "\n");

  const output = {
    hookSpecificOutput: {
      hookEventName: "Setup",
      additionalContext: `Maintenance complete: update ${update.status === 0 ? "ok" : "fail"}, tsc ${tsc.status === 0 ? "ok" : "fail"}, lint ${lint.status === 0 ? "ok" : "fail"}. Log: ${logPath}`,
    },
  };

  process.stdout.write(JSON.stringify(output));
} catch (err) {
  appendLog(`Fatal error: ${err}`);
  await Bun.write(logPath, log.join("\n") + "\n");
  process.exit(2);
}
