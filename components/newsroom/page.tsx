"use client";

import Image from "next/image";

type NewsItem = {
  id: string;
  section: "Press Release" | "In The News";
  date: string;
  title: string;
  description: string;
  source: string;
  link: string;
  image: string;
  alt: string;
};

const bannerMap = {
  jobSearch: "/newsroom/women-led-recruiters.jpg",
  remoteWoman: "/newsroom/women-recruiters-story.jpg",
  partnership: "/newsroom/mandate-to-joining.jpg",
  collaboration: "/newsroom/team-collaboration.jpg",
  team: "/newsroom/earlyjobs-team.jpg",
  flatStyle: "/newsroom/media-storytelling.jpg",
  talent: "/newsroom/talent-network.jpg",
} as const;

const newsItems: NewsItem[] = [
  {
    id: "women-led-bs",
    section: "Press Release",
    date: "December 22, 2025",
    title: "EarlyJobs Builds a Women-Led Remote Recruiter Network at Scale",
    description:
      "EarlyJobs is scaling a remote-first recruitment model built around a women-led freelance recruiter network, operating across 150+ cities. The company aims to onboard over 10,000 women recruiters remotely by 2026, alongside a district-level franchise model and AI-based candidate readiness tools.",
    source: "ANI / Business Standard (PNN)",
    link: "https://www.business-standard.com/content/press-releases-ani/earlyjobs-builds-a-women-led-remote-recruiter-network-at-scale-125122200403_1.html",
    image: bannerMap.jobSearch,
    alt: "EarlyJobs women recruiters in branded polo shirts",
  },
  {
    id: "women-led-ani",
    section: "Press Release",
    date: "December 22, 2025",
    title: "EarlyJobs Builds a Women-Led Remote Recruiter Network at Scale (ANI Original)",
    description:
      "Same announcement carried on ANI News: distributed recruiter network enabling hiring across 150+ cities, 10,000 women recruiters target by 2026, and franchise-led on-ground execution in Tier 2/3 markets.",
    source: "ANI News",
    link: "https://www.aninews.in/news/business/earlyjobs-builds-a-women-led-remote-recruiter-network-at-scale20251222125529",
    image: bannerMap.remoteWoman,
    alt: "Illustration of a woman working remotely",
  },
  {
    id: "preseries-bs",
    section: "Press Release",
    date: "November 24, 2025",
    title:
      "Exclusive: Recruitment tech startup EarlyJobs AI set to raise USD 2 million in pre-Series A",
    description:
      "EarlyJobs AI is preparing to raise $2 million in a pre-Series A round with soft commitments from institutional and strategic investors, following its ₹1.2 crore seed raise. The platform has conducted 30,000+ interviews, grown a network of 300+ freelance women recruiters, and expanded to 22 franchise locations since June 2025.",
    source: "Business Standard / PNN",
    link: "https://www.business-standard.com/content/press-releases-ani/exclusive-recruitment-tech-startup-earlyjobs-ai-set-to-raise-usd-2-million-in-pre-series-a-125112400643_1.html",
    image: bannerMap.collaboration,
    alt: "Team collaborating around a conference table in a bright office",
  },
  {
    id: "preseries-ani",
    section: "Press Release",
    date: "November 24, 2025",
    title:
      "Exclusive: Recruitment tech startup EarlyJobs AI set to raise USD 2 million in pre-Series A (ANI Original)",
    description:
      "ANI's original carry of the pre-Series A announcement: 200%+ growth in the past year, AI engine evaluating communication, aptitude and technical skills, and plans to scale franchise operations across Indian districts.",
    source: "ANI News",
    link: "https://www.aninews.in/news/business/exclusive-recruitment-tech-startup-earlyjobs-ai-set-to-raise-usd-2-million-in-pre-series-a20251124181114",
    image: bannerMap.partnership,
    alt: "Illustration of partnership and startup collaboration",
  },
  {
    id: "preseries-bnn",
    section: "Press Release",
    date: "November 24, 2025",
    title:
      "Exclusive: Recruitment tech startup EarlyJobs AI set to raise USD 2 million in pre-Series A (Syndicated)",
    description:
      "Syndicated version of the pre-Series A story on Big News Network, part of the ANI wire distribution.",
    source: "Big News Network",
    link: "https://www.bignewsnetwork.com/news/278720125/exclusive-recruitment-tech-startup-earlyjobs-ai-set-to-raise-usd-2-million-in-pre-series-a",
    image: bannerMap.partnership,
    alt: "Illustration of partnership and startup collaboration",
  },
  {
    id: "seed-isn",
    section: "In The News",
    date: "April 28, 2025",
    title:
      "EarlyJobs secures Rs 1.2 crore seed funding to revolutionise India's recruitment ecosystem",
    description:
      "EarlyJobs raised Rs 1.2 crore in seed funding led by Power Tech Enterprises with participation from angel investor N J Jacob. The platform operates in 150+ cities, serves 50+ enterprise clients including Flipkart, HDFC and Bigbasket, with 1,000+ placements and 13,000+ interviews facilitated. 80%+ of its recruiter network are women working remotely.",
    source: "Indian Startup News",
    link: "https://indianstartupnews.com/funding/earlyjobs-secures-rs-12-crore-seed-funding-to-revolutionise-indias-recruitment-ecosystem-9009061",
    image: bannerMap.team,
    alt: "EarlyJobs team in branded polo shirts",
  },
  {
    id: "seed-marca",
    section: "In The News",
    date: "April 29, 2025",
    title: "EarlyJobs raises ₹1.2 crore in seed funding",
    description:
      "Marca Money covers the seed round: funds to expand AI capabilities and empower freelance recruiters. Highlights the zero-subscription, pay-per-hire model and the goal of 10,000 recruiters and 750+ franchise-led hubs.",
    source: "Marca Money",
    link: "https://www.marcamoney.com/earlyjobs-raises-1-2-crore-in-seed-funding/",
    image: bannerMap.partnership,
    alt: "Illustration of partnership and startup collaboration",
  },
  {
    id: "seed-sia",
    section: "In The News",
    date: "2025",
    title: "EarlyJobs raises over $100k in seed funding",
    description:
      "Staffing Industry Analysts (SIA) — global staffing industry daily news — covers EarlyJobs' INR 12 million (~USD 142k) seed round, giving the company international industry visibility.",
    source: "Staffing Industry Analysts",
    link: "https://www.staffingindustry.com/news/global-daily-news/earlyjobs-raises-over-100k-in-seed-funding",
    image: bannerMap.partnership,
    alt: "Illustration of partnership and startup collaboration",
  },
  {
    id: "interview-ist",
    section: "In The News",
    date: "April 13, 2026",
    title:
      "EarlyJobs: Bridging India's Job Gap for Women and Tier-2/3 Talent with AI and Freelance Power",
    description:
      "Founder interview with Saurav Kumar on Indian Startup Times: the 15-minute AI skills assessment, the hybrid freelance + district franchise model, ₹1.2 crore seed raise, and the roadmap to 10,000 women recruiters and 1 lakh placements.",
    source: "Indian Startup Times",
    link: "https://www.indianstartuptimes.com/interviews/earlyjobs-bridging-indias-job-gap-for-women-and-tier-2-3-talent-with-ai-and-freelance-power/",
    image: bannerMap.flatStyle,
    alt: "Flat-style illustration of EarlyJobs hiring network",
  },
  {
    id: "seed-linkedin",
    section: "In The News",
    date: "2025",
    title: "EarlyJobs seed funding announcement (LinkedIn)",
    description:
      "LinkedIn post by Indian Startup News on the ₹1.2 crore seed round — useful for social proof alongside the newsroom listing.",
    source: "LinkedIn",
    link: "https://www.linkedin.com/posts/indianstartupnews_funding-recruitment-investors-activity-7322474208721051649-FdVg",
    image: bannerMap.partnership,
    alt: "Illustration of partnership and startup collaboration",
  },
] as const;

const featured = [
  newsItems.find((item) => item.id === "women-led-bs")!,
  newsItems.find((item) => item.id === "preseries-bs")!,
  newsItems.find((item) => item.id === "seed-isn")!,
] as const;

const pressReleases = newsItems.filter((item) => item.section === "Press Release");
const inTheNews = newsItems.filter((item) => item.section === "In The News");

function DocumentIcon() {
  return (
    <svg viewBox="0 0 22 22" className="h-[22px] w-[22px] text-[#1f2431]" fill="none" aria-hidden>
      <rect x="4" y="2.5" width="14" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M7.5 7.5h7M7.5 11h7M7.5 14.5h4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function formatCardDate(date: string) {
  if (/^\d{4}$/.test(date)) return date;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function NewsroomPage() {
  const [lead, ...side] = featured;

  return (
    <main className="bg-[#f7f8fa] text-[#1f2431]">
      <section className="page-shell page-section !pt-12 sm:!pt-16">
        <h1 className="text-[2rem] leading-[1.2] font-light text-brand sm:text-[2.25rem]">
          Discover what&apos;s new with EarlyJobs
        </h1>

        <div className="mt-9 flex items-center gap-3">
          <DocumentIcon />
          <p className="text-base font-bold tracking-[0.12em] text-black/80">Featured News</p>
          <span aria-hidden className="h-px flex-1 bg-[#d6d6d6]" />
        </div>

        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.85fr)_minmax(16rem,0.9fr)]">
          <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-[10px] border border-[#d6d6d6] bg-white">
            <div className="relative aspect-[16/9] w-full shrink-0 bg-[#f0f1f3]">
              <Image
                src={lead.image}
                alt={lead.alt}
                fill
                priority
                sizes="(min-width: 1024px) 42rem, 100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-1 flex-col px-5 pt-5 pb-6 sm:px-6">
              <h2 className="text-[1.35rem] leading-[1.2] font-bold sm:text-[1.75rem]">{lead.title}</h2>
              <p className="mt-3 line-clamp-4 text-sm leading-6 text-[#1f2431]/70">
                {lead.description}
              </p>
              <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                <p className="text-sm font-bold tracking-[0.2px] text-[#c4c4c4]">
                  {formatCardDate(lead.date)} · {lead.source}
                </p>
                <a
                  href={lead.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-bold text-brand"
                >
                  Read now →
                </a>
              </div>
            </div>
          </article>

          <div className="grid h-full min-h-0 grid-rows-2 gap-5">
            {side.map((item) => (
              <article
                key={item.id}
                className="flex min-h-0 flex-col overflow-hidden rounded-[10px] border border-[#d6d6d6] bg-white"
              >
                <div className="relative aspect-[16/9] w-full shrink-0 bg-[#f0f1f3] lg:aspect-auto lg:min-h-[7.5rem] lg:flex-1">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 20rem, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex shrink-0 flex-col px-4 pt-4 pb-4">
                  <h2 className="line-clamp-3 text-lg leading-[1.2] font-bold">{item.title}</h2>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-bold tracking-[0.2px] text-[#c4c4c4]">
                      {formatCardDate(item.date)}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 text-base font-bold text-brand"
                    >
                      Read now →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <section>
            <h2 className="pb-2.5 text-[22px] leading-[1.2] font-bold tracking-[0.2px] text-[#1f2431]">
              In The News
            </h2>
            <ul>
              {inTheNews.map((item) => (
                <li key={item.id} className="border-b border-[#c4c4c4]/20 py-3">
                  <p className="text-[12px] font-medium tracking-[0.04em] text-[#c4c4c4]">
                    {item.date} · {item.source}
                  </p>
                  <h3 className="mt-1 text-base leading-normal font-normal text-brand">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#1f2431]/70">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm text-brand underline"
                  >
                    Read More
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="mailto:info@earlyjobs.in?subject=Media%20coverage"
              className="mt-4 inline-block text-sm text-brand underline"
            >
              Share coverage
            </a>
          </section>

          <section>
            <h2 className="pb-2.5 text-[22px] leading-[1.2] font-bold tracking-[0.2px] text-[#1f2431]">
              Press Release
            </h2>
            <ul>
              {pressReleases.map((item) => (
                <li key={item.id} className="border-b border-[#c4c4c4]/20 py-3">
                  <p className="text-[12px] font-medium tracking-[0.04em] text-[#c4c4c4]">
                    {item.date} · {item.source}
                  </p>
                  <h3 className="mt-1 text-base leading-normal font-normal text-brand">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#1f2431]/70">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm text-brand underline"
                  >
                    Read More
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
