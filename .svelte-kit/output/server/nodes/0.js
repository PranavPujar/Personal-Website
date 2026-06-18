

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.BukDM3So.js","_app/immutable/chunks/BsYmU5Nk.js","_app/immutable/chunks/gNIkVS_k.js","_app/immutable/chunks/BLLuZzQQ.js","_app/immutable/chunks/-MBtUS3w.js","_app/immutable/chunks/VOjxzCk0.js","_app/immutable/chunks/DHfL00A1.js","_app/immutable/chunks/CT0T0Gak.js","_app/immutable/chunks/C8CRuKuV.js","_app/immutable/chunks/B6UmagQa.js","_app/immutable/chunks/CFXm_j-L.js"];
export const stylesheets = ["_app/immutable/assets/0.CetUUBuT.css"];
export const fonts = ["_app/immutable/assets/figtree-latin-ext-wght-normal.DCwSJGxG.woff2","_app/immutable/assets/figtree-latin-wght-normal.D_ZTVpCC.woff2"];
