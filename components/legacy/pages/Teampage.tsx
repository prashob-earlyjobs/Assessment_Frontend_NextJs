"use client";

import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { Reveal } from "@/components/ui/reveal";
import type { TeamMember } from "@/lib/teams";

const TeamPage: React.FC<{ members: TeamMember[] }> = ({ members }) => {
  return (
    <main className="min-h-screen bg-[#f7f5f2] text-neutral-950">
      <section className="page-shell page-section !pb-8 text-center sm:!pb-10">
        <Reveal>
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-neutral-950 sm:text-4xl">
            Our Team
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-neutral-600 sm:text-lg">
            Meet the leadership guiding EarlyJobs&apos; mission to transform hiring across India.
          </p>
        </Reveal>
      </section>

      <section className="page-shell page-section !pt-0">
        {members.length === 0 ? (
          <p className="text-center text-neutral-600">No team members to show yet.</p>
        ) : (
          <ul className="reveal-stagger grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {members.map((member) => (
              <Reveal
                as="li"
                key={member.id}
                className="flex h-full flex-col border border-black/10 bg-white p-4 sm:p-5"
              >
                <div className="media-frame aspect-square w-full !rounded-xl bg-[#f3f4f3]">
                  <img
                    src={member.imageUrl || "/images/company_placeholder.png"}
                    alt={member.name}
                    draggable="false"
                    className="h-full w-full select-none object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/company_placeholder.png";
                    }}
                  />
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg leading-tight font-bold tracking-[-0.02em] text-neutral-950">
                      {member.name}
                    </h3>
                    {member.designation ? (
                      <p className="mt-1 text-sm font-medium text-brand">{member.designation}</p>
                    ) : null}
                  </div>
                  {member.linkedInUrl ? (
                    <a
                      href={member.linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-0.5 shrink-0 text-[#0077b5] transition-colors hover:text-[#005885]"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                  ) : null}
                </div>
                {member.biography ? (
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{member.biography}</p>
                ) : null}
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default TeamPage;
