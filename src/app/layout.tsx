'use client';

import { MainLayout } from '@components/layouts/MainLayout/MainLayout';
import '@styles/global.css';
import '@styles/normalize.css';
import { SessionProvider } from 'next-auth/react';
import { Montserrat_Alternates } from 'next/font/google';
import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';

export const montserrat = Montserrat_Alternates({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  fallback: ['sans-serif'],
  variable: '--montserrat',
});

export const metadata = {
  title: 'Hurma',
  description: 'Web-service for URL shortening and conversion statistics',
};

export default function RootLayout({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <CookiesProvider>
        <SessionProvider session={session}>
          <body className={montserrat.className}>
            <MainLayout>{children}</MainLayout>
          </body>
        </SessionProvider>
      </CookiesProvider>
    </html>
  );
}
