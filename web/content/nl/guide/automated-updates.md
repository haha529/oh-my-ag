---
title: Automatische updates met GitHub Action
description: Houd oh-my-agent-skills automatisch up-to-date met de officiële GitHub Action.
---

# Automatische updates met GitHub Action

De **oh-my-agent update action** voert `oma update` uit op een schema en maakt een PR aan (of commit rechtstreeks) wanneer er nieuwe skillversies beschikbaar zijn.

## Snel starten

Voeg deze workflow toe aan elke repository die oh-my-agent gebruikt:

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

Dit controleert wekelijks op updates en opent een PR als er wijzigingen worden gevonden.

## Action-referentie

De action is beschikbaar op:

- **Monorepo-pad**: `first-fluke/oh-my-agent/action@v1`
- **Marketplace**: [`first-fluke/oma-update-action@v1`](https://github.com/marketplace/actions/oh-my-agent-update)

### Inputs

| Input | Beschrijving | Standaard |
|:------|:------------|:---------|
| `mode` | `pr` maakt een pull request aan, `commit` pusht rechtstreeks | `pr` |
| `base-branch` | Basistak voor de PR of directe commitdoeltak | `main` |
| `force` | Overschrijft gebruikersconfiguraties (`--force`) | `false` |
| `pr-title` | Aangepaste PR-titel | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Kommagescheiden labels voor de PR | `dependencies,automated` |
| `commit-message` | Aangepast commit-bericht | `chore(deps): update oh-my-agent skills` |
| `token` | GitHub-token voor het aanmaken van PR's | `${{ github.token }}` |

### Outputs

| Output | Beschrijving |
|:-------|:------------|
| `updated` | `true` als er wijzigingen zijn gedetecteerd |
| `version` | De oh-my-agent-versie na de update |
| `pr-number` | PR-nummer (alleen in `pr`-modus) |
| `pr-url` | PR-URL (alleen in `pr`-modus) |

## Voorbeelden

### Directe commit-modus

Sla de PR over en push wijzigingen rechtstreeks naar de basistak:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Met een Personal Access Token

Vereist voor fork-repositories waarbij `GITHUB_TOKEN` geen schrijftoegang heeft:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Voorwaardelijke notificatie

Voer een vervolgstap alleen uit wanneer er een update is toegepast:

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

## Hoe het werkt

1. Installeert de `oh-my-agent` CLI via Bun
2. Voert `oma update --ci` uit (niet-interactieve modus, geen prompts)
3. Detecteert wijzigingen in de mappen `.agents/` en `.claude/`
4. Maakt een PR aan of commit rechtstreeks op basis van de `mode`-input

## Vergelijking met het Centraal register

| | GitHub Action | Centraal register |
|:--|:--:|:--:|
| Opzet | 1 workflowbestand | 3 bestanden (config + 2 workflows) |
| Updatemethode | `oma update` CLI | Tarball-download + handmatige sync |
| Aanpassing | Action-inputs | `.agent-registry.yml` |
| Versiepinning | Altijd de laatste versie | Expliciete versiepinning |

Gebruik de **GitHub Action** voor de meeste projecten. Gebruik de **Centraal register**-aanpak als je strikte versiepinning nodig hebt of geen third-party actions kunt gebruiken.
