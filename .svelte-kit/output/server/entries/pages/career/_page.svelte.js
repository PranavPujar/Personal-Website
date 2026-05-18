import { d as head } from "../../../chunks/index-server.js";
import { t as Streamer } from "../../../chunks/Streamer.js";
//#region src/routes/career/+page.svelte
function _page($$renderer) {
	head("1nnaiev", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Career — Pranav Pujar</title>`);
		});
	});
	$$renderer.push(`<div class="view-content">`);
	Streamer($$renderer, {
		speedDiv: .8,
		children: ($$renderer) => {
			$$renderer.push(`<h2 class="section-title">Coming Soon</h2>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----></div>`);
}
//#endregion
export { _page as default };
