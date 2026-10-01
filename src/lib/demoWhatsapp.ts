import { whatsappLink, whatsappMessages } from "../content/site.ts";

export type WhatsappOrigin = "cartao" | "modal" | "balao" | "barra" | "formulario";

export function whatsappMessage(origin: WhatsappOrigin, name = ""): string {
  const trimmed = name.trim();
  if (origin === "balao") return whatsappMessages.balao;
  if ((origin === "cartao" || origin === "modal") && trimmed) {
    return whatsappMessages.demo.replace("{nome}", trimmed);
  }
  return whatsappMessages.padrao;
}

export function buildWhatsappLink(origin: WhatsappOrigin, name = ""): string {
  return whatsappLink(whatsappMessage(origin, name));
}
