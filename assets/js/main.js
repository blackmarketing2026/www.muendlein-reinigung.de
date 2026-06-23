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

  /* --- Kontaktformular per fetch absenden --- */
  document.querySelectorAll('form[action="/api/contact"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Wird gesendet …';

      var data = {};
      new FormData(form).forEach(function (val, key) {
        data[key] = val;
      });

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, body: j }; }); })
        .then(function (res) {
          if (res.ok) {
            window.location.href = '/danke';
          } else {
            alert(res.body.error || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
            btn.disabled = false;
            btn.textContent = originalText;
          }
        })
        .catch(function () {
          alert('Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.');
          btn.disabled = false;
          btn.textContent = originalText;
        });
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
