"use client";

import type { ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

export function TrackedLink({
  href,
  event,
  external,
  className,
  children,
}: {
  href: string;
  event: TrackEvent;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
