import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function storageKey() {
  return window.innerWidth < 700 ? 'theme-mobile' : 'theme';
}

function createTheme() {
  const { subscribe, set, update } = writable('dark');

  return {
    subscribe,
    init() {
      if (!browser) return;
      const defaultTheme = 'dark';
      const saved = localStorage.getItem(storageKey()) || defaultTheme;
      set(saved);
      const isLight = saved === 'light';
      document.documentElement.classList.toggle('light-mode', isLight);
      document.body.classList.toggle('light-mode', isLight);
    },
    toggle() {
      update(mode => {
        const next = mode === 'dark' ? 'light' : 'dark';
        if (browser) {
          localStorage.setItem(storageKey(), next);
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
