import { analiseDeCredito } from "@/content/pages/analiseDeCredito";
import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = analiseDeCredito.metaTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(analiseDeCredito.metaTitle);
}
