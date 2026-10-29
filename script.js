/* =========================================================
   ✏️  EDIT DI SINI AJA — semua teks & foto bisa diganti
   ========================================================= */
const CONFIG = {
  name: 'Nana',
  from: 'pacarmu',

  // surat utama (email #1) — pakai \n\n buat paragraf baru
  letter:
`Hai sayangku, Nana 🤍

Selamat ulang tahun ya cantik! Hari ini hari spesial kamu, jadi aku pengen bikin sesuatu yang beda, bukan cuma chat "hbd yaa" terus selesai. Makanya aku bikinin kamu website kecil ini, isinya khusus buat kamu doang.

Makasih ya udah lahir ke dunia ini, dan makasih udah mau jadi bagian dari hari-hari aku. Kamu tuh orang yang bisa bikin hari biasa jadi seru, bikin capek jadi ilang, dan bikin aku senyum-senyum sendiri kayak orang aneh.

Semoga di umur yang baru ini kamu makin bahagia, makin sehat, makin dimudahin semua urusannya, dan semua yang kamu impiin pelan-pelan jadi nyata. Kalau lagi capek, inget ya, ada aku yang selalu siap dengerin dan nemenin kamu.

Aku sayang kamu, hari ini, besok, dan seterusnya.`,

  // foto + caption galeri (email #2)
  photos: [
    { src: 'photos/nana-03.jpg', cap: 'cantik banget sih' },
    { src: 'photos/nana-00.jpg', cap: 'pipi yang mau aku cubit' },
    { src: 'photos/nana-08.jpg', cap: 'senyum andalan ♡' },
    { src: 'photos/nana-06.jpg', cap: 'yang ini favorit aku 😆' },
    { src: 'photos/nana-01.jpg', cap: 'manis pake kacamata' },
    { src: 'photos/nana-05.jpg', cap: 'tatapan maut' },
    { src: 'photos/nana-07.jpg', cap: 'rebahan aja cakep' },
    { src: 'photos/nana-11.jpg', cap: 'mirror selfie era 📸' },
    { src: 'photos/nana-04.jpg', cap: 'ngantuk tapi lucu' },
    { src: 'photos/nana-12.jpg', cap: 'hormat grak! 🫡' },
    { src: 'photos/nana-09.jpg', cap: 'pose model' },
    { src: 'photos/nana-02.jpg', cap: 'mode galau 🥺' },
    { src: 'photos/nana-10.jpg', cap: 'ada 4 nana, aku makin seneng' },
  ],

  // alasan aku sayang kamu (email #3)
  reasons: [
    'senyum kamu yang bisa bikin mood aku langsung bagus',
    'kamu sabar banget ngadepin aku yang kadang nyebelin',
    'cara kamu cerita hal random dengan semangat',
    'kamu lucu, apalagi pas lagi ngambek',
    'kamu selalu ada pas aku butuh',
    'ketawa kamu tuh nular',
    'kamu cantik, luar dalem (serius)',
    'kamu bikin aku pengen jadi orang yang lebih baik',
    'ngobrol sama kamu ga pernah bosen',
    'ya karena kamu itu kamu, Nana 🤍',
  ],

  // voucher (email #5)
  coupons: [
    { icon: '🫂', title: 'Peluk sepuasnya', desc: 'berlaku kapan aja, ga ada batas waktu' },
    { icon: '🍜', title: 'Traktir jajan bebas pilih', desc: 'kamu yang pilih, aku yang bayar' },
    { icon: '🎬', title: 'Date ke mana aja', desc: 'nonton, jalan, kulineran, terserah kamu' },
    { icon: '👑', title: 'Aku nurut seharian', desc: 'kamu ratunya, aku pengawalnya' },
    { icon: '🙏', title: 'Aku ngalah duluan', desc: 'pas kamu ngambek, aku yang minta maaf duluan' },
    { icon: '📞', title: 'Telponan sampe ketiduran', desc: 'tinggal bilang "telpon dong"' },
  ],

  final:
`Udah sampe email terakhir nih 🥹

Makasih ya udah baca semuanya. Mungkin website ini sederhana, tapi semuanya aku bikin sambil mikirin kamu. Semoga bisa bikin kamu senyum hari ini.

Happy birthday sekali lagi, sayang. Semoga tahun ini jadi tahun terbaik kamu, dan semoga aku bisa terus ada di sebelah kamu buat ngerayain ulang tahun kamu yang berikutnya, berikutnya lagi, dan seterusnya.`,
};

/* ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MAILS = [
  { id: 'letter',  icon: '💌', subject: `Happy Birthday, ${CONFIG.name}! 🎂`, preview: 'buka ini duluan ya cantik, ada surat dari aku...', time: '00:00', chip: '📝 surat.txt', render: renderLetter },
  { id: 'gallery', icon: '📸', subject: `lampiran: ${CONFIG.photos.length} foto kamu yang aku suka`, preview: 'aku kumpulin foto-foto kamu, semuanya cantik sih', time: '00:01', chip: `🖼️ ${CONFIG.photos.length} lampiran`, render: renderGallery },
  { id: 'reasons', icon: '💭', subject: 'alasan aku sayang kamu (ada banyak)', preview: 'tap kartunya satu-satu ya...', time: '00:02', render: renderReasons },
  { id: 'cake',    icon: '🎂', subject: 'tiup lilinnya dulu dong 🕯️', preview: 'jangan lupa make a wish sebelum niup ✨', time: '00:03', render: renderCake },
  { id: 'coupons', icon: '🎟️', subject: 'voucher spesial buat kamu', preview: 'berlaku selamanya, ga bisa hangus', time: '00:04', chip: `🎫 ${CONFIG.coupons.length} voucher`, render: renderCoupons },
  { id: 'final',   icon: '🔒', subject: 'p.s. satu lagi...', preview: 'buka ini paling terakhir ya', time: '00:05', locked: true, render: renderFinal },
];

const state = {
  read: new Set(JSON.parse(localStorage.getItem('nana-read') || '[]')),
  current: null,
};
const saveRead = () => localStorage.setItem('nana-read', JSON.stringify([...state.read]));

/* ---------- screens ---------- */
function show(id) {
  $$('.screen').forEach((s) => s.classList.toggle('active', s.id === id));
  window.scrollTo(0, 0);
}

/* ---------- floating hearts ---------- */
(function hearts() {
  const box = $('.bg-hearts');
  const glyphs = ['♥', '♡', '❤', '✿'];
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('span');
    s.textContent = glyphs[i % glyphs.length];
    s.style.left = Math.random() * 100 + '%';
    s.style.fontSize = 10 + Math.random() * 18 + 'px';
    s.style.animationDuration = 9 + Math.random() * 10 + 's';
    s.style.animationDelay = -Math.random() * 18 + 's';
    box.appendChild(s);
  }
})();

/* ---------- intro ---------- */
$('#envelope').addEventListener('click', async () => {
  const env = $('#envelope');
  if (env.classList.contains('open')) return;
  env.classList.add('open');
  Music.start();
  burst(0.5, 0.45, 60);
  await sleep(1400);
  renderInbox();
  show('inbox');
  history.replaceState({ v: 'inbox' }, '');
});

/* ---------- inbox ---------- */
function allOthersRead() {
  return MAILS.filter((m) => !m.locked).every((m) => state.read.has(m.id));
}

function renderInbox() {
  const list = $('#mailList');
  list.innerHTML = '';
  MAILS.forEach((m, i) => {
    const locked = m.locked && !allOthersRead();
    const li = document.createElement('li');
    li.className = 'mail-item' + (state.read.has(m.id) ? '' : ' unread') + (locked ? ' locked' : '');
    li.style.animationDelay = i * 0.07 + 's';
    li.innerHTML = `
      <div class="avatar">${locked ? '🔒' : m.locked ? '💝' : m.icon}</div>
      <div class="mail-main">
        <div class="mail-row"><span class="mail-from">${CONFIG.from}</span><span class="mail-time">${m.time}</span></div>
        <div class="mail-subj">${m.subject}</div>
        <div class="mail-prev">${locked ? 'baca email yang lain dulu ya 😝' : m.preview}</div>
        ${m.chip ? `<span class="chip">${m.chip}</span>` : ''}
      </div>`;
    li.addEventListener('click', () => {
      if (locked) {
        li.classList.remove('shake'); void li.offsetWidth; li.classList.add('shake');
        toast('eits, baca email yang lain dulu ya 😝');
        return;
      }
      openMail(m);
    });
    list.appendChild(li);
  });
  const unread = MAILS.filter((m) => !state.read.has(m.id)).length;
  $('#unreadCount').textContent = unread;
  $('#unreadCount').style.display = unread ? '' : 'none';
}

/* ---------- mail view ---------- */
function openMail(m, push = true) {
  state.current = m;
  $('#mailSubject').textContent = m.subject;
  $('#mailTime').textContent = 'hari ini, ' + m.time;
  const body = $('#mailBody');
  body.innerHTML = '';
  m.render(body);
  show('mail');
  if (!state.read.has(m.id)) { state.read.add(m.id); saveRead(); }
  if (push) history.pushState({ v: 'mail', id: m.id }, '');
}

function backToInbox() {
  typing.cancel = true;
  Mic.stop();
  renderInbox();
  show('inbox');
  if (allOthersRead() && !state.read.has('final') && !backToInbox.told) {
    backToInbox.told = true;
    setTimeout(() => toast('email terakhir udah kebuka 🔓 cek deh'), 500);
  }
}
$('#backBtn').addEventListener('click', () => {
  if (history.state && history.state.v === 'mail') history.back();
  else backToInbox();
});
window.addEventListener('popstate', () => {
  if ($('#lightbox').classList.contains('show')) { closeLightbox(); return; }
  if ($('#mail').classList.contains('active')) backToInbox();
});

/* ---------- #1 letter ---------- */
const typing = { cancel: false };
async function renderLetter(body) {
  body.innerHTML = `
    <figure class="polaroid letter-hero"><img src="photos/nana-03.jpg" alt="${CONFIG.name}"><figcaption>birthday girl ♡</figcaption></figure>
    <p class="big-hand">Happy Birthday,<br>${CONFIG.name}!</p>
    <div class="letter-paper" id="paper"></div>
    <p class="sign" id="sign" style="opacity:0">— ${CONFIG.from} 💌</p>
    <button class="skip-btn" id="skip">skip animasi</button>`;
  const paper = $('#paper');
  const text = CONFIG.letter;
  typing.cancel = false;
  let skip = false;
  $('#skip').onclick = () => { skip = true; };
  const caret = '<span class="caret"></span>';
  for (let i = 0; i <= text.length; i++) {
    if (typing.cancel) return;
    if (skip) { i = text.length; }
    paper.innerHTML = escapeHtml(text.slice(0, i)) + caret;
    const ch = text[i - 1];
    await sleep(ch === '\n' ? 180 : /[.,!?]/.test(ch) ? 140 : 28);
  }
  paper.innerHTML = escapeHtml(text);
  $('#sign').style.transition = 'opacity .8s'; $('#sign').style.opacity = 1;
  $('#skip').remove();
  burst(0.5, 0.7, 50);
}

/* ---------- #2 gallery ---------- */
function renderGallery(body) {
  body.innerHTML = `
    <p>Ini foto-foto kamu yang aku simpen. Tap fotonya buat liat lebih gede ya 🥰</p>
    <div class="attach-head">📎 ${CONFIG.photos.length} lampiran · semuanya cantik</div>
    <div class="gallery">${CONFIG.photos.map((p, i) => `
      <figure class="polaroid" data-i="${i}"><img src="${p.src}" alt="${escapeHtml(p.cap)}" loading="lazy"><figcaption>${escapeHtml(p.cap)}</figcaption></figure>`).join('')}
    </div>`;
  $$('.gallery .polaroid', body).forEach((f) => f.addEventListener('click', () => openLightbox(+f.dataset.i)));
}

let lbIndex = 0;
function openLightbox(i) {
  lbIndex = i; updateLightbox();
  $('#lightbox').classList.add('show');
  history.pushState({ v: 'lb' }, '');
}
function closeLightbox() { $('#lightbox').classList.remove('show'); }
function updateLightbox() {
  const p = CONFIG.photos[lbIndex];
  $('#lbImg').src = p.src; $('#lbCap').textContent = p.cap;
}
function lbStep(d) { lbIndex = (lbIndex + d + CONFIG.photos.length) % CONFIG.photos.length; updateLightbox(); }
$('#lbClose').onclick = () => history.back();
$('#lbPrev').onclick = (e) => { e.stopPropagation(); lbStep(-1); };
$('#lbNext').onclick = (e) => { e.stopPropagation(); lbStep(1); };
$('#lightbox').addEventListener('click', (e) => { if (e.target.id === 'lightbox') history.back(); });
(() => {
  let x0 = null;
  const lb = $('#lightbox');
  lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) lbStep(dx < 0 ? 1 : -1);
    x0 = null;
  });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('show')) return;
    if (e.key === 'ArrowRight') lbStep(1);
    if (e.key === 'ArrowLeft') lbStep(-1);
    if (e.key === 'Escape') history.back();
  });
})();

/* ---------- #3 reasons ---------- */
function renderReasons(body) {
  body.innerHTML = `
    <p>Sebenernya alasannya ga bakal muat ditulis semua, tapi ini ${CONFIG.reasons.length} di antaranya. Tap kartunya satu-satu ya ♡</p>
    <div class="reasons">${CONFIG.reasons.map((r, i) => `
      <div class="flip"><div class="flip-inner">
        <div class="flip-face flip-front"><div><div class="num">#${i + 1}</div><small>tap aku</small></div></div>
        <div class="flip-face flip-back">${escapeHtml(r)}</div>
      </div></div>`).join('')}
    </div>
    <p class="progress-note" id="reasonNote">0 / ${CONFIG.reasons.length} kebuka</p>`;
  const cards = $$('.flip', body);
  cards.forEach((c) => c.addEventListener('click', () => {
    c.classList.toggle('flipped');
    const n = cards.filter((x) => x.classList.contains('flipped')).length;
    $('#reasonNote').textContent = n === cards.length ? 'dan masih banyak lagi... 🤍' : `${n} / ${cards.length} kebuka`;
    if (n === cards.length && !renderReasons.done) { renderReasons.done = true; burst(0.5, 0.6, 80); }
  }));
}

/* ---------- #4 cake ---------- */
function renderCake(body) {
  const colors = ['#e56b7b', '#7cc6c0', '#f3c14b', '#9b8cf2', '#fff'];
  const sprinkles = Array.from({ length: 22 }, () =>
    `<i style="left:${Math.random() * 95}%;top:${Math.random() * 90}%;background:${colors[(Math.random() * colors.length) | 0]};transform:rotate(${Math.random() * 180}deg)"></i>`).join('');
  body.innerHTML = `
    <p>Pejamin mata, make a wish dulu, terus tiup lilinnya ya ✨<br><span class="muted">(tap apinya, atau pake tombol mic terus tiup beneran ke hp kamu)</span></p>
    <div class="cake-wrap">
      <div class="cake">
        <div class="plate"></div>
        <div class="layer layer-1"><div class="sprinkles">${sprinkles}</div></div>
        <div class="layer layer-2"></div>
        <div class="candles">
          <div class="candle"><span class="flame"></span></div>
          <div class="candle"><span class="flame"></span></div>
          <div class="candle"><span class="flame"></span></div>
        </div>
      </div>
    </div>
    <div class="cake-actions">
      <button class="btn" id="micBtn">🎤 tiup pake mic</button>
      <button class="btn soft" id="relight" style="display:none">nyalain lagi</button>
    </div>
    <div class="wish" id="wish">
      <p class="big-hand">yeay! happy birthday ${CONFIG.name}! 🎉</p>
      <p>semoga semua wish kamu dikabulin ya, aamiin 🤍</p>
    </div>`;
  const candles = $$('.candle', body);
  const check = () => {
    if (candles.every((c) => c.classList.contains('out'))) {
      Mic.stop();
      $('#wish').classList.add('show');
      $('#relight').style.display = '';
      $('#micBtn').style.display = 'none';
      celebrate();
      Music.playOnce();
    }
  };
  candles.forEach((c) => c.addEventListener('click', () => { c.classList.add('out'); check(); }));
  $('#micBtn').onclick = async () => {
    const ok = await Mic.start(() => {
      const lit = candles.find((c) => !c.classList.contains('out'));
      if (lit) { lit.classList.add('out'); check(); }
    });
    if (ok) { $('#micBtn').textContent = '🌬️ tiup sekarang...'; toast('tiup ke arah mic hp kamu 🌬️'); }
    else toast('mic ga bisa dipake, tap apinya aja ya ♡');
  };
  $('#relight').onclick = () => {
    candles.forEach((c) => c.classList.remove('out'));
    $('#wish').classList.remove('show');
    $('#relight').style.display = 'none';
    $('#micBtn').style.display = ''; $('#micBtn').textContent = '🎤 tiup pake mic';
  };
}

const Mic = {
  stream: null, ctx: null, raf: 0,
  async start(onBlow) {
    try {
      this.stop();
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      const src = this.ctx.createMediaStreamSource(this.stream);
      const an = this.ctx.createAnalyser(); an.fftSize = 512;
      src.connect(an);
      const data = new Uint8Array(an.fftSize);
      let loud = 0, cooldown = 0;
      const loop = () => {
        an.getByteTimeDomainData(data);
        let sum = 0;
        for (const v of data) { const d = (v - 128) / 128; sum += d * d; }
        const rms = Math.sqrt(sum / data.length);
        if (cooldown > 0) cooldown--;
        loud = rms > 0.18 ? loud + 1 : Math.max(0, loud - 1);
        if (loud > 6 && cooldown === 0) { onBlow(); loud = 0; cooldown = 18; }
        this.raf = requestAnimationFrame(loop);
      };
      loop();
      return true;
    } catch (e) { return false; }
  },
  stop() {
    cancelAnimationFrame(this.raf);
    if (this.stream) this.stream.getTracks().forEach((t) => t.stop());
    if (this.ctx) this.ctx.close();
    this.stream = null; this.ctx = null;
  },
};

/* ---------- #5 coupons ---------- */
function renderCoupons(body) {
  const claimed = new Set(JSON.parse(localStorage.getItem('nana-coupons') || '[]'));
  body.innerHTML = `
    <p>Ini voucher spesial buat kamu. Berlaku selamanya, ga ada tanggal kadaluarsa. Kalau mau dipake, klaim terus screenshot dan kirim ke aku ya 😌</p>
    <div class="coupons">${CONFIG.coupons.map((c, i) => `
      <div class="coupon ${claimed.has(i) ? 'claimed' : ''}" data-i="${i}">
        <div class="coupon-left">${c.icon}</div>
        <div class="coupon-body"><h4>${escapeHtml(c.title)}</h4><p>${escapeHtml(c.desc)}</p>
          <button>${claimed.has(i) ? 'udah diklaim ✓' : 'klaim'}</button></div>
      </div>`).join('')}
    </div>`;
  $$('.coupon', body).forEach((el) => {
    $('button', el).onclick = (e) => {
      const i = +el.dataset.i;
      const on = !claimed.has(i);
      on ? claimed.add(i) : claimed.delete(i);
      localStorage.setItem('nana-coupons', JSON.stringify([...claimed]));
      el.classList.toggle('claimed', on);
      e.target.textContent = on ? 'udah diklaim ✓' : 'klaim';
      if (on) { const r = e.target.getBoundingClientRect(); burst(r.left / innerWidth, r.top / innerHeight, 30); toast('voucher diklaim! screenshot terus kirim ke aku 📸'); }
    };
  });
}

/* ---------- #6 final ---------- */
function renderFinal(body) {
  const pattern = [
    '.XX.XX.',
    'XXXXXXX',
    'XXXXXXX',
    '.XXXXX.',
    '..XXX..',
    '...X...',
  ];
  let k = 0, cells = '';
  pattern.forEach((row) => [...row].forEach((ch) => {
    if (ch === 'X') {
      const p = CONFIG.photos[k % CONFIG.photos.length];
      cells += `<img src="${p.src}" alt="" style="animation-delay:${k * 0.06}s">`; k++;
    } else cells += '<span></span>';
  }));
  body.innerHTML = `
    <div class="heart-grid">${cells}</div>
    <p class="love-big">I love you,<br>${CONFIG.name} ♡</p>
    <div class="letter-paper" style="margin-top:20px">${escapeHtml(CONFIG.final)}</div>
    <p class="sign">— ${CONFIG.from}, yang sayang banget sama kamu 💌</p>
    <div class="reply-box">
      <p>💬 balas email ini</p>
      <textarea id="replyText" placeholder="tulis balasan kamu di sini..."></textarea>
      <button class="btn pink" id="replyBtn">kirim ke aku lewat WhatsApp</button>
    </div>
    <div class="center-row"><button class="btn soft" id="again">↺ baca ulang dari awal</button></div>`;
  setTimeout(celebrate, 600);
  $('#replyBtn').onclick = () => {
    const t = $('#replyText').value.trim();
    if (!t) { toast('tulis dulu balasannya ya 🥺'); return; }
    window.open('https://wa.me/?text=' + encodeURIComponent('💌 balasan email ulang tahun:\n\n' + t), '_blank');
  };
  $('#again').onclick = () => {
    localStorage.removeItem('nana-read');
    state.read.clear();
    location.reload();
  };
}

/* ---------- helpers ---------- */
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
let toastT;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ---------- confetti (no library) ---------- */
const cv = $('#confetti');
const cx = cv.getContext('2d');
let parts = [], confettiRaf = 0;
function resize() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; }
addEventListener('resize', resize); resize();
const CCOLORS = ['#e56b7b', '#f19aa6', '#ffd166', '#7cc6c0', '#c3aed6', '#ffffff', '#d7263d'];
function burst(x, y, n = 60) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, sp = 4 + Math.random() * 9;
    parts.push({
      x: x * cv.width, y: y * cv.height, vx: Math.cos(a) * sp * devicePixelRatio, vy: (Math.sin(a) * sp - 6) * devicePixelRatio,
      s: (5 + Math.random() * 6) * devicePixelRatio, c: CCOLORS[(Math.random() * CCOLORS.length) | 0],
      r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, heart: Math.random() < 0.3, life: 0,
    });
  }
  if (!confettiRaf) tick();
}
function celebrate() {
  burst(0.2, 0.6, 70); setTimeout(() => burst(0.8, 0.6, 70), 250); setTimeout(() => burst(0.5, 0.35, 90), 500);
}
function drawHeart(s) {
  cx.beginPath();
  cx.moveTo(0, s * 0.3);
  cx.bezierCurveTo(0, 0, -s * 0.5, 0, -s * 0.5, s * 0.3);
  cx.bezierCurveTo(-s * 0.5, s * 0.6, 0, s * 0.8, 0, s);
  cx.bezierCurveTo(0, s * 0.8, s * 0.5, s * 0.6, s * 0.5, s * 0.3);
  cx.bezierCurveTo(s * 0.5, 0, 0, 0, 0, s * 0.3);
  cx.fill();
}
function tick() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts = parts.filter((p) => p.y < cv.height + 50 && p.life < 400);
  for (const p of parts) {
    p.life++; p.vy += 0.25 * devicePixelRatio; p.vx *= 0.985; p.x += p.vx; p.y += p.vy; p.r += p.vr;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c;
    if (p.heart) drawHeart(p.s * 1.6); else cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
    cx.restore();
  }
  confettiRaf = parts.length ? requestAnimationFrame(tick) : 0;
  if (!parts.length) cx.clearRect(0, 0, cv.width, cv.height);
}

/* ---------- music box "Happy Birthday" (Web Audio, no mp3 needed) ---------- */
const Music = (() => {
  // [note, beats]  — 3/4 time
  const N = { G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
  const song = [
    ['G4', .75], ['G4', .25], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2],
    ['G4', .75], ['G4', .25], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2],
    ['G4', .75], ['G4', .25], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 2],
    ['F5', .75], ['F5', .25], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 3],
  ];
  const beat = 0.42;
  let ctx, master, playing = false, loopT, btn = $('#musicBtn');

  function note(freq, t, dur) {
    [1, 2, 3.01].forEach((mult, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = i === 0 ? 'sine' : 'triangle';
      o.frequency.value = freq * mult;
      const vol = [0.32, 0.08, 0.035][i];
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(1.2, dur * 1.6));
      o.connect(g); g.connect(master);
      o.start(t); o.stop(t + Math.max(1.3, dur * 1.7));
    });
  }
  function playSong() {
    let t = ctx.currentTime + 0.1;
    for (const [n, b] of song) { note(N[n], t, b * beat); t += b * beat; }
    return (t - ctx.currentTime) * 1000;
  }
  function init() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0.5;
    const delay = ctx.createDelay(); delay.delayTime.value = 0.28;
    const fb = ctx.createGain(); fb.gain.value = 0.25;
    master.connect(ctx.destination); master.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(ctx.destination);
  }
  function loop() {
    if (!playing) return;
    const ms = playSong();
    loopT = setTimeout(loop, ms + 2500);
  }
  function start() {
    try { init(); ctx.resume(); } catch (e) { return; }
    btn.classList.add('show');
    if (playing) return;
    playing = true; btn.classList.add('playing');
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(0.5, ctx.currentTime);
    loop();
  }
  function stop() {
    playing = false; clearTimeout(loopT); btn.classList.remove('playing');
    if (master) { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setTargetAtTime(0, ctx.currentTime, 0.1); }
  }
  function playOnce() { if (!playing) start(); }
  btn.addEventListener('click', () => (playing ? stop() : start()));
  return { start, stop, playOnce };
})();

/* ---------- boot ---------- */
// preload photos so the gallery feels instant
CONFIG.photos.forEach((p) => { const i = new Image(); i.src = p.src; });
