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
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = node.textContent.split(/(\s+)/);
      if (parts.every(p => !/\S/.test(p))) return;
      const frag = document.createDocumentFragment();
      parts.forEach(part => {
        if (/\S/.test(part)) {
          const span = document.createElement('span');
          span.textContent = part;
          span.className = 'stream-word';
          frag.appendChild(span);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      });
      node.parentNode.replaceChild(frag, node);
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

  for (let i = 0; i < words.length; i++) {
    if (gen !== g) { el.classList.remove('is-streaming'); return; }
    words[i].classList.add('visible');
    const remaining = words.length - i - 1;
    if (!nextTriggered && remaining <= 25 && next) {
      nextTriggered = true;
      streamEl(next, targets, started, g, speedDiv);
    }
    const delay = (25 + (Math.random() * 20 - 10)) / speedDiv;
    await rafDelay(delay, g);
  }
  el.classList.remove('is-streaming');
  if (gen !== g) return;
  if (!nextTriggered && next) streamEl(next, targets, started, g, speedDiv);
}

export function cancelStream() {
  gen++;
}

export async function streamView(node, speedDiv = 1) {
  const g = ++gen;
  const targets = [...node.querySelectorAll('.bio p, .section-title, .card p, .card h3')];
  targets.forEach(el => wrapWordsInEl(el));
  const allWords = [...node.querySelectorAll('.stream-word')];
  allWords.forEach(w => { w.style.transition = 'none'; w.classList.remove('visible'); });
  await new Promise(r => requestAnimationFrame(r));
  allWords.forEach(w => { w.style.transition = ''; });
  if (targets.length > 0) streamEl(targets[0], targets, new Set(), g, speedDiv);
}
