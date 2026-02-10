import BlogPage from "./BlogPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
    return {
        title: 'Blog Page | EarlyJobs',
        description: 'Stay updated with the latest insights and trends in recruitment and remote work.',
        keywords: [
            'EarlyJobs blog',
            'recruitment insights',
            'remote work trends',
            'freelance recruitment',
            'talent acquisition',
        ],
        openGraph: {
            title: 'Blog Page | EarlyJobs',
            description: 'Explore our blog for the latest insights and trends in recruitment and remote work.',
            url: `${baseUrl}/blogs`,
            type: 'website',
            images: [
                {
                    url: `/images/logo.png`,
                    width: 1200,
                    height: 630,
                    alt: 'EarlyJobs Blog',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Blog Page | EarlyJobs',
            description: 'Explore our blog for the latest insights and trends in recruitment and remote work.',
            images: [`/images/logo.png`],
        },
        alternates: {
            canonical: `${baseUrl}/blogs`,
        },
    };
}

export default function Page() {
    return (
        <>
            <BlogPage />
        </>
    );
}
