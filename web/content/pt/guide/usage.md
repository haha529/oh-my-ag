---
title: Guia de Uso
description: Exemplos do mundo real mostrando como usar o oh-my-agent -- de tarefas simples a orquestracao multi-agente completa.
---

# Como Usar o oh-my-agent

> Nao sabe por onde comecar? Digite `/coordinate` seguido do que voce quer construir.

## Inicio Rapido

1. Abra seu projeto em uma IDE com IA (Claude Code, Gemini, Cursor, etc.)
2. As skills sao auto-detectadas de `.agents/skills/`
3. Comece a conversar -- descreva o que voce quer

So isso. O oh-my-agent cuida do resto.

---

## Exemplo 1: Tarefa Simples Unica

**Voce digita:**
```
"Crie um componente de formulario de login com campos de email e senha usando Tailwind CSS"
```

**O que acontece:**
- A skill `oma-frontend` e ativada
- Carrega seu protocolo de execucao e recursos de tech-stack sob demanda
- Voce recebe um componente React com TypeScript, Tailwind, validacao de formulario e testes

Sem comandos slash necessarios. Apenas descreva o que voce quer.

## Exemplo 2: Projeto Multi-Dominio

**Voce digita:**
```
"Construa um app de TODO com autenticacao de usuario"
```

**O que acontece:**

1. A deteccao de palavras-chave ve que e multi-dominio → sugere `/coordinate`
2. **Agente PM** planeja o trabalho: API de auth, schema do banco, UI frontend, escopo de QA
3. **Voce inicia os agentes:**
   ```bash
   oma agent:spawn backend "JWT authentication API" session-01 -w ./apps/api &
   oma agent:spawn frontend "Login and TODO UI" session-01 -w ./apps/web &
   wait
   ```
4. **Agentes trabalham em paralelo** -- cada um em seu proprio workspace
5. **Agente QA revisa** -- auditoria de seguranca, verificacao de integracao
6. **Voce itera** -- reinicie agentes com refinamentos se necessario

## Exemplo 3: Correcao de Bug

**Voce digita:**
```
"Tem um bug -- clicar em login mostra 'Cannot read property map of undefined'"
```

**O que acontece:**

1. `oma-debug` ativa automaticamente (palavra-chave: "bug")
2. Causa raiz identificada -- componente faz map sobre `todos` antes dos dados carregarem
3. Correcao aplicada -- estados de loading e verificacoes de null
4. Teste de regressao escrito
5. Padroes similares encontrados e corrigidos proativamente em 3 outros componentes

## Exemplo 4: Design System

**Voce digita:**
```
"Design uma landing page premium dark para meu produto SaaS"
```

**O que acontece:**

1. `oma-design` ativa (palavra-chave: "design", "landing page")
2. Coleta contexto -- publico, marca, direcao estetica
3. Propoe 2-3 direcoes de design com opcoes de cor, tipografia e layout
4. Gera `DESIGN.md` com tokens, padroes de componentes e regras de acessibilidade
5. Executa auditoria -- responsivo, WCAG, heuristicas de Nielsen
6. Pronto para o `oma-frontend` implementar

## Exemplo 5: Execucao Paralela via CLI

```bash
# Agente unico
oma agent:spawn backend "Implement JWT auth API" session-01

# Multiplos agentes em paralelo
oma agent:spawn backend "Auth API + DB migration" session-01 -w ./apps/api &
oma agent:spawn frontend "Login form + error states" session-01 -w ./apps/web &
oma agent:spawn mobile "Auth screens + biometrics" session-01 -w ./apps/mobile &
wait

# Monitorar em tempo real
oma dashboard        # UI no terminal
oma dashboard:web    # UI web em http://localhost:9847
```

---

## Comandos de Workflow

Digite estes na sua IDE de IA para ativar processos estruturados:

| Comando | O Que Faz | Quando Usar |
|---------|----------|-------------|
| `/brainstorm` | Ideacao e exploracao livre | Antes de se comprometer com uma abordagem |
| `/plan` | Decomposicao PM de tarefas → `.agents/plan.json` | Antes de iniciar qualquer funcionalidade complexa |
| `/exec-plan` | Executar um plano existente passo a passo | Apos `/plan` |
| `/coordinate` | Coordenacao multi-dominio passo a passo | Funcionalidades que abrangem multiplos agentes |
| `/orchestrate` | Execucao automatizada de agentes em paralelo | Grandes projetos, maximo paralelismo |
| `/ultrawork` | Workflow de qualidade em 5 fases (11 portoes de revisao) | Entrega com qualidade maxima |
| `/review` | Auditoria de seguranca + performance + acessibilidade | Antes de fazer merge |
| `/debug` | Debugging estruturado de causa raiz | Investigando bugs |
| `/design` | Workflow de design em 7 fases → `DESIGN.md` | Construindo design systems |
| `/commit` | Commit convencional com analise de type/scope | Commitando alteracoes |
| `/setup` | Configuracao do projeto | Configuracao inicial |
| `/tools` | Gerenciamento de servidores MCP | Adicionando ferramentas externas |
| `/stack-set` | Configuracao de tech stack | Definindo preferencias de linguagem/framework |
| `/deepinit` | Inicializacao completa do projeto | Configurando em um codebase existente |

---

## Auto-Deteccao (Sem Comandos Slash)

O oh-my-agent detecta palavras-chave em 11 idiomas e ativa workflows automaticamente:

| Voce Diz | Workflow Que Ativa |
|----------|-------------------|
| "plan the auth feature" | `/plan` |
| "버그 수정해줘" | `/debug` |
| "do everything in parallel" | `/orchestrate` |
| "レビューして" | `/review` |
| "diseña la página" | `/design` |
| "brainstorm some ideas" | `/brainstorm` |

Perguntas como "what is orchestrate?" sao filtradas -- nao ativarao workflows acidentalmente.

---

## Skills Disponiveis

| Skill | Melhor Para | Saida |
|-------|-----------|-------|
| oma-pm | "planeje isso", "decomponha" | `.agents/plan.json` |
| oma-frontend | UI, componentes, estilizacao | Componentes React, testes |
| oma-backend | APIs, bancos de dados, auth | Endpoints, modelos, testes |
| oma-db | Schema, ERD, migracoes | Design de schema, otimizacao de queries |
| oma-mobile | Apps mobile | Telas Flutter, gerenciamento de estado |
| oma-design | UI/UX, design systems | `DESIGN.md` com tokens |
| oma-brainstorm | Ideacao, exploracao | Documento de design |
| oma-qa | Seguranca, performance, a11y | Relatorio QA com correcoes priorizadas |
| oma-debug | Bugs, erros, crashes | Codigo corrigido + testes de regressao |
| oma-tf-infra | Infraestrutura cloud | Modulos Terraform |
| oma-dev-workflow | CI/CD, automacao | Configs de pipeline |
| oma-translator | Traducao | Conteudo multilingual natural |
| oma-orchestrator | Execucao paralela | Resultados dos agentes |
| oma-commit | Commits Git | Commits convencionais |

---

## Dashboards

### Dashboard no Terminal

```bash
oma dashboard
```

Tabela ao vivo mostrando status da sessao, estados dos agentes, turnos e atividade mais recente. Observa `.serena/memories/` para atualizacoes em tempo real.

### Dashboard Web

```bash
oma dashboard:web
# → http://localhost:9847
```

Recursos:
- Atualizacoes em tempo real via WebSocket
- Reconexao automatica em quedas de conexao
- Status da sessao com indicadores coloridos de agentes
- Log de atividade de arquivos de progresso e resultado

### Layout Recomendado

Use 3 terminais:
1. Dashboard (`oma dashboard`)
2. Comandos de spawn de agentes
3. Logs de teste/build

---

## Dicas

1. **Seja especifico** -- "Construa um app TODO com JWT auth, frontend React, backend Express" e melhor que "faca um app"
2. **Use workspaces** -- `-w ./apps/api` evita que agentes pisem uns nos outros
3. **Trave contratos primeiro** -- execute `/plan` antes de iniciar agentes em paralelo
4. **Monitore ativamente** -- dashboards pegam problemas antes da hora do merge
5. **Itere com re-spawns** -- refine os prompts dos agentes em vez de comecar do zero
6. **Comece com `/coordinate`** -- quando nao tiver certeza de qual workflow usar

---

## Solucao de Problemas

| Problema | Solucao |
|----------|--------|
| Skills nao detectadas na IDE | Verifique se `.agents/skills/` existe com arquivos `SKILL.md`, reinicie a IDE |
| CLI nao encontrada | `which gemini` / `which claude` -- instale as que faltam |
| Agentes produzindo codigo conflitante | Use workspaces separados (`-w`), revise saidas, reinicie com correcoes |
| Dashboard mostra "No agents detected" | Agentes ainda nao escreveram em `.serena/memories/` -- aguarde ou verifique o session ID |
| Dashboard web nao inicia | Execute `bun install` primeiro |
| Relatorio QA tem 50+ problemas | Foque em CRITICAL/HIGH primeiro, documente o resto para depois |

---

Para integracao em projetos existentes, veja o [Guia de Integracao](./integration).
