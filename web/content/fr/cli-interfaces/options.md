---
title: Options CLI
description: Tous les flags et options pour les commandes du CLI oh-my-agent.
---

# Options CLI

## Options Globales

Disponibles sur chaque commande :

| Option | Ce Qu'elle Fait |
|--------|-----------------|
| `-h, --help` | Afficher l'aide |
| `-V, --version` | Afficher le numero de version |

## Options de Sortie

De nombreuses commandes supportent une sortie lisible par machine :

| Option | Ce Qu'elle Fait |
|--------|-----------------|
| `--json` | Sortie en JSON |
| `--output <format>` | Format de sortie : `text` ou `json` |

Vous pouvez aussi definir `OH_MY_AG_OUTPUT_FORMAT=json` comme variable d'environnement.

**Supporte par :** `doctor`, `stats`, `retro`, `cleanup`, `auth:status`, `usage:anti`, `memory:init`, `verify`, `visualize`

## Options par Commande

### `update`
| Option | Ce Qu'elle Fait |
|--------|-----------------|
| `-f, --force` | Ecraser les fichiers de config personnalises |
| `--ci` | Mode non interactif (sauter tous les prompts) |

### `stats`
| Option | Ce Qu'elle Fait |
|--------|-----------------|
| `--reset` | Reinitialiser toutes les donnees de metriques |

### `retro`
| Option | Ce Qu'elle Fait |
|--------|-----------------|
| `--interactive` | Mode de saisie manuelle |
| `--compare` | Comparer la fenetre actuelle vs. la fenetre precedente de meme duree |

### `cleanup`
| Option | Ce Qu'elle Fait |
|--------|-----------------|
| `--dry-run` | Montrer ce qui serait nettoye sans le faire |
| `-y, --yes` | Sauter les confirmations |

### `usage:anti`
| Option | Ce Qu'elle Fait |
|--------|-----------------|
| `--raw` | Afficher la reponse RPC brute |

### `agent:spawn`
| Option | Ce Qu'elle Fait |
|--------|-----------------|
| `-v, --vendor <vendor>` | Remplacer le CLI vendor (`gemini`/`claude`/`codex`/`qwen`) |
| `-w, --workspace <path>` | Repertoire de travail pour l'agent |

### `agent:status`
| Option | Ce Qu'elle Fait |
|--------|-----------------|
| `-r, --root <path>` | Chemin racine pour les verifications memoire |

### `agent:parallel`
| Option | Ce Qu'elle Fait |
|--------|-----------------|
| `-v, --vendor <vendor>` | Remplacer le CLI vendor |
| `-i, --inline` | Specifier les taches comme arguments `agent:task` |
| `--no-wait` | Ne pas attendre la completion (mode arriere-plan) |

### `memory:init`
| Option | Ce Qu'elle Fait |
|--------|-----------------|
| `--force` | Ecraser les fichiers de schema existants |

### `verify`
| Option | Ce Qu'elle Fait |
|--------|-----------------|
| `-w, --workspace <path>` | Chemin du workspace a verifier |

## Exemples Pratiques

```bash
# Sortie JSON pour pipeline CI
oma doctor --json

# Reinitialiser les metriques de productivite
oma stats --reset

# Apercu du nettoyage sans executer
oma cleanup --dry-run

# Lancer avec CLI et workspace specifiques
oma agent:spawn backend "Auth API" session-01 -v codex -w ./apps/api

# Mise a jour non interactive en CI
oma update --ci --force

# Comparer les 7 derniers jours vs. les 7 jours precedents
oma retro 7 --compare
```
