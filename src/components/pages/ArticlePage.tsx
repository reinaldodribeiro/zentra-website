import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Newsletter } from "@/components/sections/Newsletter";
import { JsonLd, articleNode, itemListNode, webPageNode } from "@/components/seo/JsonLd";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { articles, articlesIndex, type ArticleContent } from "@/content/articles";
import { cta, firm } from "@/content/site";
import { formatDate } from "@/lib/formatDate";
import { Section } from "./TopicPage";
import topic from "./TopicPage.module.css";
import styles from "./ArticlePage.module.css";

function Crumbs({ trail, current }: { trail?: { label: string; href: string }; current: string }) {
  return (
    <nav aria-label="Você está em" className={topic.crumbs}>
      <ol>
        <li>
          <Link href="/">{firm.shortName}</Link>
        </li>
        {trail ? (
          <li>
            <Link href={trail.href}>{trail.label}</Link>
          </li>
        ) : null}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

export function ArticlePage({ article }: { article: ArticleContent }) {
  const others = articles.filter((item) => item.slug !== article.slug);
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <header className={`theme-dark ${topic.top}`}>
          <div className={`container ${topic.topInner}`}>
            <Crumbs trail={{ label: articlesIndex.breadcrumbLabel, href: articlesIndex.path }} current={article.metaTitle} />
            <p className="kicker">{articlesIndex.kicker}</p>
            <h1 className={`display h-xl ${topic.title} ${styles.title}`}>{article.h1}</h1>
            <p className={topic.intro}>{article.summary}</p>
            <p className={`mono ${styles.meta}`}>
              {firm.name} · <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </p>
          </div>
        </header>
        <article className={topic.body}>
          {article.sections.map((section) => (
            <Section key={section.heading} section={section} />
          ))}
          <p className={styles.invite}>
            <Link href={article.topic.href} className="btn btn-primary">
              {article.topic.label}
            </Link>
          </p>
          <aside className={topic.related} aria-label={articlesIndex.alsoRead}>
            <p className={`mono ${topic.relatedTitle}`}>{articlesIndex.alsoRead}</p>
            <ul>
              {others.map((item) => (
                <li key={item.slug}>
                  <Link href={item.path} className={topic.relatedLink}>
                    {item.h1}
                    <ArrowRightIcon className={topic.arrow} />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </article>
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppFloat />
      <JsonLd
        nodes={[
          articleNode({
            path: article.path,
            headline: article.h1,
            description: article.metaDescription,
            publishedAt: article.publishedAt,
            updatedAt: article.updatedAt,
          }),
        ]}
        breadcrumb={[
          { name: articlesIndex.breadcrumbLabel, path: articlesIndex.path },
          { name: article.metaTitle, path: article.path },
        ]}
      />
    </>
  );
}

export function ArticlesIndexPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <header className={`theme-dark ${topic.top}`}>
          <div className={`container ${topic.topInner}`}>
            <Crumbs current={articlesIndex.breadcrumbLabel} />
            <p className="kicker">{articlesIndex.kicker}</p>
            <h1 className={`display h-xl ${topic.title}`}>{articlesIndex.h1}</h1>
            <p className={topic.intro}>{articlesIndex.intro}</p>
            <Link href={`/${cta.href}`} className="btn btn-primary">
              {cta.primary}
            </Link>
          </div>
        </header>
        <div className={topic.body}>
          <ul className={styles.list}>
            {articles.map((article) => (
              <li key={article.slug} className={styles.item}>
                <p className={`mono ${styles.meta}`}>
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                </p>
                <h2 className={`display ${topic.heading}`}>
                  <Link href={article.path}>{article.h1}</Link>
                </h2>
                <p>{article.summary}</p>
                <Link href={article.path} className={topic.relatedLink}>
                  {articlesIndex.readMore}
                  <ArrowRightIcon className={topic.arrow} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
      <JsonLd
        nodes={[
          webPageNode({
            path: articlesIndex.path,
            name: articlesIndex.metaTitle,
            description: articlesIndex.metaDescription,
            updatedAt: articlesIndex.updatedAt,
            serviceIndex: 0,
          }),
          itemListNode(articles.map((article) => ({ name: article.h1, path: article.path }))),
        ]}
        breadcrumb={[{ name: articlesIndex.breadcrumbLabel, path: articlesIndex.path }]}
      />
    </>
  );
}
