---
title: Przewodnik Uzycia
description: Praktyczne przyklady pokazujace jak uzywac oh-my-agent -- od prostych zadan do pelnej wieloagentowej orkiestracji.
---

# Jak Uzywac oh-my-agent

> Nie wiesz od czego zaczac? Wpisz `/coordinate` i opisz co chcesz zbudowac.

## Szybki Start

1. Otworz projekt w IDE z AI (Claude Code, Gemini, Cursor itd.)
2. Umiejetnosci sa automatycznie wykrywane z `.agents/skills/`
3. Zacznij rozmawiac -- opisz czego chcesz

To wszystko. oh-my-agent zajmie sie reszta.

---

## Przyklad 1: Proste Pojedyncze Zadanie

**Wpisujesz:**
```
"Stworz komponent formularza logowania z polami email i hasla uzywajac Tailwind CSS"
```

**Co sie dzieje:**
- Umiejetnosc `oma-frontend` sie aktywuje
- Laduje swoj protokol wykonywania i zasoby tech-stack na zadanie
- Dostajesz komponent React z TypeScript, Tailwind, walidacja formularza i testami

Nie potrzeba komend slash. Po prostu opisz czego chcesz.

## Przyklad 2: Projekt Wielodomenowy

**Wpisujesz:**
```
"Zbuduj aplikacje TODO z uwierzytelnianiem uzytkownikow"
```

**Co sie dzieje:**

1. Wykrywanie slow kluczowych widzi wielodomenowe zadanie → sugeruje `/coordinate`
2. **Agent PM** planuje prace: API auth, schemat bazy, frontend UI, zakres QA
3. **Uruchamiasz agentow:**
   ```bash
   oma agent:spawn backend "JWT authentication API" session-01 -w ./apps/api &
   oma agent:spawn frontend "Login and TODO UI" session-01 -w ./apps/web &
   wait
   ```
4. **Agenci pracuja rownolegle** -- kazdy w swoim workspace
5. **Agent QA przegląda** -- audyt bezpieczenstwa, sprawdzenie integracji
6. **Iterujesz** -- ponownie uruchom agentow z udoskonaleniami jesli potrzeba

## Przyklad 3: Naprawa Bledu

**Wpisujesz:**
```
"Jest blad -- klikniecie logowania pokazuje 'Cannot read property map of undefined'"
```

**Co sie dzieje:**

1. `oma-debug` aktywuje sie automatycznie (slowo kluczowe: "blad")
2. Przyczyna zrodlowa zidentyfikowana -- komponent mapuje `todos` przed zaladowaniem danych
3. Poprawka zastosowana -- stany ladowania i sprawdzenia null
4. Napisany test regresyjny
5. Podobne wzorce znalezione i proaktywnie naprawione w 3 innych komponentach

## Przyklad 4: Design System

**Wpisujesz:**
```
"Zaprojektuj ciemna premium landing page dla mojego produktu SaaS"
```

**Co sie dzieje:**

1. `oma-design` aktywuje (slowo kluczowe: "zaprojektuj", "landing page")
2. Zbiera kontekst -- publicznosc, marka, kierunek estetyczny
3. Proponuje 2-3 kierunki designu z opcjami kolorow, typografii i ukladu
4. Generuje `DESIGN.md` z tokenami, wzorcami komponentow i regulami dostepnosci
5. Przeprowadza audyt -- responsywnosc, WCAG, heurystyki Nielsena
6. Gotowy do implementacji przez `oma-frontend`

## Przyklad 5: Rownolegla Realizacja przez CLI

```bash
# Pojedynczy agent
oma agent:spawn backend "Implement JWT auth API" session-01

# Wielu agentow rownolegle
oma agent:spawn backend "Auth API + DB migration" session-01 -w ./apps/api &
oma agent:spawn frontend "Login form + error states" session-01 -w ./apps/web &
oma agent:spawn mobile "Auth screens + biometrics" session-01 -w ./apps/mobile &
wait

# Monitorowanie w czasie rzeczywistym
oma dashboard        # UI terminala
oma dashboard:web    # web UI na http://localhost:9847
```

---

## Komendy Workflow

Wpisz je w swoim IDE AI aby uruchomic ustrukturyzowane procesy:

| Komenda | Co Robi | Kiedy Uzywac |
|---------|--------|-------------|
| `/brainstorm` | Swobodne generowanie pomyslow | Przed wyborem podejscia |
| `/plan` | Dekompozycja zadan PM → `.agents/plan.json` | Przed kazda zlożona funkcjonalnoscia |
| `/exec-plan` | Wykonaj istniejacy plan krok po kroku | Po `/plan` |
| `/coordinate` | Koordynacja wielodomenowa krok po kroku | Funkcjonalnosci obejmujace wielu agentow |
| `/orchestrate` | Automatyczne rownolegle wykonywanie agentow | Duze projekty, maksymalny paralelizm |
| `/ultrawork` | 5-fazowy workflow jakosci (11 bramek przegladu) | Dostawa maksymalnej jakosci |
| `/review` | Audyt bezpieczenstwa + wydajnosci + dostepnosci | Przed mergem |
| `/debug` | Ustrukturyzowane debugowanie przyczyny zrodlowej | Badanie bledow |
| `/design` | 7-fazowy workflow designu → `DESIGN.md` | Budowanie design systems |
| `/commit` | Conventional commit z analiza type/scope | Commitowanie zmian |
| `/setup` | Konfiguracja projektu | Pierwsza konfiguracja |
| `/tools` | Zarzadzanie serwerami MCP | Dodawanie zewnetrznych narzedzi |
| `/stack-set` | Konfiguracja tech stack | Ustawianie preferencji jezyka/frameworka |
| `/deepinit` | Pelna inicjalizacja projektu | Konfiguracja w istniejacym codebase |

---

## Automatyczne Wykrywanie (Bez Komend Slash)

oh-my-agent wykrywa slowa kluczowe w 11 jezykach i automatycznie aktywuje workflow:

| Mowisz | Workflow Ktory Sie Aktywuje |
|--------|---------------------------|
| "plan the auth feature" | `/plan` |
| "버그 수정해줘" | `/debug` |
| "do everything in parallel" | `/orchestrate` |
| "レビューして" | `/review` |
| "diseña la página" | `/design` |
| "brainstorm some ideas" | `/brainstorm` |

Pytania takie jak "what is orchestrate?" sa filtrowane -- nie uruchomia workflow przypadkowo.

---

## Dostepne Umiejetnosci

| Umiejetnosc | Najlepsza Do | Wynik |
|------------|-------------|-------|
| oma-pm | "zaplanuj to", "rozloz" | `.agents/plan.json` |
| oma-frontend | UI, komponenty, stylizacja | Komponenty React, testy |
| oma-backend | API, bazy danych, auth | Endpointy, modele, testy |
| oma-db | Schemat, ERD, migracje | Projekt schematu, optymalizacja zapytan |
| oma-mobile | Aplikacje mobilne | Ekrany Flutter, zarzadzanie stanem |
| oma-design | UI/UX, design systems | `DESIGN.md` z tokenami |
| oma-brainstorm | Generowanie pomyslow, eksploracja | Dokument projektowy |
| oma-qa | Bezpieczenstwo, wydajnosc, a11y | Raport QA z priorytetowymi poprawkami |
| oma-debug | Bledy, awarie, crashe | Naprawiony kod + testy regresyjne |
| oma-tf-infra | Infrastruktura chmurowa | Moduly Terraform |
| oma-dev-workflow | CI/CD, automatyzacja | Konfiguracje pipelinow |
| oma-translator | Tlumaczenie | Naturalny wielojezyczny content |
| oma-orchestrator | Rownolegle wykonywanie | Wyniki agentow |
| oma-commit | Commity Git | Conventional commits |

---

## Dashboardy

### Dashboard Terminala

```bash
oma dashboard
```

Zywa tabela pokazujaca status sesji, stany agentow, tury i ostatnia aktywnosc. Monitoruje `.serena/memories/` dla aktualizacji w czasie rzeczywistym.

### Dashboard Webowy

```bash
oma dashboard:web
# → http://localhost:9847
```

Funkcje:
- Aktualizacje w czasie rzeczywistym przez WebSocket
- Automatyczne ponowne laczenie przy zerwaniu polaczenia
- Status sesji z kolorowymi wskaznikami agentow
- Log aktywnosci z plikow postepu i wynikow

### Zalecany Uklad

Uzywaj 3 terminali:
1. Dashboard (`oma dashboard`)
2. Komendy uruchamiania agentow
3. Logi testow/budowania

---

## Wskazowki

1. **Badz konkretny** -- "Zbuduj aplikacje TODO z JWT auth, frontend React, backend Express" jest lepsze niz "zrob aplikacje"
2. **Uzywaj workspace** -- `-w ./apps/api` zapobiega nadpisywaniu plikow miedzy agentami
3. **Zablokuj kontrakty najpierw** -- uruchom `/plan` przed rownoleglymi agentami
4. **Monitoruj aktywnie** -- dashboardy wychwytuja problemy przed mergem
5. **Iteruj z ponownym uruchomieniem** -- udoskonalaj prompty agentow zamiast zaczynac od nowa
6. **Zacznij od `/coordinate`** -- gdy nie wiesz ktory workflow wybrac

---

## Rozwiazywanie Problemow

| Problem | Rozwiazanie |
|---------|-----------|
| Umiejetnosci nie wykryte w IDE | Sprawdz czy `.agents/skills/` istnieje z plikami `SKILL.md`, zrestartuj IDE |
| CLI nie znaleziony | `which gemini` / `which claude` -- zainstaluj brakujace |
| Agenci produkuja kolidujacy kod | Uzywaj oddzielnych workspace (`-w`), przegladaj wyniki, uruchom ponownie z poprawkami |
| Dashboard pokazuje "No agents detected" | Agenci jeszcze nie zapisali do `.serena/memories/` -- poczekaj lub sprawdz session ID |
| Dashboard webowy nie startuje | Najpierw uruchom `bun install` |
| Raport QA ma 50+ problemow | Skupi sie na CRITICAL/HIGH najpierw, reszta na pozniej |

---

Dla integracji w istniejace projekty, zobacz [Przewodnik Integracji](./integration).
