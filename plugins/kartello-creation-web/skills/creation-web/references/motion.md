# Movimento e navigazione

Le regole marcate [F1] vengono da `landing-page-design` (vedi [fonti.md](fonti.md)).

## §1 Livelli di movimento (M1)

| Livello | Cosa include |
|---|---|
| **Nessuno** | Solo gli stati interattivi (hover, active, focus), con transizioni brevi (200ms) sulla curva `--ease-fluid` |
| **Sottile** | Stati a 300ms; comparsa allo scroll leggera (solo opacità e 16px di spostamento, 500ms) |
| **Fluido** [F1] | Stati a 700ms; comparsa allo scroll completa (§3); comparse scaglionate; menu con trasformazione dell'hamburger |
| **Cinematografico** | Tutto il livello fluido, più sequenza di ingresso della hero (con i limiti del §2), leggero parallax sulle immagini grandi e tagline reveal se M3 è sì, senza mai sacrificare le prestazioni |

## §2 Regole sempre valide

- **Mai transizioni di default** (`ease`, `linear`, `ease-in-out`) [F1]. Ogni movimento simula massa e molla reali con curve personalizzate. Curva di riferimento: `cubic-bezier(0.32, 0.72, 0, 1)`, definita come token `--ease-fluid` (classe `ease-fluid`). Esempio per il livello fluido: `transition duration-700 ease-fluid`.
- **Gli elementi non appaiono statici al caricamento** (livelli sottile e superiori) [F1]: entrano con una comparsa morbida quando arrivano nel viewport. L'elemento principale della hero (titolo o immagine più grande) non parte mai da opacity 0: se serve un ingresso, anima solo transform, con un'animazione CSS che parte subito senza aspettare JavaScript. La comparsa con `IntersectionObserver` vale per i contenuti sotto la piega (aggiunta Kartello).
- **Rivelazioni con `IntersectionObserver`** o con `whileInView` di Framer Motion [F1]. **Mai `window.addEventListener('scroll')` senza limiti**: provoca ricalcoli continui del layout e rovina le prestazioni su mobile.
- **Per comparse, scroll e spostamenti anima solo** `transform` (con Tailwind v4 anche `translate`, `scale` e `rotate`), `opacity` e `filter`. Negli stati interattivi ([contenuti-e-qualita.md](contenuti-e-qualita.md) §2) e nella tagline reveal (§5) sono ammessi anche colore, sfondo e bordo.
- **Rispetta `prefers-reduced-motion: reduce`**: niente spostamenti né sfocature, contenuto subito visibile.
- **Senza JavaScript il contenuto resta visibile**: lo stato nascosto iniziale si applica solo quando lo script è attivo.

## §3 Comparsa allo scroll [F1]

Mentre entrano nel viewport, gli elementi eseguono una comparsa morbida e "pesante" dal basso:

```
translate-y-16 blur-md opacity-0  →  translate-y-0 blur-0 opacity-100
```

in 800ms o più. Implementazione di riferimento:

```html
<script>document.documentElement.classList.add('js')</script>
```

```css
.js [data-reveal] {
  opacity: 0;
  transform: translateY(4rem);   /* translate-y-16 */
  filter: blur(12px);            /* blur-md */
  transition-property: opacity, transform, filter;
  transition-duration: 800ms;
  transition-timing-function: var(--ease-fluid);
  transition-delay: var(--reveal-delay, 0ms);
}
.js [data-reveal].is-visible { opacity: 1; transform: none; filter: none; }

@media (prefers-reduced-motion: reduce) {
  .js [data-reveal] { opacity: 1; transform: none; filter: none; transition: none; }
}
```

```js
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  }
}, { threshold: 0 });   // scatta appena l'elemento entra, qualunque sia la sua altezza
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
```

Metti `data-reveal` sui singoli blocchi (titolo, card, immagine), non su sezioni intere. Per scaglionare gli elementi di una griglia imposta un ritardo crescente con `style="--reveal-delay:150ms"` (100, 150, 200ms…). Il CSS fuori dai layer vince sulle utility di Tailwind v4: non mettere classi `delay-*` o `transition-*` sugli elementi con `data-reveal` (per l'hover usa un elemento interno).

## §4 Navigazione (M2)

Regole comuni: la pagina corrente è sempre indicata; il menu mobile si apre e chiude da tastiera, `Esc` lo chiude, il pulsante ha `aria-expanded`; la CTA dell'header usa lo stile "bottone dell'header" della tipografia. Se il menu copre lo schermo: rendi `inert` il resto della pagina (tutto tranne il menu e il suo pulsante) finché è aperto, porta il focus sulla prima voce all'apertura e riportalo al pulsante alla chiusura, blocca lo scroll del body.

- **Barra classica fissa:** in alto, sfondo pieno (o vetro leggero dopo lo scroll), logo a sinistra, voci al centro o a destra, CTA a destra.
- **Trasparente sopra la hero:** testo leggibile sopra l'immagine (verifica il contrasto), diventa piena appena si scorre.
- **Menu laterale:** per portfolio e siti con molte sezioni.
- **Isola fluttuante in vetro** [F1]:
  - *Chiusa:* una pillola di vetro staccata dal bordo superiore: `mt-6 mx-auto w-max rounded-full`.
  - *Trasformazione dell'hamburger:* al clic le linee ruotano e traslano fluidamente fino a formare una X perfetta (`rotate-45` e `-rotate-45` con posizionamento assoluto). Non devono mai semplicemente sparire.
  - *Espansione:* il menu si apre come una sovrapposizione a tutto schermo con un vetro pesante: `backdrop-blur-3xl bg-background/80` (in F1 `bg-black/80` o `bg-white/80`, secondo il tema).
  - *Comparsa a maschera scaglionata:* le voci entrano dal basso da un contenitore invisibile, da `translate-y-12 opacity-0` a `translate-y-0 opacity-100`, una dopo l'altra con `delay-100`, `delay-150`, `delay-200` e così via.

## §5 Sezione tagline reveal (M3) [F1]

Una sezione di testo grande che enuncia il beneficio principale o la tagline, separata dalla hero. Sta più in basso nella pagina come momento a sé, non subito sotto la hero.

**Testo**
- Almeno due righe.
- Una frase di beneficio o una tagline scritta con le regole dei testi ([strategia-e-struttura.md](strategia-e-struttura.md) §7), non un titolo di sezione generico.

**Tipografia**
- Una classe `type-*` del sistema la cui misura desktop cade tra `text-4xl` e `text-6xl`, più grande se le righe sono poche: scala compatta `type-display` (5xl/4xl); equilibrata `type-h1` (5xl/4xl) o `type-display` (6xl/4xl); d'impatto `type-h2` (5xl/4xl). Nessuna misura scritta a mano.
- Larghezza massima come la hero (`max-w-hero`, dal token `--container-hero`), con a capo nei punti di senso.

**Animazione**
- Il testo parte in un tono attenuato, circa 25–35% di opacità del colore del testo.
- Mentre la sezione scorre nel viewport, ogni parola passa dal tono attenuato al colore pieno, nell'ordine di lettura.
- Le parole si attivano una alla volta quando superano una linea di attivazione, non tutto il blocco insieme. La transizione usa `--ease-fluid`, mai una dissolvenza lineare.
- Implementazione: `IntersectionObserver` per parola, oppure un solo listener di scroll limitato con `requestAnimationFrame` e attivo solo mentre la sezione è visibile. Mai un listener di scroll senza limiti.
- A fine scorrimento della pagina tutte le parole sono attive (aggiunta Kartello).

Implementazione di riferimento (per andare a capo nei punti di senso usa `<br>` dentro il testo; lo script li conserva):

```html
<section data-tagline>
  <!-- classe type-* secondo la scala, vedi sopra -->
  <p data-tagline-text class="type-h1 max-w-hero">Il tuo lavoro merita un sito che lavori quanto te.</p>
</section>
```

```css
.tagline-word {
  color: color-mix(in srgb, var(--color-ink) 30%, transparent);
  transition: color 700ms var(--ease-fluid);
}
.tagline-word.is-active { color: var(--color-ink); }
```

```js
function initTaglineReveal(section) {
  const text = section.querySelector('[data-tagline-text]');
  const spans = [];
  for (const node of [...text.childNodes]) {
    if (node.nodeType !== Node.TEXT_NODE) continue;   // i <br> restano al loro posto
    const frag = document.createDocumentFragment();
    for (const part of node.textContent.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) { frag.append(' '); continue; }
      const span = document.createElement('span');
      span.className = 'tagline-word';
      span.textContent = part;
      frag.append(span);
      spans.push(span);
    }
    node.replaceWith(frag);
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    spans.forEach((s) => s.classList.add('is-active'));
    return;
  }

  let ticking = false;
  const update = () => {
    ticking = false;
    const rect = text.getBoundingClientRect();
    const start = innerHeight * 0.8;   // inizia quando il testo entra all'80% del viewport
    const end = innerHeight * 0.4;     // finisce quando il fondo del testo arriva al 40%
    const progress = Math.min(1, Math.max(0, (start - rect.top) / (rect.height + start - end)));
    const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;   // pagina scorsa fino in fondo
    const active = atEnd ? spans.length : Math.round(progress * spans.length);
    spans.forEach((s, i) => s.classList.toggle('is-active', i < active));
  };
  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      addEventListener('scroll', onScroll, { passive: true });
      update();
    } else {
      removeEventListener('scroll', onScroll);
    }
  }).observe(section);
}

document.querySelectorAll('[data-tagline]').forEach(initTaglineReveal);
```
