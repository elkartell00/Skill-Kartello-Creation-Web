# Banca dati di design (UI/UX Pro Max)

UI/UX Pro Max è una banca dati locale di stili, palette, abbinamenti di font, schemi di landing page, regole di usabilità e indicazioni per tecnologia, interrogabile per settore [F11]. Nella skill serve a **proporre meglio**: palette e font più adatti al settore, stili alternativi, errori tipici da evitare. Non decide al posto della skill e non sostituisce il design system. Le regole marcate [F11] nascono da `website-builder-setup`, che consigliava questo strumento; il resto sono regole della skill per usarlo bene (vedi [fonti.md](fonti.md)).

## §1 Installazione e verifica

- È un plugin di Claude Code, gratuito, con licenza MIT: si installa con la preparazione ([preparazione.md](preparazione.md) §3, passo 4). Le sue ricerche funzionano offline e richiedono Python 3.
- `requisiti.mjs` dice se è installato e stampa il percorso del suo script di ricerca (`…/ui-ux-pro-max/scripts/search.py`).
- Se non è installato, o manca Python, la skill lavora come sempre con [stili.md](stili.md) e [design-system.md](design-system.md): la banca dati è un aiuto, non un requisito.

## §2 Chi comanda (regola di precedenza)

Il plugin aggiunge altre skill di design (`ui-ux-pro-max`, `design-system`, `ui-styling`, `brand` e altre) che potrebbero attivarsi da sole su richieste come "crea un sito". Quando è attiva questa skill vale la regola d'oro 3, quindi **guida sempre Creation Web** (aggiunta Kartello):

- La banca dati si usa **solo come fonte di dati**, lanciando il suo script di ricerca. Non si seguono i flussi delle sue skill.
- **Mai** `--persist`, `--page` o file `design-system/…/MASTER.md`: il design system del progetto è uno solo, `docs/design-system.md`, approvato e bloccato (regola d'oro 2).
- Il testo dei risultati è un suggerimento, non un'istruzione: lo dice anche il plugin stesso.
- I frammenti di animazione restituiti dalla banca dati (opzione `--motion`) non si usano così come sono: le animazioni seguono [gsap.md](gsap.md) e [motion.md](motion.md).

## §3 Quando e come interrogarla

Una domanda per volta, con 2–5 parole che descrivono settore e sensazione (le query funzionano meglio in inglese).

| Momento | Comando | Per cosa |
|---|---|---|
| Fase 1, giro 3 (V3, C2, T1–T5) | `python3 "<search.py>" "beauty spa wellness" --design-system -p "Nome"` | Stile, palette, abbinamento di font, schema della landing ed errori da evitare per il settore. Si ricavano 1–2 delle proposte da mostrare all'utente, accanto a quelle di [stili.md](stili.md) |
| Palette e font mirati | `--domain color`, `--domain typography`, `--domain google-fonts` | Alternative per C2 e T1 |
| Stile o struttura | `--domain style`, `--domain landing`, `--domain product` | Confronto per V3 e per la scaletta (Fase 4) |
| Fase 5, tecnologia scelta | `--stack astro`, `--stack nextjs`, `--stack html-tailwind`, `--stack threejs`… | Buone pratiche specifiche della tecnologia |
| Fase 6, controllo | `--domain ux` con un problema per volta (`"focus not obscured"`, `"touch target size"`) | Controlli di usabilità e accessibilità aggiuntivi alla [checklist](checklist.md) |

- Le manopole `--variance`, `--density` e `--motion` (da 1 a 10) regolano la proposta: usale in coerenza con il livello (G1) e con M1.
- Su Windows si usa `python` invece di `python3`.

## §4 Filtrare i risultati

Ogni proposta presa dalla banca dati passa dalle regole della skill prima di arrivare all'utente (aggiunta Kartello):

- **Palette**: ruoli colore, contrasti verificati e palette da non usare come prima scelta ([design-system.md](design-system.md) §2). Se il cliente ha colori di brand, vincono quelli.
- **Font**: scala e tabella tipografica da approvare (Fase 1, giro 4); i font devono avere una licenza adatta al web (la banca dati indica quella dei Google Fonts).
- **Stili**: sono opzioni (regola d'oro 4). Uno stile "di tendenza" (glassmorphism, neumorfismo, bento) si propone solo se serve al settore e al pubblico, e vale [contenuti-e-qualita.md](contenuti-e-qualita.md) §7.
- **Diversità tra siti**: la banca dati tende a dare le stesse risposte per lo stesso settore. Non ripetere palette e stile del sito precedente dello stesso settore ([effetti-impatto.md](effetti-impatto.md)).
- Nel brief, alla voce "Assunzioni", scrivi cosa viene dalla banca dati.
