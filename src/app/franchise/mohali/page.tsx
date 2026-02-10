import { Metadata } from 'next';
import Index from './mohaliFranchise';
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'EarlyJobs Mohali Franchise - AI-Powered Recruitment',
    description: 'Join EarlyJobs Mohali, India\'s leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.',
    keywords: ['EarlyJobs', 'Mohali', 'franchise', 'recruitment', 'AI recruitment', 'job placement'],
    openGraph: {
      title: 'EarlyJobs Mohali Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Mohali, combining AI technology and human expertise for exceptional recruitment results.',
      url: `${baseUrl}/franchise/mohali`,
      type: 'website',
      images: [
        {
          url: `/images/og-franchise.jpg`,
          width: 1200,
          height: 630,
          alt: 'EarlyJobs Mohali Franchise',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'EarlyJobs Mohali Franchise',
      description: 'Explore franchise opportunities with EarlyJobs in Coimbatore, combining AI technology and human expertise for exceptional recruitment results.',
      images: [`${baseUrl}/images/og-franchise.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/franchise/mohali`,
    },
  };
}

export default function Page() {
  return <Index />;
}