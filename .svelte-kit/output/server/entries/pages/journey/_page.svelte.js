import { Q as attr, R as writable, a as attr_style, d as head, et as escape_html, g as unsubscribe_stores, h as stringify, i as attr_class, lt as fallback, m as store_get, s as bind_props, u as ensure_array_like } from "../../../chunks/index-server.js";
import "../../../chunks/index-server2.js";
import { i as raf, r as loop, s as theme } from "../../../chunks/dist.js";
import "../../../chunks/stream.js";
import { t as HoverLink } from "../../../chunks/HoverLink.js";
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
		function logoSrc(logo, mode) {
			if (!logo) return void 0;
			return typeof logo === "string" ? logo : mode === "light" ? logo.light : logo.dark;
		}
		const LOGO_WIDTHS = {
			adobe: 200,
			amd: 200,
			idir: 200,
			uta: 200,
			default: 200
		};
		function logoKey(logo) {
			const path = typeof logo === "string" ? logo : logo?.dark ?? "";
			return [
				"adobe",
				"amd",
				"idir",
				"uta"
			].find((k) => path.includes(k)) ?? "default";
		}
		function logoWidth(logo) {
			return LOGO_WIDTHS[logoKey(logo)] ?? LOGO_WIDTHS.default;
		}
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
		$$renderer.push(`<div class="w-full journey-bg font-sans svelte-1b7kgsg"><div class="journey-pad journey-header svelte-1b7kgsg"><p class="journey-subtitle svelte-1b7kgsg">A timeline of the roles I've held, and milestones I've achieved over the
      years. Browse my journey below, or check out a concise `);
		HoverLink($$renderer, {
			href: "/resume.pdf",
			variant: "adobe",
			children: ($$renderer) => {
				$$renderer.push(`<!---->resume`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!---->.</p></div> <div class="journey-pad pb-20 svelte-1b7kgsg"><div class="relative overflow-hidden"><!--[-->`);
		const each_array = ensure_array_like(timelineData);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let item = each_array[index];
			$$renderer.push(`<div${attr_class(`flex justify-start md:gap-10 ${stringify(index === 0 ? "pt-6 md:pt-12" : "pt-10 md:pt-40")}`)}><div class="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full"><div data-timeline-dot="" class="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center"><div class="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2"></div></div> <div class="hidden md:flex md:flex-col md:pl-20"><h3 class="journey-role svelte-1b7kgsg">${escape_html(item.title)}</h3> `);
			if (item.year || item.location) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="journey-meta svelte-1b7kgsg">`);
				if (item.year) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="journey-year svelte-1b7kgsg">${escape_html(item.year)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (item.location) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="journey-location svelte-1b7kgsg"><span class="journey-pin svelte-1b7kgsg" aria-hidden="true">📍</span> ${escape_html(item.location)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (item.logo) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img${attr("src", logoSrc(item.logo, store_get($$store_subs ??= {}, "$theme", theme)))} alt=""${attr_style(`width: ${stringify(logoWidth(item.logo))}px`)} class="journey-logo mt-4 svelte-1b7kgsg"/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div> <div class="relative pl-20 pr-4 md:pl-4 w-full"><div class="md:hidden mb-4"><h3 class="journey-role svelte-1b7kgsg">${escape_html(item.title)}</h3> `);
			if (item.year || item.location) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="journey-meta svelte-1b7kgsg">`);
				if (item.year) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="journey-year svelte-1b7kgsg">${escape_html(item.year)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (item.location) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="journey-location svelte-1b7kgsg"><span class="journey-pin svelte-1b7kgsg" aria-hidden="true">📍</span> ${escape_html(item.location)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (item.logo) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img${attr("src", logoSrc(item.logo, store_get($$store_subs ??= {}, "$theme", theme)))} alt=""${attr_style(`width: ${stringify(logoWidth(item.logo))}px`)} class="journey-logo block mt-3 svelte-1b7kgsg"/>`);
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
	const utaLogo = {
		light: "/logos/utalightmode.png",
		dark: "/logos/utadarkmode.png"
	};
	const timelineData = [
		{
			title: "Incoming SDE II",
			location: "San Jose, CA",
			dateText: "Aug '26",
			logo: "/logos/adobe.png",
			description: "Two months away from joining Adobe!\nAgentic AI @ Adobe Experience Platform (AEP)."
		},
		{
			title: "M.S. in Computer Science (Thesis)",
			dateText: "Aug '26",
			logo: utaLogo,
			description: "Outstanding Masters Student of the Year - 2026.\n\nWon the Lonestar Scholarship, a prestigious award given to top-performing graduate students. The scholarship granted me in-state tuition eligibility, resulting in over $20,000 in tuition savings.\n\nOn track to earn my fully-funded M.S. in Computer Science in just one year, with a Thesis on Machine Learning Research & Applications in Bioinformatics. Defending July 29."
		},
		{
			title: "Graduate ML Research Assistant",
			dateText: "Aug '25 - Jul '26",
			logo: "/logos/idir.png",
			description: "Developed software for an NSF-funded project focused on reducing hurricane-related residential damage. \n\nArchitected and developed a custom PyTorch-based Graph Neural Network for gene ranking in GeneSieve, successfully placing the true gene within the top 40% of candidates in ~92% of test cases. \n\nPublished a research paper for GeneSieve to PLoS Computational Biology. \n\nPlaced #3 in the IDIR Chess Tournament that I organized!"
		},
		{
			title: "Software Engineering Intern",
			location: "San Jose, CA",
			dateText: "May '25-Aug '25",
			logo: "/logos/adobe.png",
			description: "Built AI-powered monitoring systems that proactively detected customer journey failures across Adobe Experience Platform (AEP).\n\nDeveloped & deployed Knowledge Graph querying APIs into production. Worked with Software Engineering and ML teams to create the data flow pipeline integrating these APIs into the Proactive Monitoring Agent."
		},
		{
			title: "Software Engineering Intern",
			location: "Austin, TX",
			dateText: "Jan '24 - May '24",
			logo: "/logos/amd.png",
			description: "Developed developer productivity and automation tooling used across engineering teams at AMD. Built real-time workflow tracking systems with Kafka, FastAPI, and Python while reducing execution times from minutes to seconds."
		},
		{
			title: "B.S. in Computer Science",
			dateText: "2024",
			logo: utaLogo,
			description: "Magna Cum Laude. Freshman Distinction Roll. Dean's List: Spring'22, Spring'23, Spring'24, Fall'24. won REU award from Dean of Eng given to 7 students. Maverick Academic Scholarship worth $8000/yr plus in state. "
		},
		{
			title: "Undergraduate Research Assistant",
			dateText: "2023-2024",
			logo: "/logos/idir.png",
			description: "Helped build the backend infrastructure and data pipelines powering GeneSieve. Applied machine learning, feature engineering, and statistical analysis to improve biological search systems and accelerate scientific discovery."
		},
		{
			title: "Tutor for Students with Special Needs",
			dateText: "2023",
			logo: utaLogo,
			description: "Tutored students with mental disabilities across mathematics and finance courses. Developed a passion for mentoring while helping students strengthen academic skills and confidence."
		},
		{
			title: "Undergraduate Research Assistant",
			dateText: "2022-2023",
			logo: utaLogo,
			description: "Conducted bioinformatics and machine learning research on CRISPR-CAS proteins. Contributed to classifier and generative model development achieving over 96% prediction accuracy, leading to a research publication.\n\nPublished a research paper on the topic in a peer-reviewed journal.\n\nWon the scholarship for this REU 2000$"
		},
		{
			title: "Math Tutor",
			dateText: "2022-2023",
			logo: utaLogo,
			description: "Tutored students in Calculus I & II, Linear Algebra, Algebra, and related mathematics courses. Focused on building strong problem-solving skills and quantitative reasoning foundations."
		},
		{
			title: "Dean's Office Student Assistant",
			dateText: "2021-2022",
			logo: utaLogo,
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
