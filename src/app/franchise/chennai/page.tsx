import { Metadata } from 'next';
import FranchiseChennai from './chennaiFranchise';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'EarlyJobs Chennai Franchise - AI-Powered Recruitment',
    description: 'Join EarlyJobs Chennai, India\'s leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.',
    keywords: ['EarlyJobs', 'Chennai', 'franchise', 'recruitment', 'AI recruitment', 'job placement'],
    openGraph: {
      title: 'EarlyJobs Chennai Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Chennai, combining AI technology and human expertise for exceptional recruitment results.',
      url: `${baseUrl}/franchise/chennai`,
      type: 'website',
      images: [
        {
          url: `/images/og-franchise.jpg`,
          width: 1200,
          height: 630,
          alt: 'EarlyJobs Chennai Franchise',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'EarlyJobs Chennai Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Chennai, combining AI technology and human expertise for exceptional recruitment results.',
      images: [`/images/og-franchise.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/franchise/chennai`,
    },
  };
}

export default function Page() {
  return <FranchiseChennai />;
}