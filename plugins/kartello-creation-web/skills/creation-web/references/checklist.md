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

## Momento firma
- [ ] Livello High Quality: momento firma in motion graphics costruito in codice e rivisto su registrazione almeno tre volte ([motion-graphics.md](motion-graphics.md) §7); il risultato è di livello premium
- [ ] Nessuna chiamata a Studio AI senza elenco, motivo, stima e sì dell'utente; budget base del livello rispettato, e ogni generazione in più chiesta prima spiegando che il sito resta allo stesso livello; al livello High Quality una spesa più alta ha prodotto un risultato di livello premium

## Contenuti visivi
- [ ] Grafica, logo, icone, animazioni e video di motion graphics creati prima in codice; Studio AI usato solo dove il codice non bastava, con il motivo nel piano degli asset; foto reali del cliente dove servono fotografie; segnaposto etichettati se Studio AI non era collegato
- [ ] Stile salvato con `salva_stile` e usato in tutte le immagini; immagini coerenti viste tutte insieme
- [ ] Foto del cliente ritoccate o usate come riferimento solo con i consensi registrati nel brief
- [ ] Logo del cliente intatto; logo nuovo in SVG (in codice, oppure simbolo di Studio AI più nome in SVG)
- [ ] Icone d'interfaccia dalla libreria, icone illustrative come set SVG in codice (Studio AI solo se serviva), mai mescolate nella stessa zona
- [ ] Video solo se scelto con A3 e approvato sulla stima; muto, con poster
- [ ] File nel progetto con nomi parlanti; `width`, `height` reali e `alt` in italiano nel markup
- [ ] Immagine OG e favicon presenti; costo totale riepilogato all'utente
- [ ] Se c'è il volo in prima persona: nessun taglio nascosto nel master, uscita e rivelazione realistiche, "Salta la visita" presente, ritaglio mobile controllato ([volo-in-prima-persona.md](volo-in-prima-persona.md) §8) [F4]
- [ ] Se c'è lo scroll cinematico: giunture controllate, mobile come scelto con X4, `release` e punti laterali funzionanti, solo immagini con reduced motion ([scroll-cinematico.md](scroll-cinematico.md) §8) [F3]

## Consegna
- [ ] Stati hover, active, focus, caricamento, vuoto ed errore presenti [F1]
- [ ] Nessun link morto; pagina corrente indicata nel menu [F1]
- [ ] 404, link legali, validazione dei moduli, favicon, meta tag, testi alternativi [F1]
- [ ] Link "salta al contenuto", HTML semantico, banner cookie se serve [F1]
- [ ] Dati legali nel footer (attività italiane, vedi [contenuti-e-qualita.md](contenuti-e-qualita.md) §3)
- [ ] Controllo visivo a 375px, 768px e 1280px; telefoni in verticale e orizzontale senza scroll orizzontale [F4]
- [ ] Moduli con destinazione reale o comportamento dimostrativo dichiarato [F4]

## Controllo meccanico prima della consegna [F5]

Da eseguire sul codice, correggendo ogni risultato prima di consegnare:

```bash
grep -rniE 'lorem ipsum|TODO|REMOVE_THIS|\{\{|\[NOME' src/ app/ 2>/dev/null    # segnaposto rimasti
grep -rn 'h-screen' src/ app/ 2>/dev/null                                    # usare dvh
grep -rn ' — ' src/ app/ 2>/dev/null                                          # lineette nei testi visibili
```

- [ ] Nessun segnaposto tecnico nei testi; quelli voluti sono in "Contenuti da sostituire"
- [ ] Ogni file in `public/` è usato da una pagina; la hero usa un'immagine vera
- [ ] Head completo: favicon (ico e png), `apple-touch-icon`, icone 192 e 512 con `site.webmanifest`, `theme-color`, blocco Open Graph e Twitter con URL assoluti
- [ ] Nessun accesso a `window`, `document` o `localStorage` fuori dagli effetti nei framework con rendering lato server
- [ ] Una sola etichetta per intento di CTA; CTA principali brevi
- [ ] Sopratitoli entro il limite; tipi di sezione non ripetuti ([contenuti-e-qualita.md](contenuti-e-qualita.md) §7)
- [ ] La pagina costruita corrisponde alla scaletta approvata in `docs/piano-sito.md`
- [ ] Controllo SEO in 10 punti superato ([seo.md](seo.md) §6)
- [ ] Rilettura di tutti i testi visibili

