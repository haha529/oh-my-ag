---
title: Agenci
description: Jak dzialaja agenci -- role, kategorie, charter preflight i przeplyw orkiestracji.
---

# Agenci

Agenci w oh-my-agent to nie generyczne chatboty. Kazdy jest wzorowany na konkretnej roli w zespole inzynierskim z okreslonym zakresem, narzedziami i standardami jakosci.

## Kategorie Agentow

Mysl o nich jak o swojej organizacji inzynierskiej:

| Kategoria | Agenci | Czym Sie Zajmuja |
|-----------|--------|-----------------|
| **Generowanie pomyslow** | oma-brainstorm | Eksplorowanie pomyslow przed pisaniem kodu |
| **Planowanie** | oma-pm | Wymagania, dekompozycja zadan, kontrakty API |
| **Implementacja** | oma-frontend, oma-backend, oma-mobile, oma-db | Faktyczne kodowanie |
| **Design** | oma-design | Design systems, tokeny, wzorce UI/UX |
| **Infrastruktura** | oma-tf-infra | Wdrazanie chmury z Terraform |
| **DevOps** | oma-dev-workflow | CI/CD, migracje, wydania |
| **Jakosc** | oma-qa, oma-debug | Przeglady, audyty bezpieczenstwa, naprawy bledow |
| **Lokalizacja** | oma-translator | Naturalne wielojezyczne tlumaczenie |
| **Koordynacja** | oma-orchestrator, oma-coordination | Uruchamianie i synchronizacja agentow |
| **Git** | oma-commit | Czyste conventional commits |

## Jak Agenci Wykonuja Prace

Kazdy agent podaza ta sama dyscyplina:

### 1. Charter Preflight

Przed napisaniem kodu agenci emituja `CHARTER_CHECK` deklarujac:
- W jakiej dziedzinie pracuja
- Jakie ograniczenia obowiazuja
- Jakie zalozenia przyjmuja
- Jak wyglada "gotowe"

To wychwytuje rozszerzanie zakresu i nieporozumienia na wczesnym etapie.

### 2. Dwuwarstwowe Ladowanie

Agenci sa efektywni tokenowo z zalozenia:
- **Warstwa 1** (`SKILL.md`, ~800 bajtow): Tozsamosc i reguly routingu -- zawsze ladowana
- **Warstwa 2** (`resources/`): Protokoly wykonywania, poradniki bledow, szablony kodu -- ladowane tylko w razie potrzeby

Oszczedza to ~75% tokenow w porownaniu z ladowaniem wszystkiego z gory.

### 3. Wykonywanie w Zakresie

Agent frontendowy nie rusza kodu backendowego. Agent DB nie modyfikuje komponentow UI. Kazdy agent zostaje na swoim torze.

### 4. Bramka Jakosci

Kazdy agent ma liste kontrolna specyficzna dla domeny. Praca nie jest "gotowa" dopoki lista nie zostanie zaliczona.

## Strategia Workspace

Dla projektow wieloagentowych, oddzielne workspace zmniejszaja konflikty merge:

```text
./apps/api      → workspace agenta backendowego
./apps/web      → workspace agenta frontendowego
./apps/mobile   → workspace agenta mobilnego
```

## Przeplyw Orkiestracji

Gdy uruchamiasz wieloagentowy workflow:

1. **Agent PM** rozklada zadanie na podzadania specyficzne dla domeny
2. **Agenci domenowi** wykonuja rownolegle, kazdy w swoim workspace
3. **Postep** jest przesylany do pamieci Serena (`.serena/memories/`)
4. **Agent QA** waliduje spojnosc miedzy domenami
5. **Wyniki** sa zbierane i gotowe do merge

## Stan Uruchomieniowy (Pamiec Serena)

Agenci koordynuja sie przez wspoldzielone pliki pamieci:

| Plik | Przeznaczenie |
|------|-------------|
| `orchestrator-session.md` | Stan biezacej sesji |
| `task-board.md` | Przypisania zadan i status |
| `progress-{agent}.md` | Aktualizacje postepu per agent |
| `result-{agent}.md` | Koncowe wyniki agentow |

Te pliki znajduja sie w `.serena/memories/` i sa monitorowane przez dashboardy.
