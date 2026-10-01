import { Fragment } from "react";

/**
 * Split manual por caractere, dentro de máscara (overflow hidden).
 * O texto completo fica disponível para leitores de tela; os spans são aria-hidden.
 * Renderiza no servidor: sem JS, o texto aparece normalmente.
 */
export function SplitText({ text, className = "", announce = true }: { text: string; className?: string; announce?: boolean }) {
  const words = text.split(" ");
  return (
    <span className={`mask-line ${className}`}>
      {announce && <span className="sr-only">{text}</span>}
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <Fragment key={wi}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(w).map((c, ci) => (
                <span key={ci} className="split-char">
                  {c}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
