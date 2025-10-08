
import { Metadata } from 'next';
import RecruiterPageContent from '../components/pages/RecruiterPageContent';

// Base URL for development or production
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Recruiter Opportunities | EarlyJobs',
    description: 'Join EarlyJobs.ai as a recruiter to connect top talent with leading companies. Access AI-powered tools, a verified talent pool, and a seamless recruitment process.',
    keywords: [
      'recruiter opportunities',
      'EarlyJobs.ai',
      'college placements',
      'AI-powered recruitment',
      'talent acquisition',
      'verified recruiters',
    ],
    openGraph: {
      title: 'Recruiter Opportunities | EarlyJobs',
      description: 'Join EarlyJobs.ai as a recruiter to connect top talent with leading companies. Access AI-powered tools, a verified talent pool, and a seamless recruitment process.',
      url: `${BASE_URL}/recruiter`,
      type: 'website',
      images: [
        {
            url: `/images/og-recruiter.jpg`, 
            width: 1200,
          height: 630,
          alt: 'EarlyJobs.ai - Recruiter Opportunities',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Recruiter Opportunities | EarlyJobs',
      description: 'Join EarlyJobs.ai as a recruiter to connect top talent with leading companies.',
      images: [`/images/og-recruiter.jpg`], // Replace with actual Twitter image path
    },
  };
}

const RecruiterPage = () => {
  return <RecruiterPageContent />;
};

export default RecruiterPage;