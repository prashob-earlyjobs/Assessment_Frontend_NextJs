"use client";

const rows = [
  {
    dimension: "Hiring control",
    inHouse:
      "Direct access to hiring managers and organisational processes.",
    agency:
      "Works to the requirements and coordination arrangements agreed with the employer.",
  },
  {
    dimension: "Candidate sourcing",
    inHouse: "Own databases, networks and recruitment channels.",
    agency:
      "May provide additional sourcing channels or specialised recruitment networks.",
  },
  {
    dimension: "Cost structure",
    inHouse: "Employee compensation, tools and operational expenses.",
    agency:
      "Placement fees, retainers or other agreed commercial arrangements.",
  },
  {
    dimension: "Scalability",
    inHouse: "Efficient for regular, stable recruitment demand.",
    agency:
      "Useful when volumes increase or extra sourcing capacity is required.",
  },
  {
    dimension: "Candidate experience",
    inHouse:
      "Strong when communication, expectations and responsibilities are clear.",
    agency:
      "Strong when communication, expectations and responsibilities are clear.",
  },
] as const;

export function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
      <div className="border-b border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
          Side-by-side comparison
        </p>
        <h3 className="mt-1 text-base font-semibold tracking-[-0.02em]">
          In-house hiring vs recruitment agency
        </h3>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-black/10 bg-white">
              <th className="px-5 py-4 text-[11px] font-semibold tracking-[0.12em] text-neutral-400 uppercase sm:px-6">
                Dimension
              </th>
              <th className="px-5 py-4 text-[11px] font-semibold tracking-[0.12em] text-neutral-400 uppercase sm:px-6">
                In-house hiring
              </th>
              <th className="px-5 py-4 text-[11px] font-semibold tracking-[0.12em] text-neutral-400 uppercase sm:px-6">
                Recruitment agency
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.dimension} className="border-b border-black/5 last:border-b-0">
                <th
                  scope="row"
                  className="align-top px-5 py-5 text-sm font-semibold tracking-[-0.02em] text-neutral-950 sm:px-6"
                >
                  {row.dimension}
                </th>
                <td className="align-top px-5 py-5 text-sm leading-6 text-neutral-600 sm:px-6">
                  {row.inHouse}
                </td>
                <td className="align-top px-5 py-5 text-sm leading-6 text-neutral-600 sm:px-6">
                  {row.agency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-black/5 md:hidden">
        {rows.map((row) => (
          <li key={row.dimension} className="px-5 py-5">
            <p className="text-sm font-semibold tracking-[-0.02em]">{row.dimension}</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-xl border border-black/10 bg-[#f8fafc] p-3">
                <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                  In-house
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{row.inHouse}</p>
              </div>
              <div className="rounded-xl border border-black/10 bg-[#f8fafc] p-3">
                <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-400 uppercase">
                  Agency
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{row.agency}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-black/5 bg-[#f8fafc] px-5 py-4 sm:px-6">
        <p className="text-[12px] leading-5 text-neutral-500">
          The lower-cost or better-fit option depends on hiring volume, role complexity, internal
          capacity and commercial terms — not on a single model being universally superior.
        </p>
      </div>
    </div>
  );
}
