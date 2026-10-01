import type { ElementType } from "react";

/**
 * Título editorial: linhas em máscara; `italicIndex` marca a linha em itálico (cor de destaque).
 * Cada linha sobe dentro da própria máscara (data-line), animada pelo motor global.
 */
export function EditorialTitle({
  lines,
  italicIndex,
  as: Tag = "h2",
  className = "",
  italicClass = "text-cobre",
  id,
}: {
  lines: readonly string[];
  italicIndex?: number;
  as?: ElementType;
  className?: string;
  italicClass?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={`display ${className}`} data-lines>
      {lines.map((l, i) => (
        <span key={i} className="mask-line">
          <span data-line className={`block ${i === italicIndex ? `italic ${italicClass}` : ""}`}>
            {l}
          </span>
        </span>
      ))}
    </Tag>
  );
}
