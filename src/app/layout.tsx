import type { Metadata } from "next";

import "./globals.css";

import { Poppins } from "next/font/google";

import Header from "../components/ui/header/header";
import Footer from "../components/ui/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pricelessmed.com"),
  title: {
    default:
      "PriceLess Med - Save AED 3,000+ on Healthcare | Affordable Medical Services in UAE",
    template: "%s | PriceLess Med - Affordable Healthcare in UAE",
  },
  description:
    "Save over AED 3,000 annually on healthcare costs in UAE. Access affordable medical checkups, specialist care, hospital services, and health facilities across Dubai, Abu Dhabi, and beyond. Compare prices and book trusted healthcare providers.",
  keywords: [
    "affordable healthcare UAE",
    "cheap medical services Dubai",
    "healthcare savings UAE",
    "hospital discounts Dubai",
    "medical checkup offers",
    "specialist care UAE",
    "health insurance alternatives",
    "medical cost comparison",
    "Dubai healthcare prices",
    "Abu Dhabi medical services",
    "healthcare marketplace UAE",
    "doctor appointments Dubai",
    "clinic services UAE",
    "preventive care Dubai",
  ],
  authors: [{ name: "PriceLess Med" }],
  creator: "PriceLess Med",
  publisher: "PriceLess Med",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    alternateLocale: ["ar_AE"],
    url: "https://pricelessmed.com",
    title:
      "PriceLess Med - Save AED 3,000+ on Healthcare | Affordable Medical Services in UAE",
    description:
      "Save over AED 3,000 annually on healthcare costs in UAE. Access affordable medical checkups, specialist care, and hospital services. Compare prices and book trusted healthcare providers.",
    siteName: "PriceLess Med",
    images: [
      {
        url: "/assets/home/main_home.png",
        width: 1200,
        height: 630,
        alt: "PriceLess Med - Affordable Healthcare in UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "PriceLess Med - Save AED 3,000+ on Healthcare | Affordable Medical Services in UAE",
    description:
      "Save over AED 3,000 annually on healthcare costs in UAE. Access affordable medical checkups, specialist care, and hospital services.",
    images: ["/assets/home/main_home.png"],
    creator: "@pricelessmed",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://pricelessmed.com",
    languages: {
      "en-AE": "https://pricelessmed.com/en",
      "ar-AE": "https://pricelessmed.com/ar",
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "Healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "PriceLess Med",
    description:
      "Save over AED 3,000 annually on healthcare costs in UAE. Access affordable medical checkups, specialist care, and hospital services.",
    url: "https://pricelessmed.com",
    logo: "https://pricelessmed.com/logo.png",
    image: "https://pricelessmed.com/assets/home/main_home.png",
    telephone: "+971-XXX-XXXX",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressRegion: "Dubai",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Dubai",
      },
      {
        "@type": "City",
        name: "Abu Dhabi",
      },
      {
        "@type": "City",
        name: "Sharjah",
      },
    ],
    medicalSpecialty: [
      "GeneralPractice",
      "Cardiology",
      "Dermatology",
      "Dentistry",
      "Ophthalmology",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1250",
    },
    priceRange: "AED",
    sameAs: [
      "https://www.facebook.com/pricelessmed",
      "https://twitter.com/pricelessmed",
      "https://www.instagram.com/pricelessmed",
      "https://www.linkedin.com/company/pricelessmed",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={poppins.className}>
        <main className=" overflow-hidden">
          <Header />
          {children}
        </main>
        <footer className="bg-black">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
