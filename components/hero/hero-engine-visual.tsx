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
  core: THREE.Mesh;
  particles: THREE.Points;
  bridges: THREE.Line[];
  clock: THREE.Clock;
  raf: number;
  dispose: () => void;
};

function buildHeroScene(container: HTMLDivElement): HeroScene {
  const w = container.clientWidth;
  const h = container.clientHeight;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h, false);
  renderer.setClearColor(SNOW, 1);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(SNOW, 0.055);

  const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 40);
  camera.position.set(0, 0.15, 6.8);

  const rig = new THREE.Group();
  scene.add(rig);

  const panelGeo = new THREE.PlaneGeometry(1.35, 1.85, 1, 1);
  const panelEdges = new THREE.EdgesGeometry(panelGeo, 1);
  const panelMat = new THREE.LineBasicMaterial({
    color: INK,
    transparent: true,
    opacity: 0.28,
  });

  const leftPanel = new THREE.LineSegments(panelEdges, panelMat.clone());
  leftPanel.position.set(-1.55, 0, 0);
  leftPanel.rotation.y = 0.42;
  rig.add(leftPanel);

  const rightPanel = new THREE.LineSegments(panelEdges, panelMat.clone());
  rightPanel.position.set(1.55, 0, 0);
  rightPanel.rotation.y = -0.42;
  rig.add(rightPanel);

  const coreGeo = new THREE.IcosahedronGeometry(0.42, 1);
  const core = new THREE.Mesh(
    coreGeo,
    new THREE.MeshBasicMaterial({
      color: TIFF,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    })
  );
  rig.add(core);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.006, 8, 96),
    new THREE.MeshBasicMaterial({
      color: INK,
      transparent: true,
      opacity: 0.14,
    })
  );
  ring.rotation.x = Math.PI / 2;
  rig.add(ring);

  const bridgeMat = new THREE.LineBasicMaterial({
    color: INK,
    transparent: true,
    opacity: 0.16,
  });
  const bridges: THREE.Line[] = [];
  [-1.55, 1.55].forEach((x) => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x * 0.55, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ]);
    const line = new THREE.Line(geo, bridgeMat);
    rig.add(line);
    bridges.push(line);
  });

  const count = 420;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({
      color: INK,
      size: 0.02,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    })
  );
  scene.add(particles);

  const clock = new THREE.Clock();

  const dispose = () => {
    panelGeo.dispose();
    panelEdges.dispose();
    panelMat.dispose();
    coreGeo.dispose();
    (core.material as THREE.Material).dispose();
    ring.geometry.dispose();
    (ring.material as THREE.Material).dispose();
    bridges.forEach((b) => {
      b.geometry.dispose();
    });
    bridgeMat.dispose();
    particleGeo.dispose();
    (particles.material as THREE.Material).dispose();
    renderer.dispose();
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };

  return {
    renderer,
    scene,
    camera,
    rig,
    core,
    particles,
    bridges,
    clock,
    raf: 0,
    dispose,
  };
}

export function HeroEngineVisual({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const viz = buildHeroScene(host);
    let pointerX = 0;
    let pointerY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    host.addEventListener("mousemove", onMove);

    const tick = () => {
      const t = viz.clock.getElapsedTime();
      const dt = Math.min(viz.clock.getDelta(), 0.05);

      viz.rig.rotation.y = Math.sin(t * 0.12) * 0.08 + pointerX * 0.06;
      viz.rig.rotation.x = Math.sin(t * 0.09) * 0.04 - pointerY * 0.04;
      viz.core.rotation.y += dt * 0.12;
      viz.core.rotation.x += dt * 0.06;
      viz.particles.rotation.y -= dt * 0.02;

      viz.camera.position.x += (pointerX * 0.25 - viz.camera.position.x) * 0.04;
      viz.camera.position.y += (0.12 - pointerY * 0.12 - viz.camera.position.y) * 0.04;
      viz.camera.lookAt(0, 0, 0);

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
      viz.renderer.setSize(width, height, false);
    });
    ro.observe(host);

    return () => {
      cancelAnimationFrame(viz.raf);
      host.removeEventListener("mousemove", onMove);
      ro.disconnect();
      viz.dispose();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={clsx(
        "relative w-full overflow-hidden rounded-lg border border-ink/10 bg-snow-100",
        "aspect-[16/10] min-h-[100px] max-h-[140px]",
        className
      )}
      aria-hidden
    />
  );
}
