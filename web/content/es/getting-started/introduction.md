---
title: Introduccion
description: Que es oh-my-agent y por que querrias un equipo de agentes de IA trabajando juntos.
---

# Introduccion

Alguna vez deseaste que tu asistente de IA tuviera companeros de trabajo? Eso es exactamente lo que hace oh-my-agent.

En lugar de que una sola IA haga todo (y se confunda a mitad de camino), oh-my-agent distribuye el trabajo entre **agentes especializados** — un experto en frontend, un experto en backend, un revisor de QA, un planificador PM, y mas. Cada agente conoce su dominio a fondo y tiene sus propias herramientas, checklists y guias de errores.

## Lo Que Realmente Obtienes

- **14 agentes especializados** — cada uno modelado segun un rol real de equipo de ingenieria
- **Comandos slash** como `/plan`, `/coordinate`, `/review` que activan flujos de trabajo estructurados
- **Deteccion automatica** — simplemente describe lo que quieres en lenguaje natural, y el flujo correcto se activa (en 11 idiomas!)
- **Ejecucion en paralelo** — lanza multiples agentes trabajando en distintas partes simultaneamente
- **Dashboards en tiempo real** — terminal y web UI para monitorear lo que hacen tus agentes
- **Funciona en todas partes** — Antigravity, Claude Code, Cursor, Gemini CLI, Codex CLI, OpenCode, y mas

## Conoce a Tu Equipo

| Agente | Que Hace |
|--------|----------|
| **oma-brainstorm** | Explora ideas antes de comprometerte a construir algo |
| **oma-pm** | Descompone requisitos, planifica tareas, define contratos de API |
| **oma-frontend** | Construye UI con React/Next.js, TypeScript y Tailwind CSS |
| **oma-backend** | Crea APIs en Python, Node.js o Rust |
| **oma-db** | Disena esquemas de base de datos, gestiona migraciones, optimiza consultas |
| **oma-mobile** | Construye apps multiplataforma con Flutter |
| **oma-design** | Crea sistemas de diseno con tokens, accesibilidad y reglas responsivas |
| **oma-qa** | Revisa seguridad (OWASP), rendimiento y accesibilidad |
| **oma-debug** | Encuentra causas raiz, escribe correcciones y tests de regresion |
| **oma-tf-infra** | Aprovisiona infraestructura en la nube con Terraform |
| **oma-dev-workflow** | Automatiza CI/CD, releases y tareas de monorepo |
| **oma-translator** | Traduce contenido de forma natural entre idiomas |
| **oma-orchestrator** | Ejecuta multiples agentes en paralelo via CLI |
| **oma-commit** | Crea commits convencionales limpios |

## Como Funciona (La Version de 30 Segundos)

1. Describes lo que quieres construir
2. oh-my-agent determina que agentes se necesitan
3. Los agentes ejecutan con su conocimiento especializado
4. Las puertas de calidad verifican el trabajo antes de terminarlo
5. Obtienes codigo listo para produccion, no solo sugerencias

## La Idea Clave

Todo vive en `.agents/` — un unico directorio portable en tu proyecto. Skills, workflows, configs, todo. Cambia de IDE cuando quieras. Tu configuracion de agentes viaja con tu codigo.

## Que Sigue?

- **[Instalacion](./installation)** — Ponte en marcha en 60 segundos
- **[Guia de Uso](/guide/usage)** — Mira ejemplos reales de agentes en accion
- **[Workflows](/core-concepts/workflows)** — Aprende sobre los comandos slash
