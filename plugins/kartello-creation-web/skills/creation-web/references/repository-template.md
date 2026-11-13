# Repository dei template

**Scelta del proprietario (versione 2).** I riferimenti della skill non vivono dentro la skill ma in una **cartella separata**, la Repository dei template. L'utente la fa crescere aggiungendo e togliendo siti. Più template e tecniche contiene, più la skill sa come si costruiscono i siti di quel genere, senza bisogno di aggiornare la skill.

## §1 Dove si trova

La skill cerca la repository in quest'ordine (lo fa `assets/template-repo/repository.mjs`, usato da tutti gli script):

1. la variabile d'ambiente **`KARTELLO_TEMPLATE`** con il percorso della cartella;
2. il collegamento **`~/.claude/kartello/template-siti`** che punta alla cartella;
3. la libreria della versione 1 (`KARTELLO_LIBRERIA` o `~/.claude/kartello/libreria-siti/`): funziona ancora, ma solo con gli esempi, senza catalogo né tecniche.

Se non la trova, chiedi all'utente dove si trova e proponi di collegarla, con il suo consenso. Si collega in uno di due modi:
- **collegamento** (consigliato, vale ovunque):
  ```bash
  mkdir -p ~/.claude/kartello && ln -s "/percorso/della/repository" ~/.claude/kartello/template-siti
  ```
- **variabile** nelle impostazioni di Claude Code (`~/.claude/settings.json`, voce `"env"`): `"KARTELLO_TEMPLATE": "/percorso/della/repository"`.

Nelle sessioni in cloud la cartella dell'utente non c'è: dillo, e lavora senza repository (stili di [stili.md](stili.md)) oppure con una copia della repository clonata da Git.

## §2 Com'è fatta

```
<repository>/
├── README.md, SETTORI.md
├── indice.json              # una riga per sito del catalogo (decine di migliaia): MAI leggerlo intero
├── Template Analizzati/     # i siti studiati a 360 gradi
│   ├── INDICE.md            # una riga per template: id, sito, categoria, tipologia, livello, punti forti, scheda, data
│   ├── tipologie.md         # tipologie con tratti ricorrenti, varianti, settori, livello, tecniche, esempi
│   └── <Categoria>/<Nome sito>/
│       ├── scheda.md        # modello: templates/scheda-esempio.md
│       ├── analisi.json     # dati di analizza-sito.mjs (se usato)
│       ├── panoramica-desktop.jpg, apertura-desktop.jpg, panoramica-mobile.jpg
│       ├── passi/           # 4–10 fotogrammi chiave
│       ├── design-system.json, struttura.json, sito.json
│       └── rea/             # evidenze REA: risorse, DOM, librerie, analisi degli script
├── Template JSON/           # il catalogo: <Categoria>/_SITI.md e <Categoria>/<Nome sito>/sito.json
├── Tecniche Apprese/        # INDICE.md + una tecnica per file (modello: templates/tecnica.md)
└── strumenti/               # script che hanno costruito il catalogo
```

Le **categorie** sono settori (Food & Drink, Salute & Benessere, Immobiliare…). Le **tipologie** descrivono invece il modo di raccontare e di muoversi ("Esperienza 3D immersiva a scroll infinito", "Editoriale cinematico"…), indipendentemente dal settore.

## §3 Ordine di consultazione

1. **Template Analizzati, a 360 gradi.** In Fase 0 leggi `INDICE.md` e `tipologie.md`. Per V0 scegli i template pertinenti per categoria, obiettivo e livello, e apri le loro `scheda.md` solo quando servono.
2. **Catalogo.** Se tra gli analizzati non c'è niente di pertinente, o l'utente vuole più scelta, interroga il catalogo con lo script (§4) e proponi 2–3 siti con una riga sul perché.
   - Se l'utente ne sceglie uno, proponi di analizzarlo subito in modalità Impara ([libreria-esempi.md](libreria-esempi.md) §3), dicendo quanto tempo serve (pochi minuti).
   - Dopo l'analisi diventa un Template Analizzato, disponibile anche per i siti futuri.
   - Un sito del catalogo non analizzato si può usare solo come ispirazione generica (tag, premi), non per decisioni precise di struttura o di movimento.
3. **Tecniche Apprese**: alternative da confrontare con la soluzione propria, prima di costruire un effetto o una soluzione tecnica (§5).

## §4 Cercare nel catalogo

```bash
node "${CLAUDE_SKILL_DIR}/assets/template-repo/cerca-template.mjs" --categorie
node "${CLAUDE_SKILL_DIR}/assets/template-repo/cerca-template.mjs" --categoria "salute" --premiati --online --dal 2024 --limite 8
node "${CLAUDE_SKILL_DIR}/assets/template-repo/cerca-template.mjs" --categoria "food" --tag webgl --tag gsap --online
```

Filtri: `--categoria` (ripetibile), `--tag` (ripetibile, tutti richiesti), `--testo`, `--premiati` (SOTY, SOTM, SOTD, Developer), `--dal <anno>`, `--online`, `--analizzati`, `--limite`, `--json`. I template già analizzati escono per primi, poi i più recenti e premiati.

**Dal settore del cliente alla categoria** (cerca anche nella seconda, se la prima ha pochi risultati):

| Settore del cliente | Categoria | Anche |
|---|---|---|
| Ristorante, bar, pizzeria, hotel, B&B, agriturismo, turismo | Hotel, Ristoranti & Turismo | Food & Drink |
| Prodotto alimentare, vino, birra, caffè, pasticceria | Food & Drink | E-commerce & Retail |
| Dentista, clinica, fisioterapia, psicologo, farmacia, wellness | Salute & Benessere | Business & Servizi |
| Centro estetico, parrucchiere, cosmetica, moda, abbigliamento | Moda & Beauty | E-commerce & Retail |
| Gioielli, orologi, lusso | Lusso & Gioielli | Moda & Beauty |
| Avvocato, commercialista, consulente, banca, assicurazione | Finanza, Legale & Consulenza | Business & Servizi |
| Agenzia immobiliare, costruttore, residenze | Immobiliare | Architettura & Interior design |
| Architetto, interior designer, arredamento | Architettura & Interior design | Immobiliare |
| Concessionaria, officina, noleggio, mobilità | Automotive & Mobilità | Business & Servizi |
| Palestra, personal trainer, squadra, sport | Sport & Fitness | Eventi & Conferenze |
| Negozio online generico | E-commerce & Retail | la categoria del prodotto |
| Software, SaaS, intelligenza artificiale | Tecnologia & SaaS | Startup, App & Prodotti digitali |
| App mobile | App & Prodotti digitali | Tecnologia & SaaS |
| Agenzia web o di comunicazione, studio grafico | Agenzie creative & Studi | Portfolio personali |
| Freelance, creativo, sviluppatore | Portfolio personali | Agenzie creative & Studi |
| Fotografo, videomaker | Fotografia | Film & TV |
| Artista, illustratore, galleria | Arte & Illustrazione | Cultura & Educazione |
| Musicista, etichetta, studio di registrazione | Musica & Audio | Eventi & Conferenze |
| Casa di produzione, film, serie | Film & TV | Intrattenimento |
| Evento, conferenza, festival, matrimonio | Eventi & Conferenze | Intrattenimento |
| Scuola, corso, museo, progetto culturale | Cultura & Educazione | Istituzioni & PA |
| Comune, ente pubblico, fondazione | Istituzioni & PA | No-profit & Sociale |
| Associazione, ONG, causa sociale | No-profit & Sociale | Istituzioni & PA |
| Rivista, blog, giornale, podcast | Editoria, Magazine & Blog | Cultura & Educazione |
| Parco, escape room, esperienza, spettacolo | Intrattenimento | Eventi & Conferenze |
| Azienda B2B, industria, servizi generici | Business & Servizi | Tecnologia & SaaS |
| Lancio di prodotto, campagna | Campagne promozionali | la categoria del prodotto |
| Esperienza interattiva, sito-vetrina sperimentale | Sperimentali & Interattivi | Agenzie creative & Studi |

## §5 Tecniche apprese: alternative da confrontare

**Scelta del proprietario.** `Tecniche Apprese/` raccoglie i metodi imparati dai siti: come è fatto un effetto, un movimento, un caricamento, un'interfaccia, una soluzione per le prestazioni. Ogni tecnica ha codice **scritto da noi**, pronto da adattare. Le tecniche servono a **proporre strade alternative**, non a decidere al posto della skill: ogni volta si confrontano con la soluzione che Claude Code sceglierebbe da sé, e vince la migliore.

**Il confronto** (Fase 4 per gli effetti del piano, Fase 5 per ciò che non era già deciso):

1. **Soluzione propria.** Descrivi in una o due righe come faresti l'effetto da te, con le ricette della skill ([motion-graphics.md](motion-graphics.md), [effetti-impatto.md](effetti-impatto.md), [grafica-in-codice.md](grafica-in-codice.md)).
2. **Alternative.** Cerca in `Tecniche Apprese/INDICE.md` le tecniche per la stessa cosa e leggi le loro sezioni "Quando usarla / quando no" e "Confronto con l'alternativa standard".
3. **Criteri, sempre gli stessi:**
   - resa e aderenza al brief e al design system;
   - prestazioni: peso, fluidità, comportamento su mobile;
   - accessibilità e SEO;
   - semplicità e manutenzione del codice;
   - tempo di realizzazione;
   - compatibilità con la tecnologia scelta (W4).
4. **Scelta.**
   - Se un'opzione è chiaramente migliore, usala e scrivi il confronto nel piano (tabella "Scelte tecniche" in [templates/piano-sito.md](../templates/piano-sito.md)).
   - Se le opzioni si equivalgono, o la differenza cambia ciò che l'utente vede, il budget o i tempi, **chiedi all'utente**: le due opzioni in una riga ciascuna, quella che consigli e perché.
   - Se non c'è nessuna tecnica pertinente, vale la soluzione propria, senza confronto.
5. **Verifica in costruzione.** Se l'opzione scelta rende peggio del previsto (fotogrammi persi, peso, resa su mobile), prova l'alternativa e dillo all'utente.

Una tecnica non si usa solo perché esiste, e non si scarta solo perché è nuova.

- **Quando aggiornarla.** Se il confronto o un sito analizzato mostrano un modo migliore per fare la stessa cosa (più veloce da scrivere, più leggero, più fluido, più accessibile, meno codice), compresa la soluzione propria di Claude Code quando ha vinto:
  1. aggiorna il file della tecnica, codice compreso;
  2. alza la **versione** e aggiungi una riga allo **storico** (cosa è cambiato, perché ha vinto, da quale sito o progetto);
  3. aggiorna la riga in `Tecniche Apprese/INDICE.md`.

  Così ogni confronto alza il livello di partenza del successivo.
- **Quando crearne una nuova.** Se un sito analizzato usa un metodo che non c'è e che si può riusare in altri siti, crea un file dal modello [templates/tecnica.md](../templates/tecnica.md) e una riga nell'indice. Niente doppioni: se esiste una tecnica simile, aggiorna quella e descrivi la variante.
- **Cosa non si fa mai.** Copiare il codice del sito di esempio, i suoi testi, immagini, colori o font. Dal codice del sito, letto con REA, si capisce **come** funziona; poi lo si riscrive da zero, minimo e commentato.
- **Collegamenti.** Ogni tecnica indica la ricetta più vicina della skill ([motion-graphics.md](motion-graphics.md) §3, [effetti-impatto.md](effetti-impatto.md), [grafica-in-codice.md](grafica-in-codice.md)). Ogni scheda di template elenca le tecniche imparate da quel sito. In `tipologie.md` ogni tipologia elenca le tecniche che la caratterizzano.

## §6 Aggiungere e togliere template

- **Aggiungere** un sito: modalità Impara ([libreria-esempi.md](libreria-esempi.md) §3). Il sito finisce in `Template Analizzati/<Categoria>/<Nome sito>/` e si collega al catalogo:
  ```bash
  node "${CLAUDE_SKILL_DIR}/assets/template-repo/collega-template.mjs" <slug-o-indirizzo> "Template Analizzati/<Categoria>/<Nome sito>/scheda.md"
  ```
  Se il sito non è nel catalogo (un esempio nuovo, non Awwwards), il template vale lo stesso; il collegamento semplicemente non serve.
- **Togliere** un template: su richiesta dell'utente.
  1. Cancella la cartella e la sua riga in `INDICE.md`.
  2. Toglilo dagli esempi in `tipologie.md` e riscrivi i tratti ricorrenti.
  3. Lancia `collega-template.mjs <slug> --rimuovi`.
  4. Le tecniche imparate da quel sito restano: sono metodo, non copia.
- **Segnare un esempio come "da non seguire"**: se l'utente non lo vuole più come modello ma resta utile come esempio negativo, scrivilo nella scheda e in `INDICE.md`.
- Il catalogo si può rigenerare con gli script in `strumenti/` della repository: i template analizzati restano e si ricollegano da soli.

## §7 Analisi profonda con REA (facoltativa)

Se REA è installato ([requisiti.md](requisiti.md)), la modalità Impara aggiunge alle foto e alle misure di `analizza-sito.mjs` ciò che si vede solo nel codice:

```bash
node "${CLAUDE_SKILL_DIR}/assets/template-repo/analisi-rea.mjs" https://sito.com "<cartella del template>" --attesa 10
```

In circa 30 secondi scrive in `<cartella>/rea/`:
- `risorse.json`: modelli 3D, texture, font, audio, video caricati;
- `dom.html`: la pagina reale;
- `librerie.json`: librerie con versioni, rotte, script e messaggi della console;
- `analisi-script.json`: il bundle analizzato da REA;
- `evidenze.md`: gli ID delle evidenze.

Gli script del sito restano in una cartella temporanea, poi cancellata: servono a capire, non a copiare. Se REA non c'è, l'analisi resta valida senza la parte tecnica, e la scheda lo dichiara.

**Siti che si muovono solo con la rotella** (esperienze 3D a scroll virtuale): dalla versione 2 `analizza-sito.mjs` li riconosce da solo e passa alla modalità rotella. Il segno è una pagina che non scorre ma ha un canvas o lo scroll bloccato. In quella modalità:
- gira la rotella a ogni passo e fotografa;
- si ferma quando la pagina non risponde più.

Si può forzare con `--scroll-virtuale` e regolare con `--forza 1500` (pixel di rotella per passo). Per vedere un ciclo intero bastano di solito 16-24 passi.
