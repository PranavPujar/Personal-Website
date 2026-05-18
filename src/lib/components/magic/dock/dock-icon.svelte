<script lang="ts" module>
	import type { Snippet } from "svelte";
	export interface DockIconProps {
		class?: string;
		children: Snippet;
	}
</script>

<script lang="ts">
	import { motion, useMotionValue, useTransform, useSpring } from "motion-sv";
	import { getContext } from "svelte";
	import type { DockContext } from "./dock.svelte";

	let { class: className, children }: DockIconProps = $props();

	const DEFAULT_SIZE = 36;
	const DEFAULT_MAGNIFICATION = 52;
	const DEFAULT_DISTANCE = 80;

	const dockContext = getContext<DockContext>("dock");
	let ref: HTMLDivElement | null = $state(null);

	const defaultMouseY = useMotionValue(Infinity);
	const mouseY = dockContext?.mouseY ?? defaultMouseY;

	const size = $derived(dockContext?.iconSize ?? DEFAULT_SIZE);
	const magnification = $derived(dockContext?.iconMagnification ?? DEFAULT_MAGNIFICATION);
	const disableMagnification = $derived(dockContext?.disableMagnification ?? false);
	const distance = $derived(dockContext?.iconDistance ?? DEFAULT_DISTANCE);

	const distanceCalc = useTransform(mouseY, (val: number) => {
		const bounds = ref?.getBoundingClientRect() ?? { y: 0, height: 0 };
		return val - bounds.y - bounds.height / 2;
	});

	const scaleTransform = useTransform(distanceCalc, (dist: number) => {
		if (disableMagnification || Math.abs(dist) >= distance) return 1;
		const maxScale = magnification / size;
		const progress = 1 - Math.abs(dist) / distance;
		return 1 + (maxScale - 1) * progress;
	});

	const scale = useSpring(scaleTransform, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	});
</script>

<motion.div
	bind:ref
	style={{ scale, transformOrigin: "right center" }}
	class="nav-dock-item {className ?? ''}"
>
	{@render children()}
</motion.div>
