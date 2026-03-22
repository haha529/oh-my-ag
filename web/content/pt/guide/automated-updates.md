---
title: Atualizações Automáticas com GitHub Action
description: Mantenha as skills do oh-my-agent sempre atualizadas automaticamente com a GitHub Action oficial.
---

# Atualizações Automáticas com GitHub Action

A **oh-my-agent update action** executa `oma update` em um agendamento e cria um PR (ou faz commit diretamente) quando novas versões de skills estão disponíveis.

## Início Rápido

Adicione este workflow a qualquer repositório que utilize oh-my-agent:

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1" # Every Monday at 09:00 UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: first-fluke/oh-my-agent/action@v1
```

Isso verifica atualizações semanalmente e abre um PR quando há mudanças.

## Referência da Action

A action está disponível em:

- **Caminho no monorepo**: `first-fluke/oh-my-agent/action@v1`
- **Marketplace**: [`first-fluke/oma-update-action@v1`](https://github.com/marketplace/actions/oh-my-agent-update)

### Entradas

| Entrada | Descrição | Padrão |
|:--------|:---------|:-------|
| `mode` | `pr` cria um pull request, `commit` faz push diretamente | `pr` |
| `base-branch` | Branch base para o PR ou destino do commit direto | `main` |
| `force` | Sobrescreve arquivos de configuração do usuário (`--force`) | `false` |
| `pr-title` | Título personalizado do PR | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Labels separadas por vírgula para o PR | `dependencies,automated` |
| `commit-message` | Mensagem de commit personalizada | `chore(deps): update oh-my-agent skills` |
| `token` | Token do GitHub para criação do PR | `${{ github.token }}` |

### Saídas

| Saída | Descrição |
|:------|:---------|
| `updated` | `true` se mudanças foram detectadas |
| `version` | A versão do oh-my-agent após a atualização |
| `pr-number` | Número do PR (apenas no modo `pr`) |
| `pr-url` | URL do PR (apenas no modo `pr`) |

## Exemplos

### Modo de Commit Direto

Ignore o PR e envie as mudanças diretamente para a branch base:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Com Personal Access Token

Necessário para repositórios fork onde o `GITHUB_TOKEN` não possui permissão de escrita:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Notificação Condicional

Execute uma etapa adicional apenas quando uma atualização for aplicada:

```yaml
jobs:
  update:
    runs-on: ubuntu-latest
    outputs:
      updated: ${{ steps.oma.outputs.updated }}
    steps:
      - uses: actions/checkout@v6
      - uses: first-fluke/oh-my-agent/action@v1
        id: oma

  notify:
    needs: update
    if: needs.update.outputs.updated == 'true'
    runs-on: ubuntu-latest
    steps:
      - run: echo "oh-my-agent was updated to ${{ needs.update.outputs.version }}"
```

## Como Funciona

1. Instala a CLI `oh-my-agent` via Bun
2. Executa `oma update --ci` (modo não-interativo, sem prompts)
3. Detecta mudanças nos diretórios `.agents/` e `.claude/`
4. Cria um PR ou faz commit diretamente com base na entrada `mode`

## Comparação com o Registro Central

| | GitHub Action | Registro Central |
|:--|:--:|:--:|
| Configuração | 1 arquivo de workflow | 3 arquivos (config + 2 workflows) |
| Método de atualização | CLI `oma update` | Download de tarball + sincronização manual |
| Personalização | Entradas da action | `.agent-registry.yml` |
| Fixação de versão | Sempre a mais recente | Versão explicitamente fixada |

Use a **GitHub Action** para a maioria dos projetos. Use a abordagem do **Registro Central** se precisar de fixação estrita de versão ou não puder utilizar actions de terceiros.
