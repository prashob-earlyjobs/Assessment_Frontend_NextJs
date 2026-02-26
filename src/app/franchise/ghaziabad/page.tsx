import { Metadata } from 'next/dist/types';
import GhaziabadFranchise from './ghaziabadFranchise';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
    return {
        title: 'EarlyJobs Ghaziabad Franchise - AI-Powered Recruitment',
        description: 'Join EarlyJobs Ghaziabad, India\'s leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.',
        keywords: ['EarlyJobs', 'Ghaziabad', 'franchise', 'recruitment', 'AI recruitment', 'job placement', 'NCR'],
        openGraph: {
            title: 'EarlyJobs Ghaziabad Franchise',
            description: 'Explore franchise opportunities with EarlyJobs in Ghaziabad, combining AI technology and human expertise for exceptional recruitment results.',
            url: `${baseUrl}/franchise/ghaziabad`,
            type: 'website',
            images: [
                {
                    url: `/images/og-franchise.jpg`,
                    width: 1200,
                    height: 630,
                    alt: 'EarlyJobs Ghaziabad Franchise',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'EarlyJobs Ghaziabad Franchise',
            description: 'Explore franchise opportunities with EarlyJobs in Ghaziabad, combining AI technology and human expertise for exceptional recruitment results.',
            images: [`${baseUrl}/images/og-franchise.jpg`],
        },
        alternates: {
            canonical: `${baseUrl}/franchise/ghaziabad`,
        },
    };
}

export default function Page() {
    return <GhaziabadFranchise />;
}
