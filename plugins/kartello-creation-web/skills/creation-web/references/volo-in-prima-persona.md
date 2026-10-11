# Volo in prima persona nei locali

Variante dello [scroll cinematico](scroll-cinematico.md): **un'unica ripresa continua in prima persona**, come un drone FPV guidato da un pilota vero, che entra dalla porta dell'attività, attraversa i suoi spazi, esce dal retro, si gira e sale per mostrare tutto l'edificio nel suo contesto. Lo scroll muove la telecamera avanti e indietro. Adatta a concessionarie, ristoranti, hotel, negozi, laboratori, fabbriche, immobili: attività con locali fisici da far "visitare". Le regole marcate [F4] vengono dalla fonte F4 ([fonti.md](fonti.md)); generazione solo con Studio AI ([contenuti-visivi.md](contenuti-visivi.md)).

Si attiva quando X3 = "Volo in prima persona nei locali". Domande X7–X8 in [domande.md](domande.md) §2.8.

## §1 Il percorso è la storia

- La telecamera **non taglia e non si teletrasporta** mai: ogni cambio di ambiente avviene attraversando fisicamente una porta, una curva o un'apertura [F4].
- Il percorso viene dall'utente (X7: da dove si entra, quali spazi, da dove si esce). Se non lo conosce, proponine uno realistico per quel tipo di locale [F4].
- **Prima di produrre** presenta la tabella **Storia visiva**, con tre colonne: **Scena**, **Storia visiva** (cosa fa la telecamera), **Testi del sito** (titolo, frase, CTA proposti per quel tratto, specifici per l'attività). I passaggi di raccordo (una porta che si apre, l'uscita e la rotazione) non hanno testi: parla il movimento [F4]. Esempio di struttura:

| Scena | Storia visiva | Testi del sito |
|---|---|---|
| 01 Arrivo | Avvicinamento esterno ad altezza d'occhi, arco intorno a un elemento chiave, allineamento con l'ingresso aperto, dentro | Titolo principale, frase, CTA |
| 02 Spazio principale | Rallenta, scorre di fianco al prodotto di punta, curva a S intorno a un secondo, ruota lo sguardo sulla sala | Offerta, frase, CTA |
| Passaggio: porta | Una persona apre una porta e la camera la attraversa | Nessun testo |
| 03 Retro | Arco intorno al lavoro in corso, si abbassa per guardare da vicino, curva oltre le attrezzature | Servizio o mestiere, CTA |
| Passaggio: uscita e rotazione | Esce dall'apertura sul retro, continua, ruota di 180° verso l'edificio appena lasciato | Nessun testo |
| 04 Rivelazione | Vola all'indietro e sale, mostrando tutto il locale con strade e dintorni | Chiusura, dati dell'attività, CTA finale |

- Sotto la tabella, un **piano del ritmo**: per ogni scena cosa entra ed esce, quanta distanza di scroll (in altezze di viewport), movimento continuo o fermo su un fotogramma. Tieni ferma l'apertura il tempo di leggere il titolo; dai più scroll alle manovre fitte all'interno; dai alla rotazione rapida un suo tratto breve, perché non sembri un salto; tieni ferma la vista aerea finale [F4].
- In modalità guidata attendi l'approvazione di tabella e ritmo; in modalità "fai tutto tu" presentali e prosegui [F4].

## §2 Volare come un pilota vero

Una ripresa che scivola dritta su un binario sembra un carrello, non un drone [F4]. Nel prompt scrivi le manovre:
- **velocità variabile**: lenta sui dettagli, veloce negli spazi di passaggio;
- **inclinazione e deriva laterale**: arco intorno agli oggetti per mostrarne il profilo, poi rientro;
- **rotazione dello sguardo** verso ciò che conta (un prodotto, una persona al lavoro, una vista) mentre si continua ad avanzare;
- **curve a S** negli spazi aperti e intorno agli ostacoli;
- **rispetto dell'edificio**: gli interni non sono un corridoio dritto; svolte realistiche attraverso una porta laterale, in fondo a uno scaffale, dietro un angolo;
- **tempi delle manovre** nel prompt, a intervalli di secondi (es. "3–7 s: slows down, banks left and turns to look along the full side of the car").

**Uscita e rivelazione fisicamente corrette** [F4]:
- uscendo da un'apertura sul retro si vede solo ciò che c'è davvero fuori (cortile, strada di servizio, recinzione, cielo), non la facciata dell'edificio in cui si è;
- per mostrare l'edificio appena lasciato la camera **ruota di 180° continuando a muoversi**, poi **vola all'indietro salendo**;
- la vista finale colloca il locale nel suo contesto reale: accesso, parcheggio o piazzale, la strada principale con traffico, edifici vicini. Mai un edificio isolato in un campo vuoto;
- architettura coerente con l'immagine di partenza: stessi materiali, infissi, vetrate e proporzioni.

**Parole nei prompt** [F4]:
- **mai** "drone", "quadcopter" o "UAV": il modello disegna un drone nell'inquadratura. Scrivi invece che la telecamera stessa vola in prima persona e che nulla vola o fluttua nell'inquadratura ("one single continuous first-person camera move, no cuts; the camera itself is flying; nothing flying or hovering is visible");
- tutto è fermo salvo ciò che descrivi; niente compare, sparisce o cambia;
- di ogni tratto: manovre con i tempi e cosa si vede oltre la prossima apertura;
- luce, aspetto dell'obiettivo, e "no text, no logos, no brand badges, no signage lettering"; prodotti senza marchi reali.

## §3 Generazione con Studio AI

1. **Immagini di partenza**: 2–3 proposte di ingresso esterno ad altezza d'occhi, porte aperte, in direzioni diverse (`genera_immagine`, `formato` 16:9, `varianti`); l'utente sceglie, oppure scegli tu in modalità "fai tutto tu". Diventa il primo fotogramma esatto [F4].
2. **Immagine di rivelazione**: dalla partenza scelta, una vista aerea alta che guarda il retro dello stesso edificio, con l'apertura d'uscita, il cortile e le strade (`modifica_immagine` o `genera_immagine` con la partenza in `immagini_riferimento`). È il punto d'arrivo del finale e tiene coerente l'architettura [F4].
3. **La ripresa**, un'unica ripresa continua. Due modi, da proporre con la stima dei costi (X8):
   - **Ripresa lunga unica** (consigliata per la continuità): `anima_immagine` con l'immagine di partenza e `durata` lunga (circa 30–45 s). Oltre gli 8 s Studio AI usa le estensioni, che continuano la stessa camera, luce e velocità; il risultato è in 720p. Se un'estensione fallisce l'app consegna la parte già pronta: controlla `avvisi` e `durata_secondi` [SA].
   - **Tratti in 1080p**: segmenti da 8 s generati in sequenza, ognuno con `immagine_iniziale` = ultimo fotogramma reale del precedente (regole dell'architettura A in [scroll-cinematico.md](scroll-cinematico.md) §4); l'ultimo tratto può usare `immagine_finale` = immagine di rivelazione per arrivare sulla vista giusta. Più nitido, più giunture da controllare.
   - Mai scene separate unite da una dissolvenza [F4].
4. Genera in ordine e controlla ogni tratto prima del successivo. Tieni i `lavoro_id`: un lavoro in attesa non è fallito, recuperalo con `stato_lavoro` invece di rilanciarlo. Lavora al sito mentre i video si generano [F4, SA].

## §4 Controllo e riparazione

**Controlla ogni clip** con ffmpeg [F4]: un foglio di provini a 1–2 fotogrammi al secondo da guardare, la ricerca di tagli nascosti, l'ingrandimento sugli ultimi secondi e su ogni porta o curva, il confronto tra l'ultimo fotogramma di un tratto e il primo del successivo.

```bash
ffmpeg -v error -i clip.mp4 -vf "fps=1,scale=480:-2,tile=6x5" -frames:v 1 provini.jpg   # foglio di provini
ffmpeg -i clip.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null - 2>&1 | grep pts_time  # tagli nascosti
```

Cerca: droni o oggetti estranei, auto o persone che compaiono dal nulla, loghi, geografia irrealistica, salti di posizione, scala o luce.

**Ripara invece di rigenerare tutto** [F4]: Studio AI non modifica i video, quindi:
- difetto verso la fine di un tratto: taglia il clip prima del difetto, estrai l'ultimo fotogramma pulito e genera il tratto successivo da lì;
- difetto in un tratto breve: rigenera solo quel tratto, con gli stessi fotogrammi di partenza (e di arrivo, se servono) e un prompt più preciso;
- niente cicli di rigenerazione senza fine: conserva ciò che è già buono.

**Unisci un unico master** [F4]: normalizza tutti i pezzi (`scale=1920:1080:flags=lanczos,fps=24,format=yuv420p,setsar=1`, senza ingrandire oltre la risoluzione nativa se è 720p); unisci con un taglio netto i pezzi che si continuano già; usa una dissolvenza brevissima (`xfade=transition=fade:duration=0.125`) solo dove un pezzo riparato incontra un originale; ripeti la ricerca dei tagli sul master e guarda i provini di tutto il volo. Annota la spesa reale con `riepilogo_spese`.

## §5 Sequenza di fotogrammi

Questa variante usa una **sequenza di immagini su canvas** invece dello scrub di un video [F4]:

```bash
mkdir -p public/volo/v1
ffmpeg -i volo-master.mp4 -an -vf "fps=20,scale=1280:-2:flags=lanczos" -c:v libwebp -quality 78 -start_number 0 public/volo/v1/frame-%04d.webp
```

- 18–24 fotogrammi al secondo: di più rendono fluide rotazioni e curve rapide. Larghezza non superiore a quella nativa del master (1280 per un master 720p, fino a 1440–1920 per un master 1080p); regola qualità e misura sul peso misurato.
- Un **manifest** (JSON) con numero di fotogrammi, fps, dimensioni, schema dei nomi, poster e una versione per invalidare la cache. Verifica il primo, il fotogramma centrale, l'ultimo e tutti i percorsi.

## §6 Il sito

- Sito completo, non solo l'animazione: navigazione utile, offerta chiara, sezioni pertinenti e azione principale [F4].
- **Palco su canvas fissato** durante il volo; scroll → fotogrammi con una **timeline a tappe** in un file di contenuti modificabile: per ogni tappa altezza di scroll in `vh`, secondi `da`/`a` del video, capitolo di testo. Una tappa "ferma" mappa un intervallo di scroll su un solo fotogramma. La distanza di scroll si decide indipendentemente dalla durata del clip [F4].
- **Testi in HTML semantico**, separati dal disegno: nitidi, selezionabili, accessibili. Entrano, restano ed escono nelle loro tappe; il primo capitolo è visibile da fermo, l'ultimo resta alla fine. I testi nascosti non intercettano clic né il tab [F4].
- **Niente scroll dirottato**: lo scroll nativo funziona avanti e indietro. Un link visibile **"Salta la visita"** porta al contenuto principale [F4].
- **Caricamento**: poster subito; prima il fotogramma che serve e i vicini nella direzione dello scroll; richieste in parallelo limitate, quelle superate annullate, immagini decodificate rilasciate, tentativi limitati; salti veloci, scroll all'indietro, ridimensionamento e schermi ad alta densità gestiti [F4].
- **Header leggibile** sia sul volo scuro sia sulle sezioni chiare dopo: header da vetro a pieno ([motion.md](motion.md) §4) [F4].
- **Riduzione del movimento e dispositivi deboli**: ogni capitolo sopra un'immagine rappresentativa, senza scaricare la sequenza. Capire l'attività non deve mai dipendere dall'animazione [F4].

## §7 Mobile

- **Riusa il volo del desktop**: niente nuove generazioni. La ripresa in prima persona tiene il soggetto (la porta, il corridoio, la strada davanti) vicino al centro, quindi su uno schermo alto funziona con un ritaglio centrale a "cover" sul canvas [F4]:

```text
scala = max(larghezzaCanvas / larghezzaFotogramma, altezzaCanvas / altezzaFotogramma)
x = (larghezzaCanvas − larghezzaFotogramma × scala) / 2,  y = (altezzaCanvas − altezzaFotogramma × scala) / 2
```

  Canvas grande quanto la viewport per il device pixel ratio (al massimo 2), ricalcolato su ridimensionamento e rotazione.
- **Controlla il centro** (circa il 45% centrale, quello che un telefono in verticale vede di un 16:9) per tutto il volo: porte, curve e strada davanti restano dentro; persone e prodotti chiave non vengono tagliati a metà; la rotazione e la vista finale si leggono. Dove un momento esce dal centro, sposta il ritaglio solo per quella tappa con un **fuoco orizzontale** (0 sinistra, 0.5 centro, 1 destra) nel file dei contenuti, con passaggi graduali tra le tappe. Se non si recupera, dillo: non generare nuovi video senza chiedere [F4].
- Facoltativo, per risparmiare banda: una sequenza già ritagliata in verticale dallo stesso master (`crop=ih*9/16:ih` con lo stesso fuoco per tappa, risoluzione nativa, mai ingrandita); i telefoni scaricano solo quella, i desktop solo l'orizzontale, mai entrambe [F4].
- **Ritmo mobile** separato: ogni tappa può avere una distanza di scroll per mobile; fermi più brevi, manovre interne con abbastanza scroll, rotazione con un suo tratto breve. Si cambia la mappatura, non si tolgono fotogrammi [F4].
- **Apertura mobile semplice**: header in vetro, un titolo breve, una sola CTA, un segnale di scroll. Durante il volo un titolo breve per capitolo, ancorato in basso sopra una velatura che sale dal basso, lontano dalla strada che la camera percorre; testo e azione tornano alla rivelazione finale [F4].

## §8 Controlli finali

In aggiunta a [scroll-cinematico.md](scroll-cinematico.md) §8 e alla [checklist](checklist.md) [F4]:
- ogni tappa arriva al fotogramma previsto; i capitoli compaiono nelle loro tappe; il fermo finale funziona; nessuno scroll orizzontale;
- telefoni 360×740, 375×812, 390×844 e 430×932, in verticale e in orizzontale: apertura leggibile, ritaglio centrale corretto in tutto il volo, header da vetro a pieno esattamente a fine volo nei due sensi, menu e "Salta la visita" funzionanti;
- con l'ispezione di rete: quale sequenza scarica ogni viewport. Riporta i pesi misurati separati dalle misure di velocità reali;
- nella consegna distingui i controlli fatti da quelli non fatti: senza test nel browser, dichiara che il ritmo non è verificato.
