import { Metadata } from 'next';
import UrbanFranchise from './urbanFranchise';
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'EarlyJobs Bangalore Franchise - AI-Powered Recruitment',
    description: 'Join EarlyJobs Bangalore, India\'s leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.',
    keywords: ['EarlyJobs', 'Bangalore', 'franchise', 'recruitment', 'AI recruitment', 'job placement'],
    openGraph: {
      title: 'EarlyJobs Bangalore Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Bangalore, combining AI technology and human expertise for exceptional recruitment results.',
      url: `${baseUrl}/franchise/bangalore`,
      type: 'website',
      images: [
        {
          url: `/images/og-franchise.jpg`,
          width: 1200,
          height: 630,
          alt: 'EarlyJobs Bangalore Franchise',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'EarlyJobs Bangalore Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Bangalore, combining AI technology and human expertise for exceptional recruitment results.',
      images: [`${baseUrl}/images/og-franchise.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/franchise/bangalore`,
    },
  };
}

export default function Page() {
  return <UrbanFranchise />;
}