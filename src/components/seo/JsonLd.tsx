import { firm, SITE_URL } from "@/content/site";

export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organizacao`,
    name: firm.name,
    url: SITE_URL,
    email: firm.email,
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: firm.name,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#organizacao` },
  };

  const payload = JSON.stringify([organization, webSite]).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: payload }} />;
}
