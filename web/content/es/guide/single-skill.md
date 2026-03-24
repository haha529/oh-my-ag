---
title: "Caso de Uso: Skill Individual"
description: Cuando solo necesitas un agente para una tarea enfocada — el camino rapido.
---

# Caso de Uso: Skill Individual

## Cuando Usar Esto

Usa esto cuando tu tarea tiene un alcance estrecho y pertenece a un solo dominio:

- Un componente de UI
- Un endpoint de API
- Un bug en una sola capa
- Un refactor en un solo modulo

Si la tarea necesita coordinacion entre dominios (API + UI + QA), cambia a [Proyecto Multi-Agente](./multi-agent-project).

## Antes de Escribir tu Prompt

Checklist rapido:

1. **Cual es la salida?** — archivo o comportamiento especifico
2. **Que stack?** — framework, lenguaje, versiones
3. **Que es "terminado"?** — criterios de aceptacion
4. **Que tests?** — casos criticos a cubrir

## Plantilla de Prompt

```text
Construye <artefacto especifico> usando <stack>.
Restricciones: <restricciones de estilo/rendimiento/seguridad>.
Criterios de aceptacion:
1) ...
2) ...
Agrega tests para: <casos criticos>.
```

## Ejemplo Real

```text
Create a login form component in React + TypeScript + Tailwind CSS.
Constraints: accessible labels, client-side validation, no external form library.
Acceptance criteria:
1) email and password validation messages
2) disabled submit while invalid
3) keyboard and screen-reader friendly
Add unit tests for valid/invalid submit paths.
```

## Lo Que Pasa

1. El skill correcto se auto-activa basado en tu prompt
2. El agente declara sus supuestos (charter preflight)
3. Confirmas o ajustas
4. El agente escribe codigo y tests
5. Ejecutas verificacion local

## Antes de Hacer Merge

Verifica que:
- El comportamiento coincide con tus criterios de aceptacion
- Los tests cubren happy path y edge cases clave
- No se colaron cambios en archivos no relacionados
- Los modulos compartidos no estan rotos

## Cuando Escalar

Cambia al flujo multi-agente cuando:
- El trabajo de UI necesita un nuevo contrato de API
- Una correccion se propaga a traves de capas
- El alcance crece mas alla de un dominio despues de la primera iteracion
