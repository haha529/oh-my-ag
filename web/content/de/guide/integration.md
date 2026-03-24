---
title: Integration in Bestehendes Projekt
description: Fuege oh-my-agent zu einem Projekt hinzu, an dem du bereits arbeitest — sicher und nicht-destruktiv.
---

# In ein Bestehendes Projekt Integrieren

Du hast bereits ein Projekt? So fuegst du oh-my-agent hinzu, ohne etwas kaputt zu machen.

## Der Einfache Weg (CLI)

Fuehre dies im Wurzelverzeichnis deines Projekts aus:

```bash
bunx oh-my-agent
```

Was es tut:
- Installiert Skills in `.agents/skills/`
- Kopiert gemeinsame Ressourcen nach `.agents/skills/_shared/`
- Erstellt Symlinks fuer deine IDE (`.claude/skills/`, etc.)
- Installiert Workflows in `.agents/workflows/`
- Erstellt Standardkonfiguration in `.agents/config/user-preferences.yaml`

## Der Manuelle Weg

Wenn du volle Kontrolle haben willst, was kopiert wird:

```bash
cd /path/to/your-project

mkdir -p .agents/skills .agents/workflows .agents/config .claude/skills

# Kopiere die Skills, die du willst
for skill in oma-pm oma-frontend oma-backend oma-qa oma-debug oma-commit; do
  [ -d ".agents/skills/$skill" ] || cp -r /path/to/oh-my-agent/.agents/skills/$skill .agents/skills/
done

# Kopiere gemeinsame Ressourcen
[ -d .agents/skills/_shared ] || cp -r /path/to/oh-my-agent/.agents/skills/_shared .agents/skills/

# Kopiere Workflows
for wf in coordinate.md plan.md review.md debug.md commit.md setup.md; do
  [ -f ".agents/workflows/$wf" ] || cp /path/to/oh-my-agent/.agents/workflows/$wf .agents/workflows/
done

# Standardkonfiguration (nur falls fehlend)
[ -f .agents/config/user-preferences.yaml ] || cp /path/to/oh-my-agent/.agents/config/user-preferences.yaml .agents/config/
```

## Ueberpruefen, Ob Es Funktioniert Hat

```bash
oma doctor
```

Oder manuell pruefen:
```bash
ls .agents/skills/          # Du solltest deine Skill-Verzeichnisse sehen
ls .agents/workflows/       # Du solltest Workflow-.md-Dateien sehen
cat .agents/config/user-preferences.yaml  # Du solltest deine Konfiguration sehen
```

## Multi-IDE-Symlinks

Waehrend `bunx oh-my-agent` wirst du gefragt:

```text
Also create symlinks for other CLI tools?
  ○ Cursor (.cursor/skills/)
  ○ GitHub Copilot (.github/skills/)
```

Eine Quelle der Wahrheit (`.agents/skills/`), mehrere IDEs lesen davon:

```text
.agents/skills/oma-frontend/     ← Quelle (SSOT)
.claude/skills/oma-frontend/     → Symlink
.cursor/skills/oma-frontend/     → Symlink
.github/skills/oma-frontend/     → Symlink
```

## Sicherheitstipps

**Vor der Integration**, erstelle einen Checkpoint:

```bash
git add -A && git commit -m "chore: checkpoint before oh-my-agent"
```

- Das CLI ueberschreibt nie vorhandene Skill-Ordner
- Deine projektspezifischen Konfigurationen bleiben unter deiner Kontrolle
- `oma doctor` wird eventuelle Probleme anzeigen

## Optional: Dashboards

```bash
oma dashboard        # Terminal-Ueberwachung
oma dashboard:web    # Web-UI unter http://localhost:9847
```

## Wie Geht Es Weiter?

Fang an, in deiner KI-IDE zu chatten, oder sieh dir die [Nutzungsanleitung](./usage) fuer Workflow-Beispiele an.
