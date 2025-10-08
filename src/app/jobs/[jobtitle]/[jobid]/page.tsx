import Header from "../../../components/layout/Header";
import JobDetailsClient from "../../../components/jobs/JobDetailsClient";
import JobDetailsSEO from "../../../components/seo/JobDetailsSEO";
import { Metadata } from "next";
import Footer from "@/app/components/pages/footer";

interface JobDetailsData {
  id: string;
  title: string;
  company_name: string;
  company_logo_url?: string;
  employment_type?: string; // maps job type
  work_type?: string;
  min_salary?: string | number;
  max_salary?: string | number;
  salary_mode?: string;
  min_experience?: number | string;
  max_experience?: number | string;
  city?: string;
  location?: string; // full address
  skills?: string | string[]; // API may send comma-separated string
  created_at?: string; // posting time
  description?: string; // HTML
  // Optional fields from API not directly rendered now
  category?: string;
  commission_fee?: number;
  commission_type?: string;
  no_of_openings?: number;
  status?: string;
  hiring_need?: string;
  shift_timings?: string;
  language?: string;
  min_age?: number;
  max_age?: number;
  qualification?: string;
  currency?: string;
  street?: string;
  area?: string;
  pincode?: string;
  keywords?: string; // Added for keywords
  location_link?: string; // Added for location link
}

interface PageProps {
  params: Promise<{
    jobtitle: string;
    jobid: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { jobtitle, jobid } = await params;
  
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0;
    const response = await fetch(`${backendUrl}/public/jobs/${jobid}`, {
      next: { revalidate: 3600 }
    });
    
    if (response.ok) {
      const data = await response.json();
      const jobData = data.data;
      console.log('Job Data for SEO:', jobData);
      if (jobData) {
        const title = `${jobData.title} Job at ${jobData.company_name} - EarlyJobs`;
        const description = `Apply for ${jobData.title} position at ${jobData.company_name}. ${jobData.employment_type || 'Full-time'} job with competitive salary. ${jobData.city || 'Remote'} location.`;
        
        return {
          title,
          description,
          keywords: `${jobData.keywords}`,
          openGraph: {
            title,
            description,
            type: 'website',
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${jobtitle}/${jobid}`,
            images: [
              {
                url:'/assets/og-image.png',
                width: 1200,
                height: 627,
                alt: `${jobData.title} at ${jobData.company_name}`
              }
            ]
          },
          twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/assets/og-image.png']
          }
        };
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  // Fallback metadata
  // return {
  //   title: 'Job Details - EarlyJobs',
  //   description: 'Find and apply for the best job opportunities on EarlyJobs.',
  //   keywords: 'jobs, careers, employment, earlyjobs'
  // };
}

export default async function JobDetails({ params }: PageProps) {
  const { jobtitle, jobid } = await params;
  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0;
  
  
  let jobData: JobDetailsData | null = null;
  let seoError: string | null = null;
  
  try {
    const response = await fetch(`${backendUrl}/public/jobs/${jobid}`, {
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch job details: ${response.status}`);
    }
    
    const data = await response.json();
    jobData = data.data
    console.log(jobData);
  } catch (err) {
    seoError = err instanceof Error ? err.message : 'Failed to fetch job details';
  }

  // Generate current URL for SEO
  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/jobs/${jobtitle}/${jobid}`;

  if (seoError || !jobData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <JobDetailsSEO jobData={null} currentUrl={currentUrl} />
        <Header />
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">Error: {seoError || 'Job not found'}</p>
            <a 
              href="/jobs"
              className="inline-block mt-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Jobs
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <JobDetailsSEO jobData={jobData} currentUrl={currentUrl} />
      <Header />
      <JobDetailsClient jobid={jobid} currentUrl={currentUrl} />
      <Footer/>
    </>
  );
}
