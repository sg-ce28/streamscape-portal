/* Streamscape partner console - render each page from the shared dataset.  MOCK SITE FOR TRAINING.
 * NOTE: the console loads the ENTIRE dataset and never scopes it to the signed-in partner.
 * That is deliberate for the exercise; students are meant to notice it. */
(function () {
  'use strict';
  var s = SS.requireSession();
  if (!s) { return; }
  var D = SS.DATA, esc = SS.esc, num = SS.num, money = SS.money;
  var el;

  // Dashboard: the partner's own titles (this page DOES scope, so students can contrast it with the rest).
  if ((el = document.getElementById('dash'))) {
    var me = D.partners.filter(function (p) { return p.code === s.code; })[0] || { titles: [] };
    var mine = me.titles.map(SS.titleById).filter(Boolean);
    var perf = {};
    D.performance.forEach(function (r) { perf[r.id] = r; });
    var totalViews = mine.reduce(function (a, t) { return a + (perf[t.id] ? perf[t.id].views30 : 0); }, 0);
    var myPay = (D.payouts.filter(function (p) { return p.code === s.code; })[0] || {}).amount || 0;
    el.innerHTML =
      '<div class="grid grid--3">' +
        '<div class="card"><div class="stat__label">Your titles</div><div class="stat__value">' + mine.length + '</div><div class="stat__foot">' + esc(me.plan || '') + ' plan</div></div>' +
        '<div class="card"><div class="stat__label">30-day views</div><div class="stat__value">' + num(totalViews) + '</div><div class="stat__foot">across your titles</div></div>' +
        '<div class="card"><div class="stat__label">Q2 payout</div><div class="stat__value">' + money(myPay) + '</div><div class="stat__foot">ACH, paid</div></div>' +
      '</div>' +
      '<div class="card"><div class="card__head"><h2>Your titles</h2></div><div class="table-wrap"><table>' +
      '<thead><tr><th>Title</th><th>Type</th><th>Status</th><th>30-day views</th><th>Completion</th></tr></thead><tbody>' +
      mine.map(function (t) {
        var p = perf[t.id] || {};
        var st = t.status === 'embargoed' ? '<span class="badge badge--warn">embargoed</span>' : '<span class="badge badge--ok">released</span>';
        return '<tr><td>' + esc(t.title) + '</td><td>' + esc(t.kind) + '</td><td>' + st + '</td><td class="num">' + num(p.views30 || 0) + '</td><td class="num">' + Math.round((p.completion || 0) * 100) + '%</td></tr>';
      }).join('') +
      '</tbody></table></div><p class="hint">This page shows only your titles. The other console pages do not scope this way.</p></div>';
  }

  // Catalog: the whole catalog, including other partners' and embargoed titles.
  if ((el = document.getElementById('catalog-body'))) {
    el.innerHTML = D.catalog.map(function (t) {
      var st = t.status === 'embargoed'
        ? '<span class="badge badge--bad">embargoed' + (t.release ? ' · ' + esc(t.release) : '') + '</span>'
        : '<span class="badge badge--ok">released</span>';
      var ownFlag = t.partner === s.name ? '' : ' <span class="badge badge--muted">not yours</span>';
      return '<tr><td class="num">' + esc(t.id) + '</td><td>' + esc(t.title) + ownFlag + '</td><td>' + esc(t.kind) + '</td><td>' + esc(t.partner) + '</td><td>' + st + '</td></tr>';
    }).join('');
    var c = document.getElementById('catalog-count');
    if (c) { c.textContent = D.catalog.length + ' titles from ' + D.partners.length + ' partners'; }
  }

  // Audience: aggregate table plus the individual viewer sample that should not be here.
  if ((el = document.getElementById('audience-body'))) {
    el.innerHTML = D.audienceSample.map(function (r) {
      var t = SS.titleById(r.title) || { title: r.title };
      var note = r.note ? ' <span class="badge badge--bad">' + esc(r.note) + '</span>' : '';
      return '<tr><td class="num">' + esc(r.viewer) + '</td><td>' + esc(r.region) + '</td><td>' + esc(r.plan) + '</td><td>' + esc(r.device) + '</td><td>' + esc(t.title) + note + '</td></tr>';
    }).join('');
    var an = document.getElementById('audience-note');
    if (an) { an.textContent = D.audienceNote; }
  }

  // Payouts: every partner's money, not just yours.
  if ((el = document.getElementById('payouts-body'))) {
    el.innerHTML = D.payouts.map(function (p) {
      var pt = D.partners.filter(function (x) { return x.code === p.code; })[0] || {};
      var mineTag = p.code === s.code ? ' <span class="badge badge--live">you</span>' : '';
      return '<tr><td>' + esc(pt.name || p.code) + mineTag + '</td><td>' + esc(p.q) + '</td><td class="num">' + money(p.amount) + '</td><td>' + esc(p.method) + '</td><td class="num">' + esc(p.ref) + '</td></tr>';
    }).join('');
  }

  // Exports: describe the nightly feed (the "how it works" artifact) and offer an inert preview.
  if ((el = document.getElementById('feed-config'))) {
    var f = D.feed;
    el.innerHTML =
      '<table class="kv"><tbody>' +
      '<tr><th>Job name</th><td>' + esc(f.name) + '</td></tr>' +
      '<tr><th>Schedule</th><td>' + esc(f.schedule) + '</td></tr>' +
      '<tr><th>Source</th><td>' + esc(f.source) + '</td></tr>' +
      '<tr><th>Destination</th><td>' + esc(f.destination) + '</td></tr>' +
      '<tr><th>Auth</th><td>' + esc(f.auth) + '</td></tr>' +
      '<tr><th>Token</th><td>' + esc(f.token) + '</td></tr>' +
      '<tr><th>Scope (actual)</th><td>' + esc(f.scope) + '</td></tr>' +
      '<tr><th>Scope (intended)</th><td>' + esc(f.intendedScope) + '</td></tr>' +
      '<tr><th>Last run</th><td>' + esc(f.lastRun) + ' — ' + esc(f.lastResult) + '</td></tr>' +
      '</tbody></table>' +
      '<h3 style="margin-top:16px">Fields copied each night</h3><ul>' +
      f.fields.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';

    var btn = document.getElementById('feed-preview-btn');
    var out = document.getElementById('feed-preview');
    if (btn && out) {
      btn.addEventListener('click', function () {
        // Inert: renders the data already in the page as the feed WOULD serialize it. Sends nothing.
        var bundle = {
          generated: '(training preview — not a live export)',
          catalog: D.catalog.length + ' titles',
          performance: D.performance.length + ' rows',
          audienceSample: D.audienceSample,
          payouts: D.payouts
        };
        out.hidden = false;
        out.textContent = JSON.stringify(bundle, null, 2);
      });
    }
  }
})();
