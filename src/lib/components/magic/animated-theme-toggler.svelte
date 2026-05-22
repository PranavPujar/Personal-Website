<script lang="ts">
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

	const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<button bind:this={buttonRef} onclick={toggleTheme} id="theme-toggle" class={className} aria-label="Toggle theme">
	{#if $theme === "dark"}
		<!-- Sun with animatable rays -->
		<svg class="sun-icon" viewBox="0 0 24 24" width="22" height="22" overflow="visible" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<g transform="translate(12,12)">
				<circle cx="0" cy="0" r="4" />
				<g class="sun-rays">
					{#each ANGLES as angle}
						<g transform="rotate({angle})">
							<!-- rect: outer edge at y=-10, inner edge at y=-6.5, height=3.5 -->
							<!-- transform-origin 50% 100% = (0, -6.5) = inner edge -->
							<rect class="sun-ray" x="-1.1" y="-10" width="2.2" height="3.5" rx="1.1" />
						</g>
					{/each}
				</g>
			</g>
		</svg>
	{:else}
		<!-- Moon with twinkling stars on hover -->
		<svg class="moon-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
			<g class="moon-stars">
				<circle class="star star-1" cx="3.5" cy="5"  r="1.3" />
				<circle class="star star-2" cx="20"  cy="6.5" r="0.9" />
				<circle class="star star-3" cx="5"   cy="19" r="1.1" />
			</g>
		</svg>
	{/if}
	<span class="sr-only">Toggle theme</span>
</button>
