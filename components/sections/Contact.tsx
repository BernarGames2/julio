import { contact, hours, hoursSummary } from "@/data/site";
import { telUrl, whatsappUrl } from "@/lib/whatsapp";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EditorialTitle } from "@/components/ui/EditorialTitle";
import { Button, WhatsIcon } from "@/components/ui/Button";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { LazyMap } from "@/components/ui/LazyMap";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { Strands } from "@/components/ui/Strands";

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-areia text-cobre">{children}</span>;
}

/** Contato — card de informações + card cacau com CTA grande de WhatsApp + mapa sob demanda. */
export function Contact() {
  const a = contact.address;
  return (
    <section id="contato" data-bg="areia" aria-labelledby="contato-title" className="relative">
      <div className="container-x pb-[var(--section)] pt-[calc(var(--section)*0.8)]">
        <SectionLabel n="06">Contato</SectionLabel>
        <EditorialTitle
          id="contato-title"
          lines={["Vamos olhar", "o seu cabelo?"]}
          italicIndex={1}
          className="mt-6 text-[clamp(2.6rem,1.4rem+4vw,5.6rem)]"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <div data-reveal="up" className="rounded-[28px] border border-cacau/15 bg-creme p-7 sm:p-9 lg:col-span-5">
            <ul className="space-y-7">
              <li className="flex gap-4">
                <Chip>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                </Chip>
                <div>
                  <p className="micro !text-[0.6rem] text-muted">Endereço</p>
                  <address className="mt-1 not-italic">
                    {a.street} – {a.district}
                    <br />
                    {a.city}/{a.state} · CEP {a.postalCode}
                  </address>
                  <TrackedLink
                    href={contact.mapsUrl}
                    external
                    event={{ name: "directions_click", section: "contato" }}
                    className="link-underline mt-2 inline-block pb-0.5 font-medium text-cobre"
                  >
                    Como chegar →
                  </TrackedLink>
                </div>
              </li>
              <li className="flex gap-4">
                <Chip>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
                  </svg>
                </Chip>
                <div>
                  <p className="micro !text-[0.6rem] text-muted">Telefone e WhatsApp</p>
                  <TrackedLink href={telUrl} event={{ name: "phone_click", section: "contato" }} className="serif mt-1 inline-block text-2xl">
                    {contact.phoneDisplay}
                  </TrackedLink>
                </div>
              </li>
              <li className="flex gap-4">
                <Chip>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5V12l3 2" strokeLinecap="round" />
                  </svg>
                </Chip>
                <div className="w-full">
                  <p className="micro !text-[0.6rem] text-muted">Horário · {hoursSummary}</p>
                  <ul className="mt-2 grid grid-cols-7 gap-1 text-center" aria-label="Horário por dia">
                    {[...hours.slice(1), hours[0]].map((h) => (
                      <li
                        key={h.day}
                        data-reveal="fade"
                        className={`rounded-xl py-2 text-xs ${h.open ? "bg-areia text-cacau" : "text-muted line-through decoration-cacau/30"}`}
                      >
                        <span className="block font-medium">{h.short}</span>
                        <span className="sr-only">{h.open ? `${h.open} às ${h.close}` : "fechado"}</span>
                        <span aria-hidden className="mt-0.5 block text-[0.62rem]">{h.open ? "9–19" : "—"}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
            <TrackedLink
              href={contact.instagramUrl}
              external
              event={{ name: "instagram_click", section: "contato" }}
              className="micro link-underline mt-9 inline-block !text-[0.62rem] text-muted"
            >
              Instagram {contact.instagramHandle}
            </TrackedLink>
          </div>

          <div
            id="cta-whatsapp-contato"
            data-reveal="up"
            className="on-dark relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-cacau p-7 text-creme sm:p-10 lg:col-span-7"
          >
            <Strands className="pointer-events-none absolute -right-20 top-6 h-40 w-[130%] opacity-60" />
            <div className="relative">
              <p className="micro !text-[0.62rem] text-mel">Agendamento pelo WhatsApp</p>
              <p className="display mt-6 text-[clamp(2.4rem,1.6rem+3vw,4.6rem)]">
                A primeira conversa é <em className="text-mel">sobre o seu cabelo</em>, não sobre o pacote.
              </p>
              <p className="mt-6 max-w-lg text-ash">
                Se quiser, mande uma foto do cabelo como está hoje e uma referência do que você imagina. A partir daí, a
                sua avaliação é agendada de terça a sábado, das 9h às 19h.
              </p>
            </div>
            <div className="relative mt-10 flex flex-wrap items-center gap-6">
              <Button
                href={whatsappUrl("geral")}
                external
                magnetic
                size="lg"
                variant="mel"
                event={{ name: "whatsapp_click", section: "contato" }}
                icon={<WhatsIcon />}
              >
                Agendar avaliação
              </Button>
              <span className="text-sm text-ash">{contact.phoneDisplay}</span>
            </div>
          </div>

          <div data-reveal="up" className="lg:col-span-12">
            <LazyMap src={contact.mapsEmbedUrl} title={`Mapa: ${a.street}, ${a.district}, ${a.city}`} />
          </div>
        </div>
      </div>
      <WaveDivider from="var(--areia)" className="!mb-0 bg-cacau" flip />
    </section>
  );
}
