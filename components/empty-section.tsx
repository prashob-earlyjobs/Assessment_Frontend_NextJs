export function EmptySection({ id }: { id: string }) {
  return (
    <section id={id} aria-hidden className="snap-section border-t border-black/10">
      <div className="page-shell page-section !py-12 sm:!py-16" />
    </section>
  );
}
