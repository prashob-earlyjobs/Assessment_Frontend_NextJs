import { AboutSection, AboutTitle } from "@/components/about/section";

export function AboutBelief() {
  return (
    <AboutSection id="belief">
      <div className="relative">
        <div className="relative lg:w-[54%]">
          <AboutTitle>Great Hiring Starts with Great People.</AboutTitle>
          <div className="mt-8 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
            <p>Technology can speed up hiring.</p>
            <p>It can organize information.</p>
            <p>It can improve matching.</p>
            <p>
              But technology alone cannot understand ambition, potential, culture, or human
              relationships.
            </p>
            <p>Recruiters can.</p>
            <p>Employers can.</p>
            <p>Professionals can.</p>
            <p>EarlyJobs exists to help those people work better together.</p>
          </div>
          <blockquote className="mt-10 max-w-2xl border-l-2 border-brand pl-5 text-[1.35rem] font-medium leading-snug tracking-[-0.03em] text-neutral-950 sm:text-[1.7rem]">
            &ldquo;AI should empower recruiters—not replace them.&rdquo;
          </blockquote>
        </div>
        <img
          src="/about/people.jpg"
          alt=""
          width={1024}
          height={682}
          className="pointer-events-none mx-auto mt-10 aspect-[1024/682] h-auto w-full max-w-lg mix-blend-multiply lg:absolute lg:top-1/2 lg:right-0 lg:mt-0 lg:w-[58%] lg:max-w-none lg:-translate-y-1/2 lg:[mask-image:linear-gradient(to_left,#000_48%,transparent_78%)]"
        />
      </div>
    </AboutSection>
  );
}
