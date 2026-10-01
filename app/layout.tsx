import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "@/styles/globals.css";
import { site, contact } from "@/data/site";
import { localBusinessSchema } from "@/lib/schema";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: true,
});
const body = Jost({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body", display: "swap" });

const title = "Júlio Bononi Salão de Beleza · Mechas, loiros e alisamento em Uberlândia";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: [
    "mechas em Uberlândia",
    "alisamento em Uberlândia",
    "loiro",
    "reestruturação capilar",
    "salão de beleza no Centro de Uberlândia",
    "exoplastia",
    "morena iluminada",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: true },
  other: { "geo.region": "BR-MG", "geo.placename": contact.address.city },
};

export const viewport: Viewport = {
  themeColor: "#2A1A15",
  width: "device-width",
  initialScale: 1,
};

/** Antes da 1ª pintura: decide se o preloader em CSS roda (1ª visita da sessão, sem reduced-motion). */
const bootScript = `(function(){try{var d=document.documentElement;var r=matchMedia('(prefers-reduced-motion: reduce)').matches;var s=null;try{s=sessionStorage.getItem('jb-intro');sessionStorage.setItem('jb-intro','1')}catch(e){}if(!r&&s!=='1')d.classList.add('jb-intro')}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
