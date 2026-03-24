---
title: Centralny Rejestr
description: Uzyj oh-my-agent jako wersjonowanego rejestru aby utrzymac wiele projektow zsynchronizowanych.
---

# Centralny Rejestr dla Konfiguracji Multi-Repo

Masz wiele projektow uzywajacych oh-my-agent? Mozesz traktowac to repozytorium jako **centralny rejestr** -- wersjonuj swoje umiejetnosci, a wszystkie projekty konsumenckie zostana zsynchronizowane.

## Jak To Dziala

```text
┌─────────────────────────────────────────────────────────┐
│  Centralny Rejestr (repozytorium oh-my-agent)           │
│  • release-please do automatycznego wersjonowania       │
│  • Automatyczne generowanie CHANGELOG.md                │
│  • prompt-manifest.json (wersje + sumy kontrolne)       │
│  • agent-skills.tar.gz artefakt wydania                 │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  Twoj Projekt                                           │
│  • .agent-registry.yml przypina wersje                  │
│  • GitHub Action wykrywa nowe wersje → otwiera PR       │
│  • Przejrzyj i zmerguj aby zaktualizowac               │
└─────────────────────────────────────────────────────────┘
```

## Dla Opiekunow Rejestru

Wydania sa zautomatyzowane przez [release-please](https://github.com/googleapis/release-please):

1. Uzywaj Conventional Commits (`feat:`, `fix:`, `chore:`)
2. Push do `main` → Release PR jest tworzony/aktualizowany
3. Merge Release PR → GitHub Release opublikowany z:
   - `CHANGELOG.md`
   - `prompt-manifest.json` (lista plikow + sumy kontrolne SHA256)
   - `agent-skills.tar.gz` (skompresowany `.agents/`)

## Dla Projektow Konsumenckich

Skopiuj szablony do swojego projektu:

```bash
cp docs/consumer-templates/.agent-registry.yml your-project/
cp docs/consumer-templates/check-registry-updates.yml your-project/.github/workflows/
cp docs/consumer-templates/sync-agent-registry.yml your-project/.github/workflows/
```

Przypnij wersje:

```yaml
# .agent-registry.yml
registry:
  repo: first-fluke/oh-my-agent
  version: "4.7.0"
```

Workflow:
- `check-registry-updates.yml` -- Sprawdza nowe wersje, otwiera PR
- `sync-agent-registry.yml` -- Synchronizuje `.agents/` gdy aktualizujesz przypieta wersje

**Automatyczny merge jest celowo wylaczony.** Wszystkie aktualizacje przechodzą ludzki przeglad.

## Centralny Rejestr vs. GitHub Action

| | GitHub Action | Centralny Rejestr |
|:--|:--:|:--:|
| Naklad konfiguracji | 1 plik workflow | 3 pliki |
| Metoda aktualizacji | `oma update` CLI | Pobieranie tarball |
| Kontrola wersji | Zawsze najnowsza | Jawne przypinanie |
| Najlepszy dla | Wiekszosci projektow | Scisla kontrola wersji |

Wiekszosc zespolow powinna uzywac podejscia [GitHub Action](./automated-updates). Uzyj Centralnego Rejestru jesli potrzebujesz scislego przypinania wersji lub nie mozesz uzywac zewnetrznych actions.
