// Generates a strawberry-pink & soft-green heart-shaped QR code (assets/qr-heart.png)
// that opens the website, then verifies it decodes cleanly with jsQR.
const QRCode = require('qrcode');
const sharp = require('sharp');
const jsQR = require('jsqr');
const path = require('path');

const URL = process.argv[2] || 'https://fariedmuhammad10.github.io/happy-birthday-tusyaa/';
const OUT = path.join(__dirname, '..', 'assets', 'qr-heart.png');
const PINK = '#c81e4b';
const PINK_SOFT = '#ea5b7c';
const GREEN = '#6aa881';
const GAP = 5; // quiet zone between real QR modules and decorative heart lobes

let seed = 20261030;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);

function heartPath(cx, cy, s) {
  const x = cx - s / 2, y = cy - s / 2;
  return `M${cx},${y + s * 0.95} C${x - s * 0.05},${y + s * 0.5} ${x + s * 0.05},${y - s * 0.05} ${cx},${y + s * 0.28} C${x + s * 0.95},${y - s * 0.05} ${x + s * 1.05},${y + s * 0.5} ${cx},${y + s * 0.95}Z`;
}

(async () => {
  const qr = QRCode.create(URL, { errorCorrectionLevel: 'H' });
  const N = qr.modules.size;
  const dark = (r, c) => qr.modules.get(r, c);
  const inFinder = (r, c) =>
    (r < 7 && c < 7) || (r < 7 && c >= N - 7) || (r >= N - 7 && c < 7);

  const cell = 20;
  let qrShapes = '';
  let lobePink = '';
  let lobeGreen = '';
  const R = N / 2;

  for (let r = -Math.ceil(R) - 1; r < N; r++) {
    for (let c = -Math.ceil(R) - 1; c < N; c++) {
      const inQR = r >= 0 && c >= 0 && r < N && c < N;
      if (inQR) {
        if (!dark(r, c)) continue;
        const x = c * cell, y = r * cell;
        if (inFinder(r, c)) qrShapes += `<rect x="${x}" y="${y}" width="${cell + 0.6}" height="${cell + 0.6}"/>`;
        else qrShapes += `<rect x="${x + 0.6}" y="${y + 0.6}" width="${cell - 1.2}" height="${cell - 1.2}" rx="${cell * 0.28}"/>`;
        continue;
      }
      const cy = r + 0.5, cxm = c + 0.5;
      const topLobe = r <= -GAP - 1 && (cxm - R) ** 2 + cy ** 2 <= (R - 0.3) ** 2;
      const leftLobe = c <= -GAP - 1 && cxm ** 2 + (cy - R) ** 2 <= (R - 0.3) ** 2;
      if ((topLobe || leftLobe) && rnd() < 0.52) {
        const x = c * cell + cell / 2, y = r * cell + cell / 2;
        const isGreen = rnd() < 0.28;
        const el = rnd() < 0.38
          ? `<path transform="rotate(-45 ${x} ${y})" d="${heartPath(x, y, cell * 1.08)}"/>`
          : `<rect x="${x - cell / 2 + 1}" y="${y - cell / 2 + 1}" width="${cell - 2}" height="${cell - 2}" rx="${cell * 0.35}"/>`;
        if (isGreen) lobeGreen += el;
        else lobePink += el;
      }
    }
  }

  const allShapes = qrShapes + lobePink + lobeGreen;
  const size = 1600;
  const pts = [];
  allShapes.replace(/(?:x|M)="?(-?[\d.]+)"? ?y?="?,?(-?[\d.]+)/g, (_, a, b) => pts.push([+a, +b]));
  const rx = pts.map(([x, y]) => (x - y) / Math.SQRT2), ry = pts.map(([x, y]) => (x + y) / Math.SQRT2);
  const minX = Math.min(...rx), maxX = Math.max(...rx) + cell, minY = Math.min(...ry), maxY = Math.max(...ry) + cell * 1.4;
  const scale = (size * 0.73) / Math.max(maxX - minX, maxY - minY);
  const tx = size / 2 - ((minX + maxX) / 2) * scale, ty = size * 0.515 - ((minY + maxY) / 2) * scale;

  // cute strawberry leaf crown well above the top finder's quiet zone + subtle caption at bottom
  const crownY = size * 0.095;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <rect x="36" y="36" width="${size - 72}" height="${size - 72}" rx="64" fill="none" stroke="#dceee2" stroke-width="8"/>
  <g transform="translate(${size / 2} ${crownY}) scale(0.9)">
    <ellipse cx="-42" cy="8" rx="38" ry="15" transform="rotate(-24 -42 8)" fill="${GREEN}"/>
    <ellipse cx="42" cy="8" rx="38" ry="15" transform="rotate(24 42 8)" fill="${GREEN}"/>
    <ellipse cx="0" cy="-2" rx="22" ry="34" fill="#78b38d"/>
    <path d="M0,-44 Q6,-58 18,-62" fill="none" stroke="#48795b" stroke-width="7" stroke-linecap="round"/>
  </g>
  <g transform="translate(${tx} ${ty}) scale(${scale}) rotate(45)">
    <g fill="${PINK}">${qrShapes}</g>
    <g fill="${PINK_SOFT}">${lobePink}</g>
    <g fill="${GREEN}">${lobeGreen}</g>
  </g>
  <text x="${size / 2}" y="${size - 78}" text-anchor="middle" font-family="Segoe Print, Comic Sans MS, cursive" font-size="44" fill="#48795b">buat tusyaa ♡</text>
</svg>`;

  await sharp(Buffer.from(svg)).png().toFile(OUT);

  for (const w of [1600, 1200, 800, 500, 400]) {
    const { data, info } = await sharp(OUT).resize(w).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const res = jsQR(new Uint8ClampedArray(data), info.width, info.height, { inversionAttempts: 'dontInvert' });
    console.log(`decode @${w}px:`, res ? res.data : 'FAILED');
    if (!res) process.exitCode = 1;
  }
  console.log('QR version size', N, '->', OUT);
})();
