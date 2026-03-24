---
title: Opciones del CLI
description: Todos los flags y opciones para los comandos del CLI de oh-my-agent.
---

# Opciones del CLI

## Opciones Globales

Disponibles en cada comando:

| Opcion | Que Hace |
|--------|----------|
| `-h, --help` | Mostrar ayuda |
| `-V, --version` | Mostrar numero de version |

## Opciones de Salida

Muchos comandos soportan salida legible por maquinas:

| Opcion | Que Hace |
|--------|----------|
| `--json` | Salida en JSON |
| `--output <format>` | Formato de salida: `text` o `json` |

Tambien puedes establecer `OH_MY_AG_OUTPUT_FORMAT=json` como variable de entorno.

**Soportado por:** `doctor`, `stats`, `retro`, `cleanup`, `auth:status`, `usage:anti`, `memory:init`, `verify`, `visualize`

## Opciones Por Comando

### `update`
| Opcion | Que Hace |
|--------|----------|
| `-f, --force` | Sobreescribir archivos de configuracion personalizados |
| `--ci` | Modo no interactivo (omitir todos los prompts) |

### `stats`
| Opcion | Que Hace |
|--------|----------|
| `--reset` | Resetear todos los datos de metricas |

### `retro`
| Opcion | Que Hace |
|--------|----------|
| `--interactive` | Modo de entrada manual |
| `--compare` | Comparar ventana actual vs. ventana previa de la misma duracion |

### `cleanup`
| Opcion | Que Hace |
|--------|----------|
| `--dry-run` | Mostrar que se limpiaria sin hacerlo |
| `-y, --yes` | Omitir prompts de confirmacion |

### `usage:anti`
| Opcion | Que Hace |
|--------|----------|
| `--raw` | Volcar respuesta RPC sin procesar |

### `agent:spawn`
| Opcion | Que Hace |
|--------|----------|
| `-v, --vendor <vendor>` | Sobreescribir CLI vendor (`gemini`/`claude`/`codex`/`qwen`) |
| `-w, --workspace <path>` | Directorio de trabajo para el agente |

### `agent:status`
| Opcion | Que Hace |
|--------|----------|
| `-r, --root <path>` | Ruta raiz para verificaciones de memoria |

### `agent:parallel`
| Opcion | Que Hace |
|--------|----------|
| `-v, --vendor <vendor>` | Sobreescribir CLI vendor |
| `-i, --inline` | Especificar tareas como argumentos `agent:task` |
| `--no-wait` | No esperar a que completen (modo background) |

### `memory:init`
| Opcion | Que Hace |
|--------|----------|
| `--force` | Sobreescribir archivos de schema existentes |

### `verify`
| Opcion | Que Hace |
|--------|----------|
| `-w, --workspace <path>` | Ruta del workspace a verificar |

## Ejemplos Practicos

```bash
# Salida JSON para pipeline CI
oma doctor --json

# Resetear metricas de productividad
oma stats --reset

# Vista previa de limpieza sin ejecutar
oma cleanup --dry-run

# Lanzar con CLI y workspace especificos
oma agent:spawn backend "Auth API" session-01 -v codex -w ./apps/api

# Actualizacion no interactiva en CI
oma update --ci --force

# Comparar ultimos 7 dias vs. 7 dias previos
oma retro 7 --compare
```
