---
title: "Cas d'Usage : Skill Unique"
description: Quand vous avez juste besoin d'un agent pour une tache ciblee — la voie rapide.
---

# Cas d'Usage : Skill Unique

## Quand L'Utiliser

Utilisez ceci quand votre tache a un perimetre etroit et appartient a un seul domaine :

- Un composant UI
- Un endpoint d'API
- Un bug dans une seule couche
- Un refactor dans un seul module

Si la tache necessite une coordination inter-domaines (API + UI + QA), passez au [Projet Multi-Agent](./multi-agent-project).

## Avant de Formuler Votre Prompt

Checklist rapide :

1. **Quelle est la sortie ?** — fichier ou comportement specifique
2. **Quel stack ?** — framework, langage, versions
3. **Qu'est-ce que "termine" ?** — criteres d'acceptation
4. **Quels tests ?** — cas critiques a couvrir

## Template de Prompt

```text
Build <specific artifact> using <stack>.
Constraints: <style/perf/security constraints>.
Acceptance criteria:
1) ...
2) ...
Add tests for: <critical cases>.
```

## Exemple Concret

```text
Create a login form component in React + TypeScript + Tailwind CSS.
Constraints: accessible labels, client-side validation, no external form library.
Acceptance criteria:
1) email and password validation messages
2) disabled submit while invalid
3) keyboard and screen-reader friendly
Add unit tests for valid/invalid submit paths.
```

## Ce Qui Se Passe

1. Le bon skill s'auto-active en fonction de votre prompt
2. L'agent declare ses hypotheses (charter preflight)
3. Vous confirmez ou ajustez
4. L'agent ecrit le code et les tests
5. Vous lancez la verification locale

## Avant de Merger

Verifiez que :
- Le comportement correspond a vos criteres d'acceptation
- Les tests couvrent le happy path et les cas limites cles
- Aucun changement non lie ne s'est glisse
- Les modules partages ne sont pas casses

## Quand Escalader

Passez au flux multi-agent quand :
- Le travail UI necessite un nouveau contrat d'API
- Un correctif se propage a travers les couches
- Le perimetre depasse un seul domaine apres la premiere iteration
