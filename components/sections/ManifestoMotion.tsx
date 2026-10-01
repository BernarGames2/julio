"use client";

import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

/** Palavras do manifesto acendem de 20% a 100% conforme a rolagem. */
export function ManifestoMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let dead = false;
    let cleanup = () => {};
    loadGsap().then(({ gsap }) => {
      if (dead) return;
      const p = document.querySelector("[data-manifesto]");
      if (!p) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          p.querySelectorAll("[data-word]"),
          { opacity: 0.2 },
          { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: p, start: "top 75%", end: "bottom 45%", scrub: 0.6 } },
        );
      });
      cleanup = () => ctx.revert();
    });
    return () => {
      dead = true;
      cleanup();
    };
  }, []);
  return null;
}
