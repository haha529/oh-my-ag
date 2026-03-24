---
title: Execucao Paralela
description: Execute multiplos agentes ao mesmo tempo -- porque esperar um terminar antes de comecar o proximo e lento.
---

# Execucao Paralela

O verdadeiro poder do oh-my-agent esta em executar multiplos agentes simultaneamente. Enquanto o agente de backend constroi sua API, o agente de frontend ja esta criando a UI.

## Padrao Basico

```bash
oma agent:spawn backend "Implement auth API" session-01 &
oma agent:spawn frontend "Create login form" session-01 &
wait
```

O `&` executa cada agente em segundo plano. `wait` bloqueia ate ambos terminarem.

## Padrao com Workspace

De a cada agente seu proprio diretorio para evitar conflitos de merge:

```bash
oma agent:spawn backend "Auth + DB migration" session-02 -w ./apps/api
oma agent:spawn frontend "Login + token refresh" session-02 -w ./apps/web
oma agent:spawn mobile "Auth screens" session-02 -w ./apps/mobile
```

## Usando `agent:parallel`

Para uma sintaxe mais limpa:

```bash
oma agent:parallel -i backend:"Implement auth API" frontend:"Build login form" mobile:"Auth screens"
```

Adicione `--no-wait` para disparar e esquecer:

```bash
oma agent:parallel -i backend:"task" frontend:"task" --no-wait
```

## Monitore Enquanto Eles Trabalham

Abra um terminal separado:

```bash
# Dashboard no terminal
oma dashboard

# Ou dashboard web
oma dashboard:web
# → http://localhost:9847
```

O dashboard mostra status ao vivo de cada agente -- turnos executados, tarefa atual, estado de conclusao.

## Configuracao Multi-CLI

Nem todas as ferramentas de IA sao iguais. Direcione agentes para a CLI que melhor lida com seu dominio:

```yaml
# .agents/config/user-preferences.yaml
default_cli: gemini

agent_cli_mapping:
  frontend: claude      # Raciocinio complexo de UI
  backend: gemini       # Geracao rapida de API
  mobile: gemini
  qa: claude            # Revisao de seguranca minuciosa
  debug: claude         # Analise profunda de causa raiz
  pm: gemini            # Decomposicao rapida
```

## Resolucao de CLI Vendor

Ao iniciar um agente, a CLI e escolhida nesta ordem:

1. Flag `--vendor` (maior prioridade)
2. `agent_cli_mapping` para aquele agente especifico
3. Configuracao `default_cli`
4. `active_vendor` do `cli-config.yaml`
5. `gemini` (fallback)

## Dicas para Execucoes Paralelas

- **Use um session ID por funcionalidade** -- mantem as saidas dos agentes agrupadas
- **Trave contratos de API primeiro** -- execute `/plan` antes de iniciar agentes de implementacao
- **Workspaces separados** -- evite que agentes pisem nos arquivos uns dos outros
- **Monitore ativamente** -- pegue problemas cedo via dashboard em vez de encontra-los na hora do merge
