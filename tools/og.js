// Generates assets/og.jpg — link preview shown when shared on WhatsApp / IG etc.
const sharp = require('sharp');
const path = require('path');

const W = 1200, H = 630;
const heart = 'M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 21.2 6.1-9.3 16-12.1 16-21.2C32 3.8 28.2 0 23.6 0z';
const ex = 470, ey = 200, ew = 260, eh = 183;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="#f9f5f2"/>
  <circle cx="150" cy="95" r="230" fill="#f598ae" opacity="0.24"/>
  <circle cx="1060" cy="110" r="210" fill="#a9d5b7" opacity="0.28"/>
  <circle cx="1070" cy="555" r="250" fill="#f598ae" opacity="0.2"/>
  <circle cx="160" cy="545" r="220" fill="#a9d5b7" opacity="0.25"/>
  <text x="600" y="148" text-anchor="middle" font-family="Segoe Print, Comic Sans MS, cursive" font-size="62" fill="#2c2527">haii tusyaa!</text>
  <g>
    <rect x="${ex}" y="${ey}" width="${ew}" height="${eh}" rx="16" fill="#ee6c8b"/>
    <path d="M${ex} ${ey + eh} L${ex + ew / 2} ${ey + eh * 0.5} L${ex + ew} ${ey + eh}Z" fill="#e65c7d"/>
    <path d="M${ex} ${ey} L${ex + ew} ${ey} L${ex + ew / 2} ${ey + eh * 0.62}Z" fill="#f58ba4"/>
    <ellipse cx="${ex + ew / 2}" cy="${ey + eh * 0.52 - 30}" rx="16" ry="7" fill="#78b38d"/>
    <path d="${heart}" transform="translate(${ex + ew / 2 - 28} ${ey + eh * 0.52 - 25}) scale(1.75)" fill="#d8375d"/>
  </g>
  <text x="600" y="476" text-anchor="middle" font-family="Segoe Print, Comic Sans MS, cursive" font-size="54" fill="#2c2527">you've got new emails</text>
  <rect x="470" y="512" width="260" height="44" rx="22" fill="#e5f3ea" stroke="#a9d5b7" stroke-width="2"/>
  <text x="600" y="541" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="22" fill="#48795b">dari payittt ♡</text>
</svg>`;

sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(path.join(__dirname, '..', 'assets', 'og.jpg')).then(() => console.log('og.jpg done'));
