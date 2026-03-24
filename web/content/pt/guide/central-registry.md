---
title: Registro Central
description: Use o oh-my-agent como um registro versionado para manter multiplos projetos sincronizados.
---

# Registro Central para Setup Multi-Repo

Tem multiplos projetos usando oh-my-agent? Voce pode tratar este repositorio como um **registro central** -- versione suas skills e todos os projetos consumidores ficam sincronizados.

## Como Funciona

```text
┌─────────────────────────────────────────────────────────┐
│  Registro Central (repositorio oh-my-agent)             │
│  • release-please para versionamento automatico         │
│  • Geracao automatica de CHANGELOG.md                   │
│  • prompt-manifest.json (versoes + checksums)           │
│  • agent-skills.tar.gz artefato de release              │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  Seu Projeto                                            │
│  • .agent-registry.yml fixa a versao                    │
│  • GitHub Action detecta novas versoes → abre PR        │
│  • Revise e faca merge para atualizar                   │
└─────────────────────────────────────────────────────────┘
```

## Para Mantenedores do Registro

Releases sao automatizados via [release-please](https://github.com/googleapis/release-please):

1. Use Conventional Commits (`feat:`, `fix:`, `chore:`)
2. Push para `main` → Release PR e criado/atualizado
3. Merge do Release PR → GitHub Release publicado com:
   - `CHANGELOG.md`
   - `prompt-manifest.json` (lista de arquivos + checksums SHA256)
   - `agent-skills.tar.gz` (`.agents/` comprimido)

## Para Projetos Consumidores

Copie os templates para seu projeto:

```bash
cp docs/consumer-templates/.agent-registry.yml your-project/
cp docs/consumer-templates/check-registry-updates.yml your-project/.github/workflows/
cp docs/consumer-templates/sync-agent-registry.yml your-project/.github/workflows/
```

Fixe sua versao:

```yaml
# .agent-registry.yml
registry:
  repo: first-fluke/oh-my-agent
  version: "4.7.0"
```

Os workflows:
- `check-registry-updates.yml` -- Verifica novas versoes, abre um PR
- `sync-agent-registry.yml` -- Sincroniza `.agents/` quando voce atualiza a versao fixada

**Auto-merge esta desabilitado de proposito.** Todas as atualizacoes passam por revisao humana.

## Registro Central vs. GitHub Action

| | GitHub Action | Registro Central |
|:--|:--:|:--:|
| Esforco de setup | 1 arquivo de workflow | 3 arquivos |
| Metodo de atualizacao | `oma update` CLI | Download de tarball |
| Controle de versao | Sempre a mais recente | Fixacao explicita |
| Melhor para | Maioria dos projetos | Controle estrito de versao |

A maioria das equipes deve usar a abordagem [GitHub Action](./automated-updates). Use o Registro Central se precisar de fixacao estrita de versao ou nao puder usar actions de terceiros.
