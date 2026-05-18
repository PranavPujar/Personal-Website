import { writable } from 'svelte/store';

export const appReady = writable(false);
export const streamReset = writable(0);
