import type { ReactNode } from 'react';
import { Header } from '../../components/header';
import { Providers } from '../providers';
import { NextIntlClientProvider } from 'next-intl';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  const messages = (
    await import(`../../messages/${locale}.json`)
  ).default;

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <Providers>
        <Header />
        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}