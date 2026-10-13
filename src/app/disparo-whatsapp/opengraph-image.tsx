import { disparoWhatsapp } from "@/content/pages/disparoWhatsapp";
import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = disparoWhatsapp.metaTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(disparoWhatsapp.metaTitle);
}
