"use client";

import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Motor de motion global:
 *  - Lenis (smooth scroll) sincronizado com o ScrollTrigger;
 *  - reveals globais ([data-reveal], [data-lines], [data-draw], [data-clip]) — só para o que
 *    ainda está abaixo da tela quando o JS chega (o HTML nasce todo visível);
 *  - interpolação da cor de fundo da página entre seções ([data-bg]);
 *  - parallax das ondas ([data-wave]);
 *  - refresh do ScrollTrigger após fontes e imagens.
 * Em prefers-reduced-motion: sem Lenis, só fades curtos de opacidade.
 */
export function SmoothScroll() {
  useEffect(() => {
    let killed = false;
    let cleanup = () => {};
    const reduced = prefersReducedMotion();

    (async () => {
      const { gsap, ScrollTrigger } = await loadGsap();
      if (killed) return;

      let lenis: import("lenis").default | null = null;
      let tick: ((t: number) => void) | null = null;
      if (!reduced) {
        const Lenis = (await import("lenis")).default;
        if (killed) return;
        const l = new Lenis({ lerp: 0.12, smoothWheel: true });
        l.on("scroll", ScrollTrigger.update);
        tick = (t: number) => l.raf(t * 1000);
        lenis = l;
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        (window as unknown as { __lenis?: typeof lenis }).__lenis = lenis;
      }

      // âncoras internas suaves (respeita o header fixo)
      const onAnchor = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        const id = a.getAttribute("href")!;
        const target = id.length > 1 ? document.querySelector(id) : null;
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -70 });
        else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        history.replaceState(null, "", id);
        (target as HTMLElement).setAttribute("tabindex", "-1");
        (target as HTMLElement).focus({ preventScroll: true });
      };
      document.addEventListener("click", onAnchor);

      // O HTML chega com tudo visível (sem JS, ou com JS atrasado em 4G, nada fica em branco).
      // Quando o GSAP chega, só o que ainda está ABAIXO da tela é preparado para o reveal;
      // o que já está na tela ou acima fica como está — sem "piscar".
      const below = (el: Element) => el.getBoundingClientRect().top > innerHeight;

      const ctx = gsap.context(() => {
        // ---- reveals por bloco
        // Em saltos (âncora, fling, recarregar no meio da página) o batch pode trazer dezenas de
        // elementos de uma vez: os que já ficaram acima da tela aparecem na hora, e o stagger
        // dos visíveis é limitado a ~0,5s no total, para nada ficar "esperando a vez".
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(below);
        reveals.forEach((el) => gsap.set(el, { opacity: 0, y: reduced || el.dataset.reveal === "fade" ? 0 : 40 }));
        if (reveals.length)
          ScrollTrigger.batch(reveals, {
            start: "top 88%",
            once: true,
            onEnter: (els) => {
              const passed = els.filter((e) => e.getBoundingClientRect().bottom < 0);
              const visible = els.filter((e) => !passed.includes(e));
              if (passed.length) gsap.set(passed, { opacity: 1, y: 0, overwrite: true });
              if (!visible.length) return;
              gsap.to(visible, {
                opacity: 1,
                y: 0,
                duration: reduced ? 0.4 : 1,
                ease: "expo.out",
                stagger: Math.min(0.1, 0.5 / visible.length),
                delay: Number((visible[0] as HTMLElement).dataset.delay || 0),
                overwrite: true,
              });
            },
          });

        if (!reduced) {
          // ---- títulos editoriais por linha
          gsap.utils.toArray<HTMLElement>("[data-lines]").filter(below).forEach((t) => {
            gsap.fromTo(
              t.querySelectorAll("[data-line]"),
              { yPercent: 105 },
              { yPercent: 0, duration: 1.1, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: t, start: "top 85%", once: true } },
            );
          });

          // ---- fios SVG que se desenham (os do hero são CSS)
          gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach((p) => {
            if (p.closest("[data-hero]") || !below(p)) return;
            gsap.fromTo(
              p,
              { strokeDasharray: 1, strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", scrollTrigger: { trigger: p.closest("svg"), start: "top 85%", once: true } },
            );
          });

          // ---- imagens que revelam por clip-path (inset 100% → 0) com escala 1,2 → 1
          gsap.utils.toArray<HTMLElement>("[data-clip]").filter(below).forEach((el) => {
            const inner = el.querySelector("[data-clip-inner]");
            const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%", once: true } });
            tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" });
            if (inner) tl.fromTo(inner, { scale: 1.2 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0);
          });
        }

        // ---- parallax interno de imagem
        if (!reduced) {
          gsap.utils.toArray<HTMLElement>("[data-parallax-inner]").forEach((el) => {
            gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
          });
        }

        // ---- contadores até os números REAIS
        gsap.utils.toArray<HTMLElement>("[data-count]").filter(below).forEach((el) => {
          const end = Number(el.dataset.count);
          const dec = Number(el.dataset.decimals || 0);
          const o = { v: 0 };
          const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            once: true,
            onEnter: () =>
              reduced
                ? (el.textContent = fmt(end))
                : gsap.fromTo(o, { v: 0 }, { v: end, duration: 1.6, ease: "power4.out", onUpdate: () => (el.textContent = fmt(o.v)) }),
          });
        });

        // ---- cor de fundo interpolada entre seções
        // Anima o background do <body> direto (não uma variável CSS na raiz): mudar uma custom
        // property no :root obriga o navegador a recalcular o estilo da página inteira a cada quadro.
        const root = document.documentElement;
        gsap.utils.toArray<HTMLElement>("[data-bg]").forEach((s) => {
          const color = getComputedStyle(root).getPropertyValue(`--${s.dataset.bg}`).trim();
          const set = () => gsap.to(document.body, { backgroundColor: color, duration: reduced ? 0.01 : 0.8, ease: "power2.out", overwrite: "auto" });
          ScrollTrigger.create({ trigger: s, start: "top 55%", end: "bottom 45%", onEnter: set, onEnterBack: set });
        });

        // ---- ondas com parallax
        if (!reduced) {
          gsap.utils.toArray<SVGElement>("[data-wave]").forEach((w) => {
            gsap.fromTo(w, { xPercent: -3 }, { xPercent: 3, ease: "none", scrollTrigger: { trigger: w, start: "top bottom", end: "bottom top", scrub: true } });
          });
        }
      });

      // refresh depois de fontes e imagens
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);

      cleanup = () => {
        ctx.revert();
        document.removeEventListener("click", onAnchor);
        window.removeEventListener("load", refresh);
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
      };
    })();

    return () => {
      killed = true;
      cleanup();
    };
  }, []);

  return null;
}
