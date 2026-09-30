"use client";

import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; vx: number; vy: number; gold: boolean };

const MAX_DOTS = 70;
const LINK_DISTANCE = 120;
const FRAME_MS = 1000 / 30;
const GOLD = "242, 181, 68";
const BLUE = "98, 152, 240";

export function NetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;

    const seed = () => {
      const count = Math.min(MAX_DOTS, Math.round((width * height) / 14000));
      dots = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        gold: i < count * 0.6,
      }));
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist >= LINK_DISTANCE) continue;
          ctx.strokeStyle = `rgba(${a.gold ? GOLD : BLUE}, ${0.28 * (1 - dist / LINK_DISTANCE)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const dot of dots) {
        ctx.fillStyle = `rgba(${dot.gold ? GOLD : BLUE}, 0.85)`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const dot of dots) {
        dot.x = (dot.x + dot.vx + width) % width;
        dot.y = (dot.y + dot.vy + height) % height;
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      step();
      draw();
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const start = () => {
      if (raf || reduce.matches || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      stop();
      if (reduce.matches) ctx.clearRect(0, 0, width, height);
      else start();
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();

    const observer = new ResizeObserver(() => {
      resize();
      if (reduce.matches) ctx.clearRect(0, 0, width, height);
    });
    observer.observe(host);
    reduce.addEventListener("change", sync);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      reduce.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
