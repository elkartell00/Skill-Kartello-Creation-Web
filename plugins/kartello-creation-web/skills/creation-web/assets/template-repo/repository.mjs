// Trova la Repository dei template (cartella separata dalla skill) e ne descrive le parti.
// Ordine: variabile KARTELLO_TEMPLATE → ~/.claude/kartello/template-siti → libreria della v1.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const PARTI = {
  indice: 'indice.json',                 // tutte le schede del catalogo, una riga per sito
  catalogo: 'Template JSON',             // <Categoria>/<Nome sito>/sito.json
  analizzati: 'Template Analizzati',     // INDICE.md, tipologie.md, <Categoria>/<Nome sito>/scheda.md
  tecniche: 'Tecniche Apprese',          // INDICE.md e una tecnica per file
};

const espandi = (p) => (p && p.startsWith('~') ? path.join(os.homedir(), p.slice(1)) : p);
const eRepository = (p) => {
  try {
    return fs.statSync(path.join(p, PARTI.analizzati)).isDirectory()
      && fs.existsSync(path.join(p, PARTI.indice));
  } catch { return false; }
};

export function trovaRepository() {
  const candidati = [
    ['variabile KARTELLO_TEMPLATE', espandi(process.env.KARTELLO_TEMPLATE)],
    ['collegamento ~/.claude/kartello/template-siti', path.join(os.homedir(), '.claude', 'kartello', 'template-siti')],
  ];
  for (const [fonte, p] of candidati) {
    if (p && eRepository(p)) return { radice: fs.realpathSync(p), fonte, versione: 2 };
  }
  // Libreria della versione 1 (solo esempi, senza catalogo né tecniche): ancora utilizzabile.
  for (const p of [espandi(process.env.KARTELLO_LIBRERIA), path.join(os.homedir(), '.claude', 'kartello', 'libreria-siti')]) {
    if (p && fs.existsSync(path.join(p, 'INDICE.md'))) return { radice: fs.realpathSync(p), fonte: 'libreria della versione 1', versione: 1 };
  }
  return null;
}

export const percorso = (repo, ...parti) => path.join(repo.radice, ...parti);
