# Scroll cinematico: raccolta dati e prompt

Modelli da riempire per [scroll-cinematico.md](scroll-cinematico.md) [F3]. I prompt restano in **inglese**, che i modelli video seguono meglio; le istruzioni intorno sono in italiano. Il **preambolo di stile** è identico, parola per parola, in ogni prompt delle scene: è questo che rende il mondo coerente. Salvalo anche con `salva_stile` e passa `stile` a ogni generazione del percorso.

## Dati da raccogliere

Molti vengono già dal brief e dal design system: non richiederli.

| Dato | Da dove |
|---|---|
| `SUBJECT`: attività più una frase di sintesi | I1 |
| `BRAND_NAME` | I1 |
| `PALETTE`: 4–6 colori con hex; uno è lo **sfondo delle scene** (di solito il più chiaro), uno l'**accento** | Design system (ruoli `background`, `primary`, `accent`…) |
| `TONE`: una o due parole | V1 |
| `STYLE`: direzione artistica | X2 |
| `SECTIONS[]`: per ogni scena `id`, `label`, `subject` (cosa c'è nella scena), `eyebrow`, `title`, `body` (≤ 1 frase), `tags[]` (0–3). L'ultima è il prodotto o il risultato, con la CTA | X1 |
| `CAMERA`: volo nel mondo · percorso continuo · planata isometrica fissa | X3 (sempre) |
| `MOBILE`: sì / no, con il costo dichiarato | X4 (sempre) |
| `LIVELLO`: bozza `low`, poi finale `standard` | X5 |

## Preambolo di stile (default: diorama di argilla)

Da riusare identico in ogni prompt di scena; sostituisci le parti tra parentesi quadre.

```
Isometric low-poly 3D diorama floating as a small rounded island on a plain solid
[BG_HEX] background with a soft contact shadow beneath it. Soft matte clay 3D render,
rounded toy-model shapes, gentle warm studio lighting, soft long shadows, tilt-shift
miniature look. Cohesive color palette of [PALETTE]. Highly detailed, centered
composition, absolutely no text, no letters, no numbers, no logos.
```

Direzioni alternative (sostituisci le prime due frasi, tieni la coda con palette e niente testo):
- **Carta ritagliata:** "Isometric layered paper-craft diorama, matte cardstock, clean die-cut edges, subtle drop shadows between layers."
- **Giocattolo lucido:** "Isometric glossy vinyl-toy diorama, smooth plastic shading, soft rim light, collectible figurine look."
- **Plastilina:** "Isometric stop-motion clay set, visible thumbprints, handmade plasticine texture, soft studio softbox light."
- **Notte al neon:** "Isometric miniature at night, warm interior glow and neon signage, moody rim light, wet reflective ground."
- **Fotorealistico architettonico** (immobiliare, ospitalità, lusso): "Ultra-photorealistic architectural photography of a single cohesive [subject], cinematic wide-angle, warm golden-hour light, natural materials, restrained designer furnishings, a breathtaking view, editorial magazine quality, shallow depth of field, no people." Con questa direzione niente isola fluttuante né scontorno: le scene sono a tutto schermo (uno sfondo di pagina scuro dà un'aria premium), l'ingresso attraversa porte e vetrate invece di aprire un tetto, e la coerenza viene solo dal preambolo identico. Non passare un'immagine di riferimento: clonerebbe la stessa stanza. Gli interni fanno scattare spesso il filtro (§9 della procedura).

## Immagine di scena

```
[STYLE PREAMBLE]
Subject: [SECTION.subject — the building/space, a few characters doing the work,
the props that signal this stage of the business].
```

- Nomina oggetti concreti, che ancorano la scena: vasche, pentoloni, nastri trasportatori, casse, tende, lucine, panchine, scooter.
- Per la scena finale "prodotto": niente isola, un unico prodotto grande che fluttua sullo stesso sfondo con pochi piccoli oggetti intorno.
- **Componi al centro**, con un po' di spazio sopra; niente di essenziale ai bordi.
- `formato` 16:9 (9:16 per la versione mobile), `risoluzione` 2K.

## Tratto — architettura A, ripresa continua

`immagine_iniziale` = ultimo fotogramma REALE del tratto precedente (tratto 0: l'immagine della prima scena). **Nessuna `immagine_finale`.** Le frasi in grassetto sono il contratto di passaggio: tienile parola per parola.

```
Single continuous cinematic camera move, no cuts. **Continue the same slow, steady
forward glide.** [MID-LEG MOVE — optional, from the library below.] The camera moves
into [SCENE i] toward [FOCAL POINT]. **In the final second, settle back into a slow,
steady forward glide toward [the doorway / opening / direction of the next scene].**
[STYLE tail + PALETTE]. Smooth, graceful, slow motion, subtle parallax. No text, no captions.
```

### Movimenti a metà tratto (scegli per concetto; ometti per una planata semplice)

Le inversioni sono ammesse dentro un tratto; solo una giuntura non deve mai invertire.

- **Mezza orbita** (prodotto, lusso): "sweeping in a slow half-orbit around [the hero object], keeping it centered, then continuing past it"
- **Salita con rivelazione** (grandi spazi): "rising smoothly as the full scale of [the space] reveals below"
- **Carrellata laterale bassa** (linee, banconi, scaffali): "tracking low and level alongside [the line], foreground objects sliding past in parallax"
- **Avvicinamento e ritorno** (artigianato, dettaglio): "pushing in close to [the craft moment] until it nearly fills the frame, then easing gently back out"
- **Salita e picchiata** (viaggi, esterni): "climbing in a gentle arc over [the terrain], then swooping down toward [the next focal point]"

**Clausola isometrica bloccata** (X3 = planata isometrica fissa): niente libreria; questa frase, identica, nello spazio del movimento di OGNI tratto:

```
The camera keeps exactly the same high isometric angle throughout — no rotation, no
orbit, no tilt. It only travels straight and level, the world sliding past beneath
the same view.
```

Dopo ogni tratto guarda l'ultimo fotogramma: deve sembrare una planata calma (niente mosso laterale, nessuna orbita a metà, angolo non ruotato). Altrimenti rigenera prima di continuare: un fotogramma di passaggio sbagliato rovina tutti i tratti dopo.

## Clip di ingresso — architettura B

`immagine_iniziale` = l'immagine della scena a sfondo pieno (non quella scontornata).

```
Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the
whole [SECTION.subject] from outside like a tiny model. The camera slowly glides forward
and descends toward it, sweeping in toward [FOCAL POINT — the counter/the cauldrons/the
people], as if flying inside. As the camera pushes in, the roof and upper structure
gently lift and open away to reveal the warm interior. [STYLE tail: soft matte clay
diorama, tilt-shift miniature, warm light, [PALETTE]]. Smooth, graceful, slow motion,
subtle parallax. No text, no captions.
```

Scene senza un edificio da aprire (un campo, una piazza, una strada): al posto della frase sul tetto, "the camera flies low across [the scene] toward [focal point]."

## Raccordo — architettura B

`immagine_iniziale` = ULTIMO fotogramma del clip di ingresso i; `immagine_finale` = PRIMO fotogramma del clip di ingresso i+1. Entrambi estratti dai video generati, mai le immagini delle scene.

```
Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back
out of [SCENE i], rising into the sky, then glides forward across the connected miniature
world and arrives above [SCENE i+1], beginning to descend toward it. One connected
miniature clay world, seamless flowing aerial transition. [STYLE tail + PALETTE]. Smooth
graceful slow motion. No text, no captions.
```

Ultimo raccordo verso il prodotto finale: "…glides forward and the world dissolves toward a single giant [PRODUCT] floating in soft [BG] space, arriving in front of it."

**Versione mobile**: stessi modelli con all'inizio "Vertical portrait composition, the diorama centered with generous [bg] space above and below", `formato` 9:16.

## Testi per scena (configurazione del motore)

Con le regole di [strategia-e-struttura.md](strategia-e-struttura.md) §7 e [contenuti-e-qualita.md](contenuti-e-qualita.md) §1.

- `eyebrow`: 2–4 parole, un'etichetta di valore.
- `title`: 3–6 parole, il titolo della tappa. La prima scena porta il titolo principale del sito; l'ultima il risultato, con la CTA.
- `body`: una frase semplice, dal punto di vista del visitatore.
- `tags`: 0–3 brevi prove ("Cotto al momento", "Consegna in 30 minuti").
