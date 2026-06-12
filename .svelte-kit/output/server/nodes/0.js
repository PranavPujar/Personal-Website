

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Dp5HcdjU.js","_app/immutable/chunks/Beh_IXwn.js","_app/immutable/chunks/BpIpZHtS.js","_app/immutable/chunks/Cgki0VSX.js","_app/immutable/chunks/DxLN9Q9A.js","_app/immutable/chunks/v_jBEYI6.js","_app/immutable/chunks/Bjp0yEEU.js","_app/immutable/chunks/C8dqPTdj.js","_app/immutable/chunks/BI-XKX17.js"];
export const stylesheets = ["_app/immutable/assets/0.DZnWjexC.css"];
export const fonts = [];
