// npm run smoke:behavior — what a still picture cannot show, on a local page served from TWO origins (like a site and its CDN):
//   a sticky bar slid in by script, menus that open on a JavaScript hover handler, a JavaScript-animated accordion, an autoplaying
//   video with a pause button, a back-to-top button, a shared header stylesheet that is cross-origin AND only reachable through @import.
// Checks the whole chain: survey measures it -> the plan gate demands it -> explore times it (and is not fooled by the sticky bar)
// -> facts cite it -> port keeps it loadable -> verify FLAGS a static port and PASSES a rebuild that implements it.
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SITE = 4796, CDN = 4797, SCREEN = '_test-behave';

const site = {
  '/': `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Acme Fixture</title>
<link rel="stylesheet" href="/local.css"><link rel="stylesheet" href="http://localhost:${CDN}/main.css"></head><body>
<header class="topbar" id="topbar"><a class="logo" href="#top">Acme</a>
<ul class="nav"><li class="has-menu" id="m1"><span class="label">Products</span><ul class="sub"><li><a href="#alpha">Alpha</a></li><li><a href="#beta">Beta</a></li></ul></li><li class="plain"><a href="#pricing">Pricing</a></li></ul>
<div class="lang" id="lang"><span class="cur">English</span><ul class="langs"><li>Español</li><li>Deutsch</li></ul></div></header>
<div class="clone" id="clone"><span>Acme sticky bar</span><a href="#join">Join</a></div>
<main><section class="hero"><h1>Welcome to Acme</h1><p class="lead">A page with behavior a screenshot cannot show.</p>
<div class="vid"><video id="hv" autoplay muted loop playsinline src="/clip.webm"></video><button id="pp" class="pp" aria-label="Pause video">Pause</button></div>
<form class="join" id="join" onsubmit="return false"><input type="text" name="email" placeholder="Email address"><input type="submit" value="Join now"></form></section>
<section class="filler"><h2>Features</h2><p>Plenty of text to scroll through.</p></section>
<section class="faq"><h2>Frequently asked questions</h2>
<div class="item"><button class="q" aria-expanded="false">What is Acme?</button><div class="a"><p>Acme builds fixtures for testing page capture tools. It is a longer answer so the slide has height to animate.</p><p>Second paragraph of the answer.</p></div></div>
<div class="item"><button class="q" aria-expanded="false">Is it free?</button><div class="a"><p>Yes. Completely free to use for any purpose whatsoever.</p></div></div></section>
<section class="filler2"><h2>More</h2><p>The end.</p></section></main>
<button class="totop" id="totop">Top</button>
<script src="http://localhost:${CDN}/app.js"></script></body></html>`,
  '/local.css': `@import url("imp.css");
*{box-sizing:border-box}html,body{margin:0;font-family:Arial,sans-serif;color:#222;background:#fff}main{max-width:900px;margin:0 auto;padding:0 20px}
.hero{padding:40px 0}.vid{position:relative;width:480px;height:270px;background:#000;margin:20px 0}.vid video{width:100%;height:100%;object-fit:cover;display:block}
.pp{position:absolute;right:10px;bottom:10px;padding:6px 12px;border:0;cursor:pointer}.join{display:flex;gap:10px;margin:20px 0}
.join input[type=submit]{padding:10px 20px;background:#d33;color:#fff;border:0;font-weight:bold}.filler{height:1500px;padding-top:30px}.filler2{height:900px}
.faq{padding:30px 0}.faq .item{border:1px solid #ddd;margin-bottom:8px}.faq .q{width:100%;text-align:left;padding:14px 18px;border:0;background:transparent;font-size:17px}
.faq .a{height:0;overflow:hidden;padding:0 18px}.totop{position:fixed;right:20px;bottom:20px;padding:10px 14px;display:none}`,
  '/imp.css': '.hero{background:#eef3ff;padding-left:20px}',
};
const cdn = {
  '/main.css': '@import url("chrome.css");\n.lead{color:#555}',
  '/chrome.css': `.topbar{height:72px;display:flex;align-items:center;gap:30px;padding:0 30px;background:#fff;border-bottom:1px solid #e3e8ee;position:relative;z-index:5}
.logo{font-size:24px;font-weight:bold;color:#d33;text-decoration:none}.nav{display:flex;gap:26px;list-style:none;margin:0;padding:0}.nav li{position:relative;padding:6px 0}
.sub{position:absolute;top:100%;left:0;min-width:160px;margin:0;padding:8px 0;list-style:none;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.18);opacity:0;visibility:hidden;transition:opacity .3s ease-out,visibility .3s}
.has-menu.open .sub{opacity:1;visibility:visible}.lang{margin-left:auto;position:relative;padding:6px 0}
.langs{position:absolute;right:0;top:100%;margin:0;padding:6px 0;list-style:none;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,.18);display:none;min-width:120px}.lang.open .langs{display:block}
.clone{position:fixed;top:0;left:0;right:0;height:56px;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:0 30px;background:#fff;border-bottom:1px solid #ddd;transform:translateY(-100px);transition:transform .3s ease}`,
  '/app.js': `(function(){
function hoverOpen(el){el.addEventListener('mouseenter',function(){el.classList.add('open')});el.addEventListener('mouseleave',function(){el.classList.remove('open')})}
hoverOpen(document.getElementById('m1'));hoverOpen(document.getElementById('lang'));
var clone=document.getElementById('clone');
new IntersectionObserver(function(es){clone.style.transform=es[0].isIntersecting?'translateY(-100px)':'translateY(0)'}).observe(document.getElementById('topbar'));
var top=document.getElementById('totop');
window.addEventListener('scroll',function(){var y=window.scrollY;top.style.display=y>600?'block':'none';document.body.classList.toggle('scrolled',y>50)},{passive:true});
top.addEventListener('click',function(){window.scrollTo(0,0)});
function slide(el,to,ms){var from=el.getBoundingClientRect().height,t0=performance.now();(function step(now){var p=Math.min(1,(now-t0)/ms),e=1-Math.pow(1-p,3);el.style.height=(from+(to-from)*e)+'px';if(p<1)requestAnimationFrame(step)})(t0)}
document.querySelectorAll('.faq .q').forEach(function(q){q.addEventListener('click',function(){var a=q.nextElementSibling,open=q.getAttribute('aria-expanded')==='true';q.setAttribute('aria-expanded',String(!open));slide(a,open?0:a.scrollHeight,300)})});
var v=document.getElementById('hv'),pp=document.getElementById('pp');
pp.addEventListener('click',function(){if(v.paused){v.play();pp.textContent='Pause';pp.setAttribute('aria-label','Pause video')}else{v.pause();pp.textContent='Play';pp.setAttribute('aria-label','Play video')}});
})();`,
};

// a short animated .webm (VP8 plays in headless Chromium): Playwright records a page of moving boxes
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'behave-'));
const rec = await chromium.launch();
const rctx = await rec.newContext({ viewport: { width: 480, height: 270 }, recordVideo: { dir: tmp, size: { width: 480, height: 270 } } });
const rpage = await rctx.newPage();
await rpage.setContent('<body style="margin:0;background:#123"><div id=b style="position:absolute;width:80px;height:80px;background:#f90;top:90px"></div><script>let x=0;setInterval(()=>{x=(x+6)%400;b.style.left=x+"px"},30)</script>');
await rpage.waitForTimeout(2500);
const clipFile = await rpage.video().path();
await rctx.close(); await rec.close();
const clip = fs.readFileSync(clipFile);
fs.rmSync(tmp, { recursive: true, force: true });

const TYPES = { html: 'text/html; charset=utf-8', css: 'text/css', js: 'text/javascript', webm: 'video/webm' };
const serve = (files, port, withClip) => http.createServer((req, res) => {
  const p = new URL(req.url, 'http://x').pathname;
  const body = p === '/clip.webm' && withClip ? clip : files[p] !== undefined ? Buffer.from(files[p]) : null;
  if (!body) { res.writeHead(404); return res.end('not found'); }
  const type = TYPES[p === '/' ? 'html' : p.split('.').pop()] || 'application/octet-stream';
  const r = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
  if (r) { // media needs Range support to loop
    const start = r[1] ? +r[1] : 0, end = r[2] ? +r[2] : body.length - 1;
    res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${body.length}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
    return res.end(body.subarray(start, end + 1));
  }
  res.writeHead(200, { 'Content-Type': type, 'Content-Length': body.length, 'Accept-Ranges': 'bytes' });
  res.end(body);
}).listen(port);
const servers = [serve(site, SITE, true), serve(cdn, CDN, false)];

const dir = path.join(ROOT, 'screenshots', SCREEN, 'url');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'url.txt'), `http://localhost:${SITE}/\n`);
fs.writeFileSync(path.join(dir, 'config.json'), JSON.stringify({ motion: { sampleSec: 2, intervalMs: 250 }, defaultViewport: { width: 1000, height: 700 }, dpr: 1, explore: { timeBudgetSec: 150 } }));

const node = (script, args) => new Promise((r) => {
  const p = spawn(process.execPath, [path.join(ROOT, 'scripts', script), SCREEN, ...args], { cwd: ROOT });
  let text = '';
  for (const s of [p.stdout, p.stderr]) s.on('data', (b) => { text += b; process.stdout.write(b); });
  p.on('exit', (code) => r({ code, text }));
});
const out = path.join(ROOT, 'outputs', SCREEN), ex = path.join(out, 'explore');
const readJ = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const read = (f) => fs.readFileSync(f, 'utf8');
let failed;
try {
  // ---- 1. the whole capture, rule-based plan ----
  assert.equal((await node('run.mjs', ['--auto', '--force'])).code, 0, 'the run failed');

  // the shared header's CSS: cross-origin sheet -> @import -> second cross-origin sheet. Without it the header is unstyled and the page is far too tall
  const used = read(path.join(out, 'snapshot', 'used.css'));
  assert.ok(/\.topbar\s*\{/.test(used) && /\.clone/.test(used), 'used.css must contain the @import-ed cross-origin header rules (.topbar, .clone)');
  assert.ok(!/^@import/m.test(used.replace(/\/\*[\s\S]*?\*\//g, '')), 'no live @import may be left in used.css (a browser ignores it mid-file)');
  assert.ok(/\.hero\s*\{[^}]*background/.test(used.split('local.css')[1] || ''), 'a same-origin @import (imp.css) must be followed too');
  assert.ok(fs.existsSync(path.join(out, 'capture', 'assets', '_ext', `localhost_${CDN}`, 'chrome.css')), `a host with a port must be saved (localhost:${CDN} is not a legal folder name on Windows)`);
  assert.ok(fs.readdirSync(path.join(out, 'capture', 'js', '_ext'), { recursive: true }).some((f) => /app\.js$/.test(String(f))), "the other host's behavior script must be saved");

  // ---- 2. the survey measured what no picture shows ----
  const sv = readJ(path.join(ex, 'survey', 'survey.json'));
  const bh = readJ(path.join(ex, 'survey', 'behave.json'));
  const md = read(path.join(ex, 'survey', 'candidates.md'));
  assert.match(md, /## Behavior brief/, 'candidates.md must carry the behavior brief for the planner');
  const groups = bh.hover.groups;
  assert.ok(groups.some((g) => /Products/.test(g.label)) && groups.some((g) => /English/.test(g.label)), `the JavaScript hover handlers (menu, language picker) must be found: ${JSON.stringify(groups.map((g) => g.label))}`);
  const sc = bh.scroll.behaviors;
  const clone = sc.find((b) => b.sel === '#clone'), totop = sc.find((b) => b.sel === '#totop');
  assert.ok(clone && clone.kind === 'appears' && clone.at <= 150 && clone.hidesAtTop, `the sticky bar must be found, appearing near the header's height (${JSON.stringify(clone)})`);
  assert.ok(totop && totop.kind === 'appears' && Math.abs(totop.at - 600) < 100, `the back-to-top button must appear near 600px (${JSON.stringify(totop)})`);
  const scrolled = bh.scroll.rootChanges.find((r) => r.el === 'body' && r.added.includes('scrolled'));
  assert.ok(scrolled && scrolled.toY <= 120, `the <body> class change must be narrowed to its real threshold (50px), got ${scrolled?.toY}`);
  const vid = bh.media.videos[0];
  assert.ok(vid && vid.playing && vid.autoplay && vid.muted && vid.loop, `the video must be found playing by itself: ${JSON.stringify(vid)}`);
  assert.ok(vid.controlTests.some((t) => t.effect === 'pauses' && t.undoneByReclick), 'the pause control must be clicked and found to pause the video');

  // ---- 3. explore: timed, and not fooled by the sticky bar ----
  const states = readJ(path.join(ex, 'states.json'));
  const T = states.transitions;
  assert.ok(!T.some((t) => JSON.stringify(t.effects).includes('"key":"clone"')), 'the sticky bar slides in because the click scrolled: it is not an effect of that click');
  const faq = T.find((t) => /What is Acme/.test(JSON.stringify(t.action)) && t.timing);
  assert.ok(faq && faq.timing.some((x) => x.props.height && x.props.height.to > 40 && x.durationMs >= 120 && x.durationMs <= 450),
    `the JavaScript accordion slide must be seen and timed (about 300 ms): ${JSON.stringify(faq?.timing?.map((x) => [x.props, x.durationMs]))}`);
  assert.ok(T.some((t) => t.action.a === 'hover' && t.timing?.some((x) => x.css?.[0]?.durationMs === 300)), 'a hover menu fade must report its CSS transition (300 ms)');

  // ---- 4. facts cite it; the generated tests do not trip over a sticky copy of the text ----
  const facts = read(path.join(out, 'facts.md'));
  assert.ok(/\*\*\[S01\]\*\*/.test(facts) && /\*\*\[V01\]\*\*/.test(facts) && /animate it \(measured frame by frame\)/.test(facts), 'facts.md must carry [S##], [V##] and the measured animation');
  const fj = readJ(path.join(out, 'facts.json'));
  assert.ok(fj.required.scroll.length >= 2 && fj.required.media.length === 1, 'facts.json must require the scroll and media ids');
  assert.ok(read(path.join(out, 'spec', 'parity.spec.ts')).includes('filter({ visible: true })'), 'text assertions must match a visible element, not .first()');

  // ---- 5. the plan gate ----
  const planFile = path.join(ex, 'plan.json');
  const other = sv.elements.find((e) => /Pause video|Join now/.test(e.label))?.key;
  fs.writeFileSync(planFile, JSON.stringify({ actions: [other] }));
  let r = await node('check-plan.mjs', []);
  assert.equal(r.code, 1, 'a plan that ignores the JavaScript hover handlers must fail check:plan');
  assert.match(r.text, /has a JavaScript mouseenter handler/);
  fs.writeFileSync(planFile, JSON.stringify({ hover: [groups[0].keys[0]], actions: [other], skip: [{ key: groups[1].keys[0] }] }));
  assert.equal((await node('check-plan.mjs', [])).code, 1, 'a skip without a reason must fail');
  fs.writeFileSync(planFile, JSON.stringify({ hover: [groups[0].keys[0]], actions: [other], skip: [{ key: groups[1].keys[0], why: 'same list as the footer picker' }] }));
  assert.equal((await node('check-plan.mjs', [])).code, 0, 'a skip with a reason must pass');

  // ---- 6. port: the generic attribute bugs are gone ----
  assert.equal((await node('port.mjs', ['--force'])).code, 0, 'port failed');
  const app = path.join(out, 'app');
  const jsx = fs.readdirSync(path.join(app, 'components')).map((f) => read(path.join(app, 'components', f))).join('\n') + read(path.join(app, 'Page.tsx'));
  assert.ok(/autoPlay=\{true\}/.test(jsx) && !/autoplay=/.test(jsx), 'autoplay must become autoPlay (React drops the HTML spelling: the video never starts)');
  assert.ok(/type="submit" value="Join now"/.test(jsx), 'a submit input keeps its label as value (React ignores defaultValue there and shows "Submit")');
  const bm = read(path.join(app, 'BEHAVIOR.md'));
  assert.ok(/## Scroll/.test(bm) && /## Media/.test(bm) && /animation: /.test(bm), 'BEHAVIOR.md must carry scroll, media and measured animations');

  // ---- 7. verify FLAGS the static port ----
  const verify = () => spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'verify.mjs'), SCREEN], { cwd: ROOT, encoding: 'utf8', timeout: 400000 }).stdout;
  let v = verify();
  console.log(v);
  assert.match(v, /scroll 0\/2 match/, 'a static port has no sticky bar and no back-to-top: verify must say so');
  assert.match(v, /media 0\/1 match/, 'the pause button does nothing in a static port: verify must say so');
  assert.match(v, /timing 0\/\d+ match/, 'every animation is instant in a static port: verify must say so');

  // ---- 8. ...and PASSES a rebuild that implements the behavior ----
  fs.writeFileSync(path.join(app, 'behavior.ts'), `export function attach(): () => void {
  const offs: Array<() => void> = [];
  const on = (t: EventTarget | null, ev: string, fn: EventListener, o?: AddEventListenerOptions) => { if (t) { t.addEventListener(ev, fn, o); offs.push(() => t.removeEventListener(ev, fn, o)); } };
  const $ = (s: string) => document.querySelector<HTMLElement>(s);
  for (const id of ['m1', 'lang']) { const el = document.getElementById(id); on(el, 'mouseenter', () => el?.classList.add('open')); on(el, 'mouseleave', () => el?.classList.remove('open')); }
  const clone = $('#clone'), topbar = $('#topbar');
  if (clone && topbar) { const io = new IntersectionObserver(([e]) => { clone.style.transform = e.isIntersecting ? 'translateY(-100px)' : 'translateY(0)'; }); io.observe(topbar); offs.push(() => io.disconnect()); }
  const totop = $('#totop');
  on(window, 'scroll', () => { if (totop) totop.style.display = scrollY > 600 ? 'block' : 'none'; document.body.classList.toggle('scrolled', scrollY > 50); }, { passive: true });
  const slide = (el: HTMLElement, to: number, ms: number) => { const from = el.getBoundingClientRect().height, t0 = performance.now(); const step = (now: number) => { const p = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - p, 3); el.style.height = from + (to - from) * e + 'px'; if (p < 1) requestAnimationFrame(step); }; step(t0); };
  document.querySelectorAll<HTMLElement>('.faq .q').forEach((q) => on(q, 'click', () => { const a = q.nextElementSibling as HTMLElement, open = q.getAttribute('aria-expanded') === 'true'; q.setAttribute('aria-expanded', String(!open)); slide(a, open ? 0 : a.scrollHeight, 300); }));
  const v = document.getElementById('hv') as HTMLVideoElement | null, pp = document.getElementById('pp');
  on(pp, 'click', () => { if (!v || !pp) return; if (v.paused) { void v.play(); pp.textContent = 'Pause'; pp.setAttribute('aria-label', 'Pause video'); } else { v.pause(); pp.textContent = 'Play'; pp.setAttribute('aria-label', 'Play video'); } });
  return () => offs.forEach((f) => f());
}
`);
  const page = read(path.join(app, 'Page.tsx'));
  fs.writeFileSync(path.join(app, 'Page.tsx'), page.replace("import { useLayoutEffect } from 'react';", "import { useEffect, useLayoutEffect } from 'react';\nimport { attach } from './behavior';").replace('  return (\n    <>', '  useEffect(() => attach(), []);\n\n  return (\n    <>'));
  v = verify();
  console.log(v);
  assert.match(v, /scroll 2\/2 match \| media 1\/1 match \| timing (\d+)\/\1 match/, 'a rebuild that implements the behavior must match on scroll, media and timing');
  assert.match(v, /console: 0 error\(s\), 0 React warning\(s\)/, 'the rebuild must load without console errors');
  console.log(`\nbehavior smoke OK: scroll [${sc.map((b) => b.id).join(', ')}], media [${bh.media.videos.map((m) => m.id).join(', ')}], ${groups.length} JavaScript hover groups, FAQ slide timed, gate ✓, static port flagged ✓, rebuild passes ✓`);
} catch (e) { failed = e; }
for (const s of servers) s.close();
if (failed) { console.error(failed); process.exitCode = 1; }
