---
title: Monitoramento com Dashboard
description: Acompanhe seus agentes trabalhando em tempo real com dashboards de terminal e web.
---

# Monitoramento com Dashboard

Quando voce tem multiplos agentes rodando em paralelo, voce quer ter visibilidade do que esta acontecendo. E para isso que os dashboards servem.

## Iniciar um Dashboard

```bash
# UI no Terminal
oma dashboard

# UI Web
oma dashboard:web
# → http://localhost:9847
```

## Configuracao Recomendada

Use 3 terminais lado a lado:

| Terminal | Proposito |
|----------|----------|
| 1 | `oma dashboard` -- status ao vivo dos agentes |
| 2 | Comandos de spawn de agentes |
| 3 | Logs de teste e build |

Mantenha o dashboard web aberto no navegador para visibilidade compartilhada durante sessoes em equipe.

## O Que Voce Ve

Os dashboards observam `.serena/memories/` e mostram:

- **Status da sessao** -- rodando, concluida ou falhou
- **Quadro de tarefas** -- qual agente tem qual tarefa
- **Progresso dos agentes** -- contagem de turnos, atividade atual
- **Resultados** -- saidas finais conforme chegam

As atualizacoes sao orientadas por eventos (deteccao de mudanca de arquivo) -- sem loops de polling consumindo sua CPU.

## Sinais de Solucao de Problemas

| Voce Ve | O Que Fazer |
|---------|-----------|
| "No agents detected" | Verifique se os agentes foram iniciados com o mesmo `session-id`. Verifique se `.serena/memories/` esta sendo escrito. |
| Sessao presa em "running" | Verifique timestamps dos arquivos `progress-*`. Reinicie agentes bloqueados com prompts mais claros. |
| Reconexoes frequentes (web) | Verifique firewall/proxy. Reinicie `dashboard:web` e atualize a pagina. |
| Atividade ausente | Verifique se o orchestrator esta escrevendo no diretorio de workspace correto. |

## Antes de Fazer Merge

Checklist rapido do dashboard:

- Todos os agentes alcancaram status "completed"
- Nenhuma descoberta QA de alta severidade nao resolvida
- Arquivos de resultado presentes para cada agente
- Testes de integracao executados apos saidas finais

## Quando Voce Terminar

A fase de monitoramento esta completa quando:
- Sessao mostra estado terminal (completed ou stopped)
- Historico de atividade explica o que aconteceu
- Voce tomou sua decisao de merge/release com total visibilidade
