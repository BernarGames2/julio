/**
 * Eventos de analytics — sem dados pessoais.
 * GA4 e Meta Pixel só são carregados se as variáveis de ambiente
 * estiverem preenchidas E o visitante aceitar cookies (LGPD).
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
export const analyticsEnabled = Boolean(GA_ID || PIXEL_ID);

export type TrackEvent =
  | { name: "whatsapp_click"; section: string }
  | { name: "phone_click"; section: string }
  | { name: "directions_click"; section: string }
  | { name: "instagram_click"; section: string };

type W = Window & {
  gtag?: (...a: unknown[]) => void;
  fbq?: (...a: unknown[]) => void;
  dataLayer?: unknown[];
};

export function track(e: TrackEvent) {
  if (typeof window === "undefined") return;
  const w = window as W;
  const { name, ...params } = e;
  w.gtag?.("event", name, params);
  if (name === "whatsapp_click" || name === "phone_click") w.fbq?.("track", "Contact", params);
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", name, params);
}
