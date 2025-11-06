"use client";

import { NextIntlClientProvider } from "next-intl";

interface LocaleProviderProps {
  children: React.ReactNode;
  messages: any;
  locale: string;
}

export function LocaleProvider({ children, messages, locale }: LocaleProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
