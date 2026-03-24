---
title: Estructura del Proyecto
description: Donde vive cada cosa y por que esta organizado asi.
---

# Estructura del Proyecto

oh-my-agent organiza todo en unos pocos directorios clave. Esto es lo que veras despues de la instalacion.

## La Vision General

```text
tu-proyecto/
├── .agents/              ← Fuente Unica de Verdad
│   ├── config/           ← Tus preferencias
│   ├── skills/           ← Capacidades de los agentes
│   ├── workflows/        ← Definiciones de comandos slash
│   ├── agents/           ← Definiciones de subagentes
│   ├── plan.json         ← Salida del plan generado
│   ├── state/            ← Estado activo del workflow
│   ├── results/          ← Archivos de resultados de agentes
│   └── mcp.json          ← Configuracion de servidor MCP
│
├── .claude/              ← Capa de integracion con IDE
│   ├── settings.json     ← Hooks y permisos
│   ├── hooks/            ← Deteccion de keywords, HUD
│   ├── skills/           ← Symlinks a .agents/skills/
│   └── agents/           ← Definiciones de subagentes para IDE
│
└── .serena/              ← Estado en tiempo de ejecucion
    └── memories/         ← Archivos de memoria de orquestacion
```

## `.agents/` — La Fuente de Verdad

Este es el nucleo. Todo lo que los agentes necesitan vive aqui.

### `config/`
- **`user-preferences.yaml`** — Tu idioma, zona horaria, CLI por defecto, mapeo de CLI por agente

### `skills/`
Donde vive la expertise de los agentes. Cada skill tiene un `SKILL.md` y un directorio `resources/`.

- **`_shared/`** — Recursos comunes usados por todos los agentes (ruteo, plantillas, checklists)
- **`oma-frontend/`**, **`oma-backend/`**, etc. — Skills especificos por dominio

### `workflows/`
Archivos Markdown que definen el comportamiento de los comandos slash. Estos son los scripts que los agentes siguen cuando escribes `/plan`, `/coordinate`, `/review`, etc.

### `agents/`
Definiciones de subagentes — las especificaciones para lanzar agentes via CLI o la herramienta Task.

## `.claude/` — Integracion con IDE

Esto conecta oh-my-agent con Claude Code (y otros IDEs via symlinks).

### `hooks/`
- **`triggers.json`** — Mapeo de keywords a workflows en 11 idiomas
- **`keyword-detector.ts`** — La logica que auto-detecta workflows desde tu input
- **`persistent-mode.ts`** — Mantiene workflows persistentes ejecutandose hasta completarse
- **`hud.ts`** — El indicador `[OMA]` en la barra de estado

### `skills/` y `agents/`
Symlinks apuntando a `.agents/` — mantiene una fuente unica de verdad mientras los skills son visibles para el IDE.

## `.serena/memories/` — Estado en Tiempo de Ejecucion

Donde los agentes escriben su progreso durante la ejecucion:

| Archivo | Que Contiene |
|---------|--------------|
| `orchestrator-session.md` | ID de sesion, estado, hora de inicio |
| `task-board.md` | Que agente tiene que tarea |
| `progress-{agent}.md` | Actualizaciones de progreso turno a turno |
| `result-{agent}.md` | Salida final de cada agente |

Los dashboards observan este directorio para actualizaciones en tiempo real.

## Para el Repositorio Fuente de oh-my-agent

Si estas trabajando en oh-my-agent en si (no solo usandolo), el repo es un monorepo:

```text
oh-my-agent/
├── cli/              ← Fuente de la herramienta CLI (TypeScript)
├── web/              ← Sitio de documentacion (Next.js)
├── action/           ← GitHub Action para actualizaciones automaticas
├── docs/             ← READMEs traducidos + especificaciones
└── .agents/          ← Editable (ESTE ES el fuente)
```
