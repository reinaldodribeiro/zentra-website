import { creditoConsignado } from "@/content/pages/creditoConsignado";
import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = creditoConsignado.metaTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(creditoConsignado.metaTitle);
}
