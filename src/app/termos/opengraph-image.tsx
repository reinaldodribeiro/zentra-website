import { terms } from "@/content/terms";
import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = terms.metaTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(terms.metaTitle);
}
