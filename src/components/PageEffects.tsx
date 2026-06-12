"use client";

import { useEffect } from "react";

export default function PageEffects() {
  // JS① スクロール連動リビール（index.html L579-641 と同一ロジック）
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // [セレクタ, グリッド内スタッガーの有無]
    const targets: Array<[string, boolean]> = [
      [".section-heading", false],
      [".section-num", false],
      [".problem__label", false],
      [".outcome-strip h2", false],
      [".comparison-table tbody tr", true],
      [".outcome-grid > article", true],
      [".problem__list li", true],
      [".problem__affinity", false],
      [".why-card", true],
      [".comparison-table-wrap", false],
      [".saas-card", true],
      [".story", true],
      [".program-card", true],
      [".timeline > div", true],
      [".deliverables-list li", true],
      [".deliverables-flow > div", true],
      [".narrow-down", false],
      [".price-headline > div", true],
      [".price-details article", true],
      [".layer-card", true],
      [".security-grid article", true],
      [".faq-item", true],
      [".mid-cta", false],
      [".cta .container", false],
    ];
    targets.forEach((t) => {
      const els = document.querySelectorAll<HTMLElement>(t[0]);
      els.forEach((el, i) => {
        el.setAttribute("data-reveal", "");
        if (t[1]) {
          el.style.setProperty("--reveal-delay", (Math.min(i % 6, 5) * 0.1).toFixed(1) + "s");
        }
      });
    });

    // Use Cases の画像はマスクワイプで見せる
    document.querySelectorAll(".story__image").forEach((img) => {
      img.setAttribute("data-reveal-img", "");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            // clip-pathで全隠しした子画像は交差判定が効かないため、親の発火に連動させる
            en.target.querySelectorAll("[data-reveal-img]").forEach((c) => c.classList.add("is-visible"));
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px 0px 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  // JS③ スクロール連動カラートランジション（index.html L741-768 と同一ロジック）
  useEffect(() => {
    const stops: Array<[number, [number, number, number]]> = [
      [0.0, [250, 248, 245]], // --paper #FAF8F5
      [0.45, [246, 239, 228]], // 中間の温かい紙色
      [1.0, [237, 228, 211]], // 深い生成り #EDE4D3
    ];
    const body = document.body;
    let ticking = false;
    function lerpColor(p: number): number[] {
      for (let i = 1; i < stops.length; i++) {
        if (p <= stops[i][0]) {
          const a = stops[i - 1];
          const b = stops[i];
          const t = (p - a[0]) / (b[0] - a[0]);
          return [0, 1, 2].map((k) => Math.round(a[1][k] + (b[1][k] - a[1][k]) * t));
        }
      }
      return stops[stops.length - 1][1];
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        const c = lerpColor(p);
        body.style.setProperty("--page-bg", `rgb(${c[0]},${c[1]},${c[2]})`);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
