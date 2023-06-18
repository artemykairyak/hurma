'use client';

import SmallLogo from '@assets/icons/smallLogo.svg';
import { Routes } from '@enums/routes';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';

import s from './styles.module.scss';

const links = [
  {
    title: 'links',
    url: Routes.Cabinet,
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
  const [activeLink, setActiveLink] = useState('');

  const onLinkClick = (link: string) => () => {
    setActiveLink(link);
  };

  return (
    <div className={s.header}>
      {links.map((link, i) => {
        if (i < links.length - 1) {
          return (
            <Link
              onClick={onLinkClick(link.title)}
              key={i}
              href={link.url}
              className={clsx(s.link, {
                [s.active]: activeLink === link.title,
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
        onClick={onLinkClick(links.at(-1).title)}
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
