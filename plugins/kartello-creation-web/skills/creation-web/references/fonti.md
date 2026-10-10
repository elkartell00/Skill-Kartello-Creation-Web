# Fonti integrate

Registro delle skill integrate in Creation Web. Le regole e le domande derivate portano il codice della fonte tra parentesi quadre, es. [F1].

| Codice | Skill | Origine | Licenza | Integrata il |
|---|---|---|---|---|
| F1 | `landing-page-design` | [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) | MIT | 2026-10-10 |

---

## F1 — landing-page-design

Sistema completo per landing page ad alta conversione: domande iniziali, struttura della pagina, scelta del layout, testi orientati alla conversione, SEO, e un sistema visivo rigido (tipografia, spaziature, raggi, sfondi, hero, icone, movimento).

### Dove è finita ogni parte

| Parte originale | Dove si trova ora |
|---|---|
| A1 Intake | [domande.md](domande.md) §2.1–2.3, §2.6 (K, R, V, W1) |
| A2 Struttura della pagina | [strategia-e-struttura.md](strategia-e-struttura.md) §2, estesa alla Home multipagina (§3) |
| A3 Scelta del layout | [strategia-e-struttura.md](strategia-e-struttura.md) §5 e domanda L1 |
| A4 Regole di conversione | [strategia-e-struttura.md](strategia-e-struttura.md) §6 |
| A5 Copywriting | [strategia-e-struttura.md](strategia-e-struttura.md) §7, adattato all'italiano |
| A6 Ordine di costruzione | `SKILL.md` Fase 5 |
| A7 SEO e AEO | [strategia-e-struttura.md](strategia-e-struttura.md) §8 e domanda W1 |
| A8 Errori | [strategia-e-struttura.md](strategia-e-struttura.md) §9 |
| B1 Tipografia | [design-system.md](design-system.md) §3 |
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

Scala tipografica Tailwind e arrotondamento al gradino inferiore, scala delle spaziature, formula dei raggi annidati, bordi tutto intorno, niente parole orfane, sentence case, larghezza della hero a 680px, contenuti realistici, stati, requisiti di consegna, curve di movimento personalizzate, IntersectionObserver al posto dei listener di scroll, struttura e regole di conversione, ordine di costruzione, piano prima del codice.

### Regole diventate opzioni

La skill originale impone un'estetica unica. Per servire qualsiasi settore, queste scelte sono diventate default modificabili o domande:

| Regola originale | Ora |
|---|---|
| Solo Geist, Manrope, Geist Mono, Poppins | Suggerimenti in [design-system.md](design-system.md) §3.1; obbligatori solo nello stile Minimal tech |
| Una sola famiglia di font | Default; domanda T3 |
| Mai corsivo, mai 900 | Default; corsivo d'accento ammesso negli stili editoriale e lusso |
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
