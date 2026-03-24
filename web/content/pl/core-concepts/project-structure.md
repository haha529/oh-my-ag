---
title: Struktura Projektu
description: Gdzie wszystko sie znajduje i dlaczego jest tak zorganizowane.
---

# Struktura Projektu

oh-my-agent organizuje wszystko w kilku kluczowych katalogach. Oto co zobaczysz po instalacji.

## Duzy Obraz

```text
your-project/
├── .agents/              ← Jedyne Zrodlo Prawdy
│   ├── config/           ← Twoje preferencje
│   ├── skills/           ← Mozliwosci agentow
│   ├── workflows/        ← Definicje komend slash
│   ├── agents/           ← Definicje podagentow
│   ├── plan.json         ← Wygenerowany plan
│   ├── state/            ← Stan aktywnego workflow
│   ├── results/          ← Pliki wynikowe agentow
│   └── mcp.json          ← Konfiguracja serwera MCP
│
├── .claude/              ← Warstwa integracji z IDE
│   ├── settings.json     ← Hooki i uprawnienia
│   ├── hooks/            ← Wykrywanie slow kluczowych, HUD
│   ├── skills/           ← Symlinki do .agents/skills/
│   └── agents/           ← Definicje podagentow dla IDE
│
└── .serena/              ← Stan uruchomieniowy
    └── memories/         ← Pliki pamieci orkiestracji
```

## `.agents/` -- Zrodlo Prawdy

To jest rdzen. Wszystko czego agenci potrzebuja zyje tutaj.

### `config/`
- **`user-preferences.yaml`** -- Twoj jezyk, strefa czasowa, domyslny CLI, mapowanie CLI per agent

### `skills/`
Gdzie zyje ekspertyza agentow. Kazda umiejetnosc ma `SKILL.md` i katalog `resources/`.

- **`_shared/`** -- Wspolne zasoby uzywane przez wszystkich agentow (routing, szablony, listy kontrolne)
- **`oma-frontend/`**, **`oma-backend/`** itd. -- Umiejetnosci specyficzne dla domeny

### `workflows/`
Pliki Markdown definiujace zachowanie komend slash. To skrypty ktorym agenci podazaja gdy wpisujesz `/plan`, `/coordinate`, `/review` itd.

### `agents/`
Definicje podagentow -- specyfikacje uruchamiania agentow przez CLI lub Task tool.

## `.claude/` -- Integracja z IDE

To laczy oh-my-agent z Claude Code (i innymi IDE przez symlinki).

### `hooks/`
- **`triggers.json`** -- Mapowanie slow kluczowych na workflow w 11 jezykach
- **`keyword-detector.ts`** -- Logika automatycznego wykrywania workflow z Twojego wejscia
- **`persistent-mode.ts`** -- Utrzymuje trwale workflow dzialajace az do zakonczenia
- **`hud.ts`** -- Wskaznik `[OMA]` na pasku stanu

### `skills/` i `agents/`
Symlinki wskazujace na `.agents/` -- utrzymuje jedno zrodlo prawdy jednoczesnie czyniąc umiejetnosci widocznymi dla IDE.

## `.serena/memories/` -- Stan Uruchomieniowy

Gdzie agenci zapisuja swoj postep podczas wykonywania:

| Plik | Co Zawiera |
|------|-----------|
| `orchestrator-session.md` | ID sesji, status, czas rozpoczecia |
| `task-board.md` | Ktory agent ma ktore zadanie |
| `progress-{agent}.md` | Aktualizacje postepu tura po turze |
| `result-{agent}.md` | Koncowy wynik kazdego agenta |

Dashboardy monitoruja ten katalog dla aktualizacji na zywo.

## Dla Repozytorium Zrodlowego oh-my-agent

Jesli pracujesz nad samym oh-my-agent (nie tylko go uzywasz), repozytorium jest monorepo:

```text
oh-my-agent/
├── cli/              ← Kod zrodlowy CLI (TypeScript)
├── web/              ← Strona dokumentacji (Next.js)
├── action/           ← GitHub Action do automatycznych aktualizacji
├── docs/             ← Przetlumaczone README + specyfikacje
└── .agents/          ← Edytowalny (to JEST kod zrodlowy)
```
