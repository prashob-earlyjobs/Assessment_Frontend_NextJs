import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import TeamPage from "@/components/legacy/pages/Teampage";
import { pageMetadata } from "@/lib/page-metadata";
import { getTeamMembers, type TeamMember } from "@/lib/teams";

const TITLE = "Meet the EarlyJobs Leadership Team | Founders & Directors";
const DESCRIPTION =
  "Meet Saurav Kumar, Founder and CEO of EarlyJobs, alongside the founders, directors and technology leaders building a recruiter-first hiring network across India.";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/team",
    title: TITLE,
    description: DESCRIPTION,
    ogTitle: TITLE,
    ogDescription:
      "Discover the people behind EarlyJobs. Meet founder and CEO Saurav Kumar, our directors and technology leadership team building a recruiter-first hiring network.",
    image: "/images/logo.png",
    imageAlt: "EarlyJobs founders and leadership team",
    twitterTitle: TITLE,
    twitterDescription:
      "Meet Saurav Kumar and the leadership team building EarlyJobs' recruiter-first hiring network.",
    twitterCard: "summary",
  }),
  other: { language: "en-IN" },
};

export default async function Page() {
  const members = await getTeamMembers();
  return (
    <>
      <JsonLd data={teamSchema(members)} />
      <TeamPage members={members} />
    </>
  );
}

function absoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://www.earlyjobs.ai${url.startsWith("/") ? url : `/${url}`}`;
}

function personId(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `https://www.earlyjobs.ai/team#${slug}`;
}

function teamSchema(members: TeamMember[]) {
  const people = members.flatMap((member) => {
    if (!member.name) return [];
    const id = personId(member.name);
    return [
      {
        "@type": "Person",
        "@id": id,
        name: member.name,
        url: id,
        ...(member.designation ? { jobTitle: member.designation } : {}),
        ...(member.imageUrl ? { image: absoluteUrl(member.imageUrl) } : {}),
        ...(member.linkedInUrl ? { sameAs: [member.linkedInUrl] } : {}),
        ...(member.biography ? { description: member.biography } : {}),
        worksFor: { "@id": "https://www.earlyjobs.ai/#organization" },
      },
    ];
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.earlyjobs.ai/team#webpage",
        url: "https://www.earlyjobs.ai/team",
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: { "@id": "https://www.earlyjobs.ai/#website" },
        about: { "@id": "https://www.earlyjobs.ai/#organization" },
        ...(people.length ? { mainEntity: { "@id": "https://www.earlyjobs.ai/team#leadership-team" } } : {}),
        publisher: { "@id": "https://www.earlyjobs.ai/#organization" },
        breadcrumb: { "@id": "https://www.earlyjobs.ai/team#breadcrumb" },
        inLanguage: "en-IN",
      },
      ...people,
      ...(people.length
        ? [
            {
              "@type": "ItemList",
              "@id": "https://www.earlyjobs.ai/team#leadership-team",
              name: "EarlyJobs Leadership Team",
              numberOfItems: people.length,
              itemListOrder: "https://schema.org/ItemListOrderAscending",
              itemListElement: people.map((person, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: { "@id": person["@id"] },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.earlyjobs.ai/team#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.earlyjobs.ai/" },
          { "@type": "ListItem", position: 2, name: "Our Team", item: "https://www.earlyjobs.ai/team" },
        ],
      },
    ],
  };
}
