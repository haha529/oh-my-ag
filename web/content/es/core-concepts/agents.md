---
title: Agentes
description: Como funcionan los agentes — roles, categorias, charter preflight y el flujo de orquestacion.
---

# Agentes

Los agentes en oh-my-agent no son chatbots genericos. Cada uno esta modelado segun un rol especifico de equipo de ingenieria con alcance, herramientas y estandares de calidad definidos.

## Categorias de Agentes

Piensa en ellos como tu organizacion de ingenieria:

| Categoria | Agentes | Que Manejan |
|-----------|---------|-------------|
| **Ideacion** | oma-brainstorm | Explorar ideas antes de comprometerse con codigo |
| **Planificacion** | oma-pm | Requisitos, descomposicion de tareas, contratos de API |
| **Implementacion** | oma-frontend, oma-backend, oma-mobile, oma-db | La codificacion real |
| **Diseno** | oma-design | Sistemas de diseno, tokens, patrones UI/UX |
| **Infraestructura** | oma-tf-infra | Aprovisionamiento cloud con Terraform |
| **DevOps** | oma-dev-workflow | CI/CD, migraciones, releases |
| **Calidad** | oma-qa, oma-debug | Revisiones, auditorias de seguridad, correccion de bugs |
| **Localizacion** | oma-translator | Traduccion multilingue natural |
| **Coordinacion** | oma-orchestrator, oma-coordination | Ejecutar y sincronizar agentes juntos |
| **Git** | oma-commit | Commits convencionales limpios |

## Como Ejecutan los Agentes

Cada agente sigue la misma disciplina:

### 1. Charter Preflight

Antes de escribir cualquier codigo, los agentes emiten un `CHARTER_CHECK` declarando:
- En que dominio estan trabajando
- Que restricciones aplican
- Que supuestos estan haciendo
- Como luce el "terminado"

Esto atrapa desbordamientos de alcance y malentendidos temprano.

### 2. Carga en Dos Capas

Los agentes son eficientes con tokens por diseno:
- **Capa 1** (`SKILL.md`, ~800 bytes): Identidad y reglas de ruteo — siempre cargado
- **Capa 2** (`resources/`): Protocolos de ejecucion, playbooks de errores, plantillas de codigo — cargados solo cuando se necesitan

Esto ahorra ~75% de tokens comparado con cargar todo de entrada.

### 3. Ejecucion con Alcance Definido

Un agente de frontend no toca codigo de backend. Un agente de DB no modifica componentes de UI. Cada agente se mantiene en su carril.

### 4. Puerta de Calidad

Cada agente tiene un checklist especifico de dominio. El trabajo no esta "terminado" hasta que el checklist pasa.

## Estrategia de Workspace

Para proyectos multi-agente, workspaces separados reducen conflictos de merge:

```text
./apps/api      → workspace del agente backend
./apps/web      → workspace del agente frontend
./apps/mobile   → workspace del agente mobile
```

## Flujo de Orquestacion

Cuando ejecutas un flujo de trabajo multi-agente:

1. **Agente PM** descompone la tarea en subtareas especificas por dominio
2. **Agentes de dominio** ejecutan en paralelo, cada uno en su workspace
3. **Progreso** fluye hacia la memoria de Serena (`.serena/memories/`)
4. **Agente QA** valida la consistencia entre dominios
5. **Resultados** son recolectados y listos para merge

## Estado en Tiempo de Ejecucion (Serena Memory)

Los agentes se coordinan a traves de archivos de memoria compartida:

| Archivo | Proposito |
|---------|-----------|
| `orchestrator-session.md` | Estado de la sesion actual |
| `task-board.md` | Asignaciones de tareas y estado |
| `progress-{agent}.md` | Actualizaciones de progreso por agente |
| `result-{agent}.md` | Salidas finales del agente |

Estos viven en `.serena/memories/` y son lo que los dashboards monitorean.
