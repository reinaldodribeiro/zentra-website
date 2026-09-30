import type { MetadataRoute } from "next";
import { privacy } from "@/content/privacy";
import { siteUpdatedAt, SITE_URL } from "@/content/site";
import { terms } from "@/content/terms";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}${privacy.path}`, lastModified: privacy.updatedAt, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}${terms.path}`, lastModified: terms.updatedAt, changeFrequency: "yearly", priority: 0.3 },
  ];
}
