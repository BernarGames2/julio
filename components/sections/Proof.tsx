import { beforeAfter, gallery, googleRating, testimonials } from "@/data/site";
import { Photo } from "@/components/ui/Photo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialTitle } from "@/components/ui/EditorialTitle";
import { Testimonials } from "./Testimonials";

/** Antes e depois + colagem assimétrica + depoimentos (somente reais). */
export function Proof() {
  const isDev = process.env.NODE_ENV !== "production";
  const showTestimonials = testimonials.length > 0 || isDev;
  return (
    <section id="resultados" data-bg="linho" aria-labelledby="resultados-title" className="relative overflow-hidden py-[var(--section)]">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel n="05">Antes e depois</SectionLabel>
            <EditorialTitle
              id="resultados-title"
              lines={["A cor certa", "aparece no espelho"]}
              italicIndex={1}
              className="mt-6 text-[clamp(2.5rem,1.4rem+3.6vw,5rem)]"
            />
          </div>
          <p data-reveal="up" className="self-end text-muted lg:col-span-4 lg:col-start-9">
            Trabalhos reais do salão. Arraste a divisória para comparar — cada cabelo tem um ponto de partida diferente, por
            isso cada resultado também é único.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:gap-6">
          <figure className="lg:col-span-7 lg:row-span-2">
            <BeforeAfter
              className="aspect-[4/5] w-full rounded-[28px] sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[40rem]"
              label="Comparar antes e depois — deslize"
              before={<Photo src={beforeAfter.before} alt={beforeAfter.beforeAlt} fill className="h-full w-full" tone={["#B89A72", "#4A2E22"]} cursorLabel="" />}
              after={<Photo src={beforeAfter.after} alt={beforeAfter.afterAlt} fill className="h-full w-full" tone={["#F1DDB0", "#C9A46A"]} cursorLabel="" />}
            />
            <figcaption className="micro mt-3 !text-[0.6rem] text-muted">{beforeAfter.caption}</figcaption>
          </figure>

          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:gap-5">
            {gallery.map((g, i) => (
              <figure
                key={g.src}
                data-reveal="up"
                className={["col-span-2", "mt-0", "mt-10", "col-span-2 w-[78%] justify-self-end"][i]}
              >
                <Photo
                  src={g.src}
                  alt={g.alt}
                  ratio={["16/10", "3/4", "3/4", "16/9"][i]}
                  sizes="(max-width: 1024px) 50vw, 22vw"
                  className={`group rounded-[22px] ${i === 1 ? "rounded-tl-[90px]" : ""} ${i === 2 ? "rounded-br-[90px]" : ""}`}
                  imgClassName="transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
                  tone={(
                    [
                      ["#F1DDB0", "#8C6A3E"],
                      ["#C2602F", "#5A2410"],
                      ["#B98858", "#4A2E22"],
                      ["#3B2A22", "#1E1410"],
                    ] as const
                  )[i]}
                />
                <figcaption className="micro mt-2 !text-[0.6rem] text-muted">{g.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        {showTestimonials && (
          <div className="mt-[var(--section)]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h3 className="display text-[clamp(2rem,1.4rem+2vw,3.4rem)]">
                Quem já <em className="text-cobre">sentou na cadeira</em>
              </h3>
              {googleRating && (
                <a href={googleRating.url} target="_blank" rel="noopener noreferrer" className="micro link-underline text-muted">
                  {googleRating.rating.toLocaleString("pt-BR")} no Google · {googleRating.count} avaliações
                </a>
              )}
            </div>
            <Testimonials items={testimonials} devPlaceholder={isDev && testimonials.length === 0} />
          </div>
        )}
      </div>
    </section>
  );
}
