---
title: Monitorowanie Dashboardem
description: Obserwuj swoich agentow pracujacych w czasie rzeczywistym za pomoca dashboardow terminala i przegladarki.
---

# Monitorowanie Dashboardem

Gdy masz wielu agentow dzialajacych rownolegle, chcesz widziec co sie dzieje. Do tego sluza dashboardy.

## Uruchom Dashboard

```bash
# UI Terminala
oma dashboard

# UI Webowe
oma dashboard:web
# → http://localhost:9847
```

## Zalecana Konfiguracja

Uzywaj 3 terminali obok siebie:

| Terminal | Przeznaczenie |
|---------|-------------|
| 1 | `oma dashboard` -- status agentow na zywo |
| 2 | Komendy uruchamiania agentow |
| 3 | Logi testow i budowania |

Trzymaj dashboard webowy otwarty w przegladarce dla wspolnej widocznosci podczas sesji zespolowych.

## Co Widzisz

Dashboardy monitoruja `.serena/memories/` i pokazuja:

- **Status sesji** -- dziala, ukonczona lub zepsuta
- **Tablica zadan** -- ktory agent ma ktore zadanie
- **Postep agentow** -- licznik tur, biezaca aktywnosc
- **Wyniki** -- koncowe dane wyjsciowe w miare ich pojawiania sie

Aktualizacje sa sterowane zdarzeniami (wykrywanie zmian plikow) -- zadnych petli odpytywania zjadajacych CPU.

## Sygnaly Rozwiazywania Problemow

| Widzisz | Co Robic |
|---------|---------|
| "No agents detected" | Sprawdz czy agenci zostali uruchomieni z tym samym `session-id`. Zweryfikuj czy `.serena/memories/` jest zapisywany. |
| Sesja zablokowana na "running" | Sprawdz sygnatury czasowe plikow `progress-*`. Uruchom ponownie zablokowanych agentow z jaśniejszymi promptami. |
| Czeste ponowne laczenia (web) | Sprawdz firewall/proxy. Uruchom ponownie `dashboard:web` i odswiez strone. |
| Brak aktywnosci | Zweryfikuj czy orkiestrator pisze do prawidlowego katalogu workspace. |

## Przed Mergem

Szybka lista kontrolna z dashboardu:

- Wszyscy agenci osiagneli status "completed"
- Brak nierozwiazanych ustalen QA o wysokiej wadze
- Pliki wynikowe obecne dla kazdego agenta
- Testy integracyjne uruchomione po koncowych wynikach

## Kiedy Skonczysz

Faza monitorowania jest kompletna gdy:
- Sesja pokazuje stan koncowy (completed lub stopped)
- Historia aktywnosci wyjasnia co sie stalo
- Podjales decyzje o merge/wydaniu z pelna widocznoscia
