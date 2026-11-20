const stages = [
  {
    step: "01",
    title: "Patient registration",
    body: "Reception and registration associates who manage accuracy, communication and centre flow.",
  },
  {
    step: "02",
    title: "Sample collection",
    body: "Phlebotomists and collection staff with employer-approved training and credentials.",
  },
  {
    step: "03",
    title: "Laboratory support",
    body: "Lab assistants and specimen-processing support where qualifications meet role requirements.",
  },
  {
    step: "04",
    title: "Operations & admin",
    body: "Billing, documentation, inventory and branch administration that keep centres running.",
  },
] as const;

export function DiagnosticCentreJourney() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Centre operations journey
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-neutral-950">
            From registration to laboratory support
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-neutral-600">
          Each stage has different qualification, shift and patient-facing expectations — plan hiring
          by function, not as one generic vacancy.
        </p>
      </div>

      <ol className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {stages.map((item, index) => (
          <li key={item.step} className="relative lg:px-4">
            {index < stages.length - 1 ? (
              <span
                aria-hidden
                className="pointer-events-none absolute top-4 left-[calc(50%+1rem)] hidden h-px w-[calc(100%-2rem)] bg-black/10 lg:block"
              />
            ) : null}
            <span className="inline-flex rounded-full border border-black/10 bg-[#f7f8fa] px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-neutral-600 tabular-nums">
              {item.step}
            </span>
            <h4 className="mt-4 text-base font-semibold tracking-[-0.02em]">{item.title}</h4>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
