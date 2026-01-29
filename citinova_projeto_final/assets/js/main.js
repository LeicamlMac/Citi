(function () {
  'use strict';

  const navbar = document.querySelector('.navbar-citinova');
  const collapseEl = document.getElementById('navMain');

  function getOffset() {
    return navbar ? navbar.offsetHeight : 90;
  }

  function smoothScrollTo(hash) {
    const target = document.querySelector(hash);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.pageYOffset - getOffset();
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // Scroll suave + fecha menu mobile
  document.querySelectorAll('a.scroll[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      e.preventDefault();
      smoothScrollTo(href);

      if (collapseEl && collapseEl.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
      }
    });
  });

  // Recalcular ScrollSpy corretamente após carregar (garante que o active acompanhe o scroll)
  window.addEventListener('load', () => {
    const el = document.body;
    bootstrap.ScrollSpy.getOrCreateInstance(el, {
      target: '.navbar-citinova',
      offset: getOffset()
    });

    if (window.location.hash) {
      setTimeout(() => smoothScrollTo(window.location.hash), 120);
    }
  });

  window.addEventListener('resize', () => {
    bootstrap.ScrollSpy.getOrCreateInstance(document.body, {
      target: '.navbar-citinova',
      offset: getOffset()
    }).refresh();
  });

})();
