import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { Analytics } from "@/components/layout/Analytics";
import { Hero } from "@/components/sections/Hero";
import { Specialty } from "@/components/sections/Specialty";
import { Manifesto } from "@/components/sections/Manifesto";
import { Cartela } from "@/components/sections/Cartela";
import { About } from "@/components/sections/About";
import { Proof } from "@/components/sections/Proof";
import { Contact } from "@/components/sections/Contact";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Preloader } from "@/components/ui/Preloader";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="sr-only-focusable fixed left-4 top-4 z-[300] rounded-full bg-cacau px-5 py-3 text-creme">
        Pular para o conteúdo
      </a>
      <Preloader />
      <Header />
      <main id="conteudo">
        <Hero />
        <Specialty />
        <Manifesto />
        <Cartela />
        <About />
        <Proof />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <ScrollProgress />
      <Cursor />
      <SmoothScroll />
      <Analytics />
    </>
  );
}
