export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","CV.pdf","favicon.png","logos/.DS_Store","logos/adobe.png","logos/amd.png","logos/idir.png","logos/image copy.png","logos/image.png","logos/utacse.png","logos/utadarkmode.png","logos/utalightmode.png","resume.pdf","src/.DS_Store","src/files/1.jpg","src/files/2.jpg","src/files/3.jpg","src/files/4.jpg","src/files/5.jpg","src/files/6.jpg","src/files/cropped.jpg","src/files/featured-thumbnail.jpg","src/files/final.png","src/files/goldengate.jpeg","src/files/slideshow.mp4"]),
	mimeTypes: {".pdf":"application/pdf",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".mp4":"video/mp4"},
	_: {
		client: {start:"_app/immutable/entry/start.BasVtV5m.js",app:"_app/immutable/entry/app.I7jg1EI1.js",imports:["_app/immutable/entry/start.BasVtV5m.js","_app/immutable/chunks/gNIkVS_k.js","_app/immutable/chunks/BsYmU5Nk.js","_app/immutable/chunks/BLLuZzQQ.js","_app/immutable/entry/app.I7jg1EI1.js","_app/immutable/chunks/BsYmU5Nk.js","_app/immutable/chunks/-MBtUS3w.js","_app/immutable/chunks/DHfL00A1.js","_app/immutable/chunks/CT0T0Gak.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/featured",
				pattern: /^\/featured\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/fun-facts",
				pattern: /^\/fun-facts\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/journey",
				pattern: /^\/journey\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
