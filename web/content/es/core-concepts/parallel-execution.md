---
title: Ejecucion en Paralelo
description: Ejecuta multiples agentes al mismo tiempo — porque esperar a que uno termine antes de iniciar el siguiente es lento.
---

# Ejecucion en Paralelo

El verdadero poder de oh-my-agent es ejecutar multiples agentes simultaneamente. Mientras el agente backend construye tu API, el agente frontend ya esta creando la UI.

## Patron Basico

```bash
oma agent:spawn backend "Implement auth API" session-01 &
oma agent:spawn frontend "Create login form" session-01 &
wait
```

El `&` ejecuta cada agente en segundo plano. `wait` bloquea hasta que ambos terminen.

## Patron con Workspaces

Dale a cada agente su propio directorio para evitar conflictos de merge:

```bash
oma agent:spawn backend "Auth + DB migration" session-02 -w ./apps/api
oma agent:spawn frontend "Login + token refresh" session-02 -w ./apps/web
oma agent:spawn mobile "Auth screens" session-02 -w ./apps/mobile
```

## Usando `agent:parallel`

Para una sintaxis mas limpia:

```bash
oma agent:parallel -i backend:"Implement auth API" frontend:"Build login form" mobile:"Auth screens"
```

Agrega `--no-wait` para lanzar y olvidar:

```bash
oma agent:parallel -i backend:"task" frontend:"task" --no-wait
```

## Monitorea Mientras Trabajan

Abre una terminal separada:

```bash
# Dashboard de terminal
oma dashboard

# O dashboard web
oma dashboard:web
# → http://localhost:9847
```

El dashboard muestra estado en vivo para cada agente — turnos tomados, tarea actual, estado de completitud.

## Configuracion Multi-CLI

No todas las herramientas de IA son iguales. Dirige agentes al CLI que mejor maneja su dominio:

```yaml
# .agents/config/user-preferences.yaml
default_cli: gemini

agent_cli_mapping:
  frontend: claude      # Razonamiento UI complejo
  backend: gemini       # Generacion rapida de API
  mobile: gemini
  qa: claude            # Revision de seguridad exhaustiva
  debug: claude         # Analisis profundo de causa raiz
  pm: gemini            # Descomposicion rapida
```

## Resolucion de CLI Vendor

Al lanzar un agente, el CLI se elige en este orden:

1. Flag `--vendor` (maxima prioridad)
2. `agent_cli_mapping` para ese agente especifico
3. Configuracion `default_cli`
4. `active_vendor` de `cli-config.yaml`
5. `gemini` (fallback)

## Consejos para Ejecuciones en Paralelo

- **Usa un session ID por funcionalidad** — mantiene las salidas de agentes agrupadas
- **Bloquea los contratos de API primero** — ejecuta `/plan` antes de lanzar agentes de implementacion
- **Workspaces separados** — evita que los agentes se pisen los archivos entre si
- **Monitorea activamente** — detecta problemas temprano via dashboard en lugar de encontrarlos al hacer merge
