export type TopicSubsection = {
  heading: string;
  paragraphs: readonly string[];
};

export type TopicSection = {
  heading: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
  subsections?: readonly TopicSubsection[];
  closing?: readonly string[];
};

export type TopicLink = { label: string; href: string };

export type TopicPageContent = {
  path: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt: string;
  kicker: string;
  breadcrumbLabel: string;
  h1: string;
  intro: readonly string[];
  sections: readonly TopicSection[];
  faq: {
    kicker: string;
    title: string;
    items: readonly { question: string; answer: string }[];
  };
  related: { title: string; links: readonly TopicLink[] };
  serviceIndex: number;
};
