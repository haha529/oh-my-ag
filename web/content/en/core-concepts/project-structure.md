---
title: Project Structure
description: Where everything lives and why it's organized this way.
---

# Project Structure

oh-my-agent organizes everything into a few key directories. Here's what you'll see after installation.

## The Big Picture

```text
your-project/
├── .agents/              ← Single Source of Truth
│   ├── config/           ← Your preferences
│   ├── skills/           ← Agent capabilities
│   ├── workflows/        ← Slash command definitions
│   ├── agents/           ← Subagent definitions
│   ├── plan.json         ← Generated plan output
│   ├── state/            ← Active workflow state
│   ├── results/          ← Agent result files
│   └── mcp.json          ← MCP server config
│
├── .claude/              ← IDE integration layer
│   ├── settings.json     ← Hooks and permissions
│   ├── hooks/            ← Keyword detection, HUD
│   ├── skills/           ← Symlinks to .agents/skills/
│   └── agents/           ← Subagent definitions for IDE
│
└── .serena/              ← Runtime state
    └── memories/         ← Orchestration memory files
```

## `.agents/` — The Source of Truth

This is the core. Everything agents need lives here.

### `config/`
- **`user-preferences.yaml`** — Your language, timezone, default CLI, per-agent CLI mapping

### `skills/`
Where agent expertise lives. Each skill has a `SKILL.md` and a `resources/` directory.

- **`_shared/`** — Common resources used by all agents (routing, templates, checklists)
- **`oma-frontend/`**, **`oma-backend/`**, etc. — Domain-specific skills

### `workflows/`
Markdown files that define slash command behavior. These are the scripts agents follow when you type `/plan`, `/coordinate`, `/review`, etc.

### `agents/`
Subagent definitions — the specs for spawning agents via the CLI or Task tool.

## `.claude/` — IDE Integration

This connects oh-my-agent to Claude Code (and other IDEs via symlinks).

### `hooks/`
- **`triggers.json`** — Keyword-to-workflow mapping in 11 languages
- **`keyword-detector.ts`** — The logic that auto-detects workflows from your input
- **`persistent-mode.ts`** — Keeps persistent workflows running until done
- **`hud.ts`** — The `[OMA]` status bar indicator

### `skills/` and `agents/`
Symlinks pointing to `.agents/` — keeps one source of truth while making skills visible to the IDE.

## `.serena/memories/` — Runtime State

Where agents write their progress during execution:

| File | What's In It |
|------|-------------|
| `orchestrator-session.md` | Session ID, status, start time |
| `task-board.md` | Which agent has which task |
| `progress-{agent}.md` | Turn-by-turn progress updates |
| `result-{agent}.md` | Final output from each agent |

Dashboards watch this directory for live updates.

## For oh-my-agent Source Repo

If you're working on oh-my-agent itself (not just using it), the repo is a monorepo:

```text
oh-my-agent/
├── cli/              ← CLI tool source (TypeScript)
├── web/              ← Documentation site (Next.js)
├── action/           ← GitHub Action for auto-updates
├── docs/             ← Translated READMEs + specs
└── .agents/          ← Editable (this IS the source)
```
