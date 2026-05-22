"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const displacementVertex = /* glsl */ `
  uniform float uBass;
  uniform float uMids;
  uniform float uTime;
  varying float vDisp;

  vec3 displace(vec3 p) {
    float n = sin(p.x * 3.0 + uTime) * cos(p.y * 2.5 - uTime * 0.7);
    float d = n * uMids * 0.35 + uBass * 0.12;
    return p + normalize(p) * d;
  }

  void main() {
    vec3 displaced = displace(position);
    vDisp = length(displaced - position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const wireframeFragment = /* glsl */ `
  uniform float uBeat;
  varying float vDisp;

  void main() {
    float alpha = 0.35 + vDisp * 2.0 + uBeat * 0.25;
    gl_FragColor = vec4(1.0, 1.0, 1.0, clamp(alpha, 0.12, 0.95));
  }
`;

/** Inverted screensaver: ink wireframe on snow — no white gradient */
const wireframeFragmentLight = /* glsl */ `
  uniform float uBeat;
  varying float vDisp;

  void main() {
    float alpha = 0.22 + vDisp * 1.4 + uBeat * 0.12;
    gl_FragColor = vec4(0.04, 0.04, 0.04, clamp(alpha, 0.1, 0.55));
  }
`;

const SNOW = 0xfcfcfa;
const INK = 0x0a0a0a;
/** Icosahedron radius + wireframe displacement headroom */
const GLOBE_RADIUS = 1.12;
const VIEW_INSET = 0.28;
const ROAM_FACTOR = 0.68;

function viewportDriftBounds(camera: THREE.PerspectiveCamera, aspect: number): { x: number; y: number } {
  const dist = camera.position.z;
  const halfH = Math.tan((camera.fov * Math.PI) / 360) * dist;
  const halfW = halfH * aspect;
  const pad = GLOBE_RADIUS + VIEW_INSET;
  return {
    x: Math.max(0.04, halfW - pad),
    y: Math.max(0.04, halfH - pad),
  };
}

type VisualizerScene = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  floatRoot: THREE.Group;
  core: THREE.Mesh;
  coreMat: THREE.ShaderMaterial;
  particles: THREE.Points;
  particleMat: THREE.PointsMaterial;
  fog: THREE.FogExp2;
  clock: THREE.Clock;
  raf: number;
  theme: "dark" | "light";
};

function buildScene(container: HTMLDivElement, theme: "dark" | "light"): VisualizerScene {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const isLight = theme === "light";

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);
  renderer.setClearColor(isLight ? SNOW : 0x000000, 1);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(isLight ? SNOW : 0x000000, isLight ? 0.032 : 0.045);
  const fog = scene.fog as THREE.FogExp2;

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
  camera.position.set(0, 0, 5.6);

  const coreGeo = new THREE.IcosahedronGeometry(1.05, 2);
  const coreMat = new THREE.ShaderMaterial({
    uniforms: {
      uBass: { value: 0 },
      uMids: { value: 0 },
      uTime: { value: 0 },
      uBeat: { value: 0 },
    },
    vertexShader: displacementVertex,
    fragmentShader: isLight ? wireframeFragmentLight : wireframeFragment,
    wireframe: true,
    transparent: true,
    depthWrite: false,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  const floatRoot = new THREE.Group();
  floatRoot.add(core);

  const particleCount = 1200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const r = 2.2 + Math.random() * 2.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: isLight ? INK : 0xffffff,
    size: 0.018,
    transparent: true,
    opacity: isLight ? 0.1 : 0.35,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  if (!isLight) {
    floatRoot.add(particles);
  }
  scene.add(floatRoot);

  return {
    renderer,
    scene,
    camera,
    floatRoot,
    core,
    coreMat,
    particles,
    particleMat,
    fog,
    clock: new THREE.Clock(),
    raf: 0,
    theme,
  };
}

function disposeScene(v: VisualizerScene, container: HTMLDivElement): void {
  cancelAnimationFrame(v.raf);
  v.core.geometry.dispose();
  v.coreMat.dispose();
  v.particles.geometry.dispose();
  v.particleMat.dispose();
  v.renderer.dispose();
  if (container.contains(v.renderer.domElement)) {
    container.removeChild(v.renderer.domElement);
  }
}

export function MonochromeAudioVisualizer({
  className,
  mode = "idle",
  theme = "dark",
}: {
  className?: string;
  mode?: "idle" | "reactive";
  /** light = snow field + ink wireframe screensaver (inverted from dark) */
  theme?: "dark" | "light";
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<VisualizerScene | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const viz = buildScene(host, theme);
    sceneRef.current = viz;

    let bounceX = 0;
    let bounceY = 0;
    let velX = 0.011 * (Math.random() > 0.5 ? 1 : -1);
    let velY = 0.008 * (Math.random() > 0.5 ? 1 : -1);
    let boundX = 0.2;
    let boundY = 0.15;

    const tick = () => {
      const dt = Math.min(viz.clock.getDelta(), 0.05);
      const t = viz.clock.elapsedTime;

      if (mode === "idle") {
        const slow = t * 0.12;

        viz.coreMat.uniforms.uBass.value = 0.02;
        viz.coreMat.uniforms.uMids.value = 0.015;
        viz.coreMat.uniforms.uTime.value = slow;
        viz.coreMat.uniforms.uBeat.value = 0;

        viz.core.rotation.y += dt * 0.018;
        viz.core.rotation.x += dt * 0.006;

        viz.particleMat.opacity = viz.theme === "light" ? 0.1 : 0.26;
        viz.particles.rotation.y -= dt * 0.006;
        viz.particles.scale.setScalar(1);

        bounceX += velX * dt;
        bounceY += velY * dt;
        if (bounceX > boundX) {
          bounceX = boundX;
          velX *= -1;
        } else if (bounceX < -boundX) {
          bounceX = -boundX;
          velX *= -1;
        }
        if (bounceY > boundY) {
          bounceY = boundY;
          velY *= -1;
        } else if (bounceY < -boundY) {
          bounceY = -boundY;
          velY *= -1;
        }
        viz.floatRoot.position.set(bounceX, bounceY, 0);

        viz.camera.position.set(0, 0, 5.6);
        viz.camera.lookAt(0, 0, 0);
        viz.fog.density = viz.theme === "light" ? 0.032 : 0.042;
      }

      viz.renderer.render(viz.scene, viz.camera);
      viz.raf = requestAnimationFrame(tick);
    };
    viz.raf = requestAnimationFrame(tick);

    const updateBounds = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w === 0 || h === 0) return;
      const aspect = w / h;
      viz.camera.aspect = aspect;
      viz.camera.updateProjectionMatrix();
      const b = viewportDriftBounds(viz.camera, aspect);
      boundX = b.x * ROAM_FACTOR;
      boundY = b.y * ROAM_FACTOR;
      bounceX = Math.max(-boundX, Math.min(boundX, bounceX));
      bounceY = Math.max(-boundY, Math.min(boundY, bounceY));
      viz.renderer.setSize(w, h, false);
    };

    const ro = new ResizeObserver(() => updateBounds());
    updateBounds();
    ro.observe(host);

    return () => {
      ro.disconnect();
      disposeScene(viz, host);
      sceneRef.current = null;
    };
  }, [mode, theme]);

  return (
    <div
      ref={hostRef}
      className={
        className ??
        `w-full h-[min(280px,42vw)] min-h-[220px] max-h-[320px] ${
          theme === "light" ? "bg-snow-50" : "bg-black"
        }`
      }
      aria-hidden
    />
  );
}
