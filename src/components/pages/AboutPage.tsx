import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/pages/TopicPage";
import { sobre } from "@/content/pages/sobre";
import { firm, SITE_URL } from "@/content/site";
import styles from "./TopicPage.module.css";

export function AboutPage() {
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
                <li aria-current="page">{sobre.breadcrumbLabel}</li>
              </ol>
            </nav>
            <p className="kicker">{sobre.kicker}</p>
            <h1 className={`display h-xl ${styles.title}`}>{sobre.h1}</h1>
            {sobre.intro.map((paragraph) => (
              <p key={paragraph} className={styles.intro}>
                {paragraph}
              </p>
            ))}
          </div>
        </header>
        <article className={styles.body}>
          {sobre.sections.map((section) => (
            <Section key={section.heading} section={section} />
          ))}
        </article>
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat voice="inicial" />
      <JsonLd
        nodes={[
          {
            "@type": "AboutPage",
            "@id": `${SITE_URL}${sobre.path}#pagina`,
            url: `${SITE_URL}${sobre.path}`,
            name: sobre.metaTitle,
            description: sobre.metaDescription,
            inLanguage: "pt-BR",
            dateModified: sobre.updatedAt,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organizacao` },
          },
        ]}
        breadcrumb={[{ name: sobre.breadcrumbLabel, path: sobre.path }]}
      />
    </>
  );
}
