"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "@/data/site";

/** Linha vertical de progresso à direita + contador de seção "01 / 07". */
export function ScrollProgress() {
  const bar = useRef<HTMLSpanElement>(null);
  const [idx, setIdx] = useState(0);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    addEventListener("scroll", onScroll, { passive: true });
    update();

    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = els.indexOf(e.target as HTMLElement);
            if (i >= 0) {
              setIdx(i);
              setDark(sections[i].bg === "cacau");
            }
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const color = (dark ? "text-mel" : "text-cacau") + (sections[idx].id === "cartela" ? " opacity-0" : "");
  return (
    <div aria-hidden="true" className={`pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 transition-[color,opacity] duration-500 lg:flex ${color}`}>
      <span className="micro !text-[0.62rem] [writing-mode:vertical-rl]">
        {String(idx + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
      </span>
      <span className="relative block h-36 w-px overflow-hidden">
        <span className="absolute inset-0 bg-current opacity-25" />
        <span ref={bar} className="absolute inset-0 origin-top bg-cobre" style={{ transform: "scaleY(0)" }} />
      </span>
      <span className="micro mt-2 !text-[0.6rem] [writing-mode:vertical-rl]">{sections[idx].label}</span>
    </div>
  );
}
