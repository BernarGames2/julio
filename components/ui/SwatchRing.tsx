/**
 * Anel numerado de cartela de cores. `data-ring` permite girar com o scroll;
 * `data-ring-draw` desenha o círculo (preloader / reveal).
 */
export function SwatchRing({
  n,
  tone = "var(--mel)",
  size = 88,
  className = "",
  label,
  textClass = "",
}: {
  n: string;
  tone?: string;
  size?: number;
  className?: string;
  label?: string;
  textClass?: string;
}) {
  const ticks = Array.from({ length: 36 });
  return (
    <span className={`relative inline-grid place-items-center ${className}`} style={{ width: size, height: size }} aria-hidden={label ? undefined : true}>
      <svg data-ring viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
        <circle data-ring-draw cx="50" cy="50" r="46" fill="none" stroke={tone} strokeWidth="1.4" pathLength={1} />
        <circle cx="50" cy="50" r="38" fill="none" stroke={tone} strokeWidth="6" strokeOpacity=".9" strokeDasharray="1.2 2.6" />
        {ticks.map((_, i) =>
          i % 9 === 0 ? (
            <circle key={i} cx={50 + 46 * Math.cos((i / 36) * Math.PI * 2)} cy={50 + 46 * Math.sin((i / 36) * Math.PI * 2)} r="2" fill={tone} />
          ) : null,
        )}
      </svg>
      <span className={`serif relative text-[0.34em] leading-none ${textClass}`} style={{ fontSize: size * 0.3 }}>
        {n}
      </span>
      {label && <span className="sr-only">{label}</span>}
    </span>
  );
}
