# Banca domande

Ogni domanda ha un ID, le opzioni e un default da usare se l'utente risponde "decidi tu". Tra parentesi quadre la fonte da cui deriva la domanda (vedi [fonti.md](fonti.md)); senza parentesi è una domanda della fase base Kartello.

Regole d'uso: chiedi solo ciò che manca, a giri di 4–6 domande, e dopo ogni giro riepiloga ciò che è stato fissato.

---

## §1 Brief base (sempre)

### Giro 1 — Idea

Domande aperte, in chat.

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

I3 decide la CTA principale di tutto il sito. Se I5 è "landing page singola", usa la struttura landing ([strategia-e-struttura.md](strategia-e-struttura.md) §2) e chiedi anche L1.

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

### Giro 3 — Palette colori

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| C1 | Hai già colori di brand? | Sì, ho i codici hex · Prendili dal logo · Li descrivo a parole · No, proponimi tu | Proponimi tu |
| C2 | Che sensazione devono trasmettere? (solo se servono proposte) | Calda e accogliente · Fresca e pulita · Elegante e lussuosa · Naturale · Energica e audace · Tecnologica e precisa · Seria e affidabile | Dedotta dal settore |
| C3 | Tema | Chiaro · Scuro · Entrambi con interruttore · Chiaro con sezioni scure | Chiaro |
| C4 | Quanto colore? | Sobrio (neutri più un accento) · Bilanciato (primario più secondario) · Ricco (molto colore, sezioni colorate) | Sobrio |

Con C2 proponi **tre palette** (nome, sensazione, perché è adatta, hex per ogni ruolo) secondo [design-system.md](design-system.md) §2. Con AskUserQuestion mostra i codici nell'anteprima di ogni opzione.

### Giro 4 — Tipografia

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| T1 | Hai font di brand? | Sì (quali) · No, proponimi tu | Proponimi tu |
| T2 | Che carattere devono avere i font? | Geometrico moderno · Neutro e pulito · Serif elegante · Editoriale · Morbido e amichevole · Espressivo d'impatto · Tecnico | Dedotto da settore e stile |
| T3 | Quanti font? | Uno solo per tutto · Due: uno per i titoli e uno per i testi | Uno solo [F1] |
| T4 | Scala dei titoli | Compatta · Equilibrata · D'impatto | Equilibrata |
| T5 | Peso dei titoli | Leggero (400–500) · Medio (600) · Deciso (700) | Medio; mai 900 [F1] |

Per T4 mostra come anteprima la colonna corrispondente di [design-system.md](design-system.md) §3.3. Alla fine del giro presenta la tabella tipografica definitiva (Display, H1–H6, testo grande, testo, testo piccolo, didascalia, etichetta, bottoni, link di navigazione) e chiedi l'approvazione: da quel momento è fissa.

---

## §2 Approfondimento mirato

Scegli solo i blocchi pertinenti.

### 2.1 Conversione [F1]

Se I3 è vendita, contatti, prenotazioni o lead.

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
| R2 | Materiali visivi: foto reali (luogo, team, prodotti), screenshot, video demo, illustrazioni. | Segnaposto indicati |
| R3 | Come riduciamo il rischio per il cliente? Prova gratuita, piano gratuito, senza carta di credito, disdici quando vuoi, soddisfatti o rimborsati, preventivo o sopralluogo gratuito, garanzia. | Almeno una nei siti che vendono |

### 2.3 Tono e stile [F1]

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| V1 | Tono di voce | Professionale · Informale · Caldo e vicino · Tecnico · Autorevole | Dedotto dal settore |
| V2 | Dare del tu o del lei? | Tu · Lei | Tu; lei per settori legali, medici, istituzionali e lusso |
| V3 | Direzione stilistica | Le 2–3 più adatte da [stili.md](stili.md), con anteprima | La prima proposta |
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

Dettagli in [motion.md](motion.md).

### 2.5 Landing page [F1]

Solo se I5 è landing page singola.

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| L1 | Layout | A Classico (hero più sezioni) · B Storia lunga · C Minimale · D Confronto | A |

Dettagli in [strategia-e-struttura.md](strategia-e-struttura.md) §5.

### 2.6 SEO, contatti e tecnica

| ID | Domanda | Opzioni | Default |
|---|---|---|---|
| W1 | Indicizzare su Google? [F1] | Sì (pagine stabili) · No (campagne pubblicitarie, offerte a tempo) | Sì |
| W2 | Parole chiave e zona geografica principali | Aperta | Dedotte da I1 e I4 |
| W3 | Dove devono arrivare le richieste? | Email · Servizio per moduli · WhatsApp · Sistema di prenotazione · CRM | Email |
| W4 | Tecnologia | Next.js più Tailwind · Astro più Tailwind · HTML più Tailwind statico · Già esistente | Rilevata dal progetto, altrimenti Next.js più Tailwind |
| W5 | Dati legali per il footer (attività italiana): ragione sociale, P.IVA, sede | Aperta | Segnaposto in "Contenuti da sostituire" |
