import Image from "next/image";
import Link from "next/link";
import { NetworkMetricList } from "@/components/network-metric-list";
import { FounderOrigin, MissionBeliefClose } from "@/components/story/founder-origin";
import { Reveal } from "@/components/ui/reveal";
import { getNetworkMetrics } from "@/lib/dashboard";

const milestones = [
  {
    n: "01",
    title: "Opening Up Recruitment",
    body: "We began building a distributed network of freelance recruiters, creating more flexible ways for people to participate in recruitment. This was especially meaningful for women and professionals looking to restart or reshape their careers.",
    image: "/freelance-recruiters/women-culture.jpg",
    alt: "Women recruiters collaborating in a shared workspace",
  },
  {
    n: "02",
    title: "Bringing Hiring Closer to Communities",
    body: "We expanded our thinking beyond individual recruiters and developed a district-level franchise model. Local partners could build recruitment operations within their communities, helping businesses access talent across a wider geography.",
    image: "/agency-partnerships/story-team.jpg",
    alt: "Local recruitment partners discussing hiring plans",
  },
  {
    n: "03",
    title: "Making Preparation More Accessible",
    body: "We recognised that connecting candidates to opportunities was only part of the challenge. Through EarlyJobs.ai, we introduced AI-powered skills assessments to help candidates evaluate their abilities, identify improvement areas and prepare with greater clarity.",
    image: "/clientele/step-talent.jpg",
    alt: "Candidate preparing for an interview with digital tools",
  },
  {
    n: "04",
    title: "Building for More Complex Hiring Needs",
    body: "As hiring needs evolved, so did our vision. Huntlo brought AI-powered recruiting capabilities into sourcing and outreach workflows, while GigKaro extended our ecosystem into frontline and gig workforce hiring.",
    image: "/clientele/solution-global.jpg",
    alt: "Hiring team working across complex recruitment workflows",
  },
] as const;

const ecosystem = [
  {
    name: "EarlyJobs",
    title: "The Recruiter Network",
    body: "We connect employers with a distributed network of recruitment professionals, freelance recruiters, consultancies and franchise partners to support hiring across roles and locations.",
    image: "/freelance-recruiters/women-team.jpg",
    alt: "EarlyJobs recruiters collaborating around a table",
  },
  {
    name: "Huntlo AI",
    title: "Intelligent Hiring Infrastructure",
    body: "Huntlo helps recruitment teams streamline sourcing and candidate outreach through AI-powered capabilities, supporting recruiters as they manage repetitive work and scale their efforts.",
    image: "/about/human-ai.jpg",
    alt: "Recruitment technology supporting human hiring work",
  },
  {
    name: "GigKaro",
    title: "Frontline Workforce Hiring",
    body: "GigKaro focuses on frontline and gig workforce recruitment, helping businesses connect with delivery professionals, drivers, warehouse workers and other operational talent.",
    image: "/clientele/solution-gigkaro.jpg",
    alt: "Frontline workforce professionals in an operational setting",
  },
] as const;

const beliefs = [
  {
    title: "Opportunity shouldn't end with a career break.",
    body: "We believe people should have more flexible ways to participate in the workforce and build meaningful professional careers.",
    image: "/story/value-1.webp",
    alt: "Illustration representing new paths after a career break",
  },
  {
    title: "Location shouldn't limit ambition.",
    body: "We believe recruiters and local entrepreneurs in emerging cities deserve access to meaningful opportunities and wider business networks.",
    image: "/story/value-2.webp",
    alt: "Illustration of people working together across places",
  },
  {
    title: "Hiring needs more than technology.",
    body: "We believe software works best when supported by human judgment, relationships, local knowledge and accountable execution.",
    image: "/story/value-3.webp",
    alt: "Illustration of people collaborating with technology",
  },
  {
    title: "Better preparation creates better possibilities.",
    body: "We believe candidates should have ways to understand their strengths and improve their readiness before important interviews.",
    image: "/story/value-4.webp",
    alt: "Illustration representing candidate readiness and growth",
  },
] as const;

export async function BeliefStoryPage() {
  const metrics = await getNetworkMetrics();
  return (
    <main className="bg-white text-neutral-950">
      {/* Section 1: Hero */}
      <section className="page-shell page-section !pt-16 sm:!pt-24 !pb-12 sm:!pb-16">
        <Reveal>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
          Our Story
        </p>
        <div className="mt-6 grid items-end gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <h1 className="max-w-[16ch] text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.045em] sm:text-[3.5rem]">
              We&apos;re Building a Better Way to Hire.
            </h1>
            <p className="mt-5 max-w-lg text-lg font-medium leading-8 tracking-[-0.02em] text-neutral-800 sm:text-xl">
              Not another job portal. Not another recruitment agency.
            </p>
            <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-7 text-neutral-600 sm:text-base">
              <p>
                We started in recruitment. We saw talented people being overlooked, recruiters
                struggling to access the right opportunities, and businesses searching for talent
                beyond the reach of traditional hiring models.
              </p>
              <p>
                We believed there had to be a better way. One that brings people, networks and
                technology together to make hiring more accessible, connected and effective.
              </p>
              <p className="font-semibold text-neutral-950">That belief became EarlyJobs.</p>
            </div>
          </div>
          <div className="media-frame aspect-[4/3]">
            <Image
              src="/story/hero-partnership-handshake.jpg"
              alt="Recruiters and professionals collaborating across a desk"
              fill
              priority
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
        </Reveal>
      </section>

      {/* Founder origin — Victaman call, webinar, 33 women, mission */}
      <FounderOrigin />

      {/* How Our Thinking Evolved */}
      <section className="page-shell page-section">
        <Reveal>
        <h2 className="max-w-3xl text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
          One Problem Led Us to a Bigger Opportunity.
        </h2>
        </Reveal>
        <ul className="reveal-stagger mt-12 grid gap-8 sm:grid-cols-2">
          {milestones.map((item) => (
            <Reveal as="li" key={item.n} className="min-w-0">
              <div className="media-frame aspect-[16/10]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 28rem, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <p className="mt-5 text-[12px] font-semibold tracking-[0.14em] text-brand uppercase">
                {item.n}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-neutral-600">{item.body}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal>
        <p className="mt-10 max-w-3xl text-[15px] leading-7 text-neutral-600 sm:text-base">
          Each step expanded our understanding of what a better hiring system could look like.
        </p>
        </Reveal>
      </section>

      {/* Section 4: What We're Building Today */}
      <section className="border-t border-black/6 bg-[#f7f5f2]">
        <div className="page-shell page-section">
          <Reveal>
          <h2 className="max-w-3xl text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
            A Connected Hiring Ecosystem.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600 sm:text-base">
            We believe hiring shouldn&apos;t depend on one channel, one tool or one way of working.
            It should bring together the right people, technology and execution for the challenge at
            hand.
          </p>
          <NetworkMetricList metrics={metrics} />
          </Reveal>
          <ul className="reveal-stagger mt-12 grid gap-5 sm:gap-6 lg:grid-cols-3">
            {ecosystem.map((item) => (
              <Reveal as="li" key={item.name} className="overflow-hidden rounded-[20px] bg-white sm:rounded-[22px] transition-transform duration-500 hover:-translate-y-0.5">
                <div className="media-frame aspect-[16/10] !rounded-none">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 22rem, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
                    {item.name}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal>
          <p className="mt-10 max-w-3xl text-base font-semibold tracking-[-0.02em]">
            Different capabilities. One larger ambition: a better-connected way to hire.
          </p>
          </Reveal>
        </div>
      </section>

      {/* What We Believe */}
      <section className="page-shell page-section">
        <Reveal>
        <h2 className="mx-auto max-w-3xl text-center text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
          What We Believe
        </h2>
        </Reveal>
        <div className="reveal-stagger mt-12 grid gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-10">
          {beliefs.map((belief) => (
            <Reveal as="article" key={belief.title} className="min-w-0">
              <div className="media-frame aspect-[5/4]">
                <Image
                  src={belief.image}
                  alt={belief.alt}
                  fill
                  sizes="(min-width: 640px) 28rem, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">{belief.title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-neutral-600">{belief.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
        <p className="mx-auto mt-12 max-w-2xl text-center text-[15px] leading-7 text-neutral-600">
          These beliefs shape the decisions we make, the products we build and the ecosystem
          we&apos;re working to grow.
        </p>
        </Reveal>
      </section>

      <MissionBeliefClose />

      {/* Final CTA */}
      <section className="page-shell page-section !max-w-5xl !pt-0">
        <Reveal>
        <div className="relative overflow-hidden rounded-[28px]">
          <Image
            src="/story/cta-bg-coral.png"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 64rem, 100vw"
          />
          <div className="relative px-6 py-16 text-center text-white sm:px-12 sm:py-20">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              The Future of Hiring Is Connected.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
              We&apos;re building a better way to hire, together with the people who make hiring
              happen.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
              Whether you&apos;re an employer looking for talent, a recruiter ready to grow, a
              partner who shares our vision or a business exploring our solutions, there&apos;s a
              place for you in the journey.
            </p>
            <p className="mt-8 text-lg font-semibold">EarlyJobs. Huntlo AI. GigKaro.</p>
            <p className="mt-2 text-sm text-white/90">One mission. A connected hiring ecosystem.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/become-a-recruiter"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-neutral-950 px-5 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Become a Recruiter
              </Link>
              <Link
                href="/agency-partnerships"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-medium text-neutral-950 hover:bg-white/90"
              >
                Partner With Us
              </Link>
            </div>
            <Link
              href="/clientele"
              className="mt-5 inline-flex text-sm font-medium text-white underline underline-offset-4 hover:text-white/90"
            >
              Explore Hiring Solutions
            </Link>
          </div>
        </div>
        </Reveal>
      </section>
    </main>
  );
}
