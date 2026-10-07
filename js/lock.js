/* =========================================================
   Lock Screen — gerbang waktu menuju 8 Oktober 2026, 00:00 WIB
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     Waktu target: 8 Oktober 2026, 00:00:00 WIB (UTC+7)

     WIB selalu UTC+7, jadi targetnya sama dengan
     7 Oktober 2026 17:00:00 UTC. Ditulis sebagai literal UTC
     agar TIDAK bergantung pada zona waktu komputer pengunjung —
     jam perangkat yang salah pun tidak akan menembusnya.
     --------------------------------------------------------- */
  var TARGET_UTC_MS = Date.UTC(2026, 9, 7, 17, 0, 0); // bulan 9 = Oktober

  var UNLOCK_PAGE = 'index-unlocked.html';
  var STORAGE_KEY = 'anniv8-unlocked';

  function nowMs() {
    return Date.now();
  }

  function isUnlocked() {
    return nowMs() >= TARGET_UTC_MS;
  }

  /* ---------------------------------------------------------
     Kunci sementara di sessionStorage.
     Sesudah gerbang terbuka, kunci ini mencegah halaman ini
     menendang pengunjung kembali ke halaman terkunci saat
     mereka menekan tombol "kembali".
     --------------------------------------------------------- */
  function markUnlocked() {
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) { /* diabaikan */ }
  }

  function wasUnlocked() {
    try { return sessionStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return false; }
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  /* ---------------------------------------------------------
     Tampilkan pesan kunci: hari ini belum waktunya
     --------------------------------------------------------- */
  function renderCountdown() {
    var elDays    = document.querySelector('[data-cd="days"]');
    var elHours   = document.querySelector('[data-cd="hours"]');
    var elMinutes = document.querySelector('[data-cd="minutes"]');
    var elSeconds = document.querySelector('[data-cd="seconds"]');

    /* Tampilkan tanggal target dalam bahasa Indonesia, WIB.
       TARGET_UTC_MS adalah 7 Okt 17:00 UTC = 8 Okt 00:00 WIB,
       jadi tampilan harus memakai jam WIB (+7), bukan UTC. */
    var elTarget = document.getElementById('targetText');
    if (elTarget) {
      var bulan = ['Januari','Februari','Maret','April','Mei','Juni',
                   'Juli','Agustus','September','Oktober','November','Desember'];
      var WIB_OFFSET_MS = 7 * 60 * 60 * 1000;
      var t = new Date(TARGET_UTC_MS + WIB_OFFSET_MS);
      elTarget.textContent = t.getUTCDate() + ' ' + bulan[t.getUTCMonth()] +
        ' ' + t.getUTCFullYear() + ' \u00b7 00:00 WIB';
    }

    if (!elDays) return;

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function tick() {
      var diff = TARGET_UTC_MS - nowMs();

      if (diff <= 0) {
        elDays.textContent = elHours.textContent =
          elMinutes.textContent = elSeconds.textContent = '00';
        unlock();
        return;
      }

      var totalSeconds = Math.floor(diff / 1000);
      var days = Math.floor(totalSeconds / 86400);
      var hours = Math.floor((totalSeconds % 86400) / 3600);

      /* Bila tinggal kurang dari 1 hari, naikkan ke 1 supaya
         tidak terlihat "0 hari" padahal masih menunggu. */
      if (days === 0 && hours >= 0) days = 1;

      elDays.textContent    = String(days);
      elHours.textContent   = pad(hours);
      elMinutes.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
      elSeconds.textContent = pad(totalSeconds % 60);
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------
     Gerbang terbuka — alihkan ke halaman sebenarnya
     --------------------------------------------------------- */
  function unlock() {
    if (unlock._done) return;
    unlock._done = true;

    markUnlocked();

    var dest = unlock.destination || UNLOCK_PAGE;
    try {
      window.location.replace(dest);
    } catch (e) {
      window.location.href = dest;
    }
  }

  /* ---------------------------------------------------------
     Hati beterbangan (sama seperti halaman utama)
     --------------------------------------------------------- */
  function initHearts() {
    var layer = document.getElementById('heartsLayer');
    if (!layer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var glyphs = ['\u2665', '\u2661', '\u2764'];

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

    setTimeout(function () {
      spawn();
      setInterval(spawn, 1100);
    }, 600);
  }

  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */
  function boot() {
    // Halaman terkunci tidak boleh terindeks mesin pencari
    if (!document.querySelector('meta[name="robots"]')) {
      var meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
    }

    // Sudah pernah terbuka di sesi ini -> langsung masuk
    if (wasUnlocked() || isUnlocked()) {
      unlock();
      return;
    }

    renderCountdown();
    initHearts();
  }

  // diekspos supaya bisa diuji
  window.__lock = {
    target: TARGET_UTC_MS,
    unlock: unlock,
    isUnlocked: isUnlocked,
    wasUnlocked: wasUnlocked
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
