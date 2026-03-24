---
title: Parallele Ausfuehrung
description: Fuehre mehrere Agenten gleichzeitig aus — weil es langsam ist, auf einen zu warten, bevor der naechste startet.
---

# Parallele Ausfuehrung

Die wahre Staerke von oh-my-agent ist es, mehrere Agenten gleichzeitig laufen zu lassen. Waehrend der Backend-Agent deine API baut, erstellt der Frontend-Agent bereits die UI.

## Grundmuster

```bash
oma agent:spawn backend "Implement auth API" session-01 &
oma agent:spawn frontend "Create login form" session-01 &
wait
```

Das `&` fuehrt jeden Agenten im Hintergrund aus. `wait` blockiert, bis beide fertig sind.

## Workspace-bewusstes Muster

Gib jedem Agenten sein eigenes Verzeichnis, um Merge-Konflikte zu vermeiden:

```bash
oma agent:spawn backend "Auth + DB migration" session-02 -w ./apps/api
oma agent:spawn frontend "Login + token refresh" session-02 -w ./apps/web
oma agent:spawn mobile "Auth screens" session-02 -w ./apps/mobile
```

## `agent:parallel` Verwenden

Fuer eine sauberere Syntax:

```bash
oma agent:parallel -i backend:"Implement auth API" frontend:"Build login form" mobile:"Auth screens"
```

Fuege `--no-wait` hinzu zum Starten und Vergessen:

```bash
oma agent:parallel -i backend:"task" frontend:"task" --no-wait
```

## Ueberwachen Waehrend Sie Arbeiten

Oeffne ein separates Terminal:

```bash
# Terminal-Dashboard
oma dashboard

# Oder Web-Dashboard
oma dashboard:web
# → http://localhost:9847
```

Das Dashboard zeigt den Live-Status fuer jeden Agenten — Zuege, aktuelle Aufgabe, Abschlussstatus.

## Multi-CLI-Konfiguration

Nicht alle KI-Tools sind gleich. Leite Agenten an das CLI weiter, das ihre Domain am besten handhabt:

```yaml
# .agents/config/user-preferences.yaml
default_cli: gemini

agent_cli_mapping:
  frontend: claude      # Komplexes UI-Reasoning
  backend: gemini       # Schnelle API-Generierung
  mobile: gemini
  qa: claude            # Gruendliches Sicherheits-Review
  debug: claude         # Tiefe Grundursachen-Analyse
  pm: gemini            # Schnelle Zerlegung
```

## CLI-Vendor-Aufloesung

Beim Starten eines Agenten wird das CLI in dieser Reihenfolge gewaehlt:

1. `--vendor` Flag (hoechste Prioritaet)
2. `agent_cli_mapping` fuer diesen spezifischen Agenten
3. `default_cli` Einstellung
4. `active_vendor` aus `cli-config.yaml`
5. `gemini` (Fallback)

## Tipps fuer Parallele Ausfuehrungen

- **Verwende eine Session-ID pro Feature** — haelt die Agenten-Ausgaben gruppiert
- **Sperre API-Vertraege zuerst** — fuehre `/plan` aus, bevor du Implementierungs-Agenten startest
- **Separate Workspaces** — verhindere, dass Agenten sich gegenseitig in die Dateien pfuschen
- **Ueberwache aktiv** — erkenne Probleme frueh via Dashboard, statt sie beim Merge zu finden
