# Skill Kartello Creation Web

Skill per [Claude Code](https://code.claude.com), distribuita come plugin tramite un marketplace GitHub.

> Stato: **in sviluppo** — la skill è ancora un segnaposto.

## Struttura

```
.
├── .claude-plugin/
│   └── marketplace.json          # catalogo del marketplace "kartello"
├── plugins/
│   └── kartello-creation-web/    # il plugin
│       ├── .claude-plugin/
│       │   └── plugin.json       # manifest del plugin (nome, versione, autore)
│       └── skills/
│           └── creation-web/
│               └── SKILL.md      # la skill vera e propria
└── .claude/
    └── skills/
        └── creation-web -> ../../plugins/kartello-creation-web/skills/creation-web
```

Il link simbolico in `.claude/skills/` rende la skill disponibile come skill di progetto
(`/creation-web`) in ogni sessione Claude Code aperta su questa repository, comprese
le sessioni in cloud: così si può provare senza installare il plugin.

## Installazione

Da terminale:

```bash
claude plugin marketplace add elkartell00/Skill-Kartello-Creation-Web
claude plugin install kartello-creation-web@kartello
```

Oppure dentro una sessione Claude Code:

```
/plugin marketplace add elkartell00/Skill-Kartello-Creation-Web
/plugin install kartello-creation-web@kartello
```

Una volta installata, la skill si richiama con `/kartello-creation-web:creation-web`.

In alternativa, senza plugin: copiare la cartella
`plugins/kartello-creation-web/skills/creation-web` in `~/.claude/skills/`.

## Sviluppo

Validare marketplace e plugin dopo ogni modifica:

```bash
claude plugin validate .
claude plugin validate ./plugins/kartello-creation-web
```

Quando si rilascia una nuova versione, aggiornare `version` in
`plugins/kartello-creation-web/.claude-plugin/plugin.json`.
