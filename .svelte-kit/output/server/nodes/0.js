

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.BVLk8Gj4.js","_app/immutable/chunks/CTJoNEX9.js","_app/immutable/chunks/MIrvh2do.js","_app/immutable/chunks/DG2INW34.js","_app/immutable/chunks/DxLN9Q9A.js","_app/immutable/chunks/s8OF8Pyo.js","_app/immutable/chunks/v_jBEYI6.js","_app/immutable/chunks/16gWMuTz.js","_app/immutable/chunks/CjXUOAnl.js"];
export const stylesheets = ["_app/immutable/assets/0.DJXXCeKa.css"];
export const fonts = ["_app/immutable/assets/figtree-latin-ext-wght-normal.DCwSJGxG.woff2","_app/immutable/assets/figtree-latin-wght-normal.D_ZTVpCC.woff2"];
