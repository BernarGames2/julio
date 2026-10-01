"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Comparador antes/depois com divisória arrastável:
 * pointer (mouse/touch) + teclado (setas, Home/End) + role="slider" com aria.
 * Animação de convite: a divisória "balança" uma vez ao entrar na tela.
 */
export function BeforeAfter({
  before,
  after,
  label = "Comparar antes e depois",
  className = "",
}: {
  before: ReactNode;
  after: ReactNode;
  label?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);

  const fromEvent = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  useEffect(() => {
    const el = box.current;
    if (!el || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || touched.current) return;
        io.disconnect();
        const frames = [50, 62, 38, 56, 47, 50];
        frames.forEach((f, i) => setTimeout(() => !touched.current && setPos(f), 300 + i * 260));
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={box}
      data-cursor="Arraste"
      className={`relative touch-pan-y select-none overflow-hidden ${className}`}
      onPointerDown={(e) => {
        touched.current = true;
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        fromEvent(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && fromEvent(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0 transition-[clip-path] duration-200 ease-out" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
      </div>
      <span className="micro pointer-events-none absolute left-4 top-4 rounded-full bg-cacau/80 px-3 py-1.5 !text-[0.62rem] text-creme">Antes</span>
      <span className="micro pointer-events-none absolute right-4 top-4 rounded-full bg-creme/90 px-3 py-1.5 !text-[0.62rem] text-cacau">Depois</span>
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% mostrando o antes`}
        onKeyDown={(e) => {
          touched.current = true;
          const step = e.shiftKey ? 10 : 4;
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") setPos((p) => Math.max(0, p - step));
          else if (e.key === "ArrowRight" || e.key === "ArrowUp") setPos((p) => Math.min(100, p + step));
          else if (e.key === "Home") setPos(0);
          else if (e.key === "End") setPos(100);
          else return;
          e.preventDefault();
        }}
        className="absolute inset-y-0 z-10 -ml-6 flex w-12 cursor-ew-resize justify-center transition-[left] duration-200 ease-out focus-visible:outline-none [&:focus-visible>span:last-child]:ring-4 [&:focus-visible>span:last-child]:ring-mel"
        style={{ left: `${pos}%` }}
      >
        <span className="h-full w-px bg-creme" />
        <span className="absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-creme text-cacau shadow-[var(--shadow-soft)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
