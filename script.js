// ── Cursor ──────────────────────────────────────
const cursor = document.getElementById('cursor');
const dot    = cursor.querySelector('.dot');
const ring   = cursor.querySelector('.ring');
let mx = 0, my = 0, rx = 0, ry = 0;

// Detect if device supports touch
const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
          (navigator.maxTouchPoints > 0) ||
          (navigator.msMaxTouchPoints > 0));
};

// Hide custom cursor on touch devices
if (isTouchDevice()) {
  cursor.style.display = 'none';
  document.body.style.cursor = 'auto';
} else {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();
}

// ── Navbar scroll ───────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Scroll reveal ───────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Stagger children if skill cards
      const cards = e.target.querySelectorAll('.skill-card');
      cards.forEach((c, i) => {
        setTimeout(() => c.classList.add('visible'), i * 80);
      });
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));
