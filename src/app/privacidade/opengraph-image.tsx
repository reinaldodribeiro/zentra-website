import { privacy } from "@/content/privacy";
import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = privacy.metaTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(privacy.metaTitle);
}
