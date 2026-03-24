---
title: Introduction
description: Ce qu'est oh-my-agent et pourquoi vous voudriez une equipe d'agents IA travaillant ensemble.
---

# Introduction

Vous avez deja souhaite que votre assistant IA ait des collegues ? C'est exactement ce que fait oh-my-agent.

Au lieu qu'une seule IA fasse tout (et se perde en chemin), oh-my-agent repartit le travail entre des **agents specialises** — un expert frontend, un expert backend, un reviseur QA, un planificateur PM, et plus encore. Chaque agent connait son domaine en profondeur et dispose de ses propres outils, checklists et guides d'erreurs.

## Ce Que Vous Obtenez Concretement

- **14 agents specialises** — chacun modele d'apres un role reel d'equipe d'ingenierie
- **Commandes slash** comme `/plan`, `/coordinate`, `/review` qui declenchent des workflows structures
- **Detection automatique** — decrivez simplement ce que vous voulez en langage naturel, et le bon workflow s'active (en 11 langues !)
- **Execution parallele** — lancez plusieurs agents travaillant simultanement sur differentes parties
- **Dashboards en temps reel** — terminal et web UI pour surveiller ce que font vos agents
- **Fonctionne partout** — Antigravity, Claude Code, Cursor, Gemini CLI, Codex CLI, OpenCode, et plus

## Decouvrez Votre Equipe

| Agent | Ce Qu'il Fait |
|-------|---------------|
| **oma-brainstorm** | Explore des idees avant de s'engager a construire quoi que ce soit |
| **oma-pm** | Decompose les exigences, planifie les taches, definit les contrats d'API |
| **oma-frontend** | Construit des UI React/Next.js avec TypeScript et Tailwind CSS |
| **oma-backend** | Cree des APIs en Python, Node.js ou Rust |
| **oma-db** | Concoit des schemas de base de donnees, gere les migrations, optimise les requetes |
| **oma-mobile** | Construit des apps multiplateformes avec Flutter |
| **oma-design** | Cree des systemes de design avec tokens, accessibilite et regles responsives |
| **oma-qa** | Revise la securite (OWASP), les performances et l'accessibilite |
| **oma-debug** | Trouve les causes racines, ecrit les corrections et les tests de regression |
| **oma-tf-infra** | Provisionne l'infrastructure cloud avec Terraform |
| **oma-dev-workflow** | Automatise le CI/CD, les releases et les taches monorepo |
| **oma-translator** | Traduit le contenu naturellement entre les langues |
| **oma-orchestrator** | Execute plusieurs agents en parallele via CLI |
| **oma-commit** | Cree des commits conventionnels propres |

## Comment Ca Marche (La Version 30 Secondes)

1. Vous decrivez ce que vous voulez construire
2. oh-my-agent determine quels agents sont necessaires
3. Les agents executent avec leurs connaissances specialisees
4. Des portes de qualite verifient le travail avant la fin
5. Vous obtenez du code pret pour la production, pas juste des suggestions

## L'Idee Cle

Tout vit dans `.agents/` — un seul repertoire portable dans votre projet. Skills, workflows, configs, tout. Changez d'IDE quand vous voulez. Votre configuration d'agents voyage avec votre code.

## Et Ensuite ?

- **[Installation](./installation)** — Soyez operationnel en 60 secondes
- **[Guide d'Utilisation](/guide/usage)** — Voyez des exemples concrets d'agents en action
- **[Workflows](/core-concepts/workflows)** — Decouvrez les commandes slash
