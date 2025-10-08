
import { Metadata } from 'next';
import HomeContent from '../components/pages/HomeContent';

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'EarlyJobs.ai - Transform College Placements with AI-Powered Solutions',
    description: 'Empower your college placements with EarlyJobs.ai. Connect students with top recruiters using AI-powered assessments and a verified talent pool at zero cost.',
    keywords: ['college placements', 'AI-powered recruitment', 'EarlyJobs.ai', 'student job opportunities', 'verified recruiters', 'ATS-friendly resumes'],
    openGraph: {
      title: 'EarlyJobs.ai - Transform College Placements',
      description: 'Join 150+ colleges using EarlyJobs.ai to connect students with top employers through AI-driven assessments and a verified recruiter network.',
      url: 'https://www.earlyjobs.ai',
      type: 'website',
      images: [
        {
          url: '/assets/og-image.jpg', 
          width: 1200,
          height: 630,
          alt: 'EarlyJobs.ai - College Placement Platform',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'EarlyJobs.ai - Transform College Placements',
      description: 'AI-powered platform connecting colleges with top recruiters for faster student placements.',
        images: ['/assets/og-image.jpg'], // Replace with actual Twitter image path
      },
  };
}

const Index = () => {
  return <HomeContent />;
};

export default Index;