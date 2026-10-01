"use client";

import { useEffect, useRef, useState } from "react";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Cursor (desktop, pointer:fine): ponto + anel com lerp.
 * Cresce em interativos; mostra rótulo do atributo data-cursor ("VER", "ARRASTE").
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [grow, setGrow] = useState(false);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const m = { x: innerWidth / 2, y: innerHeight / 2 };
    const r = { ...m };
    let raf = 0;
    let visible = false;
    const move = (e: PointerEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
      if (!visible && ring.current && dot.current) {
        visible = true;
        ring.current.style.opacity = dot.current.style.opacity = "1";
      }
      if (dot.current) dot.current.style.transform = `translate3d(${m.x}px,${m.y}px,0) translate(-50%,-50%)`;
    };
    const loop = () => {
      r.x += (m.x - r.x) * 0.18;
      r.y += (m.y - r.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${r.x}px,${r.y}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const lab = t.closest<HTMLElement>("[data-cursor]");
      setLabel(lab?.dataset.cursor || "");
      setGrow(Boolean(t.closest("a,button,[role=slider],[data-cursor-grow]")));
    };
    const leave = () => {
      visible = false;
      if (ring.current && dot.current) ring.current.style.opacity = dot.current.style.opacity = "0";
    };
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  const size = label ? 84 : grow ? 56 : 34;
  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] grid place-items-center rounded-full opacity-0 mix-blend-normal"
        style={{ willChange: "transform" }}
      >
        <div
          className={`grid place-items-center rounded-full transition-all duration-300 ease-expo ${label ? "bg-mel text-cacau" : "border border-cobre"}`}
          style={{ width: size, height: size }}
        >
          <span className={`micro !text-[0.6rem] transition-opacity duration-200 ${label ? "opacity-100" : "opacity-0"}`}>{label}</span>
        </div>
      </div>
      <div
        ref={dot}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[101] h-1.5 w-1.5 rounded-full bg-cobre opacity-0 transition-[width,height] ${label ? "!h-0 !w-0" : ""}`}
      />
    </>
  );
}
