---
title: Automatyczne Aktualizacje
description: Utrzymuj umiejetnosci oh-my-agent aktualne dzieki GitHub Action ktora otwiera PR gdy wychodza nowe wersje.
---

# Automatyczne Aktualizacje z GitHub Action

Skonfiguruj raz, zapomnij. GitHub Action sprawdza nowe wersje oh-my-agent i otwiera PR gdy aktualizacje sa dostepne.

## Szybka Konfiguracja

Dodaj to do swojego repozytorium:

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1"   # Kazdy poniedzialek o 09:00 UTC
  workflow_dispatch:        # Lub uruchom recznie

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

To wszystko. Dostaniesz PR za kazdym razem gdy umiejetnosci zostana zaktualizowane.

## Wejscia Action

| Wejscie | Co Robi | Domyslne |
|---------|--------|---------|
| `mode` | `pr` otwiera PR, `commit` pushuje bezposrednio | `pr` |
| `base-branch` | Branch docelowy | `main` |
| `force` | Nadpisz niestandardowe pliki konfiguracji | `false` |
| `pr-title` | Niestandardowy tytul PR | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Etykiety PR oddzielone przecinkiem | `dependencies,automated` |
| `commit-message` | Niestandardowa wiadomosc commita | `chore(deps): update oh-my-agent skills` |
| `token` | Token GitHub | `${{ github.token }}` |

## Wyjscia Action

| Wyjscie | Co Zawiera |
|---------|-----------|
| `updated` | `true` jesli wykryto zmiany |
| `version` | Wersja oh-my-agent po aktualizacji |
| `pr-number` | Numer PR (tylko tryb pr) |
| `pr-url` | URL PR (tylko tryb pr) |

## Przyklady

### Pomin PR, Commituj Bezposrednio

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Z Osobistym Tokenem Dostepu

Dla repozytoriow fork gdzie `GITHUB_TOKEN` nie ma dostepu do zapisu:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Powiadomienie przy Aktualizacji

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
      - run: echo "Updated to ${{ needs.update.outputs.version }}"
```

## Jak To Dziala Pod Maska

1. Instaluje CLI `oh-my-agent` przez Bun
2. Uruchamia `oma update --ci` (nieinteraktywnie)
3. Wykrywa zmiany w `.agents/` i `.claude/`
4. Tworzy PR lub commit w zaleznosci od `mode`
