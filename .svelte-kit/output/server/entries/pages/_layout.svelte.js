import { $ as clsx, Q as attr, c as derived, dt as run, et as escape_html, ft as getContext, g as unsubscribe_stores, h as stringify, i as attr_class, l as element, m as store_get, mt as setContext, o as attributes, p as spread_props, pt as hasContext, s as bind_props, tt as ATTACHMENT_KEY, u as ensure_array_like } from "../../chunks/index-server.js";
import "../../chunks/internal.js";
import { t as beforeNavigate } from "../../chunks/client.js";
import { t as theme } from "../../chunks/theme.js";
import { r as appReady, t as cancelStream } from "../../chunks/stream.js";
import { calcGeneratorDuration, cancelFrame, clamp, complex, distance2D, findValueType, frame, frameData, hover, inView, isCSSVariableName, isMotionValue, millisecondsToSeconds, mixNumber, motionValue, motionValue as useMotionValue, noop, percent, pipe, press, progress, px, secondsToMilliseconds, spring } from "framer-motion/dom";
import { AsyncMotionValueAnimation, DOMKeyframesResolver, JSAnimation, KeyframeResolver, activeAnimations, attachFollow, cancelFrame as cancelFrame$1, collectMotionValues, complex as complex$1, defaultTransformValue, findValueType as findValueType$1, frame as frame$1, frameData as frameData$1, frameSteps, getAnimatableNone, getDefaultValueType, getValueAsType, getValueTransition, isCSSVariableName as isCSSVariableName$1, isMotionValue as isMotionValue$1, isSVGElement, isSVGSVGElement, makeAnimationInstant, microtask, mixNumber as mixNumber$1, motionValue as motionValue$1, numberValueTypes, percent as percent$1, positionalKeys, px as px$1, readTransformValue, statsBuffer, time, transform, transformPropOrder, transformProps } from "motion-dom";
import { MotionGlobalConfig, SubscriptionManager, addUniqueItem, circOut, clamp as clamp$1, isNumericalString, isZeroValueString, noop as noop$1, progress as progress$1, removeItem, secondsToMilliseconds as secondsToMilliseconds$1, warnOnce } from "motion-utils";
import { invariant, warning } from "hey-listen";
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
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/utils/delay.mjs
/**
* Timeout defined in ms
*/
function delay$1(callback, timeout) {
	const start = time.now();
	const checkElapsed = ({ timestamp }) => {
		const elapsed = timestamp - start;
		if (elapsed >= timeout) {
			cancelFrame$1(checkElapsed);
			callback(elapsed - timeout);
		}
	};
	frame$1.setup(checkElapsed, true);
	return () => cancelFrame$1(checkElapsed);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/styles/scale-correction.mjs
var scaleCorrectors$1 = {};
function addScaleCorrector$1(correctors) {
	for (const key in correctors) {
		scaleCorrectors$1[key] = correctors[key];
		if (isCSSVariableName$1(key)) scaleCorrectors$1[key].isCSSVariable = true;
	}
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/runed/is.js
function isFunction(value) {
	return typeof value === "function";
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/runed/watch.svelte.js
function runWatcher(sources, flush, effect, options = {}) {
	const { lazy = false } = options;
}
function watch(sources, effect, options) {
	runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
	runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
function watchOnce(source, effect) {}
function watchOncePre(source, effect) {}
watchOnce.pre = watchOncePre;
//#endregion
//#region node_modules/motion-sv/dist/vendor/runed/context.js
var Context = class {
	#name;
	#key;
	#fallback;
	/**
	* @param name The name of the context.
	* This is used for generating the context key and error messages.
	* @param fallback Optional fallback value to return when context doesn't exist.
	*/
	constructor(name, fallback) {
		this.#name = name;
		this.#key = Symbol(name);
		this.#fallback = fallback;
	}
	/**
	* The key used to get and set the context.
	*
	* It is not recommended to use this value directly.
	* Instead, use the methods provided by this class.
	*/
	get key() {
		return this.#key;
	}
	/**
	* Checks whether this has been set in the context of a parent component.
	*
	* Must be called during component initialisation.
	*/
	exists() {
		return hasContext(this.#key);
	}
	/**
	* Retrieves the context that belongs to the closest parent component.
	*
	* Must be called during component initialisation.
	*
	* @throws An error if the context does not exist.
	*/
	get() {
		const context = getContext(this.#key);
		if (context === void 0) throw new Error(`Context "${this.#name}" not found`);
		return context;
	}
	/**
	* Retrieves the context that belongs to the closest parent component,
	* or the given fallback value if the context does not exist.
	*
	* Must be called during component initialisation.
	*/
	getOr(fallback) {
		const context = getContext(this.#key);
		if (context === void 0) return fallback ?? this.#fallback;
		return context;
	}
	/**
	* Associates the given value with the current component and returns it.
	*
	* Must be called during component initialisation.
	*/
	set(context) {
		return setContext(this.#key, context);
	}
};
//#endregion
//#region node_modules/motion-sv/dist/vendor/runed/extract.js
function extract(value, defaultValue) {
	if (isFunction(value)) {
		const gotten = value();
		if (gotten === void 0) return defaultValue;
		return gotten;
	}
	if (value === void 0) return defaultValue;
	return value;
}
if (typeof HTMLElement === "function");
//#endregion
//#region node_modules/svelte/src/attachments/index.js
/**
* Creates an object key that will be recognised as an attachment when the object is spread onto an element,
* as a programmatic alternative to using `{@attach ...}`. This can be useful for library authors, though
* is generally not needed when building an app.
*
* ```svelte
* <script>
* 	import { createAttachmentKey } from 'svelte/attachments';
*
* 	const props = {
* 		class: 'cool',
* 		onclick: () => alert('clicked'),
* 		[createAttachmentKey()]: (node) => {
* 			node.textContent = 'attached!';
* 		}
* 	};
* <\/script>
*
* <button {...props}>click me</button>
* ```
* @since 5.29
*/
function createAttachmentKey() {
	return Symbol(ATTACHMENT_KEY);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/runed/index.js
var isDef = (val) => typeof val !== "undefined";
/**
* Converts a style object into a CSS string.
*
* - Filters out properties with `undefined` values.
* - Converts camelCase keys into kebab-case.
* - Appends `px` to numeric values unless the property is unitless.
*
* @param {Record<string, string | number | undefined>} styleObj -
* An object where keys are CSS property names in camelCase and values are
* strings, numbers, or `undefined`.
*
* @returns {string} A CSS string suitable for inline styles or style attributes.
*
* @example
* css({ backgroundColor: "red", width: 100, opacity: 0.5 })
* // "background-color:red;width:100px;opacity:0.5"
*/
function css(styleObj) {
	return Object.entries(styleObj).filter(([, value]) => value !== void 0).map(([key, value]) => {
		const formattedValue = typeof value === "number" && ![
			"opacity",
			"zIndex",
			"fontWeight",
			"lineHeight",
			"order",
			"flexGrow",
			"flexShrink"
		].includes(key) ? `${value}px` : value;
		return `${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${formattedValue}`;
	}).join(";");
}
/**
* Returns a new object that copies all properties from the given object `props`
* and adds (or overwrites) a property with the specified `key` and `value`.
*
* @template T - Type of the original object.
* @template K - Type of the property key to add.
* @template V - Type of the property value to add.
*
* @param {T} props - The source object whose properties should be copied.
* @param {K} key - The property key to add or overwrite.
* @param {V} value - The value to associate with the given key.
* @returns {T & Record<K, V>} A new object with all original properties from `props`
* and the additional property `[key]: value`.
*/
function withProp(props, key, value) {
	return Object.defineProperties({}, {
		...Object.getOwnPropertyDescriptors(props),
		[key]: {
			value,
			writable: true,
			enumerable: true,
			configurable: true
		}
	});
}
//#endregion
//#region node_modules/motion-sv/dist/animation/utils.js
function isAnimationControls$1(v) {
	return v !== null && typeof v === "object" && typeof v.start === "function";
}
//#endregion
//#region node_modules/motion-sv/dist/features/feature.js
var Feature = class {
	state;
	constructor(state) {
		this.state = state;
	}
	beforeMount() {}
	mount() {}
	unmount() {}
	update() {}
	beforeUpdate() {}
	beforeUnmount() {}
};
//#endregion
//#region node_modules/motion-sv/dist/features/feature-manager.js
var FeatureManager = class {
	features = [];
	constructor(state) {
		const { features = [], lazyMotionContext } = state.options;
		const allFeatures = features.concat(lazyMotionContext.features());
		this.features = allFeatures.map((Feature) => new Feature(state));
		const featureInstances = this.features;
		/**
		* Watch for lazy motion features
		* If the feature is not already in the allFeatures array, we need to add it
		* and create a new instance of the feature
		*/
		watch.pre(() => lazyMotionContext.features(), (features) => {
			features.forEach((feature) => {
				if (!allFeatures.includes(feature)) {
					allFeatures.push(feature);
					const featureInstance = new feature(state);
					featureInstances.push(featureInstance);
					/**
					* If the Component is already mounted, we need to call the beforeMount and mount methods
					*/
					if (state.isMounted()) {
						featureInstance.beforeMount();
						featureInstance.mount();
					}
				}
			});
		}, { lazy: true });
	}
	mount() {
		this.features.forEach((feature) => feature.mount());
	}
	beforeMount() {
		this.features.forEach((feature) => feature.beforeMount?.());
	}
	unmount() {
		this.features.forEach((feature) => feature.unmount());
	}
	update() {
		this.features.forEach((feature) => feature.update?.());
	}
	beforeUpdate() {
		this.features.forEach((feature) => feature.beforeUpdate());
	}
	beforeUnmount() {
		this.features.forEach((feature) => feature.beforeUnmount());
	}
};
//#endregion
//#region node_modules/motion-sv/dist/state/utils.js
function resolveVariant$1(definition, variants, custom) {
	if (Array.isArray(definition)) return definition.reduce((acc, item) => {
		const resolvedVariant = resolveVariant$1(item, variants, custom);
		return resolvedVariant ? {
			...acc,
			...resolvedVariant
		} : acc;
	}, {});
	else if (typeof definition === "object") return definition;
	else if (definition && variants) {
		const variant = variants[definition];
		return typeof variant === "function" ? variant(custom) : variant;
	}
}
function hasChanged(a, b) {
	if (typeof a !== typeof b) return true;
	if (Array.isArray(a) && Array.isArray(b)) return !shallowCompare(a, b);
	return a !== b;
}
function shallowCompare(next, prev) {
	const prevLength = prev.length;
	if (prevLength !== next.length) return false;
	for (let i = 0; i < prevLength; i++) if (prev[i] !== next[i]) return false;
	return true;
}
function isCssVar(name) {
	return name?.startsWith("--");
}
var noopReturn = (v) => v;
function isNumber(value) {
	return typeof value === "number";
}
var svgElementSet = new Set([
	"animate",
	"circle",
	"defs",
	"desc",
	"ellipse",
	"g",
	"image",
	"line",
	"filter",
	"marker",
	"mask",
	"metadata",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"rect",
	"stop",
	"svg",
	"switch",
	"symbol",
	"text",
	"tspan",
	"use",
	"view",
	"clipPath",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"foreignObject",
	"linearGradient",
	"radialGradient",
	"textPath"
]);
function isSVGElement$1(as) {
	return svgElementSet.has(as);
}
//#endregion
//#region node_modules/motion-sv/dist/state/transform.js
var rotation = {
	syntax: "<angle>",
	initialValue: "0deg",
	toDefaultUnit: (v) => `${v}deg`
};
var baseTransformProperties = {
	translate: {
		syntax: "<length-percentage>",
		initialValue: "0px",
		toDefaultUnit: (v) => `${v}px`
	},
	rotate: rotation,
	scale: {
		syntax: "<number>",
		initialValue: 1,
		toDefaultUnit: noopReturn
	},
	skew: rotation
};
/**
* An ordered array of each transformable value. By default, transform values
* will be sorted to this order.
*/
var order = [
	"translate",
	"scale",
	"rotate",
	"skew"
];
/**
* A list of all transformable axes. We'll use this list to generated a version
* of each axes for each transform.
*/
var axes = [
	"",
	"X",
	"Y",
	"Z"
];
var transformDefinitions = /* @__PURE__ */ new Map();
/**
* Generate a list of every possible transform key
*/
var transforms = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
];
order.forEach((name) => {
	axes.forEach((axis) => {
		transforms.push(name + axis);
		transformDefinitions.set(name + axis, baseTransformProperties[name]);
	});
});
/**
* Provide a quick way to check if a string is the name of a transform
*/
var transformLookup = new Set(transforms);
var isTransform = (name) => transformLookup.has(name);
var transformAlias = {
	x: "translateX",
	y: "translateY",
	z: "translateZ"
};
function compareTransformOrder([a], [b]) {
	return transforms.indexOf(a) - transforms.indexOf(b);
}
function transformListToString(template, [name, value]) {
	return `${template} ${name}(${value})`;
}
function buildTransformTemplate(transforms) {
	return transforms.sort(compareTransformOrder).reduce(transformListToString, "").trim();
}
var transformResetValue = {
	translate: [0, 0],
	rotate: 0,
	scale: 1,
	skew: 0,
	x: 0,
	y: 0,
	z: 0
};
//#endregion
//#region node_modules/motion-sv/dist/state/style.js
var style = {
	get: (element, name) => {
		let value = isCssVar(name) ? element.style.getPropertyValue(name) : getComputedStyle(element)[name];
		if (!value && value !== "0") {
			const definition = transformDefinitions.get(name);
			if (definition) value = definition.initialValue;
		}
		return value;
	},
	set: (element, name, value) => {
		if (isCssVar(name)) element.style.setProperty(name, value);
		else element.style[name] = value;
	}
};
function createStyles(keyframes) {
	const initialKeyframes = {};
	const transforms = [];
	for (let key in keyframes) {
		let value = keyframes[key];
		value = isMotionValue(value) ? value.get() : value;
		if (isTransform(key)) {
			if (key in transformAlias) key = transformAlias[key];
		}
		let initialKeyframe = Array.isArray(value) ? value[0] : value;
		/**
		* If this is a number and we have a default value type, convert the number
		* to this type.
		*/
		const definition = transformDefinitions.get(key);
		if (definition) {
			initialKeyframe = isNumber(value) ? definition.toDefaultUnit?.(value) : value;
			transforms.push([key, initialKeyframe]);
		} else initialKeyframes[key] = initialKeyframe;
	}
	if (transforms.length) initialKeyframes.transform = buildTransformTemplate(transforms);
	if (Object.keys(initialKeyframes).length === 0) return null;
	return initialKeyframes;
}
var SVG_STYLE_TO_ATTRIBUTES = {
	fill: true,
	stroke: true,
	opacity: true,
	"stroke-width": true,
	"fill-opacity": true,
	"stroke-opacity": true,
	"stroke-linecap": true,
	"stroke-linejoin": true,
	"stroke-dasharray": true,
	"stroke-dashoffset": true,
	cx: true,
	cy: true,
	r: true,
	d: true,
	x1: true,
	y1: true,
	x2: true,
	y2: true,
	points: true,
	"path-length": true,
	viewBox: true,
	width: true,
	height: true,
	"preserve-aspect-ratio": true,
	"clip-path": true,
	filter: true,
	mask: true,
	"stop-color": true,
	"stop-opacity": true,
	"gradient-transform": true,
	"gradient-units": true,
	"spread-method": true,
	"marker-end": true,
	"marker-mid": true,
	"marker-start": true,
	"text-anchor": true,
	"dominant-baseline": true,
	"font-family": true,
	"font-size": true,
	"font-weight": true,
	"letter-spacing": true,
	"vector-effect": true
};
function camelToKebab(str) {
	return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function buildSVGPath$1(attrs, length, spacing = 1, offset = 0) {
	attrs.pathLength = 1;
	delete attrs["path-length"];
	attrs["stroke-dashoffset"] = px.transform(-offset);
	attrs["stroke-dasharray"] = `${px.transform(length)} ${px.transform(spacing)}`;
}
function convertSvgStyleToAttributes(keyframes) {
	const attrs = {};
	const styleProps = {};
	for (const key in keyframes) {
		const kebabKey = camelToKebab(key);
		if (kebabKey in SVG_STYLE_TO_ATTRIBUTES) {
			const value = keyframes[key];
			attrs[kebabKey] = isMotionValue(value) ? value.get() : value;
		} else styleProps[key] = keyframes[key];
	}
	if (attrs["path-length"] !== void 0) buildSVGPath$1(attrs, attrs["path-length"], attrs["path-spacing"], attrs["path-offset"]);
	return {
		attrs,
		style: styleProps
	};
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/sequence/create.mjs
function getValueTransition$1(transition, key) {
	return transition && transition[key] ? {
		...transition,
		...transition[key]
	} : { ...transition };
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/utils/default-transitions.mjs
var underDampedSpring = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
};
var criticallyDampedSpring = (target) => ({
	type: "spring",
	stiffness: 550,
	damping: target === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
});
var keyframesTransition = {
	type: "keyframes",
	duration: .8
};
/**
* Default easing curve is a slightly shallower version of
* the default browser easing curve.
*/
var ease = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
};
var getDefaultTransition = (valueKey, { keyframes }) => {
	if (keyframes.length > 2) return keyframesTransition;
	else if (transformProps.has(valueKey)) return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes[1]) : underDampedSpring;
	return ease;
};
//#endregion
//#region node_modules/motion-sv/dist/animation/transition.svelte.js
function toMs(seconds) {
	if (seconds == null) return void 0;
	return seconds * 1e3;
}
function motionExit(node, params) {
	const { transition: exitTransition, ...target } = params.definition || {};
	const stateTransition = params.state?.options?.transition;
	const baseTransition = exitTransition ?? stateTransition;
	const baseDuration = toMs(baseTransition?.duration) ?? 200;
	const baseDelay = toMs(baseTransition?.delay) ?? 0;
	const SEEN_KEY = "__motion_sv_exit_seen__";
	const seen = globalThis[SEEN_KEY] || (globalThis[SEEN_KEY] = /* @__PURE__ */ new WeakSet());
	const isIntroCall = !seen.has(node);
	const isExiting = node["__motion_exiting__"] === true;
	if (isIntroCall) {
		seen.add(node);
		node.addEventListener("outroend", () => params.setAllowIntro(true), { once: true });
	}
	if (isIntroCall && !params.allowIntro && !isExiting) return null;
	const state = params.state;
	let overallDurationMs = 0;
	function mergeValueTransition(base, key) {
		try {
			return getValueTransition$1(base || {}, key);
		} catch {
			return base || {};
		}
	}
	function applyDefaultTransition(key, vt, fromValue, toValue) {
		try {
			return {
				...getDefaultTransition(key, { keyframes: [fromValue, toValue] }),
				...vt
			};
		} catch {
			return vt;
		}
	}
	function hasExplicitTransition(t) {
		if (!t) return false;
		return "type" in t || "stiffness" in t || "damping" in t || "duration" in t || "ease" in t || "velocity" in t || "repeat" in t || "repeatType" in t || "repeatDelay" in t;
	}
	for (const rawKey in target) {
		let key = rawKey;
		if (rawKey in transformAlias) key = transformAlias[rawKey];
		const to = target[rawKey];
		let vt = mergeValueTransition(baseTransition, rawKey) || {};
		const transformDef = transformDefinitions.get(key);
		const fromValueRaw = state.visualElement?.latestValues?.[rawKey] ?? (transformDef ? transformDef.initialValue : style.get(node, key));
		const fromValueStr = String(fromValueRaw ?? "");
		const toValueStr = String(to);
		if (!hasExplicitTransition(vt)) vt = applyDefaultTransition(key, vt, transformDef ? typeof fromValueRaw === "number" ? fromValueRaw : parseFloat(fromValueStr) || 0 : fromValueStr, transformDef ? typeof to === "number" ? to : parseFloat(toValueStr) || 0 : toValueStr);
		const delayMs = toMs(vt?.delay) ?? baseDelay;
		if (transformDef) {
			const fromNum = typeof fromValueRaw === "number" ? fromValueRaw : parseFloat(String(fromValueRaw)) || 0;
			const toNum = typeof to === "number" ? to : parseFloat(String(to)) || 0;
			const preferSpring = vt?.type === "spring" || vt?.stiffness !== void 0 || vt?.damping !== void 0 || !hasExplicitTransition(vt);
			const vel = state?.visualElement?.getValue?.(key)?.getVelocity?.() ?? 0;
			const baseDurMs = (() => {
				const specified = toMs(vt?.duration);
				if (specified != null) return specified;
				if (preferSpring) try {
					const approx = calcGeneratorDuration(spring({
						from: fromNum,
						to: toNum,
						velocity: vel,
						...vt
					}));
					if (approx != null && isFinite(approx)) return approx;
					return 300;
				} catch {
					return 300;
				}
				return baseDuration;
			})();
			const repeatCount = Math.max(0, vt?.repeat ?? 0);
			const repeatDelayMs = toMs(vt?.repeatDelay) ?? 0;
			const durMs = baseDurMs * (repeatCount + 1) + repeatDelayMs * repeatCount;
			overallDurationMs = Math.max(overallDurationMs, delayMs + durMs);
			continue;
		}
		const fromStr = fromValueStr;
		const toStr = toValueStr;
		const valueType = findValueType(toStr) || findValueType(fromStr);
		if (valueType) {
			const parse = valueType.parse ?? ((v) => v);
			const fromParsed = parse(fromStr);
			const toParsed = parse(toStr);
			const preferSpring = vt?.type === "spring" || vt?.stiffness !== void 0 || vt?.damping !== void 0 || !hasExplicitTransition(vt);
			const vel = state?.visualElement?.getValue?.(key)?.getVelocity?.() ?? 0;
			const baseDurMs = toMs(vt?.duration) ?? (preferSpring ? (() => {
				try {
					const approx = calcGeneratorDuration(spring({
						from: fromParsed,
						to: toParsed,
						velocity: vel,
						...vt
					}));
					return approx != null && isFinite(approx) ? approx : 300;
				} catch {
					return 300;
				}
			})() : baseDuration);
			const repeatCount = Math.max(0, vt?.repeat ?? 0);
			const repeatDelayMs = toMs(vt?.repeatDelay) ?? 0;
			const durMs = baseDurMs * (repeatCount + 1) + repeatDelayMs * repeatCount;
			overallDurationMs = Math.max(overallDurationMs, delayMs + durMs);
		} else {
			const durMs = toMs(vt?.duration) ?? baseDuration;
			overallDurationMs = Math.max(overallDurationMs, delayMs + durMs);
		}
	}
	return { duration: overallDurationMs };
}
//#endregion
//#region node_modules/motion-sv/dist/components/animate-presence/presence.svelte.js
var doneCallbacks = /* @__PURE__ */ new WeakMap();
function removeDoneCallback(element) {
	const prevDoneCallback = doneCallbacks.get(element);
	if (prevDoneCallback) element.removeEventListener("motioncomplete", prevDoneCallback);
	doneCallbacks.delete(element);
}
var AnimatePresenceContext = new Context("AnimatePresenceContext");
function useAnimatePresence(props) {
	const presenceContext = {
		initial: props.initial,
		custom: props.custom,
		transition: motionExit
	};
	AnimatePresenceContext.set(presenceContext);
}
//#endregion
//#region node_modules/motion-sv/dist/state/utils/is-variant-labels.js
function isVariantLabels(value) {
	return typeof value === "string" || value === false || Array.isArray(value);
}
//#endregion
//#region node_modules/motion-sv/dist/state/motion-state.js
var mountedStates = /* @__PURE__ */ new WeakMap();
var id$1 = 0;
var mountedLayoutIds = /* @__PURE__ */ new Set();
/**
* Core class that manages animation state and orchestrates animations.
* Handles component lifecycle methods in the correct order based on component tree position.
*/
var MotionState = class {
	id;
	type;
	element = null;
	parent;
	options;
	isSafeToRemove = false;
	children = /* @__PURE__ */ new Set();
	activeStates = {
		initial: true,
		animate: true
	};
	/**
	* Current animation process reference
	* Tracks the ongoing animation process for mount/update animations
	* Enables delayed animation loading and parent-child animation orchestration
	* Allows parent variant elements to control child element animations
	*/
	currentProcess = null;
	baseTarget;
	target;
	/**
	* The final transition to be applied to the state
	*/
	finalTransition;
	featureManager;
	visualElement;
	constructor(options, parent) {
		this.id = `motion-state-${id$1++}`;
		this.options = options;
		this.parent = parent;
		parent?.children?.add(this);
		const initialVariantSource = (options.initial === void 0 && options.variants ? this.context.initial : options.initial) === false ? ["initial", "animate"] : ["initial"];
		this.initTarget(initialVariantSource);
		this.featureManager = new FeatureManager(this);
		this.type = isSVGElement$1(this.options.as) ? "svg" : "html";
	}
	_context = null;
	get context() {
		if (!this._context) {
			const handler = { get: (target, prop) => {
				return isVariantLabels(this.options[prop]) ? this.options[prop] : this.parent?.context[prop];
			} };
			this._context = new Proxy({}, handler);
		}
		return this._context;
	}
	initTarget(initialVariantSource) {
		const custom = this.options.custom ?? this.options.animatePresenceContext?.custom;
		this.baseTarget = initialVariantSource.reduce((acc, variant) => {
			return {
				...acc,
				...resolveVariant$1(this.options[variant] || this.context[variant], this.options.variants, custom)
			};
		}, {});
		this.target = {};
	}
	updateOptions(options) {
		this.options = options;
		this.visualElement?.update({
			...this.options,
			whileTap: this.options.whilePress
		}, { isPresent: !doneCallbacks.has(this.element) });
	}
	beforeMount() {
		this.featureManager.beforeMount();
	}
	mount(element, options, notAnimate = false) {
		invariant(Boolean(element), "Animation state must be mounted with valid Element");
		this.element = element;
		this.updateOptions(options);
		this.featureManager.mount();
		if (!notAnimate && this.options.animate) this.startAnimation?.();
		if (this.options.layoutId) {
			mountedLayoutIds.add(this.options.layoutId);
			frame.render(() => {
				mountedLayoutIds.clear();
			});
		}
	}
	clearAnimation() {
		this.currentProcess && cancelFrame(this.currentProcess);
		this.currentProcess = null;
		this.visualElement?.variantChildren?.forEach((child) => {
			child.state.clearAnimation();
		});
	}
	startAnimation() {
		this.clearAnimation();
		this.currentProcess = frame.render(() => {
			this.currentProcess = null;
			this.animateUpdates();
		});
	}
	beforeUnmount() {
		this.featureManager.beforeUnmount();
	}
	unmount(unMountChildren = false) {
		/**
		* Unlike React, within the same update cycle, the execution order of unmount and mount depends on the component's order in the component tree.
		* Here we delay unmount for components with layoutId to ensure unmount executes after mount for layout animations.
		*/
		const shouldDelay = this.options.layoutId && !mountedLayoutIds.has(this.options.layoutId);
		const unmount = () => {
			const unmountState = () => {
				if (unMountChildren) Array.from(this.children).reverse().forEach(this.unmountChild);
				this.parent?.children?.delete(this);
				mountedStates.delete(this.element);
				this.featureManager.unmount();
				this.visualElement?.unmount();
				this.clearAnimation();
			};
			shouldDelay ? Promise.resolve().then(unmountState) : unmountState();
		};
		unmount();
	}
	unmountChild(child) {
		child.unmount(true);
	}
	beforeUpdate() {
		this.featureManager.beforeUpdate();
	}
	update(options) {
		this.updateOptions(options);
		this.featureManager.update();
		this.startAnimation();
	}
	setActive(name, isActive, isAnimate = true) {
		if (!this.element || this.activeStates[name] === isActive) return;
		this.activeStates[name] = isActive;
		this.visualElement.variantChildren?.forEach((child) => {
			child.state.setActive(name, isActive, false);
		});
		if (isAnimate) this.animateUpdates({ isExit: name === "exit" && this.activeStates.exit });
	}
	animateUpdates = noop;
	isMounted() {
		return Boolean(this.element);
	}
	willUpdate(label) {
		if (this.options.layout || this.options.layoutId) this.visualElement.projection?.willUpdate();
	}
};
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/store.mjs
var visualElementStore = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/motion-sv/dist/state/event.js
function motionEvent(name, target, isExit) {
	return new CustomEvent(name, { detail: {
		target,
		isExit
	} });
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/utils/resolve-variants.mjs
function getValueState(visualElement) {
	const state = [{}, {}];
	visualElement?.values.forEach((value, key) => {
		state[0][key] = value.get();
		state[1][key] = value.getVelocity();
	});
	return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
	/**
	* If the variant definition is a function, resolve.
	*/
	if (typeof definition === "function") {
		const [current, velocity] = getValueState(visualElement);
		definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
	}
	/**
	* If the variant definition is a variant label, or
	* the function returned a variant label, resolve.
	*/
	if (typeof definition === "string") definition = props.variants && props.variants[definition];
	/**
	* At this point we've resolved both functions and variant labels,
	* but the resolved variant label might itself have been a function.
	* If so, resolve. This can only have returned a valid target object.
	*/
	if (typeof definition === "function") {
		const [current, velocity] = getValueState(visualElement);
		definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
	}
	return definition;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs
function resolveVariant(visualElement, definition, custom) {
	const props = visualElement.getProps();
	return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs
var isKeyframesTarget = (v) => {
	return Array.isArray(v);
};
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/utils/setters.mjs
/**
* Set VisualElement's MotionValue, creating a new MotionValue for it if
* it doesn't exist.
*/
function setMotionValue(visualElement, key, value) {
	if (visualElement.hasValue(key)) visualElement.getValue(key).set(value);
	else visualElement.addValue(key, motionValue$1(value));
}
function resolveFinalValueInKeyframes(v) {
	return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
}
function setTarget(visualElement, definition) {
	let { transitionEnd = {}, transition = {}, ...target } = resolveVariant(visualElement, definition) || {};
	target = {
		...target,
		...transitionEnd
	};
	for (const key in target) setMotionValue(visualElement, key, resolveFinalValueInKeyframes(target[key]));
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/value/use-will-change/is.mjs
function isWillChangeMotionValue$1(value) {
	return Boolean(isMotionValue$1(value) && value.add);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/value/use-will-change/add-will-change.mjs
function addValueToWillChange$1(visualElement, key) {
	const willChange = visualElement.getValue("willChange");
	/**
	* It could be that a user has set willChange to a regular MotionValue,
	* in which case we can't add the value to it.
	*/
	if (isWillChangeMotionValue$1(willChange)) return willChange.add(key);
	else if (!willChange && MotionGlobalConfig.WillChange) {
		const newWillChange = new MotionGlobalConfig.WillChange("auto");
		visualElement.addValue("willChange", newWillChange);
		newWillChange.add(key);
	}
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
/**
* Convert camelCase to dash-case properties.
*/
var camelToDash = (str) => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();
var optimizedAppearDataAttribute = "data-" + camelToDash("framerAppearId");
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/optimized-appear/get-appear-id.mjs
function getOptimisedAppearId(visualElement) {
	return visualElement.props[optimizedAppearDataAttribute];
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs
var isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes, { repeat, repeatType = "loop" }, finalKeyframe) {
	const resolvedKeyframes = keyframes.filter(isNotNull);
	const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
	return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/utils/is-transition-defined.mjs
/**
* Decide whether a transition is defined on a given Transition.
* This filters out orchestration options and returns true
* if any options are left.
*/
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
	return !!Object.keys(transition).length;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/interfaces/motion-value.mjs
var animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
	const valueTransition = getValueTransition(transition, name) || {};
	/**
	* Most transition values are currently completely overwritten by value-specific
	* transitions. In the future it'd be nicer to blend these transitions. But for now
	* delay actually does inherit from the root transition if not value-specific.
	*/
	const delay = valueTransition.delay || transition.delay || 0;
	/**
	* Elapsed isn't a public transition option but can be passed through from
	* optimized appear effects in milliseconds.
	*/
	let { elapsed = 0 } = transition;
	elapsed = elapsed - secondsToMilliseconds$1(delay);
	const options = {
		keyframes: Array.isArray(target) ? target : [null, target],
		ease: "easeOut",
		velocity: value.getVelocity(),
		...valueTransition,
		delay: -elapsed,
		onUpdate: (v) => {
			value.set(v);
			valueTransition.onUpdate && valueTransition.onUpdate(v);
		},
		onComplete: () => {
			onComplete();
			valueTransition.onComplete && valueTransition.onComplete();
		},
		name,
		motionValue: value,
		element: isHandoff ? void 0 : element
	};
	/**
	* If there's no transition defined for this value, we can generate
	* unique transition settings for this value.
	*/
	if (!isTransitionDefined(valueTransition)) Object.assign(options, getDefaultTransition(name, options));
	/**
	* Both WAAPI and our internal animation functions use durations
	* as defined by milliseconds, while our external API defines them
	* as seconds.
	*/
	options.duration && (options.duration = secondsToMilliseconds$1(options.duration));
	options.repeatDelay && (options.repeatDelay = secondsToMilliseconds$1(options.repeatDelay));
	/**
	* Support deprecated way to set initial value. Prefer keyframe syntax.
	*/
	if (options.from !== void 0) options.keyframes[0] = options.from;
	let shouldSkip = false;
	if (options.type === false || options.duration === 0 && !options.repeatDelay) {
		makeAnimationInstant(options);
		if (options.delay === 0) shouldSkip = true;
	}
	if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations) {
		shouldSkip = true;
		makeAnimationInstant(options);
		options.delay = 0;
	}
	/**
	* If the transition type or easing has been explicitly set by the user
	* then we don't want to allow flattening the animation.
	*/
	options.allowFlatten = !valueTransition.type && !valueTransition.ease;
	/**
	* If we can or must skip creating the animation, and apply only
	* the final keyframe, do so. We also check once keyframes are resolved but
	* this early check prevents the need to create an animation at all.
	*/
	if (shouldSkip && !isHandoff && value.get() !== void 0) {
		const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
		if (finalKeyframe !== void 0) {
			frame$1.update(() => {
				options.onUpdate(finalKeyframe);
				options.onComplete();
			});
			return;
		}
	}
	return valueTransition.isSync ? new JSAnimation(options) : new AsyncMotionValueAnimation(options);
};
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs
/**
* Decide whether we should block this animation. Previously, we achieved this
* just by checking whether the key was listed in protectedKeys, but this
* posed problems if an animation was triggered by afterChildren and protectedKeys
* had been set to true in the meantime.
*/
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
	const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
	needsAnimating[key] = false;
	return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay = 0, transitionOverride, type } = {}) {
	let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = targetAndTransition;
	if (transitionOverride) transition = transitionOverride;
	const animations = [];
	const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
	for (const key in target) {
		const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
		const valueTarget = target[key];
		if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) continue;
		const valueTransition = {
			delay,
			...getValueTransition(transition || {}, key)
		};
		/**
		* If the value is already at the defined target, skip the animation.
		*/
		const currentValue = value.get();
		if (currentValue !== void 0 && !value.isAnimating && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) continue;
		/**
		* If this is the first time a value is being animated, check
		* to see if we're handling off from an existing animation.
		*/
		let isHandoff = false;
		if (window.MotionHandoffAnimation) {
			const appearId = getOptimisedAppearId(visualElement);
			if (appearId) {
				const startTime = window.MotionHandoffAnimation(appearId, key, frame$1);
				if (startTime !== null) {
					valueTransition.startTime = startTime;
					isHandoff = true;
				}
			}
		}
		addValueToWillChange$1(visualElement, key);
		value.start(animateMotionValue(key, value, valueTarget, visualElement.shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
		const animation = value.animation;
		if (animation) animations.push(animation);
	}
	if (transitionEnd) Promise.all(animations).then(() => {
		frame$1.update(() => {
			transitionEnd && setTarget(visualElement, transitionEnd);
		});
	});
	return animations;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/utils/calc-child-stagger.mjs
function calcChildStagger$1(children, child, delayChildren, staggerChildren = 0, staggerDirection = 1) {
	const index = Array.from(children).sort((a, b) => a.sortNodePosition(b)).indexOf(child);
	const numChildren = children.size;
	const maxStaggerDuration = (numChildren - 1) * staggerChildren;
	return typeof delayChildren === "function" ? delayChildren(index, numChildren) : staggerDirection === 1 ? index * staggerChildren : maxStaggerDuration - index * staggerChildren;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/interfaces/visual-element-variant.mjs
function animateVariant(visualElement, variant, options = {}) {
	const resolved = resolveVariant(visualElement, variant, options.type === "exit" ? visualElement.presenceContext?.custom : void 0);
	let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
	if (options.transitionOverride) transition = options.transitionOverride;
	/**
	* If we have a variant, create a callback that runs it as an animation.
	* Otherwise, we resolve a Promise immediately for a composable no-op.
	*/
	const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
	/**
	* If we have children, create a callback that runs all their animations.
	* Otherwise, we resolve a Promise immediately for a composable no-op.
	*/
	const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
		const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
		return animateChildren(visualElement, variant, forwardDelay, delayChildren, staggerChildren, staggerDirection, options);
	} : () => Promise.resolve();
	/**
	* If the transition explicitly defines a "when" option, we need to resolve either
	* this animation or all children animations before playing the other.
	*/
	const { when } = transition;
	if (when) {
		const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
		return first().then(() => last());
	} else return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
}
function animateChildren(visualElement, variant, delay = 0, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
	const animations = [];
	for (const child of visualElement.variantChildren) {
		child.notify("AnimationStart", variant);
		animations.push(animateVariant(child, variant, {
			...options,
			delay: delay + (typeof delayChildren === "function" ? 0 : delayChildren) + calcChildStagger$1(visualElement.variantChildren, child, delayChildren, staggerChildren, staggerDirection)
		}).then(() => child.notify("AnimationComplete", variant)));
	}
	return Promise.all(animations);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/interfaces/visual-element.mjs
function animateVisualElement(visualElement, definition, options = {}) {
	visualElement.notify("AnimationStart", definition);
	let animation;
	if (Array.isArray(definition)) {
		const animations = definition.map((variant) => animateVariant(visualElement, variant, options));
		animation = Promise.all(animations);
	} else if (typeof definition === "string") animation = animateVariant(visualElement, definition, options);
	else {
		const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
		animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
	}
	return animation.then(() => {
		visualElement.notify("AnimationComplete", definition);
	});
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/geometry/conversion.mjs
/**
* Bounding boxes tend to be defined as top, left, right, bottom. For various operations
* it's easier to consider each axis individually. This function returns a bounding box
* as a map of single-axis min/max values.
*/
function convertBoundingBoxToBox$1({ top, left, right, bottom }) {
	return {
		x: {
			min: left,
			max: right
		},
		y: {
			min: top,
			max: bottom
		}
	};
}
/**
* Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
* provided by Framer to allow measured points to be corrected for device scaling. This is used
* when measuring DOM elements and DOM event points.
*/
function transformBoxPoints$1(point, transformPoint) {
	if (!transformPoint) return point;
	const topLeft = transformPoint({
		x: point.left,
		y: point.top
	});
	const bottomRight = transformPoint({
		x: point.right,
		y: point.bottom
	});
	return {
		top: topLeft.y,
		left: topLeft.x,
		bottom: bottomRight.y,
		right: bottomRight.x
	};
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/utils/has-transform.mjs
function isIdentityScale(scale) {
	return scale === void 0 || scale === 1;
}
function hasScale({ scale, scaleX, scaleY }) {
	return !isIdentityScale(scale) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
	return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate(values) {
	return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
	return value && value !== "0%";
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/geometry/delta-apply.mjs
/**
* Scales a point based on a factor and an originPoint
*/
function scalePoint(point, scale, originPoint) {
	return originPoint + scale * (point - originPoint);
}
/**
* Applies a translate/scale delta to a point
*/
function applyPointDelta(point, translate, scale, originPoint, boxScale) {
	if (boxScale !== void 0) point = scalePoint(point, boxScale, originPoint);
	return scalePoint(point, scale, originPoint) + translate;
}
/**
* Applies a translate/scale delta to an axis
*/
function applyAxisDelta(axis, translate = 0, scale = 1, originPoint, boxScale) {
	axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
	axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
* Applies a translate/scale delta to a box
*/
function applyBoxDelta(box, { x, y }) {
	applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
	applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
var TREE_SCALE_SNAP_MIN = .999999999999;
var TREE_SCALE_SNAP_MAX = 1.0000000000001;
/**
* Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
* in a tree upon our box before then calculating how to project it into our desired viewport-relative box
*
* This is the final nested loop within updateLayoutDelta for future refactoring
*/
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
	const treeLength = treePath.length;
	if (!treeLength) return;
	treeScale.x = treeScale.y = 1;
	let node;
	let delta;
	for (let i = 0; i < treeLength; i++) {
		node = treePath[i];
		delta = node.projectionDelta;
		/**
		* TODO: Prefer to remove this, but currently we have motion components with
		* display: contents in Framer.
		*/
		const { visualElement } = node.options;
		if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") continue;
		if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) transformBox(box, {
			x: -node.scroll.offset.x,
			y: -node.scroll.offset.y
		});
		if (delta) {
			treeScale.x *= delta.x.scale;
			treeScale.y *= delta.y.scale;
			applyBoxDelta(box, delta);
		}
		if (isSharedTransition && hasTransform(node.latestValues)) transformBox(box, node.latestValues);
	}
	/**
	* Snap tree scale back to 1 if it's within a non-perceivable threshold.
	* This will help reduce useless scales getting rendered.
	*/
	if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) treeScale.x = 1;
	if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) treeScale.y = 1;
}
function translateAxis$1(axis, distance) {
	axis.min = axis.min + distance;
	axis.max = axis.max + distance;
}
/**
* Apply a transform to an axis from the latest resolved motion values.
* This function basically acts as a bridge between a flat motion value map
* and applyAxisDelta
*/
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = .5) {
	applyAxisDelta(axis, axisTranslate, axisScale, mixNumber$1(axis.min, axis.max, axisOrigin), boxScale);
}
/**
* Apply a transform to a box from the latest resolved motion values.
*/
function transformBox(box, transform) {
	transformAxis(box.x, transform.x, transform.scaleX, transform.scale, transform.originX);
	transformAxis(box.y, transform.y, transform.scaleY, transform.scale, transform.originY);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/utils/measure.mjs
function measureViewportBox$1(instance, transformPoint) {
	return convertBoundingBoxToBox$1(transformBoxPoints$1(instance.getBoundingClientRect(), transformPoint));
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/motion/features/definitions.mjs
var featureProps = {
	animation: [
		"animate",
		"variants",
		"whileHover",
		"whileTap",
		"exit",
		"whileInView",
		"whileFocus",
		"whileDrag"
	],
	exit: ["exit"],
	drag: ["drag", "dragControls"],
	focus: ["whileFocus"],
	hover: [
		"whileHover",
		"onHoverStart",
		"onHoverEnd"
	],
	tap: [
		"whileTap",
		"onTap",
		"onTapStart",
		"onTapCancel"
	],
	pan: [
		"onPan",
		"onPanStart",
		"onPanSessionStart",
		"onPanEnd"
	],
	inView: [
		"whileInView",
		"onViewportEnter",
		"onViewportLeave"
	],
	layout: ["layout", "layoutId"]
};
var featureDefinitions = {};
for (const key in featureProps) featureDefinitions[key] = { isEnabled: (props) => featureProps[key].some((name) => !!props[name]) };
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/geometry/models.mjs
var createAxisDelta = () => ({
	translate: 0,
	scale: 1,
	origin: 0,
	originPoint: 0
});
var createDelta = () => ({
	x: createAxisDelta(),
	y: createAxisDelta()
});
var createAxis$1 = () => ({
	min: 0,
	max: 0
});
var createBox$1 = () => ({
	x: createAxis$1(),
	y: createAxis$1()
});
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/utils/is-browser.mjs
var isBrowser = typeof window !== "undefined";
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/utils/reduced-motion/state.mjs
var prefersReducedMotion = { current: null };
var hasReducedMotionListener = { current: false };
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/utils/reduced-motion/index.mjs
function initPrefersReducedMotion() {
	hasReducedMotionListener.current = true;
	if (!isBrowser) return;
	if (window.matchMedia) {
		const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
		const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
		motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
		setReducedMotionPreferences();
	} else prefersReducedMotion.current = false;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
function isAnimationControls(v) {
	return v !== null && typeof v === "object" && typeof v.start === "function";
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/utils/is-variant-label.mjs
/**
* Decides if the supplied variable is variant label
*/
function isVariantLabel(v) {
	return typeof v === "string" || Array.isArray(v);
}
var variantProps = ["initial", ...[
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
]];
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/utils/is-controlling-variants.mjs
function isControllingVariants(props) {
	return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
	return Boolean(isControllingVariants(props) || props.variants);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/utils/motion-values.mjs
function updateMotionValuesFromProps(element, next, prev) {
	for (const key in next) {
		const nextValue = next[key];
		const prevValue = prev[key];
		if (isMotionValue$1(nextValue))
 /**
		* If this is a motion value found in props or style, we want to add it
		* to our visual element's motion value map.
		*/
		element.addValue(key, nextValue);
		else if (isMotionValue$1(prevValue))
 /**
		* If we're swapping from a motion value to a static value,
		* create a new motion value from that
		*/
		element.addValue(key, motionValue$1(nextValue, { owner: element }));
		else if (prevValue !== nextValue)
 /**
		* If this is a flat value that has changed, update the motion value
		* or create one if it doesn't exist. We only want to do this if we're
		* not handling the value with our animation state.
		*/
		if (element.hasValue(key)) {
			const existingValue = element.getValue(key);
			if (existingValue.liveStyle === true) existingValue.jump(nextValue);
			else if (!existingValue.hasAnimated) existingValue.set(nextValue);
		} else {
			const latestValue = element.getStaticValue(key);
			element.addValue(key, motionValue$1(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
		}
	}
	for (const key in prev) if (next[key] === void 0) element.removeValue(key);
	return next;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/VisualElement.mjs
var propEventHandlers = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
];
/**
* A VisualElement is an imperative abstraction around UI elements such as
* HTMLElement, SVGElement, Three.Object3D etc.
*/
var VisualElement = class {
	/**
	* This method takes React props and returns found MotionValues. For example, HTML
	* MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
	*
	* This isn't an abstract method as it needs calling in the constructor, but it is
	* intended to be one.
	*/
	scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
		return {};
	}
	constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState }, options = {}) {
		/**
		* A reference to the current underlying Instance, e.g. a HTMLElement
		* or Three.Mesh etc.
		*/
		this.current = null;
		/**
		* A set containing references to this VisualElement's children.
		*/
		this.children = /* @__PURE__ */ new Set();
		/**
		* Determine what role this visual element should take in the variant tree.
		*/
		this.isVariantNode = false;
		this.isControllingVariants = false;
		/**
		* Decides whether this VisualElement should animate in reduced motion
		* mode.
		*
		* TODO: This is currently set on every individual VisualElement but feels
		* like it could be set globally.
		*/
		this.shouldReduceMotion = null;
		/**
		* A map of all motion values attached to this visual element. Motion
		* values are source of truth for any given animated value. A motion
		* value might be provided externally by the component via props.
		*/
		this.values = /* @__PURE__ */ new Map();
		this.KeyframeResolver = KeyframeResolver;
		/**
		* Cleanup functions for active features (hover/tap/exit etc)
		*/
		this.features = {};
		/**
		* A map of every subscription that binds the provided or generated
		* motion values onChange listeners to this visual element.
		*/
		this.valueSubscriptions = /* @__PURE__ */ new Map();
		/**
		* A reference to the previously-provided motion values as returned
		* from scrapeMotionValuesFromProps. We use the keys in here to determine
		* if any motion values need to be removed after props are updated.
		*/
		this.prevMotionValues = {};
		/**
		* An object containing a SubscriptionManager for each active event.
		*/
		this.events = {};
		/**
		* An object containing an unsubscribe function for each prop event subscription.
		* For example, every "Update" event can have multiple subscribers via
		* VisualElement.on(), but only one of those can be defined via the onUpdate prop.
		*/
		this.propEventSubscriptions = {};
		this.notifyUpdate = () => this.notify("Update", this.latestValues);
		this.render = () => {
			if (!this.current) return;
			this.triggerBuild();
			this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
		};
		this.renderScheduledAt = 0;
		this.scheduleRender = () => {
			const now = time.now();
			if (this.renderScheduledAt < now) {
				this.renderScheduledAt = now;
				frame$1.render(this.render, false, true);
			}
		};
		const { latestValues, renderState } = visualState;
		this.latestValues = latestValues;
		this.baseTarget = { ...latestValues };
		this.initialValues = props.initial ? { ...latestValues } : {};
		this.renderState = renderState;
		this.parent = parent;
		this.props = props;
		this.presenceContext = presenceContext;
		this.depth = parent ? parent.depth + 1 : 0;
		this.reducedMotionConfig = reducedMotionConfig;
		this.options = options;
		this.blockInitialAnimation = Boolean(blockInitialAnimation);
		this.isControllingVariants = isControllingVariants(props);
		this.isVariantNode = isVariantNode(props);
		if (this.isVariantNode) this.variantChildren = /* @__PURE__ */ new Set();
		this.manuallyAnimateOnMount = Boolean(parent && parent.current);
		/**
		* Any motion values that are provided to the element when created
		* aren't yet bound to the element, as this would technically be impure.
		* However, we iterate through the motion values and set them to the
		* initial values for this component.
		*
		* TODO: This is impure and we should look at changing this to run on mount.
		* Doing so will break some tests but this isn't necessarily a breaking change,
		* more a reflection of the test.
		*/
		const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
		for (const key in initialMotionValues) {
			const value = initialMotionValues[key];
			if (latestValues[key] !== void 0 && isMotionValue$1(value)) value.set(latestValues[key]);
		}
	}
	mount(instance) {
		this.current = instance;
		visualElementStore.set(instance, this);
		if (this.projection && !this.projection.instance) this.projection.mount(instance);
		if (this.parent && this.isVariantNode && !this.isControllingVariants) this.removeFromVariantTree = this.parent.addVariantChild(this);
		this.values.forEach((value, key) => this.bindToMotionValue(key, value));
		if (!hasReducedMotionListener.current) initPrefersReducedMotion();
		this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
		if (process.env.NODE_ENV !== "production") warnOnce(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled");
		this.parent?.addChild(this);
		this.update(this.props, this.presenceContext);
	}
	unmount() {
		this.projection && this.projection.unmount();
		cancelFrame$1(this.notifyUpdate);
		cancelFrame$1(this.render);
		this.valueSubscriptions.forEach((remove) => remove());
		this.valueSubscriptions.clear();
		this.removeFromVariantTree && this.removeFromVariantTree();
		this.parent?.removeChild(this);
		for (const key in this.events) this.events[key].clear();
		for (const key in this.features) {
			const feature = this.features[key];
			if (feature) {
				feature.unmount();
				feature.isMounted = false;
			}
		}
		this.current = null;
	}
	addChild(child) {
		this.children.add(child);
		this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set());
		this.enteringChildren.add(child);
	}
	removeChild(child) {
		this.children.delete(child);
		this.enteringChildren && this.enteringChildren.delete(child);
	}
	bindToMotionValue(key, value) {
		if (this.valueSubscriptions.has(key)) this.valueSubscriptions.get(key)();
		const valueIsTransform = transformProps.has(key);
		if (valueIsTransform && this.onBindTransform) this.onBindTransform();
		const removeOnChange = value.on("change", (latestValue) => {
			this.latestValues[key] = latestValue;
			this.props.onUpdate && frame$1.preRender(this.notifyUpdate);
			if (valueIsTransform && this.projection) this.projection.isTransformDirty = true;
			this.scheduleRender();
		});
		let removeSyncCheck;
		if (window.MotionCheckAppearSync) removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
		this.valueSubscriptions.set(key, () => {
			removeOnChange();
			if (removeSyncCheck) removeSyncCheck();
			if (value.owner) value.stop();
		});
	}
	sortNodePosition(other) {
		/**
		* If these nodes aren't even of the same type we can't compare their depth.
		*/
		if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) return 0;
		return this.sortInstanceNodePosition(this.current, other.current);
	}
	updateFeatures() {
		let key = "animation";
		for (key in featureDefinitions) {
			const featureDefinition = featureDefinitions[key];
			if (!featureDefinition) continue;
			const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
			/**
			* If this feature is enabled but not active, make a new instance.
			*/
			if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) this.features[key] = new FeatureConstructor(this);
			/**
			* If we have a feature, mount or update it.
			*/
			if (this.features[key]) {
				const feature = this.features[key];
				if (feature.isMounted) feature.update();
				else {
					feature.mount();
					feature.isMounted = true;
				}
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	/**
	* Measure the current viewport box with or without transforms.
	* Only measures axis-aligned boxes, rotate and skew must be manually
	* removed with a re-render to work.
	*/
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox$1();
	}
	getStaticValue(key) {
		return this.latestValues[key];
	}
	setStaticValue(key, value) {
		this.latestValues[key] = value;
	}
	/**
	* Update the provided props. Ensure any newly-added motion values are
	* added to our map, old ones removed, and listeners updated.
	*/
	update(props, presenceContext) {
		if (props.transformTemplate || this.props.transformTemplate) this.scheduleRender();
		this.prevProps = this.props;
		this.props = props;
		this.prevPresenceContext = this.presenceContext;
		this.presenceContext = presenceContext;
		/**
		* Update prop event handlers ie onAnimationStart, onAnimationComplete
		*/
		for (let i = 0; i < propEventHandlers.length; i++) {
			const key = propEventHandlers[i];
			if (this.propEventSubscriptions[key]) {
				this.propEventSubscriptions[key]();
				delete this.propEventSubscriptions[key];
			}
			const listener = props["on" + key];
			if (listener) this.propEventSubscriptions[key] = this.on(key, listener);
		}
		this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps, this), this.prevMotionValues);
		if (this.handleChildMotionValue) this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	/**
	* Returns the variant definition with a given name.
	*/
	getVariant(name) {
		return this.props.variants ? this.props.variants[name] : void 0;
	}
	/**
	* Returns the defined default transition on this component.
	*/
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	getClosestVariantNode() {
		return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
	}
	/**
	* Add a child visual element to our set of children.
	*/
	addVariantChild(child) {
		const closestVariantNode = this.getClosestVariantNode();
		if (closestVariantNode) {
			closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
			return () => closestVariantNode.variantChildren.delete(child);
		}
	}
	/**
	* Add a motion value and bind it to this visual element.
	*/
	addValue(key, value) {
		const existingValue = this.values.get(key);
		if (value !== existingValue) {
			if (existingValue) this.removeValue(key);
			this.bindToMotionValue(key, value);
			this.values.set(key, value);
			this.latestValues[key] = value.get();
		}
	}
	/**
	* Remove a motion value and unbind any active subscriptions.
	*/
	removeValue(key) {
		this.values.delete(key);
		const unsubscribe = this.valueSubscriptions.get(key);
		if (unsubscribe) {
			unsubscribe();
			this.valueSubscriptions.delete(key);
		}
		delete this.latestValues[key];
		this.removeValueFromRenderState(key, this.renderState);
	}
	/**
	* Check whether we have a motion value for this key
	*/
	hasValue(key) {
		return this.values.has(key);
	}
	getValue(key, defaultValue) {
		if (this.props.values && this.props.values[key]) return this.props.values[key];
		let value = this.values.get(key);
		if (value === void 0 && defaultValue !== void 0) {
			value = motionValue$1(defaultValue === null ? void 0 : defaultValue, { owner: this });
			this.addValue(key, value);
		}
		return value;
	}
	/**
	* If we're trying to animate to a previously unencountered value,
	* we need to check for it in our state and as a last resort read it
	* directly from the instance (which might have performance implications).
	*/
	readValue(key, target) {
		let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
		if (value !== void 0 && value !== null) {
			if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) value = parseFloat(value);
			else if (!findValueType$1(value) && complex$1.test(target)) value = getAnimatableNone(key, target);
			this.setBaseTarget(key, isMotionValue$1(value) ? value.get() : value);
		}
		return isMotionValue$1(value) ? value.get() : value;
	}
	/**
	* Set the base target to later animate back to. This is currently
	* only hydrated on creation and when we first read a value.
	*/
	setBaseTarget(key, value) {
		this.baseTarget[key] = value;
	}
	/**
	* Find the base target for a value thats been removed from all animation
	* props.
	*/
	getBaseTarget(key) {
		const { initial } = this.props;
		let valueFromInitial;
		if (typeof initial === "string" || typeof initial === "object") {
			const variant = resolveVariantFromProps(this.props, initial, this.presenceContext?.custom);
			if (variant) valueFromInitial = variant[key];
		}
		/**
		* If this value still exists in the current initial variant, read that.
		*/
		if (initial && valueFromInitial !== void 0) return valueFromInitial;
		/**
		* Alternatively, if this VisualElement config has defined a getBaseTarget
		* so we can read the value from an alternative source, try that.
		*/
		const target = this.getBaseTargetFromProps(this.props, key);
		if (target !== void 0 && !isMotionValue$1(target)) return target;
		/**
		* If the value was initially defined on initial, but it doesn't any more,
		* return undefined. Otherwise return the value as initially read from the DOM.
		*/
		return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
	}
	on(eventName, callback) {
		if (!this.events[eventName]) this.events[eventName] = new SubscriptionManager();
		return this.events[eventName].add(callback);
	}
	notify(eventName, ...args) {
		if (this.events[eventName]) this.events[eventName].notify(...args);
	}
	scheduleRenderMicrotask() {
		microtask.render(this.render);
	}
};
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/dom/DOMVisualElement.mjs
var DOMVisualElement = class extends VisualElement {
	constructor() {
		super(...arguments);
		this.KeyframeResolver = DOMKeyframesResolver;
	}
	sortInstanceNodePosition(a, b) {
		/**
		* compareDocumentPosition returns a bitmask, by using the bitwise &
		* we're returning true if 2 in that bitmask is set to true. 2 is set
		* to true if b preceeds a.
		*/
		return a.compareDocumentPosition(b) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(props, key) {
		return props.style ? props.style[key] : void 0;
	}
	removeValueFromRenderState(key, { vars, style }) {
		delete vars[key];
		delete style[key];
	}
	handleChildMotionValue() {
		if (this.childSubscription) {
			this.childSubscription();
			delete this.childSubscription;
		}
		const { children } = this.props;
		if (isMotionValue$1(children)) this.childSubscription = children.on("change", (latest) => {
			if (this.current) this.current.textContent = `${latest}`;
		});
	}
};
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/html/utils/build-transform.mjs
var translateAlias = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
};
var numTransforms = transformPropOrder.length;
/**
* Build a CSS transform style from individual x/y/scale etc properties.
*
* This outputs with a default order of transforms/scales/rotations, this can be customised by
* providing a transformTemplate function.
*/
function buildTransform(latestValues, transform, transformTemplate) {
	let transformString = "";
	let transformIsDefault = true;
	/**
	* Loop over all possible transforms in order, adding the ones that
	* are present to the transform string.
	*/
	for (let i = 0; i < numTransforms; i++) {
		const key = transformPropOrder[i];
		const value = latestValues[key];
		if (value === void 0) continue;
		let valueIsDefault = true;
		if (typeof value === "number") valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
		else valueIsDefault = parseFloat(value) === 0;
		if (!valueIsDefault || transformTemplate) {
			const valueAsType = getValueAsType(value, numberValueTypes[key]);
			if (!valueIsDefault) {
				transformIsDefault = false;
				const transformName = translateAlias[key] || key;
				transformString += `${transformName}(${valueAsType}) `;
			}
			if (transformTemplate) transform[key] = valueAsType;
		}
	}
	transformString = transformString.trim();
	if (transformTemplate) transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
	else if (transformIsDefault) transformString = "none";
	return transformString;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, transformTemplate) {
	const { style, vars, transformOrigin } = state;
	let hasTransform = false;
	let hasTransformOrigin = false;
	/**
	* Loop over all our latest animated values and decide whether to handle them
	* as a style or CSS variable.
	*
	* Transforms and transform origins are kept separately for further processing.
	*/
	for (const key in latestValues) {
		const value = latestValues[key];
		if (transformProps.has(key)) {
			hasTransform = true;
			continue;
		} else if (isCSSVariableName$1(key)) {
			vars[key] = value;
			continue;
		} else {
			const valueAsType = getValueAsType(value, numberValueTypes[key]);
			if (key.startsWith("origin")) {
				hasTransformOrigin = true;
				transformOrigin[key] = valueAsType;
			} else style[key] = valueAsType;
		}
	}
	if (!latestValues.transform) {
		if (hasTransform || transformTemplate) style.transform = buildTransform(latestValues, state.transform, transformTemplate);
		else if (style.transform)
 /**
		* If we have previously created a transform but currently don't have any,
		* reset transform style to none.
		*/
		style.transform = "none";
	}
	/**
	* Build a transformOrigin style. Uses the same defaults as the browser for
	* undefined origins.
	*/
	if (hasTransformOrigin) {
		const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
		style.transformOrigin = `${originX} ${originY} ${originZ}`;
	}
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/html/utils/render.mjs
function renderHTML(element, { style, vars }, styleProp, projection) {
	const elementStyle = element.style;
	let key;
	for (key in style) elementStyle[key] = style[key];
	projection?.applyProjectionStyles(elementStyle, styleProp);
	for (key in vars) elementStyle.setProperty(key, vars[key]);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout, layoutId }) {
	return transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== void 0) && (!!scaleCorrectors$1[key] || key === "opacity");
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps$1(props, prevProps, visualElement) {
	const { style } = props;
	const newValues = {};
	for (const key in style) if (isMotionValue$1(style[key]) || prevProps.style && isMotionValue$1(prevProps.style[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) newValues[key] = style[key];
	return newValues;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/html/HTMLVisualElement.mjs
function getComputedStyle$1(element) {
	return window.getComputedStyle(element);
}
var HTMLVisualElement = class extends DOMVisualElement {
	constructor() {
		super(...arguments);
		this.type = "html";
		this.renderInstance = renderHTML;
	}
	readValueFromInstance(instance, key) {
		if (transformProps.has(key)) return this.projection?.isProjecting ? defaultTransformValue(key) : readTransformValue(instance, key);
		else {
			const computedStyle = getComputedStyle$1(instance);
			const value = (isCSSVariableName$1(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
			return typeof value === "string" ? value.trim() : value;
		}
	}
	measureInstanceViewportBox(instance, { transformPagePoint }) {
		return measureViewportBox$1(instance, transformPagePoint);
	}
	build(renderState, latestValues, props) {
		buildHTMLStyles(renderState, latestValues, props.transformTemplate);
	}
	scrapeMotionValuesFromProps(props, prevProps, visualElement) {
		return scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
	}
};
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/svg/utils/path.mjs
var dashKeys = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
};
var camelKeys = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
/**
* Build SVG path properties. Uses the path's measured length to convert
* our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
* and stroke-dasharray attributes.
*
* This function is mutative to reduce per-frame GC.
*/
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
	attrs.pathLength = 1;
	const keys = useDashCase ? dashKeys : camelKeys;
	attrs[keys.offset] = px$1.transform(-offset);
	const pathLength = px$1.transform(length);
	const pathSpacing = px$1.transform(spacing);
	attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
/**
* Build SVG visual attributes, like cx and style.transform
*/
function buildSVGAttrs(state, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0, ...latest }, isSVGTag, transformTemplate, styleProp) {
	buildHTMLStyles(state, latest, transformTemplate);
	/**
	* For svg tags we just want to make sure viewBox is animatable and treat all the styles
	* as normal HTML tags.
	*/
	if (isSVGTag) {
		if (state.style.viewBox) state.attrs.viewBox = state.style.viewBox;
		return;
	}
	state.attrs = state.style;
	state.style = {};
	const { attrs, style } = state;
	/**
	* However, we apply transforms as CSS transforms.
	* So if we detect a transform, transformOrigin we take it from attrs and copy it into style.
	*/
	if (attrs.transform) {
		style.transform = attrs.transform;
		delete attrs.transform;
	}
	if (style.transform || attrs.transformOrigin) {
		style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
		delete attrs.transformOrigin;
	}
	if (style.transform) {
		/**
		* SVG's element transform-origin uses its own median as a reference.
		* Therefore, transformBox becomes a fill-box
		*/
		style.transformBox = styleProp?.transformBox ?? "fill-box";
		delete attrs.transformBox;
	}
	if (attrX !== void 0) attrs.x = attrX;
	if (attrY !== void 0) attrs.y = attrY;
	if (attrScale !== void 0) attrs.scale = attrScale;
	if (pathLength !== void 0) buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
/**
* A set of attribute names that are always read/written as camel case.
*/
var camelCaseAttributes = new Set([
	"baseFrequency",
	"diffuseConstant",
	"kernelMatrix",
	"kernelUnitLength",
	"keySplines",
	"keyTimes",
	"limitingConeAngle",
	"markerHeight",
	"markerWidth",
	"numOctaves",
	"targetX",
	"targetY",
	"surfaceScale",
	"specularConstant",
	"specularExponent",
	"stdDeviation",
	"tableValues",
	"viewBox",
	"gradientTransform",
	"pathLength",
	"startOffset",
	"textLength",
	"lengthAdjust"
]);
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs
var isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
	renderHTML(element, renderState, void 0, projection);
	for (const key in renderState.attrs) element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
	const newValues = scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
	for (const key in props) if (isMotionValue$1(props[key]) || isMotionValue$1(prevProps[key])) {
		const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
		newValues[targetKey] = props[key];
	}
	return newValues;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/svg/SVGVisualElement.mjs
var SVGVisualElement = class extends DOMVisualElement {
	constructor() {
		super(...arguments);
		this.type = "svg";
		this.isSVGTag = false;
		this.measureInstanceViewportBox = createBox$1;
	}
	getBaseTargetFromProps(props, key) {
		return props[key];
	}
	readValueFromInstance(instance, key) {
		if (transformProps.has(key)) {
			const defaultType = getDefaultValueType(key);
			return defaultType ? defaultType.default || 0 : 0;
		}
		key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
		return instance.getAttribute(key);
	}
	scrapeMotionValuesFromProps(props, prevProps, visualElement) {
		return scrapeMotionValuesFromProps(props, prevProps, visualElement);
	}
	build(renderState, latestValues, props) {
		buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
	}
	renderInstance(instance, renderState, styleProp, projection) {
		renderSVG(instance, renderState, styleProp, projection);
	}
	mount(instance) {
		this.isSVGTag = isSVGTag(instance.tagName);
		super.mount(instance);
	}
};
//#endregion
//#region node_modules/motion-sv/dist/state/create-visual-element.js
function createVisualElement(Component, options) {
	return isSVGElement$1(Component) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
}
//#endregion
//#region node_modules/motion-sv/dist/features/animation/calc-child-stagger.js
function calcChildStagger(children, child, delayChildren, staggerChildren = 0, staggerDirection = 1) {
	const sortedChildren = Array.from(children).sort((a, b) => a.sortNodePosition(b));
	const index = sortedChildren.indexOf(child);
	const numChildren = children.size;
	const maxStaggerDuration = (numChildren - 1) * staggerChildren;
	const delayIsFunction = typeof delayChildren === "function";
	/**
	* parent may not update, so we need to clear the enteringChildren when the child is the last one
	*/
	if (index === sortedChildren.length - 1) child.parent.enteringChildren = void 0;
	return delayIsFunction ? delayChildren(index, numChildren) : staggerDirection === 1 ? index * staggerChildren : maxStaggerDuration - index * staggerChildren;
}
//#endregion
//#region node_modules/motion-sv/dist/features/animation/animation.js
var STATE_TYPES = [
	"initial",
	"animate",
	"whileInView",
	"whileHover",
	"whilePress",
	"whileDrag",
	"whileFocus",
	"exit"
];
var AnimationFeature = class extends Feature {
	unmountControls;
	constructor(state) {
		super(state);
		this.state.visualElement = createVisualElement(this.state.options.as, {
			presenceContext: null,
			parent: this.state.parent?.visualElement,
			props: {
				...this.state.options,
				whileTap: this.state.options.whilePress
			},
			visualState: {
				renderState: {
					transform: {},
					transformOrigin: {},
					style: {},
					vars: {},
					attrs: {}
				},
				latestValues: { ...this.state.baseTarget }
			},
			reducedMotionConfig: this.state.options.motionConfig.reducedMotion
		});
		this.state.visualElement.parent?.addChild(this.state.visualElement);
		this.state.animateUpdates = this.animateUpdates;
		if (this.state.isMounted()) this.state.startAnimation();
	}
	updateAnimationControlsSubscription() {
		const { animate } = this.state.options;
		if (isAnimationControls$1(animate)) this.unmountControls = animate.subscribe(this.state);
	}
	animateUpdates = ({ controlActiveState, directAnimate, directTransition, controlDelay = 0, isExit } = {}) => {
		const { reducedMotion } = this.state.options.motionConfig;
		this.state.visualElement.shouldReduceMotion = reducedMotion === "always" || reducedMotion === "user" && !!prefersReducedMotion.current;
		const prevTarget = this.state.target;
		this.state.target = { ...this.state.baseTarget };
		let animationOptions = {};
		animationOptions = this.resolveStateAnimation({
			controlActiveState,
			directAnimate,
			directTransition
		});
		this.state.finalTransition = animationOptions;
		const factories = this.createAnimationFactories(prevTarget, animationOptions, controlDelay);
		const { getChildAnimations } = this.setupChildAnimations(animationOptions, this.state.activeStates);
		return this.executeAnimations({
			factories,
			getChildAnimations,
			transition: animationOptions,
			controlActiveState,
			isExit
		});
	};
	executeAnimations({ factories, getChildAnimations, transition, controlActiveState, isExit = false }) {
		const getAnimation = () => Promise.all(factories.map((factory) => factory()).filter(Boolean));
		const animationTarget = { ...this.state.target };
		const element = this.state.element;
		/**
		* Finish the animation and dispatch events
		*/
		const finishAnimation = (animationPromise) => {
			element.dispatchEvent(motionEvent("motionstart", animationTarget));
			this.state.options.onAnimationStart?.(animationTarget);
			animationPromise.then(() => {
				element.dispatchEvent(motionEvent("motioncomplete", animationTarget, isExit));
				this.state.options.onAnimationComplete?.(animationTarget);
			}).catch(noop);
		};
		/**
		* Get the animation promise
		*/
		const getAnimationPromise = () => {
			const animationPromise = transition?.when ? (transition.when === "beforeChildren" ? getAnimation() : getChildAnimations()).then(() => transition.when === "beforeChildren" ? getChildAnimations() : getAnimation()) : Promise.all([getAnimation(), getChildAnimations()]);
			finishAnimation(animationPromise);
			return animationPromise;
		};
		return controlActiveState ? getAnimationPromise : getAnimationPromise();
	}
	/**
	* Setup child animations
	*/
	setupChildAnimations(transition, controlActiveState) {
		const visualElement = this.state.visualElement;
		if (!visualElement.variantChildren?.size || !controlActiveState) return { getChildAnimations: () => Promise.resolve() };
		const { staggerChildren = 0, staggerDirection = 1, delayChildren = 0 } = transition || {};
		const numChildren = visualElement.variantChildren.size;
		const maxStaggerDuration = (numChildren - 1) * staggerChildren;
		const delayIsFunction = typeof delayChildren === "function";
		const generateStaggerDuration = delayIsFunction ? (i) => delayChildren(i, numChildren) : staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
		const childAnimations = Array.from(visualElement.variantChildren).map((child, index) => {
			return child.state.animateUpdates({
				controlActiveState,
				controlDelay: (delayIsFunction ? 0 : delayChildren) + generateStaggerDuration(index)
			});
		});
		return { getChildAnimations: () => Promise.all(childAnimations.map((animation) => {
			return animation();
		})) };
	}
	createAnimationFactories(prevTarget, animationOptions, controlDelay) {
		const factories = [];
		const target = {};
		for (const key in this.state.target) {
			if (!hasChanged(prevTarget[key], this.state.target[key])) continue;
			this.state.baseTarget[key] ??= style.get(this.state.element, key);
			target[key] = this.state.target[key] === "none" && isDef(transformResetValue[key]) ? transformResetValue[key] : this.state.target[key];
		}
		if (Object.keys(target).length) factories.push(() => animateVisualElement(this.state.visualElement, {
			...target,
			transition: animationOptions
		}, { delay: controlDelay }));
		return factories;
	}
	resolveStateAnimation({ controlActiveState, directAnimate, directTransition }) {
		let variantTransition = this.state.options.transition;
		let variant = {};
		const { variants, custom, transition, animatePresenceContext } = this.state.options;
		const customValue = animatePresenceContext?.custom ?? custom;
		this.state.activeStates = {
			...this.state.activeStates,
			...controlActiveState
		};
		STATE_TYPES.forEach((name) => {
			if (!this.state.activeStates[name] || isAnimationControls$1(this.state.options[name])) return;
			const definition = this.state.options[name];
			let resolvedVariant = isDef(definition) ? resolveVariant$1(definition, variants, customValue) : void 0;
			if (this.state.visualElement.isVariantNode) {
				const controlVariant = resolveVariant$1(this.state.context[name], variants, customValue);
				resolvedVariant = controlVariant ? Object.assign(controlVariant || {}, resolvedVariant) : variant;
			}
			if (!resolvedVariant) return;
			if (name !== "initial") variantTransition = resolvedVariant.transition || this.state.options.transition || {};
			variant = Object.assign(variant, resolvedVariant);
		});
		if (directAnimate) {
			variant = resolveVariant$1(directAnimate, variants, customValue);
			variantTransition = variant.transition || directTransition || transition;
		}
		Object.entries(variant).forEach(([key, value]) => {
			if (key === "transition") return;
			this.state.target[key] = value;
		});
		return variantTransition;
	}
	/**
	* Subscribe any provided AnimationControls to the component's VisualElement
	*/
	mount() {
		const { element } = this.state;
		mountedStates.set(element, this.state);
		if (!visualElementStore.get(element)) {
			this.state.visualElement.mount(element);
			visualElementStore.set(element, this.state.visualElement);
		}
		this.state.visualElement.state = this.state;
		this.updateAnimationControlsSubscription();
		const visualElement = this.state.visualElement;
		const parentVisualElement = visualElement.parent;
		visualElement.enteringChildren = void 0;
		/**
		* when current element is new entering child and it's controlled by parent,
		* animate it by delayChildren
		*/
		if (this.state.parent?.isMounted() && !visualElement.isControllingVariants && parentVisualElement?.enteringChildren?.has(visualElement)) {
			const parentOptions = this.state.parent.options;
			const parentCustom = parentOptions.custom ?? parentOptions.animatePresenceContext?.custom;
			const derivedParentVariant = parentOptions.animate ? resolveVariant$1(parentOptions.animate, parentOptions.variants, parentCustom) : void 0;
			const { delayChildren, staggerChildren = 0, staggerDirection = 1 } = this.state.parent.finalTransition || derivedParentVariant?.transition || {};
			const delayIsFunction = typeof delayChildren === "function";
			const group = parentVisualElement.variantChildren?.size ? parentVisualElement.variantChildren : parentVisualElement.enteringChildren?.size ? parentVisualElement.enteringChildren : parentVisualElement.children;
			const controlDelay = (delayIsFunction ? 0 : delayChildren || 0) + calcChildStagger(group, visualElement, delayChildren, staggerChildren, staggerDirection);
			this.animateUpdates({
				controlActiveState: this.state.parent.activeStates,
				controlDelay
			})();
		}
	}
	update() {
		const { animate } = this.state.options;
		const { animate: prevAnimate } = this.state.visualElement.prevProps || {};
		if (animate !== prevAnimate) this.updateAnimationControlsSubscription();
	}
	unmount() {
		this.unmountControls?.();
	}
};
//#endregion
//#region node_modules/motion-sv/dist/features/gestures/press/index.js
function extractEventInfo$1(event) {
	return { point: {
		x: event.pageX,
		y: event.pageY
	} };
}
function handlePressEvent(state, event, lifecycle) {
	const props = state.options;
	if (props.whilePress) state.setActive("whilePress", lifecycle === "Start");
	const callback = props[`onPress${lifecycle === "End" ? "" : lifecycle}`];
	if (callback) frame.postRender(() => callback(event, extractEventInfo$1(event)));
}
var PressGesture = class extends Feature {
	isActive() {
		const { whilePress, onPress, onPressCancel, onPressStart } = this.state.options;
		return Boolean(whilePress || onPress || onPressCancel || onPressStart);
	}
	constructor(state) {
		super(state);
	}
	mount() {
		this.register();
	}
	update() {
		const { whilePress, onPress, onPressCancel, onPressStart } = this.state.options;
		if (!(whilePress || onPress || onPressCancel || onPressStart)) this.register();
	}
	register() {
		const element = this.state.element;
		if (!element || !this.isActive()) return;
		this.unmount();
		this.unmount = press(element, (el, startEvent) => {
			handlePressEvent(this.state, startEvent, "Start");
			return (endEvent, { success }) => handlePressEvent(this.state, endEvent, success ? "End" : "Cancel");
		}, { useGlobalTarget: this.state.options.globalPressTarget });
	}
};
//#endregion
//#region node_modules/motion-sv/dist/features/gestures/hover/index.js
function handleHoverEvent(state, event, lifecycle) {
	const props = state.options;
	if (props.whileHover) state.setActive("whileHover", lifecycle === "Start");
	const callback = props[`onHover${lifecycle}`];
	if (callback) frame.postRender(() => callback(event, extractEventInfo$1(event)));
}
var HoverGesture = class extends Feature {
	isActive() {
		const { whileHover, onHoverStart, onHoverEnd } = this.state.options;
		return Boolean(whileHover || onHoverStart || onHoverEnd);
	}
	constructor(state) {
		super(state);
	}
	mount() {
		this.register();
	}
	update() {
		const { whileHover, onHoverStart, onHoverEnd } = this.state.visualElement.prevProps;
		if (!(whileHover || onHoverStart || onHoverEnd)) this.register();
	}
	register() {
		const element = this.state.element;
		if (!element || !this.isActive()) return;
		this.unmount();
		this.unmount = hover(element, (el, startEvent) => {
			handleHoverEvent(this.state, startEvent, "Start");
			return (endEvent) => {
				handleHoverEvent(this.state, endEvent, "End");
			};
		});
	}
};
//#endregion
//#region node_modules/motion-sv/dist/features/gestures/in-view/index.js
function handleViewportEvent(state, entry, lifecycle) {
	const props = state.options;
	if (props.whileInView) state.setActive("whileInView", lifecycle === "Enter");
	const callback = props[`onViewport${lifecycle}`];
	if (callback) frame.postRender(() => callback(entry));
}
var InViewGesture = class extends Feature {
	isActive() {
		const { whileInView, onViewportEnter, onViewportLeave } = this.state.options;
		return Boolean(whileInView || onViewportEnter || onViewportLeave);
	}
	constructor(state) {
		super(state);
	}
	startObserver() {
		const element = this.state.element;
		if (!element || !this.isActive()) return;
		this.unmount();
		const { once, ...viewOptions } = this.state.options.inViewOptions || {};
		this.unmount = inView(element, (_, entry) => {
			handleViewportEvent(this.state, entry, "Enter");
			if (!once) return (endEvent) => {
				handleViewportEvent(this.state, entry, "Leave");
			};
		}, viewOptions);
	}
	mount() {
		this.startObserver();
	}
	update() {
		const { props, prevProps } = this.state.visualElement;
		if ([
			"amount",
			"margin",
			"root"
		].some(hasViewportOptionChanged(props, prevProps))) this.startObserver();
	}
};
function hasViewportOptionChanged({ inViewOptions = {} }, { inViewOptions: prevViewport = {} } = {}) {
	return (name) => inViewOptions[name] !== prevViewport[name];
}
//#endregion
//#region node_modules/motion-sv/dist/events/utils/is-primary-pointer.js
function isPrimaryPointer(event) {
	if (event.pointerType === "mouse") return typeof event.button !== "number" || event.button <= 0;
	else
 /**
	* isPrimary is true for all mice buttons, whereas every touch point
	* is regarded as its own input. So subsequent concurrent touch points
	* will be false.
	*
	* Specifically match against false here as incomplete versions of
	* PointerEvents in very old browser might have it set as undefined.
	*/
	return event.isPrimary !== false;
}
//#endregion
//#region node_modules/motion-sv/dist/events/add-pointer-event.js
function addPointerEvent(target, eventName, handler, options) {
	return addDomEvent$1(target, eventName, addPointerInfo(handler), options);
}
//#endregion
//#region node_modules/motion-sv/dist/events/event-info.js
function extractEventInfo(event, pointType = "page") {
	return { point: {
		x: event[`${pointType}X`],
		y: event[`${pointType}Y`]
	} };
}
function addPointerInfo(handler) {
	return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
}
//#endregion
//#region node_modules/motion-sv/dist/events/add-dom-event.js
function addDomEvent$1(target, eventName, handler, options = { passive: true }) {
	target.addEventListener(eventName, handler, options);
	return () => target.removeEventListener(eventName, handler);
}
//#endregion
//#region node_modules/motion-sv/dist/features/gestures/focus/index.js
var FocusGesture = class extends Feature {
	isActive = false;
	onFocus() {
		let isFocusVisible = false;
		/**
		* If this element doesn't match focus-visible then don't
		* apply whileHover. But, if matches throws that focus-visible
		* is not a valid selector then in that browser outline styles will be applied
		* to the element by default and we want to match that behaviour with whileFocus.
		*/
		try {
			isFocusVisible = this.state.element.matches(":focus-visible");
		} catch (e) {
			isFocusVisible = true;
		}
		if (!isFocusVisible) return;
		this.state.setActive("whileFocus", true);
		this.isActive = true;
	}
	onBlur() {
		if (!this.isActive) return;
		this.state.setActive("whileFocus", false);
		this.isActive = false;
	}
	mount() {
		this.unmount = pipe(addDomEvent$1(this.state.element, "focus", () => this.onFocus()), addDomEvent$1(this.state.element, "blur", () => this.onBlur()));
	}
};
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/animation/animate/single-value.mjs
function animateSingleValue(value, keyframes, options) {
	const motionValue$1$1 = isMotionValue$1(value) ? value : motionValue$1(value);
	motionValue$1$1.start(animateMotionValue("", motionValue$1$1, keyframes, options));
	return motionValue$1$1.animation;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/utils/compare-by-depth.mjs
var compareByDepth = (a, b) => a.depth - b.depth;
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/render/utils/flat-tree.mjs
var FlatTree = class {
	constructor() {
		this.children = [];
		this.isDirty = false;
	}
	add(child) {
		addUniqueItem(this.children, child);
		this.isDirty = true;
	}
	remove(child) {
		removeItem(this.children, child);
		this.isDirty = true;
	}
	forEach(callback) {
		this.isDirty && this.children.sort(compareByDepth);
		this.isDirty = false;
		this.children.forEach(callback);
	}
};
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
/**
* If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
*
* TODO: Remove and move to library
*/
function resolveMotionValue(value) {
	return isMotionValue$1(value) ? value.get() : value;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/animation/mix-values.mjs
var borders = [
	"TopLeft",
	"TopRight",
	"BottomLeft",
	"BottomRight"
];
var numBorders = borders.length;
var asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
var isPx = (value) => typeof value === "number" || px$1.test(value);
function mixValues(target, follow, lead, progress, shouldCrossfadeOpacity, isOnlyMember) {
	if (shouldCrossfadeOpacity) {
		target.opacity = mixNumber$1(0, lead.opacity ?? 1, easeCrossfadeIn(progress));
		target.opacityExit = mixNumber$1(follow.opacity ?? 1, 0, easeCrossfadeOut(progress));
	} else if (isOnlyMember) target.opacity = mixNumber$1(follow.opacity ?? 1, lead.opacity ?? 1, progress);
	/**
	* Mix border radius
	*/
	for (let i = 0; i < numBorders; i++) {
		const borderLabel = `border${borders[i]}Radius`;
		let followRadius = getRadius(follow, borderLabel);
		let leadRadius = getRadius(lead, borderLabel);
		if (followRadius === void 0 && leadRadius === void 0) continue;
		followRadius || (followRadius = 0);
		leadRadius || (leadRadius = 0);
		if (followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius)) {
			target[borderLabel] = Math.max(mixNumber$1(asNumber(followRadius), asNumber(leadRadius), progress), 0);
			if (percent$1.test(leadRadius) || percent$1.test(followRadius)) target[borderLabel] += "%";
		} else target[borderLabel] = leadRadius;
	}
	/**
	* Mix rotation
	*/
	if (follow.rotate || lead.rotate) target.rotate = mixNumber$1(follow.rotate || 0, lead.rotate || 0, progress);
}
function getRadius(values, radiusName) {
	return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
var easeCrossfadeIn = /* @__PURE__ */ compress(0, .5, circOut);
var easeCrossfadeOut = /* @__PURE__ */ compress(.5, .95, noop$1);
function compress(min, max, easing) {
	return (p) => {
		if (p < min) return 0;
		if (p > max) return 1;
		return easing(progress$1(min, max, p));
	};
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/geometry/copy.mjs
/**
* Reset an axis to the provided origin box.
*
* This is a mutative operation.
*/
function copyAxisInto(axis, originAxis) {
	axis.min = originAxis.min;
	axis.max = originAxis.max;
}
/**
* Reset a box to the provided origin box.
*
* This is a mutative operation.
*/
function copyBoxInto(box, originBox) {
	copyAxisInto(box.x, originBox.x);
	copyAxisInto(box.y, originBox.y);
}
/**
* Reset a delta to the provided origin box.
*
* This is a mutative operation.
*/
function copyAxisDeltaInto(delta, originDelta) {
	delta.translate = originDelta.translate;
	delta.scale = originDelta.scale;
	delta.originPoint = originDelta.originPoint;
	delta.origin = originDelta.origin;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/geometry/delta-calc.mjs
var SCALE_PRECISION = 1e-4;
var SCALE_MIN = 1 - SCALE_PRECISION;
var SCALE_MAX = 1 + SCALE_PRECISION;
var TRANSLATE_PRECISION = .01;
var TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
var TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength$1(axis) {
	return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
	return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = .5) {
	delta.origin = origin;
	delta.originPoint = mixNumber$1(source.min, source.max, delta.origin);
	delta.scale = calcLength$1(target) / calcLength$1(source);
	delta.translate = mixNumber$1(target.min, target.max, delta.origin) - delta.originPoint;
	if (delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX || isNaN(delta.scale)) delta.scale = 1;
	if (delta.translate >= TRANSLATE_MIN && delta.translate <= TRANSLATE_MAX || isNaN(delta.translate)) delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
	calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
	calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent) {
	target.min = parent.min + relative.min;
	target.max = target.min + calcLength$1(relative);
}
function calcRelativeBox(target, relative, parent) {
	calcRelativeAxis(target.x, relative.x, parent.x);
	calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout, parent) {
	target.min = layout.min - parent.min;
	target.max = target.min + calcLength$1(layout);
}
function calcRelativePosition(target, layout, parent) {
	calcRelativeAxisPosition(target.x, layout.x, parent.x);
	calcRelativeAxisPosition(target.y, layout.y, parent.y);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/geometry/delta-remove.mjs
/**
* Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
*/
function removePointDelta(point, translate, scale, originPoint, boxScale) {
	point -= translate;
	point = scalePoint(point, 1 / scale, originPoint);
	if (boxScale !== void 0) point = scalePoint(point, 1 / boxScale, originPoint);
	return point;
}
/**
* Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
*/
function removeAxisDelta(axis, translate = 0, scale = 1, origin = .5, boxScale, originAxis = axis, sourceAxis = axis) {
	if (percent$1.test(translate)) {
		translate = parseFloat(translate);
		translate = mixNumber$1(sourceAxis.min, sourceAxis.max, translate / 100) - sourceAxis.min;
	}
	if (typeof translate !== "number") return;
	let originPoint = mixNumber$1(originAxis.min, originAxis.max, origin);
	if (axis === originAxis) originPoint -= translate;
	axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
	axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
* Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
* and acts as a bridge between motion values and removeAxisDelta
*/
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
	removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
/**
* The names of the motion values we want to apply as translation, scale and origin.
*/
var xKeys = [
	"x",
	"scaleX",
	"originX"
];
var yKeys = [
	"y",
	"scaleY",
	"originY"
];
/**
* Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
* and acts as a bridge between motion values and removeAxisDelta
*/
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
	removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
	removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/geometry/utils.mjs
function isAxisDeltaZero(delta) {
	return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
	return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a, b) {
	return a.min === b.min && a.max === b.max;
}
function boxEquals(a, b) {
	return axisEquals(a.x, b.x) && axisEquals(a.y, b.y);
}
function axisEqualsRounded(a, b) {
	return Math.round(a.min) === Math.round(b.min) && Math.round(a.max) === Math.round(b.max);
}
function boxEqualsRounded(a, b) {
	return axisEqualsRounded(a.x, b.x) && axisEqualsRounded(a.y, b.y);
}
function aspectRatio(box) {
	return calcLength$1(box.x) / calcLength$1(box.y);
}
function axisDeltaEquals(a, b) {
	return a.translate === b.translate && a.scale === b.scale && a.originPoint === b.originPoint;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/shared/stack.mjs
var NodeStack = class {
	constructor() {
		this.members = [];
	}
	add(node) {
		addUniqueItem(this.members, node);
		node.scheduleRender();
	}
	remove(node) {
		removeItem(this.members, node);
		if (node === this.prevLead) this.prevLead = void 0;
		if (node === this.lead) {
			const prevLead = this.members[this.members.length - 1];
			if (prevLead) this.promote(prevLead);
		}
	}
	relegate(node) {
		const indexOfNode = this.members.findIndex((member) => node === member);
		if (indexOfNode === 0) return false;
		/**
		* Find the next projection node that is present
		*/
		let prevLead;
		for (let i = indexOfNode; i >= 0; i--) {
			const member = this.members[i];
			if (member.isPresent !== false) {
				prevLead = member;
				break;
			}
		}
		if (prevLead) {
			this.promote(prevLead);
			return true;
		} else return false;
	}
	promote(node, preserveFollowOpacity) {
		const prevLead = this.lead;
		if (node === prevLead) return;
		this.prevLead = prevLead;
		this.lead = node;
		node.show();
		if (prevLead) {
			prevLead.instance && prevLead.scheduleRender();
			node.scheduleRender();
			node.resumeFrom = prevLead;
			if (preserveFollowOpacity) node.resumeFrom.preserveOpacity = true;
			if (prevLead.snapshot) {
				node.snapshot = prevLead.snapshot;
				node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
			}
			if (node.root && node.root.isUpdating) node.isLayoutDirty = true;
			const { crossfade } = node.options;
			if (crossfade === false) prevLead.hide();
		}
	}
	exitAnimationComplete() {
		this.members.forEach((node) => {
			const { options, resumingFrom } = node;
			options.onExitComplete && options.onExitComplete();
			if (resumingFrom) resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
		});
	}
	scheduleRender() {
		this.members.forEach((node) => {
			node.instance && node.scheduleRender(false);
		});
	}
	/**
	* Clear any leads that have been removed this render to prevent them from being
	* used in future animations and to prevent memory leaks
	*/
	removeLeadSnapshot() {
		if (this.lead && this.lead.snapshot) this.lead.snapshot = void 0;
	}
};
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/styles/transform.mjs
function buildProjectionTransform(delta, treeScale, latestTransform) {
	let transform = "";
	/**
	* The translations we use to calculate are always relative to the viewport coordinate space.
	* But when we apply scales, we also scale the coordinate space of an element and its children.
	* For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
	* to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
	*/
	const xTranslate = delta.x.translate / treeScale.x;
	const yTranslate = delta.y.translate / treeScale.y;
	const zTranslate = latestTransform?.z || 0;
	if (xTranslate || yTranslate || zTranslate) transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
	/**
	* Apply scale correction for the tree transform.
	* This will apply scale to the screen-orientated axes.
	*/
	if (treeScale.x !== 1 || treeScale.y !== 1) transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
	if (latestTransform) {
		const { transformPerspective, rotate, rotateX, rotateY, skewX, skewY } = latestTransform;
		if (transformPerspective) transform = `perspective(${transformPerspective}px) ${transform}`;
		if (rotate) transform += `rotate(${rotate}deg) `;
		if (rotateX) transform += `rotateX(${rotateX}deg) `;
		if (rotateY) transform += `rotateY(${rotateY}deg) `;
		if (skewX) transform += `skewX(${skewX}deg) `;
		if (skewY) transform += `skewY(${skewY}deg) `;
	}
	/**
	* Apply scale to match the size of the element to the size we want it.
	* This will apply scale to the element-orientated axes.
	*/
	const elementScaleX = delta.x.scale * treeScale.x;
	const elementScaleY = delta.y.scale * treeScale.y;
	if (elementScaleX !== 1 || elementScaleY !== 1) transform += `scale(${elementScaleX}, ${elementScaleY})`;
	return transform || "none";
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/utils/each-axis.mjs
function eachAxis$1(callback) {
	return [callback("x"), callback("y")];
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/node/state.mjs
/**
* This should only ever be modified on the client otherwise it'll
* persist through server requests. If we need instanced states we
* could lazy-init via root.
*/
var globalProjectionState$1 = {
	/**
	* Global flag as to whether the tree has animated since the last time
	* we resized the window
	*/
	hasAnimatedSinceResize: true,
	/**
	* We set this to true once, on the first update. Any nodes added to the tree beyond that
	* update will be given a `data-projection-id` attribute.
	*/
	hasEverUpdated: false
};
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/node/create-projection-node.mjs
var metrics = {
	nodes: 0,
	calculatedTargetDeltas: 0,
	calculatedProjections: 0
};
var transformAxes = [
	"",
	"X",
	"Y",
	"Z"
];
/**
* We use 1000 as the animation target as 0-1000 maps better to pixels than 0-1
* which has a noticeable difference in spring animations
*/
var animationTarget = 1e3;
var id = 0;
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
	const { latestValues } = visualElement;
	if (latestValues[key]) {
		values[key] = latestValues[key];
		visualElement.setStaticValue(key, 0);
		if (sharedAnimationValues) sharedAnimationValues[key] = 0;
	}
}
function cancelTreeOptimisedTransformAnimations(projectionNode) {
	projectionNode.hasCheckedOptimisedAppear = true;
	if (projectionNode.root === projectionNode) return;
	const { visualElement } = projectionNode.options;
	if (!visualElement) return;
	const appearId = getOptimisedAppearId(visualElement);
	if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
		const { layout, layoutId } = projectionNode.options;
		window.MotionCancelOptimisedAnimation(appearId, "transform", frame$1, !(layout || layoutId));
	}
	const { parent } = projectionNode;
	if (parent && !parent.hasCheckedOptimisedAppear) cancelTreeOptimisedTransformAnimations(parent);
}
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
	return class ProjectionNode {
		constructor(latestValues = {}, parent = defaultParent?.()) {
			/**
			* A unique ID generated for every projection node.
			*/
			this.id = id++;
			/**
			* An id that represents a unique session instigated by startUpdate.
			*/
			this.animationId = 0;
			this.animationCommitId = 0;
			/**
			* A Set containing all this component's children. This is used to iterate
			* through the children.
			*
			* TODO: This could be faster to iterate as a flat array stored on the root node.
			*/
			this.children = /* @__PURE__ */ new Set();
			/**
			* Options for the node. We use this to configure what kind of layout animations
			* we should perform (if any).
			*/
			this.options = {};
			/**
			* We use this to detect when its safe to shut down part of a projection tree.
			* We have to keep projecting children for scale correction and relative projection
			* until all their parents stop performing layout animations.
			*/
			this.isTreeAnimating = false;
			this.isAnimationBlocked = false;
			/**
			* Flag to true if we think this layout has been changed. We can't always know this,
			* currently we set it to true every time a component renders, or if it has a layoutDependency
			* if that has changed between renders. Additionally, components can be grouped by LayoutGroup
			* and if one node is dirtied, they all are.
			*/
			this.isLayoutDirty = false;
			/**
			* Flag to true if we think the projection calculations for this node needs
			* recalculating as a result of an updated transform or layout animation.
			*/
			this.isProjectionDirty = false;
			/**
			* Flag to true if the layout *or* transform has changed. This then gets propagated
			* throughout the projection tree, forcing any element below to recalculate on the next frame.
			*/
			this.isSharedProjectionDirty = false;
			/**
			* Flag transform dirty. This gets propagated throughout the whole tree but is only
			* respected by shared nodes.
			*/
			this.isTransformDirty = false;
			/**
			* Block layout updates for instant layout transitions throughout the tree.
			*/
			this.updateManuallyBlocked = false;
			this.updateBlockedByResize = false;
			/**
			* Set to true between the start of the first `willUpdate` call and the end of the `didUpdate`
			* call.
			*/
			this.isUpdating = false;
			/**
			* If this is an SVG element we currently disable projection transforms
			*/
			this.isSVG = false;
			/**
			* Flag to true (during promotion) if a node doing an instant layout transition needs to reset
			* its projection styles.
			*/
			this.needsReset = false;
			/**
			* Flags whether this node should have its transform reset prior to measuring.
			*/
			this.shouldResetTransform = false;
			/**
			* Store whether this node has been checked for optimised appear animations. As
			* effects fire bottom-up, and we want to look up the tree for appear animations,
			* this makes sure we only check each path once, stopping at nodes that
			* have already been checked.
			*/
			this.hasCheckedOptimisedAppear = false;
			/**
			* An object representing the calculated contextual/accumulated/tree scale.
			* This will be used to scale calculcated projection transforms, as these are
			* calculated in screen-space but need to be scaled for elements to layoutly
			* make it to their calculated destinations.
			*
			* TODO: Lazy-init
			*/
			this.treeScale = {
				x: 1,
				y: 1
			};
			/**
			*
			*/
			this.eventHandlers = /* @__PURE__ */ new Map();
			this.hasTreeAnimated = false;
			this.updateScheduled = false;
			this.scheduleUpdate = () => this.update();
			this.projectionUpdateScheduled = false;
			this.checkUpdateFailed = () => {
				if (this.isUpdating) {
					this.isUpdating = false;
					this.clearAllSnapshots();
				}
			};
			/**
			* This is a multi-step process as shared nodes might be of different depths. Nodes
			* are sorted by depth order, so we need to resolve the entire tree before moving to
			* the next step.
			*/
			this.updateProjection = () => {
				this.projectionUpdateScheduled = false;
				/**
				* Reset debug counts. Manually resetting rather than creating a new
				* object each frame.
				*/
				if (statsBuffer.value) metrics.nodes = metrics.calculatedTargetDeltas = metrics.calculatedProjections = 0;
				this.nodes.forEach(propagateDirtyNodes);
				this.nodes.forEach(resolveTargetDelta);
				this.nodes.forEach(calcProjection);
				this.nodes.forEach(cleanDirtyNodes);
				if (statsBuffer.addProjectionMetrics) statsBuffer.addProjectionMetrics(metrics);
			};
			/**
			* Frame calculations
			*/
			this.resolvedRelativeTargetAt = 0;
			this.hasProjected = false;
			this.isVisible = true;
			this.animationProgress = 0;
			/**
			* Shared layout
			*/
			this.sharedNodes = /* @__PURE__ */ new Map();
			this.latestValues = latestValues;
			this.root = parent ? parent.root || parent : this;
			this.path = parent ? [...parent.path, parent] : [];
			this.parent = parent;
			this.depth = parent ? parent.depth + 1 : 0;
			for (let i = 0; i < this.path.length; i++) this.path[i].shouldResetTransform = true;
			if (this.root === this) this.nodes = new FlatTree();
		}
		addEventListener(name, handler) {
			if (!this.eventHandlers.has(name)) this.eventHandlers.set(name, new SubscriptionManager());
			return this.eventHandlers.get(name).add(handler);
		}
		notifyListeners(name, ...args) {
			const subscriptionManager = this.eventHandlers.get(name);
			subscriptionManager && subscriptionManager.notify(...args);
		}
		hasListeners(name) {
			return this.eventHandlers.has(name);
		}
		/**
		* Lifecycles
		*/
		mount(instance) {
			if (this.instance) return;
			this.isSVG = isSVGElement(instance) && !isSVGSVGElement(instance);
			this.instance = instance;
			const { layoutId, layout, visualElement } = this.options;
			if (visualElement && !visualElement.current) visualElement.mount(instance);
			this.root.nodes.add(this);
			this.parent && this.parent.children.add(this);
			if (this.root.hasTreeAnimated && (layout || layoutId)) this.isLayoutDirty = true;
			if (attachResizeListener) {
				let cancelDelay;
				let innerWidth = 0;
				const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
				frame$1.read(() => {
					innerWidth = window.innerWidth;
				});
				attachResizeListener(instance, () => {
					const newInnerWidth = window.innerWidth;
					if (newInnerWidth === innerWidth) return;
					innerWidth = newInnerWidth;
					this.root.updateBlockedByResize = true;
					cancelDelay && cancelDelay();
					cancelDelay = delay$1(resizeUnblockUpdate, 250);
					if (globalProjectionState$1.hasAnimatedSinceResize) {
						globalProjectionState$1.hasAnimatedSinceResize = false;
						this.nodes.forEach(finishAnimation);
					}
				});
			}
			if (layoutId) this.root.registerSharedNode(layoutId, this);
			if (this.options.animate !== false && visualElement && (layoutId || layout)) this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout: newLayout }) => {
				if (this.isTreeAnimationBlocked()) {
					this.target = void 0;
					this.relativeTarget = void 0;
					return;
				}
				const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
				const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
				/**
				* The target layout of the element might stay the same,
				* but its position relative to its parent has changed.
				*/
				const hasTargetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout);
				/**
				* If the layout hasn't seemed to have changed, it might be that the
				* element is visually in the same place in the document but its position
				* relative to its parent has indeed changed. So here we check for that.
				*/
				const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeLayoutChanged;
				if (this.options.layoutRoot || this.resumeFrom || hasOnlyRelativeTargetChanged || hasLayoutChanged && (hasTargetChanged || !this.currentAnimation)) {
					if (this.resumeFrom) {
						this.resumingFrom = this.resumeFrom;
						this.resumingFrom.resumingFrom = void 0;
					}
					const animationOptions = {
						...getValueTransition(layoutTransition, "layout"),
						onPlay: onLayoutAnimationStart,
						onComplete: onLayoutAnimationComplete
					};
					if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
						animationOptions.delay = 0;
						animationOptions.type = false;
					}
					this.startAnimation(animationOptions);
					/**
					* Set animation origin after starting animation to avoid layout jump
					* caused by stopping previous layout animation
					*/
					this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
				} else {
					/**
					* If the layout hasn't changed and we have an animation that hasn't started yet,
					* finish it immediately. Otherwise it will be animating from a location
					* that was probably never commited to screen and look like a jumpy box.
					*/
					if (!hasLayoutChanged) finishAnimation(this);
					if (this.isLead() && this.options.onExitComplete) this.options.onExitComplete();
				}
				this.targetLayout = newLayout;
			});
		}
		unmount() {
			this.options.layoutId && this.willUpdate();
			this.root.nodes.remove(this);
			const stack = this.getStack();
			stack && stack.remove(this);
			this.parent && this.parent.children.delete(this);
			this.instance = void 0;
			this.eventHandlers.clear();
			cancelFrame$1(this.updateProjection);
		}
		blockUpdate() {
			this.updateManuallyBlocked = true;
		}
		unblockUpdate() {
			this.updateManuallyBlocked = false;
		}
		isUpdateBlocked() {
			return this.updateManuallyBlocked || this.updateBlockedByResize;
		}
		isTreeAnimationBlocked() {
			return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
		}
		startUpdate() {
			if (this.isUpdateBlocked()) return;
			this.isUpdating = true;
			this.nodes && this.nodes.forEach(resetSkewAndRotation);
			this.animationId++;
		}
		getTransformTemplate() {
			const { visualElement } = this.options;
			return visualElement && visualElement.getProps().transformTemplate;
		}
		willUpdate(shouldNotifyListeners = true) {
			this.root.hasTreeAnimated = true;
			if (this.root.isUpdateBlocked()) {
				this.options.onExitComplete && this.options.onExitComplete();
				return;
			}
			/**
			* If we're running optimised appear animations then these must be
			* cancelled before measuring the DOM. This is so we can measure
			* the true layout of the element rather than the WAAPI animation
			* which will be unaffected by the resetSkewAndRotate step.
			*
			* Note: This is a DOM write. Worst case scenario is this is sandwiched
			* between other snapshot reads which will cause unnecessary style recalculations.
			* This has to happen here though, as we don't yet know which nodes will need
			* snapshots in startUpdate(), but we only want to cancel optimised animations
			* if a layout animation measurement is actually going to be affected by them.
			*/
			if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) cancelTreeOptimisedTransformAnimations(this);
			!this.root.isUpdating && this.root.startUpdate();
			if (this.isLayoutDirty) return;
			this.isLayoutDirty = true;
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				node.shouldResetTransform = true;
				node.updateScroll("snapshot");
				if (node.options.layoutRoot) node.willUpdate(false);
			}
			const { layoutId, layout } = this.options;
			if (layoutId === void 0 && !layout) return;
			const transformTemplate = this.getTransformTemplate();
			this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
			this.updateSnapshot();
			shouldNotifyListeners && this.notifyListeners("willUpdate");
		}
		update() {
			this.updateScheduled = false;
			if (this.isUpdateBlocked()) {
				this.unblockUpdate();
				this.clearAllSnapshots();
				this.nodes.forEach(clearMeasurements);
				return;
			}
			/**
			* If this is a repeat of didUpdate then ignore the animation.
			*/
			if (this.animationId <= this.animationCommitId) {
				this.nodes.forEach(clearIsLayoutDirty);
				return;
			}
			this.animationCommitId = this.animationId;
			if (!this.isUpdating) this.nodes.forEach(clearIsLayoutDirty);
			else {
				this.isUpdating = false;
				/**
				* Write
				*/
				this.nodes.forEach(resetTransformStyle);
				/**
				* Read ==================
				*/
				this.nodes.forEach(updateLayout);
				/**
				* Write
				*/
				this.nodes.forEach(notifyLayoutUpdate);
			}
			this.clearAllSnapshots();
			/**
			* Manually flush any pending updates. Ideally
			* we could leave this to the following requestAnimationFrame but this seems
			* to leave a flash of incorrectly styled content.
			*/
			const now = time.now();
			frameData$1.delta = clamp$1(0, 1e3 / 60, now - frameData$1.timestamp);
			frameData$1.timestamp = now;
			frameData$1.isProcessing = true;
			frameSteps.update.process(frameData$1);
			frameSteps.preRender.process(frameData$1);
			frameSteps.render.process(frameData$1);
			frameData$1.isProcessing = false;
		}
		didUpdate() {
			if (!this.updateScheduled) {
				this.updateScheduled = true;
				microtask.read(this.scheduleUpdate);
			}
		}
		clearAllSnapshots() {
			this.nodes.forEach(clearSnapshot);
			this.sharedNodes.forEach(removeLeadSnapshots);
		}
		scheduleUpdateProjection() {
			if (!this.projectionUpdateScheduled) {
				this.projectionUpdateScheduled = true;
				frame$1.preRender(this.updateProjection, false, true);
			}
		}
		scheduleCheckAfterUnmount() {
			/**
			* If the unmounting node is in a layoutGroup and did trigger a willUpdate,
			* we manually call didUpdate to give a chance to the siblings to animate.
			* Otherwise, cleanup all snapshots to prevents future nodes from reusing them.
			*/
			frame$1.postRender(() => {
				if (this.isLayoutDirty) this.root.didUpdate();
				else this.root.checkUpdateFailed();
			});
		}
		/**
		* Update measurements
		*/
		updateSnapshot() {
			if (this.snapshot || !this.instance) return;
			this.snapshot = this.measure();
			if (this.snapshot && !calcLength$1(this.snapshot.measuredBox.x) && !calcLength$1(this.snapshot.measuredBox.y)) this.snapshot = void 0;
		}
		updateLayout() {
			if (!this.instance) return;
			this.updateScroll();
			if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) return;
			/**
			* When a node is mounted, it simply resumes from the prevLead's
			* snapshot instead of taking a new one, but the ancestors scroll
			* might have updated while the prevLead is unmounted. We need to
			* update the scroll again to make sure the layout we measure is
			* up to date.
			*/
			if (this.resumeFrom && !this.resumeFrom.instance) for (let i = 0; i < this.path.length; i++) this.path[i].updateScroll();
			const prevLayout = this.layout;
			this.layout = this.measure(false);
			this.layoutCorrected = createBox$1();
			this.isLayoutDirty = false;
			this.projectionDelta = void 0;
			this.notifyListeners("measure", this.layout.layoutBox);
			const { visualElement } = this.options;
			visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
		}
		updateScroll(phase = "measure") {
			let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
			if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) needsMeasurement = false;
			if (needsMeasurement && this.instance) {
				const isRoot = checkIsScrollRoot(this.instance);
				this.scroll = {
					animationId: this.root.animationId,
					phase,
					isRoot,
					offset: measureScroll(this.instance),
					wasRoot: this.scroll ? this.scroll.isRoot : isRoot
				};
			}
		}
		resetTransform() {
			if (!resetTransform) return;
			const isResetRequested = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
			const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
			const transformTemplate = this.getTransformTemplate();
			const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
			const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
			if (isResetRequested && this.instance && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
				resetTransform(this.instance, transformTemplateValue);
				this.shouldResetTransform = false;
				this.scheduleRender();
			}
		}
		measure(removeTransform = true) {
			const pageBox = this.measurePageBox();
			let layoutBox = this.removeElementScroll(pageBox);
			/**
			* Measurements taken during the pre-render stage
			* still have transforms applied so we remove them
			* via calculation.
			*/
			if (removeTransform) layoutBox = this.removeTransform(layoutBox);
			roundBox(layoutBox);
			return {
				animationId: this.root.animationId,
				measuredBox: pageBox,
				layoutBox,
				latestValues: {},
				source: this.id
			};
		}
		measurePageBox() {
			const { visualElement } = this.options;
			if (!visualElement) return createBox$1();
			const box = visualElement.measureViewportBox();
			if (!(this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot))) {
				const { scroll } = this.root;
				if (scroll) {
					translateAxis$1(box.x, scroll.offset.x);
					translateAxis$1(box.y, scroll.offset.y);
				}
			}
			return box;
		}
		removeElementScroll(box) {
			const boxWithoutScroll = createBox$1();
			copyBoxInto(boxWithoutScroll, box);
			if (this.scroll?.wasRoot) return boxWithoutScroll;
			/**
			* Performance TODO: Keep a cumulative scroll offset down the tree
			* rather than loop back up the path.
			*/
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				const { scroll, options } = node;
				if (node !== this.root && scroll && options.layoutScroll) {
					/**
					* If this is a new scroll root, we want to remove all previous scrolls
					* from the viewport box.
					*/
					if (scroll.wasRoot) copyBoxInto(boxWithoutScroll, box);
					translateAxis$1(boxWithoutScroll.x, scroll.offset.x);
					translateAxis$1(boxWithoutScroll.y, scroll.offset.y);
				}
			}
			return boxWithoutScroll;
		}
		applyTransform(box, transformOnly = false) {
			const withTransforms = createBox$1();
			copyBoxInto(withTransforms, box);
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) transformBox(withTransforms, {
					x: -node.scroll.offset.x,
					y: -node.scroll.offset.y
				});
				if (!hasTransform(node.latestValues)) continue;
				transformBox(withTransforms, node.latestValues);
			}
			if (hasTransform(this.latestValues)) transformBox(withTransforms, this.latestValues);
			return withTransforms;
		}
		removeTransform(box) {
			const boxWithoutTransform = createBox$1();
			copyBoxInto(boxWithoutTransform, box);
			for (let i = 0; i < this.path.length; i++) {
				const node = this.path[i];
				if (!node.instance) continue;
				if (!hasTransform(node.latestValues)) continue;
				hasScale(node.latestValues) && node.updateSnapshot();
				const sourceBox = createBox$1();
				copyBoxInto(sourceBox, node.measurePageBox());
				removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
			}
			if (hasTransform(this.latestValues)) removeBoxTransforms(boxWithoutTransform, this.latestValues);
			return boxWithoutTransform;
		}
		setTargetDelta(delta) {
			this.targetDelta = delta;
			this.root.scheduleUpdateProjection();
			this.isProjectionDirty = true;
		}
		setOptions(options) {
			this.options = {
				...this.options,
				...options,
				crossfade: options.crossfade !== void 0 ? options.crossfade : true
			};
		}
		clearMeasurements() {
			this.scroll = void 0;
			this.layout = void 0;
			this.snapshot = void 0;
			this.prevTransformTemplateValue = void 0;
			this.targetDelta = void 0;
			this.target = void 0;
			this.isLayoutDirty = false;
		}
		forceRelativeParentToResolveTarget() {
			if (!this.relativeParent) return;
			/**
			* If the parent target isn't up-to-date, force it to update.
			* This is an unfortunate de-optimisation as it means any updating relative
			* projection will cause all the relative parents to recalculate back
			* up the tree.
			*/
			if (this.relativeParent.resolvedRelativeTargetAt !== frameData$1.timestamp) this.relativeParent.resolveTargetDelta(true);
		}
		resolveTargetDelta(forceRecalculation = false) {
			/**
			* Once the dirty status of nodes has been spread through the tree, we also
			* need to check if we have a shared node of a different depth that has itself
			* been dirtied.
			*/
			const lead = this.getLead();
			this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
			this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
			this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
			const isShared = Boolean(this.resumingFrom) || this !== lead;
			if (!(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
			const { layout, layoutId } = this.options;
			/**
			* If we have no layout, we can't perform projection, so early return
			*/
			if (!this.layout || !(layout || layoutId)) return;
			this.resolvedRelativeTargetAt = frameData$1.timestamp;
			/**
			* If we don't have a targetDelta but do have a layout, we can attempt to resolve
			* a relativeParent. This will allow a component to perform scale correction
			* even if no animation has started.
			*/
			if (!this.targetDelta && !this.relativeTarget) {
				const relativeParent = this.getClosestProjectingParent();
				if (relativeParent && relativeParent.layout && this.animationProgress !== 1) {
					this.relativeParent = relativeParent;
					this.forceRelativeParentToResolveTarget();
					this.relativeTarget = createBox$1();
					this.relativeTargetOrigin = createBox$1();
					calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
					copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
				} else this.relativeParent = this.relativeTarget = void 0;
			}
			/**
			* If we have no relative target or no target delta our target isn't valid
			* for this frame.
			*/
			if (!this.relativeTarget && !this.targetDelta) return;
			/**
			* Lazy-init target data structure
			*/
			if (!this.target) {
				this.target = createBox$1();
				this.targetWithTransforms = createBox$1();
			}
			/**
			* If we've got a relative box for this component, resolve it into a target relative to the parent.
			*/
			if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
				this.forceRelativeParentToResolveTarget();
				calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
			} else if (this.targetDelta) {
				if (Boolean(this.resumingFrom)) this.target = this.applyTransform(this.layout.layoutBox);
				else copyBoxInto(this.target, this.layout.layoutBox);
				applyBoxDelta(this.target, this.targetDelta);
			} else
 /**
			* If no target, use own layout as target
			*/
			copyBoxInto(this.target, this.layout.layoutBox);
			/**
			* If we've been told to attempt to resolve a relative target, do so.
			*/
			if (this.attemptToResolveRelativeTarget) {
				this.attemptToResolveRelativeTarget = false;
				const relativeParent = this.getClosestProjectingParent();
				if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
					this.relativeParent = relativeParent;
					this.forceRelativeParentToResolveTarget();
					this.relativeTarget = createBox$1();
					this.relativeTargetOrigin = createBox$1();
					calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
					copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
				} else this.relativeParent = this.relativeTarget = void 0;
			}
			/**
			* Increase debug counter for resolved target deltas
			*/
			if (statsBuffer.value) metrics.calculatedTargetDeltas++;
		}
		getClosestProjectingParent() {
			if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) return;
			if (this.parent.isProjecting()) return this.parent;
			else return this.parent.getClosestProjectingParent();
		}
		isProjecting() {
			return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
		}
		calcProjection() {
			const lead = this.getLead();
			const isShared = Boolean(this.resumingFrom) || this !== lead;
			let canSkip = true;
			/**
			* If this is a normal layout animation and neither this node nor its nearest projecting
			* is dirty then we can't skip.
			*/
			if (this.isProjectionDirty || this.parent?.isProjectionDirty) canSkip = false;
			/**
			* If this is a shared layout animation and this node's shared projection is dirty then
			* we can't skip.
			*/
			if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) canSkip = false;
			/**
			* If we have resolved the target this frame we must recalculate the
			* projection to ensure it visually represents the internal calculations.
			*/
			if (this.resolvedRelativeTargetAt === frameData$1.timestamp) canSkip = false;
			if (canSkip) return;
			const { layout, layoutId } = this.options;
			/**
			* If this section of the tree isn't animating we can
			* delete our target sources for the following frame.
			*/
			this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
			if (!this.isTreeAnimating) this.targetDelta = this.relativeTarget = void 0;
			if (!this.layout || !(layout || layoutId)) return;
			/**
			* Reset the corrected box with the latest values from box, as we're then going
			* to perform mutative operations on it.
			*/
			copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
			/**
			* Record previous tree scales before updating.
			*/
			const prevTreeScaleX = this.treeScale.x;
			const prevTreeScaleY = this.treeScale.y;
			/**
			* Apply all the parent deltas to this box to produce the corrected box. This
			* is the layout box, as it will appear on screen as a result of the transforms of its parents.
			*/
			applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
			/**
			* If this layer needs to perform scale correction but doesn't have a target,
			* use the layout as the target.
			*/
			if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
				lead.target = lead.layout.layoutBox;
				lead.targetWithTransforms = createBox$1();
			}
			const { target } = lead;
			if (!target) {
				/**
				* If we don't have a target to project into, but we were previously
				* projecting, we want to remove the stored transform and schedule
				* a render to ensure the elements reflect the removed transform.
				*/
				if (this.prevProjectionDelta) {
					this.createProjectionDeltas();
					this.scheduleRender();
				}
				return;
			}
			if (!this.projectionDelta || !this.prevProjectionDelta) this.createProjectionDeltas();
			else {
				copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x);
				copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y);
			}
			/**
			* Update the delta between the corrected box and the target box before user-set transforms were applied.
			* This will allow us to calculate the corrected borderRadius and boxShadow to compensate
			* for our layout reprojection, but still allow them to be scaled correctly by the user.
			* It might be that to simplify this we may want to accept that user-set scale is also corrected
			* and we wouldn't have to keep and calc both deltas, OR we could support a user setting
			* to allow people to choose whether these styles are corrected based on just the
			* layout reprojection or the final bounding box.
			*/
			calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
			if (this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) {
				this.hasProjected = true;
				this.scheduleRender();
				this.notifyListeners("projectionUpdate", target);
			}
			/**
			* Increase debug counter for recalculated projections
			*/
			if (statsBuffer.value) metrics.calculatedProjections++;
		}
		hide() {
			this.isVisible = false;
		}
		show() {
			this.isVisible = true;
		}
		scheduleRender(notifyAll = true) {
			this.options.visualElement?.scheduleRender();
			if (notifyAll) {
				const stack = this.getStack();
				stack && stack.scheduleRender();
			}
			if (this.resumingFrom && !this.resumingFrom.instance) this.resumingFrom = void 0;
		}
		createProjectionDeltas() {
			this.prevProjectionDelta = createDelta();
			this.projectionDelta = createDelta();
			this.projectionDeltaWithTransform = createDelta();
		}
		setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
			const snapshot = this.snapshot;
			const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
			const mixedValues = { ...this.latestValues };
			const targetDelta = createDelta();
			if (!this.relativeParent || !this.relativeParent.options.layoutRoot) this.relativeTarget = this.relativeTargetOrigin = void 0;
			this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
			const relativeLayout = createBox$1();
			const isSharedLayoutAnimation = (snapshot ? snapshot.source : void 0) !== (this.layout ? this.layout.source : void 0);
			const stack = this.getStack();
			const isOnlyMember = !stack || stack.members.length <= 1;
			const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
			this.animationProgress = 0;
			let prevRelativeTarget;
			this.mixTargetDelta = (latest) => {
				const progress = latest / 1e3;
				mixAxisDelta(targetDelta.x, delta.x, progress);
				mixAxisDelta(targetDelta.y, delta.y, progress);
				this.setTargetDelta(targetDelta);
				if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
					calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
					mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress);
					/**
					* If this is an unchanged relative target we can consider the
					* projection not dirty.
					*/
					if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) this.isProjectionDirty = false;
					if (!prevRelativeTarget) prevRelativeTarget = createBox$1();
					copyBoxInto(prevRelativeTarget, this.relativeTarget);
				}
				if (isSharedLayoutAnimation) {
					this.animationValues = mixedValues;
					mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress, shouldCrossfadeOpacity, isOnlyMember);
				}
				this.root.scheduleUpdateProjection();
				this.scheduleRender();
				this.animationProgress = progress;
			};
			this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
		}
		startAnimation(options) {
			this.notifyListeners("animationStart");
			this.currentAnimation?.stop();
			this.resumingFrom?.currentAnimation?.stop();
			if (this.pendingAnimation) {
				cancelFrame$1(this.pendingAnimation);
				this.pendingAnimation = void 0;
			}
			/**
			* Start the animation in the next frame to have a frame with progress 0,
			* where the target is the same as when the animation started, so we can
			* calculate the relative positions correctly for instant transitions.
			*/
			this.pendingAnimation = frame$1.update(() => {
				globalProjectionState$1.hasAnimatedSinceResize = true;
				activeAnimations.layout++;
				this.motionValue || (this.motionValue = motionValue$1(0));
				this.currentAnimation = animateSingleValue(this.motionValue, [0, 1e3], {
					...options,
					velocity: 0,
					isSync: true,
					onUpdate: (latest) => {
						this.mixTargetDelta(latest);
						options.onUpdate && options.onUpdate(latest);
					},
					onStop: () => {
						activeAnimations.layout--;
					},
					onComplete: () => {
						activeAnimations.layout--;
						options.onComplete && options.onComplete();
						this.completeAnimation();
					}
				});
				if (this.resumingFrom) this.resumingFrom.currentAnimation = this.currentAnimation;
				this.pendingAnimation = void 0;
			});
		}
		completeAnimation() {
			if (this.resumingFrom) {
				this.resumingFrom.currentAnimation = void 0;
				this.resumingFrom.preserveOpacity = void 0;
			}
			const stack = this.getStack();
			stack && stack.exitAnimationComplete();
			this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
			this.notifyListeners("animationComplete");
		}
		finishAnimation() {
			if (this.currentAnimation) {
				this.mixTargetDelta && this.mixTargetDelta(animationTarget);
				this.currentAnimation.stop();
			}
			this.completeAnimation();
		}
		applyTransformsToTarget() {
			const lead = this.getLead();
			let { targetWithTransforms, target, layout, latestValues } = lead;
			if (!targetWithTransforms || !target || !layout) return;
			/**
			* If we're only animating position, and this element isn't the lead element,
			* then instead of projecting into the lead box we instead want to calculate
			* a new target that aligns the two boxes but maintains the layout shape.
			*/
			if (this !== lead && this.layout && layout && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout.layoutBox)) {
				target = this.target || createBox$1();
				const xLength = calcLength$1(this.layout.layoutBox.x);
				target.x.min = lead.target.x.min;
				target.x.max = target.x.min + xLength;
				const yLength = calcLength$1(this.layout.layoutBox.y);
				target.y.min = lead.target.y.min;
				target.y.max = target.y.min + yLength;
			}
			copyBoxInto(targetWithTransforms, target);
			/**
			* Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
			* This is the final box that we will then project into by calculating a transform delta and
			* applying it to the corrected box.
			*/
			transformBox(targetWithTransforms, latestValues);
			/**
			* Update the delta between the corrected box and the final target box, after
			* user-set transforms are applied to it. This will be used by the renderer to
			* create a transform style that will reproject the element from its layout layout
			* into the desired bounding box.
			*/
			calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
		}
		registerSharedNode(layoutId, node) {
			if (!this.sharedNodes.has(layoutId)) this.sharedNodes.set(layoutId, new NodeStack());
			this.sharedNodes.get(layoutId).add(node);
			const config = node.options.initialPromotionConfig;
			node.promote({
				transition: config ? config.transition : void 0,
				preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
			});
		}
		isLead() {
			const stack = this.getStack();
			return stack ? stack.lead === this : true;
		}
		getLead() {
			const { layoutId } = this.options;
			return layoutId ? this.getStack()?.lead || this : this;
		}
		getPrevLead() {
			const { layoutId } = this.options;
			return layoutId ? this.getStack()?.prevLead : void 0;
		}
		getStack() {
			const { layoutId } = this.options;
			if (layoutId) return this.root.sharedNodes.get(layoutId);
		}
		promote({ needsReset, transition, preserveFollowOpacity } = {}) {
			const stack = this.getStack();
			if (stack) stack.promote(this, preserveFollowOpacity);
			if (needsReset) {
				this.projectionDelta = void 0;
				this.needsReset = true;
			}
			if (transition) this.setOptions({ transition });
		}
		relegate() {
			const stack = this.getStack();
			if (stack) return stack.relegate(this);
			else return false;
		}
		resetSkewAndRotation() {
			const { visualElement } = this.options;
			if (!visualElement) return;
			let hasDistortingTransform = false;
			/**
			* An unrolled check for rotation values. Most elements don't have any rotation and
			* skipping the nested loop and new object creation is 50% faster.
			*/
			const { latestValues } = visualElement;
			if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) hasDistortingTransform = true;
			if (!hasDistortingTransform) return;
			const resetValues = {};
			if (latestValues.z) resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
			for (let i = 0; i < transformAxes.length; i++) {
				resetDistortingTransform(`rotate${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
				resetDistortingTransform(`skew${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
			}
			visualElement.render();
			for (const key in resetValues) {
				visualElement.setStaticValue(key, resetValues[key]);
				if (this.animationValues) this.animationValues[key] = resetValues[key];
			}
			visualElement.scheduleRender();
		}
		applyProjectionStyles(targetStyle, styleProp) {
			if (!this.instance || this.isSVG) return;
			if (!this.isVisible) {
				targetStyle.visibility = "hidden";
				return;
			}
			const transformTemplate = this.getTransformTemplate();
			if (this.needsReset) {
				this.needsReset = false;
				targetStyle.visibility = "";
				targetStyle.opacity = "";
				targetStyle.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
				targetStyle.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
				return;
			}
			const lead = this.getLead();
			if (!this.projectionDelta || !this.layout || !lead.target) {
				if (this.options.layoutId) {
					targetStyle.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
					targetStyle.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
				}
				if (this.hasProjected && !hasTransform(this.latestValues)) {
					targetStyle.transform = transformTemplate ? transformTemplate({}, "") : "none";
					this.hasProjected = false;
				}
				return;
			}
			targetStyle.visibility = "";
			const valuesToRender = lead.animationValues || lead.latestValues;
			this.applyTransformsToTarget();
			let transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
			if (transformTemplate) transform = transformTemplate(valuesToRender, transform);
			targetStyle.transform = transform;
			const { x, y } = this.projectionDelta;
			targetStyle.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
			if (lead.animationValues)
 /**
			* If the lead component is animating, assign this either the entering/leaving
			* opacity
			*/
			targetStyle.opacity = lead === this ? valuesToRender.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
			else
 /**
			* Or we're not animating at all, set the lead component to its layout
			* opacity and other components to hidden.
			*/
			targetStyle.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
			/**
			* Apply scale correction
			*/
			for (const key in scaleCorrectors$1) {
				if (valuesToRender[key] === void 0) continue;
				const { correct, applyTo, isCSSVariable } = scaleCorrectors$1[key];
				/**
				* Only apply scale correction to the value if we have an
				* active projection transform. Otherwise these values become
				* vulnerable to distortion if the element changes size without
				* a corresponding layout animation.
				*/
				const corrected = transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
				if (applyTo) {
					const num = applyTo.length;
					for (let i = 0; i < num; i++) targetStyle[applyTo[i]] = corrected;
				} else if (isCSSVariable) this.options.visualElement.renderState.vars[key] = corrected;
				else targetStyle[key] = corrected;
			}
			/**
			* Disable pointer events on follow components. This is to ensure
			* that if a follow component covers a lead component it doesn't block
			* pointer events on the lead.
			*/
			if (this.options.layoutId) targetStyle.pointerEvents = lead === this ? resolveMotionValue(styleProp?.pointerEvents) || "" : "none";
		}
		clearSnapshot() {
			this.resumeFrom = this.snapshot = void 0;
		}
		resetTree() {
			this.root.nodes.forEach((node) => node.currentAnimation?.stop());
			this.root.nodes.forEach(clearMeasurements);
			this.root.sharedNodes.clear();
		}
	};
}
function updateLayout(node) {
	node.updateLayout();
}
function notifyLayoutUpdate(node) {
	const snapshot = node.resumeFrom?.snapshot || node.snapshot;
	if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
		const { layoutBox: layout, measuredBox: measuredLayout } = node.layout;
		const { animationType } = node.options;
		const isShared = snapshot.source !== node.layout.source;
		if (animationType === "size") eachAxis$1((axis) => {
			const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
			const length = calcLength$1(axisSnapshot);
			axisSnapshot.min = layout[axis].min;
			axisSnapshot.max = axisSnapshot.min + length;
		});
		else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout)) eachAxis$1((axis) => {
			const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
			const length = calcLength$1(layout[axis]);
			axisSnapshot.max = axisSnapshot.min + length;
			/**
			* Ensure relative target gets resized and rerendererd
			*/
			if (node.relativeTarget && !node.currentAnimation) {
				node.isProjectionDirty = true;
				node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
			}
		});
		const layoutDelta = createDelta();
		calcBoxDelta(layoutDelta, layout, snapshot.layoutBox);
		const visualDelta = createDelta();
		if (isShared) calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
		else calcBoxDelta(visualDelta, layout, snapshot.layoutBox);
		const hasLayoutChanged = !isDeltaZero(layoutDelta);
		let hasRelativeLayoutChanged = false;
		if (!node.resumeFrom) {
			const relativeParent = node.getClosestProjectingParent();
			/**
			* If the relativeParent is itself resuming from a different element then
			* the relative snapshot is not relavent
			*/
			if (relativeParent && !relativeParent.resumeFrom) {
				const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
				if (parentSnapshot && parentLayout) {
					const relativeSnapshot = createBox$1();
					calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
					const relativeLayout = createBox$1();
					calcRelativePosition(relativeLayout, layout, parentLayout.layoutBox);
					if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) hasRelativeLayoutChanged = true;
					if (relativeParent.options.layoutRoot) {
						node.relativeTarget = relativeLayout;
						node.relativeTargetOrigin = relativeSnapshot;
						node.relativeParent = relativeParent;
					}
				}
			}
		}
		node.notifyListeners("didUpdate", {
			layout,
			snapshot,
			delta: visualDelta,
			layoutDelta,
			hasLayoutChanged,
			hasRelativeLayoutChanged
		});
	} else if (node.isLead()) {
		const { onExitComplete } = node.options;
		onExitComplete && onExitComplete();
	}
	/**
	* Clearing transition
	* TODO: Investigate why this transition is being passed in as {type: false } from Framer
	* and why we need it at all
	*/
	node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
	/**
	* Increase debug counter for nodes encountered this frame
	*/
	if (statsBuffer.value) metrics.nodes++;
	if (!node.parent) return;
	/**
	* If this node isn't projecting, propagate isProjectionDirty. It will have
	* no performance impact but it will allow the next child that *is* projecting
	* but *isn't* dirty to just check its parent to see if *any* ancestor needs
	* correcting.
	*/
	if (!node.isProjecting()) node.isProjectionDirty = node.parent.isProjectionDirty;
	/**
	* Propagate isSharedProjectionDirty and isTransformDirty
	* throughout the whole tree. A future revision can take another look at
	* this but for safety we still recalcualte shared nodes.
	*/
	node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
	node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
	node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot(node) {
	node.clearSnapshot();
}
function clearMeasurements(node) {
	node.clearMeasurements();
}
function clearIsLayoutDirty(node) {
	node.isLayoutDirty = false;
}
function resetTransformStyle(node) {
	const { visualElement } = node.options;
	if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) visualElement.notify("BeforeLayoutMeasure");
	node.resetTransform();
}
function finishAnimation(node) {
	node.finishAnimation();
	node.targetDelta = node.relativeTarget = node.target = void 0;
	node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
	node.resolveTargetDelta();
}
function calcProjection(node) {
	node.calcProjection();
}
function resetSkewAndRotation(node) {
	node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
	stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p) {
	output.translate = mixNumber$1(delta.translate, 0, p);
	output.scale = mixNumber$1(delta.scale, 1, p);
	output.origin = delta.origin;
	output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
	output.min = mixNumber$1(from.min, to.min, p);
	output.max = mixNumber$1(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
	mixAxis(output.x, from.x, to.x, p);
	mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
	return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
	duration: .45,
	ease: [
		.4,
		0,
		.1,
		1
	]
};
var userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
/**
* Measured bounding boxes must be rounded in Safari and
* left untouched in Chrome, otherwise non-integer layouts within scaled-up elements
* can appear to jump.
*/
var roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop$1;
function roundAxis(axis) {
	axis.min = roundPoint(axis.min);
	axis.max = roundPoint(axis.max);
}
function roundBox(box) {
	roundAxis(box.x);
	roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout) {
	return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout), .2);
}
function checkNodeWasScrollRoot(node) {
	return node !== node.root && node.scroll?.wasRoot;
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/events/add-dom-event.mjs
function addDomEvent(target, eventName, handler, options = { passive: true }) {
	target.addEventListener(eventName, handler, options);
	return () => target.removeEventListener(eventName, handler);
}
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs
var DocumentProjectionNode = createProjectionNode({
	attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
	measureScroll: () => ({
		x: document.documentElement.scrollLeft || document.body.scrollLeft,
		y: document.documentElement.scrollTop || document.body.scrollTop
	}),
	checkIsScrollRoot: () => true
});
//#endregion
//#region node_modules/motion-sv/dist/vendor/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode = { current: void 0 };
var HTMLProjectionNode = createProjectionNode({
	measureScroll: (instance) => ({
		x: instance.scrollLeft,
		y: instance.scrollTop
	}),
	defaultParent: () => {
		if (!rootProjectionNode.current) {
			const documentNode = new DocumentProjectionNode({});
			documentNode.mount(window);
			documentNode.setOptions({ layoutScroll: true });
			rootProjectionNode.current = documentNode;
		}
		return rootProjectionNode.current;
	},
	resetTransform: (instance, value) => {
		instance.style.transform = value !== void 0 ? value : "none";
	},
	checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});
//#endregion
//#region node_modules/motion-sv/dist/features/layout/utils.js
function getClosestProjectingNode(visualElement) {
	if (!visualElement) return void 0;
	return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}
//#endregion
//#region node_modules/motion-sv/dist/projection/styles/scale-border-radius.js
function pixelsToPercent(pixels, axis) {
	if (axis.max === axis.min) return 0;
	return pixels / (axis.max - axis.min) * 100;
}
/**
* We always correct borderRadius as a percentage rather than pixels to reduce paints.
* For example, if you are projecting a box that is 100px wide with a 10px borderRadius
* into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
* borderRadius in both states. If we animate between the two in pixels that will trigger
* a paint each time. If we animate between the two in percentage we'll avoid a paint.
*/
var correctBorderRadius = { correct: (latest, node) => {
	if (!node.target) return latest;
	/**
	* If latest is a string, if it's a percentage we can return immediately as it's
	* going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
	*/
	if (typeof latest === "string") if (px.test(latest)) latest = parseFloat(latest);
	else return latest;
	return `${pixelsToPercent(latest, node.target.x)}% ${pixelsToPercent(latest, node.target.y)}%`;
} };
//#endregion
//#region node_modules/motion-sv/dist/projection/styles/scale-box-shadow.js
var correctBoxShadow = { correct: (latest, { treeScale, projectionDelta }) => {
	const original = latest;
	const shadow = complex.parse(latest);
	if (shadow.length > 5) return original;
	const template = complex.createTransformer(latest);
	const offset = typeof shadow[0] !== "number" ? 1 : 0;
	const xScale = projectionDelta.x.scale * treeScale.x;
	const yScale = projectionDelta.y.scale * treeScale.y;
	shadow[0 + offset] /= xScale;
	shadow[1 + offset] /= yScale;
	/**
	* Ideally we'd correct x and y scales individually, but because blur and
	* spread apply to both we have to take a scale average and apply that instead.
	* We could potentially improve the outcome of this by incorporating the ratio between
	* the two scales.
	*/
	const averageScale = mixNumber(xScale, yScale, .5);
	if (typeof shadow[2 + offset] === "number") shadow[2 + offset] /= averageScale;
	if (typeof shadow[3 + offset] === "number") shadow[3 + offset] /= averageScale;
	return template(shadow);
} };
//#endregion
//#region node_modules/motion-sv/dist/features/layout/config.js
var defaultScaleCorrector = {
	borderRadius: {
		...correctBorderRadius,
		applyTo: [
			"borderTopLeftRadius",
			"borderTopRightRadius",
			"borderBottomLeftRadius",
			"borderBottomRightRadius"
		]
	},
	borderTopLeftRadius: correctBorderRadius,
	borderTopRightRadius: correctBorderRadius,
	borderBottomLeftRadius: correctBorderRadius,
	borderBottomRightRadius: correctBorderRadius,
	boxShadow: correctBoxShadow
};
//#endregion
//#region node_modules/motion-sv/dist/features/gestures/drag/utils/is.js
function isHTMLElement(value) {
	return typeof value === "object" && value !== null && "nodeType" in value;
}
//#endregion
//#region node_modules/motion-sv/dist/features/layout/projection.js
var ProjectionFeature = class extends Feature {
	constructor(state) {
		super(state);
		addScaleCorrector$1(defaultScaleCorrector);
	}
	initProjection() {
		const options = this.state.options;
		this.state.visualElement.projection = new HTMLProjectionNode(this.state.visualElement.latestValues, options["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(this.state.visualElement.parent));
		this.state.visualElement.projection.isPresent = true;
		this.setOptions();
	}
	beforeMount() {
		this.initProjection();
	}
	setOptions() {
		const options = this.state.options;
		this.state.visualElement.projection.setOptions({
			layout: options.layout,
			layoutId: options.layoutId,
			alwaysMeasureLayout: Boolean(options.drag) || options.dragConstraints && isHTMLElement(options.dragConstraints),
			visualElement: this.state.visualElement,
			animationType: typeof options.layout === "string" ? options.layout : "both",
			layoutRoot: options.layoutRoot,
			layoutScroll: options.layoutScroll,
			crossfade: options.crossfade,
			onExitComplete: () => {
				if (!this.state.visualElement.projection?.isPresent) {
					const done = doneCallbacks.get(this.state.element);
					this.state.isSafeToRemove = true;
					if (done) done({ detail: { isExit: true } }, true);
				}
			}
		});
	}
	update() {
		this.setOptions();
	}
	mount() {
		this.state.visualElement.projection?.mount(this.state.element);
	}
};
//#endregion
//#region node_modules/motion-sv/dist/features/gestures/drag/lock.js
function createLock(name) {
	let lock = null;
	return () => {
		const openLock = () => {
			lock = null;
		};
		if (lock === null) {
			lock = name;
			return openLock;
		}
		return false;
	};
}
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag) {
	let lock = false;
	if (drag === "y") lock = globalVerticalLock();
	else if (drag === "x") lock = globalHorizontalLock();
	else {
		const openHorizontal = globalHorizontalLock();
		const openVertical = globalVerticalLock();
		if (openHorizontal && openVertical) lock = () => {
			openHorizontal();
			openVertical();
		};
		else {
			if (openHorizontal) openHorizontal();
			if (openVertical) openVertical();
		}
	}
	return lock;
}
//#endregion
//#region node_modules/motion-sv/dist/projection/geometry/delta-calc.js
function calcLength(axis) {
	return axis.max - axis.min;
}
//#endregion
//#region node_modules/motion-sv/dist/features/gestures/drag/utils/constraints.js
/**
* Apply constraints to a point. These constraints are both physical along an
* axis, and an elastic factor that determines how much to constrain the point
* by if it does lie outside the defined parameters.
*/
function applyConstraints(point, { min, max }, elastic) {
	if (min !== void 0 && point < min) point = elastic ? mixNumber(min, point, elastic.min) : Math.max(point, min);
	else if (max !== void 0 && point > max) point = elastic ? mixNumber(max, point, elastic.max) : Math.min(point, max);
	return point;
}
var defaultElastic = .35;
/**
* Calculate constraints in terms of the viewport when
* defined relatively to the measured bounding box.
*/
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
	return {
		x: calcRelativeAxisConstraints(layoutBox.x, left, right),
		y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
	};
}
/**
* Calculate constraints in terms of the viewport when defined relatively to the
* measured axis. This is measured from the nearest edge, so a max constraint of 200
* on an axis with a max value of 300 would return a constraint of 500 - axis length
*/
function calcRelativeAxisConstraints(axis, min, max) {
	return {
		min: min !== void 0 ? axis.min + min : void 0,
		max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
	};
}
/**
* Accepts a dragElastic prop and returns resolved elastic values for each axis.
*/
function resolveDragElastic(dragElastic = defaultElastic) {
	if (dragElastic === false) dragElastic = 0;
	else if (dragElastic === true) dragElastic = defaultElastic;
	return {
		x: resolveAxisElastic(dragElastic, "left", "right"),
		y: resolveAxisElastic(dragElastic, "top", "bottom")
	};
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
	return {
		min: resolvePointElastic(dragElastic, minLabel),
		max: resolvePointElastic(dragElastic, maxLabel)
	};
}
function resolvePointElastic(dragElastic, label) {
	return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}
/**
* Rebase the calculated viewport constraints relative to the layout.min point.
*/
function rebaseAxisConstraints(layout, constraints) {
	const relativeConstraints = {};
	if (constraints.min !== void 0) relativeConstraints.min = constraints.min - layout.min;
	if (constraints.max !== void 0) relativeConstraints.max = constraints.max - layout.min;
	return relativeConstraints;
}
/**
* Calculate viewport constraints when defined as another viewport-relative box
*/
function calcViewportConstraints(layoutBox, constraintsBox) {
	return {
		x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
		y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
	};
}
/**
* Calculate viewport constraints when defined as another viewport-relative axis
*/
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
	let min = constraintsAxis.min - layoutAxis.min;
	let max = constraintsAxis.max - layoutAxis.max;
	if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) [min, max] = [max, min];
	return {
		min,
		max
	};
}
/**
* Calculate a transform origin relative to the source axis, between 0-1, that results
* in an asthetically pleasing scale/transform needed to project from source to target.
*/
function calcOrigin(source, target) {
	let origin = .5;
	const sourceLength = calcLength(source);
	const targetLength = calcLength(target);
	if (targetLength > sourceLength) origin = progress(target.min, target.max - sourceLength, source.min);
	else if (sourceLength > targetLength) origin = progress(source.min, source.max - targetLength, target.min);
	return clamp(0, 1, origin);
}
//#endregion
//#region node_modules/motion-sv/dist/features/gestures/pan/PanSession.js
/**
* @internal
*/
var PanSession = class {
	/**
	* @internal
	*/
	history;
	/**
	* @internal
	*/
	startEvent = null;
	/**
	* @internal
	*/
	lastMoveEvent = null;
	/**
	* @internal
	*/
	lastMoveEventInfo = null;
	/**
	* @internal
	*/
	transformPagePoint;
	/**
	* @internal
	*/
	handlers = {};
	/**
	* @internal
	*/
	removeListeners;
	/**
	* For determining if an animation should resume after it is interupted
	*
	* @internal
	*/
	dragSnapToOrigin;
	/**
	* @internal
	*/
	contextWindow = window;
	constructor(event, handlers, { transformPagePoint, contextWindow, dragSnapToOrigin = false } = {}) {
		if (!isPrimaryPointer(event)) return;
		this.dragSnapToOrigin = dragSnapToOrigin;
		this.handlers = handlers;
		this.transformPagePoint = transformPagePoint;
		this.contextWindow = contextWindow || window;
		const initialInfo = transformPoint(extractEventInfo(event), this.transformPagePoint);
		const { point } = initialInfo;
		const { timestamp } = frameData;
		this.history = [{
			...point,
			timestamp
		}];
		const { onSessionStart } = handlers;
		onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
		this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
	}
	updatePoint = () => {
		if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
		const info = getPanInfo(this.lastMoveEventInfo, this.history);
		const isPanStarted = this.startEvent !== null;
		const isDistancePastThreshold = distance2D(info.offset, {
			x: 0,
			y: 0
		}) >= 3;
		if (!isPanStarted && !isDistancePastThreshold) return;
		const { point } = info;
		const { timestamp } = frameData;
		this.history.push({
			...point,
			timestamp
		});
		const { onStart, onMove } = this.handlers;
		if (!isPanStarted) {
			onStart && onStart(this.lastMoveEvent, info);
			this.startEvent = this.lastMoveEvent;
		}
		onMove && onMove(this.lastMoveEvent, info);
	};
	handlePointerMove = (event, info) => {
		this.lastMoveEvent = event;
		this.lastMoveEventInfo = transformPoint(info, this.transformPagePoint);
		frame.update(this.updatePoint, true);
	};
	handlePointerUp = (event, info) => {
		this.end();
		const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
		if (this.dragSnapToOrigin) resumeAnimation && resumeAnimation();
		if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
		const panInfo = getPanInfo(event.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info, this.transformPagePoint), this.history);
		if (this.startEvent && onEnd) onEnd(event, panInfo);
		onSessionEnd && onSessionEnd(event, panInfo);
	};
	updateHandlers(handlers) {
		this.handlers = handlers;
	}
	end() {
		this.removeListeners && this.removeListeners();
		cancelFrame(this.updatePoint);
	}
};
function transformPoint(info, transformPagePoint) {
	return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}
function getPanInfo({ point }, history) {
	return {
		point,
		delta: subtractPoint(point, lastDevicePoint(history)),
		offset: subtractPoint(point, startDevicePoint(history)),
		velocity: getVelocity(history, .1)
	};
}
function startDevicePoint(history) {
	return history[0];
}
function lastDevicePoint(history) {
	return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
	if (history.length < 2) return {
		x: 0,
		y: 0
	};
	let i = history.length - 1;
	let timestampedPoint = null;
	const lastPoint = lastDevicePoint(history);
	while (i >= 0) {
		timestampedPoint = history[i];
		if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) break;
		i--;
	}
	if (!timestampedPoint) return {
		x: 0,
		y: 0
	};
	const time = millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
	if (time === 0) return {
		x: 0,
		y: 0
	};
	const currentVelocity = {
		x: (lastPoint.x - timestampedPoint.x) / time,
		y: (lastPoint.y - timestampedPoint.y) / time
	};
	if (currentVelocity.x === Infinity) currentVelocity.x = 0;
	if (currentVelocity.y === Infinity) currentVelocity.y = 0;
	return currentVelocity;
}
//#endregion
//#region node_modules/motion-sv/dist/projection/geometry/models.js
var createAxis = () => ({
	min: 0,
	max: 0
});
function createBox() {
	return {
		x: createAxis(),
		y: createAxis()
	};
}
//#endregion
//#region node_modules/motion-sv/dist/projection/utils/each-axis.js
function eachAxis(callback) {
	return [callback("x"), callback("y")];
}
//#endregion
//#region node_modules/motion-sv/dist/utils/get-context-window.js
function getContextWindow({ current }) {
	return current ? current.ownerDocument.defaultView : null;
}
//#endregion
//#region node_modules/motion-sv/dist/value/use-will-change/is.js
function isWillChangeMotionValue(value) {
	return Boolean(isMotionValue(value) && value.add);
}
//#endregion
//#region node_modules/motion-sv/dist/value/use-will-change/add-will-change.js
function addValueToWillChange(visualElement, key) {
	const willChange = visualElement.getValue("willChange");
	/**
	* It could be that a user has set willChange to a regular MotionValue,
	* in which case we can't add the value to it.
	*/
	if (isWillChangeMotionValue(willChange)) return willChange.add(key);
}
//#endregion
//#region node_modules/motion-sv/dist/projection/conversion.js
/**
* Bounding boxes tend to be defined as top, left, right, bottom. For various operations
* it's easier to consider each axis individually. This function returns a bounding box
* as a map of single-axis min/max values.
*/
function convertBoundingBoxToBox({ top, left, right, bottom }) {
	return {
		x: {
			min: left,
			max: right
		},
		y: {
			min: top,
			max: bottom
		}
	};
}
/**
* Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
* provided by Framer to allow measured points to be corrected for device scaling. This is used
* when measuring DOM elements and DOM event points.
*/
function transformBoxPoints(point, transformPoint) {
	if (!transformPoint) return point;
	const topLeft = transformPoint({
		x: point.left,
		y: point.top
	});
	const bottomRight = transformPoint({
		x: point.right,
		y: point.bottom
	});
	return {
		top: topLeft.y,
		left: topLeft.x,
		bottom: bottomRight.y,
		right: bottomRight.x
	};
}
function convertBoxToBoundingBox({ x, y }) {
	return {
		top: y.min,
		right: x.max,
		bottom: y.max,
		left: x.min
	};
}
//#endregion
//#region node_modules/motion-sv/dist/projection/geometry/delta-apply.js
function translateAxis(axis, distance) {
	axis.min = axis.min + distance;
	axis.max = axis.max + distance;
}
//#endregion
//#region node_modules/motion-sv/dist/projection/utils/measure.js
function measureViewportBox(instance, transformPoint) {
	return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint));
}
function measurePageBox(element, rootProjectionNode, transformPagePoint) {
	const viewportBox = measureViewportBox(element, transformPagePoint);
	const { scroll } = rootProjectionNode;
	if (scroll) {
		translateAxis(viewportBox.x, scroll.offset.x);
		translateAxis(viewportBox.y, scroll.offset.y);
	}
	return viewportBox;
}
//#endregion
//#region node_modules/motion-sv/dist/state/utils/is-present.js
function isPresent(visualElement) {
	return !doneCallbacks.has(visualElement.current);
}
//#endregion
//#region node_modules/motion-sv/dist/features/gestures/drag/VisualElementDragControls.js
var elementDragControls = /* @__PURE__ */ new WeakMap();
/**
*
*/
var VisualElementDragControls = class {
	visualElement;
	panSession;
	openGlobalLock = null;
	isDragging = false;
	currentDirection = null;
	originPoint = {
		x: 0,
		y: 0
	};
	/**
	* The permitted boundaries of travel, in pixels.
	*/
	constraints = false;
	hasMutatedConstraints = false;
	/**
	* The per-axis resolved elastic values.
	*/
	elastic = createBox();
	constructor(visualElement) {
		this.visualElement = visualElement;
	}
	start(originEvent, { snapToCursor = false } = {}) {
		/**
		* Don't start dragging if this component is exiting
		*/
		if (!isPresent(this.visualElement)) return;
		const onSessionStart = (event) => {
			const { dragSnapToOrigin } = this.getProps();
			dragSnapToOrigin ? this.pauseAnimation() : this.stopAnimation();
			if (snapToCursor) this.snapToCursor(extractEventInfo(event, "page").point);
		};
		const onStart = (event, info) => {
			const { drag, dragPropagation, onDragStart } = this.getProps();
			if (drag && !dragPropagation) {
				if (this.openGlobalLock) this.openGlobalLock();
				this.openGlobalLock = getGlobalLock(drag);
				if (!this.openGlobalLock) return;
			}
			this.isDragging = true;
			this.currentDirection = null;
			this.resolveConstraints();
			if (this.visualElement.projection) {
				this.visualElement.projection.isAnimationBlocked = true;
				this.visualElement.projection.target = void 0;
			}
			/**
			* Record gesture origin
			*/
			eachAxis((axis) => {
				let current = this.getAxisMotionValue(axis).get() || 0;
				/**
				* If the MotionValue is a percentage value convert to px
				*/
				if (percent.test(current)) {
					const { projection } = this.visualElement;
					if (projection && projection.layout) {
						const measuredAxis = projection.layout.layoutBox[axis];
						if (measuredAxis) current = calcLength(measuredAxis) * (parseFloat(current) / 100);
					}
				}
				this.originPoint[axis] = current;
			});
			if (onDragStart) frame.postRender(() => onDragStart(event, info));
			addValueToWillChange(this.visualElement, "transform");
			this.visualElement.state.setActive("whileDrag", true);
		};
		const onMove = (event, info) => {
			const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
			if (!dragPropagation && !this.openGlobalLock) return;
			const { offset } = info;
			if (dragDirectionLock && this.currentDirection === null) {
				this.currentDirection = getCurrentDirection(offset);
				if (this.currentDirection !== null) onDirectionLock && onDirectionLock(this.currentDirection);
				return;
			}
			this.updateAxis("x", info.point, offset);
			this.updateAxis("y", info.point, offset);
			/**
			* Ideally we would leave the renderer to fire naturally at the end of
			* this frame but if the element is about to change layout as the result
			* of a re-render we want to ensure the browser can read the latest
			* bounding box to ensure the pointer and element don't fall out of sync.
			*/
			this.visualElement.render();
			/**
			* This must fire after the render call as it might trigger a state
			* change which itself might trigger a layout update.
			*/
			onDrag && onDrag(event, info);
		};
		const onSessionEnd = (event, info) => this.stop(event, info);
		const resumeAnimation = () => eachAxis((axis) => this.getAnimationState(axis) === "paused" && this.getAxisMotionValue(axis).animation?.play());
		const { dragSnapToOrigin } = this.getProps();
		this.panSession = new PanSession(originEvent, {
			onSessionStart,
			onStart,
			onMove,
			onSessionEnd,
			resumeAnimation
		}, {
			transformPagePoint: this.visualElement.getTransformPagePoint(),
			dragSnapToOrigin,
			contextWindow: getContextWindow(this.visualElement)
		});
	}
	stop(event, info) {
		const isDragging = this.isDragging;
		this.cancel();
		if (!isDragging) return;
		const { velocity } = info;
		this.startAnimation(velocity);
		const { onDragEnd } = this.getProps();
		if (onDragEnd) frame.postRender(() => onDragEnd(event, info));
	}
	cancel() {
		this.isDragging = false;
		const { projection, animationState } = this.visualElement;
		if (projection) projection.isAnimationBlocked = false;
		this.panSession && this.panSession.end();
		this.panSession = void 0;
		const { dragPropagation } = this.getProps();
		if (!dragPropagation && this.openGlobalLock) {
			this.openGlobalLock();
			this.openGlobalLock = null;
		}
		this.visualElement.state.setActive("whileDrag", false);
	}
	updateAxis(axis, _point, offset) {
		const { drag } = this.getProps();
		if (!offset || !shouldDrag(axis, drag, this.currentDirection)) return;
		const axisValue = this.getAxisMotionValue(axis);
		let next = this.originPoint[axis] + offset[axis];
		if (this.constraints && this.constraints[axis]) next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
		axisValue.set(next);
	}
	resolveConstraints() {
		const { dragConstraints, dragElastic } = this.getProps();
		const layout = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout;
		const prevConstraints = this.constraints;
		if (dragConstraints && isHTMLElement(dragConstraints)) {
			if (!this.constraints) this.constraints = this.resolveRefConstraints();
		} else if (dragConstraints && layout) this.constraints = calcRelativeConstraints(layout.layoutBox, dragConstraints);
		else this.constraints = false;
		this.elastic = resolveDragElastic(dragElastic);
		/**
		* If we're outputting to external MotionValues, we want to rebase the measured constraints
		* from viewport-relative to component-relative.
		*/
		if (prevConstraints !== this.constraints && layout && this.constraints && !this.hasMutatedConstraints) eachAxis((axis) => {
			if (this.constraints !== false && this.getAxisMotionValue(axis)) this.constraints[axis] = rebaseAxisConstraints(layout.layoutBox[axis], this.constraints[axis]);
		});
	}
	resolveRefConstraints() {
		const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
		if (!constraints || !isHTMLElement(constraints)) return false;
		const constraintsElement = constraints;
		invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
		const { projection } = this.visualElement;
		if (!projection || !projection.layout) return false;
		const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
		let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
		/**
		* If there's an onMeasureDragConstraints listener we call it and
		* if different constraints are returned, set constraints to that
		*/
		if (onMeasureDragConstraints) {
			const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
			this.hasMutatedConstraints = !!userConstraints;
			if (userConstraints) measuredConstraints = convertBoundingBoxToBox(userConstraints);
		}
		return measuredConstraints;
	}
	startAnimation(velocity) {
		const { drag, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
		const constraints = this.constraints || {};
		const momentumAnimations = eachAxis((axis) => {
			if (!shouldDrag(axis, drag, this.currentDirection)) return;
			let transition = constraints && constraints[axis] || {};
			if (dragSnapToOrigin) transition = {
				min: 0,
				max: 0
			};
			/**
			* Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
			* of spring animations so we should look into adding a disable spring option to `inertia`.
			* We could do something here where we affect the `bounceStiffness` and `bounceDamping`
			* using the value of `dragElastic`.
			*/
			const bounceStiffness = dragElastic ? 200 : 1e6;
			const bounceDamping = dragElastic ? 40 : 1e7;
			const inertia = {
				type: "inertia",
				velocity: dragMomentum ? velocity[axis] : 0,
				bounceStiffness,
				bounceDamping,
				timeConstant: 750,
				restDelta: 1,
				restSpeed: 10,
				...dragTransition,
				...transition
			};
			return this.startAxisValueAnimation(axis, inertia);
		});
		return Promise.all(momentumAnimations).then(onDragTransitionEnd);
	}
	startAxisValueAnimation(axis, transition) {
		const axisValue = this.getAxisMotionValue(axis);
		addValueToWillChange(this.visualElement, axis);
		return axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement, false));
	}
	stopAnimation() {
		/**
		* 如果元素已经卸载，则不停止动画
		*/
		if (!isPresent(this.visualElement)) return;
		eachAxis((axis) => this.getAxisMotionValue(axis).stop());
	}
	pauseAnimation() {
		eachAxis((axis) => this.getAxisMotionValue(axis).animation?.pause());
	}
	getAnimationState(axis) {
		return this.getAxisMotionValue(axis).animation?.state;
	}
	/**
	* Drag works differently depending on which props are provided.
	*
	* - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
	* - Otherwise, we apply the delta to the x/y motion values.
	*/
	getAxisMotionValue(axis) {
		const dragKey = `_drag${axis.toUpperCase()}`;
		const props = this.visualElement.getProps();
		return props[dragKey] || this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
	}
	snapToCursor(point) {
		eachAxis((axis) => {
			const { drag } = this.getProps();
			if (!shouldDrag(axis, drag, this.currentDirection)) return;
			const { projection } = this.visualElement;
			const axisValue = this.getAxisMotionValue(axis);
			if (projection && projection.layout) {
				const { min, max } = projection.layout.layoutBox[axis];
				axisValue.set(point[axis] - mixNumber(min, max, .5));
			}
		});
	}
	/**
	* When the viewport resizes we want to check if the measured constraints
	* have changed and, if so, reposition the element within those new constraints
	* relative to where it was before the resize.
	*/
	scalePositionWithinConstraints() {
		if (!this.visualElement.current) return;
		const { drag, dragConstraints } = this.getProps();
		const { projection } = this.visualElement;
		if (!isHTMLElement(dragConstraints) || !projection || !this.constraints) return;
		/**
		* Stop current animations as there can be visual glitching if we try to do
		* this mid-animation
		*/
		this.stopAnimation();
		/**
		* Record the relative position of the dragged element relative to the
		* constraints box and save as a progress value.
		*/
		const boxProgress = {
			x: 0,
			y: 0
		};
		eachAxis((axis) => {
			const axisValue = this.getAxisMotionValue(axis);
			if (axisValue && this.constraints !== false) {
				const latest = axisValue.get();
				boxProgress[axis] = calcOrigin({
					min: latest,
					max: latest
				}, this.constraints[axis]);
			}
		});
		/**
		* Update the layout of this element and resolve the latest drag constraints
		*/
		const { transformTemplate } = this.visualElement.getProps();
		this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
		projection.root && projection.root.updateScroll();
		projection.updateLayout();
		this.resolveConstraints();
		/**
		* For each axis, calculate the current progress of the layout axis
		* within the new constraints.
		*/
		eachAxis((axis) => {
			if (!shouldDrag(axis, drag, null)) return;
			/**
			* Calculate a new transform based on the previous box progress
			*/
			const axisValue = this.getAxisMotionValue(axis);
			const { min, max } = this.constraints[axis];
			axisValue.set(mixNumber(min, max, boxProgress[axis]));
		});
	}
	addListeners() {
		if (!this.visualElement.current) return;
		elementDragControls.set(this.visualElement, this);
		const element = this.visualElement.current;
		/**
		* Attach a pointerdown event listener on this DOM element to initiate drag tracking.
		*/
		const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
			const { drag, dragListener = true } = this.getProps();
			drag && dragListener && this.start(event);
		});
		const measureDragConstraints = () => {
			const { dragConstraints } = this.getProps();
			if (isHTMLElement(dragConstraints)) this.constraints = this.resolveRefConstraints();
		};
		const { projection } = this.visualElement;
		const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
		if (projection && !projection.layout) {
			projection.root && projection.root.updateScroll();
			projection.updateLayout();
		}
		frame.read(measureDragConstraints);
		/**
		* Attach a window resize listener to scale the draggable target within its defined
		* constraints as the window resizes.
		*/
		const stopResizeListener = addDomEvent$1(window, "resize", () => this.scalePositionWithinConstraints());
		/**
		* If the element's layout changes, calculate the delta and apply that to
		* the drag gesture's origin point.
		*/
		const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
			if (this.isDragging && hasLayoutChanged) {
				eachAxis((axis) => {
					const motionValue = this.getAxisMotionValue(axis);
					if (!motionValue) return;
					this.originPoint[axis] += delta[axis].translate;
					motionValue.set(motionValue.get() + delta[axis].translate);
				});
				this.visualElement.render();
			}
		}));
		return () => {
			stopResizeListener();
			stopPointerListener();
			stopMeasureLayoutListener();
			stopLayoutUpdateListener && stopLayoutUpdateListener();
		};
	}
	getProps() {
		const props = this.visualElement.getProps();
		const { drag = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
		return {
			...props,
			drag,
			dragDirectionLock,
			dragPropagation,
			dragConstraints,
			dragElastic,
			dragMomentum
		};
	}
};
function shouldDrag(direction, drag, currentDirection) {
	return (drag === true || drag === direction) && (currentDirection === null || currentDirection === direction);
}
/**
* Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
* than the provided threshold, return `null`.
*
* @param offset - The x/y offset from origin.
* @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
*/
function getCurrentDirection(offset, lockThreshold = 10) {
	let direction = null;
	if (Math.abs(offset.y) > lockThreshold) direction = "y";
	else if (Math.abs(offset.x) > lockThreshold) direction = "x";
	return direction;
}
//#endregion
//#region node_modules/motion-sv/dist/features/gestures/drag/index.js
var DragGesture = class extends Feature {
	controls;
	removeGroupControls = noop;
	removeListeners = noop;
	constructor(state) {
		super(state);
		this.controls = new VisualElementDragControls(state.visualElement);
	}
	mount() {
		const { dragControls } = this.state.options;
		if (dragControls) this.removeGroupControls = dragControls.subscribe(this.controls);
		this.removeListeners = this.controls.addListeners() || noop;
	}
	unmount() {
		this.removeGroupControls();
		this.removeListeners();
	}
};
//#endregion
//#region node_modules/motion-sv/dist/projection/styles/scale-correction.js
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
	for (const key in correctors) {
		scaleCorrectors[key] = correctors[key];
		if (isCSSVariableName(key)) scaleCorrectors[key].isCSSVariable = true;
	}
}
//#endregion
//#region node_modules/motion-sv/dist/projection/node/state.js
/**
* This should only ever be modified on the client otherwise it'll
* persist through server requests. If we need instanced states we
* could lazy-init via root.
*/
var globalProjectionState = {
	/**
	* Global flag as to whether the tree has animated since the last time
	* we resized the window
	*/
	hasAnimatedSinceResize: true,
	/**
	* We set this to true once, on the first update. Any nodes added to the tree beyond that
	* update will be given a `data-projection-id` attribute.
	*/
	hasEverUpdated: false
};
//#endregion
//#region node_modules/motion-sv/dist/features/layout/layout.js
var LayoutFeature = class extends Feature {
	constructor(state) {
		super(state);
		addScaleCorrector(defaultScaleCorrector);
	}
	beforeUpdate() {
		this.state.willUpdate("beforeUpdate");
	}
	update() {
		this.didUpdate();
	}
	didUpdate() {
		if (this.state.options.layout || this.state.options.layoutId || this.state.options.drag) this.state.visualElement.projection?.root?.didUpdate();
	}
	mount() {
		const options = this.state.options;
		const layoutGroup = this.state.options.layoutGroup;
		if (options.layout || options.layoutId) {
			const projection = this.state.visualElement.projection;
			if (projection) {
				projection.promote();
				layoutGroup?.group?.add(projection);
			}
			globalProjectionState.hasEverUpdated = true;
		}
		this.didUpdate();
	}
	beforeUnmount() {
		const projection = this.state.visualElement.projection;
		if (projection) {
			this.state.willUpdate("beforeUnmount");
			if (this.state.options.layoutId) {
				projection.isPresent = false;
				projection.relegate();
			} else if (this.state.options.layout) this.state.isSafeToRemove = true;
		}
	}
	unmount() {
		const layoutGroup = this.state.options.layoutGroup;
		const projection = this.state.visualElement.projection;
		if (projection) {
			if (layoutGroup?.group && (this.state.options.layout || this.state.options.layoutId)) layoutGroup.group.remove(projection);
			this.didUpdate();
		}
	}
};
//#endregion
//#region node_modules/motion-sv/dist/features/gestures/pan/index.js
function asyncHandler(handler) {
	return (event, info) => {
		if (handler) frame.postRender(() => handler(event, info));
	};
}
var PanGesture = class extends Feature {
	session;
	removePointerDownListener = noop;
	onPointerDown(pointerDownEvent) {
		this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
			transformPagePoint: this.state.visualElement.getTransformPagePoint(),
			contextWindow: getContextWindow(this.state.visualElement)
		});
	}
	createPanHandlers() {
		return {
			onSessionStart: asyncHandler((_, info) => {
				const { onPanSessionStart } = this.state.options;
				onPanSessionStart && onPanSessionStart(_, info);
			}),
			onStart: asyncHandler((_, info) => {
				const { onPanStart } = this.state.options;
				onPanStart && onPanStart(_, info);
			}),
			onMove: (event, info) => {
				const { onPan } = this.state.options;
				onPan && onPan(event, info);
			},
			onEnd: (event, info) => {
				const { onPanEnd } = this.state.options;
				delete this.session;
				if (onPanEnd) frame.postRender(() => onPanEnd(event, info));
			}
		};
	}
	mount() {
		this.removePointerDownListener = addPointerEvent(this.state.element, "pointerdown", this.onPointerDown.bind(this));
	}
	update() {}
	unmount() {
		this.removePointerDownListener();
		this.session && this.session.end();
	}
};
//#endregion
//#region node_modules/motion-sv/dist/features/dom-max.js
var domMax = [
	AnimationFeature,
	PressGesture,
	HoverGesture,
	InViewGesture,
	FocusGesture,
	ProjectionFeature,
	PanGesture,
	DragGesture,
	LayoutFeature
];
//#endregion
//#region node_modules/motion-sv/dist/components/context.js
var MotionStateContext = new Context("MotionState");
var LayoutGroupContext = new Context("LayoutGroup");
//#endregion
//#region node_modules/motion-sv/dist/components/lazy-motion/context.js
var LazyMotionContext = new Context("LazyMotionContext");
//#endregion
//#region node_modules/motion-sv/dist/components/motion-config/context.js
/**
* Default motion configuration
*/
var defaultConfig = {
	reducedMotion: "never",
	transition: void 0,
	nonce: void 0
};
/**
* Context for sharing motion configuration with child components
*/
var MotionConfigContext = new Context("MotionConfig");
function useMotionConfig() {
	return MotionConfigContext.getOr(() => defaultConfig);
}
//#endregion
//#region node_modules/motion-sv/dist/components/animate-presence/use-pop-layout.js
function usePopLayout(props) {
	const styles = /* @__PURE__ */ new WeakMap();
	const cachedPositions = /* @__PURE__ */ new WeakMap();
	const trackedStates = /* @__PURE__ */ new Set();
	let rafId = null;
	const config = useMotionConfig();
	/**
	* Continuously capture positions of tracked elements.
	* Runs every frame to ensure we always have the latest stable position.
	*/
	function updatePositions() {
		for (const state of trackedStates) {
			const element = state.element;
			if (!element || !element.isConnected) continue;
			const parent = element.offsetParent;
			const parentWidth = parent instanceof HTMLElement ? parent.offsetWidth || 0 : 0;
			const size = {
				height: element.offsetHeight || 0,
				width: element.offsetWidth || 0,
				top: element.offsetTop,
				left: element.offsetLeft,
				right: 0
			};
			size.right = parentWidth - size.width - size.left;
			cachedPositions.set(state, size);
		}
		if (trackedStates.size > 0) rafId = requestAnimationFrame(updatePositions);
		else rafId = null;
	}
	/**
	* Capture position for a single element synchronously.
	*/
	function capturePositionSync(state) {
		const element = state.element;
		if (!element || !element.isConnected) return;
		const parent = element.offsetParent;
		const parentWidth = parent instanceof HTMLElement ? parent.offsetWidth || 0 : 0;
		const size = {
			height: element.offsetHeight || 0,
			width: element.offsetWidth || 0,
			top: element.offsetTop,
			left: element.offsetLeft,
			right: 0
		};
		size.right = parentWidth - size.width - size.left;
		cachedPositions.set(state, size);
	}
	/**
	* Start tracking a state's position continuously.
	*/
	function trackPosition(state) {
		if (props.mode !== "popLayout") return;
		trackedStates.add(state);
		capturePositionSync(state);
		if (rafId === null) rafId = requestAnimationFrame(updatePositions);
	}
	/**
	* Stop tracking a state's position.
	*/
	function untrackPosition(state) {
		trackedStates.delete(state);
		cachedPositions.delete(state);
	}
	function addPopStyle(state) {
		if (props.mode !== "popLayout") return;
		const element = state.element;
		trackedStates.delete(state);
		let size = cachedPositions.get(state);
		if (!size) {
			const parent = element.offsetParent;
			const parentWidth = parent instanceof HTMLElement ? parent.offsetWidth || 0 : 0;
			size = {
				height: element.offsetHeight || 0,
				width: element.offsetWidth || 0,
				top: element.offsetTop,
				left: element.offsetLeft,
				right: 0
			};
			size.right = parentWidth - size.width - size.left;
		}
		cachedPositions.delete(state);
		const x = props.anchorX === "left" ? `left: ${size.left}` : `right: ${size.right}`;
		state.element.dataset.motionPopId = state.id;
		const style = document.createElement("style");
		if (config().nonce) style.nonce = config().nonce;
		styles.set(state, style);
		document.head.appendChild(style);
		if (style.sheet) style.sheet.insertRule(`
    [data-motion-pop-id="${state.id}"] {
      position: absolute !important;
      width: ${size.width}px !important;
      height: ${size.height}px !important;
      top: ${size.top}px !important;
      ${x}px !important;
      }
      `);
	}
	function removePopStyle(state) {
		const style = styles.get(state);
		if (!style) return;
		styles.delete(state);
		frame.render(() => {
			document.head.removeChild(style);
		});
	}
	return {
		addPopStyle,
		removePopStyle,
		trackPosition,
		untrackPosition,
		styles
	};
}
//#endregion
//#region node_modules/motion-sv/dist/utils/delay.js
function delay(fn) {
	return Promise.resolve().then(() => {
		fn();
	});
}
//#endregion
//#region node_modules/motion-sv/dist/components/animate-presence/animate-presence.svelte
function Animate_presence($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { mode = "sync", initial = true, anchorX = "left", as, custom, onExitComplete, children } = $$props;
		useAnimatePresence({
			mode,
			initial,
			get custom() {
				return custom;
			},
			get anchorX() {
				return anchorX;
			}
		});
		const { addPopStyle, removePopStyle, trackPosition, untrackPosition, styles } = usePopLayout({
			get mode() {
				return mode;
			},
			get anchorX() {
				return anchorX;
			}
		});
		/**
		* Track elements that are actively exiting.
		* Key: The DOM element exiting.
		* Value: { blocksExit: boolean } - whether this exit should block "wait" mode.
		*
		* This prevents double-handling of exit events and allows tracking specific element status.
		*/
		const exitDom = /* @__PURE__ */ new Map();
		/**
		* Track elements that are actively exiting AND blocking (have actual exit animations).
		*
		* This is crucial for `mode="wait"`. When this count is > 0, `isWaitBlocked` becomes true.
		* Child `motion` components subscribe to this state via `PresenceManagerContext`.
		*
		* In `motion.svelte`, if `isWaitBlocked` is true:
		* 1. The entering component is hidden (`display: none`) and its animation is paused.
		* 2. When the count drops to 0, the component unhides and starts its "animate" state.
		*/
		let blockingExitCount = 0;
		const exitStartSubscribers = /* @__PURE__ */ new Set();
		function subscribeToExitStart(callback) {
			exitStartSubscribers.add(callback);
			return () => exitStartSubscribers.delete(callback);
		}
		const notifyExitStart = (exitingEl) => exitStartSubscribers.forEach((cb) => cb(exitingEl));
		const isWaitBlocked = () => mode === "wait" && blockingExitCount > 0;
		function handleIntroStart(el) {
			const state = mountedStates.get(el);
			if (!state) return;
			const entry = exitDom.get(el);
			if (entry) {
				exitDom.delete(el);
				if (entry.blocksExit && blockingExitCount > 0) blockingExitCount--;
			}
			removePopStyle(state);
			trackPosition(state);
			removeDoneCallback(el);
			state.setActive("exit", false, false);
			state.startAnimation();
		}
		function handleOutroStart(el) {
			const state = mountedStates.get(el);
			if (!state) return;
			if (exitDom.has(el)) return;
			addPopStyle(state);
			const blocksExit = !!state.options.exit;
			exitDom.set(el, { blocksExit });
			if (blocksExit) {
				blockingExitCount++;
				notifyExitStart(el);
			}
			delay(() => {
				state.setActive?.("exit", true);
			});
		}
		function handleOutroEnd(el) {
			const state = mountedStates.get(el);
			if (!state) return;
			const entry = exitDom.get(el);
			if (entry) {
				exitDom.delete(el);
				if (entry.blocksExit && blockingExitCount > 0) blockingExitCount--;
			}
			if (exitDom.size === 0) onExitComplete?.();
			if (!styles?.has(state)) state.willUpdate("done");
			else removePopStyle(state);
		}
		PresenceManagerContext.set({
			trackPosition,
			untrackPosition,
			isWaitBlocked,
			subscribeToExitStart,
			onIntroStart: handleIntroStart,
			onOutroStart: handleOutroStart,
			onOutroEnd: handleOutroEnd
		});
		children($$renderer);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region node_modules/motion-sv/dist/components/animate-presence/context.js
var PresenceManagerContext = new Context("PresenceManagerContext", {});
//#endregion
//#region node_modules/motion-sv/dist/components/motion/valid-prop.js
/**
* A list of all valid MotionProps.
*
* @privateRemarks
* This doesn't throw if a `MotionProp` name is missing - it should.
*/
var validMotionProps = new Set([
	"animate",
	"exit",
	"variants",
	"initial",
	"style",
	"variants",
	"transition",
	"transformTemplate",
	"custom",
	"inherit",
	"onBeforeLayoutMeasure",
	"onAnimationStart",
	"onAnimationComplete",
	"onUpdate",
	"onDragStart",
	"onDrag",
	"onDragEnd",
	"onMeasureDragConstraints",
	"onDirectionLock",
	"onDragTransitionEnd",
	"onHoverStart",
	"onHoverEnd",
	"onViewportEnter",
	"onViewportLeave",
	"ignoreStrict",
	"forwardMotionProps",
	"as",
	"ref"
]);
/**
* Check whether a prop name is a valid `MotionProp` key.
*
* @param key - Name of the property to check
* @returns `true` is key is a valid `MotionProp`.
*
* @public
*/
function isValidMotionProp(key) {
	return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}
//#endregion
//#region node_modules/motion-sv/dist/components/motion/motion.svelte
var VOID_TAGS = new Set([
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
]);
function Motion($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { features = [], as: AsComponent, props, ref: externalRef = void 0, forwardMotionProps = false } = $$props;
		const parentState = MotionStateContext.getOr(null);
		const layoutGroup = LayoutGroupContext.getOr({});
		const config = useMotionConfig();
		const animatePresenceContext = AnimatePresenceContext.getOr({});
		const presenceManager = PresenceManagerContext.getOr({});
		const lazyMotionContext = LazyMotionContext.getOr({
			features: () => [],
			strict: false
		});
		const layoutMotionScope = LayoutMotionScopeContext.getOr(null);
		/**
		* If we're in development mode, check to make sure we're not rendering a motion component
		* as a child of LazyMotion, as this will break the file-size benefits of using it.
		*/
		if (process.env.NODE_ENV !== "production" && features?.length && lazyMotionContext.strict) {
			const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
			props.ignoreStrict ? warning(false, strictMessage) : invariant(false, strictMessage);
		}
		/**
		* Get the layout ID for the motion component
		* If both layoutGroup.id and props.layoutId exist, combine them with a hyphen
		* Otherwise return props.layoutId or undefined
		*/
		function getLayoutId() {
			if (layoutGroup.id && props.layoutId) return `${layoutGroup.id}-${props.layoutId}`;
			return props.layoutId || void 0;
		}
		const motionOptions = derived(() => ({
			...props,
			features,
			lazyMotionContext,
			layoutId: getLayoutId(),
			transition: props.transition ?? config().transition,
			layoutGroup,
			motionConfig: config(),
			inViewOptions: props.inViewOptions ?? config().inViewOptions,
			animatePresenceContext,
			initial: animatePresenceContext.initial === false ? animatePresenceContext.initial : props.initial === true ? void 0 : props.initial
		}));
		const motionState = new MotionState(motionOptions(), parentState);
		MotionStateContext.set(motionState);
		layoutMotionScope?.register(motionState);
		const getAttrs = derived(() => {
			const isSVG = motionState.type === "svg";
			const attrsProps = {};
			for (const key of Reflect.ownKeys(props)) if (typeof key === "string") {
				if (isValidMotionProp(key)) continue;
				const value = props[key];
				attrsProps[key] = isMotionValue(value) ? value.get() : value;
			} else attrsProps[key] = props[key];
			let styleSource = isSVG ? {} : motionState.visualElement?.latestValues || motionState.baseTarget;
			if (props.whileInView && props.inViewOptions?.useClipPathWorkaround && !motionState.activeStates.whileInView) {
				const filtered = {};
				for (const key in styleSource) {
					if (key === "clipPath") {
						const value = styleSource[key];
						if (typeof value === "string" && value.includes("100%")) continue;
					}
					filtered[key] = styleSource[key];
				}
				styleSource = filtered;
			}
			let styleProps = {
				...props.style,
				...styleSource
			};
			if (presenceManager.isWaitBlocked?.() === true && !motionState.activeStates.exit) styleProps.display = "none";
			if (isSVG) {
				const { attrs, style } = convertSvgStyleToAttributes({
					...motionState.isMounted() ? motionState.target : motionState.baseTarget,
					...styleProps
				});
				if (style.transform || attrs.transformOrigin) {
					style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
					delete attrs.transformOrigin;
				}
				if (style.transform) {
					style.transformBox = style.transformBox ?? "fill-box";
					delete attrs.transformBox;
				}
				Object.assign(attrsProps, attrs);
				styleProps = style;
			}
			if (props.drag && props.dragListener !== false) Object.assign(styleProps, {
				userSelect: "none",
				WebkitUserSelect: "none",
				WebkitTouchCallout: "none",
				touchAction: props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`
			});
			const style = createStyles(styleProps);
			if (style) attrsProps.style = css(style);
			return attrsProps;
		});
		derived(() => {
			const customValue = props.custom ?? animatePresenceContext.custom;
			return resolveVariant$1(props.exit, props.variants, customValue);
		});
		watch(() => motionOptions(), (options) => {
			motionState.update(options);
		}, { lazy: true });
		function nodeRef(node) {
			externalRef = node;
			const waitBlocked = run(() => presenceManager.isWaitBlocked?.() === true);
			motionState.mount(node, run(() => motionOptions()), waitBlocked);
			if (waitBlocked) motionState.setActive("animate", false, false);
			return () => {
				motionState.unmount();
			};
		}
		presenceManager.isWaitBlocked?.();
		const isInPresenceContext = AnimatePresenceContext.exists();
		animatePresenceContext.transition;
		const shouldAllowExit = () => !!props.exit && isInPresenceContext;
		const EXITING_KEY = "__motion_exiting__";
		const onintrostart = () => shouldAllowExit() && presenceManager.onIntroStart?.(motionState.element);
		const onoutrostart = () => {
			if (!shouldAllowExit()) return;
			motionState.element[EXITING_KEY] = true;
			presenceManager.onOutroStart?.(motionState.element);
		};
		const onoutroend = () => {
			if (!shouldAllowExit()) return;
			delete motionState.element[EXITING_KEY];
			presenceManager.onOutroEnd?.(motionState.element);
		};
		const key = createAttachmentKey();
		const sharedProps = derived(() => ({
			...getAttrs(),
			[key]: nodeRef,
			onintrostart,
			onoutrostart,
			onoutroend
		}));
		if (typeof AsComponent === "string") {
			$$renderer.push("<!--[0-->");
			if (VOID_TAGS.has(AsComponent)) {
				$$renderer.push("<!--[0-->");
				element($$renderer, AsComponent, () => {
					$$renderer.push(`${attributes({ ...sharedProps() })}`);
				});
			} else {
				$$renderer.push("<!--[-1-->");
				element($$renderer, AsComponent, () => {
					$$renderer.push(`${attributes({
						...sharedProps(),
						xmlns: motionState.type === "svg" ? "http://www.w3.org/2000/svg" : void 0
					})}`);
				}, () => {
					props.children?.($$renderer);
					$$renderer.push(`<!---->`);
				});
			}
			$$renderer.push(`<!--]-->`);
		} else {
			$$renderer.push("<!--[-1-->");
			if (AsComponent) {
				$$renderer.push("<!--[-->");
				AsComponent($$renderer, spread_props([sharedProps()]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref: externalRef });
	});
}
//#endregion
//#region node_modules/motion-sv/dist/components/motion/utils.js
var componentMaxCache = /* @__PURE__ */ new Map();
var componentMiniCache = /* @__PURE__ */ new Map();
function createMotionComponent(component, options = {}) {
	const isString = typeof component === "string";
	isString || component.name;
	const componentCache = options.features?.length > 0 ? componentMaxCache : componentMiniCache;
	if (isString && componentCache?.has(component)) return componentCache.get(component);
	const motionComponent = (anchor, props) => {
		const getAs = () => props.as || component || "div";
		return Motion(anchor, {
			features: options.features,
			get forwardMotionProps() {
				return props.forwardMotionProps || options.forwardMotionProps;
			},
			get as() {
				return getAs();
			},
			get props() {
				return withProp(props, "as", getAs());
			},
			get ref() {
				return props.ref;
			},
			set ref(value) {
				props.ref = value;
			}
		});
	};
	if (isString) componentCache?.set(component, motionComponent);
	return motionComponent;
}
function createMotionComponentWithFeatures(features = []) {
	return new Proxy({}, { get(_target, key) {
		if (key === "create") return (component, options) => createMotionComponent(component, {
			...options,
			features
		});
		return createMotionComponent(key, { features });
	} });
}
//#endregion
//#region node_modules/motion-sv/dist/components/motion/instance.js
var motion = createMotionComponentWithFeatures(domMax);
//#endregion
//#region node_modules/motion-sv/dist/components/motion/layout-motion.svelte
var LayoutMotionScopeContext = new Context("LayoutMotionScope");
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
		beforeNavigate(() => {
			mobileOpen = false;
		});
		$$renderer.push(`<nav id="main-nav"${attr_class("", void 0, { "visible": ready })}><a href="/" class="nav-name nav-link" style="text-decoration: none; color: inherit;"><span class="nav-name-text">Pranav Pujar</span> <span class="nav-subtitle">Software Engineer &amp; ML Researcher</span></a> <div class="nav-right"><ul class="nav-links"><li><a href="/CV.pdf" target="_blank" rel="noopener noreferrer" class="nav-link">CV</a></li> <li><a href="/career" class="nav-link">Career</a></li> <li><a href="/featured" class="nav-link">Featured</a></li></ul> `);
		AnimatedThemeToggler($$renderer, {});
		$$renderer.push(`<!----> <button class="menu-trigger" aria-label="Toggle menu">${escape_html(mobileOpen ? "Close" : "More")}</button></div> <div${attr_class("mobile-dropdown", void 0, { "open": mobileOpen })} role="presentation">`);
		Dock($$renderer, {
			children: ($$renderer) => {
				Dock_icon($$renderer, {
					children: ($$renderer) => {
						$$renderer.push(`<a href="/CV.pdf" target="_blank" rel="noopener noreferrer" class="dropdown-link nav-link">CV</a>`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Dock_icon($$renderer, {
					children: ($$renderer) => {
						$$renderer.push(`<a href="/career" class="dropdown-link nav-link">Career</a>`);
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
function Footer($$renderer) {
	$$renderer.push(`<footer class="footer"><div class="social-icons"><a href="https://www.linkedin.com/in/pranavpujar/" target="_blank" class="social-icon" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a> <a href="https://scholar.google.com/citations?user=b5yGCz8AAAAJ&amp;hl=en" target="_blank" class="social-icon" title="Google Scholar"><svg viewBox="0 0 24 24"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.828 3.38a7.001 7.001 0 0 1 14.344 0L24 9.5 12 0z"></path></svg></a> <a href="https://github.com/PranavPujar" target="_blank" class="social-icon" title="GitHub"><svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg></a></div> <div class="copyright">© 2026 Pranav Umakant Pujar</div></footer>`);
}
//#endregion
//#region src/lib/components/magic/pointer/pointer.svelte
function Pointer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { children, class: className } = $$props;
		useMotionValue(-200);
		useMotionValue(-200);
		Animate_presence($$renderer, {
			children: ($$renderer) => {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		});
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/SmoothCursor.svelte
function SmoothCursor($$renderer) {
	Pointer($$renderer, {});
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
		SmoothCursor($$renderer, {});
		$$renderer.push(`<!----> `);
		Nav($$renderer, { ready: store_get($$store_subs ??= {}, "$appReady", appReady) });
		$$renderer.push(`<!----> <main id="scroll-container"${attr_class("", void 0, { "ready": store_get($$store_subs ??= {}, "$appReady", appReady) })}>`);
		children($$renderer);
		$$renderer.push(`<!----> `);
		Footer($$renderer, {});
		$$renderer.push(`<!----></main>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _layout as default };
