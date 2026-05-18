

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DdVjifzi.js","_app/immutable/chunks/Gd09A7C4.js","_app/immutable/chunks/Cq2o7lsq.js","_app/immutable/chunks/sJeomnNC.js","_app/immutable/chunks/BgUy-a58.js","_app/immutable/chunks/CFKVnMbq.js","_app/immutable/chunks/DuHnD1tX.js","_app/immutable/chunks/DkrNAzKJ.js"];
export const stylesheets = ["_app/immutable/assets/0.B7fR6maZ.css"];
export const fonts = [];
