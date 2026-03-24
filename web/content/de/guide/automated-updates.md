---
title: Automatische Updates
description: Halte oh-my-agent Skills aktuell mit einer GitHub Action, die PRs oeffnet, wenn neue Versionen erscheinen.
---

# Automatische Updates mit GitHub Action

Einmal einrichten, vergessen. Die GitHub Action prueft auf neue oh-my-agent-Versionen und oeffnet einen PR, wenn Updates verfuegbar sind.

## Schnelles Setup

Fuege dies deinem Repo hinzu:

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1"   # Jeden Montag um 09:00 UTC
  workflow_dispatch:        # Oder manuell ausfuehren

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

Das ist alles. Du bekommst einen PR jedes Mal, wenn Skills aktualisiert werden.

## Action-Inputs

| Input | Was Er Tut | Standard |
|-------|-----------|----------|
| `mode` | `pr` oeffnet einen PR, `commit` pusht direkt | `pr` |
| `base-branch` | Ziel-Branch | `main` |
| `force` | Benutzerdefinierte Config-Dateien ueberschreiben | `false` |
| `pr-title` | Benutzerdefinierter PR-Titel | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Kommagetrennte PR-Labels | `dependencies,automated` |
| `commit-message` | Benutzerdefinierte Commit-Nachricht | `chore(deps): update oh-my-agent skills` |
| `token` | GitHub-Token | `${{ github.token }}` |

## Action-Outputs

| Output | Was Er Enthaelt |
|--------|----------------|
| `updated` | `true` wenn Aenderungen erkannt wurden |
| `version` | oh-my-agent Version nach dem Update |
| `pr-number` | PR-Nummer (nur PR-Modus) |
| `pr-url` | PR-URL (nur PR-Modus) |

## Beispiele

### Kein PR, Direkt Committen

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Mit Einem Personal Access Token

Fuer Fork-Repos, bei denen `GITHUB_TOKEN` keinen Schreibzugriff hat:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Bei Update Benachrichtigen

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

## Wie Es Unter der Haube Funktioniert

1. Installiert das `oh-my-agent` CLI via Bun
2. Fuehrt `oma update --ci` aus (nicht-interaktiv)
3. Erkennt Aenderungen in `.agents/` und `.claude/`
4. Erstellt PR oder committet je nach `mode`
