---
title: "Anwendungsfall: Multi-Agenten-Projekt"
description: Wie man mehrere Agenten fuer Features koordiniert, die Frontend, Backend, Datenbank und QA umfassen.
---

# Anwendungsfall: Multi-Agenten-Projekt

## Wann Dies Verwenden

Dein Feature umfasst mehrere Domains — Backend-API + Frontend-UI + Datenbankschema + QA-Review. Ein Agent kann nicht alles bewältigen, und du willst, dass sie parallel arbeiten.

## Die Koordinations-Sequenz

```text
/plan → /coordinate → agent:spawn (parallel) → /review → merge
```

1. **`/plan`** — PM-Agent zerlegt das Feature in Domain-Aufgaben
2. **`/coordinate`** — Legt Ausfuehrungsreihenfolge und Verantwortlichkeiten fest
3. **`agent:spawn`** — Agenten fuehren parallel aus
4. **`/review`** — QA prueft domainuebergreifende Konsistenz

## Session-Strategie

Verwende eine Session-ID pro Feature:

```text
session-auth-v2
```

Weise Workspaces pro Domain zu:

| Agent | Workspace |
|-------|-----------|
| backend | `./apps/api` |
| frontend | `./apps/web` |
| mobile | `./apps/mobile` |

## Spawn-Beispiel

```bash
oma agent:spawn backend "Implement JWT auth API + refresh flow" session-auth-v2 -w ./apps/api &
oma agent:spawn frontend "Build login + refresh UX with error states" session-auth-v2 -w ./apps/web &
oma agent:spawn qa "Review auth risks, test matrix, and regression scope" session-auth-v2 &
wait
```

## Die Vertraege-Zuerst-Regel

Bevor Agenten parallel mit dem Coden beginnen, **sperre deine API-Vertraege**:

- Request/Response-Schemata
- Fehlercodes und Nachrichten
- Auth-/Session-Lebenszyklus-Annahmen

Wenn sich Vertraege mitten im Lauf aendern, pausiere nachgelagerte Agenten und stelle ihre Prompts mit aktualisierten Vertraegen neu aus.

## Merge-Gates

Merge nicht, bis:

1. Tests auf Domain-Ebene bestehen
2. Integrationspunkte mit vereinbarten Vertraegen uebereinstimmen
3. High/Critical QA-Probleme geloest sind (oder explizit akzeptiert)
4. Changelog aktualisiert ist, falls sich extern sichtbares Verhalten geaendert hat

## Was NICHT Tun

- Einen Workspace fuer alle Agenten teilen (Merge-Konflikt-Albtraum)
- Vertraege aendern, ohne andere Agenten zu informieren
- Backend und Frontend unabhaengig mergen, bevor die Kompatibilitaet geprueft ist

## Wann Es Fertig Ist

- Alle geplanten Aufgaben in allen Domains abgeschlossen
- Domainuebergreifende Integration validiert
- QA-Freigabe protokolliert
