export type NewsroomAnnouncement = {
  id: string;
  date: string;
  category: "Company" | "Product" | "Partnerships" | "People";
  title: string;
  excerpt: string;
  featured?: boolean;
};

export const announcements: NewsroomAnnouncement[] = [
  {
    id: "1",
    date: "October 2026",
    category: "Company",
    title: "EarlyJobs expands its recruiter-first hiring network across India",
    excerpt:
      "A growing community of independent recruiters, women recruiters, and local hiring partners is reshaping how employers reach talent.",
    featured: true,
  },
  {
    id: "2",
    date: "September 2026",
    category: "Product",
    title: "AI-assisted recruiting workflows now support faster candidate discovery",
    excerpt:
      "New tooling helps recruiters focus on judgment and relationships while AI handles repetitive screening work.",
  },
  {
    id: "3",
    date: "August 2026",
    category: "Partnerships",
    title: "Agency and district partner onboarding strengthens local hiring coverage",
    excerpt:
      "EarlyJobs continues to extend reach into Tier 2 and Tier 3 markets through distributed hiring partners.",
  },
  {
    id: "4",
    date: "July 2026",
    category: "People",
    title: "Women recruiters remain at the center of EarlyJobs’ growth story",
    excerpt:
      "Flexible, remote recruitment careers are helping more women re-enter and build lasting work in hiring.",
  },
];
