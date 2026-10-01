import type { Metadata } from "next";
import { TopicPage } from "@/components/pages/TopicPage";
import { advocacia } from "@/content/pages/advocacia";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: advocacia.metaTitle,
  description: advocacia.metaDescription,
  path: advocacia.path,
});

export default function Page() {
  return <TopicPage content={advocacia} />;
}
