'use client';

import { Header } from '@components/shared/Header/Header';
import { Routes } from '@enums/routes';
import '@styles/normalize.css';
import { usePathname } from 'next/navigation';
import { FC, ReactNode } from 'react';

import s from './styles.module.scss';

const pagesWithoutHeader = [Routes.Login, Routes.SignUp];

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className={s.layout}>
      {!pagesWithoutHeader.includes(pathname as Routes) && <Header />}
      {children}
    </div>
  );
};
