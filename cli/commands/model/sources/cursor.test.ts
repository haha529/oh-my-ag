import * as childProcess from "node:child_process";
import { describe, expect, it, vi } from "vitest";
import { fetchCursorModels } from "./cursor.js";

vi.mock("node:child_process", () => ({
  spawnSync: vi.fn(),
}));

const SAMPLE_STDOUT = `Available models

auto - Auto
composer-2-fast - Composer 2 Fast (default)
composer-2 - Composer 2
gpt-5.5-high - GPT-5.5 1M High
`;

describe("fetchCursorModels", () => {
  it("parses normal cursor CLI output correctly", () => {
    vi.mocked(childProcess.spawnSync).mockReturnValueOnce({
      stdout: SAMPLE_STDOUT,
      stderr: "",
      status: 0,
      error: undefined,
      pid: 1234,
      signal: null,
      output: [],
    } as unknown as ReturnType<typeof childProcess.spawnSync>);

    const result = fetchCursorModels();
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("expected ok");

    const slugs = result.models.map((m) => m.slug);
    expect(slugs).toContain("cursor/auto");
    expect(slugs).toContain("cursor/composer-2-fast");
    expect(slugs).toContain("cursor/composer-2");
    expect(slugs).toContain("cursor/gpt-5.5-high");
    expect(slugs).toHaveLength(4);
  });

  it("returns ok:false on ENOENT (cursor not installed)", () => {
    const enoentError = Object.assign(new Error("spawn cursor ENOENT"), {
      code: "ENOENT",
    });
    vi.mocked(childProcess.spawnSync).mockReturnValueOnce({
      stdout: "",
      stderr: "",
      status: null,
      error: enoentError,
      pid: 0,
      signal: null,
      output: [],
    } as unknown as ReturnType<typeof childProcess.spawnSync>);

    const result = fetchCursorModels();
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("expected not ok");
    expect(result.error).toContain("ENOENT");
  });

  it("returns ok:false on non-zero exit status", () => {
    vi.mocked(childProcess.spawnSync).mockReturnValueOnce({
      stdout: "",
      stderr: "error: unknown option",
      status: 1,
      error: undefined,
      pid: 1234,
      signal: null,
      output: [],
    } as unknown as ReturnType<typeof childProcess.spawnSync>);

    const result = fetchCursorModels();
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("expected not ok");
    expect(result.error).toContain("status 1");
  });

  it("returns ok:false on empty stdout", () => {
    vi.mocked(childProcess.spawnSync).mockReturnValueOnce({
      stdout: "",
      stderr: "",
      status: 0,
      error: undefined,
      pid: 1234,
      signal: null,
      output: [],
    } as unknown as ReturnType<typeof childProcess.spawnSync>);

    const result = fetchCursorModels();
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("expected not ok");
    expect(result.error).toMatch(/empty/i);
  });

  it("returns ok:false when stdout has only header with no models", () => {
    vi.mocked(childProcess.spawnSync).mockReturnValueOnce({
      stdout: "Available models\n\n",
      stderr: "",
      status: 0,
      error: undefined,
      pid: 1234,
      signal: null,
      output: [],
    } as unknown as ReturnType<typeof childProcess.spawnSync>);

    const result = fetchCursorModels();
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("expected not ok");
    expect(result.error).toMatch(/No models found/i);
  });

  it("normalizes slugs with cursor/ prefix", () => {
    vi.mocked(childProcess.spawnSync).mockReturnValueOnce({
      stdout: "Available models\n\ncustom-model-1 - Custom Model 1\n",
      stderr: "",
      status: 0,
      error: undefined,
      pid: 1234,
      signal: null,
      output: [],
    } as unknown as ReturnType<typeof childProcess.spawnSync>);

    const result = fetchCursorModels();
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("expected ok");
    expect(result.models[0]?.slug).toBe("cursor/custom-model-1");
  });
});
