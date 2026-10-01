"use client";
/** Carregamento preguiçoso (dynamic import) e compartilhado do GSAP. */
type GsapBundle = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};
let bundle: Promise<GsapBundle> | null = null;

export function loadGsap(): Promise<GsapBundle> {
  if (!bundle) {
    bundle = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
      g.gsap.registerPlugin(st.ScrollTrigger);
      g.gsap.defaults({ ease: "expo.out", duration: 1 });
      return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
    });
  }
  return bundle;
}

export const EASE = { expo: "expo.out", power4: "power4.out" } as const;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
export function isFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
export function saveData() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(c?.saveData);
}
