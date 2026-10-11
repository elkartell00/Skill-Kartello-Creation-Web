# Contenuti e qualità

Regole valide durante tutta la costruzione, qualunque sia lo stile. Le regole marcate [F1] vengono da `landing-page-design` (vedi [fonti.md](fonti.md)).

## §1 Testi realistici, mai riempitivi [F1]

Questi sono i segnali che una pagina è stata generata e non progettata.

- **Niente Lorem Ipsum.** Scrivi una vera bozza dei testi.
- **Niente "John Doe" o "Mario Rossi".** Nomi realistici e vari.
- **Niente marchi segnaposto** come "Acme Corp", "Nexus", "SmartFlow" o "Azienda XYZ". Inventa nomi credibili e adatti al contesto.
- **Niente numeri tondi finti** come `99,99%`, `50%`, `100,00 €`. Usa dati organici: `47,2%`, `99,00 €`, `+39 02 8475 1928`. Formato italiano: virgola per i decimali, punto per le migliaia, simbolo dell'euro dopo l'importo.
- **Niente cliché da intelligenza artificiale.** In inglese: "Elevate", "Seamless", "Unleash", "Next Gen", "Game changer", "Delve", "Tapestry", "In the world of". In italiano: "Eleva", "Senza soluzione di continuità", "Libera il potenziale", "Di nuova generazione", "Rivoluzionario", "All'avanguardia", "A 360 gradi", "Nel mondo di", "Benvenuti nel nostro sito", "Leader nel settore", "Soluzioni innovative", "Qualità e professionalità".
- **Titoli in sentence case**, non Con Tutte Le Iniziali Maiuscole.
- **Forma attiva.** "Non siamo riusciti a salvare le modifiche", non "Si è verificato un errore".
- **Niente punti esclamativi nei messaggi di successo e niente "Ops!" negli errori.** Diretti: "Connessione non riuscita. Riprova."
- **Niente trattini usati come punteggiatura dentro le frasi** (`-`, `–`, `—` per incisi e lineette) in testi, titoli ed etichette: riscrivi la frase. Restano ammessi i trattini delle parole composte, dei nomi propri e dei marchi (Emilia-Romagna, Wi-Fi, e-commerce) e il trattino medio negli intervalli di dati come orari, prezzi e date, es. "Lun–Ven 9:00–19:00" (precisazione Kartello).
- **Nessuna parola orfana** sull'ultima riga (vedi [design-system.md](design-system.md) §3.2).
- **Avatar diversi** per ogni persona e **date varie** per gli articoli del blog.

### Segnaposto onesti (aggiunta Kartello)

Il realismo serve alla bozza, non a ingannare. Testimonianze, recensioni, numeri di risultato, loghi di clienti, premi, certificazioni e dati di contatto inventati sono **segnaposto**:

- registrali tutti in `docs/brief-sito.md`, sezione "Contenuti da sostituire", con dove si trovano e cosa serve per sostituirli;
- ricordalo nella consegna: pubblicare recensioni o testimonianze false è una pratica commerciale scorretta, vietata nell'Unione Europea.

## §2 Stati degli elementi interattivi [F1]

Ogni elemento interattivo ha tutti i suoi stati:

- **Hover**: cambio di sfondo, leggero ingrandimento o spostamento
- **Active**: `scale(0.98)` o `translateY(1px)` come risposta fisica al tocco
- **Focus**: anello di focus visibile. È un requisito di accessibilità, non un'opzione
- **Caricamento**: skeleton con la forma del contenuto reale, non spinner circolari
- **Vuoto**: una vista "per iniziare" curata, mai un pannello bianco
- **Errore**: in linea e specifico. Mai `window.alert()`

**Nessun link morto.** Un bottone che punta a `#` o è collegato o appare disabilitato. La pagina corrente è indicata nella navigazione.

**Moduli onesti.** Un modulo ha una destinazione reale oppure un comportamento dimostrativo dichiarato: mai "inviato" se non è stato inviato nulla [F4].

## §3 Requisiti di consegna [F1]

Le cose che si dimenticano e fanno sembrare un sito non finito:

- Link a privacy policy e termini nel footer
- Una pagina 404 personalizzata e coerente con il brand
- Validazione dei moduli lato client: formato email e campi obbligatori
- Un link "salta al contenuto" per chi usa la tastiera
- Banner dei cookie dove la legge lo richiede, cioè se il sito usa cookie o strumenti di tracciamento non tecnici: pixel pubblicitari, analytics non anonimizzati, contenuti incorporati di terze parti (Google Maps, YouTube, widget social). In Italia gli analytics anonimizzati secondo le Linee guida del Garante (10/06/2021) sono equiparati ai tecnici. Mappe e video incorporati si caricano dopo il consenso, con un'anteprima statica e un clic per attivarli (precisazione Kartello)
- Una favicon del brand
- `<title>`, meta description, `og:image` e tag per la condivisione sui social
- Testo alternativo in italiano su ogni immagine significativa, `alt` vuoto sulle decorative ([contenuti-visivi.md](contenuti-visivi.md) §11)
- HTML semantico: `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`
- Un modo per tornare indietro da ogni pagina

**Attività italiane** (aggiunta Kartello): nel footer denominazione o ragione sociale, sede, P.IVA ed email di contatto; per le società anche registro delle imprese e numero REA; per S.r.l., S.p.A. e S.a.p.a. anche capitale sociale versato, eventuale socio unico ed eventuale stato di liquidazione (art. 2250 c.c.); per le professioni regolamentate ordine o albo, numero di iscrizione e titolo professionale (D.Lgs. 70/2003, art. 7). Privacy policy e cookie policy conformi al GDPR. Se i dati mancano, vanno in "Contenuti da sostituire".

## §4 Accessibilità

- Contrasti WCAG AA verificati ([design-system.md](design-system.md) §2)
- Tutto utilizzabile da tastiera, con focus visibile e ordine logico
- Etichette visibili su ogni campo dei moduli; i placeholder non sostituiscono le etichette
- Aree toccabili di almeno 44×44px su mobile
- Attributo `lang` corretto sulla pagina
- `prefers-reduced-motion` rispettato ([motion.md](motion.md) §2)

## §5 Prestazioni

- Immagini in formato moderno (WebP o AVIF), con `width` e `height` reali; caricamento differito sotto la piega, mai sull'immagine della hero. Immagini, video e audio si creano solo con Studio AI, mai foto di repertorio ([contenuti-visivi.md](contenuti-visivi.md))
- Font: solo i pesi usati, `font-display: swap`
- Nessuna libreria pesante per effetti che si ottengono con poche righe di CSS o JavaScript

## §6 Mobile [F4]

La versione mobile si progetta, non si rimpicciolisce il desktop:
- ogni sezione su una colonna: barre di ricerca e filtri con campi a tutta larghezza e bottone a tutta larghezza; schede di categoria che vanno a capo o scorrono orizzontalmente senza uscire dalla pagina; griglie di card a una colonna (due solo se restano leggibili); passaggi in verticale, senza linee di collegamento che non collegano più; moduli, slider e calcolatori a tutta larghezza con aree toccabili adeguate; fasce con immagine con il testo in basso sopra una velatura; footer a due colonne o a una;
- navigazione sempre visibile, con logo e nome su una riga a sinistra e menu a destra; aree sicure del telefono rispettate;
- controllo a 360×740, 375×812, 390×844 e 430×932, in verticale e in orizzontale, senza scroll orizzontale in nessuna sezione; poi ricontrolla il desktop.

