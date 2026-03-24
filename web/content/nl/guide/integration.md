---
title: Integratie in Bestaand Project
description: Voeg oh-my-agent toe aan een project waar je al aan werkt — veilig en niet-destructief.
---

# Integreren in een Bestaand Project

Al een project? Zo voeg je oh-my-agent toe zonder iets te breken.

## De Makkelijke Manier (CLI)

Voer dit uit in je project-root:

```bash
bunx oh-my-agent
```

Wat het doet:
- Installeert skills in `.agents/skills/`
- Kopieert gedeelde resources naar `.agents/skills/_shared/`
- Maakt symlinks voor je IDE (`.claude/skills/`, etc.)
- Installeert workflows in `.agents/workflows/`
- Maakt standaardconfiguratie in `.agents/config/user-preferences.yaml`

## De Handmatige Manier

Wanneer je volledige controle wilt over wat gekopieerd wordt:

```bash
cd /path/to/your-project

mkdir -p .agents/skills .agents/workflows .agents/config .claude/skills

# Kopieer gewenste skills
for skill in oma-pm oma-frontend oma-backend oma-qa oma-debug oma-commit; do
  [ -d ".agents/skills/$skill" ] || cp -r /path/to/oh-my-agent/.agents/skills/$skill .agents/skills/
done

# Kopieer gedeelde resources
[ -d .agents/skills/_shared ] || cp -r /path/to/oh-my-agent/.agents/skills/_shared .agents/skills/

# Kopieer workflows
for wf in coordinate.md plan.md review.md debug.md commit.md setup.md; do
  [ -f ".agents/workflows/$wf" ] || cp /path/to/oh-my-agent/.agents/workflows/$wf .agents/workflows/
done

# Standaardconfiguratie (alleen als ontbreekt)
[ -f .agents/config/user-preferences.yaml ] || cp /path/to/oh-my-agent/.agents/config/user-preferences.yaml .agents/config/
```

## Controleer of Het Werkt

```bash
oma doctor
```

Of controleer handmatig:
```bash
ls .agents/skills/          # Moet je skill-mappen tonen
ls .agents/workflows/       # Moet workflow .md bestanden tonen
cat .agents/config/user-preferences.yaml  # Moet je configuratie tonen
```

## Multi-IDE Symlinks

Tijdens `bunx oh-my-agent` wordt gevraagd:

```text
Also create symlinks for other CLI tools?
  ○ Cursor (.cursor/skills/)
  ○ GitHub Copilot (.github/skills/)
```

Eén bron van waarheid (`.agents/skills/`), meerdere IDE's die eruit lezen:

```text
.agents/skills/oma-frontend/     ← Bron (SSOT)
.claude/skills/oma-frontend/     → symlink
.cursor/skills/oma-frontend/     → symlink
.github/skills/oma-frontend/     → symlink
```

## Veiligheidstips

**Voordat je integreert**, maak een checkpoint:

```bash
git add -A && git commit -m "chore: checkpoint before oh-my-agent"
```

- De CLI overschrijft nooit bestaande skill-mappen
- Je projectspecifieke configuraties blijven onder jouw controle
- `oma doctor` signaleert eventuele problemen

## Optioneel: Dashboards

```bash
oma dashboard        # Terminal-monitoring
oma dashboard:web    # Web UI op http://localhost:9847
```

## Wat Nu?

Begin te chatten in je AI-IDE, of bekijk de [Gebruiksgids](./usage) voor workflow-voorbeelden.
