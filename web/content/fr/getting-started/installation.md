---
title: Installation
description: Faites tourner oh-my-agent dans votre projet — trois facons d'installer, toutes rapides.
---

# Installation

## Ce Dont Vous Avez Besoin

- **Un IDE IA** — Antigravity, Claude Code, Cursor, Gemini CLI, Codex CLI, ou similaire
- **bun** et **uv** — installes automatiquement si absents

## Option 1 : Une Seule Ligne (Recommande)

```bash
curl -fsSL https://raw.githubusercontent.com/first-fluke/oh-my-agent/main/cli/install.sh | bash
```

Ceci detecte les dependances manquantes (bun, uv), les installe et lance la configuration interactive. Termine en environ une minute.

## Option 2 : Installation Manuelle

```bash
bunx oh-my-agent
```

Vous obtiendrez un menu pour choisir un preset :

| Preset | Ce Que Vous Obtenez |
|--------|---------------------|
| All | Tous les agents et skills |
| Fullstack | frontend + backend + db + pm + qa + debug + brainstorm + commit |
| Frontend | frontend + pm + qa + debug + brainstorm + commit |
| Backend | backend + db + pm + qa + debug + brainstorm + commit |
| Mobile | mobile + pm + qa + debug + brainstorm + commit |
| DevOps | tf-infra + dev-workflow + pm + qa + debug + brainstorm + commit |

Les skills atterrissent dans `.agents/skills/` avec des symlinks crees pour votre IDE.

## Option 3 : Installation Globale

Pour une utilisation frequente du CLI (dashboards, spawn d'agents, diagnostics) :

```bash
# Homebrew
brew install oh-my-agent

# ou npm/bun
bun install --global oh-my-agent
```

Maintenant vous pouvez utiliser `oma` partout :

```bash
oma doctor          # Verifier que tout va bien
oma dashboard       # Surveillance en temps reel
oma agent:spawn     # Lancer des agents depuis le terminal
```

## Choisissez un CLI IA

Vous en avez besoin d'au moins un :

| CLI | Installation | Comment S'Authentifier |
|-----|-------------|------------------------|
| Gemini | `bun install --global @google/gemini-cli` | Automatique au premier lancement |
| Claude | `curl -fsSL https://claude.ai/install.sh \| bash` | Automatique au premier lancement |
| Codex | `bun install --global @openai/codex` | `codex login` |
| Qwen | `bun install --global @qwen-code/qwen-code` | `/auth` dans le CLI |

## Configuration Initiale

Apres l'installation, lancez `/setup` dans votre IDE IA pour configurer :

- Langue de reponse
- CLI vendor par defaut
- Mappage CLI par agent (utilisez differents outils IA pour differents agents)

Ceci cree `.agents/config/user-preferences.yaml` — le fichier qui controle toutes vos preferences.

## Verifier Que Ca A Marche

```bash
oma doctor
```

Ceci verifie les installations CLI, les configs MCP et l'etat des skills. Si quelque chose ne va pas, il vous dit exactement quoi corriger.

## Et Ensuite ?

Ouvrez votre projet dans votre IDE IA et commencez a discuter. Les skills sont auto-detectes. Essayez quelque chose comme :

```
"Construis un formulaire de connexion avec validation d'email en utilisant Tailwind CSS"
```

Ou allez directement au [Guide d'Utilisation](/guide/usage) pour plus d'exemples.
