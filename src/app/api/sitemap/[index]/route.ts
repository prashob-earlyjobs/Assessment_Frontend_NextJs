import { NextRequest, NextResponse } from 'next/server'
import { getAllSitemapUrls, combineSitemapData, chunkUrls } from '../../../lib/sitemap-utils'

const MAX_URLS_PER_SITEMAP = 50000

/**
 * API route to serve individual sitemap chunks
 * Accessible at /sitemap-[index].xml (via rewrite) or /api/sitemap/[index]
 * Example: /sitemap-2.xml, /sitemap-3.xml, etc.
 * Note: sitemap-1.xml is served by the main sitemap.ts file
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { index: string } }
) {
  try {
    const index = parseInt(params.index, 10)
    
    if (isNaN(index) || index < 1) {
      return new NextResponse('Invalid sitemap index', { status: 400 })
    }

    // Fetch all URLs
    const sitemapData = await getAllSitemapUrls()
    const allUrls = combineSitemapData(sitemapData)
    
    // Split into chunks
    const chunks = chunkUrls(allUrls)
    
    // Check if the requested index exists
    // Index 1 is served by main sitemap.ts, so we start from index 2
    // But we still need to handle index 1 in case it's requested directly
    if (index < 1 || index > chunks.length) {
      return new NextResponse('Sitemap index not found', { status: 404 })
    }
    
    // If index is 1, redirect to main sitemap
    if (index === 1) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai'
      return NextResponse.redirect(new URL('/sitemap.xml', request.url))
    }

    // Get the requested chunk (index is 1-based, array is 0-based)
    // Index 2 in URL corresponds to chunks[1] (second chunk)
    const chunk = chunks[index - 1]
    
    // Generate XML sitemap
    const xml = generateSitemapXML(chunk)
    
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap chunk:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

/**
 * Generates XML sitemap from sitemap data
 */
function generateSitemapXML(urls: Array<{
  url: string
  lastModified?: Date | string
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}>): string {
  const urlsXML = urls.map((item) => {
    const lastmod = item.lastModified
      ? new Date(item.lastModified).toISOString()
      : new Date().toISOString()
    
    const changefreq = item.changeFrequency || 'daily'
    const priority = item.priority?.toFixed(1) || '0.8'
    
    return `  <url>
    <loc>${escapeXML(item.url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXML}
</urlset>`
}

/**
 * Escapes XML special characters
 */
function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
