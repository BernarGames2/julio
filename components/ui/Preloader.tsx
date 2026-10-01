"use client";

import { useEffect, useRef, useState } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Preloader (≤1,2s): anel de cartela que se desenha com contagem 00→100 e cortina que sobe.
 * Apenas na 1ª visita da sessão; nunca em reduced-motion.
 * Não bloqueia o LCP: o hero é renderizado por baixo desde o início; a cortina é só uma camada.
 * Sem JS ele simplesmente não existe (renderizado só no cliente).
 */
export function Preloader() {
  const [show, setShow] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const circle = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("jb-intro") === "1";
      sessionStorage.setItem("jb-intro", "1");
    } catch {}
    if (seen || prefersReducedMotion()) {
      document.documentElement.classList.remove("jb-intro");
      (window as unknown as { __jbIntroDone?: boolean }).__jbIntroDone = true;
      window.dispatchEvent(new Event("jb:intro-done"));
      return;
    }
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    let tl: { kill: () => void } | null = null;
    loadGsap().then(({ gsap }) => {
      const counter = { v: 0 };
      tl = gsap
        .timeline({
          onComplete: () => {
            setShow(false);
          },
          onStart: () => document.documentElement.classList.remove("jb-intro"),
        })
        .to(counter, {
          v: 100,
          duration: 0.75,
          ease: "power2.inOut",
          onUpdate: () => {
            if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
          },
        })
        .fromTo(circle.current, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.75, ease: "power2.inOut" }, 0)
        .add(() => {
          (window as unknown as { __jbIntroDone?: boolean }).__jbIntroDone = true;
          window.dispatchEvent(new Event("jb:intro-done"));
        }, 0.6)
        .to(root.current, { yPercent: -100, duration: 0.45, ease: "power4.inOut" }, 0.75);
    });
    return () => tl?.kill();
  }, [show]);

  if (!show) return null;
  return (
    <div ref={root} aria-hidden="true" className="fixed inset-0 z-[200] grid place-items-center bg-cacau text-mel">
      <div className="relative grid h-36 w-36 place-items-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeOpacity=".15" strokeWidth="1" />
          <circle ref={circle} cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.4" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeOpacity=".5" strokeWidth="5" strokeDasharray="1 2.8" />
        </svg>
        <span ref={num} className="serif text-4xl text-creme">00</span>
      </div>
      <p className="micro absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap !text-[0.65rem] text-mel">Júlio Bononi · Cartela de cor</p>
    </div>
  );
}
