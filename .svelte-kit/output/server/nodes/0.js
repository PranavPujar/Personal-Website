

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.RxNAmw1G.js","_app/immutable/chunks/KSBats9e.js","_app/immutable/chunks/DYn-kJGp.js","_app/immutable/chunks/BlgoId36.js","_app/immutable/chunks/BgUy-a58.js","_app/immutable/chunks/CFKVnMbq.js","_app/immutable/chunks/DhcbHrrW.js","_app/immutable/chunks/BDHBW0wh.js"];
export const stylesheets = ["_app/immutable/assets/0.DUODblTs.css"];
export const fonts = [];
