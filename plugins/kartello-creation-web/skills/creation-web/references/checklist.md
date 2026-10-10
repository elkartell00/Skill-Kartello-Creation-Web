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
- [ ] Ogni pagina ha un obiettivo e una sola CTA principale [F1]
- [ ] Nessuna CTA in competizione sopra la piega [F1]
- [ ] Numeri specifici al posto di verbi vaghi [F1]
- [ ] Almeno una riduzione del rischio, nei siti che vendono [F1]
- [ ] Le prove stanno accanto all'affermazione che sostengono [F1]
- [ ] Layout delle landing scelto con un motivo [F1]

## Visivo
- [ ] Font come da design system; niente corsivo né 900, salvo scelta esplicita [F1]
- [ ] Niente trattini nei testi, nessuna parola orfana [F1]
- [ ] Nessun bordo su un solo lato delle card; gradienti solo come deciso con V6 [F1]
- [ ] Titolo e sottotitolo della hero entro 680px, a capo nei punti di senso [F1]
- [ ] Icone da una sola libreria tra Phosphor, Solar e Iconamoon [F1]

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
- [ ] Dati legali nel footer (attività italiane)
- [ ] Controllo visivo a 375px, 768px e 1280px
