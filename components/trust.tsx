const metrics = [
  {
    label: "Recruiters",
    value: "350+",
    detail: "Recruiters building careers.",
  },
  {
    label: "Employers",
    value: "500+",
    detail: "Companies hiring through the network.",
  },
  {
    label: "Placements",
    value: "3,000+",
    detail: "Successful career outcomes.",
  },
  {
    label: "Interviews",
    value: "25,000+",
    detail: "Conversations that created opportunities.",
  },
  {
    label: "Colleges",
    value: "150+",
    detail: "Academic partners preparing future talent.",
  },
  {
    label: "Hiring Partners",
    value: "20+",
    detail: "Local hiring ecosystem partners.",
  },
] as const;

const logos = ["Startups", "Enterprise", "GCCs", "Growing businesses"] as const;
const logoRow = Array.from({ length: 4 }, () => logos).flat();

export function Trust() {
  return (
    <section id="section-2" className="snap-section border-t border-black/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-5 py-12 sm:px-8 sm:py-16">
        <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-950 sm:text-[2.75rem]">
          Trusted by a Growing Hiring Network.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
          Thousands of recruiters, employers, and professionals trust EarlyJobs to make hiring more
          transparent, collaborative, and outcome-driven.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          {metrics.map((metric) => (
            <li key={metric.label}>
              <p className="text-sm font-medium text-brand">{metric.label}</p>
              <p className="mt-1 text-[2rem] font-semibold leading-none tracking-[-0.04em] text-neutral-950">
                {metric.value}
              </p>
              <p className="mt-2 text-[13px] leading-5 text-neutral-500">{metric.detail}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <p className="text-sm text-neutral-500">
            Trusted by startups, enterprises, GCCs, and growing businesses.
          </p>
          <div className="logo-marquee mt-5 overflow-hidden">
            <div className="logo-track flex w-max items-center">
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
                  {logoRow.map((name, index) => (
                    <li
                      key={`${copy}-${name}-${index}`}
                      className="px-8 text-[15px] font-medium tracking-[-0.03em] text-neutral-400 uppercase"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
