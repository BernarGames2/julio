/**
 * Preloader (≤1,2s) — 100% CSS, sem esperar JavaScript:
 * anel de cartela que se desenha + contagem 00→100 (@property) + cortina que sobe.
 * Só aparece quando o script de boot marca `html.jb-intro` (1ª visita da sessão, sem reduced-motion).
 * Como roda no compositor desde a 1ª pintura, não depende do download do JS nem bloqueia o LCP.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="relative grid h-36 w-36 place-items-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90 text-mel">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeOpacity=".15" strokeWidth="1" />
          <circle className="preloader-ring" cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.4" pathLength={1} />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeOpacity=".5" strokeWidth="5" strokeDasharray="1 2.8" />
        </svg>
        <span className="preloader-count serif text-4xl text-creme" />
      </div>
      <p className="micro absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap !text-[0.65rem] text-mel">
        Júlio Bononi · Cartela de cor
      </p>
    </div>
  );
}
