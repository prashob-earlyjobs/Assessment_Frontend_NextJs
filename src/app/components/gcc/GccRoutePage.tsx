import Footer from "../../components/pages/footer";
import NavbarV2 from "../../components/v2/navbar/navbar.v2";
import GccPage from "../../components/gcc/GccPage";
import type { GccPageContent } from "../../components/gcc/types";
import { Metadata } from "next";

export function createGccMetadata(content: GccPageContent): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";
  const url = `${baseUrl}/${content.slug}`;

  return {
    title: content.meta.title,
    description: content.meta.description,
    keywords: content.meta.keywords,
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url,
      type: "website",
      images: [
        {
          url: "/images/og-services.jpg",
          width: 1200,
          height: 630,
          alt: content.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: ["/images/og-services.jpg"],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function GccRoutePage({ content }: { content: GccPageContent }) {
  return (
    <>
      <NavbarV2 />
      <GccPage content={content} />
      <Footer />
    </>
  );
}
