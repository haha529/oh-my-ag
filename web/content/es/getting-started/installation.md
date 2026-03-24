---
title: Instalacion
description: Pon oh-my-agent a funcionar en tu proyecto — tres formas de instalar, todas rapidas.
---

# Instalacion

## Lo Que Necesitas

- **Un IDE con IA** — Antigravity, Claude Code, Cursor, Gemini CLI, Codex CLI, o similar
- **bun** y **uv** — se instalan automaticamente si faltan

## Opcion 1: Una Sola Linea (Recomendado)

```bash
curl -fsSL https://raw.githubusercontent.com/first-fluke/oh-my-agent/main/cli/install.sh | bash
```

Esto detecta dependencias faltantes (bun, uv), las instala y lanza la configuracion interactiva. Listo en aproximadamente un minuto.

## Opcion 2: Instalacion Manual

```bash
bunx oh-my-agent
```

Obtendras un menu para elegir un preset:

| Preset | Lo Que Obtienes |
|--------|-----------------|
| All | Todos los agentes y skills |
| Fullstack | frontend + backend + db + pm + qa + debug + brainstorm + commit |
| Frontend | frontend + pm + qa + debug + brainstorm + commit |
| Backend | backend + db + pm + qa + debug + brainstorm + commit |
| Mobile | mobile + pm + qa + debug + brainstorm + commit |
| DevOps | tf-infra + dev-workflow + pm + qa + debug + brainstorm + commit |

Los skills se instalan en `.agents/skills/` con symlinks creados para tu IDE.

## Opcion 3: Instalacion Global

Para uso frecuente del CLI (dashboards, spawn de agentes, diagnosticos):

```bash
# Homebrew
brew install oh-my-agent

# o npm/bun
bun install --global oh-my-agent
```

Ahora puedes usar `oma` en cualquier lugar:

```bash
oma doctor          # Verifica que todo este bien
oma dashboard       # Monitoreo en tiempo real
oma agent:spawn     # Lanza agentes desde la terminal
```

## Elige un CLI de IA

Necesitas al menos uno:

| CLI | Instalacion | Como Autenticar |
|-----|-------------|-----------------|
| Gemini | `bun install --global @google/gemini-cli` | Automatico en la primera ejecucion |
| Claude | `curl -fsSL https://claude.ai/install.sh \| bash` | Automatico en la primera ejecucion |
| Codex | `bun install --global @openai/codex` | `codex login` |
| Qwen | `bun install --global @qwen-code/qwen-code` | `/auth` dentro del CLI |

## Configuracion Inicial

Despues de la instalacion, ejecuta `/setup` en tu IDE de IA para configurar:

- Idioma de respuesta
- CLI vendor por defecto
- Mapeo de CLI por agente (usa diferentes herramientas de IA para diferentes agentes)

Esto crea `.agents/config/user-preferences.yaml` — el archivo que controla todas tus preferencias.

## Verificar Que Funciono

```bash
oma doctor
```

Esto revisa instalaciones de CLI, configuraciones MCP y estado de skills. Si algo anda mal, te dice exactamente que arreglar.

## Que Sigue?

Abre tu proyecto en tu IDE de IA y empieza a chatear. Los skills se detectan automaticamente. Prueba algo como:

```
"Construye un formulario de login con validacion de email usando Tailwind CSS"
```

O ve directamente a la [Guia de Uso](/guide/usage) para mas ejemplos.
