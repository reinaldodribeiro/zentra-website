import { consultaDeProcessosParaAdvogados } from "./consulta-de-processos-para-advogados.ts";
import { higienizacaoDeBaseConsignado } from "./higienizacao-de-base-consignado.ts";
import { lgpdNoCreditoConsignado } from "./lgpd-no-credito-consignado.ts";
import type { ArticleContent } from "./types.ts";

export type { ArticleContent } from "./types.ts";

export const articles: readonly ArticleContent[] = [
  lgpdNoCreditoConsignado,
  higienizacaoDeBaseConsignado,
  consultaDeProcessosParaAdvogados,
];

export const articlesIndex = {
  path: "/artigos",
  metaTitle: "Artigos sobre consignado, LGPD e processos",
  metaDescription:
    "Artigos da Zentra sobre LGPD no crédito consignado, higienização de base e consulta de processos judiciais para advogados, escritos para quem opera.",
  updatedAt: "2026-10-01",
  kicker: "// ARTIGOS",
  breadcrumbLabel: "Artigos",
  h1: "Artigos sobre consignado, LGPD e processos judiciais",
  intro:
    "Textos curtos para quem opera carteira de consignado ou conduz um escritório de advocacia: o que a lei pede, como manter a base útil e como acompanhar processos e localizar partes.",
  readMore: "Ler o artigo",
  alsoRead: "Leia também",
};

export function articleBySlug(slug: string): ArticleContent | undefined {
  return articles.find((article) => article.slug === slug);
}

export function articlesByTopic(href: string): readonly ArticleContent[] {
  return articles.filter((article) => article.topic.href === href);
}
