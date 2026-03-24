---
title: Automatische Updates
description: Houd oh-my-agent skills actueel met een GitHub Action die PR's opent wanneer er nieuwe versies uitkomen.
---

# Automatische Updates met GitHub Action

Eenmaal instellen, vergeten. De GitHub Action controleert op nieuwe oh-my-agent versies en opent een PR wanneer updates beschikbaar zijn.

## Snelle Setup

Voeg dit toe aan je repo:

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1"   # Elke maandag om 09:00 UTC
  workflow_dispatch:        # Of handmatig uitvoeren

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

Dat is het. Je krijgt een PR elke keer als skills worden bijgewerkt.

## Action Inputs

| Input | Wat Het Doet | Standaard |
|-------|-------------|----------|
| `mode` | `pr` opent een PR, `commit` pusht direct | `pr` |
| `base-branch` | Doelbranch | `main` |
| `force` | Aangepaste configuratiebestanden overschrijven | `false` |
| `pr-title` | Aangepaste PR-titel | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | PR-labels gescheiden door komma | `dependencies,automated` |
| `commit-message` | Aangepast commit-bericht | `chore(deps): update oh-my-agent skills` |
| `token` | GitHub-token | `${{ github.token }}` |

## Action Outputs

| Output | Wat Het Bevat |
|--------|-------------|
| `updated` | `true` als wijzigingen zijn gedetecteerd |
| `version` | oh-my-agent versie na update |
| `pr-number` | PR-nummer (alleen pr-modus) |
| `pr-url` | PR-URL (alleen pr-modus) |

## Voorbeelden

### PR Overslaan, Direct Committen

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Met een Persoonlijk Toegangstoken

Voor fork-repo's waar `GITHUB_TOKEN` geen schrijftoegang heeft:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Notificatie bij Update

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

## Hoe Het Onder de Motorkap Werkt

1. Installeert `oh-my-agent` CLI via Bun
2. Voert `oma update --ci` uit (niet-interactief)
3. Detecteert wijzigingen in `.agents/` en `.claude/`
4. Maakt PR of commit op basis van `mode`
