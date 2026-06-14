import { d as head } from "../../../chunks/index-server.js";
import { t as Streamer } from "../../../chunks/Streamer.js";
//#region src/routes/blog/+page.svelte
function _page($$renderer) {
	head("u4k2t", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Blog — Pranav Pujar</title>`);
		});
	});
	$$renderer.push(`<div class="view-content">`);
	Streamer($$renderer, {
		speedDiv: .8,
		children: ($$renderer) => {
			$$renderer.push(`<p class="section-description">Thoughts on software engineering, machine learning, and the things I build along the way.</p>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----></div>`);
}
//#endregion
export { _page as default };
