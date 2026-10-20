import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { sobre } from "@/content/pages/sobre";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: sobre.metaTitle,
  description: sobre.metaDescription,
  path: sobre.path,
});

export default function Page() {
  return <AboutPage />;
}
