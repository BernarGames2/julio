import { contact, whatsappMessages, type WhatsappContext } from "@/data/site";

export function whatsappUrl(context: WhatsappContext = "geral") {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessages[context])}`;
}

export const telUrl = `tel:${contact.phoneE164}`;
