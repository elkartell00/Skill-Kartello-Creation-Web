# Componenti animati pronti (React Bits)

React Bits è una raccolta di oltre 215 componenti React animati: testi, sfondi in shader, gallerie, card, menu, cursori, micro interazioni [F10]. Nei siti in **React, Next.js o Astro con isole React** accelera la costruzione: un effetto curato si installa con un comando come codice sorgente nel progetto, poi si adatta. Le regole marcate [F10] vengono da React Bits di David Haz (vedi [fonti.md](fonti.md)); le altre sono regole della skill per usarlo senza perdere qualità.

## §1 Il ruolo nella skill

- **È codice**: rientra in "prima il codice" (regola d'oro 10), senza costi di generazione.
- **Mattoni, non l'idea.** La scena d'impatto nasce dal mondo dell'attività ([motion-graphics.md](motion-graphics.md) §1). Un componente di React Bits può essere un pezzo della scena o di una sezione, mai il sostituto dell'idea.
- **Alternativa da confrontare** (regola d'oro 13): per un effetto del piano, il componente adatto è un'opzione da confrontare con la soluzione propria e con le tecniche apprese, sugli stessi criteri (resa, aderenza al design system, prestazioni, accessibilità, semplicità). Vince il migliore, scritto nel piano in una riga.
- **Non decide la tecnologia.** Non si sceglie React solo per usare React Bits: W4 resta guidata dal brief ([domande.md](domande.md) §2.6). Se l'utente sceglie React o Next.js, la raccolta diventa un vantaggio da citare.

## §2 Licenza: cosa si può e cosa no

La licenza è **MIT con Commons Clause** [F10]:

- ✅ Si possono usare, modificare e pubblicare i componenti **dentro un sito, un'applicazione o un prodotto**, anche commerciale e anche a pagamento: i siti dei clienti sono proprio questo caso.
- ✅ Quello che si crea con gli strumenti di React Bits (codice esportato, immagini, video) si può usare nei siti.
- ❌ **Mai vendere o ridistribuire i componenti in sé**, da soli, in un pacchetto o riscritti per un altro framework. Per questo la skill **non contiene codice di React Bits**, e nemmeno la Repository dei template e le Tecniche Apprese: lì il codice è sempre scritto da noi ([repository-template.md](repository-template.md) §5).
- ❌ Mai offrire al cliente i componenti come prodotto a parte (pacchetti di sfondi, kit di template, libreria interna da rivendere).
- Nel progetto del cliente conserva l'avviso di copyright: un file `docs/licenze.md` con l'elenco dei componenti usati e la licenza di React Bits (aggiunta Kartello).
- **React Bits Pro** è a pagamento: non proporlo e non comprarlo senza una richiesta esplicita dell'utente (regola sulla spesa, aggiunta Kartello).

## §3 Installazione

Ogni componente esiste in quattro varianti: JavaScript o TypeScript, con CSS o con Tailwind. Il suffisso del nome sceglie la variante: `-JS-CSS`, `-JS-TW`, `-TS-CSS`, `-TS-TW` [F10]. Con Tailwind nel progetto usa la variante `TW`; in TypeScript la `TS`.

```bash
# con la CLI di shadcn (serve components.json nel progetto)
npx shadcn@latest add @react-bits/SplitText-TS-TW

# oppure con jsrepo, senza configurare shadcn
npx jsrepo@latest add https://reactbits.dev/r/SplitText-TS-TW
```

- Con shadcn aggiungi una volta il registro in `components.json` [F10]:
  ```json
  { "registries": { "@react-bits": "https://reactbits.dev/r/{name}.json" } }
  ```
- **Server MCP di shadcn** (facoltativo) [F10]: `npx shadcn@latest mcp init --client claude`, poi riavvio di Claude Code. Permette di cercare nel registro ("mostrami gli sfondi disponibili") e aggiungere i componenti. È un'installazione: si chiede prima all'utente ([requisiti.md](requisiti.md)).
- Il componente arriva come **file sorgente** nel progetto, con le sue dipendenze da installare. Le dipendenze più frequenti: `motion`, `gsap` (e `@gsap/react`), `ogl`, `three` (e `@react-three/fiber` e `drei` per il visualizzatore di modelli), `matter-js`, le icone `@hugeicons/react`. La maggior parte degli sfondi è WebGL scritto a mano, senza dipendenze [F10].
- I nomi dei componenti nel registro sono quelli della tabella del §5 senza spazi (`Soft Aurora` → `SoftAurora`).

## §4 Adattarlo al design system (obbligatorio)

Un componente lasciato con i valori di esempio fa sembrare il sito un modello. Dopo l'installazione (aggiunta Kartello):

1. **Colori**: solo token del design system. Dove il componente chiede colori come proprietà (es. `color="#7B7481"`), passa i valori dei token, letti dalle variabili CSS (`getComputedStyle(document.documentElement).getPropertyValue('--color-primary')`) o da un file condiviso dei token. Nelle classi Tailwind sostituisci i colori fissi con quelli del tema (`bg-surface`, `text-ink`).
2. **Tipografia**: i testi animati usano le classi `type-*` del sistema, mai misure scritte nel componente.
3. **Raggi, bordi, spaziature**: quelli del design system.
4. **Curve e durate**: i componenti basati su GSAP ricevono la curva `fluid` ([gsap.md](gsap.md) §2); quelli basati su Motion ricevono la stessa curva come array (`[0.32, 0.72, 0, 1]`, dal token `--ease-fluid`); durate secondo il livello M1.
5. **Icone**: sostituisci le icone incluse (Hugeicons) con la libreria d'interfaccia scelta per il sito ([design-system.md](design-system.md) §7), e togli la dipendenza.
6. **Parametri**: cambia velocità, densità, scala e intensità finché l'effetto non appartiene al marchio. Mai lasciare i valori della demo.
7. **Testi**: veri, nella lingua del sito (regola d'oro 6).

## §5 Catalogo per esigenza

Candidati da proporre, non scelte obbligate. Il nome tra parentesi indica la dipendenza principale quando c'è [F10].

| Esigenza (ricette di [motion-graphics.md](motion-graphics.md) §3) | Componenti candidati | Note della skill |
|---|---|---|
| Sfondo vivo della hero, nei colori del marchio (R1) | Silk, Soft Aurora, Aurora, Grainient, Iridescence, Liquid Ether, Dark Veil, Light Rays, Side Rays, Gradient Waves, Plasma, Threads, Topography, Beams, Prism, Color Bends (three) | Uno solo per pagina; colori dai token; il titolo resta HTML sopra lo sfondo |
| Tech, dati, spazio | Particles, Galaxy, Hyperspeed (three), Pixel Blast, Grid Scan, Faulty Terminal, Letter Glitch, Gradient ASCII, Scanner, Radar | Molto riconoscibili: solo per settori tecnici e sempre ricolorati |
| Fondi sobri e geometrici | Dot Grid, Ripple Grid, Shape Grid, Magnet Lines, Grid Distortion, Dither, Waves, Line Waves | Adatti anche a Standard; intensità bassa |
| Tipografia cinetica (R3) | Split Text (gsap), Masked Heading (gsap), Blur Text (motion), Rotating Text (motion), Text Type (gsap), Decrypted Text, Scrambled Text, Shuffle, Variable Proximity, Text Pressure, Curved Loop, Circular Text, Scroll Velocity | Una frase per volta; testo leggibile dai lettori di schermo (§7) |
| Testo che si rivela allo scroll (tagline reveal, [motion.md](motion.md) §5) | Scroll Reveal (gsap), Scroll Float (gsap) | Solo se rispetta le regole del §5 di motion.md (parola per parola, `fluid`, tutte attive a fine pagina) |
| Numeri e risultati (R9) | Count Up (motion), Counter | Numeri veri o segnaposto dichiarati (regola d'oro 6) |
| Loghi dei clienti | Logo Loop | Velocità bassa, pausa al passaggio del mouse |
| Gallerie e portfolio | Circular Gallery, Dome Gallery, Masonry, Flying Posters, Infinite Menu, Accordion Gallery (gsap), Depth Carousel (gsap), Circular Carousel, Flex Carousel (ogl), Chroma Grid | Le immagini restano accessibili (`alt`) e navigabili da tastiera |
| Card, bento, team | Magic Bento, Spotlight Card, Tilted Card, Border Glow, Pixel Card, Holo Card, Reflective Card, Profile Card, Decay Card | Il bento conta come un tipo di sezione ([contenuti-e-qualita.md](contenuti-e-qualita.md) §7) |
| Racconto a strati e capitoli (R6) | Scroll Stack, Card Swap, Stack (motion), Scroll Expand | Con GSAP e Lenis già nel progetto preferisci la versione propria con ScrollTrigger ([gsap.md](gsap.md) §5) per avere un solo sistema di scroll |
| Navigazione (M2) | Pill Nav, Card Nav, Staggered Menu (gsap), Bubble Menu (gsap), Gooey Nav, Flowing Menu | Devono rispettare [motion.md](motion.md) §4: tastiera, `aria-expanded`, `Esc`, `inert`, focus. Controlla e completa |
| Cursori e passaggio del mouse | Target Cursor, Blob Cursor (three), Magnet, Glare Hover, Click Spark, Image Trail (gsap), Crosshair, Splash Cursor | Solo con puntatore fine; con misura (uno per sito); Splash Cursor è pesante |
| Oggetti 3D | Model Viewer (fiber, drei), Lanyard (three), Fluid Glass | Model Viewer per modelli GLB del prodotto; caricamento differito |
| Bordi e bottoni | Star Border, Electric Border, Specular Button | Solo per la CTA principale, non su tutti i bottoni |
| Transizioni e dettagli | Pixel Transition, Gradual Blur, Noise | Noise come grana leggera sopra i fondi |

La categoria **Micro** (interruttori, slider, valutazioni, notifiche) è pensata per le interfacce di prodotto: nei siti vetrina si usa di rado, per esempio in un configuratore o in un modulo di prenotazione.

## §6 Qualità: evitare l'effetto "già visto"

React Bits è molto diffuso: i componenti più famosi lasciati com'erano (Aurora, Silk, Ballpit, Hyperspeed, Lanyard, Splash Cursor, Magic Bento) si riconoscono subito e fanno sembrare il sito generato (aggiunta Kartello):

- **Al massimo un componente "da vetrina" per pagina**, e mai due effetti forti nella stessa schermata.
- **Sempre adattato** (§4): colori, ritmo e intensità del marchio.
- **Collegato all'idea**: lo sfondo richiama il materiale dell'attività (acqua, metallo, carta, luce), non è decorazione generica.
- **Diversità tra siti** ([effetti-impatto.md](effetti-impatto.md)): due siti consecutivi non usano lo stesso componente nello stesso ruolo. Annota i componenti usati nel piano e, se il sito entra nella repository, nella scheda.
- Vale tutto il §7 di [contenuti-e-qualita.md](contenuti-e-qualita.md): un fondo animato con solo un titolo sopra non basta a fare una hero.

## §7 Prestazioni, accessibilità, rendering

- **Un solo sfondo WebGL visibile alla volta.** Quasi tutti gli sfondi si fermano fuori schermo e limitano la densità di pixel [F10]; per gli altri componenti controlla e, se manca, aggiungi la pausa fuori schermo (aggiunta Kartello).
- **Telefoni**: versione più leggera (meno particelle, risoluzione ridotta) o un'immagine statica composta, scelta con `matchMedia` ([gsap.md](gsap.md) §2). Cursori ed effetti al passaggio del mouse solo con `(hover: hover) and (pointer: fine)`.
- **Movimento ridotto**: la maggior parte dei componenti lo rispetta da sola [F10]. Non lo gestiscono (verificato nel codice di novembre 2026): Gradual Blur, Pixel Trail, Ribbons, Color Bends, Evil Eye, Border Glow, Bubble Menu, Staggered Menu, Dome Gallery, Glass Surface, Line Sidebar, Option Wheel, Curved Input, Blur Text e alcuni Micro. Con questi aggiungi tu la versione ferma.
- **Testi animati**: il testo vero deve restare leggibile da lettori di schermo e motori di ricerca (testo nell'HTML, `aria-label` sul contenitore, lettere o parole divise con `aria-hidden`). Se il componente non lo fa, completalo.
- **Rendering sul server**:
  - In Next.js i componenti animati sono componenti client (`'use client'`). Gli sfondi WebGL si caricano con `dynamic(() => import('./Silk'), { ssr: false })`, dentro un componente client.
  - In Astro si usano come isole: `client:visible` per ciò che sta sotto la prima schermata, `client:only="react"` per gli sfondi WebGL.
- **Peso**: `three` e `ogl` pesano; sotto la prima schermata carica i componenti 3D in modo differito. Ogni dipendenza aggiunta deve servire a un componente usato davvero.
- **Un solo sistema di scroll**: i componenti con animazioni allo scroll interne devono convivere con Lenis e ScrollTrigger ([scroll-morbido.md](scroll-morbido.md) §3). Provali con lo scroll morbido attivo.

## §8 Siti senza React

Con HTML statico o Astro senza React, React Bits non si usa così com'è. Due strade, da proporre all'utente:

1. **Isole React in Astro**: aggiungere `@astrojs/react` solo per i pochi componenti che valgono il peso in più.
2. **Riferimento visivo**: l'effetto si guarda sul sito di React Bits e si costruisce da zero in codice con GSAP, Canvas o WebGL ([grafica-in-codice.md](grafica-in-codice.md)), senza copiare né convertire il codice di React Bits (§2).

## §9 Controllo prima della consegna

- [ ] Ogni componente usato è nel piano, con il motivo e l'esito del confronto (regola d'oro 13).
- [ ] Colori, font, raggi, curve e durate vengono dal design system; nessun valore della demo; icone della libreria del sito.
- [ ] Al massimo un componente "da vetrina" per pagina; un solo sfondo WebGL visibile alla volta.
- [ ] Movimento ridotto, telefoni e tastiera provati; cursori solo con puntatore fine; testi animati leggibili dai lettori di schermo.
- [ ] Nessun errore di rendering sul server; componenti 3D caricati in modo differito.
- [ ] `docs/licenze.md` con l'elenco dei componenti e la licenza di React Bits; nessun componente consegnato come prodotto a parte.
