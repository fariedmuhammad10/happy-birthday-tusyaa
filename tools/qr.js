// Generates a heart-shaped QR code (assets/qr-heart.png) that opens the website,
// then verifies it decodes correctly with jsQR.
// Heart = QR rotated 45° (a diamond) + two half-discs of decorative dots on the upper sides.
const QRCode = require('qrcode');
const sharp = require('sharp');
const jsQR = require('jsqr');
const path = require('path');

const URL = process.argv[2] || 'https://fariedmuhammad10.github.io/happy-birthday-nana/';
const OUT = path.join(__dirname, '..', 'assets', 'qr-heart.png');
const COLOR = '#c8102e';
const GAP = 4; // empty modules between real QR and decorative dots (quiet zone)

// seeded random so output is stable
let seed = 20261030;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);

function heartPath(cx, cy, s) {
  // small heart centered at (cx,cy), size s
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
  let shapes = '';
  const R = N / 2;

  // decorative lobes: discs centered at (row=-0, col=N/2) and (row=N/2, col=0), radius N/2,
  // only the half outside the QR, keeping GAP modules distance.
  for (let r = -Math.ceil(R) - 1; r < N; r++) {
    for (let c = -Math.ceil(R) - 1; c < N; c++) {
      const inQR = r >= 0 && c >= 0 && r < N && c < N;
      if (inQR) {
        if (!dark(r, c)) continue;
        const x = c * cell, y = r * cell;
        if (inFinder(r, c)) shapes += `<rect x="${x}" y="${y}" width="${cell + 0.6}" height="${cell + 0.6}"/>`;
        else shapes += `<rect x="${x + 1}" y="${y + 1}" width="${cell - 2}" height="${cell - 2}" rx="${cell * 0.3}"/>`;
        continue;
      }
      const cy = r + 0.5, cxm = c + 0.5;
      const topLobe = r <= -GAP - 1 && (cxm - R) ** 2 + cy ** 2 <= (R - 0.3) ** 2;
      const leftLobe = c <= -GAP - 1 && cxm ** 2 + (cy - R) ** 2 <= (R - 0.3) ** 2;
      if ((topLobe || leftLobe) && rnd() < 0.5) {
        const x = c * cell + cell / 2, y = r * cell + cell / 2;
        // counter-rotate tiny hearts so they look upright after the 45° rotation
        if (rnd() < 0.35) shapes += `<path transform="rotate(-45 ${x} ${y})" d="${heartPath(x, y, cell * 1.05)}"/>`;
        else shapes += `<rect x="${x - cell / 2 + 1}" y="${y - cell / 2 + 1}" width="${cell - 2}" height="${cell - 2}" rx="${cell * 0.3}"/>`;
      }
    }
  }

  // fit the rotated drawing into the canvas: rotated coords x' = (x-y)/√2, y' = (x+y)/√2
  const size = 1600;
  const pts = [];
  shapes.replace(/(?:x|M)="?(-?[\d.]+)"? ?y?="?,?(-?[\d.]+)/g, (_, a, b) => pts.push([+a, +b]));
  const rx = pts.map(([x, y]) => (x - y) / Math.SQRT2), ry = pts.map(([x, y]) => (x + y) / Math.SQRT2);
  const minX = Math.min(...rx), maxX = Math.max(...rx) + cell, minY = Math.min(...ry), maxY = Math.max(...ry) + cell * 1.4;
  const scale = (size * 0.84) / Math.max(maxX - minX, maxY - minY);
  const tx = size / 2 - ((minX + maxX) / 2) * scale, ty = size / 2 - ((minY + maxY) / 2) * scale;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <g transform="translate(${tx} ${ty}) scale(${scale}) rotate(45)" fill="${COLOR}">
    ${shapes}
  </g>
</svg>`;

  await sharp(Buffer.from(svg)).png().toFile(OUT);

  // verify by decoding at a few sizes
  for (const w of [1600, 800, 400]) {
    const { data, info } = await sharp(OUT).resize(w).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const res = jsQR(new Uint8ClampedArray(data), info.width, info.height, { inversionAttempts: 'dontInvert' });
    console.log(`decode @${w}px:`, res ? res.data : 'FAILED');
  }
  console.log('QR version size', N, '->', OUT);
})();
