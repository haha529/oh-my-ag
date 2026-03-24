---
title: Skills
description: Comment l'architecture de skills en deux couches garde les agents intelligents sans gaspiller de tokens.
---

# Skills

Les skills sont ce qui rend chaque agent expert. Ce sont des connaissances structurees — pas juste des prompts, mais des protocoles d'execution, des templates de code, des playbooks d'erreurs et des checklists de qualite.

## Le Design en Deux Couches

Voici l'astuce : les skills ne chargent pas tout d'un coup. Ils utilisent la divulgation progressive pour economiser ~75% de tokens.

### Couche 1 : SKILL.md (~800 octets)

Toujours charge. Contient :
- Identite et role de l'agent
- Quand s'activer (conditions de routage)
- Regles et contraintes principales
- Ce qu'il ne faut PAS faire

### Couche 2 : resources/ (charge a la demande)

Charge uniquement quand l'agent travaille activement. Contient le contenu approfondi :

| Ressource | Ce Qu'elle Fait |
|-----------|-----------------|
| `execution-protocol.md` | Flux etape par etape : Analyser → Planifier → Implementer → Verifier |
| `tech-stack.md` | Specifications technologiques detaillees et versions |
| `error-playbook.md` | Que faire quand ca tourne mal (avec escalade "3 strikes") |
| `checklist.md` | Verifications qualite specifiques au domaine |
| `snippets.md` | Patterns de code prets a l'emploi |
| `examples/` | Exemples few-shot entree/sortie |

### A Quoi Ca Ressemble

```
.agents/skills/oma-frontend/
├── SKILL.md                          ← Toujours charge (~800 octets)
└── resources/
    ├── execution-protocol.md         ← A la demande
    ├── tech-stack.md
    ├── tailwind-rules.md
    ├── component-template.tsx
    ├── snippets.md
    ├── error-playbook.md
    ├── checklist.md
    └── examples/
```

## Ressources Partagees

Tous les agents partagent des fondations communes depuis `.agents/skills/_shared/` :

| Ressource | Objectif |
|-----------|----------|
| `skill-routing.md` | Mappe les taches au bon agent |
| `context-loading.md` | Quelles ressources charger pour quel type de tache |
| `prompt-structure.md` | Objectif → Contexte → Contraintes → Termine Quand |
| `clarification-protocol.md` | Quand demander vs. simplement supposer |
| `context-budget.md` | Lecture de fichiers econome en tokens par tier de modele |
| `difficulty-guide.md` | Evaluation de tache Simple / Moyenne / Complexe |
| `reasoning-templates.md` | Templates de raisonnement structure a remplir |
| `quality-principles.md` | Standards de qualite universels |
| `vendor-detection.md` | Detecter quel IDE/CLI est en cours d'execution |

## Ressources Conditionnelles

Certaines ressources ne se chargent que lorsque declenchees par des conditions specifiques :

| Ressource | Quand Elle Se Charge |
|-----------|----------------------|
| `quality-score.md` | Evaluation de qualite demandee |
| `experiment-ledger.md` | Essai d'une approche experimentale |
| `exploration-loop.md` | Exploration iterative en cours |

## Execution Specifique au Vendor

Chaque CLI supporte a son propre protocole d'execution dans `.agents/skills/_shared/runtime/execution-protocols/` :
- `claude.md` — Patterns specifiques a Claude
- `gemini.md` — Patterns specifiques a Gemini
- `codex.md` — Patterns specifiques a Codex
- `qwen.md` — Patterns specifiques a Qwen

## Pourquoi C'est Important

Sans divulgation progressive, charger 5 agents epuiserait votre fenetre de contexte avant que le moindre travail commence. Avec elle, vous obtenez un chargement initial leger et une execution approfondie quand ca compte.
