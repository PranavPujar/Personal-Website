import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createTheme() {
  const { subscribe, set, update } = writable('dark');

  return {
    subscribe,
    init() {
      if (!browser) return;
      const defaultTheme = window.innerWidth < 700 ? 'light' : 'dark';
      const saved = localStorage.getItem('theme') || defaultTheme;
      set(saved);
      const isLight = saved === 'light';
      document.documentElement.classList.toggle('light-mode', isLight);
      document.body.classList.toggle('light-mode', isLight);
    },
    toggle() {
      update(mode => {
        const next = mode === 'dark' ? 'light' : 'dark';
        if (browser) {
          localStorage.setItem('theme', next);
          const isLight = next === 'light';
          document.body.classList.add('theme-switching');
          document.documentElement.classList.toggle('light-mode', isLight);
          document.body.classList.toggle('light-mode', isLight);
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
