---
title: "Anwendungsfall: Bugfixing"
description: Strukturiertes Debugging — vom Reproduzieren des Problems bis zum Schreiben von Regressionstests.
---

# Anwendungsfall: Bugfixing

## Starte Mit Einem Guten Bericht

Je besser dein Fehlerbericht, desto schneller der Fix:

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

## Erst Priorisieren

| Schweregrad | Was Es Bedeutet | Reaktion |
|-------------|----------------|----------|
| **P0** | Datenverlust, Auth-Bypass, Produktionsausfall | Alles stehen lassen, QA/Security einbeziehen |
| **P1** | Hauptbenutzerfluss kaputt | Im aktuellen Sprint beheben |
| **P2** | Beeintraechtigt, aber Workaround vorhanden | Fix einplanen |
| **P3** | Geringfuegig, nicht blockierend | Backlog |

## Die Debug-Schleife

1. **Reproduzieren** — genau, in einer minimalen Umgebung
2. **Isolieren** — die Grundursache finden (nicht nur das Symptom)
3. **Beheben** — kleinstmoegliche sichere Aenderung
4. **Testen** — Regressionstest fuer den fehlschlagenden Pfad
5. **Scannen** — angrenzenden Code auf dasselbe Muster pruefen

## Prompt-Template

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

## Wann Eskalieren

Beziehe QA oder Security ein, wenn der Bug betrifft:

- Authentifizierung / Session / Token-Refresh
- Berechtigungsgrenzen
- Zahlungs- / Transaktionskonsistenz
- Performance unter Last

## Nach Dem Fix

Verifiziere:
- Die urspruengliche Reproduktion schlaegt nicht mehr fehl
- Keine neuen Fehler in verwandten Ablaeufen
- Tests schlagen vor dem Fix fehl, bestehen danach
- Rollback-Pfad ist klar, falls noetig
