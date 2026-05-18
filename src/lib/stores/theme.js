import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createTheme() {
  const { subscribe, set, update } = writable('dark');

  return {
    subscribe,
    init() {
      if (!browser) return;
      const saved = localStorage.getItem('theme') || 'dark';
      set(saved);
      document.body.classList.toggle('light-mode', saved === 'light');
    },
    toggle() {
      update(mode => {
        const next = mode === 'dark' ? 'light' : 'dark';
        if (browser) {
          localStorage.setItem('theme', next);
          document.body.classList.add('theme-switching');
          document.body.classList.toggle('light-mode', next === 'light');
          requestAnimationFrame(() => requestAnimationFrame(() => {
            document.body.classList.remove('theme-switching');
          }));
        }
        return next;
      });
    }
  };
}

export const theme = createTheme();
