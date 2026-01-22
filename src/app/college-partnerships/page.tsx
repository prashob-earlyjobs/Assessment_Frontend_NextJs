
import { Metadata } from 'next';
import HomeContent from '../components/pages/HomeContent';

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'College Partnerships for Placements | EarlyJobs',
    description: 'Partner with EarlyJobs to improve student placements and career readiness. We help colleges connect students with verified employers across industries.',
    keywords: ['college partnerships', 'student placements', 'career readiness', 'EarlyJobs', 'college recruitment', 'student job opportunities'],
    openGraph: {
      title: 'College Partnerships for Placements | EarlyJobs',
      description: 'Partner with EarlyJobs to improve student placements and career readiness. We help colleges connect students with verified employers across industries.',
      url: `${baseUrl}/college-partnerships`,
      type: 'website',
      images: [
        {
          url: '/assets/college.jpg', 
          width: 1200,
          height: 630,
          alt: 'College Partnerships | EarlyJobs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'College Partnerships for Placements | EarlyJobs',
      description: 'Partner with EarlyJobs to improve student placements and career readiness. We help colleges connect students with verified employers across industries.',
      images: ['/assets/college.jpg'],
    },
    alternates: {
      canonical: `${baseUrl}/college-partnerships`,
    },
  };
}

const Index = () => {
  return <HomeContent />;
};

export default Index;