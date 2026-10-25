import { chromium } from 'playwright';
const b = await chromium.launch();
for (const h of [764, 590]) {
  const p = await b.newPage({ viewport: { width: 1279, height: h }, deviceScaleFactor: 1.5 });
  await p.goto('http://localhost:5174/#/parabank-home');
  await p.evaluate(() => document.fonts.ready);
  const o = await p.evaluate(() => ({
    bodyW: document.body.getBoundingClientRect().width,
    mainX: document.getElementById('mainPanel').getBoundingClientRect().x,
  }));
  await p.screenshot({ path: `cand-${h}.png`, fullPage: true });
  console.log('viewport h', h, JSON.stringify(o));
  await p.close();
}
await b.close();
