const rows = [
  {
    band: "Trainee",
    focus: "Entry manufacturing readiness",
    examples: "Manufacturing trainees, junior operational associates",
    eligibility: "ITI / diploma / employer-approved training paths",
    note: "Suitable where structured onboarding exists",
  },
  {
    band: "Support",
    focus: "Production & plant operations",
    examples: "Assembly assistants, materials, documentation, warehouse",
    eligibility: "Shift availability, location fit, basic process discipline",
    note: "Clear brief before candidate assessment",
  },
  {
    band: "Specialist",
    focus: "Qualified technical operations",
    examples: "Junior technicians meeting stated qualifications",
    eligibility: "Role-specific education, experience and assessments",
    note: "Not treated as general entry-level vacancies",
  },
] as const;

export function SemiconductorEligibilityMatrix() {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <div className="border-b border-black/10 bg-[#f7f8fa] px-5 py-5 sm:px-8 sm:py-6">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#0891B2] uppercase">
          Technical eligibility matrix
        </p>
        <h3 className="mt-2 max-w-2xl text-xl font-semibold tracking-[-0.03em] text-neutral-950">
          Separate trainee, support and specialist hiring before sourcing begins
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
          Semiconductor recruitment is not equivalent to general factory hiring. Define the band,
          eligibility and employer assessments for each vacancy.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-black/10 text-[11px] font-semibold tracking-[0.1em] text-neutral-500 uppercase">
              <th className="px-5 py-3.5 font-semibold sm:px-8">Band</th>
              <th className="px-4 py-3.5 font-semibold">Focus</th>
              <th className="px-4 py-3.5 font-semibold">Example roles</th>
              <th className="px-4 py-3.5 font-semibold">Eligibility lens</th>
              <th className="px-5 py-3.5 font-semibold sm:px-8">Planning note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.band} className="border-b border-black/5 last:border-b-0">
                <td className="px-5 py-4 align-top sm:px-8">
                  <span className="inline-flex rounded-md border border-cyan-700/15 bg-cyan-50 px-2.5 py-1 text-[12px] font-semibold tracking-[-0.01em] text-cyan-900">
                    {row.band}
                  </span>
                </td>
                <td className="px-4 py-4 align-top text-sm font-medium text-neutral-950">
                  {row.focus}
                </td>
                <td className="px-4 py-4 align-top text-sm leading-6 text-neutral-600">
                  {row.examples}
                </td>
                <td className="px-4 py-4 align-top text-sm leading-6 text-neutral-600">
                  {row.eligibility}
                </td>
                <td className="px-5 py-4 align-top text-sm leading-6 text-neutral-600 sm:px-8">
                  {row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-black/10 px-5 py-4 text-sm leading-6 text-neutral-500 sm:px-8">
        Specialized fabrication, process engineering, equipment maintenance and safety-critical roles
        require appropriate expertise and remain employer-assessed.
      </p>
    </div>
  );
}
