import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pricelessmed.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/auth/*',           // Disallow Auth routes
        '/api/*',           // Disallow API routes
        '/admin/*',         // Disallow admin routes if any
        '/*?*',            // Disallow URLs with query parameters (optional)
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}