import type { Metadata } from "next";
import { firm } from "@/content/site";

type PageMetadataInput = { title: string; description: string; path: string };

export function socialMetadata(title: string, description: string, path: string): Metadata {
  return {
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: firm.name,
      url: path,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    ...socialMetadata(`${title} | ${firm.shortName}`, description, path),
  };
}
