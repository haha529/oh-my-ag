---
title: CLI-Befehle
description: Jeder verfuegbare Befehl im oh-my-agent CLI — mit Beispielen.
---

# CLI-Befehle

Nach globaler Installation (`bun install --global oh-my-agent`) verwende `oma` oder `oh-my-ag`.

## Setup und Wartung

```bash
oma                    # Interaktiver Installer — Preset waehlen, Skills installieren
oma doctor             # Gesundheitscheck: CLIs, MCP-Configs, Skill-Status
oma update             # Skills auf neueste Version vom Register aktualisieren
oma cleanup            # Verwaiste Prozesse und temporaere Dateien entfernen
```

## Ueberwachung

```bash
oma dashboard          # Terminal-Dashboard — Live-Agentenstatus
oma dashboard:web      # Web-Dashboard unter http://localhost:9847
oma stats              # Produktivitaetsmetriken anzeigen
oma retro [days]       # Engineering-Retrospektive mit Trends
```

## Agenten-Verwaltung

```bash
# Einzelnen Agenten starten
oma agent:spawn <agent-id> <prompt> <session-id>
oma agent:spawn backend "Implement auth API" session-01 -w ./apps/api

# Agentenstatus pruefen
oma agent:status <session-id> [agent-ids...]
oma agent:status session-01 backend frontend

# Mehrere Agenten parallel ausfuehren
oma agent:parallel [tasks...]
oma agent:parallel -i backend:"Auth API" frontend:"Login form"
```

## Speicher und Verifikation

```bash
# Serena-Speicherschema initialisieren
oma memory:init

# Agenten-Ausgabequalitaet verifizieren
oma verify <agent-type>
oma verify backend
oma verify frontend
```

## Integration und Hilfsprogramme

```bash
oma auth:status        # CLI-Authentifizierungsstatus pruefen
oma usage:anti         # Antigravity IDE Nutzungskontingente anzeigen
oma bridge [url]       # MCP stdio zu Streamable HTTP bruecken
oma visualize          # Projektabhaengigkeitsgraph generieren
oma describe [cmd]     # JSON-Introspektion jedes CLI-Befehls
oma star               # oh-my-agent auf GitHub einen Stern geben
```

## Hilfe Bekommen

```bash
oma help               # Alle Befehle anzeigen
oma version            # Versionsnummer anzeigen
oma <command> --help   # Hilfe fuer einen bestimmten Befehl
```
