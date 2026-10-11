# SEO, dati strutturati e risposte AI

Regole per farsi trovare sui motori di ricerca e citare dai motori di risposta AI (ChatGPT, Perplexity, Gemini, Copilot). Le regole di base [F1] sono in [strategia-e-struttura.md](strategia-e-struttura.md) §8; quelle marcate [F5] vengono dalla fonte F5 ([fonti.md](fonti.md)).

## §1 Title e meta description [F5]

- **Title della Home:** `[Marchio] | [frase di posizionamento]`, es. `Forno Bertani | Pane a lievitazione naturale a Bologna`. **Pagine interne:** `[Pagina] | [Marchio]`, es. `Servizi | Studio Rinaldi`. Sotto i 60 caratteri; il marchio c'è sempre. Separatore `|` o `·`, non il trattino lungo.
- **Meta description:** 150–160 caratteri, parola chiave principale nei primi 100, scritta per le persone: dice cosa ottiene chi clicca. Il seme è l'obiettivo e l'offerta del brief (I1, K2). Mai "Benvenuti nel nostro sito".
- Ogni pagina ha **title e description unici**: copiare quelli della Home è l'errore più comune.
- `theme-color` = colore primario del design system; `og:site_name` e `author` = marchio.

## §2 Indicizzazione tecnica [F5]

| Tipo di pagina | `robots` |
|---|---|
| Pagine pubbliche (Home, servizi, chi siamo, blog) | `index, follow, max-image-preview:large` |
| Area riservata, amministrazione | `noindex, nofollow` |
| Privacy, cookie, termini | `index, nofollow` |
| Landing solo per campagne o offerte a tempo [F1] | `noindex` |

- **URL canonico** su ogni pagina, identico all'indirizzo pubblicato: senza slash finale, parametri o frammenti. Un canonico sbagliato fa ignorare la pagina.
- `robots.txt` con il riferimento alla sitemap; `sitemap.xml` con tutte le pagine pubbliche (per una landing, la sola Home).
- Se il dominio definitivo non è ancora noto, usa un segnaposto e mettilo in "Contenuti da sostituire".

## §3 Dati strutturati (JSON-LD) [F5]

| Tipo di sito | Schemi |
|---|---|
| Studio, agenzia, azienda di servizi | `Organization` + `ProfessionalService` + `WebSite` |
| Attività locale (negozio, ristorante, salone, studio con sede) | `LocalBusiness` (o il sottotipo: `Restaurant`, `Dentist`…) + `WebSite` |
| Prodotti, e-commerce | `Product` + `Organization` + `WebSite` |
| Software, app | `SoftwareApplication` + `Organization` + `WebSite` |
| Blog | `Article` o `BlogPosting` + `WebSite` |
| Pagina con FAQ | Aggiungi `FAQPage` |

Campi minimi: `Organization` (name, url, logo assoluto, sameAs); `WebSite` (name, url); `ProfessionalService` (name, url, description, areaServed, serviceType, priceRange); `Product` (name, description, image, offers con price, priceCurrency, availability); `FAQPage` (mainEntity con domande e risposte); per `LocalBusiness` anche address, telephone, openingHours, geo.

**I dati strutturati riflettono solo ciò che è visibile** nella pagina: niente servizi, zone o FAQ che non compaiono nel testo [F5].

## §4 Identità dell'attività (entity SEO) [F5]

- Dati da raccogliere (W6): nome, descrizione in una frase, URL, logo, profili social e professionali attivi (`sameAs`), anno di fondazione, settore, zona servita.
- `sameAs`: solo profili che l'attività controlla davvero e che funzionano (verifica ogni link); dal più autorevole al meno.
- **NAP coerente**: nome, indirizzo e telefono **identici** nei dati strutturati, nel footer o nei contatti e nelle schede esterne (profilo Google, social). Scegli un formato e usalo ovunque. Senza sede fisica, niente indirizzo inventato.
- Più entità (attività e titolare) nello stesso `@graph`, collegate con `founder` o `worksFor`.

## §5 Contenuti citabili dalle AI (GEO) [F5]

1. **Prima la risposta**: ogni sezione si apre con una frase che risponde da sola, poi i dettagli.
2. **Chi sei entro le prime 100 parole**: "Forno Bertani è un panificio artigianale di Bologna che…", non "Benvenuti".
3. **Fatti concreti e verificabili** invece di aggettivi; ogni numero va sostenuto, altrimenti è un segnaposto ([contenuti-e-qualita.md](contenuti-e-qualita.md) §1).
4. **Dati strutturati allineati al testo** (§3).
5. **FAQ** con risposte di 1–3 frasi, con lo schema `FAQPage`.
6. **Titoli che sono domande reali**: non "Il nostro approccio" ma "Come lavoriamo una ristrutturazione chiavi in mano".
7. **Autorevolezza**: link interni descrittivi tra pagine correlate, stesso nome dell'attività ovunque, una sezione di competenze (anni, certificazioni, team).

Da evitare: ripetere parole chiave in modo innaturale, FAQ nello schema ma non in pagina, muri di testo senza titoli, "contattaci per i prezzi" al posto della risposta.

## §6 Controllo SEO prima della consegna [F5]

Pagina per pagina:

1. **Titoli**: un solo `<h1>`, nessun livello saltato, l'`<h1>` contiene la parola chiave della pagina.
2. **Alt**: ogni `<img>` ha `alt`; quelle decorative `alt=""`; mai "immagine" o "foto".
3. **Testo dei link**: niente "clicca qui", "scopri di più", "leggi di più": il testo descrive la destinazione.
4. **Quantità di testo**: almeno 200 parole leggibili per pagina (esclusi menu e footer); sotto 50 è un errore.
5. **Parola chiave** in title e `<h1>` (obbligatoria), nel primo paragrafo e nella description.
6. **Leggibilità mobile**: testo ≥16px, interlinea ≥1.5 nei paragrafi, meta viewport presente, contrasti corretti.
7. **Tastiera**: tutto ciò che è cliccabile è raggiungibile e attivabile da tastiera, con focus visibile.
8. **Ancore**: ogni `href="#…"` punta a un `id` esistente nella pagina.
9. **Moduli**: ogni campo ha un'etichetta associata; obbligatori marcati; errori collegati con `aria-describedby`.
10. **Anteprima social**: `og:title`, `og:description`, `og:image` con URL assoluto, `twitter:card`.

Riporta l'esito in una tabella (controllo, esito, correzione), correggi e ripeti finché non restano errori.
