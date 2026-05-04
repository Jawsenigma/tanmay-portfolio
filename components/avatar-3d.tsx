"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Loader2 } from "lucide-react";
import { setFaviconState } from "@/lib/favicon-events";

type Mode = "idle" | "loading" | "live" | "error";
type Pt = { x: number; y: number; z: number };

const BONES: [number, number][] = [
  [11, 12],
  [11, 13], [13, 15],
  [12, 14], [14, 16],
  [11, 23], [12, 24], [23, 24],
  [23, 25], [25, 27], [27, 31],
  [24, 26], [26, 28], [28, 32],
  [15, 17], [15, 19], [17, 19],
  [16, 18], [16, 20], [18, 20],
  [0, 11], [0, 12],
];

const IDLE_POSE: Pt[] = [
  { x: 0,     y: 0.78, z: 0.04 },
  { x: -0.04, y: 0.82, z: 0.05 },
  { x: -0.06, y: 0.82, z: 0.05 },
  { x: -0.08, y: 0.82, z: 0.05 },
  { x:  0.04, y: 0.82, z: 0.05 },
  { x:  0.06, y: 0.82, z: 0.05 },
  { x:  0.08, y: 0.82, z: 0.05 },
  { x: -0.10, y: 0.80, z: 0.00 },
  { x:  0.10, y: 0.80, z: 0.00 },
  { x: -0.03, y: 0.73, z: 0.06 },
  { x:  0.03, y: 0.73, z: 0.06 },
  { x: -0.20, y: 0.55, z: 0 },
  { x:  0.20, y: 0.55, z: 0 },
  { x: -0.27, y: 0.30, z: 0.02 },
  { x:  0.27, y: 0.30, z: 0.02 },
  { x: -0.31, y: 0.05, z: 0.04 },
  { x:  0.31, y: 0.05, z: 0.04 },
  { x: -0.33, y: 0.00, z: 0.05 },
  { x:  0.33, y: 0.00, z: 0.05 },
  { x: -0.32, y: -0.01, z: 0.05 },
  { x:  0.32, y: -0.01, z: 0.05 },
  { x: -0.30, y: 0.02, z: 0.04 },
  { x:  0.30, y: 0.02, z: 0.04 },
  { x: -0.10, y: 0.05, z: 0 },
  { x:  0.10, y: 0.05, z: 0 },
  { x: -0.12, y: -0.32, z: 0.01 },
  { x:  0.12, y: -0.32, z: 0.01 },
  { x: -0.13, y: -0.68, z: 0.02 },
  { x:  0.13, y: -0.68, z: 0.02 },
  { x: -0.13, y: -0.71, z: 0.07 },
  { x:  0.13, y: -0.71, z: 0.07 },
  { x: -0.14, y: -0.72, z: -0.06 },
  { x:  0.14, y: -0.72, z: -0.06 },
];

function applyIdleSway(t: number): Pt[] {
  const hipX = Math.sin(t * 0.7) * 0.018;
  const shoulderX = Math.sin(t * 0.7 + Math.PI) * 0.012;
  const breath = Math.sin(t * 1.3) * 0.006;
  const headBob = Math.sin(t * 0.9 + 0.5) * 0.008;
  const headRotZ = Math.sin(t * 0.4) * 0.015;
  const armSwingY = Math.sin(t * 0.8) * 0.018;

  return IDLE_POSE.map((p, i) => {
    let { x, y, z } = p;
    if (i >= 23 && i <= 24) x += hipX;
    if (i >= 25 && i <= 32) x += hipX * 0.6;
    if (i === 11 || i === 12) {
      x += shoulderX;
      y += breath;
    }
    if (i >= 13 && i <= 22) {
      x += shoulderX * 0.6;
    }
    if (i === 15 || i === 16) y += i === 15 ? armSwingY : -armSwingY;
    if (i === 13 || i === 14) y += (i === 13 ? armSwingY : -armSwingY) * 0.4;
    if (i >= 0 && i <= 10) {
      y += headBob;
      x += headRotZ * 0.1;
    }
    return { x, y, z };
  });
}

export function Avatar3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const [error, setError] = useState("");
  const [fps, setFps] = useState(0);
  const sceneRef = useRef<{
    cleanup: () => void;
    setLandmarker: (l: unknown) => void;
    setPoseSource: (s: "idle" | "live") => void;
    getVideo: () => HTMLVideoElement | null;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      if (disposed || !containerRef.current) return;

      const w = container.clientWidth || 480;
      const h = container.clientHeight || 360;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
      camera.position.set(0, 0.05, 2.6);
      camera.lookAt(0, 0.05, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0x6b6b80, 0.6));
      const key = new THREE.DirectionalLight(0xffffff, 0.85);
      key.position.set(2, 3, 4);
      scene.add(key);
      const accent = new THREE.PointLight(0xf5a524, 2.2, 6);
      accent.position.set(-1.5, 1, 1.5);
      scene.add(accent);
      const rim = new THREE.PointLight(0x60a5fa, 1.4, 6);
      rim.position.set(1.5, 0.5, -1.5);
      scene.add(rim);

      const group = new THREE.Group();
      scene.add(group);

      const jointGeom = new THREE.SphereGeometry(0.022, 14, 14);
      const jointMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xf5a524,
        emissiveIntensity: 0.45,
        roughness: 0.35,
        metalness: 0.1,
      });
      const joints: InstanceType<typeof THREE.Mesh>[] = [];
      for (let i = 0; i < 33; i++) {
        const m = new THREE.Mesh(jointGeom, jointMat);
        group.add(m);
        joints.push(m);
      }

      const boneGeom = new THREE.CylinderGeometry(0.011, 0.011, 1, 8);
      const boneMat = new THREE.MeshStandardMaterial({
        color: 0xf5a524,
        emissive: 0xf5a524,
        emissiveIntensity: 0.55,
        roughness: 0.45,
        metalness: 0.0,
      });
      const bones: InstanceType<typeof THREE.Mesh>[] = [];
      for (let i = 0; i < BONES.length; i++) {
        const m = new THREE.Mesh(boneGeom, boneMat);
        group.add(m);
        bones.push(m);
      }

      const groundGeom = new THREE.CircleGeometry(0.6, 32);
      const groundMat = new THREE.MeshBasicMaterial({
        color: 0xf5a524,
        transparent: true,
        opacity: 0.06,
      });
      const ground = new THREE.Mesh(groundGeom, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.74;
      scene.add(ground);

      const tmpA = new THREE.Vector3();
      const tmpB = new THREE.Vector3();
      const tmpDir = new THREE.Vector3();
      const upY = new THREE.Vector3(0, 1, 0);

      let landmarker: {
        detectForVideo: (
          v: HTMLVideoElement,
          t: number,
        ) => { worldLandmarks?: { x: number; y: number; z: number }[][] };
        close: () => void;
      } | null = null;
      let poseSource: "idle" | "live" = "idle";

      const clock = new THREE.Clock();
      let raf = 0;
      let frames = 0;
      let lastFpsT = performance.now();
      let displayed: Pt[] = applyIdleSway(0);

      const tick = () => {
        const t = clock.getElapsedTime();

        let target: Pt[] = applyIdleSway(t);

        if (
          poseSource === "live" &&
          videoRef.current &&
          videoRef.current.readyState >= 2 &&
          landmarker
        ) {
          try {
            const result = landmarker.detectForVideo(
              videoRef.current,
              performance.now(),
            );
            if (result.worldLandmarks?.[0]) {
              target = result.worldLandmarks[0].map((p) => ({
                x: -p.x,
                y: -p.y,
                z: -p.z,
              }));
            }
          } catch {
            // fall through to idle
          }
        }

        const lerp = poseSource === "live" ? 0.55 : 0.18;
        displayed = displayed.map((d, i) => ({
          x: d.x + (target[i].x - d.x) * lerp,
          y: d.y + (target[i].y - d.y) * lerp,
          z: d.z + (target[i].z - d.z) * lerp,
        }));

        for (let i = 0; i < 33; i++) {
          const lm = displayed[i];
          joints[i].position.set(lm.x, lm.y, lm.z);
        }

        for (let i = 0; i < BONES.length; i++) {
          const [a, b] = BONES[i];
          tmpA.copy(joints[a].position);
          tmpB.copy(joints[b].position);
          tmpDir.subVectors(tmpB, tmpA);
          const len = tmpDir.length();
          if (len < 1e-5) continue;
          bones[i].position.copy(tmpA).addScaledVector(tmpDir, 0.5);
          bones[i].scale.set(1, len, 1);
          bones[i].quaternion.setFromUnitVectors(
            upY,
            tmpDir.normalize(),
          );
        }

        if (poseSource === "idle") {
          group.rotation.y = Math.sin(t * 0.25) * 0.35;
        } else {
          group.rotation.y += (0 - group.rotation.y) * 0.1;
        }

        renderer.render(scene, camera);

        frames++;
        const now = performance.now();
        if (now - lastFpsT > 800) {
          setFps(Math.round((frames * 1000) / (now - lastFpsT)));
          frames = 0;
          lastFpsT = now;
        }

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
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        jointGeom.dispose();
        jointMat.dispose();
        boneGeom.dispose();
        boneMat.dispose();
        groundGeom.dispose();
        groundMat.dispose();
        renderer.dispose();
      };

      sceneRef.current = {
        cleanup,
        setLandmarker: (l) => {
          landmarker = l as typeof landmarker;
        },
        setPoseSource: (s) => {
          poseSource = s;
        },
        getVideo: () => videoRef.current,
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
      sceneRef.current = null;
    };
  }, []);

  async function enableCamera() {
    setMode("loading");
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: "user" },
        audio: false,
      });
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();

      const { PoseLandmarker, FilesetResolver } = await import(
        "@mediapipe/tasks-vision"
      );
      const fileset = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm",
      );
      const landmarker = await PoseLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });

      sceneRef.current?.setLandmarker(landmarker);
      sceneRef.current?.setPoseSource("live");
      setMode("live");
      setFaviconState("avatar", "active");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      setMode("error");
    }
  }

  function disableCamera() {
    sceneRef.current?.setPoseSource("idle");
    sceneRef.current?.setLandmarker(null);
    setFaviconState("avatar", "idle");
    const video = videoRef.current;
    if (video?.srcObject) {
      (video.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      video.srcObject = null;
    }
    setMode("idle");
  }

  return (
    <div className="rounded-lg border border-border bg-bg-elev overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-bg-elev-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              mode === "live" ? "bg-success pulse-dot" : "bg-fg-dim"
            }`}
          />
          <span className="font-mono text-xs text-fg-muted">
            avatar ·{" "}
            {mode === "live"
              ? "live · pose-driven"
              : mode === "loading"
                ? "loading mediapipe…"
                : mode === "error"
                  ? "error"
                  : "idle · ambient"}
          </span>
        </div>
        {fps > 0 && (
          <span className="font-mono text-xs text-accent stat-num">
            {fps} fps
          </span>
        )}
      </div>

      <div
        ref={containerRef}
        className="relative aspect-[4/3] bg-gradient-to-br from-bg-elev to-black"
      >
        <video
          ref={videoRef}
          playsInline
          muted
          className="absolute opacity-0 pointer-events-none w-1 h-1"
        />

        {mode !== "live" && mode !== "error" && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center pointer-events-none">
            <button
              onClick={enableCamera}
              disabled={mode === "loading"}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-md bg-accent text-accent-fg px-3 py-1.5 text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {mode === "loading" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Camera className="w-3.5 h-3.5" />
              )}
              {mode === "loading" ? "Loading…" : "Mirror me"}
            </button>
          </div>
        )}

        {mode === "live" && (
          <button
            onClick={disableCamera}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-bg-elev/90 border border-border px-2.5 py-1.5 text-xs text-fg hover:border-danger hover:text-danger transition-colors"
          >
            <CameraOff className="w-3.5 h-3.5" /> Stop
          </button>
        )}

        {mode === "error" && (
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="text-center">
              <div className="text-sm text-danger mb-1">
                Couldn&apos;t enable camera
              </div>
              <div className="text-xs text-fg-muted mb-3 break-words max-w-xs">
                {error}
              </div>
              <button
                onClick={() => setMode("idle")}
                className="text-xs text-fg-muted hover:text-fg underline"
              >
                Back to idle
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-border bg-bg-elev-2 text-xs text-fg-muted leading-relaxed">
        3D wireframe avatar. <span className="text-fg">Idle</span> by default - ambient sway. <span className="text-fg">Mirror me</span> drives the rig with your pose via MediaPipe (video stays on your device).
      </div>
    </div>
  );
}
