---
title: Skills
description: Como la arquitectura de skills de dos capas mantiene a los agentes inteligentes sin desperdiciar tokens.
---

# Skills

Los skills son lo que hace experto a cada agente. Son conocimiento estructurado — no solo prompts, sino protocolos de ejecucion, plantillas de codigo, playbooks de errores y checklists de calidad.

## El Diseno de Dos Capas

Aqui esta la parte ingeniosa: los skills no cargan todo de una vez. Usan divulgacion progresiva para ahorrar ~75% de tokens.

### Capa 1: SKILL.md (~800 bytes)

Siempre cargado. Contiene:
- Identidad y rol del agente
- Cuando activarse (condiciones de ruteo)
- Reglas y restricciones principales
- Que NO hacer

### Capa 2: resources/ (cargado bajo demanda)

Solo se carga cuando el agente esta trabajando activamente. Contiene lo profundo:

| Recurso | Que Hace |
|---------|----------|
| `execution-protocol.md` | Flujo paso a paso: Analizar → Planificar → Implementar → Verificar |
| `tech-stack.md` | Especificaciones detalladas de tecnologia y versiones |
| `error-playbook.md` | Que hacer cuando las cosas salen mal (con escalamiento de "3 strikes") |
| `checklist.md` | Verificaciones de calidad especificas del dominio |
| `snippets.md` | Patrones de codigo listos para usar |
| `examples/` | Ejemplos few-shot de entrada/salida |

### Como Se Ve

```
.agents/skills/oma-frontend/
├── SKILL.md                          ← Siempre cargado (~800 bytes)
└── resources/
    ├── execution-protocol.md         ← Bajo demanda
    ├── tech-stack.md
    ├── tailwind-rules.md
    ├── component-template.tsx
    ├── snippets.md
    ├── error-playbook.md
    ├── checklist.md
    └── examples/
```

## Recursos Compartidos

Todos los agentes comparten fundamentos comunes de `.agents/skills/_shared/`:

| Recurso | Proposito |
|---------|-----------|
| `skill-routing.md` | Mapea tareas al agente correcto |
| `context-loading.md` | Que recursos cargar para cada tipo de tarea |
| `prompt-structure.md` | Objetivo → Contexto → Restricciones → Listo Cuando |
| `clarification-protocol.md` | Cuando preguntar vs. simplemente asumir |
| `context-budget.md` | Lectura de archivos eficiente en tokens por nivel de modelo |
| `difficulty-guide.md` | Evaluacion de tarea Simple / Media / Compleja |
| `reasoning-templates.md` | Plantillas de razonamiento estructurado |
| `quality-principles.md` | Estandares de calidad universales |
| `vendor-detection.md` | Detectar que IDE/CLI esta en ejecucion |

## Recursos Condicionales

Algunos recursos solo se cargan cuando se activan por condiciones especificas:

| Recurso | Cuando Se Carga |
|---------|-----------------|
| `quality-score.md` | Se solicita evaluacion de calidad |
| `experiment-ledger.md` | Probando un enfoque experimental |
| `exploration-loop.md` | Exploracion iterativa en progreso |

## Ejecucion Especifica por Vendor

Cada CLI soportado tiene su propio protocolo de ejecucion en `.agents/skills/_shared/runtime/execution-protocols/`:
- `claude.md` — Patrones especificos de Claude
- `gemini.md` — Patrones especificos de Gemini
- `codex.md` — Patrones especificos de Codex
- `qwen.md` — Patrones especificos de Qwen

## Por Que Esto Importa

Sin divulgacion progresiva, cargar 5 agentes agotaria tu ventana de contexto antes de que empiece cualquier trabajo. Con ella, obtienes carga inicial ligera y ejecucion profunda cuando importa.
