import TeamPage from "./Teampage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
    return {
        title: 'Meet Our Team | Talented Experts | EarlyJobs',
        description: 'Meet the talented individuals behind EarlyJobs.',
        keywords: [
            'EarlyJobs team',
            'meet our team',
            'recruitment experts',
            'remote work advocates',
        ],
        openGraph: {
            title: 'Meet Our Team | Talented Experts | EarlyJobs',
            description: 'Meet the talented individuals behind EarlyJobs.',
            url: `${baseUrl}/team`,
            type: 'website',
            images: [
                {
                    url: `/images/logo.png`,
                    width: 1200,
                    height: 630,
                    alt: 'EarlyJobs Team',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Team Page | EarlyJobs',
            description: 'Meet the talented individuals behind EarlyJobs.',
            images: [`/images/logo.png`],
        },
        alternates: {
            canonical: `${baseUrl}/team`,
        },
    };
}

export default function Page() {
    return (
        <>
            <TeamPage />
        </>
    );
}
