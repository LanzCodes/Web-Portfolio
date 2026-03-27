/* ============================================================
   SHARED.JS — Global Behavior for Lance Palacios Portfolio
   ============================================================ */

(function () {
  'use strict';

  // ── Navbar scroll solid class ──────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('solid', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu toggle ─────────────────────────────────────
  const toggle   = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll reveal ──────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = i * 55;
    revealObserver.observe(el);
  });

  // ── Typing effect ──────────────────────────────────────────
  function typeEffect(el, text, speed) {
    el.textContent = '';
    let i = 0;
    const t = setInterval(() => {
      if (i < text.length) { el.textContent += text[i++]; }
      else clearInterval(t);
    }, speed || 75);
  }
  const typingEl = document.querySelector('[data-type]');
  if (typingEl) setTimeout(() => typeEffect(typingEl, typingEl.dataset.type), 900);

  // ── Cursor trail ───────────────────────────────────────────
  let lastTrail = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrail < 30) return;
    lastTrail = now;

    const dot = document.createElement('div');
    Object.assign(dot.style, {
      position: 'fixed',
      width: '5px', height: '5px',
      borderRadius: '50%',
      background: '#E50914',
      pointerEvents: 'none',
      left: e.clientX + 'px',
      top:  e.clientY + 'px',
      opacity: '0.55',
      zIndex: '9999',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    });
    document.body.appendChild(dot);
    requestAnimationFrame(() => { dot.style.opacity = '0'; dot.style.transform = 'scale(3)'; });
    setTimeout(() => dot.remove(), 520);
  });

})();