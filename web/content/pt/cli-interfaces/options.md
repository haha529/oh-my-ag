---
title: Opcoes da CLI
description: Todas as flags e opcoes dos comandos da CLI do oh-my-agent.
---

# Opcoes da CLI

## Opcoes Globais

Disponiveis em todo comando:

| Opcao | O Que Faz |
|-------|----------|
| `-h, --help` | Mostrar ajuda |
| `-V, --version` | Mostrar numero da versao |

## Opcoes de Saida

Muitos comandos suportam saida legivel por maquina:

| Opcao | O Que Faz |
|-------|----------|
| `--json` | Saida como JSON |
| `--output <format>` | Formato de saida: `text` ou `json` |

Voce tambem pode definir `OH_MY_AG_OUTPUT_FORMAT=json` como variavel de ambiente.

**Suportado por:** `doctor`, `stats`, `retro`, `cleanup`, `auth:status`, `usage:anti`, `memory:init`, `verify`, `visualize`

## Opcoes por Comando

### `update`
| Opcao | O Que Faz |
|-------|----------|
| `-f, --force` | Sobrescrever arquivos de config customizados pelo usuario |
| `--ci` | Modo nao interativo (pular todos os prompts) |

### `stats`
| Opcao | O Que Faz |
|-------|----------|
| `--reset` | Resetar todos os dados de metricas |

### `retro`
| Opcao | O Que Faz |
|-------|----------|
| `--interactive` | Modo de entrada manual |
| `--compare` | Comparar janela atual vs. janela anterior de mesmo tamanho |

### `cleanup`
| Opcao | O Que Faz |
|-------|----------|
| `--dry-run` | Mostrar o que seria limpo sem executar |
| `-y, --yes` | Pular prompts de confirmacao |

### `usage:anti`
| Opcao | O Que Faz |
|-------|----------|
| `--raw` | Despejar resposta RPC bruta |

### `agent:spawn`
| Opcao | O Que Faz |
|-------|----------|
| `-v, --vendor <vendor>` | Sobrescrever CLI vendor (`gemini`/`claude`/`codex`/`qwen`) |
| `-w, --workspace <path>` | Diretorio de trabalho para o agente |

### `agent:status`
| Opcao | O Que Faz |
|-------|----------|
| `-r, --root <path>` | Caminho raiz para verificacoes de memoria |

### `agent:parallel`
| Opcao | O Que Faz |
|-------|----------|
| `-v, --vendor <vendor>` | Sobrescrever CLI vendor |
| `-i, --inline` | Especificar tarefas como argumentos `agent:task` |
| `--no-wait` | Nao esperar conclusao (modo background) |

### `memory:init`
| Opcao | O Que Faz |
|-------|----------|
| `--force` | Sobrescrever arquivos de schema existentes |

### `verify`
| Opcao | O Que Faz |
|-------|----------|
| `-w, --workspace <path>` | Caminho do workspace para verificar |

## Exemplos Praticos

```bash
# Saida JSON para pipeline CI
oma doctor --json

# Resetar metricas de produtividade
oma stats --reset

# Pre-visualizar limpeza sem executar
oma cleanup --dry-run

# Iniciar com CLI e workspace especificos
oma agent:spawn backend "Auth API" session-01 -v codex -w ./apps/api

# Atualizacao nao interativa em CI
oma update --ci --force

# Comparar ultimos 7 dias vs. 7 dias anteriores
oma retro 7 --compare
```
