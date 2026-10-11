# Siti "3D scroll": ricette d'impatto

Come sono fatti i siti con l'effetto "3D scroll" che fa vincere premi, e come trasportarli in qualsiasi settore mantenendo lo stesso impatto visivo e lo stesso movimento. Le regole marcate [F6] vengono dalla fonte F6, quelle marcate [F7] dalla fonte F7 ([fonti.md](fonti.md)); immagini e video solo con Studio AI ([contenuti-visivi.md](contenuti-visivi.md)). Motore pronto: `assets/scroll-3d/frame-scrub.js`.

Si propone come effetto firma (M4, famiglia E di [effetti-wow.md](effetti-wow.md)): la skill consiglia la ricetta più adatta all'attività, l'utente sceglie.

## §1 Come funziona davvero

Il "3D scroll" **non è un motore 3D**: è una sequenza di immagini su canvas. Un breve video cinematografico viene tagliato in circa 200 fotogrammi numerati; scorrendo, il canvas disegna il fotogramma che corrisponde alla posizione dello scroll. Giù il film avanza, su torna indietro. Tutto il "3D" viene dal video: per questo conta tanto come si generano immagini e video [F6, F7].

## §2 La ricetta in 7 passi [F6]

1. **Prima le immagini, poi i video.** Una immagine madre pulita (la hero), poi i momenti su cui vuoi arrivare (la rottura, l'esplosione, il cantiere finito) come **modifiche** della madre.
2. **Ogni video ha un fotogramma di partenza e uno di arrivo.** Il fotogramma di arrivo è il volante: decide esattamente dove atterra la ripresa. Per un loop perfetto, partenza e arrivo sono la stessa immagine.
3. **Solo movimento continuo, e dillo due volte.** "One continuous shot, no cuts" in ogni prompt di movimento: un taglio netto sembra un errore quando il visitatore torna indietro.
4. **Taglia i fotogrammi fermi.** Alcuni modelli restano sul primo fotogramma per qualche secondo prima di muoversi: taglia quella parte, così il cambiamento si distribuisce su tutto lo scroll. Un evento che si consuma in 1,5 secondi e poi resta fermo è sprecato: scegli la ripresa in cui il cambiamento cresce.
5. **Circa 200 fotogrammi a 1600–1920 px di larghezza** (non oltre la risoluzione nativa del video): abbastanza fluidi da sembrare video, abbastanza leggeri da precaricarli.
6. **Strumenti legati al film.** Indicatori che reagiscono a ciò che si vede (decibel, strati, hertz, altitudine, gradi) trasformano un bel filmato in qualcosa che sembra ingegnerizzato.
7. **Verifica a metà scroll.** Controlla ogni capitolo nel mezzo del suo scroll, non solo l'inizio della pagina.

## §3 Con Studio AI

| Passo | Come |
|---|---|
| Immagine madre | `genera_immagine`, `formato` 16:9, `livello` high (il massimo per le immagini prodotto), sfondo intenzionale (spesso un vuoto nero), luce forte e definita, nessun testo |
| Altre immagini | **Sempre** `modifica_immagine` con `immagine` = la madre: stesso prodotto, stessa camera, stessa luce, abbastanza allineate da sovrapporle (lente a raggi X). Mai generarle da zero: deriverebbero [F6] |
| Video con partenza e arrivo | `anima_immagine` con `immagine_iniziale` e `immagine_finale`, `formato` 16:9, `audio: false` |
| Loop perfetto | `immagine_iniziale` = `immagine_finale` = la stessa immagine |
| Ripresa unica lunga | `anima_immagine` con `durata` lunga: le estensioni di Studio AI continuano la stessa camera (720p); oppure tratti da 8 s concatenati ([volo-in-prima-persona.md](volo-in-prima-persona.md) §3) |
| Confronto delle prese | Per la ripresa più importante genera 2 `varianti` (o due livelli) con gli stessi fotogrammi, fai un foglio di provini di ognuna e tieni quella che scorre meglio [F6] |
| Più fluidità sui movimenti rapidi | In locale, gratis: `ffmpeg -i in.mp4 -vf "minterpolate=fps=48:mi_mode=mci" out.mp4`, poi estrai i fotogrammi |
| Varianti di colore di un prodotto | In locale, gratis: `ffmpeg -i base.png -vf "hue=h=120:s=1.15" variante.png` [F7] |
| Modello 3D da ruotare | Studio AI non fa modelli 3D: usa un video in orbita (loop) da far ruotare con lo scroll o il trascinamento |

Durate di Studio AI: clip da 4, 6 o 8 s (1080p e 4K solo a 8 s). Per fotogrammi larghi fino a 1920 px basta 1080p; il 4K solo se l'utente lo vuole e accetta la spesa. Preventivo con `stima_costo` e via esplicito prima di generare ([contenuti-visivi.md](contenuti-visivi.md) §12).

**Prompt** [F6]:
- descrivi in modo **fisico** cosa fanno luce e materia, non a cosa somigliano: una parola poetica viene presa alla lettera (una scia "come una medusa" diventa una medusa);
- "slow motion", "camera locked" o il movimento esatto della camera;
- nessun marchio reale, nessuna scritta, nessuna persona reale; prodotti senza loghi.

**Taglio e fotogrammi**:

```bash
# togli i secondi fermi iniziali (es. 1,5 s)
ffmpeg -v error -ss 1.5 -i film.mp4 -an -c:v libx264 -crf 18 film-taglio.mp4
# circa 200 fotogrammi: fps = 200 / durata in secondi (es. 8,5 s → 23.5)
mkdir -p public/frames/spin
ffmpeg -v error -i film-taglio.mp4 -an -vf "fps=23.5,scale=1920:-2:flags=lanczos" \
  -c:v libwebp -quality 80 -start_number 0 public/frames/spin/frame-%04d.webp
```

## §4 Il sito

- **Un capitolo per film**: sezione alta (420–600 vh, regola sulla quantità di movimento) con un palco fissato (`position: sticky`, `100dvh`) e il canvas; `mountFrameScrub` per ogni capitolo, con le tappe (`beats`) per i fermi su un fotogramma e i tratti più lenti [F6, F7].
- **Testi in HTML** sopra il canvas, con finestre di comparsa (`data-in`, `data-out`): il primo capitolo leggibile da fermo, l'ultimo che resta alla fine. I testi nascosti non ricevono clic né tab (il motore li rende `inert`).
- **Strumenti e contatori** con `onProgress(p, fotogramma)`: legati al fotogramma visibile, non alla percentuale di pagina.
- **Scroll morbido** facoltativo con Lenis; il motore funziona anche con lo scroll nativo.
- **Lo spettacolo diventa un sito** quando ha accanto ciò che il cliente compra davvero: un ordine, un preventivo istantaneo, un configuratore, una prenotazione. Ogni modulo dice la verità: "non è stato inviato nulla" se è una demo [F6].
- Movimento ridotto: poster e testi, nessuna sequenza scaricata. Mobile: ritaglio centrale con `focusX` per capitolo, sequenza più leggera se serve ([volo-in-prima-persona.md](volo-in-prima-persona.md) §7).

## §5 Le sette ricette, da trasportare in altri settori [F6]

Ogni ricetta è una **struttura**: cambi il prodotto e il settore, tieni le immagini come modifiche della madre e i fotogrammi di partenza e arrivo.

### E1 Il lancio "flagship": un prodotto umile presentato come uno smartphone
- **Per**: panifici, bar, ristoranti, qualsiasi piccola attività con un prodotto simbolo. Funziona perché il tono è serissimo.
- **Immagini**: il prodotto che fluttua in un vuoto nero, tre quarti, luce di contorno sottile; modifiche: spezzato a metà con le parti sospese; tagliato in sezioni come una TAC; versione a raggi X e termica; macro estrema dell'interno come un tunnel; prima e dopo la lavorazione (crudo e cotto); una piccola gamma di prodotti.
- **Film**: rotazione 360° in loop (partenza = arrivo = madre); la rottura al rallentatore; la separazione in sezioni; il volo dentro la struttura; il time-lapse della lavorazione.
- **Sito**: titolo enorme in stile lancio di prodotto, il prodotto che cresce e si sposta per far posto ai numeri; contatori ("81 strati"); schede di vetro; un indicatore in diretta della lavorazione (tempo, temperatura); lente raggi X o termica sotto il cursore; visore da trascinare per far girare il prodotto; la gamma con tabella delle caratteristiche; scheda d'ordine con quantità, fasce di ritiro e conto alla rovescia del prossimo lotto.
- **Trasporta su**: ciambella, candela, sacchetto di caffè, gelato, vino, cosmetico artigianale.

### E2 L'esplosione di colore: il momento del prodotto
- **Per**: qualsiasi prodotto con un "momento": audio, scarpe, cosmetici, bevande, colorifici. Il colore esce dal prodotto, lo sfondo resta nero.
- **Immagini**: la formula è **pulita, carica, al culmine**: il prodotto pulito; lo stesso con il materiale pronto (gocce di colore, polvere, liquido); il culmine dell'esplosione come un fotogramma ad altissima velocità, "reale, non CGI"; una vista esplosa con un colore diverso tra ogni parte; più finiture.
- **Film**: dal carico al culmine al rallentatore; orbita di 360° intorno al culmine congelato, in loop; un volo dentro il colore; lo smontaggio strato per strato.
- **Sito**: un indicatore che scatta con il film (frequenza, colori in aria); **cambio palette** con filtri CSS su tutti i canvas e l'interfaccia che si ricolora con la stessa matematica; un campionatore che legge il colore più saturo del fotogramma e lo usa come accento della pagina; specifiche che contano; sezione d'acquisto con le finiture.
- **Trasporta su**: suola di una scarpa piena di pigmento, frullatore, tappo di un profumo che salta, lattina che si apre.

### E3 Il lancio a ripresa unica: lo scroll è il conto alla rovescia
- **Per**: tutto ciò che ha un conto alla rovescia: inaugurazioni, serate d'apertura, lanci di prodotto, eventi, la prima lezione di una palestra.
- **Immagini**: la scena di partenza (soggetto pronto, luce del momento), più qualche immagine dei capitoli successivi.
- **Film**: **una sola ripresa continua** di circa 30 s dall'inizio al culmine: nessuna giuntura, anche quando si torna indietro. Più eventuali clip brevi per i capitoli seguenti.
- **Sito**: barra di caricamento che si riempie, poi un "via" che attiva il suono; lo scroll fa scorrere il conto alla rovescia e una telemetria legata a ciò che si vede (orologio, altezza, velocità, fase); più scroll ai momenti lenti; il palco che trema con la velocità dello scroll nel momento clou; prossima data o prossimo turno calcolati davvero; prenotazione che dice la verità.
- **Trasporta su**: la serata d'apertura di un ristorante, il drop di una scarpa, un concerto, una fiera.

### E4 Il restauro: lo scroll trasforma
- **Per**: carrozzerie e detailing, idropulizia, pulizia piscine, tetti, qualsiasi servizio il cui risultato è una trasformazione.
- **Immagini**: il PRIMA (sporco, rovinato, nessun marchio, nessuna persona); il DOPO come **modifica** del prima, stessa inquadratura; un macro di prova (acqua che scivola sul trattamento).
- **Film**: dal prima al dopo con una linea di restauro che attraversa il soggetto, "la forma non cambia mai"; un arco lento di 180° intorno al risultato, in loop; il macro della prova al rallentatore. Movimenti di camera dolci: in un grande arco gli oggetti cambiano forma.
- **Sito**: un indicatore che sale (brillantezza, anni tolti); cursore prima e dopo da trascinare; letture della prova; pacchetti con prezzi; **preventivo istantaneo** (dimensione, condizione, pacchetto) con stima in diretta; prenotazione con le disponibilità.
- **Trasporta su**: vialetto con muschio, piscina verde, cucina stanca, terrazza macchiata, facciata da rifare, denti (sbiancamento).

### E5 La casa ai raggi X: vedere dentro i muri
- **Per**: idraulici, elettricisti, climatizzazione, disinfestazione, isolamento: servizi che si pagano ma non si vedono.
- **Immagini**: la casa all'ora blu, finestre calde, nessuna persona; modifiche nella stessa posizione: raggi X (muri di vetro con tubi, condotti, cavi), termica, guasto (una perdita rossa).
- **Film**: avvicinamento lento alla casa; i muri che diventano vetro dall'alto in basso; il guasto che si ripara.
- **Sito**: riga di stato che cambia ("Perdita rilevata" → "Riparato"); la **lente sotto il cursore** che mostra raggi X o termica in un cerchio morbido, con una lettura del punto sotto il cursore (tubo, condotto, cavo, gradi); allineamento delle immagini misurato e corretto; preventivo in 90 secondi (impianto, sintomo, casa, urgenza) con fascia di prezzo e primo appuntamento; recensioni; barra per le emergenze con chiamata diretta.
- **Trasporta su**: qualsiasi cosa abbia un interno: motore per un'officina, materasso, scarpa da corsa, dente per un dentista.

### E6 Dentro il diamante: luce e nero
- **Per**: gioiellieri, orologiai, vetro e cristallo: prodotti che sono luce.
- **Immagini**: il prodotto in un vuoto nero sotto un unico faro, lampi spettrali; modifiche: il "fuoco" con raggi d'arcobaleno e caustiche; macro dall'interno attraverso le faccette; le varianti di metallo.
- **Film**: rotazione 360° in loop sotto il faro; la luce che si apre in un'esplosione di arcobaleno; la camera che entra nella faccetta e viaggia dentro.
- **Sito**: le caratteristiche che compaiono una alla volta; un campionatore che porta nella pagina il colore che lampeggia nel film; un indicatore della luce restituita; **configuratore** (metallo cambiando immagine, carati con prezzo in diretta, misura, incisione in anteprima); prenotazione di una visione privata; cura e garanzia.
- **Trasporta su**: movimento di un orologio, decanter di cristallo, vetrata. Luce più spazio nero è l'esplosione di colore più affidabile, e non sembra mai infantile.

### E7 Il cantiere che si costruisce da solo
- **Per**: piscine, giardini, terrazze, cucine, case intere: lavori costosi in cui il cliente vuole vedere il risultato prima.
- **Immagini**: il PRIMA (terreno vuoto, vista aerea a tre quarti, luce dorata); il FINITO come modifica, stessa camera, al tramonto con le luci accese; una vista ad altezza d'occhi del risultato.
- **Film**: **una sola ripresa** in orbita lenta mentre il lavoro si costruisce in time-lapse (tracciatura, scavo, struttura, finiture, acqua, piante, luci), "la casa non cambia mai"; una passata bassa sul risultato.
- **Sito**: una timeline del progetto che scatta per fasi legate al film, con un contatore delle settimane; il finale "Il tuo giardino, finito."; cursore prima e dopo; **configuratore** (forma, finiture, materiali, extra) con fascia di prezzo e tempi; portfolio; rata mensile; richiesta di sopralluogo con data.
- **Trasporta su**: ristrutturazioni, cucine, vialetti, case prefabbricate, allestimenti di negozi.

### Movimenti consigliati per altri tipi di sito [F7]

| Tipo di sito | Due movimenti di partenza |
|---|---|
| Prodotto (bottiglia, oggetto, scarpa, cosmetico) | Rotazione 360° + esplosione, versata o rivelazione |
| Portfolio e personal brand | Ritratto cinematografico o forma astratta liquida + orbita lenta con parallasse |
| Agenzia, app, software | Forma 3D astratta o logo che si trasforma + volo tra scie di luce |
| Edilizia, servizi per la casa, immobili | Orbita o volo intorno all'edificio + rivelazione di un dettaglio |
| Ristorante, cibo | Piatto a 360° + vapore o ingredienti, oppure volo nella sala |
| Fitness, eventi, viaggi | Movimento del soggetto (atleta, folla, paesaggio) + ampio movimento di camera |

## §6 Potenziamenti da aggiungere [F6]

- **Cambio palette**: pulsanti (Originale, Neon, Tramonto, Oceano, Mono) che applicano filtri CSS a tutti i canvas; l'accento della pagina si ricolora con la stessa matematica, così l'interfaccia combacia sempre con il filmato.
- **Lente a raggi X**: una modifica della madre che mostra l'interno (raggi X, termica, spaccato) nella stessa posizione, sovrapposta e rivelata da un cerchio morbido che segue il cursore (e si muove piano da sola quando nessuno tocca), con una lettura del punto sotto la lente. Misura l'allineamento delle due immagini e correggi lo scarto.
- **Suono che segue lo scroll**: interruttore spento di default; suoni sintetizzati con Web Audio, nessun file: un colpo nel momento clou del capitolo, una trama solo mentre il film si muove, silenzio quando lo scroll si ferma. Parametro `?mute=1` per i test ([contenuti-visivi.md](contenuti-visivi.md) §10).
- **Confronto delle prese**: la ripresa principale in più varianti con gli stessi fotogrammi, foglio di provini per ognuna, si tiene quella che scorre meglio.
- **Pronto da registrare**: librerie in locale (funziona offline), un lanciatore con doppio clic che apre il sito su una sua porta, server di sviluppo che non tiene in cache i file mancanti, animazione che continua anche se un fotogramma non carica, un link `?solo=capitolo:0.5` che ferma un capitolo a metà per gli screenshot.

## §7 Come guidare dopo la prima versione [F6]

Dopo il primo passaggio l'utente descrive **sensazioni**, non soluzioni: "il titolo copre il prodotto", "l'esplosione è troppo veloce", "deve sembrare più costoso". Descrivere il problema funziona meglio che prescrivere la correzione: tu vedi la causa, l'utente può solo indovinarla. Dillo all'utente alla consegna.

## §8 Controlli

- Ogni capitolo verificato **a metà del suo scroll**, nei due sensi; gli strumenti mostrano valori coerenti con il fotogramma.
- Nessun taglio visibile tornando indietro; il loop si chiude senza scatti.
- Primo fotogramma visibile subito; peso totale dei fotogrammi misurato (circa 200 per capitolo, 1600–1920 px).
- Moduli onesti; movimento ridotto con poster e testi; mobile con ritaglio controllato.
