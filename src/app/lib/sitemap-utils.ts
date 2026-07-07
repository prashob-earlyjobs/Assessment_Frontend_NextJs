import { MetadataRoute } from 'next'
import { allowedCities } from '../franchise/data/franchiseCities'

const MAX_URLS_PER_SITEMAP = 50000
const SITEMAP_FETCH_TIMEOUT_MS = 5000
const SITEMAP_DYNAMIC_BUDGET_MS = 12000

export interface SitemapData {
  staticPages: MetadataRoute.Sitemap
  assessmentPages: MetadataRoute.Sitemap
  jobPages: MetadataRoute.Sitemap
  subJobPages: MetadataRoute.Sitemap
  franchisePages: MetadataRoute.Sitemap
}

async function fetchJsonWithTimeout(url: string): Promise<any | null> {
  try {
    return await Promise.race([
      (async () => {
        const controller = new AbortController()
        const response = await fetch(url, {
          signal: controller.signal,
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        return await response.json()
      })(),
      new Promise<null>((_, reject) => {
        setTimeout(() => reject(new Error(`Sitemap fetch timed out after ${SITEMAP_FETCH_TIMEOUT_MS}ms`)), SITEMAP_FETCH_TIMEOUT_MS)
      }),
    ])
  } catch (error) {
    console.error(`Sitemap fetch failed for ${url}:`, error)
    return null
  }
}

function mapAssessmentPages(baseUrl: string, assessments: any[]): MetadataRoute.Sitemap {
  return assessments.map((assessment: any) => {
    const assessmentName = (assessment.title || assessment.name || 'assessment')
      .replace(/[&<>"']/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]/g, '')
      .toLowerCase()

    return {
      url: `${baseUrl}/assessments/${assessmentName}/${assessment._id}`,
      lastModified: new Date(assessment.updatedAt || assessment.createdAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })
}

function mapJobPages(baseUrl: string, jobs: any[]): MetadataRoute.Sitemap {
  return jobs.map((job: any) => {
    const jobTitle = (job.title || job.jobTitle || job.name || 'job')
      .replace(/[&<>"']/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]/g, '')
      .toLowerCase()

    return {
      url: `${baseUrl}/jobs/${jobTitle}/${job.jobId}`,
      lastModified: new Date(job.updatedAt || job.createdAt || Date.now()),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }
  })
}

function mapSubJobPages(baseUrl: string, subjobs: any[]): MetadataRoute.Sitemap {
  return subjobs.map((job: any) => {
    const jobTitle = job.title
      .replace(/[&<>"']/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]/g, '')
      .toLowerCase()

    return {
      url: `${baseUrl}/jobs/${jobTitle}/${job.subjobId}`,
      lastModified: new Date(job.updatedAt || job.createdAt || Date.now()),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }
  })
}

async function fetchDynamicSitemapData(baseUrl: string) {
  const assessmentBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const jobBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0

  const [assessmentResult, jobsResult, subjobsResult] = await Promise.allSettled([
    assessmentBackendUrl
      ? fetchJsonWithTimeout(
          `${assessmentBackendUrl}/assessments?category=&title=&type=&difficulty=&page=1&limit=1000`
        )
      : Promise.resolve(null),
    jobBackendUrl
      ? fetchJsonWithTimeout(`${jobBackendUrl}/public/jobs?page=1&pageSize=1000`)
      : Promise.resolve(null),
    jobBackendUrl
      ? fetchJsonWithTimeout(`${jobBackendUrl}/public/subjobs`)
      : Promise.resolve(null),
  ])

  const assessmentResponse =
    assessmentResult.status === 'fulfilled' ? assessmentResult.value : null
  const jobsResponse = jobsResult.status === 'fulfilled' ? jobsResult.value : null
  const subjobsResponse = subjobsResult.status === 'fulfilled' ? subjobsResult.value : null

  return {
    assessmentPages: mapAssessmentPages(
      baseUrl,
      assessmentResponse?.data?.assessments || []
    ),
    jobPages: mapJobPages(baseUrl, jobsResponse?.data?.jobs || jobsResponse?.jobs || []),
    subJobPages: mapSubJobPages(baseUrl, subjobsResponse?.data?.subjobs || []),
  }
}

/**
 * Fetches all URLs for the sitemap
 */
export async function getAllSitemapUrls(): Promise<SitemapData> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai'

  const staticPages: MetadataRoute.Sitemap = [
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
    {
      url: `${baseUrl}/franchise/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  const franchisePages: MetadataRoute.Sitemap = allowedCities.map((slug) => ({
    url: `${baseUrl}/franchise/${slug.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const dynamicData = await Promise.race([
    fetchDynamicSitemapData(baseUrl),
    new Promise<{
      assessmentPages: MetadataRoute.Sitemap
      jobPages: MetadataRoute.Sitemap
      subJobPages: MetadataRoute.Sitemap
    }>((resolve) => {
      setTimeout(() => {
        console.warn(`Sitemap dynamic fetch exceeded ${SITEMAP_DYNAMIC_BUDGET_MS}ms, using static URLs only`)
        resolve({
          assessmentPages: [],
          jobPages: [],
          subJobPages: [],
        })
      }, SITEMAP_DYNAMIC_BUDGET_MS)
    }),
  ])

  return {
    staticPages,
    assessmentPages: dynamicData.assessmentPages,
    jobPages: dynamicData.jobPages,
    subJobPages: dynamicData.subJobPages,
    franchisePages,
  }
}

/**
 * Splits URLs into chunks of MAX_URLS_PER_SITEMAP
 */
export function chunkUrls(urls: MetadataRoute.Sitemap): MetadataRoute.Sitemap[] {
  const chunks: MetadataRoute.Sitemap[] = []

  for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
    chunks.push(urls.slice(i, i + MAX_URLS_PER_SITEMAP))
  }

  return chunks
}

/**
 * Combines all sitemap data into a single array
 */
export function combineSitemapData(data: SitemapData): MetadataRoute.Sitemap {
  return [
    ...data.staticPages,
    ...data.assessmentPages,
    ...data.jobPages,
    ...data.subJobPages,
    ...data.franchisePages,
  ]
}
