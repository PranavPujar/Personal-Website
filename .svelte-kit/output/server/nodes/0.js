

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Coa08955.js","_app/immutable/chunks/B0lws9jP.js","_app/immutable/chunks/BkHxfV38.js","_app/immutable/chunks/CPyST-vt.js","_app/immutable/chunks/BgUy-a58.js","_app/immutable/chunks/CFKVnMbq.js","_app/immutable/chunks/Deq1K8-7.js","_app/immutable/chunks/CZ1ZwyKF.js"];
export const stylesheets = ["_app/immutable/assets/0.CjJHlnSv.css"];
export const fonts = [];
