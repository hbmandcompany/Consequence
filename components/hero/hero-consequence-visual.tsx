"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import * as THREE from "three";

const SNOW = 0xf8f7f3;
const INK = 0x0a0a0a;
const TIFF = 0x7fd4cc;

type HeroScene = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  rig: THREE.Group;
  particles: THREE.Points;
  particleAngles: number[];
  clock: THREE.Clock;
  raf: number;
  disposables: THREE.BufferGeometry[];
  disposableMats: THREE.Material[];
};

function lineMat(color: number, opacity: number) {
  return new THREE.LineBasicMaterial({ color, transparent: true, opacity });
}

function addLine(
  group: THREE.Group,
  points: THREE.Vector3[],
  material: THREE.LineBasicMaterial,
  store: { geo: THREE.BufferGeometry[]; mat: THREE.Material[] }
) {
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  store.geo.push(geo);
  store.mat.push(material);
  group.add(new THREE.Line(geo, material));
}

function ellipsePoints(
  rx: number,
  ry: number,
  segments: number,
  tiltX = 0,
  tiltZ = 0
): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    const x = Math.cos(a) * rx;
    const y = Math.sin(a) * ry;
    const p = new THREE.Vector3(x, y, 0);
    p.applyAxisAngle(new THREE.Vector3(1, 0, 0), tiltX);
    p.applyAxisAngle(new THREE.Vector3(0, 0, 1), tiltZ);
    pts.push(p);
  }
  return pts;
}

function buildHeroScene(container: HTMLDivElement): HeroScene {
  const w = container.clientWidth;
  const h = container.clientHeight;
  const store = { geo: [] as THREE.BufferGeometry[], mat: [] as THREE.Material[] };

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h, true);
  renderer.setClearColor(SNOW, 1);
  const canvas = renderer.domElement;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.margin = "0 auto";
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(SNOW, 0.06);

  const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 60);
  camera.position.set(0, 0, 5.8);

  const rig = new THREE.Group();

  // Floor lattice
  const gridY = -0.7;
  for (let i = -4; i <= 4; i++) {
    addLine(
      rig,
      [
        new THREE.Vector3(i * 0.38, gridY, -1.1),
        new THREE.Vector3(i * 0.38, gridY, 1.1),
      ],
      lineMat(INK, 0.06),
      store
    );
    addLine(
      rig,
      [
        new THREE.Vector3(-1.5, gridY, i * 0.28),
        new THREE.Vector3(1.5, gridY, i * 0.28),
      ],
      lineMat(INK, 0.05),
      store
    );
  }

  const core = new THREE.Group();

  // Single vertical axis
  addLine(
    core,
    [new THREE.Vector3(0, -0.9, 0), new THREE.Vector3(0, 0.95, 0)],
    lineMat(INK, 0.16),
    store
  );

  // One primary portal — symmetric tilts so mass stays centered in frame
  addLine(core, ellipsePoints(0.78, 1.02, 80, 0.5, 0.18), lineMat(TIFF, 0.45), store);
  addLine(core, ellipsePoints(0.78, 1.02, 80, -0.5, -0.18), lineMat(INK, 0.14), store);
  addLine(core, ellipsePoints(0.52, 0.68, 64, 0.85, 0), lineMat(INK, 0.1), store);

  // Radial ticks
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * Math.PI * 2;
    const px = Math.cos(a) * 0.78;
    const py = Math.sin(a) * 1.02;
    addLine(
      core,
      [new THREE.Vector3(px * 0.92, py * 0.92, 0), new THREE.Vector3(px, py, 0.04)],
      lineMat(k % 3 === 0 ? TIFF : INK, 0.22),
      store
    );
  }

  // Waveform ribbons through the single field
  for (let i = 0; i < 11; i++) {
    const lane = (i - 5) * 0.08;
    const pts: THREE.Vector3[] = [];
    for (let s = 0; s <= 32; s++) {
      const u = s / 32;
      const x = Math.sin(u * Math.PI * 2 + i * 0.35) * 0.95;
      const y = lane + Math.sin(u * Math.PI * 3.2) * 0.14;
      const z = Math.cos(u * Math.PI * 1.5) * 0.28;
      pts.push(new THREE.Vector3(x, y, z));
    }
    addLine(core, pts, lineMat(INK, 0.1 + (i % 4) * 0.02), store);
  }

  // Horizontal scan strata
  for (let j = 0; j < 4; j++) {
    const pts: THREE.Vector3[] = [];
    for (let s = 0; s <= 28; s++) {
      const u = s / 28;
      const x = -1.35 + u * 2.7;
      pts.push(
        new THREE.Vector3(
          x,
          -0.42 + j * 0.2 + Math.sin(u * Math.PI * 5 + j * 0.7) * 0.035,
          0.2 + j * 0.06
        )
      );
    }
    addLine(core, pts, lineMat(INK, 0.07), store);
  }

  core.position.set(0, 0.08, 0);
  rig.add(core);
  rig.scale.setScalar(1.1);
  scene.add(rig);

  // Particles on one orbital path (parented to core so they stay aligned)
  const particleCount = 72;
  const positions = new Float32Array(particleCount * 3);
  const particleAngles = Array.from(
    { length: particleCount },
    (_, i) => (i / particleCount) * Math.PI * 2
  );
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  store.geo.push(particleGeo);
  const particleMat = new THREE.PointsMaterial({
    color: TIFF,
    size: 0.02,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
  });
  store.mat.push(particleMat);
  const particles = new THREE.Points(particleGeo, particleMat);
  core.add(particles);

  return {
    renderer,
    scene,
    camera,
    rig,
    particles,
    particleAngles,
    clock: new THREE.Clock(),
    raf: 0,
    disposables: store.geo,
    disposableMats: store.mat,
  };
}

function updateParticles(viz: HeroScene, t: number) {
  const pos = viz.particles.geometry.attributes.position as THREE.BufferAttribute;
  viz.particleAngles.forEach((base, i) => {
    const a = base + t * 0.32;
    const rx = 0.76;
    const ry = 1.0;
    const x = Math.cos(a) * rx;
    const y = Math.sin(a) * ry + Math.sin(t * 0.5 + i * 0.2) * 0.04;
    const z = Math.sin(a * 2 + t * 0.4) * 0.14;
    pos.setXYZ(i, x, y, z);
  });
  pos.needsUpdate = true;
}

function disposeHeroScene(v: HeroScene, container: HTMLDivElement) {
  cancelAnimationFrame(v.raf);
  v.disposables.forEach((g) => g.dispose());
  v.disposableMats.forEach((m) => m.dispose());
  v.renderer.dispose();
  if (container.contains(v.renderer.domElement)) {
    container.removeChild(v.renderer.domElement);
  }
}

export function HeroConsequenceVisual({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const viz = buildHeroScene(host);

    const tick = () => {
      const t = viz.clock.getElapsedTime();
      const dt = Math.min(viz.clock.getDelta(), 0.05);

      viz.rig.rotation.y += dt * 0.05;
      viz.rig.position.y = Math.sin(t * 0.38) * 0.035;

      updateParticles(viz, t);

      viz.camera.position.x = 0;
      viz.camera.position.y = Math.sin(t * 0.18) * 0.02;
      viz.camera.lookAt(0, 0.06, 0);

      viz.renderer.render(viz.scene, viz.camera);
      viz.raf = requestAnimationFrame(tick);
    };
    viz.raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (width === 0 || height === 0) return;
      viz.camera.aspect = width / height;
      viz.camera.updateProjectionMatrix();
      viz.renderer.setSize(width, height, true);
    });
    ro.observe(host);

    return () => {
      ro.disconnect();
      disposeHeroScene(viz, host);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={clsx(
        "relative mx-auto flex items-center justify-center overflow-hidden rounded-lg border border-ink/10 bg-snow-100",
        className ?? "w-full aspect-[5/4] max-h-[300px]",
      )}
      aria-hidden
    />
  );
}
