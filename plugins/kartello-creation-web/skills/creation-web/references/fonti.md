# Fonti integrate

Registro delle skill integrate in Creation Web. Le regole e le domande derivate portano il codice della fonte tra parentesi quadre, es. [F1].

| Codice | Skill | Origine | Licenza | Integrata il |
|---|---|---|---|---|
| F1 | `landing-page-design` | [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) | MIT | 2026-10-10 |
| F2 | Pratiche di generazione da `higgsfield-generate`, `higgsfield-brandkit`, `higgsfield-product-photoshoot` e dal percorso website di `higgsfield-websites` | [higgsfield-ai/skills](https://github.com/higgsfield-ai/skills) v0.13.0, commit f83af0bc | MIT | 2026-10-11 |
| SA | Istruzioni Studio AI del proprietario e `CATALOGO.md` dell'app | Proprietario | — | 2026-10-11 |
| F3 | `scroll-world` v0.8.0 | [oso95/scroll-world](https://github.com/oso95/scroll-world) | MIT | 2026-10-11 |

---

## F1 — landing-page-design

Sistema completo per landing page ad alta conversione: domande iniziali, struttura della pagina, scelta del layout, testi orientati alla conversione, SEO, e un sistema visivo rigido (tipografia, spaziature, raggi, sfondi, hero, icone, movimento).

### Dove è finita ogni parte

| Parte originale | Dove si trova ora |
|---|---|
| Scope | `SKILL.md` regola d'oro 3 (priorità utente > design system > skill > framework) |
| A1 Intake | [domande.md](domande.md) I4, V3 (Giro 3) e §2.1–2.3 (K, R, V1, V7); `SKILL.md` regola d'oro 5; la raccolta "in un solo blocco" è diventata giri di 4–6 domande secondo le modalità ([domande.md](domande.md) §0) |
| A2 Struttura della pagina | [strategia-e-struttura.md](strategia-e-struttura.md) §2, estesa alla Home multipagina (§3) |
| A3 Scelta del layout | [strategia-e-struttura.md](strategia-e-struttura.md) §5 e domanda L1 |
| A4 Regole di conversione | [strategia-e-struttura.md](strategia-e-struttura.md) §6 |
| A5 Copywriting | [strategia-e-struttura.md](strategia-e-struttura.md) §7, adattato all'italiano |
| A6 Ordine di costruzione | `SKILL.md` Fase 5 |
| A7 SEO e AEO | [strategia-e-struttura.md](strategia-e-struttura.md) §8 e domanda W1 |
| A8 Errori | [strategia-e-struttura.md](strategia-e-struttura.md) §9 |
| B1 Tipografia | [design-system.md](design-system.md) §3; trattini e parole orfane anche in [contenuti-e-qualita.md](contenuti-e-qualita.md) §1 |
| B2 Spaziature | [design-system.md](design-system.md) §4 |
| B3 Raggi | [design-system.md](design-system.md) §5 |
| B4 Bordi e sfondi | [design-system.md](design-system.md) §2 e §6 |
| B5 Hero | [design-system.md](design-system.md) §3.2 e §6 |
| B6 Icone | [design-system.md](design-system.md) §7 |
| B7 Movimento | [motion.md](motion.md) §1–§4 |
| B8 Realismo dei contenuti | [contenuti-e-qualita.md](contenuti-e-qualita.md) §1 |
| B9 Stati | [contenuti-e-qualita.md](contenuti-e-qualita.md) §2 |
| B10 Requisiti di consegna | [contenuti-e-qualita.md](contenuti-e-qualita.md) §3 |
| B11 Tagline reveal | [motion.md](motion.md) §5 e domanda M3 |
| Output format | `SKILL.md` Fase 4 |
| Quick checklist | [checklist.md](checklist.md) |

### Regole rimaste regole

Scala tipografica Tailwind e arrotondamento al gradino inferiore, tetto di peso a 700 (mai 800 né 900), scala delle spaziature, formula dei raggi annidati, bordi delle card tutto intorno o niente, niente trattini usati come punteggiatura dentro le frasi (con la precisazione in "Aggiunte Kartello"), niente parole orfane, sentence case, larghezza della hero a 680px (token `--container-hero`), contenuti realistici, stati, requisiti di consegna, curve di movimento personalizzate, IntersectionObserver al posto dei listener di scroll, struttura e regole di conversione, ordine di costruzione, piano prima del codice.

### Regole diventate opzioni

La skill originale impone un'estetica unica. Per servire qualsiasi settore, queste scelte sono diventate default modificabili o domande:

| Regola originale | Ora |
|---|---|
| Solo Geist, Manrope, Geist Mono, Poppins | Suggerimenti in [design-system.md](design-system.md) §3.1; default dello stile Minimal tech, modificabili |
| Mai Inter, Roboto, Arial, Open Sans, Helvetica | Da evitare salvo font di brand ([design-system.md](design-system.md) §3.1) |
| Una sola famiglia di font | Default; domanda T3 |
| Mai corsivo | Default; corsivo d'accento ammesso negli stili editoriale e lusso, se approvato |
| Bottoni principali 8/12 px | Default; variante grande 12/24 px per la CTA della hero (aggiunta Kartello) |
| Icone solo Phosphor, Solar o Iconamoon, mai Material | Default Phosphor lineare; alternative Solar o Iconamoon; altre librerie solo su richiesta esplicita; Material Icons e Material Symbols da evitare salvo richiesta ([design-system.md](design-system.md) §7) |
| Mai gradienti negli sfondi | Default; domanda V6 |
| Gradiente sul titolo della hero | Opzione di V6; default nello stile Minimal tech |
| Sfondi scuri fissi | Suggeriti per il tema scuro |
| Navigazione a isola in vetro | Opzione di M2 |
| Movimento fluido ovunque | Livello "Fluido" di M1, il default |
| Tagline reveal obbligatoria | Domanda M3 |
| Direzioni "minimal editorial, playful 3D, glass UI" | Stili 2, 3 e 4 di [stili.md](stili.md) |
| Lo stile complessivo della skill | Stile 1 "Minimal tech" di [stili.md](stili.md) |

### Non integrato

- Il rimando alla skill compagna `redesign-existing-projects` ([elayadesign/redesign-skill](https://github.com/elayadesign/redesign-skill)), pensata per rifare siti esistenti. Si potrà integrare in futuro.
- L'uso della skill per modificare o rivedere UI, componenti e dashboard esistenti (Scope).

### Licenza F1

```
MIT License

Copyright (c) 2026 Elaya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## F2 — Pratiche di generazione da Higgsfield

Dal repository ufficiale Higgsfield sono state prese **solo pratiche indipendenti dallo strumento** per immagini, video e audio dei siti, riscritte per Studio AI: nella skill non si usa Higgsfield.

| Cosa | Dove si trova ora |
|---|---|
| Piano degli asset, precedenza degli asset del cliente, scelta del preset per slot | [contenuti-visivi.md](contenuti-visivi.md) §1, §3, §5; modello `piano-sito.md` |
| Scheda di stile (brand lock), un solo modo di guidare lo stile | [contenuti-visivi.md](contenuti-visivi.md) §4 |
| Scrittura dei prompt (due parti, in positivo, testi in HTML, composizione centrata, divieti) | [contenuti-visivi.md](contenuti-visivi.md) §6 |
| Logo, favicon, immagine OG, set di icone illustrative | [contenuti-visivi.md](contenuti-visivi.md) §7 |
| Foto del cliente, persone e prodotti | [contenuti-visivi.md](contenuti-visivi.md) §8; domande A5 |
| Video (prima l'immagine, movimento per settore, requisiti per il web, mobile) | [contenuti-visivi.md](contenuti-visivi.md) §9; domanda A3 |
| Audio muto nei video del sito | [contenuti-visivi.md](contenuti-visivi.md) §10 |
| Controllo, rigenerazioni, errori, file e markup | [contenuti-visivi.md](contenuti-visivi.md) §11 |
| Stime, approvazioni, consuntivo | [contenuti-visivi.md](contenuti-visivi.md) §12 |

**Non integrato:** CLI, crediti e modelli di Higgsfield, deploy e app su Cloudflare, giochi, 3D, Marketing Studio e annunci pubblicitari. Il resto del percorso website di `higgsfield-websites` (SEO, controllo pre-consegna, effetti "wow", scroll-scrub) è in coda come fonte da integrare.

Le idee prese da `higgsfield-websites/references/design-taste-frontend.md` (MIT, autore Hermes Agent) sono solo principi riscritti, nessun testo copiato.

### Licenza F2

```
MIT License

Copyright (c) 2026 Higgsfield AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## SA — Istruzioni Studio AI del proprietario

Il blocco "Contenuti visivi del sito: Studio AI" e il `CATALOGO.md` dell'app Studio AI (modelli Google, OpenAI ed ElevenLabs, server MCP `studio-ai`). Sono finiti in [contenuti-visivi.md](contenuti-visivi.md), nelle domande A1–A6 di [domande.md](domande.md) §2.7, nella regola d'oro 9 e nelle Fasi 2, 4, 5 e 6 di `SKILL.md`. I parametri esatti non si ricopiano: si leggono nel catalogo.

Scelte del proprietario che modificano il blocco:
- **Logo nuovo**: Studio AI genera solo il simbolo; il nome si compone in SVG con il font del sito (il catalogo prevede il nome tra virgolette nel prompt di `logo-sito`).
- **Icone**: modello misto, libreria per l'interfaccia e Studio AI per icone illustrative e favicon.
- **Video nella hero**: si chiede ogni volta (A3), senza default.
- **Foto reali**: con il consenso del cliente si possono ritoccare; con il consenso anche delle persone ritratte possono fare da riferimento per nuove immagini.

## F3 — scroll-world

Pagina in cui lo scroll guida una telecamera che vola tra scene generate, senza tagli: interviste, generazione delle scene e dei video concatenati, giunture identiche al fotogramma, codifica per lo scrub e un motore JavaScript portabile.

| Parte originale | Dove si trova ora |
|---|---|
| Step 0 Bootstrap | [scroll-cinematico.md](scroll-cinematico.md) §1 (solo Studio AI, ffmpeg, Python) |
| Step 1 Interview | [domande.md](domande.md) §2.8 (X1–X6), riusando brief e design system; preventivo in [scroll-cinematico.md](scroll-cinematico.md) §2 |
| Step 2–3 Scene stills, knockout | [scroll-cinematico.md](scroll-cinematico.md) §3; `assets/scroll-cinematico/knockout.py` |
| Step 4 Camera architecture, camera grammar | [scroll-cinematico.md](scroll-cinematico.md) §4 |
| Step 5 Connectors | [scroll-cinematico.md](scroll-cinematico.md) §5 |
| Step 6 Encode | [scroll-cinematico.md](scroll-cinematico.md) §6 |
| Step 7 Assemble | [scroll-cinematico.md](scroll-cinematico.md) §7; `assets/scroll-cinematico/scrub-engine.js` e `index-template.html` |
| Step 8 QA, Gotchas | [scroll-cinematico.md](scroll-cinematico.md) §8–§9; [checklist.md](checklist.md) |
| prompts.md | [scroll-cinematico-prompt.md](scroll-cinematico-prompt.md) (prompt in inglese, istruzioni in italiano) |
| pipeline.md | Solo i comandi ffmpeg in [scroll-cinematico.md](scroll-cinematico.md) §5–§6; la generazione passa da Studio AI |

**Sostituzioni per Studio AI:** immagini con `genera_immagine`/`genera_lotto` invece di Higgsfield `gpt_image_2` o Codex `image_gen`; ingressi, tratti e raccordi con `anima_immagine` (`immagine_iniziale` e `immagine_finale`) invece di Seedance/Kling su Higgsfield o Monid; livello `low` come bozza invece di `seedance_2_0_mini` o 480p; stile coerente con `salva_stile`; preventivo con `stima_costo` e `riepilogo_spese` invece della calibrazione dei crediti; durate e risoluzioni adattate a Veo (4, 6, 8 s; 1080p a 8 s).

**Scelte del proprietario:** stile del motore adattato al design system oppure originale (X6, entrambe disponibili); uso anche come apertura della Home (opzione `release`); menu del sito più punti laterali del motore (opzione `topbar: false`).

**Modifiche al motore** (`scrub-engine.js`, marcate "Kartello"): opzioni `topbar` e `release`; testate in Chromium.

**Non integrato:** CLI e flussi di Higgsfield, Monid e Codex (registrazione, crediti, file system `sfs`, protocollo di qualificazione degli endpoint, modelli della lista), comandi per macOS come `stat -f%z`, i limiti specifici dei loro filtri.

### Licenza F3

```
MIT License

Copyright (c) 2026 cyw

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Aggiunte Kartello

Regole e parti che non vengono da nessuna fonte integrata. Nei file sono senza codice di fonte; dove potrebbero sembrare di F1 sono marcate "(aggiunta Kartello)" o "(precisazione Kartello)".

| Aggiunta | Dove si trova |
|---|---|
| Fase base: brief in quattro giri (idea, pagine, stile e palette, tipografia), pagine tipiche per settore, palette in ruoli, tabella tipografica da approvare | `SKILL.md` Fase 1; [domande.md](domande.md) §1 |
| Modalità dell'intervista: Rapida, Standard, Approfondita | [domande.md](domande.md) §0; `SKILL.md` Fase 0 |
| Raccomandazione dello stack: nessuno stack predefinito, Claude raccomanda e l'utente sceglie (W4) | [domande.md](domande.md) §2.6; `SKILL.md` regola d'oro 8 |
| Cliché italiani, nomi e marchi segnaposto italiani, formato italiano di numeri e prezzi | [contenuti-e-qualita.md](contenuti-e-qualita.md) §1 |
| Segnaposto onesti: tutto ciò che è inventato va in "Contenuti da sostituire" e si ricorda alla consegna | [contenuti-e-qualita.md](contenuti-e-qualita.md) §1; `SKILL.md` regola d'oro 6 |
| Obblighi legali italiani nel footer | [contenuti-e-qualita.md](contenuti-e-qualita.md) §3; domanda W5 |
| Cookie: quando serve il banner, analytics anonimizzati, contenuti di terze parti caricati dopo il consenso (F1 dice solo "dove la legge lo richiede") | [contenuti-e-qualita.md](contenuti-e-qualita.md) §3 |
| Accessibilità: contrasti AA, tastiera, etichette dei campi, aree toccabili di 44px, `lang` | [contenuti-e-qualita.md](contenuti-e-qualita.md) §4; [design-system.md](design-system.md) §2 e §4 |
| Prestazioni: immagini, font, librerie leggere; elemento principale della hero mai a opacity 0 | [contenuti-e-qualita.md](contenuti-e-qualita.md) §5; [motion.md](motion.md) §2 |
| Reduced motion e contenuto visibile senza JavaScript | [motion.md](motion.md) §2 |
| Token `line-strong` per bordi di campi e controlli (almeno 3:1) | [design-system.md](design-system.md) §2 e §9 |
| Variante grande del bottone, 12/24 px, per la CTA della hero | [design-system.md](design-system.md) §4 |
| Precisazione sui trattini: restano ammessi in parole composte, nomi propri e marchi (Emilia-Romagna, Wi-Fi, e-commerce) e il trattino medio negli intervalli di dati come orari, prezzi e date (Lun–Ven 9:00–19:00) | [contenuti-e-qualita.md](contenuti-e-qualita.md) §1 |
| Piano del sito salvato in `docs/piano-sito.md`, con lo stato di ogni pagina e sezione | `SKILL.md` Fasi 0, 4 e 5; [templates/piano-sito.md](../templates/piano-sito.md) |

Le altre precisazioni tecniche marcate "(aggiunta Kartello)" nei file (es. raggi dentro un contenitore `rounded-full`, parole della tagline tutte attive a fine pagina) completano regole di F1 senza cambiarne il senso.
