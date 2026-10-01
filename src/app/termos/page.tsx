import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage";
import { terms } from "@/content/terms";
import { fetchLegalDocument } from "@/lib/legalDocuments";
import { pageMetadata } from "@/lib/pageMetadata";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: terms.metaTitle,
  description: terms.metaDescription,
  path: terms.path,
});

export default async function TermsPage() {
  const document = await fetchLegalDocument(terms.kind);
  return <LegalDocumentPage content={terms} document={document} />;
}
