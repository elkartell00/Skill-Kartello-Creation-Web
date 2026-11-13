#!/usr/bin/env node
// Cerca nel catalogo della Repository dei template senza caricarlo nel contesto.
//
// Uso:
//   node cerca-template.mjs --categorie                       elenco delle categorie con il numero di siti
//   node cerca-template.mjs --categoria "food" [opzioni]      i migliori siti di una o più categorie
// Opzioni:
//   --categoria <testo>   ripetibile; confronta con il nome della categoria (es. "food", "salute")
//   --tag <testo>         ripetibile; tutti richiesti (es. WebGL, GSAP, Minimal, Shopify)
//   --testo <parola>      nel titolo o nell'indirizzo
//   --premiati            solo con SOTY, SOTM, SOTD o Developer
//   --dal <anno>          solo dall'anno indicato in poi
//   --online              solo siti che rispondono ancora
//   --analizzati          solo siti con un template completo in Template Analizzati
//   --limite <n>          quanti risultati (predefinito 10)
//   --json                risultato in JSON
import fs from 'node:fs';
import { trovaRepository, percorso, PARTI } from './repository.mjs';

const argv = process.argv.slice(2);
const tutti = (n) => argv.flatMap((a, i) => (a === n && argv[i + 1] ? [argv[i + 1]] : []));
const uno = (n, d) => tutti(n)[0] ?? d;
const flag = (n) => argv.includes(n);

const repo = trovaRepository();
if (!repo || repo.versione < 2) {
  console.error('Repository dei template non trovata (serve la versione 2 con indice.json). Vedi references/repository-template.md §1.');
  process.exit(1);
}
const indice = JSON.parse(fs.readFileSync(percorso(repo, PARTI.indice), 'utf8'));
const categoriaDi = (x) => x.cartella.split('/')[1] ?? x.settore;
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

if (flag('--categorie')) {
  const conta = {};
  for (const x of indice) {
    const c = categoriaDi(x);
    conta[c] ??= { siti: 0, analizzati: 0 };
    conta[c].siti++;
    if (x.template) conta[c].analizzati++;
  }
  const righe = Object.entries(conta).sort((a, b) => b[1].siti - a[1].siti);
  if (flag('--json')) console.log(JSON.stringify(Object.fromEntries(righe), null, 1));
  else for (const [c, n] of righe) console.log(`${String(n.siti).padStart(5)} siti  ${String(n.analizzati).padStart(3)} analizzati  ${c}`);
  process.exit(0);
}

const categorie = tutti('--categoria').map(norm);
const tag = tutti('--tag').map(norm);
const testo = norm(uno('--testo', ''));
const dal = parseInt(uno('--dal', '0'), 10) || 0;
const limite = parseInt(uno('--limite', '10'), 10) || 10;
const PREMI = { SOTY: 0, SOTM: 1, SOTD: 2, DEV: 3, AH: 4, HM: 5 };
const migliorPremio = (x) => Math.min(9, ...x.premi.map((p) => PREMI[p] ?? 9));

const risultati = indice.filter((x) =>
  (!categorie.length || categorie.some((c) => norm(categoriaDi(x)).includes(c) || norm(x.settore).includes(c)))
  && tag.every((t) => x.tag.some((v) => norm(v).includes(t)))
  && (!testo || norm(`${x.titolo} ${x.url ?? ''}`).includes(testo))
  && (!flag('--premiati') || x.premi.some((p) => ['SOTY', 'SOTM', 'SOTD', 'DEV'].includes(p)))
  && (x.anno ?? 0) >= dal
  && (!flag('--online') || x.online)
  && (!flag('--analizzati') || x.template),
).sort((a, b) => (!!b.template - !!a.template) || (b.anno - a.anno) || (migliorPremio(a) - migliorPremio(b)))
  .slice(0, limite);

if (flag('--json')) {
  console.log(JSON.stringify(risultati, null, 1));
} else if (!risultati.length) {
  console.log('Nessun sito trovato con questi filtri. Allarga la ricerca (meno tag, anno più vecchio, senza --online).');
} else {
  for (const x of risultati) {
    console.log(`- ${x.titolo} (${x.anno}${x.premi.length ? ', ' + x.premi.join(' ') : ''}${x.online ? '' : ', offline'})`
      + `${x.template ? ' · TEMPLATE ANALIZZATO' : ''}\n  ${x.url}\n  tag: ${x.tag.slice(0, 8).join(', ') || '—'}`
      + `\n  ${x.template ?? x.cartella + '/sito.json'}`);
  }
}
