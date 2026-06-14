
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/blog" | "/featured" | "/fun-facts" | "/journey";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/blog": Record<string, never>;
			"/featured": Record<string, never>;
			"/fun-facts": Record<string, never>;
			"/journey": Record<string, never>
		};
		Pathname(): "/" | "/blog" | "/featured" | "/fun-facts" | "/journey";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/CV.pdf" | "/favicon.png" | "/src/.DS_Store" | "/src/files/1.jpg" | "/src/files/2.jpg" | "/src/files/3.jpg" | "/src/files/4.jpg" | "/src/files/5.jpg" | "/src/files/6.jpg" | "/src/files/cropped.jpg" | "/src/files/featured-thumbnail.jpg" | "/src/files/final.png" | "/src/files/goldengate.jpeg" | "/src/files/slideshow.mp4" | string & {};
	}
}