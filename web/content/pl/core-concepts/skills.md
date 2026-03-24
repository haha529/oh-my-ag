---
title: Umiejetnosci (Skills)
description: Jak dwuwarstwowa architektura umiejetnosci utrzymuje agentow inteligentnymi bez marnowania tokenow.
---

# Umiejetnosci (Skills)

Umiejetnosci to co czyni kazdego agenta ekspertem. To ustrukturyzowana wiedza -- nie tylko prompty, ale protokoly wykonywania, szablony kodu, poradniki bledow i listy kontrolne jakosci.

## Dwuwarstwowy Design

Oto sprytna czesc: umiejetnosci nie laduja wszystkiego naraz. Uzywaja progresywnego ujawniania aby zaoszczedzic ~75% tokenow.

### Warstwa 1: SKILL.md (~800 bajtow)

Zawsze ladowana. Zawiera:
- Tozsamosc i role agenta
- Kiedy sie aktywowac (warunki routingu)
- Glowne zasady i ograniczenia
- Czego NIE robic

### Warstwa 2: resources/ (ladowane na zadanie)

Ladowane tylko gdy agent faktycznie pracuje. Zawiera gleboka zawartosc:

| Zasob | Co Robi |
|-------|--------|
| `execution-protocol.md` | Workflow krok po kroku: Analizuj → Planuj → Implementuj → Weryfikuj |
| `tech-stack.md` | Szczegolowe specyfikacje technologii i wersji |
| `error-playbook.md` | Co robic gdy cos idzie nie tak (z eskalacja "3 strikes") |
| `checklist.md` | Kontrole jakosci specyficzne dla domeny |
| `snippets.md` | Gotowe do uzycia wzorce kodu |
| `examples/` | Przyklady wejscia/wyjscia few-shot |

### Jak To Wyglada

```
.agents/skills/oma-frontend/
├── SKILL.md                          ← Zawsze ladowane (~800 bajtow)
└── resources/
    ├── execution-protocol.md         ← Na zadanie
    ├── tech-stack.md
    ├── tailwind-rules.md
    ├── component-template.tsx
    ├── snippets.md
    ├── error-playbook.md
    ├── checklist.md
    └── examples/
```

## Wspoldzielone Zasoby

Wszyscy agenci wspoldziela wspolne podstawy z `.agents/skills/_shared/`:

| Zasob | Przeznaczenie |
|-------|-------------|
| `skill-routing.md` | Mapuje zadania do odpowiedniego agenta |
| `context-loading.md` | Ktore zasoby ladowac dla jakiego typu zadania |
| `prompt-structure.md` | Cel → Kontekst → Ograniczenia → Gotowe Gdy |
| `clarification-protocol.md` | Kiedy pytac vs. po prostu zakladac |
| `context-budget.md` | Efektywne tokenowo czytanie plikow per tier modelu |
| `difficulty-guide.md` | Ocena zadania: Proste / Srednie / Zlożone |
| `reasoning-templates.md` | Szablony ustrukturyzowanego rozumowania do wypelnienia |
| `quality-principles.md` | Uniwersalne standardy jakosci |
| `vendor-detection.md` | Wykrywanie ktore IDE/CLI jest uruchomione |

## Zasoby Warunkowe

Niektore zasoby laduja sie tylko przy okreslonych warunkach:

| Zasob | Kiedy Sie Laduje |
|-------|-----------------|
| `quality-score.md` | Zazadano oceny jakosci |
| `experiment-ledger.md` | Probowanie eksperymentalnego podejscia |
| `exploration-loop.md` | Trwa iteracyjna eksploracja |

## Wykonywanie Specyficzne dla Vendora

Kazde wspierane CLI ma wlasny protokol wykonywania w `.agents/skills/_shared/runtime/execution-protocols/`:
- `claude.md` -- Wzorce specyficzne dla Claude
- `gemini.md` -- Wzorce specyficzne dla Gemini
- `codex.md` -- Wzorce specyficzne dla Codex
- `qwen.md` -- Wzorce specyficzne dla Qwen

## Dlaczego To Wazne

Bez progresywnego ujawniania, ladowanie 5 agentow wyczerpaloby okno kontekstu zanim jakakolwiek praca by sie zaczela. Z nim dostajesz lekkie poczatkowe ladowanie i gleboka realizacje gdy to ma znaczenie.
