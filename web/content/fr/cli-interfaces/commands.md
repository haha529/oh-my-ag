---
title: Commandes CLI
description: Chaque commande disponible dans le CLI oh-my-agent — avec exemples.
---

# Commandes CLI

Apres installation globale (`bun install --global oh-my-agent`), utilisez `oma` ou `oh-my-ag`.

## Configuration et Maintenance

```bash
oma                    # Installeur interactif — choisir preset, installer skills
oma doctor             # Bilan de sante : CLIs, configs MCP, etat des skills
oma update             # Mettre a jour les skills depuis le registre
oma cleanup            # Supprimer les processus orphelins et fichiers temporaires
```

## Surveillance

```bash
oma dashboard          # Dashboard terminal — statut agents en direct
oma dashboard:web      # Dashboard web a http://localhost:9847
oma stats              # Voir les metriques de productivite
oma retro [days]       # Retrospective d'ingenierie avec tendances
```

## Gestion des Agents

```bash
# Lancer un agent unique
oma agent:spawn <agent-id> <prompt> <session-id>
oma agent:spawn backend "Implement auth API" session-01 -w ./apps/api

# Verifier le statut d'un agent
oma agent:status <session-id> [agent-ids...]
oma agent:status session-01 backend frontend

# Lancer plusieurs agents en parallele
oma agent:parallel [tasks...]
oma agent:parallel -i backend:"Auth API" frontend:"Login form"
```

## Memoire et Verification

```bash
# Initialiser le schema memoire Serena
oma memory:init

# Verifier la qualite de sortie d'un agent
oma verify <agent-type>
oma verify backend
oma verify frontend
```

## Integration et Utilitaires

```bash
oma auth:status        # Verifier le statut d'authentification CLI
oma usage:anti         # Afficher les quotas d'utilisation Antigravity IDE
oma bridge [url]       # Pont MCP stdio vers Streamable HTTP
oma visualize          # Generer le graphe de dependances du projet
oma describe [cmd]     # Introspection JSON de toute commande CLI
oma star               # Mettre une etoile a oh-my-agent sur GitHub
```

## Obtenir de l'Aide

```bash
oma help               # Afficher toutes les commandes
oma version            # Afficher le numero de version
oma <command> --help   # Aide pour une commande specifique
```
