<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { theme } from '$lib/stores/theme.js';
  import ThreeGlobe from 'three-globe';
  import {
    WebGLRenderer, Scene, Fog,
    PerspectiveCamera, AmbientLight, DirectionalLight, Color
  } from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import countries from '../files/globe-data-min.json';
  import travelHistory from '../files/my-flights.json';
  import airportHistory from '../files/my-airports.json';

  // ---------------------------------------------------------------------------
  // APPROACH 2: GLOBAL TIMING LOOP
  // ---------------------------------------------------------------------------

  // TUNING KNOBS
  const GLOBAL_SPEED = 40.0;
  // Final flight ends at ~21s. Let's make the loop 23s.
  const TOTAL_CYCLE_TIME = 97000 / GLOBAL_SPEED;

  // PERSISTENT ACROSS NAVIGATIONS.
  // The flight animation is driven by an internal three-globe FrameTicker that
  // is created ONCE inside `new ThreeGlobe()`. If we tore the globe down and
  // rebuilt it on every visit to the home page, the old instance's ticker +
  // WebGL context leaked and the freshly-built globe's flights stopped running.
  // So we build the globe a single time, keep the three.js objects at module
  // scope, and just re-attach the same canvas to whichever page instance is
  // mounted. The flight dashes keep advancing in real time the whole while.
  let renderer, scene, camera, controls, globe;
  let built = false;
  let rendering = false;
  let renderRaf = null;

  let container;

  // ── COUNTER-CHANGE EFFECT ON THE FLIGHT LINES (dark mode only) ─────────────
  // Analytic sphere-silhouette mask: each flight-line fragment is dark navy while
  // it sits over the globe's projected disc and snaps to bright white the instant
  // it clears the horizon. Pure GPU, recomputed in view space every frame, so it
  // tracks the silhouette as the globe rotates. A `uEnabled` uniform gates it so
  // light mode keeps the original flight-line look untouched.
  let arcsStyled = false;
  const arcMats = []; // patched arc materials, so theme toggles can flip uEnabled

  const ARC_OVER = new Color('#040d21'); // over the globe disc (matches the bg navy)
  const ARC_OFF  = new Color('#ffffff'); // past the horizon (bright white)

  function silhouettePatch(m, R) {
    m.uniforms.uR       = { value: R };
    m.uniforms.uOver    = { value: ARC_OVER };
    m.uniforms.uOff     = { value: ARC_OFF };
    m.uniforms.uEnabled = { value: get(theme) === 'light' ? 0 : 1 };

    m.vertexShader = m.vertexShader
      .replace(
        'varying float vRelDistance;',
        'varying float vRelDistance;\nvarying vec3 vVP;\nvarying vec3 vSC;'
      )
      .replace(
        'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
        'vec4 mv = modelViewMatrix * vec4(position, 1.0);\n' +
        '      vVP = mv.xyz;\n' +
        '      vSC = (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;\n' +
        '      gl_Position = projectionMatrix * mv;'
      );

    m.fragmentShader = m.fragmentShader
      .replace(
        'varying float vRelDistance;',
        'varying float vRelDistance;\n' +
        'varying vec3 vVP;\nvarying vec3 vSC;\n' +
        'uniform float uR;\nuniform vec3 uOver;\nuniform vec3 uOff;\nuniform float uEnabled;'
      )
      .replace(
        'gl_FragColor = vColor;',
        'vec3 rd = normalize(vVP);\n' +
        '      float t = dot(vSC, rd);\n' +
        '      float dp = length(vSC - t * rd);\n' +
        '      float aa = uR * 0.0025;\n' +
        '      float onGlobe = (t > 0.0) ? (1.0 - smoothstep(uR - aa, uR + aa, dp)) : 0.0;\n' +
        '      vec3 fx = mix(uOff, uOver, onGlobe);\n' +
        '      gl_FragColor = vec4(mix(vColor.rgb, fx, uEnabled), vColor.a);'
      );

    m.needsUpdate = true;
    arcMats.push(m);
  }

  // Arc materials are created asynchronously (and cloned per-arc) by three-globe,
  // so patch lazily from the render loop. Cheap boolean check after the first hit.
  function styleArcs() {
    if (arcsStyled || !globe) return;
    const R = globe.getGlobeRadius ? globe.getGlobeRadius() : 100;
    let found = false;
    globe.traverse((o) => {
      const m = o.material;
      if (!m || !m.uniforms || !m.uniforms.dashTranslate || m.userData.counterChange) return;
      m.userData.counterChange = true;
      silhouettePatch(m, R);
      found = true;
    });
    if (found) arcsStyled = true;
  }

  function updateGlobeMaterial(isLight) {
    if (!globe) return;
    const mat = globe.globeMaterial();
    globe.showAtmosphere(false);
    mat.transparent = true;
    // Counter-change effect is dark mode only; light mode keeps the original arcs.
    for (const m of arcMats) if (m.uniforms.uEnabled) m.uniforms.uEnabled.value = isLight ? 0 : 1;
    if (isLight) {
      mat.opacity = 0;
      globe.hexPolygonColor(() => '#000000');
      globe.arcColor(() => '#000000');
      globe.labelColor(() => '#000000');
      globe.pointColor(() => '#000000');
    } else {
      mat.opacity = 1;
      mat.color.set('#ffffff');
      globe.hexPolygonColor(() => '#040d21');
      globe.arcColor(() => '#ffffff');
      globe.labelColor(() => '#66E3FF');
      globe.pointColor(() => '#040d21');
    }
  }

  function buildGlobe(w, h) {
    renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);

    scene = new Scene();
    scene.add(new AmbientLight(0xbbbbbb, 0.3));

    camera = new PerspectiveCamera();
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    const dLight = new DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);

    const dLight1 = new DirectionalLight(0x7982f6, 1);
    dLight1.position.set(-200, 500, 200);
    camera.add(dLight1);

    camera.position.z = 400;
    scene.add(camera);
    scene.fog = new Fog(0x535ef3, 400, 2000);

    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;

    if (isMobile) {
      renderer.domElement.style.touchAction = 'pan-y';
    }

    globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.65)
      .showAtmosphere(true)
      .atmosphereColor('#3a228a')
      .atmosphereAltitude(0.25)
      .hexPolygonColor(() => 'rgba(255,255,255, 0.7)');

    setTimeout(() => {
      globe
        .arcsData(travelHistory.flights)
        // Dark mode arcs are recoloured by the silhouette shader (navy/white);
        // light mode keeps the original black lines.
        .arcColor(() => get(theme) === 'light' ? '#000000' : '#ffffff')
        .arcAltitude(e => e.arcAlt)
        .arcStroke(0.4)
        .arcDashLength(e => e.dashLength)
        .arcDashGap(e => e.dashGap)
        // Here we use the global animation cycle but stagger by startTime.
        // arcDashAnimateTime is the whole loop duration.
        .arcDashInitialGap(e => {
            const cycleLength = e.dashLength + e.dashGap;
            const startTimeInCycle = (e.startTime / GLOBAL_SPEED) / TOTAL_CYCLE_TIME;
            // We want the dash to be at position 0 at t = startTime.
            return startTimeInCycle * cycleLength;
        })
        .arcDashAnimateTime(TOTAL_CYCLE_TIME)
        .labelsData(airportHistory.airports.filter(a => a.showLabel))
        .labelColor(() => get(theme) === 'light' ? '#000000' : '#66E3FF')
        .labelText('text')
        .labelSize(2)
        .pointsData(airportHistory.airports)
        .pointColor(() => get(theme) === 'light' ? '#000000' : '#040d21')
        .pointRadius(0.0)
        .pointAltitude(d => d.alt ?? 0.07);
    }, 1000);

    globe.rotateY(-Math.PI * (5 / 9));
    globe.rotateZ(-Math.PI / 6);
    updateGlobeMaterial(get(theme) === 'light');
    scene.add(globe);

    built = true;
  }

  function startRendering() {
    if (rendering) return;
    rendering = true;
    function loop() {
      if (!rendering) return;
      renderRaf = requestAnimationFrame(loop);
      styleArcs();
      camera.lookAt(scene.position);
      controls.update();
      renderer.render(scene, camera);
    }
    loop();
  }

  function stopRendering() {
    rendering = false;
    if (renderRaf) cancelAnimationFrame(renderRaf);
    renderRaf = null;
  }

  onMount(() => {
    let active = true;
    let raf1, raf2, resizeTimer, onResize;

    const unsubTheme = theme.subscribe(t => updateGlobeMaterial(t === 'light'));

    function fit() {
      if (!container || !renderer || !camera) return;
      const rw = container.clientWidth;
      const rh = container.clientHeight;
      if (rw > 0 && rh > 0) {
        camera.aspect = rw / rh;
        camera.updateProjectionMatrix();
        renderer.setSize(rw, rh);
      }
    }

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!active) return;

        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || 600;

        if (!built) buildGlobe(w, h);

        // (Re)attach the persistent canvas to this page's container, then size
        // it and resume rendering. The globe's flight animation has been
        // advancing the whole time, so it picks up seamlessly.
        container.appendChild(renderer.domElement);
        fit();
        startRendering();

        onResize = fit;
        window.addEventListener('resize', onResize);
        resizeTimer = setTimeout(fit, 150);
      });
    });

    return () => {
      active = false;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(resizeTimer);
      unsubTheme();
      if (onResize) window.removeEventListener('resize', onResize);
      // Pause our render loop and detach the canvas, but DO NOT dispose the
      // globe — keeping it alive is what lets the flights persist across
      // navigations (and avoids leaking WebGL contexts).
      stopRendering();
      renderer?.domElement?.remove();
    };
  });
</script>

<div bind:this={container} id="globe-container"></div>

<style>
  :global(#globe-container canvas) {
    cursor: default !important;
  }
</style>
