# Design system — {Nome}

Stato: approvato il {gg/mm/aaaa}. Questi valori sono fissi: si cambiano solo su richiesta esplicita, aggiornando prima questo file e poi i token in codice.

## Colori

Tema: {chiaro | scuro | entrambi | chiaro con sezioni scure} · Quantità di colore: {sobrio | bilanciato | ricco}

| Ruolo | Token | Chiaro | Scuro | Uso |
|---|---|---|---|---|
| Sfondo | `background` | | | Sfondo della pagina |
| Superficie | `surface` | | | Card, pannelli |
| Superficie alternata | `surface-alt` | | | Sezioni alternate |
| Testo | `ink` | | | Testo principale |
| Testo secondario | `ink-muted` | | | Testo secondario |
| Linee | `line` | | | Bordi e divisori |
| Primario | `primary` | | | CTA, link |
| Testo su primario | `primary-ink` | | | Testo sopra il primario |
| Accento | `accent` | | | Dettagli |
| Successo · Avviso · Errore · Info | `success` · `warning` · `error` · `info` | | | Stati |

Contrasti verificati: `ink` su `background` {x:1} · `ink-muted` su `background` {x:1} · `primary-ink` su `primary` {x:1}

## Tipografia

Font: {titoli} · {testi} · Scala: {compatta | equilibrata | d'impatto} · Caricamento: {metodo}

| Stile | Classe | Tag tipico | Desktop | Mobile | Interlinea | Peso |
|---|---|---|---|---|---|---|
| Display | `type-display` | h1 della hero | | | | |
| H1 | `type-h1` | h1 | | | | |
| H2 | `type-h2` | h2 | | | | |
| H3 | `type-h3` | h3 | | | | |
| H4 | `type-h4` | h4 | | | | |
| H5 | `type-h5` | h5 | | | | |
| H6 | `type-h6` | h6 | | | | |
| Testo grande | `type-lead` | p | | | | |
| Testo | `type-body` | p | | | | |
| Testo piccolo | `type-small` | p, small | | | | |
| Didascalia | `type-caption` | figcaption | | | | |
| Etichetta | `type-label` | span | | | | |
| Bottone principale | `type-button` | button, a | | | | |
| Bottone dell'header | `type-button-sm` | button, a | | | | |
| Link di navigazione | `type-nav` | a | | | | |

## Spaziature

Scala: 0 · 2 · 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 px. Nessun altro valore.

Densità: {compatta | bilanciata | ariosa} · Padding delle sezioni: {mobile / desktop} · Distanza intestazione–contenuto: {} · Gap delle griglie: {} · Contenitore: {larghezza massima, margini laterali}

## Raggi

Stile: {squadrati | morbidi | arrotondati | pillola} · Bottoni: {} · Campi: {} · Card: {} · Immagini: {} · Contenitori grandi: {}

Raggi annidati: raggio interno = raggio esterno − spazio, se lo spazio è sotto 32px e il risultato supera 2.

## Bordi, sfondi e ombre

Gradienti: {mai | solo sul titolo della hero | ammessi negli sfondi} · Bordi: sempre tutto intorno · Ombre: {fino a tre livelli}

## Icone

Libreria: {Phosphor | Solar | Iconamoon} · Stile: {lineare | pieno | duotone} · Misure: 16, 20, 24px

## Movimento

Livello: {nessuno | sottile | fluido | cinematografico} · Easing: `--ease-fluid` = `cubic-bezier(0.32, 0.72, 0, 1)` · Durate: {} · Navigazione: {} · Tagline reveal: {sì | no}

## Token in codice

File: `{percorso del file dei token}`

---

Blocco da copiare nel `CLAUDE.md` del progetto:

```markdown
## Design system bloccato

- Il design system approvato è in `docs/design-system.md`, il brief in `docs/brief-sito.md`.
- Ogni colore, misura di testo, spaziatura, raggio e animazione deriva da lì. Niente valori arbitrari.
- I testi usano le classi tipografiche `type-*`; i colori usano i ruoli (`bg-background`, `text-ink`, `bg-primary`, …).
- Per cambiare un valore serve una richiesta esplicita: si aggiorna prima `docs/design-system.md`, poi i token in codice.
```
