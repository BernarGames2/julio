"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { GA_ID, PIXEL_ID, analyticsEnabled } from "@/lib/analytics";

/**
 * Analytics desligado por padrão. Só existe se NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_META_PIXEL_ID
 * estiverem definidos — e só carrega após consentimento (LGPD). Botão "Recusar" visível.
 */
export function Analytics() {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("jb-consent");
      if (v === "granted" || v === "denied") setConsent(v);
    } catch {}
    setReady(true);
  }, []);

  if (!analyticsEnabled || !ready) return null;

  const decide = (v: "granted" | "denied") => {
    try {
      localStorage.setItem("jb-consent", v);
    } catch {}
    setConsent(v);
  };

  return (
    <>
      {consent === "granted" && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {consent === "granted" && PIXEL_ID && (
        <Script id="fb" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
      {consent === null && (
        <div role="region" aria-label="Aviso de cookies" className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-xl rounded-[20px] border border-cacau/10 bg-creme p-5 text-cacau shadow-[var(--shadow-soft)] sm:bottom-6">
          <p className="text-sm">
            Usamos cookies de medição para entender como o site é usado. Nenhum dado pessoal é coletado sem a sua permissão.
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => decide("granted")} className="rounded-full bg-cacau px-5 py-2.5 text-sm text-creme">
              Aceitar
            </button>
            <button type="button" onClick={() => decide("denied")} className="rounded-full px-5 py-2.5 text-sm ring-1 ring-inset ring-cacau/40">
              Recusar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
