import { companyFacts } from "@/data/company-facts";

const band = [
  companyFacts.recruiters,
  companyFacts.womenRecruiters,
  companyFacts.companies,
  companyFacts.interviews,
  companyFacts.joinings,
  companyFacts.districtPartners,
] as const;

export function StatsBand() {
  return (
    <section className="border-y border-[#E5E5E5] bg-white">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20">
        <ul className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
          {band.map((item, index) => (
            <li
              key={item.label}
              className={`px-0 lg:px-4 ${
                index > 0 ? "lg:border-l lg:border-[#E5E5E5]" : ""
              }`}
            >
              <p className="text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-[#0A0A0A] tabular-nums">
                {item.value}
              </p>
              <p className="mt-3 text-[13px] leading-4 text-[#525252]">{item.label}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-right text-[13px] text-[#525252]">{companyFacts.updatedLabel}</p>
      </div>
    </section>
  );
}
