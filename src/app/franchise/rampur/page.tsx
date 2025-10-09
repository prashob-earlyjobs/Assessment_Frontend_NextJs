import { Metadata } from 'next';
import RampurFranchise from './rampurFranchise';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'EarlyJobs Rampur Franchise - AI-Powered Recruitment',
    description: 'Join EarlyJobs Rampur, India\'s leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.',
    keywords: ['EarlyJobs', 'Rampur', 'franchise', 'recruitment', 'AI recruitment', 'job placement'],
    openGraph: {
      title: 'EarlyJobs Rampur Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Rampur, combining AI technology and human expertise for exceptional recruitment results.',
      url: `${baseUrl}/franchise/rampur`,
      type: 'website',
      images: [
        {
          url: `/images/og-franchise.jpg`,
          width: 1200,
          height: 630,
          alt: 'EarlyJobs Coimbatore Franchise',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'EarlyJobs Rampur Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Rampur, combining AI technology and human expertise for exceptional recruitment results.',
      images: [`${baseUrl}/images/og-franchise.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/franchise/Rampur`,
    },
  };
}

export default function Page() {
  return <RampurFranchise />;
}