# Movimento e navigazione

Le regole marcate [F1] vengono da `landing-page-design` (vedi [fonti.md](fonti.md)).

## §1 Livelli di movimento (M1)

| Livello | Cosa include |
|---|---|
| **Nessuno** | Solo gli stati interattivi (hover, active, focus), con transizioni brevi (200ms) sulla curva `--ease-fluid` |
| **Sottile** | Stati a 300ms; comparsa allo scroll leggera (solo opacità e 16px di spostamento, 500ms) |
| **Fluido** [F1] | Stati a 700ms; comparsa allo scroll completa (§3); comparse scaglionate; menu con trasformazione dell'hamburger |
| **Cinematografico** | Tutto il livello fluido, più sequenza di ingresso della hero, tagline reveal e leggero parallax sulle immagini grandi, senza mai sacrificare le prestazioni |

## §2 Regole sempre valide

- **Mai transizioni di default** (`ease`, `linear`, `ease-in-out`) [F1]. Ogni movimento simula massa e molla reali con curve personalizzate. Curva di riferimento: `cubic-bezier(0.32, 0.72, 0, 1)`, definita come token `--ease-fluid` (classe `ease-fluid`). Esempio per il livello fluido: `transition-all duration-700 ease-fluid`.
- **Gli elementi non appaiono statici al caricamento** (livelli sottile e superiori) [F1]: entrano con una comparsa morbida quando arrivano nel viewport.
- **Rivelazioni con `IntersectionObserver`** o con `whileInView` di Framer Motion [F1]. **Mai `window.addEventListener('scroll')` senza limiti**: provoca ricalcoli continui del layout e rovina le prestazioni su mobile.
- **Anima solo** `transform`, `opacity` e `filter`.
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
  transition: opacity 800ms var(--ease-fluid), transform 800ms var(--ease-fluid), filter 800ms var(--ease-fluid);
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
}, { threshold: 0.15 });
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
```

Per scaglionare gli elementi di una griglia, aggiungi un ritardo crescente (100, 150, 200ms…) con `transition-delay`.

## §4 Navigazione (M2)

Regole comuni: la pagina corrente è sempre indicata; il menu mobile si apre e chiude da tastiera, `Esc` lo chiude, il pulsante ha `aria-expanded`; la CTA dell'header usa lo stile "bottone dell'header" della tipografia.

- **Barra classica fissa:** in alto, sfondo pieno (o vetro leggero dopo lo scroll), logo a sinistra, voci al centro o a destra, CTA a destra.
- **Trasparente sopra la hero:** testo leggibile sopra l'immagine (verifica il contrasto), diventa piena appena si scorre.
- **Menu laterale:** per portfolio e siti con molte sezioni.
- **Isola fluttuante in vetro** [F1]:
  - *Chiusa:* una pillola di vetro staccata dal bordo superiore: `mt-6 mx-auto w-max rounded-full`.
  - *Trasformazione dell'hamburger:* al clic le linee ruotano e traslano fluidamente fino a formare una X perfetta (`rotate-45` e `-rotate-45` con posizionamento assoluto). Non devono mai semplicemente sparire.
  - *Espansione:* il menu si apre come una sovrapposizione a tutto schermo con un vetro pesante: `backdrop-blur-3xl bg-black/80` oppure `bg-white/80`.
  - *Comparsa a maschera scaglionata:* le voci entrano dal basso da un contenitore invisibile, da `translate-y-12 opacity-0` a `translate-y-0 opacity-100`, una dopo l'altra con `delay-100`, `delay-150`, `delay-200` e così via.

## §5 Sezione tagline reveal (M3) [F1]

Una sezione di testo grande che enuncia il beneficio principale o la tagline, separata dalla hero. Sta più in basso nella pagina come momento a sé, non subito sotto la hero.

**Testo**
- Almeno due righe.
- Una frase di beneficio o una tagline scritta con le regole dei testi ([strategia-e-struttura.md](strategia-e-struttura.md) §7), non un titolo di sezione generico.

**Tipografia**
- Da `text-4xl` a `text-6xl` secondo il numero di righe, sempre sulla scala del design system.
- Larghezza massima come la hero, con a capo nei punti di senso.

**Animazione**
- Il testo parte in un tono attenuato, circa 25–35% di opacità del colore del testo.
- Mentre la sezione scorre nel viewport, ogni parola passa dal tono attenuato al colore pieno, nell'ordine di lettura.
- Le parole si attivano una alla volta quando superano una linea di attivazione, non tutto il blocco insieme. La transizione usa `--ease-fluid`, mai una dissolvenza lineare.
- Implementazione: `IntersectionObserver` per parola, oppure un solo listener di scroll limitato con `requestAnimationFrame` e attivo solo mentre la sezione è visibile. Mai un listener di scroll senza limiti.

Implementazione di riferimento (il testo va scritto senza markup interno; gli a capo li gestiscono larghezza massima e `text-wrap: balance`):

```html
<section data-tagline>
  <p data-tagline-text class="type-h1">Il tuo lavoro merita un sito che lavori quanto te.</p>
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
  const words = text.textContent.trim().split(/\s+/);
  text.textContent = '';
  const spans = words.map((word) => {
    const span = document.createElement('span');
    span.className = 'tagline-word';
    span.textContent = word;
    text.append(span, ' ');
    return span;
  });

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
    const active = Math.round(progress * spans.length);
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
