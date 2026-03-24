---
title: Wykonywanie Rownolegle
description: Uruchom wielu agentow jednoczesnie -- bo czekanie az jeden skonczy przed uruchomieniem nastepnego jest wolne.
---

# Wykonywanie Rownolegle

Prawdziwa sila oh-my-agent to jednoczesne uruchamianie wielu agentow. Podczas gdy agent backendowy buduje Twoje API, agent frontendowy juz tworzy UI.

## Podstawowy Wzorzec

```bash
oma agent:spawn backend "Implement auth API" session-01 &
oma agent:spawn frontend "Create login form" session-01 &
wait
```

`&` uruchamia kazdego agenta w tle. `wait` blokuje az oba sie ukoncza.

## Wzorzec z Workspace

Daj kazdemu agentowi wlasny katalog aby uniknac konfliktow merge:

```bash
oma agent:spawn backend "Auth + DB migration" session-02 -w ./apps/api
oma agent:spawn frontend "Login + token refresh" session-02 -w ./apps/web
oma agent:spawn mobile "Auth screens" session-02 -w ./apps/mobile
```

## Uzywanie `agent:parallel`

Dla czystszej skladni:

```bash
oma agent:parallel -i backend:"Implement auth API" frontend:"Build login form" mobile:"Auth screens"
```

Dodaj `--no-wait` aby uruchomic i zapomniec:

```bash
oma agent:parallel -i backend:"task" frontend:"task" --no-wait
```

## Monitoruj Podczas Pracy

Otworz oddzielny terminal:

```bash
# Dashboard w terminalu
oma dashboard

# Lub dashboard webowy
oma dashboard:web
# → http://localhost:9847
```

Dashboard pokazuje status na zywo kazdego agenta -- wykonane tury, biezace zadanie, stan ukonczenia.

## Konfiguracja Multi-CLI

Nie wszystkie narzedzia AI sa rowne. Kieruj agentow do CLI ktore najlepiej radzi sobie z ich domena:

```yaml
# .agents/config/user-preferences.yaml
default_cli: gemini

agent_cli_mapping:
  frontend: claude      # Zlzone rozumowanie UI
  backend: gemini       # Szybkie generowanie API
  mobile: gemini
  qa: claude            # Dokladny przeglad bezpieczenstwa
  debug: claude         # Gleboka analiza przyczyn zrodlowych
  pm: gemini            # Szybka dekompozycja
```

## Rozwiazywanie CLI Vendor

Przy uruchamianiu agenta CLI jest wybierane w tej kolejnosci:

1. Flaga `--vendor` (najwyzszy priorytet)
2. `agent_cli_mapping` dla tego konkretnego agenta
3. Ustawienie `default_cli`
4. `active_vendor` z `cli-config.yaml`
5. `gemini` (domyslny)

## Wskazowki do Rownolegnych Uruchomien

- **Uzywaj jednego session ID na feature** -- grupuje wyniki agentow
- **Zablokuj kontrakty API najpierw** -- uruchom `/plan` przed uruchomieniem agentow implementacyjnych
- **Oddzielne workspace** -- unikaj sytuacji gdy agenci nadpisuja swoje pliki nawzajem
- **Monitoruj aktywnie** -- wychwytuj problemy wczesnie przez dashboard zamiast znajdowac je przy merge
