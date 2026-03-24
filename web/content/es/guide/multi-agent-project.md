---
title: "Caso de Uso: Proyecto Multi-Agente"
description: Como coordinar multiples agentes para funcionalidades que abarcan frontend, backend, base de datos y QA.
---

# Caso de Uso: Proyecto Multi-Agente

## Cuando Usar Esto

Tu funcionalidad abarca multiples dominios — API backend + UI frontend + esquema de base de datos + revision QA. Un solo agente no puede con todo, y quieres que trabajen en paralelo.

## La Secuencia de Coordinacion

```text
/plan → /coordinate → agent:spawn (paralelo) → /review → merge
```

1. **`/plan`** — El Agente PM descompone la funcionalidad en tareas por dominio
2. **`/coordinate`** — Establece orden de ejecucion y responsabilidades
3. **`agent:spawn`** — Los agentes ejecutan en paralelo
4. **`/review`** — QA revisa consistencia entre dominios

## Estrategia de Sesion

Usa un session ID por funcionalidad:

```text
session-auth-v2
```

Asigna workspaces por dominio:

| Agente | Workspace |
|--------|-----------|
| backend | `./apps/api` |
| frontend | `./apps/web` |
| mobile | `./apps/mobile` |

## Ejemplo de Spawn

```bash
oma agent:spawn backend "Implement JWT auth API + refresh flow" session-auth-v2 -w ./apps/api &
oma agent:spawn frontend "Build login + refresh UX with error states" session-auth-v2 -w ./apps/web &
oma agent:spawn qa "Review auth risks, test matrix, and regression scope" session-auth-v2 &
wait
```

## La Regla de Contratos Primero

Antes de que los agentes empiecen a codificar en paralelo, **bloquea tus contratos de API**:

- Schemas de request/response
- Codigos de error y mensajes
- Supuestos del ciclo de vida de auth/sesion

Si los contratos cambian a mitad de ejecucion, pausa los agentes downstream y re-emite sus prompts con los contratos actualizados.

## Puertas de Merge

No hagas merge hasta que:

1. Los tests a nivel de dominio pasen
2. Los puntos de integracion coincidan con los contratos acordados
3. Los problemas high/critical de QA esten resueltos (o explicitamente descartados)
4. El changelog este actualizado si cambio el comportamiento visible externamente

## Lo Que NO Hacer

- Compartir un workspace entre todos los agentes (pesadilla de conflictos de merge)
- Cambiar contratos sin avisar a otros agentes
- Hacer merge de backend y frontend independientemente antes de verificar compatibilidad

## Cuando Esta Terminado

- Todas las tareas planificadas completas en todos los dominios
- Integracion entre dominios validada
- Aprobacion de QA registrada
