# Skill Kartello Creation Web

Skill per [Claude Code](https://code.claude.com) che crea siti web da zero per qualsiasi settore.
Quando la avvii ti fa domande mirate, fissa un design system che resta costante su tutto il sito,
poi pianifica e costruisce una prima bozza professionale sezione per sezione.

> Stato: **in sviluppo**. Si arricchisce integrando altre skill una alla volta (vedi `references/fonti.md`).

## Come funziona

0. **Modalità**: scegli l'intervista Rapida, Standard o Approfondita.
1. **Brief base**: idea del sito, pagine, stile e palette colori, tipografia (Display, H1–H6, testi, bottoni) fissata e approvata.
2. **Approfondimento mirato**: conversione, prove, tono, forme, animazioni, navigazione, SEO; solo ciò che serve al tipo di sito. La tecnologia viene raccomandata in base al sito, ma la scegli tu.
3. **Blocco dei parametri**: scrive `docs/brief-sito.md` e `docs/design-system.md` nel progetto e aggiunge al suo `CLAUDE.md` la regola che li rende fissi.
4. **Piano**: mappa del sito, scaletta delle pagine, testi della hero, benefici, FAQ, SEO; salvato in `docs/piano-sito.md` con lo stato di ogni pagina e sezione.
5. **Costruzione** sezione per sezione, con le regole di qualità della skill. Immagini, logo, icone e video si creano con **Studio AI** (server MCP `studio-ai`).
6. **Controllo qualità** con checklist e consegna.

Avvio: `/creation-web` (skill di progetto) oppure `/kartello-creation-web:creation-web` (plugin installato), eventualmente seguito dall'idea: `/creation-web sito per uno studio di fisioterapia a Bologna`.

## Struttura

```
.
├── .claude-plugin/
│   └── marketplace.json              # catalogo del marketplace "kartello"
├── plugins/
│   └── kartello-creation-web/        # il plugin
│       ├── .claude-plugin/
│       │   └── plugin.json           # manifest del plugin (nome, versione, autore)
│       └── skills/
│           └── creation-web/
│               ├── SKILL.md          # flusso a fasi e regole d'oro
│               ├── references/       # domande, design system, stili, strategia, motion, contenuti visivi, scroll cinematico, volo in prima persona, qualità, checklist, fonti
│               ├── assets/           # motore dello scroll cinematico
│               └── templates/        # modelli di brief, design system e piano del sito
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

## Crediti

Le regole integrate da altre skill e le relative licenze sono elencate in
`plugins/kartello-creation-web/skills/creation-web/references/fonti.md`.
