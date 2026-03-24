---
title: Registre Central
description: Utilisez oh-my-agent comme un registre versionne pour garder plusieurs projets synchronises.
---

# Registre Central pour Configuration Multi-Repo

Vous avez plusieurs projets utilisant oh-my-agent ? Vous pouvez traiter ce depot comme un **registre central** — versionnez vos skills, et tous les projets consommateurs restent synchronises.

## Comment Ca Marche

```text
┌─────────────────────────────────────────────────────────┐
│  Registre Central (depot oh-my-agent)                    │
│  • release-please pour le versionnage automatique        │
│  • CHANGELOG.md genere automatiquement                   │
│  • prompt-manifest.json (versions + checksums)           │
│  • agent-skills.tar.gz artefact de release               │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  Votre Projet                                            │
│  • .agent-registry.yml fixe la version                   │
│  • GitHub Action detecte les nouvelles versions → ouvre PR│
│  • Revoir et merger pour mettre a jour                   │
└─────────────────────────────────────────────────────────┘
```

## Pour les Mainteneurs du Registre

Les releases sont automatisees via [release-please](https://github.com/googleapis/release-please) :

1. Utilisez les Conventional Commits (`feat:`, `fix:`, `chore:`)
2. Push vers `main` → Le Release PR est cree/mis a jour
3. Mergez le Release PR → GitHub Release publie avec :
   - `CHANGELOG.md`
   - `prompt-manifest.json` (liste de fichiers + checksums SHA256)
   - `agent-skills.tar.gz` (`.agents/` compresse)

## Pour les Projets Consommateurs

Copiez les templates dans votre projet :

```bash
cp docs/consumer-templates/.agent-registry.yml your-project/
cp docs/consumer-templates/check-registry-updates.yml your-project/.github/workflows/
cp docs/consumer-templates/sync-agent-registry.yml your-project/.github/workflows/
```

Fixez votre version :

```yaml
# .agent-registry.yml
registry:
  repo: first-fluke/oh-my-agent
  version: "4.7.0"
```

Les workflows :
- `check-registry-updates.yml` — Cherche les nouvelles versions, ouvre un PR
- `sync-agent-registry.yml` — Synchronise `.agents/` quand vous mettez a jour la version fixee

**L'auto-merge est desactive volontairement.** Toutes les mises a jour passent par une revue humaine.

## Registre Central vs. GitHub Action

| | GitHub Action | Registre Central |
|:--|:--:|:--:|
| Effort de mise en place | 1 fichier workflow | 3 fichiers |
| Methode de mise a jour | CLI `oma update` | Telechargement de tarball |
| Controle de version | Toujours le dernier | Pin explicite |
| Ideal pour | La plupart des projets | Controle strict des versions |

La plupart des equipes devraient utiliser l'approche [GitHub Action](./automated-updates). Utilisez le Registre Central si vous avez besoin d'un version pinning strict ou ne pouvez pas utiliser d'actions tierces.
