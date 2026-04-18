(function () {

  /* ── Theme toggle ──────────────────────────────────────────── */
  var toggle = document.getElementById('theme-toggle');

  function getTheme() {
    return localStorage.getItem('theme') || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── Mobile nav toggle ─────────────────────────────────────── */
  var mobileBtn = document.getElementById('mobile-toggle');
  var nav = document.getElementById('site-nav');

  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !mobileBtn.contains(e.target)) {
        nav.classList.remove('is-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Show-more for posts grid ──────────────────────────────── */
  var ROWS_PER_BATCH = 5;

  function getColumnCount(grid) {
    var tpl = getComputedStyle(grid).gridTemplateColumns;
    if (!tpl || tpl === 'none') return 1;
    // e.g. "320px 320px 320px" → 3
    var cols = tpl.trim().split(/\s+/).length;
    return cols > 0 ? cols : 1;
  }

  function initShowMore() {
    var grid = document.querySelector('.posts-section .card-grid');
    if (!grid) return;

    var cards = Array.from(grid.children);
    if (cards.length === 0) return;

    var cols      = getColumnCount(grid);
    var batchSize = cols * ROWS_PER_BATCH;

    if (cards.length <= batchSize) return; // Everything fits — no button needed

    // Hide all cards beyond the first batch
    for (var i = batchSize; i < cards.length; i++) {
      cards[i].style.display = 'none';
    }

    var shown = batchSize;

    // Build the button and insert it after the grid
    var btn = document.createElement('button');
    btn.className = 'show-more-btn';
    btn.type = 'button';
    setLabel(btn, cards.length - shown);
    grid.insertAdjacentElement('afterend', btn);

    btn.addEventListener('click', function () {
      var end = Math.min(shown + batchSize, cards.length);
      for (var i = shown; i < end; i++) {
        cards[i].style.display = '';
      }
      shown = end;

      if (shown >= cards.length) {
        btn.remove();
      } else {
        setLabel(btn, cards.length - shown);
      }
    });
  }

  function setLabel(btn, remaining) {
    btn.textContent = 'Show more  (' + remaining + ' remaining)';
  }

  // Run after the first layout pass so gridTemplateColumns is resolved
  document.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(initShowMore);
  });

})();
