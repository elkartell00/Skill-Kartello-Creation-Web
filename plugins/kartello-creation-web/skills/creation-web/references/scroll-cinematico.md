# Scroll cinematico ("mondo scorrevole")

Una pagina, o l'apertura di una pagina, in cui **lo scroll guida una telecamera**: entra in ogni scena, ne esce e vola nella successiva, senza tagli visibili. Le immagini e i video si generano con Studio AI; la pagina fa solo scorrere avanti e indietro video già pronti in base allo scroll. Le regole marcate [F3] vengono da `scroll-world` (vedi [fonti.md](fonti.md)); generazione sempre con Studio AI ([contenuti-visivi.md](contenuti-visivi.md)).

Si attiva quando A3 = "video guidato dallo scroll" oppure L1 = "E. Mondo scorrevole". Domande in [domande.md](domande.md) §2.8; testi dei prompt in [scroll-cinematico-prompt.md](scroll-cinematico-prompt.md); motore in `assets/scroll-cinematico/`.

**Cosa si genera:** N immagini di scena → N clip di "ingresso" (o tratti) → N−1 clip di "raccordo" tra scene consecutive → un motore che le suona come un unico volo.

**La regola che decide tutto:** le giunture devono essere **identiche al fotogramma** [F3]. Leggi §5 prima di generare un raccordo: sbagliarla è l'errore più comune e produce uno "scatto" tra le scene.

## §1 Prerequisiti

- **Studio AI collegato** (server MCP `studio-ai`). Se non risponde, lo scroll cinematico non si fa: proponi un'apertura statica e spiega perché [SA].
- **ffmpeg e ffprobe** per estrarre fotogrammi e codificare. Python con Pillow solo per le tele verticali e lo scontorno facoltativo [F3].
- Shell: script in `#!/bin/bash` eseguiti con `bash script.sh`. Niente array associativi (bash 3.2 su macOS) e niente cicli su array nella shell interattiva zsh, che conta da 1 [F3].
- **Prova di qualificazione** (una volta per progetto, livello `low`): anima un'immagine con `anima_immagine` e controlla che il fotogramma 0 del video coincida con l'immagine data; per i raccordi aggiungi `immagine_finale` e controlla che la fine arrivi su quella composizione (va bene "vicina", la dissolvenza la copre) [F3].

## §2 Domande e preventivo

Le domande sono X1–X6 ([domande.md](domande.md) §2.8). Due si fanno **sempre** [F3]:
- **stile della telecamera** (X3): è la personalità del film, non un dettaglio tecnico;
- **versione mobile** (X4): un secondo percorso nativo 9:16, che circa **raddoppia** la spesa dei video. Mai generare entrambe senza chiedere.

**Preventivo prima di generare** [F3, SA]: N immagini + (2N−1) video (×2 con la versione mobile) + circa 15% per le rigenerazioni. Calcolalo con `stima_costo`, mostralo e attendi il sì esplicito. Consiglia la **bozza**: tutto il percorso a livello `low`, approvazione, poi i clip finali a livello `standard`. Avvisa se la stima supera circa il 70% del residuo indicato da `riepilogo_spese`.

## §3 Immagini delle scene

- Una immagine per sezione, **tutte con lo stesso stile**: salva il "preambolo di stile" ([scroll-cinematico-prompt.md](scroll-cinematico-prompt.md)) con `salva_stile` e passalo come `stile` a ogni immagine e video del percorso [F3, SA].
- `genera_lotto` con una voce `genera_immagine` per scena: `formato` 16:9 (9:16 per la versione mobile), `risoluzione` 2K, stesso `livello`, `cartella_destinazione` per esempio `media/scroll/` (non la cartella pubblica: le immagini finali si convertono dopo) [F3].
- **Componi al centro**, con un po' di spazio sopra: la pagina mostra i clip con `object-fit: cover` [F3].
- **Rivedi le immagini tutte insieme** prima di proseguire: stessa angolazione, palette e luce. Rigenera quella fuori stile, eventualmente passando una scena approvata in `immagini_riferimento` [F3].
- Scene "fluttuanti" (facoltativo): scontorna lo sfondo uniforme con `assets/scroll-cinematico/knockout.py`, oppure dai alla pagina lo stesso colore di fondo delle scene. Le immagini restano anche come poster e come ripiego leggero [F3].

## §4 Architettura della telecamera

Si sceglie con X3; questa sezione la **attua**, non la ridecide [F3].

| X3 | Architettura | Quando consigliarla |
|---|---|---|
| Volo nel mondo | **B**: ingresso in ogni scena + raccordo aereo | Diorami, miniature, mondi visti dall'alto |
| Percorso continuo | **A**: un'unica ripresa in avanti, a tratti concatenati | Stili realistici e fotografici |
| Planata isometrica fissa | **A** + clausola "isometrica bloccata" | Il più calmo ed economico da rigenerare |

**Un solo livello e un solo modello per tutti i clip concatenati** [F3]. Ogni motore ha la sua grana, colore e movimento: cambiarlo a metà percorso si nota. Usa lo stesso `livello` per tutto il percorso e controlla `modello` nelle risposte: se un clip è uscito con un modello diverso, rigeneralo. Unica eccezione: un singolo raccordo bloccato dal filtro (§9).

**A) Ripresa continua in avanti.** Tratti generati **in sequenza**: il tratto 0 parte dall'immagine della prima scena; ogni tratto successivo parte dall'**ultimo fotogramma reale** del precedente (`anima_immagine` con `immagine_iniziale`), **senza `immagine_finale`**: un fotogramma finale "da cartolina" costringe la camera a indietreggiare, prima causa di scatti [F3]. Non ci sono raccordi (salta §5). Nel motore ogni tratto è il `clip` di una sezione, con `connectors: []` e `crossfade` piccolo (circa 0.08).

**B) Ingresso più raccordo aereo.** Per ogni scena un clip che parte alto e fuori e scende dentro (`anima_immagine`, `immagine_iniziale` = immagine della scena a sfondo pieno), poi i raccordi (§5). Il raccordo tira **su e fuori**: la camera inverte direzione a ogni giuntura. In un mondo in miniatura si legge come "zoom sulla mappa e volo all'isola dopo"; in una visita realistica sembra un riavvolgimento. Se l'utente sceglie B con uno stile realistico, spiegalo e chiedi conferma [F3].

**Grammatica della camera** [F3]. "Solo in avanti" vale **alle giunture**, non dentro un tratto: dentro un clip la camera può orbitare, salire, scorrere di lato. Ogni tratto **finisce** assestandosi in una deriva lenta in avanti (ultimo secondo circa) e il successivo **comincia** continuando la stessa deriva: le due frasi del contratto stanno nei prompt, parola per parola. Movimento per concetto:

| Concetto | Movimento a metà tratto |
|---|---|
| Prodotto, lusso | Mezza orbita lenta intorno all'oggetto, poi oltre |
| Immobiliare, ospitalità | Camera fluida attraverso le porte; leggera salita negli ambienti alti |
| Industria, logistica | Carrellata laterale bassa lungo la linea |
| Viaggi, esterni | Salita con rivelazione, poi discesa |
| Cibo, artigianato | Avvicinamento al gesto, ritorno, avanti |
| Miniatura giocosa (B) | Ingressi e salti aerei: il raccordo è la grammatica |

Dopo ogni tratto **guarda l'ultimo fotogramma** prima di generare il successivo: deve sembrare un fotogramma di una planata calma. Se no, rigenera subito (con la clausola isometrica controlla anche che l'angolo non sia ruotato) [F3].

**Durate** (catalogo): clip da 4, 6 o 8 s; 1080p solo a 8 s. Ingressi e tratti 8 s; raccordi 8 s in 1080p oppure 6 s in 720p, uguali per tutto il percorso. Sempre `audio: false` e `formato` esplicito (16:9, o 9:16 per la versione mobile).

**Ritmo** (nel motore): `scroll` per sezione (più scroll = più permanenza nella scena) e `linger` (la camera rallenta a metà scena mentre i testi sono al massimo). Movimento espressivo nel clip, misura nella mappatura dello scroll. Lo scroll va anche all'indietro: ogni movimento si vede pure al contrario [F3].

## §5 Raccordi (solo architettura B)

Il raccordo vola dalla fine della scena i all'inizio della scena i+1. **Entrambi i suoi estremi sono fotogrammi REALI dei clip vicini, mai l'immagine della scena** [F3]: ogni generazione rende un po' diversamente, e usare l'immagine originale produce uno scatto alla giuntura.

```
raccordo i:  immagine_iniziale = ULTIMO fotogramma del clip di ingresso i
             immagine_finale   = PRIMO fotogramma del clip di ingresso i+1
```

```bash
ffmpeg -v error -ss 0 -i ingresso_i1.mp4 -frames:v 1 -q:v 2 primo_i1.png        # inizio della scena i+1
ffmpeg -v error -sseof -0.15 -i ingresso_i.mp4 -frames:v 1 -q:v 2 ultimo_i.png   # interno della scena i
```

Poi `anima_immagine` con `immagine_iniziale` = `ultimo_i.png`, `immagine_finale` = `primo_i1.png`, stesso stile, livello e formato del percorso. La fine arriva vicina ma non sempre identica: il motore applica comunque una breve dissolvenza alla giuntura. Non affidarti alla sola dissolvenza: un salto di contenuto grande non si nasconde [F3].

## §6 Codifica per lo scrub

Lo scrub imposta `video.currentTime` in base allo scroll [F3].

1. **Serve la ricercabilità, non i soli fotogrammi chiave.** Molti host statici non servono le richieste a intervalli di byte e bloccano ogni ricerca al fotogramma 0. Il motore scarica ogni clip come `Blob` e lo riproduce da un URL in memoria, sempre ricercabile: per questo non serve video tutto intra.
2. **Non abbassare la qualità**: risoluzione nativa, `crf` circa 20, GOP corto (`-g 8`), niente audio, `faststart`, una leggera nitidezza.

```bash
enc() { ffmpeg -v error -y -i "$1" -an -vf "unsharp=5:5:0.8:5:5:0.0" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart "$2"; }
```

Stesse impostazioni per tutti i 2N−1 clip. Le immagini delle scene si convertono in WebP per i poster (es. `cwebp -q 84 -resize 1800 0 scena.png -o scena.webp`).

**Versione mobile** (solo se X4 = sì): è il **percorso nativo 9:16** — tele verticali 1080×1920 nel colore di fondo con la scena al centro (circa 94% di larghezza, centro visivo al 45% dell'altezza), ingressi e raccordi 9:16 concatenati sui loro fotogrammi (mai su quelli orizzontali), codifica larga 720 px con GOP più corto:

```bash
encm() { ffmpeg -v error -y -i "$1" -an -vf "scale=720:-2,unsharp=5:5:0.6:5:5:0.0" \
  -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
  -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart "$2"; }
```

Il primo fotogramma di ogni ingresso verticale diventa il poster `stillMobile`. Se il budget non copre il percorso verticale, il ritaglio centrale dei clip orizzontali (`scale=-2:720` con lo stesso `encm`) è solo un **ripiego** da dichiarare e far approvare, mai la versione mobile di default [F3].

## §7 Montaggio della pagina

Copia `assets/scroll-cinematico/scrub-engine.js` nel progetto (o adattalo al framework; per una pagina a sé c'è anche `index-template.html`, da tradurre in italiano con `lang="it"`). Il motore è JavaScript puro, senza dipendenze: crea da sé DOM e CSS [F3].

```js
mountScrollWorld(document.getElementById('world'), {
  topbar: false,          // il sito tiene il suo header (scelta del proprietario)
  release: true,          // apertura della pagina: dopo il volo seguono le sezioni normali
  hint: 'scorri per entrare',
  diveScroll: 1.3, connScroll: 0.9,
  sections: [
    { id: 'forno', label: 'Il forno', still: '/img/scroll/forno.webp',
      clip: '/video/scroll/forno.mp4', clipMobile: '/video/scroll/forno-m.mp4',
      stillMobile: '/img/scroll/forno-m.webp', scroll: 1.6, linger: 0.45,
      accent: '#C4703A', eyebrow: 'Dal 1987', title: 'Tutto parte dal forno.',
      body: 'Impasti a lunga lievitazione, cotti ogni mattina.', tags: ['Lievito madre'] },
    // … una per scena; l'ultima può avere `cta`
  ],
  connectors: ['/video/scroll/raccordo-1.mp4' /* … lunghezza = scene − 1, null ammesso */],
  connectorsMobile: ['/video/scroll/raccordo-1-m.mp4' /* … solo con la versione mobile */],
});
```

- **Dove** (scelta del proprietario): come landing dedicata (layout E) oppure come **apertura della Home** seguita dalle sezioni normali, con `release: true`. Il contenitore deve stare in cima alla pagina.
- **Navigazione** (scelta del proprietario): l'header del sito resta (`topbar: false`); i punti laterali del motore servono a saltare tra le scene.
- **Stile** (X6): *adattato al design system* (consigliato) oppure *originale del motore*. Con l'adattamento, nel CSS del sito (fuori da ogni layer, così vince sul motore):

```css
.sw-root {
  --sw-bg: var(--color-background);
  --sw-ink: var(--color-ink);
  --sw-ink-soft: var(--color-ink-muted);
  --sw-accent: var(--color-primary);
  --sw-font-display: var(--font-display);
  --sw-font-body: var(--font-sans);
}
/* Titoli, testi e bottoni con le misure delle classi type-* del design system */
.sw-copy__title { font-size: …; line-height: …; }   /* valori di type-h1 o type-display */
.sw-copy__body  { font-size: …; line-height: …; }   /* valori di type-lead */
.sw-btn, .sw-nav__item, .sw-route__dot i { transition-timing-function: var(--ease-fluid); }
```

  e `atmosphere: false` se il design system non ammette sfumature negli sfondi (V6). La sfumatura che rende leggibili i testi sopra il video resta: è funzionale. Con lo stile originale il motore si lascia com'è.
- Il motore gestisce: catena ingressi e raccordi, scroll → `currentTime` con smorzamento, caricamento come Blob, precaricamento dei clip vicini, dissolvenze alle giunture, testi per scena (la prima accoglie all'arrivo, l'ultima tiene la CTA), punti laterali, `prefers-reduced-motion` (solo immagini, nessun video) e telefoni (clip mobili, ricerche raggruppate, poster finché il video non disegna, avvio al primo tocco per iOS, niente salti con la barra degli indirizzi, aree sicure) [F3].
- Per backend non JavaScript basta servire i file e includere lo script.

## §8 Controllo delle giunture (non saltarlo)

Con un browser automatico [F3]:
- schermate subito prima e subito dopo ogni giuntura: devono essere quasi identiche. Giudica la **composizione**, non il valore numerico: una giuntura giusta può avere solo un po' di scintillio dei dettagli; un errore vero cambia composizione o oggetti;
- nessun errore in console; `video.seekable.end(0) > 0` (il Blob funziona); `currentTime` segue lo scroll lungo ogni clip;
- `prefers-reduced-motion`: solo immagini, niente video né particelle;
- con `release: true`: a fine volo i livelli fissi spariscono e le sezioni seguenti sono cliccabili; tornando su riappaiono.

**Mobile** (completo solo con X4 = sì): viewport telefono con CPU rallentata 4–6× e scroll veloce, il clip non si blocca; la prima scena compare subito (poster) e il video subentra al primo scroll, anche su iOS Safari; vengono serviti i file `-m.mp4` (verticali: `videoWidth < videoHeight`) e i poster `stillMobile`; la pagina non salta quando la barra degli indirizzi si chiude; la rotazione ricompone. Solo desktop: basta un controllo su telefono che i poster compaiano e niente si sovrapponga.

## §9 Problemi frequenti

| Sintomo | Causa e rimedio [F3] |
|---|---|
| Scatto alla giuntura | Il raccordo usava l'immagine della scena invece dei fotogrammi reali: rifai §5 |
| Camera che "torna indietro" | Inversione di velocità alla giuntura (inevitabile in B): per una visita realistica usa A |
| Video fermo al fotogramma 0 | L'host non serve gli intervalli di byte: usa il Blob (il motore lo fa) |
| File enormi | Codifica tutta intra: usa `-g 8` più Blob |
| Video morbido | Ridimensionato o troppo compresso: risoluzione nativa, `crf` ≤ 20, `unsharp` |
| Rifiuto del filtro (`RIFIUTO_SICUREZZA`) su interni innocui (camere, piscine, spa, vino) | Riformula togliendo le parole a rischio e aggiungendo "ambiente disabitato, architettonico, sobrio", massimo due volte; poi un livello diverso solo per quel raccordo (leggero cambio di resa), oppure raccordo `null`: il motore dissolve direttamente le due scene |
| Tema scuro | Imposta `--sw-bg` scuro e `--sw-ink` chiaro: velatura e ombre dei titoli seguono `--sw-bg` |
| Scatti sul telefono | Clip desktop troppo pesanti: servi i `-m.mp4` (720 px, `-g 4`); se serve `-g 2` |
| Scena nera su iOS | Non nascondere il poster al `loadedmetadata` e non togliere `muted`/`playsinline` adattando il motore |
| La pagina salta su mobile | Un gestore di `resize` rifà il layout quando cambia solo l'altezza: filtra sulla larghezza |
| Testi sotto la barra o il notch | `viewport-fit=cover` nel meta viewport; il motore usa `env(safe-area-inset-bottom)` e `dvh` |
| Ritaglio della scena in verticale | È uscito il ripiego a ritaglio o non vengono serviti i 9:16: controlla `videoWidth < videoHeight` |
| Clip in formato sbagliato | Passa sempre `formato` esplicito (16:9 o 9:16) |
