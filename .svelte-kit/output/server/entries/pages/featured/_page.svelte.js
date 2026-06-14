import { d as head } from "../../../chunks/index-server.js";
import { t as Streamer } from "../../../chunks/Streamer.js";
//#region src/routes/featured/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const pos = {
			x: 0,
			y: 0,
			s: 0
		};
		const target = {
			x: 0,
			y: 0,
			s: 0
		};
		function watchTick() {
			const ease = .15;
			pos.x += (target.x - pos.x) * ease;
			pos.y += (target.y - pos.y) * ease;
			pos.s += (target.s - pos.s) * ease;
			if (pos.s < .01) {
				pos.s = 0;
				return;
			}
			requestAnimationFrame(watchTick);
		}
		head("1gy0b3z", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Featured — Pranav Pujar</title>`);
			});
		});
		$$renderer.push(`<div class="view-content">`);
		Streamer($$renderer, {
			speedDiv: .8,
			children: ($$renderer) => {
				$$renderer.push(`<figure class="video-figure"><button type="button" class="video-card" aria-label="Play interview"><img class="video-thumb" src="/src/files/featured-thumbnail.jpg" alt="Interview thumbnail" loading="lazy"/> <span class="video-scrim" aria-hidden="true"></span> <span class="thumb-overline" aria-hidden="true" data-speed-div="0.5" data-stream-mode="letter"><span class="thumb-overline-line">Outstanding</span> <span class="thumb-overline-line">Masters Student</span> <span class="thumb-overline-line">2026</span></span> <span class="video-watch" aria-hidden="true"><span class="video-watch-icon"></span> Watch interview</span> <span class="video-play" aria-hidden="true"></span></button> <figcaption class="video-caption"><span class="video-caption-meta"><span>Interview</span> <span>4 min</span></span></figcaption></figure>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
