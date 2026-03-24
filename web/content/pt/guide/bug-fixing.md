---
title: "Caso de Uso: Correcao de Bugs"
description: Debugging estruturado -- de reproduzir o problema a escrever testes de regressao.
---

# Caso de Uso: Correcao de Bugs

## Comece com um Bom Relatorio

Quanto melhor seu relatorio de bug, mais rapido a correcao:

```text
Symptom: Login button throws TypeError
Environment: Chrome 130, macOS, production build
Steps to reproduce:
  1. Go to /login
  2. Enter valid credentials
  3. Click "Sign In"
Expected: Redirect to dashboard
Actual: White screen, console shows "Cannot read property 'map' of undefined"
Logs: [paste relevant logs]
```

## Primeiro a Triagem

| Severidade | O Que Significa | Resposta |
|-----------|----------------|----------|
| **P0** | Perda de dados, bypass de auth, queda em producao | Largue tudo, envolva QA/seguranca |
| **P1** | Fluxo principal do usuario quebrado | Corrigir no sprint atual |
| **P2** | Degradado mas tem workaround | Agendar correcao |
| **P3** | Menor, nao bloqueante | Backlog |

## O Loop de Debug

1. **Reproduzir** -- exatamente, em um ambiente minimo
2. **Isolar** -- encontrar a causa raiz (nao apenas o sintoma)
3. **Corrigir** -- menor alteracao segura
4. **Testar** -- teste de regressao para o caminho que falhou
5. **Escanear** -- verificar codigo adjacente para o mesmo padrao

## Template de Prompt

```text
Bug: Login throws "Cannot read property 'map' of undefined"
Repro: Click sign-in with valid credentials
Scope: src/components/auth/*, src/hooks/useAuth.ts
Expected: Redirect to dashboard
Need:
1) root cause analysis
2) minimal fix
3) regression tests
4) scan for similar patterns
```

## Quando Escalar

Envolva QA ou seguranca quando o bug toca:

- Autenticacao / sessao / refresh de token
- Limites de permissao
- Pagamento / consistencia de transacao
- Performance sob carga

## Apos a Correcao

Verifique:
- O repro original nao falha mais
- Nenhum erro novo em fluxos relacionados
- Testes falham antes da correcao, passam depois
- Caminho de rollback esta claro se necessario
