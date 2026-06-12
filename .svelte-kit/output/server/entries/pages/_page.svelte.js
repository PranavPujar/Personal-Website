import { d as head } from "../../chunks/index-server.js";
import "../../chunks/index-server2.js";
import "../../chunks/theme.js";
import { t as Streamer } from "../../chunks/Streamer.js";
import "three-globe";
import "three";
import "three/examples/jsm/controls/OrbitControls.js";
//#endregion
//#region src/lib/Globe.svelte
function Globe($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
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
	head("1uha8ag", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Pranav Pujar</title>`);
		});
	});
	$$renderer.push(`<div class="view-content">`);
	Streamer($$renderer, {
		speedDiv: 1.9,
		children: ($$renderer) => {
			ImageSlideshow($$renderer, {});
			$$renderer.push(`<!----> <div class="bio"><p>I'm currently pursuing my Master's in Computer Science at <a href="https://www.uta.edu" target="_blank" class="text-link text-link-uta">The University of Texas at Arlington</a>, on track to complete my B.S. and M.S. in five years by July 2026.</p> <p>This summer, I'll be joining <a href="https://business.adobe.com/products/experience-platform/adobe-experience-platform.html" target="_blank" class="text-link text-link-adobe">Adobe</a> in San Jose, CA as a Full-Time Software Engineer, working on Agentic AI
        within the Adobe Experience Platform. Along the way, I interned at companies
        across Dubai, Austin, and San Jose, including AMD and Adobe.</p> <p>During my time in college, I co-authored two research papers published
        in top venues and earned over $120,000 in scholarships, including one
        that covered 80% of my bachelor's tuition. I also worked as a Machine
        Learning Research Assistant at the <a href="https://idir.uta.edu/" target="_blank" class="text-link">IDIR Lab @ UTA</a>, where I contributed to a USDA-funded project <a href="https://idir.uta.edu/genesieve" target="_blank" class="text-link">GeneSieve</a>. During this time, I was mentored by Dr. Chengkai Li, Director of the
        lab and Associate Chair of the CSE Department at UTA.</p> <p>Growing up between India 🇮🇳, Dubai 🇦🇪, and Texas 🇺🇸 gave me a blend of
        Indian roots, global perspective, and American ambition.</p> <p>Fun fact: My <a href="https://en.wikipedia.org/wiki/Mahadeva_Temple%2C_Itagi" target="_blank" class="text-link">ancestral temple</a>, built in 1112 CE, is a National Monument!</p></div>`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Globe($$renderer, {});
	$$renderer.push(`<!----></div>`);
}
//#endregion
export { _page as default };
