import "./globals.css";

import Header from "../../components/ui/header/header";
import Footer from "../../components/ui/footer";
import { routing } from "@/src/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { getDirection, getFont } from "@/src/utils/direction";
import { AuthProvider } from "@/src/components/providers/auth-provider";
import { Metadata } from "next";
import { generateDefaultMetadata, generateJsonLd } from "@/src/utils/metadata";
import { LocaleProvider } from "@/src/components/localProvider";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Use the default metadata generator
  return await generateDefaultMetadata(locale);
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const jsonLd = await generateJsonLd(locale);
  const messages = await getMessages({ locale });
  const direction = getDirection(locale);
  const font = getFont(locale);

  console.log(messages);
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className={font}>
        <AuthProvider>
          <LocaleProvider messages={messages} locale={locale}>
            <main className=" ">
              <Header />
              {children}
            </main>
            <footer className="bg-black">
              <Footer />
            </footer>
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
