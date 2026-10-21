import type { Metadata } from "next";

export const SITE_URL = "https://www.earlyjobs.ai";
export const SITE_NAME = "EarlyJobs";

export type PageMetadataInput = {
  /** Path beginning with "/", or "/" for home. */
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  image: string;
  imageAlt: string;
  twitterTitle: string;
  twitterDescription: string;
  index?: boolean;
  follow?: boolean;
  twitterCard?: "summary" | "summary_large_image";
};

export function pageMetadata(input: PageMetadataInput): Metadata {
  const canonical = input.path === "/" ? "/" : input.path;
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_IN",
      title: input.ogTitle,
      description: input.ogDescription,
      images: [
        {
          url: input.image,
          width: 1200,
          height: 630,
          alt: input.imageAlt,
        },
      ],
    },
    twitter: {
      card: input.twitterCard ?? "summary_large_image",
      title: input.twitterTitle,
      description: input.twitterDescription,
      images: [input.image],
    },
    robots: {
      index: input.index ?? true,
      follow: input.follow ?? true,
    },
  };
}
