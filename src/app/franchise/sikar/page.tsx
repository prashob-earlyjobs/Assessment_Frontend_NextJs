import { Metadata } from 'next/dist/types';
import SikarFranchise from './sikarFranchise';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
    return {
        title: 'EarlyJobs Sikar Franchise - AI-Powered Recruitment',
        description: 'Join EarlyJobs Sikar, your local hiring partner. Discover franchise opportunities and revolutionize recruitment with us in Sikar, Rajasthan.',
        keywords: ['EarlyJobs', 'Sikar', 'franchise', 'recruitment', 'AI recruitment', 'job placement', 'Rajasthan'],
        openGraph: {
            title: 'EarlyJobs Sikar Franchise',
            description: 'Explore franchise opportunities with EarlyJobs in Sikar, combining AI technology and human expertise for exceptional recruitment results.',
            url: `${baseUrl}/franchise/sikar`,
            type: 'website',
            images: [
                {
                    url: `/images/og-franchise.jpg`,
                    width: 1200,
                    height: 630,
                    alt: 'EarlyJobs Sikar Franchise',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'EarlyJobs Sikar Franchise',
            description: 'Explore franchise opportunities with EarlyJobs in Sikar, combining AI technology and human expertise for exceptional recruitment results.',
            images: [`${baseUrl}/images/og-franchise.jpg`],
        },
        alternates: {
            canonical: `${baseUrl}/franchise/sikar`,
        },
    };
}

export default function Page() {
    return <SikarFranchise />;
}
