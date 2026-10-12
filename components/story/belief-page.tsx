import Image from "next/image";
import Link from "next/link";

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

const founderMessage = [
  "We were already in recruitment when we began seeing how much talent was being overlooked. Women looking for a way back into work, recruiters needing more flexible opportunities, and businesses struggling to reach the right people.",
  "We realised hiring needed more than another portal or agency. It needed people, technology and local networks working together.",
  "That is what we're building with EarlyJobs.",
] as const;

export function BeliefStoryPage() {
  return (
    <main className="bg-white text-neutral-950">
      {/* Section 1: Hero */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-16 pb-12 sm:px-8 sm:pt-24 sm:pb-16">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
          Our Story
        </p>
        <div className="mt-6 grid items-end gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
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
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#f4f4f4]">
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
      </section>

      {/* Section 2: Where It Began */}
      <section className="border-t border-black/6 bg-[#f7f5f2]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[22px] bg-white">
            <Image
              src="/agency-partnerships/story-team.jpg"
              alt="EarlyJobs team working together on recruitment"
              fill
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div>
            <h2 className="max-w-[18ch] text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
              We Saw the Gaps Because We Were Part of the Industry.
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-neutral-600 sm:text-base">
              <p>
                Our journey began with firsthand experience in recruitment. We understood the daily
                realities: companies needed people, candidates needed opportunities, and recruiters
                worked to connect the two.
              </p>
              <p>But we kept seeing the same gaps.</p>
              <p>
                Talented women found it difficult to return to work after career breaks. Recruiters
                needed more flexible ways to build their careers. Businesses struggled to reach
                candidates beyond established hiring hubs. And young job seekers often lacked the
                tools to understand how prepared they were for interviews.
              </p>
              <p>
                These weren&apos;t isolated challenges. They were connected problems within the
                hiring ecosystem.
              </p>
              <p>We started asking ourselves a different question:</p>
              <p className="text-lg leading-8 font-medium text-neutral-950">
                What if recruitment could work better for everyone involved?
              </p>
              <p>
                What if recruiters could access opportunities without being limited by location?
                What if local entrepreneurs could build recruitment businesses in their own
                communities? What if technology could help candidates prepare and help hiring teams
                execute more effectively?
              </p>
              <p className="font-semibold text-neutral-950">
                Those questions shaped the EarlyJobs we began building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How Our Thinking Evolved */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="max-w-3xl text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
          One Problem Led Us to a Bigger Opportunity.
        </h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {milestones.map((item) => (
            <li key={item.n} className="min-w-0">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-[#f4f4f4]">
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
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-[15px] leading-7 text-neutral-600 sm:text-base">
          Each step expanded our understanding of what a better hiring system could look like.
        </p>
      </section>

      {/* Section 4: What We're Building Today */}
      <section className="border-t border-black/6 bg-[#f7f5f2]">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="max-w-3xl text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
            A Connected Hiring Ecosystem.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600 sm:text-base">
            We believe hiring shouldn&apos;t depend on one channel, one tool or one way of working.
            It should bring together the right people, technology and execution for the challenge at
            hand.
          </p>
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {ecosystem.map((item) => (
              <li key={item.name} className="overflow-hidden rounded-[22px] bg-white">
                <div className="relative aspect-[16/10]">
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
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-base font-semibold tracking-[-0.02em]">
            Different capabilities. One larger ambition: a better-connected way to hire.
          </p>
        </div>
      </section>

      {/* Section 5: What We Believe */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="mx-auto max-w-3xl text-center text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
          Talent Is Everywhere. Opportunity Should Be Too.
        </h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {beliefs.map((belief) => (
            <article key={belief.title} className="min-w-0">
              <Image
                src={belief.image}
                alt={belief.alt}
                width={974}
                height={802}
                className="h-auto w-full"
              />
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">{belief.title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-neutral-600">{belief.body}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-center text-[15px] leading-7 text-neutral-600">
          These beliefs shape the decisions we make, the products we build and the ecosystem
          we&apos;re working to grow.
        </p>
      </section>

      {/* Section 6: The Network Behind the Work */}
      <section className="border-t border-black/6 bg-[#f7f5f2]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="max-w-[16ch] text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
              Built by People. Strengthened by Technology.
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-neutral-600 sm:text-base">
              <p>
                Every recruiter brings more than the ability to fill a role. They bring
                relationships, local understanding and access to communities that might otherwise
                remain beyond an employer&apos;s reach.
              </p>
              <p>
                Every franchise partner brings local ownership and the ability to build recruitment
                operations closer to the talent they serve.
              </p>
              <p>
                Every employer brings a hiring challenge that helps us understand where the system
                can work better.
              </p>
              <p>
                Technology connects these capabilities, helping coordinate workflows and make
                recruitment more efficient.
              </p>
              <p>
                As the network grows, we can build stronger connections between businesses,
                recruiters and candidates.
              </p>
              <p className="font-semibold text-neutral-950">
                That is the infrastructure we&apos;re working towards: people who understand hiring,
                technology that supports them, and execution focused on meaningful outcomes.
              </p>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[22px] bg-white">
            <Image
              src="/freelance-recruiters/women-team.jpg"
              alt="EarlyJobs recruiter partners collaborating in person"
              fill
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Founder note — between network and looking ahead */}
      <section className="bg-[#eef4fb]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-white">
              <Image
                src="/about_us_imgs/Saurav-Kumar.jpg"
                alt="Saurav Kumar, Founder and CEO of EarlyJobs"
                fill
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-5">
              <p className="text-[15px] font-semibold tracking-[-0.02em] text-neutral-950">
                Saurav Kumar
              </p>
              <p className="mt-1 text-[13px] text-neutral-500">Founder &amp; CEO, EarlyJobs</p>
            </div>
          </div>

          <div className="rounded-[22px] border border-black/6 bg-white/80 px-6 py-8 sm:px-8 sm:py-10">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
              A Note from Our Founder
            </p>
            <div className="mt-5 flex gap-4">
              <span
                aria-hidden
                className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eef4fb] text-brand"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M7.2 18c1.9 0 3.4-1.5 3.4-3.4S9.1 11.2 7.2 11.2c-.2 0-.4 0-.6.1C7.4 8.6 9.5 7 12.1 6.5l-.5-2C7.6 5.2 4 8.4 4 13.1 4 15.8 5.5 18 7.2 18Zm9.4 0c1.9 0 3.4-1.5 3.4-3.4s-1.5-3.4-3.4-3.4c-.2 0-.4 0-.6.1.8-2.7 2.9-4.3 5.5-4.8l-.5-2c-3.9.7-7.5 3.9-7.5 8.6 0 2.7 1.5 4.9 3.1 4.9Z" />
                </svg>
              </span>
              <div className="min-w-0">
                <h2 className="max-w-[18ch] text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.035em] sm:text-[2.2rem]">
                  We saw the problem firsthand. We decided to build a better way.
                </h2>
                <div className="mt-6 space-y-4 text-[15px] leading-7 text-neutral-600 sm:text-base">
                  {founderMessage.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Looking Ahead */}
      <section className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
          Built in India. Growing With Every Connection.
        </h2>
        <div className="mt-6 space-y-4 text-[15px] leading-7 text-neutral-600 sm:text-base">
          <p>
            Our journey began with recruitment challenges we experienced firsthand. Our ambition is
            to build a hiring ecosystem that can serve diverse workforce needs, from professional
            recruitment to global hiring support and frontline workforce hiring.
          </p>
          <p>
            We&apos;re still learning, improving and building. We know that meaningful progress
            comes from understanding employers, supporting recruiters and continuously improving how
            people connect with opportunities.
          </p>
          <p>
            For us, the future isn&apos;t about adding more tools for the sake of it. It&apos;s
            about making the hiring process more connected, accessible and effective.
          </p>
          <p>
            We&apos;re building towards a future where businesses can reach talent beyond
            conventional channels, recruiters can build careers with greater flexibility, and
            technology helps people do their best work.
          </p>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section className="mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8 sm:pb-24">
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
                href="/agency-onboarding"
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
      </section>
    </main>
  );
}
