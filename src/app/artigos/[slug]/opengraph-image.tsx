import { articleBySlug, articles } from "@/content/articles";
import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const article = articleBySlug((await params).slug);
  return renderOgImage(article?.metaTitle ?? "");
}
