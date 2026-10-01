import type { ElementType, ReactNode } from "react";

/** Marca um bloco para o reveal global (fade + subida). Visível sem JS. */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  variant = "up",
  delay,
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  variant?: "up" | "fade";
  delay?: number;
} & Record<string, unknown>) {
  return (
    <Tag data-reveal={variant} data-delay={delay} className={className} {...rest}>
      {children}
    </Tag>
  );
}
