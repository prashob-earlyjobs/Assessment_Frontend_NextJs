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
  
  let candidateName = '';
  let assessmentTitle = '';
  let role = 'Developer';
  
  try {
    // Fetch candidate data to get accurate information
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (backendUrl) {
      const response = await fetch(`${backendUrl}/browseCandidates/candidates`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data && Array.isArray(data.data)) {
          const candidate = data.data.find((c: any) => c._id === id);
          if (candidate) {
            candidateName = candidate.name || '';
            assessmentTitle = candidate.firstAssessmentTitle || candidate.assessmentTitle || '';
            
            // Extract role from assessment title or profile
            if (assessmentTitle) {
              // Try to extract role from assessment title (e.g., "PEGA Developer" -> "PEGA Developer")
              role = assessmentTitle;
            } else if (candidate.profile?.role) {
              role = candidate.profile.role;
            } else if (candidate.profile?.skills && candidate.profile.skills.length > 0) {
              // Use first skill as fallback
              role = candidate.profile.skills[0];
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching candidate data for metadata:', error);
  }
  
  // Fallback: Parse from URL slug if API call failed
  if (!role || role === 'Developer') {
    const nameParts = nameAssessmentTitle ? nameAssessmentTitle.split('-') : [];
    // Remove common words like "assessment" from the end
    const filteredParts = nameParts.filter(part => 
      part !== 'assessment' && part !== 'profile' && part !== 'candidate'
    );
    if (filteredParts.length > 2) {
      // Assume last part might be role/title
      role = filteredParts[filteredParts.length - 1];
    }
  }
  
  const roleFormatted = role.split(/[\s-]+/).map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
  
  const displayName = candidateName || nameAssessmentTitle?.split('-').slice(0, 2).map(w => 
    w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ') || 'Candidate';
  
  const title = candidateName && assessmentTitle 
    ? `${displayName} - Interviewed ${roleFormatted} Profile | EarlyJobs`
    : `Interviewed ${roleFormatted} Profile | EarlyJobs Talent Pool`;
  
  const description = candidateName && assessmentTitle
    ? `View ${displayName}'s verified ${roleFormatted.toLowerCase()} profile on EarlyJobs. Pre-interviewed talent with proven skills and assessment results.`
    : `Browse pre interviewed ${roleFormatted.toLowerCase()} profiles on EarlyJobs. Hire verified talent with proven skills and interview readiness.`;
  
  return {
    title,
    description,
    keywords: ['interviewed candidates', 'verified talent', 'hiring', 'EarlyJobs', 'talent pool', roleFormatted.toLowerCase(), candidateName.toLowerCase()],
    openGraph: {
      title,
      description,
      url: `${baseUrl}/browse-interviewed-candidates/${nameAssessmentTitle}/${id}`,
      type: 'website',
      images: [
        {
          url: '/images/pre_interviewd_talent.jpg',
          width: 1200,
          height: 627,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
