import { about, contact, metrics } from "@/data/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button, WhatsIcon } from "@/components/ui/Button";
import { SwatchRing } from "@/components/ui/SwatchRing";
import { Strands } from "@/components/ui/Strands";

/** O Júlio — retrato em arco, texto editorial e métricas reais. */
export function About() {
  return (
    <section id="o-julio" data-bg="areia" aria-labelledby="julio-title" className="paper relative overflow-hidden py-[var(--section)]">
      <Strands className="pointer-events-none absolute right-0 top-24 h-40 w-[70%] opacity-60" color="var(--cobre)" width={1} count={3} />
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-5 lg:col-start-1">
          <div data-clip className="relative mx-auto w-[86%] overflow-hidden rounded-t-[999px] rounded-b-[28px] sm:w-[70%] lg:w-full">
            <div data-parallax-inner className="scale-[1.12]">
              <Photo
                src={about.image}
                alt={about.imageAlt}
                ratio="4/5"
                sizes="(max-width: 1024px) 80vw, 40vw"
                tone={["#C9A46A", "#4A2E22"]}
              />
            </div>
          </div>
          <div className="absolute -bottom-8 right-0 sm:right-[10%] lg:-right-10">
            <span className="block rounded-full bg-areia p-2"><SwatchRing n="JB" size={116} tone="var(--cobre)" textClass="text-cacau italic" /></span>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionLabel n="04">O Júlio</SectionLabel>
          <h2 id="julio-title" className="display mt-6 text-[clamp(3rem,1.6rem+5vw,6.5rem)]" data-lines>
            <span className="mask-line">
              <span data-line className="block">
                {about.name}
              </span>
            </span>
          </h2>
          <p data-reveal="up" className="serif mt-4 text-[clamp(1.4rem,1.1rem+1vw,2rem)] italic leading-snug text-cobre">
            {about.role}
          </p>
          <div className="mt-8 space-y-5 text-[1.06rem] text-cacau/85">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 16)} data-reveal="up">
                {p}
              </p>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[22px] border border-cacau/15 bg-cacau/15 sm:grid-cols-3">
            {metrics.map((m) => (
              <div key={m.label} className="bg-areia p-5">
                <dt className="micro order-2 !text-[0.6rem] text-muted">{m.label}</dt>
                <dd className="serif mt-2 text-[2.4rem] leading-none text-cacau">
                  {m.value !== null ? (
                    <>
                      <span data-count={m.value} data-decimals={m.decimals}>
                        {m.value.toLocaleString("pt-BR", { minimumFractionDigits: m.decimals })}
                      </span>
                      {m.suffix}
                    </>
                  ) : (
                    m.text
                  )}
                </dd>
                <dd className="mt-2 text-xs text-muted">{m.note}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal="up" className="mt-10 flex flex-wrap items-center gap-6">
            <Button href={whatsappUrl("geral")} external magnetic event={{ name: "whatsapp_click", section: "sobre" }} icon={<WhatsIcon />}>
              Agendar com o Júlio
            </Button>
            <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-underline pb-1 text-cacau">
              Ver trabalhos no {contact.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
