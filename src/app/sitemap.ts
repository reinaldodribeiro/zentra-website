import type { MetadataRoute } from "next";
import { articles, articlesIndex } from "@/content/articles";
import { advocacia } from "@/content/pages/advocacia";
import { cookies } from "@/content/cookies";
import { creditoConsignado } from "@/content/pages/creditoConsignado";
import { privacy } from "@/content/privacy";
import { siteUpdatedAt, SITE_URL } from "@/content/site";
import { terms } from "@/content/terms";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}${creditoConsignado.path}`, lastModified: creditoConsignado.updatedAt, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}${advocacia.path}`, lastModified: advocacia.updatedAt, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}${articlesIndex.path}`, lastModified: articlesIndex.updatedAt, changeFrequency: "monthly", priority: 0.7 },
    ...articles.map((article) => ({
      url: `${SITE_URL}${article.path}`,
      lastModified: article.updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}${privacy.path}`, lastModified: privacy.updatedAt, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}${terms.path}`, lastModified: terms.updatedAt, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}${cookies.path}`, lastModified: cookies.updatedAt, changeFrequency: "yearly", priority: 0.3 },
  ];
}
