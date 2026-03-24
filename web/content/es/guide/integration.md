---
title: Integracion en Proyecto Existente
description: Agrega oh-my-agent a un proyecto en el que ya estas trabajando — de forma segura y no destructiva.
---

# Integrar en un Proyecto Existente

Ya tienes un proyecto? Asi es como agregas oh-my-agent sin romper nada.

## La Forma Facil (CLI)

Ejecuta esto en la raiz de tu proyecto:

```bash
bunx oh-my-agent
```

Lo que hace:
- Instala skills en `.agents/skills/`
- Copia recursos compartidos a `.agents/skills/_shared/`
- Crea symlinks para tu IDE (`.claude/skills/`, etc.)
- Instala workflows en `.agents/workflows/`
- Crea configuracion por defecto en `.agents/config/user-preferences.yaml`

## La Forma Manual

Cuando quieres control total sobre lo que se copia:

```bash
cd /path/to/your-project

mkdir -p .agents/skills .agents/workflows .agents/config .claude/skills

# Copia los skills que quieras
for skill in oma-pm oma-frontend oma-backend oma-qa oma-debug oma-commit; do
  [ -d ".agents/skills/$skill" ] || cp -r /path/to/oh-my-agent/.agents/skills/$skill .agents/skills/
done

# Copia recursos compartidos
[ -d .agents/skills/_shared ] || cp -r /path/to/oh-my-agent/.agents/skills/_shared .agents/skills/

# Copia workflows
for wf in coordinate.md plan.md review.md debug.md commit.md setup.md; do
  [ -f ".agents/workflows/$wf" ] || cp /path/to/oh-my-agent/.agents/workflows/$wf .agents/workflows/
done

# Configuracion por defecto (solo si falta)
[ -f .agents/config/user-preferences.yaml ] || cp /path/to/oh-my-agent/.agents/config/user-preferences.yaml .agents/config/
```

## Verificar Que Funciono

```bash
oma doctor
```

O verifica manualmente:
```bash
ls .agents/skills/          # Deberias ver tus directorios de skills
ls .agents/workflows/       # Deberias ver archivos .md de workflow
cat .agents/config/user-preferences.yaml  # Deberias ver tu configuracion
```

## Symlinks Multi-IDE

Durante `bunx oh-my-agent`, se te preguntara:

```text
Also create symlinks for other CLI tools?
  ○ Cursor (.cursor/skills/)
  ○ GitHub Copilot (.github/skills/)
```

Una fuente de verdad (`.agents/skills/`), multiples IDEs leyendo de ella:

```text
.agents/skills/oma-frontend/     ← Fuente (SSOT)
.claude/skills/oma-frontend/     → symlink
.cursor/skills/oma-frontend/     → symlink
.github/skills/oma-frontend/     → symlink
```

## Consejos de Seguridad

**Antes de integrar**, crea un checkpoint:

```bash
git add -A && git commit -m "chore: checkpoint before oh-my-agent"
```

- El CLI nunca sobreescribe carpetas de skills existentes
- Tus configuraciones especificas del proyecto se mantienen bajo tu control
- `oma doctor` senalara cualquier problema

## Opcional: Dashboards

```bash
oma dashboard        # Monitoreo en terminal
oma dashboard:web    # UI Web en http://localhost:9847
```

## Que Sigue?

Empieza a chatear en tu IDE de IA, o consulta la [Guia de Uso](./usage) para ejemplos de workflows.
