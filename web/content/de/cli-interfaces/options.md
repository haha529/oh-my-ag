---
title: CLI-Optionen
description: Alle Flags und Optionen fuer oh-my-agent CLI-Befehle.
---

# CLI-Optionen

## Globale Optionen

Verfuegbar bei jedem Befehl:

| Option | Was Sie Tut |
|--------|-----------|
| `-h, --help` | Hilfe anzeigen |
| `-V, --version` | Versionsnummer anzeigen |

## Ausgabe-Optionen

Viele Befehle unterstuetzen maschinenlesbare Ausgabe:

| Option | Was Sie Tut |
|--------|-----------|
| `--json` | Ausgabe als JSON |
| `--output <format>` | Ausgabeformat: `text` oder `json` |

Du kannst auch `OH_MY_AG_OUTPUT_FORMAT=json` als Umgebungsvariable setzen.

**Unterstuetzt von:** `doctor`, `stats`, `retro`, `cleanup`, `auth:status`, `usage:anti`, `memory:init`, `verify`, `visualize`

## Optionen Pro Befehl

### `update`
| Option | Was Sie Tut |
|--------|-----------|
| `-f, --force` | Benutzerdefinierte Config-Dateien ueberschreiben |
| `--ci` | Nicht-interaktiver Modus (alle Prompts ueberspringen) |

### `stats`
| Option | Was Sie Tut |
|--------|-----------|
| `--reset` | Alle Metrikdaten zuruecksetzen |

### `retro`
| Option | Was Sie Tut |
|--------|-----------|
| `--interactive` | Manueller Eingabemodus |
| `--compare` | Aktuelles Fenster vs. vorheriges gleichlanges Fenster vergleichen |

### `cleanup`
| Option | Was Sie Tut |
|--------|-----------|
| `--dry-run` | Zeigen, was bereinigt wuerde, ohne es zu tun |
| `-y, --yes` | Bestaetigungsabfragen ueberspringen |

### `usage:anti`
| Option | Was Sie Tut |
|--------|-----------|
| `--raw` | Rohe RPC-Antwort ausgeben |

### `agent:spawn`
| Option | Was Sie Tut |
|--------|-----------|
| `-v, --vendor <vendor>` | CLI-Vendor ueberschreiben (`gemini`/`claude`/`codex`/`qwen`) |
| `-w, --workspace <path>` | Arbeitsverzeichnis fuer den Agenten |

### `agent:status`
| Option | Was Sie Tut |
|--------|-----------|
| `-r, --root <path>` | Wurzelpfad fuer Speicherpruefungen |

### `agent:parallel`
| Option | Was Sie Tut |
|--------|-----------|
| `-v, --vendor <vendor>` | CLI-Vendor ueberschreiben |
| `-i, --inline` | Aufgaben als `agent:task`-Argumente angeben |
| `--no-wait` | Nicht auf Abschluss warten (Hintergrundmodus) |

### `memory:init`
| Option | Was Sie Tut |
|--------|-----------|
| `--force` | Vorhandene Schema-Dateien ueberschreiben |

### `verify`
| Option | Was Sie Tut |
|--------|-----------|
| `-w, --workspace <path>` | Workspace-Pfad zum Verifizieren |

## Praktische Beispiele

```bash
# JSON-Ausgabe fuer CI-Pipeline
oma doctor --json

# Produktivitaetsmetriken zuruecksetzen
oma stats --reset

# Bereinigungsvorschau ohne Ausfuehrung
oma cleanup --dry-run

# Mit spezifischem CLI und Workspace starten
oma agent:spawn backend "Auth API" session-01 -v codex -w ./apps/api

# Nicht-interaktives Update in CI
oma update --ci --force

# Letzte 7 Tage vs. vorherige 7 Tage vergleichen
oma retro 7 --compare
```
