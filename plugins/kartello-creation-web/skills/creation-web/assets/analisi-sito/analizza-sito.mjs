#!/usr/bin/env node
// Analisi di un sito di esempio per la libreria della skill (Kartello Creation Web).
// Apre il sito come un visitatore (desktop e mobile), fotografa l'apertura e ogni passo
// dello scroll, raccoglie struttura, tipografia, colori, immagini, video, 3D e librerie.
// Serve a imparare il metodo, non a copiare: testi, immagini, loghi e codice non si riusano.
//
// Uso:  node analizza-sito.mjs <url> [cartella-output] [--passi 40] [--solo-desktop] [--video]
// Requisiti: Node 18+ e Playwright (npm install -g playwright). Usa il Chromium di Playwright
// o, se manca, Chrome o Edge già installati.

import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const argv = process.argv.slice(2);
const flag = n => argv.includes(n);
const opt = (n, d) => { const i = argv.indexOf(n); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const pos = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1] === '--passi'));
const url = pos[0];
if (!url || !/^https?:\/\//.test(url)) {
  console.error('Uso: node analizza-sito.mjs <url http/https> [cartella-output] [--passi 40] [--solo-desktop] [--video]');
  process.exit(1);
}
const slug = new URL(url).hostname.replace(/^www\./, '').replace(/[^a-z0-9]+/gi, '-')
  + (new URL(url).pathname.replace(/[^a-z0-9]+/gi, '-').replace(/-+$/, '') || '');
const outDir = path.resolve(pos[1] || path.join(os.tmpdir(), 'kartello-analisi', slug));
const maxPassi = Math.max(5, parseInt(opt('--passi', '40'), 10) || 40);

// Playwright: dal progetto corrente, dalla cartella dello script o dall'installazione globale.
async function caricaPlaywright() {
  const basi = [path.join(process.cwd(), 'x.js'), import.meta.url];
  try { basi.push(path.join(execSync('npm root -g', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(), 'x.js')); } catch {}
  for (const base of basi) {
    for (const nome of ['playwright', 'playwright-core', '@playwright/test']) {
      try { return await import(pathToFileURL(createRequire(base).resolve(nome)).href); } catch {}
    }
  }
  console.error('Playwright non trovato. Installalo una volta: npm install -g playwright');
  process.exit(2);
}

async function avviaBrowser(chromium) {
  let errore;
  for (const o of [{}, { channel: 'chrome' }, { channel: 'msedge' }]) {
    try { return await chromium.launch(o); } catch (e) { errore ??= e; }
  }
  console.error(`Nessun browser disponibile (${errore?.message.split('\n')[0]}). Installa Chromium: npx playwright install chromium`);
  process.exit(3);
}

const attesa = ms => new Promise(r => setTimeout(r, ms));

async function chiudiCookie(page) {
  const re = /^(accetta( tutti| tutto)?|accept( all)?|allow( all)?|consenti( tutti)?|agree|i agree|ok|got it|ho capito|va bene)$/i;
  try {
    const b = page.locator('button, a[role="button"], [role="button"]').filter({ hasText: re }).first();
    if (await b.isVisible({ timeout: 1500 })) { await b.click({ timeout: 1500 }); await attesa(600); }
  } catch {}
}

// Unisce le miniature dei passi in un'unica immagine di panoramica.
async function panoramica(browser, files, colonne, larghezza, destinazione) {
  if (!files.length) return;
  const page = await browser.newPage({ viewport: { width: colonne * larghezza + 8 * (colonne + 1), height: 600 } });
  const celle = files.map((f, i) => `<figure><img src="data:image/jpeg;base64,${fs.readFileSync(f).toString('base64')}"><figcaption>${path.basename(f, '.jpg')}</figcaption></figure>`).join('');
  await page.setContent(`<style>body{margin:0;padding:8px;background:#111;font:12px sans-serif;color:#ddd;display:grid;grid-template-columns:repeat(${colonne},${larghezza}px);gap:8px}figure{margin:0}img{width:100%;display:block;border:1px solid #333}figcaption{padding:2px 0}</style>${celle}`);
  await page.waitForLoadState('load');
  await page.screenshot({ path: destinazione, fullPage: true, type: 'jpeg', quality: 70 });
  await page.close();
}

// Raccolta dei dati nella pagina (gira nel browser).
function raccogli() {
  const vw = innerWidth, vh = innerHeight;
  const cs = el => getComputedStyle(el);
  const visibile = el => { const r = el.getBoundingClientRect(); const s = cs(el); return r.width > 2 && r.height > 2 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const y = el => Math.round(el.getBoundingClientRect().top + scrollY);
  const testo = (s, n = 100) => (s || '').replace(/\s+/g, ' ').trim().slice(0, n);
  const trasparente = c => !c || c === 'transparent' || /rgba\([^)]*,\s*0\)$/.test(c);
  const conta = (m, k, v = 1) => { if (k) m[k] = (m[k] || 0) + v; };
  const top = (m, n) => Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ valore: k, peso: Math.round(v) }));
  const tutti = [document.documentElement, document.body, ...document.querySelectorAll('body *')].slice(0, 6000);

  const meta = {
    titolo: document.title,
    descrizione: document.querySelector('meta[name="description"]')?.content || '',
    lingua: document.documentElement.lang,
    generatore: document.querySelector('meta[name="generator"]')?.content || '',
    datiStrutturati: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(s => { try { const j = JSON.parse(s.textContent); return [].concat(j['@graph'] || j).map(x => x['@type']); } catch { return []; } }),
    altezzaPagina: document.documentElement.scrollHeight,
    schermateDiAltezza: +(document.documentElement.scrollHeight / vh).toFixed(1),
  };

  const titoli = [...document.querySelectorAll('h1,h2,h3')].filter(visibile).slice(0, 60)
    .map(h => ({ livello: h.tagName, testo: testo(h.innerText, 90), y: y(h) }));

  const stileTesto = el => { const s = cs(el); return { font: s.fontFamily.split(',')[0].replace(/["']/g, ''), dimensione: s.fontSize, peso: s.fontWeight, interlinea: s.lineHeight, spaziatura: s.letterSpacing, maiuscole: s.textTransform, stile: s.fontStyle, colore: s.color }; };
  const tipografia = {};
  for (const sel of ['h1', 'h2', 'h3', 'h4', 'p', 'a', 'button', 'li']) {
    const el = [...document.querySelectorAll(sel)].find(e => visibile(e) && testo(e.innerText));
    if (el) tipografia[sel] = stileTesto(el);
  }
  const testiGrandi = tutti.filter(e => e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1) && visibile(e))
    .map(e => ({ e, px: parseFloat(cs(e).fontSize) })).sort((a, b) => b.px - a.px);
  tipografia.testoPiuGrande = testiGrandi[0] ? { ...stileTesto(testiGrandi[0].e), esempio: testo(testiGrandi[0].e.innerText, 40) } : null;
  tipografia.rapportoTitoloTesto = tipografia.h1 && tipografia.p ? +(parseFloat(tipografia.h1.dimensione) / parseFloat(tipografia.p.dimensione)).toFixed(1) : null;
  const fontCaricati = [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family.replace(/["']/g, '')} ${f.weight} ${f.style}`))].slice(0, 20);

  const sfondi = {}, colori = {}, raggi = {}, ombre = {}, larghezze = {};
  let blur = 0, gradienti = 0, sticky = 0, fixed = 0, animazioniCss = 0, transizioni = 0, willChange = 0, trasformati = 0;
  for (const e of tutti) {
    const s = cs(e), r = e.getBoundingClientRect();
    const area = Math.min(r.width, vw) * Math.min(r.height, vh * 3);
    if (r.width < 2 || r.height < 2) continue;
    if (!trasparente(s.backgroundColor)) conta(sfondi, s.backgroundColor, area / 1000);
    if (s.backgroundImage.includes('gradient')) gradienti++;
    if ([...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) conta(colori, s.color, e.innerText.length);
    if (s.borderRadius !== '0px') conta(raggi, s.borderRadius);
    if (s.boxShadow !== 'none') conta(ombre, s.boxShadow.slice(0, 60));
    if (s.backdropFilter && s.backdropFilter !== 'none') blur++;
    if (s.position === 'sticky') sticky++;
    if (s.position === 'fixed') fixed++;
    if (s.animationName !== 'none') animazioniCss++;
    if (parseFloat(s.transitionDuration) > 0) transizioni++;
    if (s.willChange !== 'auto') willChange++;
    if (s.transform !== 'none') trasformati++;
    if (s.marginLeft === s.marginRight && parseFloat(s.marginLeft) > 16 && s.maxWidth !== 'none') conta(larghezze, s.maxWidth);
  }

  // Sezioni: figli diretti del contenitore principale, scendendo nei contenitori unici.
  let radice = document.querySelector('main') || document.body;
  while (radice.children.length === 1 && radice.children[0].getBoundingClientRect().height > vh) radice = radice.children[0];
  const sezioni = [...radice.children].filter(e => visibile(e) && e.getBoundingClientRect().height > vh * 0.25).slice(0, 40).map(e => {
    const s = cs(e), r = e.getBoundingClientRect();
    const h = e.querySelector('h1,h2,h3');
    const media = [...e.querySelectorAll('img,video,canvas')].filter(visibile);
    return {
      tag: e.tagName.toLowerCase(), id: e.id || '', classi: testo(typeof e.className === 'string' ? e.className : '', 60),
      y: y(e), altezza: Math.round(r.height), altezzaSchermate: +(r.height / vh).toFixed(1),
      sfondo: s.backgroundColor, sfondoImmagine: s.backgroundImage !== 'none', paddingVerticale: `${s.paddingTop} ${s.paddingBottom}`,
      titolo: h ? testo(h.innerText, 80) : '',
      immagini: e.querySelectorAll('img').length, video: e.querySelectorAll('video').length, canvas: e.querySelectorAll('canvas').length, svg: e.querySelectorAll('svg').length,
      mediaATuttaLarghezza: media.some(m => m.getBoundingClientRect().width >= vw * 0.9),
      bloccata: !!e.querySelector('.pin-spacer') || e.classList.contains('pin-spacer') || [...e.querySelectorAll('*')].slice(0, 400).some(c => cs(c).position === 'sticky'),
      griglia: (() => { const g = [...e.querySelectorAll('*')].slice(0, 300).find(c => ['grid', 'flex'].includes(cs(c).display) && c.children.length > 1 && c.getBoundingClientRect().width > vw * 0.5); return g ? { tipo: cs(g).display, colonne: cs(g).gridTemplateColumns !== 'none' ? cs(g).gridTemplateColumns.split(' ').length : g.children.length } : null; })(),
    };
  });

  const intestazione = (() => {
    const h = document.querySelector('header') || document.querySelector('nav');
    if (!h) return null; const s = cs(h);
    return { posizione: s.position, altezza: Math.round(h.getBoundingClientRect().height), sfondo: s.backgroundColor, sfocatura: s.backdropFilter, voci: h.querySelectorAll('a').length };
  })();

  const bottoni = [...document.querySelectorAll('a, button')].filter(b => { const s = cs(b); return visibile(b) && (!trasparente(s.backgroundColor) || parseFloat(s.borderTopWidth) > 0) && testo(b.innerText).length > 1 && testo(b.innerText).length < 40; })
    .slice(0, 6).map(b => { const s = cs(b); return { testo: testo(b.innerText, 30), sfondo: s.backgroundColor, colore: s.color, bordo: `${s.borderTopWidth} ${s.borderTopColor}`, raggio: s.borderRadius, padding: s.padding, dimensione: s.fontSize, maiuscole: s.textTransform }; });

  const imgs = [...document.querySelectorAll('img')].filter(visibile);
  const immagini = {
    totale: imgs.length,
    aTuttaLarghezza: imgs.filter(i => i.getBoundingClientRect().width >= vw * 0.9).length,
    conRaggio: imgs.filter(i => cs(i).borderRadius !== '0px').length,
    conFiltri: imgs.filter(i => cs(i).filter !== 'none' || cs(i).mixBlendMode !== 'normal').length,
    formati: imgs.reduce((m, i) => { conta(m, ((i.currentSrc || i.src).split('?')[0].match(/\.(\w{3,4})$/) || [, 'altro'])[1].toLowerCase()); return m; }, {}),
    sfondiCss: tutti.filter(e => /url\(/.test(cs(e).backgroundImage)).length,
    esempi: imgs.slice(0, 25).map(i => { const r = i.getBoundingClientRect(); return { y: y(i), larghezza: Math.round(r.width), altezza: Math.round(r.height), proporzione: +(r.width / r.height).toFixed(2), adattamento: cs(i).objectFit, raggio: cs(i).borderRadius, alt: !!i.alt }; }),
  };
  const video = [...document.querySelectorAll('video')].slice(0, 10).map(v => ({ src: (v.currentSrc || v.querySelector('source')?.src || '').split('?')[0].slice(-80), autoplay: v.autoplay, loop: v.loop, muto: v.muted, controlli: v.controls, y: y(v), larghezza: Math.round(v.getBoundingClientRect().width), durata: isFinite(v.duration) ? Math.round(v.duration) : null }));
  const canvas = [...document.querySelectorAll('canvas')].filter(visibile).slice(0, 10).map(c => {
    let tipo = 'sconosciuto';
    try { tipo = c.getContext('2d') ? '2d' : 'webgl'; } catch {}
    const r = c.getBoundingClientRect();
    return { tipo, larghezza: Math.round(r.width), altezza: Math.round(r.height), y: y(c), fisso: cs(c).position === 'fixed' };
  });
  const svgInline = document.querySelectorAll('svg').length;
  const svgAnimati = [...document.querySelectorAll('svg')].filter(s => s.querySelector('animate, animateTransform, animateMotion') || [...s.querySelectorAll('path')].some(p => cs(p).strokeDasharray !== 'none')).length;

  const html = document.documentElement, src = [...document.scripts].map(s => s.src).join(' ').toLowerCase();
  const w = window;
  const librerie = Object.entries({
    GSAP: !!w.gsap || /gsap|greensock|tweenmax/.test(src),
    ScrollTrigger: !!w.ScrollTrigger || !!document.querySelector('.pin-spacer') || /scrolltrigger/.test(src),
    Lenis: !!w.lenis || !!w.Lenis || html.classList.contains('lenis') || /lenis/.test(src),
    'Locomotive Scroll': !!document.querySelector('[data-scroll-container]') || html.classList.contains('has-scroll-smooth'),
    'Three.js': !!w.THREE || !!w.__THREE__ || /three(\.module)?(\.min)?\.js|three@/.test(src),
    'PixiJS': !!w.PIXI, OGL: /\bogl\b/.test(src), Spline: !!document.querySelector('spline-viewer') || /splinetool|spline\.design/.test(src),
    Lottie: !!w.lottie || !!w.bodymovin || !!document.querySelector('lottie-player, dotlottie-player, dotlottie-wc'), Rive: !!w.rive || /rive/.test(src),
    Barba: !!document.querySelector('[data-barba]'), Swup: !!w.swup || !!document.querySelector('#swup'),
    Swiper: !!document.querySelector('.swiper'), Splide: !!document.querySelector('.splide'),
    AOS: !!document.querySelector('[data-aos]'), 'Testo spezzato (SplitText/Splitting)': document.querySelectorAll('.char, .word, [data-split], .split-line').length > 20,
    'Anime.js': !!w.anime, 'Motion/Framer Motion': /framer-motion|motion\.dev/.test(src),
    Framer: !!document.querySelector('[data-framer-name], [data-framer-component-type]'), Webflow: html.hasAttribute('data-wf-site'),
    WordPress: /wp-content|wp-includes/.test(document.documentElement.innerHTML.slice(0, 200000)), Shopify: !!w.Shopify, Wix: !!w.wixBiSession, Squarespace: !!w.Squarespace,
    'Next.js': !!w.__NEXT_DATA__ || /\/_next\//.test(src), Nuxt: !!w.__NUXT__, Astro: !!document.querySelector('astro-island'),
    'View Transitions': [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => /view-transition/.test(r.cssText)); } catch { return false; } }),
  }).filter(([, v]) => v).map(([k]) => k);

  const movimento = {
    elementiSticky: sticky, elementiFissi: fixed, pinSpacer: document.querySelectorAll('.pin-spacer').length,
    animazioniCss, elementiConTransizione: transizioni, willChange, elementiTrasformati: trasformati,
    attributiScroll: document.querySelectorAll('[data-scroll], [data-speed], [data-lag], [data-aos], [data-animate], [data-reveal]').length,
    sfocatureVetro: blur, gradienti, svgAnimati,
  };

  return {
    meta, titoli, tipografia, fontCaricati,
    colori: { sfondi: top(sfondi, 8), testi: top(colori, 6) },
    raggi: top(raggi, 6), ombre: top(ombre, 4), larghezzeContenuto: top(larghezze, 4),
    intestazione, bottoni, sezioni, immagini, video, canvas, svg: { inline: svgInline, animati: svgAnimati }, librerie, movimento,
  };
}

async function analizzaVista(browser, nome, contesto, rete) {
  const dir = path.join(outDir, nome);
  fs.mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({ ...contesto, ...(flag('--video') && nome === 'desktop' ? { recordVideo: { dir, size: contesto.viewport } } : {}) });
  const page = await ctx.newPage();
  if (rete) page.on('response', r => {
    const req = r.request(), t = req.resourceType(), u = r.url();
    rete.richieste++;
    conta(rete.tipi, t);
    const len = +(r.headers()['content-length'] || 0); rete.byte += len;
    try { conta(rete.domini, new URL(u).hostname); } catch {}
    if (t === 'media' || /\.(mp4|webm|m3u8|mov)(\?|$)/i.test(u)) rete.media.add(u.split('?')[0].slice(-100));
    if (t === 'font') rete.font.add(u.split('?')[0].split('/').pop());
    if (t === 'script') rete.script.add(u.split('?')[0].split('/').pop());
    if (/\D\d{3,5}\.(webp|jpe?g|png|avif)(\?|$)/i.test(u)) rete.sequenzaFotogrammi++;
  });
  const { width: vw, height: vh } = contesto.viewport;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  } catch (e) { console.error(`[${nome}] apertura non riuscita: ${e.message.split('\n')[0]}`); await ctx.close(); return null; }

  // Apertura: quattro fotogrammi per vedere loader e animazioni d'ingresso.
  const intro = [];
  for (const [i, ms] of [[0, 300], [1, 900], [2, 1800], [3, 3000]].map(([i, t], k, a) => [i, t - (k ? a[k - 1][1] : 0)])) {
    await attesa(ms);
    const f = path.join(dir, `apertura-${i}.jpg`);
    await page.screenshot({ path: f, type: 'jpeg', quality: 60 });
    intro.push(f);
  }
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await chiudiCookie(page);
  await page.mouse.move(vw / 2, vh / 2);

  // Scroll a passi, come un visitatore (rotella), con una foto per passo.
  const passi = [];
  const altezza0 = await page.evaluate(() => document.documentElement.scrollHeight);
  const passo = Math.max(Math.round(vh * 0.7), Math.round(altezza0 / maxPassi));
  let ultimoY = -1, fermo = 0;
  for (let i = 0; i < maxPassi; i++) {
    const yAttuale = await page.evaluate(() => scrollY);
    const f = path.join(dir, `passo-${String(i).padStart(2, '0')}.jpg`);
    await page.screenshot({ path: f, type: 'jpeg', quality: 60 });
    passi.push({ file: path.basename(f), scrollY: Math.round(yAttuale) });
    const fine = await page.evaluate(() => scrollY + innerHeight >= document.documentElement.scrollHeight - 4);
    if (fine) break;
    await page.mouse.wheel(0, passo);
    await attesa(900);
    let nuovoY = await page.evaluate(() => scrollY);
    if (Math.abs(nuovoY - yAttuale) < 4) { await page.evaluate(d => scrollBy(0, d), passo); await attesa(700); nuovoY = await page.evaluate(() => scrollY); }
    if (Math.abs(nuovoY - ultimoY) < 4) { if (++fermo >= 2) break; } else fermo = 0;
    ultimoY = nuovoY;
  }
  await page.evaluate(() => scrollTo(0, 0));
  await attesa(800);
  const dati = await page.evaluate(raccogli).catch(e => ({ errore: e.message }));
  await ctx.close();
  const files = passi.map(p => path.join(dir, p.file));
  await panoramica(browser, files, nome === 'desktop' ? 4 : 6, nome === 'desktop' ? 340 : 160, path.join(outDir, `panoramica-${nome}.jpg`));
  await panoramica(browser, intro, 4, nome === 'desktop' ? 340 : 160, path.join(outDir, `apertura-${nome}.jpg`));
  return { viewport: contesto.viewport, passoScroll: passo, passi, dati };
}

function conta(m, k, v = 1) { if (k) m[k] = (m[k] || 0) + v; }

const pw = await caricaPlaywright();
const chromium = pw.chromium || pw.default?.chromium;
fs.mkdirSync(outDir, { recursive: true });
const browser = await avviaBrowser(chromium);
const rete = { richieste: 0, byte: 0, tipi: {}, domini: {}, media: new Set(), font: new Set(), script: new Set(), sequenzaFotogrammi: 0 };
const desktop = await analizzaVista(browser, 'desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }, rete);
const mobile = flag('--solo-desktop') ? null : await analizzaVista(browser, 'mobile', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }, null);
await browser.close();
if (!desktop) process.exit(4);

const risultato = {
  url, analizzatoIl: new Date().toISOString(),
  avvertenza: 'Dati per imparare struttura, layout, grafica, immagini e movimento. Testi, immagini, loghi, codice, colori e font di questo sito non si copiano.',
  desktop, mobile,
  rete: {
    richieste: rete.richieste, pesoNotoMB: +(rete.byte / 1048576).toFixed(1), tipi: rete.tipi,
    dominiPrincipali: Object.entries(rete.domini).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([d, n]) => `${d} (${n})`),
    media: [...rete.media].slice(0, 15), fileFont: [...rete.font].slice(0, 15), script: [...rete.script].slice(0, 40),
    probabileSequenzaDiFotogrammi: rete.sequenzaFotogrammi > 30,
  },
};
fs.writeFileSync(path.join(outDir, 'analisi.json'), JSON.stringify(risultato, null, 2));
console.log(`Analisi completata: ${outDir}`);
console.log(`- panoramica-desktop.jpg e apertura-desktop.jpg (${desktop.passi.length} passi)` + (mobile ? `\n- panoramica-mobile.jpg e apertura-mobile.jpg (${mobile.passi.length} passi)` : ''));
console.log(`- analisi.json · librerie rilevate: ${desktop.dati.librerie?.join(', ') || 'nessuna'}`);
