// Takes screenshots of the site flow with the installed Edge (for visual QA).
const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = process.argv[2] || path.join(__dirname, 'shots');
fs.mkdirSync(OUT, { recursive: true });
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.jpg': 'image/jpeg', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  fs.readFile(p, (e, d) => { if (e) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' }); res.end(d); });
}).listen(5174);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', headless: 'new' });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  await sleep(1200);
  await page.screenshot({ path: `${OUT}/1-intro.png` });
  await page.click('#envelope');
  await sleep(700);
  await page.screenshot({ path: `${OUT}/2-opening.png` });
  await sleep(1400);
  await page.screenshot({ path: `${OUT}/3-inbox.png` });
  const items = await page.$$('.mail-item');
  // letter
  await items[0].click(); await sleep(900);
  await page.click('#skip'); await sleep(1000);
  await page.screenshot({ path: `${OUT}/4-letter.png`, fullPage: true });
  const open = async (i, name, extra) => {
    await page.evaluate(() => document.querySelector('#backBtn').click()); await sleep(700);
    const it = await page.$$('.mail-item'); await it[i].click(); await sleep(1000);
    if (extra) await extra();
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  };
  await open(1, '5-gallery');
  await page.click('.gallery .polaroid'); await sleep(500);
  await page.screenshot({ path: `${OUT}/5b-lightbox.png` });
  await page.evaluate(() => document.querySelector('#lbClose').click()); await sleep(400);
  await open(2, '6-reasons', async () => { const f = await page.$$('.flip'); for (const x of f.slice(0, 4)) { await x.click(); await sleep(120); } await sleep(700); });
  await open(3, '7-cake');
  await page.$$eval('.candle', (cs) => cs.forEach((c) => c.click())); await sleep(1200);
  await page.screenshot({ path: `${OUT}/7b-cake-blown.png`, fullPage: true });
  await open(4, '8-coupons', async () => { const btns = await page.$$('.coupon button'); await btns[0].click(); await btns[1].click(); await sleep(500); });
  await page.evaluate(() => document.querySelector('#backBtn').click()); await sleep(700);
  await page.screenshot({ path: `${OUT}/9-inbox-done.png` });
  const it = await page.$$('.mail-item'); await it[5].click(); await sleep(1500);
  await page.screenshot({ path: `${OUT}/10-final.png`, fullPage: true });
  await page.setViewport({ width: 1366, height: 800 });
  await page.evaluate(() => document.querySelector('#backBtn').click()); await sleep(700);
  await page.screenshot({ path: `${OUT}/11-desktop.png` });
  console.log('errors:', errors.length ? errors : 'none');
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
