'use client';

import { Header, HeaderLink } from '@components/shared/Header/Header';
import { Routes } from '@enums/routes';
import '@styles/normalize.css';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { FC, ReactNode } from 'react';

import s from './MainLayout.module.scss';

const pagesWithoutHeader = [Routes.Login, Routes.SignUp];

const links: HeaderLink[] = [
  {
    title: 'links',
    url: Routes.Links,
  },
  {
    title: 'statistics',
    url: Routes.Statistics,
  },
  {
    title: 'profile',
    url: Routes.Profile,
  },
  {
    title: 'about',
    url: Routes.About,
  },
];

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const isPageWithoutHeader = pagesWithoutHeader.includes(pathname as Routes);

  return (
    <div className={clsx(s.layout, { [s.peachBg]: isPageWithoutHeader })}>
      {!isPageWithoutHeader && <Header links={links} />}
      {children}
    </div>
  );
};
