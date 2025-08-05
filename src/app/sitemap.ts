import { MetadataRoute } from 'next'
import { getAssessmentsfromSearch } from './components/services/servicesapis'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://earlyjobs.ai'
  
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
      // Create URL-friendly assessment name
      const assessmentName = encodeURIComponent(assessment.title || assessment.name || 'assessment')
      
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

  // Combine static and dynamic pages
  return [...staticPages, ...assessmentPages]
} 