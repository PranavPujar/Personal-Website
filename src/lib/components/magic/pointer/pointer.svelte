<script lang="ts">
	import { onMount } from 'svelte';
	import { motion, AnimatePresence, useMotionValue } from 'motion-sv';
	import { theme } from '$lib/stores/theme.js';
	import type { Snippet } from 'svelte';

	interface PointerProps {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className }: PointerProps = $props();

	const x = useMotionValue(-200);
	const y = useMotionValue(-200);
	let isActive = $state(false);

	onMount(() => {
		if (window.matchMedia('(pointer: coarse)').matches) return;

		const activate = () => document.body.classList.add('pointer-active');
		const deactivate = () => {
			document.body.classList.remove('pointer-active');
			isActive = false;
		};

		if (window.innerWidth > 1280) activate();

		const onMove = (e: MouseEvent) => {
			if (window.innerWidth <= 1280) return;
			x.set(e.clientX);
			y.set(e.clientY);
			if (!isActive) isActive = true;
		};

		const onLeave = () => { isActive = false; };

		const onResize = () => {
			if (window.innerWidth <= 1280) deactivate();
			else activate();
		};

		document.addEventListener('mousemove', onMove);
		document.addEventListener('mouseleave', onLeave);
		window.addEventListener('resize', onResize);

		return () => {
			deactivate();
			document.removeEventListener('mousemove', onMove);
			document.removeEventListener('mouseleave', onLeave);
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<AnimatePresence>
	{#if isActive}
		<motion.div
			style={{
				position: 'fixed',
				top: y,
				left: x,
				translateX: '-50%',
				translateY: '-50%',
				pointerEvents: 'none',
				zIndex: 99999,
			}}
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0, opacity: 0 }}
		>
			{#if children}
				{@render children()}
			{:else}
				<svg
					stroke-width="1"
					viewBox="0 0 16 16"
					height="21"
					width="21"
					xmlns="http://www.w3.org/2000/svg"
					style="
						transform: rotate(-70deg);
						fill: {$theme === 'light' ? '#040d21' : '#ffffff'};
						stroke: {$theme === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)'};
						display: block;
					"
					class={className}
				>
					<path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
				</svg>
			{/if}
		</motion.div>
	{/if}
</AnimatePresence>
