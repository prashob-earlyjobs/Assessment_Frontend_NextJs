import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://earlyjobs.ai'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/dashboard/',
        '/profile/',
        '/transactions/',
        '/results/',
        '/certificate/',
        '/assessmentpayment/',
        '/onboarding/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
} 