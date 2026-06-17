import { d as head } from "../../chunks/index-server.js";
import "../../chunks/index-server2.js";
import "../../chunks/dist.js";
import { t as Streamer } from "../../chunks/Streamer.js";
import { t as HoverLink } from "../../chunks/HoverLink.js";
import "three-globe";
import { Color } from "three";
import "three/examples/jsm/controls/OrbitControls.js";
//#endregion
//#region src/lib/Globe.svelte
function Globe($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		new Color("#040d21");
		new Color("#ffffff");
		$$renderer.push(`<div id="globe-container"></div>`);
	});
}
//#endregion
//#region src/lib/ImageSlideshow.svelte
function ImageSlideshow($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div class="profile-photo-wrap"><div class="profile-photo-circle"><video class="slideshow-video" src="/src/files/slideshow.mp4" autoplay="" loop="" muted="" playsinline=""></video></div></div>`);
	});
}
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer) {
	const speedDiv = 1.9;
	head("1uha8ag", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Pranav Pujar</title>`);
		});
	});
	$$renderer.push(`<div class="view-content">`);
	Streamer($$renderer, {
		speedDiv,
		children: ($$renderer) => {
			ImageSlideshow($$renderer, {});
			$$renderer.push(`<!----> <div class="bio"><p>I'm currently pursuing my Master's in Computer Science at `);
			HoverLink($$renderer, {
				href: "https://www.uta.edu",
				variant: "uta",
				children: ($$renderer) => {
					$$renderer.push(`<!---->The University of Texas at Arlington`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!---->, on track to complete my B.S. and M.S. in five years by July 2026.</p> <p>This summer, I'll be joining `);
			HoverLink($$renderer, {
				href: "https://business.adobe.com/products/experience-platform/adobe-experience-platform.html",
				variant: "adobe",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Adobe`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> in San Jose, CA as a Full-Time Software Engineer, working on Agentic AI
        within the Adobe Experience Platform. Along the way, I interned at companies
        across Dubai, Austin, and San Jose, including AMD and Adobe.</p> <p>During my time in college, I co-authored two research papers published
        in top venues and earned over $120,000 in scholarships, including one
        that covered 80% of my bachelor's tuition. I also worked as a Machine
        Learning Research Assistant at the `);
			HoverLink($$renderer, {
				href: "https://idir.uta.edu/",
				children: ($$renderer) => {
					$$renderer.push(`<!---->IDIR Lab @ UTA`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!---->, where I contributed to a USDA-funded project `);
			HoverLink($$renderer, {
				href: "https://idir.uta.edu/genesieve",
				children: ($$renderer) => {
					$$renderer.push(`<!---->GeneSieve`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!---->. During this time, I was mentored by Dr. Chengkai Li, Director of the
        lab and Associate Chair of the CSE Department at UTA.</p> <p>Growing up between India 🇮🇳, Dubai 🇦🇪, and Texas 🇺🇸 gave me a blend of
        Indian roots, global perspective, and American ambition.</p> <p>Fun fact: My `);
			HoverLink($$renderer, {
				href: "https://en.wikipedia.org/wiki/Mahadeva_Temple%2C_Itagi",
				children: ($$renderer) => {
					$$renderer.push(`<!---->ancestral temple`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!---->, built in 1112 CE, is a National Monument!</p></div>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Globe($$renderer, {});
	$$renderer.push(`<!----></div>`);
}
//#endregion
export { _page as default };
