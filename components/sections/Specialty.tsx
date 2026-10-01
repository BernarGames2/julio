import { specialty } from "@/data/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Photo } from "@/components/ui/Photo";
import { EditorialTitle } from "@/components/ui/EditorialTitle";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button, Arrow, WhatsIcon } from "@/components/ui/Button";
import { Strands } from "@/components/ui/Strands";
import { SwatchRing } from "@/components/ui/SwatchRing";

/** Especialidade principal — Mechas e loiros. 50/50 assimétrico: texto cacau × foto que sangra. */
export function Specialty() {
  return (
    <section id="especialidade" aria-labelledby="especialidade-title" className="on-dark relative overflow-hidden bg-cacau text-creme">
      <div className="grid lg:grid-cols-[1fr_1.05fr]">
        <div className="container-x relative z-10 py-[var(--section)] lg:max-w-none lg:pl-[max(var(--gutter),calc((100vw-var(--container))/2+var(--gutter)))] lg:pr-16">
          <SectionLabel n="01" tone="light">
            {specialty.eyebrow}
          </SectionLabel>
          <EditorialTitle
            id="especialidade-title"
            lines={specialty.title}
            italicIndex={2}
            italicClass="text-mel"
            className="mt-8 text-[clamp(2.6rem,1.4rem+4.2vw,5.6rem)]"
          />
          <p data-reveal="up" className="mt-8 max-w-[34rem] text-lg text-ash">
            {specialty.lead}
          </p>
          <ul className="mt-10 space-y-0 border-t border-mel/20">
            {specialty.benefits.map((b, i) => (
              <li key={b} data-reveal="up" className="flex items-center gap-5 border-b border-mel/20 py-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mel/15 text-mel">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-lg text-creme">{b}</span>
                <span className="micro ml-auto hidden !text-[0.6rem] text-mel sm:inline">0{i + 1}</span>
              </li>
            ))}
          </ul>
          <div data-reveal="up" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              href={whatsappUrl("mechas")}
              external
              magnetic
              size="lg"
              className="breathe"
              event={{ name: "whatsapp_click", section: "especialidade" }}
              icon={<WhatsIcon />}
            >
              Quero meu loiro
            </Button>
            <a
              href={whatsappUrl("saberMais")}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-2 pb-1 text-mel"
            >
              Tirar dúvidas sobre mechas <Arrow />
            </a>
          </div>
        </div>

        <div className="relative min-h-[70vh] lg:min-h-full">
          <div data-clip className="absolute inset-0 lg:inset-y-0 lg:left-0 lg:right-0 lg:rounded-bl-[40%_18%]">
            <div data-clip-inner className="h-full w-full">
              <Photo
                src={specialty.image}
                alt={specialty.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="h-full w-full"
                tone={["#F1DDB0", "#8C6A3E"]}
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -left-12 bottom-10 hidden lg:block" data-reveal="fade">
            <SwatchRing n="01" size={120} tone="var(--mel)" textClass="text-creme" />
          </div>
          <p className="micro absolute bottom-6 right-6 rounded-full bg-cacau/75 px-4 py-2 !text-[0.6rem] text-mel backdrop-blur">
            BlondHair · Loiríssima
          </p>
        </div>
      </div>
      <Strands className="pointer-events-none absolute bottom-0 left-0 h-32 w-[60%] opacity-50" count={3} />
    </section>
  );
}
