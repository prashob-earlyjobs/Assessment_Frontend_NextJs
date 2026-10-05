"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";

const COLS = 100;
const ROWS = 50;
const DOTS = 2800;

// Equirectangular land mask, 100×50, bit-packed. Land is 1.
const MASK =
  "AAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAf///AOAAAgAAAAAB3+//4AwAAD4AAAAAfv4P/gAAGT//MAA////4f8AHw//////7///55+MB///////8P//+vDgwP///////w+//w+EAB7/////+4AAf/78AAz/////+GAAA///4AH//////8QAAB///gAH//////wAAAH//4AAf/////9AAAAf/8AAHn/////EAAAA//gAAdj////8wAAAD/+AAA/A////eAAAAD/wAAH/////8AAAAAPhAAA//////wAAAAAOEAAH///n/+AAAAAAfOAAf//8PPgAAAAAA+AAB///g48QAAAAAAYAAH//8BB4gAAAAAA/wAP//wGFCAAAAAAA/wAf//AAYgAAAAAAD/AAD/4ABuAAAAAAAf/gAP/AAD84AAAAAB//AAf4AAMR4AAAAAD/8AB/gAAABwAAAAAP/wAH/AAAA0AAAAAAf+AAf7AAAP4AAAAAA/4AB/MAAD/gAAAAAD/AAD8wAAf/AAAAAAP4AAPgAAB/+AAAAAA/AAAeAAAD/4AAAAAD4AABwAAAOfAAAAAAfAAAAAAAAAcDAAAAB4AAAAAAAAAgYAAAAHAAAAAAAAAADAAAAAcAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAfD//8AAAAAAeAAf///////4AA/n/8Af////////j//////////////////////////////////////////////////////////////////w==";

const LIGHT = { x: -0.4, y: 0.42, z: 0.81 };

type Dot = { x: number; y: number; z: number; land: boolean };
type View = {
  depth: number;
  px: number;
  py: number;
  size: number;
  alpha: number;
  warm: number;
  land: boolean;
};

function landMask() {
  const binary = atob(MASK);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function isLand(bytes: Uint8Array, lon: number, lat: number) {
  const x = Math.max(0, Math.min(COLS - 1, Math.floor(((lon + 180) / 360) * COLS)));
  const y = Math.max(0, Math.min(ROWS - 1, Math.floor(((90 - lat) / 180) * ROWS)));
  const index = y * COLS + x;
  return (bytes[index >> 3] & (128 >> (index & 7))) !== 0;
}

function buildDots() {
  const bytes = landMask();
  const dots: Dot[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < DOTS; i++) {
    const y = 1 - (i / (DOTS - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * ring;
    const z = Math.sin(theta) * ring;
    const lat = Math.asin(y) * (180 / Math.PI);
    const lon = Math.atan2(x, z) * (180 / Math.PI);
    dots.push({ x, y, z, land: isLand(bytes, lon, lat) });
  }

  return dots;
}

function makeSprite(rgb: string) {
  const sprite = document.createElement("canvas");
  sprite.width = 32;
  sprite.height = 32;
  const context = sprite.getContext("2d");
  if (!context) return sprite;
  const glow = context.createRadialGradient(16, 16, 1, 16, 16, 14);
  glow.addColorStop(0, `rgba(${rgb},1)`);
  glow.addColorStop(0.62, `rgba(${rgb},0.92)`);
  glow.addColorStop(1, `rgba(${rgb},0)`);
  context.fillStyle = glow;
  context.beginPath();
  context.arc(16, 16, 14, 0, Math.PI * 2);
  context.fill();
  return sprite;
}

export function DottedGlobe({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let dots: Dot[] = [];
    let views: View[] = [];
    let ink = document.createElement("canvas");
    let ocean = ink;
    let brand = ink;
    const lightLength = Math.hypot(LIGHT.x, LIGHT.y, LIGHT.z);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let angle = -0.45;
    let zoom = 1;
    let visible = true;
    let running = true;
    let raf = 0;
    let last = performance.now();

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42 * zoom;
      context.save();
      context.beginPath();
      context.arc(cx, cy, Math.min(width, height) * 0.5, 0, Math.PI * 2);
      context.clip();
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      let count = 0;

      const body = context.createRadialGradient(
        cx - radius * 0.28,
        cy - radius * 0.34,
        radius * 0.08,
        cx + radius * 0.08,
        cy + radius * 0.06,
        radius,
      );
      body.addColorStop(0, "rgba(255,255,255,0.35)");
      body.addColorStop(0.48, "rgba(96,140,190,0.045)");
      body.addColorStop(1, "rgba(23,23,23,0.05)");
      context.beginPath();
      context.arc(cx, cy, radius * 0.985, 0, Math.PI * 2);
      context.fillStyle = body;
      context.fill();

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const x = dot.x * cos + dot.z * sin;
        const z = -dot.x * sin + dot.z * cos;
        const y = dot.y;
        if (z < -0.12) continue;

        const shade = Math.max(0, (x * LIGHT.x + y * LIGHT.y + z * LIGHT.z) / lightLength);
        const limb = Math.min(1, Math.max(0, (z + 0.12) / 0.38));
        const alpha = (dot.land ? 0.28 + shade * 0.72 : 0.045 + shade * 0.16) * limb;
        if (alpha < 0.04) continue;

        const view = views[count];
        count += 1;
        view.depth = z;
        view.px = cx + x * radius;
        view.py = cy - y * radius;
        view.size = (dot.land ? 2.15 + shade * 1.85 : 1.25 + shade * 0.7) * (radius / 180);
        view.alpha = alpha;
        view.warm = dot.land ? Math.max(0, (shade - 0.42) / 0.58) : 0;
        view.land = dot.land;
      }

      const visible = views.slice(0, count).sort((a, b) => a.depth - b.depth);

      for (let i = 0; i < visible.length; i++) {
        const view = visible[i];
        const sprite = view.land ? ink : ocean;
        context.globalAlpha = view.alpha;
        context.drawImage(sprite, view.px - view.size, view.py - view.size, view.size * 2, view.size * 2);
        if (view.warm > 0.08) {
          context.globalAlpha = view.warm * 0.72 * view.alpha;
          context.drawImage(brand, view.px - view.size, view.py - view.size, view.size * 2, view.size * 2);
        }
      }

      context.globalAlpha = 1;
      context.restore();
    };

    const resize = () => {
      const nextWidth = wrap.clientWidth;
      const nextHeight = wrap.clientHeight;
      if (nextWidth === 0 || nextHeight === 0) return;
      width = nextWidth;
      height = nextHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      paint();
    };

    const tick = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduce) angle += delta * 0.12;
      paint();
      if (reduce) cancelAnimationFrame(raf);
    };

    let observer: IntersectionObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;
    const section = wrap.closest("section") ?? wrap;
    const scroll = reduce
      ? undefined
      : ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
          onUpdate: (self) => {
            zoom = 1 + self.progress * 0.55;
          },
        });

    const start = () => {
      if (!running) return;
      dots = buildDots();
      views = dots.map(() => ({
        depth: 0,
        px: 0,
        py: 0,
        size: 0,
        alpha: 0,
        warm: 0,
        land: false,
      }));
      ink = makeSprite("23,23,23");
      ocean = makeSprite("96,122,150");
      brand = makeSprite("234,106,78");
      observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      observer.observe(wrap);
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(wrap);
      resize();
      raf = requestAnimationFrame(tick);
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let cancelIdle = () => {};
    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(start, { timeout: 600 });
      cancelIdle = () => idleWindow.cancelIdleCallback?.(idleId);
    } else {
      const idleId = window.setTimeout(start, 1);
      cancelIdle = () => window.clearTimeout(idleId);
    }

    return () => {
      running = false;
      cancelIdle();
      cancelAnimationFrame(raf);
      scroll?.kill();
      observer?.disconnect();
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
