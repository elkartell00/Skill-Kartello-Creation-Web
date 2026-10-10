---
name: creation-web
description: Crea siti web da zero per qualsiasi settore (sito vetrina multipagina, landing page, one page, portfolio, sito per attività locali) guidando l'utente con domande mirate su idea, obiettivo, pagine, palette colori, tipografia H1–H6, stile e conversione. Fissa un design system che resta costante su tutto il sito, poi pianifica e costruisce sezione per sezione una prima bozza di livello professionale. Usala quando l'utente chiede di creare, progettare o impostare un nuovo sito web o una landing page.
argument-hint: "[idea del sito]"
---

# Kartello Creation Web

Questa skill trasforma un'idea in una prima bozza di sito web di livello agenzia. Non impone uno stile: lo stile nasce dalle risposte dell'utente. Il metodo invece resta sempre lo stesso:

**domande mirate → parametri fissati → piano → costruzione sezione per sezione → controllo qualità.**

Idea iniziale passata all'avvio (può essere vuota): $ARGUMENTS

## Regole d'oro

1. **Prima le domande, poi il codice.** Non scrivere codice del sito finché brief e design system non sono approvati dall'utente. Unica eccezione: l'utente chiede esplicitamente di procedere senza domande ("decidi tu", "vai"); allora applica i default e dichiarali.
2. **I parametri approvati sono fissi.** Colori, tipografia (Display, H1–H6, testi), spaziature, raggi e animazioni vivono nel design system del progetto. Ogni valore nel codice deriva da lì: nessun valore inventato al momento. Per cambiarne uno serve una richiesta esplicita dell'utente; si aggiorna prima il design system, poi il codice.
3. **Priorità in caso di conflitto:** richiesta esplicita dell'utente > design system approvato del progetto > regole di questa skill > default del framework.
4. **Nessuno stile imposto.** La skill serve qualsiasi settore. Le direzioni in [references/stili.md](references/stili.md) sono opzioni da proporre, non regole.
5. **Non bloccarti.** Se l'utente non sa rispondere, proponi un default ragionevole, dichiaralo in una riga e prosegui.
6. **Bozza realistica ma onesta.** Scrivi testi veri, mai Lorem Ipsum. Recensioni, nomi, numeri e loghi inventati sono segnaposto: elencali in `docs/brief-sito.md`, sezione "Contenuti da sostituire", perché vanno rimpiazzati con dati reali prima della pubblicazione.
7. **Lingua.** Fai le domande nella lingua dell'utente. I testi del sito vanno nella lingua scelta nel brief.

## Come fare le domande

- Lavora a giri brevi: al massimo 4–6 domande per giro, raggruppate per tema.
- Chiedi solo ciò che manca. Se l'idea iniziale, i messaggi precedenti o i file del progetto rispondono già, non richiedere.
- Domande chiuse: se è disponibile lo strumento di domande a scelta multipla (AskUserQuestion), usalo. Al massimo 4 domande per chiamata, l'opzione consigliata per prima con "(Consigliato)", anteprime per palette e scale tipografiche. Altrimenti usa un elenco numerato in chat con le opzioni.
- Domande aperte (idea, pubblico, pagine): in chat, numerate, con un esempio di risposta.
- Ogni domanda ha un default. Se l'utente risponde "decidi tu", applicalo e dichiaralo.
- Dopo ogni giro, riepiloga in poche righe cosa è stato fissato.

La banca completa delle domande, con opzioni e default, è in [references/domande.md](references/domande.md).

## Flusso

### Fase 0 — Avvio

1. Controlla se nel progetto esistono già `docs/brief-sito.md` e `docs/design-system.md`. Se sì, mostra un riepilogo e chiedi se continuare, modificare un parametro o aggiungere pagine. Non rifare l'intervista da capo.
2. Controlla se il progetto ha già un framework (`package.json`, `astro.config.*`, `next.config.*`, ecc.): lo stack rilevato vince sulla domanda dello stack.
3. Leggi l'idea iniziale e deduci tutto quello che puoi: settore, tipo di sito, obiettivo, pubblico.

### Fase 1 — Brief base (sempre)

Quattro giri, in quest'ordine. Dettagli in [references/domande.md](references/domande.md) §1.

1. **Idea**: cosa è, settore e posizionamento, obiettivo principale, pubblico, tipo di sito, lingua, riferimenti, materiali esistenti.
2. **Pagine**: proponi un elenco di pagine adatto al settore. L'utente conferma, toglie o aggiunge. Definisci l'obiettivo di ogni pagina e cosa va nel menu.
3. **Palette colori**: colori di brand oppure tre proposte; tema chiaro o scuro; quanto colore. Costruisci i ruoli colore e verifica i contrasti secondo [references/design-system.md](references/design-system.md) §2.
4. **Tipografia**: font e scala (compatta, equilibrata, d'impatto). Mostra la tabella con Display, H1–H6, testi e bottoni, con misure desktop e mobile, e falla approvare: da qui in poi è fissa. Vedi [references/design-system.md](references/design-system.md) §3.

### Fase 2 — Approfondimento mirato

Scegli dalla banca domande ([references/domande.md](references/domande.md) §2) solo i blocchi pertinenti al tipo di sito e all'obiettivo: conversione e prove (se il sito deve vendere, raccogliere contatti o prenotazioni), tono di voce, stile, animazioni, navigazione, SEO e tecnica. Uno o due giri al massimo.

### Fase 3 — Brief e design system (blocco dei parametri)

1. Scrivi `docs/brief-sito.md` partendo da [templates/brief-sito.md](templates/brief-sito.md).
2. Scrivi `docs/design-system.md` partendo da [templates/design-system.md](templates/design-system.md), con tutti i valori finali.
3. Mostra un riepilogo e chiedi l'approvazione esplicita.
4. Dopo l'approvazione, aggiungi al `CLAUDE.md` del progetto (crealo se manca) il blocco "Design system bloccato" che trovi in fondo al modello del design system. Così i parametri restano fissi anche nelle sessioni future.

### Fase 4 — Piano del sito

Prima di scrivere codice presenta, in quest'ordine:

1. **Mappa del sito**: pagine, gerarchia, voci di menu, CTA nell'header.
2. **Scaletta di ogni pagina**: sezioni e loro ordine ([references/strategia-e-struttura.md](references/strategia-e-struttura.md) §2–§4).
3. **Testi della hero** della Home e di ogni landing: titolo, sottotitolo, CTA, riga di prova.
4. **Benefici**: da tre a cinque, orientati al risultato.
5. **Come funziona**: tre passaggi, se pertinente.
6. **FAQ**: da sei a dodici domande e risposte, se pertinente.
7. **SEO**: indicizzare o no, title e meta description per pagina.
8. **Layout** delle landing: A, B, C o D, con il motivo.

Attendi l'approvazione o le correzioni.

### Fase 5 — Costruzione

1. **Fondamenta**: progetto, font, token del design system in codice (colori, classi tipografiche `type-*`, spaziature, raggi, easing) come da [references/design-system.md](references/design-system.md) §9.
2. **Struttura globale**: header e navigazione, footer, pagina 404, pagine legali.
3. **Home, sezione per sezione**: hero → benefici → come funziona → prove → FAQ → CTA finale, adattando l'ordine alla scaletta approvata.
4. **Altre pagine**, una alla volta.
5. **Animazioni** secondo il livello scelto ([references/motion.md](references/motion.md)).

Non ricostruire mai tutta la pagina a ogni iterazione: lavora una sezione alla volta, così le modifiche restano controllabili. Durante tutta la costruzione valgono [references/contenuti-e-qualita.md](references/contenuti-e-qualita.md) e il design system del progetto.

### Fase 6 — Controllo qualità e consegna

1. Passa la [checklist](references/checklist.md) e correggi ciò che non va.
2. Se possibile avvia il sito e controllalo a 375px, 768px e 1280px di larghezza.
3. Consegna: cosa è stato fatto, come avviarlo, l'elenco "Contenuti da sostituire", i punti aperti e i prossimi passi consigliati.

## Riferimenti

| File | Quando leggerlo |
|---|---|
| [references/domande.md](references/domande.md) | Fasi 1 e 2: tutte le domande, con opzioni e default |
| [references/design-system.md](references/design-system.md) | Palette, tipografia, spaziature, raggi, bordi, icone, token in codice |
| [references/stili.md](references/stili.md) | Quando si sceglie la direzione stilistica |
| [references/strategia-e-struttura.md](references/strategia-e-struttura.md) | Struttura delle pagine, conversione, testi, SEO |
| [references/motion.md](references/motion.md) | Animazioni, navigazione, sezione tagline |
| [references/contenuti-e-qualita.md](references/contenuti-e-qualita.md) | Scrittura dei testi e costruzione |
| [references/checklist.md](references/checklist.md) | Fase 6 |
| [references/fonti.md](references/fonti.md) | Origine delle regole integrate e licenze |
