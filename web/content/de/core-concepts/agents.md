---
title: Agenten
description: Wie Agenten funktionieren — Rollen, Kategorien, Charter Preflight und der Orchestrierungs-Ablauf.
---

# Agenten

Agenten in oh-my-agent sind keine generischen Chatbots. Jeder ist nach einer bestimmten Engineering-Team-Rolle modelliert, mit definiertem Umfang, Werkzeugen und Qualitaetsstandards.

## Agenten-Kategorien

Stell sie dir als deine Engineering-Organisation vor:

| Kategorie | Agenten | Was Sie Bearbeiten |
|-----------|---------|-------------------|
| **Ideenfindung** | oma-brainstorm | Ideen erkunden, bevor man sich auf Code festlegt |
| **Planung** | oma-pm | Anforderungen, Aufgabenzerlegung, API-Vertraege |
| **Implementierung** | oma-frontend, oma-backend, oma-mobile, oma-db | Die eigentliche Codierung |
| **Design** | oma-design | Design-Systeme, Tokens, UI/UX-Muster |
| **Infrastruktur** | oma-tf-infra | Cloud-Provisionierung mit Terraform |
| **DevOps** | oma-dev-workflow | CI/CD, Migrationen, Releases |
| **Qualitaet** | oma-qa, oma-debug | Reviews, Sicherheitsaudits, Bugfixes |
| **Lokalisierung** | oma-translator | Natuerliche mehrsprachige Uebersetzung |
| **Koordination** | oma-orchestrator, oma-coordination | Agenten gemeinsam ausfuehren und synchronisieren |
| **Git** | oma-commit | Saubere konventionelle Commits |

## Wie Agenten Ausfuehren

Jeder Agent folgt derselben Disziplin:

### 1. Charter Preflight

Bevor irgendein Code geschrieben wird, geben Agenten einen `CHARTER_CHECK` aus, der deklariert:
- In welcher Domaene sie arbeiten
- Welche Einschraenkungen gelten
- Welche Annahmen sie treffen
- Wie "fertig" aussieht

Dies faengt Scope-Creep und Missverstaendnisse frueh ab.

### 2. Zwei-Schichten-Laden

Agenten sind token-effizient by Design:
- **Schicht 1** (`SKILL.md`, ~800 Bytes): Identitaet und Routing-Regeln — immer geladen
- **Schicht 2** (`resources/`): Ausfuehrungsprotokolle, Fehler-Playbooks, Code-Templates — nur bei Bedarf geladen

Das spart ~75% Tokens im Vergleich zum Laden von allem auf einmal.

### 3. Begrenzte Ausfuehrung

Ein Frontend-Agent fasst keinen Backend-Code an. Ein DB-Agent aendert keine UI-Komponenten. Jeder Agent bleibt in seiner Spur.

### 4. Qualitaets-Gate

Jeder Agent hat eine domainspezifische Checkliste. Arbeit ist nicht "fertig", bis die Checkliste bestanden ist.

## Workspace-Strategie

Fuer Multi-Agenten-Projekte reduzieren separate Workspaces Merge-Konflikte:

```text
./apps/api      → Backend-Agent-Workspace
./apps/web      → Frontend-Agent-Workspace
./apps/mobile   → Mobile-Agent-Workspace
```

## Orchestrierungs-Ablauf

Wenn du einen Multi-Agenten-Workflow ausfuehrst:

1. **PM-Agent** zerlegt die Aufgabe in domainspezifische Teilaufgaben
2. **Domain-Agenten** fuehren parallel aus, jeder in seinem Workspace
3. **Fortschritt** fliesst in den Serena-Speicher (`.serena/memories/`)
4. **QA-Agent** validiert die domainuebergreifende Konsistenz
5. **Ergebnisse** werden gesammelt und sind bereit zum Merge

## Laufzeit-Status (Serena Memory)

Agenten koordinieren sich ueber gemeinsame Speicherdateien:

| Datei | Zweck |
|-------|-------|
| `orchestrator-session.md` | Aktueller Sitzungsstatus |
| `task-board.md` | Aufgabenzuweisungen und Status |
| `progress-{agent}.md` | Fortschrittsupdates pro Agent |
| `result-{agent}.md` | Endausgaben des Agenten |

Diese leben in `.serena/memories/` und sind das, was die Dashboards ueberwachen.
