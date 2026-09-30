import type { Metadata } from "next";
import { TopicPage } from "@/components/pages/TopicPage";
import { creditoConsignado } from "@/content/pages/creditoConsignado";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: creditoConsignado.metaTitle,
  description: creditoConsignado.metaDescription,
  path: creditoConsignado.path,
});

export default function Page() {
  return <TopicPage content={creditoConsignado} />;
}
