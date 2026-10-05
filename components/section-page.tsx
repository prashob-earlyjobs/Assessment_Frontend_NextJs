export function SectionPage({ title }: { title: string }) {
  return (
    <main className="flex flex-1 items-center justify-center px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">{title}</h1>
    </main>
  );
}
