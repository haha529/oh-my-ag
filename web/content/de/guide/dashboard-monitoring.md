---
title: Dashboard-Ueberwachung
description: Beobachte deine Agenten in Echtzeit bei der Arbeit mit Terminal- und Web-Dashboards.
---

# Dashboard-Ueberwachung

Wenn du mehrere Agenten parallel laufen hast, willst du im Blick behalten, was passiert. Dafuer sind Dashboards da.

## Ein Dashboard Starten

```bash
# Terminal-UI
oma dashboard

# Web-UI
oma dashboard:web
# → http://localhost:9847
```

## Empfohlenes Setup

Verwende 3 Terminals nebeneinander:

| Terminal | Zweck |
|----------|-------|
| 1 | `oma dashboard` — Live-Agentenstatus |
| 2 | Agenten-Spawn-Befehle |
| 3 | Test- und Build-Logs |

Halte das Web-Dashboard in einem Browser offen fuer gemeinsame Sichtbarkeit waehrend Team-Sessions.

## Was Du Siehst

Dashboards ueberwachen `.serena/memories/` und zeigen:

- **Sitzungsstatus** — laufend, abgeschlossen oder fehlgeschlagen
- **Aufgabentafel** — welcher Agent welche Aufgabe hat
- **Agentenfortschritt** — Zuganzahl, aktuelle Aktivitaet
- **Ergebnisse** — Endausgaben, sobald sie eintreffen

Updates sind ereignisgesteuert (Dateiaenderungserkennung) — keine Polling-Schleifen, die deine CPU fressen.

## Problemsignale

| Was Du Siehst | Was Zu Tun Ist |
|--------------|---------------|
| "No agents detected" | Pruefe, ob Agenten mit derselben `session-id` gestartet wurden. Pruefe, ob `.serena/memories/` beschrieben wird. |
| Sitzung haengt bei "running" | Pruefe Zeitstempel der `progress-*`-Dateien. Starte blockierte Agenten mit klareren Prompts neu. |
| Haeufige Reconnects (Web) | Pruefe Firewall/Proxy. Starte `dashboard:web` neu und aktualisiere die Seite. |
| Fehlende Aktivitaet | Pruefe, ob der Orchestrator in das richtige Workspace-Verzeichnis schreibt. |

## Vor dem Merge

Schnell-Checkliste vom Dashboard:

- Alle Agenten haben Status "completed" erreicht
- Keine ungeloesten QA-Befunde mit hohem Schweregrad
- Ergebnisdateien fuer jeden Agenten vorhanden
- Integrationstests nach den Endausgaben durchgefuehrt

## Wenn Du Fertig Bist

Die Ueberwachungsphase ist abgeschlossen, wenn:
- Die Sitzung einen Endzustand zeigt (completed oder stopped)
- Der Aktivitaetsverlauf erklaert, was passiert ist
- Du deine Merge-/Release-Entscheidung mit voller Sichtbarkeit getroffen hast
