/* Streamscape - shared helpers + partner-console session.  MOCK SITE FOR TRAINING.
 * The console sign-in is simulated in the browser so the exercise runs from a folder (file://). */

window.SS = window.SS || {};

(function () {
  'use strict';

  var KEY = 'ss_partner_session';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function num(n) { return Number(n).toLocaleString('en-US'); }
  function money(n) { return '$' + Number(n).toLocaleString('en-US'); }
  function titleById(id) {
    var out = null;
    SS.DATA.catalog.forEach(function (t) { if (t.id === id) { out = t; } });
    return out;
  }

  function readSession() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }

  function initLogin() {
    var form = document.getElementById('login-form');
    if (!form) { return; }
    var err = document.getElementById('login-error');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var u = document.getElementById('username').value.trim().toLowerCase();
      var p = document.getElementById('password').value;
      var found = null;
      SS.DATA.partners.forEach(function (pt) { if (pt.user === u && pt.pass === p) { found = pt; } });
      if (found) {
        localStorage.setItem(KEY, JSON.stringify({ code: found.code, name: found.name, user: found.user, plan: found.plan }));
        location.href = 'dashboard.html';
      } else {
        err.hidden = false;
        err.textContent = 'Sign-in failed. Use the partner account from your welcome email.';
      }
    });
  }

  function requireSession() {
    var s = readSession();
    if (!s) { location.replace('login.html'); return null; }
    var who = document.getElementById('who');
    if (who) { who.textContent = s.name; }
    var logout = document.getElementById('logout');
    if (logout) {
      logout.addEventListener('click', function (ev) {
        ev.preventDefault();
        localStorage.removeItem(KEY);
        location.href = 'login.html';
      });
    }
    var here = location.pathname.split('/').pop();
    var links = document.querySelectorAll('.pnav a');
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute('href') === here) { links[i].classList.add('is-active'); }
    }
    return s;
  }

  SS.esc = esc;
  SS.num = num;
  SS.money = money;
  SS.titleById = titleById;
  SS.readSession = readSession;
  SS.initLogin = initLogin;
  SS.requireSession = requireSession;
})();
