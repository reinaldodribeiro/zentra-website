import { whatsappLink } from "../content/site.ts";
import { voices, type VoiceKey } from "../content/voices.ts";

export type WhatsappOrigin = "cartao" | "modal" | "balao" | "barra";

export function whatsappMessage(origin: WhatsappOrigin, name = "", voice: VoiceKey = "inicial"): string {
  const messages = voices[voice].whatsapp;
  if (origin === "balao") return messages.balao;
  const trimmed = name.trim();
  if ((origin === "cartao" || origin === "modal") && trimmed) return messages.demo.replace("{nome}", trimmed);
  return messages.padrao;
}

export function buildWhatsappLink(origin: WhatsappOrigin, name = "", voice: VoiceKey = "inicial"): string {
  return whatsappLink(whatsappMessage(origin, name, voice));
}
