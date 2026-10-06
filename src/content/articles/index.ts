import { consultaDeProcessosParaAdvogados } from "./consulta-de-processos-para-advogados.ts";
import { enriquecimentoDeDadosCadastrais } from "./enriquecimento-de-dados-cadastrais.ts";
import { higienizacaoDeBaseConsignado } from "./higienizacao-de-base-consignado.ts";
import { higienizacaoDeMailingConsignado } from "./higienizacao-de-mailing-consignado.ts";
import { lgpdNoCreditoConsignado } from "./lgpd-no-credito-consignado.ts";
import { sistemaParaCorrespondenteBancario } from "./sistema-para-correspondente-bancario.ts";
import type { ArticleContent } from "./types.ts";

export type { ArticleContent } from "./types.ts";

export const articles: readonly ArticleContent[] = [
  lgpdNoCreditoConsignado,
  higienizacaoDeBaseConsignado,
  higienizacaoDeMailingConsignado,
  enriquecimentoDeDadosCadastrais,
  sistemaParaCorrespondenteBancario,
  consultaDeProcessosParaAdvogados,
];

export const articlesIndex = {
  path: "/artigos",
  metaTitle: "Artigos sobre consignado, LGPD e processos",
  metaDescription:
    "Artigos da Zentra sobre LGPD no consignado, higienização de mailing, enriquecimento de dados cadastrais e consulta de processos para advogados.",
  updatedAt: "2026-10-06",
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
