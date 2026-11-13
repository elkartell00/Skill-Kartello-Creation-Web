# Piano del sito — {Nome}

Stato: approvato il {gg/mm/aaaa} · Ultimo aggiornamento: {gg/mm/aaaa}

Piano approvato nella Fase 4. Lo stato di ogni voce è {da fare | fatta}, tranne nel Piano degli asset, che ha stati propri: aggiornalo dopo ogni sezione completata. In una nuova sessione riprendi dalla prima voce da fare. Le pagine aggiunte in seguito si inseriscono qui dopo la loro approvazione.

## Avanzamento

| Costruzione | Stato |
|---|---|
| Fondamenta: progetto, font, token del design system | da fare |
| Contenuti visivi: creazione in codice, poi eventuali generazioni con Studio AI, e approvazione del Piano degli asset (vedi sotto) | da fare |
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

## Scelte tecniche

Per ogni effetto, movimento, scena 3D o soluzione per le prestazioni: la soluzione propria di Claude Code confrontata con le tecniche apprese pertinenti, sugli stessi criteri (resa e aderenza al design system, prestazioni, accessibilità e SEO, semplicità del codice, tempo, compatibilità con la tecnologia). Vince la migliore; se si equivalgono o la differenza cambia ciò che l'utente vede, il budget o i tempi, decide l'utente ([repository-template.md](../references/repository-template.md) §5).

| Effetto | Soluzione propria | Tecnica appresa | Scelta | Perché | Deciso da |
|---|---|---|---|---|---|
| {es. scroll della hero} | {es. Lenis + ScrollTrigger} | {es. scroll-virtuale-infinito v1 \| nessuna} | {propria \| appresa} | {una riga} | {Claude \| utente} |

## Piano degli asset

Cartella delle immagini: `{public/img}` · Stile salvato in Studio AI (solo se usato): {nome} · Studio AI: {collegato | non collegato: segnaposto etichettati}

Un solo piano per tutto il sito, approvato insieme al resto del piano: ogni voce serve uno slot preciso, niente immagini in più. **Prima il codice** ([grafica-in-codice.md](../references/grafica-in-codice.md)): grafica, logo, icone, sfondi, animazioni e video di motion graphics nascono in codice; fotografie dal cliente; Studio AI solo per ciò che il codice non può fare, con il motivo scritto. Per le voci di Studio AI preset, formati e dimensioni si verificano nel suo `CATALOGO.md`; le immagini si generano insieme in un solo lotto e un video solo dopo l'approvazione della sua immagine di partenza e il via sulla stima. Il ritocco delle foto del cliente solo se il consenso è registrato nel brief. Stato di ogni voce: {da creare | creato | approvato | da sostituire}.

| Pagina | Slot | Come nasce | Tecnica o preset | Formato e dimensioni | Nome file | Dipende da | Essenziale o facoltativo | Stato |
|---|---|---|---|---|---|---|---|---|
| Tutte | Logo (se il cliente non ha un logo) | Codice | SVG: simbolo e nome con il font del sito | Vettoriale | `logo.svg` | Palette approvata | essenziale | da creare |
| Tutte | Favicon e icone dell'app | Codice | Dal simbolo SVG | SVG, PNG 180/192/512, ICO 32 | `favicon.svg` | Logo | essenziale | da creare |
| {Servizi} | Icone illustrative dei servizi (se previste) | Codice | Set SVG coerente | 48×48, vettoriali | `icona-{servizio}.svg` | Design system | facoltativo | da creare |
| Tutte | Immagine di condivisione (OG) | Codice | Pagina HTML salvata in PNG | 1200×630 | `og.png` | Logo, design system | essenziale | da creare |
| Home | Hero | {Codice: animazione WebGL/Canvas · Cliente: foto · Studio AI: `hero-sito`, perché serve una fotografia realistica} | | 16:9 · 2000×1125 | `hero.webp` | | essenziale | da creare |
| Home | Video della hero (solo se scelto con A3) | {Codice: animazione dal vivo o Remotion · Studio AI: `anima_immagine`, perché serve una ripresa dal vero} | | 16:9 · 8 s · muto | `hero.mp4`, `hero-mobile.mp4` | Hero approvata | facoltativo | da creare |

Costo stimato di Studio AI: {importo o crediti, oppure 0 se tutto è in codice}, mostrato il {gg/mm/aaaa}, via dell'utente il {gg/mm/aaaa} · Consuntivo: {importo o crediti} (da `riepilogo_spese`)

Recensioni, nomi e numeri inventati nei testi approvati, i segnaposto delle immagini e gli asset in stato "da sostituire" vanno anche in `docs/brief-sito.md`, sezione "Contenuti da sostituire".
