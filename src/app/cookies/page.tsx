import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage";
import { cookies } from "@/content/cookies";
import { fetchLegalDocument } from "@/lib/legalDocuments";
import { pageMetadata } from "@/lib/pageMetadata";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: cookies.metaTitle,
  description: cookies.metaDescription,
  path: cookies.path,
});

export default async function CookiesPage() {
  const document = await fetchLegalDocument(cookies.kind);
  return <LegalDocumentPage content={cookies} document={document} />;
}
