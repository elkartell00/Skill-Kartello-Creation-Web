# Libreria degli esempi: imparare dai siti che piacciono

**Scelta del proprietario.** La skill impara dai siti di esempio che l'utente le indica. Basta l'indirizzo: la skill apre il sito in un browser, lo scorre come un visitatore, lo fotografa e lo analizza da sola, senza screenshot dell'utente. Se REA è installato, ne studia anche il codice. Dagli esempi prende **struttura, layout, grafica, immagini, motion graphics e tecniche**. Registra i punti forti che piacciono all'utente e salva tutto nella **Repository dei template** ([repository-template.md](repository-template.md)), che cresce a ogni esempio. Nei siti nuovi adatta quei riferimenti al brand: colori, font, testi, immagini, codice e SEO restano sempre del brand.

## §1 Dove si trova la libreria

- **Versione 2:** la libreria è la cartella `Template Analizzati/` della Repository dei template, separata dalla skill. Dove si trova e come si collega: [repository-template.md](repository-template.md) §1. Sta fuori dal plugin, così sopravvive agli aggiornamenti della skill ed è la stessa per tutti i progetti.
- **Compatibilità con la versione 1:** se c'è solo la vecchia libreria (`~/.claude/kartello/libreria-siti/` o `KARTELLO_LIBRERIA`), usala com'è. Proponi all'utente di spostarne gli esempi nella repository: ogni `esempi/{id}/` diventa `Template Analizzati/<Categoria>/<Nome sito>/`.
- Se la repository non c'è, chiedi all'utente se crearla. Struttura minima: `Template Analizzati/` con `INDICE.md` e `tipologie.md`, più `Tecniche Apprese/` con `INDICE.md`. Senza catalogo il punto 2 di §5 si salta.
- Nelle sessioni in cloud la cartella dell'utente non si conserva: dillo all'utente prima di salvare. Se vuole la repository anche lì, può essere una repository Git privata, clonata e aggiornata con un commit dopo ogni esempio.

```
Template Analizzati/
├── INDICE.md        # una riga per template
├── tipologie.md     # le tipologie di sito, con tratti ricorrenti, tecniche ed esempi
└── <Categoria>/
    └── <Nome sito>/              # categoria del catalogo (es. "Food & Drink"), nome leggibile del sito
        ├── scheda.md             # analisi e punti forti (modello: templates/scheda-esempio.md)
        ├── analisi.json          # dati raccolti da analizza-sito.mjs
        ├── panoramica-desktop.jpg
        ├── panoramica-mobile.jpg
        ├── apertura-desktop.jpg
        ├── passi/                # 4–10 fotogrammi chiave scelti, non tutti
        ├── design-system.json    # valori misurati: colori, font, dimensioni, layout, componenti
        ├── struttura.json        # sezioni in ordine con foto, contenuto, animazione, interazione
        └── rea/                  # analisi profonda con REA, se disponibile
```

`INDICE.md`: in testa una nota su come si usa (ordine di consultazione, catalogo, tecniche), poi la tabella `| id | sito | categoria | tipologia | livello (Low, Standard, High Quality) | punti forti in breve | scheda | data |`.

`tipologie.md`: per ogni tipologia un titolo con il nome (descrittivo, es. "Editoriale cinematico", "Prodotto in 3D guidato dallo scroll", "Portfolio a griglia minimale", "Locale raccontato per fotografie"), poi **tratti ricorrenti** (ciò che hanno in comune i suoi esempi, nelle sei aree del §4), **varianti**, **settori adatti**, **livello tipico** ed **esempi** (id con un rigo ciascuno).

## §2 Quando si usa

- L'utente indica un sito da cui imparare ("impara da questo sito", "aggiungilo alla libreria", `/creation-web impara https://…`): **modalità Impara** (§3). Non si avvia la creazione di un sito.
- Durante l'intervista l'utente cita siti che gli piacciono (I7): analizzali con §3 punti 1–3, usali come riferimento e chiedi se salvarli nella Repository dei template.
- All'avvio di un nuovo sito, se la libreria contiene esempi: domanda V0 (§5).
- "Mostra la libreria", "togli questo esempio", "unisci queste tipologie", "rinomina": gestione su richiesta (§6).

## §3 Modalità Impara

1. **Analisi automatica.** Lancia lo script su ogni pagina da studiare (la home, più 1–2 pagine interne se il sito è multipagina o se l'utente lo chiede):

   ```bash
   node "${CLAUDE_SKILL_DIR}/assets/analisi-sito/analizza-sito.mjs" https://sito-di-esempio.com
   ```

   Lo script apre il sito a 1440×900 (desktop) e 390×844 (mobile). Fotografa l'apertura a 0,3, 0,9, 1,8 e 3 secondi, per vedere loader e animazioni d'ingresso. Poi scorre con la rotella, una foto per passo, e raccoglie i dati: sezioni, titoli, tipografia, colori, raggi, header, bottoni, immagini, video, canvas e WebGL, sezioni bloccate, librerie di animazione e piattaforma, peso della pagina. Scrive tutto in una cartella temporanea (il percorso lo stampa alla fine). Opzioni: `--passi 60` per pagine molto lunghe, `--solo-desktop`, `--video` per registrare anche un video dello scroll.

   **Requisiti**: Node e Playwright ([requisiti.md](requisiti.md)). Se Playwright manca, chiedi il permesso di installarlo una volta sola (`npm install -g playwright`). Come browser lo script usa Chromium di Playwright oppure Chrome o Edge già installati; se non ce n'è nessuno, `npx playwright install chromium`.

   **Analisi profonda con REA** (se installato): subito dopo, sulla stessa home, lancia `analisi-rea.mjs` ([repository-template.md](repository-template.md) §7). Aggiunge librerie e versioni, rotte e pagine interne, modelli 3D, texture, font e audio caricati, e il DOM reale. Senza REA la scheda dichiara che la parte tecnica è dedotta solo da `analisi.json`.

   **Esperienze che scorrono solo con la rotella** (3D, scroll virtuale): lo script le riconosce da solo e passa alla modalità rotella ([repository-template.md](repository-template.md) §7). Controlla comunque nella panoramica che le foto cambino davvero; se restano uguali, rilancia con `--forza 3000`.

   **Se il browser non si può usare** (nessun permesso, rete bloccata): leggi l'HTML con lo strumento di lettura web e dichiara che l'analisi del movimento e della grafica è parziale. Solo in questo caso chiedi all'utente qualche screenshot o una registrazione dello schermo.

   Siti con accesso riservato o a pagamento: si analizza solo ciò che un visitatore vede senza accedere.

2. **Guarda il sito.** Prima `panoramica-desktop.jpg`, `apertura-desktop.jpg` e `panoramica-mobile.jpg`. Poi apri i singoli passi dove succede qualcosa: la hero, le sezioni bloccate, i cambi di scena. Confronta passi consecutivi: se l'immagine cambia senza che arrivi nuovo contenuto, è movimento guidato dallo scroll (sezione bloccata, sequenza, 3D). Leggi `analisi.json` per misure, librerie e struttura. Ciò che le foto ferme non mostrano (curve di animazione, effetti al passaggio del mouse) scrivilo come "da verificare" e non inventarlo.

3. **Scrivi la scheda** dal modello [templates/scheda-esempio.md](../templates/scheda-esempio.md), nelle sei aree del §4, con osservazioni concrete e misurate (es. "titolo hero 120px, 7,5 volte il testo, tracking -4%"; "capitolo bloccato lungo 3 schermate con 3 cambi di scena").

4. **Chiedi all'utente cosa gli piace.** Mostra un riepilogo breve, 10–15 righe: cosa hai visto nelle sei aree e i 3–5 punti forti che proponi. Poi chiedi quali punti forti tenere (scelta multipla), cosa non prendere e le sue note. Se l'utente ha già detto i punti forti nel messaggio, non richiedere: registrali, aggiungi i tuoi come proposta e fai solo confermare.

5. **Cataloga.** Proponi due cose:
   - la **tipologia**: una già in `tipologie.md` se l'esempio ne condivide i tratti, altrimenti una nuova con nome descrittivo;
   - la **categoria della repository**: se il sito è nel catalogo, la sua (`cerca-template.mjs --testo <dominio>`), altrimenti quella del settore ([repository-template.md](repository-template.md) §4).

   L'utente conferma o rinomina. Indica anche il livello del sito (G1) a cui l'esempio corrisponde.

6. **Estrai le tecniche.** Per ogni metodo riusabile visto nel sito (movimento, effetto, caricamento, interfaccia, prestazioni, infrastruttura):
   - se in `Tecniche Apprese/INDICE.md` c'è già una tecnica per la stessa cosa e il sito la fa meglio, **aggiornala** (codice, versione, storico);
   - se non c'è, **creane una** dal modello [templates/tecnica.md](../templates/tecnica.md).

   Il codice si scrive da zero, minimo e commentato, capendo dal sito come funziona, mai copiandolo ([repository-template.md](repository-template.md) §5). Elenca le tecniche nella scheda (area 6) e nella tipologia.

7. **Salva.** Crea `Template Analizzati/<Categoria>/<Nome sito>/` con:
   - scheda, `analisi.json`, panoramiche, apertura e 4–10 passi chiave;
   - `design-system.json` e `struttura.json` se hai le misure;
   - la cartella `rea/` se c'è l'analisi profonda.

   Se l'esempio esiste già, aggiorna la scheda invece di duplicarla. Aggiungi o aggiorna la riga in `INDICE.md`. In `tipologie.md` aggiungi l'esempio alla tipologia e, se ora ha due o più esempi, **riscrivi i tratti ricorrenti** (ciò che tutti condividono) e le varianti: così ogni esempio rende la tipologia più precisa. Se il sito è nel catalogo, collegalo con `collega-template.mjs` ([repository-template.md](repository-template.md) §6).

8. **Conferma** in due-tre righe:
   - cosa hai imparato;
   - in quale categoria e tipologia è finito, e quanti esempi ha ora la tipologia;
   - quali tecniche hai creato o migliorato.

## §4 Cosa si impara

1. **Struttura e racconto**: sezioni e loro ordine, ruolo di ognuna, lunghezza della pagina in schermate, come si arriva alla CTA, navigazione e menu, pagine interne.
2. **Layout e composizione**: griglia e colonne, asimmetrie, larghezza del contenuto, spazi tra le sezioni, densità, alternanza di ritmo (piena, stretta, a tutta pagina), adattamento al mobile.
3. **Grafica e stile visivo**: forme, raggi, bordi, ombre, texture e grana, gradienti, vetro; **struttura** della palette (quanti colori, rapporto chiaro e scuro, dove va l'accento) e **carattere** della tipografia (contrasto di scala, serif o sans, maiuscole, interlinea, tracking), senza prendere i colori e i font del brand di esempio.
4. **Immagini**: tipo (fotografia, 3D, illustrazione, grafica in codice), inquadrature, a tutta pagina o incorniciate, trattamento (colore, grana, scontorni, maschere), rapporto tra immagini e testo.
5. **Motion graphics e interazioni**: apertura e loader, animazioni guidate dallo scroll, sezioni bloccate, cambi di scena, tipografia in movimento, 3D e WebGL, video, scorrimento morbido, micro interazioni, ritmo e durate. Collega ogni movimento alla ricetta più vicina di [motion-graphics.md](motion-graphics.md) §3 o di [effetti-impatto.md](effetti-impatto.md).
6. **Tecnica**: librerie e piattaforma rilevate, per sapere con quali strumenti rifarlo in codice ([grafica-in-codice.md](grafica-in-codice.md)). Con REA anche versioni, rotte, risorse 3D e audio, e i **metodi** riusabili che diventano Tecniche Apprese (§3 punto 6).

**Non si prende mai**: testi, nomi, loghi, fotografie, video, illustrazioni, icone e codice del sito di esempio; nemmeno i suoi colori e i suoi font, che vengono sempre dal brand dell'utente (design system). Niente combinazioni così fedeli da rendere il sito riconoscibile come copia: si impara il metodo, non si riproduce l'opera. Il SEO resta del brand ([seo.md](seo.md)).

## §5 Usare la libreria in un sito nuovo

1. **Fase 0**: leggi `Template Analizzati/INDICE.md`, `Template Analizzati/tipologie.md` e `Tecniche Apprese/INDICE.md`. Le schede si leggono solo quando servono.
2. **Domanda V0** (Giro 3, prima di V3, [domande.md](domande.md)), in quest'ordine:
   - **Template Analizzati, a 360 gradi.** Se ci sono esempi pertinenti per categoria, obiettivo e livello, proponi 1–3 riferimenti (tipologia, esempio, punti forti in una riga) e indica quello che consigli.
   - **Catalogo.** Se non bastano, cerca con `cerca-template.mjs` ([repository-template.md](repository-template.md) §4) e proponi 2–3 siti premiati del settore. Per ognuno: perché è adatto e che si può analizzare subito in pochi minuti.

   L'utente può scegliere un riferimento, combinarne due (es. struttura da uno e motion graphics da un altro) o nessuno. Se sceglie un sito del catalogo non ancora analizzato, analizzalo con §3 prima di usarlo: le decisioni si prendono su template analizzati. Il riferimento scelto orienta le direzioni di stile proposte con V3.
3. **Traduci i punti forti in decisioni**: scaletta delle pagine (Fase 4), layout delle landing (L1), forme e densità (V), movimento e scena d'impatto (M1–M4), trattamento delle immagini (A), tecnologia consigliata (W4), tecniche apprese da confrontare con la soluzione propria (Fase 4 punto 9, [repository-template.md](repository-template.md) §5). Colori, font e tono restano del brand. Per esempio, se il riferimento usa un titolo enorme in un sans stretto, riprendi il contrasto di scala con i font scelti in T1–T5.
4. **Scrivi nel brief** (sezione Tono e stile, "Riferimenti dalla libreria") quale esempio e cosa se ne prende, e nel piano dove si applica ogni punto e l'esito dei confronti con le tecniche apprese.
5. **Adattare, non clonare**: il sito deve restare riconoscibile come il sito del brand. Vale anche la "Diversità tra siti" di [effetti-impatto.md](effetti-impatto.md): due siti consecutivi dalla stessa tipologia non usano la stessa scena d'impatto.

## §6 Gestione

- **Mostra la libreria**: riassumi le tipologie con il numero di esempi e i tratti ricorrenti in una riga.
- **Togli, unisci, rinomina**: modifica `INDICE.md`, `tipologie.md` e le cartelle su richiesta, poi riscrivi i tratti ricorrenti delle tipologie toccate. Per un template tolto lancia anche `collega-template.mjs <slug> --rimuovi` ([repository-template.md](repository-template.md) §6).
- **Mostra le tecniche**: riassumi `Tecniche Apprese/INDICE.md` per tipo, con la versione e da quali siti vengono.
- **Esempi superati**: se l'utente dice che un esempio non gli piace più, toglilo o segnalo come "da non seguire" nella scheda; resta utile come esempio negativo.
