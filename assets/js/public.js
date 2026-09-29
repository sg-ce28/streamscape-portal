/* Streamscape public site - renders the catalog rows, the featured title, the "everything" grid
 * with its filter tabs, and the title page.  MOCK SITE FOR TRAINING.
 * Only RELEASED titles are shown here (the public site does the scoping the console forgets to do).
 * Photos: assets/photos/, credits in assets/photos/credits.txt. */
(function () {
  'use strict';
  var D = SS.DATA, esc = SS.esc;

  var RELEASED = D.catalog.filter(function (t) { return t.status === 'released'; });
  var KIND = { movie: ['Film', 'Films', 'Film'], tv: ['Series', 'Series', 'Series'], music: ['Music', 'Music', 'Album'] };
  var ANCHOR = { movie: 'films', tv: 'series', music: 'music' };
  var IMG = {
    'tt-01': ['tt-01-kona-skies', '50% 50%'], 'tt-02': ['tt-02-long-reef', '45% 50%'], 'tt-03': ['tt-03-night-market', '35% 50%'],
    'tt-04': ['tt-04-signal-hill', '50% 55%'], 'tt-05': ['tt-05-tradewind', '50% 50%'], 'tt-06': ['tt-06-paniolo', '62% 50%'],
    'tt-07': ['tt-07-harbor-lights', '50% 50%'], 'tt-08': ['tt-08-understudy', '50% 50%'], 'tt-09': ['tt-09-cold-front', '50% 50%'],
    'tt-10': ['tt-10-waialle', '66% 50%']
  };
  var FEATURED_ID = 'tt-04';   // "Signal Hill", the mock's default featured title

  function byKind(k) { return RELEASED.filter(function (t) { return t.kind === k; }); }
  function meta(t) { return t.kind === 'music' ? t.year + ' · ' + t.partner : t.genre + ' · ' + t.year + ' · ' + t.rating; }
  function ratioClass(t, square) { return (t.kind === 'music' && square) ? 'poster--1x1' : 'poster--2x3'; }
  function rgba(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  // Poster markup. size: 'sm' | 'md' | 'lg' | 'hero'. Photos are duotoned by CSS (grayscale + colour tint).
  function poster(t, size, ratio, pop) {
    var img = IMG[t.id];
    var style = '--art:' + t.art + (img ? ';--pos:' + img[1] : '');
    var bg = img ? ' style="background-image:url(\'assets/photos/' + img[0] + '.jpg\')"' : '';
    return '<span class="poster ' + ratio + ' poster--' + size + (pop ? ' poster--pop' : '') + '" style="' + esc(style) + '">' +
      (img ? '<span class="poster__img"' + bg + '></span>' : '') +
      '<span class="poster__tint"></span><span class="poster__shade"></span>' +
      '<span class="poster__top"><img src="assets/logo/streamscape-mark.svg" alt=""><span class="poster__kind">' + esc(KIND[t.kind][0]) + (size === 'lg' ? ' · ' + esc(t.rating) : '') + '</span></span>' +
      '<span class="poster__title">' + esc(t.title) + '</span></span>';
  }
  function tile(t, square, size) {
    return '<a class="tile reveal" href="title.html#' + esc(t.id) + '">' + poster(t, size || 'md', ratioClass(t, square)) +
      '<span class="tile__meta">' + esc(meta(t)) + '</span></a>';
  }

  // ---------- Toast ----------
  var toastTimer = null;
  function toast(msg) {
    var el = document.getElementById('toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
    el.textContent = msg;
    el.hidden = false;
    el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 2800);
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-play]');
    if (b) { ev.preventDefault(); toast('Training site · nothing actually plays'); }
  });

  // ---------- Home ----------
  var rowsHost = document.getElementById('rows');
  if (rowsHost) {
    var rows = [
      { kind: 'movie', num: '01', heading: 'Films', unit: 'titles' },
      { kind: 'tv', num: '02', heading: 'Series', unit: 'titles' },
      { kind: 'music', num: '03', heading: 'Music', unit: 'albums' }
    ];
    rowsHost.innerHTML = rows.map(function (r) {
      var list = byKind(r.kind), sq = r.kind === 'music';
      return '<section class="row reveal" id="' + ANCHOR[r.kind] + '">' +
        '<div class="row__head"><div><div class="micro">' + r.num + ' · ' + list.length + ' ' + r.unit + '</div><h2 class="display-2">' + r.heading + '</h2></div>' +
        '<button type="button" class="link-ul" data-seeall="' + r.kind + '">See all <span>&rarr;</span></button></div>' +
        '<div class="rail-scroll' + (sq ? ' rail-scroll--sq' : '') + '">' + list.map(function (t) { return tile(t, sq, 'md'); }).join('') + '</div>' +
        '</section>';
    }).join('');

    // Featured title in the hero.
    var f = SS.titleById(FEATURED_ID) || RELEASED[0];
    var featHost = document.getElementById('featured');
    if (featHost && f) {
      featHost.innerHTML =
        '<div class="feat__head"><span class="live"><span class="live__dot"></span>Featured</span><span class="micro--dim">' + esc(f.partner) + '</span></div>' +
        '<a href="title.html#' + esc(f.id) + '">' + poster(f, 'lg', 'poster--4x5', true) + '</a>' +
        '<p>' + esc(f.blurb) + '</p>' +
        '<div class="feat__actions"><button type="button" class="pill pill--solid" data-play>▶ Play</button>' +
        '<a class="link-ul" href="title.html#' + esc(f.id) + '">Details <span>&rarr;</span></a></div>';
    }

    // "Everything on Streamscape" grid with filter tabs.
    var filter = 'all';
    var grid = document.getElementById('all-grid');
    var tabsHost = document.getElementById('all-tabs');
    var count = document.getElementById('all-count');
    function renderAll() {
      var list = filter === 'all' ? RELEASED : byKind(filter);
      grid.innerHTML = list.map(function (t) { return tile(t, false, 'sm'); }).join('');
      count.textContent = '04 · ' + list.length + ' released';
      var tabs = [['All', 'all', RELEASED.length], ['Films', 'movie', byKind('movie').length], ['Series', 'tv', byKind('tv').length], ['Music', 'music', byKind('music').length]];
      tabsHost.innerHTML = tabs.map(function (x) {
        return '<button type="button" class="tab' + (filter === x[1] ? ' is-active' : '') + '" data-filter="' + x[1] + '">' + x[0] + ' (' + x[2] + ')</button>';
      }).join('');
    }
    renderAll();
    document.addEventListener('click', function (ev) {
      var tab = ev.target.closest('[data-filter]');
      if (tab) { filter = tab.getAttribute('data-filter'); renderAll(); return; }
      var see = ev.target.closest('[data-seeall]');
      if (see) {
        filter = see.getAttribute('data-seeall'); renderAll();
        var all = document.getElementById('all');
        if (all) { window.scrollTo({ top: all.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' }); }
      }
    });
  }

  // ---------- Title page (title.html#tt-01) ----------
  var host = document.getElementById('title-page');
  if (host) {
    renderTitle();
    window.addEventListener('hashchange', renderTitle);
  }

  function myList() { try { return JSON.parse(localStorage.getItem('ss_mylist') || '{}'); } catch (e) { return {}; } }

  function renderTitle() {
    var id = (location.hash || '').replace('#', '');
    var t = SS.titleById(id);
    if (!t || t.status !== 'released') {
      document.title = 'Title · Streamscape';
      host.innerHTML =
        '<section class="unavail"><div class="unavail__in">' +
        '<div class="eyebrow"><span class="eyebrow__rule"></span>Title</div>' +
        '<h1>That title is not available.</h1>' +
        '<a class="pill pill--line pill--lg pill--arrow" href="index.html">Back to browse <span>&rarr;</span></a>' +
        '</div></section>';
      return;
    }
    document.title = t.title + ' · Streamscape';
    var img = IMG[t.id];
    var inList = !!myList()[t.id];
    var specs = [['Genre', t.genre], ['Rating', t.rating], ['Year', String(t.year)], ['From', t.partner]];
    var others = RELEASED.filter(function (x) { return x.partner === t.partner && x.id !== t.id; });
    var more = { eyebrow: 'Also from ' + t.partner, heading: 'More from ' + t.partner };
    if (!others.length) {
      others = RELEASED.filter(function (x) { return x.kind === t.kind && x.id !== t.id; });
      more = { eyebrow: 'Keep browsing', heading: 'More ' + KIND[t.kind][1] };
    }
    host.innerHTML =
      '<section class="thero" style="--glow:radial-gradient(1100px 640px at 10% -10%, ' + rgba(t.art, .45) + ', transparent 70%)">' +
        (img ? '<div class="thero__blur" style="background-image:url(\'assets/photos/' + img[0] + '.jpg\')"></div>' : '') +
        '<div class="thero__glow"></div><div class="thero__shade"></div><div class="grid-lines grid-lines--r"></div>' +
        '<div class="thero__in">' +
          '<div class="crumbs"><a href="index.html">Browse</a><span>&rsaquo;</span><a href="index.html#' + ANCHOR[t.kind] + '">' + esc(KIND[t.kind][1]) + '</a><span>&rsaquo;</span><span class="cur">' + esc(t.title) + '</span></div>' +
          '<div class="thero__body">' +
            '<div class="thero__poster">' + poster(t, 'hero', ratioClass(t, true), true) + '</div>' +
            '<div class="thero__copy">' +
              '<div class="eyebrow"><span class="eyebrow__rule"></span>' + esc(KIND[t.kind][2]) + '</div>' +
              '<h1>' + esc(t.title) + '</h1>' +
              '<p class="lede">' + esc(t.blurb) + '</p>' +
              '<div class="thero__cta"><button type="button" class="pill pill--solid pill--lg pill--lift" data-play>▶ Play</button>' +
              '<button type="button" class="pill pill--line pill--lg" id="mylist">' + (inList ? '✓ In My List' : '+ My List') + '</button></div>' +
              '<div class="specs">' + specs.map(function (s, i) {
                return '<div class="spec" style="--d:' + (0.55 + i * 0.08).toFixed(2) + 's"><div class="spec__k">' + s[0] + '</div><div class="spec__v">' + esc(s[1]) + '</div></div>';
              }).join('') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<div class="main">' +
        '<section class="row">' +
          '<div class="row__head"><div><div class="micro">' + esc(more.eyebrow) + '</div><h2 class="display-3">' + esc(more.heading) + '</h2></div>' +
          '<a class="link-ul" href="index.html">Back to browse <span>&rarr;</span></a></div>' +
          '<div class="rail-scroll">' + others.map(function (x) { return tile(x, false, 'md'); }).join('') + '</div>' +
        '</section>' +
      '</div>';
    document.getElementById('mylist').addEventListener('click', function () {
      var l = myList(); l[t.id] = !l[t.id];
      try { localStorage.setItem('ss_mylist', JSON.stringify(l)); } catch (e) { /* ignore */ }
      this.textContent = l[t.id] ? '✓ In My List' : '+ My List';
    });
    window.scrollTo(0, 0);
  }
})();
