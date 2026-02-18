import { Metadata } from 'next/dist/types';
import LucknowFranchise from "./lucknow";

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
    return {
        title: 'EarlyJobs Lucknow Franchise - AI-Powered Recruitment',
        description: 'Join EarlyJobs Lucknow, India\'s leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.',
        keywords: ['EarlyJobs', 'Lucknow', 'franchise', 'recruitment', 'AI recruitment', 'job placement', 'Uttar Pradesh'],
        openGraph: {
            title: 'EarlyJobs Lucknow Franchise',
            description: 'Explore franchise opportunities with EarlyJobs in Lucknow, combining AI technology and human expertise for exceptional recruitment results.',
            url: `${baseUrl}/franchise/lucknow`,
            type: 'website',
            images: [
                {
                    url: `/images/ghaziabad.jpg`, // Using placeholder as requested
                    width: 1200,
                    height: 630,
                    alt: 'EarlyJobs Lucknow Franchise',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'EarlyJobs Lucknow Franchise',
            description: 'Explore franchise opportunities with EarlyJobs in Lucknow, combining AI technology and human expertise for exceptional recruitment results.',
            images: [`${baseUrl}/images/ghaziabad.jpg`],
        },
        alternates: {
            canonical: `${baseUrl}/franchise/lucknow`,
        },
    };
}

export default function Page() {
    return <LucknowFranchise />;
}
