---
title: Workflow
description: Komendy slash orkiestrujace wieloetapowe procesy -- planowanie, przeglad, debugowanie i wiecej.
---

# Workflow

Workflow to ustrukturyzowane sekwencje, ktore czynia oh-my-agent czyms wiecej niz kolekcja promptow. Wpisz komende slash, a wieloetapowy proces sie uruchomi z okreslonymi fazami, bramkami jakosci i kryteriami ukonczenia.

## Wszystkie Komendy Workflow

### Duze Workflow Orkiestracji

Te sa **trwale** -- dzialaja dopoki wszystkie zadania nie zostana ukonczone i nie moga byc przypadkowo przerwane.

| Komenda | Co Robi |
|---------|--------|
| `/orchestrate` | Uruchamia agentow rownolegle przez CLI, koordynuje przez pamiec, monitoruje postep, uruchamia weryfikacje. Tryb "zrob wszystko". |
| `/coordinate` | Koordynacja wielodomenowa krok po kroku. PM planuje pierwszy, potem agenci wykonuja z wzajemnym przegladem i petlami QA. |
| `/ultrawork` | Workflow obsesyjnie dbajacy o jakosc. 5 faz, 11 krokow przegladu z 17 calkowitych. Planuj → Implementuj → Weryfikuj → Udoskonalaj → Wyslij. |

### Planowanie i Eksploracja

| Komenda | Co Robi |
|---------|--------|
| `/plan` | Dekompozycja zadan przez PM. Generuje ustrukturyzowany plan do `.agents/plan.json`. |
| `/exec-plan` | Bierze plan z `/plan` i wykonuje go krok po kroku. |
| `/brainstorm` | Swobodne generowanie pomyslow. Eksploruj podejscia przed zaangazowaniem w implementacje. |
| `/deepinit` | Pelna inicjalizacja projektu -- analizuje codebase, ustawia konwencje, konfiguruje narzedzia. |

### Jakosc i Przeglad

| Komenda | Co Robi |
|---------|--------|
| `/review` | Przeglad QA: bezpieczenstwo OWASP, wydajnosc, dostepnosc. Deleguje do agenta qa-reviewer. |
| `/debug` | Ustrukturyzowane debugowanie: odtworz → zdiagnozuj → napraw → test regresyjny. |

### Design

| Komenda | Co Robi |
|---------|--------|
| `/design` | 7-fazowy workflow designu. Tworzy DESIGN.md z tokenami, wzorcami komponentow, regulami dostepnosci i specyfikacjami przekazania. |

### Narzedzia

| Komenda | Co Robi |
|---------|--------|
| `/commit` | Analizuje Twoje zmiany i tworzy conventional commit z odpowiednim type/scope. |
| `/setup` | Interaktywna konfiguracja projektu. |
| `/tools` | Zarzadzanie polaczeniami serwerow MCP. |
| `/stack-set` | Ustawianie preferencji tech stack. |

## Nie Zawsze Potrzebujesz Komend Slash

oh-my-agent wykrywa slowa kluczowe w Twoim naturalnym jezyku i automatycznie aktywuje workflow. Powiedz "zaplanuj funkcje uwierzytelniania" a workflow planowania sie uruchomi -- bez `/plan`.

To dziala w **11 jezykach** (angielski, koreanki, japonski, chinski, hiszpanski, francuski, niemiecki, portugalski, rosyjski, holenderski, polski).

Pytania takie jak "co to jest orchestrate?" sa rozpoznawane jako informacyjne i niczego nie uruchamiaja.

## Skills vs. Workflows

Proste rozroznienie:
- **Skills** = ekspertyza agenta (co agent potrafi robic)
- **Workflows** = zorkiestrowane procesy (jak wielu agentow pracuje razem)

Umiejetnosc moze byc "zbuduj komponent React." Workflow to "zaplanuj feature → zbuduj komponenty → sprawdz bezpieczenstwo → zacommituj kod."

## Typowe Sekwencje

### Szybka Funkcjonalnosc
```
/plan → przejrzyj wynik → /exec-plan
```

### Zlozony Projekt Wielodomenowy
```
/coordinate → PM planuje → agenci sie uruchamiaja → QA przegląda → napraw problemy → wyslij
```

### Dostawa Maksymalnej Jakosci
```
/ultrawork → 5-fazowy proces z 11 punktami kontrolnymi przegladu
```

### Naprawa Bledu
```
/debug → odtworz → przyczyna zrodlowa → napraw → test regresyjny
```
