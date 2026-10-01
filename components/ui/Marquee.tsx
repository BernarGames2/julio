"use client";

import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Marquee gigante de palavras em contorno (Bodoni).
 * Velocidade e skew reagem à velocidade de rolagem; pausa fora da tela.
 * Em reduced-motion: estático.
 */
export function Marquee({ words, className = "" }: { words: readonly string[]; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cleanup = () => {};
    let dead = false;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (dead || !track.current || !wrap.current) return;
      const el = track.current;
      const half = el.scrollWidth / 2;
      let x = 0;
      let dir = -1;
      let boost = 0;
      const skew = gsap.quickTo(el, "skewX", { duration: 0.5, ease: "power3.out" });
      const tick = (_t: number, dt: number) => {
        const v = (1.1 + boost) * (dt / 16.67);
        x += v * dir;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        el.style.transform = `translate3d(${x}px,0,0) skewX(${gsap.getProperty(el, "skewX")}deg)`;
        boost *= 0.92;
      };
      const st = ScrollTrigger.create({
        trigger: wrap.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
        onUpdate: (self) => {
          const vel = self.getVelocity();
          dir = vel < 0 ? 1 : -1;
          boost = Math.min(Math.abs(vel) / 120, 14);
          skew(gsap.utils.clamp(-8, 8, vel / -300));
        },
      });
      cleanup = () => {
        st.kill();
        gsap.ticker.remove(tick);
      };
    });
    return () => {
      dead = true;
      cleanup();
    };
  }, []);

  const row = (hidden: boolean) =>
    words.map((w, i) => (
      <span key={`${hidden}-${i}`} className="flex items-center" aria-hidden={hidden || undefined}>
        <span className={`display text-stroke px-[0.25em] ${i % 2 ? "italic" : ""}`}>{w}</span>
        <svg viewBox="0 0 40 40" className="h-[0.28em] w-[0.28em] shrink-0 text-cobre" aria-hidden="true">
          <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="20" cy="20" r="6" fill="currentColor" />
        </svg>
      </span>
    ));

  return (
    <div ref={wrap} className={`overflow-hidden whitespace-nowrap py-6 ${className}`}>
      <p className="sr-only">{words.join(", ")}</p>
      <div ref={track} className="flex w-max will-change-transform" aria-hidden="true">
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
