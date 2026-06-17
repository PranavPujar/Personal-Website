

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DVun5vVi.js","_app/immutable/chunks/DFzJY9jp.js","_app/immutable/chunks/kLhepR2g.js","_app/immutable/chunks/CbCMNlPe.js","_app/immutable/chunks/DxLN9Q9A.js","_app/immutable/chunks/v_jBEYI6.js","_app/immutable/chunks/Dp-wTzEv.js","_app/immutable/chunks/UByWCMuf.js","_app/immutable/chunks/Dw27FgI7.js"];
export const stylesheets = ["_app/immutable/assets/0.D0v8Xjjm.css"];
export const fonts = [];
