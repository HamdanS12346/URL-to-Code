// Making a live page hold still, then photographing it the same way every time:
//   warmUp  scroll through once so lazy images, reveal animations and counters have all run
//   freeze  carousels to slide 0, CSS animations parked, fake clock paused (JS timers stop)
//   shoot   one screenshot per viewport-height step, each with its exact scrollY (scripts/imgtools.py pastes them)
// Used by capture (the legacy page), fidelity (the offline snapshot) and verify (the rebuild): same procedure = fair diff.
import fs from 'node:fs';
import path from 'node:path';

export const INPAGE = fs.readFileSync(new URL('./inpage.js', import.meta.url), 'utf8');

// freeze: "clock" (default) | "css" (no fake clock: only CSS + carousel reset) | "none"
export async function installClock(context, cfg) {
  if (cfg.freeze === 'none' || cfg.freeze === 'css') return false;
  try { await context.clock.install(); return true; } catch { return false; }
}

export async function warmUp(page, w = {}) {
  const { stepFrac = 0.6, pauseMs = 400, maxSteps = 150, stableMs = 900, maxStableSec = 15, maxHeightPx = 30000 } = w;
  const dims = () => page.evaluate(() => ({ h: Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0), vh: innerHeight }));
  const to = (y) => page.evaluate((v) => scrollTo({ top: v, behavior: 'instant' }), y);
  let y = 0;
  for (let n = 0; n < maxSteps; n++) {
    await to(y);
    await page.waitForTimeout(pauseMs);
    const { h, vh } = await dims();
    if (y + vh >= Math.min(h, maxHeightPx)) break; // infinite scroll: stop at maxHeightPx
    y += Math.max(100, Math.round(vh * stepFrac));
  }
  // done when images, document height and counter texts stop changing
  const fp = () => page.evaluate(() => [[...document.images].filter((i) => !i.complete).length, document.documentElement.scrollHeight,
    [...document.querySelectorAll('[data-to-value],.elementor-counter-number,.counter,.odometer')].map((e) => e.textContent.trim()).join(',')].join('|'));
  let last = '', same = 0;
  const end = Date.now() + maxStableSec * 1000;
  while (Date.now() < end && same * 300 < stableMs) { const f = await fp(); same = f === last ? same + 1 : 0; last = f; await page.waitForTimeout(300); }
  await to(0);
  await page.waitForTimeout(pauseMs);
}

export async function freeze(page, context, clockOn) {
  const info = await page.evaluate(() => __pw.freezeDom());
  info.clock = 'off';
  if (clockOn) {
    // a busy page can take longer than a short margin to answer: the target time is then already in the past
    for (const ahead of [1000, 4000, 12000]) {
      try { const now = await page.evaluate(() => Date.now()); await context.clock.pauseAt(now + ahead); info.clock = 'paused'; break; }
      catch (e) { info.clock = `not paused: ${e.message.split('\n')[0]}`; }
    }
    if (info.clock === 'paused') await page.evaluate(() => __pw.freezeDom()); // the jump fires due timers: park the carousels again
  }
  // proof: nothing that was a candidate for motion has moved after 600ms
  const a = await page.evaluate(() => { __pw.probeInit(); return JSON.stringify(__pw.probeRead()); });
  await page.waitForTimeout(600);
  const b = await page.evaluate(() => JSON.stringify(__pw.probeRead()));
  info.stillMoving = a === b ? 0 : JSON.parse(a).filter((r, i) => JSON.stringify(r) !== JSON.stringify(JSON.parse(b)[i])).length;
  return info;
}

export async function shoot(page, context, dir, { maxHeightPx = 30000 } = {}) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const { h: full, vh, cw } = await page.evaluate(() => ({ h: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), vh: innerHeight,
    // layout width without the scrollbar. clientWidth alone was 1920 on a page that really laid out at 1905 (scrollbar shown): take the smaller
    cw: Math.min(document.documentElement.clientWidth, Math.round(document.documentElement.getBoundingClientRect().width)) }));
  const h = Math.min(full, maxHeightPx); // a page longer than this (infinite feed) is photographed down to here only
  const ys = [];
  for (let y = 0; y < h - vh; y += vh) ys.push(y);
  ys.push(Math.max(0, h - vh));
  const shots = [];
  for (const [i, y] of ys.entries()) {
    await page.evaluate((v) => scrollTo({ top: v, behavior: 'instant' }), y);
    await page.evaluate((first) => __pw.hideOverlays(first), i === 0);
    // no clock.runFor here: advancing fake time would move carousels between shots (warmUp already ran every reveal)
    await page.waitForTimeout(250);
    const real = await page.evaluate(() => scrollY);
    const file = `s${String(i).padStart(2, '0')}.png`;
    // clip = clientWidth: the scrollbar (whose thumb moves between shots) is not part of the page
    await page.screenshot({ path: path.join(dir, file), animations: 'disabled', caret: 'hide', clip: { x: 0, y: 0, width: cw, height: vh } });
    shots.push({ file, y: real });
  }
  await page.evaluate(() => { __pw.hideOverlays(null); scrollTo({ top: 0, behavior: 'instant' }); });
  fs.writeFileSync(path.join(dir, 'shots.json'), JSON.stringify({ docHeight: h, fullHeight: full, viewportHeight: vh, clientWidth: cw, shots }, null, 1));
  return { docHeight: h, fullHeight: full, count: shots.length };
}
