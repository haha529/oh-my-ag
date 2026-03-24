---
title: "Przypadek Uzycia: Naprawianie Bledow"
description: Ustrukturyzowane debugowanie -- od odtworzenia problemu do napisania testow regresyjnych.
---

# Przypadek Uzycia: Naprawianie Bledow

## Zacznij od Dobrego Raportu

Im lepszy raport bledu, tym szybsza naprawa:

```text
Symptom: Login button throws TypeError
Environment: Chrome 130, macOS, production build
Steps to reproduce:
  1. Go to /login
  2. Enter valid credentials
  3. Click "Sign In"
Expected: Redirect to dashboard
Actual: White screen, console shows "Cannot read property 'map' of undefined"
Logs: [paste relevant logs]
```

## Najpierw Triaz

| Waznosc | Co Oznacza | Reakcja |
|---------|-----------|--------|
| **P0** | Utrata danych, obejscie auth, awaria produkcji | Rzuc wszystko, zaangazuj QA/bezpieczenstwo |
| **P1** | Glowny przeplyw uzytkownika zepsuty | Napraw w biezacym sprincie |
| **P2** | Pogorszony ale ma obejscie | Zaplanuj naprawe |
| **P3** | Drobny, nieblokujacy | Backlog |

## Petla Debugowania

1. **Odtworz** -- dokladnie, w minimalnym srodowisku
2. **Izoluj** -- znajdz przyczyne zrodlowa (nie tylko symptom)
3. **Napraw** -- najmniejsza bezpieczna zmiana
4. **Przetestuj** -- test regresyjny dla zepsutej sciezki
5. **Przeskanuj** -- sprawdz sasiedni kod pod katem tego samego wzorca

## Szablon Prompta

```text
Bug: Login throws "Cannot read property 'map' of undefined"
Repro: Click sign-in with valid credentials
Scope: src/components/auth/*, src/hooks/useAuth.ts
Expected: Redirect to dashboard
Need:
1) root cause analysis
2) minimal fix
3) regression tests
4) scan for similar patterns
```

## Kiedy Eskalowac

Zaangazuj QA lub bezpieczenstwo gdy blad dotyka:

- Uwierzytelniania / sesji / odswiezania tokenu
- Granic uprawnien
- Platnosci / spojnosci transakcji
- Wydajnosci pod obciazeniem

## Po Naprawie

Zweryfikuj:
- Oryginalne odtworzenie juz nie zawodzi
- Zadnych nowych bledow w powiazanych przeplywach
- Testy zawiodly przed naprawa, przechodza po niej
- Sciezka wycofania jest jasna w razie potrzeby
