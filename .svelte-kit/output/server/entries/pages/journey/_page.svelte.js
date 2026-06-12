import { d as head } from "../../../chunks/index-server.js";
import { t as Streamer } from "../../../chunks/Streamer.js";
//#region src/routes/journey/+page.svelte
function _page($$renderer) {
	head("7ieb2r", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Journey — Pranav Pujar</title>`);
		});
	});
	$$renderer.push(`<div class="view-content">`);
	Streamer($$renderer, {
		speedDiv: .8,
		children: ($$renderer) => {
			$$renderer.push(`<h2 class="section-title">Journey</h2> <p class="section-description">I've worked many roles over the past few years, across different countries and industries. Check them out below!</p> <div style="margin-top: 2rem;"><h3 class="section-subtitle">Coming Soon</h3></div>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----></div>`);
}
//#endregion
export { _page as default };
