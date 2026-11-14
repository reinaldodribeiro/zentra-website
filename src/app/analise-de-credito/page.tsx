import type { Metadata } from "next";
import { TopicPage } from "@/components/pages/TopicPage";
import { analiseDeCredito } from "@/content/pages/analiseDeCredito";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: analiseDeCredito.metaTitle,
  description: analiseDeCredito.metaDescription,
  path: analiseDeCredito.path,
});

export default function Page() {
  return <TopicPage content={analiseDeCredito} />;
}
