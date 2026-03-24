---
title: "Caso de Uso: Skill Unica"
description: Quando voce so precisa de um agente para uma tarefa focada -- o caminho rapido.
---

# Caso de Uso: Skill Unica

## Quando Usar Isso

Use quando sua tarefa tem escopo restrito e pertence a um unico dominio:

- Um componente de UI
- Um endpoint de API
- Um bug em uma camada
- Uma refatoracao em um modulo

Se a tarefa precisa de coordenacao entre dominios (API + UI + QA), mude para [Projeto Multi-Agente](./multi-agent-project).

## Antes de Fazer o Prompt

Checklist rapido:

1. **Qual e a saida?** -- arquivo ou comportamento especifico
2. **Qual stack?** -- framework, linguagem, versoes
3. **O que e "pronto"?** -- criterios de aceitacao
4. **Quais testes?** -- casos criticos a cobrir

## Template de Prompt

```text
Build <specific artifact> using <stack>.
Constraints: <style/perf/security constraints>.
Acceptance criteria:
1) ...
2) ...
Add tests for: <critical cases>.
```

## Exemplo Real

```text
Create a login form component in React + TypeScript + Tailwind CSS.
Constraints: accessible labels, client-side validation, no external form library.
Acceptance criteria:
1) email and password validation messages
2) disabled submit while invalid
3) keyboard and screen-reader friendly
Add unit tests for valid/invalid submit paths.
```

## O Que Acontece

1. A skill correta ativa automaticamente baseada no seu prompt
2. O agente declara suas suposicoes (charter preflight)
3. Voce confirma ou ajusta
4. O agente escreve codigo e testes
5. Voce executa verificacao local

## Antes de Fazer Merge

Verifique que:
- O comportamento corresponde aos seus criterios de aceitacao
- Os testes cobrem caminho feliz e casos de borda importantes
- Nenhuma alteracao de arquivo nao relacionada se infiltrou
- Modulos compartilhados nao estao quebrados

## Quando Escalar

Mude para fluxo multi-agente quando:
- Trabalho de UI precisa de um novo contrato de API
- Uma correcao se propaga entre camadas
- O escopo cresce alem de um dominio apos a primeira iteracao
