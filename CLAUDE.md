# CLAUDE.md

Questa repository contiene una skill per Claude Code, distribuita come plugin
(`kartello-creation-web`) del marketplace `kartello`. Vedi `README.md` per struttura e installazione.

## Dove si lavora

- La skill è in `plugins/kartello-creation-web/skills/creation-web/`.
  `SKILL.md` è il punto d'ingresso; materiale lungo va in file di supporto nella stessa cartella
  (es. `references/`, `scripts/`, `assets/`) richiamati da `SKILL.md`.
- `.claude/skills/creation-web` è un link simbolico alla stessa cartella: non duplicare file lì.
- Se si rinomina la skill o il plugin, aggiornare insieme: nome della cartella, `name` nel frontmatter,
  `plugin.json`, `marketplace.json`, il link simbolico e `README.md`.

## Regole per SKILL.md

- Il frontmatter YAML deve iniziare alla prima riga del file.
- `description`: cosa fa la skill e quando usarla, caso d'uso principale per primo
  (`description` + `when_to_use` vengono troncati a 1536 caratteri).
- Tenere `SKILL.md` sotto le 500 righe; spostare i dettagli nei file di supporto.
- Per script inclusi usare `${CLAUDE_SKILL_DIR}` come percorso base.

## Verifica

Dopo ogni modifica eseguire e far passare:

```bash
claude plugin validate .
claude plugin validate ./plugins/kartello-creation-web
```

## Lingua

Documentazione della repository in italiano.
