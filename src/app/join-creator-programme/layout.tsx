import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  
  return {
    title: 'Join EarlyJobs Creator Programme | Earn & Create Impact',
    description: 'Join the EarlyJobs Creator Programme and earn by creating career focused content. Collaborate with a growing job platform and build your personal brand.',
    keywords: ['creator programme', 'earn online', 'career content', 'EarlyJobs', 'affiliate program', 'content creator'],
    openGraph: {
      title: 'Join EarlyJobs Creator Programme | Earn & Create Impact',
      description: 'Join the EarlyJobs Creator Programme and earn by creating career focused content. Collaborate with a growing job platform and build your personal brand.',
      url: `${baseUrl}/join-creator-programme`,
      type: 'website',
      images: [
        {
          url: '/assets/creator_programme.jpg',
          width: 1200,
          height: 630,
          alt: 'Join Creator Programme | EarlyJobs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Join EarlyJobs Creator Programme | Earn & Create Impact',
      description: 'Join the EarlyJobs Creator Programme and earn by creating career focused content. Collaborate with a growing job platform and build your personal brand.',
      images: ['/assets/creator_programme.jpg'],
    },
    alternates: {
      canonical: `${baseUrl}/join-creator-programme`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
