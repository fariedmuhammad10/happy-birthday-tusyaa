// Copies photos from the source folder into ../photos, cropping black letterbox bars,
// fixing orientation, resizing and compressing them for the web.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'C:\\Users\\PC\\Downloads\\nanaayy kesanayangann akuuu';
const OUT = path.join(__dirname, '..', 'photos');

async function cropBlackBars(buf) {
  const img = sharp(buf).rotate();
  const { data, info } = await img.clone().greyscale().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  // a row counts as "bar" when >= 60% of its pixels are near-black
  // (tolerates the white phone home-indicator line inside the bar)
  const isBar = (y) => {
    let dark = 0;
    for (let x = 0; x < width; x++) if (data[y * width + x] < 20) dark++;
    return dark / width >= 0.6;
  };
  let top = 0, bottom = height - 1;
  while (top < height / 3 && isBar(top)) top++;
  while (bottom > (height * 2) / 3 && isBar(bottom)) bottom--;
  // small safety margin
  top = Math.min(height - 1, top + 4);
  bottom = Math.max(top + 1, bottom - 4);
  if (top > 10 || height - 1 - bottom > 10) {
    return img.extract({ left: 0, top, width, height: bottom - top + 1 });
  }
  return img;
}

(async () => {
  const files = fs.readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  let i = 0;
  for (const f of files) {
    const buf = fs.readFileSync(path.join(SRC, f));
    const img = await cropBlackBars(buf);
    const name = `nana-${String(i).padStart(2, '0')}.jpg`;
    const out = await img
      .resize({ width: 900, height: 1400, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(OUT, name));
    console.log(i, f, '->', name, `${out.width}x${out.height}`, out.size);
    i++;
  }
})();
