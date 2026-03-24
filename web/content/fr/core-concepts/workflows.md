---
title: Workflows
description: Commandes slash qui orchestrent des processus multi-etapes — planification, revue, debogage et plus.
---

# Workflows

Les workflows sont les sequences structurees qui font d'oh-my-agent bien plus qu'une collection de prompts. Tapez une commande slash et un processus multi-etapes demarre avec des phases definies, des portes de qualite et des criteres de completion.

## Toutes les Commandes Workflow

### Grands Workflows d'Orchestration

Ceux-ci sont **persistants** — ils continuent de tourner jusqu'a ce que toutes les taches soient terminees, et ne peuvent pas etre interrompus accidentellement.

| Commande | Ce Qu'elle Fait |
|----------|-----------------|
| `/orchestrate` | Lance des agents en parallele via CLI, coordonne par la memoire, surveille la progression, lance la verification. Le mode "fait tout". |
| `/coordinate` | Coordination multi-domaine etape par etape. Le PM planifie d'abord, puis les agents executent avec revue croisee et boucles QA. |
| `/ultrawork` | Le workflow obsede par la qualite. 5 phases, 11 etapes de revue sur 17 au total. Planifier → Implementer → Verifier → Affiner → Livrer. |

### Planification et Exploration

| Commande | Ce Qu'elle Fait |
|----------|-----------------|
| `/plan` | Decomposition de taches pilotee par le PM. Produit un plan structure dans `.agents/plan.json`. |
| `/exec-plan` | Prend le plan de `/plan` et l'execute etape par etape. |
| `/brainstorm` | Ideation libre. Explorez des approches avant de s'engager dans l'implementation. |
| `/deepinit` | Initialisation complete du projet — analyse le codebase, etablit les conventions, configure les outils. |

### Qualite et Revue

| Commande | Ce Qu'elle Fait |
|----------|-----------------|
| `/review` | Revue QA : securite OWASP, performance, accessibilite. Delegue a l'agent qa-reviewer. |
| `/debug` | Debogage structure : reproduire → diagnostiquer → corriger → test de regression. |

### Design

| Commande | Ce Qu'elle Fait |
|----------|-----------------|
| `/design` | Workflow de design en 7 phases. Cree DESIGN.md avec tokens, patterns de composants, regles d'accessibilite et specs de handoff. |

### Utilitaires

| Commande | Ce Qu'elle Fait |
|----------|-----------------|
| `/commit` | Analyse vos changements et cree un commit conventionnel avec type/scope appropriate. |
| `/setup` | Configuration interactive du projet. |
| `/tools` | Gestion des connexions serveur MCP. |
| `/stack-set` | Definit les preferences de stack technologique. |

## Vous N'Avez Pas Toujours Besoin de Commandes Slash

oh-my-agent detecte des mots-cles dans votre langage naturel et active les workflows automatiquement. Dites "planifie la fonctionnalite d'authentification" et le workflow de plan demarre — pas besoin de `/plan`.

Ceci fonctionne en **11 langues** (anglais, coreen, japonais, chinois, espagnol, francais, allemand, portugais, russe, neerlandais, polonais).

Les questions comme "qu'est-ce qu'orchestrate ?" sont reconnues comme informationnelles et ne declenchent rien.

## Skills vs. Workflows

Distinction simple :
- **Skills** = expertise de l'agent (ce qu'un agent sait faire)
- **Workflows** = processus orchestres (comment plusieurs agents travaillent ensemble)

Un skill pourrait etre "construire un composant React." Un workflow c'est "planifier la fonctionnalite → construire les composants → revoir la securite → commiter le code."

## Sequences Typiques

### Fonctionnalite Rapide
```
/plan → revoir la sortie → /exec-plan
```

### Projet Complexe Multi-Domaine
```
/coordinate → PM planifie → agents lancent → QA revise → corriger les problemes → livrer
```

### Livraison Qualite Maximum
```
/ultrawork → processus en 5 phases avec 11 points de controle
```

### Correction de Bug
```
/debug → reproduire → cause racine → corriger → test de regression
```
