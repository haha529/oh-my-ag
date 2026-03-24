---
title: Surveillance par Dashboard
description: Observez vos agents travailler en temps reel avec des dashboards terminal et web.
---

# Surveillance par Dashboard

Quand vous avez plusieurs agents qui tournent en parallele, vous voulez garder un oeil sur ce qui se passe. C'est a ca que servent les dashboards.

## Demarrer un Dashboard

```bash
# UI Terminal
oma dashboard

# UI Web
oma dashboard:web
# → http://localhost:9847
```

## Configuration Recommandee

Utilisez 3 terminaux cote a cote :

| Terminal | Objectif |
|----------|----------|
| 1 | `oma dashboard` — statut des agents en direct |
| 2 | Commandes de spawn d'agents |
| 3 | Logs de test et build |

Gardez le dashboard web ouvert dans un navigateur pour une visibilite partagee lors des sessions d'equipe.

## Ce Que Vous Voyez

Les dashboards surveillent `.serena/memories/` et affichent :

- **Statut de session** — en cours, termine ou echoue
- **Tableau de taches** — quel agent a quelle tache
- **Progression de l'agent** — nombre de tours, activite en cours
- **Resultats** — sorties finales au fur et a mesure qu'elles arrivent

Les mises a jour sont pilotees par evenements (detection de changements de fichiers) — pas de boucles de polling qui mangent votre CPU.

## Signaux de Problemes

| Vous Voyez | Que Faire |
|-----------|-----------|
| "No agents detected" | Verifiez que les agents ont ete lances avec le meme `session-id`. Verifiez que `.serena/memories/` est alimente. |
| Session bloquee sur "running" | Verifiez les timestamps des fichiers `progress-*`. Relancez les agents bloques avec des prompts plus clairs. |
| Reconnexions frequentes (web) | Verifiez le firewall/proxy. Relancez `dashboard:web` et rafraichissez la page. |
| Activite manquante | Verifiez que l'orchestrateur ecrit dans le bon repertoire de workspace. |

## Avant de Merger

Checklist rapide depuis le dashboard :

- Tous les agents ont atteint le statut "completed"
- Pas de constats QA de haute severite non resolus
- Fichiers de resultats presents pour chaque agent
- Tests d'integration lances apres les sorties finales

## Quand Vous Avez Termine

La phase de surveillance est complete quand :
- La session affiche un etat terminal (completed ou stopped)
- L'historique d'activite explique ce qui s'est passe
- Vous avez pris votre decision de merge/release avec une visibilite complete
