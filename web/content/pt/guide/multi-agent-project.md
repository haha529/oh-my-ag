---
title: "Caso de Uso: Projeto Multi-Agente"
description: Como coordenar multiplos agentes para funcionalidades que abrangem frontend, backend, banco de dados e QA.
---

# Caso de Uso: Projeto Multi-Agente

## Quando Usar Isso

Sua funcionalidade abrange multiplos dominios -- API backend + UI frontend + schema de banco de dados + revisao QA. Um agente nao consegue lidar com tudo, e voce quer que trabalhem em paralelo.

## A Sequencia de Coordenacao

```text
/plan → /coordinate → agent:spawn (parallel) → /review → merge
```

1. **`/plan`** -- Agente PM decompoe a funcionalidade em tarefas por dominio
2. **`/coordinate`** -- Define ordem de execucao e propriedade
3. **`agent:spawn`** -- Agentes executam em paralelo
4. **`/review`** -- QA revisa consistencia entre dominios

## Estrategia de Sessao

Use um session ID por funcionalidade:

```text
session-auth-v2
```

Atribua workspaces por dominio:

| Agente | Workspace |
|--------|-----------|
| backend | `./apps/api` |
| frontend | `./apps/web` |
| mobile | `./apps/mobile` |

## Exemplo de Spawn

```bash
oma agent:spawn backend "Implement JWT auth API + refresh flow" session-auth-v2 -w ./apps/api &
oma agent:spawn frontend "Build login + refresh UX with error states" session-auth-v2 -w ./apps/web &
oma agent:spawn qa "Review auth risks, test matrix, and regression scope" session-auth-v2 &
wait
```

## A Regra de Contrato Primeiro

Antes dos agentes comecarem a codar em paralelo, **trave seus contratos de API**:

- Schemas de request/response
- Codigos e mensagens de erro
- Suposicoes de ciclo de vida de auth/sessao

Se os contratos mudarem durante a execucao, pause agentes downstream e reemita seus prompts com contratos atualizados.

## Portoes de Merge

Nao faca merge ate que:

1. Testes a nivel de dominio passem
2. Pontos de integracao correspondam aos contratos acordados
3. Problemas QA high/critical estejam resolvidos (ou explicitamente dispensados)
4. Changelog atualizado se o comportamento visivel externamente mudou

## O Que NAO Fazer

- Compartilhar um workspace entre todos os agentes (pesadelo de conflito de merge)
- Mudar contratos sem avisar outros agentes
- Fazer merge de backend e frontend independentemente antes da verificacao de compatibilidade

## Quando Esta Pronto

- Todas as tarefas planejadas completas em todos os dominios
- Integracao entre dominios validada
- Aprovacao do QA registrada
