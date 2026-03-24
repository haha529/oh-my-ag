---
title: "Gebruiksscenario: Multi-Agent Project"
description: Hoe meerdere agents te coördineren voor features die frontend, backend, database en QA beslaan.
---

# Gebruiksscenario: Multi-Agent Project

## Wanneer Dit Te Gebruiken

Je feature beslaat meerdere domeinen — backend API + frontend UI + database-schema + QA-review. Eén agent kan het niet allemaal aan, en je wilt dat ze parallel werken.

## De Coördinatiesequentie

```text
/plan → /coordinate → agent:spawn (parallel) → /review → merge
```

1. **`/plan`** — PM-agent ontleedt de feature in domeintaken
2. **`/coordinate`** — Stelt uitvoeringsvolgorde en eigenaarschap in
3. **`agent:spawn`** — Agents voeren parallel uit
4. **`/review`** — QA reviewt cross-domein consistentie

## Sessiestrategie

Gebruik één session ID per feature:

```text
session-auth-v2
```

Wijs workspaces toe per domein:

| Agent | Workspace |
|-------|-----------|
| backend | `./apps/api` |
| frontend | `./apps/web` |
| mobile | `./apps/mobile` |

## Spawn-Voorbeeld

```bash
oma agent:spawn backend "Implement JWT auth API + refresh flow" session-auth-v2 -w ./apps/api &
oma agent:spawn frontend "Build login + refresh UX with error states" session-auth-v2 -w ./apps/web &
oma agent:spawn qa "Review auth risks, test matrix, and regression scope" session-auth-v2 &
wait
```

## De Contract-Eerst Regel

Voordat agents parallel beginnen te coderen, **vergrendel je API-contracten**:

- Request/response-schema's
- Foutcodes en berichten
- Auth/sessie-levenscyclus aannames

Als contracten halverwege veranderen, pauzeer downstream agents en hergeef hun prompts met bijgewerkte contracten.

## Merge-Poorten

Merge niet voordat:

1. Domein-niveau tests slagen
2. Integratiepunten overeenkomen met afgesproken contracten
3. QA high/critical problemen zijn opgelost (of expliciet afgewezen)
4. Changelog bijgewerkt als extern zichtbaar gedrag is veranderd

## Wat NIET Te Doen

- Eén workspace delen over alle agents (merge-conflict nachtmerrie)
- Contracten wijzigen zonder andere agents te informeren
- Backend en frontend onafhankelijk mergen voor compatibiliteitscheck

## Wanneer Het Klaar Is

- Alle geplande taken compleet over alle domeinen
- Cross-domein integratie gevalideerd
- QA-goedkeuring vastgelegd
