import { advocacia } from "@/content/pages/advocacia";
import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = advocacia.metaTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(advocacia.metaTitle);
}
