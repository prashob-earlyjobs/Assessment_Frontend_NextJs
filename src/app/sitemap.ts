import { MetadataRoute } from 'next'
import { getAllSitemapUrls, combineSitemapData, chunkUrls } from './lib/sitemap-utils'

// Revalidate sitemap every 1 hour (3600 seconds)
// This means the sitemap will regenerate automatically after 1 hour
// export const revalidate = 3600

const MAX_URLS_PER_SITEMAP = 50000

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai'

  // Fetch all URLs
  const sitemapData = await getAllSitemapUrls()
  const allUrls = combineSitemapData(sitemapData)

  // If we have less than MAX_URLS_PER_SITEMAP, return the single sitemap
  if (allUrls.length <= MAX_URLS_PER_SITEMAP) {
    return allUrls
  }

  // If we have more than MAX_URLS_PER_SITEMAP, return only the first chunk
  // Additional chunks will be served via API routes at /api/sitemap/[index]
  const chunks = chunkUrls(allUrls)
  return chunks[0] || []
} 