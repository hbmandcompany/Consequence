"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function damp(current: number, target: number, smoothing: number, dt: number): number {
  const k = 1 - Math.exp(-smoothing * dt);
  return current + (target - current) * k;
}

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

const ribbonVertex = /* glsl */ `
  uniform float uTime;
  attribute float aIndex;
  varying float vWave;

  void main() {
    float x = position.x;
    float wave = sin(x * 4.0 + uTime * 2.0) * 0.15;
    vec3 p = vec3(x, position.y + wave, position.z);
    vWave = wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const ribbonFragment = /* glsl */ `
  varying float vWave;

  void main() {
    float a = 0.25 + abs(vWave) * 3.0;
    gl_FragColor = vec4(1.0, 1.0, 1.0, clamp(a, 0.08, 0.7));
  }
`;

type VisualizerScene = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  core: THREE.Mesh;
  coreMat: THREE.ShaderMaterial;
  particles: THREE.Points;
  particleMat: THREE.PointsMaterial;
  ribbon: THREE.Line;
  ribbonMat: THREE.ShaderMaterial;
  fog: THREE.FogExp2;
  clock: THREE.Clock;
  raf: number;
};

function buildScene(container: HTMLDivElement): VisualizerScene {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);
  renderer.setClearColor(0x000000, 1);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.045);
  const fog = scene.fog as THREE.FogExp2;

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
  camera.position.set(0, 0.2, 5.2);

  const coreGeo = new THREE.IcosahedronGeometry(1.05, 2);
  const coreMat = new THREE.ShaderMaterial({
    uniforms: {
      uBass: { value: 0 },
      uMids: { value: 0 },
      uTime: { value: 0 },
      uBeat: { value: 0 },
    },
    vertexShader: displacementVertex,
    fragmentShader: wireframeFragment,
    wireframe: true,
    transparent: true,
    depthWrite: false,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

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
    color: 0xffffff,
    size: 0.018,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  const ribbonPoints = 128;
  const ribbonPositions = new Float32Array(ribbonPoints * 3);
  for (let i = 0; i < ribbonPoints; i++) {
    const x = (i / (ribbonPoints - 1)) * 6 - 3;
    ribbonPositions[i * 3] = x;
    ribbonPositions[i * 3 + 1] = -1.65;
    ribbonPositions[i * 3 + 2] = -0.5;
  }
  const ribbonGeo = new THREE.BufferGeometry();
  ribbonGeo.setAttribute("position", new THREE.BufferAttribute(ribbonPositions, 3));
  const ribbonMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: ribbonVertex,
    fragmentShader: ribbonFragment,
    transparent: true,
    depthWrite: false,
  });
  const ribbon = new THREE.Line(ribbonGeo, ribbonMat);
  scene.add(ribbon);

  return {
    renderer,
    scene,
    camera,
    core,
    coreMat,
    particles,
    particleMat,
    ribbon,
    ribbonMat,
    fog,
    clock: new THREE.Clock(),
    raf: 0,
  };
}

function disposeScene(v: VisualizerScene, container: HTMLDivElement): void {
  cancelAnimationFrame(v.raf);
  v.core.geometry.dispose();
  v.coreMat.dispose();
  v.particles.geometry.dispose();
  v.particleMat.dispose();
  v.ribbon.geometry.dispose();
  v.ribbonMat.dispose();
  v.renderer.dispose();
  if (container.contains(v.renderer.domElement)) {
    container.removeChild(v.renderer.domElement);
  }
}

export function MonochromeAudioVisualizer({
  className,
  mode = "idle",
}: {
  className?: string;
  /** idle = calm screensaver; reactive reserved for live audio */
  mode?: "idle" | "reactive";
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<VisualizerScene | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const viz = buildScene(host);
    sceneRef.current = viz;

    let camDrift = 0;

    const tick = () => {
      const dt = Math.min(viz.clock.getDelta(), 0.05);
      const t = viz.clock.elapsedTime;

      if (mode === "idle") {
        const slow = t * 0.12;
        viz.coreMat.uniforms.uBass.value = 0.02;
        viz.coreMat.uniforms.uMids.value = 0.015;
        viz.coreMat.uniforms.uTime.value = slow;
        viz.coreMat.uniforms.uBeat.value = 0;
        viz.ribbonMat.uniforms.uTime.value = slow * 0.6;

        viz.core.scale.setScalar(1);
        viz.core.rotation.y += dt * 0.018;
        viz.core.rotation.x += dt * 0.006;

        viz.particleMat.opacity = 0.26;
        viz.particles.rotation.y -= dt * 0.006;
        viz.particles.scale.setScalar(1);

        camDrift = damp(camDrift, Math.sin(t * 0.05) * 0.035, 0.8, dt);
        viz.camera.position.x = camDrift;
        viz.camera.position.y = 0.15 + Math.sin(t * 0.04) * 0.02;
        viz.camera.lookAt(0, 0, 0);
        viz.fog.density = 0.042;
      }

      viz.renderer.render(viz.scene, viz.camera);
      viz.raf = requestAnimationFrame(tick);
    };
    viz.raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w === 0 || h === 0) return;
      viz.camera.aspect = w / h;
      viz.camera.updateProjectionMatrix();
      viz.renderer.setSize(w, h, false);
    });
    ro.observe(host);

    return () => {
      ro.disconnect();
      disposeScene(viz, host);
      sceneRef.current = null;
    };
  }, [mode]);

  return (
    <div
      ref={hostRef}
      className={className ?? "w-full h-[min(280px,42vw)] min-h-[220px] max-h-[320px] bg-black"}
      aria-hidden
    />
  );
}
