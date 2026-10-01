"use client";

import { useEffect, useRef } from "react";
import type { Testimonial } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";

/** Carrossel arrastável com inércia (pointer). Teclado: rolagem nativa (overflow-x). */
export function Testimonials({ items, devPlaceholder }: { items: Testimonial[]; devPlaceholder: boolean }) {
  const list: Testimonial[] = devPlaceholder
    ? Array.from({ length: 3 }, (_, i) => ({
        name: `[DEV] Depoimento ${i + 1}`,
        text: "Placeholder visível só em desenvolvimento. Adicione depoimentos reais (com nome e autorização) em data/site.ts → testimonials.",
        service: "a confirmar",
      }))
    : items;
  const scroller = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el || prefersReducedMotion()) return;
    let down = false;
    let lastX = 0;
    let v = 0;
    let raf = 0;
    const glide = () => {
      v *= 0.94;
      el.scrollLeft -= v;
      if (Math.abs(v) > 0.3) raf = requestAnimationFrame(glide);
    };
    const pd = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // touch usa a rolagem nativa
      down = true;
      lastX = e.clientX;
      v = 0;
      cancelAnimationFrame(raf);
      el.setPointerCapture(e.pointerId);
    };
    const pm = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      v = dx;
      el.scrollLeft -= dx;
    };
    const pu = () => {
      if (!down) return;
      down = false;
      raf = requestAnimationFrame(glide);
    };
    el.addEventListener("pointerdown", pd);
    el.addEventListener("pointermove", pm);
    el.addEventListener("pointerup", pu);
    el.addEventListener("pointercancel", pu);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", pd);
      el.removeEventListener("pointermove", pm);
      el.removeEventListener("pointerup", pu);
      el.removeEventListener("pointercancel", pu);
    };
  }, []);

  return (
    <ul
      ref={scroller}
      data-cursor="Arraste"
      tabIndex={0}
      aria-label="Depoimentos de clientes"
      className="-mx-[var(--gutter)] mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-6 [scrollbar-width:none] lg:snap-none"
    >
      {list.map((t, i) => (
        <li
          key={i}
          className={`w-[min(86vw,26rem)] shrink-0 snap-start rounded-card p-7 ${
            i % 3 === 1 ? "on-dark bg-cacau text-creme" : "border border-cacau/15 bg-creme"
          } ${devPlaceholder ? "outline-dashed outline-2 outline-cobre" : ""}`}
        >
          <blockquote>
            <p className="serif text-[1.45rem] leading-snug">“{t.text}”</p>
            <footer className={`micro mt-6 !text-[0.62rem] ${i % 3 === 1 ? "text-mel" : "text-muted"}`}>
              {t.name}
              {t.service ? ` · ${t.service}` : ""}
              {t.source ? ` · ${t.source}` : ""}
            </footer>
          </blockquote>
        </li>
      ))}
    </ul>
  );
}
