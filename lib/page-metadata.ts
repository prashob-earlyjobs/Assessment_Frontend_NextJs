import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const SITE_URL = "https://www.earlyjobs.ai";
export const SITE_NAME = "EarlyJobs";
const LOGO_PATH = "/images/logo.png";

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

function socialImage(url: string) {
  if (/^https?:\/\//.test(url)) return url;
  const file = path.join(process.cwd(), "public", url.replace(/^\//, ""));
  if (url.startsWith("/") && existsSync(file)) return url;
  return LOGO_PATH;
}

export function pageMetadata(input: PageMetadataInput): Metadata {
  const canonical = input.path === "/" ? "/" : input.path;
  const image = socialImage(input.image);
  const logo = image === LOGO_PATH;
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
          url: image,
          alt: input.imageAlt,
          ...(logo ? { width: 1000, height: 650 } : {}),
        },
      ],
    },
    twitter: {
      card: input.twitterCard ?? (logo ? "summary" : "summary_large_image"),
      title: input.twitterTitle,
      description: input.twitterDescription,
      images: [image],
    },
    robots: {
      index: input.index ?? true,
      follow: input.follow ?? true,
    },
  };
}
