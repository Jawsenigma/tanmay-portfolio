"use client";

import { useEffect, useRef } from "react";

type Props = {
  density?: number;
  className?: string;
};

export function ParticleField({ density = 700, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      if (disposed || !containerRef.current) return;

      const w = container.clientWidth || 800;
      const h = container.clientHeight || 600;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
      camera.position.set(0, 0, 9);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const positions = new Float32Array(density * 3);
      const colors = new Float32Array(density * 3);
      const phases = new Float32Array(density);

      for (let i = 0; i < density; i++) {
        const r = 3.5 + Math.pow(Math.random(), 0.5) * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
        positions[i * 3 + 2] = r * Math.cos(phi);

        const roll = Math.random();
        if (roll < 0.55) {
          colors[i * 3] = 0.96;
          colors[i * 3 + 1] = 0.65;
          colors[i * 3 + 2] = 0.14;
        } else if (roll < 0.85) {
          colors[i * 3] = 0.38;
          colors[i * 3 + 1] = 0.65;
          colors[i * 3 + 2] = 0.98;
        } else {
          colors[i * 3] = 1;
          colors[i * 3 + 1] = 1;
          colors[i * 3 + 2] = 1;
        }

        phases[i] = Math.random() * Math.PI * 2;
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.075,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geom, mat);
      scene.add(points);

      // Connecting line cluster - gives a "graph" feel
      const lineCount = 80;
      const linePositions = new Float32Array(lineCount * 2 * 3);
      for (let i = 0; i < lineCount; i++) {
        const a = Math.floor(Math.random() * density);
        let b = Math.floor(Math.random() * density);
        if (b === a) b = (b + 1) % density;
        for (let k = 0; k < 3; k++) {
          linePositions[i * 6 + k] = positions[a * 3 + k];
          linePositions[i * 6 + 3 + k] = positions[b * 3 + k];
        }
      }
      const lineGeom = new THREE.BufferGeometry();
      lineGeom.setAttribute(
        "position",
        new THREE.BufferAttribute(linePositions, 3),
      );
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xf5a524,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const lines = new THREE.LineSegments(lineGeom, lineMat);
      scene.add(lines);

      const onMouse = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };
      window.addEventListener("mousemove", onMouse);

      const clock = new THREE.Clock();
      let raf = 0;
      const tick = () => {
        const t = clock.getElapsedTime();
        const targetRotY = t * 0.04 + mouseRef.current.x * 0.4;
        const targetRotX = Math.sin(t * 0.06) * 0.08 + mouseRef.current.y * 0.2;
        points.rotation.y += (targetRotY - points.rotation.y) * 0.03;
        points.rotation.x += (targetRotX - points.rotation.x) * 0.03;
        lines.rotation.copy(points.rotation);

        // Pulse opacity subtly
        mat.opacity = 0.7 + Math.sin(t * 0.5) * 0.1;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      const onResize = () => {
        if (!containerRef.current) return;
        const nw = containerRef.current.clientWidth;
        const nh = containerRef.current.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouse);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        geom.dispose();
        mat.dispose();
        lineGeom.dispose();
        lineMat.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [density]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
