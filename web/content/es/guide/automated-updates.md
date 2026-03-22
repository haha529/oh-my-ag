---
title: Actualizaciones automáticas con GitHub Action
description: Mantén los skills de oh-my-agent siempre actualizados de forma automática usando la GitHub Action oficial.
---

# Actualizaciones automáticas con GitHub Action

La **oh-my-agent update action** ejecuta `oma update` de forma programada y crea un PR (o hace commit directamente) cuando hay nuevas versiones de skills disponibles.

## Inicio Rápido

Agrega este workflow a cualquier repositorio que use oh-my-agent:

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

Esto verifica si hay actualizaciones semanalmente y abre un PR si se detectan cambios.

## Referencia de la Action

La action está disponible en:

- **Ruta en el monorepo**: `first-fluke/oh-my-agent/action@v1`
- **Marketplace**: [`first-fluke/oma-update-action@v1`](https://github.com/marketplace/actions/oh-my-agent-update)

### Inputs

| Input | Descripción | Valor por defecto |
|:------|:-----------|:--------|
| `mode` | `pr` crea un pull request, `commit` hace push directamente | `pr` |
| `base-branch` | Rama base para el PR o destino del commit directo | `main` |
| `force` | Sobreescribe los archivos de configuración del usuario (`--force`) | `false` |
| `pr-title` | Título personalizado del PR | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Etiquetas del PR separadas por coma | `dependencies,automated` |
| `commit-message` | Mensaje de commit personalizado | `chore(deps): update oh-my-agent skills` |
| `token` | Token de GitHub para crear el PR | `${{ github.token }}` |

### Outputs

| Output | Descripción |
|:-------|:-----------|
| `updated` | `true` si se detectaron cambios |
| `version` | La versión de oh-my-agent tras la actualización |
| `pr-number` | Número del PR (solo en modo `pr`) |
| `pr-url` | URL del PR (solo en modo `pr`) |

## Ejemplos

### Modo Commit Directo

Omite el PR y hace push de los cambios directamente a la rama base:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Con un Personal Access Token

Necesario en repositorios fork donde `GITHUB_TOKEN` no tiene permisos de escritura:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Notificación Condicional

Ejecuta un paso adicional solo cuando se haya aplicado una actualización:

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

## Cómo Funciona

1. Instala el CLI de `oh-my-agent` mediante Bun
2. Ejecuta `oma update --ci` (modo no interactivo, sin prompts)
3. Detecta cambios en los directorios `.agents/` y `.claude/`
4. Crea un PR o hace commit directamente según el valor del input `mode`

## Comparación con el Registro Central

| | GitHub Action | Registro Central |
|:--|:--:|:--:|
| Configuración | 1 archivo de workflow | 3 archivos (config + 2 workflows) |
| Método de actualización | CLI `oma update` | Descarga de tarball + sincronización manual |
| Personalización | Inputs de la Action | `.agent-registry.yml` |
| Fijación de versión | Siempre la última | Versión explícita fijada |

Usa la **GitHub Action** para la mayoría de los proyectos. Usa el enfoque de **Registro Central** si necesitas fijar versiones estrictamente o no puedes usar actions de terceros.
