# Banca domande

Ogni domanda ha un ID, le opzioni e un default da usare se l'utente risponde "decidi tu": il default vale solo per quella domanda. Tra parentesi quadre la fonte da cui deriva la domanda (vedi [fonti.md](fonti.md)); senza parentesi è una domanda della fase base Kartello.

Regole d'uso: chiedi solo ciò che manca, a giri di 4–6 domande, e dopo ogni giro riepiloga ciò che è stato fissato.

---

## §0 Modalità dell'intervista

L'utente sceglie la modalità all'avvio. In tutte le modalità le risposte già presenti nell'idea iniziale non si richiedono, e ogni default applicato va in "Assunzioni" nel brief.

| Modalità | Per chi | Domande |
|---|---|---|
| **Rapida** | Ha fretta, o vuole vedere subito una bozza | Due giri brevi: (1) I1, I3, I5 e C1, saltando ciò che l'idea già dice; (2) proposta di pagine (P1), stile dedotto (V3) dichiarato prima delle palette, tre palette adatte a settore e stile se C1 è "proponimi tu" (senza chiedere C2), scala tipografica (T4), tecnologia (W4) con raccomandazione e video nella hero (A3) con la stima dei costi. A5 e A6 solo se I8 o l'idea iniziale indicano foto o un logo del cliente. Tutto il resto, L1, A1, A2 e A4 compresi, con i default dichiarati |
| **Standard** | La maggior parte dei casi | I quattro giri del §1, poi uno o due giri del §2 con i soli blocchi pertinenti al tipo di sito e all'obiettivo; il blocco 2.7 quando il sito ha immagini, A3 in ogni caso. Circa 20–30 domande in tutto, meno quelle a cui l'idea iniziale risponde già |
| **Approfondita** | Progetti importanti, massimo controllo | Tutte le domande del §1 e del §2 pertinenti al tipo di sito (blocco 2.7 compreso), giro per giro, anche quelle che nelle altre modalità prendono il default. Revisione della tabella tipografica e della palette prima di fissarle |

Default se l'utente risponde "decidi tu" a questa domanda: Standard. La richiesta di procedere senza domande ("niente domande", "fai tutto tu") segue invece la regola d'oro 1 di `SKILL.md`; anche in quel caso si chiede A3, che non ha default.

---

## §1 Brief base (sempre)

### Giro 1 — Idea

Domande aperte, in chat, in due parti: prima I1–I5, poi I6–I8.

| ID | Domanda | Default |
|---|---|---|
| I1 | Di cosa si tratta? Nome dell'attività o del progetto e cosa offre, in due o tre frasi. | Obbligatoria |
| I2 | Settore e posizionamento: economico, medio, premium, lusso? | Medio |
| I3 | Obiettivo principale del sito, uno solo: richieste di contatto o preventivo, prenotazioni, vendita online, iscrizioni o lead, credibilità e portfolio, informare. | Richieste di contatto |
| I4 | Chi è il cliente ideale? Chi è, dove si trova, cosa cerca. | Dedotto da I1 |
| I5 | Tipo di sito: multipagina, landing page singola, one page a sezioni, portfolio, blog, e-commerce leggero. | Multipagina |
| I6 | Lingua o lingue del sito. | Lingua dell'utente |
| I7 | Siti che ti piacciono (e cosa ti piace), siti che non ti piacciono, concorrenti. | Nessuno |
| I8 | Cosa hai già: logo, colori, font, testi, foto, video, dominio, sito attuale. | Niente |

I3 decide la CTA principale di tutto il sito. Se I5 è "landing page singola", usa la struttura landing ([strategia-e-struttura.md](strategia-e-struttura.md) §2). Se I8 indica foto o un logo, approfondisci con A5 e A6 (§2.7).

### Giro 2 — Pagine

Proponi un elenco partendo dalla tabella qui sotto, adattato a I1–I5.

| Tipo di attività | Pagine tipiche |
|---|---|
| Sempre | Home, Contatti, Privacy policy, Cookie policy, 404 |
| Servizi (professionisti, studi, agenzie) | Chi siamo, Servizi (più una pagina per ogni servizio principale), Progetti o casi studio, Recensioni, FAQ, Blog |
| Attività locali (ristoranti, negozi, saloni, palestre, B&B) | La nostra storia, Menu o listino, Galleria, Prenota, Dove siamo e orari, Recensioni |
| Prodotto digitale o SaaS | Funzionalità, Prezzi, Casi d'uso, Clienti, Integrazioni, Risorse o blog, Accedi |
| Portfolio e creativi | Lavori (più una pagina per progetto), Chi sono, Servizi |
| E-commerce leggero | Catalogo, Scheda prodotto, Carrello, Spedizioni e resi, Condizioni di vendita |
| Eventi e associazioni | Programma, Biglietti o iscrizioni, Ospiti, Sponsor, Come arrivare |

| ID | Domanda | Default |
|---|---|---|
| P1 | Ecco le pagine che propongo: togli, aggiungi o rinomina. | Elenco proposto |
| P2 | Per ogni pagina: obiettivo e contenuti indispensabili. | Dedotti dal settore |
| P3 | Menu: quali pagine nel menu principale (massimo 5–6), quali solo nel footer, quale CTA nell'header. | Pagine principali nel menu, legali nel footer, CTA = azione di I3 |

Se I5 è landing page singola o one page: P1 propone la pagina unica, le pagine legali, la 404 ed eventualmente una pagina di ringraziamento. Al posto di P3 chiedi se il menu ha ancore alle sezioni o nessun menu (landing di conversione). La scaletta delle sezioni si fa nella Fase 4.

### Giro 3 — Stile e palette

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| V3 | Direzione stilistica [F1] | Le 2–3 più adatte da [stili.md](stili.md), con anteprima | La prima proposta |
| C1 | Hai già colori di brand? | Sì, ho i codici hex · Prendili dal logo · Li descrivo a parole · No, proponimi tu | Proponimi tu |
| C2 | Che sensazione devono trasmettere? (solo se servono proposte) | Calda e accogliente · Fresca e pulita · Elegante e lussuosa · Naturale · Energica e audace · Tecnologica e precisa · Seria e affidabile | Dedotta dal settore |
| C3 | Tema | Chiaro · Scuro · Entrambi con interruttore · Chiaro con sezioni scure | Chiaro |
| C4 | Quanto colore? | Sobrio (neutri più un accento) · Bilanciato (primario più secondario) · Ricco (molto colore, sezioni colorate) | Sobrio |

Chiedi V3 per prima: lo stile scelto fornisce i default di C, T, V e M. Con C2 proponi **tre palette** (nome, sensazione, perché è adatta, hex per ogni ruolo) secondo [design-system.md](design-system.md) §2. Con AskUserQuestion mostra i codici nell'anteprima di ogni opzione.

### Giro 4 — Tipografia

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| T1 | Hai font di brand? | Sì (quali) · No, proponimi tu | Proponimi tu |
| T2 | Che carattere devono avere i font? | Geometrico moderno · Neutro e pulito · Serif elegante · Editoriale · Morbido e amichevole · Espressivo d'impatto · Tecnico | Dedotto da settore e stile |
| T3 | Quanti font? | Uno solo per tutto · Due: uno per i titoli e uno per i testi | Uno solo [F1] |
| T4 | Scala dei titoli | Compatta · Equilibrata · D'impatto | Equilibrata |
| T5 | Peso dei titoli | Leggero (400–500) · Medio (600) · Deciso (700) | Medio; mai oltre 700 [F1] |

Per T4 mostra come anteprima la colonna corrispondente di [design-system.md](design-system.md) §3.3. Alla fine del giro presenta la tabella tipografica definitiva (Display, H1–H6, testo grande, testo, testo piccolo, didascalia, etichetta, bottoni, link di navigazione) e chiedi l'approvazione: da quel momento è fissa.

---

## §2 Approfondimento mirato

Scegli solo i blocchi pertinenti.

### 2.1 Conversione [F1]

Se I3 è vendita, contatti, prenotazioni o lead. In due giri: K1–K4, poi K5–K7.

| ID | Domanda | Default |
|---|---|---|
| K1 | Qual è l'UNICA azione principale? Prova gratuita, demo, acquisto, lista d'attesa, download, chiamata, preventivo, prenotazione. | Da I3 |
| K2 | Qual è l'offerta: cosa ottiene esattamente il visitatore? | Dedotta da I1 |
| K3 | Cosa conta come conversione? Click, invio del modulo, acquisto, chiamata. | Invio del modulo |
| K4 | Quale problema sta cercando di risolvere il visitatore? | Dedotto da I1 e I4 |
| K5 | Le tre obiezioni principali: perché oggi non compra o non ti contatta? | Prezzo, fiducia, tempi |
| K6 | Da dove arriva il traffico? Annunci, ricerca Google, social, email, passaparola, Google Maps. | Ricerca |
| K7 | Cosa sa già il visitatore quando arriva? Non ci conosce · Conosce il problema · Sta confrontando alternative · Ci conosce già. | Conosce il problema |

### 2.2 Prove e materiali [F1]

| ID | Domanda | Default |
|---|---|---|
| R1 | Quali prove hai? Loghi clienti, recensioni, numeri, casi studio, certificazioni, premi, articoli. | Segnaposto da sostituire |
| R2 | Materiali visivi: foto reali (luogo, team, prodotti), screenshot, video demo, illustrazioni. | In quest'ordine: foto reali del cliente (A5), immagini generate con Studio AI, segnaposto etichettato con slot, formato e dimensioni ([contenuti-visivi.md](contenuti-visivi.md) §1) [SA]. Screenshot e video demo solo reali, altrimenti segnaposto [F2] |
| R3 | Come riduciamo il rischio per il cliente? Prova gratuita, piano gratuito, senza carta di credito, disdici quando vuoi, soddisfatti o rimborsati, preventivo o sopralluogo gratuito, garanzia. | Almeno una in ogni landing e nelle pagine di conversione |

### 2.3 Tono e stile [F1]

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| V1 | Tono di voce | Professionale · Informale · Caldo e vicino · Tecnico · Autorevole | Dedotto dal settore |
| V2 | Dare del tu o del lei? | Tu · Lei | Tu; lei per settori legali, medici, istituzionali e lusso |
| V4 | Quanto spazio? | Compatto · Bilanciato · Arioso | Bilanciato |
| V5 | Angoli | Squadrati · Morbidi · Arrotondati · Pillola | Morbidi |
| V6 | Gradienti | Mai · Solo sul titolo della hero · Ammessi negli sfondi | Mai [F1] |
| V7 | Priorità mobile? | Sì · No | Sì, sempre mobile first |

### 2.4 Animazioni e navigazione [F1]

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| M1 | Quanto movimento? | Nessuno (solo stati) · Sottile · Fluido · Cinematografico | Fluido |
| M2 | Navigazione | Barra classica fissa · Isola fluttuante in vetro · Trasparente sopra la hero · Menu laterale | Barra classica fissa |
| M3 | Sezione "tagline reveal": una frase grande che si accende parola per parola durante lo scroll | Sì · No | Sì per landing e stile Minimal tech, altrimenti no |
| M4 | Effetto firma della pagina, quello che il visitatore ricorda [F5] | 2–3 effetti adatti all'idea del sito da [effetti-wow.md](effetti-wow.md), più "Nessun effetto firma" | Il primo consigliato; nessuno se il movimento è "Nessuno" |

Dettagli in [motion.md](motion.md).

### 2.5 Landing page [F1]

Solo se I5 è landing page singola, dopo K6 e K7. Se non viene chiesto (Rapida, Standard senza questo blocco), proponilo con il motivo nella Fase 4; default A.

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| L1 | Layout | A Classico (hero più sezioni) · B Storia lunga · C Minimale · D Confronto · E Mondo scorrevole cinematico [F3] | A |

Dettagli in [strategia-e-struttura.md](strategia-e-struttura.md) §5.

### 2.6 SEO, contatti e tecnica

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| W1 | Indicizzare su Google? [F1] | Sì (pagine stabili) · No (campagne pubblicitarie, offerte a tempo) | Sì |
| W2 | Parole chiave e zona geografica principali | Aperta | Dedotte da I1 e I4 |
| W3 | Dove devono arrivare le richieste? | Email · Servizio per moduli · WhatsApp · Sistema di prenotazione · CRM | Email |
| W4 | Tecnologia | Vedi sotto | Nessuno stack fisso: si chiede sempre. Se l'utente risponde "decidi tu", applica l'opzione (Consigliato) e scrivila in Assunzioni |
| W5 | Dati legali per il footer (attività italiana): quelli elencati in [contenuti-e-qualita.md](contenuti-e-qualita.md) §3 | Aperta | Segnaposto in "Contenuti da sostituire" |
| W6 | Profili social e professionali attivi, scheda Google, anno di fondazione, zona servita (per i dati strutturati) [F5] | Aperta | Solo ciò che l'utente conferma; nessun profilo inventato ([seo.md](seo.md) §4) |

### W4 — Come raccomandare la tecnologia

W4 si chiede in **ogni** modalità e la scelta finale è sempre dell'utente. Valuta il brief, proponi l'opzione più adatta come prima scelta con "(Consigliato)" e il motivo in una o due righe, poi le alternative valide. Prima di raccomandare, se il brief non lo dice, chiedi in una riga chi aggiornerà i contenuti dopo la consegna (l'utente, uno sviluppatore, quasi nessuno) e se servono aree riservate o funzioni dinamiche.

| Situazione emersa dal brief | Raccomandazione |
|---|---|
| Il progetto ha già un framework | Mantenerlo |
| Sito vetrina, contenuti, blog; priorità a velocità e SEO | Astro più Tailwind |
| Sito destinato a crescere: aree riservate, funzioni dinamiche, integrazioni, app | Next.js più Tailwind |
| Landing singola o sito di poche pagine da consegnare come file | HTML statico con il CSS di Tailwind compilato una volta dalla CLI (`npx @tailwindcss/cli -i input.css -o style.css --minify`), mai il Play CDN in produzione; senza strumenti, HTML con CSS puro e i token come variabili su `:root` |
| Il cliente vuole aggiornare i contenuti da solo | Aggiungere un CMS (es. un CMS headless con Astro o Next.js, oppure WordPress) |
| Negozio online con catalogo ampio | Valutare una piattaforma e-commerce dedicata (es. Shopify) |

I token del design system ([design-system.md](design-system.md) §9) si adattano a qualsiasi scelta: con Tailwind via `@theme`, altrimenti come variabili CSS.

### 2.7 Contenuti visivi [SA]

Quando il sito ha immagini, cioè quasi sempre. Grafica, logo, icone, animazioni e video di motion graphics si creano prima in codice ([grafica-in-codice.md](grafica-in-codice.md)); fotografie e riprese dal vero dal cliente o, solo se servono, con Studio AI ([contenuti-visivi.md](contenuti-visivi.md) §1); prima di questo giro leggi la skill `studio-ai` e il suo `CATALOGO.md` (§2). Se Studio AI non è disponibile nella sessione, fai comunque le domande: il sito usa segnaposto etichettati e le immagini si generano poi dove Studio AI è collegato. Attività, pubblico, colori e logo esistente hanno già una risposta in I1, I4, C1 e I8: riusala, non richiederla. Le domande vanno in un solo giro, saltando quelle che hanno già una risposta [F2].

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| A1 | Stile delle immagini e atmosfera | Fotografico realistico · Illustrato · Minimal/flat · 3D; più l'atmosfera (calda, tecnica, lussuosa…) | Dedotto dalla direzione stilistica (V3) |
| A2 | Possono comparire persone nelle immagini? | Sì, sempre inventate · No · Solo dettagli (mani, gesti) | Dedotto dal settore |
| A3 | Video nella hero [F2] | Nessun video · Animazione in codice (gratis, consigliata se il soggetto non è fotografico) · Loop di sfondo con Studio AI · Video guidato dallo scroll | Nessun default: si chiede sempre, in ogni modalità; stima dei costi per le opzioni con Studio AI |
| A4 | Qualità delle immagini | Standard (consigliata) · High per hero e logo | Standard |
| A5 | Foto reali del cliente: quali ci sono? Il cliente acconsente al ritocco? Le persone ritratte acconsentono a comparire in nuove immagini? [F2] | Elenco delle foto · Ritocco sì o no · Nuove immagini sì o no | Usate così come sono, ottimizzate per il web, nessun ritocco |
| A6 | C'è già un logo? (collegata a I8) | Sì: chiedi il file, meglio se vettoriale · No | Se manca: logo in SVG creato in codice (simbolo e nome con il font del sito); Studio AI per il simbolo solo se il codice non basta |

- **A1** fornisce lo stile da salvare in Studio AI e usare in tutte le immagini del sito ([contenuti-visivi.md](contenuti-visivi.md) §4).
- **A2**: le persone generate da zero sono sempre inventate, mai somiglianti a persone reali; le persone reali arrivano solo dalle foto del cliente (A5).
- **A3**: descrivi le opzioni in parole semplici, ognuna con la sua stima dei costi ([contenuti-visivi.md](contenuti-visivi.md) §12).
  - *Nessun video*: la hero usa l'immagine.
  - *Loop di sfondo*: un video muto di 8 secondi che si ripete dietro il titolo, con l'immagine della hero come anteprima; su mobile una versione più leggera dello stesso video ([contenuti-visivi.md](contenuti-visivi.md) §9).
  - *Video guidato dallo scroll*: la telecamera vola tra le scene mentre si scorre (scroll cinematico): domande X1–X6 (§2.8) e procedura in [scroll-cinematico.md](scroll-cinematico.md).

  Prima di generare qualsiasi video attendi il via esplicito sulla stima. "Decidi tu" non vale come via: proponi l'opzione che consigli, con la stima, e finché l'utente non dice sì il sito resta senza video.
- **A4**: stesso livello per tutte le immagini di una serie (card, galleria) [F2].
- **A5**: le foto reali del cliente hanno sempre la precedenza sulle generate ([contenuti-visivi.md](contenuti-visivi.md) §8).
  - Ritocco con Studio AI (luce, colore, stile, mantenendo persone e oggetti): serve il consenso del cliente e, se nella foto compaiono persone, anche quello di ognuna di loro.
  - Nuove immagini che usano la foto come riferimento: per la stessa persona serve anche il consenso della persona ritratta; per lo stesso prodotto basta quello del cliente.
  - Registra ogni consenso nel brief (sezione "Contenuti visivi"): foto, chi acconsente, a quale uso. Senza consenso registrato le foto si usano solo ottimizzate per il web.
- **A6**: se I8 dice già che il logo c'è, non chiedere A6: chiedi il file. Un logo esistente non si genera né si ridisegna; le varianti (bianca, nera, monocolore) si ricavano dal file originale [F2]. Per un logo nuovo Studio AI genera solo il simbolo, senza testo; il nome del marchio si compone in SVG o HTML con il font del sito ([contenuti-visivi.md](contenuti-visivi.md) §7).

### 2.8 Scroll cinematico [F3]

Solo se A3 = "video guidato dallo scroll" o L1 = E. Procedura in [scroll-cinematico.md](scroll-cinematico.md), prompt in [scroll-cinematico-prompt.md](scroll-cinematico-prompt.md); per il volo in prima persona nei locali [volo-in-prima-persona.md](volo-in-prima-persona.md). Attività, nome, palette e tono vengono già dal brief e dal design system: non richiederli. X3 e X4 si chiedono **sempre**, anche in modalità Rapida.

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| X1 | Il viaggio: quali tappe attraversa la telecamera? Proponi 5–7 scene ricavate dalla filiera dell'attività (es. panificio: campo di grano → mulino → forno → bancone → consegna → il pane in tavola), l'utente modifica. L'ultima è il prodotto o il risultato, con la CTA | Aperta, con proposta | La proposta |
| X2 | Direzione artistica del mondo | Diorama di argilla (miniatura isometrica) · Carta ritagliata · Giocattolo lucido · Plastilina · Notte al neon · Fotorealistico architettonico | Dedotta dallo stile (V3): miniatura per stili giocosi, fotorealistico per lusso e immobiliare |
| X3 | Come si muove la telecamera? (presentala per sensazione, con il compromesso in una riga) | Volo nel mondo (entra in ogni scena, risale e vola alla successiva) · Percorso continuo (un'unica ripresa sempre in avanti) · Planata isometrica fissa (angolo sempre uguale, il mondo scorre) · Volo in prima persona nei locali (come un drone guidato da un pilota: entra dalla porta, attraversa gli spazi, esce e sale a mostrare l'edificio) [F4] | Nessuno: si chiede sempre. Consiglia il volo per le miniature, il percorso continuo per il fotorealistico, il volo in prima persona per attività con locali fisici da visitare |
| X4 | Vuoi anche la versione per smartphone? È un secondo percorso video in verticale, pensato per il telefono, e circa raddoppia la spesa dei video (dichiara la cifra) | Solo desktop · Desktop più mobile (verticale nativo) | Nessuno: si chiede sempre |
| X5 | Qualità e bozza | Bozza economica di tutto il percorso, poi finale (consigliato) · Direttamente il finale | Bozza poi finale |
| X7 | Solo con il volo in prima persona [F4]: il percorso. Da dove entra la telecamera, quali spazi attraversa, da dove esce? | Aperta (es. "entra dalla porta, salone, officina, magazzino, esce dal portone sul retro") | Percorso realistico proposto per quel tipo di locale |
| X8 | Solo con il volo in prima persona [F4]: come generiamo la ripresa? | Ripresa lunga unica (continuità massima, 720p) · Tratti da 8 s in 1080p (più nitida, più giunture da controllare) | Ripresa lunga unica |
| X6 | Stile del motore dello scroll | Adattato al design system del sito (consigliato) · Stile originale del motore | Adattato (scelta del proprietario: entrambe le opzioni disponibili) |

Dopo X1–X6 calcola il preventivo (N immagini + 2N−1 video, ×2 con X4 = sì, +15%) con `stima_costo` e attendi il sì esplicito prima di generare ([scroll-cinematico.md](scroll-cinematico.md) §2).
