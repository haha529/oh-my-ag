---
title: Mises à jour automatisées avec GitHub Action
description: Maintenez les skills oh-my-agent à jour automatiquement grâce à la GitHub Action officielle.
---

# Mises à jour automatisées avec GitHub Action

L'**oh-my-agent update action** exécute `oma update` selon un calendrier défini et crée une PR (ou pousse directement les commits) dès que de nouvelles versions de skills sont disponibles.

## Démarrage rapide

Ajoutez ce workflow à tout dépôt utilisant oh-my-agent :

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1" # Every Monday at 09:00 UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: first-fluke/oh-my-agent/action@v1
```

Ce workflow vérifie les mises à jour chaque semaine et ouvre une PR si des changements sont détectés.

## Référence de l'action

L'action est disponible aux emplacements suivants :

- **Chemin monorepo** : `first-fluke/oh-my-agent/action@v1`
- **Marketplace** : [`first-fluke/oma-update-action@v1`](https://github.com/marketplace/actions/oh-my-agent-update)

### Inputs

| Input | Description | Valeur par défaut |
|:------|:-----------|:--------|
| `mode` | `pr` crée une pull request, `commit` pousse directement | `pr` |
| `base-branch` | Branche de base pour la PR ou cible du commit direct | `main` |
| `force` | Écrase les fichiers de configuration utilisateur (`--force`) | `false` |
| `pr-title` | Titre personnalisé de la PR | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Labels séparés par des virgules pour la PR | `dependencies,automated` |
| `commit-message` | Message de commit personnalisé | `chore(deps): update oh-my-agent skills` |
| `token` | Token GitHub pour la création de PR | `${{ github.token }}` |

### Outputs

| Output | Description |
|:-------|:-----------|
| `updated` | `true` si des changements ont été détectés |
| `version` | La version oh-my-agent après la mise à jour |
| `pr-number` | Numéro de la PR (uniquement en mode `pr`) |
| `pr-url` | URL de la PR (uniquement en mode `pr`) |

## Exemples

### Mode commit direct

Ignorez la PR et poussez les changements directement sur la branche de base :

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Avec un Personal Access Token

Requis pour les dépôts forkés où `GITHUB_TOKEN` ne dispose pas des droits d'écriture :

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Notification conditionnelle

Exécutez une étape de suivi uniquement lorsqu'une mise à jour a été appliquée :

```yaml
jobs:
  update:
    runs-on: ubuntu-latest
    outputs:
      updated: ${{ steps.oma.outputs.updated }}
    steps:
      - uses: actions/checkout@v6
      - uses: first-fluke/oh-my-agent/action@v1
        id: oma

  notify:
    needs: update
    if: needs.update.outputs.updated == 'true'
    runs-on: ubuntu-latest
    steps:
      - run: echo "oh-my-agent was updated to ${{ needs.update.outputs.version }}"
```

## Fonctionnement

1. Installe le CLI `oh-my-agent` via Bun
2. Exécute `oma update --ci` (mode non interactif, sans invite de commande)
3. Détecte les changements dans les répertoires `.agents/` et `.claude/`
4. Crée une PR ou pousse directement selon la valeur de l'input `mode`

## Comparaison avec le registre central

| | GitHub Action | Registre central |
|:--|:--:|:--:|
| Configuration | 1 fichier workflow | 3 fichiers (config + 2 workflows) |
| Méthode de mise à jour | CLI `oma update` | Téléchargement tarball + synchronisation manuelle |
| Personnalisation | Inputs de l'action | `.agent-registry.yml` |
| Épinglage de version | Toujours la dernière version | Version explicitement épinglée |

Utilisez la **GitHub Action** pour la plupart des projets. Optez pour l'approche **Registre central** si vous avez besoin d'un épinglage de version strict ou si vous ne pouvez pas utiliser d'actions tierces.
