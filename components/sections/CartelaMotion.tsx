"use client";

import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Desktop (≥1024px, sem reduced-motion): fixa a seção e corre os cards na horizontal.
 *  - anéis giram com o progresso;
 *  - card ativo escala 1, demais 0,96;
 *  - fundo interpola linho → areia → mel claro;
 *  - barra de progresso em mel.
 */
export function CartelaMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let dead = false;
    let cleanup = () => {};
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (dead) return;
      const section = document.getElementById("cartela");
      const pin = section?.querySelector<HTMLElement>("[data-cartela-pin]");
      const track = section?.querySelector<HTMLElement>("[data-cartela-track]");
      if (!section || !pin || !track) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        section.dataset.pinned = "true";
        const cards = gsap.utils.toArray<HTMLElement>("[data-cartela-card]", section);
        const rings = gsap.utils.toArray<SVGElement>("[data-ring]", section);
        const root = document.documentElement;
        const css = (v: string) => getComputedStyle(root).getPropertyValue(v).trim();
        const colors = [css("--linho"), css("--areia"), css("--mel-claro")];
        gsap.set(cards, { opacity: 1, y: 0, scale: 0.96 });
        ScrollTrigger.refresh();

        const distance = () => track.scrollWidth - innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            pin: true,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              gsap.set(rings, { rotate: p * 360, transformOrigin: "50% 50%" });
              const seg = p * (colors.length - 1);
              const i = Math.min(Math.floor(seg), colors.length - 2);
              document.body.style.backgroundColor = gsap.utils.interpolate(colors[i], colors[i + 1], seg - i);
            },
          },
        });
        gsap.to("[data-cartela-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: pin, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        cards.forEach((c) => {
          ScrollTrigger.create({
            trigger: c,
            containerAnimation: tween,
            start: "left 62%",
            end: "right 38%",
            onToggle: (self) => gsap.to(c, { scale: self.isActive ? 1 : 0.96, duration: 0.6, ease: "expo.out" }),
          });
        });
        return () => {
          delete section.dataset.pinned;
          gsap.set(cards, { clearProps: "scale" });
        };
      });
      cleanup = () => mm.revert();
    });
    return () => {
      dead = true;
      cleanup();
    };
  }, []);
  return null;
}
