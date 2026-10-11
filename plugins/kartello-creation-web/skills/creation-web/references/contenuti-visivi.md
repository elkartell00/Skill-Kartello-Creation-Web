# Contenuti visivi: immagini, video e audio con Studio AI

Le regole marcate [SA] vengono dalle istruzioni Studio AI del proprietario; quelle marcate [F2] sono pratiche ricavate da altre skill di generazione e riscritte per Studio AI (vedi [fonti.md](fonti.md)). Parametri, preset, prezzi e codici di errore esatti stanno nel `CATALOGO.md` della skill `studio-ai`: questo file non li ricopia, li usa.

## §1 Regola di base: prima il codice, Studio AI per ultimo

- **Prima il codice** (scelta del proprietario): grafica, illustrazioni, icone, logo, sfondi, animazioni, motion graphics, 3D e video di motion graphics si creano con il codice ([grafica-in-codice.md](grafica-in-codice.md)). Questo file vale per ciò che il codice non può fare.
- Quando serve una generazione (tipicamente fotografie realistiche e riprese dal vero), si usa **solo Studio AI** (server MCP `studio-ai`) [SA]. Mai altri generatori, mai chiamate dirette alle API dei modelli, mai foto di repertorio o immagini prese da servizi esterni.
- **Ordine di preferenza** per ogni slot: 1) codice, per tutto ciò che è grafico o animato; 2) foto e file reali del cliente, quando servono fotografie vere; 3) Studio AI, solo se codice e cliente non bastano; 4) segnaposto etichettato con slot, formato e dimensioni (es. "foto prodotto hero 1920×1080"), elencato in "Contenuti da sostituire" [F2].
- **Se Studio AI non risponde** nella sessione (es. sessione cloud senza il server collegato): non ripiegare su altro. Usa segnaposto etichettati, elencali in "Contenuti da sostituire", spiega all'utente che le immagini si generano dove Studio AI è collegato (nell'app: Impostazioni → Collega a Claude Code, poi riaprire la sessione) e prosegui con il resto del sito [SA].
- Mai una fotografia necessaria sostituita da un disegno povero, mai finti screenshot fatti con `div`, mai hero composte solo da un gradiente. Le illustrazioni e le animazioni in codice sono ammesse e preferite quando sono di livello e coerenti con lo stile. Anche un sito minimal ha almeno 2–3 elementi visivi veri, in codice o fotografici [F2, scelta del proprietario].

## §2 Prima di generare: skill studio-ai e CATALOGO

1. Leggi la skill `studio-ai` e il suo `CATALOGO.md` prima di pianificare i contenuti [SA]. Se il catalogo e la realtà non coincidono, fa fede `elenco_modelli`.
2. Verifica che il server risponda (es. `riepilogo_spese`, che non spende nulla) e annota tetto e residuo di spesa [F2].
3. Studio AI usa i modelli di Google (immagini e video), OpenAI (immagini, testo nitido) ed ElevenLabs (effetti sonori, musica, voce). Non indicare il modello se l'utente non lo chiede: l'app sceglie e spiega perché.
4. **Le richieste a Studio AI partono subito, senza conferme**: l'unico limite è il tetto di spesa dell'utente. Le conferme le chiede la skill (§12).

## §3 Piano degli asset

Prima del codice, nella Fase 4, prepara **un solo piano per tutto il sito** e salvalo in `docs/piano-sito.md`, sezione "Piano degli asset" [F2]:

- una riga per ogni slot di ogni pagina: hero, sezioni, card, prodotti, ritratti, galleria, sfondi per testo, immagine OG, favicon, icone illustrative, logo (solo se manca), video facoltativi;
- per ogni riga: pagina, slot, preset, formato e dimensioni finali, nome file, da cosa dipende (stile, logo, scena base, prodotto), essenziale o facoltativo, stato;
- ogni generazione serve uno slot preciso: niente immagini in più "per sicurezza";
- gli asset del cliente vincono sempre (§8): si genera solo ciò che manca.

## §4 Scheda di stile e salva_stile

Prima di qualsiasi generazione a pagamento compila la **scheda di stile** del cliente e salvala con `salva_stile` (es. "Stile Pizzeria Rossi") [SA]. Poi passa `stile` a ogni immagine e video del sito, così tutto resta coerente [SA].

La scheda contiene [F2]:
- nome del marchio scritto esattamente e percorso del logo;
- palette con hex e ruolo di ogni colore, presa dal design system (un solo accento; neutri tutti caldi o tutti freddi);
- tipo di immagini e atmosfera (domanda A1);
- luce (direzione, temperatura, contrasto), inquadrature tipiche, prospettiva, materiali e finiture, comportamento dello sfondo;
- il "mondo materiale" dell'attività: le cose concrete che tocca (legno, acciaio, farina, vapore…);
- almeno due cose da evitare, compresi i segni tipici dell'immagine sintetica: lucidità plastica ovunque, bagliori e neon a caso, oggetti fluttuanti senza senso, bloom e foschia eccessivi, marmo e piedistallo "lusso" generico, microtesti finti.

**Una sola immagine madre** per ogni soggetto ricorrente (prodotto, scena, casa): le altre immagini dello stesso soggetto si fanno come **modifiche** della madre (`modifica_immagine`), mai da zero, così prodotto, camera e luce restano identici [F6].

Per un elemento usa **un solo modo di guidare lo stile**: lo stile salvato oppure un'immagine di riferimento, salvo che il catalogo dica che si combinano [F2]. Le persone che ricorrono in più immagini si salvano con `salva_personaggio` (§8).

## §5 Preset per ogni slot

Genera tutte le immagini del piano in **un solo `genera_lotto`** con i preset delle parti del sito: `hero-sito`, `banner-sito`, `sezione-sito`, `card-sito`, `prodotto-sito`, `ritratto-sito`, `galleria-sito`, `sfondo-sito`, `social-sito`, `icona-sito`, `logo-sito` [SA]. Per ogni voce [SA]:
- `cartella_destinazione` = la cartella immagini del progetto (es. `public/img`);
- `nome_file` parlante e stabile (`hero.webp`, `servizio-consegna.webp`, `card-3-pizza-margherita.webp`), così si rifà una sola voce senza toccare le altre [F2];
- `contesto.progetto` = nome del sito, più `contesto.scopo` con lo slot;
- `stile` = lo stile salvato.

Scegli il preset in base a cosa l'immagine deve mostrare, dal più specifico al più generico [F2]: logo → `logo-sito`; icone illustrative e favicon → `icona-sito`; prodotto del cliente → `prodotto-sito`; persone → `ritratto-sito`; ambienti senza persone → `sfondo-sito` o `sezione-sito` (scrivi "ambiente disabitato"); testata larga → `hero-sito` o `banner-sito`; anteprima social → `social-sito`; serie omogenee → `galleria-sito` o `card-sito`; tutto il resto → `sezione-sito`.

Ogni slot ha il suo formato fin dalla generazione, mai un formato unico ritagliato poi con il CSS; per misure diverse dal preset usa `larghezza` e `altezza` [F2].

## §6 Scrivere i prompt

- **Due parti** [F2]: lo stile salvato fa da blocco fisso; nel prompt va solo la parte variabile, breve: soggetto e ambientazione, inquadratura (obiettivo, altezza, angolazione), luce, medium.
- **Un'idea legata a quell'attività**, non un soggetto generico: oggetti, materiali e ambienti credibili per il settore, presi dal mondo materiale della scheda [F2].
- **In positivo**: "nitidissimo" invece di "non sfocato", "ambiente disabitato" invece di "senza persone". Le esclusioni vanno in `prompt_negativo` [F2].
- **Testi**: i testi esatti (titoli, prezzi, nome del marchio, testi di interfaccia) restano nell'HTML. Se un testo deve stare nella scena (un'insegna), va tra virgolette nel prompt [SA].
- **Composizione**: soggetto al centro, spazio negativo pulito dove andrà il testo, niente di essenziale ai bordi (le immagini a tutto schermo usano `object-fit: cover`) [F2].
- **Mai** persone pubbliche reali, marchi altrui, personaggi protetti, nomi di artisti o studi, contenuti sessuali o violenti: traduci ogni riferimento in qualità formali (geometria, contrasto, materiale, ritmo) [F2].
- `migliora_prompt: true` si può usare per le immagini, non per la voce.

## §7 Logo, favicon e icone

- **Logo esistente**: si usa il file del cliente, mai ridisegnato o rigenerato. Le varianti (bianca, nera, monocolore) si ricavano dal file originale [F2].
- **Logo nuovo** (solo se manca): prima **in codice**, simbolo e nome in SVG ([grafica-in-codice.md](grafica-in-codice.md) §2). Solo se il simbolo in codice non basta, con `logo-sito` Studio AI genera **solo il simbolo, senza testo**. Il nome del marchio si compone in SVG o HTML con il font del sito, così è sempre esatto e modificabile. *Scelta del proprietario: prevale sull'indicazione del catalogo di scrivere il nome tra virgolette nel prompt di `logo-sito`.* Prima si approva la palette, poi tre candidati con parametri identici (`varianti: 3`), ognuno con un solo concetto; l'utente sceglie [F2].
- **Icone, modello misto** (scelta del proprietario):
  - icone d'interfaccia semplici (lente, frecce, telefono, busta, menu, chiusura) da una sola libreria pronta, quella del design system ([design-system.md](design-system.md) §7);
  - icone illustrative dei servizi (es. un dente per un dentista, una forchetta per un ristorante) prima come **set SVG in codice**, con `icona-sito` di Studio AI solo se il codice non basta; in ogni caso un unico set coerente: stesso tratto, palette, prospettiva e peso [F2];
  - mai mescolate nella stessa zona della pagina.
- **Favicon** dal simbolo del logo in SVG (oppure, se il logo viene da Studio AI, con `icona-sito` 512×512 PNG), poi `favicon.ico` 32 px, `apple-touch-icon` 180 px e le icone 192/512 per il manifest, ricavate in locale [F2].
- **Immagine OG** composta in codice (pagina HTML 1200×630 salvata in PNG, [grafica-in-codice.md](grafica-in-codice.md) §4), oppure con `social-sito` se serve una fotografia; in ogni caso composta apposta nel linguaggio del marchio, non un ritaglio della hero; una per ogni pagina principale nei siti multipagina [F2].

## §8 Foto reali del cliente e persone

- **Le foto del cliente hanno la precedenza** sulle generate (domanda A5). I consensi si registrano nel brief [SA, scelta del proprietario]:
  - senza consenso: si usano così come sono, solo ottimizzate per il web;
  - con il consenso del cliente: Studio AI può ritoccarle con `modifica_immagine` (luce, colori, stile del sito) mantenendo persone e oggetti; il prompt descrive solo cosa cambia e dichiara cosa preservare (soggetto, inquadratura, prospettiva, sfondo) [F2];
  - con il consenso del cliente **e delle persone ritratte**: le foto possono fare da riferimento per nuove immagini della stessa persona o dello stesso prodotto (`immagini_riferimento`, oppure `salva_personaggio` per una persona che ricorre).
- I fornitori possono rifiutare le persone reali (`RIFIUTO_SICUREZZA`): riformula al massimo due volte, poi usa la foto originale e dillo all'utente.
- **Persone generate da zero**: sempre inventate, mai somiglianti a persone reali, con un taglio editoriale credibile per il luogo e il paese; nomi realistici nelle testimonianze. Una persona che ricorre in più pagine si crea una volta e si salva con `salva_personaggio` [F2].
- **Prodotti**: chiedi sempre una foto reale del prodotto; il tipo di scatto dipende dall'uso (catalogo su fondo neutro, prodotto in uso, dettaglio con le mani) [F2].

## §9 Video

- **Il video nella hero si chiede sempre** (domanda A3), senza default: nessun video, **animazione in codice** (consigliata quando il soggetto non deve essere fotografico: nessun costo, nitida a ogni risoluzione), loop di sfondo, oppure video guidato dallo scroll, cioè lo scroll cinematico ([scroll-cinematico.md](scroll-cinematico.md)). Per le opzioni che passano da Studio AI mostra la stima [scelta del proprietario].
- **Prima l'immagine, poi il video**: si genera e si approva il fotogramma di partenza (di solito la hero), poi lo si anima con `anima_immagine` come primo fotogramma. Il prompt del video descrive solo il movimento della camera e del soggetto [F2].
- **Loop di sfondo** [SA]: `genera_video` o `anima_immagine` in 16:9, 8 s, `audio: false`, livello standard; nel markup `autoplay muted loop playsinline` con l'immagine hero come `poster`.
- **Requisiti per il web** [F2]: un solo movimento di camera continuo e lento, senza tagli; soggetto centrato con spazio per il testo; esposizione e colore costanti; grade e palette uguali alle immagini.
- **Movimento adatto al settore** [F2]: prodotto e lusso, mezza orbita lenta; immobiliare e ospitalità, camera fluida attraverso le porte; industria, carrellata laterale bassa; esterni e viaggi, salita con rivelazione; cibo e artigianato, avvicinamento al gesto e ritorno.
- **Mobile**: di default una ricodifica più leggera dello stesso video (altezza 720 px), senza costi extra; un 9:16 nativo solo se l'utente lo chiede, con la sua stima [F2].
- **Durate e risoluzioni** dal catalogo: clip da 4, 6 o 8 s; 1080p solo a 8 s. Per il web basta 1080p; 4K solo su richiesta.
- I video lavorano in background: lanciali con `attendi_secondi: 0`, continua a costruire la pagina e controlla con `stato_lavoro`. Se un lavoro supera l'attesa non rilanciarlo: lo pagheresti due volte [SA, F2].
- I video esistono in una sola copia, quella nel progetto: non cancellarli finché servono.

## §10 Audio

- **I video del sito sono muti** (sfondo, hero, loop, scroll): `audio: false` in generazione e `muted` nel markup [F2].
- L'audio si crea solo per un uso esplicito chiesto dall'utente: un video con player e comandi, un suono di marca dietro un interruttore, una voce fuori campo. Mai audio in riproduzione automatica.
- Regola d'oro dell'audio di Studio AI: prima `cerca_suoni` (gratis), poi genera solo ciò che manca [SA]. Prompt audio in inglese.

## §11 Controllo, rigenerazione e consegna dei file

- **Controlla le anteprime** che arrivano con le risposte. Rivedi le immagini tutte insieme, come le vedrà chi scorre il sito: luce, palette, angolazione e grana sono gli stessi? [SA, F2]
- **Rigenera solo ciò che non va**, con un prompt più preciso; dopo due rigenerazioni ancora generiche cambia l'idea, non le parole. Preferisci le correzioni piccole e locali (testo in HTML, ritaglio, colore) alla rigenerazione [SA, F2].
- **Errori**: segui `cosa_fare` della risposta. `RIFIUTO_SICUREZZA`: riformula al massimo due volte. `TETTO_SUPERATO`, `CREDITO_ESAURITO` e gli errori di chiave: fermati e avvisa l'utente [SA].
- **File nel progetto**, richiamati con percorsi locali, mai con URL esterni [F2].
- **Nel markup** usa `width` e `height` reali restituiti dalla risposta (non quelli richiesti) e un `alt` descrittivo in italiano; `alt` vuoto per le immagini decorative; mai "immagine di…" [SA, F2]. Niente marchio dello strumento di generazione in pagina.
- Immagini sotto la piega con caricamento differito, mai la hero ([contenuti-e-qualita.md](contenuti-e-qualita.md) §5).
- Tieni nel piano lo stato di ogni asset (da generare, generato, approvato, da sostituire) e il nome del file.

## §12 Costi e approvazioni

- **Spesa proporzionata al livello del sito** (G1, scelta del proprietario), sempre dopo aver provato in codice. Budget base indicativi: **Low Quality** (sito normale) fino a 2–3 immagini e al massimo 1 video; **Standard** (bel sito moderno) fino a 5–6 immagini e 1–2 video; **High Quality** più ampio, ma ogni generazione deve servire all'esperienza d'impatto del sito ([motion-graphics.md](motion-graphics.md)): mai spendere tanto per poi consegnare un sito normale.
- **Generazioni oltre il budget base: si chiede prima.** Spiega all'utente cosa aggiungerebbero, la stima e, con chiarezza, che il sito **resta allo stesso livello** ("resta un sito Low Quality, solo più completo"); genera solo se dice sì.
- **Studio AI non parte mai da solo** (scelta del proprietario): la prima versione del sito si costruisce in codice e con le foto del cliente. A sito costruito, le immagini di Studio AI eventualmente necessarie si propongono come elenco (slot, motivo per cui il codice non basta, stima con `stima_costo`) e si generano solo dopo il sì esplicito dell'utente.
- **Video e catene di video**: si propongono, si mostra la stima (`stima_costo`, più circa il 15% di margine per le rigenerazioni) e si generano solo dopo un sì esplicito dell'utente. Il silenzio non vale come approvazione [F2].
- `genera_lotto` controlla il costo totale prima di partire: o partono tutte le voci o nessuna [SA].
- **A fine lavoro** riassumi all'utente: file creati, dove sono, a cosa servono, cosa resta da sostituire e il costo totale (`riepilogo_spese`) [SA].

## §13 Funzioni di Studio AI per il sito

Riepilogo di cosa usare; i parametri esatti sono nel `CATALOGO.md`.

| Serve | Funzione | Nota per il sito |
|---|---|---|
| Tutte le immagini del sito | `genera_lotto` con i preset `*-sito` | Un solo lotto, fino a 50 voci, costo controllato prima |
| Un'immagine singola o una rigenerazione | `genera_immagine` | Stesso stile e preset del lotto |
| Ritocco di foto del cliente, varianti da un'immagine approvata | `modifica_immagine` | Solo con il consenso registrato (§8) |
| Stile coerente | `salva_stile`, poi `stile` | Una volta per sito (§4) |
| Persona ricorrente | `salva_personaggio`, poi `personaggi` | Inventata, oppure reale con consenso (§8) |
| Video della hero | `anima_immagine` (dal fotogramma approvato) o `genera_video` | 16:9, 8 s, `audio: false` |
| Video con fotogramma iniziale e finale | `anima_immagine` con `immagine_iniziale` e `immagine_finale` | Per i video concatenati guidati dallo scroll |
| Sfondo trasparente | `sfondo_trasparente: true`, preset `logo-sito` e `icona-sito` | Ritagli di prodotti e oggetti |
| Riferimenti visivi | `immagini_riferimento` | Logo, prodotto, scena base, persona |
| Più candidati | `varianti` 1–4 | 2 per la hero, 3 per un logo nuovo |
| Lavori lunghi | `stato_lavoro`, `stato_lotto`, `annulla_lavoro` | Non rilanciare un lavoro in corso |
| Costi | `stima_costo`, `riepilogo_spese` | Prima e dopo ogni spesa rilevante |
| Audio | `cerca_suoni`, `usa_suono`, `genera_effetto_sonoro`, `genera_musica`, `genera_voce` | Solo su richiesta esplicita (§10) |

Studio AI **non** fa: modelli 3D, trascrizioni, clonazione di voci, pubblicazione, montaggio. Non promettere queste cose all'utente.
