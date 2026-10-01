import type { CSSProperties } from "react";

/**
 * Fios/mechas desenhados em SVG — motivo gráfico da marca.
 * Os paths têm `data-draw` e são "desenhados" (stroke-dashoffset) pelo motor de motion.
 */
const PATHS = [
  "M-20 40 C 120 10, 180 140, 320 110 S 520 20, 640 90 S 860 200, 1020 120",
  "M-20 70 C 110 40, 200 170, 330 140 S 530 50, 650 120 S 870 230, 1020 150",
  "M-20 100 C 100 80, 220 200, 340 170 S 540 90, 660 150 S 880 250, 1020 185",
  "M-20 125 C 130 110, 230 230, 350 200 S 560 120, 670 180 S 890 270, 1020 215",
];

export function Strands({
  className = "",
  color = "var(--mel)",
  width = 1.2,
  count = 4,
}: {
  className?: string;
  color?: string;
  width?: number;
  count?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 300"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS.slice(0, count).map((d, i) => (
        <path
          key={i}
          d={d}
          data-draw
          pathLength={1}
          style={{ "--d": i } as CSSProperties}
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={1 - i * 0.18}
        />
      ))}
    </svg>
  );
}

/** Uma mecha (amostra de cartela) — fios paralelos com gradiente da cor do serviço. */
export function Swatch({ tone, id, className = "" }: { tone: readonly [string, string]; id: string; className?: string }) {
  const gid = `sw-${id}`;
  return (
    <svg className={className} viewBox="0 0 60 220" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone[1]} />
          <stop offset="0.55" stopColor={tone[0]} />
          <stop offset="1" stopColor={tone[0]} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect x="14" y="0" width="32" height="18" rx="4" fill="var(--cacau)" opacity=".85" />
      <path d="M16 16 C 14 80, 22 150, 10 214 L 50 214 C 40 150, 46 80, 44 16 Z" fill={`url(#${gid})`} />
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={i}
          d={`M${19 + i * 4} 20 C ${17 + i * 4} 90, ${24 + i * 3.5} 150, ${13 + i * 5.5} 212`}
          stroke="#fff"
          strokeOpacity=".18"
          strokeWidth=".7"
          fill="none"
        />
      ))}
    </svg>
  );
}
