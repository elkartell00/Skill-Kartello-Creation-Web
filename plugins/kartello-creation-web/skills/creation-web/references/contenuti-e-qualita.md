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
- **Niente trattini dentro le frasi** (`-`, `–`, `—`) in testi, titoli ed etichette: riscrivi la frase.
- **Nessuna parola orfana** sull'ultima riga (vedi [design-system.md](design-system.md) §3.2).
- **Avatar diversi** per ogni persona e **date varie** per gli articoli del blog.

### Segnaposto onesti

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

## §3 Requisiti di consegna [F1]

Le cose che si dimenticano e fanno sembrare un sito non finito:

- Link a privacy policy e termini nel footer
- Una pagina 404 personalizzata e coerente con il brand
- Validazione dei moduli lato client: formato email e campi obbligatori
- Un link "salta al contenuto" per chi usa la tastiera
- Banner dei cookie dove la legge lo richiede (in UE: se si usano cookie non tecnici, come analytics o pixel pubblicitari)
- Una favicon del brand
- `<title>`, meta description, `og:image` e tag per la condivisione sui social
- Testo alternativo su ogni immagine significativa
- HTML semantico: `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`
- Un modo per tornare indietro da ogni pagina

**Attività italiane:** ragione sociale, P.IVA e sede nel footer; privacy policy e cookie policy conformi al GDPR. Se i dati mancano, vanno in "Contenuti da sostituire".

## §4 Accessibilità

- Contrasti WCAG AA verificati ([design-system.md](design-system.md) §2)
- Tutto utilizzabile da tastiera, con focus visibile e ordine logico
- Etichette visibili su ogni campo dei moduli; i placeholder non sostituiscono le etichette
- Aree toccabili di almeno 44×44px su mobile
- Attributo `lang` corretto sulla pagina
- `prefers-reduced-motion` rispettato ([motion.md](motion.md) §2)

## §5 Prestazioni

- Immagini in formato moderno (WebP o AVIF), con dimensioni dichiarate; caricamento differito sotto la piega, mai sull'immagine della hero
- Font: solo i pesi usati, `font-display: swap`
- Nessuna libreria pesante per effetti che si ottengono con poche righe di CSS o JavaScript
