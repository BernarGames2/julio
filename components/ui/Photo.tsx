import Image from "next/image";
import { imageExists } from "@/lib/images";

const BLUR =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 10"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a2e22"/><stop offset="1" stop-color="#2a1a15"/></linearGradient></defs><rect width="8" height="10" fill="url(#g)"/></svg>`,
  ).toString("base64");

type Props = {
  src: string;
  alt: string;
  /** proporção fixa, ex.: "4/5" — evita layout shift */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** tons para o fallback gráfico quando não houver foto */
  tone?: readonly [string, string];
  /** preencher o contêiner (sem aspect-ratio próprio) */
  fill?: boolean;
  cursorLabel?: string;
};

/**
 * Slot de foto real. Se o arquivo não existir:
 *  - em desenvolvimento: placeholder cacau com o nome do arquivo esperado;
 *  - em produção: arte abstrata de mecha (sem texto), nunca um placeholder visível.
 */
export function Photo({
  src,
  alt,
  ratio = "4/5",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className = "",
  imgClassName = "",
  tone = ["#D8B77B", "#5A3826"],
  fill = false,
  cursorLabel = "Ver",
}: Props) {
  const exists = imageExists(src);
  const dev = process.env.NODE_ENV !== "production";
  return (
    <div
      className={`relative overflow-hidden bg-cacau ${className}`}
      style={fill ? undefined : { aspectRatio: ratio }}
      data-cursor={exists ? cursorLabel : undefined}
    >
      {exists ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          placeholder="blur"
          blurDataURL={BLUR}
          className={`object-cover ${imgClassName}`}
        />
      ) : (
        <div role="img" aria-label={alt} className={`absolute inset-0 ${imgClassName}`}>
          <ToneArt tone={tone} />
          {dev && (
            <span className="micro absolute bottom-3 left-3 right-3 rounded-md bg-cacau/80 px-2 py-1 !text-[0.6rem] !tracking-[0.12em] text-mel">
              falta: public{src}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/** Arte abstrata: mecha de cabelo em gradiente, fios finos — usada como reserva elegante. */
export function ToneArt({ tone }: { tone: readonly [string, string] }) {
  const id = tone.join("").replace(/#/g, "");
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id={`bg${id}`} cx="70%" cy="20%" r="90%">
          <stop offset="0" stopColor={tone[1]} stopOpacity=".55" />
          <stop offset="1" stopColor="#2a1a15" />
        </radialGradient>
        <linearGradient id={`h${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone[1]} />
          <stop offset=".6" stopColor={tone[0]} />
          <stop offset="1" stopColor={tone[0]} stopOpacity=".2" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#bg${id})`} />
      {Array.from({ length: 16 }).map((_, i) => {
        const x = 80 + i * 15;
        return (
          <path
            key={i}
            d={`M${x} -10 C ${x - 40 + (i % 5) * 6} 140, ${x + 70} 260, ${x - 10 + (i % 7) * 4} 520`}
            stroke={`url(#h${id})`}
            strokeWidth={2.4 + (i % 4) * 1.6}
            fill="none"
            opacity={0.35 + (i % 5) * 0.12}
          />
        );
      })}
    </svg>
  );
}
