---
title: Centraal Register
description: Gebruik oh-my-agent als een versiebeheerd register om meerdere projecten gesynchroniseerd te houden.
---

# Centraal Register voor Multi-Repo Setup

Meerdere projecten die oh-my-agent gebruiken? Je kunt deze repo behandelen als een **centraal register** — versiebeheer je skills, en alle consumerende projecten blijven gesynchroniseerd.

## Hoe Het Werkt

```text
┌─────────────────────────────────────────────────────────┐
│  Centraal Register (oh-my-agent repo)                   │
│  • release-please voor automatische versiebeheer        │
│  • CHANGELOG.md auto-generatie                          │
│  • prompt-manifest.json (versies + checksums)           │
│  • agent-skills.tar.gz release-artefact                 │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  Jouw Project                                           │
│  • .agent-registry.yml pint versie                      │
│  • GitHub Action detecteert nieuwe versies → opent PR   │
│  • Review en merge om te updaten                        │
└─────────────────────────────────────────────────────────┘
```

## Voor Register-Beheerders

Releases zijn geautomatiseerd via [release-please](https://github.com/googleapis/release-please):

1. Gebruik Conventional Commits (`feat:`, `fix:`, `chore:`)
2. Push naar `main` → Release PR wordt aangemaakt/bijgewerkt
3. Merge de Release PR → GitHub Release gepubliceerd met:
   - `CHANGELOG.md`
   - `prompt-manifest.json` (bestandenlijst + SHA256 checksums)
   - `agent-skills.tar.gz` (gecomprimeerde `.agents/`)

## Voor Consumerende Projecten

Kopieer de templates naar je project:

```bash
cp docs/consumer-templates/.agent-registry.yml your-project/
cp docs/consumer-templates/check-registry-updates.yml your-project/.github/workflows/
cp docs/consumer-templates/sync-agent-registry.yml your-project/.github/workflows/
```

Pin je versie:

```yaml
# .agent-registry.yml
registry:
  repo: first-fluke/oh-my-agent
  version: "4.7.0"
```

De workflows:
- `check-registry-updates.yml` — Controleert op nieuwe versies, opent een PR
- `sync-agent-registry.yml` — Synchroniseert `.agents/` wanneer je de gepinde versie bijwerkt

**Auto-merge is bewust uitgeschakeld.** Alle updates krijgen menselijke review.

## Centraal Register vs. GitHub Action

| | GitHub Action | Centraal Register |
|:--|:--:|:--:|
| Setup-inspanning | 1 workflow-bestand | 3 bestanden |
| Update-methode | `oma update` CLI | Tarball-download |
| Versiebeheer | Altijd de nieuwste | Expliciete pin |
| Het beste voor | De meeste projecten | Strikt versiebeheer |

De meeste teams zouden de [GitHub Action](./automated-updates) benadering moeten gebruiken. Gebruik het Centraal Register als je strikte versie-pinning nodig hebt of geen third-party actions kunt gebruiken.
