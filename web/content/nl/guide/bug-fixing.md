---
title: "Gebruiksscenario: Bugfixing"
description: Gestructureerd debuggen — van het reproduceren van het probleem tot het schrijven van regressietests.
---

# Gebruiksscenario: Bugfixing

## Begin Met Een Goed Rapport

Hoe beter je bugrapport, hoe sneller de fix:

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

## Triage Eerst

| Ernst | Wat Het Betekent | Reactie |
|-------|-----------------|---------|
| **P0** | Dataverlies, auth-bypass, productie-uitval | Laat alles vallen, betrek QA/beveiliging |
| **P1** | Belangrijke gebruikersstroom kapot | Fix in huidige sprint |
| **P2** | Verminderd maar heeft workaround | Plan fix |
| **P3** | Klein, niet-blokkerend | Backlog |

## De Debug-Loop

1. **Reproduceren** — exact, in een minimale omgeving
2. **Isoleren** — vind de root cause (niet alleen het symptoom)
3. **Fixen** — kleinste veilige wijziging
4. **Testen** — regressietest voor het falende pad
5. **Scannen** — controleer aangrenzende code op hetzelfde patroon

## Prompt-Sjabloon

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

## Wanneer Escaleren

Betrek QA of beveiliging wanneer de bug raakt aan:

- Authenticatie / sessie / token-verversing
- Permissiegrenzen
- Betaling / transactieconsistentie
- Prestaties onder belasting

## Na De Fix

Verifieer:
- Originele reproductie faalt niet meer
- Geen nieuwe fouten in gerelateerde stromen
- Tests falen voor fix, slagen erna
- Rollback-pad is duidelijk indien nodig
