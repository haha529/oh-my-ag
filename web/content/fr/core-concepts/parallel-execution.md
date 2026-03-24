---
title: Execution Parallele
description: Executez plusieurs agents en meme temps — parce qu'attendre qu'un finisse avant de lancer le suivant, c'est lent.
---

# Execution Parallele

La vraie puissance d'oh-my-agent, c'est de faire tourner plusieurs agents simultanement. Pendant que l'agent backend construit votre API, l'agent frontend est deja en train de creer l'UI.

## Pattern de Base

```bash
oma agent:spawn backend "Implement auth API" session-01 &
oma agent:spawn frontend "Create login form" session-01 &
wait
```

Le `&` execute chaque agent en arriere-plan. `wait` bloque jusqu'a ce que les deux aient termine.

## Pattern avec Workspaces

Donnez a chaque agent son propre repertoire pour eviter les conflits de merge :

```bash
oma agent:spawn backend "Auth + DB migration" session-02 -w ./apps/api
oma agent:spawn frontend "Login + token refresh" session-02 -w ./apps/web
oma agent:spawn mobile "Auth screens" session-02 -w ./apps/mobile
```

## Utiliser `agent:parallel`

Pour une syntaxe plus propre :

```bash
oma agent:parallel -i backend:"Implement auth API" frontend:"Build login form" mobile:"Auth screens"
```

Ajoutez `--no-wait` pour lancer et oublier :

```bash
oma agent:parallel -i backend:"task" frontend:"task" --no-wait
```

## Surveillez Pendant Qu'ils Travaillent

Ouvrez un terminal separe :

```bash
# Dashboard terminal
oma dashboard

# Ou dashboard web
oma dashboard:web
# → http://localhost:9847
```

Le dashboard affiche l'etat en direct pour chaque agent — tours effectues, tache en cours, etat de completion.

## Configuration Multi-CLI

Tous les outils IA ne se valent pas. Dirigez les agents vers le CLI qui gere le mieux leur domaine :

```yaml
# .agents/config/user-preferences.yaml
default_cli: gemini

agent_cli_mapping:
  frontend: claude      # Raisonnement UI complexe
  backend: gemini       # Generation rapide d'API
  mobile: gemini
  qa: claude            # Revue de securite approfondie
  debug: claude         # Analyse de cause racine profonde
  pm: gemini            # Decomposition rapide
```

## Resolution du CLI Vendor

Lors du lancement d'un agent, le CLI est choisi dans cet ordre :

1. Flag `--vendor` (priorite maximale)
2. `agent_cli_mapping` pour cet agent specifique
3. Parametre `default_cli`
4. `active_vendor` de `cli-config.yaml`
5. `gemini` (fallback)

## Conseils pour les Executions Paralleles

- **Utilisez un session ID par fonctionnalite** — garde les sorties d'agents regroupees
- **Verrouillez les contrats d'API d'abord** — lancez `/plan` avant de spawn les agents d'implementation
- **Workspaces separes** — evitez que les agents marchent sur les fichiers des autres
- **Surveillez activement** — detectez les problemes tot via le dashboard au lieu de les trouver au moment du merge
