---
title: Automatische Updates mit GitHub Action
description: oh-my-agent-Skills mithilfe der offiziellen GitHub Action automatisch aktuell halten.
---

# Automatische Updates mit GitHub Action

Die **oh-my-agent update action** führt `oma update` nach einem Zeitplan aus und erstellt einen PR (oder committet direkt), sobald neue Skill-Versionen verfügbar sind.

## Quick Start

Fügen Sie diesen Workflow zu jedem Repository hinzu, das oh-my-agent verwendet:

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

Dieser Workflow prüft wöchentlich auf Updates und öffnet einen PR, wenn Änderungen gefunden werden.

## Action Reference

Die Action ist unter folgenden Pfaden verfügbar:

- **Monorepo path**: `first-fluke/oh-my-agent/action@v1`
- **Marketplace**: [`first-fluke/oma-update-action@v1`](https://github.com/marketplace/actions/oh-my-agent-update)

### Inputs

| Input | Beschreibung | Default |
|:------|:------------|:--------|
| `mode` | `pr` erstellt einen Pull Request, `commit` pusht direkt | `pr` |
| `base-branch` | Basis-Branch für den PR oder direktes Commit-Ziel | `main` |
| `force` | Benutzerkonfigurationsdateien überschreiben (`--force`) | `false` |
| `pr-title` | Benutzerdefinierter PR-Titel | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Kommagetrennte Labels für den PR | `dependencies,automated` |
| `commit-message` | Benutzerdefinierte Commit-Nachricht | `chore(deps): update oh-my-agent skills` |
| `token` | GitHub-Token für die PR-Erstellung | `${{ github.token }}` |

### Outputs

| Output | Beschreibung |
|:-------|:------------|
| `updated` | `true`, wenn Änderungen erkannt wurden |
| `version` | Die oh-my-agent-Version nach dem Update |
| `pr-number` | PR-Nummer (nur im `pr`-Modus) |
| `pr-url` | PR-URL (nur im `pr`-Modus) |

## Beispiele

### Direct Commit Mode

PR überspringen und Änderungen direkt in den Basis-Branch pushen:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Mit einem Personal Access Token

Erforderlich für Fork-Repositories, bei denen `GITHUB_TOKEN` keinen Schreibzugriff hat:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Bedingte Benachrichtigung

Einen Folgeschritt nur dann ausführen, wenn ein Update eingespielt wurde:

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

## Funktionsweise

1. Installiert die `oh-my-agent` CLI via Bun
2. Führt `oma update --ci` aus (nicht-interaktiver Modus, keine Eingabeaufforderungen)
3. Erkennt Änderungen in den Verzeichnissen `.agents/` und `.claude/`
4. Erstellt einen PR oder committet direkt, abhängig vom `mode`-Input

## Vergleich mit der zentralen Registry

| | GitHub Action | Central Registry |
|:--|:--:|:--:|
| Setup | 1 Workflow-Datei | 3 Dateien (Konfiguration + 2 Workflows) |
| Update-Methode | `oma update` CLI | Tarball-Download + manueller Sync |
| Anpassung | Action inputs | `.agent-registry.yml` |
| Versions-Pinning | Immer aktuellste Version | Explizites Versions-Pinning |

Verwenden Sie die **GitHub Action** für die meisten Projekte. Setzen Sie die **Central Registry** ein, wenn Sie striktes Versions-Pinning benötigen oder keine Drittanbieter-Actions verwenden können.
