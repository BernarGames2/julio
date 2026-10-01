/**
 * Divisor orgânico em onda — lembra um fio de cabelo.
 * `from` é a cor da seção de cima; a onda é preenchida com ela por cima da próxima.
 */
export function WaveDivider({
  from = "var(--cacau)",
  className = "",
  flip = false,
  line = "var(--mel)",
}: {
  from?: string;
  className?: string;
  flip?: boolean;
  line?: string;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none relative z-[2] -mb-px h-[clamp(48px,7vw,120px)] w-full overflow-hidden ${className}`} style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <svg data-wave viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-full w-[110%] -translate-x-[5%]">
        <path d="M0 0 H1440 V40 C 1180 120, 980 20, 720 64 S 260 118, 0 58 Z" fill={from} />
        <path d="M0 70 C 260 128, 470 72, 720 74 S 1180 122, 1440 50" stroke={line} strokeWidth="1" fill="none" opacity=".7" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
