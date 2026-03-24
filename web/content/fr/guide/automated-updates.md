---
title: Mises a Jour Automatiques
description: Gardez les skills oh-my-agent a jour avec un GitHub Action qui ouvre des PRs quand de nouvelles versions sortent.
---

# Mises a Jour Automatiques avec GitHub Action

Configurez une fois, oubliez. Le GitHub Action verifie les nouvelles versions d'oh-my-agent et ouvre un PR quand des mises a jour sont disponibles.

## Configuration Rapide

Ajoutez ceci a votre depot :

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1"   # Chaque lundi a 09:00 UTC
  workflow_dispatch:        # Ou lancer manuellement

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

C'est tout. Vous recevrez un PR chaque fois que les skills sont mis a jour.

## Inputs de l'Action

| Input | Ce Qu'il Fait | Par Defaut |
|-------|---------------|------------|
| `mode` | `pr` ouvre un PR, `commit` pousse directement | `pr` |
| `base-branch` | Branche cible | `main` |
| `force` | Ecraser les fichiers de config personnalises | `false` |
| `pr-title` | Titre personnalise du PR | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Labels du PR separes par virgule | `dependencies,automated` |
| `commit-message` | Message de commit personnalise | `chore(deps): update oh-my-agent skills` |
| `token` | Token GitHub | `${{ github.token }}` |

## Outputs de l'Action

| Output | Ce Qu'il Contient |
|--------|-------------------|
| `updated` | `true` si des changements ont ete detectes |
| `version` | Version d'oh-my-agent apres la mise a jour |
| `pr-number` | Numero de PR (mode pr uniquement) |
| `pr-url` | URL du PR (mode pr uniquement) |

## Exemples

### Pas de PR, Commit Direct

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Avec un Personal Access Token

Pour les depots fork ou `GITHUB_TOKEN` n'a pas l'acces en ecriture :

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Notifier a la Mise a Jour

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
      - run: echo "Updated to ${{ needs.update.outputs.version }}"
```

## Comment Ca Marche Sous le Capot

1. Installe le CLI `oh-my-agent` via Bun
2. Lance `oma update --ci` (non interactif)
3. Detecte les changements dans `.agents/` et `.claude/`
4. Cree un PR ou commit selon le `mode`
