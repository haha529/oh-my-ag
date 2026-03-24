---
title: Installatie
description: Krijg oh-my-agent draaiend in je project — drie manieren om te installeren, allemaal snel.
---

# Installatie

## Wat Je Nodig Hebt

- **Een AI-IDE** — Antigravity, Claude Code, Cursor, Gemini CLI, Codex CLI of vergelijkbaar
- **bun** en **uv** — worden automatisch geïnstalleerd als ze ontbreken

## Optie 1: Eén Regel (Aanbevolen)

```bash
curl -fsSL https://raw.githubusercontent.com/first-fluke/oh-my-agent/main/cli/install.sh | bash
```

Dit detecteert ontbrekende dependencies (bun, uv), installeert ze en start de interactieve setup. Klaar in ongeveer een minuut.

## Optie 2: Handmatige Installatie

```bash
bunx oh-my-agent
```

Je krijgt een menu om een preset te kiezen:

| Preset | Wat Je Krijgt |
|--------|--------------|
| ✨ All | Elke agent en skill |
| 🌐 Fullstack | frontend + backend + db + pm + qa + debug + brainstorm + commit |
| 🎨 Frontend | frontend + pm + qa + debug + brainstorm + commit |
| ⚙️ Backend | backend + db + pm + qa + debug + brainstorm + commit |
| 📱 Mobile | mobile + pm + qa + debug + brainstorm + commit |
| 🚀 DevOps | tf-infra + dev-workflow + pm + qa + debug + brainstorm + commit |

Skills worden geplaatst in `.agents/skills/` met symlinks voor je IDE.

## Optie 3: Globale Installatie

Voor frequent CLI-gebruik (dashboards, agent spawning, diagnostiek):

```bash
# Homebrew
brew install oh-my-agent

# of npm/bun
bun install --global oh-my-agent
```

Nu kun je `oma` overal gebruiken:

```bash
oma doctor          # Controleer of alles gezond is
oma dashboard       # Realtime monitoring
oma agent:spawn     # Start agents vanuit de terminal
```

## Kies een AI-CLI

Je hebt er minstens één nodig:

| CLI | Installatie | Hoe Te Authenticeren |
|-----|-----------|---------------------|
| Gemini | `bun install --global @google/gemini-cli` | Automatisch bij eerste start |
| Claude | `curl -fsSL https://claude.ai/install.sh \| bash` | Automatisch bij eerste start |
| Codex | `bun install --global @openai/codex` | `codex login` |
| Qwen | `bun install --global @qwen-code/qwen-code` | `/auth` in de CLI |

## Eerste Configuratie

Na installatie, voer `/setup` uit in je AI-IDE om te configureren:

- Antwoordtaal
- Standaard CLI-vendor
- Per-agent CLI-mapping (gebruik verschillende AI-tools voor verschillende agents)

Dit maakt `.agents/config/user-preferences.yaml` — het bestand dat al je voorkeuren beheert.

## Controleer of Het Werkt

```bash
oma doctor
```

Dit controleert CLI-installaties, MCP-configs en skill-status. Als er iets mis is, vertelt het precies wat je moet fixen.

## Wat Nu?

Open je project in je AI-IDE en begin te chatten. Skills worden automatisch gedetecteerd. Probeer zoiets als:

```
"Bouw een loginformulier met e-mailvalidatie met Tailwind CSS"
```

Of ga naar de [Gebruiksgids](/guide/usage) voor meer voorbeelden.
