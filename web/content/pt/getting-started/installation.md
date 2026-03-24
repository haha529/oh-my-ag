---
title: Instalacao
description: Coloque o oh-my-agent rodando no seu projeto -- tres formas de instalar, todas rapidas.
---

# Instalacao

## O Que Voce Precisa

- **Uma IDE com IA** -- Antigravity, Claude Code, Cursor, Gemini CLI, Codex CLI ou similar
- **bun** e **uv** -- instalados automaticamente se ausentes

## Opcao 1: Uma Linha (Recomendado)

```bash
curl -fsSL https://raw.githubusercontent.com/first-fluke/oh-my-agent/main/cli/install.sh | bash
```

Isso detecta dependencias ausentes (bun, uv), instala-as e lanca o setup interativo. Pronto em cerca de um minuto.

## Opcao 2: Instalacao Manual

```bash
bunx oh-my-agent
```

Voce vera um menu para escolher um preset:

| Preset | O Que Voce Recebe |
|--------|------------------|
| ✨ All | Todos os agentes e skills |
| 🌐 Fullstack | frontend + backend + db + pm + qa + debug + brainstorm + commit |
| 🎨 Frontend | frontend + pm + qa + debug + brainstorm + commit |
| ⚙️ Backend | backend + db + pm + qa + debug + brainstorm + commit |
| 📱 Mobile | mobile + pm + qa + debug + brainstorm + commit |
| 🚀 DevOps | tf-infra + dev-workflow + pm + qa + debug + brainstorm + commit |

As skills sao instaladas em `.agents/skills/` com symlinks criados para sua IDE.

## Opcao 3: Instalacao Global

Para uso frequente do CLI (dashboards, spawn de agentes, diagnosticos):

```bash
# Homebrew
brew install oh-my-agent

# ou npm/bun
bun install --global oh-my-agent
```

Agora voce pode usar `oma` em qualquer lugar:

```bash
oma doctor          # Verifica se tudo esta saudavel
oma dashboard       # Monitoramento em tempo real
oma agent:spawn     # Inicia agentes pelo terminal
```

## Escolha uma CLI de IA

Voce precisa de pelo menos uma:

| CLI | Instalacao | Como Autenticar |
|-----|-----------|----------------|
| Gemini | `bun install --global @google/gemini-cli` | Automatico na primeira execucao |
| Claude | `curl -fsSL https://claude.ai/install.sh \| bash` | Automatico na primeira execucao |
| Codex | `bun install --global @openai/codex` | `codex login` |
| Qwen | `bun install --global @qwen-code/qwen-code` | `/auth` dentro da CLI |

## Configuracao Inicial

Apos a instalacao, execute `/setup` na sua IDE de IA para configurar:

- Idioma de resposta
- CLI vendor padrao
- Mapeamento de CLI por agente (use diferentes ferramentas de IA para diferentes agentes)

Isso cria `.agents/config/user-preferences.yaml` -- o arquivo que controla todas as suas preferencias.

## Verifique se Funcionou

```bash
oma doctor
```

Isso verifica instalacoes de CLI, configs de MCP e status das skills. Se algo estiver errado, diz exatamente o que corrigir.

## Proximo Passo

Abra seu projeto na sua IDE de IA e comece a conversar. As skills sao auto-detectadas. Tente algo como:

```
"Construa um formulario de login com validacao de email usando Tailwind CSS"
```

Ou va para o [Guia de Uso](/guide/usage) para mais exemplos.
