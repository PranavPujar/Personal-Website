export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["CV.pdf","favicon.png","src/.DS_Store","src/files/1.jpg","src/files/2.jpg","src/files/3.jpg","src/files/4.jpg","src/files/5.jpg","src/files/cropped.jpg","src/files/final.png","src/files/goldengate.jpeg","src/files/slideshow.mp4"]),
	mimeTypes: {".pdf":"application/pdf",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".mp4":"video/mp4"},
	_: {
		client: {start:"_app/immutable/entry/start.BHt5juBA.js",app:"_app/immutable/entry/app.ZaOk1uMU.js",imports:["_app/immutable/entry/start.BHt5juBA.js","_app/immutable/chunks/Cq2o7lsq.js","_app/immutable/chunks/Gd09A7C4.js","_app/immutable/chunks/sJeomnNC.js","_app/immutable/entry/app.ZaOk1uMU.js","_app/immutable/chunks/Gd09A7C4.js","_app/immutable/chunks/BgUy-a58.js","_app/immutable/chunks/CFKVnMbq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
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
				id: "/career",
				pattern: /^\/career\/?$/,
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
