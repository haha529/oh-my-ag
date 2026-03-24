---
title: Integracja z Istniejacym Projektem
description: Dodaj oh-my-agent do projektu nad ktorym juz pracujesz -- bezpiecznie i bez niszczenia.
---

# Integracja z Istniejacym Projektem

Masz juz projekt? Oto jak dodac oh-my-agent nie psuąc niczego.

## Latwy Sposob (CLI)

Uruchom to w katalogu glownym projektu:

```bash
bunx oh-my-agent
```

Co to robi:
- Instaluje umiejetnosci do `.agents/skills/`
- Kopiuje wspolne zasoby do `.agents/skills/_shared/`
- Tworzy symlinki dla Twojego IDE (`.claude/skills/` itd.)
- Instaluje workflow do `.agents/workflows/`
- Tworzy domyslna konfiguracje w `.agents/config/user-preferences.yaml`

## Reczny Sposob

Gdy chcesz pelna kontrole nad tym co jest kopiowane:

```bash
cd /path/to/your-project

mkdir -p .agents/skills .agents/workflows .agents/config .claude/skills

# Skopiuj umiejetnosci ktore chcesz
for skill in oma-pm oma-frontend oma-backend oma-qa oma-debug oma-commit; do
  [ -d ".agents/skills/$skill" ] || cp -r /path/to/oh-my-agent/.agents/skills/$skill .agents/skills/
done

# Skopiuj wspolne zasoby
[ -d .agents/skills/_shared ] || cp -r /path/to/oh-my-agent/.agents/skills/_shared .agents/skills/

# Skopiuj workflow
for wf in coordinate.md plan.md review.md debug.md commit.md setup.md; do
  [ -f ".agents/workflows/$wf" ] || cp /path/to/oh-my-agent/.agents/workflows/$wf .agents/workflows/
done

# Domyslna konfiguracja (tylko jesli brakuje)
[ -f .agents/config/user-preferences.yaml ] || cp /path/to/oh-my-agent/.agents/config/user-preferences.yaml .agents/config/
```

## Sprawdz Czy Zadzialo

```bash
oma doctor
```

Lub sprawdz recznie:
```bash
ls .agents/skills/          # Powinny byc katalogi umiejetnosci
ls .agents/workflows/       # Powinny byc pliki .md workflow
cat .agents/config/user-preferences.yaml  # Powinna byc konfiguracja
```

## Symlinki Multi-IDE

Podczas `bunx oh-my-agent` zostaniesz zapytany:

```text
Also create symlinks for other CLI tools?
  ○ Cursor (.cursor/skills/)
  ○ GitHub Copilot (.github/skills/)
```

Jedno zrodlo prawdy (`.agents/skills/`), wiele IDE czytajacych z niego:

```text
.agents/skills/oma-frontend/     ← Zrodlo (SSOT)
.claude/skills/oma-frontend/     → symlink
.cursor/skills/oma-frontend/     → symlink
.github/skills/oma-frontend/     → symlink
```

## Wskazowki Bezpieczenstwa

**Przed integracja** stworz punkt kontrolny:

```bash
git add -A && git commit -m "chore: checkpoint before oh-my-agent"
```

- CLI nigdy nie nadpisuje istniejacych katalogow umiejetnosci
- Twoje konfiguracje specyficzne dla projektu zostaja pod Twoja kontrola
- `oma doctor` zasygnalizuje wszelkie problemy

## Opcjonalnie: Dashboardy

```bash
oma dashboard        # Monitorowanie w terminalu
oma dashboard:web    # Web UI na http://localhost:9847
```

## Co Dalej?

Zacznij rozmawiac w swoim IDE AI, lub sprawdz [Przewodnik Uzycia](./usage) po przyklady workflow.
