---
title: Opcje CLI
description: Wszystkie flagi i opcje komend CLI oh-my-agent.
---

# Opcje CLI

## Opcje Globalne

Dostepne w kazdej komendzie:

| Opcja | Co Robi |
|-------|--------|
| `-h, --help` | Pokaz pomoc |
| `-V, --version` | Pokaz numer wersji |

## Opcje Wyjscia

Wiele komend wspiera wyjscie czytelne maszynowo:

| Opcja | Co Robi |
|-------|--------|
| `--json` | Wyjscie jako JSON |
| `--output <format>` | Format wyjscia: `text` lub `json` |

Mozesz tez ustawic `OH_MY_AG_OUTPUT_FORMAT=json` jako zmienna srodowiskowa.

**Wspierane przez:** `doctor`, `stats`, `retro`, `cleanup`, `auth:status`, `usage:anti`, `memory:init`, `verify`, `visualize`

## Opcje Per Komenda

### `update`
| Opcja | Co Robi |
|-------|--------|
| `-f, --force` | Nadpisz pliki konfiguracji dostosowane przez uzytkownika |
| `--ci` | Tryb nieinteraktywny (pomin wszystkie prompty) |

### `stats`
| Opcja | Co Robi |
|-------|--------|
| `--reset` | Resetuj wszystkie dane metryk |

### `retro`
| Opcja | Co Robi |
|-------|--------|
| `--interactive` | Tryb recznego wprowadzania |
| `--compare` | Porownaj biezace okno z poprzednim oknem tej samej dlugosci |

### `cleanup`
| Opcja | Co Robi |
|-------|--------|
| `--dry-run` | Pokaz co zostaloby wyczyszczone bez wykonywania |
| `-y, --yes` | Pomin prompty potwierdzenia |

### `usage:anti`
| Opcja | Co Robi |
|-------|--------|
| `--raw` | Zrzuc surowa odpowiedz RPC |

### `agent:spawn`
| Opcja | Co Robi |
|-------|--------|
| `-v, --vendor <vendor>` | Nadpisz CLI vendor (`gemini`/`claude`/`codex`/`qwen`) |
| `-w, --workspace <path>` | Katalog roboczy dla agenta |

### `agent:status`
| Opcja | Co Robi |
|-------|--------|
| `-r, --root <path>` | Sciezka glowna dla sprawdzen pamieci |

### `agent:parallel`
| Opcja | Co Robi |
|-------|--------|
| `-v, --vendor <vendor>` | Nadpisz CLI vendor |
| `-i, --inline` | Okresl zadania jako argumenty `agent:task` |
| `--no-wait` | Nie czekaj na zakonczenie (tryb tla) |

### `memory:init`
| Opcja | Co Robi |
|-------|--------|
| `--force` | Nadpisz istniejace pliki schematu |

### `verify`
| Opcja | Co Robi |
|-------|--------|
| `-w, --workspace <path>` | Sciezka workspace do zweryfikowania |

## Praktyczne Przyklady

```bash
# Wyjscie JSON dla pipeline CI
oma doctor --json

# Resetuj metryki produktywnosci
oma stats --reset

# Podglad czyszczenia bez wykonywania
oma cleanup --dry-run

# Uruchom z konkretnym CLI i workspace
oma agent:spawn backend "Auth API" session-01 -v codex -w ./apps/api

# Nieinteraktywna aktualizacja w CI
oma update --ci --force

# Porownaj ostatnie 7 dni z poprzednimi 7 dniami
oma retro 7 --compare
```
