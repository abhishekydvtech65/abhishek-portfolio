/* ════════════════════════════════════════════
   LOADING SCREEN
════════════════════════════════════════════ */
(function () {
  var loader  = document.getElementById('loader');
  var bar     = document.getElementById('ldBar');
  var pct     = document.getElementById('ldPct');
  var progress = 0;
  var ticker;

  function set(val) {
    progress = Math.min(Math.round(val), 100);
    bar.style.width     = progress + '%';
    pct.textContent     = progress + '%';
  }

  // slow crawl — pauses near 90 until real load
  ticker = setInterval(function () {
    if (progress < 70)      set(progress + Math.random() * 4.5 + 1);
    else if (progress < 90) set(progress + Math.random() * 1.2 + 0.3);
  }, 55);

  function finish() {
    clearInterval(ticker);
    var fill = setInterval(function () {
      if (progress >= 100) {
        clearInterval(fill);
        setTimeout(function () {
          loader.classList.add('hidden');
          initPage();
        }, 280);
      } else {
        set(progress + 4);
      }
    }, 18);
  }

  window.addEventListener('load', finish);
  setTimeout(finish, 3500); // safety cap
}());


/* ════════════════════════════════════════════
   PAGE INIT — runs after loader hides
════════════════════════════════════════════ */
function initPage() {

  /* ── mobile nav ── */
  var menuBtn = document.getElementById('menuBtn');
  var navMenu = document.getElementById('navMenu');
  menuBtn.addEventListener('click', function () {
    var open = navMenu.classList.toggle('open');
    menuBtn.textContent = open ? '✕' : '☰';
  });
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
      navMenu.classList.remove('open');
      menuBtn.textContent = '☰';
    });
  });

  /* ── copyright year ── */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ── typing animation ── */
  var typing = document.getElementById('typing');
  var words  = ['Frontend Developer', 'UI/UX Designer', 'Problem Solver', 'CSE Student'];
  var wi = 0, ci = 0, deleting = false;

  function type() {
    var w = words[wi];
    typing.textContent = deleting ? w.slice(0, ci - 1) : w.slice(0, ci + 1);
    deleting ? ci-- : ci++;
    if (!deleting && ci === w.length) { deleting = true; setTimeout(type, 1400); return; }
    if (deleting && ci === 0)         { deleting = false; wi = (wi + 1) % words.length; }
    setTimeout(type, deleting ? 45 : 80);
  }
  type();

  /* ── cursor glow ── */
  var glow = document.querySelector('.glow');
  document.addEventListener('mousemove', function (e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });

  /* ── scroll-reveal ── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    'section, .skill-card, .cards article, .timeline article, .hero-photo-wrap, .stats div'
  ).forEach(function (el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = 'opacity .65s ease, transform .65s ease';
    revealObs.observe(el);
  });

  /* ── photo 3-D tilt on mouse ── */
  var photoWrap = document.querySelector('.hero-photo-wrap');
  var photoBox  = document.querySelector('.hero-photo-container');
  if (photoWrap && photoBox) {
    photoWrap.addEventListener('mousemove', function (e) {
      var r  = photoWrap.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width  / 2)) / r.width;
      var dy = (e.clientY - (r.top  + r.height / 2)) / r.height;
      photoBox.style.transform  = 'perspective(600px) rotateY(' + (dx * 12) + 'deg) rotateX(' + (-dy * 9) + 'deg) scale(1.03)';
      photoBox.style.transition = 'transform .08s ease';
    });
    photoWrap.addEventListener('mouseleave', function () {
      photoBox.style.transform  = '';
      photoBox.style.transition = 'transform .5s ease, clip-path .4s ease';
    });
  }
}
