"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Loader2 } from "lucide-react";

type Mode = "idle" | "loading" | "live" | "error";

const POSE_CONNECTIONS: [number, number][] = [
  [11, 13], [13, 15], [15, 17], [15, 19], [15, 21],
  [12, 14], [14, 16], [16, 18], [16, 20], [16, 22],
  [11, 12], [11, 23], [12, 24], [23, 24],
  [23, 25], [25, 27], [27, 29], [27, 31],
  [24, 26], [26, 28], [28, 30], [28, 32],
];

export function PoseMirror() {
  const [mode, setMode] = useState<Mode>("idle");
  const [error, setError] = useState<string>("");
  const [fps, setFps] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  async function start() {
    setMode("loading");
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 480, height: 360, facingMode: "user" },
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

      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      let raf = 0;
      let lastT = performance.now();
      let frames = 0;
      let lastFpsT = lastT;

      const tick = () => {
        const now = performance.now();
        if (video.readyState >= 2) {
          const result = landmarker.detectForVideo(video, now);
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (result.landmarks?.[0]) {
            const lms = result.landmarks[0];
            ctx.strokeStyle = "#f5a524";
            ctx.lineWidth = 2.5;
            ctx.lineCap = "round";
            for (const [a, b] of POSE_CONNECTIONS) {
              const p1 = lms[a];
              const p2 = lms[b];
              if (!p1 || !p2) continue;
              ctx.beginPath();
              ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height);
              ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height);
              ctx.stroke();
            }
            ctx.fillStyle = "#fff";
            for (const p of lms) {
              ctx.beginPath();
              ctx.arc(p.x * canvas.width, p.y * canvas.height, 3, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          frames++;
          if (now - lastFpsT > 500) {
            setFps(Math.round((frames * 1000) / (now - lastFpsT)));
            frames = 0;
            lastFpsT = now;
          }
          lastT = now;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      setMode("live");

      cleanupRef.current = () => {
        cancelAnimationFrame(raf);
        landmarker.close();
        stream.getTracks().forEach((t) => t.stop());
        video.srcObject = null;
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      setMode("error");
    }
  }

  function stop() {
    cleanupRef.current?.();
    cleanupRef.current = null;
    setMode("idle");
    setFps(0);
  }

  useEffect(() => () => cleanupRef.current?.(), []);

  return (
    <div className="rounded-lg border border-border bg-bg-elev overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-bg-elev-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${mode === "live" ? "bg-success pulse-dot" : "bg-fg-dim"}`}
          />
          <span className="font-mono text-xs text-fg-muted">
            {mode === "live"
              ? "pose-mirror · live"
              : mode === "loading"
                ? "pose-mirror · loading"
                : mode === "error"
                  ? "pose-mirror · error"
                  : "pose-mirror · idle"}
          </span>
        </div>
        {mode === "live" && (
          <span className="font-mono text-xs text-accent stat-num">
            {fps} fps
          </span>
        )}
      </div>

      <div className="relative aspect-[4/3] bg-black">
        <video
          ref={videoRef}
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover ${
            mode === "live" ? "opacity-30" : "opacity-0"
          } scale-x-[-1]`}
        />
        <canvas
          ref={canvasRef}
          width={480}
          height={360}
          className={`absolute inset-0 w-full h-full ${
            mode === "live" ? "opacity-100" : "opacity-0"
          } scale-x-[-1]`}
        />

        {mode !== "live" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <IdleSkeleton />
            {mode === "idle" && (
              <button
                onClick={start}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent text-accent-fg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Camera className="w-4 h-4" /> Enable camera mirror
              </button>
            )}
            {mode === "loading" && (
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-fg-muted">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading MediaPipe model…
              </div>
            )}
            {mode === "error" && (
              <div className="mt-6 max-w-xs">
                <div className="text-sm text-danger mb-2">
                  Couldn&apos;t start camera
                </div>
                <div className="text-xs text-fg-muted mb-4 break-words">
                  {error}
                </div>
                <button
                  onClick={() => setMode("idle")}
                  className="text-xs text-fg-muted hover:text-fg underline"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        )}

        {mode === "live" && (
          <button
            onClick={stop}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-bg-elev/90 border border-border px-2.5 py-1.5 text-xs text-fg hover:border-danger hover:text-danger transition-colors"
          >
            <CameraOff className="w-3.5 h-3.5" /> Stop
          </button>
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-border bg-bg-elev-2 text-xs text-fg-muted leading-relaxed">
        Live MediaPipe Pose Landmarker — same client-side pipeline pattern used in <span className="text-fg">Directly</span>. Video stays on your device.
      </div>
    </div>
  );
}

function IdleSkeleton() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-32 h-32 opacity-40 fade-up"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <circle cx="100" cy="40" r="14" className="text-accent" />
      <line x1="100" y1="54" x2="100" y2="120" className="text-fg-muted" />
      <line x1="100" y1="70" x2="60" y2="100" className="text-fg-muted" />
      <line x1="100" y1="70" x2="140" y2="100" className="text-fg-muted" />
      <line x1="100" y1="120" x2="75" y2="180" className="text-fg-muted" />
      <line x1="100" y1="120" x2="125" y2="180" className="text-fg-muted" />
      <circle cx="60" cy="100" r="3" fill="currentColor" className="text-accent" />
      <circle cx="140" cy="100" r="3" fill="currentColor" className="text-accent" />
      <circle cx="75" cy="180" r="3" fill="currentColor" className="text-accent" />
      <circle cx="125" cy="180" r="3" fill="currentColor" className="text-accent" />
    </svg>
  );
}
