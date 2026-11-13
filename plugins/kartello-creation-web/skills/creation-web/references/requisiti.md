# Requisiti: cosa installare e come chiederlo

**Scelta del proprietario (versione 2).** La skill installa da sola ciò che le serve, ma **solo dopo il sì dell'utente**. Prima spiega cosa manca, a cosa serve e quanto è grande l'installazione. Se l'utente rifiuta, usa il ripiego e prosegue.

## §1 Controllo

All'avvio (Fase 0) e prima di ogni passo che richiede uno strumento:

```bash
node "${CLAUDE_SKILL_DIR}/assets/setup/requisiti.mjs"          # riepilogo leggibile
node "${CLAUDE_SKILL_DIR}/assets/setup/requisiti.mjs" --json   # per decidere in automatico
```

Lo script non installa nulla: dice cosa c'è, cosa manca e il comando giusto per il sistema operativo.

## §2 Cosa serve e quando

| Strumento | Serve per | Obbligatorio | Comando | Ripiego se manca |
|---|---|---|---|---|
| Node.js 18+ | tutti gli script della skill | sì | `nvm install 24` (o `brew install node`) | nessuno: chiedi di installarlo |
| Playwright | modalità Impara (`analizza-sito.mjs`), controllo dei siti costruiti a 375/768/1280 px | sì per Impara | `npm install -g playwright` | leggere l'HTML con lo strumento web e dichiarare l'analisi parziale |
| Browser | aprire i siti nelle analisi | sì per Impara | Chrome o Edge già installati, oppure `npx playwright install chromium` | come sopra |
| ffmpeg | video della scena d'impatto, scroll cinematico, 3D scroll a fotogrammi | solo per quei passi | `brew install ffmpeg` · `sudo apt install ffmpeg` · `winget install Gyan.FFmpeg` | animazione in codice senza video; registrazione con Playwright |
| Python 3 | `knockout.py` dello scroll cinematico, strumenti della repository | solo per quei passi | `brew install python` | scontorno con altri metodi |
| REA | analisi profonda dei siti: codice, librerie e versioni, rotte, risorse 3D, font, audio ([repository-template.md](repository-template.md) §7) | no, consigliato | `npm install -g rea-agents` (serve Node 24.22.1+, 22.23.4+ o 26.12.1+) | analisi senza la parte tecnica, dichiarata nella scheda |
| Repository dei template | riferimenti e tecniche apprese | no, consigliata | collegamento o variabile ([repository-template.md](repository-template.md) §1) | stili di [stili.md](stili.md) e libreria della v1 se c'è |

## §3 Dove si installa

- **Strumenti della skill** (Playwright, browser, REA, ffmpeg, Python): sul computer, **una volta sola**, così servono a tutti i progetti. Per Node conviene nvm, che non richiede la password di amministratore.
- **Librerie del sito** (GSAP, Three.js, Lenis, Motion, Remotion, @gltf-transform…): nella **cartella del progetto**, con `npm install` dopo la scelta della tecnologia (W4). Mai da CDN in produzione ([grafica-in-codice.md](grafica-in-codice.md)).
- Se un comando chiede la password di amministratore (`sudo`, alcuni `brew`), la skill non può inserirla: mostra il comando all'utente e chiedigli di eseguirlo nel terminale.

## §4 Come chiedere

1. Raggruppa tutto ciò che manca in **una sola domanda**, con una riga per strumento: cosa fa, perché serve ora, comando. Esempio: "Per analizzare il sito d'esempio mi serve Playwright (circa 10 MB, apre i siti come un visitatore): lo installo con `npm install -g playwright`?"
2. Opzioni: installa tutto (consigliato) · solo l'obbligatorio · non installare (con il ripiego).
3. Dopo l'installazione rilancia `requisiti.mjs` e conferma in una riga cosa è pronto.
4. Non ripetere la domanda nella stessa sessione se l'utente ha già rifiutato: usa il ripiego.
5. Node troppo vecchio per REA: proponi `nvm install 24`, avvisando che i pacchetti globali vanno reinstallati sulla nuova versione (`nvm install 24 --reinstall-packages-from=<versione attuale>`).
