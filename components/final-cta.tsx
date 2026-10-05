import { JoinMotion } from "@/components/home/motion";
import { GhostLink, SolidLink } from "@/components/home/primitives";

export function FinalCta() {
  return (
    <JoinMotion>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(234,106,78,0.16), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(234,106,78,0.08), transparent 40%)",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2 className="text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3.25rem]">
          Better Hiring Starts With Better Connections.
        </h2>
        <div className="mt-5 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
          <p>
            Whether you&apos;re building your recruiting career, searching for your next
            opportunity, or hiring exceptional talent, you&apos;re part of a network that believes
            hiring should be more human, more collaborative, and more successful.
          </p>
          <p>Join the people redefining how the world hires.</p>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <SolidLink href="/jobs">Find Jobs</SolidLink>
          <GhostLink href="/become-a-recruiter">Become a Recruiter</GhostLink>
          <GhostLink href="/employers">Start Hiring</GhostLink>
        </div>
      </div>
    </JoinMotion>
  );
}
