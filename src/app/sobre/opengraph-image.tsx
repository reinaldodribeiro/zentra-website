import { sobre } from "@/content/pages/sobre";
import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = sobre.metaTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(sobre.metaTitle);
}
