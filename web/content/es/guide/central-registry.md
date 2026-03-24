---
title: Registro Central
description: Usa oh-my-agent como un registro versionado para mantener multiples proyectos sincronizados.
---

# Registro Central para Configuracion Multi-Repo

Tienes multiples proyectos usando oh-my-agent? Puedes tratar este repo como un **registro central** — versiona tus skills, y todos los proyectos consumidores se mantienen sincronizados.

## Como Funciona

```text
┌─────────────────────────────────────────────────────────┐
│  Registro Central (repo oh-my-agent)                     │
│  • release-please para versionado automatico             │
│  • CHANGELOG.md generado automaticamente                 │
│  • prompt-manifest.json (versiones + checksums)          │
│  • agent-skills.tar.gz artefacto de release              │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  Tu Proyecto                                             │
│  • .agent-registry.yml fija la version                   │
│  • GitHub Action detecta nuevas versiones → abre PR      │
│  • Revisa y mergea para actualizar                       │
└─────────────────────────────────────────────────────────┘
```

## Para Mantenedores del Registro

Los releases se automatizan via [release-please](https://github.com/googleapis/release-please):

1. Usa Conventional Commits (`feat:`, `fix:`, `chore:`)
2. Push a `main` → Se crea/actualiza el Release PR
3. Mergea el Release PR → GitHub Release publicado con:
   - `CHANGELOG.md`
   - `prompt-manifest.json` (lista de archivos + checksums SHA256)
   - `agent-skills.tar.gz` (`.agents/` comprimido)

## Para Proyectos Consumidores

Copia las plantillas a tu proyecto:

```bash
cp docs/consumer-templates/.agent-registry.yml your-project/
cp docs/consumer-templates/check-registry-updates.yml your-project/.github/workflows/
cp docs/consumer-templates/sync-agent-registry.yml your-project/.github/workflows/
```

Fija tu version:

```yaml
# .agent-registry.yml
registry:
  repo: first-fluke/oh-my-agent
  version: "4.7.0"
```

Los workflows:
- `check-registry-updates.yml` — Busca nuevas versiones, abre un PR
- `sync-agent-registry.yml` — Sincroniza `.agents/` cuando actualizas la version fijada

**El auto-merge esta desactivado a proposito.** Todas las actualizaciones reciben revision humana.

## Registro Central vs. GitHub Action

| | GitHub Action | Registro Central |
|:--|:--:|:--:|
| Esfuerzo de setup | 1 archivo de workflow | 3 archivos |
| Metodo de actualizacion | CLI `oma update` | Descarga de tarball |
| Control de version | Siempre lo ultimo | Pin explicito |
| Mejor para | La mayoria de proyectos | Control estricto de versiones |

La mayoria de equipos deberian usar el enfoque de [GitHub Action](./automated-updates). Usa Registro Central si necesitas version pinning estricto o no puedes usar acciones de terceros.
