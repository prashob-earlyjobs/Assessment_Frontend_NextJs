type AboutEarlyJobsProps = {
  /** Optional industry-specific clause after the core blurb. */
  focus?: string;
};

export function AboutEarlyJobs({ focus }: AboutEarlyJobsProps) {
  return (
    <section className="border-b border-black/10">
      <div className="page-shell page-section">
        <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
          About EarlyJobs
        </h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
          EarlyJobs is an India-focused recruitment platform that helps employers hire for
          manufacturing plants, healthcare staffing, warehouses, and other high-volume roles —
          combining recruiter-led sourcing with practical hiring tools and planning templates.
          {focus ? ` ${focus}` : ""}
        </p>
      </div>
    </section>
  );
}
