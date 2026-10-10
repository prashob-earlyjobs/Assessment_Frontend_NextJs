import Link from "next/link";

export function CTABlock() {
  return (
    <section className="bg-[#0A0A0A]">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-[#F97316] uppercase">
          Join the story
        </p>
        <h2 className="mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[2.75rem]">
          Whether you&apos;re hiring, recruiting, or starting again — there&apos;s a place for you
          in this network.
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/jobs"
            className="inline-flex h-12 items-center justify-center border border-white px-5 text-[13px] font-medium text-white transition-colors hover:border-[#F97316] hover:bg-[#F97316]"
          >
            Find a job →
          </Link>
          <Link
            href="/recruiter"
            className="inline-flex h-12 items-center justify-center border border-white px-5 text-[13px] font-medium text-white transition-colors hover:border-[#F97316] hover:bg-[#F97316]"
          >
            Become a recruiter →
          </Link>
        </div>
      </div>
    </section>
  );
}
