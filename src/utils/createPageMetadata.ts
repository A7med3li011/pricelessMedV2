import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { generateJsonLd } from "./metadata"; // Import from your utils file

interface CreatePageMetadataOptions {
    pageName: string;
    isAuthPage?: boolean;
    includeJsonLd?: boolean;
    customImage?: string;
    priority?: number;
}

export function createPageMetadata(
    options: CreatePageMetadataOptions | string
) {
    const config: CreatePageMetadataOptions = typeof options === "string"
        ? { pageName: options, isAuthPage: false, includeJsonLd: true }
        : { isAuthPage: false, includeJsonLd: true, ...options };

    return async function generateMetadata({
        params,
    }: {
        params: Promise<{ locale: string }>;
    }): Promise<Metadata> {
        try {
            const { locale } = await params;
            const t = await getTranslations({ locale, namespace: "metadata" });

            // Get page-specific translations
            const pageTitle = t(`${config.pageName}.title`);
            const pageDescription = t(`${config.pageName}.description`);
            const siteTitle = t("title");

            const fullTitle = config.pageName === "home" 
                ? siteTitle 
                : `${pageTitle} | ${siteTitle}`;

            const pageUrl = config.pageName === "home"
                ? `https://pricelessmed.com/${locale}`
                : `https://pricelessmed.com/${locale}/${config.pageName}`;

            const ogImage = config.customImage || "https://pricelessmed.com/assets/home/main_home.png";

            // Base metadata
            const metadata: Metadata = {
                title: fullTitle,
                description: pageDescription,
                robots: config.isAuthPage 
                    ? { index: false, follow: false } 
                    : { index: true, follow: true },
                alternates: {
                    canonical: pageUrl,
                    languages: {
                        en: config.pageName === "home"
                            ? "https://pricelessmed.com/en"
                            : `https://pricelessmed.com/en/${config.pageName}`,
                        ar: config.pageName === "home"
                            ? "https://pricelessmed.com/ar"
                            : `https://pricelessmed.com/ar/${config.pageName}`,
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
                            url: ogImage,
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
                    images: [ogImage],
                },
            };

            // Add JSON-LD if requested
            if (config.includeJsonLd) {
                const jsonLdObject = await generateJsonLd(locale);
                metadata.other = {
                    "script:ld+json": JSON.stringify(jsonLdObject),
                };
            }

            return metadata;
        } catch (error) {
            console.error(`Error generating metadata for page "${config.pageName}":`, error);
            
            // Fallback metadata
            return {
                title: "PriceLess Med",
                description: "Your trusted partner for affordable healthcare services in the UAE.",
                robots: config.isAuthPage ? { index: false, follow: false } : undefined,
            };
        }
    };
}

// Convenience functions for common use cases -> public pages

export function createPublicPageMetadata(pageName: string, customImage?: string) {
    return createPageMetadata({
        pageName,
        isAuthPage: false,
        includeJsonLd: true,
        customImage,
    });
}


 // Pages (no-index)
export function createAuthPageMetadata(pageName: string) {
    return createPageMetadata({
        pageName,
        isAuthPage: true,
        includeJsonLd: false, // Auth pages don't need JSON-LD
    });
}


// For blog/news articles
export function createArticleMetadata(pageName: string, customImage?: string) {
    return createPageMetadata({
        pageName,
        isAuthPage: false,
        includeJsonLd: false, // Articles should have their own JSON-LD
        customImage,
    });
}