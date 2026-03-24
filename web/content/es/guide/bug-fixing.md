---
title: "Caso de Uso: Correccion de Bugs"
description: Depuracion estructurada — desde reproducir el problema hasta escribir tests de regresion.
---

# Caso de Uso: Correccion de Bugs

## Empieza Con un Buen Reporte

Mientras mejor sea tu reporte de bug, mas rapida la correccion:

```text
Symptom: Login button throws TypeError
Environment: Chrome 130, macOS, production build
Steps to reproduce:
  1. Go to /login
  2. Enter valid credentials
  3. Click "Sign In"
Expected: Redirect to dashboard
Actual: White screen, console shows "Cannot read property 'map' of undefined"
Logs: [paste relevant logs]
```

## Prioriza Primero

| Severidad | Que Significa | Respuesta |
|-----------|--------------|-----------|
| **P0** | Perdida de datos, bypass de auth, caida en produccion | Deja todo, involucra QA/seguridad |
| **P1** | Flujo principal de usuario roto | Corregir en el sprint actual |
| **P2** | Degradado pero tiene workaround | Programar correccion |
| **P3** | Menor, no bloquea | Backlog |

## El Ciclo de Depuracion

1. **Reproducir** — exactamente, en un entorno minimo
2. **Aislar** — encontrar la causa raiz (no solo el sintoma)
3. **Corregir** — el cambio seguro mas pequeno
4. **Testear** — test de regresion para el camino fallido
5. **Escanear** — revisar codigo adyacente por el mismo patron

## Plantilla de Prompt

```text
Bug: Login throws "Cannot read property 'map' of undefined"
Repro: Click sign-in with valid credentials
Scope: src/components/auth/*, src/hooks/useAuth.ts
Expected: Redirect to dashboard
Need:
1) root cause analysis
2) minimal fix
3) regression tests
4) scan for similar patterns
```

## Cuando Escalar

Involucra QA o seguridad cuando el bug toca:

- Autenticacion / sesion / refresh de token
- Limites de permisos
- Consistencia de pagos / transacciones
- Rendimiento bajo carga

## Despues de la Correccion

Verifica:
- La reproduccion original ya no falla
- No hay errores nuevos en flujos relacionados
- Los tests fallan antes de la correccion, pasan despues
- El camino de rollback esta claro si se necesita
