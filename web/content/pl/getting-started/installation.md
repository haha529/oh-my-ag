---
title: Instalacja
description: Uruchom oh-my-agent w swoim projekcie -- trzy sposoby instalacji, wszystkie szybkie.
---

# Instalacja

## Czego Potrzebujesz

- **IDE z AI** -- Antigravity, Claude Code, Cursor, Gemini CLI, Codex CLI lub podobne
- **bun** i **uv** -- instalowane automatycznie jesli brakuje

## Opcja 1: Jedna Linia (Zalecane)

```bash
curl -fsSL https://raw.githubusercontent.com/first-fluke/oh-my-agent/main/cli/install.sh | bash
```

Wykrywa brakujace zaleznosci (bun, uv), instaluje je i uruchamia interaktywna konfiguracje. Gotowe w okolo minute.

## Opcja 2: Reczna Instalacja

```bash
bunx oh-my-agent
```

Zobaczysz menu do wyboru presetu:

| Preset | Co Dostajesz |
|--------|-------------|
| ✨ All | Kazdy agent i umiejetnosc |
| 🌐 Fullstack | frontend + backend + db + pm + qa + debug + brainstorm + commit |
| 🎨 Frontend | frontend + pm + qa + debug + brainstorm + commit |
| ⚙️ Backend | backend + db + pm + qa + debug + brainstorm + commit |
| 📱 Mobile | mobile + pm + qa + debug + brainstorm + commit |
| 🚀 DevOps | tf-infra + dev-workflow + pm + qa + debug + brainstorm + commit |

Umiejetnosci laduja sie do `.agents/skills/` z symlinkami utworzonymi dla Twojego IDE.

## Opcja 3: Globalna Instalacja

Do czestego uzycia CLI (dashboardy, uruchamianie agentow, diagnostyka):

```bash
# Homebrew
brew install oh-my-agent

# lub npm/bun
bun install --global oh-my-agent
```

Teraz mozesz uzywac `oma` wszedzie:

```bash
oma doctor          # Sprawdz czy wszystko jest zdrowe
oma dashboard       # Monitorowanie w czasie rzeczywistym
oma agent:spawn     # Uruchom agentow z terminala
```

## Wybierz CLI AI

Potrzebujesz co najmniej jednego:

| CLI | Instalacja | Jak Autoryzowac |
|-----|----------|----------------|
| Gemini | `bun install --global @google/gemini-cli` | Automatycznie przy pierwszym uruchomieniu |
| Claude | `curl -fsSL https://claude.ai/install.sh \| bash` | Automatycznie przy pierwszym uruchomieniu |
| Codex | `bun install --global @openai/codex` | `codex login` |
| Qwen | `bun install --global @qwen-code/qwen-code` | `/auth` wewnatrz CLI |

## Pierwsza Konfiguracja

Po instalacji, uruchom `/setup` w swoim IDE AI aby skonfigurowac:

- Jezyk odpowiedzi
- Domyslny CLI vendor
- Mapowanie CLI per agent (uzywaj roznych narzedzi AI dla roznych agentow)

To tworzy `.agents/config/user-preferences.yaml` -- plik kontrolujacy wszystkie Twoje preferencje.

## Sprawdz Czy Zadzialo

```bash
oma doctor
```

Sprawdza instalacje CLI, konfiguracje MCP i status umiejetnosci. Jesli cos jest nie tak, mowi dokladnie co naprawic.

## Co Dalej?

Otworz projekt w swoim IDE AI i zacznij rozmawiac. Umiejetnosci sa wykrywane automatycznie. Sprobuj czegos takiego:

```
"Zbuduj formularz logowania z walidacja e-mail uzywajac Tailwind CSS"
```

Lub przejdz do [Przewodnika Uzycia](/guide/usage) po wiecej przykladow.
