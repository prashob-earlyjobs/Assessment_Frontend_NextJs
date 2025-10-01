import { MetadataRoute } from 'next'
import { getAssessmentsfromSearch } from './components/services/servicesapis'

// Revalidate sitemap every 1 hour (3600 seconds)
// This means the sitemap will regenerate automatically after 1 hour
// export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai'
  // const backendUrl = "https://apis.earlyjobs.in"
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0;



  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/assessments`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/Pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/onboarding`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Dynamic assessment pages
  let assessmentPages: MetadataRoute.Sitemap = []
  
  try {
    // Fetch all assessments from the API
    const response = await getAssessmentsfromSearch({
      page: 1,
      limit: 1000, // Get a large number to ensure we get all assessments
      type: "",
      difficulty: "",
      searchQuery: "",
      category: "",
    })

    const assessments = response?.data?.assessments || []
    
    assessmentPages = assessments.map((assessment: any) => {
      // Create URL-friendly assessment name with hyphens instead of spaces and escape special characters
      const assessmentName = (assessment.title || assessment.name || 'assessment')
        .replace(/[&<>"']/g, '') // Remove XML special characters
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]/g, '') // Remove any remaining non-word characters except hyphens
        .toLowerCase()
      
      return {
        url: `${baseUrl}/assessments/${assessmentName}/${assessment._id}`,
        lastModified: new Date(assessment.updatedAt || assessment.createdAt || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })
  } catch (error) {
    console.error('Error fetching assessments for sitemap:', error)
    // If API fails, we'll just return static pages
  }

  // Dynamic job pages
  let jobPages: MetadataRoute.Sitemap = []
  
  try {
    // Fetch all jobs from the backend API
    const jobsResponse = await fetch(`${backendUrl}/public/jobs?page=1&pageSize=1000`)




    
    if (jobsResponse.ok) {
      const jobsData = await jobsResponse.json()
      const jobs = jobsData?.data?.jobs || jobsData?.jobs || []
      
      jobPages = jobs.map((job: any) => {
        // Create URL-friendly job title with hyphens instead of spaces and escape special characters
        const jobTitle = (job.title || job.jobTitle || job.name || 'job')
          .replace(/[&<>"']/g, '') // Remove XML special characters
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]/g, '') // Remove any remaining non-word characters except hyphens
          .toLowerCase()
        
        return {
          url: `${baseUrl}/jobs/${jobTitle}/${job._id || job.id}`,
          lastModified: new Date(job.updatedAt || job.createdAt || Date.now()),
          changeFrequency: 'daily' as const,
          priority: 0.8,
        }
      })
    }
  } catch (error) {
    console.error('Error fetching jobs for sitemap:', error)
    // If API fails, we'll just return static pages and assessments
  }





  let subJobPages: MetadataRoute.Sitemap = []
  
  try {
    // Fetch all jobs from the backend API
    const jobsResponse = await fetch(`${backendUrl}/public/subjobs`)
    
    if (jobsResponse.ok) {
      const jobsData = await jobsResponse.json()
      const subjobs = jobsData?.data?.subjobs
      
      subJobPages = subjobs.map((job: any) => {
        // Create URL-friendly job title with hyphens instead of spaces and escape special characters
        const jobTitle = job.title
          .replace(/[&<>"']/g, '') // Remove XML special characters
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]/g, '') // Remove any remaining non-word characters except hyphens
          .toLowerCase()
        
        return {
          url: `${baseUrl}/jobs/${jobTitle}/${job.subjobId}`,
          lastModified: new Date(job.updatedAt || job.createdAt || Date.now()),
          changeFrequency: 'daily' as const,
          priority: 0.8,
        }
      })
    }
  } catch (error) {
    console.error('Error fetching jobs for sitemap:', error)
    // If API fails, we'll just return static pages and assessments
  }

  // Combine static, assessment, and job pages
  return [...staticPages, ...assessmentPages, ...jobPages, ...subJobPages]
} 