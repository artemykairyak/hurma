import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';

import s from './styles.module.scss';

interface HeadingWithOptionProps {
  title: string;
  optionText: string;
  link: string;
  className?: string;
}

export const HeadingWithOption: FC<HeadingWithOptionProps> = ({
  title,
  optionText,
  link,
  className,
}) => {
  return (
    <div className={clsx(s.wrapper, className)}>
      <h1 className={s.title}>{title}</h1>
      <div className={s.option}>
        | <Link href={link}>{optionText}</Link>
      </div>
    </div>
  );
};
