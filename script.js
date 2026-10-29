/* =========================================================
   ✏️  EDIT DI SINI AJA — semua teks & foto bisa diganti
   ========================================================= */
const CONFIG = {
  name: 'tusyaa',
  from: 'payittt',
  whatsapp: '', // opsional: isi pake format '62812xxxxxxx' biar langsung buka chat kamu

  // surat utama (email #1)
  letter:
`haii tusyaa

selamat ulang tahun yaa sayanggg 🎂

jadi gini, aku tuh bingung mau ngasih apa, terus kepikiran bikin ginian. jangan diketawain ya, aku bikinnya sambil deg-degan takut kamu ga suka wkwk

makasih ya udah sabar sama aku, udah mau dengerin aku ngoceh ga jelas, udah mau aku gangguin tiap hari. aku tau aku kadang nyebelin, tapi kamu tetep di sini. aku bersyukur banget sih soal itu

doa aku buat kamu simpel aja: sehat terus, jangan kebanyakan begadang, rezekinya lancar, terus yang kamu pengen kesampean satu-satu. kalo lagi cape atau sedih jangan dipendem sendiri, cerita ke aku

udah ah segini dulu, ntar malah kepanjangan. pokoknya aku sayang kamu banyak bangettt`,

  // foto + caption galeri (email #2)
  photos: [
    { src: 'photos/foto-03.jpg', cap: 'bando strawberry-nya lucu bgt 🍓' },
    { src: 'photos/foto-00.jpg', cap: 'pengen nyubit pipinya' },
    { src: 'photos/foto-08.jpg', cap: 'cantik bgt ini serius' },
    { src: 'photos/foto-06.jpg', cap: 'INI FAVORIT AKU 😭' },
    { src: 'photos/foto-01.jpg', cap: 'pake kacamata gini manis bgt' },
    { src: 'photos/foto-05.jpg', cap: 'kok natapnya gitu bu' },
    { src: 'photos/foto-07.jpg', cap: 'rebahan doang padahal' },
    { src: 'photos/foto-11.jpg', cap: 'mirror selfie dulu 📸' },
    { src: 'photos/foto-04.jpg', cap: 'ngantuk ya sayang' },
    { src: 'photos/foto-12.jpg', cap: 'siap komandan 🫡' },
    { src: 'photos/foto-09.jpg', cap: 'lagi mikirin aku pasti' },
    { src: 'photos/foto-02.jpg', cap: 'muka minta dimanja 🥺' },
    { src: 'photos/foto-10.jpg', cap: 'tusyaa x4 = aku makin pusing' },
  ],

  // hal-hal yang aku suka dari kamu (email #3)
  reasons: [
    'kalo ketawa suka ga ketahan, lucu',
    'mau dengerin aku ngoceh ga jelas',
    'kalo cerita semangat banget, aku seneng dengerinnya',
    'ngambeknya lucu (tapi jangan sering2 ya)',
    'sabar sama aku yang suka ngeselin',
    'cantik. udah itu aja',
    'nyambung diajak ngobrol apa aja',
    'bikin aku pengen jadi lebih bener',
    'suara kamu enak didenger',
    'ya pokoknya kamu',
  ],

  // voucher (email #5)
  coupons: [
    { icon: '🫂', title: 'peluk', desc: 'kapan aja, berapa lama aja' },
    { icon: '🍜', title: 'jajan, aku yang bayar', desc: 'seblak, matcha, boba, bebas pilih' },
    { icon: '🎬', title: 'jalan ke mana aja', desc: 'kamu yang nentuin tempatnya, aku ngikut' },
    { icon: '👑', title: 'aku nurut seharian', desc: 'apa kata kamu deh pokoknya' },
    { icon: '🙏', title: 'aku ngalah duluan', desc: 'kalo lagi ribut kecil, aku yang minta maaf duluan' },
    { icon: '📞', title: 'telponan sampe ketiduran', desc: 'tinggal chat "telpon"' },
  ],

  final:
`eh udah sampe sini aja hehe

makasih ya udah mau buka satu-satu. maaf kalo masih ada kurangnya, aku bikinnya beneran niat biar kamu seneng hari ini

intinya aku seneng kamu lahir, dan aku seneng bisa kenal sama punya kamu. semoga taun depan aku lagi yang ngucapin yaa

happy birthday tusyaa 🍓🤍`,
};

/* ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const KEY = 'bday-' + CONFIG.name;

const MAILS = [
  { id: 'letter',  fav: true, icon: '💌', subject: `happy birthday ${CONFIG.name} 🎂`, preview: 'buka yang ini dulu yaa', time: '00:00', chip: '📝 surat.txt', render: renderLetter },
  { id: 'gallery', fav: true, icon: '📸', subject: 'foto-foto kamu', preview: 'yang aku simpen diem-diem hehe', time: '00:01', chip: `🖼️ ${CONFIG.photos.length} foto`, render: renderGallery },
  { id: 'reasons', fav: false, icon: '🍓', subject: 'hal yang aku suka dari kamu', preview: 'tap kartunya satu-satu', time: '00:02', render: renderReasons },
  { id: 'cake',    fav: false, icon: '🎂', subject: 'tiup lilin dulu 🕯️', preview: 'jangan lupa make a wish dulu', time: '00:03', render: renderCake },
  { id: 'coupons', fav: false, icon: '🎟️', subject: 'voucher buat kamu', preview: 'ga ada expired-nya kok', time: '00:04', chip: `🎫 ${CONFIG.coupons.length} voucher`, render: renderCoupons },
  { id: 'final',   fav: true, icon: '🔒', subject: 'satu lagi...', preview: 'bukanya paling terakhir ya', time: '00:05', locked: true, render: renderFinal },
];

const state = {
  read: new Set(JSON.parse(localStorage.getItem(KEY + '-read') || '[]')),
  filter: 'all',
  current: null,
};
const saveRead = () => localStorage.setItem(KEY + '-read', JSON.stringify([...state.read]));

/* sync static labels from CONFIG */
$('#introTitle').textContent = `haii ${CONFIG.name}!`;
$('#envFor').textContent = `for ${CONFIG.name} 🍓`;
$('#searchText').textContent = `kiriman dari ${CONFIG.from}...`;
$('#footName').textContent = CONFIG.name;
$('#metaFrom').textContent = CONFIG.from;
$('#metaAddr').textContent = `<${CONFIG.from}@strawberry.mail>`;
$('#metaTo').textContent = CONFIG.name;

/* ---------- screens ---------- */
function show(id) {
  $$('.screen').forEach((s) => s.classList.toggle('active', s.id === id));
  window.scrollTo(0, 0);
}

/* ---------- floating strawberry & leaf background ---------- */
(function hearts() {
  const box = $('.bg-hearts');
  const glyphs = ['♥', '🌿', '🍓', '❀'];
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('span');
    s.textContent = glyphs[i % glyphs.length];
    if (i % 2) s.classList.add('g');
    s.style.left = Math.random() * 100 + '%';
    s.style.fontSize = 11 + Math.random() * 15 + 'px';
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

/* ---------- search bar easter egg & tabs ---------- */
const searchHints = [
  `kiriman dari ${CONFIG.from}...`,
  'cari: orang paling gemes sedunia',
  `hasilnya cuma ${CONFIG.name} doang 🍓`,
  'ga usah nyari yang lain ya 😤',
];
let hintIdx = 0;
$('#searchBar').addEventListener('click', () => {
  hintIdx = (hintIdx + 1) % searchHints.length;
  $('#searchText').textContent = searchHints[hintIdx];
});

$$('#inboxTabs .tab').forEach((btn) => {
  btn.addEventListener('click', () => {
    state.filter = btn.dataset.filter;
    $$('#inboxTabs .tab').forEach((b) => b.classList.toggle('active', b === btn));
    renderInbox();
  });
});

/* ---------- inbox ---------- */
function allOthersRead() {
  return MAILS.filter((m) => !m.locked).every((m) => state.read.has(m.id));
}

function renderInbox() {
  const list = $('#mailList');
  list.innerHTML = '';
  const items = MAILS.filter((m) => {
    if (state.filter === 'unread') return !state.read.has(m.id);
    if (state.filter === 'fav') return m.fav;
    return true;
  });

  if (!items.length) {
    list.innerHTML = `<li class="empty-filter">udah kebaca semua nih 🍓✨</li>`;
  } else {
    items.forEach((m, i) => {
      const idx = MAILS.indexOf(m);
      const locked = m.locked && !allOthersRead();
      const li = document.createElement('li');
      li.className = 'mail-item' + (state.read.has(m.id) ? '' : ' unread') + (locked ? ' locked' : '');
      li.style.animationDelay = i * 0.06 + 's';
      li.innerHTML = `
        <div class="avatar ${idx % 2 ? 'g' : ''}">${locked ? '🔒' : m.locked ? '💝' : m.icon}</div>
        <div class="mail-main">
          <div class="mail-row"><span class="mail-from">${CONFIG.from}</span><span class="mail-time">${m.time}</span></div>
          <div class="mail-subj">${m.subject}</div>
          <div class="mail-prev">${locked ? 'baca yang lain dulu yaa 😝' : m.preview}</div>
          ${m.chip ? `<span class="chip">${m.chip}</span>` : ''}
        </div>`;
      li.addEventListener('click', () => {
        if (locked) {
          li.classList.remove('shake'); void li.offsetWidth; li.classList.add('shake');
          toast('eits, buka yang lain dulu yaa 😝');
          return;
        }
        openMail(m);
      });
      list.appendChild(li);
    });
  }
  const unread = MAILS.filter((m) => !state.read.has(m.id)).length;
  $('#unreadCount').textContent = unread;
  $('#unreadCount').style.display = unread ? '' : 'none';
}

/* ---------- mail view ---------- */
function openMail(m, push = true) {
  state.current = m;
  const idx = MAILS.indexOf(m);
  $('#mailSubject').textContent = m.subject;
  $('#mailTime').textContent = 'hari ini · ' + m.time;
  const av = $('#mailAvatar');
  av.textContent = m.locked ? '💝' : m.icon;
  av.classList.toggle('g', idx % 2 === 1);
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
    setTimeout(() => toast('email paling bawah udah kebuka tuh 🔓'), 500);
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
    <figure class="polaroid letter-hero"><img src="photos/foto-03.jpg" alt="${CONFIG.name}"><figcaption>birthday girl 🍓</figcaption></figure>
    <p class="big-hand">happy birthday,<br>${CONFIG.name}!</p>
    <div class="letter-paper" id="paper"></div>
    <p class="sign" id="sign" style="opacity:0">— ${CONFIG.from}</p>
    <button class="skip-btn" id="skip">langsung baca semua</button>`;
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
    await sleep(ch === '\n' ? 180 : /[.,!?:]/.test(ch) ? 140 : 28);
  }
  paper.innerHTML = escapeHtml(text);
  $('#sign').style.transition = 'opacity .8s'; $('#sign').style.opacity = 1;
  $('#skip').remove();
  burst(0.5, 0.7, 50);
}

/* ---------- #2 gallery ---------- */
function renderGallery(body) {
  body.innerHTML = `
    <p>ini foto-foto kamu yang aku simpen diem-diem 🤭 tap aja kalo mau liat lebih jelas</p>
    <div class="attach-head">📎 ${CONFIG.photos.length} foto tersimpan</div>
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
    <p>sebenernya banyak, tapi segini dulu aja ya biar kamu ga kepedean wkwk. tap kartunya satu-satu</p>
    <div class="reasons">${CONFIG.reasons.map((r, i) => `
      <div class="flip ${i % 2 ? 'g' : ''}"><div class="flip-inner">
        <div class="flip-face flip-front"><div><div class="num">${i + 1}</div><small>tap</small></div></div>
        <div class="flip-face flip-back">${escapeHtml(r)}</div>
      </div></div>`).join('')}
    </div>
    <p class="progress-note" id="reasonNote">0 / ${CONFIG.reasons.length} kebuka</p>`;
  const cards = $$('.flip', body);
  cards.forEach((c) => c.addEventListener('click', () => {
    c.classList.toggle('flipped');
    const n = cards.filter((x) => x.classList.contains('flipped')).length;
    $('#reasonNote').textContent = n === cards.length ? 'masih banyak lagi sih sebenernya 🤭🍓' : `${n} / ${cards.length} kebuka`;
    if (n === cards.length && !renderReasons.done) { renderReasons.done = true; burst(0.5, 0.6, 80); }
  }));
}

/* ---------- #4 cake ---------- */
function renderCake(body) {
  const colors = ['#ea5b7c', '#78b38d', '#ffd3dc', '#48795b', '#fff'];
  const sprinkles = Array.from({ length: 22 }, () =>
    `<i style="left:${Math.random() * 95}%;top:${Math.random() * 90}%;background:${colors[(Math.random() * colors.length) | 0]};transform:rotate(${Math.random() * 180}deg)"></i>`).join('');
  body.innerHTML = `
    <p>merem dulu bentar, berdoa dalem hati, abis itu tiup lilinnya 🕯️<br><span class="muted">bisa tap apinya langsung, atau klik tombol mic terus tiup beneran ke hp kamu</span></p>
    <div class="cake-wrap">
      <div class="cake">
        <div class="plate"></div>
        <div class="layer layer-1"><div class="sprinkles">${sprinkles}</div></div>
        <div class="layer layer-2"></div>
        <div class="berries"><span>🍓</span><span>🍓</span><span>🍓</span></div>
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
      <p class="big-hand">yeyy happy birthday ${CONFIG.name}! 🎉</p>
      <p>semoga semua yang barusan kamu minta dikabulin yaa, aamiin 🤲</p>
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
    else toast('mic-nya ga kebaca, tap apinya langsung aja yaa');
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
  const claimed = new Set(JSON.parse(localStorage.getItem(KEY + '-coupons') || '[]'));
  body.innerHTML = `
    <p>voucher ini ga ada kadaluarsanya yaa. kalo mau pake tinggal klik klaim terus ss kirim ke wa aku, ntar langsung aku turutin 🫡</p>
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
      localStorage.setItem(KEY + '-coupons', JSON.stringify([...claimed]));
      el.classList.toggle('claimed', on);
      e.target.textContent = on ? 'udah diklaim ✓' : 'klaim';
      if (on) { const r = e.target.getBoundingClientRect(); burst(r.left / innerWidth, r.top / innerHeight, 30); toast('jangan lupa ss terus kirim ke aku 📸'); }
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
    <p class="love-big">sayang kamu,<br>${CONFIG.name} 🍓</p>
    <div class="letter-paper" style="margin-top:20px">${escapeHtml(CONFIG.final)}</div>
    <p class="sign">— ${CONFIG.from}</p>
    <div class="reply-box">
      <p>💬 bales ke ${CONFIG.from}</p>
      <textarea id="replyText" placeholder="ketik apa aja di sini..."></textarea>
      <button class="btn pink" id="replyBtn">kirim lewat WhatsApp</button>
    </div>
    <div class="center-row"><button class="btn soft" id="again">↺ buka ulang dari awal</button></div>`;
  setTimeout(celebrate, 600);
  $('#replyBtn').onclick = () => {
    const t = $('#replyText').value.trim();
    if (!t) { toast('ketik dulu dong jangan kosong 🥺'); return; }
    const phone = (CONFIG.whatsapp || '').replace(/\D/g, '');
    const base = phone ? `https://wa.me/${phone}` : 'https://wa.me/';
    window.open(base + '?text=' + encodeURIComponent(t), '_blank');
  };
  $('#again').onclick = () => {
    localStorage.removeItem(KEY + '-read');
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
const CCOLORS = ['#ea5b7c', '#f598ae', '#d8375d', '#78b38d', '#a9d5b7', '#48795b', '#ffffff'];
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
CONFIG.photos.forEach((p) => { const i = new Image(); i.src = p.src; });
