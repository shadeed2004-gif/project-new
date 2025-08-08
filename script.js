/* Useless App Suite — script.js
   14 mini-apps + Palm Reader (fake scanner)
*/

const apps = [
  { id: 'mouse', title: 'Is My Mouse Moving?', render: mouseApp },
  { id: 'color', title: 'Random Color of the Day', render: colorApp },
  { id: 'notcalc', title: 'Not-a-Calculator', render: notACalcApp },
  { id: 'cloud', title: 'Cloud Shape Identifier', render: cloudApp },
  { id: 'caps', title: 'Caps Lock Reminder', render: capsApp },
  { id: 'revtimer', title: 'Reverse Timer', render: reverseTimerApp },
  { id: 'mood', title: 'Mood Detector', render: moodApp },
  { id: 'percent', title: 'Percentage Generator', render: percentApp },
  { id: 'dayval', title: 'Day Validator', render: dayValidatorApp },
  { id: 'aiguess', title: 'AI Number Guesser', render: aiGuesserApp },
  { id: 'autoscroll', title: 'Auto Scroller', render: autoScrollerApp },
  { id: 'volume', title: 'Volume Simulator', render: volumeSimApp },
  { id: 'compliment', title: 'Hourly Compliment', render: hourlyComplimentApp },
  { id: 'tabclose', title: 'Tab Closer', render: tabCloserApp },
  { id: 'palm', title: 'Palm Reader (Fake)', render: palmReaderApp }
];

const tabs = document.getElementById('tabs');
const content = document.getElementById('content');

// build tabs
apps.forEach((a, i) => {
  const b = document.createElement('button');
  b.className = 'tab-btn' + (i === 0 ? ' active' : '');
  b.textContent = a.title;
  b.onclick = () => selectTab(a.id);
  b.dataset.id = a.id;
  tabs.appendChild(b);
});

// initial content
selectTab(apps[0].id);

function selectTab(id) {
  document.querySelectorAll('.tab-btn').forEach(t => t.classList.toggle('active', t.dataset.id === id));
  const app = apps.find(x => x.id === id);
  content.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'card';
  app.render(container);
  content.appendChild(container);
}

/* ---------- App implementations ---------- */

function mouseApp(root) {
  const status = elt('div', { class: 'big' }, 'No');
  const note = elt('div', { class: 'small notice' }, 'Move your mouse (or touch/move) to see it say "Yes".');
  let last = performance.now();
  let moving = false;

  window.addEventListener('mousemove', () => { moving = true; last = performance.now(); status.textContent = 'Yes'; });
  window.addEventListener('touchmove', () => { moving = true; last = performance.now(); status.textContent = 'Yes'; });

  setInterval(() => {
    if (performance.now() - last > 800) { moving = false; status.textContent = 'No'; }
  }, 300);

  root.appendChild(status);
  root.appendChild(note);
}

function colorApp(root) {
  const box = elt('div', { style: 'height:140px;border-radius:10px;border:1px solid #eee;display:flex;align-items:center;justify-content:center' }, '');
  const code = elt('div', { class: 'big' }, '');
  const refresh = elt('button', { class: 'btn' }, 'New Color');
  refresh.onclick = () => pick();
  function pick() {
    const hex = '#' + Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,'0');
    box.style.background = hex;
    box.style.color = (getLuma(hex) > 130) ? '#111' : '#fff';
    code.textContent = hex.toUpperCase();
  }
  pick();
  root.appendChild(box);
  root.appendChild(code);
  root.appendChild(refresh);
  root.appendChild(elt('div', { class: 'notice' }, 'Refresh the page to get a new “Color of the Day”.'));
  function getLuma(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return 0.299*r + 0.587*g + 0.114*b;
  }
}

function notACalcApp(root) {
  const input = elt('input', { class: 'input', placeholder: 'Type any math or phrase...' });
  const out = elt('div', { class: 'big' }, '42');
  const note = elt('div', { class: 'small notice' }, 'This is a calculator that always answers 42. Try long expressions.');
  input.addEventListener('input', () => out.textContent = '42');
  root.appendChild(input);
  root.appendChild(out);
  root.appendChild(note);
}

function cloudApp(root) {
  const uploader = elt('input', { type: 'file', accept: 'image/*', class: 'input' });
  const out = elt('div', { class: 'big' }, 'It\'s a cloud.');
  uploader.onchange = () => {
    out.textContent = 'It\'s a cloud.'; // always
  };
  root.appendChild(elt('div', {}, 'Upload an image (optional):'));
  root.appendChild(uploader);
  root.appendChild(out);
  root.appendChild(elt('div', { class: 'small notice' }, 'No AI used. Promise.'));
}

function capsApp(root) {
  const box = elt('div', { class: 'big' }, 'Caps Lock is OFF');
  root.appendChild(box);
  const note = elt('div', { class: 'small notice' }, 'Press Caps Lock to see the reminder.');
  root.appendChild(note);
  window.addEventListener('keydown', (e) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) {
      box.textContent = '⚠️ Caps Lock is ON';
    } else {
      box.textContent = 'Caps Lock is OFF';
    }
  });
}

function reverseTimerApp(root) {
  const counter = elt('div', { class: 'big' }, '00:00');
  let start = null;
  let t = 0;
  const startBtn = elt('button', { class: 'btn' }, 'Start Counting Up');
  const stopBtn = elt('button', { class: 'btn' }, 'Stop');
  startBtn.onclick = () => {
    start = performance.now() - t;
    tick();
  };
  stopBtn.onclick = () => { t = performance.now() - start; start = null; };
  function tick() {
    if (!start) return;
    const s = Math.floor((performance.now() - start)/1000);
    const mm = String(Math.floor(s/60)).padStart(2,'0');
    const ss = String(s%60).padStart(2,'0');
    counter.textContent = `${mm}:${ss}`;
    requestAnimationFrame(tick);
  }
  root.appendChild(counter);
  root.appendChild(elt('div', { class: 'controls' }, startBtn, stopBtn));
  root.appendChild(elt('div', { class: 'small notice' }, 'A timer that counts up because down is too mainstream.'));
}

function moodApp(root) {
  const out = elt('div', { class: 'big' }, 'You seem fine.');
  root.appendChild(out);
  root.appendChild(elt('div', { class: 'small notice' }, 'Emotion model: nonsense.'));
}

function percentApp(root) {
  const out = elt('div', { class: 'big' }, '');
  const btn = elt('button', { class: 'btn' }, 'Generate %');
  btn.onclick = () => out.textContent = Math.floor(Math.random()*101) + '%';
  btn.click();
  root.appendChild(out);
  root.appendChild(btn);
  root.appendChild(elt('div', { class: 'small notice' }, 'Meaningless percentages since forever.'));
}

function dayValidatorApp(root) {
  const inp = elt('input', { class: 'input', placeholder: 'YYYY-MM-DD' });
  const btn = elt('button', { class: 'btn' }, 'Is this today?');
  const out = elt('div', { class: 'big' }, '—');
  btn.onclick = () => {
    const v = inp.value.trim();
    const today = new Date().toISOString().slice(0,10);
    out.textContent = (v === today) ? 'Yes, that is today.' : 'Nope, not today.';
  };
  root.appendChild(inp);
  root.appendChild(btn);
  root.appendChild(out);
  root.appendChild(elt('div', { class: 'small notice' }, 'Try leaving the field blank and guessing.'));
}

function aiGuesserApp(root) {
  const note = elt('div', { class: 'small' }, 'Think of a number (no need to type it).');
  const guess = elt('div', { class: 'big' }, 'Is it 7?');
  const btn = elt('button', { class: 'btn' }, 'Make Another Wrong Guess');
  btn.onclick = () => guess.textContent = `Is it ${Math.floor(Math.random()*100)+1}?`;
  root.appendChild(note);
  root.appendChild(guess);
  root.appendChild(btn);
}

function autoScrollerApp(root) {
  const btn = elt('button', { class: 'btn' }, 'Start Auto Scroll');
  const stop = elt('button', { class: 'btn' }, 'Stop');
  let id = null;
  btn.onclick = () => {
    if (id) return;
    id = setInterval(() => window.scrollBy(0,1), 60);
  };
  stop.onclick = () => { clearInterval(id); id = null; };
  root.appendChild(elt('div', {}, btn, stop));
  root.appendChild(elt('div', { class: 'small notice' }, 'Scrolls the page slowly. Very exciting.'));
}

function volumeSimApp(root) {
  const slider = elt('input', { type: 'range', min:0, max:100, value:50 });
  const label = elt('div', { class: 'big' }, '50%');
  slider.oninput = () => label.textContent = slider.value + '%';
  root.appendChild(slider);
  root.appendChild(label);
  root.appendChild(elt('div', { class: 'small notice' }, 'Does not change system volume. Internet says sorry.'));
}

function hourlyComplimentApp(root) {
  const out = elt('div', { class: 'big' }, '');
  const btn = elt('button', { class: 'btn' }, 'Get Compliment');
  btn.onclick = () => {
    const last = +localStorage.getItem('uac_last_compliment') || 0;
    const oneHour = 1000*60*60;
    const now = Date.now();
    if (now - last < oneHour) {
      out.textContent = 'You already got one this hour. Patience.';
    } else {
      out.textContent = sample(compliments);
      localStorage.setItem('uac_last_compliment', now.toString());
    }
  };
  root.appendChild(btn);
  root.appendChild(out);
  root.appendChild(elt('div', { class: 'small notice' }, 'One compliment per hour. That is the rule.'));
}

function tabCloserApp(root) {
  const btn = elt('button', { class: 'btn' }, 'Close This Tab');
  btn.onclick = () => {
    try { window.close(); } catch(e) { alert('Browser blocked closing. Try opening this page from a script to allow it.'); }
  };
  root.appendChild(btn);
  root.appendChild(elt('div', { class: 'small notice' }, 'May be blocked depending on how the page was opened.'));
}

function palmReaderApp(root) {
  // fake scanner — animation then choose random scripted message
  const box = elt('div', { class: 'scanner' }, 
    elt('div', {}, 'Place your palm over the scanner (or just click).'),
    elt('div', { class: 'progress' }, elt('i'))
  );
  const btn = elt('button', { class: 'btn' }, 'Scan My Palm');
  const out = elt('div', { class: 'big' }, '—');
  const notes = elt('div', { class: 'small notice' }, 'This is a fake palm reader. Results are pre-scripted and totally random.');

  btn.onclick = async () => {
    // animate progress
    const bar = box.querySelector('.progress > i');
    bar.style.width = '0%';
    out.textContent = 'Scanning…';
    for (let p = 10; p <= 100; p += Math.floor(5 + Math.random()*20)) {
      bar.style.width = p + '%';
      await delay(350 + Math.random()*250);
    }
    // small pause
    await delay(500);
    const msg = sample(palmMessages);
    out.textContent = msg;
    bar.style.width = '100%';
  };

  root.appendChild(box);
  root.appendChild(elt('div', { style: 'margin-top:8px' }, btn));
  root.appendChild(out);
  root.appendChild(notes);
}

/* ---------- Helpers & data ---------- */

function elt(tag, attrs, ...children) {
  const el = document.createElement(tag);
  if (attrs && typeof attrs === 'object' && !Array.isArray(attrs)) {
    for (const k in attrs) {
      if (k === 'style') el.setAttribute('style', attrs[k]);
      else if (k.startsWith('data-')) el.setAttribute(k, attrs[k]);
      else el[k] = attrs[k];
    }
  } else if (attrs) {
    children.unshift(attrs);
  }
  (children || []).forEach(c => {
    if (c == null) return;
    if (typeof c === 'string' || typeof c === 'number') el.appendChild(document.createTextNode(c));
    else el.appendChild(c);
  });
  return el;
}

function sample(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function delay(ms){ return new Promise(resolve => setTimeout(resolve, ms)); }

const compliments = [
  "You have excellent taste in tabs.",
  "That shirt would look great on a cloud.",
  "Your coffee cup thanks you.",
  "You’re a person of excellent potential.",
  "You make pixels proud."
];

const palmMessages = [
  "You will find something you weren't looking for.",
  "Beware of chairs with wobbly legs.",
  "You have an 87% chance of pocket change today.",
  "A small surprise will make you smile within 3 days.",
  "Your future is… loading… still loading…",
  "You will invent a new way to forget names.",
  "You will remember an old song and hum it loudly.",
  "A sandwich-related decision will define your afternoon.",
  "You are secretly very organized, even when you aren't.",
  "An unexpected notification will distract you in a good way."
];

// initialize
function init() {
  // ensure first tab content built
  selectTab(apps[0].id);
}
init();
