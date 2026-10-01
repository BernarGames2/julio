"use client";

import { useEffect, useRef, useState } from "react";

/** Mapa incorporado carregado só quando chega perto da tela (sem custo no carregamento inicial). */
export function LazyMap({ src, title }: { src: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setLoad(true), io.disconnect()), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={box} className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-areia sm:aspect-[21/7]">
      {load ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 grayscale-[.6] sepia-[.25]"
        />
      ) : (
        <span className="micro absolute inset-0 grid place-items-center !text-[0.62rem] text-muted">Carregando mapa…</span>
      )}
    </div>
  );
}
