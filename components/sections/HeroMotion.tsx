"use client";

import { useEffect } from "react";
import { isFinePointer, loadGsap, prefersReducedMotion, saveData } from "@/lib/motion";

/**
 * Hero: a entrada (letras, itálico, zoom, fios, cards) é CSS puro (styles/globals.css) para
 * aparecer na 1ª pintura sem esperar o JS. Aqui ficam só o vídeo opcional e o parallax
 * (scroll e mouse), que podem chegar depois sem prejuízo.
 */
export function HeroMotion({ hasCutout }: { hasCutout: boolean }) {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const root = document.querySelector<HTMLElement>("[data-hero]");
    if (!root) return;

    // vídeo: só toca se não for reduced-motion nem economia de dados
    const video = root.querySelector<HTMLVideoElement>("[data-hero-video]");
    if (video) {
      if (reduced || saveData()) video.remove();
      else video.play().catch(() => video.remove());
    }
    if (reduced) return;

    let dead = false;
    let cleanup = () => {};
    loadGsap().then(({ gsap }) => {
      if (dead) return;
      const q = gsap.utils.selector(root);
      const ctx = gsap.context(() => {
        // parallax no scroll: imagem escala e escurece; headline sobe mais devagar
        const st = { trigger: root, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-hero-img]"), { scale: 1.08, yPercent: 8, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-darken]"), { opacity: 0.7, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-title]"), { yPercent: 35, ease: "none", scrollTrigger: st });
        if (hasCutout) gsap.to(q("[data-hero-cutout]"), { yPercent: 4, ease: "none", scrollTrigger: st });

        // parallax no mouse (só desktop com mouse)
        if (isFinePointer()) {
          const tx = gsap.quickTo(q("[data-hero-line]"), "x", { duration: 1, ease: "power3.out" });
          const ty = gsap.quickTo(q("[data-hero-line]"), "y", { duration: 1, ease: "power3.out" });
          const ix = gsap.quickTo(q("[data-hero-media]"), "x", { duration: 1.2, ease: "power3.out" });
          const iy = gsap.quickTo(q("[data-hero-media]"), "y", { duration: 1.2, ease: "power3.out" });
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / innerWidth - 0.5;
            const ny = e.clientY / innerHeight - 0.5;
            tx(-nx * 24);
            ty(-ny * 24);
            ix(nx * 12);
            iy(ny * 12);
          };
          root.addEventListener("pointermove", onMove);
          return () => root.removeEventListener("pointermove", onMove);
        }
      }, root);
      cleanup = () => ctx.revert();
    });
    return () => {
      dead = true;
      cleanup();
    };
  }, [hasCutout]);
  return null;
}
