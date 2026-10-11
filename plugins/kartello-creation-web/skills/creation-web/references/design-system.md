# Design system

Come trasformare le risposte dell'utente in un sistema di valori fisso. Le regole marcate [F1] vengono da `landing-page-design` (vedi [fonti.md](fonti.md)).

## §1 Principi

- **Una sola fonte di verità.** Tutti i valori approvati stanno in `docs/design-system.md` del progetto e nei token in codice (§9). Componenti e pagine li usano, non li ridefiniscono.
- **Niente valori arbitrari.** Ogni misura, colore, raggio o durata si risolve con le regole qui sotto, mai inventata al momento [F1].
- **Le scelte estetiche sono parametri.** Font, colori, angoli, gradienti, densità e movimento vengono dalle risposte (domande C, T, V, M). Le regole tecniche (scale, formula dei raggi, contrasti) valgono sempre.

## §2 Colori

### Ruoli

Ogni palette si esprime in ruoli, non in colori sparsi.

| Token | Uso |
|---|---|
| `background` | Sfondo della pagina |
| `surface` | Card, pannelli, menu |
| `surface-alt` | Sezioni alternate, fasce |
| `ink` | Testo principale |
| `ink-muted` | Testo secondario, didascalie |
| `line` | Bordi e divisori |
| `line-strong` | Bordi di campi, checkbox e controlli: almeno 3:1 su `background` e `surface` |
| `focus` | Anello di focus: di default uguale a `primary`; almeno 3:1 su `background` e `surface` (aggiunta Kartello) |
| `primary` | CTA principali, link, elementi chiave |
| `primary-ink` | Testo e icone sopra `primary` |
| `secondary` | Facoltativo: secondo colore di brand |
| `accent` | Dettagli ed evidenze, con parsimonia |
| `success` · `warning` · `error` · `info` | Stati e messaggi |

Con tema scuro (o doppio tema) definisci gli stessi ruoli anche per lo scuro.

### Regole

- **Proporzioni 60/30/10:** neutri circa 60%, superfici e secondario circa 30%, primario e accento circa 10%. Con C4 "Ricco" il colore può salire.
- **Un solo colore per le CTA principali** in tutto il sito.
- **Contrasto WCAG AA, sempre verificato:** testo normale almeno 4.5:1; testo grande (da 24px, o da 18.66px in grassetto) e componenti dell'interfaccia almeno 3:1. Controlla almeno `ink` e `ink-muted` su `background` e `surface`, `primary-ink` su `primary`, e `line-strong` e `focus` su `background` e `surface` (almeno 3:1). Calcola il rapporto con la formula WCAG della luminanza relativa, se serve con un breve script; se non passa, correggi il colore e dillo.
- **Sfondi piatti di default** [F1]. I gradienti si usano solo se V6 lo consente (§6).
- **Sfondi scuri consigliati** per il tema scuro [F1]: `#000000` · `#181818` · `#1F1F1F` · `#272727` · `#313131` · `#131209`.

### Come proporre le palette (C2)

Proponi tre palette diverse tra loro. Per ognuna: nome evocativo, sensazione, perché è adatta al settore, hex per ogni ruolo, contrasti verificati. Se c'è un logo o un colore di brand, tutte e tre partono da lì.

## §3 Tipografia

### 3.1 Scelta dei font

- **Una sola famiglia per tutto il sito** di default [F1]. Due famiglie (titoli più testi) solo se T3 lo chiede.
- **Monospace** (es. Geist Mono) solo per codice, dati o numeri dove serve davvero [F1].
- **Evita i font generici** Inter, Roboto, Arial, Open Sans, Helvetica [F1], a meno che non siano font di brand dell'utente.
- **Pesi:** mai oltre 700 (bold), quindi mai 800 né 900 [F1]. Titoli 400–700 secondo T5, testi 400, bottoni 600.
- **Corsivo:** niente corsivo nell'interfaccia [F1]. Eccezione: negli stili editoriale e lusso il corsivo di un serif può evidenziare una parola in un titolo, se l'utente lo approva.
- **Caricamento:** self-hosted o tramite il sistema del framework (es. `next/font`), `font-display: swap`, solo i pesi usati.

Suggerimenti per carattere (T2), tutti disponibili su Google Fonts:

| Carattere | Font |
|---|---|
| Geometrico moderno | Geist, Manrope, Poppins [F1], Plus Jakarta Sans, Outfit |
| Neutro e pulito | Geist, Instrument Sans, Figtree, Hanken Grotesk |
| Serif elegante | Fraunces, Playfair Display, Cormorant Garamond, Instrument Serif (solo peso 400: titoli con T5 = Leggero) |
| Editoriale | Newsreader, Source Serif 4, Libre Caslon Text |
| Morbido e amichevole | Nunito, Quicksand, DM Sans |
| Espressivo d'impatto | Bricolage Grotesque, Space Grotesk, Syne, Unbounded |
| Tecnico (solo accenti) | Geist Mono, JetBrains Mono, IBM Plex Mono |

Abbinamenti collaudati se T3 = due font: Fraunces + Manrope · Instrument Serif + Instrument Sans · Playfair Display + DM Sans · Bricolage Grotesque + Figtree.

Se il font non ha il peso scelto con T5, cambia peso o font e imposta `font-synthesis: none` per evitare il grassetto finto.

### 3.2 Regole

- **Ogni misura sulla scala Tailwind** (§3.4). Mai valori arbitrari come `text-[19px]`, `font-size: 22px` o `1.4rem` [F1].
- **Arrotondamento:** se una misura esistente non cade su un gradino, scendi al gradino più vicino sotto, prendendo insieme misura e interlinea [F1].
- **Interlinea e tracking** si regolano solo dentro il valore che il gradino scelto già prevede, così le due regole non si scontrano mai [F1].
- **Nessuna parola orfana** sull'ultima riga: `text-wrap: balance` sui titoli, `text-wrap: pretty` sui testi [F1].
- **Titoli in sentence case**: maiuscola solo all'inizio e nei nomi propri [F1].
- **Hero:** titolo e sottotitolo con larghezza massima 680px (token `--container-hero: 42.5rem`, classe `max-w-hero`, §9); vai a capo nei punti di senso, mai spezzando una frase in modo goffo [F1].
- **Testi lunghi:** 60–75 caratteri per riga (`max-w-prose`, cioè 65ch).
- **Classi tipografiche:** ogni testo usa una classe del sistema (`type-display`, `type-h1` … `type-h6`, `type-lead`, `type-body`, `type-small`, `type-caption`, `type-label`, `type-button`, `type-button-sm`, `type-nav`). Nei componenti non si scrivono misure di testo a mano.
- **Semantica separata dallo stile:** i tag h1–h6 seguono la gerarchia del contenuto, con un solo `<h1>` per pagina. Il titolo della hero è un `<h1>` con stile Display.

### 3.3 Scale (T4)

Misure come classi Tailwind: desktop / mobile. Il passaggio a desktop avviene da 768px (`md`).

| Stile | Compatta | Equilibrata | D'impatto |
|---|---|---|---|
| Display (titolo hero) | 5xl / 4xl | 6xl / 4xl | 8xl / 5xl |
| H1 | 4xl / 3xl | 5xl / 4xl | 7xl / 5xl |
| H2 | 3xl / 2xl | 4xl / 3xl | 5xl / 4xl |
| H3 | 2xl / xl | 3xl / 2xl | 4xl / 3xl |
| H4 | xl / lg | 2xl / xl | 2xl / xl |
| H5 | lg / base | xl / lg | xl / lg |
| H6 | base / base | lg / base | lg / base |
| Testo grande (lead) | lg / base | xl / lg | xl / lg |
| Testo | base / base | base / base | lg / base |
| Testo piccolo | sm | sm | sm |
| Didascalia | xs | xs | xs |
| Etichetta (sopratitolo) | xs, semibold | xs, semibold | sm, semibold |
| Bottone principale | base, semibold [F1] | base, semibold [F1] | base, semibold [F1] |
| Bottone dell'header | sm, semibold [F1] | sm, semibold [F1] | sm, semibold [F1] |
| Link di navigazione | sm, medium | sm, medium | base, medium |

Quando consigliarle: **compatta** per siti informativi, corporate e ricchi di contenuto; **equilibrata** per la maggior parte dei siti; **d'impatto** per brand, moda, creativi, eventi e landing.

### 3.4 Scala Tailwind di riferimento [F1]

| Classe | Misura | Interlinea |
|---|---|---|
| `text-xs` | 12px (0.75rem) | 16px |
| `text-sm` | 14px (0.875rem) | 20px |
| `text-base` | 16px (1rem) | 24px |
| `text-lg` | 18px (1.125rem) | 28px |
| `text-xl` | 20px (1.25rem) | 28px |
| `text-2xl` | 24px (1.5rem) | 32px |
| `text-3xl` | 30px (1.875rem) | 36px |
| `text-4xl` | 36px (2.25rem) | 40px |
| `text-5xl` | 48px (3rem) | 1 |
| `text-6xl` | 60px (3.75rem) | 1 |
| `text-7xl` | 72px (4.5rem) | 1 |
| `text-8xl` | 96px (6rem) | 1 |
| `text-9xl` | 128px (8rem) | 1 |

### 3.5 Tabella da far approvare

Presenta la tipografia sempre in questo formato, con i valori reali:

| Stile | Tag tipico | Desktop | Mobile | Interlinea | Peso | Font |
|---|---|---|---|---|---|---|
| Display | h1 della hero | 60px | 36px | 1 / 40px | 600 | … |
| H1 | h1 delle pagine interne | 48px | 36px | 1 / 40px | 600 | … |
| … | … | … | … | … | … | … |

## §4 Spaziature e densità

### Scala [F1]

Solo questi valori per padding, margin e gap. Niente in mezzo, niente fuori.

| Token | Valore | Tailwind |
|---|---|---|
| Spacing-0 | 0 | `0` |
| Spacing-25 | 2px | `0.5` |
| Spacing-50 | 4px | `1` |
| Spacing-75 | 8px | `2` |
| Spacing-100 | 12px | `3` |
| Spacing-200 | 16px | `4` |
| Spacing-300 | 24px | `6` |
| Spacing-400 | 32px | `8` |
| Spacing-500 | 40px | `10` |
| Spacing-600 | 48px | `12` |
| Spacing-700 | 64px | `16` |
| Spacing-800 | 80px | `20` |
| Spacing-900 | 96px | `24` |

**Bottoni principali:** 8px in verticale, 12px in orizzontale [F1]. Variante grande per la CTA della hero, se serve: 12px / 24px (aggiunta Kartello). Su mobile ogni bottone ha un'area toccabile di almeno 44px di altezza ([contenuti-e-qualita.md](contenuti-e-qualita.md) §4): aggiungi `min-h-11` (l'altezza minima non è padding, quindi la regola 8/12 resta valida). Per il bottone dell'header e l'hamburger estendi l'area con padding o con uno pseudo-elemento.

### Densità (V4)

| | Compatto | Bilanciato | Arioso |
|---|---|---|---|
| Padding verticale delle sezioni (mobile / desktop) | 40 / 64px | 48 / 80px | 64 / 96px |
| Distanza tra intestazione di sezione e contenuto | 24px | 32px | 40px |
| Gap delle griglie | 16px | 24px | 32px |

**Contenitore:** larghezza massima 1152px (`max-w-6xl`) o 1280px (`max-w-7xl`); margini laterali 16px su mobile, 24px su tablet, 32px su desktop.

## §5 Raggi

- **Solo i valori di Tailwind** [F1]: 0, 2, 4, 6, 8, 12, 16, 24, 32px, full. In Tailwind v4: `rounded-none`, `-xs`, `-sm`, `-md`, `-lg`, `-xl`, `-2xl`, `-3xl`, `-4xl`, `-full`. In v3 2px è `rounded-sm`, 4px è `rounded` e il raggio di 32px non esiste: aggiungi `borderRadius: { '4xl': '2rem' }` al tema.
- **Stile degli angoli (V5):**

| | Squadrati | Morbidi | Arrotondati | Pillola |
|---|---|---|---|---|
| Bottoni | 0–2px | 6px | 12px | full |
| Campi dei moduli | 0–2px | 6px | 12px | 12px |
| Card | 0–2px | 8px | 16px | 24px |
| Immagini | 0 | 8px | 16px | 24px |
| Contenitori grandi | 0 | 12px | 24px | 32px |

- **Formula dei raggi annidati** [F1]. Quando una forma sta dentro un'altra e lo spazio tra le due è **meno di 32px**:

  ```
  raggio interno = raggio esterno − spazio
  ```

  Applicala solo se il risultato è **maggiore di 2**; sotto, lascia la forma interna squadrata o invariata. Esempio: card esterna a 16px (`rounded-2xl`) con 8px di padding → elemento interno a 8px (`rounded-lg`).

  Se il risultato non è sulla scala, scendi al gradino inferiore (20 → 16, 14 → 12). Dentro un contenitore `rounded-full` l'elemento interno è anch'esso `rounded-full` (aggiunta Kartello).

## §6 Bordi, sfondi e ombre

- **Mai un bordo su un solo lato di una card**: tutto intorno o niente [F1].
- **Gradienti (V6):**
  - *Mai* (default) [F1]: sfondi e superfici piatti.
  - *Solo sul titolo della hero* [F1]: gradiente sul testo, da sinistra a destra. Tema scuro `#FFFFFF` → `#9B9B9B`; tema chiaro `#000000` → `#666666`. È l'unico gradiente del sito, solo sul testo, mai sullo sfondo. Definiscilo come token (`--color-hero-from`, `--color-hero-to`).
  - *Ammessi negli sfondi*: se scelti con V6 (di default nel solo stile Glass UI), definiti come token, mai improvvisati.
- **Ombre:** al massimo tre livelli definiti nei token (es. card, menu, finestra modale). Nessuna ombra creata al momento.

## §7 Icone

- Una sola libreria per sito, scelta tra **Phosphor**, **Solar** e **Iconamoon** [F1]. Default: Phosphor, stile lineare (aggiunta Kartello), da dichiarare in Assunzioni. Altre librerie solo su richiesta esplicita dell'utente.
- Material Icons e Material Symbols da evitare, salvo richiesta esplicita [F1].
- Stile coerente (lineare, pieno o duotone) e misure fisse: 16, 20, 24px.

## §8 Movimento

Easing di riferimento [F1]: `cubic-bezier(0.32, 0.72, 0, 1)`, come token `--ease-fluid`. Livelli, durate e regole in [motion.md](motion.md).

## §9 Token in codice

Scrivi i token in un solo file di stile globale (es. `src/styles/globals.css`). Il CSS che usa i token (comparse, tagline, componenti) va nello stesso file elaborato da Tailwind o in file importati con `@import`. Se i token servono a fogli esterni, dichiara il tema con `@theme static { … }`, così tutte le variabili sono sempre presenti.

Esempio con Tailwind v4 e scala equilibrata:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Manrope", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Manrope", ui-sans-serif, system-ui, sans-serif;

  --color-background: #FAFAF7;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F2F1EC;
  --color-ink: #161616;
  --color-ink-muted: #5B5B57;
  --color-line: #E3E2DC;
  --color-line-strong: #8A8984;
  --color-focus: #1F4D3A;          /* di default uguale a primary */
  --color-primary: #1F4D3A;
  --color-primary-ink: #FFFFFF;
  /* --color-secondary: …;  solo se C4 lo prevede */
  --color-accent: #C4703A;

  --container-hero: 42.5rem; /* 680px: titolo e sottotitolo della hero, tagline */

  --ease-fluid: cubic-bezier(0.32, 0.72, 0, 1);
}

/* Tema scuro: si ridefiniscono solo i ruoli */
[data-theme="dark"] {
  --color-background: #181818;
  --color-surface: #1F1F1F;
  /* … */
}

/* Classi tipografiche: prima mobile, poi desktop da 768px.
   I valori sono gradini della scala Tailwind (§3.4). */
@layer components {
  .type-display { font-family: var(--font-display); font-size: 2.25rem; line-height: 2.5rem; font-weight: 600; text-wrap: balance; } /* 4xl */
  .type-h1      { font-family: var(--font-display); font-size: 2.25rem; line-height: 2.5rem; font-weight: 600; text-wrap: balance; } /* 4xl */
  .type-body    { font-size: 1rem; line-height: 1.5rem; text-wrap: pretty; }                                                       /* base */
  /* … stesso schema per h2–h6, lead, small, caption, label, button, button-sm, nav */

  @media (width >= 48rem) {
    .type-display { font-size: 3.75rem; line-height: 1; } /* 6xl */
    .type-h1      { font-size: 3rem; line-height: 1; }    /* 5xl */
  }
}
```

Con questi token Tailwind genera classi come `bg-background`, `bg-surface`, `text-ink`, `text-ink-muted`, `border-line`, `border-line-strong`, `outline-focus`, `bg-primary`, `text-primary-ink`, `max-w-hero`, `ease-fluid`. Con Tailwind v3 o senza Tailwind usa le stesse variabili CSS su `:root` e collegale nella configurazione del framework.
