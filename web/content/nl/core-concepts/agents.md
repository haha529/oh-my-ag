---
title: Agents
description: Hoe agents werken — rollen, categorieën, charter preflight en de orkestratieflow.
---

# Agents

Agents in oh-my-agent zijn geen generieke chatbots. Elk is gemodelleerd naar een specifieke engineering-teamrol met gedefinieerd bereik, tools en kwaliteitsstandaarden.

## Agent-Categorieën

Zie ze als je engineering-organisatie:

| Categorie | Agents | Wat Ze Afhandelen |
|-----------|--------|------------------|
| **Ideevorming** | oma-brainstorm | Ideeën verkennen voordat je code schrijft |
| **Planning** | oma-pm | Requirements, taakontleding, API-contracten |
| **Implementatie** | oma-frontend, oma-backend, oma-mobile, oma-db | Het daadwerkelijke coderen |
| **Design** | oma-design | Design systems, tokens, UI/UX-patronen |
| **Infrastructuur** | oma-tf-infra | Cloud-provisioning met Terraform |
| **DevOps** | oma-dev-workflow | CI/CD, migraties, releases |
| **Kwaliteit** | oma-qa, oma-debug | Reviews, beveiligingsaudits, bugfixes |
| **Lokalisatie** | oma-translator | Natuurlijke meertalige vertaling |
| **Coördinatie** | oma-orchestrator, oma-coordination | Agents samen uitvoeren en synchroniseren |
| **Git** | oma-commit | Schone conventional commits |

## Hoe Agents Uitvoeren

Elke agent volgt dezelfde discipline:

### 1. Charter Preflight

Voordat ze code schrijven, geven agents een `CHARTER_CHECK` af met:
- In welk domein ze werken
- Welke beperkingen gelden
- Welke aannames ze maken
- Hoe "klaar" eruitziet

Dit vangt scope creep en misverstanden vroeg op.

### 2. Twee-Laags Laden

Agents zijn token-efficiënt by design:
- **Laag 1** (`SKILL.md`, ~800 bytes): Identiteit en routeringsregels — altijd geladen
- **Laag 2** (`resources/`): Uitvoeringsprotocollen, fout-playbooks, codesjablonen — alleen geladen wanneer nodig

Dit bespaart ~75% tokens vergeleken met alles vooraf laden.

### 3. Afgebakende Uitvoering

Een frontend-agent raakt geen backend-code aan. Een DB-agent wijzigt geen UI-componenten. Elke agent blijft in zijn baan.

### 4. Kwaliteitspoort

Elke agent heeft een domeinspecifieke checklist. Werk is pas "klaar" als de checklist is doorlopen.

## Workspace-Strategie

Voor multi-agent projecten verminderen aparte workspaces merge-conflicten:

```text
./apps/api      → workspace backend-agent
./apps/web      → workspace frontend-agent
./apps/mobile   → workspace mobile-agent
```

## Orkestratieflow

Wanneer je een multi-agent workflow uitvoert:

1. **PM-agent** ontleedt de taak in domeinspecifieke subtaken
2. **Domein-agents** voeren parallel uit, elk in hun workspace
3. **Voortgang** streamt naar Serena-geheugen (`.serena/memories/`)
4. **QA-agent** valideert cross-domein consistentie
5. **Resultaten** worden verzameld en zijn klaar om te mergen

## Runtime State (Serena-Geheugen)

Agents coördineren via gedeelde geheugenbestanden:

| Bestand | Doel |
|---------|-----|
| `orchestrator-session.md` | Huidige sessiestatus |
| `task-board.md` | Taaktoewijzingen en status |
| `progress-{agent}.md` | Voortgangsupdates per agent |
| `result-{agent}.md` | Eindresultaten van agents |

Deze bevinden zich in `.serena/memories/` en worden gemonitord door dashboards.
