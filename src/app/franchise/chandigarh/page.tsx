import { Metadata } from 'next';
import ChandigarhFranchise from './chandigarhFranchise';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'EarlyJobs Chandigarh Franchise - AI-Powered Recruitment',
    description: 'Join EarlyJobs Chandigarh, India\'s leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.',
    keywords: ['EarlyJobs', 'Chandigarh', 'franchise', 'recruitment', 'AI recruitment', 'job placement'],
    openGraph: {
      title: 'EarlyJobs Chandigarh Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Chandigarh, combining AI technology and human expertise for exceptional recruitment results.',
      url: `${baseUrl}/franchise/chandigarh`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/og-franchise.jpg`,
          width: 1200,
          height: 630,
          alt: 'EarlyJobs Chandigarh Franchise',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'EarlyJobs Chandigarh Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Chandigarh, combining AI technology and human expertise for exceptional recruitment results.',
      images: [`/images/og-franchise.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/franchise/chandigarh`,
    },
  };
}

export default function Page() {
  return <ChandigarhFranchise />;
}