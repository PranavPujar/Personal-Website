// First-party, privacy-friendly analytics tracker.
//
// Privacy: the visitor's IP address is NEVER logged or stored. We only read
// coarse geo (city / region / country / timezone) from ipapi.co, and any error
// fetching it is swallowed silently. One session = one full page load (the SPA
// keeps a single session across client-side route changes).
import { browser } from '$app/environment';

const ENDPOINT = '/api/track';

let initialized = false;
let sessionId;
let startTime;

function sendJSON(body, useBeacon = false) {
  const payload = JSON.stringify(body);
  try {
    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }));
      return;
    }
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true
    }).catch(() => {});
  } catch {
    /* tracking must never break the page */
  }
}

async function startSession() {
  let geo = {};
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const d = await res.json();
      // Extract ONLY these fields. Never read or store the IP.
      geo = {
        city: d.city ?? null,
        region: d.region ?? null,
        country: d.country_name ?? null,
        timezone: d.timezone ?? null
      };
    }
  } catch {
    /* ignore geo failures silently */
  }
  sendJSON({ eventType: 'session_start', sessionId, ...geo });
}

function endSession() {
  const duration_sec = Math.round((Date.now() - startTime) / 1000);
  sendJSON({ eventType: 'session_end', sessionId, duration_sec }, true);
}

function track(label, page) {
  sendJSON({ eventType: 'click', sessionId, label, page });
}

const SOCIALS = [
  ['github', 'GitHub'],
  ['linkedin', 'LinkedIn'],
  ['youtube', 'YouTube'],
  ['youtu.be', 'YouTube'],
  ['twitter', 'Twitter'],
  ['x.com', 'Twitter'],
  ['instagram', 'Instagram']
];

function socialLabel(link) {
  const href = (link.getAttribute('href') || '').toLowerCase();
  const aria = (link.getAttribute('aria-label') || link.getAttribute('title') || '').toLowerCase();
  for (const [needle, label] of SOCIALS) {
    if (href.includes(needle) || aria.includes(label.toLowerCase())) return label;
  }
  return null;
}

function isAboutOrJourney(path) {
  // The bio ("about") lives at the home route `/`.
  return path === '/' || path === '/about' || path.startsWith('/journey');
}

function handleClick(e) {
  const target = e.target;
  if (!(target instanceof Element)) return;
  const path = window.location.pathname;

  // Light/dark mode toggle — tracked on any page.
  if (target.closest('#theme-toggle, [aria-label="Toggle theme"]')) {
    return track('Dark Mode Toggle', path);
  }

  // YouTube interview trigger on /featured (it's a <button class="video-card">).
  if (path.startsWith('/featured') && target.closest('.video-card')) {
    return track('YouTube Interview', path);
  }

  const link = target.closest('a');
  if (!link) return;

  // Social buttons — any page.
  const social = socialLabel(link);
  if (social) return track(social, path);

  // Resume link — any page (href ends in .pdf, or the text/label says "resume").
  const href = link.getAttribute('href') || '';
  const text = (link.textContent || '').trim();
  const aria = link.getAttribute('aria-label') || '';
  if (/\.pdf(\?|#|$)/i.test(href) || /resume/i.test(text) || /resume/i.test(aria)) {
    return track('Resume Download', path);
  }

  // All other <a> tags, but only on the about (/) and /journey pages.
  if (isAboutOrJourney(path)) {
    const label = text || aria || href || '(link)';
    return track(label, path);
  }
}

export function initAnalytics() {
  if (!browser || initialized) return;
  initialized = true;

  sessionId = crypto.randomUUID();
  startTime = Date.now();

  startSession();

  window.addEventListener('beforeunload', endSession);
  // Capture phase so we still see clicks whose propagation is stopped.
  document.addEventListener('click', handleClick, true);
}
