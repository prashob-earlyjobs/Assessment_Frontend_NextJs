import { GhostLink, SolidLink } from "@/components/home/primitives";
import { CtaMotion } from "@/components/employers/motion";

const dots = [
  { x: "8%", y: "22%" },
  { x: "16%", y: "72%" },
  { x: "90%", y: "18%" },
  { x: "82%", y: "76%" },
] as const;

export function EmployerFinalCta() {
  return (
    <section id="start-hiring" className="relative overflow-hidden border-t border-black/10">
      <CtaMotion>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(96,140,190,0.16), transparent 55%)",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2 className="cta-line text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3.25rem]">
          Better Hiring Starts with Better Recruiters.
        </h2>
        <p className="cta-line mt-5 max-w-xl text-sm leading-6 text-neutral-600">
          Join hundreds of employers hiring through a trusted recruiter network designed to deliver
          better candidates, faster decisions, and stronger hiring outcomes.
        </p>
        <div className="cta-line mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <SolidLink href="/sign-in">Start Hiring</SolidLink>
          <GhostLink href="/sign-in">Talk to Hiring Expert</GhostLink>
        </div>
        <p className="cta-line mt-10 max-w-md text-sm leading-6 text-neutral-600">
          The best teams aren&apos;t built by chance. They&apos;re built through great recruiters,
          trusted employers, and meaningful opportunities.
        </p>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {dots.map((dot) => (
          <span key={dot.x} className="absolute size-1.5" style={{ left: dot.x, top: dot.y }}>
            <span className="cta-drift block size-1.5 rounded-full bg-[#608cbe] will-change-transform" />
          </span>
        ))}
      </div>
      </CtaMotion>
    </section>
  );
}
