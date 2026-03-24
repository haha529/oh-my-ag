---
title: Agents
description: Comment fonctionnent les agents — roles, categories, charter preflight et le flux d'orchestration.
---

# Agents

Les agents dans oh-my-agent ne sont pas des chatbots generiques. Chacun est modele d'apres un role specifique d'equipe d'ingenierie avec un perimetre, des outils et des standards de qualite definis.

## Categories d'Agents

Pensez-y comme votre organisation d'ingenierie :

| Categorie | Agents | Ce Qu'ils Gerent |
|-----------|--------|-------------------|
| **Ideation** | oma-brainstorm | Explorer des idees avant de s'engager dans le code |
| **Planification** | oma-pm | Exigences, decomposition de taches, contrats d'API |
| **Implementation** | oma-frontend, oma-backend, oma-mobile, oma-db | Le code proprement dit |
| **Design** | oma-design | Systemes de design, tokens, patterns UI/UX |
| **Infrastructure** | oma-tf-infra | Provisionnement cloud avec Terraform |
| **DevOps** | oma-dev-workflow | CI/CD, migrations, releases |
| **Qualite** | oma-qa, oma-debug | Revues, audits de securite, corrections de bugs |
| **Localisation** | oma-translator | Traduction multilingue naturelle |
| **Coordination** | oma-orchestrator, oma-coordination | Executer et synchroniser les agents ensemble |
| **Git** | oma-commit | Commits conventionnels propres |

## Comment Les Agents S'Executent

Chaque agent suit la meme discipline :

### 1. Charter Preflight

Avant d'ecrire le moindre code, les agents emettent un `CHARTER_CHECK` declarant :
- Dans quel domaine ils travaillent
- Quelles contraintes s'appliquent
- Quelles hypotheses ils font
- A quoi ressemble le "termine"

Ceci detecte les depassements de perimetre et les malentendus tot.

### 2. Chargement en Deux Couches

Les agents sont economes en tokens par conception :
- **Couche 1** (`SKILL.md`, ~800 octets) : Identite et regles de routage — toujours charge
- **Couche 2** (`resources/`) : Protocoles d'execution, playbooks d'erreurs, templates de code — charges uniquement quand necessaire

Ceci economise ~75% de tokens par rapport au chargement complet initial.

### 3. Execution Delimitee

Un agent frontend ne touchera pas au code backend. Un agent DB ne modifiera pas les composants UI. Chaque agent reste dans son couloir.

### 4. Porte de Qualite

Chaque agent a un checklist specifique a son domaine. Le travail n'est pas "termine" tant que le checklist n'est pas valide.

## Strategie de Workspace

Pour les projets multi-agents, des workspaces separes reduisent les conflits de merge :

```text
./apps/api      → workspace agent backend
./apps/web      → workspace agent frontend
./apps/mobile   → workspace agent mobile
```

## Flux d'Orchestration

Quand vous lancez un workflow multi-agent :

1. **Agent PM** decompose la tache en sous-taches specifiques par domaine
2. **Agents de domaine** s'executent en parallele, chacun dans son workspace
3. **La progression** est diffusee dans la memoire Serena (`.serena/memories/`)
4. **Agent QA** valide la coherence inter-domaines
5. **Les resultats** sont collectes et prets pour le merge

## Etat d'Execution (Serena Memory)

Les agents se coordonnent via des fichiers de memoire partagee :

| Fichier | Objectif |
|---------|----------|
| `orchestrator-session.md` | Etat de la session en cours |
| `task-board.md` | Attributions et statuts des taches |
| `progress-{agent}.md` | Mises a jour de progression par agent |
| `result-{agent}.md` | Sorties finales de l'agent |

Ceux-ci vivent dans `.serena/memories/` et sont ce que les dashboards surveillent.
