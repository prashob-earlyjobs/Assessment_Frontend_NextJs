"use client";

import Image from "next/image";
import { useState } from "react";

const featured = [
  {
    id: "network",
    date: "October 2026",
    title: "EarlyJobs expands its recruiter-first hiring network across India",
    excerpt:
      "A growing community of independent recruiters, women recruiters, and local hiring partners is reshaping how employers reach talent.",
    image: "/newsroom/hiring-network-flow.jpg",
    alt: "Illustration of the EarlyJobs recruiter-first hiring network",
  },
  {
    id: "ai",
    date: "September 2026",
    title: "AI-assisted recruiting workflows now support faster candidate discovery",
    excerpt:
      "New tooling helps recruiters focus on judgment and relationships while AI handles repetitive screening work.",
    image: "/newsroom/mandate-to-joining.jpg",
    alt: "Illustration of the journey from a hiring mandate to a joining",
  },
  {
    id: "women",
    date: "July 2026",
    title: "Women recruiters remain at the center of EarlyJobs’ growth story",
    excerpt:
      "Flexible, remote recruitment careers are helping more women re-enter and build lasting work in hiring.",
    image: "/newsroom/women-recruiters-story.jpg",
    alt: "Illustration of women recruiters connected through the EarlyJobs network",
  },
] as const;

const releases = [
  ...featured,
  {
    id: "partners",
    date: "August 2026",
    title: "Agency and district partner onboarding strengthens local hiring coverage",
    excerpt:
      "EarlyJobs continues to extend reach into Tier 2 and Tier 3 markets through distributed hiring partners.",
    image: "/newsroom/mandate-to-joining.jpg",
    alt: "Illustration of the journey from hiring mandate to joining",
  },
] as const;

function DocumentIcon() {
  return (
    <svg viewBox="0 0 22 22" className="h-[22px] w-[22px] text-[#1f2431]" fill="none" aria-hidden>
      <rect x="4" y="2.5" width="14" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.5 7.5h7M7.5 11h7M7.5 14.5h4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function NewsroomPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [lead, ...side] = featured;

  function openRelease(id: string) {
    setOpenId(id);
    requestAnimationFrame(() => {
      document.getElementById(`release-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  return (
    <main className="bg-[#f7f8fa] text-[#1f2431]">
      <section className="mx-auto w-full max-w-6xl px-5 pt-12 pb-20 sm:px-8 sm:pt-16 sm:pb-28">
        <h1 className="text-[2rem] leading-[1.2] font-light text-brand sm:text-[2.25rem]">
          Discover what&apos;s new with EarlyJobs
        </h1>

        <div className="mt-9 flex items-center gap-3">
          <DocumentIcon />
          <p className="text-base font-bold tracking-[0.12em] text-black/80">Featured News</p>
          <span aria-hidden className="h-px flex-1 bg-[#d6d6d6]" />
        </div>

        <div className="mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1.85fr)_minmax(16rem,0.9fr)]">
          <article className="overflow-hidden rounded-[10px] border border-[#d6d6d6] bg-white">
            <div className="relative aspect-[1000/523]">
              <Image
                src={lead.image}
                alt={lead.alt}
                fill
                priority
                sizes="(min-width: 1024px) 42rem, 100vw"
                className="object-contain"
              />
            </div>
            <div className="px-5 pt-5 pb-6 sm:px-6">
              <h2 className="text-[1.35rem] leading-[1.2] font-bold sm:text-[1.75rem]">{lead.title}</h2>
              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="text-sm font-bold tracking-[0.2px] text-[#c4c4c4]">{lead.date}</p>
                <button
                  type="button"
                  onClick={() => openRelease(lead.id)}
                  className="text-base font-bold text-brand"
                >
                  Read now →
                </button>
              </div>
            </div>
          </article>

          <div className="grid gap-5">
            {side.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[10px] border border-[#d6d6d6] bg-white">
                <div className="relative aspect-[16/8]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 20rem, 100vw"
                    className="object-contain"
                  />
                </div>
                <div className="px-4 pt-4 pb-4">
                  <h2 className="text-lg leading-[1.2] font-bold">{item.title}</h2>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-bold tracking-[0.2px] text-[#c4c4c4]">{item.date}</p>
                    <button
                      type="button"
                      onClick={() => openRelease(item.id)}
                      className="shrink-0 text-base font-bold text-brand"
                    >
                      Read now →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <section>
            <h2 className="pb-2.5 text-[22px] leading-[1.2] font-bold tracking-[0.2px] text-[#1f2431]/30">
              In The News
            </h2>
            <h3 className="mt-2.5 text-base leading-normal font-normal">
              Published coverage will be listed here as it appears.
            </h3>
            <a
              href="mailto:info@earlyjobs.in?subject=Media%20coverage"
              className="mt-1.5 inline-block text-sm text-brand underline"
            >
              Share coverage
            </a>
          </section>

          <section>
            <h2 className="pb-2.5 text-[22px] leading-[1.2] font-bold tracking-[0.2px] text-[#1f2431]/30">
              Press Release
            </h2>
            <ul>
              {releases.map((item) => {
                const open = openId === item.id;
                return (
                  <li key={item.id} id={`release-${item.id}`} className="border-b border-[#c4c4c4]/20 py-2.5">
                    <h3 className="text-base leading-normal font-normal">{item.title}</h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenId(open ? null : item.id)}
                      className="mt-1 text-sm text-brand underline"
                    >
                      Read More
                    </button>
                    {open ? (
                      <p className="mt-3 max-w-xl text-sm leading-6 text-[#1f2431]/70">{item.excerpt}</p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
