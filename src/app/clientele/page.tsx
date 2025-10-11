import Clientele from "./clientele";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'Company tie-ups | Clientele | EarlyJobs',
    description: 'Partner with EarlyJobs to provide your students with exclusive access to internships and job opportunities. Enhance their career prospects with our AI-powered recruitment platform.',
    keywords: ['EarlyJobs', 'company tie-ups', 'internships', 'job opportunities', 'AI recruitment', 'student careers'],
    openGraph: {
      title: 'Company tie-ups | EarlyJobs',
      description: 'Partner with EarlyJobs to provide your students with exclusive access to internships and job opportunities. Enhance their career prospects with our AI-powered recruitment platform.',
      url: `${baseUrl}/company-tieups`,
      type: 'website',
      images: [
        {
          url: `/assets/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Company tie-ups | Clientele | EarlyJobs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Company tie-ups | EarlyJobs',
      description: 'Partner with EarlyJobs to provide your students with exclusive access to internships and job opportunities. Enhance their career prospects with our AI-powered recruitment platform.',
      images: [`/assets/og-image.png`],
    },
    alternates: {
      canonical: `${baseUrl}/company-tieups`,
    },
  };
}

export default function Page() {
  return <Clientele />;
}
