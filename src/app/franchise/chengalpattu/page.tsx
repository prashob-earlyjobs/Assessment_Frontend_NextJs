import { Metadata } from 'next';
import ChengalpattuFranchise from './chengalpattu';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
    return {
        title: 'EarlyJobs Chengalpattu Franchise - AI-Powered Recruitment',
        description: 'Join EarlyJobs Chengalpattu, India\'s leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.',
        keywords: ['EarlyJobs', 'Chengalpattu', 'franchise', 'recruitment', 'AI recruitment', 'job placement', 'Chennai', 'Tamil Nadu'],
        openGraph: {
            title: 'EarlyJobs Chengalpattu Franchise',
            description: 'Explore franchise opportunities with EarlyJobs in Chengalpattu, combining AI technology and human expertise for exceptional recruitment results.',
            url: `${baseUrl}/franchise/chengalpattu`,
            type: 'website',
            images: [
                {
                    url: `/images/og-franchise.jpg`,
                    width: 1200,
                    height: 630,
                    alt: 'EarlyJobs Chengalpattu Franchise',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'EarlyJobs Chengalpattu Franchise',
            description: 'Explore franchise opportunities with EarlyJobs in Chengalpattu, combining AI technology and human expertise for exceptional recruitment results.',
            images: [`${baseUrl}/images/og-franchise.jpg`],
        },
        alternates: {
            canonical: `${baseUrl}/franchise/chengalpattu`,
        },
    };
}

export default function Page() {
    return <ChengalpattuFranchise />;
}
