export type GccFaq = {
  question: string;
  answer: string;
};

export type GccComparisonRow = {
  traditional: string;
  enterprise: string;
};

export type GccTimelineStep = {
  title: string;
  description?: string;
};

export type GccVariant =
  | "pillar"
  | "expansion"
  | "partner"
  | "offshore"
  | "talent"
  | "pan-india";

export type GccPageContent = {
  slug: string;
  variant: GccVariant;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    paragraph: string;
    primaryCta: string;
    secondaryCta: string;
    trustBar: string[];
  };
  editorial?: {
    heading: string;
    content: string;
    transition?: string;
    planningQuestions?: string[];
  };
  challenges?: {
    heading: string;
    items: string[];
    transition?: string;
  };
  comparison?: {
    heading: string;
    rows: GccComparisonRow[];
    footer: string;
  };
  valueProposition?: {
    heading: string;
    subheading: string;
    items: string[];
    outcome: string;
  };
  categories?: {
    heading: string;
    items: string[];
  };
  timeline?: {
    heading: string;
    steps: GccTimelineStep[];
  };
  differentiators?: {
    heading: string;
    items: string[];
  };
  outcomes?: {
    heading: string;
    items: string[];
  };
  industries?: {
    heading: string;
    items: string[];
  };
  services?: {
    heading: string;
    items: string[];
  };
  framework?: {
    heading: string;
    phases: GccTimelineStep[];
  };
  engagementModels?: {
    heading: string;
    items: string[];
  };
  governance?: {
    heading: string;
    items: string[];
  };
  successStory?: {
    heading: string;
    steps: GccTimelineStep[];
  };
  maturityModel?: {
    heading: string;
    levels: string[];
    footer: string;
  };
  faqs: GccFaq[];
  finalCta: {
    heading: string;
    paragraph: string;
    primaryCta: string;
    secondaryCta: string;
  };
};
