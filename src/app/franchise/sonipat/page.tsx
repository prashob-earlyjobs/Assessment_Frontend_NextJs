import { Metadata } from 'next';
import SonipatFranchise from './sonipatFranchise';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'EarlyJobs Sonipat Franchise - Jobs for Students | Campus Placement Support | Local Hiring Agency',
    description: 'EarlyJobs Sonipat - Your trusted AI-powered recruitment partner in Haryana. Verified jobs for students, campus placement support for colleges, and local hiring solutions for employers in Sonipat and NCR region.',
    keywords: [
      'recruitment franchise in Sonipat',
      'jobs for students in Sonipat',
      'campus placement support Sonipat',
      'internship opportunities Sonipat',
      'local hiring agency in Sonipat',
      'AI recruitment platform Sonipat',
      'EarlyJobs Sonipat',
      'placement support Haryana',
      'job opportunities Sonipat',
      'college placement Sonipat',
      'fresher jobs Sonipat',
      'walk-in interviews Sonipat'
    ],
    openGraph: {
      title: 'EarlyJobs Sonipat - Jobs, Placements & Hiring Support in Haryana',
      description: 'Connect with EarlyJobs Sonipat for verified job opportunities, campus placements, and local hiring support. Serving students, colleges, and employers across Sonipat and NCR.',
      url: `${baseUrl}/franchise/sonipat`,
      type: 'website',
      images: [
        {
          url: `/images/og-franchise.jpg`,
          width: 1200,
          height: 630,
          alt: 'EarlyJobs Sonipat Franchise - Recruitment & Placement Support',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'EarlyJobs Sonipat - Jobs, Placements & Hiring Support',
      description: 'Verified jobs for students, campus placement support, and local hiring solutions in Sonipat, Haryana.',
      images: [`/images/og-franchise.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/franchise/sonipat`,
    },
  };
}

export default function Page() {
  return <SonipatFranchise />;
}

