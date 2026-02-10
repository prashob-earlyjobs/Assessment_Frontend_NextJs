import CollegeTieUp from "./collegeTieUp";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'College tie-ups | EarlyJobs',
    description: 'Partner with EarlyJobs to provide your students with exclusive access to internships and job opportunities. Enhance their career prospects with our AI-powered recruitment platform.',
    keywords: ['EarlyJobs', 'college tie-ups', 'internships', 'job opportunities', 'AI recruitment', 'student careers'],
    openGraph: {
      title: 'College tie-ups | EarlyJobs',
      description: 'Partner with EarlyJobs to provide your students with exclusive access to internships and job opportunities. Enhance their career prospects with our AI-powered recruitment platform.',
      url: `${baseUrl}/college-tieups`,
      type: 'website',
      images: [
        {
          url: `/assets/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'College tie-ups | EarlyJobs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'College tie-ups | EarlyJobs',
      description: 'Partner with EarlyJobs to provide your students with exclusive access to internships and job opportunities. Enhance their career prospects with our AI-powered recruitment platform.',
      images: [`/assets/og-image.png`],
    },
    alternates: {
      canonical: `${baseUrl}/college-tieups`,
    },
  };
}
export default function Page() {
  return <CollegeTieUp />;
}