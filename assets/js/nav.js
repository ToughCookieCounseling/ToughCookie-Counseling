/* nav.js — Mobile nav + scroll reveal for Tough Cookie Counseling */
(function () {
  /* ── Mobile hamburger ──────────────────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var navMenu   = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      var open = navMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);      // drives CSS X animation
      hamburger.setAttribute('aria-expanded', open);
    });

    // Mobile: toggle dropdowns on click
    var dropdowns = navMenu.querySelectorAll('.dropdown');
    dropdowns.forEach(function (dd) {
      var btn = dd.querySelector('.dropbtn');
      if (!btn) return;
      btn.addEventListener('click', function () {
        dropdowns.forEach(function (other) {
          if (other !== dd) other.classList.remove('open');
        });
        dd.classList.toggle('open');
      });
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        dropdowns.forEach(function (dd) { dd.classList.remove('open'); });
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        dropdowns.forEach(function (dd) { dd.classList.remove('open'); });
      }
    });
  }

  /* ── Scroll Reveal ─────────────────────────────────────────── */
  if (!('IntersectionObserver' in window)) return;   // graceful fallback

  var revealSelectors = [
    '.specialty-card',
    '.offer-card',
    '.value-card',
    '.goal-card',
    '.service-card',
    '.focus-box',
    '.detail-band',
    '.rates-band',
    '.closing-box',
    '.contact-info-card',
    '.faq-item',
    '.info-section',
    '.bio-hero'
  ];

  var elements = document.querySelectorAll(revealSelectors.join(','));

  elements.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(function (el) { observer.observe(el); });
})();

