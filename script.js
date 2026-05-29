/* ════════════════════════════════════════════════════
   TALAL AKHTAR — PORTFOLIO JS
   ════════════════════════════════════════════════════ */

/* ── Loader ──────────────────────────────────────── */
(function () {
  const loader  = document.getElementById('loader');
  const counter = document.getElementById('lcount');
  const bar     = document.getElementById('lbar');
  let count = 0;
  const step = 1000 / 60;
  const inc  = 100 / (1800 / step);

  const iv = setInterval(() => {
    count = Math.min(100, count + inc + Math.random() * inc * 0.4);
    const n = Math.floor(count);
    counter.textContent = n;
    bar.style.width = n + '%';
    if (n >= 100) {
      clearInterval(iv);
      counter.textContent = '100';
      bar.style.width = '100%';
      setTimeout(() => {
        loader.style.transition = 'transform 0.9s cubic-bezier(0.76,0,0.24,1), opacity 0.5s';
        loader.style.transform  = 'translateY(-100%)';
        loader.style.opacity    = '0';
        setTimeout(() => loader.remove(), 950);
      }, 260);
    }
  }, step);
})();

/* ── Custom Cursor ───────────────────────────────── */
(function () {
  const cur  = document.getElementById('cur');
  const dot  = cur.querySelector('.c-dot');
  const ring = cur.querySelector('.c-ring');

  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    cur.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
})();

/* ── Topbar pin ──────────────────────────────────── */
(function () {
  const bar = document.getElementById('topbar');
  window.addEventListener('scroll', () =>
    bar.classList.toggle('pinned', window.scrollY > 60),
    { passive: true }
  );
})();

/* ── Scroll Reveal ───────────────────────────────── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('on');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.rv').forEach(el => obs.observe(el));

  /* Skill cards stagger */
  const cobs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      setTimeout(() => e.target.classList.add('on'), i * 110);
      cobs.unobserve(e.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.sk-card').forEach(c => cobs.observe(c));
})();

/* ── Hero watermark parallax ─────────────────────── */
(function () {
  const wm = document.querySelector('.hero-watermark');
  if (!wm) return;
  window.addEventListener('scroll', () => {
    wm.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.3}px))`;
  }, { passive: true });
})();

/* ── Mobile nav toggle ─────────────────────────── */
(function () {
  const topbar = document.getElementById('topbar');
  const toggle = document.getElementById('nav-toggle');
  if (!topbar || !toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = topbar.classList.toggle('mobile-open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  topbar.querySelectorAll('.tb-nav a').forEach(link => {
    link.addEventListener('click', () => topbar.classList.remove('mobile-open'));
  });
})();
