import s from '@styles/globals.module.scss';
import '@styles/normalize.css';
import { Montserrat_Alternates } from 'next/font/google';
import { ReactNode } from 'react';

import { Header } from './header';

export const montserrat = Montserrat_Alternates({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  fallback: ['sans-serif'],
});

export const metadata = {
  title: 'Hurma',
  description: 'Web-service for URL shortening and conversion statistics',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className={s.layout}>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
