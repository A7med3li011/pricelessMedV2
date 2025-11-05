import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

interface BusinessData {
       name: string;
       description: string;
       telephone: string;
       specialties: string[];
       address?: {
              region: string;
       };
}

interface AggregateRating {
       ratingValue: string;
       reviewCount: string;
}

// Helper function to generate JSON-LD
export async function generateJsonLd(locale: string) {
       try {
              const t = await getTranslations({ locale, namespace: "metadata" });

              const businessData = t.raw("businessData") as BusinessData;
              const aggregateRating = t.raw("seo.aggregateRating") as AggregateRating;

              const jsonLd = {
                     "@context": "https://schema.org",
                     "@type": "MedicalBusiness",
                     name: businessData.name,
                     description: businessData.description,
                     url: "https://pricelessmed.com",
                     logo: "https://pricelessmed.com/logo.png",
                     image: "https://pricelessmed.com/assets/home/main_home.png",
                     telephone: businessData.telephone,
                     address: {
                            "@type": "PostalAddress",
                            addressCountry: "AE",
                            addressRegion: businessData.address?.region || "Dubai",
                     },
                     medicalSpecialty: businessData.specialties,
                     aggregateRating: {
                            "@type": "AggregateRating",
                            ratingValue: aggregateRating.ratingValue,
                            reviewCount: aggregateRating.reviewCount,
                     },
                     priceRange: "AED",
                     sameAs: [
                            "https://www.facebook.com/pricelessmed",
                            "https://twitter.com/pricelessmed",
                            "https://www.instagram.com/pricelessmed",
                            "https://www.linkedin.com/company/pricelessmed",
                     ],
              };

              return jsonLd;
       } catch (error) {
              console.error("Error generating JSON-LD:", error);
              return {
                     "@context": "https://schema.org",
                     "@type": "MedicalBusiness",
                     name: "PriceLess Med",
                     url: "https://pricelessmed.com",
              };
       }
}

// Generate Page Metadata for Static Pages

export async function generatePageMetadata(
       locale: string,
       page: string = "home"
): Promise<Metadata> {
       try {
              const t = await getTranslations({ locale, namespace: "metadata" });

              // Not indexing pages
              const noIndexPages = ["auth"];
              const isNoIndex = noIndexPages.some((p) => page.includes(p));

              // Get page-specific title and description
              const pageTitle = t(`${page}.title`);
              const pageDescription = t(`${page}.description`);
              const siteTitle = t("title");

              // Create full title (Home page uses only site title)
              const fullTitle = page === "home" ? siteTitle : `${pageTitle} | ${siteTitle}`;

              // Generate JSON-LD
              const jsonLdObject = await generateJsonLd(locale);

              // Build page URL
              const pageUrl = page === "home"
                     ? `https://pricelessmed.com/${locale}`
                     : `https://pricelessmed.com/${locale}/${page}`;

              return {
                     title: fullTitle,
                     description: pageDescription,
                     robots: isNoIndex
                            ? { index: false, follow: false }
                            : { index: true, follow: true },
                     alternates: {
                            canonical: pageUrl,
                            languages: {
                                   en: page === "home"
                                          ? "https://pricelessmed.com/en"
                                          : `https://pricelessmed.com/en/${page}`,
                                   ar: page === "home"
                                          ? "https://pricelessmed.com/ar"
                                          : `https://pricelessmed.com/ar/${page}`,
                            },
                     },
                     openGraph: {
                            title: fullTitle,
                            description: pageDescription,
                            locale: locale === "ar" ? "ar_AE" : "en_US",
                            type: "website",
                            url: pageUrl,
                            siteName: siteTitle,
                            images: [
                                   {
                                          url: "https://pricelessmed.com/assets/home/main_home.png",
                                          width: 1200,
                                          height: 630,
                                          alt: fullTitle,
                                   },
                            ],
                     },
                     twitter: {
                            card: "summary_large_image",
                            title: fullTitle,
                            description: pageDescription,
                            images: ["https://pricelessmed.com/assets/home/main_home.png"],
                     },
                     // Add JSON-LD to metadata
                     other: {
                            "script:ld+json": JSON.stringify(jsonLdObject),
                     },
              };
       } catch (error) {
              console.error(`Error generating metadata for page "${page}":`, error);
              return generateDefaultMetadata(locale);
       }
}

// Auto-detect page metadata for dynamic routes

export async function generateAutoMetadata(
       locale: string,
       segments: { title: string; description: string }
): Promise<Metadata> {
       try {
              const t = await getTranslations({ locale, namespace: "metadata" });

              const pageName = segments.title;
              const noIndexPages = ["auth", "login", "signup", "forget-password", "reset-password"];
              const isNoIndex = noIndexPages.some((p) => pageName.toLowerCase().includes(p));

              // Format page title (replace hyphens with spaces and capitalize)
              const formattedTitle = segments.title
                     .split("-")
                     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                     .join(" ");

              const pageDescription = segments.description;
              const siteTitle = t("title");
              const fullTitle = `${formattedTitle} | ${siteTitle}`;

              // Generate JSON-LD
              const jsonLdObject = await generateJsonLd(locale);

              const pageUrl = `https://pricelessmed.com/${locale}/${pageName}`;

              return {
                     title: fullTitle,
                     description: pageDescription,
                     robots: isNoIndex
                            ? { index: false, follow: false }
                            : { index: true, follow: true },
                     alternates: {
                            canonical: pageUrl,
                            languages: {
                                   en: `https://pricelessmed.com/en/${pageName}`,
                                   ar: `https://pricelessmed.com/ar/${pageName}`,
                            },
                     },
                     openGraph: {
                            title: fullTitle,
                            description: pageDescription,
                            locale: locale === "ar" ? "ar_AE" : "en_US",
                            type: "website",
                            url: pageUrl,
                            siteName: siteTitle,
                            images: [
                                   {
                                          url: "https://pricelessmed.com/assets/home/main_home.png",
                                          width: 1200,
                                          height: 630,
                                          alt: fullTitle,
                                   },
                            ],
                     },
                     twitter: {
                            card: "summary_large_image",
                            title: fullTitle,
                            description: pageDescription,
                            images: ["https://pricelessmed.com/assets/home/main_home.png"],
                     },
                     other: {
                            "script:ld+json": JSON.stringify(jsonLdObject),
                     },
              };
       } catch (error) {
              console.error("Error generating auto metadata:", error);
              return generateDefaultMetadata(locale);
       }
}

// Default metadata for fallback scenarios

export async function generateDefaultMetadata(locale: string): Promise<Metadata> {
       try {
              const t = await getTranslations({ locale, namespace: "metadata" });

              // Generate JSON-LD
              const jsonLdObject = await generateJsonLd(locale);

              return {
                     title: {
                            default: t("title"),
                            template: `%s | ${t("title")}`,
                     },
                     description: t("description"),
                     icons: {
                            icon: [
                                   { url: "/favicon.ico", sizes: "any" },
                                   { url: "/icon.png", type: "image/png" },
                            ],
                            apple: "/apple-icon.png",
                     },
                     alternates: {
                            canonical: `https://pricelessmed.com/${locale}`,
                            languages: {
                                   en: "https://pricelessmed.com/en",
                                   ar: "https://pricelessmed.com/ar",
                            },
                     },
                     openGraph: {
                            title: t("title"),
                            description: t("description"),
                            locale: locale === "ar" ? "ar_AE" : "en_US",
                            type: "website",
                            url: `https://pricelessmed.com/${locale}`,
                            siteName: t("title"),
                            images: [
                                   {
                                          url: "https://pricelessmed.com/assets/home/main_home.png",
                                          width: 1200,
                                          height: 630,
                                          alt: t("title"),
                                   },
                            ],
                     },
                     twitter: {
                            card: "summary_large_image",
                            title: t("title"),
                            description: t("description"),
                            images: ["https://pricelessmed.com/assets/home/main_home.png"],
                     },
                     other: {
                            "script:ld+json": JSON.stringify(jsonLdObject),
                     },
              };
       } catch (error) {
              console.error("Error generating default metadata:", error);
              // Absolute minimum fallback
              return {
                     title: "PriceLess Med",
                     description: "Your trusted partner for affordable healthcare services in the UAE.",
              };
       }
}