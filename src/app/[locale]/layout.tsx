import type { ReactNode } from 'react';
import { Header } from '../../components/header';
import { Providers } from '../providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

interface LayoutProps {
  children: ReactNode;
}

export default async function RootLayout({
  children,
}: LayoutProps) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <Header />
        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}