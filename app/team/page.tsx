import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import TeamPage from "@/components/legacy/pages/Teampage";
import { pageMetadata } from "@/lib/page-metadata";
import { getTeamMembers, type TeamMember } from "@/lib/teams";

export const metadata: Metadata = pageMetadata({
  path: "/team",
  title: "Our Team | EarlyJobs",
  description: "Meet the leadership guiding EarlyJobs' mission to transform hiring across India.",
  ogTitle: "Our Team | EarlyJobs",
  ogDescription: "Meet the leadership guiding EarlyJobs' mission to transform hiring across India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Our Team | EarlyJobs",
  twitterDescription: "Meet the leadership guiding EarlyJobs.",
  twitterCard: "summary",
});

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

function teamSchema(members: TeamMember[]) {
  const people = members.flatMap((member) => {
    if (!member.name) return [];
    return [
      {
        "@type": "Person",
        name: member.name,
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
        name: "Our Team | EarlyJobs",
        description: "Meet the leadership guiding EarlyJobs' mission to transform hiring across India.",
        isPartOf: { "@id": "https://www.earlyjobs.ai/#website" },
        about: { "@id": "https://www.earlyjobs.ai/#organization" },
        breadcrumb: { "@id": "https://www.earlyjobs.ai/team#breadcrumb" },
        dateModified: "2026-10-22",
        ...(people.length ? { mainEntity: people } : {}),
      },
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
