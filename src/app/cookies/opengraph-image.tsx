import { cookies } from "@/content/cookies";
import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = cookies.metaTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage(cookies.metaTitle);
}
