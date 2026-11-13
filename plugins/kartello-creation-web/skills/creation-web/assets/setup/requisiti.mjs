#!/usr/bin/env node
// Controlla gli strumenti che servono alla skill e dice come installare quelli che mancano.
// Non installa nulla: l'installazione la fa la skill dopo il consenso dell'utente.
//
// Uso: node requisiti.mjs [--json]
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const qui = path.dirname(fileURLToPath(import.meta.url));
const { trovaRepository } = await import(path.join(qui, '..', 'template-repo', 'repository.mjs'));
const sistema = process.platform; // darwin, linux, win32

const esegui = (cmd) => {
  try { return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'], timeout: 15000 }).toString().trim(); } catch { return null; }
};
const trova = (nome) => esegui(sistema === 'win32' ? `where ${nome}` : `command -v ${nome}`)?.split('\n')[0] ?? null;
const versione = (v) => (v ?? '').match(/\d+(\.\d+){1,2}/)?.[0] ?? null;
const almeno = (v, min) => {
  const a = v.split('.').map(Number), b = min.split('.').map(Number);
  for (let i = 0; i < 3; i++) if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) > (b[i] ?? 0);
  return true;
};
const installa = (mac, linux, win) => (sistema === 'darwin' ? mac : sistema === 'win32' ? win : linux);

const controlli = [];
const aggiungi = (c) => controlli.push(c);

// Node.js: la skill vuole 18+; REA 6.8 vuole 22.23.4+, 24.22.1+ o 26.12.1+.
const nodeV = process.versions.node;
const [maggiore] = nodeV.split('.').map(Number);
const nodePerRea = (maggiore === 22 && almeno(nodeV, '22.23.4')) || (maggiore === 24 && almeno(nodeV, '24.22.1'))
  || (maggiore >= 26 && almeno(nodeV, '26.12.1')) || maggiore === 25 || maggiore > 26;
aggiungi({ id: 'node', nome: 'Node.js', serve: 'script della skill (analisi dei siti, ricerca nel catalogo)', obbligatorio: true,
  presente: maggiore >= 18, dettaglio: `versione ${nodeV}${nodePerRea ? '' : ' (troppo vecchia per REA: serve 24.22.1 o più recente)'}`,
  installa: installa('nvm install 24 (oppure brew install node)', 'nvm install 24', 'winget install OpenJS.NodeJS.LTS') });

const npm = trova('npm');
aggiungi({ id: 'npm', nome: 'npm', serve: 'installare Playwright, REA e le librerie dei siti', obbligatorio: true,
  presente: !!npm, dettaglio: npm ? `versione ${versione(esegui('npm --version'))}` : 'non trovato', installa: 'arriva insieme a Node.js' });

// Playwright: dal progetto corrente o dall'installazione globale, come fa analizza-sito.mjs.
let playwright = null, browserPlaywright = null;
const radiceGlobale = esegui('npm root -g');
for (const base of [path.join(process.cwd(), 'x.js'), radiceGlobale && path.join(radiceGlobale, 'x.js')].filter(Boolean)) {
  for (const nome of ['playwright', 'playwright-core']) {
    try {
      const file = createRequire(base).resolve(nome);
      playwright ??= { nome, file };
      const modulo = await import(pathToFileURL(file).href);
      const eseguibile = (modulo.chromium ?? modulo.default?.chromium)?.executablePath?.();
      if (eseguibile && fs.existsSync(eseguibile)) browserPlaywright ??= eseguibile;
    } catch {}
  }
}
aggiungi({ id: 'playwright', nome: 'Playwright', serve: 'analizzare i siti di esempio (foto, scroll, dati) e controllare i siti costruiti', obbligatorio: true,
  presente: !!playwright, dettaglio: playwright ? `${playwright.nome} trovato` : 'non trovato', installa: 'npm install -g playwright' });

const chromePossibili = {
  darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Chromium.app/Contents/MacOS/Chromium'],
  linux: ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge'],
  win32: ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'],
}[sistema] ?? [];
const chrome = process.env.CHROME_PATH || chromePossibili.find((p) => fs.existsSync(p)) || null;
aggiungi({ id: 'browser', nome: 'Browser per le analisi', serve: 'aprire i siti: Chromium di Playwright oppure Chrome o Edge già installati', obbligatorio: true,
  presente: !!(browserPlaywright || chrome), dettaglio: browserPlaywright ? 'Chromium di Playwright' : chrome ? `uso ${path.basename(chrome)}` : 'nessuno',
  installa: 'npx playwright install chromium', chrome });

const ffmpeg = trova('ffmpeg');
aggiungi({ id: 'ffmpeg', nome: 'ffmpeg', serve: 'video della scena d\'impatto, scroll cinematico e 3D scroll a fotogrammi', obbligatorio: false,
  presente: !!ffmpeg, dettaglio: ffmpeg ? `versione ${versione(esegui('ffmpeg -version'))}` : 'non trovato',
  installa: installa('brew install ffmpeg', 'sudo apt install ffmpeg', 'winget install Gyan.FFmpeg') });

const python = trova('python3') || trova('python');
aggiungi({ id: 'python', nome: 'Python 3', serve: 'scontorno delle immagini per lo scroll cinematico (knockout.py) e strumenti della repository', obbligatorio: false,
  presente: !!python, dettaglio: python ? `versione ${versione(esegui(`"${python}" --version`))}` : 'non trovato',
  installa: installa('brew install python', 'sudo apt install python3', 'winget install Python.Python.3.12') });

const rea = process.env.REA_BIN || trova('rea');
const reaV = rea ? versione(esegui(`"${rea}" --version`)) : null;
aggiungi({ id: 'rea', nome: 'REA (Reverse Engineer Anything)', serve: 'analisi profonda dei siti: codice, librerie e versioni, pagine interne, risorse 3D, font e audio', obbligatorio: false,
  presente: !!(rea && reaV), dettaglio: rea ? `versione ${reaV ?? 'sconosciuta'}${nodePerRea ? '' : ' (Node troppo vecchio: aggiorna Node prima)'}` : 'non trovato',
  installa: 'npm install -g rea-agents (con Node 24.22.1 o più recente)' });

// UI/UX Pro Max (banca dati di design): plugin di Claude Code o skill installata nel progetto o nella cartella utente.
function trovaFile(radice, fine, profondita = 10) {
  try {
    for (const voce of fs.readdirSync(radice, { withFileTypes: true })) {
      const p = path.join(radice, voce.name);
      if (voce.isFile() && p.endsWith(fine)) return p;
      if (voce.isDirectory() && profondita > 0 && !voce.name.startsWith('.git') && voce.name !== 'node_modules') {
        const trovato = trovaFile(p, fine, profondita - 1);
        if (trovato) return trovato;
      }
    }
  } catch {}
  return null;
}
const finaleUipro = path.join('ui-ux-pro-max', 'scripts', 'search.py');
const uipro = [path.join(process.cwd(), '.claude', 'skills', finaleUipro), path.join(os.homedir(), '.claude', 'skills', finaleUipro)].find((p) => fs.existsSync(p))
  || trovaFile(path.join(os.homedir(), '.claude', 'plugins'), finaleUipro);
aggiungi({ id: 'uipro', nome: 'UI/UX Pro Max (banca dati di design)', serve: 'proposte di stili, palette e font per settore e controlli di usabilità (references/banca-dati-design.md)', obbligatorio: false,
  presente: !!uipro, dettaglio: uipro ? `script di ricerca: ${uipro}` : 'non trovato', percorso: uipro,
  installa: 'dentro Claude Code: /plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill e poi /plugin install ui-ux-pro-max@ui-ux-pro-max-skill' });

// 21st.dev: server MCP configurato in Claude Code (configurazione utente o del progetto).
const configMcp = [path.join(os.homedir(), '.claude.json'), path.join(process.cwd(), '.mcp.json')].some((f) => {
  try { return /"21st[^"]*"\s*:/.test(fs.readFileSync(f, 'utf8')); } catch { return false; }
});
aggiungi({ id: '21st', nome: '21st.dev (componenti React)', serve: 'cercare e installare componenti React pronti (references/componenti-animati.md §10); serve un account', obbligatorio: false,
  presente: configMcp, dettaglio: configMcp ? 'server MCP configurato' : 'non configurato',
  installa: 'npx @21st-dev/cli@latest init --client claude --write e poi npx @21st-dev/cli@latest login' });

const repo = trovaRepository();
aggiungi({ id: 'repository', nome: 'Repository dei template', serve: 'template analizzati, catalogo dei siti premiati e tecniche apprese', obbligatorio: false,
  presente: !!repo, dettaglio: repo ? `${repo.radice} (${repo.fonte}${repo.versione < 2 ? ', solo libreria v1' : ''})` : 'non trovata',
  installa: 'imposta KARTELLO_TEMPLATE con il percorso della cartella, oppure crea il collegamento ~/.claude/kartello/template-siti (references/repository-template.md §1)' });

const mancanti = controlli.filter((c) => !c.presente);
if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ sistema, controlli, mancanti: mancanti.map((c) => c.id) }, null, 1));
} else {
  for (const c of controlli) console.log(`${c.presente ? '✓' : c.obbligatorio ? '✗' : '–'} ${c.nome}: ${c.dettaglio}`);
  if (mancanti.length) {
    console.log('\nDa installare (chiedi prima all\'utente):');
    for (const c of mancanti) console.log(`- ${c.nome}${c.obbligatorio ? '' : ' (facoltativo)'}: serve per ${c.serve}.\n  Comando: ${c.installa}`);
  } else {
    console.log('\nTutto pronto.');
  }
}
