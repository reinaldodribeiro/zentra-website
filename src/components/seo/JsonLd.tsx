import { faq, firm, services, SITE_URL } from "@/content/site";

type GraphNode = Record<string, unknown>;
type Crumb = { name: string; path: string };

const organizationId = `${SITE_URL}/#organizacao`;

function organization(): GraphNode {
  const sameAs = [firm.linkedin, firm.instagram].filter((address) => address !== "");
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: firm.name,
    legalName: firm.legalName,
    taxID: firm.cnpj,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/zentra-mark.svg` },
    email: firm.email,
    telephone: firm.phoneE164,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: firm.phoneE164,
      email: firm.email,
      availableLanguage: "pt-BR",
      areaServed: "BR",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

function webSite(): GraphNode {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: firm.name,
    inLanguage: "pt-BR",
    publisher: { "@id": organizationId },
  };
}

export function serviceNodes(): GraphNode[] {
  return services.map((service, index) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/#servico-${index + 1}`,
    name: service.name,
    serviceType: service.serviceType,
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "BR" },
    audience: { "@type": "Audience", audienceType: service.audience },
  }));
}

type FaqItem = { question: string; answer: string };

export function faqNode(items: readonly FaqItem[] = faq.items): GraphNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceNode(index: number): GraphNode {
  return serviceNodes()[index];
}

type WebPageInput = { path: string; name: string; description: string; updatedAt: string; serviceIndex: number };

export function webPageNode({ path, name, description, updatedAt, serviceIndex }: WebPageInput): GraphNode {
  return {
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#pagina`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    inLanguage: "pt-BR",
    dateModified: updatedAt,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#servico-${serviceIndex + 1}` },
  };
}

function breadcrumbNode(crumbs: readonly Crumb[]): GraphNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: firm.shortName, path: "/" }, ...crumbs].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

export function JsonLd({ nodes = [], breadcrumb }: { nodes?: GraphNode[]; breadcrumb?: readonly Crumb[] }) {
  const graph = [organization(), webSite(), ...nodes, ...(breadcrumb ? [breadcrumbNode(breadcrumb)] : [])];
  const payload = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: payload }} />;
}

type ArticleInput = {
  path: string;
  headline: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
};

export function articleNode({ path, headline, description, publishedAt, updatedAt }: ArticleInput): GraphNode {
  return {
    "@type": "Article",
    "@id": `${SITE_URL}${path}#artigo`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    headline,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt,
    inLanguage: "pt-BR",
    image: `${SITE_URL}${path}/opengraph-image`,
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

type ListItemInput = { name: string; path: string };

export function itemListNode(items: readonly ListItemInput[]): GraphNode {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${SITE_URL}${item.path}`,
    })),
  };
}
