import type { Metadata } from "next";

type Props = {
  params: Promise<{
    'name-assessmentTitle': string;
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const nameAssessmentTitle = resolvedParams['name-assessmentTitle'];
  const id = resolvedParams.id;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  
  // Extract role from the name slug (format: name-role)
  // The slug format is typically: firstname-lastname-role-title
  // We'll try to extract the last meaningful part as the role
  const nameParts = nameAssessmentTitle ? nameAssessmentTitle.split('-') : [];
  const role = nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'Developer';
  const roleFormatted = role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: `Interviewed ${roleFormatted} Profile | EarlyJobs Talent Pool`,
    description: `Browse pre interviewed ${roleFormatted.toLowerCase()} profiles on EarlyJobs. Hire verified talent with proven skills and interview readiness.`,
    keywords: ['interviewed candidates', 'verified talent', 'hiring', 'EarlyJobs', 'talent pool', roleFormatted.toLowerCase()],
    openGraph: {
      title: `Interviewed ${roleFormatted} Profile | EarlyJobs Talent Pool`,
      description: `Browse pre interviewed ${roleFormatted.toLowerCase()} profiles on EarlyJobs. Hire verified talent with proven skills and interview readiness.`,
      url: `${baseUrl}/browse-interviewed-candidates/${nameAssessmentTitle}/${id}`,
      type: 'website',
      images: [
        {
          url: '/images/pre_interviewd_talent.jpg',
          width: 1200,
          height: 627,
          alt: `Interviewed ${roleFormatted} Profile | EarlyJobs`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Interviewed ${roleFormatted} Profile | EarlyJobs Talent Pool`,
      description: `Browse pre interviewed ${roleFormatted.toLowerCase()} profiles on EarlyJobs. Hire verified talent with proven skills and interview readiness.`,
      images: ['/images/pre_interviewd_talent.jpg'],
    },
    alternates: {
      canonical: `${baseUrl}/browse-interviewed-candidates/${nameAssessmentTitle}/${id}`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
