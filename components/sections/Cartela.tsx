import { extras, priceNote, services } from "@/data/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialTitle } from "@/components/ui/EditorialTitle";
import { SwatchRing } from "@/components/ui/SwatchRing";
import { Swatch } from "@/components/ui/Strands";
import { Button, WhatsIcon } from "@/components/ui/Button";
import { CartelaMotion } from "./CartelaMotion";

/**
 * A CARTELA — cada serviço é um tom numerado.
 * Sem JS / mobile / reduced-motion: grade/lista vertical.
 * Desktop com motion: seção fixada, cards correndo na horizontal (ver CartelaMotion).
 */
export function Cartela() {
  return (
    <section id="cartela" data-bg="linho" aria-labelledby="cartela-title" className="group/cartela relative">
      <div data-cartela-pin className="relative overflow-hidden lg:group-data-[pinned=true]/cartela:h-[100svh]">
        <div
          data-cartela-track
          className="container-x grid gap-6 py-[var(--section)] md:grid-cols-2 lg:grid-cols-3 lg:group-data-[pinned=true]/cartela:flex lg:group-data-[pinned=true]/cartela:h-full lg:group-data-[pinned=true]/cartela:w-max lg:group-data-[pinned=true]/cartela:max-w-none lg:group-data-[pinned=true]/cartela:items-center lg:group-data-[pinned=true]/cartela:gap-8 lg:group-data-[pinned=true]/cartela:py-0 lg:group-data-[pinned=true]/cartela:pr-[20vw]"
        >
          {/* painel de abertura */}
          <div className="flex flex-col justify-center md:col-span-2 lg:col-span-3 lg:group-data-[pinned=true]/cartela:w-[34vw] lg:group-data-[pinned=true]/cartela:shrink-0 lg:group-data-[pinned=true]/cartela:pr-10">
            <SectionLabel n="03">A cartela</SectionLabel>
            <EditorialTitle
              id="cartela-title"
              lines={["Sete tons,", "um ponto de partida:", "o seu cabelo."]}
              italicIndex={2}
              className="mt-6 text-[clamp(2.5rem,1.4rem+3.6vw,5rem)]"
            />
            <p data-reveal="up" className="mt-6 max-w-md text-muted">
              Escolha o tom que você imagina. O Júlio diz, com honestidade, o caminho até ele — e quantas sessões ele pede.
              Todos os valores são definidos na avaliação.
            </p>
            <p className="micro mt-8 hidden items-center gap-3 !text-[0.62rem] text-muted lg:group-data-[pinned=true]/cartela:flex" aria-hidden>
              Role para ver a cartela
              <svg viewBox="0 0 40 12" className="h-3 w-10" fill="none" stroke="currentColor" aria-hidden>
                <path d="M0 6h38M33 1l5 5-5 5" />
              </svg>
            </p>
          </div>

          <ol className="contents" aria-label="Serviços">
            {services.map((s) => (
              <li
                key={s.n}
                data-cartela-card
                data-reveal="up"
                className={`group/card relative flex min-h-[29rem] flex-col transition-transform hover:-translate-y-1.5 overflow-hidden rounded-card p-7 transition-shadow duration-500 lg:group-data-[pinned=true]/cartela:h-[min(72svh,40rem)] lg:group-data-[pinned=true]/cartela:w-[min(26rem,30vw)] lg:group-data-[pinned=true]/cartela:shrink-0 ${
                  s.featured
                    ? "on-dark bg-cacau text-creme md:col-span-2 lg:col-span-1 lg:group-data-[pinned=true]/cartela:w-[min(32rem,36vw)]"
                    : "border border-cacau/15 bg-creme/70 text-cacau"
                }`}
              >
                <div className="flex items-start justify-between">
                  <SwatchRing
                    n={s.n}
                    size={s.featured ? 96 : 76}
                    tone={s.featured ? "var(--mel)" : s.tone[1]}
                    textClass={s.featured ? "text-creme" : "text-cacau"}
                  />
                  <Swatch tone={s.tone} id={s.n} className={`absolute top-0 origin-top transition-transform duration-700 ease-expo group-hover/card:rotate-[4deg] ${s.featured ? "right-8 h-[40%] w-16 sm:right-12 sm:h-[58%] sm:w-20" : "right-8 h-[38%] w-14 sm:right-10 sm:h-[52%] sm:w-16"}`} />
                </div>
                <div className="mt-auto">
                  <p className={`micro !text-[0.62rem] ${s.featured ? "text-mel" : "text-muted"}`}>{s.line}</p>
                  <h3 className={`serif mt-2 font-semibold leading-[1.02] ${s.featured ? "text-[2.3rem] sm:text-[2.6rem]" : "text-[1.85rem] sm:text-[2rem]"}`}>{s.name}</h3>
                  <p className={`mt-4 text-[0.98rem] ${s.featured ? "text-ash" : "text-muted"}`}>{s.description}</p>
                  <div className={`mt-6 flex items-center justify-between border-t pt-4 ${s.featured ? "border-mel/25" : "border-cacau/15"}`}>
                    <span className={`micro !text-[0.6rem] ${s.featured ? "text-mel" : "text-cobre"}`}>{priceNote}</span>
                    {s.featured && (
                      <span className="micro rounded-full bg-mel px-3 py-1 !text-[0.56rem] text-cacau">Especialidade</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* painel final: extras + CTA */}
          <div data-reveal="up" className="flex flex-col justify-center rounded-card border border-dashed border-cacau/25 p-7 md:col-span-2 lg:col-span-2 lg:group-data-[pinned=true]/cartela:h-[min(72svh,40rem)] lg:group-data-[pinned=true]/cartela:w-[28rem] lg:group-data-[pinned=true]/cartela:shrink-0">
            <p className="micro !text-[0.62rem] text-muted">Também na cartela</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {extras.map((e) => (
                <li key={e} className="rounded-full bg-areia px-4 py-2 text-sm">
                  {e}
                </li>
              ))}
            </ul>
            <p className="serif mt-8 text-3xl leading-tight">
              Não sabe qual é o seu tom? <em className="text-cobre">É para isso que existe a avaliação.</em>
            </p>
            <div className="mt-8">
              <Button href={whatsappUrl("geral")} external magnetic event={{ name: "whatsapp_click", section: "cartela" }} icon={<WhatsIcon />}>
                Agendar avaliação
              </Button>
            </div>
          </div>
        </div>

        <div aria-hidden className="absolute inset-x-[var(--gutter)] bottom-8 hidden h-px bg-cacau/15 lg:group-data-[pinned=true]/cartela:block">
          <span data-cartela-progress className="absolute inset-0 origin-left scale-x-0 bg-mel" style={{ height: 2, top: -0.5 }} />
        </div>
      </div>
      <CartelaMotion />
    </section>
  );
}
