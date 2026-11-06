// Browser session for one screen: same viewport/DPR as the user's screenshots, a navigation guard that keeps us
// on THIS page, a postback/mutation policy, and recording of dialogs, popups, downloads, requests and assets.
import { chromium } from 'playwright';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const INPAGE = fs.readFileSync(new URL('./inpage.js', import.meta.url), 'utf8');
const DROP = /^(__VIEWSTATE|__VIEWSTATEGENERATOR|__EVENTVALIDATION|__VIEWSTATEENCRYPTED|__PREVIOUSPAGE|__ASYNCPOST|__LASTFOCUS)$/;
const ASSET_TYPES = new Set(['image', 'font', 'stylesheet', 'media']);
// scripts from other hosts are saved too (js/_ext/<host>/...): a site's real behavior (menus, sticky headers, accordions) usually
// lives in its CDN bundles, and the spec writer can only read what was saved. Analytics, ads and chat widgets are not behavior.
const THIRD_PARTY_NOISE = /(google-analytics|googletagmanager|googleadservices|doubleclick|googlesyndication|gstatic\.com\/recaptcha|google\.com\/recaptcha|facebook\.(net|com)|hotjar|clarity\.ms|segment\.(io|com)|mixpanel|amplitude|fullstory|newrelic|nr-data|sentry|datadoghq|intercom|hubspot|hs-(scripts|analytics|banner)|pagesense|salesiq|livechat|tawk\.to|crisp\.chat|onetrust|cookielaw|cookiebot|optimizely|taboola|outbrain|criteo|adsrvr|licdn\.com\/px|ads-twitter|tiktok|snap\.licdn|bing\.com|cloudflareinsights|cdn-cgi|trustpilot|zdassets|drift\.com|quantserve|scorecardresearch|mathtag|adroll)/i;
const MAX_THIRD_PARTY_SCRIPT = 3e6;

export const samePage = (a, b) => a.origin === b.origin && a.pathname.toLowerCase() === b.pathname.toLowerCase();

// browserChannel "msedge" / "chrome": the browser installed on the machine, when Playwright's own download is blocked
export const launch = (cfg) => chromium.launch({
  channel: cfg.browserChannel || undefined,
  headless: !cfg.headed,
  args: cfg.launchArgs ?? [],
  ignoreDefaultArgs: cfg.scrollbars ? ['--hide-scrollbars'] : [], // real browsers show scrollbars; they take layout width
});

const formOf = (req) => {
  const b = req.postData();
  if (!b) return undefined;
  const ct = req.headers()['content-type'] || '';
  if (ct.includes('x-www-form-urlencoded') || (!ct && /^[^{[][^=]*=/.test(b))) {
    const o = {};
    for (const [k, v] of new URLSearchParams(b)) if (!DROP.test(k)) o[k] = v.length > 200 ? v.slice(0, 200) + '…' : v;
    return o;
  }
  if (ct.includes('multipart/form-data')) return '[multipart form data]';
  return b.length > 2000 ? b.slice(0, 2000) + '…' : b;
};

// where a response body is stored: same-origin keeps its URL path, others go under _ext/<host>/; a query string
// (WebResource.axd?d=..., ImageHandler.ashx?id=5) gets a hash suffix so different resources never collide
const fileFor = (u, start, contentType) => {
  let p;
  try { p = decodeURIComponent(u.pathname); } catch { p = u.pathname; }
  p = p.replace(/\/$/, '/index').replace(/[<>:"|?*\\]/g, '_');
  let ext = path.posix.extname(p);
  if (u.search) {
    const h = crypto.createHash('md5').update(u.search).digest('hex').slice(0, 8);
    if (!ext) ext = '.' + ((contentType || '').split(';')[0].split('/')[1] || 'bin').replace('svg+xml', 'svg').replace(/^(x-)?javascript$/, 'js');
    p = p.slice(0, p.length - path.posix.extname(p).length) + '__' + h + ext;
  }
  p = path.posix.join(u.origin === start.origin ? '' : `_ext/${u.host.replace(/[<>:"|?*\\]/g, '_')}`, p).replace(/^\//, '');
  // Windows / OneDrive choke on long paths (YouTube's "k=ytembeds.base.../rs=..." could not even be deleted): hash them
  if (p.length > 110 || p.split('/').some((s) => s.length > 60)) {
    const ext = (path.posix.extname(p).match(/^\.[a-z0-9]{1,5}$/i) || ['.' + ((contentType || '').split(';')[0].split('/')[1] || 'bin').replace('svg+xml', 'svg').replace(/[^a-z0-9]/gi, '')])[0];
    p = `_long/${crypto.createHash('md5').update(u.href).digest('hex').slice(0, 16)}${ext}`;
  }
  return p;
};

export async function openPage(browser, cfg, { url, viewport, dpr, assetsDir, jsDir, assets = {} }) {
  const target = new URL(url);
  // a file path (npm run login), or the session itself held in memory (npm run ui: never on disk, where Codex could read it)
  const st = cfg.auth?.storageState;
  const storageState = st && (typeof st === 'object' || fs.existsSync(st)) ? st : undefined;
  const context = await browser.newContext({
    viewport, deviceScaleFactor: dpr, storageState, httpCredentials: cfg.auth?.httpCredentials || undefined,
    ignoreHTTPSErrors: true, acceptDownloads: true, serviceWorkers: 'block', locale: cfg.locale || undefined, timezoneId: cfg.timezone || undefined,
  });
  await context.addInitScript({ content: INPAGE });
  // client-side routing (React/Angular/Vue) never makes a navigation request: record history changes instead
  await context.addInitScript(() => {
    for (const m of ['pushState', 'replaceState']) {
      const orig = history[m];
      history[m] = function (s, t, u) { try { (window.__pwNav ||= []).push(String(u ?? '')); } catch {} return orig.apply(this, arguments); };
    }
  });

  const guard = { loading: false, allowPost: cfg.mode !== 'readonly', events: [] };
  const rec = (e) => guard.events.push({ ...e, at: Date.now() });
  let page;

  await context.route('**/*', async (route) => {
    const req = route.request();
    let u;
    try { u = new URL(req.url()); } catch { return route.continue(); }
    if (!/^https?:$/.test(u.protocol)) return route.continue();
    let frame = null;
    try { frame = req.frame(); } catch {}
    const nav = req.isNavigationRequest();
    const method = req.method(), mutating = !['GET', 'HEAD', 'OPTIONS'].includes(method);
    if (nav && frame && page && frame.page() !== page) { // popup / new tab
      rec({ type: 'popup', url: req.url(), method });
      return route.abort('aborted');
    }
    const main = nav && frame && page && frame === page.mainFrame();
    if (main && !guard.loading) {
      if (!samePage(u, target) || (!mutating && u.search !== target.search)) {
        rec({ type: 'navigation', method, url: req.url(), post: formOf(req) });
        return route.abort('aborted');
      }
      if (!mutating) return route.continue(); // reload of this same page
      const ok = guard.allowPost;
      rec({ type: 'postback', status: ok ? 'sent' : 'blocked', method, url: req.url(), post: formOf(req) });
      return ok ? route.continue() : route.abort('aborted');
    }
    const rt = req.resourceType();
    if (!nav && !guard.loading && (rt === 'xhr' || rt === 'fetch' || rt === 'eventsource' || rt === 'other')) {
      const async = !!req.headers()['x-microsoftajax'];
      if (mutating) {
        const ok = guard.allowPost;
        rec({ type: async ? 'async-postback' : 'request', status: ok ? 'sent' : 'blocked', method, url: req.url(), post: formOf(req) });
        return ok ? route.continue() : route.abort('aborted');
      }
      if (rt !== 'other') rec({ type: 'request', status: 'sent', method, url: req.url() });
    }
    return route.continue();
  });

  // ---------- assets: every image/font/stylesheet/media (+ same-origin scripts) the page loads ----------
  const pending = [], failed = []; // failed: assets that were seen but could not be written (the capture reports them)
  const save = async (res) => {
    const req = res.request(), url = res.url(), rt = req.resourceType();
    if (!/^https?:/.test(url) || assets[url] || res.status() >= 300) return;
    const u = new URL(url);
    const own = u.origin === target.origin;
    const isScript = rt === 'script' && (own || (cfg.capture?.thirdPartyScripts !== false && !THIRD_PARTY_NOISE.test(url)));
    if (!(ASSET_TYPES.has(rt) && assetsDir) && !(isScript && jsDir)) return;
    assets[url] = { pending: true };
    try {
      const body = await res.body();
      if (body.length > 15e6 || (isScript && !own && body.length > MAX_THIRD_PARTY_SCRIPT)) return void delete assets[url];
      const ct = res.headers()['content-type'] || null;
      const file = fileFor(u, target, ct);
      const full = path.join(isScript ? jsDir : assetsDir, file);
      fs.mkdirSync(path.dirname(full), { recursive: true });
      if (!fs.existsSync(full)) fs.writeFileSync(full, body);
      assets[url] = { file: (isScript ? 'js/' : 'assets/') + file, type: rt, contentType: ct, bytes: body.length };
      // saved under the final URL of a redirect (unpkg's tailwindcss@^2 -> @2.2.19); the page asked for the first one, so key the chain too
      for (let r = req.redirectedFrom(); r; r = r.redirectedFrom()) assets[r.url()] ??= assets[url];
    } catch (e) { delete assets[url]; failed.push({ url, error: String(e.message).split('\n')[0].slice(0, 120) }); }
  };
  context.on('response', (res) => pending.push(save(res)));

  page = await context.newPage();
  context.on('page', async (p) => { if (p !== page) { rec({ type: 'popup', url: p.url() }); await p.close().catch(() => {}); } });
  page.on('dialog', async (d) => {
    rec({ type: 'dialog', kind: d.type(), message: d.message(), default: d.defaultValue() || undefined });
    await (d.type() === 'beforeunload' || d.type() === 'alert' ? d.accept() : d.dismiss()).catch(() => {});
  });
  page.on('download', (d) => { rec({ type: 'download', url: d.url(), file: d.suggestedFilename() }); d.cancel().catch(() => {}); });
  page.on('console', (m) => { if (m.type() === 'error') rec({ type: 'console', message: m.text().slice(0, 300) }); });
  page.on('pageerror', (e) => rec({ type: 'pageerror', message: String(e.message).slice(0, 300) }));

  // requests older than 4s are long-polls / streams: they don't count as "still loading"
  const inflight = new Map();
  page.on('request', (r) => inflight.set(r, Date.now()));
  const done = (r) => inflight.delete(r);
  page.on('requestfinished', done);
  page.on('requestfailed', done);
  const busy = () => { const t = Date.now() - 4000; for (const s of inflight.values()) if (s > t) return true; return false; };

  // wait until the page is quiet: no requests for 300ms (max 8s), loaded, fonts ready, plus settleMs for animations
  const settle = async (ms = cfg.explore?.settleMs ?? 400, quietMax = 8000) => {
    await page.waitForTimeout(150);
    const end = Date.now() + quietMax;
    let quiet = 0;
    while (Date.now() < end) {
      if (!busy()) { quiet += 100; if (quiet >= 300) break; } else quiet = 0;
      await page.waitForTimeout(100);
    }
    await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
    await page.waitForTimeout(ms);
  };

  const load = async ({ idleMs = cfg.networkIdleMs ?? 5000, quietMax = 8000 } = {}) => { // explore resets pass small values: the page is already warm (cached assets)
    guard.loading = true;
    try {
      // slow public sites time out now and then: one retry before giving up
      let res;
      for (let i = 0; ; i++) {
        try { res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); break; }
        catch (e) { if (i >= 1 || !/Timeout|ERR_|net::/.test(e.message)) throw e; }
      }
      await page.waitForLoadState('networkidle', { timeout: idleMs }).catch(() => {});
      await settle(undefined, quietMax);
      return res;
    } finally { guard.loading = false; }
  };

  return {
    context, page, guard, rec, settle, load, assets, failed,
    flush: async () => { await Promise.allSettled(pending); return Object.fromEntries(Object.entries(assets).filter(([, a]) => a.file)); },
    close: async () => { await Promise.allSettled(pending); await context.close().catch(() => {}); },
  };
}
