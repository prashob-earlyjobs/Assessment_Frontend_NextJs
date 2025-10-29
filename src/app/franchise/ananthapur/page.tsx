import { Metadata } from 'next';
import AnanthapurFranchise from './ananthapurFranchise';
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'EarlyJobs Ananthapur Franchise - AI-Powered Recruitment',
    description: 'Join EarlyJobs Ananthapur, India\'s leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.',
    keywords: ['EarlyJobs', 'Ananthapur', 'franchise', 'recruitment', 'AI recruitment', 'job placement'],
    openGraph: {
      title: 'EarlyJobs Ananthapur Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Ananthapur, combining AI technology and human expertise for exceptional recruitment results.',
      url: `${baseUrl}/franchise/ananthapur`,
      type: 'website',
      images: [
        {
          url: `/images/og-franchise.jpg`,
          width: 1200,
          height: 630,
          alt: 'EarlyJobs Ananthapur Franchise',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'EarlyJobs Ananthapur Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Coimbatore, combining AI technology and human expertise for exceptional recruitment results.',
      images: [`${baseUrl}/images/og-franchise.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/franchise/ananthapur`,
    },
  };
}

export default function Page() {
  return <AnanthapurFranchise />;
}