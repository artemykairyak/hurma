'use client';

import { Header, HeaderLink } from '@components/shared/Header/Header';
import { Routes } from '@enums/routes';
import '@styles/normalize.css';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import { useCookies } from 'react-cookie';

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
  const session = useSession();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  useEffect(() => {
    if (session.data?.user.token && !cookies['token']) {
      setCookie('token', session.data?.user.token);
      return;
    }

    if (session.status === 'unauthenticated') {
      removeCookie('token');
    }
  }, [session]);

  //todo: infinite rerender
  console.log(session);

  const isPageWithoutHeader = pagesWithoutHeader.includes(pathname as Routes);

  return (
    <div className={clsx(s.layout, { [s.peachBg]: isPageWithoutHeader })}>
      {!isPageWithoutHeader && <Header links={links} />}
      {children}
    </div>
  );
};
