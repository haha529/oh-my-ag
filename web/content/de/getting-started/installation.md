---
title: Installation
description: Bring oh-my-agent in deinem Projekt zum Laufen — drei Installationswege, alle schnell.
---

# Installation

## Was Du Brauchst

- **Eine KI-IDE** — Antigravity, Claude Code, Cursor, Gemini CLI, Codex CLI oder aehnliches
- **bun** und **uv** — werden automatisch installiert falls fehlend

## Option 1: Einzeiler (Empfohlen)

```bash
curl -fsSL https://raw.githubusercontent.com/first-fluke/oh-my-agent/main/cli/install.sh | bash
```

Dies erkennt fehlende Abhaengigkeiten (bun, uv), installiert sie und startet das interaktive Setup. In etwa einer Minute erledigt.

## Option 2: Manuelle Installation

```bash
bunx oh-my-agent
```

Du bekommst ein Menue zur Auswahl eines Presets:

| Preset | Was Du Bekommst |
|--------|-----------------|
| All | Alle Agenten und Skills |
| Fullstack | frontend + backend + db + pm + qa + debug + brainstorm + commit |
| Frontend | frontend + pm + qa + debug + brainstorm + commit |
| Backend | backend + db + pm + qa + debug + brainstorm + commit |
| Mobile | mobile + pm + qa + debug + brainstorm + commit |
| DevOps | tf-infra + dev-workflow + pm + qa + debug + brainstorm + commit |

Skills landen in `.agents/skills/` mit erstellten Symlinks fuer deine IDE.

## Option 3: Globale Installation

Fuer haeufige CLI-Nutzung (Dashboards, Agenten-Spawning, Diagnosen):

```bash
# Homebrew
brew install oh-my-agent

# oder npm/bun
bun install --global oh-my-agent
```

Jetzt kannst du `oma` ueberall nutzen:

```bash
oma doctor          # Pruefen, ob alles in Ordnung ist
oma dashboard       # Echtzeit-Ueberwachung
oma agent:spawn     # Agenten vom Terminal aus starten
```

## Waehle ein KI-CLI

Du brauchst mindestens eins:

| CLI | Installation | Wie Authentifizieren |
|-----|-------------|----------------------|
| Gemini | `bun install --global @google/gemini-cli` | Automatisch beim ersten Start |
| Claude | `curl -fsSL https://claude.ai/install.sh \| bash` | Automatisch beim ersten Start |
| Codex | `bun install --global @openai/codex` | `codex login` |
| Qwen | `bun install --global @qwen-code/qwen-code` | `/auth` im CLI |

## Ersteinrichtung

Nach der Installation fuehre `/setup` in deiner KI-IDE aus, um zu konfigurieren:

- Antwortsprache
- Standard-CLI-Vendor
- CLI-Zuordnung pro Agent (verschiedene KI-Tools fuer verschiedene Agenten)

Dies erstellt `.agents/config/user-preferences.yaml` — die Datei, die alle deine Einstellungen steuert.

## Ueberpruefen, Ob Es Funktioniert Hat

```bash
oma doctor
```

Dies prueft CLI-Installationen, MCP-Configs und Skill-Status. Wenn etwas nicht stimmt, sagt es dir genau, was zu beheben ist.

## Wie Geht Es Weiter?

Oeffne dein Projekt in deiner KI-IDE und fang an zu chatten. Skills werden automatisch erkannt. Probier etwas wie:

```
"Baue ein Login-Formular mit E-Mail-Validierung mit Tailwind CSS"
```

Oder spring direkt zur [Nutzungsanleitung](/guide/usage) fuer weitere Beispiele.
