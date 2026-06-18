import { dt as noop, t as index_server_exports, z as writable } from "./index-server.js";
import { v as noop$1 } from "./shared.js";
import "./environment.js";
import "./exports.js";
import "./index-server2.js";
import "./internal.js";
import "@sveltejs/kit/internal";
import "@sveltejs/kit/internal/server";
var PRELOAD_PRIORITIES = {
	tap: 1,
	hover: 2,
	viewport: 3,
	eager: 4,
	off: -1,
	false: -1
};
({ ...PRELOAD_PRIORITIES }), PRELOAD_PRIORITIES.hover;
/** @param {any} value */
function notifiable_store(value) {
	const store = writable(value);
	let ready = true;
	function notify() {
		ready = true;
		store.update((val) => val);
	}
	/** @param {any} new_value */
	function set(new_value) {
		ready = false;
		store.set(new_value);
	}
	/** @param {(value: any) => void} run */
	function subscribe(run) {
		/** @type {any} */
		let old_value;
		return store.subscribe((new_value) => {
			if (old_value === void 0 || ready && new_value !== old_value) run(old_value = new_value);
		});
	}
	return {
		notify,
		set,
		subscribe
	};
}
var updated_listener = { v: noop$1 };
function create_updated_store() {
	const { set, subscribe } = writable(false);
	return {
		subscribe,
		check: async () => false
	};
}
//#endregion
//#region node_modules/@sveltejs/kit/src/runtime/client/state.svelte.js
var page;
var navigating;
var updated;
var is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
var placeholder_url = "a:";
if (is_legacy) {
	page = {
		data: {},
		form: null,
		error: null,
		params: {},
		route: { id: null },
		state: {},
		status: -1,
		url: new URL(placeholder_url)
	};
	navigating = { current: null };
	updated = { current: false };
} else {
	page = new class Page {
		data = {};
		form = null;
		error = null;
		params = {};
		route = { id: null };
		state = {};
		status = -1;
		url = new URL(placeholder_url);
	}();
	navigating = new class Navigating {
		current = null;
	}();
	updated = new class Updated {
		current = false;
	}();
	updated_listener.v = () => updated.current = true;
}
//#endregion
//#region node_modules/@sveltejs/kit/src/runtime/client/client.js
/** @import { RemoteQueryCacheEntry } from './remote-functions/query.svelte.js' */
/** @import { RemoteLiveQueryCacheEntry } from './remote-functions/query-live.svelte.js' */
var { onMount, tick } = index_server_exports;
var stores = {
	url: /* @__PURE__ */ notifiable_store({}),
	page: /* @__PURE__ */ notifiable_store({}),
	navigating: /* @__PURE__ */ writable(null),
	updated: /* @__PURE__ */ create_updated_store()
};
/**
* Note on before_navigate_callbacks, on_navigate_callbacks and after_navigate_callbacks:
* do not re-assign as some closures keep references to these Sets
*/
/** @type {Set<(navigation: import('@sveltejs/kit').BeforeNavigate) => void>} */
var before_navigate_callbacks = /* @__PURE__ */ new Set();
/**
* @template {Function} T
* @param {Set<T>} callbacks
* @param {T} callback
*/
function add_navigation_callback(callbacks, callback) {
	onMount(() => {
		callbacks.add(callback);
		return () => {
			callbacks.delete(callback);
		};
	});
}
/**
* A navigation interceptor that triggers before we navigate to a URL, whether by clicking a link, calling `goto(...)`, or using the browser back/forward controls.
*
* Calling `cancel()` will prevent the navigation from completing. If `navigation.type === 'leave'` — meaning the user is navigating away from the app (or closing the tab) — calling `cancel` will trigger the native browser unload confirmation dialog. In this case, the navigation may or may not be cancelled depending on the user's response.
*
* When a navigation isn't to a SvelteKit-owned route (and therefore controlled by SvelteKit's client-side router), `navigation.to.route.id` will be `null`.
*
* If the navigation will (if not cancelled) cause the document to unload — in other words `'leave'` navigations and `'link'` navigations where `navigation.to.route === null` — `navigation.willUnload` is `true`.
*
* `beforeNavigate` must be called during a component initialization. It remains active as long as the component is mounted.
* @param {(navigation: import('@sveltejs/kit').BeforeNavigate) => void} callback
* @returns {void}
*/
function beforeNavigate(callback) {
	add_navigation_callback(before_navigate_callbacks, callback);
}
//#endregion
export { updated as a, page as i, stores as n, navigating as r, beforeNavigate as t };
