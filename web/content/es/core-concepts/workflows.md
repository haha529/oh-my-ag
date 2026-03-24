---
title: Workflows
description: Comandos slash que orquestan procesos de multiples pasos — planificacion, revision, depuracion y mas.
---

# Workflows

Los workflows son las secuencias estructuradas que hacen de oh-my-agent algo mas que una coleccion de prompts. Escribe un comando slash y se inicia un proceso de multiples pasos con fases definidas, puertas de calidad y criterios de finalizacion.

## Todos los Comandos de Workflow

### Workflows de Gran Orquestacion

Estos son **persistentes** — siguen ejecutandose hasta que todas las tareas esten completas, y no se pueden interrumpir accidentalmente.

| Comando | Que Hace |
|---------|----------|
| `/orchestrate` | Lanza agentes en paralelo via CLI, coordina a traves de memoria, monitorea progreso, ejecuta verificacion. El modo "hazlo todo". |
| `/coordinate` | Coordinacion multi-dominio paso a paso. PM planifica primero, luego los agentes ejecutan con revision cruzada y ciclos de QA. |
| `/ultrawork` | El workflow obsesionado con calidad. 5 fases, 11 pasos de revision de 17 totales. Planificar → Implementar → Verificar → Refinar → Entregar. |

### Planificacion y Exploracion

| Comando | Que Hace |
|---------|----------|
| `/plan` | Descomposicion de tareas liderada por PM. Genera un plan estructurado en `.agents/plan.json`. |
| `/exec-plan` | Toma el plan de `/plan` y lo ejecuta paso a paso. |
| `/brainstorm` | Ideacion libre. Explora enfoques antes de comprometerte con la implementacion. |
| `/deepinit` | Inicializacion completa del proyecto — analiza el codebase, establece convenciones, configura herramientas. |

### Calidad y Revision

| Comando | Que Hace |
|---------|----------|
| `/review` | Revision QA: seguridad OWASP, rendimiento, accesibilidad. Delega al agente qa-reviewer. |
| `/debug` | Depuracion estructurada: reproducir → diagnosticar → corregir → test de regresion. |

### Diseno

| Comando | Que Hace |
|---------|----------|
| `/design` | Workflow de diseno de 7 fases. Crea DESIGN.md con tokens, patrones de componentes, reglas de accesibilidad y specs de handoff. |

### Utilidades

| Comando | Que Hace |
|---------|----------|
| `/commit` | Analiza tus cambios y crea un commit convencional con tipo/scope apropiado. |
| `/setup` | Configuracion interactiva del proyecto. |
| `/tools` | Gestiona conexiones de servidores MCP. |
| `/stack-set` | Establece preferencias de stack tecnologico. |

## No Siempre Necesitas Comandos Slash

oh-my-agent detecta palabras clave en tu lenguaje natural y activa workflows automaticamente. Di "planifica la funcionalidad de autenticacion" y el workflow de plan arranca — sin necesidad de `/plan`.

Esto funciona en **11 idiomas** (ingles, coreano, japones, chino, espanol, frances, aleman, portugues, ruso, holandes, polaco).

Preguntas como "que es orchestrate?" se reconocen como informativas y no activan nada.

## Skills vs. Workflows

Distincion facil:
- **Skills** = expertise del agente (lo que un agente sabe hacer)
- **Workflows** = procesos orquestados (como multiples agentes trabajan juntos)

Un skill podria ser "construir un componente React." Un workflow es "planificar la funcionalidad → construir los componentes → revisar la seguridad → hacer commit del codigo."

## Secuencias Tipicas

### Funcionalidad Rapida
```
/plan → revisar la salida → /exec-plan
```

### Proyecto Complejo Multi-Dominio
```
/coordinate → PM planifica → agentes se lanzan → QA revisa → corregir problemas → entregar
```

### Entrega de Maxima Calidad
```
/ultrawork → proceso de 5 fases con 11 puntos de revision
```

### Correccion de Bug
```
/debug → reproducir → causa raiz → corregir → test de regresion
```
