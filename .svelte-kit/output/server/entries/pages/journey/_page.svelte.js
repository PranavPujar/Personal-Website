import { R as writable, a as attr_style, d as head, et as escape_html, g as unsubscribe_stores, h as stringify, lt as fallback, m as store_get, s as bind_props, u as ensure_array_like } from "../../../chunks/index-server.js";
import "../../../chunks/index-server2.js";
import { n as loop, r as raf } from "../../../chunks/attachments.js";
globalThis.Date;
globalThis.Set;
globalThis.Map;
globalThis.URL;
globalThis.URLSearchParams;
//#endregion
//#region node_modules/svelte/src/motion/utils.js
/**
* @param {any} obj
* @returns {obj is Date}
*/
function is_date(obj) {
	return Object.prototype.toString.call(obj) === "[object Date]";
}
//#endregion
//#region node_modules/svelte/src/easing/index.js
/**
* @param {number} t
* @returns {number}
*/
function linear(t) {
	return t;
}
/**
* @param {number} t
* @returns {number}
*/
function cubicOut(t) {
	const f = t - 1;
	return f * f * f + 1;
}
//#endregion
//#region node_modules/svelte/src/motion/tweened.js
/** @import { Task } from '../internal/client/types' */
/** @import { Tweened, TweenOptions } from './public' */
/**
* @template T
* @param {T} a
* @param {T} b
* @returns {(t: number) => T}
*/
function get_interpolator(a, b) {
	if (a === b || a !== a) return () => a;
	const type = typeof a;
	if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) throw new Error("Cannot interpolate values of different type");
	if (Array.isArray(a)) {
		const arr = b.map((bi, i) => {
			return get_interpolator(
				/** @type {Array<any>} */
				a[i],
				bi
			);
		});
		return (t) => arr.map((fn) => fn(t));
	}
	if (type === "object") {
		if (!a || !b) throw new Error("Object cannot be null");
		if (is_date(a) && is_date(b)) {
			const an = a.getTime();
			const delta = b.getTime() - an;
			return (t) => new Date(an + t * delta);
		}
		const keys = Object.keys(b);
		/** @type {Record<string, (t: number) => T>} */
		const interpolators = {};
		keys.forEach((key) => {
			interpolators[key] = get_interpolator(a[key], b[key]);
		});
		return (t) => {
			/** @type {Record<string, any>} */
			const result = {};
			keys.forEach((key) => {
				result[key] = interpolators[key](t);
			});
			return result;
		};
	}
	if (type === "number") {
		const delta = b - a;
		return (t) => a + t * delta;
	}
	return () => b;
}
/**
* A tweened store in Svelte is a special type of store that provides smooth transitions between state values over time.
*
* @deprecated Use [`Tween`](https://svelte.dev/docs/svelte/svelte-motion#Tween) instead
* @template T
* @param {T} [value]
* @param {TweenOptions<T>} [defaults]
* @returns {Tweened<T>}
*/
function tweened(value, defaults = {}) {
	const store = writable(value);
	/** @type {Task} */
	let task;
	let target_value = value;
	/**
	* @param {T} new_value
	* @param {TweenOptions<T>} [opts]
	*/
	function set(new_value, opts) {
		target_value = new_value;
		if (value == null) {
			store.set(value = new_value);
			return Promise.resolve();
		}
		/** @type {Task | null} */
		let previous_task = task;
		let started = false;
		let { delay = 0, duration = 400, easing = linear, interpolate = get_interpolator } = {
			...defaults,
			...opts
		};
		if (duration === 0) {
			if (previous_task) {
				previous_task.abort();
				previous_task = null;
			}
			store.set(value = target_value);
			return Promise.resolve();
		}
		const start = raf.now() + delay;
		/** @type {(t: number) => T} */
		let fn;
		task = loop((now) => {
			if (now < start) return true;
			if (!started) {
				fn = interpolate(value, new_value);
				if (typeof duration === "function") duration = duration(value, new_value);
				started = true;
			}
			if (previous_task) {
				previous_task.abort();
				previous_task = null;
			}
			const elapsed = now - start;
			if (elapsed > duration) {
				store.set(value = new_value);
				return false;
			}
			store.set(value = fn(easing(elapsed / duration)));
			return true;
		});
		return task.promise;
	}
	return {
		set,
		update: (fn, opts) => set(fn(target_value, value), opts),
		subscribe: store.subscribe
	};
}
//#endregion
//#region src/lib/Timeline.svelte
function Timeline($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let timelineData = fallback($$props["timelineData"], () => [], true);
		let height = 0;
		let scrollProgress = writable(0);
		let heightTransform = tweened(0, {
			duration: 400,
			easing: cubicOut
		});
		let opacityTransform = tweened(0, {
			duration: 400,
			easing: cubicOut
		});
		$: scrollProgress.subscribe((progress) => {
			heightTransform.set(progress * height);
			opacityTransform.set(progress < .1 ? progress * 10 : 1);
		});
		$$renderer.push(`<div class="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"><div class="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10"><h2 class="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">My Journey</h2> <p class="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">A timeline of the roles, projects, and milestones I've worked on over the
      years.</p></div> <div class="relative max-w-7xl mx-auto pb-20 overflow-hidden"><!--[-->`);
		const each_array = ensure_array_like(timelineData);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let item = each_array[index];
			$$renderer.push(`<div class="flex justify-start pt-10 md:pt-40 md:gap-10"><div class="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full"><div class="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center"><div class="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2"></div></div> <h3 class="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500">${escape_html(item.title)}</h3></div> <div class="relative pl-20 pr-4 md:pl-4 w-full"><h3 class="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">${escape_html(item.title)}</h3> `);
			if (typeof item.content === "string") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`${escape_html(item.content)}`);
			} else {
				$$renderer.push("<!--[-1-->");
				if (item.content) {
					$$renderer.push("<!--[-->");
					item.content($$renderer, {});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			}
			$$renderer.push(`<!--]--></div></div>`);
		}
		$$renderer.push(`<!--]--> <div${attr_style(`height: ${stringify(height)}px;`)} class="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] timeline-line svelte-1b7kgsg"><div${attr_style(`height: ${stringify(store_get($$store_subs ??= {}, "$heightTransform", heightTransform))}px; opacity: ${stringify(store_get($$store_subs ??= {}, "$opacityTransform", opacityTransform))};`)} class="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"></div></div></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { timelineData });
	});
}
//#endregion
//#region src/routes/journey/+page.svelte
function _page($$renderer) {
	const timelineData = [{
		title: "Antigravity SDK",
		dateText: "June 2026",
		description: "Have some content here that should ideally wrap around perfectly with the surrounding text. Lets make this text a little bit longer."
	}].map((d) => ({
		title: d.dateText,
		content: `${d.title} — ${d.description}`
	}));
	head("7ieb2r", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Journey — Pranav Pujar</title>`);
		});
	});
	Timeline($$renderer, { timelineData });
}
//#endregion
export { _page as default };
