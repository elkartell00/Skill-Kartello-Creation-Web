# Piano del sito — {Nome}

Stato: approvato il {gg/mm/aaaa} · Ultimo aggiornamento: {gg/mm/aaaa}

Piano approvato nella Fase 4. Lo stato di ogni voce è {da fare | fatta}, tranne nel Piano degli asset, che ha stati propri: aggiornalo dopo ogni sezione completata. In una nuova sessione riprendi dalla prima voce da fare. Le pagine aggiunte in seguito si inseriscono qui dopo la loro approvazione.

## Avanzamento

| Costruzione | Stato |
|---|---|
| Fondamenta: progetto, font, token del design system | da fare |
| Contenuti visivi: generazione e approvazione del Piano degli asset (vedi sotto) | da fare |
| Struttura globale: header e navigazione, footer, 404, pagine legali | da fare |
| Pagine, sezione per sezione (vedi sotto) | da fare |
| Animazioni secondo il livello scelto | da fare |
| Controllo qualità (Fase 6) | da fare |

## Mappa del sito

| Pagina | Percorso | Pagina madre | Dove compare | Stato |
|---|---|---|---|---|
| Home | `/` | | Menu | da fare |

CTA nell'header:

## Pagina: {Home} (`/`)

Obiettivo: · CTA principale: · Layout (solo landing): {A | B | C | D}, perché:

### Scaletta

| # | Sezione | Contenuto in breve | Stato |
|---|---|---|---|
| 1 | Hero | Titolo, sottotitolo, CTA, riga di prova, visual | da fare |
| 2 | | | da fare |

### Testi approvati

Hero (Home e ogni landing):
- Titolo:
- Sottotitolo:
- CTA:
- Riga di prova:

Benefici, da tre a cinque, orientati al risultato:
1. **{Beneficio}**: {prova o dettaglio}

Come funziona, tre passaggi (se pertinente):
1.
2.
3.

FAQ, da sei a dodici (se pertinente):

| Domanda | Risposta |
|---|---|
| | |

Ripeti il blocco "Pagina" per ogni pagina della mappa. Nelle pagine interne tieni solo i testi approvati nella Fase 4 e togli le parti che non servono.

## SEO per pagina

| Pagina | Indicizzare | Title | Meta description |
|---|---|---|---|
| Home | {sì \| no (`noindex`)} | | |

## Piano degli asset

Stile salvato in Studio AI: {nome} · Cartella delle immagini: `{public/img}` · Studio AI: {collegato | non collegato: segnaposto etichettati}

Un solo piano per tutto il sito, approvato insieme al resto del piano: ogni voce serve uno slot preciso, niente immagini in più. Preset, formati e dimensioni si verificano nel `CATALOGO.md` di Studio AI. Le immagini si generano insieme in un solo lotto; un video solo dopo l'approvazione della sua immagine di partenza e il via dell'utente sulla stima dei costi. Per le foto reali del cliente scrivi "foto del cliente" al posto del preset; il ritocco solo se il consenso è registrato nel brief. Stato di ogni voce: {da generare | generato | approvato | da sostituire}.

| Pagina | Slot | Preset | Formato e dimensioni | Nome file | Dipende da | Essenziale o facoltativo | Stato |
|---|---|---|---|---|---|---|---|
| Home | Hero | `hero-sito` | 16:9 · 2000×1125 | `hero.webp` | Stile salvato | essenziale | da generare |
| Tutte | Logo, solo il simbolo (se il cliente non ha un logo) | `logo-sito` | 1:1 · PNG trasparente | `logo-simbolo.png` | Palette approvata | essenziale | da generare |
| Tutte | Favicon | `icona-sito` | 1:1 · sorgente di almeno 512 px | `favicon.png` | Logo | essenziale | da generare |
| {Servizi} | Icone illustrative dei servizi (se previste) | `icona-sito` | 1:1 · PNG trasparente | `icona-{servizio}.png` | Stile salvato | facoltativo | da generare |
| Tutte | Immagine di condivisione (OG) | `social-sito` | 1200×630 | `og.webp` | Stile salvato | essenziale | da generare |
| Home | Video della hero (solo se scelto con A3) | `genera_video` | 16:9 · 8 s · muto | `hero.mp4`, `hero-mobile.mp4` | `hero.webp` approvata | facoltativo | da generare |

Costo stimato: {importo o crediti}, mostrato il {gg/mm/aaaa}, via dell'utente il {gg/mm/aaaa} · Consuntivo: {importo o crediti} (da `riepilogo_spese`)

Recensioni, nomi e numeri inventati nei testi approvati, i segnaposto delle immagini e gli asset in stato "da sostituire" vanno anche in `docs/brief-sito.md`, sezione "Contenuti da sostituire".
