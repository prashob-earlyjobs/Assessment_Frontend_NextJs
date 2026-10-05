export function AboutPath({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => (
        <li key={step} className="flex flex-col">
          <span className="flex items-center gap-3 text-sm font-medium text-neutral-950">
            <span className="size-2 shrink-0 rounded-full bg-brand" />
            {step}
          </span>
          {index < steps.length - 1 ? (
            <span aria-hidden className="my-1.5 ml-[3px] h-4 w-px bg-brand/30" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
