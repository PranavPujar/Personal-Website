<script lang="ts">
	import { Sun, Moon } from "@lucide/svelte";
	import { get } from "svelte/store";
	import { theme } from "$lib/stores/theme.js";

	interface AnimatedThemeTogglerProps {
		class?: string;
		duration?: number;
	}

	let { class: className = "", duration = 400 }: AnimatedThemeTogglerProps = $props();

	let buttonRef: HTMLButtonElement | null = $state(null);

	const toggleTheme = async () => {
		if (!buttonRef) return;

		if (!document.startViewTransition) {
			theme.toggle();
			return;
		}

		const transition = document.startViewTransition(() => {
			theme.toggle();
		});

		await transition.ready;

		const { top, left, width, height } = buttonRef.getBoundingClientRect();
		const x = left + width / 2;
		const y = top + height / 2;
		const maxRadius = Math.hypot(
			Math.max(left, window.innerWidth - left),
			Math.max(top, window.innerHeight - top)
		);

		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${maxRadius}px at ${x}px ${y}px)`,
				],
			},
			{
				duration,
				easing: "ease-in-out",
				pseudoElement: "::view-transition-new(root)",
			}
		);
	};
</script>

<button bind:this={buttonRef} onclick={toggleTheme} id="theme-toggle" class={className}>
	{#if $theme === "dark"}
		<Sun size={22} />
	{:else}
		<Moon size={22} />
	{/if}
	<span class="sr-only">Toggle theme</span>
</button>
