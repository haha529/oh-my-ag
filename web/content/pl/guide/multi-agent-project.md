---
title: "Przypadek Uzycia: Projekt Wieloagentowy"
description: Jak koordynowac wielu agentow dla funkcjonalnosci obejmujacych frontend, backend, baze danych i QA.
---

# Przypadek Uzycia: Projekt Wieloagentowy

## Kiedy Tego Uzywac

Twoja funkcjonalnosc obejmuje wiele domen -- backend API + frontend UI + schemat bazy danych + przeglad QA. Jeden agent nie poradzi sobie ze wszystkim, a chcesz zeby pracowali rownolegle.

## Sekwencja Koordynacji

```text
/plan → /coordinate → agent:spawn (parallel) → /review → merge
```

1. **`/plan`** -- Agent PM rozklada funkcjonalnosc na zadania per domena
2. **`/coordinate`** -- Ustala kolejnosc wykonywania i wlasnosc
3. **`agent:spawn`** -- Agenci wykonuja rownolegle
4. **`/review`** -- QA przegąda spojnosc miedzydomenowa

## Strategia Sesji

Uzywaj jednego session ID na funkcjonalnosc:

```text
session-auth-v2
```

Przydzielaj workspace per domena:

| Agent | Workspace |
|-------|-----------|
| backend | `./apps/api` |
| frontend | `./apps/web` |
| mobile | `./apps/mobile` |

## Przyklad Uruchomienia

```bash
oma agent:spawn backend "Implement JWT auth API + refresh flow" session-auth-v2 -w ./apps/api &
oma agent:spawn frontend "Build login + refresh UX with error states" session-auth-v2 -w ./apps/web &
oma agent:spawn qa "Review auth risks, test matrix, and regression scope" session-auth-v2 &
wait
```

## Zasada Kontrakt Najpierw

Zanim agenci zaczna kodowac rownolegle, **zablokuj kontrakty API**:

- Schematy request/response
- Kody i komunikaty bledow
- Zalozenia cyklu zycia auth/sesji

Jesli kontrakty zmienia sie w trakcie, wstrzymaj agentow downstream i ponownie wydaj ich prompty z aktualnymi kontraktami.

## Bramki Merge

Nie merguj dopoki:

1. Testy na poziomie domeny przejda
2. Punkty integracji odpowiadaja uzgodnionym kontraktom
3. Problemy QA high/critical sa rozwiazane (lub wyraznie odrzucone)
4. Changelog zaktualizowany jesli zmienilo sie zewnetrznie widoczne zachowanie

## Czego NIE Robic

- Wspoldzielenie jednego workspace miedzy wszystkimi agentami (koszmar konfliktow merge)
- Zmiana kontraktow bez informowania innych agentow
- Mergowanie backendu i frontendu niezaleznie przed sprawdzeniem kompatybilnosci

## Kiedy Jest Gotowe

- Wszystkie zaplanowane zadania ukonczone we wszystkich domenach
- Integracja miedzydomenowa zwalidowana
- Zatwierdzenie QA zarejestrowane
