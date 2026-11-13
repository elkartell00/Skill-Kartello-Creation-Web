# Skill Kartello Creation Siti Web — versione 3

Skill per [Claude Code](https://code.claude.com) che crea siti web da zero per qualsiasi settore.
Quando la avvii ti fa domande mirate, fissa un design system che resta costante su tutto il sito,
poi pianifica e costruisce una prima bozza professionale sezione per sezione.

> Stato: **versione 3.0.0**. Si arricchisce integrando altre skill una alla volta (vedi `references/fonti.md`)
> e, dalla versione 2, imparando dalla **Repository dei template**: più template e tecniche ci metti, più diventa brava.

## Novità della versione 3.0.0

- **Preparazione guidata del computer**: scrivi `/creation-web prepara` e la skill installa, un passo alla volta e solo dopo il tuo sì, tutto ciò che le serve. Spiega a cosa serve ogni strumento, non si blocca se un passo non riesce e alla fine ti propone il primo sito. Guida: `references/preparazione.md`.
- **Banca dati di design** (UI/UX Pro Max, gratuita): proposte di stili, palette e font più adatte al settore e controlli di usabilità. Resta un aiuto: le proposte passano dalle regole della skill e il design system resta uno solo. Guida: `references/banca-dati-design.md`.
- **Componenti di 21st.dev** per i siti in React, facoltativi: ricerca gratuita, nessuna funzione a pagamento senza il tuo consenso, licenza di ogni componente controllata.
- **Motion (ex Framer Motion)**: regole d'uso nei siti in React, come alternativa a GSAP.
- Integrata la skill `website-builder-setup`, correggendo i comandi superati e la gestione delle chiavi.

## Novità della versione 2.2.0

- **Componenti animati pronti per i siti in React** (React Bits, `DavidHDev/react-bits`): nuova guida `references/componenti-animati.md`.
  - Catalogo di oltre 215 componenti (testi cinetici, sfondi in shader, gallerie, card, menu, cursori) collegato alle ricette del motion graphics.
  - Installazione con un comando, adattamento obbligatorio al design system e confronto con la soluzione propria.
  - Regole per evitare l'effetto "già visto", per prestazioni, movimento ridotto e lettori di schermo.
  - Licenza rispettata: i componenti si usano nei siti dei clienti, ma non sono copiati nella skill né rivenduti.

## Novità della versione 2.1.5

- **Scroll morbido fatto bene con Lenis** (`darkroomengineering/lenis`, licenza MIT): nuova guida `references/scroll-morbido.md`.
  - Quando usarlo per livello del sito e quando è meglio evitarlo.
  - Impostazione corretta con GSAP, Three.js, React, Next.js, Vue, Nuxt e Astro, in un solo ciclo, così scroll, animazioni e 3D non si separano mai.
  - Menu e finestre modali che fermano lo scroll, scroll interni, ancore sotto l'header fisso, aggancio alle sezioni, limiti su Safari e iOS.
  - Movimento ridotto sempre rispettato.

## Novità della versione 2.1

- **GSAP fatto bene**: integrate le skill ufficiali di GreenSock (`greensock/gsap-skills`, licenza MIT) in una guida unica, `references/gsap.md`. La scena d'impatto e le animazioni allo scroll seguono le regole corrette di GSAP:
  - timeline con le battute dello storyboard come etichette;
  - ScrollTrigger senza gli errori tipici (trigger annidati, pin animati, posizioni sbagliate dopo il caricamento dei font);
  - il plugin giusto per ogni effetto (SplitText, DrawSVG, MorphSVG, Flip, Observer…), tutti gratuiti;
  - movimento ridotto gestito con `gsap.matchMedia()`, pulizia delle animazioni in React, Next.js, Vue, Svelte e Astro.
- **Stessa curva ovunque**: GSAP usa la curva del design system (`--ease-fluid`), così CSS e animazioni si muovono allo stesso modo.
- **Scelta della libreria di animazione** insieme alla tecnologia (W4): la skill raccomanda, decidi tu; scroll morbido con Lenis o ScrollSmoother.

## Novità della versione 2

- **Repository dei template**: i riferimenti stanno in una cartella separata dalla skill, che fai crescere tu. La skill la consulta in quest'ordine:
  1. **Template Analizzati**: siti studiati a 360 gradi, con scheda, design system, struttura, foto ed evidenze del codice;
  2. **Template JSON**: un catalogo di migliaia di siti premiati, divisi per categoria, cercati con uno script.
- **Tecniche Apprese**: dai siti analizzati la skill ricava i metodi in codice (movimenti, effetti, 3D, caricamento, interfaccia, prestazioni) e li riscrive da zero. Non li applica alla cieca: per ogni effetto li **confronta** con la soluzione che sceglierebbe da sé e usa la migliore, oppure ti chiede quando la scelta non è netta. Quando una soluzione migliore vince il confronto, la tecnica si aggiorna, con versione e storico.
- **Analisi profonda con REA** (facoltativa): oltre a foto e misure, la modalità Impara legge il codice del sito: librerie e versioni, pagine interne, modelli 3D, font, audio.
- **Requisiti automatici**: al primo avvio la skill controlla cosa manca e lo installa **solo dopo il tuo sì**:
  - Node, Playwright e un browser, ffmpeg, Python, REA;
  - il collegamento alla repository.
- **Compatibile con la versione 1**: se hai la vecchia libreria `~/.claude/kartello/libreria-siti/`, continua a funzionare, e la skill ti propone di spostarla nella repository.

### Collegare la repository

La skill cerca la repository in quest'ordine:
1. la variabile `KARTELLO_TEMPLATE`;
2. il collegamento `~/.claude/kartello/template-siti`.

Il modo più semplice è il collegamento:

```bash
mkdir -p ~/.claude/kartello && ln -s "/percorso/di/Template Siti.nosync" ~/.claude/kartello/template-siti
```

Se non la trova, è la skill stessa a chiederti dov'è e a proporti il collegamento. Dettagli in `references/repository-template.md`.

## Come funziona

0. **Modalità e livello**: scegli l'intervista Rapida, Standard o Approfondita e il livello del sito: Low Quality (normale), Standard (moderno) o High Quality (livello premium, con motion graphics avanzato). La spesa con Studio AI è proporzionata al livello e ogni generazione in più si chiede prima.
1. **Brief base**: idea del sito, pagine, stile e palette colori, tipografia (Display, H1–H6, testi, bottoni) fissata e approvata.
2. **Approfondimento mirato**: conversione, prove, tono, forme, animazioni, navigazione, SEO; solo ciò che serve al tipo di sito. La tecnologia viene raccomandata in base al sito, ma la scegli tu.
3. **Blocco dei parametri**: scrive `docs/brief-sito.md` e `docs/design-system.md` nel progetto e aggiunge al suo `CLAUDE.md` la regola che li rende fissi.
4. **Piano**: mappa del sito, scaletta delle pagine, testi della hero, benefici, FAQ, SEO; salvato in `docs/piano-sito.md` con lo stato di ogni pagina e sezione.
5. **Costruzione**: al livello High Quality prima la **scena d'impatto in motion graphics fatta in codice** (rivista su registrazione video), poi il resto sezione per sezione. Grafica, logo, icone, animazioni e motion graphics si creano **in codice**; **Studio AI** (server MCP `studio-ai`) solo per ciò che il codice non può fare, come le fotografie realistiche.
6. **Controllo qualità** con checklist e consegna.

**Impara dagli esempi.** Dai alla skill l'indirizzo di un sito che ti piace (`/creation-web impara https://…`): lo apre nel browser, lo scorre e lo fotografa da sola, ne ricava struttura, layout, grafica, immagini e motion graphics, ti chiede quali punti forti tenere e lo salva nella Repository dei template, nella cartella della sua categoria, insieme alle tecniche che ne ricava. La repository sta fuori dal plugin, così resta anche dopo gli aggiornamenti. Più esempi le dai, più tipologie e tecniche diventano precise. Quando crei un sito nuovo ti propone i riferimenti adatti e li adatta al tuo brand: colori, font, testi, immagini e SEO restano tuoi. Per l'analisi servono Node e Playwright; REA è facoltativo, per leggere anche il codice. La skill li installa con il tuo consenso.

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
│               ├── references/       # domande, design system, stili, strategia, motion, contenuti visivi, scroll cinematico, volo in prima persona, SEO, effetti d'impatto, siti 3D scroll, libreria degli esempi, repository dei template, requisiti, qualità, checklist, fonti
│               ├── assets/           # motori dello scroll cinematico e del 3D scroll, analisi dei siti di esempio, script della repository (template-repo/) e controllo dei requisiti (setup/)
│               └── templates/        # modelli di brief, design system, piano del sito, scheda di esempio e tecnica appresa
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

## Versioni

| Versione | Novità |
|---|---|
| 2.0.0 | Repository dei template (Template Analizzati, catalogo Template JSON, Tecniche Apprese), analisi profonda con REA, controllo e installazione dei requisiti con consenso |
| 0.7.0 | Libreria degli esempi personale, modalità Impara, livelli del sito, Studio AI proporzionato al livello |

## Crediti

Le regole integrate da altre skill e le relative licenze sono elencate in
`plugins/kartello-creation-web/skills/creation-web/references/fonti.md`.
