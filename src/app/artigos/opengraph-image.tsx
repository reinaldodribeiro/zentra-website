import { articlesIndex } from "@/content/articles";
import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = articlesIndex.metaTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(articlesIndex.metaTitle);
}
