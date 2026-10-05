export function EmptySection({ id }: { id: string }) {
  return (
    <section id={id} aria-hidden className="snap-section border-t border-black/10">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16" />
    </section>
  );
}
