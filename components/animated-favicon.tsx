"use client";

import { useEffect } from "react";
import {
  FAVICON_EVENT,
  type FaviconEventDetail,
  type FaviconState,
} from "@/lib/favicon-events";

const SIZE = 64;
const TARGET_FPS = 8;
const FRAME_MS = 1000 / TARGET_FPS;

type ResolvedConfig = {
  color: string;
  bg: string;
  pulseHz: number;
  jointWiggle: number;
};

const CONFIG: Record<FaviconState, ResolvedConfig> = {
  idle: { color: "#f5a524", bg: "#0a0a0b", pulseHz: 1.0, jointWiggle: 0 },
  thinking: {
    color: "#f5a524",
    bg: "#0a0a0b",
    pulseHz: 3.5,
    jointWiggle: 0.18,
  },
  active: { color: "#4ade80", bg: "#0a0a0b", pulseHz: 2.5, jointWiggle: 0.28 },
};

export function AnimatedFavicon() {
  useEffect(() => {
    let link =
      document.querySelector<HTMLLinkElement>(
        'link[rel~="icon"]:not([rel~="apple"])',
      ) ?? null;

    let createdLink = false;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
      createdLink = true;
    }
    const originalHref = link.href;

    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sourceStates: Record<string, FaviconState> = {
      chat: "idle",
      avatar: "idle",
    };

    const resolveState = (): FaviconState => {
      if (sourceStates.avatar === "active") return "active";
      if (sourceStates.chat === "thinking") return "thinking";
      return "idle";
    };

    const drawRoundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    const draw = (t: number) => {
      const state = resolveState();
      const cfg = CONFIG[state];
      const seconds = t / 1000;
      const pulse = 0.5 + 0.5 * Math.sin(seconds * Math.PI * 2 * cfg.pulseHz);
      const alpha = 0.78 + 0.22 * pulse;
      const headRadius = 7 + pulse * 1.5;
      const wiggle = cfg.jointWiggle * Math.sin(seconds * 6.5);
      const wiggle2 = cfg.jointWiggle * Math.sin(seconds * 6.5 + Math.PI);

      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = cfg.bg;
      drawRoundRect(0, 0, SIZE, SIZE, 12);
      ctx.fill();

      const cx = SIZE / 2;
      const headY = 20;
      const grad = ctx.createRadialGradient(cx, headY, 0, cx, headY, 30);
      grad.addColorStop(0, cfg.color + "55");
      grad.addColorStop(1, cfg.color + "00");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, SIZE, SIZE);

      ctx.globalAlpha = alpha;
      ctx.fillStyle = cfg.color;
      ctx.strokeStyle = cfg.color;
      ctx.lineCap = "round";
      ctx.lineWidth = 4;

      // Head
      ctx.beginPath();
      ctx.arc(cx, headY, headRadius, 0, Math.PI * 2);
      ctx.fill();

      // Body
      const bodyTop = headY + headRadius + 1;
      const torsoMidY = 32;
      const hipY = 46;
      ctx.beginPath();
      ctx.moveTo(cx, bodyTop);
      ctx.lineTo(cx, hipY);
      ctx.stroke();

      // Arms - wiggle on inverse
      ctx.beginPath();
      ctx.moveTo(cx, torsoMidY);
      ctx.lineTo(cx - 14, torsoMidY + 8 + wiggle * 8);
      ctx.moveTo(cx, torsoMidY);
      ctx.lineTo(cx + 14, torsoMidY + 8 + wiggle2 * 8);
      ctx.stroke();

      // Legs
      ctx.beginPath();
      ctx.moveTo(cx, hipY);
      ctx.lineTo(cx - 10 + wiggle * 4, SIZE - 6);
      ctx.moveTo(cx, hipY);
      ctx.lineTo(cx + 10 + wiggle2 * 4, SIZE - 6);
      ctx.stroke();

      ctx.globalAlpha = 1;

      if (link) {
        link.href = canvas.toDataURL("image/png");
      }
    };

    let raf = 0;
    let lastDraw = 0;
    const tick = (t: number) => {
      if (!document.hidden && t - lastDraw > FRAME_MS) {
        draw(t);
        lastDraw = t;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const handler = (e: Event) => {
      const ce = e as CustomEvent<FaviconEventDetail>;
      if (!ce.detail) return;
      sourceStates[ce.detail.source] = ce.detail.state;
    };
    window.addEventListener(FAVICON_EVENT, handler);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(FAVICON_EVENT, handler);
      if (link) {
        if (createdLink) {
          link.remove();
        } else if (originalHref) {
          link.href = originalHref;
        }
      }
    };
  }, []);

  return null;
}
