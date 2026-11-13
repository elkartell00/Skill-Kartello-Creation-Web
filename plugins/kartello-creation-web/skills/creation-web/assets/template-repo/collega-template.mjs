#!/usr/bin/env node
// Collega (o scollega) un template analizzato alla sua scheda nel catalogo.
//
// Uso:
//   node collega-template.mjs <slug | indirizzo del sito> "Template Analizzati/<Categoria>/<Nome sito>/scheda.md"
//   node collega-template.mjs <slug | indirizzo del sito> --rimuovi
// Aggiorna il campo "template" in indice.json e nella sito.json del catalogo.
// Se il sito non è nel catalogo (un esempio nuovo), lo dice e non cambia nulla.
import fs from 'node:fs';
import path from 'node:path';
import { trovaRepository, percorso, PARTI } from './repository.mjs';

const [chi, destinazione] = process.argv.slice(2);
const rimuovi = destinazione === '--rimuovi';
if (!chi || (!destinazione && !rimuovi)) {
  console.error('Uso: node collega-template.mjs <slug | indirizzo> <percorso della scheda> | --rimuovi');
  process.exit(1);
}
const repo = trovaRepository();
if (!repo || repo.versione < 2) { console.error('Repository dei template non trovata.'); process.exit(1); }
if (!rimuovi && !fs.existsSync(percorso(repo, destinazione))) {
  console.error(`La scheda non esiste: ${destinazione}`);
  process.exit(1);
}

const pulito = (u) => (u ?? '').toLowerCase().replace(/^https?:\/\/(www\.)?/, '').replace(/\/+$/, '');
const scriviJson = (file, dati) => {             // scrittura atomica: mai un file a metà
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(dati, null, 1));
  fs.renameSync(tmp, file);
};

const fileIndice = percorso(repo, PARTI.indice);
const indice = JSON.parse(fs.readFileSync(fileIndice, 'utf8'));
const voce = indice.find((x) => x.slug === chi) ?? indice.find((x) => pulito(x.url) === pulito(chi));
if (!voce) {
  console.log(`"${chi}" non è nel catalogo: il template resta valido in Template Analizzati, senza collegamento.`);
  process.exit(0);
}
voce.template = rimuovi ? null : destinazione;
scriviJson(fileIndice, indice);

const scheda = path.join(repo.radice, voce.cartella, 'sito.json');
if (fs.existsSync(scheda)) {
  const s = JSON.parse(fs.readFileSync(scheda, 'utf8'));
  s.template = voce.template;
  scriviJson(scheda, s);
}
console.log(rimuovi ? `Scollegato: ${voce.titolo}` : `Collegato: ${voce.titolo} → ${destinazione}`);
