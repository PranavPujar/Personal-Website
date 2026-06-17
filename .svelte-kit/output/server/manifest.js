export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","CV.pdf","favicon.png","logos/.DS_Store","logos/adobe.png","logos/amd.png","logos/idir.png","logos/utacse.png","logos/utadarkmode.png","logos/utalightmode.png","resume.pdf","src/.DS_Store","src/files/1.jpg","src/files/2.jpg","src/files/3.jpg","src/files/4.jpg","src/files/5.jpg","src/files/6.jpg","src/files/cropped.jpg","src/files/featured-thumbnail.jpg","src/files/final.png","src/files/goldengate.jpeg","src/files/slideshow.mp4"]),
	mimeTypes: {".pdf":"application/pdf",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".mp4":"video/mp4"},
	_: {
		client: {start:"_app/immutable/entry/start.DtlDEkRk.js",app:"_app/immutable/entry/app.C24jdSox.js",imports:["_app/immutable/entry/start.DtlDEkRk.js","_app/immutable/chunks/DrXR7JuI.js","_app/immutable/chunks/CTJoNEX9.js","_app/immutable/chunks/DG2INW34.js","_app/immutable/entry/app.C24jdSox.js","_app/immutable/chunks/CTJoNEX9.js","_app/immutable/chunks/DxLN9Q9A.js","_app/immutable/chunks/v_jBEYI6.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
