"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { track, type TrackEvent } from "@/lib/analytics";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

type Variant = "primary" | "outline" | "outline-light" | "mel" | "ghost";

const styles: Record<Variant, { base: string; fill: string }> = {
  primary: { base: "bg-cobre text-creme", fill: "bg-cacau" },
  mel: { base: "bg-mel text-cacau", fill: "bg-creme" },
  outline: { base: "text-cacau ring-1 ring-inset ring-cacau/50", fill: "bg-cacau" },
  "outline-light": { base: "text-creme ring-1 ring-inset ring-creme/50", fill: "bg-creme" },
  ghost: { base: "text-cacau", fill: "bg-areia" },
};
const hoverText: Record<Variant, string> = {
  primary: "group-hover:text-creme",
  mel: "group-hover:text-cacau",
  outline: "group-hover:text-creme",
  "outline-light": "group-hover:text-cacau",
  ghost: "",
};

/**
 * Botão em pílula. Microinterações (CSS + transform, sem biblioteca): preenchimento que desliza,
 * deslocamento magnético (2–5px, só com mouse), ondulação no clique. Envia evento de analytics se `event` for passado.
 */
export function Button({
  href,
  children,
  variant = "primary",
  event,
  external,
  magnetic = false,
  className = "",
  size = "md",
  icon,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  event?: TrackEvent;
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  size?: "md" | "lg";
  icon?: ReactNode;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const setOffset = (x: number, y: number) => {
    if (ref.current) ref.current.style.transform = x || y ? `translate3d(${x}px,${y}px,0)` : "";
  };

  const onMove = (e: MouseEvent) => {
    if (!magnetic || !isFinePointer() || prefersReducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    setOffset(dx * 5, dy * 4);
  };
  const onLeave = () => {
    setOffset(0, 0);
  };
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (event) track(event);
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const dot = document.createElement("span");
    dot.setAttribute("aria-hidden", "true");
    dot.style.cssText = `position:absolute;left:${e.clientX - r.left}px;top:${e.clientY - r.top}px;width:20px;height:20px;border-radius:50%;background:currentColor;opacity:.25;transform:translate(-50%,-50%) scale(0);animation:ripple .7s cubic-bezier(.16,1,.3,1) forwards;pointer-events:none`;
    el.appendChild(dot);
    setTimeout(() => dot.remove(), 750);
  };

  const s = styles[variant];
  const pad = size === "lg" ? "px-8 py-5 text-base" : "px-6 py-3.5 text-[0.95rem]";

  return (
      <a
        ref={ref}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        data-cursor-grow
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`group relative isolate inline-flex min-h-[48px] items-center justify-center gap-3 overflow-hidden rounded-full font-medium tracking-wide transition-[color,transform] duration-300 ease-expo ${s.base} ${pad} ${className}`}
      >
        <span
          aria-hidden
          className={`absolute inset-0 -z-10 translate-y-full rounded-full transition-transform duration-500 ease-expo group-hover:translate-y-0 ${s.fill}`}
        />
        <span className={`relative transition-colors duration-300 ${hoverText[variant]}`}>{children}</span>
        {icon && (
          <span className={`relative transition-transform duration-300 ease-expo group-hover:translate-x-1 ${hoverText[variant]}`}>{icon}</span>
        )}
      </a>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}
