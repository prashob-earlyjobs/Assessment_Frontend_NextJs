export default function ClientCarousel({ logos = [] }) {
  if (!logos?.length) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 px-4 py-8">
      {logos.map((logo) => (
        <img key={logo.src} src={logo.src} alt={logo.alt || ""} className="h-10 w-auto object-contain" />
      ))}
    </div>
  );
}
