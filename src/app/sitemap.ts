// import { MetadataRoute } from "next";

// export default function sitemap(): MetadataRoute.Sitemap {
//   const baseUrl = "https://pricelessmed.com";

//   return [
//     {
//       url: baseUrl,
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 1.0,
//       alternates: {
//         languages: {
//           en: `${baseUrl}/en`,
//           ar: `${baseUrl}/ar`,
//         },
//       },
//     },
//     {
//       url: `${baseUrl}/services`,
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.9,
//       alternates: {
//         languages: {
//           en: `${baseUrl}/en/services`,
//           ar: `${baseUrl}/ar/services`,
//         },
//       },
//     },
//     {
//       url: `${baseUrl}/hospitals`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.8,
//       alternates: {
//         languages: {
//           en: `${baseUrl}/en/hospitals`,
//           ar: `${baseUrl}/ar/hospitals`,
//         },
//       },
//     },
//     {
//       url: `${baseUrl}/partners`,
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 0.7,
//       alternates: {
//         languages: {
//           en: `${baseUrl}/en/partners`,
//           ar: `${baseUrl}/ar/partners`,
//         },
//       },
//     },
//     {
//       url: `${baseUrl}/blog`,
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//       alternates: {
//         languages: {
//           en: `${baseUrl}/en/blog`,
//           ar: `${baseUrl}/ar/blog`,
//         },
//       },
//     },
//     {
//       url: `${baseUrl}/news`,
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.7,
//       alternates: {
//         languages: {
//           en: `${baseUrl}/en/news`,
//           ar: `${baseUrl}/ar/news`,
//         },
//       },
//     },
//     {
//       url: `${baseUrl}/faq`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.6,
//       alternates: {
//         languages: {
//           en: `${baseUrl}/en/faq`,
//           ar: `${baseUrl}/ar/faq`,
//         },
//       },
//     },
//     {
//       url: `${baseUrl}/about`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.5,
//       alternates: {
//         languages: {
//           en: `${baseUrl}/en/about`,
//           ar: `${baseUrl}/ar/about`,
//         },
//       },
//     },
//     {
//       url: `${baseUrl}/contact`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority: 0.5,
//       alternates: {
//         languages: {
//           en: `${baseUrl}/en/contact`,
//           ar: `${baseUrl}/ar/contact`,
//         },
//       },
//     },
//   ];
// }
import { MetadataRoute } from 'next'
import { routing } from '../i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pricelessmed.com'

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/hospitals', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/partners', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/news', priority: 0.7, changeFrequency: 'daily' as const },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  routes.forEach((route) => {
    const alternates: { languages: Record<string, string> } = {
      languages: {},
    }

    routing.locales.forEach((locale) => {
      alternates.languages[locale] = `${baseUrl}/${locale}${route.path}`
    })

    // Add entry for each locale
    routing.locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: alternates,
      })
    })
  })

  return sitemapEntries
}