---
title: Projectstructuur
description: Waar alles zich bevindt en waarom het zo georganiseerd is.
---

# Projectstructuur

oh-my-agent organiseert alles in een paar belangrijke mappen. Dit is wat je ziet na installatie.

## Het Grote Plaatje

```text
your-project/
├── .agents/              ← Enige Bron van Waarheid
│   ├── config/           ← Jouw voorkeuren
│   ├── skills/           ← Agent-capaciteiten
│   ├── workflows/        ← Slash-commando definities
│   ├── agents/           ← Subagent-definities
│   ├── plan.json         ← Gegenereerd plan-output
│   ├── state/            ← Actieve workflow-status
│   ├── results/          ← Agent-resultaatbestanden
│   └── mcp.json          ← MCP-serverconfiguratie
│
├── .claude/              ← IDE-integratielaag
│   ├── settings.json     ← Hooks en permissies
│   ├── hooks/            ← Trefwoorddetectie, HUD
│   ├── skills/           ← Symlinks naar .agents/skills/
│   └── agents/           ← Subagent-definities voor IDE
│
└── .serena/              ← Runtime-status
    └── memories/         ← Orkestratiegeheugenbestanden
```

## `.agents/` — De Bron van Waarheid

Dit is de kern. Alles wat agents nodig hebben leeft hier.

### `config/`
- **`user-preferences.yaml`** — Je taal, tijdzone, standaard CLI, per-agent CLI-mapping

### `skills/`
Waar agent-expertise leeft. Elke skill heeft een `SKILL.md` en een `resources/` map.

- **`_shared/`** — Gemeenschappelijke resources voor alle agents (routering, sjablonen, checklists)
- **`oma-frontend/`**, **`oma-backend/`**, etc. — Domeinspecifieke skills

### `workflows/`
Markdown-bestanden die slash-commando gedrag definiëren. Dit zijn de scripts die agents volgen als je `/plan`, `/coordinate`, `/review`, etc. typt.

### `agents/`
Subagent-definities — de specs voor het spawnen van agents via CLI of Task tool.

## `.claude/` — IDE-Integratie

Dit verbindt oh-my-agent met Claude Code (en andere IDE's via symlinks).

### `hooks/`
- **`triggers.json`** — Trefwoord-naar-workflow mapping in 11 talen
- **`keyword-detector.ts`** — De logica die workflows automatisch detecteert uit je input
- **`persistent-mode.ts`** — Houdt persistente workflows draaiend tot ze klaar zijn
- **`hud.ts`** — De `[OMA]` statusbalk-indicator

### `skills/` en `agents/`
Symlinks die naar `.agents/` wijzen — houdt één bron van waarheid terwijl skills zichtbaar blijven voor de IDE.

## `.serena/memories/` — Runtime Status

Waar agents hun voortgang schrijven tijdens uitvoering:

| Bestand | Wat Erin Staat |
|---------|---------------|
| `orchestrator-session.md` | Sessie-ID, status, starttijd |
| `task-board.md` | Welke agent welke taak heeft |
| `progress-{agent}.md` | Beurt-voor-beurt voortgangsupdates |
| `result-{agent}.md` | Eindresultaat van elke agent |

Dashboards monitoren deze map voor live updates.

## Voor de oh-my-agent Broncode Repo

Als je aan oh-my-agent zelf werkt (niet alleen het gebruikt), is de repo een monorepo:

```text
oh-my-agent/
├── cli/              ← CLI-broncode (TypeScript)
├── web/              ← Documentatiesite (Next.js)
├── action/           ← GitHub Action voor auto-updates
├── docs/             ← Vertaalde READMEs + specs
└── .agents/          ← Bewerkbaar (dit IS de broncode)
```
