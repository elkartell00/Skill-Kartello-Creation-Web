# Preparazione del computer (modalità Prepara)

Una procedura guidata, da fare una volta sola, che installa sul computer tutto ciò che serve alla skill: strumenti per analizzare i siti, video, banca dati di design, componenti pronti, Repository dei template. È pensata per chi non programma: un passo alla volta, spiegando a cosa serve ogni strumento [F11]. Le regole marcate [F11] vengono da `website-builder-setup` (vedi [fonti.md](fonti.md)).

## §1 Quando si avvia

- L'utente chiede di preparare il computer: "prepara il computer", "installa gli strumenti", "setup", oppure `/creation-web prepara`.
- La prima volta che la skill gira su un computer, se `requisiti.mjs` trova mancanti diversi strumenti: proponi la preparazione in una riga, prima di iniziare il sito (aggiunta Kartello).
- La preparazione non crea siti: alla fine si ferma e propone di iniziare il primo (§4).

## §2 Come si conduce

- **Un passo alla volta** [F11]: per ogni strumento spiega in due righe cosa fa e perché serve, installa, conferma l'esito, poi passa al successivo. Mai tutte le istruzioni insieme.
- **Consenso** (regola d'oro 14): la richiesta di preparare il computer vale come consenso per l'elenco mostrato all'inizio. Prima del primo passo mostra l'elenco con gli strumenti consigliati e quelli facoltativi e chiedi una sola conferma: tutto, solo i consigliati, oppure scelta voce per voce.
- **Se un passo non riesce, non fermarti** [F11]: spiega in una riga cosa è successo, dai il comando da lanciare a mano più tardi e prosegui. Unica eccezione: senza Node.js non si può proseguire (§3, passo 1).
- **Linguaggio**: chiaro per chi non programma, professionale come tutta la skill. Niente gergo non spiegato, niente promesse ("sito da 10.000 euro").
- **Password di amministratore**: se un comando la chiede (`sudo`, alcuni `brew`), la skill non può inserirla; mostra il comando e chiedi all'utente di lanciarlo nel terminale ([requisiti.md](requisiti.md) §3).
- **Chiavi e account**: mai chiedere all'utente di incollare chiavi in chat. Per i servizi con account si usa l'accesso dal browser o le impostazioni di Claude Code (§3, passo 5) (aggiunta Kartello).
- Prima di iniziare lancia `node "${CLAUDE_SKILL_DIR}/assets/setup/requisiti.mjs"` e salta ciò che è già pronto.

## §3 I passi

| Passo | Strumento | A cosa serve | Comando o azione | Stato |
|---|---|---|---|---|
| 1 | **Node.js** (versione LTS) [F11] | Fa funzionare gli script della skill e i siti moderni | Se manca: scaricarlo da nodejs.org (versione LTS), installarlo, riaprire il terminale e riavviare la preparazione. Con `nvm` non serve la password di amministratore | Obbligatorio: senza, ci si ferma qui |
| 2 | **Playwright e un browser** | La skill apre e fotografa i siti di esempio e controlla i siti costruiti | `npm install -g playwright`; come browser Chrome o Edge già installati, altrimenti `npx playwright install chromium` | Consigliato |
| 3 | **ffmpeg** e **Python 3** | Video della scena d'impatto, scroll cinematico e 3D; script della banca dati di design | Comandi di [requisiti.md](requisiti.md) §2 secondo il sistema | Consigliati |
| 4 | **UI/UX Pro Max** [F11] | Banca dati locale di stili, palette, abbinamenti di font e regole di usabilità per settore ([banca-dati-design.md](banca-dati-design.md)) | Dentro Claude Code: `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` poi `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill` | Consigliato, gratuito |
| 5 | **21st.dev** [F11] | Componenti React pronti da cercare e installare ([componenti-animati.md](componenti-animati.md) §10) | `npx @21st-dev/cli@latest init --client claude --write`, poi `npx @21st-dev/cli@latest login` (accesso dal browser) | Facoltativo: serve un account; ricerca gratuita, codice dei componenti con un limite giornaliero gratuito, oltre a pagamento |
| 6 | **Server MCP di shadcn** | Cercare e aggiungere i componenti di React Bits ([componenti-animati.md](componenti-animati.md) §3) | `npx shadcn@latest mcp init --client claude` | Facoltativo, gratuito |
| 7 | **REA** | Analisi profonda del codice dei siti di esempio | `npm install -g rea-agents` (serve Node 24.22.1 o più recente) | Facoltativo |
| 8 | **Repository dei template** | Siti analizzati, catalogo dei siti premiati, tecniche apprese | Chiedi dove si trova la cartella e collegala ([repository-template.md](repository-template.md) §1) | Consigliata se l'utente la possiede |

- Le **librerie dei siti** (GSAP, Lenis, Motion, Three.js…) **non** si installano qui: si installano nella cartella di ogni progetto dopo la scelta della tecnologia (W4) ([requisiti.md](requisiti.md) §3). Per questo Framer Motion, che `website-builder-setup` installava subito, non fa parte della preparazione (precisazione Kartello).
- I comandi di installazione cambiano nel tempo. Se uno non funziona più, cerca il comando aggiornato nella documentazione ufficiale dello strumento prima di dichiararlo fallito (aggiunta Kartello).

## §4 Fine della preparazione

1. Rilancia `requisiti.mjs` e mostra il riepilogo: cosa è pronto, cosa è stato saltato e con quale comando si può aggiungere dopo.
2. Se sono stati aggiunti plugin o server MCP (passi 4–6): **riavviare Claude Code** perché li carichi [F11].
3. Proponi il primo sito [F11], chiedendo le tre cose essenziali: cosa fa l'attività, per chi è il sito, che sensazione deve dare. Esempio: *"Crea il sito di uno studio di consulenza per piccole imprese, scuro, moderno, con animazioni."* Da lì parte il flusso normale della skill (Fase 0).
