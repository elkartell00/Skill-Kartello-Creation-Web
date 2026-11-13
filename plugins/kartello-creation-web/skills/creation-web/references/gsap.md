# GSAP: usarlo bene

GSAP è lo strumento principale del motion graphics in codice della skill: coreografie, scroll, testo, SVG, transizioni. Questo file raccoglie le regole d'uso corrette, cioè come evitare gli errori che rompono le animazioni (scatti, salti di layout, animazioni che restano attive dopo il cambio pagina, scroll fuori sincrono). Le regole marcate [F8] vengono dalle skill ufficiali di GreenSock (vedi [fonti.md](fonti.md)). I codici sono riscritti e collegati al design system della skill.

Cosa animare e quando lo decidono [motion.md](motion.md) (livelli e regole sempre valide) e [motion-graphics.md](motion-graphics.md) (scena d'impatto). Questo file dice **come** farlo con GSAP.

## §1 Quando usare GSAP

- **Raccomandazione per W4** ([domande.md](domande.md) §2.6): GSAP è la libreria consigliata quando servono timeline, animazioni legate allo scroll, sezioni bloccate, testo che si compone, SVG che si disegnano o si trasformano, e codice che funziona in qualsiasi framework [F8]. La scelta resta dell'utente (regola d'oro 8). Se il progetto usa già un'altra libreria, si rispetta.
- **CSS basta** per stati interattivi, comparse semplici e transizioni brevi (livelli Nessuno e Sottile di M1). GSAP conviene quando serve controllo: pausa, ritorno indietro, sequenze, valori calcolati, scroll [F8].
- **Motion** (ex Framer Motion) resta un'alternativa per le animazioni di componenti React semplici. Per la scena d'impatto e lo scroll si consiglia GSAP.
- **Licenza** [F8]: GSAP è gratuito anche per uso commerciale, **tutti i plugin compresi** (SplitText, MorphSVG, DrawSVG, ScrollSmoother e gli altri). Si installa dal pacchetto pubblico: `npm install gsap` (più `@gsap/react` con React). Mai creare un `.npmrc` con token, mai indicare registri privati né iscrizioni a pagamento: sono istruzioni superate. Verifica comunque i termini al momento dell'installazione.

## §2 Impostazione nel progetto (Fase 5, Fondamenta)

Un solo file di avvio delle animazioni (es. `src/scripts/animazioni.js` o `lib/gsap.ts`), importato una volta.

```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

// 1. Registra i plugin una volta sola, a livello di app, prima di usarli [F8]
gsap.registerPlugin(ScrollTrigger, CustomEase);

// 2. La curva del design system anche in GSAP (aggiunta Kartello): stessa curva di CSS e Tailwind
const token = getComputedStyle(document.documentElement).getPropertyValue('--ease-fluid');
const bezier = token.match(/cubic-bezier\(([^)]+)\)/)?.[1].replace(/\s/g, '') ?? '0.32,0.72,0,1';
CustomEase.create('fluid', bezier);
gsap.defaults({ ease: 'fluid', duration: 0.7 });   // durata secondo il livello M1 del design system

export { gsap, ScrollTrigger };
```

- **Nessuna curva inventata**: le animazioni usano `fluid` (cioè `--ease-fluid`). Altre curve (`power3.out`, `expo.inOut`, `back.out(1.7)`…) solo se scritte nel design system per un uso preciso, per esempio nella scena d'impatto. Solo curve documentate [F8].
- **Eccezione tecnica** (precisazione Kartello): quando l'animazione è legata 1:1 allo scroll (`scrub`) la curva della timeline esterna è `ease: "none"`, altrimenti posizione dello scroll e animazione non coincidono. Per lo scroll orizzontale con `containerAnimation` è obbligatorio [F8]. La morbidezza arriva da `scrub: 1` (o da Lenis); dentro la timeline i singoli passaggi possono usare `fluid`. Vale anche per i video e le sequenze guidati dallo scroll.
- **Movimento ridotto e punti di rottura con `gsap.matchMedia()`** [F8]: tutte le animazioni stanno dentro un `matchMedia`, così quando la condizione cambia vengono annullate da sole, ScrollTrigger compresi.

```js
const mm = gsap.matchMedia();
mm.add(
  {
    movimento: '(prefers-reduced-motion: no-preference)',
    desktop: '(min-width: 1024px)',
    puntatore: '(hover: hover) and (pointer: fine)',
  },
  (ctx) => {
    const { movimento, desktop, puntatore } = ctx.conditions;
    if (!movimento) {
      gsap.set('.g-reveal', { autoAlpha: 1 });   // contenuto subito visibile, nessuno spostamento
      return;
    }
    // ...animazioni; le versioni pesanti solo se desktop, i cursori personalizzati solo se puntatore
  }
);
```

  Non mettere `gsap.context()` dentro `matchMedia`: ne crea già uno; per annullare tutto si usa `mm.revert()` [F8].
- **Senza JavaScript il contenuto resta visibile** ([motion.md](motion.md) §2): lo stato nascosto iniziale si dà solo quando lo script è attivo, con `visibility` e `autoAlpha`, così non c'è il lampo del contenuto che appare e poi sparisce.

```html
<script>document.documentElement.classList.add('js')</script>
<style>.js .g-reveal { visibility: hidden; }</style>
```

## §3 Tween: le basi corrette

- `gsap.to()` dallo stato attuale ai valori dati; `gsap.from()` dai valori dati allo stato attuale (comparse); `gsap.fromTo()` con inizio e fine espliciti; `gsap.set()` subito, senza durata [F8].
- **Alias delle trasformazioni** invece della stringa `transform`: `x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`, `rotationX`, `rotationY`, `skewX`, `transformOrigin`. Sono più veloci e si applicano in un ordine coerente [F8]. Proprietà sempre in camelCase (`backgroundColor`).
- **`autoAlpha` invece di `opacity`** per apparire e sparire: a 0 imposta anche `visibility: hidden`, così l'elemento invisibile non blocca i clic [F8].
- **`clearProps`** a fine animazione quando il CSS deve riprendere il controllo (es. dopo un ingresso, per non lasciare stili in linea). Togliere una sola trasformazione le toglie tutte [F8].
- **`from()` e `fromTo()` applicano subito lo stato iniziale** (`immediateRender: true`). Se due `from()` animano la stessa proprietà dello stesso elemento, la seconda va con `immediateRender: false`, altrimenti non si vede [F8].
- **`stagger`** per scaglionare più elementi invece di tanti tween con ritardi a mano: `stagger: 0.08` oppure `{ each: 0.08, from: 'center' }` [F8].
- **Valori relativi** (`x: '+=40'`) e **valori da funzione** (`x: (i) => i * 40`, calcolati una volta per elemento) [F8].
- **Proprietà CSS personalizzate**: GSAP anima anche le variabili (`'--progresso': 1`), utile per collegare l'animazione a CSS e shader [F8].
- Rotazioni con direzione: `rotation: '-170_short'` (percorso più breve), `_cw`, `_ccw` [F8]. Su SVG, per ruotare più elementi attorno allo stesso punto, `svgOrigin`, mai insieme a `transformOrigin` [F8].
- Conserva il valore restituito (tween o timeline) quando serve controllarlo: `pause()`, `play()`, `reverse()`, `progress()`, `kill()` [F8].

## §4 Timeline: la coreografia

La scena d'impatto e ogni sequenza con più passaggi si costruiscono su una **timeline**, mai con catene di `delay` [F8].

```js
const scena = gsap.timeline({ defaults: { duration: 0.8, ease: 'fluid' } });

// Le etichette sono le battute dello storyboard (motion-graphics.md §1)
scena
  .addLabel('fondo', 0)
  .from('.scena-fondo', { autoAlpha: 0, scale: 1.08, duration: 1.2 }, 'fondo')
  .addLabel('titolo', 0.8)
  .from('.scena-titolo .riga', { yPercent: 110, stagger: 0.1 }, 'titolo')
  .addLabel('forma', '>-0.2')
  .from('.scena-forma', { drawSVG: 0, duration: 1.5 }, 'forma')   // DrawSVG, §6
  .from('.scena-cta', { autoAlpha: 0, y: 24 }, '<0.6');
```

- **Parametro di posizione** (terzo argomento) [F8]: `1` (secondo esatto), `'+=0.3'` e `'-=0.2'` (dopo o prima della fine), `'<'` (insieme al precedente), `'<0.2'` (0,2 s dopo l'inizio del precedente), `'>'` (alla fine, il default), `'etichetta+=0.3'`.
- **`defaults`** nel costruttore per durata e curva comuni [F8]. La durata di una timeline la decidono i suoi figli.
- **Timeline annidate** per i capitoli: una timeline per capitolo, poi `principale.add(capitolo, 'etichetta')` [F8].
- **Controllo**: `play()`, `pause()`, `reverse()`, `seek('etichetta')`, `tweenFromTo('a', 'b')`, `progress(0.5)` [F8].
- **Registrare la scena fotogramma per fotogramma** (aggiunta Kartello, per [grafica-in-codice.md](grafica-in-codice.md) §4 e [motion-graphics.md](motion-graphics.md) §6): con la timeline in pausa, il tempo lo dà lo script di registrazione.

```js
if (new URLSearchParams(location.search).has('registra')) {
  scena.pause(0);
  window.renderAt = (t) => scena.time(t);   // Playwright chiama renderAt(i / fps) per ogni fotogramma
}
```

## §5 ScrollTrigger: lo scroll

```js
gsap.timeline({
  scrollTrigger: {
    trigger: '.capitoli',
    start: 'top top',
    end: '+=300%',        // tre schermate di scroll
    pin: true,
    scrub: 1,
  },
})
  .to('.capitolo-1', { autoAlpha: 0, y: -40 })
  .from('.capitolo-2', { autoAlpha: 0, y: 40 }, '<0.2');
```

**Regole** [F8]:
- ScrollTrigger **solo sulla timeline o su un tween di primo livello**, mai su un tween dentro una timeline, e mai animazioni con ScrollTrigger annidate in un'altra timeline.
- **`scrub` oppure `toggleActions`**, mai entrambi sullo stesso trigger (vince `scrub`). `scrub: true` segue lo scroll alla lettera; `scrub: 1` lo insegue in un secondo, più morbido e più leggero.
- **`start` ed `end`**: `"posizione-del-trigger posizione-del-viewport"` (`'top 80%'`, `'center center'`), valori relativi (`'+=100%'`), `clamp()` per restare dentro la pagina (`end: 'clamp(bottom top)'`), funzioni per i valori che dipendono dal layout. Con valori da funzione aggiungi `invalidateOnRefresh: true` (precisazione Kartello).
- **Pin**: non animare l'elemento bloccato, anima i suoi figli. Lascia `pinSpacing` attivo, salvo layout gestito a parte. Blocca solo ciò che serve.
- **`ScrollTrigger.refresh()`** quando cambia il layout per contenuti, immagini o font caricati dopo; il ridimensionamento della finestra è già gestito. Minimo: `document.fonts.ready.then(() => ScrollTrigger.refresh())`. Non chiamarlo a ogni evento: raggruppa.
- **Ordine di creazione**: dall'alto verso il basso della pagina. Se nascono in ordine diverso (componenti asincroni), usa `refreshPriority`, con numero più basso per le sezioni più in alto.
- **`markers: true`** solo durante lo sviluppo: mai in produzione.
- **Pulizia**: nei siti a pagina singola o con transizioni di pagina, i trigger delle sezioni tolte si eliminano (`ctx.revert()`, §7), altrimenti continuano a girare su elementi che non esistono più.

**Comparse allo scroll con GSAP** ([motion.md](motion.md) §3): se il progetto usa già GSAP, `ScrollTrigger.batch()` sostituisce l'`IntersectionObserver` e raggruppa gli elementi che entrano insieme in un'unica comparsa scaglionata [F8]. La comparsa resta quella del §3 di motion.md (dal basso, sfocatura, `fluid`, 800 ms).

```js
ScrollTrigger.batch('.g-reveal', {
  start: 'top 85%',
  once: true,
  onEnter: (elementi) =>
    gsap.fromTo(elementi,
      { autoAlpha: 0, y: 64, filter: 'blur(12px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.12, overwrite: true }),
});
```

**Scroll orizzontale dentro una sezione bloccata** (binario orizzontale, D1 di [effetti-impatto.md](effetti-impatto.md)) [F8]: la timeline orizzontale usa `ease: 'none'`; gli elementi che devono reagire al movimento orizzontale usano `containerAnimation`. Su ScrollTrigger con `containerAnimation` non funzionano pin e snap. Sui telefoni di solito è meglio lo scorrimento nativo con il dito: si attiva solo con la condizione `desktop` del §2.

```js
const sezione = document.querySelector('.orizzontale');
const binario = sezione.querySelector('.binario');
const distanza = () => binario.scrollWidth - window.innerWidth;

const scorri = gsap.to(binario, {
  x: () => -distanza(),
  ease: 'none',                                   // obbligatorio
  scrollTrigger: { trigger: sezione, pin: true, scrub: 1, end: () => '+=' + distanza(), invalidateOnRefresh: true },
});

gsap.utils.toArray('.binario .card').forEach((card) => {
  gsap.from(card.querySelector('.card-titolo'), {
    autoAlpha: 0, y: 40,
    scrollTrigger: { trigger: card, containerAnimation: scorri, start: 'left 70%', toggleActions: 'play none none reverse' },
  });
});
```

**Scroll morbido: Lenis oppure ScrollSmoother** (opzione da proporre, decide l'utente):
- **Lenis** (consigliato): leggero, lavora sullo scroll nativo, non cambia l'HTML. Va sincronizzato con ScrollTrigger; impostazione completa, framework, menu e finestre modali in [scroll-morbido.md](scroll-morbido.md) [F9]:
  ```js
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((tempo) => lenis.raf(tempo * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- **ScrollSmoother** (plugin di GSAP, gratuito) [F8]: integrato con ScrollTrigger senza sincronizzazioni, ma richiede la struttura `#smooth-wrapper` > `#smooth-content`; gli elementi `position: fixed` vanno fuori dal contenitore.
- Altre librerie di scroll: solo con `ScrollTrigger.scrollerProxy()` e `ScrollTrigger.update` collegato al loro evento di scroll [F8].
- Con `prefers-reduced-motion: reduce`, niente scroll morbido.

## §6 Plugin: quale per quale effetto

Tutti gratuiti, tutti nel pacchetto `gsap`, ognuno registrato una volta con `gsap.registerPlugin()` [F8].

| Plugin | Per cosa (ricette di [motion-graphics.md](motion-graphics.md) §3) | Regole da rispettare [F8] |
|---|---|---|
| **SplitText** | Tipografia cinetica (R3), titoli che si compongono, tagline reveal ([motion.md](motion.md) §5) | Dividi solo ciò che animi (`type: 'words'` o `'lines'`; `chars` solo con `words`). Con font personalizzati usa `autoSplit: true` e crea l'animazione **dentro `onSplit()` restituendola**, così si rifà giusta quando cambiano font o larghezza. `mask: 'lines'` per le rivelazioni da sotto una maschera. Lascia `aria: 'auto'`: i lettori di schermo leggono la frase intera. Per i caratteri: `font-kerning: none`. Evita `text-wrap: balance` sul testo diviso. Non funziona su `<text>` SVG. |
| **DrawSVG** | Logo che si disegna (R2), linee e planimetrie (R8) | L'elemento deve avere `stroke` e `stroke-width`. Il valore è il tratto visibile (`'0% 100%'`), non un "da–a". Meglio percorsi a segmento unico. Agisce solo sul tratto, non sul riempimento. |
| **MorphSVG** | Forme e icone che si trasformano (R7) | Converti cerchi e rettangoli con `MorphSVGPlugin.convertToPath()`. Se la forma si attorciglia: `shapeIndex` (trova il valore con `'log'`) o `type: 'rotational'`. Per morph complessi lenti all'avvio: `precompile`. |
| **MotionPath** | Oggetti che seguono un percorso (mappe, consegne, processi) | `align` e `alignOrigin: [0.5, 0.5]`; `autoRotate` per seguire la curva. MotionPathHelper solo in sviluppo. |
| **Flip** | Transizioni tra layout (R12): filtri di griglie, card che si espandono, elementi che passano da una pagina all'altra | `Flip.getState()` → cambio del DOM → `Flip.from(stato, …)`. |
| **Observer** | Sezioni a schermo intero che cambiano con un gesto, esperienze a "scroll virtuale" | Normalizza rotella, tocco e puntatore; `tolerance` per evitare scatti involontari. Offri sempre un'alternativa da tastiera. |
| **Draggable + Inertia** | Caroselli e cursori trascinabili, oggetti da lanciare | `bounds` per i limiti, `inertia: true` (con InertiaPlugin) per lo slancio. Mai come unico modo di navigare: servono anche frecce e tastiera. |
| **ScrambleText** | Testo che si "decodifica" (tech, cybersecurity, dati) | Usalo con misura: una frase, non un paragrafo. |
| **CustomEase** | La curva del design system (§2) e le curve firmate della scena d'impatto | Curve scritte nel design system, non inventate al momento. |
| **ScrollToPlugin** | Scorrimento animato alle ancore | Con `offsetY` pari all'altezza dell'header fisso. |
| **GSDevTools** | Rivedere e regolare la timeline durante lo sviluppo | **Mai in produzione.** |

Physics2D, PhysicsProps, EasePack, CustomWiggle e CustomBounce esistono per casi particolari (esplosioni di particelle, oscillazioni): si usano solo se servono a un'idea dello storyboard.

**Tagline reveal con SplitText** (alternativa al codice di [motion.md](motion.md) §5 quando il progetto usa GSAP; stessa resa, parola per parola):

```js
SplitText.create('[data-tagline-text]', {
  type: 'words',
  autoSplit: true,
  onSplit: (self) =>
    gsap.fromTo(self.words, { opacity: 0.3 }, {
      opacity: 1, ease: 'fluid', stagger: 0.1,
      scrollTrigger: { trigger: self.elements[0], start: 'top 80%', end: 'clamp(bottom 40%)', scrub: true },
    }),
});
```

## §7 Framework: creare e pulire

Principio comune [F8]: crea le animazioni **dopo** che il DOM del componente esiste, **limita i selettori** al componente e **annulla tutto** quando il componente sparisce (`revert()` toglie tween, ScrollTrigger e stili in linea).

**React e Next.js** [F8]: si usa `useGSAP()` di `@gsap/react` al posto di `useEffect`.

```jsx
'use client';                       // Next.js App Router: GSAP gira solo nel browser
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP, ScrollTrigger);   // fuori dal componente, una volta

export function Hero() {
  const radice = useRef(null);
  const { contextSafe } = useGSAP(() => {
    gsap.from('.hero-riga', { yPercent: 110, stagger: 0.1 });   // '.hero-riga' solo dentro radice
  }, { scope: radice });

  const alClic = contextSafe(() => gsap.to('.hero-forma', { rotation: '+=90' }));   // creato dopo: va avvolto
  return <section ref={radice}>{/* … */}<button onClick={alClic}>Ruota</button></section>;
}
```

- Sempre `scope`: senza, `.hero-riga` colpirebbe anche elementi di altri componenti.
- Le animazioni create dopo l'avvio (clic, eventi) vanno in `contextSafe()`, altrimenti non vengono pulite.
- Con dipendenze che cambiano: `{ dependencies: [valore], scope, revertOnUpdate: true }`.
- Senza `@gsap/react`: `useEffect` con `const ctx = gsap.context(() => { … }, radice)` e `return () => ctx.revert()`.
- Mai chiamare `gsap` o `ScrollTrigger` durante il rendering sul server.

**Vue e Nuxt** [F8]: in `onMounted` crea `gsap.context(() => { … }, contenitore.value)`, in `onUnmounted` chiama `ctx?.revert()`. In Nuxt registra i plugin in un composable o plugin unico e carica solo quando serve i plugin usati in poche pagine (`await import('gsap/SplitText')`).

**Svelte e SvelteKit** [F8]: in `onMount` crea il context sul nodo legato con `bind:this` e restituisci `() => ctx.revert()`.

**Astro** (aggiunta Kartello): lo script del componente si esegue una volta. Con le transizioni di pagina (`<ClientRouter />`), avvia le animazioni a ogni pagina e puliscile prima del cambio:

```js
let ctx;
document.addEventListener('astro:page-load', () => {
  ctx = gsap.context(() => { /* animazioni della pagina */ });
});
document.addEventListener('astro:before-swap', () => ctx?.revert());
```

**HTML senza framework**: un unico `matchMedia` (§2) per tutto il sito basta, perché la pagina non smonta componenti.

## §8 Prestazioni

- Anima **trasformazioni e opacità**. Mai `width`, `height`, `top`, `left`, `margin` per spostare o ingrandire, quando `x`, `y` e `scale` danno lo stesso risultato [F8].
- **`will-change: transform`** solo sugli elementi che si animano davvero, non su tutto "per sicurezza" [F8].
- **`gsap.quickTo()`** per i valori aggiornati di continuo (cursori che seguono il mouse, effetti magnetici): riusa lo stesso tween invece di crearne uno nuovo a ogni movimento [F8]. Solo con puntatore fine (§2).

```js
const xA = gsap.quickTo('.cursore', 'x', { duration: 0.4, ease: 'power3' });
const yA = gsap.quickTo('.cursore', 'y', { duration: 0.4, ease: 'power3' });
addEventListener('pointermove', (e) => { xA(e.clientX); yA(e.clientY); });
```

- **Prima tutte le letture del DOM, poi tutte le scritture**, per non forzare ricalcoli continui del layout [F8].
- Niente centinaia di tween o ScrollTrigger sovrapposti senza averli provati su un dispositivo debole; `stagger` invece di tween separati; timeline riusate, mai create a ogni fotogramma [F8].
- Ferma o elimina le animazioni fuori schermo o di sezioni non più visibili [F8].
- Utilità di `gsap.utils` che evitano codice scritto a mano [F8]: `clamp`, `mapRange` (es. posizione del mouse → rotazione), `normalize`, `interpolate` (anche tra colori), `snap`, `wrap` (caroselli infiniti), `distribute` (stagger su griglie), `toArray`, `selector` (selettori limitati a un componente), `random`.

## §9 Errori da evitare (controllo prima della consegna)

- [ ] Ogni plugin usato è registrato una volta, a livello di app [F8].
- [ ] Nessun `markers: true`, nessun GSDevTools o MotionPathHelper in produzione [F8].
- [ ] Nessun ScrollTrigger su un tween dentro una timeline; nessun trigger con `scrub` e `toggleActions` insieme [F8].
- [ ] Pin: animati i figli, non l'elemento bloccato; `ease: 'none'` sulle animazioni orizzontali con `containerAnimation` [F8].
- [ ] `ScrollTrigger.refresh()` dopo il caricamento dei font e dei contenuti che cambiano il layout [F8].
- [ ] Tutto dentro `gsap.matchMedia()` con la condizione `prefers-reduced-motion`; con movimento ridotto il contenuto è visibile e composto [F8].
- [ ] Nei componenti: selettori limitati (`scope`) e pulizia (`revert()`) al cambio pagina o allo smontaggio [F8].
- [ ] Curve dal design system (`fluid`), nessuna curva o durata inventata (aggiunta Kartello).
- [ ] Senza JavaScript il contenuto è visibile; l'elemento principale della hero non parte da opacità 0 ([motion.md](motion.md) §2).
- [ ] Nessun `.npmrc` con token né registri privati: tutto da `npm install gsap` [F8].
