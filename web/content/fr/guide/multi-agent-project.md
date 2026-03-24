---
title: "Cas d'Usage : Projet Multi-Agent"
description: Comment coordonner plusieurs agents pour des fonctionnalites couvrant frontend, backend, base de donnees et QA.
---

# Cas d'Usage : Projet Multi-Agent

## Quand L'Utiliser

Votre fonctionnalite couvre plusieurs domaines — API backend + UI frontend + schema de base de donnees + revue QA. Un seul agent ne peut pas tout gerer, et vous voulez qu'ils travaillent en parallele.

## La Sequence de Coordination

```text
/plan → /coordinate → agent:spawn (parallele) → /review → merge
```

1. **`/plan`** — L'Agent PM decompose la fonctionnalite en taches par domaine
2. **`/coordinate`** — Definit l'ordre d'execution et les responsabilites
3. **`agent:spawn`** — Les agents s'executent en parallele
4. **`/review`** — QA verifie la coherence inter-domaines

## Strategie de Session

Utilisez un session ID par fonctionnalite :

```text
session-auth-v2
```

Attribuez des workspaces par domaine :

| Agent | Workspace |
|-------|-----------|
| backend | `./apps/api` |
| frontend | `./apps/web` |
| mobile | `./apps/mobile` |

## Exemple de Spawn

```bash
oma agent:spawn backend "Implement JWT auth API + refresh flow" session-auth-v2 -w ./apps/api &
oma agent:spawn frontend "Build login + refresh UX with error states" session-auth-v2 -w ./apps/web &
oma agent:spawn qa "Review auth risks, test matrix, and regression scope" session-auth-v2 &
wait
```

## La Regle Contrats D'Abord

Avant que les agents commencent a coder en parallele, **verrouillez vos contrats d'API** :

- Schemas request/response
- Codes d'erreur et messages
- Hypotheses du cycle de vie auth/session

Si les contrats changent en cours de route, mettez en pause les agents en aval et relancez leurs prompts avec les contrats mis a jour.

## Portes de Merge

Ne mergez pas tant que :

1. Les tests au niveau du domaine passent
2. Les points d'integration correspondent aux contrats convenus
3. Les problemes high/critical de QA sont resolus (ou explicitement acceptes)
4. Le changelog est mis a jour si le comportement visible a change

## Ce Qu'il Ne Faut PAS Faire

- Partager un workspace entre tous les agents (cauchemar de conflits de merge)
- Changer les contrats sans prevenir les autres agents
- Merger backend et frontend independamment avant verification de compatibilite

## Quand C'est Termine

- Toutes les taches planifiees sont terminees dans tous les domaines
- L'integration inter-domaines est validee
- L'approbation QA est enregistree
