import { manifesto, marqueeWords, site } from "@/data/site";
import { Marquee } from "@/components/ui/Marquee";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ManifestoMotion } from "./ManifestoMotion";

/** Marquee gigante + manifesto cujas palavras acendem com a rolagem (scrub). */
export function Manifesto() {
  const words = manifesto.split(" ");
  return (
    <section id="manifesto" data-bg="linho" aria-labelledby="manifesto-title" className="paper relative overflow-hidden">
      <WaveDivider from="var(--cacau)" />
      <Marquee words={marqueeWords} className="mt-10 text-[clamp(4.5rem,13vw,13rem)] text-cacau/80" />

      <div className="container-x grid gap-10 py-[var(--section)] lg:grid-cols-[1fr_3fr]">
        <div>
          <SectionLabel n="02">Manifesto</SectionLabel>
          <h2 id="manifesto-title" className="sr-only">
            Como o Júlio trabalha
          </h2>
        </div>
        <div>
          <p data-manifesto className="serif text-[clamp(1.9rem,1.1rem+2.9vw,4.1rem)] leading-[1.14] tracking-[-0.01em]">
            {words.map((w, i) => (
              <span key={i} data-word className={/cabelo|olhar,|ouvir|entender/i.test(w) ? "italic text-cobre" : ""}>
                {w}{" "}
              </span>
            ))}
          </p>
          <p data-reveal="up" className="mt-12 flex max-w-xl items-start gap-4 text-muted">
            <span aria-hidden className="mt-3 h-px w-12 shrink-0 bg-cobre" />
            {site.promise}
          </p>
        </div>
      </div>
      <ManifestoMotion />
    </section>
  );
}
