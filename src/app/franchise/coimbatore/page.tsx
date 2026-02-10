import { Metadata } from 'next';
import Coimbatore from './coimbatoreFranchise';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'EarlyJobs Coimbatore Franchise - AI-Powered Recruitment',
    description: 'Join EarlyJobs Coimbatore, India\'s leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.',
    keywords: ['EarlyJobs', 'Coimbatore', 'franchise', 'recruitment', 'AI recruitment', 'job placement'],
    openGraph: {
      title: 'EarlyJobs Coimbatore Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Coimbatore, combining AI technology and human expertise for exceptional recruitment results.',
      url: `${baseUrl}/franchise/coimbatore`,
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
      title: 'EarlyJobs Coimbatore Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Coimbatore, combining AI technology and human expertise for exceptional recruitment results.',
      images: [`${baseUrl}/images/og-franchise.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/franchise/coimbatore`,
    },
  };
}

export default function Page() {
  return <Coimbatore />;
}