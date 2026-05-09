// cli/commands/model/sources/cursor.ts
// Fetches model list from the Cursor CLI via `cursor agent --list-models`.

import { spawnSync } from "node:child_process";

export type CursorModel = {
  slug: string;
};

export type CursorResult =
  | { ok: true; models: CursorModel[] }
  | { ok: false; error: string };

const MODEL_LINE_PATTERN = /^([a-z0-9][a-z0-9.-]*) - .+$/;

function parseModelLines(stdout: string): CursorModel[] {
  const models: CursorModel[] = [];
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "Available models") continue;
    const match = MODEL_LINE_PATTERN.exec(trimmed);
    if (match?.[1]) {
      models.push({ slug: `cursor/${match[1]}` });
    }
  }
  return models;
}

export function fetchCursorModels(): CursorResult {
  let result: ReturnType<typeof spawnSync>;
  try {
    result = spawnSync("cursor", ["agent", "--list-models"], {
      encoding: "utf-8",
      timeout: 15_000,
    });
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") {
      return { ok: false, error: "cursor CLI not found (ENOENT)" };
    }
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  if (result.error) {
    const errCode = (result.error as NodeJS.ErrnoException).code;
    if (errCode === "ENOENT") {
      return { ok: false, error: "cursor CLI not found (ENOENT)" };
    }
    return {
      ok: false,
      error:
        result.error instanceof Error
          ? result.error.message
          : String(result.error),
    };
  }

  if (result.status !== 0) {
    const stderr = result.stderr ? String(result.stderr).trim() : "";
    return {
      ok: false,
      error: `cursor CLI exited with status ${result.status}${stderr ? `: ${stderr}` : ""}`,
    };
  }

  const stdout = result.stdout ? String(result.stdout) : "";
  if (!stdout.trim()) {
    return { ok: false, error: "cursor CLI returned empty output" };
  }

  const models = parseModelLines(stdout);
  if (models.length === 0) {
    return { ok: false, error: "No models found in cursor CLI output" };
  }

  return { ok: true, models };
}
