// Generates assets/og.jpg — the link preview shown when the URL is shared on WhatsApp etc.
const sharp = require('sharp');
const path = require('path');

const W = 1200, H = 630;
const heart = 'M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 21.2 6.1-9.3 16-12.1 16-21.2C32 3.8 28.2 0 23.6 0z';
const ex = 470, ey = 200, ew = 260, eh = 183;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="#f4efe9"/>
  <circle cx="150" cy="90" r="220" fill="#f19aa6" opacity="0.18"/>
  <circle cx="1080" cy="560" r="260" fill="#f19aa6" opacity="0.16"/>
  <text x="600" y="150" text-anchor="middle" font-family="Segoe Print, Comic Sans MS, cursive" font-size="64" fill="#2b2324">hey sayang!</text>
  <g>
    <rect x="${ex}" y="${ey}" width="${ew}" height="${eh}" rx="14" fill="#e46a7c"/>
    <path d="M${ex} ${ey + eh} L${ex + ew / 2} ${ey + eh * 0.5} L${ex + ew} ${ey + eh}Z" fill="#df5d70"/>
    <path d="M${ex} ${ey} L${ex + ew} ${ey} L${ex + ew / 2} ${ey + eh * 0.62}Z" fill="#eb8593"/>
    <path d="${heart}" transform="translate(${ex + ew / 2 - 28} ${ey + eh * 0.52 - 25}) scale(1.75)" fill="#d7263d"/>
  </g>
  <text x="600" y="490" text-anchor="middle" font-family="Segoe Print, Comic Sans MS, cursive" font-size="56" fill="#2b2324">you've got new emails</text>
</svg>`;

sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(path.join(__dirname, '..', 'assets', 'og.jpg')).then(() => console.log('og.jpg done'));
