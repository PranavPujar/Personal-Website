import { a as attr_style, c as derived, d as head, h as stringify } from "../../../chunks/index-server.js";
import { t as Streamer } from "../../../chunks/Streamer.js";
//#region src/routes/featured/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let progress = 0;
		const scale = derived(() => .46 + progress * .54);
		const lift = derived(() => (1 - progress) * 10);
		const opacity = derived(() => Math.min(1, .35 + progress * 2.5));
		const captionOpacity = derived(() => Math.max(0, Math.min(1, (progress - .55) / .35)));
		head("1gy0b3z", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Featured — Pranav Pujar</title>`);
			});
		});
		$$renderer.push(`<div class="view-content featured-page"><section class="featured-intro">`);
		Streamer($$renderer, {
			speedDiv: .8,
			children: ($$renderer) => {
				$$renderer.push(`<h2 class="section-title featured-hint">Scroll to see Interviews, Presentations and more!</h2>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> <span class="featured-chevron" aria-hidden="true"></span></section> <section class="featured-reveal"><div class="featured-sticky"><a href="https://www.youtube.com/watch?v=Wk0nP-3bYaQ&amp;t=2s" target="_blank" rel="noopener noreferrer" class="video-card featured-video"${attr_style(`transform: translateY(${stringify(lift())}vh) scale(${stringify(scale())}); opacity: ${stringify(opacity())};`)} aria-label="Watch interview on YouTube"><img class="video-thumb" src="/src/files/featured-thumbnail.png" alt="Interview thumbnail" loading="lazy"/> <span class="video-play" aria-hidden="true"></span></a> <p class="featured-caption"${attr_style(`opacity: ${stringify(captionOpacity())};`)}>Interviewed by the Computer Science Dept. @ UTA for Winning Outstanding Masters Student Award</p></div></section></div>`);
	});
}
//#endregion
export { _page as default };
