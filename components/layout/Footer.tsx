import { contact, site } from "@/data/site";
import { Strands } from "@/components/ui/Strands";

/** Footer minimalista cacau com wordmark gigante em contorno; cada letra sobe e vira mel no hover. */
export function Footer() {
  const word = "JÚLIO BONONI";
  return (
    <footer className="on-dark relative overflow-hidden bg-cacau pb-8 pt-20 text-creme">
      <Strands className="pointer-events-none absolute inset-x-0 top-6 h-24 w-full opacity-40" count={3} />
      <div className="container-x relative">
        <div className="grid gap-10 border-b border-mel/20 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="serif text-3xl">Júlio Bononi</p>
            <p className="mt-2 max-w-sm italic text-mel serif text-xl">{site.tagline}</p>
          </div>
          <address className="not-italic text-ash">
            <span className="micro mb-3 block !text-[0.62rem] text-mel">Onde</span>
            {contact.address.street} – {contact.address.district}
            <br />
            {contact.address.city}/{contact.address.state} · CEP {contact.address.postalCode}
          </address>
          <div className="text-ash">
            <span className="micro mb-3 block !text-[0.62rem] text-mel">Siga</span>
            <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-underline pb-0.5">
              {contact.instagramHandle}
            </a>
          </div>
        </div>

        <p
          className="display mt-10 flex select-none justify-between whitespace-nowrap text-[clamp(3rem,13.4vw,15rem)] leading-[0.85] text-mel"
        >
          <span className="sr-only">{site.shortName}</span>
          {Array.from(word).map((c, i) =>
            c === " " ? (
              <span key={i} aria-hidden className="w-[0.2em]" />
            ) : (
              <span
                key={i}
                aria-hidden
                className="text-stroke inline-block transition-[transform,color,-webkit-text-stroke-color] duration-300 ease-expo hover:-translate-y-[6px] hover:[-webkit-text-fill-color:rgb(var(--rgb-mel))] motion-reduce:hover:translate-y-0"
              >
                {c}
              </span>
            ),
          )}
        </p>

        <div className="mt-8 flex flex-col justify-between gap-2 text-sm text-ash sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Uberlândia/MG.</p>
          <p>Valores definidos na avaliação.</p>
        </div>
      </div>
    </footer>
  );
}
