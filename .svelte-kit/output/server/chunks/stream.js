import { z as writable } from "./index-server.js";
import "./index-server2.js";
//#region src/lib/stores/app.js
var appReady = writable(false);
var streamReset = writable(0);
//#endregion
//#region src/lib/stream.js
var gen = 0;
function rafDelay(ms, g) {
	return new Promise((resolve) => {
		if (gen !== g || ms < 16) {
			resolve();
			return;
		}
		const start = performance.now();
		function tick() {
			if (gen !== g) {
				resolve();
				return;
			}
			if (performance.now() - start >= ms) resolve();
			else requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	});
}
function wrapWordsInEl(el) {
	if (el.dataset.wrapped) return;
	el.dataset.wrapped = "true";
	const letterMode = el.dataset.streamMode === "letter";
	function wrapTextNode(node) {
		const units = letterMode ? [...node.textContent] : node.textContent.split(/(\s+)/);
		if (units.every((u) => !/\S/.test(u))) return;
		const frag = document.createDocumentFragment();
		units.forEach((unit) => {
			if (/\S/.test(unit)) {
				const span = document.createElement("span");
				span.textContent = unit;
				span.className = "stream-word";
				frag.appendChild(span);
			} else frag.appendChild(document.createTextNode(unit));
		});
		node.parentNode.replaceChild(frag, node);
	}
	function walk(node) {
		if (node.nodeType === Node.TEXT_NODE) wrapTextNode(node);
		else if (node.nodeType === Node.ELEMENT_NODE) if (node.tagName === "A" || node.tagName === "U") {
			const wrapper = document.createElement("span");
			wrapper.className = "stream-word";
			node.parentNode.insertBefore(wrapper, node);
			wrapper.appendChild(node);
		} else [...node.childNodes].forEach(walk);
	}
	walk(el);
}
async function streamEl(el, targets, started, g, speedDiv) {
	if (started.has(el)) return;
	started.add(el);
	el.classList.add("is-streaming");
	const words = [...el.querySelectorAll(".stream-word")];
	const next = targets[targets.indexOf(el) + 1];
	let nextTriggered = false;
	const elSpeed = el.dataset.speedDiv ? parseFloat(el.dataset.speedDiv) : speedDiv;
	for (let i = 0; i < words.length; i++) {
		if (gen !== g) {
			el.classList.remove("is-streaming");
			return;
		}
		words[i].classList.add("visible");
		const remaining = words.length - i - 1;
		if (!nextTriggered && remaining <= 25 && next) {
			nextTriggered = true;
			streamEl(next, targets, started, g, speedDiv);
		}
		await rafDelay((25 + (Math.random() * 20 - 10)) / elSpeed, g);
	}
	el.classList.remove("is-streaming");
	if (gen !== g) return;
	if (!nextTriggered && next) streamEl(next, targets, started, g, speedDiv);
}
function cancelStream() {
	gen++;
}
function streamOnScroll(node, { selector, speedDiv = 1, rootMargin = "0px", threshold = 0 } = {}) {
	const g = gen;
	const targets = [...node.querySelectorAll(selector)];
	targets.forEach((el) => {
		wrapWordsInEl(el);
		const words = [...el.querySelectorAll(".stream-word")];
		if (el.offsetParent === null) {
			words.forEach((w) => w.classList.add("visible"));
			el.dataset.streamed = "true";
		} else words.forEach((w) => {
			w.style.transition = "none";
			w.classList.remove("visible");
		});
	});
	requestAnimationFrame(() => {
		targets.forEach((el) => el.querySelectorAll(".stream-word").forEach((w) => {
			w.style.transition = "";
		}));
	});
	async function reveal(el) {
		if (el.dataset.streamed) return;
		el.dataset.streamed = "true";
		const words = [...el.querySelectorAll(".stream-word")];
		const elSpeed = el.dataset.speedDiv ? parseFloat(el.dataset.speedDiv) : speedDiv;
		for (let i = 0; i < words.length; i++) {
			if (gen !== g) return;
			words[i].classList.add("visible");
			await rafDelay((25 + (Math.random() * 20 - 10)) / elSpeed, g);
		}
	}
	const io = new IntersectionObserver((entries) => {
		for (const entry of entries) if (entry.isIntersecting) {
			reveal(entry.target);
			io.unobserve(entry.target);
		}
	}, {
		root: null,
		rootMargin,
		threshold
	});
	targets.forEach((el) => io.observe(el));
	return () => io.disconnect();
}
async function streamView(node, speedDiv = 1) {
	const g = ++gen;
	const targets = [...node.querySelectorAll(".bio p, .section-title, .card p, .card h3, .thumb-overline, .video-caption-meta")];
	targets.forEach((el) => wrapWordsInEl(el));
	const allWords = [...node.querySelectorAll(".stream-word")];
	allWords.forEach((w) => {
		w.style.transition = "none";
		w.classList.remove("visible");
	});
	await new Promise((r) => requestAnimationFrame(r));
	allWords.forEach((w) => {
		w.style.transition = "";
	});
	if (targets.length > 0) streamEl(targets[0], targets, /* @__PURE__ */ new Set(), g, speedDiv);
}
//#endregion
export { streamReset as a, appReady as i, streamOnScroll as n, streamView as r, cancelStream as t };
