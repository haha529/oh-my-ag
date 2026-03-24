---
title: Projektstruktur
description: Wo alles liegt und warum es so organisiert ist.
---

# Projektstruktur

oh-my-agent organisiert alles in einigen wenigen Schluesselverzeichnissen. Hier ist, was du nach der Installation siehst.

## Das Grosse Bild

```text
dein-projekt/
├── .agents/              ← Einzige Quelle der Wahrheit
│   ├── config/           ← Deine Einstellungen
│   ├── skills/           ← Agenten-Faehigkeiten
│   ├── workflows/        ← Slash-Befehl-Definitionen
│   ├── agents/           ← Subagenten-Definitionen
│   ├── plan.json         ← Generierte Plan-Ausgabe
│   ├── state/            ← Aktiver Workflow-Status
│   ├── results/          ← Agenten-Ergebnisdateien
│   └── mcp.json          ← MCP-Server-Konfiguration
│
├── .claude/              ← IDE-Integrationsschicht
│   ├── settings.json     ← Hooks und Berechtigungen
│   ├── hooks/            ← Keyword-Erkennung, HUD
│   ├── skills/           ← Symlinks zu .agents/skills/
│   └── agents/           ← Subagenten-Definitionen fuer IDE
│
└── .serena/              ← Laufzeit-Status
    └── memories/         ← Orchestrierungs-Speicherdateien
```

## `.agents/` — Die Quelle der Wahrheit

Das ist der Kern. Alles, was Agenten brauchen, lebt hier.

### `config/`
- **`user-preferences.yaml`** — Deine Sprache, Zeitzone, Standard-CLI, CLI-Zuordnung pro Agent

### `skills/`
Wo die Agenten-Expertise lebt. Jeder Skill hat ein `SKILL.md` und ein `resources/`-Verzeichnis.

- **`_shared/`** — Gemeinsame Ressourcen, die von allen Agenten genutzt werden (Routing, Templates, Checklisten)
- **`oma-frontend/`**, **`oma-backend/`**, etc. — Domainspezifische Skills

### `workflows/`
Markdown-Dateien, die das Verhalten der Slash-Befehle definieren. Das sind die Skripte, denen Agenten folgen, wenn du `/plan`, `/coordinate`, `/review` etc. tippst.

### `agents/`
Subagenten-Definitionen — die Spezifikationen zum Starten von Agenten via CLI oder Task-Tool.

## `.claude/` — IDE-Integration

Dies verbindet oh-my-agent mit Claude Code (und anderen IDEs via Symlinks).

### `hooks/`
- **`triggers.json`** — Keyword-zu-Workflow-Zuordnung in 11 Sprachen
- **`keyword-detector.ts`** — Die Logik, die Workflows automatisch aus deiner Eingabe erkennt
- **`persistent-mode.ts`** — Haelt persistente Workflows am Laufen, bis sie abgeschlossen sind
- **`hud.ts`** — Der `[OMA]`-Statusleisten-Indikator

### `skills/` und `agents/`
Symlinks, die auf `.agents/` zeigen — behaelt eine einzige Quelle der Wahrheit bei, waehrend Skills fuer die IDE sichtbar sind.

## `.serena/memories/` — Laufzeit-Status

Wo Agenten ihren Fortschritt waehrend der Ausfuehrung schreiben:

| Datei | Was Drin Steht |
|-------|---------------|
| `orchestrator-session.md` | Session-ID, Status, Startzeit |
| `task-board.md` | Welcher Agent welche Aufgabe hat |
| `progress-{agent}.md` | Fortschrittsupdates Zug fuer Zug |
| `result-{agent}.md` | Endausgabe jedes Agenten |

Dashboards ueberwachen dieses Verzeichnis fuer Echtzeit-Updates.

## Fuer das oh-my-agent-Quellrepository

Wenn du an oh-my-agent selbst arbeitest (nicht nur es benutzt), ist das Repo ein Monorepo:

```text
oh-my-agent/
├── cli/              ← CLI-Tool-Quelle (TypeScript)
├── web/              ← Dokumentationsseite (Next.js)
├── action/           ← GitHub Action fuer automatische Updates
├── docs/             ← Uebersetzte READMEs + Spezifikationen
└── .agents/          ← Editierbar (DAS IST die Quelle)
```
