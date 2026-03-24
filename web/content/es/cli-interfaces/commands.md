---
title: Comandos CLI
description: Cada comando disponible en el CLI de oh-my-agent — con ejemplos.
---

# Comandos CLI

Despues de instalar globalmente (`bun install --global oh-my-agent`), usa `oma` o `oh-my-ag`.

## Configuracion y Mantenimiento

```bash
oma                    # Instalador interactivo — elige preset, instala skills
oma doctor             # Verificacion de salud: CLIs, configs MCP, estado de skills
oma update             # Actualiza skills a la ultima version del registro
oma cleanup            # Elimina procesos huerfanos y archivos temporales
```

## Monitoreo

```bash
oma dashboard          # Dashboard de terminal — estado de agentes en vivo
oma dashboard:web      # Dashboard web en http://localhost:9847
oma stats              # Ver metricas de productividad
oma retro [days]       # Retrospectiva de ingenieria con tendencias
```

## Gestion de Agentes

```bash
# Lanzar un agente individual
oma agent:spawn <agent-id> <prompt> <session-id>
oma agent:spawn backend "Implement auth API" session-01 -w ./apps/api

# Verificar estado del agente
oma agent:status <session-id> [agent-ids...]
oma agent:status session-01 backend frontend

# Ejecutar multiples agentes en paralelo
oma agent:parallel [tasks...]
oma agent:parallel -i backend:"Auth API" frontend:"Login form"
```

## Memoria y Verificacion

```bash
# Inicializar schema de memoria Serena
oma memory:init

# Verificar calidad de salida del agente
oma verify <agent-type>
oma verify backend
oma verify frontend
```

## Integracion y Utilidades

```bash
oma auth:status        # Verificar estado de autenticacion del CLI
oma usage:anti         # Mostrar cuotas de uso de Antigravity IDE
oma bridge [url]       # Puente de MCP stdio a Streamable HTTP
oma visualize          # Generar grafo de dependencias del proyecto
oma describe [cmd]     # Introspeccion JSON de cualquier comando CLI
oma star               # Dar estrella a oh-my-agent en GitHub
```

## Obtener Ayuda

```bash
oma help               # Mostrar todos los comandos
oma version            # Mostrar numero de version
oma <command> --help   # Ayuda para un comando especifico
```
