# Scroll morbido con Lenis

Lo scroll morbido dà al sito la sensazione "pesante" e continua dei siti premiati, e soprattutto tiene **sincronizzati** con lo scroll le scene WebGL, le animazioni GSAP e le parallassi. Lenis è nato proprio per questo: far andare d'accordo WebGL e pagina mentre si scorre; la morbidezza è venuta dopo [F9]. Le regole marcate [F9] vengono da Lenis di darkroom.engineering (vedi [fonti.md](fonti.md)).

Lenis lavora **sopra lo scroll nativo** del browser: `position: sticky`, link alle ancore, tastiera e lettori di schermo continuano a funzionare [F9]. Per questo, nella skill, è la scelta consigliata per lo scroll morbido. L'alternativa è ScrollSmoother di GSAP ([gsap.md](gsap.md) §5).

## §1 Quando usarlo

| Livello (G1) | Scroll morbido |
|---|---|
| Low Quality | No: scroll nativo |
| Standard | Facoltativo: si propone se il sito ha parallassi o animazioni guidate dallo scroll |
| High Quality | Consigliato quando la scena d'impatto, il 3D o lo scroll cinematico sono legati allo scroll |

- La scelta è dell'utente (domanda W4, libreria di animazione, [domande.md](domande.md) §2.6): Lenis, ScrollSmoother o nessuno.
- **Meglio senza** (aggiunta Kartello): siti fatti soprattutto di moduli, aree riservate o tabelle con scroll interni; pagine con molti `iframe` (mappe, video incorporati, prenotazioni esterne), perché sopra un `iframe` lo scroll morbido si ferma [F9].
- Sui telefoni Lenis lascia lo scroll nativo del dito (`syncTouch: false`, il default) e rende morbida solo la rotella [F9]. Non attivare `syncTouch` senza un motivo preciso: è instabile su iOS prima della 16 [F9].

## §2 Impostazione di base

```bash
npm install lenis
```

```js
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';     // CSS consigliato: sempre [F9]

const lenis = new Lenis({
  autoRaf: true,                   // solo senza GSAP: con GSAP vedi §3
  anchors: true,                   // link alle ancore animati [F9]
  stopInertiaOnNavigate: true,     // si ferma quando si clicca un link interno [F9]
  // lerp: 0.1 (default): più basso = più morbido e più "in ritardo"; non scendere sotto 0.07
});
```

- **Il CSS consigliato** va sempre incluso [F9]: senza, la pagina può bloccarsi quando Lenis è fermo, gli `iframe` rubano lo scroll e gli elementi con scroll interno non si contengono. Senza bundler, copia le sue poche regole nel CSS del sito; mai da CDN in produzione ([grafica-in-codice.md](grafica-in-codice.md) §3).
- **Un solo motore di aggiornamento** [F9]: o `autoRaf: true`, o `lenis.raf(tempo)` chiamato da un unico ciclo (quello di GSAP o di Three.js). Mai entrambi: lo scroll andrebbe a velocità doppia e a scatti.
- **Una sola istanza** per pagina (aggiunta Kartello).
- **Ancore e header fisso**: Lenis rispetta `scroll-padding-top` e `scroll-margin-top` [F9]. Imposta `html { scroll-padding-top: <altezza dell'header>; }` con un token o una variabile: funziona uguale con e senza Lenis.
- **Movimento ridotto** [F9]: con `prefers-reduced-motion: reduce` Lenis disattiva da solo la morbidezza e rende istantanei i salti alle ancore, ma continua a girare, così le sincronizzazioni restano valide. **Non disattivare mai** `respectReducedMotion`. Le tue animazioni possono leggere `lenis.prefersReducedMotion`.
- **Prova sempre la pagina anche senza Lenis** [F9]: deve scorrere normalmente. Se senza Lenis non scorre, il problema è nel CSS (altezze, `overflow`), non in Lenis.

## §3 Con GSAP e ScrollTrigger

Lenis va guidato dal ticker di GSAP e deve avvisare ScrollTrigger a ogni scroll [F9]:

```js
const lenis = new Lenis({ anchors: true, stopInertiaOnNavigate: true });   // niente autoRaf
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((tempo) => lenis.raf(tempo * 1000));   // GSAP dà i secondi, Lenis vuole i millisecondi
gsap.ticker.lagSmoothing(0);                            // nessun ritardo artificiale sullo scroll
```

- Pin, scrub e `containerAnimation` di [gsap.md](gsap.md) §5 funzionano senza `scrollerProxy`, perché Lenis usa lo scroll nativo (aggiunta Kartello).
- Per gli scorrimenti animati usa `lenis.scrollTo()` invece di ScrollToPlugin, così la curva resta quella di Lenis [F9].

## §4 Con Three.js e WebGL

Il caso per cui Lenis è nato [F9]: un solo ciclo legge lo scroll e disegna la scena, così camera e pagina non si separano mai.

```js
const lenis = new Lenis();                  // niente autoRaf: lo guida il ciclo della scena

function disegna(tempo) {
  lenis.raf(tempo);
  camera.position.y = -lenis.scroll * fattore;        // la scena segue lo scroll morbido, non quello grezzo
  materiale.uniforms.uVelocita.value = lenis.velocity; // effetti legati alla velocità (deformazioni, scie)
  renderer.render(scena, camera);
  requestAnimationFrame(disegna);
}
requestAnimationFrame(disegna);
```

- Se nella pagina c'è anche GSAP, il ciclo unico è il ticker di GSAP (§3) e la scena si disegna dentro `gsap.ticker.add` (aggiunta Kartello).
- `lenis.velocity` e `lenis.direction` servono per effetti legati alla velocità dello scroll (testi che si inclinano, immagini che si deformano, scie): con misura, e fermi con il movimento ridotto [F9].
- I motori dello scroll cinematico e del 3D scroll (`assets/scroll-cinematico/`, `assets/scroll-3d/`) leggono lo scroll nativo e funzionano anche con Lenis (aggiunta Kartello).

## §5 Framework

**React e Next.js** [F9]: componente `ReactLenis` con `root`, hook `useLenis` per leggere l'istanza ovunque. Con GSAP, `autoRaf: false` e aggiornamento dal ticker:

```jsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

export function ScrollMorbido({ children }) {
  const lenisRef = useRef(null);
  useEffect(() => {
    const aggiorna = (tempo) => lenisRef.current?.lenis?.raf(tempo * 1000);
    gsap.ticker.add(aggiorna);
    gsap.ticker.lagSmoothing(0);
    const lenis = lenisRef.current?.lenis;
    lenis?.on('scroll', ScrollTrigger.update);
    return () => { gsap.ticker.remove(aggiorna); lenis?.off('scroll', ScrollTrigger.update); };
  }, []);
  return (<><ReactLenis root options={{ autoRaf: false, anchors: true }} ref={lenisRef} />{children}</>);
}
```

Con Motion invece di GSAP, l'aggiornamento si collega al ciclo `frame` di Motion [F9].

**Vue e Nuxt** [F9]: `app.use(LenisVue)` in Vue, il modulo `lenis/nuxt` in Nuxt; poi `<VueLenis root :options="…" />` e `useLenis()` nei componenti.

**Astro** (aggiunta Kartello): istanza creata nello script del layout. Con le transizioni di pagina (`<ClientRouter />`) distruggila prima del cambio e ricreala dopo, come i context di GSAP ([gsap.md](gsap.md) §7):

```js
let lenis;
document.addEventListener('astro:page-load', () => { lenis = new Lenis({ autoRaf: true, anchors: true }); });
document.addEventListener('astro:before-swap', () => lenis?.destroy());
```

**HTML senza framework**: l'impostazione del §2 (o del §3 con GSAP) in un unico script.

## §6 Menu, finestre modali e scroll interni

- **Menu a tutto schermo e finestre modali**: `lenis.stop()` all'apertura e `lenis.start()` alla chiusura, insieme alle regole di [motion.md](motion.md) §4 (`inert`, focus, `Esc`) (aggiunta Kartello). In alternativa `autoToggle: true`, che si ferma da solo quando la pagina riceve `overflow: hidden`; richiede il CSS consigliato e browser recenti [F9].
- **Elementi con scroll interno** (menu lunghi, finestre modali con testo, cookie banner, tabelle): attributo `data-lenis-prevent` sull'elemento, oppure l'opzione `prevent: (nodo) => …` [F9]. `allowNestedScroll: true` li riconosce da solo, ma controlla tutto il DOM a ogni scroll: usalo solo se gli elementi sono tanti e imprevedibili [F9]. Esistono anche le varianti `data-lenis-prevent-wheel`, `-touch`, `-vertical` e `-horizontal`.
- **Cambio pagina nei siti a pagina singola**: riporta in cima con `lenis.scrollTo(0, { immediate: true })` (aggiunta Kartello).

## §7 Aggancio alle sezioni (snap)

Lenis non supporta lo `scroll-snap` del CSS [F9]. Per sezioni che si agganciano si usa `lenis/snap`:

```js
import Snap from 'lenis/snap';
const snap = new Snap(lenis, { type: 'proximity' });   // 'mandatory', oppure 'lock' per le presentazioni a schermate
snap.addElements(document.querySelectorAll('[data-snap]'), { align: 'start' });
```

- `type: 'lock'` con `distanceThreshold: '100%'` e `debounce: 0` per le presentazioni a schermate intere [F9]; `snap.next()` e `snap.previous()` per i pulsanti avanti e indietro.
- Con GSAP, se l'aggancio riguarda una sola sezione bloccata, basta lo `snap` di ScrollTrigger ([gsap.md](gsap.md) §5) (aggiunta Kartello).
- L'aggancio costringe il visitatore: usalo solo quando il racconto è davvero a schermate (presentazioni di prodotto, portfolio a schermo intero), mai su pagine di contenuto lunghe (aggiunta Kartello).

## §8 Limiti da conoscere [F9]

- Safari limita a 60 fotogrammi al secondo, e a 30 in risparmio energetico: le scene devono restare belle anche così.
- Sopra gli `iframe` lo scroll morbido si ferma (il CSS consigliato li rende non cliccabili durante lo scroll).
- Su Mac con Safari e processori Intel gli elementi `position: fixed` possono restare leggermente indietro.
- `syncTouch` può comportarsi male su iOS prima della 16.
- Gli scroll interni annidati vanno configurati (§6).

## §9 Controllo prima della consegna

- [ ] CSS di Lenis incluso; una sola istanza; un solo motore di aggiornamento (`autoRaf` oppure ticker o ciclo della scena) [F9].
- [ ] Con GSAP: `lenis.on('scroll', ScrollTrigger.update)`, ticker collegato, `lagSmoothing(0)` [F9].
- [ ] Ancore con `anchors: true` e `scroll-padding-top` pari all'header [F9].
- [ ] Menu e finestre modali fermano lo scroll; gli scroll interni hanno `data-lenis-prevent` [F9].
- [ ] `respectReducedMotion` non disattivato; con movimento ridotto la pagina scorre normale [F9].
- [ ] La pagina scorre anche senza Lenis; provata su Safari e su un telefono vero (aggiunta Kartello).
