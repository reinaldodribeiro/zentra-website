import type { TopicLink, TopicSection } from "../pages/types";

export type ArticleContent = {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  topic: TopicLink;
  sections: readonly TopicSection[];
};
