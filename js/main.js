/* =========================================================
   Ferico & Yohana — 8 Tahun
   Interactivity: counter, reveal, hearts, gallery, lightbox
   ========================================================= */
(function () {
  'use strict';

  var START_DATE = new Date(2018, 9, 8, 0, 0, 0); // 8 Oktober 2018

  /* -------------------------------------------------------
     1. Live counter — sejak 8 Oktober 2018
     ------------------------------------------------------- */
  function initCounter() {
    var daysEl    = document.querySelector('[data-counter="days"]');
    var hoursEl   = document.querySelector('[data-counter="hours"]');
    var minutesEl = document.querySelector('[data-counter="minutes"]');
    var secondsEl = document.querySelector('[data-counter="seconds"]');

    if (!daysEl) return;

    function plural(n) {
      return n.toLocaleString('id-ID');
    }

    function tick() {
      var now = new Date();
      var diff = now - START_DATE;

      if (diff < 0) diff = 0;

      var totalSeconds = Math.floor(diff / 1000);
      var days    = Math.floor(totalSeconds / 86400);
      var hours   = Math.floor((totalSeconds % 86400) / 3600);
      var minutes = Math.floor((totalSeconds % 3600) / 60);
      var seconds = totalSeconds % 60;

      daysEl.textContent    = plural(days);
      hoursEl.textContent   = plural(hours);
      minutesEl.textContent = plural(minutes);
      secondsEl.textContent = plural(seconds);
    }

    tick();
    setInterval(tick, 1000);
  }

  /* -------------------------------------------------------
     2. Reveal on scroll
     ------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* -------------------------------------------------------
     3. Floating hearts
     ------------------------------------------------------- */
  function initHearts() {
    var layer = document.getElementById('heartsLayer');
    if (!layer) return;

    var glyphs = ['\u2665', '\u2661', '\u2764', '\u2665'];
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    function spawn() {
      var heart = document.createElement('span');
      heart.className = 'heart';
      heart.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      heart.style.left = (Math.random() * 100) + 'vw';
      heart.style.fontSize = (12 + Math.random() * 20) + 'px';
      heart.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');

      var duration = 9 + Math.random() * 9;
      heart.style.animationDuration = duration + 's';

      layer.appendChild(heart);
      setTimeout(function () {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
      }, duration * 1000 + 200);
    }

    // Beri jeda singkat supaya halaman selesai render dulu
    setTimeout(function () {
      spawn();
      setInterval(spawn, 900);
    }, 600);
  }

  /* -------------------------------------------------------
     4. Gallery placeholder — otomatis dibuat
     ------------------------------------------------------- */
  var GALLERY_EXT = '.jpeg';

  var GALLERY_IMAGES = Array.from({ length: 24 }, function (_, i) {
    var n = (i + 1 < 10 ? '0' : '') + (i + 1);
    return { src: 'images/gallery-' + n + GALLERY_EXT, label: 'Momen ' + (i + 1) };
  });

  function initGallery() {
    var grid = document.getElementById('galleryGrid');
    if (!grid) return;

    GALLERY_IMAGES.forEach(function (item) {
      var cell = document.createElement('figure');
      cell.className = 'gallery__item';
      cell.style.margin = '0';

      var img = document.createElement('img');
      img.src = item.src;
      img.alt = item.label;
      img.loading = 'lazy';

      img.addEventListener('load', function () {
        cell.classList.add('has-img');
      });
      img.addEventListener('error', function () {
        if (img.parentNode) img.parentNode.removeChild(img);
      });

      var caption = document.createElement('span');
      caption.textContent = item.label + '\n' + item.src;

      cell.appendChild(img);
      cell.appendChild(caption);

      cell.addEventListener('click', function () {
        if (cell.classList.contains('has-img')) {
          openLightbox(item.src, item.label);
        }
      });
      grid.appendChild(cell);
    });
  }

  /* -------------------------------------------------------
     5. Lightbox
     ------------------------------------------------------- */
  var lightbox, lightboxImg;
  var LIGHTBOX_SRC_OVERRIDE = null;

  function openLightbox(src, alt, caption) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    var cap = document.getElementById('lightboxCaption');
    if (cap) {
      cap.textContent = caption || '';
      cap.style.display = caption ? '' : 'none';
    }
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initLightbox() {
    lightbox = document.getElementById('lightbox');
    lightboxImg = document.getElementById('lightboxImg');
    var closeBtn = document.getElementById('lightboxClose');
    if (!lightbox) return;

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* -------------------------------------------------------
     6. Popup otomatis foto babak terakhir (bab 12)
     Muncul sekali saja, saat pengunjung tiba di galeri kenangan.
     ------------------------------------------------------- */
  var FINAL_CHAPTER_IMG = 'images/12-hari-ini.jpg';
  var AUTOPOPUP_KEY = 'anniv8-autopopup-shown';

  function alreadyShown() {
    try {
      return sessionStorage.getItem(AUTOPOPUP_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function markShown() {
    try {
      sessionStorage.setItem(AUTOPOPUP_KEY, '1');
    } catch (e) { /* storage diblokir — biarkan, popup tetap tampil sekali per load */ }
  }

  function initAutoPopup() {
    var gallery = document.getElementById('gallery');
    if (!gallery || !lightbox) return;

    if (!('IntersectionObserver' in window)) return;
    if (alreadyShown()) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var fired = false;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || fired) return;

        fired = true;
        observer.disconnect();
        markShown();

        // Jeda supaya pengunjung sempat "mendarat" di galeri dulu
        setTimeout(function () {
          openLightbox(
            FINAL_CHAPTER_IMG,
            'Hari ini, dan setiap hari setelahnya',
            'Bab terakhir — hari ini, dan setiap hari setelahnya'
          );
          var img = document.getElementById('lightboxImg');
          if (img) {
            img.onerror = function () {
              closeLightbox();
            };
          }
        }, 1100);
      });
    }, { threshold: 0.25 });

    observer.observe(gallery);
  }

  /* -------------------------------------------------------
     7. Smooth-jump with chapter highlight
     ------------------------------------------------------- */
  function initAnchorHighlight() {
    document.querySelectorAll('.scroll-cue').forEach(function (link) {
      link.addEventListener('click', function () {
        var target = document.querySelector(link.getAttribute('href'));
        if (target) {
          var card = target.querySelector('.reveal');
          if (card) setTimeout(function () { card.classList.add('is-visible'); }, 400);
        }
      });
    });
  }

  /* -------------------------------------------------------
     Boot
     ------------------------------------------------------- */
  function boot() {
    initCounter();
    initReveal();
    initHearts();
    initGallery();
    initLightbox();
    initAutoPopup();
    initAnchorHighlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
