import Clientele from "./clientele";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'Our Clients & Hiring Partners | EarlyJobs',
    description: 'Explore companies that trust EarlyJobs for hiring quality talent. From startups to enterprises, our clients hire faster and smarter.',
    keywords: ['EarlyJobs clients', 'hiring partners', 'companies', 'recruiters', 'talent acquisition', 'verified employers'],
    openGraph: {
      title: 'Our Clients & Hiring Partners | EarlyJobs',
      description: 'Explore companies that trust EarlyJobs for hiring quality talent. From startups to enterprises, our clients hire faster and smarter.',
      url: `${baseUrl}/clientele`,
      type: 'website',
      images: [
        {
          url: `/assets/clientele.jpg`,
          width: 1200,
          height: 630,
          alt: 'Our Clients & Hiring Partners | EarlyJobs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Clients & Hiring Partners | EarlyJobs',
      description: 'Explore companies that trust EarlyJobs for hiring quality talent. From startups to enterprises, our clients hire faster and smarter.',
      images: [`/assets/clientele.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/clientele`,
    },
  };
}

export default function Page() {
  return <Clientele />;
}
