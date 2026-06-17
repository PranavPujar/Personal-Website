import { c as derived, g as unsubscribe_stores, m as store_get, p as spread_props } from "./index-server.js";
import { n as motion, s as theme } from "./dist.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//#region src/lib/utils.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/lib/components/fancy/underline-to-background/underline-to-background.svelte
function Underline_to_background($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/**
		* The content to be displayed and animated
		*/
		let defaultTransition = {
			type: "spring",
			damping: 30,
			stiffness: 300
		};
		let { children, as = "span", class: className, transition = defaultTransition, targetTextColor = "#fef", underlineHeightRatio = .1, underlinePaddingRatio = .01, $$slots, $$events, ...props } = $$props;
		let element = null;
		let baseTextColor = "currentColor";
		let MotionComponent = derived(() => motion[as]);
		let underlineVariants = derived(() => ({
			initial: { height: "var(--underline-height, 0px)" },
			target: {
				height: "100%",
				transition
			}
		}));
		let textVariants = derived(() => ({
			initial: { color: baseTextColor },
			target: {
				color: targetTextColor,
				transition
			}
		}));
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (MotionComponent()) {
				$$renderer.push("<!--[-->");
				MotionComponent()($$renderer, spread_props([
					{
						class: cn("relative inline-block cursor-pointer text-current", className),
						initial: "initial",
						whileHover: "target"
					},
					props,
					{
						get ref() {
							return element;
						},
						set ref($$value) {
							element = $$value;
							$$settled = false;
						},
						children: ($$renderer) => {
							if (motion.div) {
								$$renderer.push("<!--[-->");
								motion.div($$renderer, {
									class: "pointer-events-none absolute inset-x-0 bottom-0 z-0",
									style: {
										height: "var(--underline-height, 0px)",
										bottom: "calc(-1 * var(--underline-padding, 0px))",
										backgroundColor: baseTextColor,
										willChange: "height"
									},
									variants: underlineVariants(),
									"aria-hidden": "true"
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
							$$renderer.push(` `);
							if (motion.span) {
								$$renderer.push("<!--[-->");
								motion.span($$renderer, {
									variants: textVariants(),
									class: "relative z-10 inline-block [will-change:color]",
									children: ($$renderer) => {
										children?.($$renderer);
										$$renderer.push(`<!---->`);
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
						},
						$$slots: { default: true }
					}
				]));
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
//#region src/lib/HoverLink.svelte
function HoverLink($$renderer, $$props) {
	var $$store_subs;
	let { href, variant = "default", children } = $$props;
	const targetTextColor = derived(() => variant === "default" ? store_get($$store_subs ??= {}, "$theme", theme) === "light" ? "#ffffff" : "#040d21" : "#ffffff");
	const cls = derived(() => variant === "default" ? "hover-link" : `hover-link hover-link-${variant}`);
	$$renderer.push(`<!---->`);
	Underline_to_background($$renderer, {
		as: "a",
		class: cls(),
		href,
		targetTextColor: targetTextColor(),
		target: "_blank",
		rel: "noopener noreferrer",
		children: ($$renderer) => {
			children?.($$renderer);
			$$renderer.push(`<!---->`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!---->`);
	if ($$store_subs) unsubscribe_stores($$store_subs);
}
//#endregion
export { HoverLink as t };
