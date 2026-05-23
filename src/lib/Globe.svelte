<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { theme } from '$lib/stores/theme.js';
  import ThreeGlobe from 'three-globe';
  import {
    WebGLRenderer, Scene, Fog,
    PerspectiveCamera, AmbientLight, DirectionalLight
  } from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import countries from '../files/globe-data-min.json';
  import travelHistory from '../files/my-flights.json';
  import airportHistory from '../files/my-airports.json';

  let container;

  function updateGlobeMaterial(globe, isLight) {
    if (!globe) return;
    const mat = globe.globeMaterial();
    globe.showAtmosphere(false);
    mat.transparent = true;
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
      globe.arcColor(() => '#66E3FF');
      globe.labelColor(() => '#66E3FF');
      globe.pointColor(() => '#040d21');
    }
  }

  onMount(() => {
    let renderer, camera, scene, controls, globe;
    let rafId, raf1, raf2, resizeTimer, arcsTimer;
    let onResize;
    let active = true;

    const unsubTheme = theme.subscribe(t => updateGlobeMaterial(globe, t === 'light'));

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!active) return;

        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || 600;

        renderer = new WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

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

        // On touch devices, set pan-y so the browser handles vertical swipes as
        // page scroll even if OrbitControls calls preventDefault on touchmove.
        // Horizontal touch drags are captured by OrbitControls for globe rotation.
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

        arcsTimer = setTimeout(() => {
          if (!active) return;
          globe
            .arcsData(travelHistory.flights)
            .arcColor(() => get(theme) === 'light' ? '#000000' : '#66E3FF')
            .arcAltitude(e => e.arcAlt)
            .arcStroke(e => e.status ? 0.5 : 0.3)
            .arcDashLength(e => e.dashLength)
            .arcDashGap(e => e.dashGap)
            .arcDashInitialGap(e => e.dashInitialGap)
            .arcDashAnimateTime(7000)
            .arcsTransitionDuration(1000)
            .labelsData(airportHistory.airports.filter(a => a.showLabel))
            .labelColor(() => get(theme) === 'light' ? '#000000' : '#66E3FF')
            .labelText('text')
            .labelSize(2)
            .pointsData(airportHistory.airports)
            .pointColor(() => get(theme) === 'light' ? '#000000' : '#040d21')
            .pointRadius(0.1)
            .pointAltitude(d => d.alt ?? 0.07);
        }, 1000);

        globe.rotateY(-Math.PI * (5 / 9));
        globe.rotateZ(-Math.PI / 6);
        updateGlobeMaterial(globe, get(theme) === 'light');
        scene.add(globe);

        function animate() {
          if (!active) return;
          rafId = requestAnimationFrame(animate);
          camera.lookAt(scene.position);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();

        onResize = function () {
          if (!container || !active) return;
          const rw = container.clientWidth;
          const rh = container.clientHeight;
          if (rw > 0 && rh > 0) {
            camera.aspect = rw / rh;
            camera.updateProjectionMatrix();
            renderer.setSize(rw, rh);
          }
        };
        window.addEventListener('resize', onResize);
        resizeTimer = setTimeout(onResize, 150);
      });
    });

    return () => {
      active = false;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(arcsTimer);
      clearTimeout(resizeTimer);
      unsubTheme();
      if (onResize) window.removeEventListener('resize', onResize);
      if (renderer) {
        renderer.dispose();
        renderer.domElement?.remove();
      }
    };
  });
</script>

<div bind:this={container} id="globe-container"></div>

<style>
  :global(#globe-container canvas) {
    cursor: default !important;
  }
</style>
