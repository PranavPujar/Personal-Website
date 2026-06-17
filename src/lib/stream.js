let gen = 0;

function rafDelay(ms, g) {
  return new Promise(resolve => {
    if (gen !== g || ms < 16) { resolve(); return; }
    const start = performance.now();
    function tick() {
      if (gen !== g) { resolve(); return; }
      if (performance.now() - start >= ms) resolve();
      else requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

function wrapWordsInEl(el) {
  if (el.dataset.wrapped) return;
  el.dataset.wrapped = 'true';
  // Letter mode reveals one character at a time (used for the thumbnail
  // headline); the default splits on whitespace and reveals whole words.
  const letterMode = el.dataset.streamMode === 'letter';
  function wrapTextNode(node) {
    const units = letterMode ? [...node.textContent] : node.textContent.split(/(\s+)/);
    if (units.every(u => !/\S/.test(u))) return;
    const frag = document.createDocumentFragment();
    units.forEach(unit => {
      if (/\S/.test(unit)) {
        const span = document.createElement('span');
        span.textContent = unit;
        span.className = 'stream-word';
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(unit));
      }
    });
    node.parentNode.replaceChild(frag, node);
  }
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      wrapTextNode(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'A' || node.tagName === 'U') {
        const wrapper = document.createElement('span');
        wrapper.className = 'stream-word';
        node.parentNode.insertBefore(wrapper, node);
        wrapper.appendChild(node);
      } else {
        [...node.childNodes].forEach(walk);
      }
    }
  }
  walk(el);
}

async function streamEl(el, targets, started, g, speedDiv) {
  if (started.has(el)) return;
  started.add(el);
  el.classList.add('is-streaming');
  const words = [...el.querySelectorAll('.stream-word')];
  const next = targets[targets.indexOf(el) + 1];
  let nextTriggered = false;
  // Optional per-element speed override (e.g. the thumbnail headline streams
  // much slower than the body); falls back to the view-wide speedDiv.
  const elSpeed = el.dataset.speedDiv ? parseFloat(el.dataset.speedDiv) : speedDiv;

  for (let i = 0; i < words.length; i++) {
    if (gen !== g) { el.classList.remove('is-streaming'); return; }
    words[i].classList.add('visible');
    const remaining = words.length - i - 1;
    if (!nextTriggered && remaining <= 25 && next) {
      nextTriggered = true;
      streamEl(next, targets, started, g, speedDiv);
    }
    const delay = (25 + (Math.random() * 20 - 10)) / elSpeed;
    await rafDelay(delay, g);
  }
  el.classList.remove('is-streaming');
  if (gen !== g) return;
  if (!nextTriggered && next) streamEl(next, targets, started, g, speedDiv);
}

export function cancelStream() {
  gen++;
}

// Scroll-triggered variant: each target element reveals its words (same blur
// effect as streamView) only once it scrolls into view, instead of all chaining
// from load. Returns a cleanup fn that disconnects the observer.
export function streamOnScroll(node, { selector, speedDiv = 1, rootMargin = '0px', threshold = 0 } = {}) {
  // Capture the current generation; layout's cancelStream() bumps `gen` on
  // navigation, which aborts any in-flight reveals via rafDelay.
  const g = gen;
  const targets = [...node.querySelectorAll(selector)];

  targets.forEach(el => {
    wrapWordsInEl(el);
    const words = [...el.querySelectorAll('.stream-word')];
    if (el.offsetParent === null) {
      // Hidden in this viewport (e.g. the desktop/mobile duplicate of an item).
      // Reveal immediately so it's never stuck blurred if the layout later
      // switches to show it; only the visible copy actually streams.
      words.forEach(w => w.classList.add('visible'));
      el.dataset.streamed = 'true';
    } else {
      words.forEach(w => { w.style.transition = 'none'; w.classList.remove('visible'); });
    }
  });
  requestAnimationFrame(() => {
    targets.forEach(el => el.querySelectorAll('.stream-word').forEach(w => { w.style.transition = ''; }));
  });

  async function reveal(el) {
    if (el.dataset.streamed) return;
    el.dataset.streamed = 'true';
    const words = [...el.querySelectorAll('.stream-word')];
    const elSpeed = el.dataset.speedDiv ? parseFloat(el.dataset.speedDiv) : speedDiv;
    for (let i = 0; i < words.length; i++) {
      if (gen !== g) return;
      words[i].classList.add('visible');
      const delay = (25 + (Math.random() * 20 - 10)) / elSpeed;
      await rafDelay(delay, g);
    }
  }

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        reveal(entry.target);
        io.unobserve(entry.target);
      }
    }
  }, { root: null, rootMargin, threshold });

  targets.forEach(el => io.observe(el));
  return () => io.disconnect();
}

export async function streamView(node, speedDiv = 1) {
  const g = ++gen;
  const targets = [...node.querySelectorAll('.bio p, .section-title, .card p, .card h3, .thumb-overline, .video-caption-meta')];
  targets.forEach(el => wrapWordsInEl(el));
  const allWords = [...node.querySelectorAll('.stream-word')];
  allWords.forEach(w => { w.style.transition = 'none'; w.classList.remove('visible'); });
  await new Promise(r => requestAnimationFrame(r));
  allWords.forEach(w => { w.style.transition = ''; });
  if (targets.length > 0) streamEl(targets[0], targets, new Set(), g, speedDiv);
}
