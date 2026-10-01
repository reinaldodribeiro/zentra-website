import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { legalPage, links } from "@/content/site";
import { formatDate } from "@/lib/formatDate";
import type { LegalDocument } from "@/lib/legalDocuments";
import styles from "./LegalDocumentPage.module.css";

type LegalPageContent = { path: string; kicker: string; metaTitle: string };

function BackBar() {
  return (
    <div className={styles.back}>
      <Link href="/" aria-label={legalPage.backLabel} className={styles.mark}>
        <Image src="/brand/zentra-mark.svg" alt="" width={34} height={31} unoptimized />
      </Link>
      <Link href="/" className="link-line">
        {legalPage.back}
      </Link>
    </div>
  );
}

export function LegalDocumentPage({ content, document }: { content: LegalPageContent; document: LegalDocument | null }) {
  return (
    <>
      <BackBar />
      <main id="main" tabIndex={-1} className={`flex-1 ${styles.policy}`}>
        <span className="kicker">{content.kicker}</span>
        <h1 className={`display h-lg ${styles.title}`}>{document?.title ?? content.metaTitle}</h1>
        {document ? (
          <>
            <p className={`mono ${styles.updated}`}>
              {legalPage.version} {document.version} · {legalPage.effectiveFrom} {formatDate(document.effectiveAt)}
            </p>
            <div className={styles.body} dangerouslySetInnerHTML={{ __html: document.html }} />
          </>
        ) : (
          <p>
            {legalPage.unavailable}{" "}
            <a href={links.email} className={styles.link}>
              {legalPage.contactLabel}
            </a>
            .
          </p>
        )}
        <BackBar />
      </main>
      <Footer />
      <JsonLd breadcrumb={[{ name: content.metaTitle, path: content.path }]} />
    </>
  );
}
