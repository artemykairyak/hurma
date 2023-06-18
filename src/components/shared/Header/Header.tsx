'use client';

import SmallLogo from '@assets/icons/smallLogo.svg';
import { Routes } from '@enums/routes';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

import s from './styles.module.scss';

const links = [
  {
    title: 'links',
    url: Routes.Links,
  },
  {
    title: 'statistics',
    url: Routes.Statistics,
  },
  {
    title: 'about',
    url: Routes.About,
  },
];

export const Header = () => {
  const pathName = usePathname();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(pathName);
  }, [pathName]);

  return (
    <div className={s.header}>
      {links.map((link, i) => {
        if (i < links.length - 1) {
          return (
            <Link
              key={i}
              href={link.url}
              className={clsx(s.link, {
                [s.active]: activeLink === link.url,
              })}
            >
              {link.title}
            </Link>
          );
        }
      })}
      <Link href="/">
        <ReactSVG src={SmallLogo.src} className={s.smallLogo} />
      </Link>
      <Link
        href={links.at(-1).url}
        className={clsx(s.link, {
          [s.active]: activeLink === links.at(-1).title,
        })}
      >
        {links.at(-1).title}
      </Link>
    </div>
  );
};
