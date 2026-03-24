---
title: Atualizacoes Automaticas
description: Mantenha as skills do oh-my-agent atualizadas com uma GitHub Action que abre PRs quando novas versoes saem.
---

# Atualizacoes Automaticas com GitHub Action

Configure uma vez, esqueca. A GitHub Action verifica novas versoes do oh-my-agent e abre um PR quando atualizacoes estao disponiveis.

## Configuracao Rapida

Adicione isso ao seu repositorio:

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1"   # Toda segunda-feira as 09:00 UTC
  workflow_dispatch:        # Ou execute manualmente

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

So isso. Voce recebera um PR toda vez que as skills forem atualizadas.

## Inputs da Action

| Input | O Que Faz | Padrao |
|-------|----------|--------|
| `mode` | `pr` abre um PR, `commit` faz push direto | `pr` |
| `base-branch` | Branch alvo | `main` |
| `force` | Sobrescrever arquivos de config customizados | `false` |
| `pr-title` | Titulo customizado do PR | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Labels do PR separadas por virgula | `dependencies,automated` |
| `commit-message` | Mensagem de commit customizada | `chore(deps): update oh-my-agent skills` |
| `token` | Token do GitHub | `${{ github.token }}` |

## Outputs da Action

| Output | O Que Contem |
|--------|-------------|
| `updated` | `true` se mudancas foram detectadas |
| `version` | Versao do oh-my-agent apos atualizacao |
| `pr-number` | Numero do PR (apenas modo pr) |
| `pr-url` | URL do PR (apenas modo pr) |

## Exemplos

### Pular o PR, Commitar Diretamente

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Com Token de Acesso Pessoal

Para repos fork onde `GITHUB_TOKEN` nao tem acesso de escrita:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Notificar na Atualizacao

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
      - run: echo "Updated to ${{ needs.update.outputs.version }}"
```

## Como Funciona por Baixo dos Panos

1. Instala a CLI `oh-my-agent` via Bun
2. Executa `oma update --ci` (nao interativo)
3. Detecta mudancas em `.agents/` e `.claude/`
4. Cria PR ou commit baseado no `mode`
