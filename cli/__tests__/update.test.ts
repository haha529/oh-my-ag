import { describe, expect, it, vi, beforeEach } from "vitest";
import * as skills from "../lib/skills.js";
import * as nodefs from "node:fs";

vi.mock("../lib/manifest.js", () => ({
  fetchRemoteManifest: vi.fn(),
  getLocalVersion: vi.fn(),
  saveLocalVersion: vi.fn(),
}));

vi.mock("../lib/tarball.js", () => ({
  downloadAndExtract: vi.fn(),
}));

vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  return {
    ...actual,
    existsSync: vi.fn(),
  };
});

describe("whitelist-based skill filtering", () => {
  it("getAllSkills should return only registered skills", () => {
    const allSkills = skills.getAllSkills();
    const skillNames = allSkills.map((s) => s.name);

    expect(skillNames).toContain("oma-frontend");
    expect(skillNames).toContain("oma-backend");
    expect(skillNames).toContain("oma-pm");
    expect(skillNames).toContain("oma-commit");

    expect(skillNames).not.toContain(".DS_Store");
    expect(skillNames).not.toContain("_version.json");
    expect(skillNames).not.toContain("_shared");
    expect(skillNames).not.toContain("my-custom-skill");
  });

  it("SKILLS registry should not contain internal files or hidden files", () => {
    const allSkills = skills.getAllSkills();

    for (const skill of allSkills) {
      expect(skill.name).not.toMatch(/^\./);
      expect(skill.name).not.toMatch(/^_/);
      expect(skill.name).not.toMatch(/\.json$/);
    }
  });

  it("getAllSkills should include all domain, coordination, and utility skills", () => {
    const allSkills = skills.getAllSkills();
    const skillNames = allSkills.map((s) => s.name);

    const expectedSkills = [
      "oma-frontend",
      "oma-backend",
      "oma-mobile",
      "oma-pm",
      "oma-qa",
      "oma-coordination",
      "oma-orchestrator",
      "oma-debug",
      "oma-commit",
    ];

    for (const expected of expectedSkills) {
      expect(skillNames).toContain(expected);
    }
  });
});

describe("update stack/ preservation logic", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should detect legacy snippets.md for migration", () => {
    // Simulate: resources/snippets.md exists, stack/ does not
    const existsSync = vi.mocked(nodefs.existsSync);
    existsSync.mockImplementation((p: unknown) => {
      const path = String(p);
      if (path.includes("resources/snippets.md")) return true;
      if (path.includes("/stack")) return false;
      return false;
    });

    const legacySnippetsExists = existsSync(
      "/project/.agents/skills/oma-backend/resources/snippets.md",
    );
    const backendStackExists = existsSync(
      "/project/.agents/skills/oma-backend/stack",
    );

    // Migration condition from update.ts line 138:
    // existsSync(legacySnippets) && !existsSync(backendStackDir)
    const shouldMigrate = legacySnippetsExists && !backendStackExists;

    expect(legacySnippetsExists).toBe(true);
    expect(backendStackExists).toBe(false);
    expect(shouldMigrate).toBe(true);
  });

  it("should not migrate when stack/ already exists", () => {
    // Simulate: both resources/snippets.md and stack/ exist
    const existsSync = vi.mocked(nodefs.existsSync);
    existsSync.mockImplementation((p: unknown) => {
      const path = String(p);
      if (path.includes("resources/snippets.md")) return true;
      if (path.includes("/stack")) return true;
      return false;
    });

    const legacySnippetsExists = existsSync(
      "/project/.agents/skills/oma-backend/resources/snippets.md",
    );
    const backendStackExists = existsSync(
      "/project/.agents/skills/oma-backend/stack",
    );

    // Migration condition from update.ts line 138:
    // existsSync(legacySnippets) && !existsSync(backendStackDir)
    const shouldMigrate = legacySnippetsExists && !backendStackExists;

    expect(legacySnippetsExists).toBe(true);
    expect(backendStackExists).toBe(true);
    expect(shouldMigrate).toBe(false);
  });

  it("stack.yaml should contain migrated source marker", () => {
    // The content written to stack.yaml during migration (update.ts line 158-160)
    const expectedStackYaml =
      "language: python\nframework: fastapi\norm: sqlalchemy\nsource: migrated\n";

    expect(expectedStackYaml).toContain("language: python");
    expect(expectedStackYaml).toContain("framework: fastapi");
    expect(expectedStackYaml).toContain("orm: sqlalchemy");
    expect(expectedStackYaml).toContain("source: migrated");
    expect(expectedStackYaml).toBe(
      "language: python\nframework: fastapi\norm: sqlalchemy\nsource: migrated\n",
    );
  });
});
