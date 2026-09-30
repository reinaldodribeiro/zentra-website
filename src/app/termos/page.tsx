import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { terms } from "@/content/terms";
import { Footer } from "@/components/layout/Footer";
import styles from "./Terms.module.css";

export const metadata: Metadata = {
  title: terms.metaTitle,
  description: terms.metaDescription,
  alternates: { canonical: terms.path },
  openGraph: { url: terms.path, title: terms.metaTitle, description: terms.metaDescription },
};

function BackBar() {
  return (
    <div className={styles.back}>
      <Link href="/" aria-label={terms.backLabel} className={styles.mark}>
        <Image src="/brand/zentra-mark.svg" alt="" width={34} height={31} unoptimized />
      </Link>
      <Link href="/" className="link-line">
        {terms.back}
      </Link>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      <div className={styles.banner} role="note">
        {terms.banner}
      </div>
      <BackBar />
      <main id="main" tabIndex={-1} className={`flex-1 ${styles.policy}`}>
        <span className="kicker">{terms.kicker}</span>
        <h1 className={`display h-lg ${styles.title}`}>{terms.title}</h1>
        <p className={`mono ${styles.updated}`}>{terms.updated}</p>
        <p>{terms.intro}</p>
        {terms.sections.map((section) => (
          <section key={section.heading}>
            <h2 className={styles.heading}>{section.heading}</h2>
            {section.paragraphs?.map((paragraph, index) => (
              <p key={paragraph}>
                {paragraph}
                {section.contact && index === section.paragraphs!.length - 1 ? (
                  <>
                    <a href={section.contact.href} className={styles.link}>
                      {section.contact.label}
                    </a>
                    {section.contact.after}
                  </>
                ) : null}
              </p>
            ))}
            {section.items ? (
              <ul className={styles.list}>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.closing?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <BackBar />
      </main>
      <Footer />
    </>
  );
}
