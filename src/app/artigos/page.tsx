import type { Metadata } from "next";
import { ArticlesIndexPage } from "@/components/pages/ArticlePage";
import { articlesIndex } from "@/content/articles";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: articlesIndex.metaTitle,
  description: articlesIndex.metaDescription,
  path: articlesIndex.path,
});

export default function Page() {
  return <ArticlesIndexPage />;
}
