import { HashLink } from "@/components/recruiters/hash-link";
import { NetworkMark } from "@/components/about/network-mark";

export function AboutHero() {
  return (
    <section className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 16% 0%, rgba(234,106,78,0.12), transparent 34%), radial-gradient(ellipse at 90% 16%, rgba(234,106,78,0.07), transparent 28%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-start gap-12 px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:gap-16">
        <div>
          <h1 className="max-w-3xl text-[2.35rem] font-semibold leading-[1.06] tracking-[-0.045em] text-neutral-950 sm:text-[3.4rem]">
            We&apos;re Building a Better Way to Hire.
          </h1>
          <div className="mt-6 max-w-xl space-y-2 text-base leading-7 text-neutral-800">
            <p>Not another job portal.</p>
            <p>Not another recruitment agency.</p>
            <p>
              A recruiter-first hiring network where people, relationships, and technology work
              together to create better career outcomes.
            </p>
          </div>
          <div className="mt-5 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
            <p>Hiring isn&apos;t just about filling positions.</p>
            <p>It&apos;s about connecting people with opportunities that change lives.</p>
            <p>
              We believe recruiters deserve better tools, employers deserve better hiring outcomes,
              and job seekers deserve better opportunities.
            </p>
            <p>That&apos;s why we built EarlyJobs.</p>
          </div>
          <HashLink
            href="#belief"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-[6px] bg-brand px-4 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]"
          >
            Explore Our Story
          </HashLink>
        </div>
        <NetworkMark />
      </div>
    </section>
  );
}
