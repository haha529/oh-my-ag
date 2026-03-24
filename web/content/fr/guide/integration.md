---
title: Integration dans un Projet Existant
description: Ajoutez oh-my-agent a un projet sur lequel vous travaillez deja — en toute securite et sans rien casser.
---

# Integrer dans un Projet Existant

Vous avez deja un projet ? Voici comment ajouter oh-my-agent sans rien casser.

## La Methode Simple (CLI)

Lancez ceci a la racine de votre projet :

```bash
bunx oh-my-agent
```

Ce que ca fait :
- Installe les skills dans `.agents/skills/`
- Copie les ressources partagees dans `.agents/skills/_shared/`
- Cree des symlinks pour votre IDE (`.claude/skills/`, etc.)
- Installe les workflows dans `.agents/workflows/`
- Cree la config par defaut dans `.agents/config/user-preferences.yaml`

## La Methode Manuelle

Quand vous voulez un controle total sur ce qui est copie :

```bash
cd /path/to/your-project

mkdir -p .agents/skills .agents/workflows .agents/config .claude/skills

# Copiez les skills que vous voulez
for skill in oma-pm oma-frontend oma-backend oma-qa oma-debug oma-commit; do
  [ -d ".agents/skills/$skill" ] || cp -r /path/to/oh-my-agent/.agents/skills/$skill .agents/skills/
done

# Copiez les ressources partagees
[ -d .agents/skills/_shared ] || cp -r /path/to/oh-my-agent/.agents/skills/_shared .agents/skills/

# Copiez les workflows
for wf in coordinate.md plan.md review.md debug.md commit.md setup.md; do
  [ -f ".agents/workflows/$wf" ] || cp /path/to/oh-my-agent/.agents/workflows/$wf .agents/workflows/
done

# Config par defaut (seulement si absente)
[ -f .agents/config/user-preferences.yaml ] || cp /path/to/oh-my-agent/.agents/config/user-preferences.yaml .agents/config/
```

## Verifier Que Ca A Marche

```bash
oma doctor
```

Ou verifiez manuellement :
```bash
ls .agents/skills/          # Vous devriez voir vos repertoires de skills
ls .agents/workflows/       # Vous devriez voir des fichiers .md de workflow
cat .agents/config/user-preferences.yaml  # Vous devriez voir votre config
```

## Symlinks Multi-IDE

Pendant `bunx oh-my-agent`, on vous demandera :

```text
Also create symlinks for other CLI tools?
  ○ Cursor (.cursor/skills/)
  ○ GitHub Copilot (.github/skills/)
```

Une source de verite (`.agents/skills/`), plusieurs IDEs qui lisent depuis :

```text
.agents/skills/oma-frontend/     ← Source (SSOT)
.claude/skills/oma-frontend/     → symlink
.cursor/skills/oma-frontend/     → symlink
.github/skills/oma-frontend/     → symlink
```

## Conseils de Securite

**Avant d'integrer**, creez un point de sauvegarde :

```bash
git add -A && git commit -m "chore: checkpoint before oh-my-agent"
```

- Le CLI n'ecrase jamais les dossiers de skills existants
- Vos configs specifiques au projet restent sous votre controle
- `oma doctor` signalera tout probleme

## Optionnel : Dashboards

```bash
oma dashboard        # Surveillance en terminal
oma dashboard:web    # UI Web a http://localhost:9847
```

## Et Ensuite ?

Commencez a discuter dans votre IDE IA, ou consultez le [Guide d'Utilisation](./usage) pour des exemples de workflows.
