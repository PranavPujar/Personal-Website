import { $ as attr, et as clsx, g as unsubscribe_stores, h as stringify, i as attr_class, m as store_get, u as ensure_array_like } from "./index-server.js";
import { s as theme } from "./dist.js";
//#region src/lib/components/magic/animated-theme-toggler.svelte
function Animated_theme_toggler($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { class: className = "", duration = 400 } = $$props;
		const ANGLES = [
			0,
			45,
			90,
			135,
			180,
			225,
			270,
			315
		];
		$$renderer.push(`<button id="theme-toggle"${attr_class(clsx(className))} aria-label="Toggle theme">`);
		if (store_get($$store_subs ??= {}, "$theme", theme) === "dark") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<svg class="sun-icon" viewBox="0 0 24 24" width="18" height="18" overflow="visible" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g transform="translate(12,12)"><circle cx="0" cy="0" r="4"></circle><g class="sun-rays"><!--[-->`);
			const each_array = ensure_array_like(ANGLES);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let angle = each_array[$$index];
				$$renderer.push(`<g${attr("transform", `rotate(${stringify(angle)})`)}><rect class="sun-ray" x="-1.1" y="-10" width="2.2" height="3.5" rx="1.1"></rect></g>`);
			}
			$$renderer.push(`<!--]--></g></g></svg>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<svg class="moon-icon" viewBox="0 0 24 24" width="18" height="18" overflow="visible" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path><g class="moon-stars"><path class="star star-left star-1" d="M 3.5,3.7 Q 3.5,5 4.8,5 Q 3.5,5 3.5,6.3 Q 3.5,5 2.2,5 Q 3.5,5 3.5,3.7 Z"></path><path class="star star-2" d="M 20,5.6 Q 20,6.5 20.9,6.5 Q 20,6.5 20,7.4 Q 20,6.5 19.1,6.5 Q 20,6.5 20,5.6 Z"></path><path class="star star-left star-3" d="M 5,17.9 Q 5,19 6.1,19 Q 5,19 5,20.1 Q 5,19 3.9,19 Q 5,19 5,17.9 Z"></path></g></svg>`);
		}
		$$renderer.push(`<!--]--> <span class="sr-only">Toggle theme</span></button>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/AnimatedThemeToggler.svelte
function AnimatedThemeToggler($$renderer) {
	Animated_theme_toggler($$renderer, {});
}
//#endregion
export { AnimatedThemeToggler as t };
