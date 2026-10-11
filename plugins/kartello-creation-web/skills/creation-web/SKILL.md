---
name: creation-web
description: Crea siti web da zero per qualsiasi settore (sito vetrina multipagina, landing page, one page, portfolio, sito per attività locali) guidando l'utente con domande mirate su idea, obiettivo, pagine, palette colori, tipografia H1–H6, stile e conversione. Fissa un design system che resta costante su tutto il sito, poi pianifica e costruisce sezione per sezione una prima bozza di livello professionale, con immagini, logo e video creati con Studio AI. Usala quando l'utente chiede di creare, progettare o impostare un nuovo sito web o una landing page, oppure quando chiede di aggiungere pagine o sezioni a un sito che ha già `docs/brief-sito.md` e `docs/design-system.md`.
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
9. **Immagini, video e audio solo con Studio AI.** Si generano sempre e solo con l'app Studio AI (server MCP `studio-ai`), mai con altri servizi o foto di repertorio. Le foto del cliente hanno la precedenza. Se Studio AI non è collegato, usa segnaposto etichettati e prosegui. Le richieste a Studio AI partono senza conferme: la stima e il via dell'utente li chiede la skill. Tutto in [references/contenuti-visivi.md](references/contenuti-visivi.md).
10. **Proponi, consiglia, decide l'utente.** Ogni sito è diverso. Per le scelte che danno carattere al sito (stile, struttura e layout, navigazione, animazioni, video e scroll cinematico, tecnologia) proponi 2–3 opzioni davvero diverse tra loro, ragionando su settore, obiettivo e pubblico; indica quella che consigli e spiega perché in una riga. La scelta finale è sempre dell'utente.

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
   - Per una nuova pagina: P2 per quella pagina, scaletta e testi (Fase 4 solo per lei) da approvare, costruzione (Fase 5, punto 5) riusando header, footer e componenti esistenti, Fase 6 su quella pagina; aggiorna la tabella Pagine del brief e `docs/piano-sito.md`.
2. Controlla se il progetto ha già un framework (`package.json`, `astro.config.*`, `next.config.*`, ecc.). Se c'è, annotalo: con W4 raccomanderai di mantenerlo, ma la scelta resta all'utente.
3. Leggi l'idea iniziale e deduci tutto quello che puoi: settore, tipo di sito, obiettivo, pubblico.
4. Chiedi la modalità dell'intervista (Rapida, Standard, Approfondita), salvo che l'utente l'abbia già indicata o abbia chiesto di procedere senza domande (regola d'oro 1). Se a questa domanda risponde "decidi tu", vale Standard.

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
3. Mostra un riepilogo e chiedi l'approvazione esplicita.
4. Dopo l'approvazione, porta lo stato di entrambi i file ad "approvato il gg/mm/aaaa" e aggiungi al `CLAUDE.md` del progetto (crealo se manca) il blocco "Design system bloccato" che trovi in fondo al modello del design system. Così i parametri restano fissi anche nelle sessioni future.

### Fase 4 — Piano del sito

Prima di scrivere codice presenta, in quest'ordine:

1. **Mappa del sito**: pagine, gerarchia, voci di menu, CTA nell'header.
2. **Scaletta di ogni pagina**: sezioni e loro ordine ([references/strategia-e-struttura.md](references/strategia-e-struttura.md) §2–§4).
3. **Testi della hero** della Home e di ogni landing: titolo, sottotitolo, CTA, riga di prova.
4. **Benefici**: da tre a cinque, orientati al risultato.
5. **Come funziona**: tre passaggi, se pertinente.
6. **FAQ**: da sei a dodici domande e risposte, se pertinente.
7. **SEO**: indicizzare o no, title e meta description per pagina.
8. **Layout** delle landing: A, B, C, D o E, con il motivo.
9. **Piano degli asset**: ogni immagine, icona illustrativa, logo e video del sito, con preset, formato e nome file, più la stima dei costi ([references/contenuti-visivi.md](references/contenuti-visivi.md) §3 e §12).

Scrivi i testi secondo [references/strategia-e-struttura.md](references/strategia-e-struttura.md) §6–§7 e [references/contenuti-e-qualita.md](references/contenuti-e-qualita.md) §1; per SEO e layout segui [references/strategia-e-struttura.md](references/strategia-e-struttura.md) §8 e §5.

Attendi l'approvazione o le correzioni. Dopo l'approvazione salva il piano in `docs/piano-sito.md` partendo da [templates/piano-sito.md](templates/piano-sito.md), con lo stato di ogni pagina e sezione (da fare, fatta), e aggiornalo durante la Fase 5.

### Fase 5 — Costruzione

1. **Fondamenta**: progetto, font, token del design system in codice (colori, classi tipografiche `type-*`, spaziature, raggi, easing) come da [references/design-system.md](references/design-system.md) §9. Se il generatore rifiuta una cartella non vuota (create-next-app non accetta `CLAUDE.md`), crea il progetto in una sottocartella temporanea e spostane i file nella radice, senza sovrascrivere `docs/` e `CLAUDE.md`.
2. **Contenuti visivi**: salva lo stile con `salva_stile` e lancia in un solo `genera_lotto` le immagini del piano degli asset; mentre Studio AI lavora prosegui con i punti seguenti, poi controlla le anteprime e rigenera solo ciò che non va. I video si generano solo dopo l'approvazione della loro immagine di partenza e il via sulla stima ([references/contenuti-visivi.md](references/contenuti-visivi.md)).
3. **Struttura globale**: header e navigazione, footer, pagina 404, pagine legali.
4. **Home, sezione per sezione**: hero → benefici → come funziona → prove → FAQ → CTA finale, adattando l'ordine alla scaletta approvata.
5. **Altre pagine**, una alla volta.
6. **Animazioni** secondo il livello scelto ([references/motion.md](references/motion.md)).

Non ricostruire mai tutta la pagina a ogni iterazione: lavora una sezione alla volta, così le modifiche restano controllabili. Dopo ogni sezione completata aggiorna lo stato in `docs/piano-sito.md`. Durante tutta la costruzione valgono [references/contenuti-e-qualita.md](references/contenuti-e-qualita.md) e il design system del progetto.

### Fase 6 — Controllo qualità e consegna

1. Passa la [checklist](references/checklist.md) e correggi ciò che non va.
2. Se possibile avvia il sito e controllalo a 375px, 768px e 1280px di larghezza.
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
| [references/contenuti-visivi.md](references/contenuti-visivi.md) | Fasi 2, 4 e 5: immagini, logo, icone, video e audio con Studio AI |
| [references/scroll-cinematico.md](references/scroll-cinematico.md) e [references/scroll-cinematico-prompt.md](references/scroll-cinematico-prompt.md) | Solo se A3 = video guidato dallo scroll o L1 = E: scroll cinematico con il motore in `assets/scroll-cinematico/` |
| [references/checklist.md](references/checklist.md) | Fase 6 |
| [references/fonti.md](references/fonti.md) | Origine delle regole integrate e licenze |
