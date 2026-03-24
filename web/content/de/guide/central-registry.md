---
title: Zentrales Register
description: Verwende oh-my-agent als versioniertes Register, um mehrere Projekte synchron zu halten.
---

# Zentrales Register fuer Multi-Repo-Setup

Hast du mehrere Projekte, die oh-my-agent nutzen? Du kannst dieses Repo als **zentrales Register** behandeln — versioniere deine Skills, und alle Verbraucher-Projekte bleiben synchron.

## Wie Es Funktioniert

```text
┌─────────────────────────────────────────────────────────┐
│  Zentrales Register (oh-my-agent Repo)                   │
│  • release-please fuer automatische Versionierung        │
│  • CHANGELOG.md Auto-Generierung                         │
│  • prompt-manifest.json (Versionen + Checksums)          │
│  • agent-skills.tar.gz Release-Artefakt                  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  Dein Projekt                                            │
│  • .agent-registry.yml fixiert die Version               │
│  • GitHub Action erkennt neue Versionen → oeffnet PR     │
│  • Pruefen und mergen zum Aktualisieren                  │
└─────────────────────────────────────────────────────────┘
```

## Fuer Register-Maintainer

Releases werden automatisiert via [release-please](https://github.com/googleapis/release-please):

1. Verwende Conventional Commits (`feat:`, `fix:`, `chore:`)
2. Push auf `main` → Release-PR wird erstellt/aktualisiert
3. Merge den Release-PR → GitHub Release veroeffentlicht mit:
   - `CHANGELOG.md`
   - `prompt-manifest.json` (Dateiliste + SHA256-Checksums)
   - `agent-skills.tar.gz` (komprimiertes `.agents/`)

## Fuer Verbraucher-Projekte

Kopiere die Templates in dein Projekt:

```bash
cp docs/consumer-templates/.agent-registry.yml your-project/
cp docs/consumer-templates/check-registry-updates.yml your-project/.github/workflows/
cp docs/consumer-templates/sync-agent-registry.yml your-project/.github/workflows/
```

Fixiere deine Version:

```yaml
# .agent-registry.yml
registry:
  repo: first-fluke/oh-my-agent
  version: "4.7.0"
```

Die Workflows:
- `check-registry-updates.yml` — Prueft auf neue Versionen, oeffnet einen PR
- `sync-agent-registry.yml` — Synchronisiert `.agents/`, wenn du die fixierte Version aktualisierst

**Auto-Merge ist absichtlich deaktiviert.** Alle Updates bekommen eine menschliche Pruefung.

## Zentrales Register vs. GitHub Action

| | GitHub Action | Zentrales Register |
|:--|:--:|:--:|
| Setup-Aufwand | 1 Workflow-Datei | 3 Dateien |
| Update-Methode | `oma update` CLI | Tarball-Download |
| Versionskontrolle | Immer aktuellste | Explizites Pinning |
| Am Besten fuer | Die meisten Projekte | Strikte Versionskontrolle |

Die meisten Teams sollten den [GitHub Action](./automated-updates)-Ansatz verwenden. Verwende das Zentrale Register, wenn du striktes Version-Pinning brauchst oder keine Drittanbieter-Actions nutzen kannst.
