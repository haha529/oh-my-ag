---
title: Actualizaciones Automaticas
description: Manten los skills de oh-my-agent actualizados con un GitHub Action que abre PRs cuando hay nuevas versiones.
---

# Actualizaciones Automaticas con GitHub Action

Configuralo una vez, olvidate. El GitHub Action busca nuevas versiones de oh-my-agent y abre un PR cuando hay actualizaciones disponibles.

## Configuracion Rapida

Agrega esto a tu repo:

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1"   # Cada lunes a las 09:00 UTC
  workflow_dispatch:        # O ejecutar manualmente

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

Eso es todo. Recibiras un PR cada vez que se actualicen los skills.

## Inputs del Action

| Input | Que Hace | Por Defecto |
|-------|----------|-------------|
| `mode` | `pr` abre un PR, `commit` pushea directamente | `pr` |
| `base-branch` | Rama destino | `main` |
| `force` | Sobreescribir archivos de configuracion personalizados | `false` |
| `pr-title` | Titulo personalizado del PR | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Labels del PR separadas por coma | `dependencies,automated` |
| `commit-message` | Mensaje de commit personalizado | `chore(deps): update oh-my-agent skills` |
| `token` | Token de GitHub | `${{ github.token }}` |

## Outputs del Action

| Output | Que Contiene |
|--------|-------------|
| `updated` | `true` si se detectaron cambios |
| `version` | Version de oh-my-agent despues de la actualizacion |
| `pr-number` | Numero de PR (solo modo pr) |
| `pr-url` | URL del PR (solo modo pr) |

## Ejemplos

### Saltar el PR, Commitear Directamente

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Con un Personal Access Token

Para repos fork donde `GITHUB_TOKEN` no tiene acceso de escritura:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Notificar al Actualizar

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

## Como Funciona Por Debajo

1. Instala el CLI `oh-my-agent` via Bun
2. Ejecuta `oma update --ci` (no interactivo)
3. Detecta cambios en `.agents/` y `.claude/`
4. Crea PR o commitea segun el `mode`
