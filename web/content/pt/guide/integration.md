---
title: Integracao em Projeto Existente
description: Adicione o oh-my-agent a um projeto que voce ja esta trabalhando -- de forma segura e nao destrutiva.
---

# Integrar em um Projeto Existente

Ja tem um projeto? Veja como adicionar o oh-my-agent sem quebrar nada.

## O Jeito Facil (CLI)

Execute isso na raiz do seu projeto:

```bash
bunx oh-my-agent
```

O que isso faz:
- Instala skills em `.agents/skills/`
- Copia recursos compartilhados para `.agents/skills/_shared/`
- Cria symlinks para sua IDE (`.claude/skills/`, etc.)
- Instala workflows em `.agents/workflows/`
- Cria config padrao em `.agents/config/user-preferences.yaml`

## O Jeito Manual

Quando voce quer controle total sobre o que e copiado:

```bash
cd /path/to/your-project

mkdir -p .agents/skills .agents/workflows .agents/config .claude/skills

# Copie as skills que voce quer
for skill in oma-pm oma-frontend oma-backend oma-qa oma-debug oma-commit; do
  [ -d ".agents/skills/$skill" ] || cp -r /path/to/oh-my-agent/.agents/skills/$skill .agents/skills/
done

# Copie recursos compartilhados
[ -d .agents/skills/_shared ] || cp -r /path/to/oh-my-agent/.agents/skills/_shared .agents/skills/

# Copie workflows
for wf in coordinate.md plan.md review.md debug.md commit.md setup.md; do
  [ -f ".agents/workflows/$wf" ] || cp /path/to/oh-my-agent/.agents/workflows/$wf .agents/workflows/
done

# Config padrao (apenas se ausente)
[ -f .agents/config/user-preferences.yaml ] || cp /path/to/oh-my-agent/.agents/config/user-preferences.yaml .agents/config/
```

## Verifique se Funcionou

```bash
oma doctor
```

Ou verifique manualmente:
```bash
ls .agents/skills/          # Deve ver seus diretorios de skills
ls .agents/workflows/       # Deve ver arquivos .md de workflow
cat .agents/config/user-preferences.yaml  # Deve ver sua config
```

## Symlinks Multi-IDE

Durante `bunx oh-my-agent`, voce sera perguntado:

```text
Also create symlinks for other CLI tools?
  ○ Cursor (.cursor/skills/)
  ○ GitHub Copilot (.github/skills/)
```

Uma fonte de verdade (`.agents/skills/`), multiplas IDEs lendo dela:

```text
.agents/skills/oma-frontend/     ← Fonte (SSOT)
.claude/skills/oma-frontend/     → symlink
.cursor/skills/oma-frontend/     → symlink
.github/skills/oma-frontend/     → symlink
```

## Dicas de Seguranca

**Antes de integrar**, crie um checkpoint:

```bash
git add -A && git commit -m "chore: checkpoint before oh-my-agent"
```

- A CLI nunca sobrescreve pastas de skills existentes
- Suas configs especificas do projeto ficam sob seu controle
- `oma doctor` sinalizara qualquer problema

## Opcional: Dashboards

```bash
oma dashboard        # Monitoramento no terminal
oma dashboard:web    # UI Web em http://localhost:9847
```

## Proximo Passo

Comece a conversar na sua IDE de IA, ou confira o [Guia de Uso](./usage) para exemplos de workflows.
