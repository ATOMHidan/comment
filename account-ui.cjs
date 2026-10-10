'use strict';

// Keep Waline's forms, verification, password recovery, profile and popup
// protocol. This module changes their presentation, not authentication APIs.
const colors = ['surface', 'container', 'low', 'primary', 'on-primary', 'tonal', 'on-tonal', 'text', 'muted', 'outline'];
const css = `
:root { --md-surface:#edf4ed; --md-container:#fff; --md-low:#edf4ed; --md-primary:#286a50; --md-on-primary:#fff; --md-tonal:#ccebd9; --md-on-tonal:#0a3828; --md-text:#22252a; --md-muted:#5d626b; --md-outline:#dce5dc; }
:root[data-theme=dark] { --md-surface:#101c16; --md-container:#19251e; --md-low:#22332a; --md-primary:#9cd5b5; --md-on-primary:#003823; --md-tonal:#304f3e; --md-on-tonal:#c2efd4; --md-text:#e4e5e9; --md-muted:#b7bbc4; --md-outline:#35483c; }
:root { --wa-bg:var(--md-surface); --wa-surface:var(--md-container); --wa-text:var(--md-text); --wa-text-soft:var(--md-muted); --wa-border:var(--md-outline); --wa-primary:var(--md-primary); }
html[data-account-view] { color-scheme:light; background:var(--md-surface); }
html[data-theme=dark] { color-scheme:dark; }
html[data-account-view] body { margin:0; background:var(--md-surface); color:var(--md-text); font:16px/1.6 system-ui,-apple-system,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif; }
html[data-account-view] *, html[data-account-view] *::before, html[data-account-view] *::after { box-sizing:border-box; }
html[data-account-view] .typecho-head-nav, html[data-account-view] .typecho-footer { display:none; }
.soyo-account-header { display:none; }
html[data-account-view] .soyo-account-header { display:flex; align-items:center; justify-content:space-between; gap:16px; max-width:560px; padding:24px; margin:auto; }
.soyo-account-header a { color:var(--md-muted); text-decoration:none; font-size:13px; min-height:44px; display:inline-flex; align-items:center; }
.soyo-account-header .soyo-account-brand { color:var(--md-text); font-size:17px; font-weight:650; letter-spacing:-.4px; }
html[data-account-view] .typecho-login-wrap { display:block; width:100%; height:auto; padding:8px 20px 36px; margin:0; }
html[data-account-view] .typecho-login { display:block; width:100%; max-width:440px; padding:32px; margin:auto; text-align:left; background:var(--md-container); border:1px solid var(--md-outline); border-radius:28px; box-shadow:0 8px 32px #00000008; }
.soyo-account-heading { display:flex; align-items:center; gap:14px; margin:0 0 28px; }
.soyo-account-symbol { display:grid; place-items:center; width:48px; height:48px; flex:0 0 48px; border-radius:16px; background:var(--md-tonal); color:var(--md-on-tonal); }
.soyo-account-symbol svg { width:25px; height:25px; fill:none; stroke:currentColor; stroke-width:1.7; }
html[data-account-view] .soyo-account-heading h1 { margin:0; font:650 26px/1.4 system-ui,'Microsoft YaHei',sans-serif; letter-spacing:-.7px; color:var(--md-text); }
.soyo-account-heading small { display:block; margin-top:2px; font-size:12px; color:var(--md-muted); }
html[data-account-view] .typecho-login form p { margin:0 0 18px; }
html[data-account-view] .typecho-login label.sr-only { position:static; width:auto; height:auto; clip:auto; overflow:visible; display:block; padding:0; margin:0 0 7px; font-size:13px; color:var(--md-muted); }
html[data-account-view] .typecho-login input:not([type=checkbox]):not([type=hidden]) { display:block; width:100%; min-width:0; min-height:52px; padding:12px 15px; border:1px solid var(--md-outline); border-radius:14px; background:var(--md-low); color:var(--md-text); box-shadow:none; font:inherit; font-size:16px; }
html[data-account-view] .typecho-login input::placeholder { color:var(--md-muted); opacity:.8; font-size:14px; }
html[data-account-view] .typecho-login input[type=checkbox] { width:18px; height:18px; margin:0 7px 0 0; vertical-align:middle; accent-color:var(--md-primary); }
html[data-account-view] .typecho-login .btn { width:100%; min-height:48px; padding:12px 20px; border:0; border-radius:999px; background:var(--md-primary); color:var(--md-on-primary); box-shadow:none; font:600 15px/1.5 system-ui,'Microsoft YaHei',sans-serif; cursor:pointer; }
html[data-account-view] .typecho-login .btn:disabled { opacity:.55; cursor:wait; }
html[data-account-view] .typecho-login a { color:var(--md-primary); text-decoration:none; }
html[data-account-view] .typecho-login .forgot-password a, html[data-account-view] .more-link a { display:inline-flex; align-items:center; min-height:44px; }
html[data-account-view] .typecho-login label[for=remember] { display:inline-flex; align-items:center; min-height:44px; color:var(--md-muted); font-size:13px; }
html[data-account-view] .typecho-login .more-link { display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:8px; margin:14px 0 0; color:var(--md-outline); font-size:13px; }
html[data-account-view] .typecho-login .captcha-container:empty { display:none; }
html[data-account-view] .message.popup.notice { width:calc(100% - 32px); max-width:480px; top:12px!important; margin:0; padding:12px 16px; left:50%; transform:translateX(-50%); border:1px solid var(--md-outline); border-radius:16px; background:var(--md-tonal); color:var(--md-on-tonal); box-shadow:0 4px 20px #00000012; z-index:1000; }
html[data-account-view] .message.popup.notice ul { margin:0; padding:0; list-style:none; }
html[data-account-view] :focus-visible { outline:3px solid var(--md-primary); outline-offset:3px; }
/* Intentionally hide only the UI. The OAuth endpoints remain available. */
.social-accounts, a[href*="/oauth?"], a[href*="/oauth/"], a[href^="oauth?"] { display:none!important; }
@media(max-width:380px) { html[data-account-view] .typecho-login-wrap { padding:4px 12px 24px; } html[data-account-view] .typecho-login { padding:24px 20px; border-radius:24px; } html[data-account-view] .soyo-account-header { padding:12px 20px; } }
`;

function initialize() {
  'use strict';
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  const names = ['surface', 'container', 'low', 'primary', 'on-primary', 'tonal', 'on-tonal', 'text', 'muted', 'outline'];
  const system = matchMedia('(prefers-color-scheme: dark)');
  const allowedOrigins = new Set(['https://262860.xyz', 'https://www.262860.xyz', 'https://neatblog.netlify.app']);
  let saved;
  try { saved = JSON.parse(localStorage.getItem('soyo-account-theme')); } catch {}
  const apply = value => {
    const theme = value?.theme === 'light' || value?.theme === 'dark' ? value.theme : system.matches ? 'dark' : 'light';
    root.dataset.theme = theme;
    const shades = value?.colors;
    if (Array.isArray(shades) && shades.length === names.length && shades.every(color => /^#[\da-f]{6}$/i.test(color))) {
      names.forEach((name, i) => root.style.setProperty('--md-' + name, shades[i]));
    }
    try { localStorage.setItem('soyo-account-theme', JSON.stringify({ theme, colors: shades })); } catch {}
  };
  const queryColors = (params.get('colors') || '').split(',').map(color => '#' + color);
  apply(params.has('theme') ? { theme: params.get('theme'), colors: queryColors } : saved);
  system.addEventListener('change', () => { if (!params.has('theme')) apply(null); });
  if (params.get('soyo_reset') === '1') {
    try { localStorage.removeItem('TOKEN'); sessionStorage.removeItem('TOKEN'); } catch {}
    window.TOKEN = undefined;
  }
  // The v2 client and official admin keep owning the login handshake.
  window.oauthServices = [];
  window.SITE_URL = window.SITE_URL || 'https://262860.xyz/';
  window.SITE_NAME = window.SITE_NAME || 'Soyo Course';
  let openerOrigin;
  try { openerOrigin = new URL(document.referrer).origin; } catch {}
  const announce = () => {
    if (window.opener && allowedOrigins.has(openerOrigin)) {
      window.opener.postMessage({ type: 'SOYO_AUTH_READY' }, openerOrigin);
    }
  };
  window.addEventListener('message', event => {
    if (event.source !== window.opener || !allowedOrigins.has(event.origin)) return;
    if (event.data?.type === 'SOYO_THEME') apply(event.data.data);
    if (event.data?.type === 'TOKEN' && typeof event.data.data === 'string') {
      window.TOKEN = event.data.data;
      try { sessionStorage.setItem('TOKEN', event.data.data); } catch {}
    }
  });
  const update = () => {
    const view = location.pathname.match(/^\/ui\/(login|register|forgot)(?:\/|$)/)?.[1];
    if (view) root.dataset.accountView = view;
    else delete root.dataset.accountView;
    const title = { login: '登录', register: '注册', forgot: '找回密码' }[view];
    document.title = (title || '账户') + ' · Soyo Course';
    const card = document.querySelector('.typecho-login');
    if (!card || !title) return;
    let heading = card.querySelector('.soyo-account-heading');
    if (!heading) {
      heading = document.createElement('div');
      heading.className = 'soyo-account-heading';
      heading.innerHTML = '<span class="soyo-account-symbol" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></svg></span><div><h1></h1><small>邮箱账号</small></div>';
      card.prepend(heading);
    }
    const h1 = heading.querySelector('h1');
    if (h1.textContent !== title) h1.textContent = title;
    const email = card.querySelector('input[name=email]');
    if (email) { email.type = 'email'; email.autocomplete = view === 'login' ? 'username' : 'email'; }
    card.querySelectorAll('input[type=password]').forEach(input => {
      input.autocomplete = view === 'login' ? 'current-password' : 'new-password';
    });
  };
  // Runs before React mounts; CSS already hides social buttons before paint.
  root.dataset.accountView = location.pathname.match(/^\/ui\/(login|register|forgot)(?:\/|$)/)?.[1] || '';
  if (!root.dataset.accountView) delete root.dataset.accountView;
  const observer = new MutationObserver(update);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('popstate', update);
  window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
  update();
  announce();
}

function enhance(html) {
  if (!/<\/head>/i.test(html) || !/<script\s+src=/i.test(html)) return html;
  const init = `<script id="soyo-account-init">(${initialize.toString()})();</script>`;
  return html
    .replace(/<html>/i, '<html lang="zh-CN">')
    .replace(/<title>[^<]*<\/title>/i, '<title>?? ? Soyo Course</title>')
    .replace(/<\/head>/i, `<style id="soyo-account-style">${css}</style></head>`)
    .replace(/(<script\s+src=)/i, '<header class="soyo-account-header"><a class="soyo-account-brand" href="https://262860.xyz/" target="_blank" rel="noopener">Soyo Course</a><a href="https://262860.xyz/" target="_blank" rel="noopener">返回博客 ↗</a></header>' + init + '$1')
    .replace('//unpkg.com/@waline/admin"', '//unpkg.com/@waline/admin@0.36.0/dist/admin.js"');
}

function decorateDashboard(request, response) {
  const path = new URL(request.url, 'https://waline.invalid').pathname;
  if (!/^\/ui(?:\/|$)/.test(path)) return;
  const end = response.end;
  response.end = function (body, ...args) {
    if (typeof body === 'string' || Buffer.isBuffer(body)) {
      const original = Buffer.isBuffer(body) ? body.toString('utf8') : body;
      const enhanced = enhance(original);
      if (enhanced !== original) {
        response.removeHeader('Content-Length');
        response.removeHeader('ETag');
        response.setHeader('Cache-Control', 'no-store');
        body = Buffer.from(enhanced);
      }
    }
    return end.call(this, body, ...args);
  };
}

module.exports = { colors, css, enhance, initialize, decorateDashboard };
