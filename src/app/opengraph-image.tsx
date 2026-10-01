import { hero } from "@/content/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = hero.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(hero.title);
}
