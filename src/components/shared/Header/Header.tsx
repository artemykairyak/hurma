'use client';

import SmallLogo from '@assets/icons/smallLogo.svg';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

import s from './styles.module.scss';

export interface HeaderLink {
  title: string;
  url: string;
}

export const Header: FC<{ links: HeaderLink[] }> = ({ links }) => {
  const pathName = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const splittedLinks = {
    leftSide: links.slice(0, Math.ceil(links.length / 2)),
    rightSide: links.slice(Math.ceil(links.length / 2), links.length),
  };
  useEffect(() => {
    setActiveLink(pathName);
  }, [pathName]);

  const getLink = (link: HeaderLink) => {
    return (
      <Link
        key={link.title}
        href={link.url}
        className={clsx(s.link, {
          [s.active]: activeLink === link.url,
        })}
      >
        {link.title}
      </Link>
    );
  };

  return (
    <div className={s.header}>
      {splittedLinks.leftSide.map((link) => getLink(link))}
      <Link href="/">
        <ReactSVG src={SmallLogo.src} className={s.smallLogo} />
      </Link>
      {splittedLinks.rightSide.map((link) => getLink(link))}
    </div>
  );
};
