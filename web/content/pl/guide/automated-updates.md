---
title: Automatyczne aktualizacje za pomocą GitHub Action
description: Utrzymuj umiejętności oh-my-agent w aktualnej wersji automatycznie dzięki oficjalnej GitHub Action.
---

# Automatyczne aktualizacje za pomocą GitHub Action

**oh-my-agent update action** uruchamia `oma update` według harmonogramu i tworzy PR (lub commituje bezpośrednio), gdy dostępne są nowe wersje umiejętności.

## Szybki start

Dodaj ten workflow do dowolnego repozytorium używającego oh-my-agent:

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1" # Every Monday at 09:00 UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: first-fluke/oh-my-agent/action@v1
```

Sprawdza dostępność aktualizacji co tydzień i otwiera PR, jeśli zostaną wykryte zmiany.

## Dokumentacja akcji

Akcja jest dostępna pod adresem:

- **Ścieżka w monorepo**: `first-fluke/oh-my-agent/action@v1`
- **Marketplace**: [`first-fluke/oma-update-action@v1`](https://github.com/marketplace/actions/oh-my-agent-update)

### Parametry wejściowe

| Parametr | Opis | Domyślna wartość |
|:------|:-----------|:--------|
| `mode` | `pr` tworzy pull request, `commit` commituje bezpośrednio | `pr` |
| `base-branch` | Gałąź bazowa dla PR lub bezpośredniego commita | `main` |
| `force` | Nadpisuje pliki konfiguracji użytkownika (`--force`) | `false` |
| `pr-title` | Niestandardowy tytuł PR | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Etykiety PR oddzielone przecinkami | `dependencies,automated` |
| `commit-message` | Niestandardowa wiadomość commita | `chore(deps): update oh-my-agent skills` |
| `token` | Token GitHub do tworzenia PR | `${{ github.token }}` |

### Parametry wyjściowe

| Parametr | Opis |
|:-------|:-----------|
| `updated` | `true`, jeśli wykryto zmiany |
| `version` | Wersja oh-my-agent po aktualizacji |
| `pr-number` | Numer PR (tylko w trybie `pr`) |
| `pr-url` | URL PR (tylko w trybie `pr`) |

## Przykłady

### Tryb bezpośredniego commita

Pomiń PR i wypchnij zmiany bezpośrednio do gałęzi bazowej:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Z Personal Access Token

Wymagane dla forków, w których `GITHUB_TOKEN` nie ma uprawnień do zapisu:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Warunkowe powiadomienie

Uruchom kolejny krok tylko wtedy, gdy aktualizacja została zastosowana:

```yaml
jobs:
  update:
    runs-on: ubuntu-latest
    outputs:
      updated: ${{ steps.oma.outputs.updated }}
    steps:
      - uses: actions/checkout@v6
      - uses: first-fluke/oh-my-agent/action@v1
        id: oma

  notify:
    needs: update
    if: needs.update.outputs.updated == 'true'
    runs-on: ubuntu-latest
    steps:
      - run: echo "oh-my-agent was updated to ${{ needs.update.outputs.version }}"
```

## Jak to działa

1. Instaluje CLI `oh-my-agent` przez Bun
2. Uruchamia `oma update --ci` (tryb nieinteraktywny, bez monitów)
3. Wykrywa zmiany w katalogach `.agents/` i `.claude/`
4. Tworzy PR lub commituje bezpośrednio w zależności od parametru `mode`

## Porównanie z centralnym rejestrem

| | GitHub Action | Centralny rejestr |
|:--|:--:|:--:|
| Konfiguracja | 1 plik workflow | 3 pliki (config + 2 workflows) |
| Metoda aktualizacji | CLI `oma update` | Pobranie tarballa + ręczna synchronizacja |
| Dostosowywanie | Parametry akcji | `.agent-registry.yml` |
| Przypinanie wersji | Zawsze najnowsza | Jawne przypięcie wersji |

Używaj **GitHub Action** w większości projektów. Wybierz podejście z **centralnym rejestrem**, jeśli potrzebujesz ścisłego przypinania wersji lub nie możesz korzystać z akcji zewnętrznych.
