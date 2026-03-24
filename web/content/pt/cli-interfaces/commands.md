---
title: Comandos da CLI
description: Todo comando disponivel na CLI do oh-my-agent -- com exemplos.
---

# Comandos da CLI

Apos instalar globalmente (`bun install --global oh-my-agent`), use `oma` ou `oh-my-ag`.

## Setup & Manutencao

```bash
oma                    # Instalador interativo — escolha preset, instale skills
oma doctor             # Verificacao de saude: CLIs, configs MCP, status das skills
oma update             # Atualizar skills para a versao mais recente do registro
oma cleanup            # Remover processos orfaos e arquivos temporarios
```

## Monitoramento

```bash
oma dashboard          # Dashboard no terminal — status ao vivo dos agentes
oma dashboard:web      # Dashboard web em http://localhost:9847
oma stats              # Ver metricas de produtividade
oma retro [days]       # Retrospectiva de engenharia com tendencias
```

## Gerenciamento de Agentes

```bash
# Iniciar um unico agente
oma agent:spawn <agent-id> <prompt> <session-id>
oma agent:spawn backend "Implement auth API" session-01 -w ./apps/api

# Verificar status do agente
oma agent:status <session-id> [agent-ids...]
oma agent:status session-01 backend frontend

# Executar multiplos agentes em paralelo
oma agent:parallel [tasks...]
oma agent:parallel -i backend:"Auth API" frontend:"Login form"
```

## Memoria & Verificacao

```bash
# Inicializar schema de memoria Serena
oma memory:init

# Verificar qualidade da saida do agente
oma verify <agent-type>
oma verify backend
oma verify frontend
```

## Integracao & Utilitarios

```bash
oma auth:status        # Verificar status de autenticacao da CLI
oma usage:anti         # Mostrar cotas de uso do Antigravity IDE
oma bridge [url]       # Bridge MCP stdio para Streamable HTTP
oma visualize          # Gerar grafico de dependencias do projeto
oma describe [cmd]     # Introspeccao JSON de qualquer comando CLI
oma star               # Dar estrela no oh-my-agent no GitHub
```

## Obtendo Ajuda

```bash
oma help               # Mostrar todos os comandos
oma version            # Mostrar numero da versao
oma <command> --help   # Ajuda para comando especifico
```
