"use client";

import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { Reveal } from "@/components/ui/reveal";

type Director = {
  id: string;
  name: string;
  designation: string;
  imageUrl: string;
  linkedInUrl?: string;
  biography: string;
};

const directors: Director[] = [
  {
    id: "1",
    name: "Saurav Kumar",
    designation: "Founder & CEO",
    imageUrl: "/images/1756300384422.jpeg",
    linkedInUrl: "https://www.linkedin.com/in/mesauravkumar",
    biography:
      "Founder & CEO of EarlyJobs. Building AI-powered hiring and a distributed recruiter network to connect talent with opportunity at scale.",
  },
  {
    id: "2",
    name: "Ravi Prakash Kumar",
    designation: "Founder & Director",
    imageUrl: "/images/founder-image.jpg",
    linkedInUrl: "https://www.linkedin.com/in/raviprakashkumar",
    biography:
      "Founder of EarlyJobs with deep experience in recruitment. Focused on bridging the gap between talent and opportunity across India.",
  },
  {
    id: "3",
    name: "Surbhi Rani",
    designation: "Co-Founder & Director",
    imageUrl: "/images/1765196458989.jpeg",
    linkedInUrl: "https://www.linkedin.com/in/thesurbhirani",
    biography:
      "Co-Founder & Director at EarlyJobs. Passionate about empowering freelance recruiters and creating accessible career pathways.",
  },
  {
    id: "4",
    name: "Prashob P",
    designation: "CTO",
    imageUrl: "/images/1780079531953.png",
    biography:
      "CTO leading technology and product innovation at EarlyJobs, building scalable platforms for recruiters, colleges, and employers.",
  },
  {
    id: "5",
    name: "Shankar Gaur",
    designation: "Non-Executive Director",
    imageUrl: "/images/shankar-gaur.jpg",
    linkedInUrl: "https://www.linkedin.com/in/shankargaur/",
    biography:
      "Non-Executive Director at EarlyJobs with 30+ years of leadership experience, including expertise in scaling job marketplaces and high-growth startups.",
  },
];

const TeamPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#f7f5f2] text-neutral-950">
      <section className="page-shell page-section !pb-8 text-center sm:!pb-10">
        <Reveal>
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-neutral-950 sm:text-4xl">
            Our Directors
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-neutral-600 sm:text-lg">
            Meet the leadership guiding EarlyJobs&apos; mission to transform hiring across India.
          </p>
        </Reveal>
      </section>

      <section className="page-shell page-section !pt-0">
        <ul className="reveal-stagger grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10">
          {directors.map((member) => (
            <Reveal
              as="li"
              key={member.id}
              className="flex flex-col items-start gap-4 border border-black/10 bg-white p-4 sm:flex-row sm:gap-6 sm:p-6 md:gap-8"
            >
              <div className="media-frame mx-auto aspect-square w-full max-w-[160px] shrink-0 !rounded-xl sm:mx-0 sm:max-w-[180px] md:max-w-[200px]">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  draggable="false"
                  className="h-full w-full select-none object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/company_placeholder.png";
                  }}
                />
              </div>
              <div className="flex min-w-0 w-full flex-1 flex-col">
                <div className="mb-2 flex items-start gap-2 sm:gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-lg leading-tight font-bold tracking-[-0.02em] text-neutral-950 sm:text-xl">
                      {member.name}
                    </h3>
                    <p className="mb-1 text-sm font-medium text-brand sm:text-base">
                      {member.designation}
                    </p>
                  </div>
                  {member.linkedInUrl && (
                    <a
                      href={member.linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 shrink-0 text-[#0077b5] transition-colors hover:text-[#005885]"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <FaLinkedin className="text-xl sm:text-2xl" />
                    </a>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-neutral-600">{member.biography}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default TeamPage;
