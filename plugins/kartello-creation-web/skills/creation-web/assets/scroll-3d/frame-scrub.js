/* ============================================================================
   frame-scrub.js — Kartello Creation Web
   Effetto "3D scroll": una sequenza di fotogrammi disegnata su <canvas> in base
   allo scroll. Scorrendo in giù il film avanza, in su torna indietro.
   JavaScript puro, nessuna dipendenza. Compatibile con Lenis o con lo scroll nativo.

   MARKUP (una sezione per capitolo)
     <section id="capitolo-1" class="fs-section" style="height:500vh">
       <div class="fs-stage">
         <canvas aria-hidden="true"></canvas>
         <div class="fs-copy" data-in="0" data-out="0.3"><h2>…</h2></div>
         <div class="fs-copy" data-in="0.35" data-out="0.7"><p>…</p></div>
       </div>
     </section>

   CSS MINIMO
     .fs-section { position: relative; }
     .fs-stage   { position: sticky; top: 0; height: 100dvh; overflow: hidden; }
     .fs-stage canvas { display: block; width: 100%; height: 100%; }
     .fs-copy    { position: absolute; opacity: 0; transition: opacity 300ms var(--ease-fluid, ease-out); }

   USO
     mountFrameScrub({
       section: '#capitolo-1',
       frames: 200,                                   // numero di fotogrammi
       src: i => `/frames/spin/frame-${String(i).padStart(4, '0')}.webp`,   // i parte da 0
       poster: '/frames/spin/frame-0000.webp',        // facoltativo, di default il fotogramma 0
       bg: '#0a0a0a',                                 // colore dietro il fotogramma
       focusX: 0.5,                                   // facoltativo: 0 sinistra, 0.5 centro, 1 destra
       beats: [                                       // facoltativo: tappe (default: lineare)
         { from: 0,    to: 0.12, frame: 0 },          // fermo sul primo fotogramma
         { from: 0.12, to: 0.9,  frameFrom: 0, frameTo: 199 },
         { from: 0.9,  to: 1,    frame: 199 },        // fermo finale
       ],
       onProgress: (p, frame) => {},                  // per contatori e strumenti legati al film
     });

   Con prefers-reduced-motion la sequenza non si scarica: resta il poster e tutti
   i testi sono visibili.
   ========================================================================== */

function mountFrameScrub(cfg) {
  const section = typeof cfg.section === 'string' ? document.querySelector(cfg.section) : cfg.section;
  if (!section) return null;
  const stage = section.querySelector('.fs-stage') || section;
  const canvas = stage.querySelector('canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const copies = [...stage.querySelectorAll('[data-in][data-out]')];
  const N = cfg.frames;
  const bg = cfg.bg || '#000';
  const focusX = cfg.focusX == null ? 0.5 : cfg.focusX;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

  const images = new Array(N);
  let current = -1, target = 0, ticking = false, visible = true, destroyed = false;

  function cover(img) {
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) * focusX, (ch - dh) / 2, dw, dh);
  }

  function nearestLoaded(i) {
    for (let d = 0; d < N; d++) {
      const a = images[i - d], b = images[i + d];
      if (a && a.complete && a.naturalWidth) return a;
      if (b && b.complete && b.naturalWidth) return b;
    }
    return null;
  }

  function draw(i) {
    const img = nearestLoaded(i);
    if (img) cover(img);
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(current < 0 ? 0 : current);
  }

  function frameFor(p) {
    if (!cfg.beats || !cfg.beats.length) return Math.round(p * (N - 1));
    for (const b of cfg.beats) {
      if (p >= b.from && p <= b.to) {
        if (b.frame != null) return b.frame;
        const t = (p - b.from) / Math.max(1e-6, b.to - b.from);
        return Math.round(b.frameFrom + t * (b.frameTo - b.frameFrom));
      }
    }
    return p < cfg.beats[0].from ? 0 : N - 1;
  }

  function progress() {
    const rect = section.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    return travel > 0 ? clamp(-rect.top / travel) : 0;
  }

  function setCopy(p) {
    for (const el of copies) {
      const a = parseFloat(el.dataset.in), b = parseFloat(el.dataset.out);
      const on = reduce || (p >= a && p <= b);
      el.style.opacity = on ? '1' : '0';
      el.inert = !on;                       // i testi nascosti non ricevono clic né tab
      el.setAttribute('aria-hidden', on ? 'false' : 'true');
    }
  }

  function update() {
    ticking = false;
    if (!visible || destroyed) return;
    const p = progress();
    target = clamp(frameFor(p), 0, N - 1);
    if (target !== current) { current = target; draw(current); }
    setCopy(p);
    if (cfg.onProgress) cfg.onProgress(p, current);
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

  // Caricamento: prima il poster, poi tutti i fotogrammi con al massimo 6 richieste insieme,
  // partendo dal fotogramma più vicino a quello che serve adesso.
  const poster = new Image();
  poster.onload = () => { if (current < 0) cover(poster); };
  poster.src = cfg.poster || cfg.src(0);

  if (reduce) {
    resize();
    setCopy(1);
    addEventListener('resize', resize);
    return { destroy() { removeEventListener('resize', resize); } };
  }

  let next = 0, inFlight = 0;
  const order = [...Array(N).keys()];
  function pump() {
    while (inFlight < 6 && next < N && !destroyed) {
      order.sort((a, b) => Math.abs(a - target) - Math.abs(b - target));   // priorità al fotogramma che serve
      const i = order.shift(); next++;
      const img = new Image();
      inFlight++;
      img.onload = img.onerror = () => {
        inFlight--;
        if (i === current || current < 0) draw(current < 0 ? 0 : current);
        pump();
      };
      img.decoding = 'async';
      img.src = cfg.src(i);
      images[i] = img;
    }
  }

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) onScroll(); }, { rootMargin: '100% 0px' });
  io.observe(section);
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', resize);
  resize();
  pump();
  update();

  return {
    destroy() {
      destroyed = true;
      io.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', resize);
      images.forEach(img => { if (img) img.src = ''; });
    },
  };
}

if (typeof module !== 'undefined' && module.exports) module.exports = { mountFrameScrub };
if (typeof window !== 'undefined') window.mountFrameScrub = mountFrameScrub;
