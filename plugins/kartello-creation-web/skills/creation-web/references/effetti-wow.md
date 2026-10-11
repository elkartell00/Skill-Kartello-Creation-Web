# Effetti firma ("wow")

L'effetto firma è la cosa che il visitatore ricorda. **Uno per pagina**, scelto nel piano e realizzato fino in fondo, preso da questo catalogo e non dalla prima idea che viene in mente [F5]. È un'opzione da proporre (domanda M4), mai un obbligo: la skill consiglia, l'utente sceglie (regola d'oro 10). Le immagini e i video degli effetti si creano con Studio AI ([contenuti-visivi.md](contenuti-visivi.md)).

## Come scegliere [F5]

1. **L'effetto mette in scena l'idea del sito**: una "precisione" vuole messa a fuoco e fisica esatta; una "salita" vuole profondità e parallasse; un "archivio" vuole pagine che si sfogliano. Scrivi nel piano una frase che giustifichi l'abbinamento.
2. **Mai lo stesso effetto del sito precedente** fatto in questa conversazione (vedi "Diversità tra siti"). Se l'idea lo richiede davvero, cambia soggetto, asse o risultato.
3. Livello di spettacolo: di norma un effetto firma più comparse motivate; nei siti più spettacolari un secondo momento a metà pagina, di famiglia diversa.
4. Ogni effetto ha lo stato iniziale già completo (la pagina è finita anche prima dell'interazione), una versione statica per `prefers-reduced-motion` e una versione mobile dichiarata nel piano (pin più corto, effetti del cursore sostituiti da equivalenti allo scroll).
5. Se un effetto non si può finire bene, meglio una pagina statica pulita che un effetto a metà [F5].

## Catalogo [F5]

### A. Video guidato dallo scroll

| ID | Effetto | Con Studio AI |
|---|---|---|
| A1 | **Hero che si muove con lo scroll**: un clip di circa 5–8 s dalla hero approvata (avvicinamento, cambio di fuoco, rotazione del soggetto, passata di luce), convertito in fotogrammi su canvas | `anima_immagine` dalla hero approvata |
| A2 | **Racconto a capitoli**: 2–4 clip con lo stesso colore e momenti diversi (ambiente, dettaglio, rivelazione) su un pin lungo (300–500 vh), con testi e indicatori che si passano il testimone | `anima_immagine`, tratti concatenati ([scroll-cinematico.md](scroll-cinematico.md)) |
| A3 | **Prodotto che gira**: lo scroll fa ruotare il prodotto | Più viste dello stesso prodotto con `immagini_riferimento`, oppure un clip in orbita con `anima_immagine` |
| A4 | **Mondo scorrevole / volo in prima persona** | [scroll-cinematico.md](scroll-cinematico.md), [volo-in-prima-persona.md](volo-in-prima-persona.md) |

### B. Profondità a strati

| ID | Effetto | Con Studio AI |
|---|---|---|
| B1 | **Parallasse a ritagli**: soggetto scontornato, sfondo pulito dietro, 3–5 strati che si muovono a velocità diverse con lo scroll e appena con il cursore. Economico e d'effetto | `modifica_immagine` per lo sfondo pulito, `sfondo_trasparente` o scontorno locale per il soggetto |
| B2 | **Coppia spento/acceso**: due versioni della stessa scena (spenta e illuminata) che si svelano con un faro che segue il cursore o con lo scroll | `modifica_immagine` sulla stessa immagine con luce diversa |

### C. Immagine viva

| ID | Effetto |
|---|---|
| C1 | **Increspatura al passaggio del cursore**: la hero su un piano WebGL si deforma come liquido, sottile nei siti editoriali |
| C2 | **Particelle**: l'immagine si compone in particelle al caricamento e si scompone e ricompone con lo scroll; per idee tecnologiche e di dati |
| C3 | **Maschera che si apre**: la pagina parte dentro un testo gigante o una forma; scorrendo la maschera si allarga fino all'immagine a tutto schermo |

### D. Impaginazione che si muove

| ID | Effetto | Con Studio AI |
|---|---|---|
| D1 | **Binario orizzontale**: una sezione fissata scorre in orizzontale su un panorama largo o una sequenza di scene, con le card sopra | `genera_immagine` in 21:9 per il panorama |
| D2 | **Capitoli impilati**: sezioni a tutto schermo che si sovrappongono e si staccano, ognuna con la sua immagine o il suo loop | Immagini del piano degli asset |
| D3 | **Tipografia in movimento**: testo enorme coreografato con lo scroll (lettere scaglionate, assi di peso e larghezza di un font variabile) su un'immagine generata. Quando la voce del marchio è la tipografia | Immagine di fondo con `genera_immagine` |

### E. Siti "3D scroll" (sequenza di fotogrammi su canvas) [F6]

Ricette complete, con immagini, film e sito, da trasportare in qualsiasi settore: [siti-3d-scroll.md](siti-3d-scroll.md) §5. Motore in `assets/scroll-3d/frame-scrub.js`.

| ID | Ricetta | Per esempio |
|---|---|---|
| E1 | Lancio "flagship": un prodotto umile presentato come uno smartphone | Panificio, bar, prodotto simbolo |
| E2 | Esplosione di colore: pulito, carico, al culmine | Audio, scarpe, cosmetici, bevande |
| E3 | Ripresa unica: lo scroll è il conto alla rovescia | Inaugurazioni, eventi, lanci |
| E4 | Restauro: lo scroll trasforma il prima nel dopo | Detailing, pulizie, tetti, ristrutturazioni |
| E5 | Raggi X: vedere dentro, con la lente sotto il cursore | Idraulici, elettricisti, dentisti, officine |
| E6 | Dentro la luce: prodotto nel nero sotto un faro | Gioielli, orologi, cristallo |
| E7 | Il cantiere che si costruisce da solo | Piscine, giardini, cucine, case |

**Non sono effetti firma** (al massimo contorno): un loop di sfondo da solo, comparse generiche in dissolvenza, particelle dietro il testo senza interazione, strisce che scorrono, card che si inclinano al passaggio del mouse [F5].

## Regole di realizzazione [F5]

- Prima pittura completa: il primo fotogramma, gli strati o lo stato aperto si vedono prima di qualsiasi JavaScript.
- Risposta fisica: scrub legato allo scroll con un leggero smorzamento; cursore con molle; mai stato ricalcolato a ogni fotogramma con il framework, mai animazioni di proprietà di layout.
- Movimento ridotto: lo stato finale composto, statico, senza pin.

## Diversità tra siti [F5]

Ogni sito deve avere una sua identità, non sembrare il fratello del precedente. Prima di fissare il design system, se in questa conversazione è già stato fatto un sito, confronta questi sei assi e **cambiane almeno quattro**:

1. famiglia di palette;
2. abbinamento di font (mai lo stesso font dei titoli due volte di fila);
3. architettura della hero (immagine a tutto schermo, divisa, a maschera, a binario…);
4. effetto firma;
5. stile dei bottoni e delle CTA;
6. linguaggio di angoli e bordi (squadrati, morbidi, pillola, filetti).

Per il primo sito, ricava i sei assi dal mondo materiale dell'attività (le cose che tocca: acciaio, carta, vapore, muschio, vinile) e dichiaralo nel piano. Se una scelta starebbe bene in un template qualsiasi, cambiala.
