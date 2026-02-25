#!/usr/bin/env bun

import { spawnSync } from "child_process";

const projectDir =
  process.env.CLAUDE_PROJECT_DIR || new URL("../../", import.meta.url).pathname.replace(/\/$/, "");
const envFile = process.env.CLAUDE_ENV_FILE;
const logPath = `${projectDir}/.claude/hooks/setup.init.log`;

const log: string[] = [];
const appendLog = (msg: string) => {
  const line = `[${new Date().toISOString()}] ${msg}`;
  log.push(line);
};

try {
  const input = await Bun.stdin.text();
  const hookInput = JSON.parse(input);

  appendLog(`Setup init hook started for: ${projectDir}`);
  appendLog(`Hook event: ${hookInput?.hook_event_name || "SessionStart"}`);

  // Install dependencies with bun
  appendLog("Installing dependencies with bun...");
  const install = spawnSync("bun", ["install"], {
    cwd: projectDir,
    stdio: ["pipe", "pipe", "pipe"],
    timeout: 90_000,
  });

  if (install.status === 0) {
    appendLog("bun install completed successfully");
  } else {
    const stderr = install.stderr?.toString().trim();
    appendLog(`bun install failed (exit ${install.status}): ${stderr}`);
  }

  // Write log
  await Bun.write(logPath, log.join("\n") + "\n");

  // Export to env file if available
  if (envFile) {
    const exports = [`TRANSCRIPT_LIBRARY_DIR=${projectDir}`];
    await Bun.write(envFile, exports.join("\n") + "\n", { append: true });
  }

  // Output structured JSON
  const output = {
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: `Init complete: bun install ${install.status === 0 ? "succeeded" : "failed"}. Log: ${logPath}`,
    },
  };

  process.stdout.write(JSON.stringify(output));
} catch (err) {
  appendLog(`Fatal error: ${err}`);
  await Bun.write(logPath, log.join("\n") + "\n");
  process.exit(2);
}
