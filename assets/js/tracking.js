/* Tracking-Events – erst nach Cookie-Consent aktivieren */

(function () {
  'use strict';

  /* --- CTA-Klick-Tracking --- */
  document.querySelectorAll('.btn-primary').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'cta_click', {
          event_category: 'engagement',
          event_label: btn.textContent.trim()
        });
      }
    });
  });


})();
