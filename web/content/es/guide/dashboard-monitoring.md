---
title: Monitoreo con Dashboards
description: Observa a tus agentes trabajar en tiempo real con dashboards de terminal y web.
---

# Monitoreo con Dashboards

Cuando tienes multiples agentes ejecutandose en paralelo, quieres tener ojos sobre lo que esta pasando. Para eso son los dashboards.

## Iniciar un Dashboard

```bash
# UI de Terminal
oma dashboard

# UI Web
oma dashboard:web
# → http://localhost:9847
```

## Configuracion Recomendada

Usa 3 terminales lado a lado:

| Terminal | Proposito |
|----------|-----------|
| 1 | `oma dashboard` — estado de agentes en vivo |
| 2 | Comandos de spawn de agentes |
| 3 | Logs de test y build |

Manten el dashboard web abierto en un navegador para visibilidad compartida durante sesiones de equipo.

## Lo Que Ves

Los dashboards observan `.serena/memories/` y muestran:

- **Estado de sesion** — ejecutando, completado, o fallido
- **Tablero de tareas** — que agente tiene que tarea
- **Progreso del agente** — conteo de turnos, actividad actual
- **Resultados** — salidas finales a medida que llegan

Las actualizaciones son por eventos (deteccion de cambios en archivos) — sin loops de polling consumiendo tu CPU.

## Senales de Problemas

| Lo Que Ves | Que Hacer |
|-----------|-----------|
| "No agents detected" | Verifica que los agentes fueron lanzados con el mismo `session-id`. Verifica que `.serena/memories/` se este escribiendo. |
| Sesion atascada en "running" | Revisa timestamps de archivos `progress-*`. Reinicia agentes bloqueados con prompts mas claros. |
| Reconexiones frecuentes (web) | Revisa firewall/proxy. Reinicia `dashboard:web` y refresca la pagina. |
| Actividad faltante | Verifica que el orquestador este escribiendo en el directorio de workspace correcto. |

## Antes de Hacer Merge

Checklist rapido desde el dashboard:

- Todos los agentes llegaron a estado "completed"
- Sin hallazgos de QA de alta severidad sin resolver
- Archivos de resultados presentes para cada agente
- Tests de integracion ejecutados despues de las salidas finales

## Cuando Terminas

La fase de monitoreo esta completa cuando:
- La sesion muestra estado terminal (completed o stopped)
- El historial de actividad explica lo que paso
- Has tomado tu decision de merge/release con visibilidad completa
