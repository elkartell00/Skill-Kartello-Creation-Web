---
name: creation-web
description: Crea siti web da zero per qualsiasi settore (sito vetrina multipagina, landing page, one page, portfolio, sito per attività locali) guidando l'utente con domande mirate su idea, obiettivo, pagine, palette colori, tipografia H1–H6, stile e conversione. Fissa un design system che resta costante su tutto il sito, poi pianifica e costruisce sezione per sezione una prima bozza di livello professionale, con un effetto wow in motion graphics creato in codice e Studio AI solo come ultimo supporto. Usala quando l'utente chiede di creare, progettare o impostare un nuovo sito web o una landing page, oppure quando chiede di aggiungere pagine o sezioni a un sito che ha già `docs/brief-sito.md` e `docs/design-system.md`.
argument-hint: "[idea del sito]"
---

# Kartello Creation Web

Questa skill trasforma un'idea in una prima bozza di sito web di livello agenzia. Non impone uno stile: lo stile nasce dalle risposte dell'utente. Il metodo invece resta sempre lo stesso:

**domande mirate → parametri fissati → piano → costruzione sezione per sezione → controllo qualità.**

Idea iniziale passata all'avvio (può essere vuota): $ARGUMENTS

## Regole d'oro

1. **Prima le domande, poi il codice.** Non scrivere codice del sito finché brief e design system non sono approvati dall'utente. Unica eccezione: l'utente chiede esplicitamente di procedere senza domande (es. "niente domande", "fai tutto tu"); allora applica i default e dichiarali. Anche in questo caso chiedi la tecnologia (W4) e il video nella hero (A3), scrivi brief e design system, mostra un unico riepilogo (design system e piano) e attendi un ok prima del codice. "Decidi tu" detto a una singola domanda vale solo per quella domanda.
2. **I parametri approvati sono fissi.** Colori, tipografia (Display, H1–H6, testi), spaziature, raggi e animazioni vivono nel design system del progetto. Ogni valore nel codice deriva da lì: nessun valore inventato al momento. Per cambiarne uno serve una richiesta esplicita dell'utente; si aggiorna prima il design system, poi il codice.
3. **Priorità in caso di conflitto:** richiesta esplicita dell'utente > design system approvato del progetto > regole di questa skill > default del framework.
4. **Nessuno stile imposto.** La skill serve qualsiasi settore. Le direzioni in [references/stili.md](references/stili.md) sono opzioni da proporre, non regole.
5. **Non bloccarti.** Se l'utente non sa rispondere, proponi un default ragionevole, dichiaralo in una riga e prosegui.
6. **Bozza realistica ma onesta.** Scrivi testi veri, mai Lorem Ipsum. Recensioni, nomi, numeri e loghi inventati sono segnaposto: elencali in `docs/brief-sito.md`, sezione "Contenuti da sostituire", perché vanno rimpiazzati con dati reali prima della pubblicazione.
7. **Lingua.** Fai le domande nella lingua dell'utente. I testi del sito vanno nella lingua scelta nel brief.
8. **La tecnologia la sceglie l'utente.** Non esiste uno stack predefinito: in base al brief raccomanda quello più adatto al sito, spiega perché in poche righe, e lascia la decisione all'utente (domanda W4). Se risponde "decidi tu", applica l'opzione consigliata e scrivila in "Assunzioni" nel brief.
9. **Il livello del sito decide wow e budget.** All'avvio l'utente sceglie il livello (domanda G1): **Low Quality** (sito normale e semplice), **Standard** (bel sito moderno) o **High Quality** (mozzafiato, tanto motion graphics). Al livello High Quality ogni sito ha un **momento firma in motion graphics** costruito in codice (idea, storyboard, timeline, almeno tre giri di revisione su registrazione video), che è la prima cosa che si costruisce ([references/motion-graphics.md](references/motion-graphics.md)); a Standard animazioni moderne e curate, momento firma facoltativo; a Low Quality animazioni essenziali.
10. **Prima il codice, Studio AI proporzionato al livello.** Grafica, illustrazioni, icone, logo, sfondi, animazioni, motion graphics, 3D e file video si creano prima **con il codice** (SVG, Canvas, WebGL, GSAP, Three.js, Remotion), e Claude Code ci prova davvero ([references/grafica-in-codice.md](references/grafica-in-codice.md)); le foto vere del cliente si usano quando servono fotografie. L'app **Studio AI** (server MCP `studio-ai`; mai altri servizi né foto di repertorio) si può usare a ogni livello, con un **budget base proporzionato al livello** ([references/contenuti-visivi.md](references/contenuti-visivi.md) §12). Se servirebbero più generazioni del budget base, **prima si chiede**: cosa aggiungono, quanto costano e che il sito **resta allo stesso livello**, solo più completo; decide l'utente. Al livello High Quality si può spendere di più, ma il risultato deve essere davvero mozzafiato. Le richieste a Studio AI partono senza conferme, quindi la skill propone sempre l'elenco con il motivo e la stima (`stima_costo`) e genera solo dopo il sì. Se Studio AI non è collegato, segnaposto etichettati e si prosegue.
11. **Proponi, consiglia, decide l'utente.** Ogni sito è diverso. Per le scelte che danno carattere al sito (stile, struttura e layout, navigazione, animazioni, video e scroll cinematico, tecnologia) proponi 2–3 opzioni davvero diverse tra loro, ragionando su settore, obiettivo e pubblico; indica quella che consigli e spiega perché in una riga. La scelta finale è sempre dell'utente.

## Come fare le domande

- All'avvio l'utente sceglie la **modalità dell'intervista**: **Rapida**, **Standard** o **Approfondita**. Quali domande fa ogni modalità è in [references/domande.md](references/domande.md) §0.
- Lavora a giri brevi: al massimo 4–6 domande per giro, raggruppate per tema.
- Chiedi solo ciò che manca. Se l'idea iniziale, i messaggi precedenti o i file del progetto rispondono già, non richiedere.
- Domande chiuse: se è disponibile lo strumento di domande a scelta multipla (AskUserQuestion), usalo. Al massimo 4 domande per chiamata e da 2 a 4 opzioni per domanda ("Altro" si aggiunge da solo), l'opzione consigliata per prima con "(Consigliato)", anteprime per palette e scale tipografiche. Per le domande con più opzioni (es. C2, T2, V1, W3) proponi le 3–4 più adatte a settore e stile, oppure usa l'elenco numerato in chat. Se lo strumento non c'è, usa un elenco numerato in chat con le opzioni.
- Domande aperte (idea, pubblico, pagine): in chat, numerate, con un esempio di risposta.
- Ogni domanda ha un default (I1 è obbligatoria; per W4 vedi [references/domande.md](references/domande.md) §2.6). Se l'utente risponde "decidi tu", applicalo e dichiaralo.
- Dopo ogni giro, riepiloga in poche righe cosa è stato fissato.

La banca completa delle domande, con opzioni e default, è in [references/domande.md](references/domande.md).

## Flusso

### Fase 0 — Avvio

1. Controlla se nel progetto esistono già `docs/brief-sito.md`, `docs/design-system.md` e `docs/piano-sito.md`.
   - Se brief e design system esistono e sono approvati: leggili insieme al file dei token, salta i punti 2–4 e non rifare l'intervista. Se la richiesta è già chiara, procedi senza chiedere conferma; altrimenti mostra un riepilogo e chiedi se continuare, modificare un parametro o aggiungere pagine.
   - Se esiste `docs/piano-sito.md`, riprendi dal primo elemento non completato.
   - Se esiste solo uno tra brief e design system, o uno dei due è in bozza, riprendi dalla fase corrispondente.
   - Per una nuova pagina: P2 per quella pagina, scaletta e testi (Fase 4 solo per lei) da approvare, costruzione (Fase 5, punto 6) riusando header, footer e componenti esistenti, Fase 6 su quella pagina; aggiorna la tabella Pagine del brief e `docs/piano-sito.md`.
2. Controlla se il progetto ha già un framework (`package.json`, `astro.config.*`, `next.config.*`, ecc.). Se c'è, annotalo: con W4 raccomanderai di mantenerlo, ma la scelta resta all'utente.
3. Leggi l'idea iniziale e deduci tutto quello che puoi: settore, tipo di sito, obiettivo, pubblico.
4. Chiedi la modalità dell'intervista (Rapida, Standard, Approfondita) e il **livello del sito** (G1: Low Quality, Standard o High Quality), salvo che l'utente li abbia già indicati o abbia chiesto di procedere senza domande (regola d'oro 1). Se alla modalità risponde "decidi tu", vale Standard; per il livello vale High Quality.

### Fase 1 — Brief base (sempre)

Quattro giri, in quest'ordine (in modalità Rapida diventano due giri brevi con le domande essenziali). Dettagli in [references/domande.md](references/domande.md) §1.

1. **Idea**: cosa è, settore e posizionamento, obiettivo principale, pubblico, tipo di sito, lingua, riferimenti, materiali esistenti.
2. **Pagine**: proponi un elenco di pagine adatto al settore. L'utente conferma, toglie o aggiunge. Definisci l'obiettivo di ogni pagina e cosa va nel menu.
3. **Stile e palette**: prima proponi 2–3 direzioni da [references/stili.md](references/stili.md) (V3); lo stile scelto fornisce i default di colori, tipografia, forme e animazioni (domande C, T, V, M). In modalità Rapida non chiedere lo stile: dichiara quello dedotto prima di proporre le palette. Poi colori di brand oppure tre proposte; tema chiaro o scuro; quanto colore. Costruisci i ruoli colore e verifica i contrasti secondo [references/design-system.md](references/design-system.md) §2.
4. **Tipografia**: font e scala (compatta, equilibrata, d'impatto). Mostra la tabella con Display, H1–H6, testi e bottoni, con misure desktop e mobile, e falla approvare: da qui in poi è fissa. Vedi [references/design-system.md](references/design-system.md) §3.

### Fase 2 — Approfondimento mirato

Scegli dalla banca domande ([references/domande.md](references/domande.md) §2) i blocchi pertinenti al tipo di sito e all'obiettivo: conversione e prove (se il sito deve vendere, raccogliere contatti o prenotazioni), tono di voce e forme (spazio, angoli, gradienti), animazioni, navigazione, layout delle landing, SEO e tecnica. Quanti blocchi e quante domande dipende dalla modalità ([references/domande.md](references/domande.md) §0). In ogni modalità chiedi la tecnologia (W4) con la tua raccomandazione motivata e il video nella hero (A3). Prima del blocco sui contenuti visivi (A1–A6) leggi la skill `studio-ai` e il suo `CATALOGO.md`.

### Fase 3 — Brief e design system (blocco dei parametri)

1. Scrivi `docs/brief-sito.md` partendo da [templates/brief-sito.md](templates/brief-sito.md).
2. Scrivi `docs/design-system.md` partendo da [templates/design-system.md](templates/design-system.md), con tutti i valori finali.
3. Mostra un riepilogo e chiedi l'approvazione esplicita. Insieme al riepilogo prepara una **tavola di stile** in HTML (`docs/tavola-stile.html`) costruita con i token veri: logo, palette, titoli e testi, bottoni, link, una card d'esempio e la direzione delle immagini. Così l'utente vede il design system prima di approvarlo [F4].
4. Dopo l'approvazione, porta lo stato di entrambi i file ad "approvato il gg/mm/aaaa" e aggiungi al `CLAUDE.md` del progetto (crealo se manca) il blocco "Design system bloccato" che trovi in fondo al modello del design system. Così i parametri restano fissi anche nelle sessioni future.

### Fase 4 — Piano del sito

Prima di scrivere codice presenta, in quest'ordine:

1. **Mappa del sito**: pagine, gerarchia, voci di menu, CTA nell'header.
2. **Scaletta di ogni pagina**: sezioni e loro ordine ([references/strategia-e-struttura.md](references/strategia-e-struttura.md) §2–§4).
3. **Testi della hero** della Home e di ogni landing: titolo, sottotitolo, CTA, riga di prova.
4. **Benefici**: da tre a cinque, orientati al risultato.
5. **Come funziona**: tre passaggi, se pertinente.
6. **FAQ**: da sei a dodici domande e risposte, se pertinente.
7. **SEO**: indicizzare o no, title e meta description per pagina, dati strutturati ([references/seo.md](references/seo.md)).
8. **Layout** delle landing: A, B, C, D o E, con il motivo.
9. **Momento firma in motion graphics** (livello High Quality, o Standard se scelto con M4): 2–3 idee diverse, quella consigliata, e lo storyboard in 5–8 battute con i tempi ([references/motion-graphics.md](references/motion-graphics.md) §1, [references/effetti-wow.md](references/effetti-wow.md)).
10. **Piano degli asset**: ogni immagine, icona illustrativa, logo e video del sito, con come nasce (codice, cliente o Studio AI, e per Studio AI perché il codice non basta), formato e nome file, più la stima dei costi di ciò che passa da Studio AI ([references/grafica-in-codice.md](references/grafica-in-codice.md), [references/contenuti-visivi.md](references/contenuti-visivi.md) §3 e §12).

Scrivi i testi secondo [references/strategia-e-struttura.md](references/strategia-e-struttura.md) §6–§7 e [references/contenuti-e-qualita.md](references/contenuti-e-qualita.md) §1; per SEO e layout segui [references/strategia-e-struttura.md](references/strategia-e-struttura.md) §8 e §5.

Attendi l'approvazione o le correzioni. Dopo l'approvazione salva il piano in `docs/piano-sito.md` partendo da [templates/piano-sito.md](templates/piano-sito.md), con lo stato di ogni pagina e sezione (da fare, fatta), e aggiornalo durante la Fase 5.

### Fase 5 — Costruzione

1. **Fondamenta**: progetto, font, token del design system in codice (colori, classi tipografiche `type-*`, spaziature, raggi, easing) come da [references/design-system.md](references/design-system.md) §9. Se il generatore rifiuta una cartella non vuota (create-next-app non accetta `CLAUDE.md`), crea il progetto in una sottocartella temporanea e spostane i file nella radice, senza sovrascrivere `docs/` e `CLAUDE.md`.
2. **Momento firma in motion graphics** (livello High Quality), subito dopo le fondamenta: costruiscilo in codice secondo lo storyboard approvato, registralo, guardalo e miglioralo almeno tre volte finché non è all'altezza di un sito premiato ([references/motion-graphics.md](references/motion-graphics.md)).
3. **Grafica in codice**: logo SVG, icone, sfondi, illustrazioni, OG, altre animazioni del piano; controlla ogni elemento con uno screenshot ([references/grafica-in-codice.md](references/grafica-in-codice.md)). Dove servono fotografie usa quelle del cliente; altrimenti segnaposto etichettati.
4. **Struttura globale**: header e navigazione, footer, pagina 404, pagine legali.
5. **Home, sezione per sezione**: hero → benefici → come funziona → prove → FAQ → CTA finale, adattando l'ordine alla scaletta approvata.
6. **Altre pagine**, una alla volta.
7. **Animazioni** secondo il livello scelto ([references/motion.md](references/motion.md)).
8. **Studio AI, proporzionato al livello**: se servono fotografie o riprese che il codice non può fare e che il cliente non ha, proponi l'elenco con il motivo e la stima (`stima_costo`), dentro il budget base del livello (G1), e per ogni generazione in più chiedi spiegando che il sito resta allo stesso livello; genera solo dopo il sì, con le regole di [references/contenuti-visivi.md](references/contenuti-visivi.md). Al livello High Quality le generazioni che servono al momento firma si preparano prima, nella Fase 5 punto 2.

Non ricostruire mai tutta la pagina a ogni iterazione: lavora una sezione alla volta, così le modifiche restano controllabili. Dopo ogni sezione completata aggiorna lo stato in `docs/piano-sito.md`. Durante tutta la costruzione valgono [references/contenuti-e-qualita.md](references/contenuti-e-qualita.md) e il design system del progetto.

### Fase 6 — Controllo qualità e consegna

1. Passa la [checklist](references/checklist.md), compreso il controllo meccanico e il controllo SEO, e correggi ciò che non va.
2. Registra il momento firma e la Home in video e rivedili ([references/motion-graphics.md](references/motion-graphics.md) §6). Se possibile avvia il sito e controllalo a 375px, 768px e 1280px di larghezza (telefoni in dettaglio: [references/contenuti-e-qualita.md](references/contenuti-e-qualita.md) §6). Nella consegna distingui i controlli fatti da quelli non fatti.
3. Consegna: cosa è stato fatto, come avviarlo, i file creati con Studio AI e dove sono, il costo totale (`riepilogo_spese`), l'elenco "Contenuti da sostituire", i punti aperti e i prossimi passi consigliati.

## Riferimenti

| File | Quando leggerlo |
|---|---|
| [references/domande.md](references/domande.md) | Fasi 1 e 2: tutte le domande, con opzioni e default |
| [references/design-system.md](references/design-system.md) | Palette, tipografia, spaziature, raggi, bordi, icone, token in codice |
| [references/stili.md](references/stili.md) | Fase 1, giro 3: scelta della direzione stilistica |
| [references/strategia-e-struttura.md](references/strategia-e-struttura.md) | Fasi 4 e 5: struttura delle pagine, conversione, testi, SEO |
| [references/motion.md](references/motion.md) | Animazioni, navigazione, sezione tagline |
| [references/contenuti-e-qualita.md](references/contenuti-e-qualita.md) | Fasi 4 e 5: scrittura dei testi e costruzione |
| [references/motion-graphics.md](references/motion-graphics.md) | Fasi 4, 5 e 6: il momento firma in motion graphics, metodo, ricettario, revisione |
| [references/grafica-in-codice.md](references/grafica-in-codice.md) | Fasi 4 e 5: prima il codice per grafica, 3D e video |
| [references/contenuti-visivi.md](references/contenuti-visivi.md) | Fasi 2, 4 e 5: foto del cliente e Studio AI come ultimo passaggio |
| [references/scroll-cinematico.md](references/scroll-cinematico.md) e [references/scroll-cinematico-prompt.md](references/scroll-cinematico-prompt.md) | Solo se A3 = video guidato dallo scroll o L1 = E: scroll cinematico con il motore in `assets/scroll-cinematico/` |
| [references/volo-in-prima-persona.md](references/volo-in-prima-persona.md) | Solo se X3 = volo in prima persona nei locali |
| [references/seo.md](references/seo.md) | Fasi 4 e 6: title, meta, dati strutturati, contenuti citabili dalle AI, controllo SEO |
| [references/effetti-wow.md](references/effetti-wow.md) | Fasi 2 e 4: effetto firma (M4) e diversità tra siti |
| [references/siti-3d-scroll.md](references/siti-3d-scroll.md) | Se l'effetto firma è un "3D scroll" (famiglia E): ricette E1–E7 e motore in `assets/scroll-3d/` |
| [references/checklist.md](references/checklist.md) | Fase 6 |
| [references/fonti.md](references/fonti.md) | Origine delle regole integrate e licenze |
