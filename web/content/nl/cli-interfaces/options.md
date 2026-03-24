---
title: CLI-Opties
description: Alle vlaggen en opties voor oh-my-agent CLI-commando's.
---

# CLI-Opties

## Globale Opties

Beschikbaar bij elk commando:

| Optie | Wat Het Doet |
|-------|-------------|
| `-h, --help` | Toon hulp |
| `-V, --version` | Toon versienummer |

## Output-Opties

Veel commando's ondersteunen machine-leesbare output:

| Optie | Wat Het Doet |
|-------|-------------|
| `--json` | Output als JSON |
| `--output <format>` | Output-formaat: `text` of `json` |

Je kunt ook `OH_MY_AG_OUTPUT_FORMAT=json` instellen als omgevingsvariabele.

**Ondersteund door:** `doctor`, `stats`, `retro`, `cleanup`, `auth:status`, `usage:anti`, `memory:init`, `verify`, `visualize`

## Per-Commando Opties

### `update`
| Optie | Wat Het Doet |
|-------|-------------|
| `-f, --force` | Overschrijf door gebruiker aangepaste configuratiebestanden |
| `--ci` | Niet-interactieve modus (sla alle prompts over) |

### `stats`
| Optie | Wat Het Doet |
|-------|-------------|
| `--reset` | Reset alle metriekgegevens |

### `retro`
| Optie | Wat Het Doet |
|-------|-------------|
| `--interactive` | Handmatige invoermodus |
| `--compare` | Vergelijk huidig venster met vorig venster van dezelfde lengte |

### `cleanup`
| Optie | Wat Het Doet |
|-------|-------------|
| `--dry-run` | Toon wat opgeruimd zou worden zonder het te doen |
| `-y, --yes` | Sla bevestigingsprompts over |

### `usage:anti`
| Optie | Wat Het Doet |
|-------|-------------|
| `--raw` | Dump ruwe RPC-response |

### `agent:spawn`
| Optie | Wat Het Doet |
|-------|-------------|
| `-v, --vendor <vendor>` | Overschrijf CLI-vendor (`gemini`/`claude`/`codex`/`qwen`) |
| `-w, --workspace <path>` | Werkmap voor de agent |

### `agent:status`
| Optie | Wat Het Doet |
|-------|-------------|
| `-r, --root <path>` | Root-pad voor geheugencontroles |

### `agent:parallel`
| Optie | Wat Het Doet |
|-------|-------------|
| `-v, --vendor <vendor>` | Overschrijf CLI-vendor |
| `-i, --inline` | Specificeer taken als `agent:task` argumenten |
| `--no-wait` | Wacht niet op voltooiing (achtergrondmodus) |

### `memory:init`
| Optie | Wat Het Doet |
|-------|-------------|
| `--force` | Overschrijf bestaande schemabestanden |

### `verify`
| Optie | Wat Het Doet |
|-------|-------------|
| `-w, --workspace <path>` | Workspace-pad om te verifiëren |

## Praktische Voorbeelden

```bash
# JSON-output voor CI-pipeline
oma doctor --json

# Reset productiviteitsmetrieken
oma stats --reset

# Preview opruiming zonder uitvoering
oma cleanup --dry-run

# Spawn met specifieke CLI en workspace
oma agent:spawn backend "Auth API" session-01 -v codex -w ./apps/api

# Niet-interactieve update in CI
oma update --ci --force

# Vergelijk laatste 7 dagen met vorige 7 dagen
oma retro 7 --compare
```
