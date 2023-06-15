import Link from 'next/link';
import { FC } from 'react';

import s from './styles.module.scss';

interface HeadingWithOptionProps {
  title: string;
  optionText: string;
  link: string;
}

export const HeadingWithOption: FC<HeadingWithOptionProps> = ({
  title,
  optionText,
  link,
}) => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>{title}</h1>
      <div className={s.option}>
        | <Link href={link} />
        {optionText}
      </div>
    </div>
  );
};
