import { $ as attr, c as derived, g as unsubscribe_stores, gt as setContext, h as stringify, i as attr_class, m as store_get, mt as getContext, tt as escape_html } from "../../chunks/index-server.js";
import { t as beforeNavigate } from "../../chunks/client.js";
import { a as extract, n as motion, o as watch, s as theme, t as useMotionValue } from "../../chunks/dist.js";
import { t as AnimatedThemeToggler } from "../../chunks/AnimatedThemeToggler.js";
import { i as appReady, t as cancelStream } from "../../chunks/stream.js";
import "posthog-js";
import { isMotionValue, motionValue } from "framer-motion/dom";
import { attachFollow, cancelFrame as cancelFrame$1, collectMotionValues, frame as frame$1, motionValue as motionValue$1, transform } from "motion-dom";
//#region node_modules/@sveltejs/kit/src/runtime/app/stores.js
/**
* A function that returns all of the contextual stores. On the server, this must be called during component initialization.
* Only use this if you need to defer store subscription until after the component has mounted, for some reason.
*
* @deprecated Use `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
*/
var getStores = () => {
	const stores$1 = getContext("__svelte__");
	return {
		/** @type {typeof page} */
		page: { subscribe: stores$1.page.subscribe },
		/** @type {typeof navigating} */
		navigating: { subscribe: stores$1.navigating.subscribe },
		/** @type {typeof updated} */
		updated: stores$1.updated
	};
};
/**
* A readable store whose value contains page data.
*
* On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.
*
* @deprecated Use `page` from `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
* @type {import('svelte/store').Readable<import('@sveltejs/kit').Page>}
*/
var page = { subscribe(fn) {
	return getStores().page.subscribe(fn);
} };
//#endregion
//#region node_modules/motion-sv/dist/value/use-combine-values.svelte.js
function useCombineMotionValues(combineValues) {
	/**
	* Initialise the returned motion value. This remains the same between renders.
	*/
	const value = motionValue$1(combineValues());
	/**
	* Create a function that will update the template motion value with the latest values.
	* This is pre-bound so whenever a motion value updates it can schedule its
	* execution in Framesync. If it's already been scheduled it won't be fired twice
	* in a single frame.
	*/
	const updateValue = () => value.set(combineValues());
	/**
	* Subscribe to all motion values found within the template. Whenever any of them change,
	* schedule an update.
	*/
	const scheduleUpdate = () => frame$1.preRender(updateValue, false, true);
	let subscriptions = [];
	const subscribe = (values) => {
		subscriptions = values.map((v) => v.on("change", scheduleUpdate));
	};
	const unsubscribe = () => {
		subscriptions.forEach((unsubscribe) => unsubscribe());
		cancelFrame$1(updateValue);
	};
	return {
		subscribe,
		unsubscribe,
		value,
		updateValue
	};
}
//#endregion
//#region node_modules/motion-sv/dist/value/use-computed.svelte.js
function useComputed(computed) {
	/**
	* Open session of collectMotionValues. Any MotionValue that calls get()
	* will be saved into this array.
	*/
	collectMotionValues.current = [];
	const { value, subscribe, unsubscribe, updateValue } = useCombineMotionValues(computed);
	subscribe(collectMotionValues.current);
	collectMotionValues.current = void 0;
	return value;
}
//#endregion
//#region node_modules/motion-sv/dist/value/use-transform.svelte.js
var ReactiveInputRangeBrand = Symbol.for("motion-sv.reactiveInputRange");
function isReactiveInputRange(value) {
	return typeof value === "object" && value !== null && ReactiveInputRangeBrand in value;
}
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
	if (typeof input === "function") return useComputed(input);
	if (outputRange && !Array.isArray(outputRange) && typeof outputRange === "object") {
		const result = {};
		for (const key in outputRange) if (Object.prototype.hasOwnProperty.call(outputRange, key)) {
			const keyOutputRange = outputRange[key];
			result[key] = useTransform(input, inputRangeOrTransformer, keyOutputRange, options);
		}
		return result;
	}
	let inputValues;
	let transformer;
	if (typeof inputRangeOrTransformer === "function") {
		transformer = inputRangeOrTransformer;
		inputValues = Array.isArray(input) ? input : [input];
	} else if (isReactiveInputRange(inputRangeOrTransformer)) {
		const bridgeMV = motionValue$1(0);
		let currentTransformer = transform(inputRangeOrTransformer.read(), outputRange, options);
		watch(() => inputRangeOrTransformer.read(), (newRange) => {
			currentTransformer = transform(newRange, outputRange, options);
			bridgeMV.set(bridgeMV.get() + 1);
		});
		transformer = (values) => {
			return Array.isArray(values) ? currentTransformer(values[0]) : currentTransformer(values);
		};
		inputValues = Array.isArray(input) ? [...input, bridgeMV] : [input, bridgeMV];
	} else {
		transformer = transform(inputRangeOrTransformer, outputRange, options);
		inputValues = Array.isArray(input) ? input : [input];
	}
	const result = Array.isArray(input) ? useListTransform(inputValues, transformer) : useListTransform(inputValues, (values) => {
		return transformer(values[0]);
	});
	if (!Array.isArray(input)) {
		const inputAccelerate = input.accelerate;
		if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRange) && options?.clamp !== false) {
			const resolvedInputRange = isReactiveInputRange(inputRangeOrTransformer) ? inputRangeOrTransformer.read() : inputRangeOrTransformer;
			result.accelerate = {
				...inputAccelerate,
				times: resolvedInputRange,
				keyframes: outputRange,
				isTransformed: true,
				...options?.ease ? { ease: options.ease } : {}
			};
		}
	}
	return result;
}
function useListTransform(values, transformer) {
	const latest = [];
	const combineValues = () => {
		latest.length = 0;
		const numValues = values.length;
		for (let i = 0; i < numValues; i++) latest[i] = values[i].get();
		return transformer(latest);
	};
	const { value, subscribe } = useCombineMotionValues(combineValues);
	subscribe(values);
	return value;
}
//#endregion
//#region node_modules/motion-sv/dist/value/use-spring.js
function useSpring(source, config = {}) {
	const value = motionValue(isMotionValue(source) ? source.get() : source);
	watch(() => extract(config), (currentConfig) => attachFollow(value, source, {
		type: "spring",
		...currentConfig
	}));
	return value;
}
//#endregion
//#region src/lib/components/magic/dock/dock.svelte
function Dock($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { class: className, children, iconSize = 36, iconMagnification = 52, disableMagnification = false, iconDistance = 80 } = $$props;
		setContext("dock", {
			mouseY: useMotionValue(Infinity),
			get iconSize() {
				return iconSize;
			},
			get iconMagnification() {
				return iconMagnification;
			},
			get disableMagnification() {
				return disableMagnification;
			},
			get iconDistance() {
				return iconDistance;
			}
		});
		$$renderer.push(`<div${attr_class(`nav-dock ${stringify(className ?? "")}`)}>`);
		children($$renderer);
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
//#region src/lib/components/magic/dock/dock-icon.svelte
function Dock_icon($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { class: className, children } = $$props;
		const DEFAULT_SIZE = 36;
		const DEFAULT_MAGNIFICATION = 52;
		const DEFAULT_DISTANCE = 80;
		const dockContext = getContext("dock");
		let ref = null;
		const defaultMouseY = useMotionValue(Infinity);
		const mouseY = dockContext?.mouseY ?? defaultMouseY;
		const size = derived(() => dockContext?.iconSize ?? DEFAULT_SIZE);
		const magnification = derived(() => dockContext?.iconMagnification ?? DEFAULT_MAGNIFICATION);
		const disableMagnification = derived(() => dockContext?.disableMagnification ?? false);
		const distance = derived(() => dockContext?.iconDistance ?? DEFAULT_DISTANCE);
		const scale = useSpring(useTransform(useTransform(mouseY, (val) => {
			const bounds = ref?.getBoundingClientRect() ?? {
				y: 0,
				height: 0
			};
			return val - bounds.y - bounds.height / 2;
		}), (dist) => {
			if (disableMagnification() || Math.abs(dist) >= distance()) return 1;
			const maxScale = magnification() / size();
			const progress = 1 - Math.abs(dist) / distance();
			return 1 + (maxScale - 1) * progress;
		}), {
			mass: .1,
			stiffness: 150,
			damping: 12
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (motion.div) {
				$$renderer.push("<!--[-->");
				motion.div($$renderer, {
					style: {
						scale,
						transformOrigin: "right center"
					},
					class: `nav-dock-item ${stringify(className ?? "")}`,
					get ref() {
						return ref;
					},
					set ref($$value) {
						ref = $$value;
						$$settled = false;
					},
					children: ($$renderer) => {
						children($$renderer);
						$$renderer.push(`<!---->`);
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
//#region src/lib/Nav.svelte
function Nav($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { ready = false } = $$props;
		let mobileOpen = false;
		const introPlaying = derived(() => ready && true);
		beforeNavigate(() => {
			mobileOpen = false;
		});
		$$renderer.push(`<nav id="main-nav"${attr_class("", void 0, {
			"visible": ready,
			"intro": introPlaying()
		})}><a href="/"${attr_class("nav-name nav-link", void 0, { "nav-active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/" })} style="text-decoration: none; color: inherit;"><span class="nav-name-text">Pranav Pujar</span> <span class="nav-subtitle">Software Engineer &amp; ML Researcher</span></a> <div class="nav-right"><ul class="nav-links"><li><a href="/journey"${attr_class("nav-link", void 0, { "nav-active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/journey" })}>Journey</a></li> <li><a href="/featured"${attr_class("nav-link", void 0, { "nav-active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/featured" })}>Featured</a></li> <li><a href="/blog"${attr_class("nav-link", void 0, { "nav-active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/blog" })}>Blog</a></li></ul> `);
		AnimatedThemeToggler($$renderer, {});
		$$renderer.push(`<!----> <button class="menu-trigger" aria-label="Toggle menu">${escape_html(mobileOpen ? "Close" : "More")}</button></div> <div${attr_class("mobile-dropdown", void 0, { "open": mobileOpen })} role="presentation">`);
		Dock($$renderer, {
			children: ($$renderer) => {
				Dock_icon($$renderer, {
					children: ($$renderer) => {
						$$renderer.push(`<a href="/journey" class="dropdown-link nav-link">Journey</a>`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Dock_icon($$renderer, {
					children: ($$renderer) => {
						$$renderer.push(`<a href="/featured" class="dropdown-link nav-link">Featured</a>`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Dock_icon($$renderer, {
					children: ($$renderer) => {
						$$renderer.push(`<a href="/blog" class="dropdown-link nav-link">Blog</a>`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!---->`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></nav>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/Footer.svelte
function Footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<footer class="footer"><div class="social-icons"><a href="https://www.linkedin.com/in/pranavpujar/" target="_blank" class="social-icon" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a> <a href="https://scholar.google.com/citations?user=b5yGCz8AAAAJ&amp;hl=en" target="_blank" class="social-icon" title="Google Scholar"><svg viewBox="0 0 24 24"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.828 3.38a7.001 7.001 0 0 1 14.344 0L24 9.5 12 0z"></path></svg></a> <a href="https://github.com/PranavPujar" target="_blank" class="social-icon" title="GitHub"><svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg></a> <a href="https://www.instagram.com/pranavpujar/" target="_blank" class="social-icon" title="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg></a></div> <div class="copyright">© 2026 Pranav Umakant Pujar</div></footer>`);
	});
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { children } = $$props;
		theme.init();
		beforeNavigate(() => {
			cancelStream();
		});
		Nav($$renderer, { ready: store_get($$store_subs ??= {}, "$appReady", appReady) });
		$$renderer.push(`<!----> <main id="scroll-container"${attr("data-route", store_get($$store_subs ??= {}, "$page", page).url.pathname)}${attr_class("", void 0, { "ready": store_get($$store_subs ??= {}, "$appReady", appReady) })}>`);
		children($$renderer);
		$$renderer.push(`<!----> `);
		Footer($$renderer, {});
		$$renderer.push(`<!----></main>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _layout as default };
