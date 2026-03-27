
(function () {
  'use strict';

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const card = entry.target;

      card.querySelectorAll('.skill-fill').forEach(fill => {
        setTimeout(() => {
          fill.style.width = fill.dataset.width + '%';
        }, 350);
      });

      card.querySelectorAll('.skill-bar-pct').forEach(pct => {
        const target = parseInt(pct.dataset.pct);
        let current = 0;
        const step = Math.ceil(target / 45);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          pct.textContent = current + '%';
          if (current >= target) clearInterval(timer);
        }, 25);
      });

      barObserver.unobserve(card);
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-card').forEach(card => barObserver.observe(card));
})();