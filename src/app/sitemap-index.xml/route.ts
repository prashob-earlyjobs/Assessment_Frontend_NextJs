import { NextRequest, NextResponse } from 'next/server'
import { getAllSitemapUrls, combineSitemapData, chunkUrls } from '../lib/sitemap-utils'

const MAX_URLS_PER_SITEMAP = 50000

/**
 * API route to serve sitemap index
 * Accessible at /sitemap-index.xml
 * This file lists all individual sitemap chunks
 * Search engines should use this when there are more than 50,000 URLs
 */
export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai'

    // Fetch all URLs
    const sitemapData = await getAllSitemapUrls()
    const allUrls = combineSitemapData(sitemapData)

    // If we have less than MAX_URLS_PER_SITEMAP, redirect to main sitemap
    if (allUrls.length <= MAX_URLS_PER_SITEMAP) {
      return NextResponse.redirect(new URL('/sitemap.xml', request.url))
    }

    // Split into chunks
    const chunks = chunkUrls(allUrls)
    
    // Generate sitemap index XML
    // Include the main sitemap.xml (first chunk) and all additional chunks
    const sitemapEntries = chunks.map((_, index) => {
      const sitemapUrl = index === 0 
        ? `${baseUrl}/sitemap.xml`
        : `${baseUrl}/sitemap-${index + 1}.xml`
      
      return `  <sitemap>
    <loc>${escapeXML(sitemapUrl)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
    }).join('\n')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap index:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
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
