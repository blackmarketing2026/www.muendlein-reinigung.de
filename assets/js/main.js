(function () {
  'use strict';

  /* --- Mobile Navigation --- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      mobileNav.hidden = expanded;
    });

    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      }
    });
  }

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
      });

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* --- Kontaktformular absenden --- */
  document.querySelectorAll('form[data-api="/api/contact"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Wird gesendet …';

      var data = {};
      new FormData(form).forEach(function (val, key) {
        data[key] = val;
      });

      var payload = JSON.stringify(data);

      try {
        navigator.sendBeacon('/api/contact', new Blob([payload], { type: 'application/json' }));
      } catch (_) {
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        }).catch(function () {});
      }

      window.location.href = '/danke';
    });
  });

  /* --- Aktive Navigation hervorheben --- */
  var path = window.location.pathname;
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(function (link) {
    if (link.getAttribute('href') === path || link.getAttribute('href') === path + '/') {
      link.setAttribute('aria-current', 'page');
      link.style.color = 'var(--color-primary)';
      link.style.fontWeight = '700';
    }
  });

})();
