// npm run smoke  — runs the whole capture on a tiny local page that moves in every way the pipeline must handle:
// timer-driven carousel (stepped), CSS marquee (continuous), scroll-triggered counter, reveal via setTimeout,
// finite entrance animation, lazy image, fixed header. Fails loudly if any of it is not captured.
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PORT = 4799, SCREEN = '_test-motion';
const HTML = `<!doctype html><html><head><meta charset="utf-8"><title>motion fixture</title><style>
body{margin:0;font:16px Arial}
header{position:fixed;top:0;left:0;right:0;height:60px;background:#162544;color:#fff;line-height:60px;padding:0 20px;z-index:9}
section{height:600px;padding:80px 20px 20px;border-bottom:1px solid #ccc}.band2{background:#eef}
.viewport{width:300px;height:100px;overflow:hidden;border:1px solid #333;margin-bottom:20px}
.carousel-track{display:flex;width:1200px;transition:transform .4s}.carousel-track div{width:300px;height:100px;flex:none;color:#fff;font-size:30px;text-align:center;line-height:100px}
.mq{width:300px;overflow:hidden;white-space:nowrap;border:1px solid #333}.mq-inner{display:inline-block;animation:scroll 6s linear infinite}
@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-300px)}}
.reveal{opacity:0;transition:opacity .4s}.reveal.in{opacity:1}
.fade{animation:fadeIn 1s both}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.counter{font-size:48px}
</style></head><body><header>Fixture</header>
<main><div class="wrap"><section><h2>Intro</h2><p class="fade">hello</p>
<div class="viewport"><div class="carousel-track" id="trk"><div style="background:#c33">1</div><div style="background:#3a3">2</div><div style="background:#33c">3</div><div style="background:#c93">4</div></div></div>
<div class="mq"><span class="mq-inner">breaking news · breaking news · breaking news · breaking news</span></div></section>
<section class="band2"><h2>Numbers</h2><div class="counter elementor-counter-number" data-to-value="500">0</div><p class="reveal" id="rv">revealed after scroll</p></section>
<section><h2>Lazy</h2><img loading="lazy" width="200" height="100" src="/pic.svg" alt=""></section></div></main>
<div id="cookie" style="position:fixed;bottom:0;left:0;right:0;height:50px;background:#000;color:#fff">We use cookies <button>OK</button></div>
<script>
let n=0;setInterval(()=>{n=(n+1)%4;document.getElementById('trk').style.transform='translateX(-'+n*300+'px)'},2000);
const c=document.querySelector('.counter');
new IntersectionObserver((es,o)=>{es.forEach(e=>{if(!e.isIntersecting)return;o.unobserve(c);let v=0;const t=setInterval(()=>{v=Math.min(500,v+25);c.textContent=v;if(v>=500)clearInterval(t)},50)})}).observe(c);
const rv=document.getElementById('rv');
new IntersectionObserver((es,o)=>{es.forEach(e=>{if(e.isIntersecting){setTimeout(()=>rv.classList.add('in'),80);o.unobserve(rv)}})}).observe(rv);
</script></body></html>`;

// app shell: the window never scrolls, a 3000px page lives inside a 100vh div
const SHELL = `<!doctype html><html><head><meta charset="utf-8"><title>shell fixture</title></head><body style="margin:0;height:100vh;overflow:hidden">
<div style="display:flex;height:100vh"><nav style="width:200px;background:#ddd">nav</nav>
<div id="scroller" style="flex:1;overflow-y:auto"><div style="height:3000px;background:linear-gradient(#fff,#36c)"><h2>Top</h2></div><h2>Bottom</h2></div></div></body></html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/shell') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end(SHELL); }
  if (req.url === '/pic.svg') { res.writeHead(200, { 'content-type': 'image/svg+xml' }); return res.end('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><rect width="200" height="100" fill="orange"/></svg>'); }
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(HTML);
}).listen(PORT);

const dir = path.join(ROOT, 'screenshots', SCREEN, 'url');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'url.txt'), `http://localhost:${PORT}/\n`);
fs.writeFileSync(path.join(dir, 'config.json'), JSON.stringify({ motion: { sampleSec: 8, intervalMs: 250 }, defaultViewport: { width: 1000, height: 500 }, dpr: 1 }));
const sdir = path.join(ROOT, 'screenshots', '_test-shell', 'url');
fs.mkdirSync(sdir, { recursive: true });
fs.writeFileSync(path.join(sdir, 'url.txt'), `http://localhost:${PORT}/shell\n`);
fs.writeFileSync(path.join(sdir, 'config.json'), JSON.stringify({ motion: { sampleSec: 2, intervalMs: 250 }, defaultViewport: { width: 1000, height: 500 }, dpr: 1 }));

const code = await new Promise((r) => {
  const p = spawn(process.execPath, [path.join(ROOT, 'scripts', 'run.mjs'), SCREEN, '_test-shell', '--skip', 'explore,selfcheck', '--force'], { cwd: ROOT, stdio: 'inherit' });
  p.on('exit', r);
});
assert.equal(code, 0, 'run.mjs failed');
// verify the fixture against its own capture: everything must match (same page = the perfect rebuild)
const vcode = await new Promise((r) => {
  const p = spawn(process.execPath, [path.join(ROOT, 'scripts', 'verify.mjs'), SCREEN], { cwd: ROOT, stdio: 'inherit', env: { ...process.env, URL: `http://localhost:${PORT}/` } });
  p.on('exit', r);
});
server.close();
assert.equal(vcode, 0, 'verify.mjs failed');

const out = path.join(ROOT, 'outputs', SCREEN);
const j = (f) => JSON.parse(fs.readFileSync(path.join(out, f), 'utf8'));
const motion = j('motion.json'), E = motion.entries;
assert.equal(motion.freeze.stillMoving, 0, `page still moving after freeze (${motion.freeze.stillMoving})`);
assert.ok(E.some((e) => e.kind === 'counter' && e.text === '500'), 'counter should have finished at 500');
const mq = E.find((e) => e.kind === 'css-animation' && e.name === 'scroll');
assert.ok(mq && mq.iterations === 'infinite' && mq.measured?.[0]?.velocity.x < -30, `marquee should be measured scrolling left (~-50px/s): ${JSON.stringify(mq?.measured)}`);
assert.ok(E.some((e) => e.kind === 'css-animation' && e.name === 'fadeIn'), 'finite entrance animation should be listed');
const car = E.find((e) => e.kind === 'mover' && e.mode === 'stepped');
assert.ok(car && Math.abs(car.intervalMs - 2000) < 700, `carousel should step every ~2000ms: ${JSON.stringify(car)}`);
assert.ok(fs.readFileSync(path.join(out, 'snapshot', 'used.css'), 'utf8').includes('@keyframes scroll'), 'used.css should keep the marquee keyframes');
assert.ok(fs.readFileSync(path.join(out, 'snapshot', 'rendered.html'), 'utf8').includes('class="reveal in"'), 'rendered.html should hold the revealed state');
assert.ok(!/<script/.test(fs.readFileSync(path.join(out, 'snapshot', 'rendered.html'), 'utf8')), 'rendered.html should have no scripts');
const ref = j('reference.json');
assert.ok(ref.file === 'reference.png' && ref.sections >= 3, 'reference.png and >=3 section crops expected');
const fid = j('snapshot/fidelity/report.json');
assert.ok(fid.bad_pct < 3, `offline snapshot should match the reference (got ${fid.bad_pct}%)`);
assert.ok(fs.existsSync(path.join(out, 'manifest.json')), 'manifest.json for verify');
// draw-ui baseline: regions.json measured by the skill's own script
assert.ok(fs.existsSync(path.join(out, 'measure-00', 'measurements.json')), 'draw-ui measure-00/ should exist');
assert.ok(j('regions.json').regions.length >= 4, 'regions.json should hold bands + headings');
// cookie banner hidden in every shot: the bottom of the first screen must not be the black banner
const px = (f, x, y) => JSON.parse(spawnSync(process.platform === 'win32' ? 'python' : 'python3', ['-c', `from PIL import Image;print(list(Image.open(r"${f}").convert("RGB").getpixel((${x},${y}))))`], { encoding: 'utf8' }).stdout);
assert.notDeepEqual(px(path.join(out, 'reference.png'), 500, 475), [0, 0, 0], 'cookie banner should be hidden');
// app shell: the 3000px inner page must be photographed whole
const shell = JSON.parse(fs.readFileSync(path.join(ROOT, 'outputs', '_test-shell', 'reference.json'), 'utf8'));
assert.ok(shell.height >= 2900, `inner scroller should be expanded and photographed whole (reference ${shell.height}px tall)`);
const vr = j('verify/report.json');
assert.ok(vr.bad_pct < 3 && Math.abs(vr.size_delta_px[1]) <= 2, `verify of the same page should be ~identical: ${vr.bad_pct}% ${vr.size_delta_px}`);
assert.ok(vr.sections.length === 3 && vr.motion.every((m) => m.ok !== false), `motion check should pass: ${JSON.stringify(vr.motion.filter((m) => m.ok === false))}`);
console.log(`\nsmoke OK: ${E.length} motion entries, ${ref.sections} sections, offline copy ${fid.bad_pct}% different, verify ${vr.bad_pct}% / motion ${vr.motion.filter((m) => m.ok).length}/${vr.motion.length}`);
