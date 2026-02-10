import { Metadata } from 'next';
import Index from './hyderabadFranchise';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'EarlyJobs Hyderabad Franchise - AI-Powered Recruitment',
    description: 'Join EarlyJobs Hyderabad, India\'s leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.',
    keywords: ['EarlyJobs', 'Hyderabad', 'franchise', 'recruitment', 'AI recruitment', 'job placement'],
    openGraph: {
      title: 'EarlyJobs Hyderabad Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Hyderabad, combining AI technology and human expertise for exceptional recruitment results.',
      url: `${baseUrl}/franchise/hyderabad`,
      type: 'website',
      images: [
        {
          url: `/images/og-franchise.jpg`,
          width: 1200,
          height: 630,
          alt: 'EarlyJobs Hyderabad Franchise',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'EarlyJobs Hyderabad Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Hyderabad, combining AI technology and human expertise for exceptional recruitment results.',
      images: [`${baseUrl}/images/og-franchise.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/franchise/hyderabad`,
    },
  };
}

export default function Page() {
  return <Index />;
}