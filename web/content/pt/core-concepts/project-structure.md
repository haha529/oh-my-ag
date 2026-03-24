---
title: Estrutura do Projeto
description: Onde tudo fica e por que esta organizado desta forma.
---

# Estrutura do Projeto

O oh-my-agent organiza tudo em alguns diretorios-chave. Aqui esta o que voce vera apos a instalacao.

## A Visao Geral

```text
your-project/
├── .agents/              ← Fonte Unica de Verdade
│   ├── config/           ← Suas preferencias
│   ├── skills/           ← Capacidades dos agentes
│   ├── workflows/        ← Definicoes de comandos slash
│   ├── agents/           ← Definicoes de subagentes
│   ├── plan.json         ← Saida de plano gerado
│   ├── state/            ← Estado de workflow ativo
│   ├── results/          ← Arquivos de resultado dos agentes
│   └── mcp.json          ← Config do servidor MCP
│
├── .claude/              ← Camada de integracao com IDE
│   ├── settings.json     ← Hooks e permissoes
│   ├── hooks/            ← Deteccao de palavras-chave, HUD
│   ├── skills/           ← Symlinks para .agents/skills/
│   └── agents/           ← Definicoes de subagentes para IDE
│
└── .serena/              ← Estado em tempo de execucao
    └── memories/         ← Arquivos de memoria de orquestracao
```

## `.agents/` -- A Fonte de Verdade

Este e o nucleo. Tudo que os agentes precisam vive aqui.

### `config/`
- **`user-preferences.yaml`** -- Seu idioma, fuso horario, CLI padrao, mapeamento de CLI por agente

### `skills/`
Onde a expertise dos agentes vive. Cada skill tem um `SKILL.md` e um diretorio `resources/`.

- **`_shared/`** -- Recursos comuns usados por todos os agentes (roteamento, templates, checklists)
- **`oma-frontend/`**, **`oma-backend/`**, etc. -- Skills especificas de dominio

### `workflows/`
Arquivos Markdown que definem o comportamento dos comandos slash. Sao os scripts que os agentes seguem quando voce digita `/plan`, `/coordinate`, `/review`, etc.

### `agents/`
Definicoes de subagentes -- as especificacoes para iniciar agentes via CLI ou Task tool.

## `.claude/` -- Integracao com IDE

Isso conecta o oh-my-agent ao Claude Code (e outras IDEs via symlinks).

### `hooks/`
- **`triggers.json`** -- Mapeamento de palavras-chave para workflows em 11 idiomas
- **`keyword-detector.ts`** -- A logica que auto-detecta workflows a partir da sua entrada
- **`persistent-mode.ts`** -- Mantem workflows persistentes rodando ate terminarem
- **`hud.ts`** -- O indicador `[OMA]` na barra de status

### `skills/` e `agents/`
Symlinks apontando para `.agents/` -- mantem uma unica fonte de verdade enquanto torna as skills visiveis para a IDE.

## `.serena/memories/` -- Estado em Tempo de Execucao

Onde os agentes escrevem seu progresso durante a execucao:

| Arquivo | O Que Contem |
|---------|-------------|
| `orchestrator-session.md` | ID da sessao, status, hora de inicio |
| `task-board.md` | Qual agente tem qual tarefa |
| `progress-{agent}.md` | Atualizacoes de progresso turno a turno |
| `result-{agent}.md` | Saida final de cada agente |

Os dashboards observam este diretorio para atualizacoes em tempo real.

## Para o Repositorio Fonte do oh-my-agent

Se voce esta trabalhando no oh-my-agent em si (nao apenas usando-o), o repositorio e um monorepo:

```text
oh-my-agent/
├── cli/              ← Codigo fonte da CLI (TypeScript)
├── web/              ← Site de documentacao (Next.js)
├── action/           ← GitHub Action para atualizacoes automaticas
├── docs/             ← READMEs traduzidos + specs
└── .agents/          ← Editavel (este E o codigo fonte)
```
