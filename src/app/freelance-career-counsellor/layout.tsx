import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  
  return {
    title: 'Become a Freelance Career Counsellor | EarlyJobs',
    description: 'Start your journey as a freelance career counsellor with EarlyJobs. Guide students and job seekers while building a flexible and meaningful career.',
    keywords: ['freelance career counsellor', 'career counselling', 'student guidance', 'EarlyJobs', 'career advisor', 'job counselling'],
    openGraph: {
      title: 'Become a Freelance Career Counsellor | EarlyJobs',
      description: 'Start your journey as a freelance career counsellor with EarlyJobs. Guide students and job seekers while building a flexible and meaningful career.',
      url: `${baseUrl}/freelance-career-counsellor`,
      type: 'website',
      images: [
        {
          url: '/assets/career_counsellor.jpg',
          width: 1200,
          height: 630,
          alt: 'Freelance Career Counsellor | EarlyJobs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Become a Freelance Career Counsellor | EarlyJobs',
      description: 'Start your journey as a freelance career counsellor with EarlyJobs. Guide students and job seekers while building a flexible and meaningful career.',
      images: ['/assets/career_counsellor.jpg'],
    },
    alternates: {
      canonical: `${baseUrl}/freelance-career-counsellor`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
