"use client";

import { useEffect, useRef, useState } from "react";
import { contact, nav } from "@/data/site";
import { telUrl, whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { Button, WhatsIcon } from "@/components/ui/Button";

/**
 * Header fixo em microtipografia. Sobre o hero: transparente e claro.
 * Ao rolar: fundo linho translúcido, links do desktop recolhem no botão MENU (bloco mel).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(scrollY > innerHeight * 0.75);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (!open) {
      lenis?.start();
      document.body.style.overflow = "";
      return;
    }
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a,button");
        const a = f[0];
        const b = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          b.focus();
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const light = !scrolled && !open;

  return (
    <>
      <header
        data-hero-nav
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${
          scrolled ? "bg-linho/85 text-cacau shadow-[0_1px_0_rgb(42_26_21/0.08)] backdrop-blur-md" : "text-creme"
        } ${open ? "!bg-transparent !text-creme !shadow-none" : ""}`}
      >
        <div className="container-x flex h-[68px] items-center justify-between gap-4 lg:h-[84px]">
          <a href="#inicio" className="group flex flex-col leading-none">
            <span className="serif text-[1.35rem] tracking-tight lg:text-[1.6rem]">Júlio Bononi</span>
            <span className={`micro mt-1 whitespace-nowrap !text-[0.5rem] !tracking-[0.16em] sm:!text-[0.56rem] sm:!tracking-[0.22em] ${light || open ? "text-mel" : "text-muted"}`}>Salão de beleza · Uberlândia</span>
          </a>

          <nav aria-label="Principal" className={`hidden transition-opacity duration-300 lg:block ${scrolled ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            <ul className="flex items-center gap-9">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="micro link-underline pb-1 !text-[0.68rem]" tabIndex={scrolled ? -1 : undefined}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={telUrl}
              onClick={() => track({ name: "phone_click", section: "header" })}
              className="micro link-underline hidden pb-1 !text-[0.68rem] xl:inline"
            >
              {contact.phoneDisplay}
            </a>
            <Button
              href={whatsappUrl("geral")}
              external
              event={{ name: "whatsapp_click", section: "header" }}
              variant={light ? "mel" : "primary"}
              className="!min-h-[44px] !px-4 !py-2.5 !text-[0.82rem] sm:!px-5"
              icon={<WhatsIcon className="h-4 w-4" />}
            >
              <span className="hidden sm:inline">Agendar avaliação</span>
              <span className="sm:hidden">Agendar</span>
            </Button>
            <button
              ref={menuBtn}
              type="button"
              aria-expanded={open}
              aria-controls="menu-panel"
              onClick={() => setOpen((o) => !o)}
              className={`micro grid h-11 w-14 place-items-center bg-mel !text-[0.62rem] text-cacau transition-[opacity,transform] duration-300 sm:w-16 ${
                scrolled || open ? "" : "lg:pointer-events-none lg:w-0 lg:scale-90 lg:opacity-0"
              }`}
            >
              {open ? "Fechar" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-panel"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="on-dark fixed inset-0 z-[45] overflow-y-auto bg-cacau text-creme"
      >
        <div className="container-x flex min-h-full flex-col justify-between pb-10 pt-28">
          <nav aria-label="Menu principal">
            <ol className="space-y-2">
              {nav.map((n, i) => (
                <li key={n.href} className="flex items-baseline gap-4 border-b border-mel/20 py-3">
                  <span className="micro text-mel">{String(i + 1).padStart(2, "0")}</span>
                  <a href={n.href} onClick={() => setOpen(false)} className="display text-[clamp(2.6rem,10vw,6rem)] transition-colors hover:text-mel">
                    {n.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <p className="text-ash">
              {contact.address.street} – {contact.address.district}
              <br />
              {contact.address.city}/{contact.address.state}
            </p>
            <a href={telUrl} onClick={() => track({ name: "phone_click", section: "menu" })} className="serif text-2xl text-mel">
              {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
