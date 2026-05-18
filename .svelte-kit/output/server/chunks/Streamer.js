import "./index-server.js";
import "./index-server2.js";
import "./stream.js";
//#region src/lib/Streamer.svelte
function Streamer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, speedDiv = 1 } = $$props;
		$$renderer.push(`<div>`);
		children($$renderer);
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { Streamer as t };
