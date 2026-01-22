import type { Metadata } from "next";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  
  return {
    title: 'Verified Talent Pool for Hiring | EarlyJobs',
    description: 'Access a curated talent pool of job ready candidates across roles and industries. Hire faster with pre screened and verified talent from EarlyJobs.',
    keywords: ['talent pool', 'verified candidates', 'hiring', 'EarlyJobs', 'job ready talent', 'pre screened candidates'],
    openGraph: {
      title: 'Verified Talent Pool for Hiring | EarlyJobs',
      description: 'Access a curated talent pool of job ready candidates across roles and industries. Hire faster with pre screened and verified talent from EarlyJobs.',
      url: `${baseUrl}/jointalentpool/public/${id}`,
      type: 'website',
      images: [
        {
          url: '/images/talent_pool.jpg',
          width: 1200,
          height: 627,
          alt: 'Verified Talent Pool | EarlyJobs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Verified Talent Pool for Hiring | EarlyJobs',
      description: 'Access a curated talent pool of job ready candidates across roles and industries. Hire faster with pre screened and verified talent from EarlyJobs.',
      images: ['/images/talent_pool.jpg'],
    },
    alternates: {
      canonical: `${baseUrl}/jointalentpool/public/${id}`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
