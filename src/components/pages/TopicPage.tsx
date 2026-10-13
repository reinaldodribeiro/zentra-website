import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd, faqNode, serviceNode, webPageNode } from "@/components/seo/JsonLd";
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { articlesByTopic, articlesIndex } from "@/content/articles";
import type { TopicPageContent, TopicSection } from "@/content/pages/types";
import { cta, firm } from "@/content/site";
import { voiceForPath } from "@/content/voices";
import styles from "./TopicPage.module.css";

function HighlightSection({ section }: { section: TopicSection }) {
  return (
    <section className={`theme-dark ${styles.section} ${styles.highlight}`}>
      <p className={`kicker ${styles.highlightKicker}`}>
        <WhatsAppIcon className={styles.highlightIcon} />
        {section.highlight?.kicker}
      </p>
      <h2 className={`display ${styles.heading}`}>{section.heading}</h2>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.link ? (
        <Link href={section.link.href} className={`btn btn-primary ${styles.highlightButton}`}>
          {section.link.label}
          <ArrowRightIcon className={styles.arrow} />
        </Link>
      ) : null}
    </section>
  );
}

export function Section({ section }: { section: TopicSection }) {
  if (section.highlight) return <HighlightSection section={section} />;

  return (
    <section className={styles.section}>
      <h2 className={`display ${styles.heading}`}>{section.heading}</h2>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.items ? (
        <ul className={styles.list}>
          {section.items.map((item) => (
            <li key={item}>
              <CheckIcon className={styles.check} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {section.subsections?.map((subsection) => (
        <div key={subsection.heading} className={styles.subsection}>
          <h3 className={styles.subheading}>{subsection.heading}</h3>
          {subsection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      ))}
      {section.closing?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.link ? (
        <p>
          <Link href={section.link.href} className={styles.relatedLink}>
            {section.link.label}
            <ArrowRightIcon className={styles.arrow} />
          </Link>
        </p>
      ) : null}
    </section>
  );
}

export function TopicPage({ content }: { content: TopicPageContent }) {
  const relatedArticles = articlesByTopic(content.path);
  const voice = voiceForPath(content.path);
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <header className={`theme-dark ${styles.top}`}>
          <div className={`container ${styles.topInner}`}>
            <nav aria-label="Você está em" className={styles.crumbs}>
              <ol>
                <li>
                  <Link href="/">{firm.shortName}</Link>
                </li>
                <li aria-current="page">{content.breadcrumbLabel}</li>
              </ol>
            </nav>
            <p className="kicker">{content.kicker}</p>
            <h1 className={`display h-xl ${styles.title}`}>{content.h1}</h1>
            {content.intro.map((paragraph) => (
              <p key={paragraph} className={styles.intro}>
                {paragraph}
              </p>
            ))}
            <Link href={`/${cta.href}`} className="btn btn-primary">
              {cta.primary}
            </Link>
          </div>
        </header>
        <article className={styles.body}>
          {content.sections.map((section) => (
            <Section key={section.heading} section={section} />
          ))}
          {relatedArticles.length > 0 ? (
            <aside className={styles.related} aria-label={articlesIndex.alsoRead}>
              <p className={`mono ${styles.relatedTitle}`}>{articlesIndex.alsoRead}</p>
              <ul>
                {relatedArticles.map((article) => (
                  <li key={article.slug}>
                    <Link href={article.path} className={styles.relatedLink}>
                      {article.h1}
                      <ArrowRightIcon className={styles.arrow} />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
          <aside className={styles.related} aria-label={content.related.title}>
            <p className={`mono ${styles.relatedTitle}`}>{content.related.title}</p>
            <ul>
              {content.related.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.relatedLink}>
                    {link.label}
                    <ArrowRightIcon className={styles.arrow} />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </article>
        <Faq content={content.faq} />
        <FinalCta voice={voice} />
      </main>
      <Footer />
      <WhatsAppFloat voice={voice} />
      <JsonLd
        nodes={[
          webPageNode({
            path: content.path,
            name: content.metaTitle,
            description: content.metaDescription,
            updatedAt: content.updatedAt,
            serviceIndex: content.serviceIndex,
          }),
          serviceNode(content.serviceIndex),
          faqNode(content.faq.items),
        ]}
        breadcrumb={[{ name: content.breadcrumbLabel, path: content.path }]}
      />
    </>
  );
}
