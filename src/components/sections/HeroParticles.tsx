"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>(".hero");
    if (!canvas || !hero || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; red: boolean };
    let particles: P[] = [];
    let running = false;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const LINK_DIST = 120;

    function resize() {
      W = hero!.clientWidth;
      H = hero!.clientHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(32, Math.min(90, Math.floor((W * H) / 19000)));
      particles = [];
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 1 + Math.random() * 1.3,
          red: Math.random() < 0.12,
        });
      }
    }

    function step() {
      if (!running) return;
      ctx!.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // マウスからやわらかく逃げる
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = dx * dx + dy * dy;
        if (d < 19600) {
          // 140px
          const f = ((140 - Math.sqrt(d)) / 140) * 0.06;
          p.vx += dx * f * 0.02;
          p.vy += dy * f * 0.02;
        }
        p.vx = Math.max(-0.5, Math.min(0.5, p.vx));
        p.vy = Math.max(-0.5, Math.min(0.5, p.vy));
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }
      // 接続線
      ctx!.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i];
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx!.strokeStyle = `rgba(15, 15, 16, ${(0.13 * (1 - d / LINK_DIST)).toFixed(3)})`;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        }
      }
      // 粒子
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx!.fillStyle = p.red ? "rgba(230, 0, 18, 0.5)" : "rgba(15, 15, 16, 0.4)";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(step);
    }

    function start() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    }

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    // ヒーローが画面外のときは描画停止
    const io = new IntersectionObserver((entries) => {
      entries[0].isIntersecting ? start() : stop();
    });
    io.observe(hero);
    resize();
    start();

    return () => {
      stop();
      io.disconnect();
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__particles" aria-hidden="true" />;
}
