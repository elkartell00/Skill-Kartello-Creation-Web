# Prima il codice: grafica, motion graphics e video

**Scelta del proprietario.** Tutto ciò che Claude Code può creare con il codice (grafica, illustrazioni, icone, logo, sfondi, animazioni, motion graphics, 3D, perfino file video) **lo crea con il codice**. Studio AI è l'**ultimo passaggio**: si usa solo quando il codice non arriva alla qualità richiesta. Claude Code deve provarci davvero, non arrendersi al primo tentativo.

## §1 Ordine di decisione per ogni elemento visivo

1. **Codice** (CSS, SVG, Canvas, WebGL, librerie di animazione, video renderizzati da codice): prima scelta per tutto ciò che è grafico, illustrativo, astratto, tipografico, geometrico, animato.
2. **File reali del cliente** (foto, logo, video): sempre, quando servono fotografie vere della sua attività.
3. **Studio AI**: solo se il codice non basta, con stima e via dell'utente quando costa ([contenuti-visivi.md](contenuti-visivi.md)).
4. **Segnaposto etichettato**, se nessuna delle tre strade è possibile in quel momento.

**Quando il codice non basta** (e serve Studio AI o la foto del cliente): fotografie realistiche di persone, cibo, luoghi, ambienti e prodotti veri; riprese dal vero; materiali fotorealistici che devono sembrare fotografati. In tutto il resto si parte dal codice.

**Come si decide che "non basta"**: crea la versione in codice, guardala (screenshot con il browser) con occhio severo rispetto al livello del sito; se dopo due tentativi seri di miglioramento resta sotto il livello di una agenzia, passa a Studio AI e scrivi il motivo nel piano degli asset. Mai sostituire una fotografia necessaria con un disegno povero.

## §2 Cosa fare con il codice

| Serve | Tecnica in codice |
|---|---|
| Logo nuovo | Simbolo e nome in **SVG** scritto a mano: geometria pulita, griglia, stesso spessore di tratto, nome con il font del sito; 3 proposte da far scegliere |
| Icone illustrative dei servizi | **Set SVG** coerente (stesso tratto, angoli, griglia 24 o 48, palette del design system), animabili |
| Favicon e icone dell'app | Dal simbolo SVG: `favicon.svg`, poi PNG e ICO esportati in locale |
| Immagine OG per i social | Pagina HTML 1200×630 con i token del sito, salvata in PNG con un browser automatico |
| Sfondi e texture | Gradienti a maglia, rumore e grana con SVG `feTurbulence` o shader, pattern geometrici, griglie, aurore, forme fluide |
| Illustrazioni | SVG o Canvas in stile flat, isometrico, line art, geometrico; scene astratte o schematiche |
| Hero animata | Canvas 2D o **WebGL** (Three.js, shader): particelle, forme che si deformano, onde, campi di linee, oggetti 3D astratti, tipografia in movimento |
| Motion graphics | **GSAP** (con ScrollTrigger) o Motion: animazioni a scroll, testo che si compone, maschere, morphing di forme SVG, contatori, linee che si disegnano |
| 3D | **Three.js** o React Three Fiber: oggetti, materiali, luci, camera guidata dallo scroll; geometrie del prodotto quando è semplice (bottiglia, scatola, gioiello stilizzato) |
| Grafici e dati | SVG o Canvas con la palette del sito |
| Effetti d'impatto ([effetti-impatto.md](effetti-impatto.md)) | Quasi tutti in codice: parallasse a strati, maschere, binari orizzontali, capitoli impilati, tipografia cinetica, particelle, increspature WebGL |
| Sequenze per il "3D scroll" ([siti-3d-scroll.md](siti-3d-scroll.md)) | Se il soggetto non deve essere fotorealistico: scena Three.js renderizzata fotogramma per fotogramma (§4), poi `frame-scrub.js` |
| Video di motion graphics (file MP4) | **Remotion** (video da React) oppure un'animazione HTML/Canvas registrata fotogramma per fotogramma (§4) |

Preferisci un'animazione **dal vivo nel browser** a un file video quando l'effetto lo permette: pesa meno, è nitida a ogni risoluzione e si adatta allo schermo.

## §3 Qualità: le regole valgono anche per il codice

- Tutto usa i token del design system: colori, font, raggi, easing `--ease-fluid` ([design-system.md](design-system.md)).
- Livello agenzia: niente forme generiche da template, niente gradienti viola casuali, niente "macchie" decorative senza motivo ([contenuti-e-qualita.md](contenuti-e-qualita.md) §7).
- Le animazioni rispettano [motion.md](motion.md): `prefers-reduced-motion` con una versione statica composta, solo `transform` e `opacity` dove possibile, nessun listener di scroll senza limiti.
- Prestazioni: WebGL e canvas si fermano quando non sono visibili (IntersectionObserver), densità di pixel limitata a 2, versione più leggera su mobile.
- SVG: `viewBox` corretto, niente dimensioni fisse dentro, `title` e `aria-label` quando hanno significato, `aria-hidden="true"` quando sono decorativi.
- Librerie: solo quelle che servono davvero, installate nel progetto (non da CDN in produzione). Verifica la licenza (es. Remotion è gratuito per singoli e piccole aziende, a pagamento oltre una certa dimensione).

## §4 Trasformare il codice in immagini e video

**Immagine PNG da una pagina** (OG, poster, varianti):

```js
// node render-png.mjs  (Playwright)
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:4321/og/home');
await page.screenshot({ path: 'public/og/home.png' });
await browser.close();
```

**Video o sequenza di fotogrammi da un'animazione**: rendi l'animazione guidabile da un tempo esterno (es. `window.renderAt(t)` che disegna lo stato al secondo `t`, senza dipendere dall'orologio), poi cattura un fotogramma alla volta e uniscili con ffmpeg:

```js
// node render-frames.mjs
import { chromium } from 'playwright';
const fps = 30, durata = 6;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('http://localhost:4321/animazione');
for (let i = 0; i < fps * durata; i++) {
  await page.evaluate(t => window.renderAt(t), i / fps);
  await page.screenshot({ path: `frames/f-${String(i).padStart(4, '0')}.png` });
}
await browser.close();
```

```bash
ffmpeg -framerate 30 -i frames/f-%04d.png -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart animazione.mp4
```

Gli stessi fotogrammi, convertiti in WebP, alimentano direttamente `assets/scroll-3d/frame-scrub.js`. Con Remotion il procedimento è integrato (`npx remotion render`).

## §5 Quando si passa a Studio AI

Si passa a Studio AI, con le regole di [contenuti-visivi.md](contenuti-visivi.md), quando:
- serve una fotografia realistica e il cliente non ce l'ha;
- serve una ripresa dal vero (volo nei locali, prodotto reale che si rompe o si trasforma, persone);
- la versione in codice, dopo due tentativi seri, resta sotto il livello richiesto.

Anche in questi casi il codice resta il contorno: titoli, testi, interfaccia, strumenti e animazioni intorno alle immagini sono sempre in codice. Nel piano degli asset ogni riga dice come nasce l'elemento (codice, cliente, Studio AI) e, per Studio AI, perché il codice non bastava.
