"use client";

import { useEffect } from "react";
import { isFinePointer, loadGsap, prefersReducedMotion, saveData } from "@/lib/motion";

/** Timeline de entrada + parallax (mouse e scroll) do hero. */
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

    let dead = false;
    let cleanup = () => {};
    loadGsap().then(({ gsap }) => {
      if (dead) return;
      const q = gsap.utils.selector(root);
      const ctx = gsap.context(() => {
        const chars = q("[data-hero-title] .split-char");
        const paths = q("[data-draw]") as unknown as SVGPathElement[];
        paths.forEach((p) => p.setAttribute("pathLength", "1"));

        if (reduced) {
          gsap.set(chars, { y: 0 });
          gsap.set(paths, { strokeDashoffset: 0 });
          gsap.fromTo([document.querySelector("[data-hero-nav]"), ...q("[data-hero-micro]"), ...q("[data-hero-card]")], { opacity: 0 }, { opacity: 1, duration: 0.4 });
          return;
        }

        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.fromTo(q("[data-hero-img]"), { scale: 1.15 }, { scale: 1, duration: 2.2 }, 0)
          .fromTo(chars, { yPercent: 110, y: 0 }, { yPercent: 0, duration: 1.2, stagger: 0.035 }, 0.1)
          // sem opacity 0: o itálico é pintado desde o início (bom para o LCP) e "foca" do desfoque
          .fromTo(q("[data-hero-italic]"), { opacity: 0.35, filter: "blur(14px)", y: 24 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.2, immediateRender: false }, 0.65)
          .fromTo([document.querySelector("[data-hero-nav]"), ...q("[data-hero-micro]")], { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.5)
          .fromTo(q("[data-hero-card]"), { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.12 }, 0.9)
          .to(paths, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", stagger: 0.1 }, 0.3);
        if (hasCutout) tl.fromTo(q("[data-hero-cutout]"), { yPercent: 4, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.6 }, 0.2);

        const start = () => tl.play();
        const w = window as unknown as { __jbIntroDone?: boolean };
        if (w.__jbIntroDone || !document.documentElement.classList.contains("jb-intro")) start();
        else window.addEventListener("jb:intro-done", start, { once: true });

        // parallax no scroll
        const st = { trigger: root, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-hero-img]"), { scale: 1.08, yPercent: 8, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-darken]"), { opacity: 0.7, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-title]"), { yPercent: 35, ease: "none", scrollTrigger: st });
        if (hasCutout) gsap.to(q("[data-hero-cutout]"), { yPercent: 4, ease: "none", scrollTrigger: st });

        // parallax no mouse (desktop)
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
