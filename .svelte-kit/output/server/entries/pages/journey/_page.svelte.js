import { $ as clsx$1, Q as attr, R as writable, a as attr_style, c as derived, d as head, et as escape_html, g as unsubscribe_stores, h as stringify, i as attr_class, lt as fallback, m as store_get, s as bind_props, u as ensure_array_like } from "../../../chunks/index-server.js";
import "../../../chunks/index-server2.js";
import { n as loop, r as raf } from "../../../chunks/attachments.js";
import "../../../chunks/stream.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
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
//#region src/lib/utils.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/lib/MagicCard.svelte
function MagicCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, class: className = "", gradientSize = 200, gradientColor = "#262626", gradientOpacity = .8 } = $$props;
		let mouseX = -9999;
		let mouseY = -9999;
		let bg = derived(() => `radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`);
		$$renderer.push(`<div role="presentation"${attr_class(clsx$1(cn("group relative flex size-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 border text-black dark:text-white justify-center py-4", className)), "svelte-b7f4x4")}><div class="relative z-10">`);
		children?.($$renderer);
		$$renderer.push(`<!----></div> <div class="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"${attr_style(`background: ${stringify(bg())}; opacity: ${stringify(0)};`)}></div></div>`);
	});
}
//#endregion
//#region src/lib/Timeline.svelte
function Timeline($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let timelineData = fallback($$props["timelineData"], () => [], true);
		let trackHeight = 0;
		let fillHeight = tweened(0, {
			duration: 180,
			easing: cubicOut
		});
		let fillOpacity = tweened(0, {
			duration: 180,
			easing: cubicOut
		});
		$$renderer.push(`<div class="w-full journey-bg font-sans svelte-1b7kgsg"><div class="journey-pad journey-header svelte-1b7kgsg"><a class="cv-link svelte-1b7kgsg" href="/CV.pdf" target="_blank" rel="noopener noreferrer" data-sveltekit-reload="" aria-label="Open my CV (PDF)">`);
		MagicCard($$renderer, {
			class: "cursor-pointer group items-center hover:border-[#e8692773] transition-all duration-300",
			gradientColor: "#4d2506",
			gradientSize: 220,
			children: ($$renderer) => {
				$$renderer.push(`<span class="cv-inner svelte-1b7kgsg"><span class="cv-pdf svelte-1b7kgsg" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="svelte-1b7kgsg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 13h6M9 17h4"></path></svg></span> <span class="cv-title svelte-1b7kgsg">CV</span></span>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></a> <p class="journey-subtitle text-sm md:text-base svelte-1b7kgsg">A timeline of the roles I've held, and milestones I've achieved over the
      years. Browse my journey below, or check out a concise resume.</p></div> <div class="journey-pad pb-20 svelte-1b7kgsg"><div class="relative overflow-hidden"><!--[-->`);
		const each_array = ensure_array_like(timelineData);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let item = each_array[index];
			$$renderer.push(`<div${attr_class(`flex justify-start md:gap-10 ${stringify(index === 0 ? "pt-6 md:pt-12" : "pt-10 md:pt-40")}`)}><div class="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full"><div data-timeline-dot="" class="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center"><div class="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2"></div></div> <div class="hidden md:flex md:flex-col md:pl-20"><h3 class="journey-role svelte-1b7kgsg">${escape_html(item.title)}</h3> `);
			if (item.year) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="journey-year svelte-1b7kgsg">${escape_html(item.year)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (item.location) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="journey-location svelte-1b7kgsg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="svelte-1b7kgsg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${escape_html(item.location)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (item.logo) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img${attr("src", item.logo)} alt="" class="journey-logo mt-4 svelte-1b7kgsg"/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div> <div class="relative pl-20 pr-4 md:pl-4 w-full"><div class="md:hidden mb-4"><h3 class="journey-role svelte-1b7kgsg">${escape_html(item.title)}</h3> `);
			if (item.year) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="journey-year svelte-1b7kgsg">${escape_html(item.year)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (item.location) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="journey-location svelte-1b7kgsg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="svelte-1b7kgsg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${escape_html(item.location)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (item.logo) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img${attr("src", item.logo)} alt="" class="journey-logo block mt-3 svelte-1b7kgsg"/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (typeof item.content === "string") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="journey-desc svelte-1b7kgsg">${escape_html(item.content)}</p>`);
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
		$$renderer.push(`<!--]--> <div${attr_style(`height: ${stringify(trackHeight)}px;`)} class="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] timeline-line svelte-1b7kgsg"><div${attr_style(`height: ${stringify(store_get($$store_subs ??= {}, "$fillHeight", fillHeight))}px; opacity: ${stringify(store_get($$store_subs ??= {}, "$fillOpacity", fillOpacity))};`)} class="absolute inset-x-0 top-0 w-[2px] rounded-full timeline-fill svelte-1b7kgsg"></div></div></div></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { timelineData });
	});
}
//#endregion
//#region src/routes/journey/+page.svelte
function _page($$renderer) {
	const timelineData = [
		{
			title: "Incoming SDE II",
			location: "San Jose, CA",
			dateText: "2026",
			logo: "/logos/adobe.png",
			description: "Two months to start as an SDE II @ Adobe HQ!         Will be working on Agentic AI initiatives within Adobe Experience Platform."
		},
		{
			title: "Graduate ML Research Assistant",
			location: "Arlington, TX",
			dateText: "Aug 2025-July 2026",
			description: "Conducting machine learning research involving custom neural architectures and graph neural networks for a USDA-funded gene discovery initiative. Also developing predictive analytics systems focused on mitigating hurricane-related home damage."
		},
		{
			title: "Adobe — Software Engineering Intern",
			location: "San Jose, CA",
			dateText: "2025",
			logo: "/logos/adobe.png",
			description: "Built AI-powered monitoring systems that proactively detected customer journey failures across Adobe Experience Platform. Developed production APIs and data pipelines while learning how enterprise software operates at massive scale."
		},
		{
			title: "AAAI Publication",
			location: "Philadelphia, PA",
			dateText: "2025",
			description: "Contributed to research that resulted in a publication accepted at the AAAI Conference on Artificial Intelligence, marking a major milestone in my research journey."
		},
		{
			title: "AMD — Software Engineering Intern",
			location: "Austin, TX",
			dateText: "2024",
			logo: "/logos/amd.png",
			description: "Developed developer productivity and automation tooling used across engineering teams at AMD. Built real-time workflow tracking systems with Kafka, FastAPI, and Python while reducing execution times from minutes to seconds."
		},
		{
			title: "UT Arlington — B.S. Computer Science",
			location: "Arlington, TX",
			dateText: "2024",
			description: "Graduated Magna Cum Laude with a Bachelor of Science in Computer Science. Earned recognition including Freshman Distinction Roll and multiple Dean's List honors throughout my academic career."
		},
		{
			title: "IDIR Lab — Undergraduate Research Assistant",
			location: "Arlington, TX",
			dateText: "2023-2024",
			description: "Helped build the backend infrastructure and data pipelines powering GeneSieve. Applied machine learning, feature engineering, and statistical analysis to improve biological search systems and accelerate scientific discovery."
		},
		{
			title: "Learning Assistant Center — Tutor",
			location: "Arlington, TX",
			dateText: "2023",
			description: "Tutored students with mental disabilities across mathematics and finance courses. Developed a passion for mentoring while helping students strengthen academic skills and confidence."
		},
		{
			title: "UTA College of Engineering — Research Assistant",
			location: "Arlington, TX",
			dateText: "2022-2023",
			description: "Conducted bioinformatics and machine learning research on CRISPR-CAS proteins. Contributed to classifier and generative model development achieving over 96% prediction accuracy, leading to a research publication."
		},
		{
			title: "Mathematics Tutor",
			location: "Arlington, TX",
			dateText: "2022-2023",
			description: "Tutored students in Calculus I & II, Linear Algebra, Algebra, and related mathematics courses. Focused on building strong problem-solving skills and quantitative reasoning foundations."
		},
		{
			title: "Dean's Office Student Assistant",
			location: "Arlington, TX",
			dateText: "2021-2022",
			description: "Supported operations within the UT Arlington College of Engineering Dean's Office. Assisted with events, technology systems, inventory management, and administrative coordination while developing professional communication skills."
		}
	].map((d) => ({
		title: d.title,
		year: d.dateText,
		location: d.location,
		logo: d.logo,
		content: d.description
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
