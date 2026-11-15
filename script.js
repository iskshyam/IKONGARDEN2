/* Ikon Gardens — script.js */
(function () {
  var nav = document.getElementById('nav'),
      menu = document.getElementById('menu'),
      tg = document.getElementById('tg'),
      themeToggle = document.getElementById('themeToggle'),
      root = document.documentElement;

  /* Sticky nav shrink */
  function onScroll() { nav.classList.toggle('s', window.scrollY > 40); }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Mobile menu */
  tg.addEventListener('click', function () {
    var open = menu.classList.toggle('o');
    tg.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', function () {
    menu.classList.remove('o'); tg.setAttribute('aria-expanded', false);
  });

  /* Scroll reveal */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

  /* Light / dark theme (remembered) */
  var saved = null;
  try { saved = localStorage.getItem('ikon-gardens-theme'); } catch (e) {}
  root.setAttribute('data-theme', saved === 'light' ? 'light' : 'dark');

  function updateToggle() {
    var dark = root.getAttribute('data-theme') === 'dark';
    themeToggle.textContent = dark ? '☀' : '☾';
    var label = dark ? 'Switch to light theme' : 'Switch to dark theme';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.title = label;
  }
  themeToggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('ikon-gardens-theme', next); } catch (e) {}
    updateToggle();
  });
  updateToggle();

  /* Celebrations carousel */
  var track = document.querySelector('.events-carousel');
  if (track) {
    var step = function () {
      var c = track.querySelector('.event-card');
      return c ? c.getBoundingClientRect().width + 20 : 300;
    };
    var prev = document.querySelector('.carousel-prev'),
        next = document.querySelector('.carousel-next');
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        track.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * step(), behavior: 'smooth' });
      }
    });
  }
})();
