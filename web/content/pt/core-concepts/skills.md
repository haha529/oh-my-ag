---
title: Skills
description: Como a arquitetura de skills em duas camadas mantem os agentes inteligentes sem desperdicar tokens.
---

# Skills

Skills sao o que tornam cada agente um especialista. Sao conhecimento estruturado -- nao apenas prompts, mas protocolos de execucao, templates de codigo, playbooks de erros e checklists de qualidade.

## O Design em Duas Camadas

Aqui esta a parte inteligente: skills nao carregam tudo de uma vez. Elas usam divulgacao progressiva para economizar ~75% de tokens.

### Camada 1: SKILL.md (~800 bytes)

Sempre carregado. Contem:
- Identidade e papel do agente
- Quando ativar (condicoes de roteamento)
- Regras e restricoes principais
- O que NAO fazer

### Camada 2: resources/ (carregado sob demanda)

Carregado apenas quando o agente esta de fato trabalhando. Contem o conteudo aprofundado:

| Recurso | O Que Faz |
|---------|----------|
| `execution-protocol.md` | Workflow passo a passo: Analisar → Planejar → Implementar → Verificar |
| `tech-stack.md` | Especificacoes detalhadas de tecnologia e versoes |
| `error-playbook.md` | O que fazer quando as coisas dao errado (com escalacao "3 strikes") |
| `checklist.md` | Verificacoes de qualidade especificas do dominio |
| `snippets.md` | Padroes de codigo prontos para uso |
| `examples/` | Exemplos de entrada/saida few-shot |

### Como Isso Se Parece

```
.agents/skills/oma-frontend/
├── SKILL.md                          ← Sempre carregado (~800 bytes)
└── resources/
    ├── execution-protocol.md         ← Sob demanda
    ├── tech-stack.md
    ├── tailwind-rules.md
    ├── component-template.tsx
    ├── snippets.md
    ├── error-playbook.md
    ├── checklist.md
    └── examples/
```

## Recursos Compartilhados

Todos os agentes compartilham fundamentos comuns de `.agents/skills/_shared/`:

| Recurso | Proposito |
|---------|----------|
| `skill-routing.md` | Mapeia tarefas para o agente correto |
| `context-loading.md` | Quais recursos carregar para cada tipo de tarefa |
| `prompt-structure.md` | Objetivo → Contexto → Restricoes → Pronto Quando |
| `clarification-protocol.md` | Quando perguntar vs. apenas assumir |
| `context-budget.md` | Leitura de arquivos eficiente em tokens por tier de modelo |
| `difficulty-guide.md` | Avaliacao de tarefa Simples / Media / Complexa |
| `reasoning-templates.md` | Templates de raciocinio estruturado para preencher |
| `quality-principles.md` | Padroes universais de qualidade |
| `vendor-detection.md` | Detectar qual IDE/CLI esta rodando |

## Recursos Condicionais

Alguns recursos carregam apenas quando ativados por condicoes especificas:

| Recurso | Quando Carrega |
|---------|---------------|
| `quality-score.md` | Avaliacao de qualidade solicitada |
| `experiment-ledger.md` | Tentando uma abordagem experimental |
| `exploration-loop.md` | Exploracao iterativa em andamento |

## Execucao Especifica por Vendor

Cada CLI suportada tem seu proprio protocolo de execucao em `.agents/skills/_shared/runtime/execution-protocols/`:
- `claude.md` -- Padroes especificos do Claude
- `gemini.md` -- Padroes especificos do Gemini
- `codex.md` -- Padroes especificos do Codex
- `qwen.md` -- Padroes especificos do Qwen

## Por Que Isso Importa

Sem divulgacao progressiva, carregar 5 agentes consumiria toda sua janela de contexto antes de qualquer trabalho comecar. Com ela, voce tem carregamento inicial leve e execucao profunda quando necessario.
