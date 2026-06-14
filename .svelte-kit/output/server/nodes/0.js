

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.pjA4uE07.js","_app/immutable/chunks/TO_6mRPu.js","_app/immutable/chunks/aXA9N7jD.js","_app/immutable/chunks/XX2Sa8eX.js","_app/immutable/chunks/DxLN9Q9A.js","_app/immutable/chunks/v_jBEYI6.js","_app/immutable/chunks/C-7QgoeX.js","_app/immutable/chunks/_S_J0v4W.js","_app/immutable/chunks/0I89_K2v.js"];
export const stylesheets = ["_app/immutable/assets/0.B_kalSsR.css"];
export const fonts = [];
