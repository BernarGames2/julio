import { Fragment, type CSSProperties } from "react";

/**
 * Split manual por caractere, dentro de máscara (overflow hidden). Cada letra recebe `--i`
 * (posição) para o stagger da animação de entrada em CSS.
 * O texto completo fica disponível para leitores de tela; os spans são aria-hidden.
 * Renderiza no servidor: sem JS, o texto aparece normalmente.
 */
export function SplitText({
  text,
  className = "",
  announce = true,
  startIndex = 0,
}: {
  text: string;
  className?: string;
  announce?: boolean;
  /** índice inicial do primeiro caractere (para o stagger continuar entre linhas) */
  startIndex?: number;
}) {
  const words = text.split(" ");
  let i = startIndex;
  return (
    <span className={`mask-line ${className}`}>
      {announce && <span className="sr-only">{text}</span>}
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <Fragment key={wi}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(w).map((c, ci) => (
                <span key={ci} className="split-char" style={{ "--i": i++ } as CSSProperties}>
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
