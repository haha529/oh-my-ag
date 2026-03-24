---
title: Structure du Projet
description: Ou tout se trouve et pourquoi c'est organise ainsi.
---

# Structure du Projet

oh-my-agent organise tout dans quelques repertoires cles. Voici ce que vous verrez apres l'installation.

## La Vue d'Ensemble

```text
votre-projet/
├── .agents/              ← Source Unique de Verite
│   ├── config/           ← Vos preferences
│   ├── skills/           ← Capacites des agents
│   ├── workflows/        ← Definitions des commandes slash
│   ├── agents/           ← Definitions des sous-agents
│   ├── plan.json         ← Sortie du plan genere
│   ├── state/            ← Etat actif du workflow
│   ├── results/          ← Fichiers de resultats des agents
│   └── mcp.json          ← Config serveur MCP
│
├── .claude/              ← Couche d'integration IDE
│   ├── settings.json     ← Hooks et permissions
│   ├── hooks/            ← Detection de mots-cles, HUD
│   ├── skills/           ← Symlinks vers .agents/skills/
│   └── agents/           ← Definitions sous-agents pour IDE
│
└── .serena/              ← Etat d'execution
    └── memories/         ← Fichiers memoire d'orchestration
```

## `.agents/` — La Source de Verite

C'est le coeur. Tout ce dont les agents ont besoin vit ici.

### `config/`
- **`user-preferences.yaml`** — Votre langue, fuseau horaire, CLI par defaut, mappage CLI par agent

### `skills/`
Ou vit l'expertise des agents. Chaque skill a un `SKILL.md` et un repertoire `resources/`.

- **`_shared/`** — Ressources communes utilisees par tous les agents (routage, templates, checklists)
- **`oma-frontend/`**, **`oma-backend/`**, etc. — Skills specifiques au domaine

### `workflows/`
Fichiers Markdown qui definissent le comportement des commandes slash. Ce sont les scripts que les agents suivent quand vous tapez `/plan`, `/coordinate`, `/review`, etc.

### `agents/`
Definitions des sous-agents — les specs pour lancer des agents via le CLI ou l'outil Task.

## `.claude/` — Integration IDE

Ceci connecte oh-my-agent a Claude Code (et d'autres IDEs via symlinks).

### `hooks/`
- **`triggers.json`** — Mappage mots-cles vers workflows en 11 langues
- **`keyword-detector.ts`** — La logique qui auto-detecte les workflows depuis votre saisie
- **`persistent-mode.ts`** — Maintient les workflows persistants en execution jusqu'a completion
- **`hud.ts`** — L'indicateur `[OMA]` dans la barre d'etat

### `skills/` et `agents/`
Symlinks pointant vers `.agents/` — maintient une source unique de verite tout en rendant les skills visibles pour l'IDE.

## `.serena/memories/` — Etat d'Execution

Ou les agents ecrivent leur progression pendant l'execution :

| Fichier | Ce Qu'il Contient |
|---------|-------------------|
| `orchestrator-session.md` | ID de session, statut, heure de debut |
| `task-board.md` | Quel agent a quelle tache |
| `progress-{agent}.md` | Mises a jour de progression tour par tour |
| `result-{agent}.md` | Sortie finale de chaque agent |

Les dashboards surveillent ce repertoire pour les mises a jour en temps reel.

## Pour le Depot Source d'oh-my-agent

Si vous travaillez sur oh-my-agent lui-meme (pas juste l'utiliser), le depot est un monorepo :

```text
oh-my-agent/
├── cli/              ← Source de l'outil CLI (TypeScript)
├── web/              ← Site de documentation (Next.js)
├── action/           ← GitHub Action pour mises a jour automatiques
├── docs/             ← READMEs traduits + specs
└── .agents/          ← Modifiable (CECI EST la source)
```
