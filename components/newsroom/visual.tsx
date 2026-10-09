import Image from "next/image";

type NewsroomVisualProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  aspect?: "hero" | "wide" | "square" | "story";
};

const aspectClass = {
  hero: "aspect-[16/10] sm:aspect-[16/9]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
  story: "aspect-[5/4]",
} as const;

export function NewsroomVisual({
  src,
  alt,
  priority = false,
  className = "",
  aspect = "wide",
}: NewsroomVisualProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${aspectClass[aspect]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 56rem, 100vw"
        className="object-contain object-center"
      />
    </div>
  );
}
