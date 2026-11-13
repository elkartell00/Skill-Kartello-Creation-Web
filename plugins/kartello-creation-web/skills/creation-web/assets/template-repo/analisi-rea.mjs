#!/usr/bin/env node
// Analisi profonda di un sito con REA: risorse caricate, DOM, script, librerie e versioni, rotte.
// Completa analizza-sito.mjs (foto e misure) con ciò che si vede solo nel codice.
//
// Uso: node analisi-rea.mjs <url> <cartella-template> [--attesa 10]
// Scrive in <cartella-template>/rea/: evidenze.md, librerie.json, risorse.json, dom.html, analisi-script.json.
// Requisiti: REA (`rea`, Node 24.22.1+) e Chrome, Edge o Chromium installati.
// Dal codice si impara il metodo: gli script del sito restano in una cartella temporanea e non si copiano.
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';

const argv = process.argv.slice(2);
const [url, cartella] = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--attesa');
const attesa = (parseInt(argv[argv.indexOf('--attesa') + 1], 10) || 10) * 1000;
if (!url || !/^https?:\/\//.test(url) || !cartella) {
  console.error('Uso: node analisi-rea.mjs <url> <cartella-template> [--attesa 10]');
  process.exit(1);
}
const REA = process.env.REA_BIN || 'rea';
const uscita = path.join(path.resolve(cartella), 'rea');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kartello-rea-'));
fs.mkdirSync(uscita, { recursive: true });
const pausa = (ms) => new Promise((r) => setTimeout(r, ms));
const tempi = {};

function rea(args, file) {
  const t0 = Date.now();
  const r = spawnSync(REA, [...args, '--format', 'json'], { encoding: 'utf8', maxBuffer: 1 << 30, timeout: 600000 });
  tempi[args[0]] = Math.round((Date.now() - t0) / 1000);
  if (r.error) throw new Error(`REA non disponibile (${r.error.message}). Vedi references/requisiti.md.`);
  if (file) fs.writeFileSync(file, r.stdout);
  let risultato;
  try { risultato = JSON.parse(r.stdout); } catch { risultato = { errore: (r.stdout || r.stderr || '').slice(0, 400) }; }
  if (!risultato.evidence_id && args[0] !== 'list-browser-targets') {
    console.error(`  attenzione, ${args[0]} non riuscito: ${(risultato.message || risultato.errore || JSON.stringify(risultato)).slice(0, 300)}`);
  }
  return risultato;
}

function trovaChrome() {
  const possibili = {
    darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Chromium.app/Contents/MacOS/Chromium'],
    linux: ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge'],
    win32: ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'],
  }[process.platform] ?? [];
  const p = process.env.CHROME_PATH || possibili.find((x) => fs.existsSync(x));
  if (!p) throw new Error('Nessun Chrome, Edge o Chromium trovato. Imposta CHROME_PATH.');
  return p;
}
const portaLibera = () => new Promise((ok) => { const s = net.createServer().listen(0, () => { const p = s.address().port; s.close(() => ok(p)); }); });

// Firme delle librerie più usate nei siti premiati: [nome, presenza, versione (facoltativa)]
const FIRME = [
  ['Three.js', /__THREE__|THREE\.WebGLRenderer/, (s) => { const v = s.match(/revision:([A-Za-z_$][\w$]*)/)?.[1]; return (v && s.match(new RegExp(`[,;{(\\s]${v.replace('$', '\\$')}=["'](\\d{2,3})["']`))?.[1]) || s.match(/REVISION\s*=\s*["'](\d{2,3})["']/)?.[1]; }],
  ['GSAP', /GreenSock|gsap/, (s) => s.match(/GSAP (\d+\.\d+\.\d+)/)?.[1]],
  ['GSAP ScrollTrigger', /ScrollTrigger/], ['GSAP SplitText', /SplitText/], ['GSAP CustomEase', /CustomEase/],
  ['Lenis', /lenis/i], ['Locomotive Scroll', /LocomotiveScroll|locomotive-scroll/], ['Barba.js', /barba/i], ['Swup', /swup/i],
  ['Swiper', /swiper/i], ['Splide', /splide/i], ['Flickity', /Flickity/], ['Embla', /embla/i],
  ['PixiJS', /PIXI\.|pixi\.js/i], ['Babylon.js', /BABYLON\./], ['OGL', /from"ogl"|\bOGL\b/], ['Matter.js', /Matter\.Engine/],
  ['Lottie', /lottie|bodymovin/i], ['Rive', /@rive-app|rive\.wasm/i], ['Spline', /@splinetool|splinecode/i], ['Theatre.js', /@theatre\//],
  ['Draco', /draco/i], ['KTX2 / Basis', /KTX2|basis_transcoder/], ['Testo MSDF', /msdf/i],
  ['Howler', /howler|new Howl\(/i], ['Tone.js', /Tone\.Transport/], ['Web Audio', /AudioContext/],
  ['React', /react-dom|__REACT_DEVTOOLS_GLOBAL_HOOK__/], ['Next.js', /__NEXT_DATA__|\/_next\//], ['Vue', /__VUE__|__vue_app__/],
  ['Nuxt', /__NUXT__|\/_nuxt\//], ['Svelte', /__svelte/], ['Astro', /astro-island/], ['Framer Motion', /framer-motion/],
  ['Webflow', /webflow|data-wf-site/i], ['Framer', /framerusercontent|__framer/i], ['Shopify', /Shopify\.|cdn\.shopify\.com/],
  ['WordPress', /wp-content|wp-includes/], ['Tweakpane / lil-gui (debug)', /tweakpane|lil-gui|dat\.gui/i],
];

let chrome;
try {
  // 1. Cattura con REA in un browser suo: traffico di rete completo, DOM finale, console.
  console.log('1/3 Cattura della pagina con REA…');
  const scenario = {
    browser: { mode: 'launch', executable_path: trovaChrome() },
    start_url: { url },
    environment: { viewport: { width: 1440, height: 900, device_scale_factor: 1 }, reduced_motion: 'no-preference', color_scheme: 'no-preference' },
    actions: [{ step_id: 'caricamento', action: 'wait_for_timeout', duration_ms: attesa }],
    capture: { at_end: ['dom', 'url'], events: ['network', 'console', 'page-errors'] },
  };
  fs.writeFileSync(path.join(tmp, 'scenario.json'), JSON.stringify(scenario));
  let cattura = rea(['capture-browser-scenario', path.join(tmp, 'scenario.json')]);
  if (!cattura.evidence_id) {                       // errori di rete passeggeri: un secondo tentativo
    console.log('  nuovo tentativo…');
    cattura = rea(['capture-browser-scenario', path.join(tmp, 'scenario.json')]);
  }
  const nr = cattura.normalized_result ?? {};
  const eventi = nr.events?.items ?? [];
  const perTipo = {};
  for (const e of eventi.filter((e) => e.kind === 'request')) {
    const u = new URL(e.url.url);
    const ultimo = u.pathname.split('/').pop();
    const tipo = ultimo.includes('.') ? ultimo.split('.').pop().toLowerCase() : e.resource_type;
    (perTipo[tipo] ??= new Set()).add(u.origin === new URL(url).origin ? u.pathname : u.href);
  }
  const dom = nr.steps?.at(-1)?.artifacts?.dom?.value?.text ?? '';
  fs.writeFileSync(path.join(uscita, 'dom.html'), dom);
  fs.writeFileSync(path.join(uscita, 'risorse.json'), JSON.stringify({
    fonte: 'REA capture_browser_scenario, desktop 1440×900', evidence_id: cattura.evidence_id,
    totale_richieste: eventi.filter((e) => e.kind === 'request').length,
    per_tipo: Object.fromEntries(Object.entries(perTipo).sort((a, b) => b[1].size - a[1].size).map(([k, v]) => [k, [...v].sort()])),
  }, null, 1));
  const console_ = eventi.filter((e) => e.kind === 'console').map((e) => e.text).filter(Boolean).slice(0, 20);

  // 2. Chrome con porta di debug: REA esporta gli script e analizza il bundle.
  console.log('2/3 Script e bundle con REA…');
  const porta = await portaLibera();
  chrome = spawn(trovaChrome(), ['--headless=new', `--remote-debugging-port=${porta}`, '--remote-debugging-address=127.0.0.1',
    `--user-data-dir=${path.join(tmp, 'profilo')}`, '--window-size=1440,900', '--no-first-run', '--no-default-browser-check', url], { stdio: 'ignore' });
  const endpoint = `http://127.0.0.1:${porta}`;
  for (let i = 0; i < 30; i++) { try { await fetch(`${endpoint}/json/version`); break; } catch { await pausa(500); } }
  await pausa(attesa);
  const bersagli = rea(['list-browser-targets', endpoint]);
  const target = JSON.stringify(bersagli).match(/"target_id":"([A-F0-9]+)"/)?.[1];
  if (!target) throw new Error('Pagina non trovata nel browser di analisi.');
  const ispezione = path.join(tmp, 'ispezione.json');
  rea(['inspect-web-page', endpoint, target, '--include-script-sources', '--include-console-text', '--observation-ms', '1500', '--command-timeout-ms', '60000'], ispezione);
  const esportati = path.join(tmp, 'script');
  const esporta = rea(['export-web-scripts', ispezione, esportati]);
  const bundle = rea(['analyze-web-bundle', endpoint, target, '--observation-ms', '1500', '--command-timeout-ms', '60000'], path.join(uscita, 'analisi-script.json'));

  // 3. Librerie e versioni dal codice esportato (resta nella cartella temporanea).
  console.log('3/3 Librerie e versioni…');
  const sorgenti = [dom];
  const visita = (d) => fs.existsSync(d) && fs.readdirSync(d, { withFileTypes: true }).forEach((f) => {
    const p = path.join(d, f.name);
    if (f.isDirectory()) visita(p); else if (/\.(m?js|html?)$/.test(f.name)) sorgenti.push(fs.readFileSync(p, 'utf8'));
  });
  visita(esportati);
  const tutto = sorgenti.join('\n');
  const librerie = FIRME.filter(([, re]) => re.test(tutto)).map(([nome, , ver]) => ({ nome, versione: ver?.(tutto) ?? null }));
  const rotte = (bundle.normalized_result?.observations?.routes ?? []).map((r) => r.value);
  const script = (bundle.normalized_result?.observations?.chunks?.nodes ?? []).map((n) => ({ url: n.url, byte: n.bytes }));
  fs.writeFileSync(path.join(uscita, 'librerie.json'), JSON.stringify({ librerie, rotte, script, console: console_ }, null, 1));

  const riga = (op, ev, cosa) => `| ${op} | ${cosa} | \`${ev ?? '—'}\` | ${tempi[op.split(' ')[0]] ?? '—'} s |`;
  fs.writeFileSync(path.join(uscita, 'evidenze.md'), [
    `# Evidenze REA — ${url}`, '', `Analisi automatica del ${new Date().toLocaleDateString('it-IT')} (analisi-rea.mjs).`, '',
    '| Operazione REA | Cosa ha prodotto | Evidence ID | Tempo |', '|---|---|---|---|',
    riga('capture-browser-scenario', cattura.evidence_id, `${eventi.filter((e) => e.kind === 'request').length} richieste di rete, DOM, console`),
    riga('inspect-web-page', JSON.parse(fs.readFileSync(ispezione, 'utf8') || '{}').evidence_id, 'script della pagina'),
    riga('export-web-scripts', esporta.evidence_id, 'sorgenti per riconoscere le librerie (non copiati)'),
    riga('analyze-web-bundle', bundle.evidence_id, `${script.length} script, rotte: ${rotte.join(', ') || 'nessuna'}`),
    '', '## Librerie rilevate', '', ...librerie.map((l) => `- ${l.nome}${l.versione ? ` ${l.versione}` : ''}`), '',
    '## Risorse per tipo', '', ...Object.entries(perTipo).map(([k, v]) => `- ${k}: ${v.size}`), '',
    'Limiti: le librerie sono riconosciute da firme nel codice (possibili falsi positivi per nomi generici); la cattura vede solo la pagina iniziale e ciò che carica nei primi secondi.',
  ].join('\n'));
  console.log(`Fatto: ${uscita}\nLibrerie: ${librerie.map((l) => l.nome + (l.versione ? ' ' + l.versione : '')).join(', ') || 'nessuna'}`);
} catch (e) {
  console.error(`Analisi REA non completata: ${e.message}`);
  process.exitCode = 2;
} finally {
  chrome?.kill();
  await pausa(500);
  fs.rmSync(tmp, { recursive: true, force: true });
}
