"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { WhatsIcon } from "@/components/ui/Button";

/** Botão flutuante de WhatsApp — visível em toda a rolagem (some só sobre o card de contato, que já é o CTA). */
export function WhatsAppFab() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const target = document.getElementById("cta-whatsapp-contato");
    if (!target) return;
    const io = new IntersectionObserver(([e]) => setHide(e.isIntersecting), { threshold: 0.4 });
    io.observe(target);
    return () => io.disconnect();
  }, []);
  return (
    <a
      href={whatsappUrl("geral")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar avaliação pelo WhatsApp"
      onClick={() => track({ name: "whatsapp_click", section: "fab" })}
      data-cursor-grow
      className={`group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-cobre pl-4 pr-4 text-creme shadow-[0_18px_40px_-12px_rgb(42_26_21/0.6)] transition-all duration-500 ease-expo hover:bg-cacau lg:bottom-8 lg:right-14 ${
        hide ? "pointer-events-none translate-y-6 opacity-0" : ""
      }`}
    >
      <WhatsIcon className="h-6 w-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-500 ease-expo group-hover:ml-3 group-hover:max-w-[12rem] group-focus-visible:ml-3 group-focus-visible:max-w-[12rem]">
        Agendar avaliação
      </span>
    </a>
  );
}
