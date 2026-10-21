export function SectionPage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-neutral-950">{title}</h1>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">{description}</p>
      ) : null}
    </main>
  );
}
