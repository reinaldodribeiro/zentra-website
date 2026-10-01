import { whatsappLink, whatsappMessages } from "../content/site.ts";

export type Origem = "cartao" | "modal" | "balao" | "barra" | "formulario";

export function mensagemWhatsapp(origem: Origem, nome = ""): string {
  const limpo = nome.trim();
  if (origem === "balao") return whatsappMessages.balao;
  if ((origem === "cartao" || origem === "modal") && limpo) {
    return whatsappMessages.demo.replace("{nome}", limpo);
  }
  return whatsappMessages.padrao;
}

export function linkWhatsapp(origem: Origem, nome = ""): string {
  return whatsappLink(mensagemWhatsapp(origem, nome));
}
