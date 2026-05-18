<script lang="ts" module>
	import type { MotionValue } from "motion-sv";
	import type { Snippet } from "svelte";

	export interface DockProps {
		class?: string;
		iconSize?: number;
		iconMagnification?: number;
		disableMagnification?: boolean;
		iconDistance?: number;
		children: Snippet;
	}

	export interface DockContext {
		mouseY: MotionValue<number>;
		iconSize: number;
		iconMagnification: number;
		disableMagnification: boolean;
		iconDistance: number;
	}
</script>

<script lang="ts">
	import { useMotionValue } from "motion-sv";
	import { setContext } from "svelte";

	let {
		class: className,
		children,
		iconSize = 36,
		iconMagnification = 52,
		disableMagnification = false,
		iconDistance = 80,
	}: DockProps = $props();

	const mouseY = useMotionValue(Infinity);

	setContext("dock", {
		mouseY,
		get iconSize() { return iconSize; },
		get iconMagnification() { return iconMagnification; },
		get disableMagnification() { return disableMagnification; },
		get iconDistance() { return iconDistance; },
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onmousemove={(e) => mouseY.set(e.clientY)}
	onmouseleave={() => mouseY.set(Infinity)}
	class="nav-dock {className ?? ''}"
>
	{@render children()}
</div>
