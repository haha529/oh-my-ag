---
title: Automated Updates
description: Keep oh-my-agent skills current with a GitHub Action that opens PRs when new versions drop.
---

# Automated Updates with GitHub Action

Set it once, forget it. The GitHub Action checks for new oh-my-agent versions and opens a PR when updates are available.

## Quick Setup

Add this to your repo:

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1"   # Every Monday at 09:00 UTC
  workflow_dispatch:        # Or run manually

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

That's it. You'll get a PR every time skills are updated.

## Action Inputs

| Input | What It Does | Default |
|-------|-------------|---------|
| `mode` | `pr` opens a PR, `commit` pushes directly | `pr` |
| `base-branch` | Target branch | `main` |
| `force` | Overwrite custom config files | `false` |
| `pr-title` | Custom PR title | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Comma-separated PR labels | `dependencies,automated` |
| `commit-message` | Custom commit message | `chore(deps): update oh-my-agent skills` |
| `token` | GitHub token | `${{ github.token }}` |

## Action Outputs

| Output | What It Contains |
|--------|-----------------|
| `updated` | `true` if changes were detected |
| `version` | oh-my-agent version after update |
| `pr-number` | PR number (pr mode only) |
| `pr-url` | PR URL (pr mode only) |

## Examples

### Skip the PR, Commit Directly

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### With a Personal Access Token

For fork repos where `GITHUB_TOKEN` lacks write access:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Notify on Update

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

## How It Works Under the Hood

1. Installs `oh-my-agent` CLI via Bun
2. Runs `oma update --ci` (non-interactive)
3. Detects changes in `.agents/` and `.claude/`
4. Creates PR or commits based on `mode`
