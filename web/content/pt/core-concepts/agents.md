---
title: Agentes
description: Como os agentes funcionam -- papeis, categorias, charter preflight e o fluxo de orquestracao.
---

# Agentes

Os agentes no oh-my-agent nao sao chatbots genericos. Cada um e modelado a partir de um papel especifico de equipe de engenharia com escopo definido, ferramentas e padroes de qualidade.

## Categorias de Agentes

Pense neles como sua organizacao de engenharia:

| Categoria | Agentes | O Que Eles Cuidam |
|-----------|---------|-------------------|
| **Ideacao** | oma-brainstorm | Explorar ideias antes de se comprometer com codigo |
| **Planejamento** | oma-pm | Requisitos, decomposicao de tarefas, contratos de API |
| **Implementacao** | oma-frontend, oma-backend, oma-mobile, oma-db | A codificacao de fato |
| **Design** | oma-design | Design systems, tokens, padroes UI/UX |
| **Infraestrutura** | oma-tf-infra | Provisionamento cloud com Terraform |
| **DevOps** | oma-dev-workflow | CI/CD, migracoes, releases |
| **Qualidade** | oma-qa, oma-debug | Revisoes, auditorias de seguranca, correcao de bugs |
| **Localizacao** | oma-translator | Traducao multilingual natural |
| **Coordenacao** | oma-orchestrator, oma-coordination | Executar e sincronizar agentes juntos |
| **Git** | oma-commit | Commits convencionais limpos |

## Como os Agentes Executam

Todo agente segue a mesma disciplina:

### 1. Charter Preflight

Antes de escrever qualquer codigo, os agentes emitem um `CHARTER_CHECK` declarando:
- Em qual dominio estao trabalhando
- Quais restricoes se aplicam
- Quais suposicoes estao fazendo
- Como e o "pronto"

Isso captura desvios de escopo e mal-entendidos cedo.

### 2. Carregamento em Duas Camadas

Os agentes sao eficientes em tokens por design:
- **Camada 1** (`SKILL.md`, ~800 bytes): Identidade e regras de roteamento -- sempre carregado
- **Camada 2** (`resources/`): Protocolos de execucao, playbooks de erro, templates de codigo -- carregados apenas quando necessario

Isso economiza ~75% de tokens comparado a carregar tudo de uma vez.

### 3. Execucao com Escopo

Um agente de frontend nao toca em codigo backend. Um agente de DB nao modifica componentes de UI. Cada agente fica na sua faixa.

### 4. Portao de Qualidade

Todo agente tem um checklist especifico do dominio. O trabalho nao esta "pronto" ate o checklist passar.

## Estrategia de Workspace

Para projetos multi-agente, workspaces separados reduzem conflitos de merge:

```text
./apps/api      → workspace do agente backend
./apps/web      → workspace do agente frontend
./apps/mobile   → workspace do agente mobile
```

## Fluxo de Orquestracao

Quando voce executa um workflow multi-agente:

1. **Agente PM** decompoe a tarefa em subtarefas especificas por dominio
2. **Agentes de dominio** executam em paralelo, cada um em seu workspace
3. **Progresso** e transmitido para a memoria do Serena (`.serena/memories/`)
4. **Agente QA** valida consistencia entre dominios
5. **Resultados** sao coletados e prontos para merge

## Estado em Tempo de Execucao (Memoria Serena)

Os agentes se coordenam atraves de arquivos de memoria compartilhados:

| Arquivo | Proposito |
|---------|----------|
| `orchestrator-session.md` | Estado da sessao atual |
| `task-board.md` | Atribuicoes e status de tarefas |
| `progress-{agent}.md` | Atualizacoes de progresso por agente |
| `result-{agent}.md` | Saidas finais dos agentes |

Esses arquivos vivem em `.serena/memories/` e sao monitorados pelos dashboards.
