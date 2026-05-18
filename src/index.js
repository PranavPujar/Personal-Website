import ThreeGlobe from "three-globe";
import { WebGLRenderer, Scene, Color, Fog, PerspectiveCamera, AmbientLight, DirectionalLight, PointLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import countries from "./files/globe-data-min.json";
import travelHistory from "./files/my-flights.json";
import airportHistory from "./files/my-airports.json";
import Lenis from 'lenis';

var renderer, camera, scene, controls, lenis;
var Globe;

var streamGeneration = 0;
var streamSpeedDiv = 1;

function rafDelay(ms, gen) {
  return new Promise(resolve => {
    if (streamGeneration !== gen || ms < 16) { resolve(); return; }
    const start = performance.now();
    function tick() {
      if (streamGeneration !== gen) { resolve(); return; }
      if (performance.now() - start >= ms) { resolve(); }
      else { requestAnimationFrame(tick); }
    }
    requestAnimationFrame(tick);
  });
}

function wrapWordsInEl(el) {
  if (el.dataset.wrapped) return;
  el.dataset.wrapped = 'true';
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = node.textContent.split(/(\s+)/);
      if (parts.every(p => !/\S/.test(p))) return;
      const frag = document.createDocumentFragment();
      parts.forEach(part => {
        if (/\S/.test(part)) {
          const span = document.createElement('span');
          span.textContent = part;
          span.className = 'stream-word';
          frag.appendChild(span);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      });
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'A' || node.tagName === 'U') {
        const wrapper = document.createElement('span');
        wrapper.className = 'stream-word';
        node.parentNode.insertBefore(wrapper, node);
        wrapper.appendChild(node);
      } else {
        [...node.childNodes].forEach(walk);
      }
    }
  }
  walk(el);
}

async function streamEl(el, targets, started, gen) {
  if (started.has(el)) return;
  started.add(el);

  el.classList.add('is-streaming');
  const words = [...el.querySelectorAll('.stream-word')];
  const nextEl = targets[targets.indexOf(el) + 1];
  let nextTriggered = false;

  for (let i = 0; i < words.length; i++) {
    if (streamGeneration !== gen) {
      el.classList.remove('is-streaming');
      return;
    }

    words[i].classList.add('visible');

    const remaining = words.length - i - 1;
    if (!nextTriggered && remaining <= 25 && nextEl) {
      nextTriggered = true;
      streamEl(nextEl, targets, started, gen);
    }

    const randomDelay = (25 + (Math.random() * 20 - 10)) / streamSpeedDiv;
    await rafDelay(randomDelay, gen);
  }

  el.classList.remove('is-streaming');
  if (streamGeneration !== gen) return;
  if (!nextTriggered && nextEl) streamEl(nextEl, targets, started, gen);
}

async function streamView(viewEl) {
  streamSpeedDiv = viewEl.id === 'view-home' ? 1.9 : 0.8;
  const gen = ++streamGeneration;
  const targets = [...viewEl.querySelectorAll('.bio p, .section-title, .card p, .card h3')];
  targets.forEach(el => wrapWordsInEl(el));

  const allWords = [...viewEl.querySelectorAll('.stream-word')];
  allWords.forEach(w => { w.style.transition = 'none'; w.classList.remove('visible'); });
  await new Promise(r => requestAnimationFrame(r));
  allWords.forEach(w => { w.style.transition = ''; });

  if (targets.length > 0) streamEl(targets[0], targets, new Set(), gen);
}

init();
initGlobe();
initImageSlideshow();
initSmoothCursor();
onWindowResize();
animate();

setTimeout(() => {
  document.body.classList.add('hero-exited');
  document.getElementById('main-nav').classList.add('visible');

  setTimeout(onWindowResize, 10);
  const activeView = document.querySelector('.view-content.active');
  if (activeView) streamView(activeView);
  
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  function raf(time) {
    if (lenis) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
  }
  requestAnimationFrame(raf);
}, 100);

function initImageSlideshow() {
  const photos = [
    'assets/src/files/1.jpg',
    'assets/src/files/2.jpg',
    'assets/src/files/3.jpg',
    'assets/src/files/4.jpg',
    'assets/src/files/5.jpg',
  ];

  const circle = document.querySelector('.profile-photo-circle');
  if (!circle) return;

  const imgEls = photos.map((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'slideshow-img';
    img.alt = '';
    if (i === 0) img.classList.add('active');
    circle.appendChild(img);
    return img;
  });

  let current = 0;
  setInterval(() => {
    const prev = current;
    current = (current + 1) % photos.length;
    imgEls[prev].classList.remove('active');
    imgEls[current].classList.add('active');
  }, 3500);
}

function initSmoothCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.body.classList.add('has-smooth-cursor');

  const cursor = document.createElement('div');
  cursor.className = 'smooth-cursor';
  document.body.appendChild(cursor);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let vx = 0, vy = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    cursor.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });

  document.addEventListener('mouseover', (e) => {
    const el = e.target;
    if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('a') || el.closest('button')) {
      cursor.classList.add('hovering');
    } else {
      cursor.classList.remove('hovering');
    }
  });

  (function animate() {
    const stiffness = 0.1;
    const damping = 0.78;
    vx = vx * damping + (targetX - currentX) * stiffness;
    vy = vy * damping + (targetY - currentY) * stiffness;
    currentX += vx;
    currentY += vy;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  })();
}

function init() {
  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Important: Set size for the globe container
  const container = document.getElementById("globe-container");
  if (container) {
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
  }

  scene = new Scene();
  scene.add(new AmbientLight(0xbbbbbb, 0.3));
  renderer.setClearColor(0x000000, 0);

  camera = new PerspectiveCamera();
  camera.aspect = container ? container.clientWidth / container.clientHeight : window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  var dLight = new DirectionalLight(0xffffff, 0.8);
  dLight.position.set(-800, 2000, 400);
  camera.add(dLight);

  var dLight1 = new DirectionalLight(0x7982f6, 1);
  dLight1.position.set(-200, 500, 200);
  camera.add(dLight1);

  camera.position.z = 400;
  scene.add(camera);
  scene.fog = new Fog(0x535ef3, 400, 2000);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;

  window.addEventListener("resize", onWindowResize, false);
  
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.add('theme-switching');
      document.body.classList.toggle("light-mode");
      updateGlobeMaterial();
      requestAnimationFrame(() => requestAnimationFrame(() => {
        document.body.classList.remove('theme-switching');
      }));
    });
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('target') === '_blank') return;
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      document.querySelectorAll('.view-content').forEach(v => v.classList.remove('active'));
      const newView = document.getElementById(`view-${targetView}`);
      newView.classList.add('active');
      if (lenis) lenis.scrollTo(0);
      streamView(newView);
    });
  });

  const menuTrigger = document.getElementById('menu-trigger');
  const mobileDropdown = document.getElementById('mobile-dropdown');
  if (menuTrigger && mobileDropdown) {
    menuTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDropdown.classList.toggle('open');
      menuTrigger.textContent = isOpen ? 'Close' : 'Menu';
    });
    mobileDropdown.addEventListener('click', () => {
      mobileDropdown.classList.remove('open');
      menuTrigger.textContent = 'Menu';
    });
    document.addEventListener('click', (e) => {
      if (mobileDropdown.classList.contains('open') &&
          !mobileDropdown.contains(e.target) &&
          e.target !== menuTrigger) {
        mobileDropdown.classList.remove('open');
        menuTrigger.textContent = 'Menu';
      }
    });
  }

}

function updateGlobeMaterial() {
  if (!Globe) return;
  const isLight = document.body.classList.contains("light-mode");
  const globeMaterial = Globe.globeMaterial();
  Globe.showAtmosphere(false); 

  globeMaterial.transparent = true;
  if (isLight) {
    // LIGHT MODE: 100% Transparent Surface + Dark Black Dots
    globeMaterial.opacity = 0; // Makes the sphere itself invisible
    
    // Use a solid dark black for the hex polygons
    Globe.hexPolygonColor(() => "#000000"); 

  } else {
    // DARK MODE: White Surface + Dark Blue Dots
    globeMaterial.opacity = 1.0;
    globeMaterial.color = new Color(0xffffff); // White surface
    
    // Dark Blue dots
    Globe.hexPolygonColor(() => "#003366");

  }
}

function initGlobe() {
  Globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor("#3a228a")
    .atmosphereAltitude(0.25)
    .hexPolygonColor(() => "rgba(255,255,255, 0.7)");

  setTimeout(() => {
    Globe.arcsData(travelHistory.flights)
      .arcColor(e => e.status ? "#9cff00" : "#FF4000")
      .arcAltitude(e => e.arcAlt)
      .arcStroke(e => e.status ? 0.5 : 0.3)
      .arcDashLength(0.9)
      .arcDashGap(4)
      .arcDashAnimateTime(1000)
      .arcsTransitionDuration(1000)
      .labelsData(airportHistory.airports)
      .labelColor(() => "#ffcb21")
      .labelText("city")
      .labelSize(2)
      .pointsData(airportHistory.airports)
      .pointColor(() => "#ffffff")
      .pointRadius(0.05);
  }, 1000);

  Globe.rotateY(-Math.PI * (5 / 9));
  Globe.rotateZ(-Math.PI / 6);
  updateGlobeMaterial();
  scene.add(Globe);
}

function onWindowResize() {
  const container = document.getElementById("globe-container");
  const width = (container && container.clientWidth > 0) ? container.clientWidth : window.innerWidth;
  const height = (container && container.clientHeight > 0) ? container.clientHeight : window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate() {
  camera.lookAt(scene.position);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
