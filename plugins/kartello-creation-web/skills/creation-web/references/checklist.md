# Checklist finale

Da passare nella Fase 6, pagina per pagina. Le voci marcate [F1] vengono da `landing-page-design`.

## Brief e design system
- [ ] `docs/brief-sito.md` e `docs/design-system.md` esistono e sono approvati
- [ ] Il `CLAUDE.md` del progetto contiene il blocco "Design system bloccato"
- [ ] Ogni colore usa un ruolo del design system; contrasti AA verificati
- [ ] Ogni testo usa una classe `type-*`; misure solo sui gradini della scala Tailwind [F1]
- [ ] Ogni spaziatura viene dalla scala delle spaziature [F1]
- [ ] Raggi dallo stile scelto; raggi annidati secondo la formula [F1]

## Strategia
- [ ] Ogni pagina ha un obiettivo e una sola CTA principale; ogni landing ha un'offerta, un pubblico e un'azione principale [F1]
- [ ] Nessuna CTA in competizione sopra la piega [F1]
- [ ] Numeri specifici al posto di verbi vaghi [F1]
- [ ] Almeno una riduzione del rischio in ogni landing e in ogni pagina con una CTA di conversione (vendita, contatto, prenotazione, iscrizione) [F1]
- [ ] Le prove stanno accanto all'affermazione che sostengono [F1]
- [ ] Layout delle landing scelto con un motivo [F1]

## Visivo
- [ ] Font come da design system; nessun peso oltre 700; niente corsivo salvo l'accento approvato negli stili editoriale e lusso [F1]
- [ ] Niente trattini usati come punteggiatura dentro le frasi [F1], ammessi solo in parole composte, nomi propri, marchi e intervalli di dati come orari, prezzi e date (precisazione Kartello); nessuna parola orfana [F1]
- [ ] Nessun bordo su un solo lato delle card; gradienti solo come deciso con V6 [F1]
- [ ] Titolo e sottotitolo della hero entro 680px (token `--container-hero`), a capo nei punti di senso [F1]
- [ ] Icone da una sola libreria, quella del design system (default Phosphor lineare, alternative Solar o Iconamoon); niente Material Icons o Symbols salvo richiesta [F1]

## Movimento
- [ ] Ogni transizione usa la curva `--ease-fluid`, mai quelle di default [F1]
- [ ] Comparse con IntersectionObserver, nessun listener di scroll senza limiti [F1]
- [ ] Se M3 è "sì": tagline reveal presente, almeno due righe, parole che si attivano una alla volta [F1]
- [ ] `prefers-reduced-motion` rispettato; contenuto visibile anche senza JavaScript

## Contenuti
- [ ] Niente Lorem Ipsum, marchi segnaposto, cliché o numeri tondi finti [F1]
- [ ] Tutti i segnaposto elencati in "Contenuti da sostituire"
- [ ] Tono di voce e "tu" o "lei" coerenti in tutto il sito

## Consegna
- [ ] Stati hover, active, focus, caricamento, vuoto ed errore presenti [F1]
- [ ] Nessun link morto; pagina corrente indicata nel menu [F1]
- [ ] 404, link legali, validazione dei moduli, favicon, meta tag, testi alternativi [F1]
- [ ] Link "salta al contenuto", HTML semantico, banner cookie se serve [F1]
- [ ] Dati legali nel footer (attività italiane, vedi [contenuti-e-qualita.md](contenuti-e-qualita.md) §3)
- [ ] Controllo visivo a 375px, 768px e 1280px
