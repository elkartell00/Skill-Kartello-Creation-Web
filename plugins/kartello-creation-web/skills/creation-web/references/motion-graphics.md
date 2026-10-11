# Motion graphics in codice: l'effetto wow

**Il cuore della skill.** Ogni sito di livello **High Quality** (G1) ha un **momento firma in motion graphics fatto in codice**: la cosa che fa dire "come è possibile?". Si costruisce solo con il codice (HTML, CSS, SVG, Canvas, WebGL, GSAP, Three.js), senza app esterne e senza costi. Si salta solo se l'utente dice esplicitamente di non volerlo.

**Studio AI al servizio del wow, mai al posto del wow** (scelta del proprietario). Prima si prova sempre in codice. Se il codice non arriva al livello (per esempio serve una ripresa realistica dentro la scena, come nelle ricette di [siti-3d-scroll.md](siti-3d-scroll.md)), Studio AI va bene, con stima e sì dell'utente, e al livello High Quality si può investire di più. Ma la spesa deve tradursi in un risultato mozzafiato: se dopo tante generazioni il sito sarebbe comunque normale, non si spende ([contenuti-visivi.md](contenuti-visivi.md) §12).

## §1 Il metodo (come si arriva al wow)

Il wow non arriva al primo colpo: arriva da un'idea forte, da una coreografia precisa e da più giri di revisione guardando il risultato in movimento.

1. **L'idea.** Una frase che mette in scena l'attività con il movimento: "il caffè che si versa diventa il logo", "le linee della planimetria disegnano la casa e la casa si accende", "le lettere del nome si assemblano come ingranaggi". Prendila dal mondo materiale dell'attività (acciaio, farina, vapore, carta, luce) e dall'obiettivo del sito. Proponi 2–3 idee diverse e consiglia la migliore (regola d'oro 11).
2. **Lo storyboard.** 5–8 battute con i tempi, come un piccolo film: cosa entra, cosa succede, come si trasforma, dove finisce. Esempio: "0–0,8 s il fondo si accende con un gradiente fluido · 0,8–2 s il titolo si compone lettera per lettera da sotto una maschera · 2–3,5 s una forma del settore nasce da particelle · 3,5 s la camera si avvicina e la forma diventa lo sfondo della sezione successiva". Mostralo all'utente nel piano (Fase 4).
3. **Lo stile.** Colori, font, raggi e curve dal design system: il movimento è parte dell'identità, non un effetto aggiunto.
4. **La costruzione.** Una **timeline** unica (GSAP timeline, oppure un orologio in Three.js) che governa tutto, così ogni elemento è sincronizzato e la scena si può riprodurre, mettere in pausa e legare allo scroll.
5. **La revisione sul movimento, non sul codice.** Registra la scena (§6), guarda la registrazione e i fotogrammi chiave, critica come un direttore creativo: è sorprendente? è fluida? ha ritmo? si capisce l'idea? Poi migliora. **Almeno tre giri**, e ogni giro alza il livello (più profondità, più dettaglio secondario, ritmo migliore, transizioni più intelligenti).
6. **L'ottimizzazione.** 60 fotogrammi al secondo su desktop, versione leggera su mobile, versione statica composta per `prefers-reduced-motion`.

## §2 Grammatica del movimento che fa wow

- **Coreografia, non comparse.** Ogni elemento ha un'entrata, un'azione e un'uscita, e passa il testimone al successivo. Niente elementi che appaiono e restano morti.
- **Sovrapposizione.** Le animazioni si accavallano (l'una parte quando l'altra è a metà, circa 30–50%): è ciò che rende il movimento fluido e "costoso".
- **Curve espressive.** Mai lineare: uscite rapide e arrivi morbidi (expo, power, molla); la curva `--ease-fluid` del design system per i movimenti di interfaccia, curve più marcate per i momenti di spettacolo.
- **Profondità.** 3–5 piani che si muovono a velocità diverse (parallasse), primo piano sfocato o in controluce, luce che dà volume.
- **Scala.** Contrasto tra enorme e minuscolo: un titolo gigante e dettagli fini, una particella e un mondo.
- **Ritmo.** Accelerazioni e pause: si corre nei passaggi, ci si ferma sull'idea. Un momento di quiete prima del culmine.
- **Trasformazioni invece di tagli.** Una forma diventa un'altra (morph), una maschera rivela la scena dopo, un oggetto diventa lo sfondo della sezione successiva: il visitatore non vede mai un "cambio pagina".
- **Dettaglio secondario.** Particelle, linee sottili, numeri che scorrono, riflessi: riempiono la scena senza rubare la scena.
- **Luce e post-produzione.** Bagliore (bloom) misurato, grana leggera, sfocatura di movimento, vignettatura: trasformano una grafica pulita in qualcosa di cinematografico.
- **Tipografia come protagonista.** Lettere e parole che si compongono, si scompongono, cambiano peso e larghezza (font variabili), passano dietro gli oggetti.
- **Loop perfetti** per ciò che resta in scena: l'ultimo fotogramma combacia con il primo.
- **Interazione.** La scena reagisce a scroll e cursore (avanza, ruota, si deforma, si illumina): il visitatore si sente regista.

## §3 Ricettario (tutto in codice)

Scegli la ricetta che mette in scena l'idea; combinale per il momento firma e per i passaggi tra sezioni.

| # | Ricetta | Tecnica | Per esempio |
|---|---|---|---|
| R1 | **Hero shader vivo**: un fondo fluido nei colori del marchio (gradiente che respira, rumore, aurora, inchiostro) con il titolo che si compone sopra | WebGL (Three.js o OGL) con shader di rumore; GSAP + SplitText per il titolo | Qualsiasi settore |
| R2 | **Logo reveal cinematografico**: il logo SVG si disegna, si riempie, emette particelle e un bagliore, poi diventa il logo del menu | SVG `stroke-dasharray` / DrawSVG, GSAP timeline, canvas per le particelle | Apertura di ogni sito |
| R3 | **Tipografia cinetica**: la frase chiave arriva parola per parola, con maschere, pesi che cambiano e parole che diventano oggetti | GSAP SplitText, font variabile, `clip-path` | Brand con una promessa forte |
| R4 | **Particelle che diventano forma**: migliaia di particelle che si compongono nel logo, in un'icona del settore o in una parola, e si sciolgono con lo scroll | Three.js `Points` con posizioni campionate da un SVG o da un testo; shader | Tecnologia, eventi, creativi |
| R5 | **Oggetto 3D del settore in codice**: un oggetto costruito con primitive e materiali fisici (bottiglia, tazza, chiave, gioiello stilizzato, casa low-poly) che ruota, si apre, si esplode con lo scroll | Three.js o React Three Fiber, `MeshPhysicalMaterial`, luci, ombre, camera guidata dallo scroll | Prodotti, artigiani, immobiliare |
| R6 | **Racconto a capitoli pinnati**: la sezione resta ferma e il contenuto si trasforma da un capitolo all'altro mentre si scorre | GSAP ScrollTrigger con `pin` e `scrub`, timeline per capitolo | Servizi, processi, storia dell'attività |
| R7 | **Forme che si trasformano**: le icone dei servizi che si trasformano una nell'altra mentre cambia il testo | SVG + MorphSVG (o interpolazione di percorsi), GSAP | Studi professionali, agenzie |
| R8 | **Linee che si disegnano**: percorsi, mappe, planimetrie, schemi del processo che si tracciano con lo scroll e si accendono | SVG con lunghezza del tratto animata, ScrollTrigger | Edilizia, logistica, viaggi, consulenza |
| R9 | **Dati vivi**: contatori, grafici che crescono, indicatori legati allo scroll o al tempo | SVG o Canvas, GSAP | Risultati, numeri, prezzi |
| R10 | **Vetro e rifrazione**: lenti, gocce o lastre di vetro che deformano testo e forme sotto di sé | Shader di rifrazione in WebGL | Lusso, bellezza, tecnologia |
| R11 | **Mondo isometrico in codice**: una scena dell'attività in stile isometrico (SVG o low-poly 3D) che si anima pezzo per pezzo | SVG isometrico + GSAP, oppure Three.js con camera ortografica | Locali, filiere, città, servizi |
| R12 | **Transizioni tra sezioni e pagine**: maschere, tende, wipe, l'elemento che vola da una pagina all'altra | `clip-path`, View Transitions API, GSAP Flip | Siti multipagina |
| R13 | **Cursore e interazione**: luce che segue il cursore, forme magnetiche, superfici che si deformano al passaggio | Canvas/WebGL, `pointermove` con molle | Portfolio, creativi, tecnologia |

Le ricette "3D scroll" di [siti-3d-scroll.md](siti-3d-scroll.md) e gli effetti di [effetti-wow.md](effetti-wow.md) si realizzano allo stesso modo: in codice, con Studio AI solo per ciò che deve sembrare fotografato.

**Video promozionale in motion graphics** (facoltativo, da offrire): con la stessa scena si può produrre un video MP4 per i social o la presentazione del sito, con Remotion oppure registrando l'animazione fotogramma per fotogramma ([grafica-in-codice.md](grafica-in-codice.md) §4). Nessuna app esterna, nessun costo di generazione.

## §4 Strumenti

- **GSAP** con ScrollTrigger e i plugin per testo, tracciati e morph (SplitText, DrawSVG, MorphSVG, Flip): la base della coreografia. Oggi è gratuito, plugin compresi; verifica comunque i termini al momento dell'installazione.
- **Three.js** (o React Three Fiber con `@react-three/drei` e `postprocessing`) per 3D, particelle, shader e post-produzione.
- **Motion** (ex Framer Motion) per le animazioni dei componenti React; **Lenis** per lo scroll morbido.
- **Remotion** per esportare video MP4 dal codice (verifica la licenza per le aziende).
- Tutto installato nel progetto, niente CDN in produzione.

## §5 Prestazioni e accessibilità (il wow non deve rompere il sito)

- Le scene si fermano quando non sono visibili; densità di pixel limitata a 2; geometrie e particelle ridotte su mobile e su dispositivi deboli.
- Nessun salto di layout; il contenuto principale (titolo, CTA) è HTML leggibile da subito, anche prima che la scena parta.
- `prefers-reduced-motion`: una versione statica composta e bella, non una pagina vuota.
- I testi restano testi (selezionabili, leggibili dai motori di ricerca): la scena è dietro o intorno, non al posto del contenuto.

## §6 Registrare e rivedere

Il movimento si giudica guardandolo. Registra la pagina con un browser automatico e guarda il video e alcuni fotogrammi:

```js
// node registra.mjs  (Playwright)
import { chromium } from 'playwright';
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: 'revisione/' } });
const page = await context.newPage();
await page.goto('http://localhost:4321/');
await page.waitForTimeout(4000);                                   // l'intro
for (let y = 0; y <= 6000; y += 300) { await page.mouse.wheel(0, 300); await page.waitForTimeout(120); }
await context.close();                                             // il video finisce in revisione/
await browser.close();
```

```bash
# fotogrammi chiave da guardare
ffmpeg -v error -i revisione/*.webm -vf "fps=2,scale=720:-2,tile=4x4" -frames:v 1 revisione/provini.jpg
```

Domande di ogni giro: si capisce l'idea in 3 secondi? c'è un momento che sorprende? qualcosa resta fermo o appare "a scatto"? il ritmo ha respiro? il marchio si riconosce? È all'altezza di un sito premiato? Se una risposta è no, migliora e registra di nuovo.

## §7 Checklist del momento firma

- [ ] Un'idea che mette in scena l'attività, con storyboard approvato
- [ ] Costruito solo in codice, nessuna chiamata a Studio AI per il wow
- [ ] Almeno tre giri di revisione su registrazione video
- [ ] Coreografia con sovrapposizioni, profondità e ritmo; nessun elemento morto
- [ ] Colori, font e curve dal design system
- [ ] 60 fps su desktop, versione leggera su mobile, versione statica per il movimento ridotto
- [ ] Titolo e CTA leggibili in HTML da subito
