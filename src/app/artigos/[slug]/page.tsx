import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/pages/ArticlePage";
import { articleBySlug, articles } from "@/content/articles";
import { firm } from "@/content/site";
import { pageMetadata } from "@/lib/pageMetadata";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const article = articleBySlug((await params).slug);
  if (!article) return {};
  const base = pageMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: article.path,
  });
  return {
    ...base,
    authors: [{ name: firm.name }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [firm.name],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const article = articleBySlug((await params).slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}
