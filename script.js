
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
const isTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

/* ══════════════════════════════════════════════════
   LOADER
══════════════════════════════════════════════════ */
(function loader() {
  const wrap = $('loader'), bar = $('lbar'), cnt = $('lcount');
  let n = 0;
  const step = 1000 / 60;
  const inc  = 100 / (1600 / step);

  const iv = setInterval(() => {
    n = Math.min(100, n + inc + Math.random() * inc * 0.5);
    const v = Math.floor(n);
    cnt.textContent = v;
    bar.style.width = v + '%';

    if (v >= 100) {
      clearInterval(iv);
      cnt.textContent = '100';
      bar.style.width  = '100%';
      setTimeout(() => {
        wrap.style.cssText = 'transition:opacity .6s ease,transform .8s cubic-bezier(.76,0,.24,1);opacity:0;transform:translateY(-100%)';
        setTimeout(() => { wrap.remove(); heroReveal(); }, 820);
      }, 300);
    }
  }, step);
})();

function heroReveal() {
  $$('#hero .reveal, #hero .reveal-word').forEach((el, i) =>
    setTimeout(() => el.classList.add('visible'), i * 80)
  );
}

/* ══════════════════════════════════════════════════
   CUSTOM CURSOR  (desktop only)
══════════════════════════════════════════════════ */
(function cursor() {
  if (isTouch()) {
    const c = $('cursor');
    if (c) { c.style.display = 'none'; document.body.style.cursor = 'auto'; }
    return;
  }
  const dot = document.querySelector('.cur-dot');
  const ring = document.querySelector('.cur-outline');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  (function loop() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
})();

/* ══════════════════════════════════════════════════
   NAV — scroll state + active link
══════════════════════════════════════════════════ */
(function nav() {
  const nav = $('nav');

  /* Scroll glass effect */
  window.addEventListener('scroll', () =>
    nav.classList.toggle('scrolled', scrollY > 50), { passive: true }
  );

  /* Active section highlight */
  const links = $$('.nl');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.remove('active'));
      const m = document.querySelector(`.nl[href="#${e.target.id}"]`);
      if (m) m.classList.add('active');
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  $$('section[id]').forEach(s => obs.observe(s));
})();

/* ══════════════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════════════ */
(function mobileMenu() {
  const burger = $('burger'), menu = $('mobile-menu');
  if (!burger || !menu) return;
  let open = false;
  const [s1, s2] = burger.querySelectorAll('span');

  function toggle(state) {
    open = state;
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    s1.style.transform = open ? 'translateY(7px) rotate(45deg)'  : '';
    s2.style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', () => toggle(!open));
  $$('.mm-link').forEach(l => l.addEventListener('click', () => toggle(false)));
})();

/* ══════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════ */
(function scrollReveal() {
  const baseObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      baseObs.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  /* Stagger cards inside grids */
  const staggerObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.sk-card, .proj-card').forEach((el, i) =>
        setTimeout(() => el.classList.add('visible'), i * 120)
      );
      staggerObs.unobserve(entry.target);
    });
  }, { threshold: 0.05 });

  $$('.reveal, .reveal-word').forEach(el => {
    if (!el.closest('#hero')) baseObs.observe(el);
  });

  ['.skills-grid', '.proj-list'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) staggerObs.observe(el);
  });
})();

/* ══════════════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════════════ */
(function typewriter() {
  const el = $('typed');
  if (!el) return;

  const roles = [
    'Full-Stack Developer',
    'CS Student @ FAST-NUCES',
    'Open to Internships',
  ];

  let ri = 0, ci = 0, del = false;

  function tick() {
    const cur = roles[ri];
    el.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);

    if (!del && ci === cur.length)  { del = true; return setTimeout(tick, 1800); }
    if  (del && ci === 0)           { del = false; ri = (ri + 1) % roles.length; }
    setTimeout(tick, del ? 42 : 72);
  }

  setTimeout(tick, 2200); /* wait for loader + hero reveal */
})();

/* ══════════════════════════════════════════════════
   PROJECT CARD 3-D TILT
══════════════════════════════════════════════════ */
(function tilt() {
  if (isTouch()) return;

  $$('.proj-card').forEach(card => {
    card.addEventListener('mouseenter', () =>
      card.style.transition = 'transform .1s linear, border-color .3s, box-shadow .3s'
    );
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
      card.style.transform = `perspective(900px) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s';
      card.style.transform  = '';
    });
  });
})();

/* ══════════════════════════════════════════════════
   SKILL CARDS — sibling dim on hover
══════════════════════════════════════════════════ */
(function skillDim() {
  const grid = document.querySelector('.skills-grid');
  if (!grid) return;

  grid.addEventListener('mouseover', e => {
    const card = e.target.closest('.sk-card');
    if (!card) return;
    grid.querySelectorAll('.sk-card').forEach(s => { s.style.opacity = s === card ? '' : '.5'; });
  });
  grid.addEventListener('mouseleave', () =>
    grid.querySelectorAll('.sk-card').forEach(s => { s.style.opacity = ''; })
  );
})();

/* ══════════════════════════════════════════════════
   ORB PARALLAX
══════════════════════════════════════════════════ */
(function orbParallax() {
  const orbs = $$('.orb');
  window.addEventListener('scroll', () => {
    const sy = scrollY;
    orbs.forEach((orb, i) => {
      orb.style.transform = `translateY(${sy * (0.06 + i * 0.02)}px)`;
    });
  }, { passive: true });
})();
