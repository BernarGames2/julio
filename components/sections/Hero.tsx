import { hero, contact, services } from "@/data/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { imageExists } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { SplitText } from "@/components/ui/SplitText";
import { Strands } from "@/components/ui/Strands";
import { Badge } from "@/components/ui/Badge";
import { Button, Arrow, WhatsIcon } from "@/components/ui/Button";
import { FloatingCard } from "@/components/ui/FloatingCard";
import { SwatchRing } from "@/components/ui/SwatchRing";
import { HeroMotion } from "./HeroMotion";
import Image from "next/image";

/**
 * HERO — capa de revista.
 * Camadas: [fundo: foto/vídeo + overlay cacau] → [headline gigante] → [recorte PNG, se houver] → [UI].
 */
export function Hero() {
  const hasCutout = hero.useCutout && imageExists(hero.cutout);
  return (
    <section
      id="inicio"
      data-hero
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cacau text-creme"
    >
      {/* ---------- camada 0: imagem / vídeo ---------- */}
      <div
        data-hero-media
        className="absolute inset-x-0 top-0 h-[64svh] overflow-hidden [clip-path:ellipse(140%_100%_at_50%_0%)] md:inset-0 md:h-auto md:[clip-path:none]"
      >
        <div data-hero-img className="absolute inset-0 will-change-transform">
          <Photo
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="h-full w-full"
            imgClassName="object-[60%_25%]"
            tone={["#D99A62", "#7E2E14"]}
            cursorLabel=""
          />
          {hero.video && (
            <video
              data-hero-video
              className="absolute inset-0 h-full w-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              poster={hero.image}
              aria-hidden="true"
            >
              {hero.video.webm && <source src={hero.video.webm} type="video/webm" />}
              {hero.video.mp4 && <source src={hero.video.mp4} type="video/mp4" />}
            </video>
          )}
        </div>
        {/* overlay cacau quente + vinheta */}
        <div data-hero-shade className="absolute inset-0 bg-[linear-gradient(180deg,rgb(42_26_21/.55)_0%,rgb(42_26_21/.25)_35%,rgb(42_26_21/.85)_100%)] md:bg-[linear-gradient(100deg,rgb(42_26_21/.88)_0%,rgb(42_26_21/.45)_48%,rgb(42_26_21/.25)_70%,rgb(42_26_21/.7)_100%)]" />
        <div data-hero-darken className="absolute inset-0 bg-cacau opacity-0" />
      </div>

      <Strands className="pointer-events-none absolute -left-10 top-[30%] z-[1] h-[40vh] w-[120vw] opacity-70 md:top-[52%]" />

      {/* ---------- camada 1: headline gigante ---------- */}
      <div className="container-x relative z-10 flex flex-1 flex-col justify-end pb-5 pt-[max(22svh,6.5rem)] md:justify-end md:pb-10 md:pt-28">
        <div data-hero-micro className="mb-5 md:mb-8 [@media(max-height:640px)_and_(max-width:767px)]:hidden">
          <Badge tone="dark">
            <span className="h-1.5 w-1.5 rounded-full bg-cobre-claro" aria-hidden />
            {hero.badge}
          </Badge>
        </div>

        <h1 id="hero-title" data-hero-title className="relative">
          <span className="sr-only">{hero.h1Full}</span>
          <span aria-hidden="true" className={`display block uppercase ${hasCutout ? "" : "md:mix-blend-screen"}`}>
            <span data-hero-line className="block whitespace-nowrap text-[15vw] leading-[0.95] md:leading-[0.86] md:text-[clamp(5rem,13vw,12.5rem)]">
              <SplitText text={hero.display[0]} announce={false} />
            </span>
            <span data-hero-line className="block whitespace-nowrap pl-[2vw] text-[15vw] leading-[0.95] md:leading-[0.86] md:pl-[min(7vw,6.5rem)] md:text-[clamp(5rem,13vw,12.5rem)]">
              <SplitText text={hero.display[1]} announce={false} />
            </span>
          </span>
          <span
            aria-hidden="true"
            data-hero-italic
            className="serif mt-3 block text-right text-[9.5vw] italic leading-none text-mel md:absolute md:-bottom-[0.55em] md:right-[3vw] md:mt-0 md:text-[clamp(2.2rem,4.4vw,5.2rem)] lg:right-[6vw]"
          >
            {hero.italic}
          </span>
        </h1>
      </div>

      {/* ---------- camada 2: recorte (cabelo passa na frente das letras) ---------- */}
      {hasCutout && (
        <div data-hero-cutout className="pointer-events-none absolute inset-0 z-20 hidden md:block">
          <Image src={hero.cutout} alt="" fill priority sizes="100vw" className="object-cover object-[60%_25%]" />
        </div>
      )}

      {/* ---------- camada 3: UI ---------- */}
      <div className="container-x relative z-30 grid gap-8 pb-8 lg:grid-cols-[minmax(0,34rem)_1fr] lg:items-end md:pb-10">
        <div>
          <p className="max-w-[30rem] text-[1.05rem] text-ash md:text-lg">
            Especialista em <strong className="font-medium text-creme">mechas</strong>, loiros,{" "}
            <strong className="font-medium text-creme">alisamentos</strong> e reestruturação capilar no Centro de Uberlândia.
            Toda cor começa por uma avaliação do seu fio — com calma, sem promessa milagrosa.
          </p>
          <div data-hero-micro className="mt-5 flex flex-wrap gap-3 md:mt-7">
            <Button
              href={whatsappUrl("geral")}
              external
              magnetic
              size="lg"
              event={{ name: "whatsapp_click", section: "hero" }}
              icon={<WhatsIcon />}
            >
              Agendar avaliação
            </Button>
            <Button href="#cartela" variant="outline-light" size="lg" icon={<Arrow />}>
              Ver a cartela
            </Button>
          </div>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-hero-micro
            className="mt-7 inline-flex items-center gap-3 text-sm text-ash"
          >
            <span className="flex -space-x-2" aria-hidden>
              {services.slice(0, 3).map((s) => (
                <span key={s.n} className="h-7 w-7 rounded-full ring-2 ring-cacau" style={{ background: `linear-gradient(160deg, ${s.tone[1]}, ${s.tone[0]})` }} />
              ))}
            </span>
            <span>
              <strong className="font-medium text-creme">10,8 mil</strong> seguidores no Instagram ·{" "}
              <span className="link-underline">perfil verificado {contact.instagramHandle}</span>
            </span>
          </a>
        </div>

        <div className="relative hidden h-full min-h-[14rem] lg:block">
          <div data-hero-card className="absolute right-[2%] top-[38%]">
            <FloatingCard n="01">{hero.floatingCards[0]}</FloatingCard>
          </div>
          <div data-hero-card className="absolute bottom-2 right-[30%]">
            <FloatingCard n="02">{hero.floatingCards[1]}</FloatingCard>
          </div>
        </div>
      </div>

      {/* pistas de rolagem */}
      <div className="container-x relative z-30 flex items-center justify-between border-t border-creme/15 py-4 sm:pr-24 lg:pr-28">
        <a href="#especialidade" data-hero-micro className="micro flex items-center gap-3 !text-[0.62rem] text-ash">
          <span className="scroll-pulse grid h-9 w-9 place-items-center rounded-full ring-1 ring-mel/50">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-mel" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M12 4v15M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Role <span className="text-mel">01 / 07</span>
        </a>
        <span data-hero-micro className="hidden items-center gap-3 md:flex" aria-hidden>
          <SwatchRing n="07" size={34} textClass="text-creme" />
          <span className="micro !text-[0.62rem] text-ash">Sete tons · uma avaliação</span>
        </span>
        <a
          href={whatsappUrl("geral")}
          target="_blank"
          rel="noopener noreferrer"
          data-hero-micro
          className="micro link-underline !text-[0.62rem] text-mel"
        >
          Agende sua avaliação →
        </a>
      </div>

      <HeroMotion hasCutout={hasCutout} />
    </section>
  );
}
