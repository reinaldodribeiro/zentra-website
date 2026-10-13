import type { Metadata } from "next";
import { TopicPage } from "@/components/pages/TopicPage";
import { disparoWhatsapp } from "@/content/pages/disparoWhatsapp";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: disparoWhatsapp.metaTitle,
  description: disparoWhatsapp.metaDescription,
  path: disparoWhatsapp.path,
});

export default function Page() {
  return <TopicPage content={disparoWhatsapp} />;
}
