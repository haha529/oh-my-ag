---
title: "Przypadek Uzycia: Pojedyncza Umiejetnosc"
description: Gdy potrzebujesz tylko jednego agenta do skoncentrowanego zadania -- szybka sciezka.
---

# Przypadek Uzycia: Pojedyncza Umiejetnosc

## Kiedy Tego Uzywac

Uzywaj gdy zadanie ma waski zakres i nalezy do jednej domeny:

- Jeden komponent UI
- Jeden endpoint API
- Jeden blad w jednej warstwie
- Jeden refaktoring w jednym module

Jesli zadanie wymaga koordynacji miedzydomenowej (API + UI + QA), przejdz do [Projekt Wieloagentowy](./multi-agent-project).

## Zanim Zrobisz Prompt

Szybka lista kontrolna:

1. **Jaki jest wynik?** -- konkretny plik lub zachowanie
2. **Jaki stack?** -- framework, jezyk, wersje
3. **Co to jest "gotowe"?** -- kryteria akceptacji
4. **Jakie testy?** -- krytyczne przypadki do pokrycia

## Szablon Prompta

```text
Build <specific artifact> using <stack>.
Constraints: <style/perf/security constraints>.
Acceptance criteria:
1) ...
2) ...
Add tests for: <critical cases>.
```

## Prawdziwy Przyklad

```text
Create a login form component in React + TypeScript + Tailwind CSS.
Constraints: accessible labels, client-side validation, no external form library.
Acceptance criteria:
1) email and password validation messages
2) disabled submit while invalid
3) keyboard and screen-reader friendly
Add unit tests for valid/invalid submit paths.
```

## Co Sie Dzieje

1. Odpowiednia umiejetnosc aktywuje sie automatycznie na podstawie prompta
2. Agent deklaruje swoje zalozenia (charter preflight)
3. Potwierdzasz lub korygjesz
4. Agent pisze kod i testy
5. Uruchamiasz lokalna weryfikacje

## Przed Mergem

Sprawdz ze:
- Zachowanie odpowiada Twoim kryteriom akceptacji
- Testy pokrywaja szczesliwa sciezke i kluczowe przypadki brzegowe
- Zadne niezwiazane zmiany plikow sie nie wkradly
- Wspoldzielone moduly nie sa zepsute

## Kiedy Eskalowac

Przejdz do wieloagentowego przeplywu gdy:
- Praca UI wymaga nowego kontraktu API
- Jedna poprawka kaskaduje przez warstwy
- Zakres rosnie poza jedna domene po pierwszej iteracji
