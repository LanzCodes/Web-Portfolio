
(function () {
  'use strict';

  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    form.style.transition = 'opacity 0.35s ease';
    form.style.opacity = '0';

    setTimeout(() => {
      form.style.display = 'none';
      document.querySelector('.form-header').style.display = 'none';
      success.classList.add('show');
    }, 350);
  });
})();