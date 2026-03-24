---
title: Workflows
description: Comandos slash que orquestram processos de multiplas etapas -- planejamento, revisao, debugging e mais.
---

# Workflows

Workflows sao as sequencias estruturadas que fazem o oh-my-agent ser mais do que uma colecao de prompts. Digite um comando slash e um processo de multiplas etapas comeca com fases definidas, portoes de qualidade e criterios de conclusao.

## Todos os Comandos de Workflow

### Grandes Workflows de Orquestracao

Esses sao **persistentes** -- continuam executando ate que todas as tarefas sejam concluidas e nao podem ser interrompidos acidentalmente.

| Comando | O Que Faz |
|---------|----------|
| `/orchestrate` | Inicia agentes em paralelo via CLI, coordena atraves de memoria, monitora progresso, executa verificacao. O modo "faz tudo". |
| `/coordinate` | Coordenacao multi-dominio passo a passo. O PM planeja primeiro, depois os agentes executam com revisao cruzada e loops de QA. |
| `/ultrawork` | O workflow obcecado por qualidade. 5 fases, 11 etapas de revisao de 17 no total. Planejar → Implementar → Verificar → Refinar → Entregar. |

### Planejamento & Exploracao

| Comando | O Que Faz |
|---------|----------|
| `/plan` | Decomposicao de tarefas dirigida pelo PM. Gera um plano estruturado em `.agents/plan.json`. |
| `/exec-plan` | Pega o plano do `/plan` e executa passo a passo. |
| `/brainstorm` | Ideacao livre. Explore abordagens antes de se comprometer com a implementacao. |
| `/deepinit` | Inicializacao completa do projeto -- analisa o codebase, configura convencoes, configura ferramentas. |

### Qualidade & Revisao

| Comando | O Que Faz |
|---------|----------|
| `/review` | Revisao QA: seguranca OWASP, performance, acessibilidade. Delega ao agente qa-reviewer. |
| `/debug` | Debugging estruturado: reproduzir → diagnosticar → corrigir → teste de regressao. |

### Design

| Comando | O Que Faz |
|---------|----------|
| `/design` | Workflow de design em 7 fases. Cria DESIGN.md com tokens, padroes de componentes, regras de acessibilidade e specs de handoff. |

### Utilitarios

| Comando | O Que Faz |
|---------|----------|
| `/commit` | Analisa suas alteracoes e cria um commit convencional com type/scope adequado. |
| `/setup` | Configuracao interativa do projeto. |
| `/tools` | Gerenciar conexoes de servidores MCP. |
| `/stack-set` | Definir preferencias de tech stack. |

## Nem Sempre Voce Precisa de Comandos Slash

O oh-my-agent detecta palavras-chave na sua linguagem natural e ativa workflows automaticamente. Diga "planeje a funcionalidade de autenticacao" e o workflow de planejamento comeca -- sem precisar de `/plan`.

Isso funciona em **11 idiomas** (Ingles, Coreano, Japones, Chines, Espanhol, Frances, Alemao, Portugues, Russo, Holandes, Polones).

Perguntas como "o que e orchestrate?" sao reconhecidas como informativas e nao ativam nada.

## Skills vs. Workflows

Distincao simples:
- **Skills** = expertise do agente (o que um agente sabe fazer)
- **Workflows** = processos orquestrados (como multiplos agentes trabalham juntos)

Uma skill pode ser "construir um componente React." Um workflow e "planejar a funcionalidade → construir os componentes → revisar a seguranca → commitar o codigo."

## Sequencias Tipicas

### Funcionalidade Rapida
```
/plan → revisar a saida → /exec-plan
```

### Projeto Multi-Dominio Complexo
```
/coordinate → PM planeja → agentes sao iniciados → QA revisa → corrigir problemas → entregar
```

### Entrega de Qualidade Maxima
```
/ultrawork → processo de 5 fases com 11 checkpoints de revisao
```

### Correcao de Bug
```
/debug → reproduzir → causa raiz → corrigir → teste de regressao
```
